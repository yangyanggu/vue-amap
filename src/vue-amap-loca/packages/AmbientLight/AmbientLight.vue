<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";

defineOptions({
  name: 'ElAmapLocaAmbientLight',
  inheritAttrs: false
});

defineProps(buildProps({
  // 环境光颜色。
  color: {
    type: String
  },
  // 环境光强度。
  intensity: {
    type: Number
  }, 
}));
const emits = defineEmits(['init']);

let $amapComponent: any;

const {$$getInstance, parentInstance} = useRegister<any, any>((options, parentComponent) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.AmbientLight(options);
    parentComponent.addLight($amapComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance.isDestroy){
        parentInstance.$amapComponent.removeLight($amapComponent);
      }
      $amapComponent = null;
    }
  },
});

defineExpose({
  $$getInstance,
});

</script>
