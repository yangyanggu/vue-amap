import {defineUserConfig} from 'vuepress'
import {docsearchPlugin} from "@vuepress/plugin-docsearch";
import Navbar from './navbar'
import Sidebar from './sidebar'
import registerPlugin from "./plugin/registerPlugin";
import {containerPlugin} from './plugin/demoPlugin'
import {sitemapPlugin} from './plugin/sitemapPlugin'
import {localTheme} from "./theme";


export default defineUserConfig({
  // 站点配置
  base: '/vue-amap/',
  lang: 'zh-CN',
  title: '@vuemap/vue-amap',
  description: '高德地图2.0版本的vue3对应封装',
  head: [
    ['link', {rel: 'stylesheet', type: 'text/css' ,href: '/css/global.css'}],
    ['script', {}, `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?3531c3641194434fc0076c594b820067";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ]
    // ['script', {src: 'https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@1.0.1/dist/index.js'}]
  ],

  // 主题和它的配置
  theme: localTheme({
    logo: 'https://vuejs.org/images/logo.png',
    docsDir: 'docs',
    editLink: false,
    lastUpdatedText: '最后更新时间',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '警告',
    navbar: Navbar,
    sidebar: Sidebar,
  }),
  plugins: [
    containerPlugin(),
    registerPlugin,
    sitemapPlugin(),
    docsearchPlugin({
      apiKey: '45d05a8e842f2a0869d1fe5b60c67d7f',
      indexName: 'vue-amap-guyixi',
      appId: 'BSHGEQA36W'
    })
  ],
})
