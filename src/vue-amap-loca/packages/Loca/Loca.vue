<template>
  <div><slot /></div>
</template>
<script setup lang="ts">
import {defineOptions, provide} from 'vue';
import {provideKey, useRegister} from "@vuemap/vue-amap";
import {buildLocaProps, commonEmitNames} from "../../utils/buildHelper";
import type { TRegisterFn} from "@vuemap/vue-amap";
import type {PropType} from 'vue';
import type {EventOptions} from "./Type";
import type {ILocaProvideType} from '../../mixins/useLoca';

defineOptions({
  name: 'ElAmapLoca',
  inheritAttrs: false
});

const needInitComponents: TRegisterFn[] = [];
const provideData:ILocaProvideType = {
  $amapComponent: undefined,
  addChildComponent (cb){
    needInitComponents.push(cb);
  },
  isDestroy: false,
  getMap: () => {
    return getMap();
  }
};

provide(provideKey, provideData);

const props = defineProps(buildLocaProps({
  ambLight: {
    type: Object
  }, // 环境光
  dirLight: {
    type: Object
  }, // 平行光
  pointLight: {
    type: Object
  }, // 点光
  onClick: {
    type: Function,
    default: null
  },
  onMousemove: {
    type: Function,
    default: null
  },
  onRightclick: {
    type: Function,
    default: null
  },
  eventOptions: {
    type: Object as PropType<EventOptions>,
    default: () => ({
      hitFirst: true
    })
  } // 对于事件是否只触发第一个选中的数据
}));
const emits = defineEmits(commonEmitNames);

let $amapComponent: any;
let isDragging = false;
let isRotating = false;
let hitFirst = true;

const {$$getInstance, parentInstance} = useRegister<any, AMap.Map>((options, parentComponent) => {
  return new Promise<any>((resolve) => {
    $amapComponent = new Loca.Container({
      map: parentComponent
    });
    provideData.$amapComponent = $amapComponent;
    if (options.ambLight) {
      $amapComponent.ambLight = options.ambLight;
    }
    if (options.dirLight) {
      $amapComponent.dirLight = options.dirLight;
    }
    if (options.pointLight) {
      $amapComponent.pointLight = options.pointLight;
    }
    hitFirst = options.eventOptions.hitFirst;
    bindEvents();
    resolve($amapComponent);
  });

}, {
  emits,
  needInitComponents,
  provideData,
  destroyComponent () {
    if ($amapComponent) {
      unBindEvents();
      $amapComponent.destroy();
      $amapComponent = null as any;
    }
  },
});

const getMap = () => {
  return parentInstance?.$amapComponent;
};

const bindEvents = () => {
  if(parentInstance){
    const map = getMap();
    if(props.onClick !== null){
      map.on('click', clickMap);
    }
    if(props.onMousemove !== null){
      map.on('mousemove', mouseMoveMap);
      map.on('dragstart', dragStart);
      map.on('dragend', dragEnd);
      map.on('rotatestart', rotateStart);
      map.on('rotateend', rotateEnd);
      map.on('mouseout', mouseoutMap);
    }
    if(props.onRightclick !== null){
      map.on('rightclick', rightclickMap);
    }
  }
};
const clickMap = (e) => {
  const features = _getFeature(e);
  emits('click', features, e);
};
const rightclickMap = (e) => {
  const features = _getFeature(e);
  emits('rightclick', features, e);
};
const mouseMoveMap = (e) => {
  if(isDragging || isRotating){
    return;
  }
  const features = _getFeature(e);
  emits('mousemove', features, e);
};
const _getFeature = (e) => {
  const features: any[] = [];
  if($amapComponent.layers){
    const layers: any[] = [];
    $amapComponent.layers.forEach(( v => {
      layers.push(v);
    }));
    layers.sort((a,b) => b.zIndex - a.zIndex);
    const layerLen = layers.length;
    for(let i=0;i<layerLen;i++){
      const temp = layers[i].queryFeature(e.pixel.toArray());
      if(temp){
        features.push(temp);
        if(hitFirst){
          break;
        }
      }
    }
  }

  return features;
};
const dragStart = () => {
  isDragging = true;
};
const dragEnd = () => {
  isDragging = false;
};
const mouseoutMap = () => {
  isDragging = false;
  isRotating = false;
};
const rotateStart = () => {
  isRotating = true;
};
const rotateEnd = () => {
  isRotating = false;
};
const unBindEvents = () => {
  if(parentInstance){
    const map = getMap();
    map.off('click', clickMap);
    map.off('rightclick', rightclickMap);
    map.off('mousemove', mouseMoveMap);
    map.off('dragstart', dragStart);
    map.off('dragend', dragEnd);
    map.off('rotatestart', rotateStart);
    map.off('rotateend', rotateEnd);
    map.off('mouseout', mouseoutMap);
  }
};

defineExpose({
  $$getInstance
});

</script>
