import { createApp } from 'vue'
import Element from 'element-plus'
import {initAMapApiLoader} from '@vue-map/services'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './router/index'

initAMapApiLoader({
    key: '747f980f217a31ba68d99301045a3fa7',
  plugins: ['AMap.3DTilesLayer']
})

createApp(App)
    .use(Element)
    .use(router)
    .mount('#app')
