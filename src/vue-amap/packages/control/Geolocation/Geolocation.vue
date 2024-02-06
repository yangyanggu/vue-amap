<template />
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {propsType} from "./props";

defineOptions({
  name: 'ElAmapControlGeolocation',
  inheritAttrs: false
});

defineProps(propsType);

const emits = defineEmits(['init', 'complete']);

let $amapComponent: AMap.Geolocation;

const emitComplete = (e: any) => {
  emits('complete', e);
};

const {$$getInstance, parentInstance} = useRegister<AMap.Geolocation, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.Geolocation>((resolve) => {
    parentComponent.plugin(['AMap.Geolocation'], () => {
      $amapComponent = new AMap.Geolocation(options);
      parentComponent.addControl($amapComponent);
      $amapComponent.on('complete', emitComplete);
      resolve($amapComponent);
    });
  });

}, {
  emits,
  destroyComponent () {
    $amapComponent.off('complete', emitComplete);
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
