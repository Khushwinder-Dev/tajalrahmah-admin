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
  description: string;
  netWeight: string;
  totalCTN: string;
  totalPCS: string;
  artWork: string;
  piNoImage: string;

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

const goodsData: GridDataType[] = [
  {
    id: "1",
    description: "Cotton T-Shirts",
    netWeight: "150kg",
    totalCTN: "30",
    totalPCS: "600",
    artWork: "artwork-001.png",
    piNoImage: "pi-2001.png",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-08"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    description: "Denim Jeans",
    netWeight: "220kg",
    totalCTN: "40",
    totalPCS: "800",
    artWork: "artwork-002.png",
    piNoImage: "pi-2002.png",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-01-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    description: "Leather Jackets",
    netWeight: "300kg",
    totalCTN: "50",
    totalPCS: "500",
    artWork: "artwork-003.png",
    piNoImage: "pi-2003.png",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-14"),
    draftedAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    description: "Sports Shoes",
    netWeight: "180kg",
    totalCTN: "25",
    totalPCS: "500",
    artWork: "artwork-004.png",
    piNoImage: "pi-2004.png",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-17"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    description: "Formal Shirts",
    netWeight: "130kg",
    totalCTN: "20",
    totalPCS: "400",
    artWork: "artwork-005.png",
    piNoImage: "pi-2005.png",
    isDefault: true,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-21"),
    draftedAt: null,
    updatedAt: new Date("2025-01-23"),
    deletedAt: new Date("2025-01-30"),
    isDeleted: true,
  },
  {
    id: "6",
    description: "Woolen Sweaters",
    netWeight: "250kg",
    totalCTN: "35",
    totalPCS: "700",
    artWork: "artwork-006.png",
    piNoImage: "pi-2006.png",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-25"),
    draftedAt: null,
    updatedAt: new Date("2025-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    description: "Casual Shorts",
    netWeight: "90kg",
    totalCTN: "15",
    totalPCS: "300",
    artWork: "artwork-007.png",
    piNoImage: "pi-2007.png",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-29"),
    draftedAt: null,
    updatedAt: new Date("2025-02-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    description: "Silk Scarves",
    netWeight: "50kg",
    totalCTN: "10",
    totalPCS: "200",
    artWork: "artwork-008.png",
    piNoImage: "pi-2008.png",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-02-03"),
    draftedAt: new Date("2025-02-04"),
    updatedAt: new Date("2025-02-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    description: "Kids Wear",
    netWeight: "160kg",
    totalCTN: "28",
    totalPCS: "560",
    artWork: "artwork-009.png",
    piNoImage: "pi-2009.png",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-07"),
    draftedAt: null,
    updatedAt: new Date("2025-02-09"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    description: "Winter Jackets",
    netWeight: "400kg",
    totalCTN: "60",
    totalPCS: "600",
    artWork: "artwork-010.png",
    piNoImage: "pi-2010.png",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-10"),
    draftedAt: null,
    updatedAt: new Date("2025-02-13"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    description: "School Bags",
    netWeight: "120kg",
    totalCTN: "22",
    totalPCS: "440",
    artWork: "artwork-011.png",
    piNoImage: "pi-2011.png",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-14"),
    draftedAt: null,
    updatedAt: new Date("2025-02-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    description: "Sports Caps",
    netWeight: "70kg",
    totalCTN: "12",
    totalPCS: "240",
    artWork: "artwork-012.png",
    piNoImage: "pi-2012.png",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-02-17"),
    draftedAt: new Date("2025-02-18"),
    updatedAt: new Date("2025-02-19"),
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

export default function GoodsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Goods grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(goodsData);
  const canDelete: boolean = usePermission("goods", "delete");
  const canRestore: boolean = usePermission("goods", "restore");
  const canEdit: boolean = usePermission("goods", "edit");

  // Debug permissions
  console.log("Goods Permissions:", {
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

      description: `Description ${index + 1}`,
      netWeight: `Net Weight ${index + 1}`,
      totalCTN: `Total CTN ${index + 1}`,
      totalPCS: `Total PCS ${index + 1}`,
      artWork: `Art Work ${index + 1}`,
      piNoImage: `PI No Image ${index + 1}`,

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
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.netWeight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.totalCTN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.totalPCS.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artWork.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Goods
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
                    onClick={() => navigate(`/goods/1`)}
                  >
                    {item.description}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Net Weight
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.netWeight}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total CTN
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.totalCTN}
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
                            toastRestore("Goods restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Goods deleted successfully");
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
                          onClick={() => navigate(`/goods/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
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
                <span className="text-sm">Loading more goods...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more goods to load
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
