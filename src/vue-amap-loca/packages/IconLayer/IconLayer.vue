<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaIcon',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.IconLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.IconLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          unit: 'px',
          icon: '',
          iconSize: [20, 20],
          rotation: 0,
          opacity: 1,
          offset: [0, 0]
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          unit: style.unit,
          icon: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.icon === undefined ? style.icon : feature.properties.icon;
          },
          iconSize: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.iconSize === undefined ? style.iconSize : feature.properties.iconSize;
          },
          rotation: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
          },
          opacity: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.opacity === undefined ? style.opacity : feature.properties.opacity;
          },
          offset: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.offset === undefined ? style.offset : feature.properties.offset;
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
