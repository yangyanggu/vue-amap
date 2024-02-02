<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapLayerTile',
  inheritAttrs: false
});

defineProps(buildProps({
  tileUrl: {
    type: String,
    required: true
  }, // 切片取图地址 如：' https://abc{0,1,2,3}.amap.com/tile?x=[x]&y=[y]&z=[z] ' [x] 、 [y] 、 [z] 分别替代切片的xyz。
  zoom: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  dataZooms: {
    type: Array
  }, // 数据支持的缩放级别范围，默认范围 [2-30]
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
    $amapComponent = new AMap.TileLayer(options);
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
