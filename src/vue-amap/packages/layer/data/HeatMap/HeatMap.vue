<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerHeatMap',
  inheritAttrs: false
});

const props = defineProps(buildProps({
  radius: {
    type: Number
  }, // 热力图中单个点的半径，默认：30，单位：pixel
  gradient: {
    type: Object as PropType<Record<number, string>>
  }, // 热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图，例{0.4:'rgb(0, 255, 255)',0.85:'rgb(100, 0, 255)',},其中 key 表示间隔位置，取值范围： [0,1] ，value 为颜色值。默认：heatmap.js标准配色方案
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  opacity: {
    type: Object as PropType<[number, number]>
  }, // 热力图透明度区间数组，取值范围 [0,1] ，0表示完全透明，1表示不透明，默认： [0,1]
  config: {
    type: Object
  }, // 3D热力图属性
  dataSet: {
    type: Object
  }// 热力图数据集
}));
const emits = defineEmits(['init']);

let $amapComponent: AMap.HeatMap;

const {$$getInstance, parentInstance} = useRegister<AMap.HeatMap, AMap.Map>((options, parentComponent) => {
  return new Promise<AMap.CanvasLayer>((resolve) => {
    AMap.plugin(['AMap.HeatMap'], () => {
      delete options.dataSet;
      $amapComponent = new AMap.HeatMap(parentComponent, options);
      if (props.dataSet) {
        $amapComponent.setDataSet(props.dataSet);
      }
      resolve($amapComponent);
    });
  });

}, {
  emits,
  destroyComponent () {
    if ($amapComponent && parentInstance?.$amapComponent) {
      $amapComponent.setDataSet({
        data: []
      });
      $amapComponent.setMap(null);
      $amapComponent = null as any;
    }
  },
});

defineExpose({
  $$getInstance
});

</script>
