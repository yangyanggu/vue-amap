<template>
  <video
    ref="video"
    style="display: none;"
    muted
  />
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap';
import VideoLayer from './VideoLayer';

export default defineComponent({
  name: 'ElAmapLayerVideo',
  mixins: [registerMixin],
  props: {
    url: {
      required: true,
      type: String
    }, // 视频地址
    zooms: {
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
      handlers: {}
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new VideoLayer(options, this.$refs.video as HTMLVideoElement);
      this.$parentComponent.addLayer(this.$amapComponent.getLayer());
    },
    destroyComponent() {
      this.$amapComponent.destroy();
      if(!this.parentInstance.isDestroy){
        this.$parentComponent.removeLayer(this.$amapComponent);
      }
      this.$amapComponent = null;
      this.$parentComponent = null;
    },
    $$play() {
      this.$amapComponent.play();
    },
    $$pause() {
      this.$amapComponent.pause();
    }
  },
  render() {
    return null;
  }
});
</script>
