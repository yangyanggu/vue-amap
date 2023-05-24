import Buildings from './Buildings.vue'
import type {Plugin, App} from "vue";
Buildings.install = (app: App) => {
  app.component(Buildings.name, Buildings)
  return app
}
export const ElAmapLayerBuildings = Buildings as typeof Buildings & Plugin
export default ElAmapLayerBuildings
