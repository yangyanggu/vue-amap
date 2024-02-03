<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister, buildProps} from "@vuemap/vue-amap";

defineOptions({
  name: 'ElAmapLocaPointLight',
  inheritAttrs: false
});

defineProps(buildProps({
  color: {
    type: String
  }, // 点光颜色。
  intensity: {
    type: Number
  }, // 光照强度。
  position: {
    type: Array,
    required: true
  }, // 点光位置
  distance: {
    type: Number
  }, // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失
}));
const emits = defineEmits(['init']);

let $amapComponent: any;

const {$$getInstance, parentInstance} = useRegister<any, any>((options, parentComponent) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.PointLight(options);
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
