import {createRouter, createWebHashHistory} from "vue-router";

import Map from '../views/Map.vue';
import InfoWindow from '../views/InfoWindow.vue'
import Canvas from "../views/layer/Canvas.vue";
import Custom from "../views/layer/Custom.vue";
import Flexible from "../views/layer/Flexible.vue";
import HeatMap from "../views/layer/HeatMap.vue";
import Image from "../views/layer/Image.vue";
import Official from "../views/layer/Official.vue";
import Standard from "../views/layer/Standard.vue";
import Grid from "../views/loca/Grid.vue";
import Hexagon from "../views/loca/Hexagon.vue";
import Icon from "../views/loca/Icon.vue";
import Line from "../views/loca/Line.vue";
import Link from "../views/loca/Link.vue";
import Point from "../views/loca/Point.vue";
import PolygonLayer from "../views/loca/PolygonLayer.vue";
import PrismLayer from "../views/loca/PrismLayer.vue";
import PulseLineLayer from "../views/loca/PulseLineLayer.vue";
import PulseLinkLayer from "../views/loca/PulseLinkLayer.vue";
import ScatterLayer from "../views/loca/ScatterLayer.vue";
import ZMarkerLayer from "../views/loca/ZMarkerLayer.vue";
import ElasticMarker from "../views/marker/ElasticMarker.vue";
import LabelMarker from "../views/marker/LabelMarker.vue";
import Marker from "../views/marker/Marker.vue";
import MarkerCluster from "../views/marker/MarkerCluster.vue";
import MassMarker from "../views/marker/MassMarker.vue";
import Text from "../views/marker/Text.vue";
import BezierCurve from "../views/vector/BezierCurve.vue";
import Circle from "../views/vector/Circle.vue";
import Ellipse from "../views/vector/Ellipse.vue";
import GeoJSON from "../views/vector/GeoJSON.vue";
import Polygon from "../views/vector/Polygon.vue";
import Polyline from "../views/vector/Polyline.vue";
import Rectangle from "../views/vector/Rectangle.vue";
import Tiles3D from "../views/layer/Tiles3D.vue";
import Gltf from '../views/three/Gltf.vue'
import CircleMarker from "../views/marker/CircleMarker.vue";
import HeatMapBuffer from "../views/loca/HeatMapBuffer.vue";
import VideoLayer from '../views/layer/Video.vue'
import LaserLayer from '../views/loca/Laser.vue'
import ThreeVideo from "../views/three/ThreeVideo.vue";
import ThreePolygon from '../views/three/Polygon.vue'
import MouseTool from "../views/util/MouseTool.vue";
import ThreeTiles3d from "../views/three/Tiles3d.vue";
import DistrictCluster from "../views/layer/DistrictCluster.vue";
import CustomXyz from "../views/layer/CustomXyz.vue";

export const routes = [
  {path: '/',name: '地图', component: Map},
  {path: '/infoWindow',name: '信息框', component: InfoWindow},
  {path: '/layer/canvas',name: 'Canvas图层', component: Canvas},
  {path: '/layer/video',name: 'Video图层', component: VideoLayer},
  {path: '/layer/custom',name: '自定义图层', component: Custom},
  {path: '/layer/flexible',name: '灵活切片图层', component: Flexible},
  {path: '/layer/heatMap',name: '热力图', component: HeatMap},
  {path: '/layer/image',name: '图片图层', component: Image},
  {path: '/util/districtCluster', name: '区划聚合图层', component: DistrictCluster},
  {path: '/layer/official',name: '官方图层', component: Official},
  {path: '/layer/standard',name: '标准图层', component: Standard},
  {path: '/layer/customXyz', name: '自定义瓦片图层', component: CustomXyz},
  {path: '/loca/grid',name: 'loca网格图', component: Grid},
  {path: '/loca/heatmap',name: 'loca热力图', component: HeatMap},
  {path: '/loca/heatmapbuffer',name: 'loca热力图BUFFER', component: HeatMapBuffer},
  {path: '/loca/hexagon',name: 'loca蜂窝网格图', component: Hexagon},
  {path: '/loca/icon',name: 'loca图标图层', component: Icon},
  {path: '/loca/line',name: 'loca线图层', component: Line},
  {path: '/loca/link',name: 'loca链接线图层', component: Link},
  {path: '/loca/point',name: 'loca圆点图层', component: Point},
  {path: '/loca/polygon',name: 'loca面图层', component: PolygonLayer},
  {path: '/loca/prism',name: 'loca棱柱图层', component: PrismLayer},
  {path: '/loca/pulseLine',name: 'loca轨迹线图层', component: PulseLineLayer},
  {path: '/loca/pulseLink',name: 'loca连接飞线图层', component: PulseLinkLayer},
  {path: '/loca/scatter',name: 'loca贴地点图层', component: ScatterLayer},
  {path: '/loca/zmarker',name: 'loca垂直于大地表面的 Marker 图层', component: ZMarkerLayer},
  {path: '/marker/circle',name: '标号圆', component: CircleMarker},
  {path: '/marker/elasticMarker',name: 'marker灵活点标记', component: ElasticMarker},
  {path: '/marker/labelMarker',name: 'marker标注类', component: LabelMarker},
  {path: '/marker/marker',name: 'marker点标记', component: Marker},
  {path: '/marker/markerCluster',name: 'marker点聚合', component: MarkerCluster},
  {path: '/marker/massMarker',name: 'marker海量点', component: MassMarker},
  {path: '/marker/text',name: 'marker文本', component: Text},
  {path: '/vector/bezierCurve',name: 'vector贝塞尔曲线', component: BezierCurve},
  {path: '/vector/circle',name: 'vector圆', component: Circle},
  {path: '/vector/ellipse',name: 'vector椭圆', component: Ellipse},
  {path: '/vector/geoJSON',name: 'vector GeoJSON', component: GeoJSON},
  {path: '/vector/polygon', name: 'vector多边形', component: Polygon},
  {path: '/vector/polyline',name: 'vector折线', component: Polyline},
  {path: '/vector/rectangle',name: 'vector矩形', component: Rectangle},
  {path: '/layer/tiles3D',name: '3DTiles图层', component: Tiles3D},
  {path: '/three/gltf',name: 'ThreeJS Gltf示例', component: Gltf},
  {path: '/three/threeVideo',name: 'ThreeJS 视频', component: ThreeVideo},
  {path: '/three/polygon',name: 'ThreeJS面图层', component: ThreePolygon},
  {path: '/three/3dtiles',name: 'ThreeJS 3Dtiles图层', component: ThreeTiles3d},
  {path: '/loca/laser',name: 'loca激光图层', component: LaserLayer},
  {path: '/util/mouseTool', name: '鼠标工具插件', component: MouseTool},
  {path: '/hooks/citySearch', name: 'CitySearch ', component: () => import('../views/hooks/citySearch.vue')},
  {path: '/hooks/weather', name: '天气插件 ', component: () => import('../views/hooks/weather.vue')},
  {path: '/hooks/geolocation', name: '定位插件 ', component: () => import('../views/hooks/geolocation.vue')},
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
