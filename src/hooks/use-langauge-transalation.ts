import { useTranslation } from "react-i18next";

/**
 * Hook for language translation using react-i18next.
 * @returns {Object} An object containing the translation function.
 */
const useLanguageTranslation = () => {
  // Access the translation function from react-i18next
  const { t: translate } = useTranslation();

  // Return the translation function
  return { translate };
};

export default useLanguageTranslation;
