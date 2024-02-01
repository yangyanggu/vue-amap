<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {CustomXyzLayer} from "@vuemap/amap-xyz-layer";
import {useRegister} from "../../../../mixins";
import {propsTypes} from './props';

defineOptions({
  name: 'ElAmapLayerCustomXyz',
  inheritAttrs: false
});

defineProps(propsTypes);
const emits = defineEmits(['init']);

let $amapComponent: CustomXyzLayer;

const {$$getInstance} = useRegister<CustomXyzLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<CustomXyzLayer>((resolve) => {
    $amapComponent = new CustomXyzLayer(parentComponent, options);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent) {
      $amapComponent.destroy();
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
