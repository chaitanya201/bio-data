import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations, type Lang, type Translations } from '../data/siteContent';

const STORAGE_KEY = 'biodata-lang';


type LanguageContextValue = {
  lang: Lang;
  isMarathi: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'mr' ? 'mr' : 'en';
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'mr' : 'en');
  }, [lang, setLang]);

  // Apply lang class + html lang attribute on change
  useEffect(() => {
    const root = document.documentElement;
    if (lang === 'mr') {
      root.classList.add('lang-mr');
      root.setAttribute('lang', 'mr');
    } else {
      root.classList.remove('lang-mr');
      root.setAttribute('lang', 'en');
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      isMarathi: lang === 'mr',
      setLang,
      toggleLang,
      t: translations[lang],
    }),
    [lang, setLang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
