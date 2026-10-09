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

// Item Master interface
interface ItemMaster {
  id: string;
  itemCode: string;
  itemName: string;
  arabicName: string;
  costPrice: number;
  regularPrice: number;
  offerPrice: number;
  startDate: string;
  endDate: string;
  openingStock: number;
  category: string;
  subCategory: string;
  unit: string;
  description: string;
}

// Mock data - replace with real data from your API
const items: ItemMaster[] = [
  {
    id: "1",
    itemCode: "ITM001",
    itemName: "Laptop Pro 15",
    arabicName: "لابتوب برو 15",
    costPrice: 1200,
    regularPrice: 1500,
    offerPrice: 1350,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 50,
    category: "Electronics",
    subCategory: "Laptops",
    unit: "Piece",
    description: "High-performance laptop for professionals",
  },
  {
    id: "2",
    itemCode: "ITM002",
    itemName: "Wireless Mouse",
    arabicName: "ماوس لاسلكي",
    costPrice: 25,
    regularPrice: 35,
    offerPrice: 30,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 200,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "Ergonomic wireless mouse with precision tracking",
  },
  {
    id: "3",
    itemCode: "ITM003",
    itemName: "Office Chair",
    arabicName: "كرسي مكتب",
    costPrice: 150,
    regularPrice: 200,
    offerPrice: 175,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 30,
    category: "Furniture",
    subCategory: "Office Chairs",
    unit: "Piece",
    description: "Comfortable ergonomic office chair",
  },
  {
    id: "4",
    itemCode: "ITM004",
    itemName: "Monitor 24 inch",
    arabicName: "شاشة 24 بوصة",
    costPrice: 200,
    regularPrice: 280,
    offerPrice: 250,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 40,
    category: "Electronics",
    subCategory: "Monitors",
    unit: "Piece",
    description: "Full HD 24-inch LED monitor",
  },
  {
    id: "5",
    itemCode: "ITM005",
    itemName: "Desk Lamp",
    arabicName: "مصباح مكتب",
    costPrice: 30,
    regularPrice: 45,
    offerPrice: 38,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 100,
    category: "Furniture",
    subCategory: "Lighting",
    unit: "Piece",
    description: "Adjustable LED desk lamp",
  },
  {
    id: "6",
    itemCode: "ITM006",
    itemName: "Keyboard Mechanical",
    arabicName: "لوحة مفاتيح ميكانيكية",
    costPrice: 80,
    regularPrice: 120,
    offerPrice: 100,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 75,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "RGB mechanical gaming keyboard",
  },
  {
    id: "7",
    itemCode: "ITM007",
    itemName: "Webcam HD",
    arabicName: "كاميرا ويب عالية الدقة",
    costPrice: 60,
    regularPrice: 85,
    offerPrice: 70,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 60,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "1080p HD webcam for video conferencing",
  },
  {
    id: "8",
    itemCode: "ITM008",
    itemName: "Office Desk",
    arabicName: "مكتب مكتب",
    costPrice: 300,
    regularPrice: 400,
    offerPrice: 350,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 20,
    category: "Furniture",
    subCategory: "Desks",
    unit: "Piece",
    description: "Spacious wooden office desk",
  },
  {
    id: "9",
    itemCode: "ITM009",
    itemName: "USB Hub",
    arabicName: "محول USB",
    costPrice: 15,
    regularPrice: 25,
    offerPrice: 20,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 150,
    category: "Electronics",
    subCategory: "Accessories",
    unit: "Piece",
    description: "7-port USB 3.0 hub",
  },
  {
    id: "10",
    itemCode: "ITM010",
    itemName: "Desk Organizer",
    arabicName: "منظم مكتب",
    costPrice: 20,
    regularPrice: 30,
    offerPrice: 25,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    openingStock: 80,
    category: "Furniture",
    subCategory: "Accessories",
    unit: "Piece",
    description: "Multi-compartment desk organizer",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ItemsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Items grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [itemsData, setItemsData] = useState<ItemMaster[]>(items);
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

    const itemNames = [
      "Gaming Mouse",
      "Mechanical Keyboard",
      "USB Cable",
      "Power Adapter",
      "Headphones",
      "Speaker System",
      "Tablet Stand",
      "Laptop Sleeve",
      "Screen Protector",
      "Charging Dock",
      "Bluetooth Speaker",
      "Wireless Charger",
      "HDMI Cable",
      "Ethernet Cable",
      "Memory Card",
      "External Drive",
      "Printer Paper",
      "Ink Cartridge",
      "Desk Mat",
      "Cable Organizer",
    ];
    const arabicNames = [
      "ماوس ألعاب",
      "لوحة مفاتيح ميكانيكية",
      "كابل USB",
      "محول طاقة",
      "سماعات",
      "نظام مكبرات صوت",
      "حامل تابلت",
      "غلاف لابتوب",
      "حامي شاشة",
      "محطة شحن",
      "مكبر صوت بلوتوث",
      "شاحن لاسلكي",
      "كابل HDMI",
      "كابل إيثرنت",
      "بطاقة ذاكرة",
      "قرص خارجي",
      "ورق طابعة",
      "حبر طابعة",
      "سجادة مكتب",
      "منظم كابلات",
    ];
    const categories = [
      "Electronics",
      "Furniture",
      "Accessories",
      "Office Supplies",
    ];
    const subCategories = [
      "Laptops",
      "Monitors",
      "Accessories",
      "Lighting",
      "Desks",
      "Chairs",
    ];
    const units = ["Piece", "Box", "Set", "Pack"];
    const itemCodePrefixes = ["ITM", "ELE", "FUR", "ACC", "OFF"];

    const newItems: ItemMaster[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const itemName =
          itemNames[Math.floor(Math.random() * itemNames.length)];
        const arabicName =
          arabicNames[Math.floor(Math.random() * arabicNames.length)];
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        const subCategory =
          subCategories[Math.floor(Math.random() * subCategories.length)];
        const unit = units[Math.floor(Math.random() * units.length)];
        const prefix =
          itemCodePrefixes[Math.floor(Math.random() * itemCodePrefixes.length)];

        const costPrice = Math.floor(Math.random() * 500) + 10;
        const regularPrice = Math.floor(
          costPrice * (1.2 + Math.random() * 0.5)
        );
        const offerPrice = Math.floor(
          regularPrice * (0.8 + Math.random() * 0.15)
        );

        return {
          id: `${Date.now()}-${index}`,
          itemCode: `${prefix}${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          itemName: itemName,
          arabicName: arabicName,
          costPrice: costPrice,
          regularPrice: regularPrice,
          offerPrice: offerPrice,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          openingStock: Math.floor(Math.random() * 100) + 10,
          category: category,
          subCategory: subCategory,
          unit: unit,
          description: `High-quality ${itemName.toLowerCase()} for professional use`,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (itemsData.length >= 46) {
      setHasMore(false);
    } else {
      setItemsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [itemsData.length, isLoading, hasMore]);

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

  // Filter items based on search query (search across multiple fields)
  const filteredItems = itemsData.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arabicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (itemId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/items/view/${itemId}?fromView=${viewMode}`);
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
                    "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(item.id)}
                >
                  {/* Item Header with Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.itemName}
                    </CardTitle>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.arabicName}
                    </div>
                  </div>

                  {/* Item Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate font-mono">
                        {item.itemCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Category:</span>
                      <span className="truncate">
                        {item.category} - {item.subCategory}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Cost:</span>
                        <span className="text-red-600">${item.costPrice}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Regular:</span>
                        <span className="text-blue-600">
                          ${item.regularPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Offer:</span>
                        <span className="text-green-600">
                          ${item.offerPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Stock:</span>
                        <span className="text-orange-600">
                          {item.openingStock} {item.unit}
                        </span>
                      </div>
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
                <span className="text-sm">Loading more items...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredItems.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more items to load
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
                data={items}
                setFilteredData={setItemsData}
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
                data={items}
                setFilteredData={setItemsData}
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
