<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaZMarker',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.ZMarkerLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.ZMarkerLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          unit: 'px',
          content: '',
          size: [20, 20],
          rotation: 0,
          alwaysFront: false,
          altitude: 0
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          unit: style.unit,
          content: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.content === undefined ? style.content : feature.properties.content;
          },
          size: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.size === undefined ? style.size : feature.properties.size;
          },
          rotation: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
          },
          alwaysFront: style.alwaysFront,
          altitude: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.altitude === undefined ? style.altitude : feature.properties.altitude ;
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
