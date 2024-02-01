<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapControlMapType',
  inheritAttrs: false
});

defineProps(buildProps({
  defaultType: {
    type: Number
  }, // 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
  showTraffic: {
    type: Boolean,
    default: false
  }, // 叠加实时交通图层 默认值：false
  showRoad: {
    type: Boolean,
    default: false
  }// 叠加路网图层 默认值：false
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.MapType;

const {$$getInstance, parentInstance} = useRegister<AMap.MapType, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.MapType>((resolve) => {
    parentComponent.plugin(['AMap.MapType'], () => {
      $amapComponent = new AMap.MapType(options);
      parentComponent.addControl($amapComponent);
      resolve($amapComponent);
    });
  });

}, {
  emits,
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
