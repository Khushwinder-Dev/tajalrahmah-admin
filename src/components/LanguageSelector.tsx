// components/LanguageSelector.tsx
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  SUPPORTED_LANGUAGES,
  type Language,
} from "@/store/languageSlice";
import type { RootState } from "@/store";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp, Check, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useIsMobile from "@/hooks/useIsMobile";
// import { AnimatePresence, motion } from "framer-motion";
import BottomDrawer from "./BottomDrawer";
import SelectableList from "./SelectableList";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectData = SUPPORTED_LANGUAGES.map((language: Language) => ({
    value: language.code,
    label: `${language.name} (${language.nativeName})`,
    shortLabel: language.name,
  }));

  const currentLanguageData = selectData.find(
    (lang) => lang.value === currentLanguage.code
  );

  const handleLanguageChange = (value: string) => {
    dispatch(setLanguage(value));
    i18n.changeLanguage(value);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Mobile/Tablet Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer md:hidden"
        aria-label="Select language"
      >
        <Globe size={18} />
      </button>

      {/* Desktop Dropdown */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full min-w-[180px] px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors cursor-pointer"
          aria-label="Select language"
        >
          <span className="truncate">{currentLanguageData?.label}</span>
          {isDropdownOpen ? (
            <ChevronUp
              size={16}
              className="text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0"
            />
          ) : (
            <ChevronDown
              size={16}
              className="text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0"
            />
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && !isMobile && (
        <div className="absolute right-0 mt-1 w-full md:w-auto md:min-w-[200px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
          <div className="py-1">
            {selectData.map((language) => (
              <button
                key={language.value}
                onClick={() => handleLanguageChange(language.value)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center justify-between ${
                  language.value === currentLanguage.code
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="truncate">
                  {/* Show full label on desktop, short label on mobile */}
                  <span className="hidden md:inline">{language.label}</span>
                  <span className="md:hidden">{language.shortLabel}</span>
                </span>
                {language.value === currentLanguage.code && (
                  <Check
                    size={16}
                    className="text-blue-600 dark:text-blue-400 ml-2 flex-shrink-0"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Modal Overlay */}
      {/* <AnimatePresence>
        {isDropdownOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </AnimatePresence> */}

      {/* Mobile Modal */}
      {/* <AnimatePresence>
        {isDropdownOpen && isMobile && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden pointer-events-none">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4,
              }}
              className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-t-xl shadow-xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Select Language
                </h3>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <ChevronUp size={24} />
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {selectData.map((language) => (
                  <button
                    key={language.value}
                    onClick={() => handleLanguageChange(language.value)}
                    className={`w-full text-left px-4 py-3 text-base hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                      language.value === currentLanguage.code
                        ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{language.shortLabel}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {language.label}
                      </span>
                    </div>
                    {language.value === currentLanguage.code && (
                      <Check
                        size={20}
                        className="text-blue-600 dark:text-blue-400 ml-2 flex-shrink-0"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */}

      <BottomDrawer
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        title="Select Language"
      >
        <SelectableList
          items={selectData}
          selectedValue={currentLanguage.code}
          onItemSelect={handleLanguageChange}
        />
      </BottomDrawer>
    </div>
  );
};

export default LanguageSelector;
