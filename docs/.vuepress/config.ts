import {defineUserConfig} from 'vuepress'
import Navbar from './navbar'
import Sidebar from './sidebar'
import registerPlugin from "./plugin/registerPlugin";
import {containerPlugin} from './plugin/demoPlugin'
import {sitemapPlugin} from './plugin/sitemapPlugin'
import {localTheme} from "./theme";

const basePath = '/'
export default defineUserConfig({
  // 站点配置
  base: basePath,
  lang: 'zh-CN',
  title: '@vuemap/vue-amap',
  description: '高德地图2.0版本的vue3对应封装',
  head: [
    ['link', {rel: 'stylesheet', type: 'text/css' ,href: `${basePath}css/global.css`}],
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
  shouldPrefetch: false,
  plugins: [
    containerPlugin(),
    registerPlugin,
    sitemapPlugin()
  ],
})
