import {defineClientConfig} from '@vuepress/client'
import '@vuemap/vue-amap/dist/style.css'

export default defineClientConfig({
  async enhance({app}) {
    if (!__VUEPRESS_SSR__) {
      const va = await import('@vuemap/vue-amap');
      const loca = await import('@vuemap/vue-amap-loca');
      const extra = await import('@vuemap/vue-amap-extra');
      app.use(va);
      app.use(loca);
      app.use(extra);
      va.initAMapApiLoader({
        key: '747f980f217a31ba68d99301045a3fa7',
        Loca: {
          version: '2.0.10'
        }
      })
    }
  }
})
