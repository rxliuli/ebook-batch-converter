import * as path from 'path'

/**
 * 截取文件名，不包括后缀
 * @param input
 */
export function fileName(input: string) {
  const basename = path.basename(input)
  return basename.substr(0, basename.length - path.extname(input).length)
}
