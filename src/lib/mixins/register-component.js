import upperCamelCase from 'uppercamelcase';
import {commonConvertMap} from '../utils/convert-helper';
import eventHelper from '../utils/event-helper';
import CONSTANTS from '../utils/constant';

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }, // 是否显示，默认 true
    zIndex: {
      type: Number
    }
  },
  data() {
    return {
      unwatchFns: [],
      handlers: {
        visible(flag) {
          if (this.show && this.hide) {
            flag === false ? this.hide() : this.show();
          }
        },
        zIndex(value) {
          if (this.setzIndex) {
            this.setzIndex(value);
          }
        }
      }
    };
  },

  mounted() {
    this.$parentComponent = this.$parentComponent || this.$parent.$parentComponent;
    if (this.$parentComponent) {
      this.register();
    } else {
      this.$on(CONSTANTS.AMAP_READY_EVENT, parentComponent => {
        this.$parentComponent = parentComponent;
        this.register();
      });
    }
  },

  destroyed() {
    if (!this.$amapComponent) return;
    this.unregisterEvents();
    this.unwatchFns.forEach(item => item());
    this.unwatchFns = [];
    this.destroyComponent();
  },

  methods: {
    getHandlerFun(prop) {
      if (this.handlers && this.handlers[prop]) {
        return this.handlers[prop];
      }

      return this.$amapComponent[`set${upperCamelCase(prop)}`];
    },

    convertProps() {
      const props = {};
      const {$options: {propsData = {}}, propsRedirect} = this;
      return Object.keys(propsData).reduce((res, _key) => {
        let key = _key;
        let propsValue = this.convertSignalProp(key, propsData[key]);
        if (propsValue === undefined) return res;
        if (propsRedirect && propsRedirect[_key]) key = propsRedirect[key];
        props[key] = propsValue;
        return res;
      }, props);
    },

    convertSignalProp(key, sourceData) {
      let converter = '';
      let type = '';

      if (type && converter) {
        return converter(sourceData);
      } else if (this.converters && this.converters[key]) {
        return this.converters[key].call(this, sourceData);
      } else {
        const convertFn = commonConvertMap[key];
        if (convertFn) return convertFn(sourceData);
        return sourceData;
      }
    },

    registerEvents() {
      let $listeners = this.$listeners;
      Object.keys($listeners).forEach(key => {
        eventHelper.addListener(this.$amapComponent, key, $listeners[key]);
      });
    },

    unregisterEvents() {
      let $listeners = this.$listeners;
      Object.keys($listeners).forEach(key => {
        eventHelper.removeListener(this.$amapComponent, key, $listeners[key]);
      });
    },

    setPropWatchers() {
      const {propsRedirect, $options: {propsData = {}}} = this;

      Object.keys(propsData).forEach(prop => {
        let handleProp = prop;
        if (propsRedirect && propsRedirect[prop]) handleProp = propsRedirect[prop];
        let handleFun = this.getHandlerFun(handleProp);
        if (!handleFun) return;

        // watch props
        const unwatch = this.$watch(prop, nv => {
          handleFun.call(this.$amapComponent, this.convertSignalProp(prop, nv));
        });

        // collect watchers for destroyed
        this.unwatchFns.push(unwatch);
      });
    },

    registerToManager() {
      let manager = this.amapManager || this.$parent.amapManager;
      if (manager && this.vid !== undefined) {
        manager.setComponent(this.vid, this.$amapComponent);
      }
    },

    // some prop can not init by initial created methods
    initProps() {
      const props = ['editable', 'visible'];

      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerFun(propStr);
          handleFun && handleFun.call(this.$amapComponent, this.convertSignalProp(propStr, this[propStr]));
        }
      });

      // this.printReactiveProp();
    },

    /**
     * methods for developing
     * find reactive props
     */
    printReactiveProp() {
      Object.keys(this._props).forEach(k => {
        let fn = this.$amapComponent[`set${upperCamelCase(k)}`];
        if (fn) {
          console.log(k);
        }
      });
    },

    register() {
      const res = this.__initComponent && this.__initComponent(this.convertProps());
      if (res && res.then) res.then((instance) => this.registerRest(instance)); // promise
      else this.registerRest(res);
    },

    registerRest(instance) {
      if (!this.$amapComponent && instance) this.$amapComponent = instance;
      this.registerEvents();
      this.initProps();
      this.setPropWatchers();
      this.registerToManager();
      if (this.$listeners.init) {
        this.$emit('init', this.$amapComponent);
      }
    },

    // helper method
    $$getInstance() {
      return this.$amapComponent;
    },
    destroyComponent() {
      this.$amapComponent.setMap && this.$amapComponent.setMap(null);
      this.$amapComponent.close && this.$amapComponent.close();
      this.$amapComponent.editor && this.$amapComponent.editor.close();
    }
  }
};
