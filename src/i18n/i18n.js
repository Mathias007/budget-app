import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import CustomBackend from "./CustomBackend";
import LanguageDetector from "i18next-browser-languagedetector";

const token = "a92894de49f724bcdc4e831bb0d8128b";
const id = "408619";

i18n.use(CustomBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        defaultLanguage: "en",
        otherLanguages: ["pl"],
        fallbackLng: "en",
        debug: true,
        saveMissing: true,

        backend: {
            // cors-anywhere is a trick. Don't use it in production
            loadPath:
                "https://cors-anywhere.herokuapp.com/https://api.poeditor.com/v2/terms/list",
            addPath:
                "https://cors-anywhere.herokuapp.com/https://api.poeditor.com/v2/terms/add",
            crossDomain: true,
            parse: (data) => {
                const parsedData = JSON.parse(data);
                const terms = parsedData.result.terms.reduce((acc, item) => {
                    acc[item.term] = item.translation.content || item.term;

                    return acc;
                }, {});

                return terms;
            },
            parsePayload: (namespace, key) => {
                if (key === "_t") return;

                const data = [
                    {
                        term: key,
                    },
                ];
                const payload = {
                    api_token: token,
                    data: JSON.stringify(data),
                    id,
                };

                return payload;
            },
            parseLoadPayload: ({ lng }) => {
                const payload = {
                    api_token: token,
                    language: lng,
                    id,
                };

                return payload;
            },
        },

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
