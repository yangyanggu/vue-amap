import MouseTool from './MouseTool.vue'
import type {Plugin, App} from "vue";
MouseTool.install = (app: App) => {
  app.component(MouseTool.name, MouseTool)
  return app
}
export const ElAmapMouseTool = MouseTool as typeof MouseTool & Plugin
export default ElAmapMouseTool
