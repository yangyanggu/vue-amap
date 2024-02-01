import Canvas from './Canvas.vue';
import type {Plugin, App} from "vue";
Canvas.install = (app: App) => {
  app.component(Canvas.name, Canvas);
  return app;
};
export const ElAmapLayerCanvas = Canvas as typeof Canvas & Plugin;
export default ElAmapLayerCanvas;

export type ElAmapLayerCanvasInstance = InstanceType<typeof Canvas>
