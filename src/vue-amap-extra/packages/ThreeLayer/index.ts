import ThreeLayer from './ThreeLayer.vue'
import type {Plugin, App} from "vue";
ThreeLayer.install = (app: App) => {
  app.component(ThreeLayer.name, ThreeLayer)
  return app
}
export const ElAmapLayerThree = ThreeLayer as typeof ThreeLayer & Plugin
export default ElAmapLayerThree
