import GLCustom from './GLCustom.vue';
import type {Plugin, App} from "vue";
GLCustom.install = (app: App) => {
  app.component(GLCustom.name, GLCustom);
  return app;
};
export const ElAmapLayerGlCustom = GLCustom as typeof GLCustom & Plugin;
export default ElAmapLayerGlCustom;

export type ElAmapLayerGlCustomInstance = InstanceType<typeof GLCustom>
