import LaserLayer from './LaserLayer.vue';
import type {Plugin, App} from "vue";
LaserLayer.install = (app: App) => {
  app.component(LaserLayer.name, LaserLayer);
  return app;
};
export const ElAmapLocaLaser = LaserLayer as typeof LaserLayer & Plugin;
export default ElAmapLocaLaser;

export type ElAmapLocaLaserInstance = InstanceType<typeof LaserLayer>
