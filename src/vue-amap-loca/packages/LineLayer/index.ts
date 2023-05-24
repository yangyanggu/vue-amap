import LineLayer from './LineLayer.vue'
import type {Plugin, App} from "vue";
LineLayer.install = (app: App) => {
  app.component(LineLayer.name, LineLayer)
  return app
}
export const ElAmapLocaLine = LineLayer as typeof LineLayer & Plugin
export default ElAmapLocaLine
