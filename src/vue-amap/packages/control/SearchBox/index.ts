import SearchBox from './SearchBox.vue'
import type {Plugin, App} from "vue";
SearchBox.install = (app: App) => {
  app.component(SearchBox.name, SearchBox)
  return app
}
export const ElAmapSearchBox = SearchBox as typeof SearchBox & Plugin
export default ElAmapSearchBox
