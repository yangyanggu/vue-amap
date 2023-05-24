import WMTS from './WMTS.vue'
import type {Plugin, App} from "vue";
WMTS.install = (app: App) => {
  app.component(WMTS.name, WMTS)
  return app
}
export const ElAmapLayerWmts = WMTS as typeof WMTS & Plugin
export default ElAmapLayerWmts
