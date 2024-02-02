<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerWms',
  inheritAttrs: false
});

defineProps(buildProps({
  url: {
    type: String
  }, // wms服务的url地址，如' https://ahocevar.com/geoserver/wms '
  blend: {
    type: Boolean,
    default: false
  }, // 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false
  params: {
    type: Object
  }, // OGC标准的WMS地图服务的GetMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  opacity: {
    type: Number
  } // 透明度，默认 1
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.TileLayer;

const {$$getInstance, parentInstance} = useRegister<AMap.TileLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.TileLayer>((resolve) => {
    $amapComponent = new AMap.TileLayer.WMS(options);
    parentComponent.add($amapComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.remove($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
