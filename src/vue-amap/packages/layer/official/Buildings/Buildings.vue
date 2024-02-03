<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils";
import type { PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerBuildings',
  inheritAttrs: false
});

const props = defineProps(buildProps({
  wallColor: {
    type: [String, Array]
  }, // 楼块侧面颜色，支持 rgba、rgb、十六进制等
  roofColor: {
    type: [String, Array]
  }, // 楼块顶面颜色，支持 rgba、rgb、十六进制等
  heightFactor: {
    type: Number
  }, // 楼块的高度系数因子，默认为 1，也就是正常高度
  styleOpts: {
    type: Object as PropType<AMap.BuildingStyleOptions>
  }, // 楼块的围栏和样式设置
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  opacity: {
    type: Number
  } // 透明度，默认 1
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.Buildings;

const {$$getInstance, parentInstance} = useRegister<AMap.Buildings, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.Buildings>((resolve) => {
    $amapComponent = new AMap.Buildings(options);
    parentComponent.add($amapComponent);
    if(props.styleOpts){
      $amapComponent.setStyle(props.styleOpts);
    }
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: {
    __styleOpts (value: any) {
      $amapComponent.setStyle(value);
    }
  },
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
