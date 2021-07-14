import { Command } from 'commander'
import { batchConvert } from './batchConvert'
import { i18n, LanguageEnum } from './util/I18n'
import osLocale from 'os-locale'

async function getLanguage() {
  const language = await osLocale()
  const map: Record<string, LanguageEnum> = {
    'zh-CN': LanguageEnum.ZhCN,
    'en-US': LanguageEnum.EnUS,
  }
  return map[language] || LanguageEnum.EnUS
}

async function main() {
  await i18n.load(await getLanguage())
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
