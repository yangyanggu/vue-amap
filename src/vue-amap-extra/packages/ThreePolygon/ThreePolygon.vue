<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreePolygon from "./ThreePolygon";
import type {Polygon} from './Type';
import type {PropType} from "vue";

defineOptions({
  name: 'ElAmapThreePolygon',
  inheritAttrs: false
});

defineProps(buildProps({
  sideTopColor: {
    type: String,
    default: '#ffffff'
  },// 侧面顶部颜色
  sideBottomColor: {
    type: String,
    default: '#ffffff'
  },// 侧面颜色
  sideTexture: {
    type: String
  }, // 侧面贴图
  topColor: {
    type: String,
    default: '#ffffff'
  },
  bottomColor: {
    type: String,
    default: '#ffffff'
  },
  height: {
    type: Number,
    default: 30
  },
  depthTest: {
    type: Boolean,
    default: true
  },
  source: {
    type: Object as PropType<Polygon>,
    required: true
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: ThreePolygon;

const {$$getInstance, parentInstance} = useRegister<ThreePolygon, any>((options, parentComponent) => {
  return new Promise<ThreePolygon>((resolve) => {
    $amapComponent = new ThreePolygon(parentComponent, options);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance.isDestroy){
        $amapComponent.remove();
      }
      $amapComponent.destroy();
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance,
});

</script>
