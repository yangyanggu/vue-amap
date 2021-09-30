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
    zooms: {
      type: Array
    },
    opacity: {
      type: Number
    }
  },
  data() {
    const _this = this;
    return {
      handlers: {
        layerStyle(style) {
          this.setStyle(style);
        },
        sourceUrl() {
          _this.setSource();
        },
        sourceData() {
          _this.setSource();
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
    destroyComponent() {
      this.$parentComponent.remove(this.$amapComponent);
      if (this.source) {
        this.source.destroy();
        this.source = null;
      }
      this.$amapComponent.destroy();
      this.$amapComponent = null;
    }
  }
};
