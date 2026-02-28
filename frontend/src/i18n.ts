import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enJSON from "./locales/en.json";
import deJSON from "./locales/de.json";

const resources = {
    en: enJSON,
    de: deJSON,
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["localStorage", "cookie", "navigator"],
            caches: ["localStorage"],
        },
    })

export default i18next;