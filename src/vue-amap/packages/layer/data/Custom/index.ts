import Custom from './Custom.vue';
import type {Plugin, App} from "vue";
Custom.install = (app: App) => {
  app.component(Custom.name, Custom);
  return app;
};
export const ElAmapLayerCustom = Custom as typeof Custom & Plugin;
export default ElAmapLayerCustom;

export type ElAmapLayerCustomInstance = InstanceType<typeof Custom>
