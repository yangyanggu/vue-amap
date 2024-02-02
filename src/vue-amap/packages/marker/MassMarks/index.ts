import MassMarks from './MassMarks.vue';
import type {Plugin, App} from "vue";
MassMarks.install = (app: App) => {
  app.component(MassMarks.name, MassMarks);
  return app;
};
export const ElAmapMassMarks = MassMarks as typeof MassMarks & Plugin;
export default ElAmapMassMarks;

export type ElAmapMassMarksInstance = InstanceType<typeof MassMarks>
