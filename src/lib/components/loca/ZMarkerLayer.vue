<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import locaMixin from '../../mixins/loca-component';

export default {
  name: 'el-amap-loca-z-marker',
  mixins: [registerMixin, locaMixin],
  props: {
  },
  data() {
    return {
      converters: {},
      handlers: {
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new Loca.ZMarkerLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        unit: 'px',
        content: '',
        size: [20, 20],
        rotation: 0,
        alwaysFront: false,
        altitude: 0
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        unit: style.unit,
        content: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.content === undefined ? style.content : feature.properties.content;
        },
        size: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.size === undefined ? style.size : feature.properties.size;
        },
        rotation: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
        },
        alwaysFront: style.alwaysFront,
        altitude: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.altitude === undefined ? style.altitude : feature.properties.altitude ;
        }
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }

  }
};
</script>
