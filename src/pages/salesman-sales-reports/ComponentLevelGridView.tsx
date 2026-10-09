import { Card, CardTitle } from "@/components/ui/card";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";

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

const plansData: GridDataType[] = [
  {
    id: "1",
    invoiceNo: "INV-1001",
    customer: "John Doe",
    subTotal: "1200",
    discount: "100",
    tax: "50",
    netAmount: "1150",
    date: "2025-09-01",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-07"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    invoiceNo: "INV-1002",
    customer: "Jane Smith",
    subTotal: "800",
    discount: "40",
    tax: "20",
    netAmount: "780",
    date: "2025-09-02",
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
    invoiceNo: "INV-1003",
    customer: "Michael Johnson",
    subTotal: "1500",
    discount: "75",
    tax: "60",
    netAmount: "1485",
    date: "2025-09-03",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-15"),
    draftedAt: null,
    updatedAt: new Date("2025-01-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    invoiceNo: "INV-1004",
    customer: "Emily Davis",
    subTotal: "2000",
    discount: "200",
    tax: "100",
    netAmount: "1900",
    date: "2025-09-04",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-22"),
    deletedAt: new Date("2025-02-01"),
    isDeleted: true,
  },
  {
    id: "5",
    invoiceNo: "INV-1005",
    customer: "David Wilson",
    subTotal: "1100",
    discount: "50",
    tax: "30",
    netAmount: "1080",
    date: "2025-09-05",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-05"),
    draftedAt: null,
    updatedAt: new Date("2025-02-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    invoiceNo: "INV-1006",
    customer: "Sophia Brown",
    subTotal: "950",
    discount: "25",
    tax: "20",
    netAmount: "945",
    date: "2025-09-06",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-02-10"),
    draftedAt: new Date("2025-02-11"),
    updatedAt: new Date("2025-02-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    invoiceNo: "INV-1007",
    customer: "James Miller",
    subTotal: "1700",
    discount: "120",
    tax: "80",
    netAmount: "1660",
    date: "2025-09-07",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-12"),
    draftedAt: null,
    updatedAt: new Date("2025-02-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    invoiceNo: "INV-1008",
    customer: "Olivia Martinez",
    subTotal: "600",
    discount: "30",
    tax: "10",
    netAmount: "580",
    date: "2025-09-08",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-18"),
    draftedAt: null,
    updatedAt: new Date("2025-02-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    invoiceNo: "INV-1009",
    customer: "William Anderson",
    subTotal: "1400",
    discount: "100",
    tax: "60",
    netAmount: "1360",
    date: "2025-09-09",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-20"),
    draftedAt: null,
    updatedAt: new Date("2025-02-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    invoiceNo: "INV-1010",
    customer: "Ava Taylor",
    subTotal: "1800",
    discount: "150",
    tax: "90",
    netAmount: "1740",
    date: "2025-09-10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-22"),
    draftedAt: null,
    updatedAt: new Date("2025-02-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    invoiceNo: "INV-1011",
    customer: "Henry Thomas",
    subTotal: "1250",
    discount: "60",
    tax: "40",
    netAmount: "1230",
    date: "2025-09-11",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-25"),
    draftedAt: null,
    updatedAt: new Date("2025-02-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    invoiceNo: "INV-1012",
    customer: "Isabella Moore",
    subTotal: "1600",
    discount: "80",
    tax: "70",
    netAmount: "1590",
    date: "2025-09-12",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-02-28"),
    draftedAt: null,
    updatedAt: new Date("2025-03-01"),
    deletedAt: new Date("2025-03-05"),
    isDeleted: true,
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

  // filter
  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  // get page name
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
                    {item.invoiceNo}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.customer}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Discount
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.discount}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Subtotal
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.subTotal}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Tax
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.tax}
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
