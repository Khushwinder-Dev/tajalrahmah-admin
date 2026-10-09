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

export const plansData: GridDataType[] = [
  {
    id: "1",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-06"),
    deletedAt: null,
    invoiceNumber: "INV-1001",
    customerId: "CUST-001",
    customerName: "Rahim Uddin",
    salesAgent: "Agent A",
    date: "2025-01-05",
    subTotal: "1500",
    discount: "50",
    taxable: "1450",
    tax: "145",
    netTotal: "1595",
  },
  {
    id: "2",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-06"),
    draftedAt: null,
    updatedAt: new Date("2025-01-06"),
    deletedAt: null,
    invoiceNumber: "INV-1002",
    customerId: "CUST-002",
    customerName: "Karim Ali",
    salesAgent: "Agent B",
    date: "2025-01-06",
    subTotal: "2000",
    discount: "100",
    taxable: "1900",
    tax: "190",
    netTotal: "2090",
  },
  {
    id: "3",
    isDefault: false,
    isActive: false,
    isDraft: true,
    isDeleted: false,
    createdAt: new Date("2025-01-07"),
    draftedAt: new Date("2025-01-07"),
    updatedAt: new Date("2025-01-07"),
    deletedAt: null,
    invoiceNumber: "INV-1003",
    customerId: "CUST-003",
    customerName: "Nasrin Jahan",
    salesAgent: "Agent C",
    date: "2025-01-07",
    subTotal: "1200",
    discount: "0",
    taxable: "1200",
    tax: "120",
    netTotal: "1320",
  },
  {
    id: "4",
    isDefault: false,
    isActive: false,
    isDraft: false,
    isDeleted: true,
    createdAt: new Date("2025-01-08"),
    draftedAt: null,
    updatedAt: new Date("2025-01-09"),
    deletedAt: new Date("2025-01-09"),
    invoiceNumber: "INV-1004",
    customerId: "CUST-004",
    customerName: "Mahmudul Hasan",
    salesAgent: "Agent A",
    date: "2025-01-08",
    subTotal: "2500",
    discount: "200",
    taxable: "2300",
    tax: "230",
    netTotal: "2530",
  },
  {
    id: "5",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-09"),
    draftedAt: null,
    updatedAt: new Date("2025-01-09"),
    deletedAt: null,
    invoiceNumber: "INV-1005",
    customerId: "CUST-005",
    customerName: "Sadia Afrin",
    salesAgent: "Agent D",
    date: "2025-01-09",
    subTotal: "3000",
    discount: "150",
    taxable: "2850",
    tax: "285",
    netTotal: "3135",
  },
  {
    id: "6",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-01-12"),
    deletedAt: null,
    invoiceNumber: "INV-1006",
    customerId: "CUST-006",
    customerName: "Imran Hossain",
    salesAgent: "Agent B",
    date: "2025-01-10",
    subTotal: "1800",
    discount: "80",
    taxable: "1720",
    tax: "172",
    netTotal: "1892",
  },
  {
    id: "7",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-11"),
    draftedAt: null,
    updatedAt: new Date("2025-01-11"),
    deletedAt: null,
    invoiceNumber: "INV-1007",
    customerId: "CUST-007",
    customerName: "Rafiq Chowdhury",
    salesAgent: "Agent C",
    date: "2025-01-11",
    subTotal: "2200",
    discount: "100",
    taxable: "2100",
    tax: "210",
    netTotal: "2310",
  },
  {
    id: "8",
    isDefault: false,
    isActive: false,
    isDraft: true,
    isDeleted: false,
    createdAt: new Date("2025-01-12"),
    draftedAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12"),
    deletedAt: null,
    invoiceNumber: "INV-1008",
    customerId: "CUST-008",
    customerName: "Mitu Akter",
    salesAgent: "Agent D",
    date: "2025-01-12",
    subTotal: "1400",
    discount: "50",
    taxable: "1350",
    tax: "135",
    netTotal: "1485",
  },
  {
    id: "9",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-13"),
    draftedAt: null,
    updatedAt: new Date("2025-01-13"),
    deletedAt: null,
    invoiceNumber: "INV-1009",
    customerId: "CUST-009",
    customerName: "Shakil Ahmed",
    salesAgent: "Agent A",
    date: "2025-01-13",
    subTotal: "2700",
    discount: "100",
    taxable: "2600",
    tax: "260",
    netTotal: "2860",
  },
  {
    id: "10",
    isDefault: false,
    isActive: false,
    isDraft: false,
    isDeleted: true,
    createdAt: new Date("2025-01-14"),
    draftedAt: null,
    updatedAt: new Date("2025-01-15"),
    deletedAt: new Date("2025-01-15"),
    invoiceNumber: "INV-1010",
    customerId: "CUST-010",
    customerName: "Tasnim Jahan",
    salesAgent: "Agent B",
    date: "2025-01-14",
    subTotal: "3200",
    discount: "200",
    taxable: "3000",
    tax: "300",
    netTotal: "3300",
  },
  {
    id: "11",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-15"),
    draftedAt: null,
    updatedAt: new Date("2025-01-16"),
    deletedAt: null,
    invoiceNumber: "INV-1011",
    customerId: "CUST-011",
    customerName: "Nusrat Jahan",
    salesAgent: "Agent C",
    date: "2025-01-15",
    subTotal: "2600",
    discount: "150",
    taxable: "2450",
    tax: "245",
    netTotal: "2695",
  },
  {
    id: "12",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-16"),
    draftedAt: null,
    updatedAt: new Date("2025-01-16"),
    deletedAt: null,
    invoiceNumber: "INV-1012",
    customerId: "CUST-012",
    customerName: "Tanvir Islam",
    salesAgent: "Agent D",
    date: "2025-01-16",
    subTotal: "3500",
    discount: "100",
    taxable: "3400",
    tax: "340",
    netTotal: "3740",
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
                    {item.invoiceNumber}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.customerName}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.date}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Sub Total
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.subTotal}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Discount
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.discount}
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
