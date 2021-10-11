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
import GLCustomLayer from '@/components/layer/data/GLCustom';

// Marker 点标记导入

import Marker from '@/components/marker/Marker.vue';
import LabelMarker from '@/components/marker/LabelMarker';
import Text from '@/components/marker/Text';
import ElasticMarker from '@/components/marker/ElasticMarker';
import MarkerCluster from '@/components/marker/MarkerCluster';
import MassMarks from '@/components/marker/MassMarks';

// 信息窗体
import InfoWindow from '@/components/infoWindow/InfoWindow';

// 矢量图形
import Polygon from '@/components/vector/Polygon';
import Polyline from '@/components/vector/Polyline';
import BezierCurve from '@/components/vector/BezierCurve';
import Circle from '@/components/vector/Circle';
import Ellipse from '@/components/vector/Ellipse';
import Rectangle from '@/components/vector/Rectangle';
import GeoJSON from '@/components/vector/GeoJSON';

// Control 控件导入
import Scale from './components/control/Scale';
import ToolBar from '@/components/control/ToolBar';
import ControlBar from '@/components/control/ControlBar';
import MapType from '@/components/control/MapType';
import HawkEye from '@/components/control/HawkEye';

// Loca 导入
import Loca from '@/components/loca/Loca';
import PointLayer from '@/components/loca/PointLayer';
import IconLayer from '@/components/loca/IconLayer';
import PrismLayer from '@/components/loca/PrismLayer';
import LineLayer from '@/components/loca/LineLayer';
import PolygonLayer from '@/components/loca/PolygonLayer';
import LinkLayer from '@/components/loca/LinkLayer';
import HeatMapLayer from '@/components/loca/HeatMapLayer';
import HexagonLayer from '@/components/loca/HexagonLayer';
import GridLayer from '@/components/loca/GridLayer';
import ScatterLayer from '@/components/loca/ScatterLayer';
import PulseLineLayer from '@/components/loca/PulseLineLayer';

// managers
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
  GLCustomLayer,

  Marker,
  LabelMarker,
  Text,
  ElasticMarker,
  MarkerCluster,
  MassMarks,

  InfoWindow,

  Polygon,
  Polyline,
  BezierCurve,
  Circle,
  Ellipse,
  Rectangle,
  GeoJSON,

  Scale,
  ToolBar,
  ControlBar,
  MapType,
  HawkEye,

  Loca,
  PointLayer,
  IconLayer,
  PrismLayer,
  LineLayer,
  PolygonLayer,
  LinkLayer,
  HeatMapLayer,
  HexagonLayer,
  GridLayer,
  ScatterLayer,
  PulseLineLayer
];

let VueAMap = {
  initAMapApiLoader
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
  initAMapApiLoader,
  createCustomComponent
};
