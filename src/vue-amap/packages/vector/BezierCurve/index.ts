import BezierCurve from './BezierCurve.vue';
import type {Plugin, App} from "vue";
BezierCurve.install = (app: App) => {
  app.component(BezierCurve.name, BezierCurve);
  return app;
};
export const ElAmapBezierCurve = BezierCurve as typeof BezierCurve & Plugin;
export default ElAmapBezierCurve;

export type ElAmapBezierCurveInstance = InstanceType<typeof BezierCurve>
