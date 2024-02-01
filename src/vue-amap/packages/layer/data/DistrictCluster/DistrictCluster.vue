<template>
  <div />
</template>
<script setup lang="ts">
import './addProcess';
import {defineOptions} from 'vue';
import {DistrictCluster} from "@vuemap/district-cluster";
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';
import type { RenderOptions } from '@vuemap/district-cluster';
type GetPosition = (dataItem: any, dataIndex: number) => [number, number]

defineOptions({
  name: 'ElAmapLayerDistrictCluster',
  inheritAttrs: false
});

defineProps(buildProps({
  data: {
    required: true,
    type: Array
  }, // 数据源数组，每个元素即为点相关的信息
  getPosition: {
    type: Function as PropType<GetPosition>
  }, // 返回数据项中的经纬度信息
  autoSetFitView: {
    type: Boolean,
    default: true
  }, // 是否在绘制后自动调整地图视野以适合全部点，默认true
  topAdcodes: {
    type: Array as PropType<Array<number>>
  },// 顶层区划的adcode列表
  excludedAdcodes: {
    type: Array as PropType<Array<number>>
  },
  renderOptions: {
    type: Object as PropType<RenderOptions>
  } // 绘制的引擎的参数
}));
const emits = defineEmits(['init']);

let $amapComponent: DistrictCluster;

const {$$getInstance} = useRegister<DistrictCluster, AMap.Map>((options, parentComponent) => {
  return new Promise<DistrictCluster>((resolve) => {
    options.map = parentComponent;
    $amapComponent = new DistrictCluster(options);
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
