export interface TranslationResult {
  text: string;
  from: {
    language: {
      didYouMean: boolean;
      iso: string;
    };
    text: {
      autoCorrected: boolean;
      value: string;
      didYouMean: boolean;
    };
  };
  raw: string;
}

export interface MultiLanguageTranslation {
  original: string;
  translations: {
    arabic: string;
    hindi: string;
    bangla: string;
    urdu: string;
  };
  success: boolean;
  error?: string;
}

export interface SingleLanguageTranslation {
  text: string;
  success: boolean;
  error?: string;
}

export type SupportedLanguage = "arabic" | "hindi" | "bangla" | "urdu";

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}
