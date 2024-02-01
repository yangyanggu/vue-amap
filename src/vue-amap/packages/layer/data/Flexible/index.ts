import Flexible from './Flexible.vue';
import type {Plugin, App} from "vue";
Flexible.install = (app: App) => {
  app.component(Flexible.name, Flexible);
  return app;
};
export const ElAmapLayerFlexible = Flexible as typeof Flexible & Plugin;
export default ElAmapLayerFlexible;

export type ElAmapLayerFlexibleInstance = InstanceType<typeof Flexible>
