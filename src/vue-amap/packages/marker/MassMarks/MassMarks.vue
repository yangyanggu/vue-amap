<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../mixins";
import {buildProps} from "../../../utils/buildHelper";

defineOptions({
  name: 'ElAmapMassMarks',
  inheritAttrs: false
});

defineProps(buildProps({
  data: {
    type: Array,
    required: true
  }, // 海量点数据参数
  zooms: {
    type: Array
  }, // 点标记显示的层级范围，超过范围不显示。
  cursor: {
    type: String
  }, // 指定鼠标悬停时的鼠，默认值：'pointer'
  styles: {
    type: [Array, Object]
  } // 样式
}));
const emits = defineEmits(['init','update:center']);

let $amapComponent: AMap.MassMarks;

const {$$getInstance, parentInstance} = useRegister<AMap.MassMarks, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.MassMarks>((resolve) => {
    const data = options.data;
    delete options.data;
    $amapComponent = new AMap.MassMarks(data, options);
    $amapComponent.setMap(parentComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  propsRedirect: {
    styles: 'style'
  },
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      $amapComponent.clear();
      $amapComponent.setMap(null as any);
      $amapComponent = null as any;
    }
  },
});


defineExpose({
  $$getInstance
});

</script>
