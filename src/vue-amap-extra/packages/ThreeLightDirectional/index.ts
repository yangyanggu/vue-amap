import ThreeLightDirectional from './ThreeLightDirectional.vue'
import type {Plugin, App} from "vue";
ThreeLightDirectional.install = (app: App) => {
  app.component(ThreeLightDirectional.name, ThreeLightDirectional)
  return app
}
export const ElAmapThreeLightDirectional = ThreeLightDirectional as typeof ThreeLightDirectional & Plugin
export default ElAmapThreeLightDirectional
