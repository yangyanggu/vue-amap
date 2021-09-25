<template></template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-mapbox-vector-tile',
  mixins: [registerMixin],
  props: {
    url: {
      type: String
    }, // MVT 数据的链接地址
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2,22]
    dataZooms: {
      type: Array
    }, // 瓦片数据等级范围，超过范围会使用最大/最小等级的数据，默认 [2,18]
    visible: {
      type: Boolean,
      default: true
    }, // 是否显示，默认 true
    opacity: {
      type: Number
    }, // 透明度，默认 1
    zIndex: {
      type: Number
    }, // 图层的层级。默认 zIndex：80
    styles: {
      type: Object
    } // 样式
  },
  data() {
    return {
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        zIndex(value) {
          this.setzIndex(value);
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise((resolve) => {
        AMap.plugin(['AMap.MapboxVectorTileLayer'], () => {
          this.$amapComponent = new AMap.MapboxVectorTileLayer(options);
          this.$parentComponent.addLayer(this.$amapComponent);
          resolve();
        });
      });

    },
    destroyComponent() {
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
