"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.toLowerCase();
  
  // Se la lingua del browser è italiano o italiano-* usa italiano
  if (browserLang.startsWith('it')) {
    return 'it';
  }
  
  // Altrimenti usa inglese come fallback
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Carica la lingua salvata o rileva quella del browser
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'it' || savedLang === 'en')) {
      setLanguageState(savedLang);
    } else {
      const detected = detectBrowserLanguage();
      setLanguageState(detected);
      localStorage.setItem('language', detected);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  // Evita hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

