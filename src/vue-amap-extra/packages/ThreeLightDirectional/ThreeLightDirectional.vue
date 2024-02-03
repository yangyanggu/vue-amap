<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreeLightDirectional from "./ThreeLightDirectional";
import type { PropType} from "vue";
import type {Vec} from "./Type";

defineOptions({
  name: 'ElAmapThreeLightDirectional',
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
  position: {
    type: Object as PropType<Vec>,
    default: () => ({x:0,y:0,z:1})
  },
  target: {
    type: Object
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: ThreeLightDirectional;

const {$$getInstance, parentInstance} = useRegister<ThreeLightDirectional, any>((options, parentComponent) => {
  return new Promise<ThreeLightDirectional>((resolve) => {
    $amapComponent = new ThreeLightDirectional(parentComponent, options);
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
