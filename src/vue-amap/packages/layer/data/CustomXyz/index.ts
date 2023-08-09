import CustomXyz from './CustomXyz.vue'
import type {Plugin, App} from "vue";
CustomXyz.install = (app: App) => {
  app.component(CustomXyz.name, CustomXyz)
  return app
}
export const ElAmapLayerCustomXyz = CustomXyz as typeof CustomXyz & Plugin
export default ElAmapLayerCustomXyz
