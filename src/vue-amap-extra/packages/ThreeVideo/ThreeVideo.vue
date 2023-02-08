<template>
  <video
    ref="video"
    style="display: none;"
    muted
    loop
    autoplay
    crossOrigin="anonymous"
  >
    <source
      v-for="item in videoUrlList"
      :key="item"
      :src="item"
      type="video/mp4"
    >
  </video>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {registerMixin} from '@vuemap/vue-amap-util';
import ThreeVideo from "./ThreeVideo";
import type {Vec} from "./Type";
import type{PropType} from "vue";

export default defineComponent({
  name: 'ElAmapThreeVideo',
  mixins: [registerMixin],
  props: {
    video: {
      type: [String, Array, HTMLVideoElement],
      required: true
    },
    videoTranslate: {
      type: Object as PropType<Vec>,
      default(){
        return {
          x:0,
          y:0,
          z:0
        }
      }
    },
    videoWidth: {
      type: Number
    }, // 视频宽度
    videoHeight: {
      type: Number
    }, // 视频高度
    canvas: {
      type: Object as PropType<HTMLCanvasElement>
    },
    position: {
      type: Array as PropType<number[]>,
      required: true
    },
    altitude: {
      type: Number,
      default: 0
    },
    rotation: {
      type: Object as PropType<Vec>
    },
    scale: {
      type: [Number, Array],
      default: 1
    },
    angle: {
      type: Number,
      default: 0
    },
    opacity: {
      type: Number,
      default: 1
    }, // 透明度，默认 1
    alwaysFront: {
      type: Boolean,
      default: false
    } //是否一直面朝屏幕
  },
  emits: ['click', 'mousemove', 'mouseover', 'mouseout'],
  data() {
    return {
      videoUrlList: [] as string[]
    };
  },
  methods: {
    __initComponent(options) {
      const urlType = Object.prototype.toString.call(options.video);
      if(urlType === '[object String]'){
        this.videoUrlList = [options.video as string];
      }else if(urlType === '[object Array]'){
        this.videoUrlList = options.video;
      }
      if(this.videoUrlList.length > 0){
        options.video = this.$refs.video
      }
      this.$amapComponent = new ThreeVideo(this.$parentComponent);
      return new Promise<void>((resolve) => {
        this.$nextTick(() => {
          this.$amapComponent.init(options, this).then(() => {
            resolve()
          });
        })

      })
    },
    destroyComponent() {
      if(!this.parentInstance.isDestroy){
        this.$amapComponent.remove();
      }
      this.$amapComponent.destroy()
    },
    $$start() {
      this.$amapComponent.start();
    },
    $$pause() {
      this.$amapComponent.pause();
    }
  }
});
</script>
