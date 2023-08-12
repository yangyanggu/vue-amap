import { createApp } from 'vue'
import Element from 'element-plus'
import {initAMapApiLoader} from '@vuemap/vue-amap/services/injected-amap-api-instance'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './router/index'

initAMapApiLoader({
  key: '65b5d1795f0b85ae604b4bf0a0b046d4',
  securityJsCode: 'ce237322c0174f586a9156eeb38a546b',
  version: '2.0',
  plugins: ['AMap.3DTilesLayer', 'AMap.AutoComplete', 'AMap.DistrictSearch'],
  Loca:{
    version: '2.0'
  },
  // offline: true
})

createApp(App)
    .use(Element)
    .use(router)
    .mount('#app')
