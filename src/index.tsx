import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import  App  from './App';
import { Tolgee, TolgeeProvider, FormatSimple } from "@tolgee/react";
import en from './i18n/en.json';
import fr from './i18n/fr.json';
import es from './i18n/es-ES.json';
import zh from './i18n/zh.json';
import ar from './i18n/ar-SA.json';

const tolgee = Tolgee()
  // .use(DevTools())
  .use(FormatSimple())
  .init({
    fallbackLanguage: 'en',
    language: 'en',
    availableLanguages: ['en', 'fr', 'es-ES', 'zh', 'ar-SA'],
    staticData: { en, fr, 'es-ES':es, zh, 'ar-SA':ar },
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TolgeeProvider
      tolgee={tolgee}
      fallback="Loading..." // loading fallback
    >
      <App />
    </TolgeeProvider>
  </React.StrictMode>
);
