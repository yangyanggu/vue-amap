import Video from './Video.vue'
import type {Plugin, App} from "vue";
Video.install = (app: App) => {
  app.component(Video.name, Video)
  return app
}
export const ElAmapLayerVideo = Video as typeof Video & Plugin
export default ElAmapLayerVideo
