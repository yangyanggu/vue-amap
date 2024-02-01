<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerCanvas',
  inheritAttrs: false
});

defineProps(buildProps({
  canvas: {
    required: true,
    type: Object as PropType<HTMLCanvasElement>
  }, // Canvas DOM 对象
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

let $amapComponent: AMap.CanvasLayer;

const {$$getInstance, parentInstance} = useRegister<AMap.CanvasLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.CanvasLayer>((resolve) => {
    $amapComponent = new AMap.CanvasLayer(options);
    parentComponent.addLayer($amapComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.removeLayer($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
