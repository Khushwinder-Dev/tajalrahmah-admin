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

// Expiry Item interface
interface ExpiryItem {
  id: string;
  itemName: string;
  batchNumber: string;
  expiryDate: string; // ISO date string
  quantity: number;
  unit: string;
  location: string;
  category: string;
  supplier: string;
}

// Mock data - replace with real data from your API
const expiryItems: ExpiryItem[] = [
  {
    id: "1",
    itemName: "Paracetamol 500mg",
    batchNumber: "BCH-2024-001",
    expiryDate: "2025-03-15T00:00:00Z",
    quantity: 100,
    unit: "Tablets",
    location: "Warehouse A",
    category: "Medicine",
    supplier: "ABC Pharmaceuticals",
  },
  {
    id: "2",
    itemName: "Ibuprofen 400mg",
    batchNumber: "BCH-2024-002",
    expiryDate: "2025-06-20T00:00:00Z",
    quantity: 50,
    unit: "Tablets",
    location: "Warehouse B",
    category: "Medicine",
    supplier: "XYZ Medical",
  },
  {
    id: "3",
    itemName: "Vitamin C 1000mg",
    batchNumber: "BCH-2024-003",
    expiryDate: "2025-12-10T00:00:00Z",
    quantity: 200,
    unit: "Capsules",
    location: "Store 1",
    category: "Supplements",
    supplier: "Health Plus",
  },
  {
    id: "4",
    itemName: "Bandages 5cm",
    batchNumber: "BCH-2024-004",
    expiryDate: "2026-01-30T00:00:00Z",
    quantity: 25,
    unit: "Pieces",
    location: "Warehouse A",
    category: "Medical Supplies",
    supplier: "MedSupply Co",
  },
  {
    id: "5",
    itemName: "Antiseptic Solution",
    batchNumber: "BCH-2024-005",
    expiryDate: "2025-08-15T00:00:00Z",
    quantity: 10,
    unit: "Bottles",
    location: "Store 2",
    category: "Medical Supplies",
    supplier: "CleanCare Ltd",
  },
  {
    id: "6",
    itemName: "Surgical Gloves",
    batchNumber: "BCH-2024-006",
    expiryDate: "2025-11-25T00:00:00Z",
    quantity: 500,
    unit: "Pairs",
    location: "Warehouse B",
    category: "Medical Supplies",
    supplier: "SafeHands Inc",
  },
  {
    id: "7",
    itemName: "Thermometer Digital",
    batchNumber: "BCH-2024-007",
    expiryDate: "2026-02-14T00:00:00Z",
    quantity: 15,
    unit: "Units",
    location: "Store 1",
    category: "Medical Equipment",
    supplier: "TechMed Solutions",
  },
  {
    id: "8",
    itemName: "Blood Pressure Monitor",
    batchNumber: "BCH-2024-008",
    expiryDate: "2025-09-30T00:00:00Z",
    quantity: 5,
    unit: "Units",
    location: "Warehouse A",
    category: "Medical Equipment",
    supplier: "Precision Health",
  },
  {
    id: "9",
    itemName: "Multivitamin Complex",
    batchNumber: "BCH-2024-009",
    expiryDate: "2025-07-18T00:00:00Z",
    quantity: 75,
    unit: "Bottles",
    location: "Store 2",
    category: "Supplements",
    supplier: "VitaLife Corp",
  },
  {
    id: "10",
    itemName: "Pain Relief Gel",
    batchNumber: "BCH-2024-010",
    expiryDate: "2025-10-05T00:00:00Z",
    quantity: 30,
    unit: "Tubes",
    location: "Warehouse B",
    category: "Medicine",
    supplier: "Relief Pharma",
  },
  {
    id: "11",
    itemName: "First Aid Kit",
    batchNumber: "BCH-2024-011",
    expiryDate: "2026-03-22T00:00:00Z",
    quantity: 8,
    unit: "Kits",
    location: "Store 1",
    category: "Medical Supplies",
    supplier: "Emergency Care",
  },
  {
    id: "12",
    itemName: "Insulin Syringes",
    batchNumber: "BCH-2024-012",
    expiryDate: "2025-05-12T00:00:00Z",
    quantity: 100,
    unit: "Pieces",
    location: "Warehouse A",
    category: "Medical Supplies",
    supplier: "Diabetic Care",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ExpiryItemsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Expiry Items grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [expiryItemsData, setExpiryItemsData] =
    useState<ExpiryItem[]>(expiryItems);
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
      "Paracetamol 500mg",
      "Ibuprofen 400mg",
      "Vitamin C 1000mg",
      "Bandages 5cm",
      "Antiseptic Solution",
      "Surgical Gloves",
      "Thermometer Digital",
      "Blood Pressure Monitor",
      "Multivitamin Complex",
      "Pain Relief Gel",
    ];
    const locations = ["Warehouse A", "Warehouse B", "Store 1", "Store 2"];
    const categories = [
      "Medicine",
      "Supplements",
      "Medical Supplies",
      "Medical Equipment",
    ];
    const suppliers = [
      "ABC Pharmaceuticals",
      "XYZ Medical",
      "Health Plus",
      "MedSupply Co",
      "CleanCare Ltd",
      "SafeHands Inc",
      "TechMed Solutions",
      "Precision Health",
      "VitaLife Corp",
      "Relief Pharma",
    ];
    const units = [
      "Tablets",
      "Capsules",
      "Pieces",
      "Bottles",
      "Pairs",
      "Units",
      "Tubes",
      "Kits",
    ];

    const newItems: ExpiryItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const batchNumber = `BCH-2024-${Math.floor(Math.random() * 999)
          .toString()
          .padStart(3, "0")}`;
        const quantity = Math.floor(Math.random() * 200) + 1;
        const daysFromNow = Math.floor(Math.random() * 365) + 1;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + daysFromNow);

        return {
          id: `${Date.now()}-${index}`,
          itemName: itemNames[Math.floor(Math.random() * itemNames.length)],
          batchNumber: batchNumber,
          expiryDate: expiryDate.toISOString(),
          quantity: quantity,
          unit: units[Math.floor(Math.random() * units.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (expiryItemsData.length >= 46) {
      setHasMore(false);
    } else {
      setExpiryItemsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [expiryItemsData.length, isLoading, hasMore]);

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

  // Filter expiry items based on search query (search across multiple fields)
  const filteredExpiryItems = expiryItemsData.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.itemName.toLowerCase().includes(q) ||
      item.batchNumber.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.supplier.toLowerCase().includes(q) ||
      item.unit.toLowerCase().includes(q) ||
      item.quantity.toString().includes(q) ||
      new Date(item.expiryDate).toLocaleDateString().toLowerCase().includes(q)
    );
  });

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (expiryItemId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/expiry-items/view/${expiryItemId}?fromView=${viewMode}`);
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
            {filteredExpiryItems.map((item, index) => {
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
                  {/* Expiry Item Header with Item Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.itemName}
                    </CardTitle>
                  </div>

                  {/* Expiry Item Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Batch Number:</span>
                      <span className="truncate">{item.batchNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Expiry Date:</span>
                      <span className="truncate">
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Quantity:</span>
                      <span className="truncate">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Category:</span>
                      <span className="truncate">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Supplier:</span>
                      <span className="truncate">{item.supplier}</span>
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
                <span className="text-sm">Loading more expiry items...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredExpiryItems.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more expiry items to load
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
                data={expiryItems}
                setFilteredData={setExpiryItemsData}
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
                data={expiryItems}
                setFilteredData={setExpiryItemsData}
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
