import {defineClientConfig} from '@vuepress/client'
import 'element-plus/theme-chalk/el-message.css'
import {initAMapApiLoader} from '@vuemap/vue-amap'
// import VueAMapLoca from '@vuemap/vue-amap-loca/index'
// import VueAMapExtra from '@vuemap/vue-amap-extra/index'
export default defineClientConfig({
  enhance({app, router}) {
    if (!__VUEPRESS_SSR__) {
      // app.use(VueAMap);
      // app.use(VueAMapLoca);
      // app.use(VueAMapExtra);
      initAMapApiLoader({
        key: '131de8dce165c06abe06564c351099f3',
        securityJsCode: 'e2ef604bb7b4fecdc69bacd5c2400b6f',
        Loca: {
          version: '2.0.0'
        },
        plugins: ['AMap.HawkEye', 'AMap.DistrictSearch']
      })
      /**
       * 路由切换事件处理
       */
      router.beforeEach((to, from, next) => {
        // console.log("切换路由", to.path, from.path);

        //触发百度的pv统计
        if (typeof window._hmt != "undefined" && to.path !== from.path) {
          if (to.fullPath) {
            window._hmt.push(["_trackPageview", to.fullPath]);
            // console.log("上报百度统计", to.fullPath);
          }
        }

        // continue
        next();
      });
    }
  }
})
