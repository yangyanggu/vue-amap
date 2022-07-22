<template>
  <video style="display: none;" muted ref="video">
  </video>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import registerMixin from '../../../../mixins/register-component';

export default defineComponent({
  name: 'ElAmapLayerVideo',
  mixins: [registerMixin],
  props: {
    url: {
      required: true,
      type: String
    }, // 视频地址
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
      },
      canvas: null as HTMLCanvasElement | null,
      video: null as HTMLElement | null,
      context: null as CanvasRenderingContext2D | null
    };
  },
  methods: {
    __initComponent(options) {
      return new Promise<void>((resolve) => {
        let canvas = document.createElement('canvas');
        let video = this.$refs.video as HTMLVideoElement;
        video.src = options.url;
        video.load()
        video.loop = true;
        video.addEventListener('canplay', () => {
          video.play();
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          options.canvas = canvas;
          this.context = canvas.getContext('2d');
          this.canvas = canvas;
          this.video = video;
          console.log('options: ', options)
          this.$amapComponent = new AMap.CanvasLayer(options);
          this.$parentComponent.addLayer(this.$amapComponent);
          this.__render();
          resolve()
        })
      })
    },
    __render(){
      window.requestAnimationFrame(this.__render)
      this.context?.clearRect(0, 0,this.canvas?.width as number, this.canvas?.height as number)
      this.context?.drawImage(this.video as any, 0, 0, this.canvas?.width as number, this.canvas?.height as number)  //绘制视频
    },
    destroyComponent() {
      this.context = null;
      this.canvas = null;
      this.video = null;
      this.$parentComponent.removeLayer(this.$amapComponent);
      this.$amapComponent = null;
      this.$parentComponent = null;
    }
  },
  render(){
    return null;
  }
});
</script>
