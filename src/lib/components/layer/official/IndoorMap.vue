<template></template>
<script>
import registerMixin from '../../../mixins/register-component';
import {isIndoorMapInstance} from '@/utils/util';

export default {
  name: 'el-amap-layer-indoor-map',
  mixins: [registerMixin],
  props: {
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
    cursor: {
      type: String
    }, // 指定鼠标悬停到店铺面时的鼠标样式
    hideFloorBar: {
      type: Boolean
    }// 是否隐藏楼层切换控件，默认值：false
  },
  data() {
    return {
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        zIndex(value) {
          this.setzIndex(value);
        },
        hideFloorBar(flag) {
          flag === false ? this.hideFloorBar() : this.showFloorBar();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise((resolve) => {
        AMap.plugin(['AMap.IndoorMap'], () => {
          this.$amapComponent = new AMap.IndoorMap(options);
          let layers = this.$parentComponent.getLayers();
          layers.push(this.$amapComponent);
          this.$parentComponent.setLayers(layers);
          resolve();
        });
      });
    },
    destroyComponent() {
      let layers = this.$parentComponent.getLayers();
      let index = -1;
      for (let i = 0;i < layers.length;i++) {
        if (isIndoorMapInstance(layers[i])) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        layers.splice(index, 1);
        this.$parentComponent.setLayers(layers);
      }
      this.$amapComponent = null;
    }
  }
};
</script>
