import path from 'path'
import fs from 'fs'
import { parse } from '@vue/compiler-sfc'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import { highlight } from '../utils/highlight'
import { docRoot } from '../utils/paths'
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
  pluginObj.extendsPage = (record,app) => {
    const filePathRelative = record.filePathRelative;
    let tags = {} as any;
    if((app as any).__hoistedTags){
      tags = (app as any).__hoistedTags;
    }
    if(tags && tags[filePathRelative]){
      console.log('tags[filePathRelative]: ', tags[filePathRelative]);
      record.hoistedTags.push(tags[filePathRelative]);
      console.log('record', record)
    }
  }
  // use markdown-it-container
  pluginObj.extendsMarkdown = (md, app) => {

    md.use(mdContainer, 'demo', {
      validate(params) {
        return !!params.trim().match(/^demo\s*(.*)$/)
      },

      render(tokens, idx, options, env ) {
        if(!(app as any).__hoistedTags){
          (app as any).__hoistedTags = {};
        }
        const hoistedTag = (app as any).__hoistedTags[env.filePathRelative];
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        if (tokens[idx].nesting === 1 /* means the tag is opening */) {
          const description = m && m.length > 1 ? m[1] : ''
          const sourceFileToken = tokens[idx + 2]
          let source = ''
          const sourceFile = sourceFileToken.children?.[0].content ?? ''
          console.log(`../../examples/${
            sourceFile.split('/')[0]
          }/*.vue`)
          if (sourceFileToken.type === 'inline') {
            source = fs.readFileSync(
              path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
              'utf-8'
            )
            if (!hoistedTag) {
              (app as any).__hoistedTags[env.filePathRelative] = `
    <script setup>
    const demos = import.meta.globEager('../../examples/${
                sourceFile.split('/')[0]
              }/*.vue')
    </script>`;
            }
          }
          if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

          const { html, js, css, cssPreProcessor, jsPreProcessor } =
            generateCodePenSnippet(source)
          return `<vp-demo :demos="demos" source="${encodeURIComponent(
            highlight(source, 'vue')
          )}" path="${sourceFile}" html="${html}" js="${js}" css="${css}" css-pre-processor="${cssPreProcessor}" js-pre-processor="${jsPreProcessor}" raw-source="${encodeURIComponent(
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
