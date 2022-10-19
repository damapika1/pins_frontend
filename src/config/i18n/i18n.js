import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import i18nPages from "../../pages/i18n/en.json";
import i18nPins from "../../components/pins/i18n/en.json";
import i18nComments from "../../components/comments/i18n/en.json";
import i18neng from "./i18n-en.json";
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: i18neng,
        pages: i18nPages,
        pins:i18nPins,
        comments:i18nComments
      },
    },
    lng: "en",
    react: {
      useSuspense: true,
    },
    fallbackLng: "en",
    debug: true,
    defaultNS: "",
  }).then();

export default i18n;
