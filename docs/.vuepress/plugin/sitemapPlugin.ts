import path from 'path'
import fs from 'fs'
import {Readable} from 'stream'
import {SitemapStream, streamToPromise} from 'sitemap'
import {hostname} from '../utils/paths'
import type {Plugin, PluginObject} from '@vuepress/core'

import type {LinkItem} from 'sitemap'

export const sitemapPlugin: Plugin = () => {
  const pluginObj: PluginObject = {
    name: 'sitemap-plugin',
    multiple: true,
  }

  pluginObj.onGenerated = (app) => {
    const pages = app.pages;
    const links = [] as LinkItem[];
    pages.forEach(page => {
      links.push({
        lang: 'zh-CN',
        url: page.path
      })
    })
    const stream = new SitemapStream( { hostname } )
    const file = app.dir.dest('sitemap.xml');
    // Return a promise that resolves with your XML string
    streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
      fs.writeFileSync(file, data.toString(), {
        encoding: 'utf-8'
      })
    )
  }
  return pluginObj;
}
