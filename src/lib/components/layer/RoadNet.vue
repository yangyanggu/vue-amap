<template></template>
<script>
import registerMixin from '../../mixins/register-component';

export default {
  name: 'el-amap-layer-road-net',
  mixins: [registerMixin],
  props: {
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    visible: {
      type: Boolean,
      default: true
    }, // 是否显示，默认 true
    opacity: {
      type: Number
    }, // 透明度，默认 1
    zIndex: {
      type: Number
    }, // 图层叠加的顺序值，1 表示最底层。默认 zIndex：4
    tileSize: {
      type: Number
    }// 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
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
      this.$amapComponent = new AMap.TileLayer.RoadNet(options);
      this.$parentComponent.add(this.$amapComponent);
    },
    destroyComponent() {
      this.$amapComponent.destroy();
      this.$parentComponent.remove(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
