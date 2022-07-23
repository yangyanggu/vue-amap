import { createApp } from 'vue'
import Element from 'element-plus'
import {initAMapApiLoader} from '@vue-map/services'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './router/index'

initAMapApiLoader({
  key: 'd9c8c39b15d50bf97df34dcfa5873196',
  securityJsCode: '24b033df5f41c948aff9d26cb7d59133',
  version: '2.0',
  plugins: ['AMap.3DTilesLayer'],
  Loca:{
    version: '2.0.10'
  }
  // offline: true
})

createApp(App)
    .use(Element)
    .use(router)
    .mount('#app')
