<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapLayerSatellite',
  inheritAttrs: false
});

defineProps(buildProps({
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  opacity: {
    type: Number
  }, // 透明度，默认 1
  tileSize: {
    type: Number
  }// 切片大小，取值： 256，表示切片大小为256 256， 128，表示切片大小为128 128， 64，表示切片大小为64*64。默认值为256
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.TileLayer;

const {$$getInstance, parentInstance} = useRegister<AMap.TileLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.TileLayer>((resolve) => {
    $amapComponent = new AMap.TileLayer.Satellite(options);
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
