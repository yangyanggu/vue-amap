import Labels from './Labels.vue';
import type {Plugin, App} from "vue";
Labels.install = (app: App) => {
  app.component(Labels.name, Labels);
  return app;
};
export const ElAmapLayerLabels = Labels as typeof Labels & Plugin;
export default ElAmapLayerLabels;

export type ElAmapLayerLabelsInstance = InstanceType<typeof Labels>
