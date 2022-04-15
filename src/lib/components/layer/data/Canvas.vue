<template></template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-canvas',
  mixins: [registerMixin],
  props: {
    canvas: {
      required: true
    }, // Canvas DOM 对象
    zoom: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    bounds: {
      type: [Array, Object]
    }, // 图片的范围大小经纬度，如果传递数字数组类型: [minlng,minlat,maxlng,maxlat] 或 AMap.Bounds
    opacity: {
      type: Number
    } // 透明度，默认 1
  },
  data() {
    return {
      handlers: {
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$parentComponent = this.parentInstance.$amapComponent;
      this.$amapComponent = new AMap.CanvasLayer(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    destroyComponent() {
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
