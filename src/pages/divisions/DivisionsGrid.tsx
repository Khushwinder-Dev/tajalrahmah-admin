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

// Division interface
interface DivisionItem {
  id: string;
  code: string;
  divisionName: string;
  region: string;
  description: string;
}

// Mock data - replace with real data from your API
const divisions: DivisionItem[] = [
  {
    id: "1",
    code: "DIV-001",
    divisionName: "North Division",
    region: "North America",
    description: "Northern region operations",
  },
  {
    id: "2",
    code: "DIV-002",
    divisionName: "South Division",
    region: "South America",
    description: "Southern region operations",
  },
  {
    id: "3",
    code: "DIV-003",
    divisionName: "East Division",
    region: "Asia Pacific",
    description: "Eastern region operations",
  },
  {
    id: "4",
    code: "DIV-004",
    divisionName: "West Division",
    region: "Europe",
    description: "Western region operations",
  },
  {
    id: "5",
    code: "DIV-005",
    divisionName: "Central Division",
    region: "Middle East",
    description: "Central region operations",
  },
  {
    id: "6",
    code: "DIV-006",
    divisionName: "Coastal Division",
    region: "Coastal Areas",
    description: "Coastal region operations",
  },
  {
    id: "7",
    code: "DIV-007",
    divisionName: "Mountain Division",
    region: "Mountain Regions",
    description: "Mountain region operations",
  },
  {
    id: "8",
    code: "DIV-008",
    divisionName: "Urban Division",
    region: "Urban Centers",
    description: "Urban operations",
  },
  {
    id: "9",
    code: "DIV-009",
    divisionName: "Rural Division",
    region: "Rural Areas",
    description: "Rural region operations",
  },
  {
    id: "10",
    code: "DIV-010",
    divisionName: "Metro Division",
    region: "Metropolitan",
    description: "Metropolitan operations",
  },
  {
    id: "11",
    code: "DIV-011",
    divisionName: "Suburban Division",
    region: "Suburban Areas",
    description: "Suburban operations",
  },
  {
    id: "12",
    code: "DIV-012",
    divisionName: "Industrial Division",
    region: "Industrial Zones",
    description: "Industrial operations",
  },
  {
    id: "13",
    code: "DIV-013",
    divisionName: "Commercial Division",
    region: "Commercial Districts",
    description: "Commercial operations",
  },
  {
    id: "14",
    code: "DIV-014",
    divisionName: "Residential Division",
    region: "Residential Areas",
    description: "Residential operations",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function DivisionsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Divisions grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [divisionsData, setDivisionsData] = useState<DivisionItem[]>(divisions);
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

    const codes = [
      "DIV-015",
      "DIV-016",
      "DIV-017",
      "DIV-018",
      "DIV-019",
      "DIV-020",
      "DIV-021",
      "DIV-022",
      "DIV-023",
      "DIV-024",
    ];
    const divisionNames = [
      "North Division",
      "South Division",
      "East Division",
      "West Division",
      "Central Division",
      "Coastal Division",
      "Mountain Division",
      "Urban Division",
      "Rural Division",
      "Metro Division",
    ];
    const regions = [
      "North America",
      "South America",
      "Asia Pacific",
      "Europe",
      "Middle East",
      "Coastal Areas",
      "Mountain Regions",
      "Urban Centers",
      "Rural Areas",
      "Metropolitan",
    ];
    const descriptions = [
      "Northern region operations",
      "Southern region operations",
      "Eastern region operations",
      "Western region operations",
      "Central region operations",
      "Coastal region operations",
      "Mountain region operations",
      "Urban operations",
      "Rural region operations",
      "Metropolitan operations",
    ];

    const newItems: DivisionItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const divisionName =
          divisionNames[Math.floor(Math.random() * divisionNames.length)];
        const region = regions[Math.floor(Math.random() * regions.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          divisionName,
          region,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (divisionsData.length >= 46) {
      setHasMore(false);
    } else {
      setDivisionsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [divisionsData.length, isLoading, hasMore]);

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

  // Filter divisions based on search query (search across multiple fields)
  const filteredDivisions = divisionsData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.divisionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (divisionId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/divisions/view/${divisionId}?fromView=${viewMode}`);
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
            {filteredDivisions.map((item, index) => {
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
                  {/* Division Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.divisionName}
                    </CardTitle>
                  </div>

                  {/* Division Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Region:</span>
                      <span className="truncate">{item.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Description:</span>
                      <span className="truncate">{item.description}</span>
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
                <span className="text-sm">Loading more divisions...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDivisions.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more divisions to load
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
                data={divisions}
                setFilteredData={setDivisionsData}
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
                data={divisions}
                setFilteredData={setDivisionsData}
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
