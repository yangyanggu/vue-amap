import Scale from './Scale.vue'
import type {Plugin, App} from "vue";
Scale.install = (app: App) => {
  app.component(Scale.name, Scale)
  return app
}
export const ElAmapControlScale = Scale as typeof Scale & Plugin
export default ElAmapControlScale
