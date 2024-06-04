<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaHeatmap',
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

const {$$getInstance, parentInstance} = useRegister<Loca.HeatMapLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.HeatMapLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          radius: 20,
          value: 10,
          gradient: {0.5: 'blue', 0.65: 'rgb(117,211,248)', 0.7: 'rgb(0, 255, 0)', 0.9: '#ffea00', 1.0: 'red'},
          opacity: [0, 1],
          height: 100,
          heightBezier: [0.4, 0.2, 0.4, 0.8],
          max: null,
          min: null,
          unit: 'px',
          difference: false
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          radius: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.radius === undefined ? style.radius : feature.properties.radius;
          },
          value: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.value === undefined ? style.value : feature.properties.value;
          },
          gradient: style.gradient,
          opacity: style.opacity,
          height: style.height,
          heightBezier: style.heightBezier,
          max: style.max,
          min: style.min,
          unit: style.unit,
          difference: style.difference
        };
        const layerStyle = Object.assign({}, defaultLayerStyle, props.layerStyle);
        $amapComponent.setStyle(layerStyle as any);
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
    $amapComponent = null as any;
  },
});

defineExpose({
  $$getInstance,
});

</script>
