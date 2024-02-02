import Text from './Text.vue';
import type {Plugin, App} from "vue";
Text.install = (app: App) => {
  app.component(Text.name, Text);
  return app;
};
export const ElAmapText = Text as typeof Text & Plugin;
export default ElAmapText;

export type ElAmapTextInstance = InstanceType<typeof Text>
