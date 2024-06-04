<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaPoint',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
  // 图层里面元素的叠加效果，normal：正常透明度叠加，lighter：叠加后可能更加明亮
  blend: {
    type: String
  } 
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.PointLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.PointLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          radius: 20,
          color: '#fff',
          unit: 'px',
          borderWidth: 10,
          borderColor: '#fff',
          blurWidth: -1
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          radius: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.radius === undefined ? style.radius : feature.properties.radius;
          },
          color: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.color === undefined ? style.color : feature.properties.color;
          },
          unit: style.unit,
          borderWidth: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.borderWidth === undefined ? style.borderWidth : feature.properties.borderWidth;
          },
          borderColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.borderColor === undefined ? style.borderColor : feature.properties.borderColor;
          },
          blurWidth: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.blurWidth === undefined ? style.blurWidth : feature.properties.blurWidth;
          }
        };
        const layerStyle = Object.assign({}, defaultLayerStyle, props.layerStyle);
        $amapComponent.setStyle(layerStyle);
      },
    });
    _destroyComponent = useResult._destroyComponent;
    _setSource = useResult.setSource;
    resolve($amapComponent);
  });

}, {
  emits,
  watchRedirectFn: useWatchFn({
    setSource (){
      if(_setSource){
        _setSource();
      }
    },
    $amapComponent: () => $amapComponent,
    props
  }),
  destroyComponent () {
    if(_destroyComponent){
      _destroyComponent();
    }
    $amapComponent = null;
  },
});

defineExpose({
  $$getInstance,
});

</script>
