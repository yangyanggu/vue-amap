import DirectionalLight from './DirectionalLight.vue';
import type {Plugin, App} from "vue";
DirectionalLight.install = (app: App) => {
  app.component(DirectionalLight.name, DirectionalLight);
  return app;
};
export const ElAmapLocaDirectionalLight = DirectionalLight as typeof DirectionalLight & Plugin;
export default ElAmapLocaDirectionalLight;

export type ElAmapLocaDirectionalLightInstance = InstanceType<typeof DirectionalLight>
