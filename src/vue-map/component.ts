import { ElAmap } from '@vue-map/packages/amap'
import {ElAmapControlControlBar} from '@vue-map/packages/control/ControlBar'
import {ElAmapControlHawkEye} from '@vue-map/packages/control/HawkEye'
import {ElAmapControlMapType} from '@vue-map/packages/control/MapType'
import {ElAmapControlScale} from '@vue-map/packages/control/Scale'
import {ElAmapControlToolBar} from '@vue-map/packages/control/ToolBar'
import {ElAmapSearchBox} from '@vue-map/packages/ext/SearchBox'
import {ElAmapInfoWindow} from '@vue-map/packages/infoWindow/InfoWindow'
import {ElAmapLayerCanvas} from '@vue-map/packages/layer/data/Canvas'
import {ElAmapLayerCustom} from '@vue-map/packages/layer/data/Custom'
import {ElAmapLayerFlexible} from '@vue-map/packages/layer/data/Flexible'
import {ElAmapLayerGlCustom} from '@vue-map/packages/layer/data/GLCustom'
import {ElAmapLayerHeatMap} from '@vue-map/packages/layer/data/HeatMap'
import {ElAmapLayerImage} from '@vue-map/packages/layer/data/Image'
import {ElAmapLayerLabels} from '@vue-map/packages/layer/data/Labels'
import {ElAmapLayerVector} from '@vue-map/packages/layer/data/Vector'
import {ElAmapLayerBuildings} from '@vue-map/packages/layer/official/Buildings'
import {ElAmapLayerDefault} from '@vue-map/packages/layer/official/DefaultLayer'
import {ElAmapLayerDistrict} from '@vue-map/packages/layer/official/DistrictLayer'
import {ElAmapLayerIndoorMap} from '@vue-map/packages/layer/official/IndoorMap'
import {ElAmapLayerRoadNet} from '@vue-map/packages/layer/official/RoadNet'
import {ElAmapLayerSatellite} from '@vue-map/packages/layer/official/Satellite'
import {ElAmapLayerTile} from '@vue-map/packages/layer/official/TileLayer'
import {ElAmapLayerTraffic} from '@vue-map/packages/layer/official/Traffic'
import {ElAmapLayerMapboxVectorTile} from '@vue-map/packages/layer/standard/MapboxVectorTileLayer'
import {ElAmapLayerWms} from '@vue-map/packages/layer/standard/WMS'
import {ElAmapLayerWmts} from '@vue-map/packages/layer/standard/WMTS'
import {ElAmapLocaGrid} from '@vue-map/packages/loca/GridLayer'
import {ElAmapLocaHeatmap} from '@vue-map/packages/loca/HeatMapLayer'
import {ElAmapLocaHexagon} from '@vue-map/packages/loca/HexagonLayer'
import {ElAmapLocaIcon} from '@vue-map/packages/loca/IconLayer'
import {ElAmapLocaLine} from '@vue-map/packages/loca/LineLayer'
import {ElAmapLocaLink} from '@vue-map/packages/loca/LinkLayer'
import {ElAmapLoca} from '@vue-map/packages/loca/Loca'
import {ElAmapLocaPoint} from '@vue-map/packages/loca/PointLayer'
import {ElAmapLocaPolygon} from '@vue-map/packages/loca/PolygonLayer'
import {ElAmapLocaPrism} from '@vue-map/packages/loca/PrismLayer'
import {ElAmapLocaPulseLine} from '@vue-map/packages/loca/PulseLineLayer'
import {ElAmapLocaPulseLink} from '@vue-map/packages/loca/PulseLinkLayer'
import {ElAmapLocaScatter} from '@vue-map/packages/loca/ScatterLayer'
import {ElAmapLocaZMarker} from '@vue-map/packages/loca/ZMarkerLayer'
import {ElAmapElasticMarker} from '@vue-map/packages/marker/ElasticMarker'
import {ElAmapLabelMarker} from '@vue-map/packages/marker/LabelMarker'
import {ElAmapMarker} from '@vue-map/packages/marker/Marker'
import {ElAmapMarkerCluster} from '@vue-map/packages/marker/MarkerCluster'
import {ElAmapMassMarks} from '@vue-map/packages/marker/MassMarks'
import {ElAmapText} from '@vue-map/packages/marker/Text'
import {ElAmapBezierCurve} from '@vue-map/packages/vector/BezierCurve'
import {ElAmapCircle} from '@vue-map/packages/vector/Circle'
import {ElAmapEllipse} from '@vue-map/packages/vector/Ellipse'
import {ElAmapGeojson} from '@vue-map/packages/vector/GeoJSON'
import {ElAmapPolygon} from '@vue-map/packages/vector/Polygon'
import {ElAmapPolyline} from '@vue-map/packages/vector/Polyline'
import {ElAmapRectangle} from '@vue-map/packages/vector/Rectangle'
import {ElAmapLayerTiles3d} from '@vue-map/packages/layer/data/Tiles3D'
import {ElAmapLayerThree} from '@vue-map/packages/ext/ThreeLayer'
import {ElAmapThreeGltf} from '@vue-map/packages/ext/ThreeGltf'
import {ElAmapControlGeolocation} from '@vue-map/packages/control/Geolocation'
import {ElAmapCircleMarker} from '@vue-map/packages/marker/CircleMarker'
import {ElAmapLocaAmbientLight} from '@vue-map/packages/loca/AmbientLight'
import {ElAmapLocaDirectionalLight} from '@vue-map/packages/loca/DirectionalLight'
import {ElAmapLocaPointLight} from '@vue-map/packages/loca/PointLight'

