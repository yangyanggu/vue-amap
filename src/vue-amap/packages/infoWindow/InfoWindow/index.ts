import InfoWindow from './InfoWindow.vue';
import type {Plugin, App} from "vue";
InfoWindow.install = (app: App) => {
  app.component(InfoWindow.name, InfoWindow);
  return app;
};
export const ElAmapInfoWindow = InfoWindow as typeof InfoWindow & Plugin;
export default ElAmapInfoWindow;

export type ElAmapInfoWindowInstance = InstanceType<typeof InfoWindow>
