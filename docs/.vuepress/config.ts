import { defineUserConfig } from 'vuepress'
import Navbar from './navbar'
import Sidebar from './sidebar'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    // 站点配置
    lang: 'zh-CN',
    title: '@vuemap/vue-amap',
    description: '高德地图2.0版本的vue3对应封装',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
        docsDir: 'docs',
        editLink: false,
        lastUpdatedText: '最后更新时间',
        navbar: Navbar,
        sidebar: Sidebar
    },
})
