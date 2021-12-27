import { defineClientAppEnhance } from '@vuepress/client'
import '@vuemap/vue-amap/dist/style.css'
import VueAmap, {initAMapApiLoader} from '@vuemap/vue-amap'

export default defineClientAppEnhance(({ app }) => {
  app.use(VueAmap);
  initAMapApiLoader({
    key: '747f980f217a31ba68d99301045a3fa7'
  })
})
