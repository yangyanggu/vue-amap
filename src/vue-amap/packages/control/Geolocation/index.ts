import Geolocation from './Geolocation.vue'
import type {Plugin, App} from "vue";
Geolocation.install = (app: App) => {
  app.component(Geolocation.name, Geolocation)
  return app
}
export const ElAmapControlGeolocation = Geolocation as typeof Geolocation & Plugin
export default ElAmapControlGeolocation
