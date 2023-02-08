import {ElAmapLayerThree} from './packages/ThreeLayer'
import {ElAmapThreeGltf} from './packages/ThreeGltf'
import {ElAmapThreeVideo} from "./packages/ThreeVideo";
import {ElAmapThreeLightAmbient} from './packages/ThreeLightAmbient'
import {ElAmapThreeLightDirectional} from './packages/ThreeLightDirectional'
import {ElAmapThreeLightHemisphere} from './packages/ThreeLightHemisphere'
import {ElAmapThreeLightPoint} from './packages/ThreeLightPoint'
import {ElAmapThreeLightSpot} from './packages/ThreeLightSpot'
import {ElAmapThreePolygon} from './packages/ThreePolygon'
import {ElAmapThreeTiles3d} from './packages/Three3Dtiles'

import type { Plugin } from 'vue'

export default [
  ElAmapLayerThree,
  ElAmapThreeGltf,
  ElAmapThreeVideo,
  ElAmapThreeLightAmbient,
  ElAmapThreeLightDirectional,
  ElAmapThreeLightHemisphere,
  ElAmapThreeLightPoint,
  ElAmapThreeLightSpot,
  ElAmapThreePolygon,
  ElAmapThreeTiles3d,
] as Plugin[]
