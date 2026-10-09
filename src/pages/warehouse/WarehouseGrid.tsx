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

// Warehouse interface
interface WarehouseItem {
  id: string;
  code: string;
  warehouseName: string;
  managerName: string;
  location: string;
  description: string;
}

// Mock data - replace with real data from your API
const warehouses: WarehouseItem[] = [
  {
    id: "1",
    code: "WH-001",
    warehouseName: "Main Warehouse",
    managerName: "John Smith",
    location: "New York, NY",
    description: "Primary storage facility for all products",
  },
  {
    id: "2",
    code: "WH-002",
    warehouseName: "Distribution Center",
    managerName: "Sarah Johnson",
    location: "Los Angeles, CA",
    description: "Regional distribution hub for West Coast",
  },
  {
    id: "3",
    code: "WH-003",
    warehouseName: "Cold Storage",
    managerName: "Mike Davis",
    location: "Chicago, IL",
    description: "Temperature-controlled storage facility",
  },
  {
    id: "4",
    code: "WH-004",
    warehouseName: "Retail Warehouse",
    managerName: "Emily Brown",
    location: "Miami, FL",
    description: "Storage for retail chain operations",
  },
  {
    id: "5",
    code: "WH-005",
    warehouseName: "Industrial Warehouse",
    managerName: "David Wilson",
    location: "Houston, TX",
    description: "Heavy machinery and equipment storage",
  },
  {
    id: "6",
    code: "WH-006",
    warehouseName: "E-commerce Fulfillment",
    managerName: "Lisa Anderson",
    location: "Phoenix, AZ",
    description: "Online order processing and shipping",
  },
  {
    id: "7",
    code: "WH-007",
    warehouseName: "Raw Materials Storage",
    managerName: "Robert Taylor",
    location: "Detroit, MI",
    description: "Manufacturing materials and components",
  },
  {
    id: "8",
    code: "WH-008",
    warehouseName: "Finished Goods",
    managerName: "Jennifer Martinez",
    location: "Seattle, WA",
    description: "Completed products ready for shipment",
  },
  {
    id: "9",
    code: "WH-009",
    warehouseName: "Cross-Dock Facility",
    managerName: "Michael Garcia",
    location: "Atlanta, GA",
    description: "Fast transfer and sorting operations",
  },
  {
    id: "10",
    code: "WH-010",
    warehouseName: "Bonded Warehouse",
    managerName: "Amanda Rodriguez",
    location: "San Diego, CA",
    description: "Customs-controlled storage facility",
  },
  {
    id: "11",
    code: "WH-011",
    warehouseName: "Hazardous Materials",
    managerName: "Christopher Lee",
    location: "Denver, CO",
    description: "Specialized storage for dangerous goods",
  },
  {
    id: "12",
    code: "WH-012",
    warehouseName: "Returns Processing",
    managerName: "Michelle White",
    location: "Orlando, FL",
    description: "Handling returned and damaged goods",
  },
  {
    id: "13",
    code: "WH-013",
    warehouseName: "Seasonal Storage",
    managerName: "Daniel Thompson",
    location: "Minneapolis, MN",
    description: "Temporary storage for seasonal items",
  },
  {
    id: "14",
    code: "WH-014",
    warehouseName: "Express Logistics",
    managerName: "Rachel Green",
    location: "Las Vegas, NV",
    description: "Fast delivery and express shipping hub",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function WarehouseGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Warehouse grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [warehousesData, setWarehousesData] =
    useState<WarehouseItem[]>(warehouses);
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
      "WH-015",
      "WH-016",
      "WH-017",
      "WH-018",
      "WH-019",
      "WH-020",
      "WH-021",
      "WH-022",
      "WH-023",
      "WH-024",
    ];
    const warehouseNames = [
      "Main Warehouse",
      "Distribution Center",
      "Cold Storage",
      "Retail Warehouse",
      "Industrial Warehouse",
      "E-commerce Fulfillment",
      "Raw Materials Storage",
      "Finished Goods",
      "Cross-Dock Facility",
      "Bonded Warehouse",
    ];
    const managerNames = [
      "John Smith",
      "Sarah Johnson",
      "Mike Davis",
      "Emily Brown",
      "David Wilson",
      "Lisa Anderson",
      "Robert Taylor",
      "Jennifer Martinez",
      "Michael Garcia",
      "Amanda Rodriguez",
    ];
    const locations = [
      "New York, NY",
      "Los Angeles, CA",
      "Chicago, IL",
      "Miami, FL",
      "Houston, TX",
      "Phoenix, AZ",
      "Detroit, MI",
      "Seattle, WA",
      "Atlanta, GA",
      "San Diego, CA",
    ];
    const descriptions = [
      "Primary storage facility for all products",
      "Regional distribution hub for West Coast",
      "Temperature-controlled storage facility",
      "Storage for retail chain operations",
      "Heavy machinery and equipment storage",
      "Online order processing and shipping",
      "Manufacturing materials and components",
      "Completed products ready for shipment",
      "Fast transfer and sorting operations",
      "Customs-controlled storage facility",
    ];

    const newItems: WarehouseItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const warehouseName =
          warehouseNames[Math.floor(Math.random() * warehouseNames.length)];
        const managerName =
          managerNames[Math.floor(Math.random() * managerNames.length)];
        const location =
          locations[Math.floor(Math.random() * locations.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          warehouseName,
          managerName,
          location,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (warehousesData.length >= 46) {
      setHasMore(false);
    } else {
      setWarehousesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [warehousesData.length, isLoading, hasMore]);

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

  // Filter warehouses based on search query (search across multiple fields)
  const filteredWarehouses = warehousesData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.warehouseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.managerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (warehouseId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/warehouse/view/${warehouseId}?fromView=${viewMode}`);
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
            {filteredWarehouses.map((item, index) => {
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
                  {/* Warehouse Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.warehouseName}
                    </CardTitle>
                  </div>

                  {/* Warehouse Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Manager:</span>
                      <span className="truncate">{item.managerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="truncate">{item.location}</span>
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
                <span className="text-sm">Loading more warehouses...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredWarehouses.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more warehouses to load
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
                data={warehouses}
                setFilteredData={setWarehousesData}
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
                data={warehouses}
                setFilteredData={setWarehousesData}
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
