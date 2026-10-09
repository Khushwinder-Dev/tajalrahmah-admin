// // hooks/useLanguageLabels.ts
// import { useSelector } from "react-redux";
// import type { RootState } from "@/store";
// import { LANGUAGE_LABELS, type LanguageLabels } from "@/mockData/languageData";

// export const useLanguageLabels = (): LanguageLabels => {
//   const { currentLanguage } = useSelector((state: RootState) => state.language);

//   // Fallback to English if language not found
//   return LANGUAGE_LABELS[currentLanguage.code] || LANGUAGE_LABELS.en;
// };

// ------->>> JSON FORMAT

// hooks/useLanguageLabels.ts
import { useSelector } from "react-redux";
import { useMemo } from "react";
import type { RootState } from "@/store";
import { LANGUAGE_LABELS } from "@/locales";

const DEFAULT_LANGUAGE = "en";

export const useLanguageLabels = () => {
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  return useMemo(() => {
    const languageCode = currentLanguage?.code;

    if (languageCode && LANGUAGE_LABELS[languageCode]) {
      return LANGUAGE_LABELS[languageCode];
    }

    // Try base language (e.g., 'en' from 'en-US')
    if (languageCode?.includes("-")) {
      const baseLanguage = languageCode.split("-")[0];
      if (LANGUAGE_LABELS[baseLanguage]) {
        return LANGUAGE_LABELS[baseLanguage];
      }
    }

    return LANGUAGE_LABELS[DEFAULT_LANGUAGE];
  }, [currentLanguage?.code]);
};
