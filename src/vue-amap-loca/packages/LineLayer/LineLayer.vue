<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaLine',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.LineLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.LineLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          color: '#fff',
          lineWidth: 2,
          altitude: 0,
          borderWidth: 0,
          borderColor: '#fff',
          dashArray: [10, 0, 10, 0]
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          color: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.color === undefined ? style.color : feature.properties.color;
          },
          lineWidth: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
          },
          altitude: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.altitude === undefined ? style.altitude : feature.properties.altitude;
          },
          borderWidth: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.borderWidth === undefined ? style.borderWidth : feature.properties.borderWidth;
          },
          borderColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.borderColor === undefined ? style.borderColor : feature.properties.borderColor;
          },
          dashArray: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.dashArray === undefined ? style.dashArray : feature.properties.dashArray;
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
