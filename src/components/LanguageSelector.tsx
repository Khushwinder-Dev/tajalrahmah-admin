import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Globe, CheckCircle2, Search, X } from "lucide-react";
import clsx from "clsx";
import {
  setLanguage,
  SUPPORTED_LANGUAGES,
  type Language,
} from "@/store/languageSlice";
import type { RootState } from "@/store";

interface LanguageSelectorProps {
  className?: string;
  triggerClassName?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  triggerClassName,
}) => {
  const dispatch = useDispatch();
  const { currentLanguage, isRTL } = useSelector(
    (state: RootState) => state.language
  );
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const handleLanguageSelect = (code: string) => {
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SUPPORTED_LANGUAGES;
    return SUPPORTED_LANGUAGES.filter(
      (lang: Language) =>
        lang.name.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className={clsx("relative inline-block text-left", className)} ref={dropdownRef}>
      {/* Trigger Button with Globe Icon (Image 1 reference) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center",
          triggerClassName ||
            "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
        title="Select language"
        aria-label="Select language"
      >
        <Globe className="w-5 h-5 stroke-[1.8]" />
      </button>

      {/* Dropdown Panel (Image 2 reference) */}
      {isOpen && (
        <div
          className={clsx(
            "absolute top-full mt-2 w-72 sm:w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl z-50 p-3.5 transition-all animate-in fade-in zoom-in-95 duration-150",
            isRTL ? "left-0" : "right-0"
          )}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-900 dark:text-white stroke-[2] shrink-0" />
              <div className="leading-tight">
                <span className="block text-xs font-bold text-gray-900 dark:text-white">
                  Select
                </span>
                <span className="block text-sm font-bold text-gray-900 dark:text-white -mt-0.5">
                  Language
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 text-[11px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full">
              {SUPPORTED_LANGUAGES.length} languages
            </span>
          </div>

          {/* Search Input */}
          <div className="relative my-2.5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-full text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0070ba] dark:focus:ring-[#38bdf8] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto space-y-1 pr-0.5 custom-scrollbar">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLanguage.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={clsx(
                      "w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer text-left group",
                      isSelected
                        ? "bg-gray-100/90 dark:bg-gray-800/90 font-medium"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    )}
                  >
                    <div className="flex flex-col text-left">
                      <span
                        className={clsx(
                          "text-sm font-bold tracking-tight leading-tight",
                          isSelected
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-800 dark:text-gray-200 group-hover:text-[#0070ba] dark:group-hover:text-[#38bdf8]"
                        )}
                      >
                        {lang.nativeName}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-normal mt-0.5">
                        {lang.name}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-gray-500 dark:text-gray-400">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
