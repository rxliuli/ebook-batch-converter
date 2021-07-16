import { extractBinary } from '../util/extractBinary'
import { downloadRelease } from '../util/downloadRelease'
import { getPlatformAndArch } from '../util/getPlatformAndArch'

it('测试解压缩', async function () {
  const zipPath = await downloadRelease(getPlatformAndArch())
  await extractBinary(zipPath)
})
