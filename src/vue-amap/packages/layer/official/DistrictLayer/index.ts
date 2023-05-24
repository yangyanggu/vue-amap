import DistrictLayer from './DistrictLayer.vue'
import type {Plugin, App} from "vue";
DistrictLayer.install = (app: App) => {
  app.component(DistrictLayer.name, DistrictLayer)
  return app
}
export const ElAmapLayerDistrict = DistrictLayer as typeof DistrictLayer & Plugin
export default ElAmapLayerDistrict
