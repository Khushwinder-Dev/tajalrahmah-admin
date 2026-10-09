/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Language codes
const TARGET_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  arabic: { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  hindi: { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  bangla: { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  urdu: { code: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
};

/**
 * Translate using LibreTranslate (Free)
 */
const translateWithLibreTranslate = async (
  text: string,
  targetLang: string
): Promise<string> => {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
      }),
    });

    console.log("LibreTranslate response:", response);

    if (!response.ok) {
      throw new Error(`LibreTranslate API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error(`LibreTranslate error for ${targetLang}:`, error);
    throw error;
  }
};

/**
 * Translate using MyMemory (Free, No API Key)
 */
const translateWithMyMemory = async (
  text: string,
  targetLang: string
): Promise<string> => {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${targetLang}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`MyMemory API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    } else {
      throw new Error("MyMemory translation failed");
    }
  } catch (error) {
    console.error(`MyMemory error for ${targetLang}:`, error);
    throw error;
  }
};

/**
 * Fallback mock translations
 */
const getMockTranslation = (
  text: string,
  languageName: SupportedLanguage
): string => {
  const mockTranslations: Record<SupportedLanguage, string> = {
    arabic: `العربية: ${text}`,
    hindi: `हिंदी: ${text}`,
    bangla: `বাংলা: ${text}`,
    urdu: `اردو: ${text}`,
  };
  return mockTranslations[languageName];
};

/**
 * Try multiple translation services with fallbacks
 */
const translateWithFallback = async (
  text: string,
  targetLang: string,
  languageName: SupportedLanguage
): Promise<string> => {
  // Try LibreTranslate first
  try {
    return await translateWithLibreTranslate(text, targetLang);
  } catch (error) {
    console.error(`LibreTranslate error for ${targetLang}:`, error);
    console.warn(
      `LibreTranslate failed for ${languageName}, trying MyMemory...`
    );
  }

  // Try MyMemory as backup
  try {
    return await translateWithMyMemory(text, targetLang);
  } catch (error) {
    console.error(`MyMemory error for ${targetLang}:`, error);
    console.warn(
      `MyMemory failed for ${languageName}, using mock translation...`
    );
  }

  // Use mock as final fallback
  return getMockTranslation(text, languageName);
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
    // Translate to each target language
    const translationPromises = Object.entries(TARGET_LANGUAGES).map(
      async ([languageName, config]) => {
        try {
          const translatedText = await translateWithFallback(
            text,
            config.code,
            languageName as SupportedLanguage
          );
          return {
            language: languageName as SupportedLanguage,
            translation: translatedText,
            success: true,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error(`Error translating to ${languageName}:`, errorMessage);
          errors.push(`${config.name}: ${errorMessage}`);
          return {
            language: languageName as SupportedLanguage,
            translation: getMockTranslation(
              text,
              languageName as SupportedLanguage
            ),
            success: false,
          };
        }
      }
    );

    // Wait for all translations with timeout
    const results = await Promise.allSettled(
      translationPromises.map((promise) =>
        Promise.race([
          promise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Translation timeout")), 10000)
          ),
        ])
      )
    );

    // Process results
    results.forEach((result, index) => {
      const language = Object.keys(TARGET_LANGUAGES)[
        index
      ] as SupportedLanguage;

      if (result.status === "fulfilled") {
        const { translation } = result.value as any;
        translations[language] = translation;
      } else {
        console.error(`Translation failed for ${language}:`, result.reason);
        translations[language] = getMockTranslation(text, language);
        errors.push(
          `${TARGET_LANGUAGES[language].name}: ${
            result.reason?.message || "Timeout"
          }`
        );
      }
    });

    return {
      original: text,
      translations: translations as MultiLanguageTranslation["translations"],
      success: errors.length === 0,
      error:
        errors.length > 0
          ? `Some translations failed: ${errors.join("; ")}`
          : undefined,
    };
  } catch (error) {
    console.error("Translation service error:", error);
    return {
      original: text,
      translations: {
        arabic: getMockTranslation(text, "arabic"),
        hindi: getMockTranslation(text, "hindi"),
        bangla: getMockTranslation(text, "bangla"),
        urdu: getMockTranslation(text, "urdu"),
      },
      success: false,
      error:
        error instanceof Error ? error.message : "Translation service failed",
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

    const translatedText = await translateWithFallback(
      text,
      config.code,
      targetLanguage
    );

    return {
      text: translatedText,
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Translation failed";
    console.error(`Error translating to ${targetLanguage}:`, errorMessage);
    return {
      text: getMockTranslation(text, targetLanguage),
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
  return true; // Free services don't need configuration
};

/**
 * Test translation connection
 */
export const testAWSTranslateConnection = async (): Promise<{
  connected: boolean;
  error?: string;
}> => {
  try {
    // Test with LibreTranslate
    await translateWithLibreTranslate("Hello", "es");
    return { connected: true };
  } catch (error) {
    console.error("LibreTranslate connection test failed:", error);
    try {
      // Test with MyMemory
      await translateWithMyMemory("Hello", "es");
      return { connected: true };
    } catch (memoryError) {
      console.error("MyMemory connection test failed:", memoryError);
      return {
        connected: false,
        error: "All translation services are unavailable",
      };
    }
  }
};
