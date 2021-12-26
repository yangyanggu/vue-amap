import path from 'path'
import fs from 'fs'
import { parse } from '@vue/compiler-sfc'
import MarkdownIt from 'markdown-it'
import { docRoot } from '../utils/paths'
import { highlight } from '../utils/highlight'

const localMd = MarkdownIt()
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/

export default [
  '@vuepress/container',
  {
    type: 'demo',
    render(tokens, idx, options, env, self) {
      const hoistedTags: string[] = [];

      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
            'utf-8'
          )
          console.log('options: ', options)
          console.log('env: ', env)
          console.log('self: ', self)
          const existingScriptIndex = hoistedTags.findIndex((tag) => {
            return scriptSetupRE.test(tag)
          })
          if (existingScriptIndex === -1) {
            hoistedTags.push(`
    <script setup>
    const demos = import.meta.globEager('../../examples/${
              sourceFile
            }.vue')
    </script>`)
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
    }
  },
] as any;

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
