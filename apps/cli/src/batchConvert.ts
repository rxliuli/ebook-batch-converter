import promise from 'glob-promise'
import * as path from 'path'
import { mkdirp, pathExists } from 'fs-extra'
import { AsyncArray, asyncLimiting } from '@liuli-util/async'
import { fileName } from './util/fileName'
import { convert } from './util/convert'
import chalk from 'chalk'
export async function batchConvert(input: string, output: string) {
  const list = await promise('**/*.{epub,pdf,txt}', {
    cwd: path.resolve(input),
  })
  await mkdirp(path.resolve(output))
  Reflect.set(process.env, 'silent', 'true')
  await AsyncArray.forEach(
    list,
    asyncLimiting(async (relativePath) => {
      const destFilePath = path.resolve(
        output,
        path.dirname(relativePath),
        fileName(relativePath) + '.azw3',
      )
      if (await pathExists(destFilePath)) {
        console.log(chalk.blue('文件已转换: ', relativePath))
        return
      }
      await mkdirp(path.dirname(destFilePath))
      try {
        await convert({
          input: path.resolve(input, relativePath),
          output: destFilePath,
        })
        console.log(chalk.green('转换成功: ', relativePath))
      } catch (e) {
        console.error(chalk.red('转换出错: ', relativePath))
      }
    }, 1),
  )
}
