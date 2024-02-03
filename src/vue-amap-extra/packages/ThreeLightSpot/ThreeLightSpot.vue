<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreeLightSpot from "./ThreeLightSpot";
import type { PropType} from "vue";
import type {Vec} from "./Type";

defineOptions({
  name: 'ElAmapThreeLightSpot',
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
  angle: {
    type: Number,
    default: 0
  },
  penumbra: {
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
  target: {
    type: Object
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: ThreeLightSpot;

const {$$getInstance, parentInstance} = useRegister<ThreeLightSpot, any>((options, parentComponent) => {
  return new Promise<ThreeLightSpot>((resolve) => {
    $amapComponent = new ThreeLightSpot(parentComponent, options);
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
