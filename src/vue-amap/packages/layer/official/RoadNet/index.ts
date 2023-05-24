import RoadNet from './RoadNet.vue'
import type {Plugin, App} from "vue";
RoadNet.install = (app: App) => {
  app.component(RoadNet.name, RoadNet)
  return app
}
export const ElAmapLayerRoadNet = RoadNet as typeof RoadNet & Plugin
export default ElAmapLayerRoadNet
