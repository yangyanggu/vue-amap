<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaLaser',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
  depth: {
    type: Boolean,
    default: true
  }// 图层中的要素是否具有前后遮盖关系，默认开启
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.LaserLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.LaserLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          unit: 'px',
          height: 200,
          color: 'rgba(255,255,0,0.5)',
          angle: 0,
          lineWidth: 2,
          trailLength: 30,
          duration: 2000,
          interval: 0,
          delay: 0,
          repeat: undefined
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          unit: style.unit,
          height: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.height === undefined ? style.height : feature.properties.height;
          },
          color: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.color === undefined ? style.color : feature.properties.color;
          },
          angle: style.angle,
          lineWidth: style.lineWidth,
          trailLength: style.trailLength,
          duration: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.duration === undefined ? style.duration : feature.properties.duration;
          },
          interval: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.interval === undefined ? style.interval : feature.properties.interval;
          },
          delay: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.delay === undefined ? style.delay : feature.properties.delay;
          },
          repeat: style.repeat
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
