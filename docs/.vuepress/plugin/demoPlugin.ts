import path from 'path'
import fs from 'fs'
import { parse } from '@vue/compiler-sfc'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { highlight } from '../utils/highlight'
import {docRoot, vpRoot} from '../utils/paths'
import type {Plugin, PluginObject} from '@vuepress/core'
import type {MarkdownEnv} from '@vuepress/markdown'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'

const localMd = MarkdownIt()
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/

/**
 * Options for markdown-it-container
 */
export interface MarkdownItContainerOptions {
  marker?: string
  validate?: (params: string) => boolean
  render?: MarkdownItContainerRenderFunction
}

export type MarkdownItContainerRenderFunction = (
  tokens: Token[],
  index: number,
  options: any,
  env: MarkdownEnv,
  self: Renderer
) => string


/**
 * Options for @vuepress/plugin-container
 */
export type ContainerPluginOptions = MarkdownItContainerOptions

export const containerPlugin: Plugin<ContainerPluginOptions> = () => {
  const pluginObj: PluginObject = {
    name: 'demo-plugin',
    multiple: true,
  }

  // if `render` option is not specified
  // use `before` and `after` to generate render function
  // use markdown-it-container
  pluginObj.extendsMarkdown = (md, app) => {

    md.use(mdContainer, 'demo', {
      validate(params) {
        return !!params.trim().match(/^demo\s*(.*)$/)
      },

      render(tokens, idx ) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        if (tokens[idx].nesting === 1 /* means the tag is opening */) {
          const description = m && m.length > 1 ? m[1] : ''
          const sourceFileToken = tokens[idx + 2]
          let source = ''
          const sourceFile = sourceFileToken.children?.[0].content ?? ''
          if (sourceFileToken.type === 'inline') {
            source = fs.readFileSync(
              path.resolve(vpRoot, 'components', `${sourceFile}.vue`),
              'utf-8'
            )
          }
          if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

          return `<vp-demo source="${encodeURIComponent(
            highlight(source, 'vue')
          )}" path="${sourceFile}" raw-source="${encodeURIComponent(
            source
          )}" description="${encodeURIComponent(localMd.render(description))}">`
        } else {
          return '</vp-demo>'
        }
      },
    })
  }

  return pluginObj
}

function generateCodePenSnippet(source: string) {
  const { template, script, styles } = parse(source).descriptor
  const css = styles.pop()
  return {
    html: encodeURIComponent(template?.content ?? ''),
    js: encodeURIComponent((script || { content: '' }).content),
    css: encodeURIComponent(css?.content || ''),
    cssPreProcessor: css?.lang || 'none',
    jsPreProcessor: script?.lang || 'none',
  }
}
