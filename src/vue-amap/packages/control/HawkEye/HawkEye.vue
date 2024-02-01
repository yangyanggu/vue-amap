<template />
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {propsTypes} from "./props";

defineOptions({
  name: 'ElAmapControlHawkEye',
  inheritAttrs: false
});

defineProps(propsTypes);
const emits = defineEmits(['init']);

let $amapComponent: AMap.HawkEye;

const {$$getInstance, parentInstance} = useRegister<AMap.HawkEye, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.HawkEye>((resolve) => {
    parentComponent.plugin(['AMap.HawkEye'], () => {
      $amapComponent = new AMap.HawkEye(options);
      parentComponent.addControl($amapComponent);
      resolve($amapComponent);
    });
  });

}, {
  emits,
  watchRedirectFn: {
    __isOpen (flag: boolean){
      !flag ? $amapComponent.close() : $amapComponent.open();
    }
  },
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.removeControl($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
