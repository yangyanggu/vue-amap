import PrismLayer from './PrismLayer.vue';
import type {Plugin, App} from "vue";
PrismLayer.install = (app: App) => {
  app.component(PrismLayer.name, PrismLayer);
  return app;
};
export const ElAmapLocaPrism = PrismLayer as typeof PrismLayer & Plugin;
export default ElAmapLocaPrism;

export type ElAmapLocaPrismInstance = InstanceType<typeof PrismLayer>
