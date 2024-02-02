<template>
  <div><slot /></div>
</template>
<script setup lang="ts">
import {defineOptions, provide} from 'vue';
import { provideKey, useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {IProvideType, TRegisterFn} from "../../../../mixins";

defineOptions({
  name: 'ElAmapLayerVector',
  inheritAttrs: false
});

const needInitComponents: TRegisterFn[] = [];
const provideData:IProvideType = {
  $amapComponent: undefined,
  addChildComponent (cb){
    needInitComponents.push(cb);
  },
  isDestroy: false
};

provide(provideKey, provideData);

defineProps(buildProps({
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.VectorLayer;

const {$$getInstance, parentInstance} = useRegister<AMap.VectorLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.VectorLayer>((resolve) => {
    $amapComponent = new AMap.VectorLayer(options);
    parentComponent.add($amapComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  needInitComponents,
  provideData,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      if(!parentInstance?.isDestroy){
        parentInstance?.$amapComponent.removeLayer($amapComponent);
      }
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
