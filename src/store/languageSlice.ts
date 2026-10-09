// store/languageSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
];

interface LanguageState {
  currentLanguage: Language;
  isRTL: boolean;
}

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    const parsed = JSON.parse(savedLanguage);
    const language =
      SUPPORTED_LANGUAGES.find((lang) => lang.code === parsed.code) ||
      SUPPORTED_LANGUAGES[0];
    // Set document direction for RTL support
    const isRTL = ["ar", "ur"].includes(language.code);
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    return language;
  }
  const defaultLanguage = SUPPORTED_LANGUAGES[0];
  // Set document direction for RTL support
  const isRTL = ["ar", "ur"].includes(defaultLanguage.code);
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  return defaultLanguage;
};

const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
  isRTL: ["ar", "ur"].includes(getInitialLanguage().code),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      const selectedLanguage = SUPPORTED_LANGUAGES.find(
        (lang) => lang.code === action.payload
      );
      if (selectedLanguage) {
        state.currentLanguage = selectedLanguage;
        state.isRTL = ["ar", "ur"].includes(selectedLanguage.code);
        localStorage.setItem(
          "selectedLanguage",
          JSON.stringify(selectedLanguage)
        );
        // Set document direction for RTL support
        document.documentElement.setAttribute(
          "dir",
          state.isRTL ? "rtl" : "ltr"
        );
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
