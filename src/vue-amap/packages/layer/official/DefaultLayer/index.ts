import DefaultLayer from './DefaultLayer.vue'
import type {Plugin, App} from "vue";
DefaultLayer.install = (app: App) => {
  app.component(DefaultLayer.name, DefaultLayer)
  return app
}
export const ElAmapLayerDefault = DefaultLayer as typeof DefaultLayer & Plugin
export default ElAmapLayerDefault
