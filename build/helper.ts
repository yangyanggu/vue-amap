import path, {resolve} from 'path'
import helper from 'components-helper'
import {mkdir, mkdirSync} from "fs-extra";
import {getPackageManifest} from './utils/pkg';
import {projRoot, apiRoot} from './utils/paths'
import {withTaskName} from "./utils/gulp";
import type {TaskFunction} from 'gulp'
import type {InstallOptions} from 'components-helper/lib/type'

const reComponentName: InstallOptions['reComponentName'] = (title: string) =>
    `el-${title
        .replace(/\B([A-Z])/g, '-$1')
        .replace(/[ ]+/g, '-')
        .toLowerCase()}`

const reDocUrl: InstallOptions['reDocUrl'] = (fileName, header, path = '') => {
    let suffix = '';
    const results = path.match(/\/ide-api\/component\/(\S*)\.md/);
    if(results && results.length > 1){
        suffix = results[1];
    }
    const docs = `https://vue-amap.guyixi.cn/zh-cn/component/`
    const _header = header ? header.replaceAll(/\s+/g, '-').toLowerCase() : ''

    return `${docs}${suffix ? suffix : fileName}.html${_header ? '#' : ''}${_header}`
}

const reWebTypesSource: InstallOptions['reWebTypesSource'] = (title) => {
    const symbol = `El${title
        .replaceAll(/-/g, ' ')
        .replaceAll(/^\w|\s+\w/g, (item) => {
            return item.trim().toUpperCase()
        })}`

    return {symbol}
}

const reAttribute: InstallOptions['reAttribute'] = (value, key) => {
    const _value = value.match(/^\*\*(.*)\*\*$/)
    const str = _value ? _value[1] : value

    if (key === 'Name' && /^(-|—)$/.test(str)) {
        return 'default'
    } else if (str === '' || /^(-|—)$/.test(str)) {
        return undefined
    } else if (key === 'Attribute' && /v-model:(.+)/.test(str)) {
        const _str = str.match(/v-model:(.+)/)
        return _str ? _str[1] : undefined
    } else if (key === 'Attribute' && /v-model/.test(str)) {
        return 'model-value'
    } else if (key === 'Attribute') {
        return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
    } else if (key === 'Type') {
        return str
            .replace(/\s*\/\s*/g, '|')
            .replace(/\s*,\s*/g, '|')
            .replace(/\(.*\)/g, '')
            .toLowerCase()
    } else if (key === 'Accepted Values') {
        return /\[.+\]\(.+\)/.test(str) || /^\*$/.test(str)
            ? undefined
            : str.replace(/`/g, '')
    } else if (key === 'Subtags') {
        return str
            ? `el-${str
                .replaceAll(/\s*\/\s*/g, '/el-')
                .replaceAll(/\B([A-Z])/g, '-$1')
                .replaceAll(/\s+/g, '-')
                .toLowerCase()}`
            : undefined
    } else {
        return str
    }
}

export const buildHelper = (pkgRoot: string, outDir: string, type: string): TaskFunction => {
    return withTaskName('build helper', (done) => {
        mkdirSync(outDir, {recursive: true})
        const {name, version} = getPackageManifest(resolve(pkgRoot, 'package.json'));
        const entry = path.resolve(apiRoot, type , '**' ,'*.md').replaceAll(/\\/g, '/');
        helper({
            name: name!,
            version,
            entry,
            outDir,
            reComponentName,
            reDocUrl,
            reWebTypesSource,
            reAttribute,
            props: 'Attributes',
            propsName: 'Attribute',
            propsOptions: 'Accepted Values',
            eventsName: 'Event Name',
            tableRegExp:
              '#+\\s+(.*\\s*Attributes|.*\\s*Events|.*\\s*Slots|.*\\s*Directives)\\s*\\n+(\\|?.+\\|.+)\\n\\|?\\s*:?-+:?\\s*\\|.+((\\n\\|?.+\\|.+)+)',
        })

        done()
    })
}
