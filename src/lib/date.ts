import type { Locale } from './i18n';

const shanghaiDateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  zh: new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
  en: new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
};

export const formatShanghaiDate = (date: Date, locale: Locale = 'zh') =>
  shanghaiDateFormatters[locale].format(date);
