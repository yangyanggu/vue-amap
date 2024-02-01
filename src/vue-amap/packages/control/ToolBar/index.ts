import ToolBar from './ToolBar.vue';
import type {Plugin, App} from "vue";
ToolBar.install = (app: App) => {
  app.component(ToolBar.name, ToolBar);
  return app;
};
export const ElAmapControlToolBar = ToolBar as typeof ToolBar & Plugin;
export default ElAmapControlToolBar;

export type ElAmapControlToolBarInstance = InstanceType<typeof ToolBar>
