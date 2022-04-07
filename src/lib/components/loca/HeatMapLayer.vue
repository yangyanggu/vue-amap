<template>
</template>
<script>
import registerMixin from '../../mixins/register-component';
import locaMixin from '../../mixins/loca-component';

export default {
  name: 'el-amap-loca-heatmap',
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
      this.$parentComponent = this.locaInstance.$amapComponent;
      this.$amapComponent = new Loca.HeatMapLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        radius: 20,
        value: 10,
        gradient: {0.5: 'blue', 0.65: 'rgb(117,211,248)', 0.7: 'rgb(0, 255, 0)', 0.9: '#ffea00', 1.0: 'red'},
        opacity: [0, 1],
        height: 100,
        heightBezier: [0.4, 0.2, 0.4, 0.8],
        max: null,
        min: null,
        unit: 'px',
        difference: false
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        radius: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.radius === undefined ? style.radius : feature.properties.radius;
        },
        value: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.value === undefined ? style.value : feature.properties.value;
        },
        gradient: style.gradient,
        opacity: style.opacity,
        height: style.height,
        heightBezier: style.heightBezier,
        max: style.max,
        min: style.min,
        unit: style.unit,
        difference: style.difference
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
