import { getPlatformAndArch } from '../util/getPlatformAndArch'

it('测试获取系统和架构', function () {
  const systemAndArch = getPlatformAndArch()
  expect(systemAndArch).toBe('windows_x86_64')
})
