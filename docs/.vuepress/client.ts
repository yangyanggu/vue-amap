import {defineClientConfig} from '@vuepress/client'
import 'element-plus/theme-chalk/index.css'
import * as VueAMap from '@vuemap/vue-amap/index'
import * as VueAMapLoca from '@vuemap/vue-amap-loca/index'
import * as VueAMapExtra from '@vuemap/vue-amap-extra/index'
export default defineClientConfig({
  enhance({app}) {
    if (!__VUEPRESS_SSR__) {
      app.use(VueAMap);
      app.use(VueAMapLoca);
      app.use(VueAMapExtra);
      VueAMap.initAMapApiLoader({
        key: '131de8dce165c06abe06564c351099f3',
        securityJsCode: 'e2ef604bb7b4fecdc69bacd5c2400b6f',
        Loca: {
          version: '2.0.0'
        },
        plugins: ['AMap.HawkEye', 'AMap.DistrictSearch']
      })
    }
  }
})
