<template>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import locaMixin from '@/mixins/loca-component';

export default {
  name: 'el-amap-loca-icon',
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
      this.$amapComponent = new Loca.IconLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        unit: 'px',
        icon: '',
        iconSize: [20, 20],
        rotation: 0,
        opacity: 1
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        unit: style.unit,
        icon: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.icon === undefined ? style.icon : feature.properties.icon;
        },
        iconSize: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.iconSize === undefined ? style.iconSize : feature.properties.iconSize;
        },
        rotation: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
        },
        opacity: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.opacity === undefined ? style.opacity : feature.properties.opacity;
        }
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }

  }
};
</script>
