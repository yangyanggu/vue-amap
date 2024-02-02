import MarkerCluster from './MarkerCluster.vue';
import type {Plugin, App} from "vue";
MarkerCluster.install = (app: App) => {
  app.component(MarkerCluster.name, MarkerCluster);
  return app;
};
export const ElAmapMarkerCluster = MarkerCluster as typeof MarkerCluster & Plugin;
export default ElAmapMarkerCluster;

export type ElAmapMarkerClusterInstance = InstanceType<typeof MarkerCluster>
