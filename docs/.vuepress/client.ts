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
        key: '131de8dce165c06abe06564c351099f3',
        securityJsCode: 'e2ef604bb7b4fecdc69bacd5c2400b6f',
        Loca: {
          version: '2.0.0'
        },
        plugins: ['AMap.HawkEye']
      })
    }
  }
})
