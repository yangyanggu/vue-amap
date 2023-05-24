import ThreeLightHemisphere from './ThreeLightHemisphere.vue'
import type {Plugin, App} from "vue";
ThreeLightHemisphere.install = (app: App) => {
  app.component(ThreeLightHemisphere.name, ThreeLightHemisphere)
  return app
}
export const ElAmapThreeLightHemisphere = ThreeLightHemisphere as typeof ThreeLightHemisphere & Plugin
export default ElAmapThreeLightHemisphere
