<template>
  <div><slot /></div>
</template>
<script setup lang="ts">
import {defineOptions, provide} from 'vue';
import { provideKey, useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {IProvideType, TRegisterFn} from "../../../../mixins";

defineOptions({
  name: 'ElAmapLayerLabels',
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
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  opacity: {
    type: Number
  }, // 透明度，默认 1
  collision: {
    type: Boolean,
    default: true
  }, // 标注层内的标注是否避让
  allowCollision: {
    type: Boolean,
    default: false
  }// 标注层内的标注是否允许其它标注层对它避让
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.LabelsLayer;

const {$$getInstance, parentInstance} = useRegister<AMap.LabelsLayer, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.LabelsLayer>((resolve) => {
    $amapComponent = new AMap.LabelsLayer(options);
    parentComponent.add($amapComponent);
    provideData.$amapComponent = $amapComponent;
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

const $$add = (markers: AMap.LabelMarker | AMap.LabelMarker[]) => {
  $amapComponent.add(markers);
};

defineExpose({
  $$getInstance,
  $$add
});

</script>
