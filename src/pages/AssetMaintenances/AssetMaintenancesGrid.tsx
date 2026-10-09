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

// Asset Maintenance interface
interface AssetMaintenanceItem {
  id: string;
  asset: string;
  maintenanceType: string;
  title: string;
  startDate: string;
  completionDate: string;
  warrantyImprovement: string;
  cost: number;
  notes: string;
}

// Mock data - replace with real data from your API
const assetMaintenances: AssetMaintenanceItem[] = [
  {
    id: "1",
    asset: "Server Room AC Unit",
    maintenanceType: "Preventive",
    title: "Quarterly AC Maintenance",
    startDate: "2024-01-15",
    completionDate: "2024-01-16",
    warrantyImprovement: "Extended warranty by 6 months",
    cost: 1500,
    notes:
      "Cleaned filters, checked refrigerant levels, tested cooling efficiency.",
  },
  {
    id: "2",
    asset: "Production Line Conveyor",
    maintenanceType: "Corrective",
    title: "Belt Replacement",
    startDate: "2024-01-16",
    completionDate: "2024-01-17",
    warrantyImprovement: "None",
    cost: 3200,
    notes:
      "Replaced worn conveyor belt and adjusted tension. System running smoothly.",
  },
  {
    id: "3",
    asset: "Backup Generator",
    maintenanceType: "Preventive",
    title: "Annual Generator Service",
    startDate: "2024-01-17",
    completionDate: "2024-01-18",
    warrantyImprovement: "Warranty extended to 2026",
    cost: 2800,
    notes:
      "Oil change, filter replacement, battery check, load testing completed.",
  },
  {
    id: "4",
    asset: "Office Elevator",
    maintenanceType: "Inspection",
    title: "Safety Inspection",
    startDate: "2024-01-18",
    completionDate: "2024-01-18",
    warrantyImprovement: "None",
    cost: 500,
    notes: "Annual safety inspection passed. All systems operational.",
  },
  {
    id: "5",
    asset: "Warehouse Forklift #3",
    maintenanceType: "Corrective",
    title: "Hydraulic System Repair",
    startDate: "2024-01-19",
    completionDate: "2024-01-21",
    warrantyImprovement: "Parts warranty 12 months",
    cost: 4500,
    notes: "Replaced hydraulic pump and hoses. Pressure tested and certified.",
  },
  {
    id: "6",
    asset: "Fire Suppression System",
    maintenanceType: "Preventive",
    title: "Quarterly System Check",
    startDate: "2024-01-20",
    completionDate: "2024-01-20",
    warrantyImprovement: "None",
    cost: 800,
    notes: "Tested all sprinklers, checked pressure, inspected control panel.",
  },
  {
    id: "7",
    asset: "HVAC System - Building A",
    maintenanceType: "Preventive",
    title: "Filter and Coil Cleaning",
    startDate: "2024-01-21",
    completionDate: "2024-01-22",
    warrantyImprovement: "Service contract renewed",
    cost: 2200,
    notes:
      "Cleaned all filters and coils, checked thermostats, optimized settings.",
  },
  {
    id: "8",
    asset: "Security Camera System",
    maintenanceType: "Upgrade",
    title: "Firmware Update",
    startDate: "2024-01-22",
    completionDate: "2024-01-22",
    warrantyImprovement: "Extended support to 2027",
    cost: 1200,
    notes:
      "Updated all camera firmware, tested recording and playback functionality.",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function AssetMaintenancesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Asset Maintenances grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [assetMaintenancesData, setAssetMaintenancesData] =
    useState<AssetMaintenanceItem[]>(assetMaintenances);
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

    const assets = [
      "Server Room AC Unit",
      "Production Line Conveyor",
      "Backup Generator",
      "Office Elevator",
      "Warehouse Forklift",
      "Fire Suppression System",
      "HVAC System",
      "Security Camera System",
      "Network Router",
      "Industrial Printer",
      "Boiler System",
      "Water Pump",
    ];
    const maintenanceTypes = [
      "Preventive",
      "Corrective",
      "Inspection",
      "Upgrade",
      "Emergency",
    ];
    const titles = [
      "Quarterly Maintenance",
      "Annual Service",
      "Safety Inspection",
      "System Repair",
      "Equipment Upgrade",
      "Emergency Fix",
      "Routine Check",
      "Performance Tuning",
    ];
    const warrantyImprovements = [
      "None",
      "Extended warranty by 6 months",
      "Extended warranty by 12 months",
      "Warranty extended to 2026",
      "Parts warranty 12 months",
      "Service contract renewed",
      "Extended support to 2027",
    ];

    const newItems: AssetMaintenanceItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const asset = assets[Math.floor(Math.random() * assets.length)];
        const maintenanceType =
          maintenanceTypes[Math.floor(Math.random() * maintenanceTypes.length)];
        const title = titles[Math.floor(Math.random() * titles.length)];
        const warrantyImprovement =
          warrantyImprovements[
            Math.floor(Math.random() * warrantyImprovements.length)
          ];
        const cost = Math.floor(Math.random() * 5000) + 500; // 500-5500
        const startDate = new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];
        const completionDate = new Date(
          Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];

        return {
          id: `${Date.now()}-${index}`,
          asset: `${asset} #${index + 1}`,
          maintenanceType,
          title,
          startDate,
          completionDate,
          warrantyImprovement,
          cost,
          notes: `${maintenanceType} maintenance performed on ${asset}.`,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (assetMaintenancesData.length >= 46) {
      setHasMore(false);
    } else {
      setAssetMaintenancesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [assetMaintenancesData.length, isLoading, hasMore]);

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

  // Filter asset maintenances based on search query (search across multiple fields)
  const filteredAssetMaintenances = assetMaintenancesData.filter(
    (item) =>
      item.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.maintenanceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.warrantyImprovement
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (assetMaintenanceId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(
      `/asset-maintenances/view/${assetMaintenanceId}?fromView=${viewMode}`
    );
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
            {filteredAssetMaintenances.map((item, index) => {
              const typeColors = {
                Preventive:
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                Corrective:
                  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                Inspection:
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                Upgrade:
                  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                Emergency:
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
              };

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
                  {/* Asset Maintenance Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.title}
                    </CardTitle>
                  </div>

                  {/* Maintenance Type Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        typeColors[
                          item.maintenanceType as keyof typeof typeColors
                        ]
                      )}
                    >
                      {item.maintenanceType}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ${item.cost}
                    </span>
                  </div>

                  {/* Asset Maintenance Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Asset:</span>
                      <span className="truncate">{item.asset}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Start:</span>
                      <span className="truncate">{item.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Completion:</span>
                      <span className="truncate">{item.completionDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Warranty:</span>
                      <span className="truncate">
                        {item.warrantyImprovement}
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
                <span className="text-sm">
                  Loading more asset maintenances...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredAssetMaintenances.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more asset maintenances to load
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
                data={assetMaintenances}
                setFilteredData={setAssetMaintenancesData}
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
                data={assetMaintenances}
                setFilteredData={setAssetMaintenancesData}
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
