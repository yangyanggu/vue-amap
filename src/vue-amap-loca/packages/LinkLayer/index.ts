import LinkLayer from './LinkLayer.vue';
import type {Plugin, App} from "vue";
LinkLayer.install = (app: App) => {
  app.component(LinkLayer.name, LinkLayer);
  return app;
};
export const ElAmapLocaLink = LinkLayer as typeof LinkLayer & Plugin;
export default ElAmapLocaLink;

export type ElAmapLocaLinkInstance = InstanceType<typeof LinkLayer>
