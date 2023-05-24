import ThreeTiles3d from './ThreeTiles3d.vue'
import type {Plugin, App} from "vue";
ThreeTiles3d.install = (app: App) => {
  app.component(ThreeTiles3d.name, ThreeTiles3d)
  return app
}
export const ElAmapThreeTiles3d = ThreeTiles3d as typeof ThreeTiles3d & Plugin
export default ElAmapThreeTiles3d
