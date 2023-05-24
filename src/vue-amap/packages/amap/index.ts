import Amap from './amap.vue'
import type {Plugin, App} from "vue";
Amap.install = (app: App) => {
  app.component(Amap.name, Amap)
  return app
}
export const ElAmap = Amap as typeof Amap & Plugin
export default ElAmap
