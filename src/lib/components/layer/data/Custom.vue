<template></template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-custom',
  mixins: [registerMixin],
  props: {
    canvas: {
      required: true
    }, // canvas 对象
    render: {
      type: Function
    }, // 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2, 20]
    opacity: {
      type: Number
    }, // 透明度，默认 1
    alwaysRender: {
      type: Boolean
    }// 是否主动
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      let canvas = options.canvas;
      delete options.canvas;
      this.$amapComponent = new AMap.CustomLayer(canvas, options);
      this.$amapComponent.setMap(this.$parentComponent);
    },
    destroyComponent() {
      this.$amapComponent.setMap(null);
      this.$amapComponent = null;
    }
  }
};
</script>
