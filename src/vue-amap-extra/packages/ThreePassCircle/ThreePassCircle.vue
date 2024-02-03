<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";
import ThreePassCircle from "./ThreePassCircle";

defineOptions({
  name: 'ElAmapThreePassCircle',
  inheritAttrs: false
});

defineProps(buildProps({
  color: {
    type: String,
    default: '#ffffff'
  },
  position: {
    type: Array,
    required: true
  },
  maxRadius: {
    type: Number,
    default: 200
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: ThreePassCircle;

const {$$getInstance, parentInstance} = useRegister<ThreePassCircle, any>((options, parentComponent) => {
  return new Promise<ThreePassCircle>((resolve) => {
    $amapComponent = new ThreePassCircle(parentComponent, options);
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
