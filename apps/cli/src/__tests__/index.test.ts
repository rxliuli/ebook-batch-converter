import promise from 'glob-promise'
import { convert } from 'node-ebook-converter'
import * as path from 'path'
import { fileName } from '../util/fileName'

it('测试使用 ebook 转换文件', async () => {
  const resp = await convert({
    input: path.resolve(__dirname, 'temp/前端架构设计.epub'),
    output: path.resolve(__dirname, 'temp/前端架构设计.azw3'),
  })
  console.log('resp: ', resp)
})

it('测试获取文件名', () => {
  const filePath = path.resolve(__dirname, 'temp/前端架构设计.epub')
  console.log(fileName(filePath))
})

it('递归读取所有文件', async () => {
  const files = await promise('**/*', { cwd: path.resolve(__dirname) })
  console.log('files: ', files)
})
