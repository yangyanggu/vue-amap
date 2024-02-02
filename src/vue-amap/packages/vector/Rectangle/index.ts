import Rectangle from './Rectangle.vue';
import type {Plugin, App} from "vue";
Rectangle.install = (app: App) => {
  app.component(Rectangle.name, Rectangle);
  return app;
};
export const ElAmapRectangle = Rectangle as typeof Rectangle & Plugin;
export default ElAmapRectangle;

export type ElAmapRectangleInstance = InstanceType<typeof Rectangle>
