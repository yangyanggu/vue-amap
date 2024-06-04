<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaPulseLink',
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

const {$$getInstance, parentInstance} = useRegister<Loca.PulseLinkLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.PulseLinkLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          lineColors: ['#fff'],
          height: 100,
          maxHeightScale: 0,
          smoothSteps: 50,
          lineWidth: [1, 1],
          unit: 'px',
          dash: [4000, 0, 4000, 0],
          speed: 100,
          headColor: 'rgba(0, 0, 0, 0.75)',
          trailColor: 'rgba(0, 0, 0, 0.25)',
          flowLength: 100
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          lineColors: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.lineColors === undefined ? style.lineColors : feature.properties.lineColors;
          },
          height: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.height === undefined ? style.height : feature.properties.height;
          },
          maxHeightScale: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.maxHeightScale === undefined ? style.maxHeightScale : feature.properties.maxHeightScale;
          },
          smoothSteps: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.smoothSteps === undefined ? style.smoothSteps : feature.properties.smoothSteps;
          },
          lineWidth: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.lineWidth === undefined ? style.lineWidth : feature.properties.lineWidth;
          },
          unit: style.unit,
          dash: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.dash === undefined ? style.dash : feature.properties.dash;
          },
          speed: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.speed === undefined ? style.speed : feature.properties.speed;
          },
          headColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.headColor === undefined ? style.headColor : feature.properties.headColor;
          },
          trailColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.trailColor === undefined ? style.trailColor : feature.properties.trailColor;
          },
          flowLength: style.flowLength
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
