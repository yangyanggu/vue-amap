<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions, getCurrentInstance} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreeLightAmbient from "./ThreeLightAmbient";

defineOptions({
  name: 'ElAmapThreeLightAmbient',
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
}));
const emits = defineEmits(['init']);

let $amapComponent: ThreeLightAmbient;

const {$$getInstance, parentInstance} = useRegister<ThreeLightAmbient, any>((options, parentComponent) => {
  return new Promise<ThreeLightAmbient>((resolve) => {
    $amapComponent = new ThreeLightAmbient(parentComponent, options);
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
