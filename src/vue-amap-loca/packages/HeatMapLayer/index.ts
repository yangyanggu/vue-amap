import HeatMapLayer from './HeatMapLayer.vue';
import type {Plugin, App} from "vue";
HeatMapLayer.install = (app: App) => {
  app.component(HeatMapLayer.name, HeatMapLayer);
  return app;
};
export const ElAmapLocaHeatmap = HeatMapLayer as typeof HeatMapLayer & Plugin;
export default ElAmapLocaHeatmap;

export type ElAmapLocaHeatmapInstance = InstanceType<typeof HeatMapLayer>
