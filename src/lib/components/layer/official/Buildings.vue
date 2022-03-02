<template></template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-buildings',
  mixins: [registerMixin],
  props: {
    wallColor: {
      type: [String, Array]
    }, // 楼块侧面颜色，支持 rgba、rgb、十六进制等
    roofColor: {
      type: [String, Array]
    }, // 楼块顶面颜色，支持 rgba、rgb、十六进制等
    heightFactor: {
      type: Number
    }, // 楼块的高度系数因子，默认为 1，也就是正常高度
    styleOpts: {
      type: Object
    }, // 楼块的围栏和样式设置
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    opacity: {
      type: Number
    } // 透明度，默认 1
  },
  data() {
    return {
      handlers: {
        styleOpts(value) {
          this.setStyle(value);
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.Buildings(options);
      this.$parentComponent.addLayer(this.$amapComponent);
      if (this.styleOpts) {
        this.$amapComponent.setStyle(this.styleOpts);
      }
    },
    destroyComponent() {
      this.$amapComponent.destroy();
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
