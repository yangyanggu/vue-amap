import HawkEye from './HawkEye.vue';
import type {Plugin, App} from "vue";
HawkEye.install = (app: App) => {
  app.component(HawkEye.name, HawkEye);
  return app;
};
export const ElAmapControlHawkEye = HawkEye as typeof HawkEye & Plugin;
export default ElAmapControlHawkEye;

export type ElAmapControlHawkEyeInstance = InstanceType<typeof HawkEye>
