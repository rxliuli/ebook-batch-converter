import promise from 'glob-promise'
import * as path from 'path'
import { mkdirp, pathExists } from 'fs-extra'
import { AsyncArray, asyncLimiting } from '@liuli-util/async'
import { fileName } from './util/fileName'
import { convert } from './util/convert'
import chalk from 'chalk'
import { i18n } from './util/I18n'
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
        console.log(chalk.blue(i18n.t('msg.skip'), relativePath))
        return
      }
      await mkdirp(path.dirname(destFilePath))
      try {
        await convert({
          input: path.resolve(input, relativePath),
          output: destFilePath,
        })
        console.log(chalk.green(i18n.t('msg.success'), relativePath))
      } catch (e) {
        console.error(chalk.red(i18n.t('msg.error'), relativePath))
      }
    }, 1),
  )
}
