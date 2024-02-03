import ZMarkerLayer from './ZMarkerLayer.vue';
import type {Plugin, App} from "vue";
ZMarkerLayer.install = (app: App) => {
  app.component(ZMarkerLayer.name, ZMarkerLayer);
  return app;
};
export const ElAmapLocaZMarker = ZMarkerLayer as typeof ZMarkerLayer & Plugin;
export default ElAmapLocaZMarker;

export type ElAmapLocaZMarkerInstance = InstanceType<typeof ZMarkerLayer>
