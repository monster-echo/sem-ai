import { useLanguageStore } from "@/store/useLanguageStore";
import zh from "@/locales/zh";
import en from "@/locales/en";
import ms from "@/locales/ms";

const translations = {
  zh,
  en,
  ms,
};

export const useTranslation = () => {
  const locale = useLanguageStore((state) => state.locale);
  const hasHydrated = useLanguageStore((state) => state._hasHydrated);

  return {
    t: translations[locale],
    locale,
    setLocale: useLanguageStore((state) => state.setLocale),
    loaded: hasHydrated,
  };
};
