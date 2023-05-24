import ThreeLightPoint from './ThreeLightPoint.vue'
import type {Plugin, App} from "vue";
ThreeLightPoint.install = (app: App) => {
  app.component(ThreeLightPoint.name, ThreeLightPoint)
  return app
}
export const ElAmapThreeLightPoint = ThreeLightPoint as typeof ThreeLightPoint & Plugin
export default ElAmapThreeLightPoint
