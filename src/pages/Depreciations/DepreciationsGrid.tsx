import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";

type GridDataType = {
  assetName: string;
  image: string;
  serialNumber: string;
  deprecationName: string;
  numberOfMonths: string;
  status: string;
  checkout: string;
  purchaseDate: string;
  eol: string;
  cost: string;
  maintenance: string;
  currentValue: string;
  monthlyDepreciation: string;
  remaining: string;

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

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

const deprecationData: GridDataType[] = [
  {
    id: "1",
    assetName: "Laptop Dell XPS 13",
    image: "https://via.placeholder.com/150",
    serialNumber: "DLXPS123456",
    deprecationName: "Electronics",
    numberOfMonths: "24",
    status: "Active",
    checkout: "No",
    purchaseDate: "2023-01-10",
    eol: "2025-01-10",
    cost: "1200",
    maintenance: "50",
    currentValue: "1000",
    monthlyDepreciation: "50",
    remaining: "12",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-01-10"),
    draftedAt: null,
    updatedAt: new Date("2023-08-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    assetName: "Office Chair Ergonomic",
    image: "https://via.placeholder.com/150",
    serialNumber: "OC123456",
    deprecationName: "Furniture",
    numberOfMonths: "36",
    status: "Active",
    checkout: "No",
    purchaseDate: "2022-06-15",
    eol: "2025-06-15",
    cost: "250",
    maintenance: "20",
    currentValue: "200",
    monthlyDepreciation: "8",
    remaining: "18",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2022-06-15"),
    draftedAt: null,
    updatedAt: new Date("2023-07-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    assetName: "Projector Epson",
    image: "https://via.placeholder.com/150",
    serialNumber: "EP123789",
    deprecationName: "Electronics",
    numberOfMonths: "48",
    status: "Active",
    checkout: "Yes",
    purchaseDate: "2021-03-01",
    eol: "2025-03-01",
    cost: "800",
    maintenance: "30",
    currentValue: "500",
    monthlyDepreciation: "12",
    remaining: "24",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2021-03-01"),
    draftedAt: null,
    updatedAt: new Date("2023-08-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    assetName: "iPhone 14 Pro",
    image: "https://via.placeholder.com/150",
    serialNumber: "IP14PRO567",
    deprecationName: "Electronics",
    numberOfMonths: "24",
    status: "Active",
    checkout: "No",
    purchaseDate: "2023-05-12",
    eol: "2025-05-12",
    cost: "1000",
    maintenance: "0",
    currentValue: "950",
    monthlyDepreciation: "20",
    remaining: "18",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-05-12"),
    draftedAt: null,
    updatedAt: new Date("2023-08-10"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    assetName: "Office Desk",
    image: "https://via.placeholder.com/150",
    serialNumber: "OD987654",
    deprecationName: "Furniture",
    numberOfMonths: "60",
    status: "Active",
    checkout: "No",
    purchaseDate: "2020-02-20",
    eol: "2025-02-20",
    cost: "500",
    maintenance: "30",
    currentValue: "200",
    monthlyDepreciation: "5",
    remaining: "6",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2020-02-20"),
    draftedAt: null,
    updatedAt: new Date("2023-07-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    assetName: "Printer HP LaserJet",
    image: "https://via.placeholder.com/150",
    serialNumber: "HP123456",
    deprecationName: "Electronics",
    numberOfMonths: "36",
    status: "Active",
    checkout: "Yes",
    purchaseDate: "2021-09-05",
    eol: "2024-09-05",
    cost: "300",
    maintenance: "25",
    currentValue: "150",
    monthlyDepreciation: "10",
    remaining: "12",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2021-09-05"),
    draftedAt: null,
    updatedAt: new Date("2023-08-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    assetName: "Server Rack",
    image: "https://via.placeholder.com/150",
    serialNumber: "SR123321",
    deprecationName: "IT Equipment",
    numberOfMonths: "60",
    status: "Active",
    checkout: "No",
    purchaseDate: "2019-11-10",
    eol: "2024-11-10",
    cost: "2000",
    maintenance: "100",
    currentValue: "1000",
    monthlyDepreciation: "20",
    remaining: "12",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2019-11-10"),
    draftedAt: null,
    updatedAt: new Date("2023-08-10"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    assetName: 'MacBook Pro 16"',
    image: "https://via.placeholder.com/150",
    serialNumber: "MBP16X123",
    deprecationName: "Electronics",
    numberOfMonths: "36",
    status: "Active",
    checkout: "No",
    purchaseDate: "2022-01-15",
    eol: "2025-01-15",
    cost: "2500",
    maintenance: "0",
    currentValue: "2200",
    monthlyDepreciation: "100",
    remaining: "24",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2022-01-15"),
    draftedAt: null,
    updatedAt: new Date("2023-08-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    assetName: "Conference Table",
    image: "https://via.placeholder.com/150",
    serialNumber: "CT456789",
    deprecationName: "Furniture",
    numberOfMonths: "60",
    status: "Active",
    checkout: "No",
    purchaseDate: "2020-07-20",
    eol: "2025-07-20",
    cost: "800",
    maintenance: "50",
    currentValue: "400",
    monthlyDepreciation: "8",
    remaining: "12",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2020-07-20"),
    draftedAt: null,
    updatedAt: new Date("2023-08-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    assetName: "iPad Air",
    image: "https://via.placeholder.com/150",
    serialNumber: "IPAD12345",
    deprecationName: "Electronics",
    numberOfMonths: "24",
    status: "Active",
    checkout: "Yes",
    purchaseDate: "2023-03-01",
    eol: "2025-03-01",
    cost: "600",
    maintenance: "0",
    currentValue: "550",
    monthlyDepreciation: "25",
    remaining: "20",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-03-01"),
    draftedAt: null,
    updatedAt: new Date("2023-08-10"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    assetName: "Router Cisco",
    image: "https://via.placeholder.com/150",
    serialNumber: "CS123987",
    deprecationName: "IT Equipment",
    numberOfMonths: "48",
    status: "Active",
    checkout: "No",
    purchaseDate: "2021-06-15",
    eol: "2025-06-15",
    cost: "400",
    maintenance: "20",
    currentValue: "250",
    monthlyDepreciation: "10",
    remaining: "18",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2021-06-15"),
    draftedAt: null,
    updatedAt: new Date("2023-08-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    assetName: "Whiteboard",
    image: "https://via.placeholder.com/150",
    serialNumber: "WB654321",
    deprecationName: "Office Supplies",
    numberOfMonths: "60",
    status: "Active",
    checkout: "No",
    purchaseDate: "2019-10-10",
    eol: "2024-10-10",
    cost: "150",
    maintenance: "10",
    currentValue: "50",
    monthlyDepreciation: "2",
    remaining: "6",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2019-10-10"),
    draftedAt: null,
    updatedAt: new Date("2023-07-25"),
    deletedAt: null,
    isDeleted: false,
  },
];

export default function DepreciationsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Terms grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(deprecationData);
  const canDelete: boolean = usePermission("depreciations", "delete");
  const canRestore: boolean = usePermission("depreciations", "restore");
  const canEdit: boolean = usePermission("depreciations", "edit");

  // Debug permissions
  console.log("depreciations Permissions:", {
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
      id: `${Date.now()}-${index}`,

      assetName: `Asset ${index + 1}`,
      image: "https://via.placeholder.com/150",
      serialNumber: `Serial ${index + 1}`,
      deprecationName: `Depreciation ${index + 1}`,
      numberOfMonths: `Months ${index + 1}`,
      status: `Status ${index + 1}`,
      checkout: `Checkout ${index + 1}`,
      purchaseDate: `Purchase ${index + 1}`,
      eol: `EOL ${index + 1}`,
      cost: `Cost ${index + 1}`,
      maintenance: `Maintenance ${index + 1}`,
      currentValue: `Current ${index + 1}`,
      monthlyDepreciation: `Monthly ${index + 1}`,
      remaining: `Remaining ${index + 1}`,

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

  // Filter leaves based on search query
  const filteredData = gridData.filter(
    (item) =>
      item.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deprecationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.numberOfMonths.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.checkout.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purchaseDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.eol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cost.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.maintenance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currentValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.monthlyDepreciation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.remaining.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Total {gridData.length} Depreciations
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
                    onClick={() => navigate(`/deprecations/1`)}
                  >
                    {item.assetName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Depreciation Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.deprecationName}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Number of Months
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.numberOfMonths}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                            toastRestore("Depreciation restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Depreciation deleted successfully");
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
                          onClick={() => navigate(`/deprecations/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.status}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Purchase Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.purchaseDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Checkout
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.checkout}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Cost
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.cost}
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
                <span className="text-sm">Loading more deprecations...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more deprecations to load
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
