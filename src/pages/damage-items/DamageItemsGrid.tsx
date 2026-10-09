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

// Damage Item interface
interface DamageItem {
  id: string;
  itemId: string;
  quantityDamaged: number;
  documentDate: string; // ISO date string
  reportedBy: string;
  location: string;
  damageType: string;
}

// Mock data - replace with real data from your API
const damageItems: DamageItem[] = [
  {
    id: "1",
    itemId: "ITM-0001",
    quantityDamaged: 3,
    documentDate: "2025-09-10T10:00:00Z",
    reportedBy: "John Doe",
    location: "Warehouse A",
    damageType: "Broken",
  },
  {
    id: "2",
    itemId: "ITM-0002",
    quantityDamaged: 1,
    documentDate: "2025-09-11T12:30:00Z",
    reportedBy: "Jane Smith",
    location: "Warehouse B",
    damageType: "Water Damage",
  },
  {
    id: "3",
    itemId: "ITM-0003",
    quantityDamaged: 6,
    documentDate: "2025-09-08T08:20:00Z",
    reportedBy: "Ahmed Ali",
    location: "Store 1",
    damageType: "Cracked",
  },
  {
    id: "4",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "5",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "6",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "7",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "8",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "9",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "10",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "11",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
  {
    id: "12",
    itemId: "ITM-0004",
    quantityDamaged: 2,
    documentDate: "2025-09-09T09:45:00Z",
    reportedBy: "Maria Garcia",
    location: "Warehouse A",
    damageType: "Expired",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function DamageItemsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Damage Items grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [damageItemsData, setDamageItemsData] =
    useState<DamageItem[]>(damageItems);
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

    const reporters = [
      "John Doe",
      "Jane Smith",
      "Ahmed Ali",
      "Maria Garcia",
      "Sara Khan",
    ];
    const locations = ["Warehouse A", "Warehouse B", "Store 1", "Store 2"];
    const damageTypes = [
      "Broken",
      "Water Damage",
      "Cracked",
      "Expired",
      "Missing Parts",
    ];

    const newItems: DamageItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const itemNumber = Math.floor(Math.random() * 9999)
          .toString()
          .padStart(4, "0");
        const quantity = Math.floor(Math.random() * 10) + 1;
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        return {
          id: `${Date.now()}-${index}`,
          itemId: `ITM-${itemNumber}`,
          quantityDamaged: quantity,
          documentDate: date.toISOString(),
          reportedBy: reporters[Math.floor(Math.random() * reporters.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          damageType:
            damageTypes[Math.floor(Math.random() * damageTypes.length)],
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (damageItemsData.length >= 46) {
      setHasMore(false);
    } else {
      setDamageItemsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [damageItemsData.length, isLoading, hasMore]);

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

  // Filter damage items based on search query (search across multiple fields)
  const filteredDamageItems = damageItemsData.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.itemId.toLowerCase().includes(q) ||
      item.reportedBy.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.damageType.toLowerCase().includes(q) ||
      item.quantityDamaged.toString().includes(q) ||
      new Date(item.documentDate).toLocaleDateString().toLowerCase().includes(q)
    );
  });

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (damageItemId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/damage-items/view/${damageItemId}?fromView=${viewMode}`);
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
            {filteredDamageItems.map((item, index) => {
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
                  {/* Damage Item Header with Item ID */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.itemId}
                    </CardTitle>
                  </div>

                  {/* Damage Item Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Quantity Damaged:</span>
                      <span className="truncate">{item.quantityDamaged}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Document Date:</span>
                      <span className="truncate">
                        {new Date(item.documentDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Reported By:</span>
                      <span className="truncate">{item.reportedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Damage Type:</span>
                      <span className="truncate">{item.damageType}</span>
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
                <span className="text-sm">Loading more damage items...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDamageItems.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more damage items to load
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
                data={damageItems}
                setFilteredData={setDamageItemsData}
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
                data={damageItems}
                setFilteredData={setDamageItemsData}
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
