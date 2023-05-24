import TileLayer from './TileLayer.vue'
import type {Plugin, App} from "vue";
TileLayer.install = (app: App) => {
  app.component(TileLayer.name, TileLayer)
  return app
}
export const ElAmapLayerTile = TileLayer as typeof TileLayer & Plugin
export default ElAmapLayerTile
