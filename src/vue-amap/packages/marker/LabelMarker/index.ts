import LabelMarker from './LabelMarker.vue';
import type {Plugin, App} from "vue";
LabelMarker.install = (app: App) => {
  app.component(LabelMarker.name, LabelMarker);
  return app;
};
export const ElAmapLabelMarker = LabelMarker as typeof LabelMarker & Plugin;
export default ElAmapLabelMarker;

export type ElAmapLabelMarkerInstance = InstanceType<typeof LabelMarker>
