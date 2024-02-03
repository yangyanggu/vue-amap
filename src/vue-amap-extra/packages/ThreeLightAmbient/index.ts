import ThreeLightAmbient from './ThreeLightAmbient.vue';
import type {Plugin, App} from "vue";
ThreeLightAmbient.install = (app: App) => {
  app.component(ThreeLightAmbient.name, ThreeLightAmbient);
  return app;
};
export const ElAmapThreeLightAmbient = ThreeLightAmbient as typeof ThreeLightAmbient & Plugin;
export default ElAmapThreeLightAmbient;

export type ElAmapThreeLightAmbientInstance = InstanceType<typeof ThreeLightAmbient>
