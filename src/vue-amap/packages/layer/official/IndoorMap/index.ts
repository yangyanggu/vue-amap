import IndoorMap from './IndoorMap.vue'
import type {Plugin, App} from "vue";
IndoorMap.install = (app: App) => {
  app.component(IndoorMap.name, IndoorMap)
  return app
}
export const ElAmapLayerIndoorMap = IndoorMap as typeof IndoorMap & Plugin
export default ElAmapLayerIndoorMap
