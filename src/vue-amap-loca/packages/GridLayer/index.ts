import GridLayer from './GridLayer.vue';
import type {Plugin, App} from "vue";
GridLayer.install = (app: App) => {
  app.component(GridLayer.name, GridLayer);
  return app;
};
export const ElAmapLocaGrid = GridLayer as typeof GridLayer & Plugin;
export default ElAmapLocaGrid;

export type ElAmapLocaGridInstance = InstanceType<typeof GridLayer>
