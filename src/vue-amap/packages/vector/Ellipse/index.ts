import Ellipse from './Ellipse.vue';
import type {Plugin, App} from "vue";
Ellipse.install = (app: App) => {
  app.component(Ellipse.name, Ellipse);
  return app;
};
export const ElAmapEllipse = Ellipse as typeof Ellipse & Plugin;
export default ElAmapEllipse;

export type ElAmapEllipseInstance = InstanceType<typeof Ellipse>
