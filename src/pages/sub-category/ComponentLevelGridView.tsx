import { Card, CardTitle } from "@/components/ui/card";
import { Tags } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";
import { SearchFunction } from "@/lib/SearchFunction";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";

// do not change
type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export const plansData: GridDataType[] = [
  {
    id: "1",
    slNo: "1",
    name: "Electronics",
    groups: "Technology",
    categories: "Gadgets",
    description: "Electronic devices and accessories",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-01"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    slNo: "2",
    name: "Clothing",
    groups: "Fashion",
    categories: "Apparel",
    description: "Men's and women's clothing items",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-02"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    slNo: "3",
    name: "Books",
    groups: "Education",
    categories: "Literature",
    description: "Educational and fiction books",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-03"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    slNo: "4",
    name: "Home Decor",
    groups: "Interior",
    categories: "Furniture",
    description: "Home decoration and furniture items",
    status: "Draft",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-04"),
    draftedAt: new Date("2025-01-30"),
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    slNo: "5",
    name: "Sports",
    groups: "Fitness",
    categories: "Equipment",
    description: "Sports and fitness equipment",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    slNo: "6",
    name: "Beauty",
    groups: "Personal Care",
    categories: "Cosmetics",
    description: "Beauty and personal care products",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-06"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    slNo: "7",
    name: "Automotive",
    groups: "Transportation",
    categories: "Parts",
    description: "Car parts and accessories",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-07"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    slNo: "8",
    name: "Toys",
    groups: "Entertainment",
    categories: "Children",
    description: "Children's toys and games",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-08"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    slNo: "9",
    name: "Jewelry",
    groups: "Fashion",
    categories: "Accessories",
    description: "Fine jewelry and accessories",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-09"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    slNo: "10",
    name: "Garden",
    groups: "Outdoor",
    categories: "Tools",
    description: "Gardening tools and equipment",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    slNo: "11",
    name: "Kitchen",
    groups: "Home",
    categories: "Appliances",
    description: "Kitchen appliances and utensils",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-11"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    slNo: "12",
    name: "Office",
    groups: "Business",
    categories: "Supplies",
    description: "Office supplies and equipment",
    status: "Active",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-12"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sub Category grid rendered");

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  // const detectedModule = getModuleFromPath(location.pathname);
  const [gridData, setGridData] = useState(plansData);

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

    const groups = [
      "Technology",
      "Fashion",
      "Education",
      "Interior",
      "Fitness",
    ];
    const categories = [
      "Gadgets",
      "Apparel",
      "Literature",
      "Furniture",
      "Equipment",
    ];
    const statuses = ["Active", "Draft", "Inactive"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      slNo: `${gridData.length + index + 1}`,
      name: `SubCategory ${gridData.length + index + 1}`,
      groups: groups[Math.floor(Math.random() * groups.length)],
      categories: categories[Math.floor(Math.random() * categories.length)],
      description: `Description for subcategory ${gridData.length + index + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [gridData.length, isLoading, hasMore]);

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

  // Filter data based on search query
  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  const handleViewClick = (itemId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`${location.pathname}/view/${itemId}?fromView=${viewMode}`);
  };

  // Get page name
  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

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
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(item.id)}
              >
                {/* Top Row - Name and Icon */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Name */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {item.name}
                  </CardTitle>

                  {/* Right - SubCategory Icon */}
                  <div className="flex justify-end">
                    <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white shadow-md">
                      <Tags className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Middle Row - Groups and Categories */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Groups - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Groups
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {item.groups}
                    </div>
                  </div>

                  {/* Categories - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Categories
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {item.categories}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - SL No and Status */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700">
                  {/* SL No - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      SL No
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {item.slNo}
                    </div>
                  </div>

                  {/* Status - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          item.status === "Active" &&
                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                          item.status === "Draft" &&
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                          item.status === "Inactive" &&
                            "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
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
                <span className="text-sm">Loading more {PAGE_NAME}...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
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
                data={plansData}
                setFilteredData={setGridData}
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
                data={plansData}
                setFilteredData={setGridData}
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
