<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapControlToolBar',
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

let $amapComponent: AMap.ToolBar;

const {$$getInstance, $parentComponent, parentInstance} = useRegister<AMap.ToolBar, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.ToolBar>((resolve) => {
    parentComponent.plugin(['AMap.ToolBar'], () => {
      $amapComponent = new AMap.ToolBar(options);
      parentComponent.addControl($amapComponent);
      resolve($amapComponent);
    });
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && $parentComponent) {
      if(!parentInstance?.isDestroy){
        $parentComponent.removeControl($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
