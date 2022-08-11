<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import locaMixin from '../../mixins/loca-component';

export default {
  name: 'el-amap-loca-laser',
  mixins: [registerMixin, locaMixin],
  props: {
    depth: {
      type: Boolean,
      default: true
    } // 是否开启深度检测，开启后可能会影响zIndex
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
      this.$amapComponent = new Loca.LaserLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      console.log('this.$amapComponent: ', this.$amapComponent)
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        unit: 'px',
        height: 200,
        color: 'rgba(255,255,0,0.5)',
        lineWidth: 2,
        angle: 0,
        trailLength: 30,
        fadeOpacity: 0.2,
        duration: 2000,
        interval: 0,
        delay: 0,
        repeat: Infinity
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        unit: 'px',
        height: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.height === undefined ? style.height : feature.properties.height;
        },
        color: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.color === undefined ? style.color : feature.properties.color;
        },
        angle: 0,
        lineWidth: 2,
        trailLength: 30,
        fadeOpacity: 0.2,
        duration: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.duration === undefined ? style.duration : feature.properties.duration;
        },
        interval: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.interval === undefined ? style.interval : feature.properties.interval;
        },
        delay: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.delay === undefined ? style.delay : feature.properties.delay;
        },
        repeat: Infinity
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
