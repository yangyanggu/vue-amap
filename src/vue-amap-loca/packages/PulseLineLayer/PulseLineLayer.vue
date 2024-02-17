<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaPulseLine',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
  depth: {
    type: Boolean,
    default: true
  }
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.PulseLineLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.PulseLineLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          lineWidth: 1,
          headColor: 'rgba(0, 0, 0, 0.75)',
          trailColor: 'rgba(0, 0, 0, 0.25)',
          altitude: 0,
          interval: 1,
          duration: 2000
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          lineWidth: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
          },
          headColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.headColor === undefined ? style.headColor : feature.properties.headColor;
          },
          trailColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.trailColor === undefined ? style.trailColor : feature.properties.trailColor;
          },
          altitude: style.altitude,
          interval: style.interval,
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
    $amapComponent,
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