import type { Plugin } from 'vue'

export default [
  ElAmap,
  ElAmapControlControlBar,
  ElAmapControlHawkEye,
  ElAmapControlMapType,
  ElAmapControlScale,
  ElAmapControlToolBar,
  ElAmapSearchBox,
  ElAmapInfoWindow,
  ElAmapLayerCanvas,
  ElAmapLayerCustom,
  ElAmapLayerFlexible,
  ElAmapLayerGlCustom,
  ElAmapLayerHeatMap,
  ElAmapLayerImage,
  ElAmapLayerLabels,
  ElAmapLayerVector,
  ElAmapLayerBuildings,
  ElAmapLayerDefault,
  ElAmapLayerDistrict,
  ElAmapLayerIndoorMap,
  ElAmapLayerRoadNet,
  ElAmapLayerSatellite,
  ElAmapLayerTile,
  ElAmapLayerTraffic,
  ElAmapLayerMapboxVectorTile,
  ElAmapLayerWms,
  ElAmapLayerWmts,
  ElAmapLocaGrid,
  ElAmapLocaHeatmap,
  ElAmapLocaHexagon,
  ElAmapLocaIcon,
  ElAmapLocaLine,
  ElAmapLocaLink,
  ElAmapLoca,
  ElAmapLocaPoint,
  ElAmapLocaPolygon,
  ElAmapLocaPrism,
  ElAmapLocaPulseLine,
  ElAmapLocaPulseLink,
  ElAmapLocaScatter,
  ElAmapLocaZMarker,
  ElAmapElasticMarker,
  ElAmapLabelMarker,
  ElAmapMarker,
  ElAmapMarkerCluster,
  ElAmapMassMarks,
  ElAmapText,
  ElAmapBezierCurve,
  ElAmapCircle,
  ElAmapEllipse,
  ElAmapGeojson,
  ElAmapPolygon,
  ElAmapPolyline,
  ElAmapRectangle,
  ElAmapLayerTiles3d,
  ElAmapLayerThree,
  ElAmapThreeGltf,
  ElAmapControlGeolocation,
  ElAmapCircleMarker,
  ElAmapLocaAmbientLight,
  ElAmapLocaDirectionalLight,
  ElAmapLocaPointLight
] as Plugin[]
