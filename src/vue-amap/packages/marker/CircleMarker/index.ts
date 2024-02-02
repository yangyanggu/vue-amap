import CircleMarker from './CircleMarker.vue';
import type {Plugin, App} from "vue";
CircleMarker.install = (app: App) => {
  app.component(CircleMarker.name, CircleMarker);
  return app;
};
export const ElAmapCircleMarker = CircleMarker as typeof CircleMarker & Plugin;
export default ElAmapCircleMarker;

export type ElAmapCircleMarkerInstance = InstanceType<typeof CircleMarker>
