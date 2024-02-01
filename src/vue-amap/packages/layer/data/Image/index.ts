import Image from './Image.vue';
import type {Plugin, App} from "vue";
Image.install = (app: App) => {
  app.component(Image.name, Image);
  return app;
};
export const ElAmapLayerImage = Image as typeof Image & Plugin;
export default ElAmapLayerImage;

export type ElAmapLayerImageInstance = InstanceType<typeof Image>
