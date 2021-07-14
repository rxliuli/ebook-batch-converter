import { batchConvert } from '../batchConvert'
import * as path from 'path'

it('测试 batchConvert', async () => {
  await batchConvert(
    path.resolve(__dirname, 'temp/input'),
    path.resolve(__dirname, 'temp/output'),
  )
}, 100_000)
