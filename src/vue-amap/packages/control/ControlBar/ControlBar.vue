<template />
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapControlControlBar',
  inheritAttrs: false
});

defineProps(buildProps({
  // 控件停靠位置 { top: 5; left: 5; right: 5; bottom: 5 } 或者 'LT': 左上角, 'RT': 右上角, 'LB': 左下角, 'RB': 右下角
  position: {
    type: [String, Object]
  },
  // 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为AMap.Pixel(10,10)
  offset: {
    type: Array
  },
  // 是否显示倾斜、旋转按钮。默认为 true
  showControlButton: {
    type: Boolean,
    default: true
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.ControlBar;

const {$$getInstance, $parentComponent, parentInstance} = useRegister<AMap.ControlBar, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.ControlBar>((resolve) => {
    parentComponent.plugin(['AMap.ControlBar'], () => {
      $amapComponent = new AMap.ControlBar(options);
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
