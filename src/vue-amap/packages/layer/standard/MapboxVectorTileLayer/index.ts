import MapboxVectorTileLayer from './MapboxVectorTileLayer.vue'
import type {Plugin, App} from "vue";
MapboxVectorTileLayer.install = (app: App) => {
  app.component(MapboxVectorTileLayer.name, MapboxVectorTileLayer)
  return app
}
export const ElAmapLayerMapboxVectorTile = MapboxVectorTileLayer as typeof MapboxVectorTileLayer & Plugin
export default ElAmapLayerMapboxVectorTile
