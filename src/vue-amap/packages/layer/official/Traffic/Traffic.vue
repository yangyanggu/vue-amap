<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapLayerTraffic',
  inheritAttrs: false
});

defineProps(buildProps({
  autoRefresh: {
    type: Boolean,
    defult: true
  }, // 是否自动更新数据，默认开启
  interval: {
    type: Number
  }, // 自动更新数据的间隔毫秒数，默认 180ms
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

let $amapComponent: any;

const {$$getInstance, parentInstance} = useRegister<any, AMap.Map>((options, parentComponent) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new AMap.TileLayer.Traffic(options) as any;
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

const stopFresh = () => {
  if ($amapComponent) {
    $amapComponent.stopFresh();
  }
};

defineExpose({
  $$getInstance,
  stopFresh
});

</script>
