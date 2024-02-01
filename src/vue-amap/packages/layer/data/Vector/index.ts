import Vector from './Vector.vue';
import type {Plugin, App} from "vue";
Vector.install = (app: App) => {
  app.component(Vector.name, Vector);
  return app;
};
export const ElAmapLayerVector = Vector as typeof Vector & Plugin;
export default ElAmapLayerVector;

export type ElAmapLayerVectorInstance = InstanceType<typeof Vector>
