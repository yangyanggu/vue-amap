<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";

defineOptions({
  name: 'ElAmapLocaDirectionalLight',
  inheritAttrs: false
});

defineProps(buildProps({
  color: {
    type: String
  }, // 环境光颜色。
  intensity: {
    type: Number
  }, // 环境光强度。
  position: {
    type: Array,
    required: true
  }, // 坐标位置
  target: {
    type: Array
  }, // 光射向的目标位置
}));
const emits = defineEmits(['init']);

let $amapComponent: any;

const {$$getInstance, parentInstance} = useRegister<any, any>((options, parentComponent) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.DirectionalLight(options);
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
