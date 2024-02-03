import ThreeLightSpot from './ThreeLightSpot.vue';
import type {Plugin, App} from "vue";
ThreeLightSpot.install = (app: App) => {
  app.component(ThreeLightSpot.name, ThreeLightSpot);
  return app;
};
export const ElAmapThreeLightSpot = ThreeLightSpot as typeof ThreeLightSpot & Plugin;
export default ElAmapThreeLightSpot;

export type ElAmapThreeLightSpotInstance = InstanceType<typeof ThreeLightSpot>
