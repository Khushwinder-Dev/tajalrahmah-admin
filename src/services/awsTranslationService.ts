/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TranslateClient,
  TranslateTextCommand,
} from "@aws-sdk/client-translate";
// import { fromEnv } from "@aws-sdk/credential-providers";

export interface TranslationResult {
  translatedText: string;
  sourceLanguageCode?: string;
  targetLanguageCode: string;
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

// Language codes for AWS Translate
const TARGET_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  arabic: { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true },
  hindi: { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  bangla: { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  urdu: { code: "ur", name: "Urdu", nativeName: "اردو", rtl: true },
};

// AWS Configuration
const AWS_REGION = import.meta.env.VITE_AWS_REGION || "us-east-1";
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

console.log("AWS_ACCESS_KEY_ID", AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY", AWS_SECRET_ACCESS_KEY);

let translateClient: TranslateClient | null = null;

/**
 * Initialize AWS Translate Client
 */
const initializeTranslateClient = (): TranslateClient => {
  if (!translateClient) {
    try {
      // Validate AWS credentials
      if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
        throw new Error(
          "AWS credentials are not configured. Please add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to your .env file."
        );
      }

      console.log("AWS_ACCESS_KEY_ID", AWS_ACCESS_KEY_ID);
      console.log("AWS_SECRET_ACCESS_KEY", AWS_SECRET_ACCESS_KEY);

      translateClient = new TranslateClient({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
        maxAttempts: 3, // Retry failed requests up to 3 times
      });
    } catch (error) {
      console.error("Failed to initialize AWS Translate client:", error);
      throw error;
    }
  }
  return translateClient;
};

/**
 * Validate configuration
 */
const validateConfig = (): void => {
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error(
      "AWS credentials are not configured. Please check your environment variables."
    );
  }
};

/**
 * Translate text using AWS Translate
 */
const translateWithAWS = async (
  text: string,
  targetLanguageCode: string,
  sourceLanguageCode: string = "en"
): Promise<TranslationResult> => {
  validateConfig();

  try {
    const client = initializeTranslateClient();

    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: sourceLanguageCode,
      TargetLanguageCode: targetLanguageCode,
    });

    const response = await client.send(command);

    if (!response.TranslatedText) {
      throw new Error("No translation returned from AWS Translate");
    }

    return {
      translatedText: response.TranslatedText,
      sourceLanguageCode: response.SourceLanguageCode,
      targetLanguageCode: response.TargetLanguageCode || targetLanguageCode,
    };
  } catch (error: any) {
    // Handle AWS-specific errors
    if (error.name === "InvalidRequestException") {
      throw new Error(`Invalid request: ${error.message}`);
    } else if (error.name === "ResourceNotFoundException") {
      throw new Error(
        "Translation resource not found. Please check language codes."
      );
    } else if (error.name === "TooManyRequestsException") {
      throw new Error("Rate limit exceeded. Please try again later.");
    } else if (error.name === "InternalServerException") {
      throw new Error("AWS Translate service error. Please try again later.");
    } else if (
      error.name === "UnauthorizedOperation" ||
      error.name === "AccessDeniedException"
    ) {
      throw new Error(
        "AWS credentials are invalid or insufficient permissions."
      );
    } else if (error.name === "ServiceUnavailableException") {
      throw new Error("AWS Translate service is temporarily unavailable.");
    }

    console.error(`AWS Translate error for ${targetLanguageCode}:`, error);
    throw new Error(error.message || "Translation failed");
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

  // Check text length (AWS Translate has a 10,000 character limit)
  if (text.length > 10000) {
    return {
      original: text,
      translations: {
        arabic: "",
        hindi: "",
        bangla: "",
        urdu: "",
      },
      success: false,
      error:
        "Text is too long. AWS Translate supports up to 10,000 characters.",
    };
  }

  const translations: Partial<MultiLanguageTranslation["translations"]> = {};
  const errors: string[] = [];

  try {
    // Translate to each target language with controlled concurrency
    const translationPromises = Object.entries(TARGET_LANGUAGES).map(
      async ([languageName, config]) => {
        try {
          const result = await translateWithAWS(text, config.code);
          return {
            language: languageName as SupportedLanguage,
            translation: result.translatedText,
            success: true,
          };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error(`Error translating to ${languageName}:`, errorMessage);
          errors.push(`${config.name}: ${errorMessage}`);
          return {
            language: languageName as SupportedLanguage,
            translation: `[Translation failed: ${config.name}]`,
            success: false,
            error: errorMessage,
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

    const hasErrors = errors.length > 0;
    const allFailed = errors.length === Object.keys(TARGET_LANGUAGES).length;

    return {
      original: text,
      translations: translations as MultiLanguageTranslation["translations"],
      success: !allFailed,
      error: hasErrors
        ? `Some translations failed: ${errors.join("; ")}`
        : undefined,
    };
  } catch (error) {
    console.error("Translation service error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return {
      original: text,
      translations: {
        arabic: "[Translation failed]",
        hindi: "[Translation failed]",
        bangla: "[Translation failed]",
        urdu: "[Translation failed]",
      },
      success: false,
      error: errorMessage,
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

  if (text.length > 10000) {
    return {
      text: "",
      success: false,
      error:
        "Text is too long. AWS Translate supports up to 10,000 characters.",
    };
  }

  try {
    const config = TARGET_LANGUAGES[targetLanguage];
    if (!config) {
      throw new Error(`Unsupported language: ${targetLanguage}`);
    }

    const result = await translateWithAWS(text, config.code);

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
  return !!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY);
};

/**
 * Get available AWS Translate languages
 */
export const getAWSTranslateLanguages = async (): Promise<string[]> => {
  try {
    validateConfig();
    // AWS Translate doesn't have a direct API to list languages
    // Return our supported language codes
    return Object.values(TARGET_LANGUAGES).map((lang) => lang.code);
  } catch (error) {
    console.error("Error getting AWS Translate languages:", error);
    return [];
  }
};

/**
 * Test AWS Translate connection
 */
export const testAWSTranslateConnection = async (): Promise<{
  connected: boolean;
  error?: string;
}> => {
  try {
    validateConfig();

    // Test with a simple translation
    const result = await translateWithAWS("Hello", "es"); // English to Spanish

    console.log("AWS Translate connection test result:", result);

    return {
      connected: true,
    };
  } catch (error) {
    console.error("AWS Translate connection test failed:", error);
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Connection test failed",
    };
  }
};

/**
 * Get translation cost estimate
 */
export const getTranslationCostEstimate = (
  characterCount: number
): { costUSD: number; freeCharactersUsed: number } => {
  const freeCharactersPerMonth = 2000000; // 2M characters free per month
  const costPerCharacter = 0.000015; // $15 per 1M characters

  const freeCharactersUsed = Math.min(characterCount, freeCharactersPerMonth);
  const billableCharacters = Math.max(
    0,
    characterCount - freeCharactersPerMonth
  );
  const costUSD = billableCharacters * costPerCharacter;

  return {
    costUSD: Math.round(costUSD * 100) / 100, // Round to 2 decimal places
    freeCharactersUsed,
  };
};
