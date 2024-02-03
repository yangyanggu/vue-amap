<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import {Layer3DTiles} from "@vuemap/layer-3dtiles";
import type {LngLat,Vec} from "./Type";

import type{PropType} from "vue";
import type {ConfigLoader} from "../ThreeGltf/Type";

defineOptions({
  name: 'ElAmapThreeTiles3d',
  inheritAttrs: false
});

defineProps(buildProps({
  //地址
  url: {
    type: String,
    required: true
  },
  // 位置
  position: {
    type: Object as PropType<LngLat>,
  },
  // 缩放比例
  scale: {
    type: Object as PropType<number | Vec>
  },
  // 旋转角度
  rotation: {
    type: Object as PropType<Vec>
  },
  // 模型偏移设置
  translate: {
    type: Object as PropType<Vec>
  },
  // DRACOLoader 的decoder路径，默认使用CDN路径，默认：https://cdn.jsdelivr.net/npm/three@0.143/examples/js/libs/draco/
  dracoDecoderPath: {
    type: String,
  },
  // 使用fetch下载文件的参数
  fetchOptions: {
    type: Object,
  },
  // 是否开启事件,默认false
  mouseEvent: {
    type: Boolean,
    default: false
  },
  // 是否开启debug，开启后将会在页面最顶部显示当前模型处理情况， 默认 false
  debug: {
    type: Boolean,
    default: false
  },
  autoFocus: {
    type: Boolean,
    default: false
  },//加载后是否自动将地图中心点移动到模型中心，仅在不传position时生效
  configLoader: {
    type: Function as PropType<ConfigLoader>
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: Layer3DTiles;

const {$$getInstance, parentInstance} = useRegister<Layer3DTiles, any>((options, parentComponent) => {
  return new Promise<Layer3DTiles>((resolve) => {
    $amapComponent = new Layer3DTiles(parentComponent, options);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      $amapComponent.destroy();
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance,
});

</script>
