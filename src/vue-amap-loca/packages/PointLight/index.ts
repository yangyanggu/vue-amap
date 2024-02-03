import PointLight from './PointLight.vue';
import type {Plugin, App} from "vue";
PointLight.install = (app: App) => {
  app.component(PointLight.name, PointLight);
  return app;
};
export const ElAmapLocaPointLight = PointLight as typeof PointLight & Plugin;
export default ElAmapLocaPointLight;

export type ElAmapLocaPointLightInstance = InstanceType<typeof PointLight>
