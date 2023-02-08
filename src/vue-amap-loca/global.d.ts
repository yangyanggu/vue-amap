// GlobalComponents for Volar

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElAmapLocaGrid: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaGrid'],
    ElAmapLocaHeatmap: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaHeatmap'],
    ElAmapLocaHexagon: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaHexagon'],
    ElAmapLocaIcon: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaIcon'],
    ElAmapLocaLine: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaLine'],
    ElAmapLocaLink: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaLink'],
    ElAmapLoca: typeof import('@vuemap/vue-amap-loca')['ElAmapLoca'],
    ElAmapLocaPoint: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaPoint'],
    ElAmapLocaPolygon: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaPolygon'],
    ElAmapLocaPrism: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaPrism'],
    ElAmapLocaPulseLine: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaPulseLine'],
    ElAmapLocaPulseLink: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaPulseLink'],
    ElAmapLocaScatter: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaScatter'],
    ElAmapLocaZMarker: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaZMarker'],
    ElAmapLocaAmbientLight: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaAmbientLight'],
    ElAmapLocaDirectionalLight: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaDirectionalLight'],
    ElAmapLocaPointLight: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaPointLight'],
    ElAmapLocaLaser: typeof import('@vuemap/vue-amap-loca')['ElAmapLocaLaser'],
  }
}

export {}
