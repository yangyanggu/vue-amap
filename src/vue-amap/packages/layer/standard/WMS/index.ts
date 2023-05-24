import WMS from './WMS.vue'
import type {Plugin, App} from "vue";
WMS.install = (app: App) => {
  app.component(WMS.name, WMS)
  return app
}
export const ElAmapLayerWms = WMS as typeof WMS & Plugin
export default ElAmapLayerWms
