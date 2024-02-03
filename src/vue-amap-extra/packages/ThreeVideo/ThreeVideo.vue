<template>
  <video
    ref="videoRef"
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
<script setup lang="ts">
import {defineOptions, ref, nextTick} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreeVideo from "./ThreeVideo";
import type {Vec} from "./Type";
import type{PropType} from "vue";

defineOptions({
  name: 'ElAmapThreeVideo',
  inheritAttrs: false
});

defineProps(buildProps({
  video: {
    type: [String, Array, HTMLVideoElement],
    required: true
  },
  videoTranslate: {
    type: Object as PropType<Vec>,
    default (){
      return {
        x:0,
        y:0,
        z:0
      };
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
}));
const emits = defineEmits(['init', 'click', 'mousemove', 'mouseover', 'mouseout']);

let $amapComponent: ThreeVideo;

const videoUrlList = ref<string[]>([]);
const videoRef = ref<HTMLVideoElement>();

const {$$getInstance, parentInstance} = useRegister<ThreeVideo, any>((options, parentComponent) => {
  const urlType = Object.prototype.toString.call(options.video);
  if(urlType === '[object String]'){
    videoUrlList.value = [options.video as string];
  }else if(urlType === '[object Array]'){
    videoUrlList.value = options.video;
  }
  if(videoUrlList.value.length > 0){
    options.video = videoRef.value;
  }
  $amapComponent = new ThreeVideo(parentComponent);
  return new Promise<ThreeVideo>((resolve) => {
    nextTick(() => {
      $amapComponent.init(options, this).then(() => {
        resolve($amapComponent);
      });
    });

  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance.isDestroy){
        $amapComponent.remove();
      }
      $amapComponent.destroy();
      $amapComponent = null as any;
    }
  },
});

const $$start = () => {
  $amapComponent.start();
};
const $$pause = () => {
  $amapComponent.pause();
};

defineExpose({
  $$getInstance,
  $$start,
  $$pause
});

</script>
