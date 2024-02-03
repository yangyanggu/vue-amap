import PulseLineLayer from './PulseLineLayer.vue';
import type {Plugin, App} from "vue";
PulseLineLayer.install = (app: App) => {
  app.component(PulseLineLayer.name, PulseLineLayer);
  return app;
};
export const ElAmapLocaPulseLine = PulseLineLayer as typeof PulseLineLayer & Plugin;
export default ElAmapLocaPulseLine;

export type ElAmapLocaPulseLineInstance = InstanceType<typeof PulseLineLayer>
