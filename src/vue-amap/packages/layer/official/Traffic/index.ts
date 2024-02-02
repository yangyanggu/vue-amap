import Traffic from './Traffic.vue';
import type {Plugin, App} from "vue";
Traffic.install = (app: App) => {
  app.component(Traffic.name, Traffic);
  return app;
};
export const ElAmapLayerTraffic = Traffic as typeof Traffic & Plugin;
export default ElAmapLayerTraffic;

export type ElAmapLayerTrafficInstance = InstanceType<typeof Traffic>
