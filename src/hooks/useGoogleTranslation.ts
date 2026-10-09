import { useState, useCallback } from "react";
import {
  translateToMultipleLanguages,
  translateToSingleLanguage,
  isTranslationConfigured,
} from "../services/translationService";
import type {
  MultiLanguageTranslation,
  SupportedLanguage,
} from "../types/translation";

interface UseGoogleTranslationReturn {
  isLoading: boolean;
  error: string | null;
  translations: MultiLanguageTranslation | null;
  isConfigured: boolean;
  translateText: (text: string) => Promise<void>;
  translateToSingle: (
    text: string,
    language: SupportedLanguage
  ) => Promise<string>;
  clearTranslations: () => void;
  clearError: () => void;
}

export const useGoogleTranslation = (): UseGoogleTranslationReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [translations, setTranslations] =
    useState<MultiLanguageTranslation | null>(null);

  const isConfigured = isTranslationConfigured();

  const translateText = useCallback(
    async (text: string): Promise<void> => {
      if (!text.trim()) {
        setError("Please enter text to translate");
        return;
      }

      if (!isConfigured) {
        setError(
          "Translation service is not configured. Please check your API key."
        );
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await translateToMultipleLanguages(text);
        setTranslations(result);

        if (!result.success && result.error) {
          setError(result.error);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred during translation";
        setError(errorMessage);
        console.error("Translation error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [isConfigured]
  );

  const translateToSingle = useCallback(
    async (text: string, language: SupportedLanguage): Promise<string> => {
      if (!text.trim()) {
        throw new Error("Please enter text to translate");
      }

      if (!isConfigured) {
        throw new Error("Translation service is not configured");
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await translateToSingleLanguage(text, language);

        if (result.success) {
          return result.text;
        } else {
          throw new Error(result.error || "Translation failed");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred during translation";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [isConfigured]
  );

  const clearTranslations = useCallback((): void => {
    setTranslations(null);
    setError(null);
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    translations,
    isConfigured,
    translateText,
    translateToSingle,
    clearTranslations,
    clearError,
  };
};
