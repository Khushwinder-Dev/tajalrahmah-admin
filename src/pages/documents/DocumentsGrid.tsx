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
  documentNo: string;
  piNo: string;
  invoiceNo: string;
  orderBy: string;
  shipmentType: string;
  documentDate: string;
  piDate: string;
  invoiceDate: string;
  mobileNo: string;

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

const documentsData: GridDataType[] = [
  {
    id: "1",
    documentNo: "DOC-1001",
    piNo: "PI-2001",
    invoiceNo: "INV-3001",
    orderBy: "Rahim Traders",
    shipmentType: "Air",
    documentDate: "2025-01-05",
    piDate: "2025-01-03",
    invoiceDate: "2025-01-06",
    mobileNo: "01711111111",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-03"),
    draftedAt: null,
    updatedAt: new Date("2025-01-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    documentNo: "DOC-1002",
    piNo: "PI-2002",
    invoiceNo: "INV-3002",
    orderBy: "Karim & Co.",
    shipmentType: "Sea",
    documentDate: "2025-01-10",
    piDate: "2025-01-07",
    invoiceDate: "2025-01-11",
    mobileNo: "01822222222",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-07"),
    draftedAt: null,
    updatedAt: new Date("2025-01-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    documentNo: "DOC-1003",
    piNo: "PI-2003",
    invoiceNo: "INV-3003",
    orderBy: "Delta Supplies",
    shipmentType: "Courier",
    documentDate: "2025-01-15",
    piDate: "2025-01-13",
    invoiceDate: "2025-01-16",
    mobileNo: "01633333333",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-13"),
    draftedAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    documentNo: "DOC-1004",
    piNo: "PI-2004",
    invoiceNo: "INV-3004",
    orderBy: "Green Line Export",
    shipmentType: "Air",
    documentDate: "2025-01-18",
    piDate: "2025-01-16",
    invoiceDate: "2025-01-19",
    mobileNo: "01544444444",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-16"),
    draftedAt: null,
    updatedAt: new Date("2025-01-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    documentNo: "DOC-1005",
    piNo: "PI-2005",
    invoiceNo: "INV-3005",
    orderBy: "Shahjalal Imports",
    shipmentType: "Sea",
    documentDate: "2025-01-22",
    piDate: "2025-01-20",
    invoiceDate: "2025-01-23",
    mobileNo: "01355555555",
    isDefault: true,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-23"),
    deletedAt: new Date("2025-01-30"),
    isDeleted: true,
  },
  {
    id: "6",
    documentNo: "DOC-1006",
    piNo: "PI-2006",
    invoiceNo: "INV-3006",
    orderBy: "Metro Distributors",
    shipmentType: "Courier",
    documentDate: "2025-01-25",
    piDate: "2025-01-22",
    invoiceDate: "2025-01-26",
    mobileNo: "01766666666",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-22"),
    draftedAt: null,
    updatedAt: new Date("2025-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    documentNo: "DOC-1007",
    piNo: "PI-2007",
    invoiceNo: "INV-3007",
    orderBy: "Alpha Traders",
    shipmentType: "Air",
    documentDate: "2025-02-01",
    piDate: "2025-01-29",
    invoiceDate: "2025-02-02",
    mobileNo: "01977777777",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-29"),
    draftedAt: null,
    updatedAt: new Date("2025-02-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    documentNo: "DOC-1008",
    piNo: "PI-2008",
    invoiceNo: "INV-3008",
    orderBy: "Prime Logistics",
    shipmentType: "Sea",
    documentDate: "2025-02-05",
    piDate: "2025-02-03",
    invoiceDate: "2025-02-06",
    mobileNo: "01488888888",
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
    documentNo: "DOC-1009",
    piNo: "PI-2009",
    invoiceNo: "INV-3009",
    orderBy: "City Mart",
    shipmentType: "Courier",
    documentDate: "2025-02-08",
    piDate: "2025-02-06",
    invoiceDate: "2025-02-09",
    mobileNo: "01899999999",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-06"),
    draftedAt: null,
    updatedAt: new Date("2025-02-09"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    documentNo: "DOC-1010",
    piNo: "PI-2010",
    invoiceNo: "INV-3010",
    orderBy: "Skyline Enterprises",
    shipmentType: "Air",
    documentDate: "2025-02-12",
    piDate: "2025-02-10",
    invoiceDate: "2025-02-13",
    mobileNo: "01710101010",
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
    documentNo: "DOC-1011",
    piNo: "PI-2011",
    invoiceNo: "INV-3011",
    orderBy: "Global Exporters",
    shipmentType: "Sea",
    documentDate: "2025-02-15",
    piDate: "2025-02-13",
    invoiceDate: "2025-02-16",
    mobileNo: "01611112222",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-13"),
    draftedAt: null,
    updatedAt: new Date("2025-02-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    documentNo: "DOC-1012",
    piNo: "PI-2012",
    invoiceNo: "INV-3012",
    orderBy: "NextGen Supplies",
    shipmentType: "Courier",
    documentDate: "2025-02-18",
    piDate: "2025-02-16",
    invoiceDate: "2025-02-19",
    mobileNo: "01912121212",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-02-16"),
    draftedAt: new Date("2025-02-17"),
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

export default function DocumentsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Documents grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(documentsData);
  const canDelete: boolean = usePermission("documents", "delete");
  const canRestore: boolean = usePermission("documents", "restore");
  const canEdit: boolean = usePermission("documents", "edit");

  // Debug permissions
  console.log("Documents Permissions:", {
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
      documentNo: `Document No ${index + 1}`,
      piNo: `PI No ${index + 1}`,
      invoiceNo: `Invoice No ${index + 1}`,
      orderBy: `Order By ${index + 1}`,
      shipmentType: `Shipment Type ${index + 1}`,
      documentDate: `Document Date ${index + 1}`,
      piDate: `PI Date ${index + 1}`,
      invoiceDate: `Invoice Date ${index + 1}`,
      mobileNo: `Mobile No ${index + 1}`,
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
      item.documentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.piNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shipmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.documentDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.piDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobileNo.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Documents
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
                    onClick={() => navigate(`/documents/1`)}
                  >
                    {item.documentNo}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      PI No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.piNo}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Invoice No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.invoiceNo}
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
                            toastRestore("Document restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Document deleted successfully");
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
                          onClick={() => navigate(`/documents/edit/1`)}
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
                <span className="text-sm">Loading more documents...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more documents to load
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
