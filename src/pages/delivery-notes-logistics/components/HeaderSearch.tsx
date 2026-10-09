import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mic, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchFilterPopover from "./SearchFilterPopover";

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  viewMode: string;
  setTimeLabel: (timeLabel: string) => void;
  setIsExportOpen: (isExportOpen: boolean) => void;
};

const HeaderSearch = ({
  searchQuery,
  setSearchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setShowVisibility,
  showVisibility,
  viewMode,
  setTimeLabel,
  setIsExportOpen,
}: Props) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Add to search history
      console.log("Searching for:", searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isRTL = i18n.language === "ar";

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="">
      {/* Google-Style Search Field */}
      <div
        ref={searchRef}
        className="w-[500px] opacity-100"
        style={{
          transformOrigin: "",
        }}
      >
        <div className="relative flex justify-center items-center w-full min-w-[300px] max-w-[500px]">
          {/* Main Search Input */}
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 h-10 w-full min-w-[450px] max-w-[350px]">
            {/* Search icon on the left */}
            <div className="flex items-center px-3">
              <Search size={18} className="text-gray-400" />
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder={t("navbar.search.placeholder")}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={cn(
                "flex-1 py-3 bg-transparent border-0 focus:ring-0 text-gray-700 dark:text-gray-300 text-base outline-none",
                isRTL ? "pr-2 text-right" : "pl-2 text-left"
              )}
              dir={i18n.language}
            />

            {/* Clear button */}
            {searchQuery && (
              <Button
                variant="ghost"
                onClick={clearSearch}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </Button>
            )}

            {/* Voice and Camera buttons */}
            <div className="flex items-center px-2 border-l border-gray-200 dark:border-gray-600 ml-2">
              <button
                type="button"
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-full bg-gray-200 dark:hover:bg-gray-700 cursor-pointer m-1"
                aria-label={t("navbar.search.voice")}
                onClick={() => console.log("Voice search clicked")}
              >
                <Mic size={18} />
              </button>
            </div>

            {/* Filter icon on the right */}
            <div className="flex items-center px-2">
              <SearchFilterPopover
                onSearch={(timeLabel) => {
                  console.log("Search with time filter:", timeLabel);
                }}
                isPopoverOpen={isPopoverOpen}
                setIsPopoverOpen={setIsPopoverOpen}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                showVisibility={showVisibility}
                setShowVisibility={setShowVisibility}
                viewMode={viewMode}
                setTimeLabel={setTimeLabel}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
