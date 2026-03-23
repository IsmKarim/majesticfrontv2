import {getRequestConfig, type RequestConfig} from 'next-intl/server';
import {locales, type Locale, defaultLocale} from './locales';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({requestLocale}): Promise<RequestConfig> => {
   const requested = await requestLocale;
   const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  if (!locales.includes(locale)) throw new Error(`Unsupported locale: ${locale}`);
  const messages = (await import(`@/messages/${locale}.json`)).default;


  return {locale, messages};
});
