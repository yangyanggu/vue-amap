<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaGrid',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
  // 剔除背面/前面的面（选择剔除将会提升性能），可选：back/front/none，back是剔除背面的面，front是剔除前面的面，none是不进行剔除。
  cullface: {
    type: String
  },
  // 面是否接受光照，光照信息在 loca 对象中配置
  acceptLight: {
    type: Boolean,
    default: true
  },
  // 立体网格的粗糙度，值越高，说明表面越粗糙。
  shininess: {
    type: Number
  },
  // 当面有厚度的时候，有没有侧面和底面
  hasSide: {
    type: Boolean,
    default: true
  },
  // 是否开启深度检测，开启后可能会影响zIndex
  depth: {
    type: Boolean,
    default: true
  }
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<Loca.GridLayer, Loca.Container>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.GridLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          topColor: '#fff',
          sideTopColor: '#fff',
          sideBottomColor: '#fff',
          altitude: 0,
          height: 0,
          radius: 1000,
          gap: 0,
          unit: 'meter'
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          topColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.topColor === undefined ? style.topColor : feature.properties.topColor;
          },
          sideTopColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.sideTopColor === undefined ? style.sideTopColor : feature.properties.sideTopColor;
          },
          sideBottomColor: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.sideBottomColor === undefined ? style.sideBottomColor : feature.properties.sideBottomColor;
          },
          altitude: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.altitude === undefined ? style.altitude : feature.properties.altitude;
          },
          height: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.height === undefined ? style.height : feature.properties.height;
          },
          radius: style.radius,
          gap: style.gap,
          unit: style.unit
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
    $amapComponent,
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
