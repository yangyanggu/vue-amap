<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapLayerGlCustom',
  inheritAttrs: false
});

defineProps(buildProps({
  init: {
    type: Function
  }, // 初始化的时候，开发者可以在这个函数参数里面获取 gl 上下文，进行一些初始化的操作。
  render: {
    type: Function
  }, // 绘制函数，初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2, 20]
  opacity: {
    type: Number
  } // 透明度，默认 1
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.GLCustomLayer;

const {$$getInstance} = useRegister<AMap.GLCustomLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.GLCustomLayer>((resolve) => {
    $amapComponent = new AMap.GLCustomLayer(options);
    $amapComponent.setMap(parentComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent) {
      $amapComponent.setMap(null);
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
