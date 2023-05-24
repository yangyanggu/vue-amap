import PolygonLayer from './PolygonLayer.vue'
import type {Plugin, App} from "vue";
PolygonLayer.install = (app: App) => {
  app.component(PolygonLayer.name, PolygonLayer)
  return app
}
export const ElAmapLocaPolygon = PolygonLayer as typeof PolygonLayer & Plugin
export default ElAmapLocaPolygon
