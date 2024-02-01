<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerFlexible',
  inheritAttrs: false
});

defineProps(buildProps({
  cacheSize: {
    type: Number
  }, // 缓存瓦片数量
  createTile: {
    type: Function
  }, // 由开发者实现，由API自动调用，xyz分别为切片横向纵向编号和层级，切片大小 256。假设每次创建的贴片为A(支持img或者canvas)，当创建或者获取成功时请回调success(A)，不需要显示或者失败时请回调fail()
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  opacity: {
    type: Object as PropType<[number, number]>
  }, // 热力图透明度区间数组，取值范围 [0,1] ，0表示完全透明，1表示不透明，默认： [0,1]
  tileSize: {
    type: Number
  } // 切片大小，取值： 256  128  64。默认值为256
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.TileLayer.Flexible;

const {$$getInstance, parentInstance} = useRegister<AMap.TileLayer.Flexible, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.TileLayer.Flexible>((resolve) => {
    $amapComponent = new AMap.TileLayer.Flexible(options);
    $amapComponent.setMap(parentComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      $amapComponent.destroy();
      $amapComponent.setMap(null);
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
