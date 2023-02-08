// GlobalComponents for Volar

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElAmapLayerThree: typeof import('@vuemap/vue-amap-extra')['ElAmapLayerThree'],
    ElAmapThreeGltf: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeGltf'],
    ElAmapThreeLightAmbient: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeLightAmbient'],
    ElAmapThreeLightDirectional: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeLightDirectional'],
    ElAmapThreeLightHemisphere: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeLightHemisphere'],
    ElAmapThreeLightPoint: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeLightPoint'],
    ElAmapThreeLightSpot: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeLightSpot'],
    ElAmapThreePolygon: typeof import('@vuemap/vue-amap-extra')['ElAmapThreePolygon'],
    ElAmapThreeVideo: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeVideo'],
    ElAmapThreeTiles3d: typeof import('@vuemap/vue-amap-extra')['ElAmapThreeTiles3d'],
  }
}

export {}
