import { createApp } from 'vue'
import Element from 'element-plus'
import {initAMapApiLoader} from '@vue-map/services'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './router/index'

initAMapApiLoader({
  key: '326aa62242d1c6e4f439cd99f14c5ead',
  securityJsCode: 'b1daa09f7779e34b28f4fd80683a698f',
  version: '2.0',
  plugins: ['AMap.3DTilesLayer'],
  Loca:{
    version: '2.0'
  },
  // offline: true
})

createApp(App)
    .use(Element)
    .use(router)
    .mount('#app')
