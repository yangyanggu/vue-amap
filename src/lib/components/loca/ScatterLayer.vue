<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import locaMixin from '../../mixins/loca-component';

export default {
  name: 'el-amap-loca-scatter',
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
      this.$amapComponent = new Loca.ScatterLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        size: [20, 20],
        rotation: 0,
        color: 'rgba(200,200,200,1)',
        altitude: 0,
        borderWidth: 0,
        borderColor: 'rgba(250,250,250,1)',
        texture: null,
        unit: 'px',
        animate: false,
        duration: 0
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        size: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.size === undefined ? style.size : feature.properties.size;
        },
        rotation: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
        },
        color: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.color === undefined ? style.color : feature.properties.color;
        },
        altitude: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.altitude === undefined ? style.altitude : feature.properties.altitude;
        },
        borderWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.borderWidth === undefined ? style.borderWidth : feature.properties.borderWidth;
        },
        borderColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.borderColor === undefined ? style.borderColor : feature.properties.borderColor;
        },
        texture: style.texture,
        unit: style.unit,
        animate: style.animate,
        duration: style.duration
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
