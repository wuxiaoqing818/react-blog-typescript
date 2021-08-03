/*
 * @Author: 吴晓晴
 * @Date: 2021-08-03 22:54:23
 * @LastEditTime: 2021-08-03 23:26:06
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\react-blog-typescript\src\services\index.ts
 */
//动态导出api
import {keyType} from "./typings"
const files = require.context('.', false, /\.ts$/)
const api:keyType = {}
files.keys().forEach(key => {
  if (key === './index.ts') return
  api[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default api
