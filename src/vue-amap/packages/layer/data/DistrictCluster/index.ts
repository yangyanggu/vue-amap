import DistrictCluster from './DistrictCluster.vue'
import type {Plugin, App} from "vue";
DistrictCluster.install = (app: App) => {
  app.component(DistrictCluster.name, DistrictCluster)
  return app
}
export const ElAmapLayerDistrictCluster = DistrictCluster as typeof DistrictCluster & Plugin
export default ElAmapLayerDistrictCluster
