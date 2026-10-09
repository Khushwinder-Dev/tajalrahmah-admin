import { Card, CardTitle } from "@/components/ui/card";
import { Globe, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// Mock data - keeping your existing structure
const languages = [
  {
    id: "1",
    seq: 1,
    code: "en",
    language: "English",
    default: true,
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    seq: 2,
    code: "es",
    language: "Spanish",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "3",
    seq: 3,
    code: "fr",
    language: "French",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "4",
    seq: 4,
    code: "de",
    language: "German",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "5",
    seq: 5,
    code: "it",
    language: "Italian",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "6",
    seq: 6,
    code: "pt",
    language: "Portuguese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "7",
    seq: 7,
    code: "ru",
    language: "Russian",
    default: false,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "8",
    seq: 8,
    code: "zh",
    language: "Chinese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "9",
    seq: 9,
    code: "ja",
    language: "Japanese",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "10",
    seq: 10,
    code: "ko",
    language: "Korean",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "11",
    seq: 11,
    code: "ar",
    language: "Arabic",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "12",
    seq: 12,
    code: "hi",
    language: "Hindi",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "13",
    seq: 13,
    code: "bn",
    language: "Bengali",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "14",
    seq: 14,
    code: "tr",
    language: "Turkish",
    default: false,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "15",
    seq: 15,
    code: "nl",
    language: "Dutch",
    default: false,
    status: "active",
    isDeleted: false,
  },
  {
    id: "16",
    seq: 16,
    code: "pl",
    language: "Polish",
    default: false,
    status: "active",
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function LanguagesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Languages grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [languagesData, setLanguagesData] = useState(languages);

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const languageNames = [
      "Swedish",
      "Norwegian",
      "Danish",
      "Finnish",
      "Icelandic",
      "Greek",
      "Hebrew",
      "Thai",
      "Vietnamese",
      "Indonesian",
      "Malay",
      "Filipino",
      "Ukrainian",
      "Czech",
      "Hungarian",
      "Romanian",
      "Bulgarian",
      "Croatian",
      "Serbian",
      "Slovenian",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      seq: languagesData.length + index + 1,
      code: `lang${(languagesData.length + index + 1)
        .toString()
        .padStart(2, "0")}`,
      language: languageNames[Math.floor(Math.random() * languageNames.length)],
      default: false,
      status: Math.random() > 0.3 ? "active" : "inactive",
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (languagesData.length >= 46) {
      setHasMore(false);
    } else {
      setLanguagesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [languagesData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // const handleDeleteClick = (languageId: string) => {
  //   setLanguagesData((prevLanguages) =>
  //     prevLanguages.map((language) =>
  //       language.id === languageId
  //         ? { ...language, isDeleted: !language.isDeleted }
  //         : language
  //     )
  //   );
  // };

  // const handleRestoreClick = (languageId: string) => {
  //   setLanguagesData((prevLanguages) =>
  //     prevLanguages.map((language) =>
  //       language.id === languageId
  //         ? { ...language, isDeleted: !language.isDeleted }
  //         : language
  //     )
  //   );
  // };

  // Filter languages based on search query
  const filteredLanguages = languagesData.filter(
    (language) =>
      language.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      language.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (languageId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/languages/view/${languageId}?fromView=${viewMode}`);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg overflow-hidden"
      )}
    >
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Cards container with animated width */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-y-auto grid-scroll transition-all duration-300 ease-in-out",
            isRTL ? "" : ""
          )}
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div
            className={cn(
              "grid gap-6 pb-4 p-5",
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {filteredLanguages.map((language, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(language.id)}
              >
                {/* Top Row - Language Name and Icon */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Language Name */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {language.language}
                  </CardTitle>

                  {/* Right - Language Icon */}
                  <div className="flex justify-end">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md">
                      <Globe className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Middle Row - Code and Status */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Code - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate uppercase">
                      {language.code}
                    </div>
                  </div>

                  {/* Status - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize",
                          language.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        )}
                      >
                        {language.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Sequence and Default */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700">
                  {/* Sequence - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Sequence
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {language.seq}
                    </div>
                  </div>

                  {/* Default - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Default
                    </div>
                    <div className="flex justify-end items-center">
                      {language.default ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-normal text-gray-900 dark:text-gray-100">
                            Yes
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          No
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more languages...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLanguages.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more languages to load
              </span>
            </div>
          )}
        </div>

        {/* Animated Filter Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isFilterOpen
              ? "translate-x-0 opacity-100 visible"
              : isRTL
              ? "-translate-x-full opacity-0 invisible"
              : "translate-x-full opacity-0 invisible"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={languages}
                setFilteredData={setLanguagesData}
                setShowTabs={setIsFilterOpen}
                defaultTab="filter"
              />
            </div>
          </div>
        </div>

        {/* Animated Export Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isExportOpen
              ? "translate-x-0 opacity-100"
              : isRTL
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={languages}
                setFilteredData={setLanguagesData}
                setShowTabs={setIsExportOpen}
                defaultTab="export"
              />
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile/smaller screens */}
        {(isFilterOpen || isExportOpen) && (
          <div
            className={cn(
              "fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out z-5",
              isMobile ? "" : "md:hidden", // Always show overlay on mobile
              isFilterOpen || isExportOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => {
              setIsFilterOpen(false);
              setIsExportOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
