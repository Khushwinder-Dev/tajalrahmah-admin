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

// State interface
interface StateItem {
  id: string;
  code: string;
  state: string;
  country: string;
}

// Mock data - replace with real data from your API
const states: StateItem[] = [
  {
    id: "1",
    code: "CA",
    state: "California",
    country: "United States",
  },
  {
    id: "2",
    code: "NY",
    state: "New York",
    country: "United States",
  },
  {
    id: "3",
    code: "TX",
    state: "Texas",
    country: "United States",
  },
  {
    id: "4",
    code: "FL",
    state: "Florida",
    country: "United States",
  },
  {
    id: "5",
    code: "ON",
    state: "Ontario",
    country: "Canada",
  },
  {
    id: "6",
    code: "BC",
    state: "British Columbia",
    country: "Canada",
  },
  {
    id: "7",
    code: "NSW",
    state: "New South Wales",
    country: "Australia",
  },
  {
    id: "8",
    code: "VIC",
    state: "Victoria",
    country: "Australia",
  },
  {
    id: "9",
    code: "ENG",
    state: "England",
    country: "United Kingdom",
  },
  {
    id: "10",
    code: "SCT",
    state: "Scotland",
    country: "United Kingdom",
  },
  {
    id: "11",
    code: "MH",
    state: "Maharashtra",
    country: "India",
  },
  {
    id: "12",
    code: "DL",
    state: "Delhi",
    country: "India",
  },
  {
    id: "13",
    code: "SP",
    state: "São Paulo",
    country: "Brazil",
  },
  {
    id: "14",
    code: "RJ",
    state: "Rio de Janeiro",
    country: "Brazil",
  },
  {
    id: "15",
    code: "BJ",
    state: "Beijing",
    country: "China",
  },
  {
    id: "16",
    code: "SH",
    state: "Shanghai",
    country: "China",
  },
  {
    id: "17",
    code: "TO",
    state: "Tokyo",
    country: "Japan",
  },
  {
    id: "18",
    code: "OS",
    state: "Osaka",
    country: "Japan",
  },
  {
    id: "19",
    code: "BA",
    state: "Bavaria",
    country: "Germany",
  },
  {
    id: "20",
    code: "NW",
    state: "North Rhine-Westphalia",
    country: "Germany",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function StatesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("States grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [statesData, setStatesData] = useState<StateItem[]>(states);
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

    const stateNames = [
      "California",
      "New York",
      "Texas",
      "Florida",
      "Ontario",
      "British Columbia",
      "New South Wales",
      "Victoria",
      "England",
      "Scotland",
      "Maharashtra",
      "Delhi",
      "São Paulo",
      "Rio de Janeiro",
      "Beijing",
      "Shanghai",
      "Tokyo",
      "Osaka",
      "Bavaria",
      "North Rhine-Westphalia",
    ];
    const stateCodes = [
      "CA",
      "NY",
      "TX",
      "FL",
      "ON",
      "BC",
      "NSW",
      "VIC",
      "ENG",
      "SCT",
      "MH",
      "DL",
      "SP",
      "RJ",
      "BJ",
      "SH",
      "TO",
      "OS",
      "BA",
      "NW",
    ];
    const countries = [
      "United States",
      "Canada",
      "Australia",
      "United Kingdom",
      "India",
      "Brazil",
      "China",
      "Japan",
      "Germany",
      "France",
      "Italy",
      "Spain",
    ];

    const newItems: StateItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const stateName =
          stateNames[Math.floor(Math.random() * stateNames.length)];
        const stateCode =
          stateCodes[Math.floor(Math.random() * stateCodes.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];

        return {
          id: `${Date.now()}-${index}`,
          state: stateName,
          code: stateCode,
          country: country,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (statesData.length >= 46) {
      setHasMore(false);
    } else {
      setStatesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [statesData.length, isLoading, hasMore]);

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

  // Filter states based on search query (search across multiple fields)
  const filteredStates = statesData.filter(
    (item) =>
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (stateId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/states/view/${stateId}?fromView=${viewMode}`);
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
            {filteredStates.map((item, index) => {
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
                  {/* State Header with Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.state}
                    </CardTitle>
                  </div>

                  {/* State Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate font-mono">{item.code}</span>
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
                <span className="text-sm">Loading more states...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredStates.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more states to load
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
                data={states}
                setFilteredData={setStatesData}
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
                data={states}
                setFilteredData={setStatesData}
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
