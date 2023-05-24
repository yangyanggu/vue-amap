import AmbientLight from './AmbientLight.vue'
import type {Plugin, App} from "vue";
AmbientLight.install = (app: App) => {
  app.component(AmbientLight.name, AmbientLight)
  return app
}
export const ElAmapLocaAmbientLight = AmbientLight as typeof AmbientLight & Plugin
export default ElAmapLocaAmbientLight
