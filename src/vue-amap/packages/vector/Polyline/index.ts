import Polyline from './Polyline.vue';
import type {Plugin, App} from "vue";
Polyline.install = (app: App) => {
  app.component(Polyline.name, Polyline);
  return app;
};
export const ElAmapPolyline = Polyline as typeof Polyline & Plugin;
export default ElAmapPolyline;

export type ElAmapPolylineInstance = InstanceType<typeof Polyline>
