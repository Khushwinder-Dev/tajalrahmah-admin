/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mic, MicOff, Search, X, Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  className?: string; // Optional className for additional styling
};

const HeaderSearch = ({ searchQuery, setSearchQuery, className }: Props) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  // Voice search states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Animated dots state for listening placeholder
  const [animatedDots, setAnimatedDots] = useState("");

  // Animate dots when listening
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isListening) {
      let dotCount = 0;
      interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // 0, 1, 2, 3, then back to 0
        setAnimatedDots(".".repeat(dotCount));
      }, 500); // Change every 500ms
    } else {
      setAnimatedDots("");
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isListening]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.lang = i18n.language === "ar" ? "ar-SA" : "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          setIsVoiceLoading(true); // Start loading after voice input

          setSearchQuery(transcript);
          // Focus input after voice input
          if (inputRef.current) {
            inputRef.current.focus();
          }

          // Simulate search completion after a delay (you can replace this with actual search logic)
          setTimeout(() => {
            setIsVoiceLoading(false);
          }, 1500);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          setIsVoiceLoading(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [i18n.language, setSearchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Add to search history
      console.log("Searching for:", searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Stop voice loading if user manually types
    if (isVoiceLoading) {
      setIsVoiceLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Voice search handler
  const handleVoiceSearch = () => {
    if (!speechSupported) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        setIsVoiceLoading(false); // Reset loading state
        recognitionRef.current.start();
      }
    }
  };

  const isRTL = i18n.language === "ar";

  const clearSearch = () => {
    setSearchQuery("");
    setIsVoiceLoading(false); // Reset loading state when clearing
  };

  // Dynamic placeholder based on listening state
  const getPlaceholder = () => {
    if (isListening) {
      return `Speak now${animatedDots}`;
    }
    return "Search";
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Google-Style Search Field */}
      <div ref={searchRef} className="w-full opacity-100">
        <div className="relative flex justify-center items-center w-full">
          {/* Main Search Input */}
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full hover:shadow-md transition-all duration-200 h-10 w-full focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-300">
            {/* Search icon - left for LTR, right for RTL */}
            <div
              className={`flex items-center px-3 flex-shrink-0 ${
                isRTL ? "order-3" : "order-1"
              }`}
            >
              <Search
                size={18}
                className={`transition-colors ${
                  isFocused ? "text-primary" : "text-gray-400"
                }`}
              />
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder={getPlaceholder()}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "flex-1 py-3 bg-transparent border-0 focus:ring-0 text-gray-700 dark:text-gray-300 text-base outline-none focus:outline-none min-w-0 transition-all duration-200 order-2",
                isRTL ? "pr-2 text-right" : "pl-2 text-left"
              )}
              dir={i18n.language}
              style={{
                // Additional styling for listening state
                ...(isListening && {
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                }),
              }}
            />

            {/* Right side buttons container with fixed positioning */}
            <div
              className={`flex items-center flex-shrink-0 ${
                isRTL ? "pl-3 order-1 flex-row-reverse" : "pr-3 order-3"
              }`}
            >
              {/* Clear button */}
              {searchQuery && (
                <Button
                  variant="ghost"
                  onClick={clearSearch}
                  className={`h-6 w-6 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full bg-sky-100 hover:bg-sky-200 flex-shrink-0`}
                  style={{ color: "#20B7FA" }}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </Button>
              )}

              {/* Divider - only show when there are buttons on both sides */}
              {searchQuery && speechSupported && (
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-600 flex-shrink-0 mr-2" />
              )}

              {/* Voice Search Button - Fixed position */}
              {speechSupported && (
                <div className="flex-shrink-0">
                  {isVoiceLoading ? (
                    <div className="p-1 rounded-full">
                      <Loader2
                        size={18}
                        className="animate-spin text-blue-500"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={`p-1 transition-all duration-200 rounded-full cursor-pointer ${
                        isListening
                          ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                          : "hover:bg-blue-50 dark:hover:bg-gray-700"
                      }`}
                      aria-label={
                        isListening
                          ? t("navbar.search.stopListening") || "Stop listening"
                          : t("navbar.search.voice") || "Voice search"
                      }
                      onClick={handleVoiceSearch}
                      title={
                        isListening
                          ? t("navbar.search.stopListening") || "Stop listening"
                          : t("navbar.search.voice") || "Voice search"
                      }
                    >
                      {isListening ? (
                        <MicOff
                          size={18}
                          className="transition-colors text-white"
                        />
                      ) : (
                        <Mic
                          size={18}
                          className={`transition-colors ${
                            isFocused
                              ? "text-primary hover:text-primary/80"
                              : "text-gray-400 hover:text-gray-700"
                          }
                          ${isRTL ? "mr-2" : ""}
                          `}
                        />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
