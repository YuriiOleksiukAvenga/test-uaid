const languages = ['en', 'uk'];
const defaultLanguage = languages[0];

const translations = {
    en: {
        home: "Home",
        products: "Products",
        aboutUs: "About us",
        discoverNow: "Discover Now >>"
    },
    uk: {
        home: "Головна",
        products: "Товари",
        aboutUs: "Про Нас",
        discoverNow: "Відкрийте зараз >>"
    }
}

const getTranslatedText = (language, textKey) => {
    if (!language || !textKey) return '';
    
    return translations[language][textKey];
}

exports.languages = languages
exports.defaultLanguage = defaultLanguage
exports.getTranslatedText = getTranslatedText
