import GeoJSON from './GeoJSON.vue';
import type {Plugin, App} from "vue";
GeoJSON.install = (app: App) => {
  app.component(GeoJSON.name, GeoJSON);
  return app;
};
export const ElAmapGeojson = GeoJSON as typeof GeoJSON & Plugin;
export default ElAmapGeojson;

export type ElAmapGeojsonInstance = InstanceType<typeof GeoJSON>
