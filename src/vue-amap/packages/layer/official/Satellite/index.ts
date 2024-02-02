import Satellite from './Satellite.vue';
import type {Plugin, App} from "vue";
Satellite.install = (app: App) => {
  app.component(Satellite.name, Satellite);
  return app;
};
export const ElAmapLayerSatellite = Satellite as typeof Satellite & Plugin;
export default ElAmapLayerSatellite;

export type ElAmapLayerSatelliteInstance = InstanceType<typeof Satellite>
