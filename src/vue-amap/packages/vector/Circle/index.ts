import Circle from './Circle.vue'
import type {Plugin, App} from "vue";
Circle.install = (app: App) => {
  app.component(Circle.name, Circle)
  return app
}
export const ElAmapCircle = Circle as typeof Circle & Plugin
export default ElAmapCircle
