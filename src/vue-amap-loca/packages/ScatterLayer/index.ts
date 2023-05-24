import ScatterLayer from './ScatterLayer.vue'
import type {Plugin, App} from "vue";
ScatterLayer.install = (app: App) => {
  app.component(ScatterLayer.name, ScatterLayer)
  return app
}
export const ElAmapLocaScatter = ScatterLayer as typeof ScatterLayer & Plugin
export default ElAmapLocaScatter
