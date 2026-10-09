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

// Supplier Items interface
interface SupplierItemReport {
  id: string;
  supplier: string;
  itemName: string;
  startDate: string;
  endDate: string;
}

// Mock data - replace with real data from your API
const supplierItems: SupplierItemReport[] = [
  {
    id: "1",
    supplier: "Acme Supplies",
    itemName: "Tomatoes",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: "2",
    supplier: "Global Foods",
    itemName: "Olive Oil",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
  },
  {
    id: "3",
    supplier: "Fresh Farms",
    itemName: "Lettuce",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
  },
  {
    id: "4",
    supplier: "Prime Meat Co",
    itemName: "Beef",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
  },
  {
    id: "5",
    supplier: "Dairy Best",
    itemName: "Cheese",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
  },
  {
    id: "6",
    supplier: "Acme Supplies",
    itemName: "Onions",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
  },
  {
    id: "7",
    supplier: "Global Foods",
    itemName: "Rice",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
  },
  {
    id: "8",
    supplier: "Fresh Farms",
    itemName: "Cucumbers",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
  },
  {
    id: "9",
    supplier: "Prime Meat Co",
    itemName: "Chicken",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
  },
  {
    id: "10",
    supplier: "Dairy Best",
    itemName: "Butter",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function SupplierItemsReportGrid({
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

  const [data, setData] = useState<SupplierItemReport[]>(supplierItems);
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

    const suppliers = [
      "Acme Supplies",
      "Global Foods",
      "Fresh Farms",
      "Prime Meat Co",
      "Dairy Best",
      "Ocean Catch",
      "Spice World",
      "Herbal House",
    ];
    const items = [
      "Tomatoes",
      "Olive Oil",
      "Lettuce",
      "Beef",
      "Cheese",
      "Onions",
      "Rice",
      "Cucumbers",
      "Chicken",
      "Butter",
    ];
    const startDates = [
      "2024-01-01",
      "2024-02-01",
      "2024-03-01",
      "2024-04-01",
      "2024-05-01",
      "2024-06-01",
      "2024-07-01",
      "2024-08-01",
      "2024-09-01",
      "2024-10-01",
      "2024-11-01",
      "2024-12-01",
      "2025-01-01",
      "2025-02-01",
    ];
    const endDates = [
      "2024-01-31",
      "2024-02-29",
      "2024-03-31",
      "2024-04-30",
      "2024-05-31",
      "2024-06-30",
      "2024-07-31",
      "2024-08-31",
      "2024-09-30",
      "2024-10-31",
      "2024-11-30",
      "2024-12-31",
      "2025-01-31",
      "2025-02-28",
    ];

    const newItems: SupplierItemReport[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const supplier =
          suppliers[Math.floor(Math.random() * suppliers.length)];
        const itemName = items[Math.floor(Math.random() * items.length)];
        const startDate =
          startDates[Math.floor(Math.random() * startDates.length)];
        const endDate = endDates[Math.floor(Math.random() * endDates.length)];
        return {
          id: `${Date.now()}-${index}`,
          supplier,
          itemName,
          startDate,
          endDate,
        };
      }
    );

    if (data.length >= 46) {
      setHasMore(false);
    } else {
      setData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [data.length, isLoading, hasMore]);

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

  // Filter supplier items based on search query
  const filteredItems = data.filter(
    (item) =>
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.endDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (id: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/supplier-items-report/view/${id}?fromView=${viewMode}`);
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
            {filteredItems.map((item, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    "transition-all relative group dark:bg-gray-800 duration-200 w/full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(item.id)}
                >
                  {/* Supplier Item Header with Supplier */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.supplier}
                    </CardTitle>
                  </div>

                  {/* Supplier Item Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Item Name:</span>
                      <span className="truncate">{item.itemName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Start Date:</span>
                      <span className="truncate">{item.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">End Date:</span>
                      <span className="truncate">{item.endDate}</span>
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
                <span className="text-sm">Loading more supplier items...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredItems.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more supplier items to load
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
                data={supplierItems}
                setFilteredData={setData}
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
                data={supplierItems}
                setFilteredData={setData}
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
              isMobile ? "" : "md:hidden",
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
