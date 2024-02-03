import IconLayer from './IconLayer.vue';
import type {Plugin, App} from "vue";
IconLayer.install = (app: App) => {
  app.component(IconLayer.name, IconLayer);
  return app;
};
export const ElAmapLocaIcon = IconLayer as typeof IconLayer & Plugin;
export default ElAmapLocaIcon;

export type ElAmapLocaIconInstance = InstanceType<typeof IconLayer>
