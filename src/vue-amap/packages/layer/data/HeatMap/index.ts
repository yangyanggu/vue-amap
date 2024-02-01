import HeatMap from './HeatMap.vue';
import type {Plugin, App} from "vue";
HeatMap.install = (app: App) => {
  app.component(HeatMap.name, HeatMap);
  return app;
};
export const ElAmapLayerHeatMap = HeatMap as typeof HeatMap & Plugin;
export default ElAmapLayerHeatMap;

export type ElAmapLayerHeatMapInstance = InstanceType<typeof HeatMap>
