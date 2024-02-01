<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapControlScale',
  inheritAttrs: false
});

defineProps(buildProps({
  position: {
    type: [String, Object]
  }, // 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
  offset: {
    type: Array
  }// 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.Scale;

const {$$getInstance, parentInstance} = useRegister<AMap.Scale, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.Scale>((resolve) => {
    parentComponent.plugin(['AMap.Scale'], () => {
      $amapComponent = new AMap.Scale(options);
      parentComponent.addControl($amapComponent);
      resolve($amapComponent);
    });
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.removeControl($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
