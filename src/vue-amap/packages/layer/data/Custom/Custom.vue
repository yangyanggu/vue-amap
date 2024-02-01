<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerCustom',
  inheritAttrs: false
});

defineProps(buildProps({
  canvas: {
    required: true,
    type: Object
  }, // canvas 对象
  render: {
    type: Function
  }, // 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2, 20]
  opacity: {
    type: Number
  }, // 透明度，默认 1
  alwaysRender: {
    type: Boolean,
    default: false
  }// 是否主动
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.CustomLayer;

const {$$getInstance, parentInstance} = useRegister<AMap.CustomLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.CustomLayer>((resolve) => {
    const canvas = options.canvas;
    delete options.canvas;
    $amapComponent = new AMap.CustomLayer(canvas, options);
    $amapComponent.setMap(parentComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      $amapComponent.setMap(null);
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
