import {defineComponent} from "vue";
import upperCamelCase from 'uppercamelcase';
import eventHelper from '../utils/event-helper';
import {convertEventToLowerCase, eventReg} from "../utils/util";
import type {WatchStopHandle, ComponentPublicInstance} from "vue";

export default defineComponent({
  inject: {
    parentInstance: {
      default: null
    }
  },
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: true
    }, // 是否显示，默认 true
    zIndex: {
      type: Number
    }
  },
  emits: ['init'],
  data() {
    return {
      needInitComponents: [] as (ComponentPublicInstance & customComponent)[],
      unwatchFns: [] as WatchStopHandle[],
      propsRedirect: {},
      converters: {},
    };
  },
  created() {
    this.$amapComponent = null as any;
    this.$parentComponent = null as any;
  },
  mounted() {
    if (this.parentInstance) {
      if (this.parentInstance.$amapComponent) {
        this.register();
      } else {
        this.parentInstance.addChildComponent(this);
      }
    }
  },

  unmounted() {
    if (!this.$amapComponent) return;
    this.unregisterEvents();
    this.unwatchFns.forEach(item => item());
    this.unwatchFns = [];
    this.destroyComponent();
  },

  methods: {
    getHandlerFun(prop) {
      if (this[`__${prop}`]) {
        return this[`__${prop}`];
      }
      if(!this.$amapComponent){
        return null;
      }
      return this.$amapComponent[`set${upperCamelCase(prop)}`];
    },

    convertProps() {
      const props = {};
      const {$props, propsRedirect} = this;
      return Object.keys($props).reduce((res, _key) => {
        let key = _key;
        const propsValue = this.convertSignalProp(key, $props[key]);
        if (propsValue === undefined) return res;
        if (propsRedirect && propsRedirect[_key]) key = propsRedirect[key];
        props[key] = propsValue;
        return res;
      }, props);
    },

    convertSignalProp(key, sourceData) {
      if (this.converters && this.converters[key]) {
        return this.converters[key].call(this, sourceData);
      }
      return sourceData;
    },

    registerEvents() {
      const $props = this.$attrs;
      Object.keys($props).forEach(key => {
        if(eventReg.test(key)){
          const eventKey = convertEventToLowerCase(key);
          eventHelper.addListener(this.$amapComponent, eventKey, $props[key]);
        }
      });
    },

    unregisterEvents() {
      const $props = this.$attrs;
      Object.keys($props).forEach(key => {
        if(eventReg.test(key)){
          const eventKey = convertEventToLowerCase(key);
          eventHelper.removeListener(this.$amapComponent, eventKey, $props[key]);
        }
      });
    },

    setPropWatchers() {
      const {propsRedirect, $props} = this;

      Object.keys($props).forEach(prop => {
        let handleProp = prop;
        if (propsRedirect && propsRedirect[prop]) handleProp = propsRedirect[prop];
        const handleFun = this.getHandlerFun(handleProp);
        if (!handleFun) return;
        const watchOptions = {
          deep: false
        };
        const propValueType = Object.prototype.toString.call($props[prop]);
        if ( propValueType === '[object Object]' || propValueType === '[object Array]') {
          watchOptions.deep = true;
        }
        // watch props
        const unwatch = this.$watch(prop, nv => {
          handleFun.call(this.$amapComponent, this.convertSignalProp(prop, nv));
        }, watchOptions);

        // collect watchers for destroyed
        this.unwatchFns.push(unwatch);
      });
    },

    // some prop can not init by initial created methods
    initProps() {
      const props = ['editable', 'visible', 'zooms'];

      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerFun(propStr);
          handleFun && handleFun.call(this.$amapComponent, this.convertSignalProp(propStr, this[propStr]));
        }
      });

      // this.printReactiveProp();
    },

    lazyRegister(){
      const $parent = this.parentInstance as (ComponentPublicInstance & customComponent);
      if($parent && $parent.addChildComponent){
        $parent.addChildComponent(this);
      }
    },
    addChildComponent(component : ComponentPublicInstance & customComponent){
      this.needInitComponents.push(component);
    },
    createChildren(){
      while (this.needInitComponents.length > 0){
        this.needInitComponents[0].register();
        this.needInitComponents.splice(0, 1);
      }
    },
    register() {
      if(this.parentInstance && !this.$parentComponent){
        this.$parentComponent = this.parentInstance.$amapComponent;
      }
      const res = this['__initComponent'] && this['__initComponent'](this.convertProps());
      if (res && res.then) res.then((instance) => this.registerRest(instance)); // promise
      else this.registerRest(res);
    },

    registerRest(instance) {
      if (!this.$amapComponent && instance) this.$amapComponent = instance;
      this.registerEvents();
      this.initProps();
      this.setPropWatchers();
      this.$emit('init', this.$amapComponent, this);
      this.$nextTick(() => {
        this.createChildren();
      });
    },

    // helper method
    $$getInstance() {
      return this.$amapComponent;
    },
    destroyComponent() {
      this.$amapComponent.setMap && this.$amapComponent.setMap(null);
      this.$amapComponent.close && this.$amapComponent.close();
      this.$amapComponent.editor && this.$amapComponent.editor.close();
    },
    __visible(flag){
      if(!!this.$amapComponent && !!this.$amapComponent.show && !!this.$amapComponent.hide){
        flag === false ? this.$amapComponent.hide() : this.$amapComponent.show();
      }
    },
    __zIndex(value){
      if (this.$amapComponent && this.$amapComponent.setzIndex) {
        this.$amapComponent.setzIndex(value);
      }
    }
  }
});
