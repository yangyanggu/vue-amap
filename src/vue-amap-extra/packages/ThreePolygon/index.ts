import ThreePolygon from './ThreePolygon.vue'
import type {Plugin, App} from "vue";
ThreePolygon.install = (app: App) => {
  app.component(ThreePolygon.name, ThreePolygon)
  return app
}
export const ElAmapThreePolygon = ThreePolygon as typeof ThreePolygon & Plugin
export default ElAmapThreePolygon
