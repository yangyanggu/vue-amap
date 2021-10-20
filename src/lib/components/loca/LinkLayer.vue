<template>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import locaMixin from '@/mixins/loca-component';

export default {
  name: 'el-amap-loca-link',
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
      this.$amapComponent = new Loca.LinkLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        lineColors: ['rgba(255,255,255,1)', 'rgba(255,255,255,0)'],
        height: 100,
        smoothSteps: 100
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
        smoothSteps: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.smoothSteps === undefined ? style.smoothSteps : feature.properties.smoothSteps;
        }
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
