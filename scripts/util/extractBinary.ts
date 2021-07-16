import { extract } from 'tar'
import path from 'path'

/**
 * 提取程序
 */
export async function extractBinary(zipFile: string) {
  await extract({ file: zipFile, cwd: path.resolve(__dirname, '.cache') })
}
