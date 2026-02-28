import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isEn = currentLang.startsWith('en');

    const toggleLanguage = () => {
        i18n.changeLanguage(isEn ? 'de' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 cursor-pointer border-none gap-0"
            aria-label="Toggle language"
        >
            <span
                className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-white dark:bg-gray-600 rounded-md shadow-sm transition-transform duration-300 ease-in-out ${isEn ? "translate-x-0.5" : "translate-x-[calc(100%+2px)]"
                    }`}
            />

            <span className={`relative z-10 px-3 py-1 text-xs font-bold uppercase transition-colors duration-300 ${isEn ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                }`}>
                EN
            </span>

            <span className={`relative z-10 px-3 py-1 text-xs font-bold uppercase transition-colors duration-300 ${!isEn ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                }`}>
                DE
            </span>
        </button>
    );
}