<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "../../../../mixins";
import {buildProps} from "../../../../utils/buildHelper";
import type {PropType} from 'vue';

defineOptions({
  name: 'ElAmapLayerDistrict',
  inheritAttrs: false
});

const props = defineProps(buildProps({
  type: {
    type: String as PropType<'World' | 'Country' | 'Province'>,
    default: 'Country',
    validator: (value : string): boolean => {
      // 这个值必须匹配下列字符串中的一个
      return ['World', 'Country', 'Province'].indexOf(value) !== -1;
    }
  },
  adcode: {
    type: String
  }, // 行政区的编码 adcode与省市行政区对照表，下载地址：https://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip
  SOC: {
    type: String
  }, // 设定显示的国家,对应下载地址： https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json
  depth: {
    type: Number
  }, // 设定数据的层级深度，depth为0的时候只显示国家面，depth为1的时候显示省级， 当国家为中国时设置depth为2的可以显示市一级
  zooms: {
    type: Array
  }, // 支持的缩放级别范围，默认范围 [2-30]
  opacity: {
    type: Number
  }, // 透明度，默认 1
  styles: {
    type: Object
  }// 为简易行政区图设定各面的填充颜色和描边颜色。 styles各字段的值可以是颜色值，也可以是一个返回颜色值* 的回调函数function。
}));
const emits = defineEmits(['init']);

let $amapComponent: any;

const {$$getInstance, parentInstance} = useRegister<any, AMap.Map>((options, parentComponent) => {
  return new Promise<any>((resolve) => {
    if (props.type === 'World') {
      $amapComponent = new AMap.DistrictLayer.World(options);
    } else if (props.type === 'Country') {
      $amapComponent = new AMap.DistrictLayer.Country(options);
    } else if (props.type === 'Province') {
      $amapComponent = new AMap.DistrictLayer.Province(options);
    }
    parentComponent.add($amapComponent);
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: {
    __SOC (value: string){
      $amapComponent.setSOC(value);
    }
  },
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
