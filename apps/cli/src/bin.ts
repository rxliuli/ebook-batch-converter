import { Command } from 'commander'
import { batchConvert } from './batchConvert'
import osLocale from 'os-locale'
import zhCN from './i18n/zhCN.json'
import en from './i18n/en.json'
import { LanguageEnum } from '@liuli-util/i18next-util'
import { i18n } from './util/I18n'

async function getLanguage() {
  const language = await osLocale()
  const map: Record<string, LanguageEnum> = {
    'zh-CN': LanguageEnum.ZhCN,
    'en-US': LanguageEnum.En,
  }
  return map[language] || LanguageEnum.En
}

async function main() {
  await i18n.init({ en, zhCN }, await getLanguage())
  new Command()
    .description(i18n.t('cli.description'))
    .requiredOption('-i, --input <input>', i18n.t('cli.input'))
    .requiredOption('-o, --output <output>', i18n.t('cli.output'))
    .action(async (options: { input: string; output: string }) => {
      await batchConvert(options.input, options.output)
    })
    .parse()
}

// noinspection JSIgnoredPromiseFromCall
main()
