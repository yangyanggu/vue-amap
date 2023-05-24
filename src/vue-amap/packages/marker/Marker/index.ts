import Marker from './Marker.vue'
import type {Plugin, App} from "vue";
Marker.install = (app: App) => {
  app.component(Marker.name, Marker)
  return app
}
export const ElAmapMarker = Marker as typeof Marker & Plugin
export default ElAmapMarker
