//动态导出api
import {keyType} from "./interface"
const files = require.context('.', false, /\.ts$/)
const api:keyType = {}
files.keys().forEach(key => {
  if (key === './index.ts') return
  api[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default api
