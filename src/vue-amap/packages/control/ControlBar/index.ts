import ControlBar from './ControlBar.vue';
import type {Plugin, App} from "vue";
ControlBar.install = (app: App) => {
  app.component(ControlBar.name, ControlBar);
  return app;
};

export const ElAmapControlControlBar = ControlBar as typeof ControlBar & Plugin;
export default ElAmapControlControlBar;

export type ElAmapControlControlBarInstance = InstanceType<typeof ControlBar>
