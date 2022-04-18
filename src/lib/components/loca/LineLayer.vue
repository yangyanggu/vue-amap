<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import locaMixin from '../../mixins/loca-component';

export default {
  name: 'el-amap-loca-line',
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
      this.$amapComponent = new Loca.LineLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        color: '#fff',
        lineWidth: 2,
        altitude: 0,
        borderWidth: 0,
        borderColor: '#fff',
        dashArray: [10, 0, 10, 0]
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        color: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.color === undefined ? style.color : feature.properties.color;
        },
        lineWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
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
        dashArray: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.dashArray === undefined ? style.dashArray : feature.properties.dashArray;
        }
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
