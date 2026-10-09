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

// Area interface
interface AreaItem {
  id: string;
  code: string;
  area: string;
  country: string;
  state: string;
  city: string;
}

// Mock data - replace with real data from your API
const areas: AreaItem[] = [
  {
    id: "1",
    code: "DTLA",
    area: "Downtown LA",
    country: "United States",
    state: "California",
    city: "Los Angeles",
  },
  {
    id: "2",
    code: "MAN",
    area: "Manhattan",
    country: "United States",
    state: "New York",
    city: "New York City",
  },
  {
    id: "3",
    code: "HOU",
    area: "Houston Downtown",
    country: "United States",
    state: "Texas",
    city: "Houston",
  },
  {
    id: "4",
    code: "MIA",
    area: "South Beach",
    country: "United States",
    state: "Florida",
    city: "Miami",
  },
  {
    id: "5",
    code: "TOR",
    area: "Financial District",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
  },
  {
    id: "6",
    code: "VAN",
    area: "Gastown",
    country: "Canada",
    state: "British Columbia",
    city: "Vancouver",
  },
  {
    id: "7",
    code: "SYD",
    area: "CBD",
    country: "Australia",
    state: "New South Wales",
    city: "Sydney",
  },
  {
    id: "8",
    code: "MEL",
    area: "Federation Square",
    country: "Australia",
    state: "Victoria",
    city: "Melbourne",
  },
  {
    id: "9",
    code: "LON",
    area: "City of London",
    country: "United Kingdom",
    state: "England",
    city: "London",
  },
  {
    id: "10",
    code: "EDI",
    area: "Old Town",
    country: "United Kingdom",
    state: "Scotland",
    city: "Edinburgh",
  },
  {
    id: "11",
    code: "MUM",
    area: "Bandra",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
  },
  {
    id: "12",
    code: "DEL",
    area: "Connaught Place",
    country: "India",
    state: "Delhi",
    city: "Delhi",
  },
  {
    id: "13",
    code: "SPO",
    area: "Paulista Avenue",
    country: "Brazil",
    state: "São Paulo",
    city: "São Paulo",
  },
  {
    id: "14",
    code: "RIO",
    area: "Copacabana",
    country: "Brazil",
    state: "Rio de Janeiro",
    city: "Rio de Janeiro",
  },
  {
    id: "15",
    code: "BEI",
    area: "Wangfujing",
    country: "China",
    state: "Beijing",
    city: "Beijing",
  },
  {
    id: "16",
    code: "SHA",
    area: "The Bund",
    country: "China",
    state: "Shanghai",
    city: "Shanghai",
  },
  {
    id: "17",
    code: "TOK",
    area: "Shibuya",
    country: "Japan",
    state: "Tokyo",
    city: "Tokyo",
  },
  {
    id: "18",
    code: "OSA",
    area: "Dotonbori",
    country: "Japan",
    state: "Osaka",
    city: "Osaka",
  },
  {
    id: "19",
    code: "MUN",
    area: "Marienplatz",
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
  },
  {
    id: "20",
    code: "DUS",
    area: "Altstadt",
    country: "Germany",
    state: "North Rhine-Westphalia",
    city: "Düsseldorf",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function AreasGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Areas grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [areasData, setAreasData] = useState<AreaItem[]>(areas);
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

    const areaNames = [
      "Downtown LA",
      "Manhattan",
      "Houston Downtown",
      "South Beach",
      "Financial District",
      "Gastown",
      "CBD",
      "Federation Square",
      "City of London",
      "Old Town",
      "Bandra",
      "Connaught Place",
      "Paulista Avenue",
      "Copacabana",
      "Wangfujing",
      "The Bund",
      "Shibuya",
      "Dotonbori",
      "Marienplatz",
      "Altstadt",
    ];
    const areaCodes = [
      "DTLA",
      "MAN",
      "HOU",
      "MIA",
      "TOR",
      "VAN",
      "SYD",
      "MEL",
      "LON",
      "EDI",
      "MUM",
      "DEL",
      "SPO",
      "RIO",
      "BEI",
      "SHA",
      "TOK",
      "OSA",
      "MUN",
      "DUS",
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
    const cities = [
      "Los Angeles",
      "New York City",
      "Houston",
      "Miami",
      "Toronto",
      "Vancouver",
      "Sydney",
      "Melbourne",
      "London",
      "Edinburgh",
      "Mumbai",
      "Delhi",
      "São Paulo",
      "Rio de Janeiro",
      "Beijing",
      "Shanghai",
      "Tokyo",
      "Osaka",
      "Munich",
      "Düsseldorf",
    ];
    const states = [
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

    const newItems: AreaItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const areaName =
          areaNames[Math.floor(Math.random() * areaNames.length)];
        const areaCode =
          areaCodes[Math.floor(Math.random() * areaCodes.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const state = states[Math.floor(Math.random() * states.length)];

        return {
          id: `${Date.now()}-${index}`,
          area: areaName,
          code: areaCode,
          country: country,
          city: city,
          state: state,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (areasData.length >= 46) {
      setHasMore(false);
    } else {
      setAreasData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [areasData.length, isLoading, hasMore]);

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

  // Filter areas based on search query (search across multiple fields)
  const filteredAreas = areasData.filter(
    (item) =>
      item.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (areaId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/areas/view/${areaId}?fromView=${viewMode}`);
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
            {filteredAreas.map((item, index) => {
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
                  {/* Area Header with Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.area}
                    </CardTitle>
                  </div>

                  {/* Area Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate font-mono">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Country:</span>
                      <span className="truncate">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">State:</span>
                      <span className="truncate">{item.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">City:</span>
                      <span className="truncate">{item.city}</span>
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
                <span className="text-sm">Loading more areas...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredAreas.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more areas to load
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
                data={areas}
                setFilteredData={setAreasData}
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
                data={areas}
                setFilteredData={setAreasData}
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
