<template>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import locaMixin from '@/mixins/loca-component';

export default {
  name: 'el-amap-loca-pulse-link',
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
      this.$amapComponent = new Loca.PulseLinkLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        lineColors: ['#fff'],
        height: 100,
        maxHeightScale: 0,
        smoothSteps: 50,
        lineWidth: [1, 1],
        unit: 'px',
        dash: [4000, 0, 4000, 0],
        speed: 100,
        headColor: 'rgba(0, 0, 0, 0.75)',
        trailColor: 'rgba(0, 0, 0, 0.25)',
        flowLength: 100
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        lineColors: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.lineColors === undefined ? style.lineColors : feature.properties.lineColors;
        },
        height: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.height === undefined ? style.height : feature.properties.height;
        },
        maxHeightScale: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.maxHeightScale === undefined ? style.maxHeightScale : feature.properties.maxHeightScale;
        },
        smoothSteps: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.smoothSteps === undefined ? style.smoothSteps : feature.properties.smoothSteps;
        },
        lineWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
        },
        unit: style.unit,
        dash: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.dash === undefined ? style.dash : feature.properties.dash;
        },
        speed: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.speed === undefined ? style.speed : feature.properties.speed;
        },
        headColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.headColor === undefined ? style.headColor : feature.properties.headColor;
        },
        trailColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.trailColor === undefined ? style.trailColor : feature.properties.trailColor;
        },
        flowLength: style.flowLength
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
