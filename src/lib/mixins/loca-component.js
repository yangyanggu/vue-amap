export default {
  props: {
    sourceUrl: {
      type: String
    },
    sourceData: {
      type: Object
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
  data() {
    const _this = this;
    return {
      handlers: {
        layerStyle(style) {
          _this.$nextTick(() => {
            if (_this.setStyle) {
              _this.setStyle();
            } else {
              this.setStyle(style);
            }
          });
        },
        sourceUrl() {
          _this.$nextTick(() => {
            _this.setSource();
          });
        },
        sourceData() {
          _this.$nextTick(() => {
            _this.setSource();
          });
        },
        visible(flag) {
          if (this.show && this.hide) {
            flag === false ? this.hide(_this.visibleDuration) : this.show(_this.visibleDuration);
          }
        }
      }
    };
  },
  methods: {
    setSource() {
      if (this.source) {
        this.source.destroy();
        this.source = null;
      }
      if (this.sourceUrl) {
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
      this.$parentComponent.remove(this.$amapComponent);
      if (this.source) {
        this.source.destroy();
        this.source = null;
      }
      this.$amapComponent.destroy();
      this.$amapComponent = null;
    },
    bindEvents() {
      let map = this.$parent.getMap();
      map.on('click', this.clickMap);
      map.on('mousemove', this.mouseMoveMap);
    },
    clickMap(e) {
      let feature = this.$amapComponent.queryFeature(e.pixel.toArray());
      this.$emit('click', feature, e);
    },
    mouseMoveMap(e) {
      let feature = this.$amapComponent.queryFeature(e.pixel.toArray());
      this.$emit('mousemove', feature, e);
    },
    unBindEvents() {
      let map = this.$parent.getMap();
      map.off('click', this.clickMap);
      map.off('mousemove', this.mouseMoveMap);
    }
  }
};
