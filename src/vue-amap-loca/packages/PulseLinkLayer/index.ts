import PulseLinkLayer from './PulseLinkLayer.vue';
import type {Plugin, App} from "vue";
PulseLinkLayer.install = (app: App) => {
  app.component(PulseLinkLayer.name, PulseLinkLayer);
  return app;
};
export const ElAmapLocaPulseLink = PulseLinkLayer as typeof PulseLinkLayer & Plugin;
export default ElAmapLocaPulseLink;

export type ElAmapLocaPulseLinkInstance = InstanceType<typeof PulseLinkLayer>
