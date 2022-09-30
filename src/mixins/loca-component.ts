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
    },
    onClick: {
      type: Function,
      default: null
    },
    onMousemove: {
      type: Function,
      default: null
    },
    onRightclick: {
      type: Function,
      default: null
    }
  },
  emits: ['mousemove', 'click', 'rightclick' ],
  data() {
    return {
      isDragging: false,
      isRotating: false
    };
  },
  methods: {
    setSource() {
      if (this.source) {
        this.source.destroy();
        this.source = null;
      }
      if (this.geoBufferSource) {
        if(typeof this.geoBufferSource === 'string'){
          this.source = new Loca.GeoBufferSource({
            url: this.geoBufferSource
          });
        }else{
          this.source = new Loca.GeoBufferSource({
            data: this.geoBufferSource
          });
        }
      }else if (this.sourceUrl) {
        this.source = new Loca.GeoJSONSource({
          url: this.sourceUrl
        });
      } else if (this.sourceData) {
        this.source = new Loca.GeoJSONSource({
          data: this.sourceData
        });
      } else {
        this.source = new Loca.GeoJSONSource({
        });
      }
      this.$amapComponent.setSource(this.source);
    },
    initComplete() {
      if (this.initEvents) {
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
        const $props = this.$props;
        if($props.onClick !== null){
          map.on('click', this.clickMap);
        }
        if($props.onMousemove !== null){
          map.on('mousemove', this.mouseMoveMap);
          map.on('dragstart', this.dragStart);
          map.on('dragend', this.dragEnd);
          map.on('rotatestart', this.rotateStart);
          map.on('rotateend', this.rotateEnd);
          map.on('mouseout', this.mouseoutMap)
        }
        if($props.onRightclick !== null){
          map.on('rightclick', this.rightclickMap);
        }
      }
    },
    clickMap(e) {
      const feature = this._getFeature(e);
      this.$emit('click', feature, e);
    },
    rightclickMap(e) {
      const feature = this._getFeature(e);
      this.$emit('rightclick', feature, e);
    },
    mouseMoveMap(e) {
      if(this.isDragging || this.isRotating){
        return;
      }
      const feature = this._getFeature(e);
      this.$emit('mousemove', feature, e);
    },
    _getFeature(e){
      return this.$amapComponent.queryFeature(e.pixel.toArray());
    },
    dragStart(){
      this.isDragging = true
    },
    dragEnd(){
      this.isDragging = false
    },
    mouseoutMap(){
      this.isDragging = false;
      this.isRotating = false;
    },
    rotateStart(){
      this.isRotating = true;
    },
    rotateEnd(){
      this.isRotating = false;
    },
    unBindEvents() {
      if(this.parentInstance){
        const map = this.parentInstance.getMap();
        map.off('click', this.clickMap);
        map.off('rightclick', this.rightclickMap);
        map.off('mousemove', this.mouseMoveMap);
        map.off('dragstart', this.dragStart);
        map.off('dragend', this.dragEnd);
        map.off('rotatestart', this.rotateStart);
        map.off('rotateend', this.rotateEnd);
        map.off('mouseout', this.mouseoutMap)
      }
    },
    __layerStyle(style) {
      this.$nextTick(() => {
        if (this.$amapComponent.setStyle) {
          this.$amapComponent.setStyle(style);
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
        flag === false ? this.$amapComponent.hide(this.visibleDuration) : this.$amapComponent.show(this.visibleDuration);
      }
    }
  }
});
