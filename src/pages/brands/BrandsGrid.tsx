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

// Brand interface
interface BrandItem {
  id: string;
  code: string;
  name: string;
  description: string;
}

// Mock data - replace with real data from your API
const brands: BrandItem[] = [
  {
    id: "1",
    code: "BRD001",
    name: "Apex",
    description: "Premium performance brand",
  },
  {
    id: "2",
    code: "BRD002",
    name: "Velocity",
    description: "High-speed and sports-focused",
  },
  {
    id: "3",
    code: "BRD003",
    name: "Nimbus",
    description: "Cloud-like comfort and reliability",
  },
  {
    id: "4",
    code: "BRD004",
    name: "Quantum",
    description: "Cutting-edge innovation",
  },
  {
    id: "5",
    code: "BRD005",
    name: "Heritage",
    description: "Classic and timeless design",
  },
  {
    id: "6",
    code: "BRD006",
    name: "EcoLine",
    description: "Sustainable, eco-friendly products",
  },
  {
    id: "7",
    code: "BRD007",
    name: "Metro",
    description: "Urban style for everyday use",
  },
  {
    id: "8",
    code: "BRD008",
    name: "TrailFox",
    description: "Outdoor and rugged performance",
  },
  {
    id: "9",
    code: "BRD009",
    name: "Luxe",
    description: "Luxury premium collection",
  },
  {
    id: "10",
    code: "BRD010",
    name: "Craft",
    description: "Handcrafted artisan series",
  },
  {
    id: "11",
    code: "BRD011",
    name: "Fusion",
    description: "Blend of style and function",
  },
  {
    id: "12",
    code: "BRD012",
    name: "Vivid",
    description: "Bold colors and expressive designs",
  },
  {
    id: "13",
    code: "BRD013",
    name: "Aurora",
    description: "Elegant and minimalist",
  },
  {
    id: "14",
    code: "BRD014",
    name: "Sonic",
    description: "Audio and sound-oriented line",
  },
  {
    id: "15",
    code: "BRD015",
    name: "Titan",
    description: "Heavy-duty durability",
  },
  {
    id: "16",
    code: "BRD016",
    name: "Zen",
    description: "Calm aesthetics and simplicity",
  },
  {
    id: "17",
    code: "BRD017",
    name: "Nova",
    description: "Next-gen styling",
  },
  {
    id: "18",
    code: "BRD018",
    name: "Atlas",
    description: "Travel and adventure line",
  },
  {
    id: "19",
    code: "BRD019",
    name: "Pulse",
    description: "Fitness and wellness",
  },
  {
    id: "20",
    code: "BRD020",
    name: "Spark",
    description: "Starter range and essentials",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function BrandsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Brands grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [brandsData, setBrandsData] = useState<BrandItem[]>(brands);
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

    const brandNames = [
      "Apex",
      "Velocity",
      "Nimbus",
      "Quantum",
      "Heritage",
      "EcoLine",
      "Metro",
      "TrailFox",
      "Luxe",
      "Craft",
      "Fusion",
      "Vivid",
      "Aurora",
      "Sonic",
      "Titan",
      "Zen",
      "Nova",
      "Atlas",
      "Pulse",
      "Spark",
    ];
    const brandCodePrefixes = ["BRD", "MFG", "LUX", "ECO", "URB"];
    const descriptions = [
      "Premium performance brand",
      "High-speed and sports-focused",
      "Cloud-like comfort and reliability",
      "Cutting-edge innovation",
      "Classic and timeless design",
      "Sustainable, eco-friendly products",
      "Urban style for everyday use",
      "Outdoor and rugged performance",
      "Luxury premium collection",
      "Handcrafted artisan series",
    ];

    const newItems: BrandItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const brandName =
          brandNames[Math.floor(Math.random() * brandNames.length)];
        const brandPrefix =
          brandCodePrefixes[
            Math.floor(Math.random() * brandCodePrefixes.length)
          ];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          name: brandName,
          code: `${brandPrefix}${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          description: description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (brandsData.length >= 46) {
      setHasMore(false);
    } else {
      setBrandsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [brandsData.length, isLoading, hasMore]);

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

  // Filter brands based on search query (search across multiple fields)
  const filteredBrands = brandsData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (brandId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/brands/view/${brandId}?fromView=${viewMode}`);
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
            {filteredBrands.map((item, index) => {
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
                  {/* Brand Header with Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.name}
                    </CardTitle>
                  </div>

                  {/* Brand Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate font-mono">{item.code}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
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
                <span className="text-sm">Loading more brands...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredBrands.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more brands to load
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
                data={brands}
                setFilteredData={setBrandsData}
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
                data={brands}
                setFilteredData={setBrandsData}
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
