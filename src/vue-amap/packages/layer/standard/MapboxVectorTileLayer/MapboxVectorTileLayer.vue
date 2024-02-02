<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerMapboxVectorTile',
  inheritAttrs: false
});

defineProps(buildProps({
  url: {
    type: String
  }, // MVT 数据的链接地址
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2,22]
  dataZooms: {
    type: Array
  }, // 瓦片数据等级范围，超过范围会使用最大/最小等级的数据，默认 [2,18]
  opacity: {
    type: Number
  }, // 透明度，默认 1
  styles: {
    type: Object
  } // 样式
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.MapboxVectorTileLayer;

const {$$getInstance, parentInstance} = useRegister<AMap.MapboxVectorTileLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.MapboxVectorTileLayer>((resolve) => {
    AMap.plugin(['AMap.MapboxVectorTileLayer'], () => {
      $amapComponent = new AMap.MapboxVectorTileLayer(options);
      parentComponent.addLayer($amapComponent);
      resolve($amapComponent);
    });
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
