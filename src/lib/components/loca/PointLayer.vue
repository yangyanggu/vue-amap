<template>
</template>
<script>
import registerMixin from '@/mixins/register-component';
import locaMixin from '@/mixins/loca-component';

export default {
  name: 'el-amap-loca-point',
  mixins: [registerMixin, locaMixin],
  props: {
    blend: {
      type: String
    } // 图层里面元素的叠加效果，normal：正常透明度叠加，lighter：叠加后可能更加明亮
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
      this.$amapComponent = new Loca.PointLayer(options);
      this.setSource();
      this.setStyle();
      this.$parentComponent.add(this.$amapComponent);
      this.initComplete();
    },
    setStyle() {
      let defaultStyleValue = {
        radius: 20,
        color: '#fff',
        unit: 'px',
        borderWidth: 10,
        borderColor: '#fff',
        blurWidth: -1
      };
      let style = Object.assign({}, defaultStyleValue, this.defaultStyleValue);
      let defaultLayerStyle = {
        radius: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.radius === undefined ? style.radius : feature.properties.radius;
        },
        color: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.color === undefined ? style.color : feature.properties.color;
        },
        unit: style.unit,
        borderWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.borderWidth === undefined ? style.borderWidth : feature.properties.borderWidth;
        },
        borderColor: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.borderColor === undefined ? style.borderColor : feature.properties.borderColor;
        },
        blurWidth: (index, feature) => {
          feature.properties = feature.properties || {};
          return feature.properties.blurWidth === undefined ? style.blurWidth : feature.properties.blurWidth;
        }
      };
      let layerStyle = Object.assign({}, defaultLayerStyle, this.layerStyle);
      this.$amapComponent.setStyle(layerStyle);
    }
  }
};
</script>
