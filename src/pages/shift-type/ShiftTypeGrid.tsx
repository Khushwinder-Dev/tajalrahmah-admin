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

// Shift Type interface
interface ShiftTypeItem {
  id: string;
  name: string;
  color: string;
  startTime: string;
  endTime: string;
  lunchStart: string;
}

// Mock data - replace with real data from your API
const shiftTypeData: ShiftTypeItem[] = [
  {
    id: "1",
    name: "Morning Shift",
    color: "#3B82F6",
    startTime: "06:00",
    endTime: "14:00",
    lunchStart: "12:00",
  },
  {
    id: "2",
    name: "Afternoon Shift",
    color: "#10B981",
    startTime: "14:00",
    endTime: "22:00",
    lunchStart: "18:00",
  },
  {
    id: "3",
    name: "Night Shift",
    color: "#8B5CF6",
    startTime: "22:00",
    endTime: "06:00",
    lunchStart: "02:00",
  },
  {
    id: "4",
    name: "Day Shift",
    color: "#F59E0B",
    startTime: "08:00",
    endTime: "16:00",
    lunchStart: "13:00",
  },
  {
    id: "5",
    name: "Evening Shift",
    color: "#EF4444",
    startTime: "16:00",
    endTime: "00:00",
    lunchStart: "20:00",
  },
  {
    id: "6",
    name: "Part Time Morning",
    color: "#06B6D4",
    startTime: "09:00",
    endTime: "13:00",
    lunchStart: "11:30",
  },
  {
    id: "7",
    name: "Part Time Evening",
    color: "#84CC16",
    startTime: "17:00",
    endTime: "21:00",
    lunchStart: "19:00",
  },
  {
    id: "8",
    name: "Weekend Shift",
    color: "#F97316",
    startTime: "10:00",
    endTime: "18:00",
    lunchStart: "14:00",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ShiftTypeGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Shift Type grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [shiftTypeEntries, setShiftTypeEntries] =
    useState<ShiftTypeItem[]>(shiftTypeData);
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

    const names = [
      "Morning Shift",
      "Afternoon Shift",
      "Night Shift",
      "Day Shift",
      "Evening Shift",
      "Part Time Morning",
      "Part Time Evening",
      "Weekend Shift",
      "Holiday Shift",
      "Overtime Shift",
      "Split Shift",
      "Rotating Shift",
    ];
    const colors = [
      "#3B82F6",
      "#10B981",
      "#8B5CF6",
      "#F59E0B",
      "#EF4444",
      "#06B6D4",
      "#84CC16",
      "#F97316",
      "#EC4899",
      "#6366F1",
      "#14B8A6",
      "#F43F5E",
    ];
    const startTimes = [
      "06:00",
      "08:00",
      "09:00",
      "10:00",
      "14:00",
      "16:00",
      "17:00",
      "18:00",
      "20:00",
      "22:00",
      "00:00",
      "02:00",
    ];
    const endTimes = [
      "14:00",
      "16:00",
      "17:00",
      "18:00",
      "22:00",
      "00:00",
      "01:00",
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
    ];
    const lunchStarts = [
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "23:00",
      "01:00",
      "03:00",
      "05:00",
    ];

    const newItems: ShiftTypeItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const name = names[Math.floor(Math.random() * names.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startTime =
          startTimes[Math.floor(Math.random() * startTimes.length)];
        const endTime = endTimes[Math.floor(Math.random() * endTimes.length)];
        const lunchStart =
          lunchStarts[Math.floor(Math.random() * lunchStarts.length)];

        return {
          id: `${Date.now()}-${index}`,
          name: `${name} ${index + 1}`,
          color,
          startTime,
          endTime,
          lunchStart,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (shiftTypeEntries.length >= 46) {
      setHasMore(false);
    } else {
      setShiftTypeEntries((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [shiftTypeEntries.length, isLoading, hasMore]);

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

  // Filter shift types based on search query (search across multiple fields)
  const filteredShiftTypes = shiftTypeEntries.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.endTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lunchStart.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (shiftTypeId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/shift-type/view/${shiftTypeId}?fromView=${viewMode}`);
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
            {filteredShiftTypes.map((item, index) => {
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
                  {/* Shift Type Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.name}
                    </CardTitle>
                    {/* Color indicator */}
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  {/* Shift Type Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Start Time:</span>
                      <span className="truncate font-semibold text-blue-600">
                        {item.startTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">End Time:</span>
                      <span className="truncate font-semibold text-red-600">
                        {item.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Lunch Start:</span>
                      <span className="truncate font-semibold text-green-600">
                        {item.lunchStart}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Color:</span>
                      <span className="truncate font-mono text-xs">
                        {item.color}
                      </span>
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
                <span className="text-sm">Loading more shift types...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredShiftTypes.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more shift types to load
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
                data={shiftTypeData}
                setFilteredData={setShiftTypeEntries}
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
                data={shiftTypeData}
                setFilteredData={setShiftTypeEntries}
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
