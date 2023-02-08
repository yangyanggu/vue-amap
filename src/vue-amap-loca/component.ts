import {ElAmapLocaGrid} from './packages/GridLayer'
import {ElAmapLocaHeatmap} from './packages/HeatMapLayer'
import {ElAmapLocaHexagon} from './packages/HexagonLayer'
import {ElAmapLocaIcon} from './packages/IconLayer'
import {ElAmapLocaLine} from './packages/LineLayer'
import {ElAmapLocaLink} from './packages/LinkLayer'
import {ElAmapLoca} from './packages/Loca'
import {ElAmapLocaPoint} from './packages/PointLayer'
import {ElAmapLocaPolygon} from './packages/PolygonLayer'
import {ElAmapLocaPrism} from './packages/PrismLayer'
import {ElAmapLocaPulseLine} from './packages/PulseLineLayer'
import {ElAmapLocaPulseLink} from './packages/PulseLinkLayer'
import {ElAmapLocaScatter} from './packages/ScatterLayer'
import {ElAmapLocaZMarker} from './packages/ZMarkerLayer'
import {ElAmapLocaAmbientLight} from './packages/AmbientLight'
import {ElAmapLocaDirectionalLight} from './packages/DirectionalLight'
import {ElAmapLocaPointLight} from './packages/PointLight'
import {ElAmapLocaLaser} from "./packages/LaserLayer"

import type { Plugin } from 'vue'

export default [
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
  ElAmapLocaAmbientLight,
  ElAmapLocaDirectionalLight,
  ElAmapLocaPointLight,
  ElAmapLocaLaser,
] as Plugin[]
