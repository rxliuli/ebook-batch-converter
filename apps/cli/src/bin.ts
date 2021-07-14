import { Command } from 'commander'
import { batchConvert } from './batchConvert'

new Command()
  .description('使用 ebook-converter 批量转换 epub 等文件为 azw3')
  .requiredOption('-i, --input <input>', '输入目录')
  .requiredOption('-o, --output <output>', '输出目录')
  .action(async (options: { input: string; output: string }) => {
    await batchConvert(options.input, options.output)
  })
  .parse()
