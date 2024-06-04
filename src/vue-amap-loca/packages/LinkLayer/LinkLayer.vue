<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaLink',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.LinkLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.LinkLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          lineColors: ['rgba(255,255,255,1)', 'rgba(255,255,255,0)'],
          height: 100,
          smoothSteps: 100
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
          smoothSteps: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.smoothSteps === undefined ? style.smoothSteps : feature.properties.smoothSteps;
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
