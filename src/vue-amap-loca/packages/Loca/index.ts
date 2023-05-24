import Loca from './Loca.vue'
import type {Plugin, App} from "vue";
Loca.install = (app: App) => {
  app.component(Loca.name, Loca)
  return app
}
export const ElAmapLoca = Loca as typeof Loca & Plugin
export default ElAmapLoca
