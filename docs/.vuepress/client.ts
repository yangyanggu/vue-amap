import {defineClientConfig} from '@vuepress/client'
import '@vuemap/vue-amap/dist/style.css'

export default defineClientConfig({
  async enhance({app}) {
    if (!__VUEPRESS_SSR__) {
      const va = await import('@vuemap/vue-amap');
      app.use(va);
      va.initAMapApiLoader({
        key: '326aa62242d1c6e4f439cd99f14c5ead',
        securityJsCode: 'b1daa09f7779e34b28f4fd80683a698f',
        Loca: {
          version: '2.0.10'
        }
      })
    }
  }
})
