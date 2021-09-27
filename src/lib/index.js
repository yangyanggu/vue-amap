// polyfills
import './polyfills';

import upperCamelCase from 'uppercamelcase';

// 初始化接口
import {initAMapApiLoader} from '@/services/injected-amap-api-instance';

// 组建导入
import AMap from '@/components/amap.vue';

// Layer 图层导入
import DefaultLayer from '@/components/layer/official/DefaultLayer';
import TileLayer from '@/components/layer/official/TileLayer';
import Traffic from '@/components/layer/official/Traffic';
import Satellite from '@/components/layer/official/Satellite';
import RoadNet from '@/components/layer/official/RoadNet';
import Buildings from '@/components/layer/official/Buildings';
import DistrictLayer from '@/components/layer/official/DistrictLayer';
import IndoorMap from '@/components/layer/official/IndoorMap';
import WMS from '@/components/layer/standard/WMS';
import WMTS from '@/components/layer/standard/WMTS';
import MapboxVectorTileLayer from '@/components/layer/standard/MapboxVectorTileLayer';
import HeatMap from '@/components/layer/data/HeatMap';
import LabelsLayer from '@/components/layer/data/Labels';
import CustomLayer from '@/components/layer/data/Custom';
import Flexible from '@/components/layer/data/Flexible';
import ImageLayer from '@/components/layer/data/Image';
import CanvasLayer from '@/components/layer/data/Canvas';

// Marker 点标记导入

import Marker from '@/components/marker/Marker.vue';
import LabelMarker from '@/components/marker/LabelMarker';

// Control 控件导入
import Scale from './components/control/Scale';

// managers
import AMapManager from './managers/amap-manager';
import createCustomComponent from './adapter/custom-adapter';

let components = [
  AMap,
  DefaultLayer,
  TileLayer,
  Traffic,
  Satellite,
  RoadNet,
  Buildings,
  DistrictLayer,
  IndoorMap,
  WMS,
  WMTS,
  MapboxVectorTileLayer,
  HeatMap,
  LabelsLayer,
  CustomLayer,
  Flexible,
  ImageLayer,
  CanvasLayer,

  Marker,
  LabelMarker,

  Scale
];

let VueAMap = {
  initAMapApiLoader,
  AMapManager
};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  components.map(_component => {
    // register component
    Vue.component(_component.name, _component);

    // component cache
    VueAMap[upperCamelCase(_component.name).replace(/^El/, '')] = _component;
  });
};

const install = function(Vue) {
  /* istanbul ignore if */
  if (install.installed) return;
  VueAMap.install(Vue);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
;

export default VueAMap;

export {
  AMapManager,
  initAMapApiLoader,
  createCustomComponent
};
