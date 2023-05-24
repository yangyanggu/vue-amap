import ThreeVideo from './ThreeVideo.vue'
import type {Plugin, App} from "vue";
ThreeVideo.install = (app: App) => {
  app.component(ThreeVideo.name, ThreeVideo)
  return app
}
export const ElAmapThreeVideo = ThreeVideo as typeof ThreeVideo & Plugin
export default ElAmapThreeVideo
