<template></template>
<script>
import registerMixin from '../../../mixins/register-component';

export default {
  name: 'el-amap-layer-traffic',
  mixins: [registerMixin],
  props: {
    autoRefresh: {
      type: Boolean
    }, // 是否自动更新数据，默认开启
    interval: {
      type: Number
    }, // 自动更新数据的间隔毫秒数，默认 180ms
    zooms: {
      type: Array
    }, // 支持的缩放级别范围，默认范围 [2-30]
    opacity: {
      type: Number
    }, // 透明度，默认 1
    tileSize: {
      type: Number
    }// 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
  },
  data() {
    return {
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.TileLayer.Traffic(options);
      this.$parentComponent.addLayer(this.$amapComponent);
    },
    stopFresh() {
      if (this.$amapComponent) {
        this.$amapComponent.stopFresh();
      }
    },
    destroyComponent() {
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
    }
  }
};
</script>
