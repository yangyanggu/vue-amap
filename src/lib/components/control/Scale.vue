<template></template>
<script>
import registerMixin from '../../mixins/register-component';

export default {
  name: 'el-amap-control-scale',
  mixins: [registerMixin],
  props: {
    position: {
      type: [String, Array]
    }, // 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
    visible: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Array
    }// 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
  },
  data() {
    return {
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$parentComponent.plugin(['AMap.Scale'], () => {
        this.$amapComponent = new AMap.Scale(options);
        this.$amapComponent.addTo(this.$parentComponent);
      });
    },
    destroyComponent() {
      if (this.$amapComponent && this.$parentComponent) {
        this.$amapComponent.removeFrom(this.$parentComponent);
      }
    }
  }
};
</script>
