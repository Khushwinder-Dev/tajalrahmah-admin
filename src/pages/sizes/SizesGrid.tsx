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

// Size interface
interface SizeItem {
  id: string;
  code: string;
  name: string;
  value: string;
  description: string;
}

// Mock data - replace with real data from your API
const sizes: SizeItem[] = [
  {
    id: "1",
    code: "SZ001",
    name: "Small",
    value: "S",
    description: "Standard small size suitable for compact items",
  },
  {
    id: "2",
    code: "SZ002",
    name: "Medium",
    value: "M",
    description: "Most commonly used medium size",
  },
  {
    id: "3",
    code: "SZ003",
    name: "Large",
    value: "L",
    description: "Large size for spacious fit",
  },
  {
    id: "4",
    code: "SZ004",
    name: "Extra Large",
    value: "XL",
    description: "Extra large size for oversized requirements",
  },
  {
    id: "5",
    code: "SZ005",
    name: "Double Extra Large",
    value: "2XL",
    description: "Very large size for extended range",
  },
  {
    id: "6",
    code: "SZ006",
    name: "Triple Extra Large",
    value: "3XL",
    description: "Largest standard size offering",
  },
  {
    id: "7",
    code: "SZ007",
    name: "Kids Small",
    value: "KS",
    description: "Kids small size",
  },
  {
    id: "8",
    code: "SZ008",
    name: "Kids Medium",
    value: "KM",
    description: "Kids medium size",
  },
  {
    id: "9",
    code: "SZ009",
    name: "Kids Large",
    value: "KL",
    description: "Kids large size",
  },
  {
    id: "10",
    code: "SZ010",
    name: "Custom Small",
    value: "CUS-S",
    description: "Custom-defined small size",
  },
  {
    id: "11",
    code: "SZ011",
    name: "Custom Medium",
    value: "CUS-M",
    description: "Custom-defined medium size",
  },
  {
    id: "12",
    code: "SZ012",
    name: "Custom Large",
    value: "CUS-L",
    description: "Custom-defined large size",
  },
  {
    id: "13",
    code: "SZ013",
    name: "Numeric 28",
    value: "28",
    description: "Numeric waist size 28",
  },
  {
    id: "14",
    code: "SZ014",
    name: "Numeric 30",
    value: "30",
    description: "Numeric waist size 30",
  },
  {
    id: "15",
    code: "SZ015",
    name: "Numeric 32",
    value: "32",
    description: "Numeric waist size 32",
  },
  {
    id: "16",
    code: "SZ016",
    name: "Numeric 34",
    value: "34",
    description: "Numeric waist size 34",
  },
  {
    id: "17",
    code: "SZ017",
    name: "Numeric 36",
    value: "36",
    description: "Numeric waist size 36",
  },
  {
    id: "18",
    code: "SZ018",
    name: "Numeric 38",
    value: "38",
    description: "Numeric waist size 38",
  },
  {
    id: "19",
    code: "SZ019",
    name: "Numeric 40",
    value: "40",
    description: "Numeric waist size 40",
  },
  {
    id: "20",
    code: "SZ020",
    name: "Numeric 42",
    value: "42",
    description: "Numeric waist size 42",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ColorsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sizes grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [colorsData, setColorsData] = useState<SizeItem[]>(sizes);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

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

    const sizeNames = [
      "Small",
      "Medium",
      "Large",
      "Extra Large",
      "2XL",
      "3XL",
      "Slim Fit",
      "Regular Fit",
      "Relaxed Fit",
      "Kids Small",
      "Kids Medium",
      "Kids Large",
      "Numeric 28",
      "Numeric 30",
      "Numeric 32",
      "Numeric 34",
      "Numeric 36",
      "Numeric 38",
    ];
    const sizeCodes = ["SZ", "NUM", "KID", "CUS", "FIT"];
    const descriptions = [
      "Standard small size",
      "Most common medium size",
      "Large size for spacious fit",
      "Extra large size",
      "Kids size variant",
      "Custom defined size",
      "Numeric measurement size",
      "Regular fitting size",
      "Relaxed comfort size",
    ];

    const values = [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
      "28",
      "30",
      "32",
      "34",
      "36",
      "38",
      "KS",
      "KM",
      "KL",
    ];

    const newItems: SizeItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const sizeName =
          sizeNames[Math.floor(Math.random() * sizeNames.length)];
        const sizeCode =
          sizeCodes[Math.floor(Math.random() * sizeCodes.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];
        const value = values[Math.floor(Math.random() * values.length)];

        return {
          id: `${Date.now()}-${index}`,
          name: sizeName,
          code: `${sizeCode}${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          value: value,
          description: description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (colorsData.length >= 46) {
      setHasMore(false);
    } else {
      setColorsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [colorsData.length, isLoading, hasMore]);

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

  // Filter sizes based on search query (search across multiple fields)
  const filteredColors = colorsData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (colorId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/colors/view/${colorId}?fromView=${viewMode}`);
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
            {filteredColors.map((item, index) => {
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
                  {/* Size Header with Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.name}
                    </CardTitle>
                  </div>

                  {/* Size Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate font-mono">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Value:</span>
                      <span className="font-mono">{item.value}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
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
                <span className="text-sm">Loading more colors...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredColors.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more colors to load
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
                data={sizes}
                setFilteredData={setColorsData}
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
                data={sizes}
                setFilteredData={setColorsData}
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
