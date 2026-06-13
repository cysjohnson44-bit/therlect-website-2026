import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 直接導入翻譯文本以確保被打包進構建
const zh = {
  "nav": {
    "home": "首頁",
    "coreTechnology": "核心技術",
    "solutions": "解決方案",
    "about": "關於我們",
    "contact": "聯絡我們",
    "language": "中文",
    "getInTouch": "GET IN TOUCH"
  },
  "hero": {
    "badge": "THERMAL MANAGEMENT EXPERTS",
    "title": "釋放熱能的",
    "titleHighlight": "無限潛力",
    "description": "Therlect 汎海科技，憑藉超過20年的熱管理專業經驗，致力於為全球客戶提供從理論分析到市場應用。",
    "exploreSolutions": "探索解決方案",
    "contactUs": "聯絡我們"
  }
};

const en = {
  "nav": {
    "home": "Home",
    "coreTechnology": "Core Technology",
    "solutions": "Solutions",
    "about": "About Us",
    "contact": "Contact Us",
    "language": "English",
    "getInTouch": "GET IN TOUCH"
  },
  "hero": {
    "badge": "THERMAL MANAGEMENT EXPERTS",
    "title": "Unleash the Unlimited",
    "titleHighlight": "Potential of Thermal Energy",
    "description": "Therlect, with over 20 years of professional thermal management expertise, is committed to providing theoretical analysis to market application for global customers.",
    "exploreSolutions": "Explore Solutions",
    "contactUs": "Contact Us"
  }
};

const resources = {
  zh: { translation: zh },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
