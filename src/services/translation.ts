import i18n, { ThirdPartyModule } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../assets/locales/en";
import AuthService from "./auth.service";

// the translations
const resources = {
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next as ThirdPartyModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: AuthService.getUserLng(),
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
const refreshLanguage = (language: string) => {
  // to change the current user language
  i18n.changeLanguage(language);
  localStorage.setItem("lang", language);
};
export { refreshLanguage };
