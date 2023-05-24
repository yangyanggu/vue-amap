import Polygon from './Polygon.vue'
import type {Plugin, App} from "vue";
Polygon.install = (app: App) => {
  app.component(Polygon.name, Polygon)
  return app
}
export const ElAmapPolygon = Polygon as typeof Polygon & Plugin
export default ElAmapPolygon
