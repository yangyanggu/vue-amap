import ThreeGltf from './ThreeGltf.vue'
import type {Plugin, App} from "vue";
ThreeGltf.install = (app: App) => {
  app.component(ThreeGltf.name, ThreeGltf)
  return app
}
export const ElAmapThreeGltf = ThreeGltf as typeof ThreeGltf & Plugin
export default ElAmapThreeGltf
