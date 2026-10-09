import axios from "axios";

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
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

export type SupportedLanguage = "arabic" | "hindi" | "bangla" | "urdu";

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

// Language codes for target languages
const TARGET_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  arabic: { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  hindi: { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  bangla: { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  urdu: { code: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
};

// Google Cloud Translation API configuration
const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_TRANSLATE_API_URL =
  "https://translation.googleapis.com/language/translate/v2";

/**
 * Validate API configuration
 */
const validateConfig = (): void => {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    throw new Error(
      "Google Translate API key is not configured. Please add VITE_GOOGLE_TRANSLATE_API_KEY to your .env file."
    );
  }
};

/**
 * Translate text using Google Cloud Translation API
 */
const translateWithGoogle = async (
  text: string,
  targetLang: string
): Promise<TranslationResult> => {
  validateConfig();

  try {
    const response = await axios.post(
      GOOGLE_TRANSLATE_API_URL,
      {
        q: text,
        target: targetLang,
        source: "en",
        format: "text",
      },
      {
        params: {
          key: GOOGLE_TRANSLATE_API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    if (response.data?.data?.translations?.length > 0) {
      const translation = response.data.data.translations[0];
      return {
        translatedText: translation.translatedText,
        detectedSourceLanguage: translation.detectedSourceLanguage,
      };
    } else {
      throw new Error("No translation returned from Google API");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error?.message || error.message;

      switch (status) {
        case 400:
          throw new Error(`Bad request: ${message}`);
        case 403:
          throw new Error("API key is invalid or quota exceeded");
        case 429:
          throw new Error("Rate limit exceeded. Please try again later.");
        default:
          throw new Error(`Translation API error (${status}): ${message}`);
      }
    }
    throw error;
  }
};

/**
 * Batch translate to multiple languages
 */
export const translateToMultipleLanguages = async (
  text: string
): Promise<MultiLanguageTranslation> => {
  if (!text.trim()) {
    return {
      original: text,
      translations: {
        arabic: "",
        hindi: "",
        bangla: "",
        urdu: "",
      },
      success: false,
      error: "Text is required for translation",
    };
  }

  const translations: Partial<MultiLanguageTranslation["translations"]> = {};
  const errors: string[] = [];

  try {
    // Translate to each target language with controlled concurrency
    const translationPromises = Object.entries(TARGET_LANGUAGES).map(
      async ([languageName, config]) => {
        try {
          const result = await translateWithGoogle(text, config.code);
          return {
            language: languageName as SupportedLanguage,
            translation: result.translatedText,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error(`Error translating to ${languageName}:`, errorMessage);
          errors.push(`${config.name}: ${errorMessage}`);
          return {
            language: languageName as SupportedLanguage,
            translation: `[Translation failed: ${config.name}]`,
          };
        }
      }
    );

    // Wait for all translations to complete
    const results = await Promise.all(translationPromises);

    // Process results
    results.forEach(({ language, translation }) => {
      translations[language] = translation;
    });

    return {
      original: text,
      translations: translations as MultiLanguageTranslation["translations"],
      success: errors.length === 0,
      error:
        errors.length > 0
          ? `Some translations failed: ${errors.join(", ")}`
          : undefined,
    };
  } catch (error) {
    console.error("Translation service error:", error);
    return {
      original: text,
      translations: {
        arabic: "[Translation failed]",
        hindi: "[Translation failed]",
        bangla: "[Translation failed]",
        urdu: "[Translation failed]",
      },
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Translate to a single language
 */
export const translateToSingleLanguage = async (
  text: string,
  targetLanguage: SupportedLanguage
): Promise<{ text: string; success: boolean; error?: string }> => {
  if (!text.trim()) {
    return {
      text: "",
      success: false,
      error: "Text is required for translation",
    };
  }

  try {
    const config = TARGET_LANGUAGES[targetLanguage];
    if (!config) {
      throw new Error(`Unsupported language: ${targetLanguage}`);
    }

    const result = await translateWithGoogle(text, config.code);

    return {
      text: result.translatedText,
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Translation failed";
    console.error(`Error translating to ${targetLanguage}:`, errorMessage);
    return {
      text: "[Translation failed]",
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Get supported languages configuration
 */
export const getSupportedLanguages = (): Record<
  SupportedLanguage,
  LanguageConfig
> => {
  return TARGET_LANGUAGES;
};

/**
 * Check if translation service is configured
 */
export const isTranslationConfigured = (): boolean => {
  return !!GOOGLE_TRANSLATE_API_KEY;
};

/**
 * Get translation quota/usage information
 */
export const getTranslationQuota = async (): Promise<{
  charactersTranslated: number;
  quotaRemaining?: number;
}> => {
  // This would require additional Google Cloud APIs to get actual quota information
  // For now, return mock data
  return {
    charactersTranslated: 0,
    quotaRemaining: undefined,
  };
};
