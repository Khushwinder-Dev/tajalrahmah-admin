import { useState, useCallback } from "react";
import {
  translateToMultipleLanguages,
  translateToSingleLanguage,
  isTranslationConfigured,
  testAWSTranslateConnection,
} from "../services/awsTranslationService";
import type {
  MultiLanguageTranslation,
  SupportedLanguage,
} from "../services/awsTranslationService";

interface UseAWSTranslationReturn {
  isLoading: boolean;
  error: string | null;
  translations: MultiLanguageTranslation | null;
  isConfigured: boolean;
  connectionStatus: "unknown" | "connected" | "failed";
  translateText: (text: string) => Promise<void>;
  translateToSingle: (
    text: string,
    language: SupportedLanguage
  ) => Promise<string>;
  clearTranslations: () => void;
  clearError: () => void;
  testConnection: () => Promise<void>;
}

export const useAWSTranslation = (): UseAWSTranslationReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [translations, setTranslations] =
    useState<MultiLanguageTranslation | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "unknown" | "connected" | "failed"
  >("unknown");

  const isConfigured = isTranslationConfigured();

  const translateText = useCallback(
    async (text: string): Promise<void> => {
      if (!text.trim()) {
        setError("Please enter text to translate");
        return;
      }

      if (!isConfigured) {
        setError(
          "AWS Translate is not configured. Please check your AWS credentials."
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
        } else if (result.success) {
          setConnectionStatus("connected");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred during translation";
        setError(errorMessage);
        setConnectionStatus("failed");
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
        throw new Error("AWS Translate is not configured");
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await translateToSingleLanguage(text, language);

        if (result.success) {
          setConnectionStatus("connected");
          return result.text;
        } else {
          setConnectionStatus("failed");
          throw new Error(result.error || "Translation failed");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred during translation";
        setError(errorMessage);
        setConnectionStatus("failed");
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [isConfigured]
  );

  const testConnection = useCallback(async (): Promise<void> => {
    if (!isConfigured) {
      setError("AWS Translate is not configured");
      setConnectionStatus("failed");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await testAWSTranslateConnection();

      if (result.connected) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("failed");
        setError(result.error || "Connection test failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Connection test failed";
      setError(errorMessage);
      setConnectionStatus("failed");
    } finally {
      setIsLoading(false);
    }
  }, [isConfigured]);

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
    connectionStatus,
    translateText,
    translateToSingle,
    clearTranslations,
    clearError,
    testConnection,
  };
};
