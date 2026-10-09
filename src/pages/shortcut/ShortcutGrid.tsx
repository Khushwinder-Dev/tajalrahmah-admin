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

// Shortcut interface
interface ShortcutItem {
  id: string;
  indexName: string;
  title: string;
  titleValue: string;
  fontAwesomeIcon: string;
}

// Mock data - replace with real data from your API
const shortcuts: ShortcutItem[] = [
  {
    id: "1",
    indexName: "Dashboard",
    title: "Dashboard",
    titleValue: "Main Dashboard",
    fontAwesomeIcon: "fas fa-tachometer-alt",
  },
  {
    id: "2",
    indexName: "Users",
    title: "User Management",
    titleValue: "Manage Users",
    fontAwesomeIcon: "fas fa-users",
  },
  {
    id: "3",
    indexName: "Products",
    title: "Product Catalog",
    titleValue: "Manage Products",
    fontAwesomeIcon: "fas fa-box",
  },
  {
    id: "4",
    indexName: "Orders",
    title: "Order Management",
    titleValue: "Process Orders",
    fontAwesomeIcon: "fas fa-shopping-cart",
  },
  {
    id: "5",
    indexName: "Reports",
    title: "Analytics",
    titleValue: "View Reports",
    fontAwesomeIcon: "fas fa-chart-bar",
  },
  {
    id: "6",
    indexName: "Settings",
    title: "System Settings",
    titleValue: "Configure System",
    fontAwesomeIcon: "fas fa-cog",
  },
  {
    id: "7",
    indexName: "Notifications",
    title: "Notifications",
    titleValue: "Manage Alerts",
    fontAwesomeIcon: "fas fa-bell",
  },
  {
    id: "8",
    indexName: "Messages",
    title: "Messages",
    titleValue: "View Messages",
    fontAwesomeIcon: "fas fa-envelope",
  },
  {
    id: "9",
    indexName: "Calendar",
    title: "Calendar",
    titleValue: "Schedule Events",
    fontAwesomeIcon: "fas fa-calendar",
  },
  {
    id: "10",
    indexName: "Files",
    title: "File Manager",
    titleValue: "Manage Files",
    fontAwesomeIcon: "fas fa-folder",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ShortcutGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Shortcuts grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [shortcutsData, setShortcutsData] = useState<ShortcutItem[]>(shortcuts);
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

    const indexNameOptions = [
      "Dashboard",
      "Users",
      "Products",
      "Orders",
      "Reports",
      "Settings",
      "Notifications",
      "Messages",
      "Calendar",
      "Files",
      "Analytics",
      "Inventory",
      "Finance",
      "Marketing",
      "Support",
    ];
    const titleOptions = [
      "Dashboard",
      "User Management",
      "Product Catalog",
      "Order Management",
      "Analytics",
      "System Settings",
      "Notifications",
      "Messages",
      "Calendar",
      "File Manager",
      "Data Analytics",
      "Inventory Control",
      "Financial Reports",
      "Marketing Tools",
      "Customer Support",
    ];
    const titleValueOptions = [
      "Main Dashboard",
      "Manage Users",
      "Manage Products",
      "Process Orders",
      "View Reports",
      "Configure System",
      "Manage Alerts",
      "View Messages",
      "Schedule Events",
      "Manage Files",
      "Analyze Data",
      "Control Inventory",
      "Financial Overview",
      "Marketing Campaigns",
      "Support Tickets",
    ];
    const iconOptions = [
      "fas fa-tachometer-alt",
      "fas fa-users",
      "fas fa-box",
      "fas fa-shopping-cart",
      "fas fa-chart-bar",
      "fas fa-cog",
      "fas fa-bell",
      "fas fa-envelope",
      "fas fa-calendar",
      "fas fa-folder",
      "fas fa-chart-line",
      "fas fa-warehouse",
      "fas fa-dollar-sign",
      "fas fa-bullhorn",
      "fas fa-headset",
    ];

    const newItems: ShortcutItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const indexName =
          indexNameOptions[Math.floor(Math.random() * indexNameOptions.length)];
        const title =
          titleOptions[Math.floor(Math.random() * titleOptions.length)];
        const titleValue =
          titleValueOptions[
            Math.floor(Math.random() * titleValueOptions.length)
          ];
        const fontAwesomeIcon =
          iconOptions[Math.floor(Math.random() * iconOptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          indexName: indexName,
          title: title,
          titleValue: titleValue,
          fontAwesomeIcon: fontAwesomeIcon,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (shortcutsData.length >= 46) {
      setHasMore(false);
    } else {
      setShortcutsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [shortcutsData.length, isLoading, hasMore]);

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

  // Filter shortcuts based on search query (search across multiple fields)
  const filteredShortcuts = shortcutsData.filter(
    (item) =>
      item.indexName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fontAwesomeIcon.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (shortcutId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/shortcuts/view/${shortcutId}?fromView=${viewMode}`);
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
            {filteredShortcuts.map((item, index) => {
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
                  {/* Shortcut Header with Icon and Title */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <i
                        className={`${item.fontAwesomeIcon} text-2xl text-blue-600`}
                      ></i>
                      <CardTitle
                        className="text-lg font-semibold transition-colors flex-1"
                        style={{ fontSize: "18px" }}
                      >
                        {item.title}
                      </CardTitle>
                    </div>
                  </div>

                  {/* Shortcut Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Index:</span>
                      <span className="truncate font-mono text-xs bg-green-100 px-2 py-1 rounded">
                        {item.indexName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Value:</span>
                      <span className="truncate">{item.titleValue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Icon:</span>
                      <span className="truncate font-mono text-xs bg-purple-100 px-2 py-1 rounded">
                        {item.fontAwesomeIcon}
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
                <span className="text-sm">Loading more shortcuts...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredShortcuts.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more shortcuts to load
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
                data={shortcuts}
                setFilteredData={setShortcutsData}
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
                data={shortcuts}
                setFilteredData={setShortcutsData}
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
