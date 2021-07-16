import { downloadRelease, getReleaseByTag } from '../util/downloadRelease'
import { getPlatformAndArch } from '../util/getPlatformAndArch'

describe('基本使用测试', function () {
  const options = {
    owner: 'rxliuli',
    repo: 'ebook-batch-converter',
    tag: 'v0.4.1',
  }
  it('测试获取发布版本列表', async function () {
    const release = await getReleaseByTag(options)
    console.log(release.assets[0])
  })
  it('测试下载', async function () {
    const str = await downloadRelease(getPlatformAndArch())
    console.log(str)
  })
})
