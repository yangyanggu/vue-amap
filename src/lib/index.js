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

// Marker 点标记导入

import Marker from './components/marker/Marker.vue';
import AMapCircle from './components/amap-circle.vue';
import AMapGroupImage from './components/amap-ground-image.vue';
import AMapInfoWindow from './components/amap-info-window.vue';
import AMapPolyline from './components/amap-polyline.vue';
import AMapPolygon from './components/amap-polygon.vue';
import AMapText from './components/amap-text.vue';
import AMapBezierCurve from './components/amap-bezier-curve.vue';
import AMapCircleMarker from './components/amap-circle-marker.vue';
import AMapEllipse from './components/amap-ellipse.vue';
import AMapRectangle from './components/amap-rectangle.vue';

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
  Marker,
  AMapCircle,
  AMapGroupImage,
  AMapInfoWindow,
  AMapPolygon,
  AMapPolyline,
  AMapText,
  AMapBezierCurve,
  AMapCircleMarker,
  AMapEllipse,
  AMapRectangle,
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
