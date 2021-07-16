import { downloadRelease } from './util/downloadRelease'
import { getPlatformAndArch } from './util/getPlatformAndArch'
import { extractBinary } from './util/extractBinary'
import { pathExists, remove } from 'fs-extra'
import path from 'path'

/**
 * 1. 检查系统和架构
 * 2. 从 GitHub Release 下载
 * 3. 解压文件
 */
async function main() {
  const platformAndArch = getPlatformAndArch()
  const suffix = platformAndArch.includes('Windows') ? '.exe' : ''
  if (
    await pathExists(
      path.resolve(__dirname, '.cache/ebook-batch-converter' + suffix),
    )
  ) {
    return
  }
  console.log('正在下载二进制文件...')
  const zipPath = await downloadRelease(platformAndArch)
  await extractBinary(zipPath)
  await remove(zipPath)
}

// noinspection JSIgnoredPromiseFromCall
main()
