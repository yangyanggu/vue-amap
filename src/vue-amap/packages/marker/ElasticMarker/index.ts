import ElasticMarker from './ElasticMarker.vue';
import type {Plugin, App} from "vue";
ElasticMarker.install = (app: App) => {
  app.component(ElasticMarker.name, ElasticMarker);
  return app;
};
export const ElAmapElasticMarker = ElasticMarker as typeof ElasticMarker & Plugin;
export default ElAmapElasticMarker;

export type ElAmapElasticMarkerInstance = InstanceType<typeof ElasticMarker>
