import MapType from './MapType.vue';
import type {Plugin, App} from "vue";
MapType.install = (app: App) => {
  app.component(MapType.name, MapType);
  return app;
};
export const ElAmapControlMapType = MapType as typeof MapType & Plugin;
export default ElAmapControlMapType;

export type ElAmapControlMapTypeInstance = InstanceType<typeof MapType>
