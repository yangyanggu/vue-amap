import Tiles3D from './Tiles3D.vue';
import type {Plugin, App} from "vue";
Tiles3D.install = (app: App) => {
  app.component(Tiles3D.name, Tiles3D);
  return app;
};
export const ElAmapLayerTiles3d = Tiles3D as typeof Tiles3D & Plugin;
export default ElAmapLayerTiles3d;

export type ElAmapLayerTiles3dInstance = InstanceType<typeof Tiles3D>
