<template>
  <div />
</template>
<script setup lang="ts">
import {defineOptions} from 'vue';
import {useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import {useWatchFn, useLocaEvents} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLocaPrism',
  inheritAttrs: false
});

const props = defineProps(buildLocaProps({
  cullface: {
    type: String
  }, // 剔除背面/前面的面（选择剔除将会提升性能），可选：back/front/none，back是剔除背面的面，front是剔除前面的面，none是不进行剔除。
  acceptLight: {
    type: Boolean,
    default: true
  }, // 面是否接受光照，光照信息在 loca 对象中配置
  shininess: {
    type: Number
  }, // 立体网格的粗糙度，值越高，说明表面越粗糙。
  hasSide: {
    type: Boolean,
    default: true
  }, // 当面有厚度的时候，有没有侧面和底面
  depth: {
    type: Boolean,
    default: true
  }// 是否开启深度检测，开启后可能会影响zIndex
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;

let _destroyComponent: () => void;
let _setSource: () => void;

const {$$getInstance, parentInstance} = useRegister<any, any>((options) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.PrismLayer(options);
    const useResult = useLocaEvents({
      parentInstance,
      $amapComponent,
      emits,
      props,
      setStyle () {
        const defaultStyleValue = {
          radius: 20,
          unit: 'px',
          sideNumber: 3,
          rotation: 0,
          altitude: 0,
          height: 100,
          topColor: '#fff',
          sideTopColor: '#fff',
          sideBottomColor: '#fff'
        };
        const style = Object.assign({}, defaultStyleValue, props.defaultStyleValue);
        const defaultLayerStyle = {
          radius: style.radius,
          unit: style.unit,
          sideNumber: style.sideNumber,
          rotation: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.rotation === undefined ? style.rotation : feature.properties.rotation;
          },
          altitude: style.altitude,
          height: (index, feature) => {
            feature.properties = feature.properties || {};
            return feature.properties.height === undefined ? style.height : feature.properties.height;
          },
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
