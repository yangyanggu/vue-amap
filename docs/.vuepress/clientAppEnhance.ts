import { defineClientAppEnhance } from '@vuepress/client'
import '@vuemap/vue-amap/dist/style.css'

export default defineClientAppEnhance(({ app }) => {
  if (!__VUEPRESS_SSR__) {
    import('@vuemap/vue-amap/dist/index.es.js').then(va => {
      app.use(va);
      va.initAMapApiLoader({
        key: '747f980f217a31ba68d99301045a3fa7'
      })
    })
    // app.use(VueAmap);
    // VueAmap.initAMapApiLoader({
    //   key: '747f980f217a31ba68d99301045a3fa7'
    // })
  }
})
