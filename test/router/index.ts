import {createRouter, createWebHashHistory} from "vue-router";

export const routes = [
  {path: '/',name: '地图', component: () => import('../views/Map.vue')},
  {path: '/infoWindow',name: '信息框', component: () => import('../views/InfoWindow.vue')},
  {path: '/layer/canvas',name: 'Canvas图层', component: () => import('../views/layer/Canvas.vue')},
  {path: '/layer/video',name: 'Video图层', component: () => import('../views/layer/Video.vue')},
  {path: '/layer/custom',name: '自定义图层', component: () => import('../views/layer/Custom.vue')},
  {path: '/layer/flexible',name: '灵活切片图层', component: () => import('../views/layer/Flexible.vue')},
  {path: '/layer/heatMap',name: '热力图', component:  () => import('../views/layer/HeatMap.vue')},
  {path: '/layer/image',name: '图片图层', component: () => import('../views/layer/Image.vue')},
  {path: '/util/districtCluster', name: '区划聚合图层', component: () => import('../views/layer/DistrictCluster.vue')},
  {path: '/layer/official',name: '官方图层', component: () => import('../views/layer/Official.vue')},
  {path: '/layer/standard',name: '标准图层', component: () => import('../views/layer/Standard.vue')},
  {path: '/layer/customXyz', name: '自定义瓦片图层', component: () => import('../views/layer/CustomXyz.vue')},
  {path: '/loca/grid',name: 'loca网格图', component: () => import('../views/loca/Grid.vue')},
  {path: '/loca/heatmap',name: 'loca热力图', component: () => import('../views/loca/HeatMap.vue')},
  {path: '/loca/heatmapbuffer',name: 'loca热力图BUFFER', component: () => import('../views/loca/HeatMapBuffer.vue')},
  {path: '/loca/hexagon',name: 'loca蜂窝网格图', component: () => import('../views/loca/Hexagon.vue')},
  {path: '/loca/icon',name: 'loca图标图层', component: () => import('../views/loca/Icon.vue')},
  {path: '/loca/line',name: 'loca线图层', component: () => import('../views/loca/Line.vue')},
  {path: '/loca/link',name: 'loca链接线图层', component: () => import('../views/loca/Link.vue')},
  {path: '/loca/point',name: 'loca圆点图层', component: () => import('../views/loca/Point.vue')},
  {path: '/loca/polygon',name: 'loca面图层', component: () => import('../views/loca/PolygonLayer.vue')},
  {path: '/loca/prism',name: 'loca棱柱图层', component: () => import('../views/loca/PrismLayer.vue')},
  {path: '/loca/pulseLine',name: 'loca轨迹线图层', component: () => import('../views/loca/PulseLineLayer.vue')},
  {path: '/loca/pulseLink',name: 'loca连接飞线图层', component: () => import('../views/loca/PulseLinkLayer.vue')},
  {path: '/loca/scatter',name: 'loca贴地点图层', component: () => import('../views/loca/ScatterLayer.vue')},
  {path: '/loca/zmarker',name: 'loca垂直于大地表面的 Marker 图层', component: () => import('../views/loca/ZMarkerLayer.vue')},
  {path: '/marker/circle',name: '标号圆', component: () => import('../views/marker/CircleMarker.vue')},
  {path: '/marker/elasticMarker',name: 'marker灵活点标记', component: () => import('../views/marker/ElasticMarker.vue')},
  {path: '/marker/labelMarker',name: 'marker标注类', component: () => import('../views/marker/LabelMarker.vue')},
  {path: '/marker/marker',name: 'marker点标记', component: () => import('../views/marker/Marker.vue')},
  {path: '/marker/markerCluster',name: 'marker点聚合', component: () => import('../views/marker/MarkerCluster.vue')},
  {path: '/marker/massMarker',name: 'marker海量点', component: () => import('../views/marker/MassMarker.vue')},
  {path: '/marker/text',name: 'marker文本', component: () => import('../views/marker/Text.vue')},
  {path: '/vector/bezierCurve',name: 'vector贝塞尔曲线', component: () => import('../views/vector/BezierCurve.vue')},
  {path: '/vector/circle',name: 'vector圆', component: () => import('../views/vector/Circle.vue')},
  {path: '/vector/ellipse',name: 'vector椭圆', component: () => import('../views/vector/Ellipse.vue')},
  {path: '/vector/geoJSON',name: 'vector GeoJSON', component: () => import('../views/vector/GeoJSON.vue')},
  {path: '/vector/polygon', name: 'vector多边形', component: () => import('../views/vector/Polygon.vue')},
  {path: '/vector/polyline',name: 'vector折线', component: () => import('../views/vector/Polyline.vue')},
  {path: '/vector/rectangle',name: 'vector矩形', component: () => import('../views/vector/Rectangle.vue')},
  {path: '/layer/tiles3D',name: '3DTiles图层', component: () => import('../views/layer/Tiles3D.vue')},
  {path: '/three/gltf',name: 'ThreeJS Gltf示例', component: () => import('../views/three/Gltf.vue')},
  {path: '/three/gltf_popup',name: 'ThreeJS Gltf示例(Popup)', component: () => import('../views/three/Gltf_Popup.vue')},
  {path: '/three/threeVideo',name: 'ThreeJS 视频', component: () => import('../views/three/ThreeVideo.vue')},
  {path: '/three/polygon',name: 'ThreeJS面图层', component: () => import('../views/three/Polygon.vue')},
  {path: '/three/3dtiles',name: 'ThreeJS 3Dtiles图层', component: () => import('../views/three/Tiles3d.vue')},
  {path: '/loca/laser',name: 'loca激光图层', component: () => import('../views/loca/Laser.vue')},
  {path: '/util/mouseTool', name: '鼠标工具插件', component: () => import('../views/util/MouseTool.vue')},
  {path: '/hooks/citySearch', name: 'CitySearch ', component: () => import('../views/hooks/citySearch.vue')},
  {path: '/hooks/weather', name: '天气插件 ', component: () => import('../views/hooks/weather.vue')},
  {path: '/hooks/geolocation', name: '定位插件 ', component: () => import('../views/hooks/geolocation.vue')},
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
