<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaScatter',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.ScatterLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.ScatterLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          size: [20, 20],
          rotation: 0,
          color: 'rgba(200,200,200,1)',
          altitude: 0,
          borderWidth: 0,
          borderColor: 'rgba(250,250,250,1)',
          texture: null,
          unit: 'px',
          animate: false,
          duration: 0
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          size: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.size === undefined ? style.size : feature.properties.size;
          },
          rotation: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
          },
          color: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.color === undefined ? style.color : feature.properties.color;
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
          texture: style.texture,
          unit: style.unit,
          animate: style.animate,
          duration: style.duration
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
