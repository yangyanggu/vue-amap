import ThreePassCircle from './ThreePassCircle.vue';
import type {Plugin, App} from "vue";
ThreePassCircle.install = (app: App) => {
  app.component(ThreePassCircle.name, ThreePassCircle);
  return app;
};
export const ElAmapThreePassCircle = ThreePassCircle as typeof ThreePassCircle & Plugin;
export default ElAmapThreePassCircle;

export type ElAmapThreePassCircleInstance = InstanceType<typeof ThreePassCircle>
