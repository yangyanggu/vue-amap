import PointLayer from './PointLayer.vue';
import type {Plugin, App} from "vue";
PointLayer.install = (app: App) => {
  app.component(PointLayer.name, PointLayer);
  return app;
};
export const ElAmapLocaPoint = PointLayer as typeof PointLayer & Plugin;
export default ElAmapLocaPoint;

export type ElAmapLocaPointInstance = InstanceType<typeof PointLayer>
