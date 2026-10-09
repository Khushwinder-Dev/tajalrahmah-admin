import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Lead Status interface (Name, Order, Color)
interface LeadStatus {
  id: string;
  name: string;
  order: number;
  color: string; // hex or tailwind-compatible color string
}

// Mock data - lead statuses
const leadStatuses: LeadStatus[] = [
  { id: "1", name: "New", order: 1, color: "#3B82F6" },
  { id: "2", name: "Contacted", order: 2, color: "#06B6D4" },
  { id: "3", name: "Qualified", order: 3, color: "#10B981" },
  { id: "4", name: "Proposal Sent", order: 4, color: "#8B5CF6" },
  { id: "5", name: "Negotiation", order: 5, color: "#F59E0B" },
  { id: "6", name: "Won", order: 6, color: "#22C55E" },
  { id: "7", name: "Lost", order: 7, color: "#EF4444" },
  { id: "8", name: "On Hold", order: 8, color: "#64748B" },
  { id: "9", name: "Re-engage", order: 9, color: "#A78BFA" },
  { id: "10", name: "No Response", order: 10, color: "#94A3B8" },
  { id: "11", name: "In-progress", order: 11, color: "#10B981" },
  { id: "12", name: "Completed", order: 12, color: "#94A3B8" },
  { id: "13", name: "Cancelled", order: 13, color: "#EF4444" },
  { id: "14", name: "On Hold", order: 14, color: "#94A3B8" },
  { id: "15", name: "Re-engage", order: 15, color: "#F59E0B" },
  { id: "16", name: "No Response", order: 16, color: "#EF4444" },
  { id: "17", name: "In-progress", order: 17, color: "#94A3B8" },
  { id: "18", name: "Completed", order: 18, color: "#F59E0B" },
  { id: "19", name: "Cancelled", order: 19, color: "#10B981" },
  { id: "20", name: "On Hold", order: 20, color: "#94A3B8" },
  { id: "21", name: "Re-engage", order: 21, color: "#F59E0B" },
  { id: "22", name: "No Response", order: 22, color: "#94A3B8" },
  { id: "23", name: "In-progress", order: 23, color: "#F59E0B" },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function LeadSourcesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("LeadStatus grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [leadStatusData, setLeadStatusData] = useState(leadStatuses);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 8;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));
    const statusNames = [
      "New",
      "Contacted",
      "Qualified",
      "Proposal Sent",
      "Negotiation",
      "Won",
      "Lost",
      "On Hold",
      "Re-engage",
      "No Response",
    ];
    const colors = [
      "#3B82F6",
      "#06B6D4",
      "#10B981",
      "#8B5CF6",
      "#F59E0B",
      "#22C55E",
      "#EF4444",
      "#64748B",
      "#A78BFA",
      "#94A3B8",
    ];

    const newItems: LeadStatus[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        return {
          id: `${Date.now()}-${index}`,
          name: statusNames[Math.floor(Math.random() * statusNames.length)],
          order: Math.floor(Math.random() * 100) + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      }
    );

    // Stop loading more after reaching 100 items for demo
    if (leadStatusData.length >= 100) {
      setHasMore(false);
    } else {
      setLeadStatusData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [leadStatusData.length, isLoading, hasMore]);

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

  // Filter lead statuses based on search query (by name, order, or color)
  const filteredLeadStatuses = leadStatusData.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      String(item.order).includes(q) ||
      item.color.toLowerCase().includes(q)
    );
  });

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (leadStatusId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/lead-status/view/${leadStatusId}?fromView=${viewMode}`);
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
            {filteredLeadStatuses.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                )}
                onClick={() => handleViewClick(item.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className="inline-block h-6 w-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: item.color }}
                    />
                    <CardTitle
                      className="text-lg font-semibold transition-colors truncate"
                      style={{ fontSize: "18px" }}
                      title={item.name}
                    >
                      {item.name}
                    </CardTitle>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    Order: <span className="font-medium">{item.order}</span>
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
                <span className="text-sm">Loading more lead sources...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLeadStatuses.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more lead statuses to load
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
                data={leadStatuses}
                setFilteredData={setLeadStatusData}
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
                data={leadStatuses}
                setFilteredData={setLeadStatusData}
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
