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

// Sample Category interface
interface SampleCategoryItem {
  id: string;
  name: string;
  description: string;
}

// Mock data - replace with real data from your API
const sampleCategories: SampleCategoryItem[] = [
  {
    id: "1",
    name: "Appetizers",
    description: "Small dishes served before the main course",
  },
  {
    id: "2",
    name: "Main Courses",
    description: "Primary dishes that form the centerpiece of a meal",
  },
  {
    id: "3",
    name: "Desserts",
    description: "Sweet dishes served at the end of a meal",
  },
  {
    id: "4",
    name: "Beverages",
    description: "Drinks including coffee, tea, juices, and soft drinks",
  },
  {
    id: "5",
    name: "Salads",
    description: "Fresh vegetables and greens served as a side or main dish",
  },
  {
    id: "6",
    name: "Soups",
    description: "Liquid dishes made with vegetables, meat, or fish",
  },
  {
    id: "7",
    name: "Sandwiches",
    description: "Food items consisting of fillings between slices of bread",
  },
  {
    id: "8",
    name: "Pasta",
    description: "Italian dishes made with noodles and various sauces",
  },
  {
    id: "9",
    name: "Pizza",
    description: "Flatbread topped with cheese, sauce, and various toppings",
  },
  {
    id: "10",
    name: "Seafood",
    description: "Dishes made from fish, shellfish, and other sea creatures",
  },
  {
    id: "11",
    name: "Vegetarian",
    description: "Dishes made without meat or animal products",
  },
  {
    id: "12",
    name: "Grilled Items",
    description: "Food items cooked on a grill for enhanced flavor",
  },
  {
    id: "13",
    name: "Breakfast",
    description: "Morning meals including eggs, pancakes, and cereals",
  },
  {
    id: "14",
    name: "Snacks",
    description: "Light food items consumed between meals",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function SampleCategoryGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sample Category grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [sampleCategoriesData, setSampleCategoriesData] =
    useState<SampleCategoryItem[]>(sampleCategories);
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
      "Appetizers",
      "Main Courses",
      "Desserts",
      "Beverages",
      "Salads",
      "Soups",
      "Sandwiches",
      "Pasta",
      "Pizza",
      "Seafood",
      "Vegetarian",
      "Grilled Items",
      "Breakfast",
      "Snacks",
      "Sides",
      "Specials",
    ];
    const descriptions = [
      "Small dishes served before the main course",
      "Primary dishes that form the centerpiece of a meal",
      "Sweet dishes served at the end of a meal",
      "Drinks including coffee, tea, juices, and soft drinks",
      "Fresh vegetables and greens served as a side or main dish",
      "Liquid dishes made with vegetables, meat, or fish",
      "Food items consisting of fillings between slices of bread",
      "Italian dishes made with noodles and various sauces",
      "Flatbread topped with cheese, sauce, and various toppings",
      "Dishes made from fish, shellfish, and other sea creatures",
      "Dishes made without meat or animal products",
      "Food items cooked on a grill for enhanced flavor",
      "Morning meals including eggs, pancakes, and cereals",
      "Light food items consumed between meals",
      "Accompaniments served with main dishes",
      "Chef's special creations and seasonal items",
    ];

    const newItems: SampleCategoryItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const name = names[Math.floor(Math.random() * names.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          name,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (sampleCategoriesData.length >= 46) {
      setHasMore(false);
    } else {
      setSampleCategoriesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [sampleCategoriesData.length, isLoading, hasMore]);

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

  // Filter sample categories based on search query (search across multiple fields)
  const filteredSampleCategories = sampleCategoriesData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (sampleCategoryId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/sample-category/view/${sampleCategoryId}?fromView=${viewMode}`);
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
            {filteredSampleCategories.map((item, index) => {
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
                  {/* Sample Category Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.name}
                    </CardTitle>
                  </div>

                  {/* Sample Category Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
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
                <span className="text-sm">
                  Loading more sample categories...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSampleCategories.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sample categories to load
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
                data={sampleCategories}
                setFilteredData={setSampleCategoriesData}
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
                data={sampleCategories}
                setFilteredData={setSampleCategoriesData}
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
