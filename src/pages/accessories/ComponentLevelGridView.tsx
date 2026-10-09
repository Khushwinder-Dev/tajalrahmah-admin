import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";

// changeable types
export type ModuleFieldsType = {
  accessoryName: string;
  category: string;
  supplier: string;
  manufacturer: string;
  location: string;
  modelNumber: string;
  orderNumber: string;
  purchaseCost: string;
  purchaseDate: string;
  quantity: string;
  minQuantity: string;
  forSell: string;
  notes: string;
  attachment: string;
};

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

const searchableKeys: (keyof GridDataType)[] = [
  "accessoryName",
  "category",
  "supplier",
  "manufacturer",
  "location",
  "modelNumber",
  "orderNumber",
  "purchaseCost",
  "purchaseDate",
  "quantity",
  "minQuantity",
  "forSell",
  "notes",
];

export const plansData: GridDataType[] = [
  {
    id: "1",
    accessoryName: "Wireless Mouse",
    category: "Computer Accessories",
    supplier: "Tech Supplies Ltd",
    manufacturer: "Logitech",
    location: "Warehouse A - Shelf 3",
    modelNumber: "M325",
    orderNumber: "ORD-1001",
    purchaseCost: "1200",
    purchaseDate: "2025-07-15",
    quantity: "50",
    minQuantity: "10",
    forSell: "Yes",
    notes: "Ergonomic design, battery included",
    attachment: "JD_Frontend.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01"),
    draftedAt: null,
    updatedAt: new Date("2025-08-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    accessoryName: "Mechanical Keyboard",
    category: "Computer Accessories",
    supplier: "Input Devices Co",
    manufacturer: "Corsair",
    location: "Warehouse B - Shelf 1",
    modelNumber: "K70 RGB",
    orderNumber: "ORD-1002",
    purchaseCost: "3500",
    purchaseDate: "2025-07-20",
    quantity: "30",
    minQuantity: "5",
    forSell: "Yes",
    notes: "RGB backlight, Cherry MX switches",
    attachment: "JD_Marketing.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-03"),
    draftedAt: null,
    updatedAt: new Date("2025-08-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    accessoryName: "USB-C Hub 7-in-1",
    category: "Laptop Accessories",
    supplier: "Gadget World",
    manufacturer: "Anker",
    location: "Warehouse A - Shelf 5",
    modelNumber: "AH321",
    orderNumber: "ORD-1003",
    purchaseCost: "2200",
    purchaseDate: "2025-08-01",
    quantity: "40",
    minQuantity: "8",
    forSell: "Yes",
    notes: "Multiport hub: HDMI, USB 3.0, SD Card slot",
    attachment: "JD_USBHub.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-05"),
    draftedAt: null,
    updatedAt: new Date("2025-08-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    accessoryName: "Laptop Stand Adjustable",
    category: "Office Accessories",
    supplier: "Office Essentials Ltd",
    manufacturer: "Nexstand",
    location: "Warehouse C - Shelf 2",
    modelNumber: "NS100",
    orderNumber: "ORD-1004",
    purchaseCost: "1800",
    purchaseDate: "2025-07-28",
    quantity: "25",
    minQuantity: "5",
    forSell: "Yes",
    notes: "Portable and foldable design",
    attachment: "JD_LaptopStand.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-06"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    accessoryName: "External Hard Drive 1TB",
    category: "Storage Devices",
    supplier: "Storage Solutions",
    manufacturer: "Seagate",
    location: "Warehouse B - Shelf 4",
    modelNumber: "ST1000LM035",
    orderNumber: "ORD-1005",
    purchaseCost: "5000",
    purchaseDate: "2025-07-18",
    quantity: "20",
    minQuantity: "5",
    forSell: "Yes",
    notes: "Portable HDD, USB 3.0",
    attachment: "JD_HardDrive.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-07"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    accessoryName: "Webcam Full HD",
    category: "Computer Accessories",
    supplier: "Tech Supplies Ltd",
    manufacturer: "Logitech",
    location: "Warehouse A - Shelf 6",
    modelNumber: "C920",
    orderNumber: "ORD-1006",
    purchaseCost: "4000",
    purchaseDate: "2025-08-05",
    quantity: "15",
    minQuantity: "3",
    forSell: "Yes",
    notes: "1080p video with stereo mic",
    attachment: "JD_Webcam.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-08"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    accessoryName: "Gaming Headset",
    category: "Audio Devices",
    supplier: "Gadget World",
    manufacturer: "HyperX",
    location: "Warehouse C - Shelf 3",
    modelNumber: "Cloud II",
    orderNumber: "ORD-1007",
    purchaseCost: "3500",
    purchaseDate: "2025-07-30",
    quantity: "18",
    minQuantity: "5",
    forSell: "Yes",
    notes: "Noise-cancelling mic, surround sound",
    attachment: "JD_Headset.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-09"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    accessoryName: "Power Bank 10000mAh",
    category: "Mobile Accessories",
    supplier: "PowerTech Ltd",
    manufacturer: "Xiaomi",
    location: "Warehouse B - Shelf 2",
    modelNumber: "Mi10000",
    orderNumber: "ORD-1008",
    purchaseCost: "1500",
    purchaseDate: "2025-08-02",
    quantity: "60",
    minQuantity: "10",
    forSell: "Yes",
    notes: "Fast charging, compact design",
    attachment: "JD_PowerBank.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-10"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    accessoryName: "Smartphone Stand",
    category: "Mobile Accessories",
    supplier: "Office Essentials Ltd",
    manufacturer: "Generic",
    location: "Warehouse C - Shelf 1",
    modelNumber: "SS01",
    orderNumber: "ORD-1009",
    purchaseCost: "500",
    purchaseDate: "2025-07-25",
    quantity: "80",
    minQuantity: "20",
    forSell: "Yes",
    notes: "Foldable, universal compatibility",
    attachment: "JD_PhoneStand.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-11"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    accessoryName: "HDMI Cable 2m",
    category: "Cables & Adapters",
    supplier: "Cable Pro Ltd",
    manufacturer: "Belkin",
    location: "Warehouse A - Shelf 8",
    modelNumber: "HD2M",
    orderNumber: "ORD-1010",
    purchaseCost: "300",
    purchaseDate: "2025-08-03",
    quantity: "100",
    minQuantity: "20",
    forSell: "Yes",
    notes: "High-speed HDMI, supports 4K",
    attachment: "JD_HDMICable.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-12"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    accessoryName: "Portable SSD 512GB",
    category: "Storage Devices",
    supplier: "Storage Solutions",
    manufacturer: "Samsung",
    location: "Warehouse B - Shelf 5",
    modelNumber: "T7",
    orderNumber: "ORD-1011",
    purchaseCost: "7000",
    purchaseDate: "2025-07-22",
    quantity: "12",
    minQuantity: "3",
    forSell: "Yes",
    notes: "USB 3.2 Gen 2, ultra-fast transfer",
    attachment: "JD_SSD.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-13"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    accessoryName: "Wireless Earbuds",
    category: "Audio Devices",
    supplier: "Gadget World",
    manufacturer: "Sony",
    location: "Warehouse A - Shelf 7",
    modelNumber: "WF-1000XM4",
    orderNumber: "ORD-1012",
    purchaseCost: "8500",
    purchaseDate: "2025-08-04",
    quantity: "20",
    minQuantity: "4",
    forSell: "Yes",
    notes: "Noise cancellation, long battery life",
    attachment: "JD_Earbuds.pdf",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-14"),
    draftedAt: null,
    updatedAt: new Date("2025-08-22"),
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
  console.log("grid rendered");

  const navigate = useNavigate();
  const location = useLocation();

  const detectedModule = getModuleFromPath(location.pathname);

  const [gridData, setGridData] = useState(plansData);
  const canDelete: boolean = usePermission(detectedModule, "delete");
  const canRestore: boolean = usePermission(detectedModule, "restore");
  const canEdit: boolean = usePermission(detectedModule, "edit");

  // Debug permissions
  console.log("Permissions:", {
    canDelete,
    canRestore,
    canEdit,
  });

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

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      ...plansData[index],
      id: `${Date.now()}-${index}`,
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

  const handleDeleteClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const handleRestoreClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Floating Label - Left Top */}
      <div
        className={cn(
          "absolute -top-4 left-6 rtl:left-auto rtl:right-6 py-1 rounded-md z-40! bg-white w-fit"
        )}
      >
        <span
          className={cn(
            "text-md font-semibold tracking-wide capitalize text-gray-600"
          )}
        >
          Total {gridData.length} {PAGE_NAME}
        </span>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 p-2">
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.accessoryName}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Category
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.category}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Order Number{" "}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.orderNumber}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
                          ? "Restore"
                          : canDelete
                          ? "Delete"
                          : ""
                      }
                      position="top"
                      arrowSize={8}
                      withArrow
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "#374151",
                          color: "white",
                          borderRadius: "6px",
                          fontWeight: "500",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "#374151",
                        },
                      }}
                    >
                      <button
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore(`${PAGE_NAME} restored successfully`);
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(`${PAGE_NAME} deleted successfully`);
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {canEdit && (
                      <Tooltip
                        label="Edit"
                        position="top"
                        arrowSize={8}
                        withArrow
                        styles={{
                          tooltip: {
                            fontSize: "14px",
                            padding: "8px 12px",
                            backgroundColor: "#374151",
                            color: "white",
                            borderRadius: "6px",
                            fontWeight: "500",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          },
                          arrow: {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        <div
                          className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center w-8 h-8"
                          onClick={() =>
                            navigate(`${location.pathname}/edit/1`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      For Sell
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.forSell}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Location{" "}
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Model Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.modelNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-end text-gray-500 dark:text-gray-400">
                      Purchase Date
                    </div>
                    <div className="text-sm font-semibold text-end text-gray-900 dark:text-gray-100 truncate">
                      {item.purchaseDate}
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
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={gridData}
                setFilteredData={setGridData}
                setIsExportOpen={setIsExportOpen}
                title={location.pathname.split("/")[1].replace("-", " ")}
                fileName={location.pathname.split("/")[1]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
