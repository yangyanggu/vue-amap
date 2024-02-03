<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions, getCurrentInstance} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreeLightPoint from "./ThreeLightPoint";
import type { PropType} from "vue";
import type {Vec} from "./Type";

defineOptions({
  name: 'ElAmapThreeLightPoint',
  inheritAttrs: false
});

defineProps(buildProps({
  color: {
    type: String,
    default: '#ffffff'
  },
  intensity: {
    type: Number,
    default: 1
  },
  distance: {
    type: Number,
    default: 0
  },
  decay: {
    type: Number,
    default: 1
  },
  position: {
    type: Object as PropType<Vec>,
    required: true
  },
}));
const emits = defineEmits(['init']);

let $amapComponent: ThreeLightPoint;

const {$$getInstance, parentInstance} = useRegister<ThreeLightPoint, any>((options, parentComponent) => {
  return new Promise<ThreeLightPoint>((resolve) => {
    $amapComponent = new ThreeLightPoint(parentComponent, options);
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
