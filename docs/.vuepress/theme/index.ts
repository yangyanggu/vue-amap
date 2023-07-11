import path from 'path'
import { defaultTheme } from '@vuepress/theme-default'
import type { Theme } from '@vuepress/core'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export const localTheme = (options: DefaultThemeOptions): Theme => {
  return {
    name: 'vuepress-theme-local',
    extends: defaultTheme(options),
    // 主题的客户端配置文件的路径
    clientConfigFile: path.resolve(__dirname, 'client.js').replaceAll('\\', '/'),
  }
}
