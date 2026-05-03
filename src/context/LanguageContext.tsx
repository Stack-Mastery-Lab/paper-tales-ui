import React, { createContext, useContext, useState } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';

type Language = 'es' | 'en';

type TranslationKeys = typeof en;

const translations = { en, es };

interface LanguageContextType {
    language: Language;
    t: TranslationKeys;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');
    const t = translations[language];
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
    return context;
};