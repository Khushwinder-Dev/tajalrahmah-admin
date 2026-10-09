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
import { Shield, User, Crown } from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Color interface
interface Color {
  id: string;
  name: string;
  code: string;
  description: string;
  hexCode: string;
  status: "active" | "inactive" | "draft";
}

// Mock data - replace with real data from your API
const colors: Color[] = [
  {
    id: "1",
    name: "Primary Blue",
    code: "BLU001",
    description: "Main brand color used for primary actions and highlights",
    hexCode: "#3B82F6",
    status: "active",
  },
  {
    id: "2",
    name: "Success Green",
    code: "GRN001",
    description: "Color for success states and positive feedback",
    hexCode: "#10B981",
    status: "active",
  },
  {
    id: "3",
    name: "Warning Orange",
    code: "ORG001",
    description: "Warning color for alerts and caution states",
    hexCode: "#F59E0B",
    status: "active",
  },
  {
    id: "4",
    name: "Error Red",
    code: "RED001",
    description: "Error color for validation and critical states",
    hexCode: "#EF4444",
    status: "active",
  },
  {
    id: "5",
    name: "Neutral Gray",
    code: "GRY001",
    description: "Neutral color for text and backgrounds",
    hexCode: "#6B7280",
    status: "active",
  },
  {
    id: "6",
    name: "Purple Accent",
    code: "PRP001",
    description: "Accent color for special features and highlights",
    hexCode: "#8B5CF6",
    status: "draft",
  },
  {
    id: "7",
    name: "Teal Secondary",
    code: "TEL001",
    description: "Secondary color for supporting elements",
    hexCode: "#14B8A6",
    status: "active",
  },
  {
    id: "8",
    name: "Pink Highlight",
    code: "PNK001",
    description: "Highlight color for special promotions",
    hexCode: "#EC4899",
    status: "inactive",
  },
  {
    id: "9",
    name: "Indigo Dark",
    code: "IND001",
    description: "Dark indigo for headers and navigation",
    hexCode: "#4F46E5",
    status: "active",
  },
  {
    id: "10",
    name: "Yellow Bright",
    code: "YLW001",
    description: "Bright yellow for attention-grabbing elements",
    hexCode: "#EAB308",
    status: "draft",
  },
  {
    id: "11",
    name: "Cyan Light",
    code: "CYN001",
    description: "Light cyan for subtle backgrounds",
    hexCode: "#06B6D4",
    status: "active",
  },
  {
    id: "12",
    name: "Rose Soft",
    code: "ROS001",
    description: "Soft rose for gentle highlights",
    hexCode: "#F43F5E",
    status: "inactive",
  },
  {
    id: "13",
    name: "Emerald Deep",
    code: "EMR001",
    description: "Deep emerald for nature-themed elements",
    hexCode: "#059669",
    status: "active",
  },
  {
    id: "14",
    name: "Violet Rich",
    code: "VIO001",
    description: "Rich violet for premium features",
    hexCode: "#7C3AED",
    status: "draft",
  },
  {
    id: "15",
    name: "Amber Warm",
    code: "AMB001",
    description: "Warm amber for cozy interfaces",
    hexCode: "#D97706",
    status: "active",
  },
  {
    id: "16",
    name: "Sky Blue",
    code: "SKY001",
    description: "Sky blue for open and airy designs",
    hexCode: "#0EA5E9",
    status: "active",
  },
  {
    id: "17",
    name: "Lime Fresh",
    code: "LIM001",
    description: "Fresh lime for energetic elements",
    hexCode: "#84CC16",
    status: "inactive",
  },
  {
    id: "18",
    name: "Fuchsia Bold",
    code: "FUC001",
    description: "Bold fuchsia for standout features",
    hexCode: "#D946EF",
    status: "draft",
  },
  {
    id: "19",
    name: "Slate Professional",
    code: "SLT001",
    description: "Professional slate for business elements",
    hexCode: "#475569",
    status: "active",
  },
  {
    id: "20",
    name: "Zinc Neutral",
    code: "ZNC001",
    description: "Neutral zinc for subtle backgrounds",
    hexCode: "#71717A",
    status: "active",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ColorsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Colors grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [colorsData, setColorsData] = useState(colors);
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

    const colorNames = [
      "Ocean Blue",
      "Forest Green",
      "Sunset Orange",
      "Royal Purple",
      "Crimson Red",
      "Golden Yellow",
      "Silver Gray",
      "Coral Pink",
      "Turquoise",
      "Lavender",
      "Emerald",
      "Sapphire",
      "Ruby",
      "Amber",
      "Jade",
      "Cobalt",
      "Magenta",
      "Teal",
    ];
    const colorCodes = [
      "BLU",
      "GRN",
      "ORG",
      "PRP",
      "RED",
      "YLW",
      "GRY",
      "PNK",
      "TEL",
      "LAV",
      "EMR",
      "SAP",
      "RUB",
      "AMB",
      "JAD",
      "COB",
      "MAG",
      "TEL",
    ];
    const descriptions = [
      "Primary brand color",
      "Secondary accent color",
      "Warning state color",
      "Success state color",
      "Error state color",
      "Neutral background color",
      "Highlight color",
      "Border color",
      "Text color",
      "Background color",
      "Accent color",
      "Call-to-action color",
    ];
    const hexCodes = [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#8B5CF6",
      "#EF4444",
      "#EAB308",
      "#6B7280",
      "#EC4899",
      "#14B8A6",
      "#A78BFA",
      "#059669",
      "#2563EB",
      "#DC2626",
      "#D97706",
      "#16A34A",
      "#7C3AED",
      "#DB2777",
      "#0D9488",
    ];

    const statuses: Color["status"][] = ["active", "inactive", "draft"];

    const newItems: Color[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const colorName =
          colorNames[Math.floor(Math.random() * colorNames.length)];
        const colorCode =
          colorCodes[Math.floor(Math.random() * colorCodes.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];
        const hexCode = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        return {
          id: `${Date.now()}-${index}`,
          name: colorName,
          code: `${colorCode}${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          description: description,
          hexCode: hexCode,
          status: status,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (colorsData.length >= 46) {
      setHasMore(false);
    } else {
      setColorsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [colorsData.length, isLoading, hasMore]);

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

  // Filter colors based on search query (search across multiple fields)
  const filteredColors = colorsData.filter(
    (color) =>
      color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.hexCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (colorId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/colors/view/${colorId}?fromView=${viewMode}`);
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
            {filteredColors.map((color, index) => {
              // Function to get status icon and color
              const getStatusInfo = (status: Color["status"]) => {
                switch (status) {
                  case "active":
                    return {
                      icon: Shield,
                      color: "text-green-600",
                      bgColor: "bg-green-100",
                    };
                  case "inactive":
                    return {
                      icon: User,
                      color: "text-gray-600",
                      bgColor: "bg-gray-100",
                    };
                  case "draft":
                    return {
                      icon: Crown,
                      color: "text-yellow-600",
                      bgColor: "bg-yellow-100",
                    };
                  default:
                    return {
                      icon: User,
                      color: "text-gray-600",
                      bgColor: "bg-gray-100",
                    };
                }
              };

              const statusInfo = getStatusInfo(color.status);
              const StatusIcon = statusInfo.icon;

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
                  onClick={() => handleViewClick(color.id)}
                >
                  {/* Color Header with Name and Status */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {color.name}
                    </CardTitle>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        statusInfo.bgColor,
                        statusInfo.color
                      )}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{color.status}</span>
                    </div>
                  </div>

                  {/* Color Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate font-mono">{color.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Hex:</span>
                      <span className="font-mono">{color.hexCode}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {color.description}
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Preview:
                    </span>
                    <div className="flex gap-2 items-center">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <div className="text-xs font-mono text-gray-600 dark:text-gray-300">
                        {color.hexCode}
                      </div>
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
                <span className="text-sm">Loading more colors...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredColors.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more colors to load
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
                data={colors}
                setFilteredData={setColorsData}
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
                data={colors}
                setFilteredData={setColorsData}
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
