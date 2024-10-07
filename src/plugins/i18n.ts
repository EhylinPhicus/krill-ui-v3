import { createI18n } from 'vue-i18n'
import en from '../locales/merged/en.json'
import es from '../locales/merged/es.json'

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es
  }
})
