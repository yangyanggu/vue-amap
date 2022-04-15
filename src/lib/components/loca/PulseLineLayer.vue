<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import locaMixin from '../../mixins/loca-component';

export default {
  name: 'el-amap-loca-pulse-line',
  mixins: [registerMixin, locaMixin],
  props: {
    depth: {
      type: Boolean
    }
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
      this.$parentComponent = this.parentInstance.$amapComponent;
      this.$amapComponent = new Loca.PulseLineLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        lineWidth: 1,
        headColor: 'rgba(0, 0, 0, 0.75)',
        trailColor: 'rgba(0, 0, 0, 0.25)',
        altitude: 0,
        interval: 1,
        duration: 2000
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        lineWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
        },
        headColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.headColor === undefined ? style.headColor : feature.properties.headColor;
        },
        trailColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.trailColor === undefined ? style.trailColor : feature.properties.trailColor;
        },
        altitude: style.altitude,
        interval: style.interval,
        duration: style.duration
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
