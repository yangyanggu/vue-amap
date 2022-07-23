import {defineClientConfig} from '@vuepress/client'
import '@vuemap/vue-amap/dist/style.css'

export default defineClientConfig({
  async enhance({app}) {
    if (!__VUEPRESS_SSR__) {
      const va = await import('@vuemap/vue-amap');
      app.use(va);
      va.initAMapApiLoader({
        key: '747f980f217a31ba68d99301045a3fa7',
        Loca: {
          version: '2.0.10'
        }
      })
    }
  }
})
