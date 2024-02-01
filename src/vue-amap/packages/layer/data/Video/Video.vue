<template>
  <video
    ref="videoRef"
    style="display: none;"
    muted
  />
</template>
<script setup lang="ts">
import {defineOptions, ref} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import VideoLayer from './VideoLayer';
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerVideo',
  inheritAttrs: false
});

defineProps(buildProps({
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
}));
const emits = defineEmits(['init']);

const videoRef = ref<HTMLVideoElement>();

let $amapComponent: VideoLayer;

const {$$getInstance, parentInstance} = useRegister<VideoLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<VideoLayer>((resolve) => {
    $amapComponent = new VideoLayer(options, videoRef.value as HTMLVideoElement);
    parentComponent.addLayer($amapComponent.getLayer());
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        $amapComponent.destroy();
        parentInstance?.$amapComponent.removeLayer($amapComponent.getLayer());
      }
      $amapComponent = null as any;
    }
  },
});

const $$play = () => {
  $amapComponent.play();
};
const $$pause = () => {
  $amapComponent.pause();
};

defineExpose({
  $$getInstance,
  $$play,
  $$pause
});

</script>
