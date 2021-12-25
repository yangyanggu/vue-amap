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

const routes = [
  {path: '/', component: Map},
  {path: '/infoWindow', component: InfoWindow},
  {path: '/layer/canvas', component: Canvas},
  {path: '/layer/custom', component: Custom},
  {path: '/layer/flexible', component: Flexible},
  {path: '/layer/heatMap', component: HeatMap},
  {path: '/layer/image', component: Image},
  {path: '/layer/official', component: Official},
  {path: '/layer/standard', component: Standard},
  {path: '/loca/grid', component: Grid},
  {path: '/loca/heatmap', component: HeatMap},
  {path: '/loca/hexagon', component: Hexagon},
  {path: '/loca/icon', component: Icon},
  {path: '/loca/line', component: Line},
  {path: '/loca/link', component: Link},
  {path: '/loca/point', component: Point},
  {path: '/loca/polygon', component: PolygonLayer},
  {path: '/loca/prism', component: PrismLayer},
  {path: '/loca/pulseLine', component: PulseLineLayer},
  {path: '/loca/pulseLink', component: PulseLinkLayer},
  {path: '/loca/scatter', component: ScatterLayer},
  {path: '/loca/zmarker', component: ZMarkerLayer},
  {path: '/marker/elasticMarker', component: ElasticMarker},
  {path: '/marker/labelMarker', component: LabelMarker},
  {path: '/marker/marker', component: Marker},
  {path: '/marker/markerCluster', component: MarkerCluster},
  {path: '/marker/massMarker', component: MassMarker},
  {path: '/marker/text', component: Text},
  {path: '/vector/text', component: BezierCurve},
  {path: '/vector/circle', component: Circle},
  {path: '/vector/ellipse', component: Ellipse},
  {path: '/vector/geoJSON', component: GeoJSON},
  {path: '/vector/polygon', component: Polygon},
  {path: '/vector/polyline', component: Polyline},
  {path: '/vector/rectangle', component: Rectangle}
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
