import {defineComponent} from "vue";

export default defineComponent({
  props: {
    sourceUrl: {
      type: String
    },
    sourceData: {
      type: Object
    },
    geoBufferSource: {
      type: [ArrayBuffer, String],
      default() {
        return null;
      }
    },
    layerStyle: {
      type: Object
    },
    defaultStyleValue: {
      type: Object,
      default() {
        return {};
      }
    },
    zooms: {
      type: Array
    },
    opacity: {
      type: Number
    },
    initEvents: {
      type: Boolean,
      default: true
    },
    visibleDuration: {
      type: Number,
      default: 0
    }
  },
  emits: ['mousemove', 'click'],
  data() {
    return {
    };
  },
  methods: {
    setSource() {
      if (this.source) {
        this.source.destroy();
        this.source = null;
      }
      if (this['geoBufferSource']) {
        if(typeof this['geoBufferSource'] === 'string'){
          this.source = new Loca.GeoBufferSource({
            url: this['geoBufferSource']
          });
        }else{
          this.source = new Loca.GeoBufferSource({
            data: this['geoBufferSource']
          });
        }
      }else if (this['sourceUrl']) {
        this.source = new Loca.GeoJSONSource({
          url: this['sourceUrl']
        });
      } else if (this['sourceData']) {
        this.source = new Loca.GeoJSONSource({
          data: this['sourceData']
        });
      } else {
        this.source = new Loca.GeoJSONSource({
        });
      }
      this.$amapComponent.setSource(this.source);
    },
    initComplete() {
      if (this['initEvents']) {
        this.bindEvents();
      }
    },
    destroyComponent() {
      this.unBindEvents();
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.remove(this.$amapComponent);
        this.$amapComponent.destroy();
      }
      if (this.source) {
        this.source.destroy();
        this.source = null;
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    bindEvents() {
      if(this.parentInstance){
        const map = this.parentInstance.getMap();
        map.on('click', this.clickMap);
        map.on('mousemove', this.mouseMoveMap);
      }
    },
    clickMap(e) {
      const feature = this['$amapComponent'].queryFeature(e.pixel.toArray());
      this.$emit('click', feature, e);
    },
    mouseMoveMap(e) {
      const feature = this['$amapComponent'].queryFeature(e.pixel.toArray());
      this.$emit('mousemove', feature, e);
    },
    unBindEvents() {
      if(this.parentInstance){
        const map = this.parentInstance.getMap();
        map.off('click', this.clickMap);
        map.off('mousemove', this.mouseMoveMap);
      }
    },
    __layerStyle(style) {
      this.$nextTick(() => {
        if (this['$amapComponent'].setStyle) {
          this['$amapComponent'].setStyle();
        } else {
          this['$amapComponent'].setStyle(style);
        }
      });
    },
    __sourceUrl(){
      this.$nextTick(() => {
        this.setSource();
      });
    },
    __sourceData(){
      this.$nextTick(() => {
        this.setSource();
      });
    },
    __geoBufferSource(){
      this.$nextTick(() => {
        this.setSource();
      });
    },
    __visible(flag) {
      if (this.$amapComponent.show && this.$amapComponent.hide) {
        flag === false ? this.$amapComponent.hide(this['visibleDuration']) : this.$amapComponent.show(this['visibleDuration']);
      }
    }
  }
});
