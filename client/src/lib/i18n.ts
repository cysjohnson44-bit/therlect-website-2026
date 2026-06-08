import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zh from '../locales/zh.json';
import en from '../locales/en.json';

const resources = {
  zh: { translation: zh },
  en: { translation: en },
};

// Initialize i18n with language detection
// Priority: localStorage > navigator > default to 'zh'
const initializeLanguage = () => {
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    return savedLang;
  }
  
  // Check browser language
  const browserLang = navigator.language || navigator.languages?.[0] || '';
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  
  // Default to Chinese
  return 'zh';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initializeLanguage(),
    fallbackLng: 'zh',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
