import {resolve as resolvePath} from "path";
import fs from 'fs'
import {docRoot} from '../utils/paths'
import config from '../../docs/.vuepress/data/config.json'
export default function (key: string){
  return new Promise<void>((resolve) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const monthStr = month < 10 ? (`0${month}`) : month
    const day = date.getDate()
    const dayStr = day < 10 ? (`0${day}`) : day
    config[key] = `${year}-${monthStr}-${dayStr}`
    const path = resolvePath(docRoot, '.vuepress/data/config.json')
    fs.writeFile(path,JSON.stringify(config),() => {
      resolve()
    })
  })

}

