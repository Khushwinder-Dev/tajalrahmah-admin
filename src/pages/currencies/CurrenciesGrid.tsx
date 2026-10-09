import { Card, CardTitle } from "@/components/ui/card";
// import { toastDelete, toastRestore } from "@/lib/toast";
// import { Tooltip } from "@mantine/core";
// import { RefreshCw, Trash2, Check, Pause } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { Shield, User, Crown } from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Currency interface
interface CurrencyItem {
  id: string;
  code: string; // e.g., USD
  currency: string; // e.g., US Dollar
  exchange: number; // exchange rate
  country: string; // e.g., United States
  symbol: string; // e.g., $
}

// Mock data - replace with real data from your API
const currencies: CurrencyItem[] = [
  {
    id: "1",
    code: "USD",
    currency: "US Dollar",
    exchange: 1.0,
    country: "United States",
    symbol: "$",
  },
  {
    id: "2",
    code: "EUR",
    currency: "Euro",
    exchange: 0.92,
    country: "Eurozone",
    symbol: "€",
  },
  {
    id: "3",
    code: "GBP",
    currency: "British Pound",
    exchange: 0.79,
    country: "United Kingdom",
    symbol: "£",
  },
  {
    id: "4",
    code: "JPY",
    currency: "Japanese Yen",
    exchange: 156.7,
    country: "Japan",
    symbol: "¥",
  },
  {
    id: "5",
    code: "INR",
    currency: "Indian Rupee",
    exchange: 83.2,
    country: "India",
    symbol: "₹",
  },
  {
    id: "6",
    code: "AUD",
    currency: "Australian Dollar",
    exchange: 1.49,
    country: "Australia",
    symbol: "$",
  },
  {
    id: "7",
    code: "CAD",
    currency: "Canadian Dollar",
    exchange: 1.36,
    country: "Canada",
    symbol: "$",
  },
  {
    id: "8",
    code: "SAR",
    currency: "Saudi Riyal",
    exchange: 3.75,
    country: "Saudi Arabia",
    symbol: "﷼",
  },
  {
    id: "9",
    code: "AED",
    currency: "UAE Dirham",
    exchange: 3.67,
    country: "United Arab Emirates",
    symbol: "د.إ",
  },
  {
    id: "10",
    code: "BDT",
    currency: "Bangladeshi Taka",
    exchange: 117.0,
    country: "Bangladesh",
    symbol: "৳",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function CurrenciesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [currenciesData, setCurrenciesData] =
    useState<CurrencyItem[]>(currencies);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 6;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const codes = [
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "INR",
      "AUD",
      "CAD",
      "SAR",
      "AED",
      "BDT",
    ];
    const names = [
      "US Dollar",
      "Euro",
      "British Pound",
      "Japanese Yen",
      "Indian Rupee",
      "Australian Dollar",
      "Canadian Dollar",
      "Saudi Riyal",
      "UAE Dirham",
      "Bangladeshi Taka",
    ];
    const countries = [
      "United States",
      "Eurozone",
      "United Kingdom",
      "Japan",
      "India",
      "Australia",
      "Canada",
      "Saudi Arabia",
      "United Arab Emirates",
      "Bangladesh",
    ];
    const symbols = ["$", "€", "£", "¥", "₹", "$", "$", "﷼", "د.إ", "৳"];

    const newItems: CurrencyItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const idx = Math.floor(Math.random() * codes.length);
        const base = 0.5 + Math.random() * 200; // dummy exchange range
        return {
          id: `${Date.now()}-${index}`,
          code: codes[idx],
          currency: names[idx],
          exchange: Math.round(base * 100) / 100,
          country: countries[idx],
          symbol: symbols[idx],
        };
      }
    );

    // Stop loading more after reaching ~60 items for demo
    if (currenciesData.length >= 54) {
      setHasMore(false);
    } else {
      setCurrenciesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [currenciesData.length, isLoading, hasMore]);

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

  // Filter currencies based on search query (search across multiple fields)
  const filteredCurrencies = currenciesData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exchange.toString().includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (id: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/currencies/view/${id}?fromView=${viewMode}`);
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
            {filteredCurrencies.map((item, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(item.id)}
                >
                  {/* Currency Header with Code and Symbol */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.code} {item.symbol}
                    </CardTitle>
                  </div>

                  {/* Currency Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Currency:</span>
                      <span className="truncate">{item.currency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Exchange:</span>
                      <span className="truncate font-mono">
                        {item.exchange}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Country:</span>
                      <span className="truncate">{item.country}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more currencies...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCurrencies.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more currencies to load
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
          style={{ width: isMobile ? "100%" : "320px" }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={currencies}
                setFilteredData={setCurrenciesData}
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
          style={{ width: isMobile ? "100%" : "320px" }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={currencies}
                setFilteredData={setCurrenciesData}
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
