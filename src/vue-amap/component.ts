import { ElAmap } from './packages/amap'
import {ElAmapControlControlBar} from './packages/control/ControlBar'
import {ElAmapControlHawkEye} from './packages/control/HawkEye'
import {ElAmapControlMapType} from './packages/control/MapType'
import {ElAmapControlScale} from './packages/control/Scale'
import {ElAmapControlToolBar} from './packages/control/ToolBar'
import {ElAmapSearchBox} from './packages/control/SearchBox'
import {ElAmapInfoWindow} from './packages/infoWindow/InfoWindow'
import {ElAmapLayerCanvas} from './packages/layer/data/Canvas'
import {ElAmapLayerCustom} from './packages/layer/data/Custom'
import {ElAmapLayerFlexible} from './packages/layer/data/Flexible'
import {ElAmapLayerGlCustom} from './packages/layer/data/GLCustom'
import {ElAmapLayerHeatMap} from './packages/layer/data/HeatMap'
import {ElAmapLayerImage} from './packages/layer/data/Image'
import {ElAmapLayerLabels} from './packages/layer/data/Labels'
import {ElAmapLayerVector} from './packages/layer/data/Vector'
import {ElAmapLayerBuildings} from './packages/layer/official/Buildings'
import {ElAmapLayerDefault} from './packages/layer/official/DefaultLayer'
import {ElAmapLayerDistrict} from './packages/layer/official/DistrictLayer'
import {ElAmapLayerIndoorMap} from './packages/layer/official/IndoorMap'
import {ElAmapLayerRoadNet} from './packages/layer/official/RoadNet'
import {ElAmapLayerSatellite} from './packages/layer/official/Satellite'
import {ElAmapLayerTile} from './packages/layer/official/TileLayer'
import {ElAmapLayerTraffic} from './packages/layer/official/Traffic'
import {ElAmapLayerMapboxVectorTile} from './packages/layer/standard/MapboxVectorTileLayer'
import {ElAmapLayerWms} from './packages/layer/standard/WMS'
import {ElAmapLayerWmts} from './packages/layer/standard/WMTS'
import {ElAmapElasticMarker} from './packages/marker/ElasticMarker'
import {ElAmapLabelMarker} from './packages/marker/LabelMarker'
import {ElAmapMarker} from './packages/marker/Marker'
import {ElAmapMarkerCluster} from './packages/marker/MarkerCluster'
import {ElAmapMassMarks} from './packages/marker/MassMarks'
import {ElAmapText} from './packages/marker/Text'
import {ElAmapBezierCurve} from './packages/vector/BezierCurve'
import {ElAmapCircle} from './packages/vector/Circle'
import {ElAmapEllipse} from './packages/vector/Ellipse'
import {ElAmapGeojson} from './packages/vector/GeoJSON'
import {ElAmapPolygon} from './packages/vector/Polygon'
import {ElAmapPolyline} from './packages/vector/Polyline'
import {ElAmapRectangle} from './packages/vector/Rectangle'
import {ElAmapLayerTiles3d} from './packages/layer/data/Tiles3D'
import {ElAmapControlGeolocation} from './packages/control/Geolocation'
import {ElAmapCircleMarker} from './packages/marker/CircleMarker'
import {ElAmapLayerVideo} from "./packages/layer/data/Video"
import {ElAmapMouseTool} from './packages/util/MouseTool'
import {ElAmapLayerDistrictCluster} from './packages/layer/data/DistrictCluster'
import {ElAmapLayerCustomXyz} from './packages/layer/data/CustomXyz'

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
  ElAmapControlGeolocation,
  ElAmapCircleMarker,
  ElAmapLayerVideo,
  ElAmapMouseTool,
  ElAmapLayerDistrictCluster,
  ElAmapLayerCustomXyz
] as Plugin[]
