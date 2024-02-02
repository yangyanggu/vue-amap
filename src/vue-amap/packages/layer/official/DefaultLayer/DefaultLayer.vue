<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapLayerDefault',
  inheritAttrs: false
});

defineProps(buildProps({
  zoom: {
    type: Array
  },
  opacity: {
    type: Number
  }
}));
const emits = defineEmits(['init']);

let $amapComponent: any;

const {$$getInstance, parentInstance} = useRegister<any, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.CanvasLayer>((resolve) => {
    $amapComponent = AMap.createDefaultLayer(options);
    parentComponent.add($amapComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.remove($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
