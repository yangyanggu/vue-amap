import HexagonLayer from './HexagonLayer.vue';
import type {Plugin, App} from "vue";
HexagonLayer.install = (app: App) => {
  app.component(HexagonLayer.name, HexagonLayer);
  return app;
};
export const ElAmapLocaHexagon = HexagonLayer as typeof HexagonLayer & Plugin;
export default ElAmapLocaHexagon;

export type ElAmapLocaHexagonInstance = InstanceType<typeof HexagonLayer>
