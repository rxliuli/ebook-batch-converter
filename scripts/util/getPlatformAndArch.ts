import * as os from 'os'

type SupportArch = 'x64' | 'arm64' | 'x32'

/**
 * 获取系统和架构
 */
export function getPlatformAndArch() {
  const platformMap = {
    win32: 'Windows',
    linux: 'Linux',
    darwin: 'Darwin',
  } as Record<NodeJS.Platform, string>
  const platform = os.platform()
  if (!(platform in platformMap)) {
    throw new Error('不支持 Windows/Linux/Mac 之外的系统')
  }
  const arch = os.arch() as SupportArch
  const archMap = {
    x64: 'x86_64',
    arm64: 'arm64',
    x32: 'i386',
  } as Record<SupportArch, string>
  if (!(arch in archMap)) {
    throw new Error('不支持 x64/x32/arm64 之外的架构')
  }
  return platformMap[platform] + '_' + archMap[arch]
}
