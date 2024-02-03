<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreeLightHemisphere from "./ThreeLightHemisphere";
import type { PropType} from "vue";
import type {Vec} from "./Type";

defineOptions({
  name: 'ElAmapThreeLightHemisphere',
  inheritAttrs: false
});

defineProps(buildProps({
  color: {
    type: String,
    default: '#ffffff'
  },
  groundColor: {
    type: String,
    default: '#ffffff'
  },
  intensity: {
    type: Number,
    default: 1
  },
  position: {
    type: Object as PropType<Vec>,
    required: true
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: ThreeLightHemisphere;

const {$$getInstance, parentInstance} = useRegister<ThreeLightHemisphere, any>((options, parentComponent) => {
  return new Promise<ThreeLightHemisphere>((resolve) => {
    $amapComponent = new ThreeLightHemisphere(parentComponent, options);
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
