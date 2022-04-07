<template></template>
<script>
import registerMixin from '../../mixins/register-component';

export default {
  name: 'el-amap-control-hawk-eye',
  mixins: [registerMixin],
  props: {
    autoMove: {
      type: Boolean
    }, // 是否随主图视口变化移动
    showRectangle: {
      type: Boolean
    }, // 是否显示视口矩形
    showButton: {
      type: Boolean
    }, // 是否显示打开关闭的按钮
    isOpen: {
      type: Boolean
    }, // 默认是否展开
    mapStyle: {
      type: String
    }, // 缩略图要显示的地图自定义样式，如'amap://styles/dark'
    layers: {
      type: Array
    }, // 缩略图要显示的图层类型，默认为普通矢量地图
    width: {
      type: String
    }, // 缩略图的宽度，同CSS，如'200px'
    height: {
      type: String
    }, // 缩略图的高度，同CSS，如'200px'
    offset: {
      type: Array
    }, // 缩略图距离地图右下角的像素距离，如 [2,2]
    borderStyle: {
      type: String
    }, // 缩略图的边框样式，同CSS，如"double solid solid double"
    borderColor: {
      type: String
    }, // 缩略图的边框颜色，同CSS，如'silver'
    borderRadius: {
      type: String
    }, // 缩略图的边框角度，同CSS，如'5px'
    borderWidth: {
      type: String
    }, // 缩略图的边框宽度，同CSS，如'2px'
    buttonSize: {
      type: String
    } // 箭头按钮的像素尺寸，同CSS，如'12px'
  },
  data() {
    return {
      converters: {
        isOpen(flag) {
          flag === false ? this.close() : this.open();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise((resolve) => {
        this.$parentComponent = this.mapInstance.$amapComponent;
        this.$parentComponent.plugin(['AMap.HawkEye'], () => {
          this.$amapComponent = new AMap.HawkEye(options);
          this.$amapComponent.addTo(this.$parentComponent);
          resolve();
        });

      });
    },
    destroyComponent() {
      if (this.$amapComponent && this.$parentComponent) {
        this.$amapComponent.remove();
      }
    }
  }
};
</script>
