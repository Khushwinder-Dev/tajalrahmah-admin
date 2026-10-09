import { Card, CardTitle } from "@/components/ui/card";
import { usePermission } from "@/hooks/usePermissions";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";

type GridDataType = {
  customer: string;
  orderNumber: string;
  invoiceNumber: string;
  productOrServiceName: string;
  rate: number;
  quantity: number;
  serialNumber: string;

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

const mockGridData: GridDataType[] = [
  {
    id: "1",
    customer: "Rahim Traders",
    orderNumber: "ORD-1001",
    invoiceNumber: "INV-5001",
    productOrServiceName: "Laptop",
    rate: 65000,
    quantity: 2,
    serialNumber: "SN-ALP-001",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-01"),
    draftedAt: null,
    updatedAt: new Date("2025-01-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    customer: "Karim Electronics",
    orderNumber: "ORD-1002",
    invoiceNumber: "INV-5002",
    productOrServiceName: "Mobile Phone",
    rate: 25000,
    quantity: 5,
    serialNumber: "SN-MBL-002",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-03"),
    draftedAt: null,
    updatedAt: new Date("2025-01-03"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    customer: "Digital World",
    orderNumber: "ORD-1003",
    invoiceNumber: "INV-5003",
    productOrServiceName: "Printer",
    rate: 18000,
    quantity: 3,
    serialNumber: "SN-PRN-003",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-06"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    customer: "Techno Hub",
    orderNumber: "ORD-1004",
    invoiceNumber: "INV-5004",
    productOrServiceName: "Router",
    rate: 4500,
    quantity: 6,
    serialNumber: "SN-RT-004",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-07"),
    draftedAt: null,
    updatedAt: new Date("2025-01-08"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    customer: "Smart Solutions",
    orderNumber: "ORD-1005",
    invoiceNumber: "INV-5005",
    productOrServiceName: "Keyboard",
    rate: 1200,
    quantity: 10,
    serialNumber: "SN-KB-005",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-01-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    customer: "Mega Mart",
    orderNumber: "ORD-1006",
    invoiceNumber: "INV-5006",
    productOrServiceName: "Mouse",
    rate: 800,
    quantity: 15,
    serialNumber: "SN-MS-006",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-12"),
    draftedAt: null,
    updatedAt: new Date("2025-01-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    customer: "Global Tech",
    orderNumber: "ORD-1007",
    invoiceNumber: "INV-5007",
    productOrServiceName: "Monitor",
    rate: 12000,
    quantity: 4,
    serialNumber: "SN-MNT-007",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-14"),
    draftedAt: null,
    updatedAt: new Date("2025-01-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    customer: "BD IT Zone",
    orderNumber: "ORD-1008",
    invoiceNumber: "INV-5008",
    productOrServiceName: "External HDD",
    rate: 7000,
    quantity: 3,
    serialNumber: "SN-HDD-008",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-16"),
    draftedAt: null,
    updatedAt: new Date("2025-01-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    customer: "Electro Point",
    orderNumber: "ORD-1009",
    invoiceNumber: "INV-5009",
    productOrServiceName: "Projector",
    rate: 55000,
    quantity: 1,
    serialNumber: "SN-PJ-009",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-18"),
    draftedAt: null,
    updatedAt: new Date("2025-01-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    customer: "Future Tech",
    orderNumber: "ORD-1010",
    invoiceNumber: "INV-5010",
    productOrServiceName: "Smart Watch",
    rate: 8000,
    quantity: 7,
    serialNumber: "SN-SW-010",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    customer: "Gadget House",
    orderNumber: "ORD-1011",
    invoiceNumber: "INV-5011",
    productOrServiceName: "Tablet",
    rate: 30000,
    quantity: 2,
    serialNumber: "SN-TB-011",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-22"),
    draftedAt: null,
    updatedAt: new Date("2025-01-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    customer: "Tech Valley",
    orderNumber: "ORD-1012",
    invoiceNumber: "INV-5012",
    productOrServiceName: "CCTV Camera",
    rate: 15000,
    quantity: 6,
    serialNumber: "SN-CC-012",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-24"),
    draftedAt: null,
    updatedAt: new Date("2025-01-25"),
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

  const [gridData, setGridData] = useState(mockGridData);
  const canDelete: boolean = usePermission("warrantyInformation", "delete");
  const canRestore: boolean = usePermission("warrantyInformation", "restore");
  const canEdit: boolean = usePermission("warrantyInformation", "edit");

  // Debug permissions
  console.log("warrantyInformation Permissions:", {
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

      customer: `Customer ${index + 1}`,
      orderNumber: `Order Number ${index + 1}`,
      invoiceNumber: `Invoice Number ${index + 1}`,
      productOrServiceName: `Product Or Service Name ${index + 1}`,
      rate: 1000,
      quantity: 1,
      serialNumber: `Serial Number ${index + 1}`,

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

  // Filter leaves based on search query
  const filteredData = gridData.filter(
    (item) =>
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productOrServiceName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Warranty Information
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
                    onClick={() => navigate(`/warranty-information/1`)}
                  >
                    {item.customer}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Order Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.orderNumber}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Invoice Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.invoiceNumber}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Product Or Service Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.productOrServiceName}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-end text-gray-500 dark:text-gray-400">
                      Rate
                    </div>
                    <div className="text-sm font-semibold text-end text-gray-900 dark:text-gray-100 truncate">
                      {item.rate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div className="">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Serial Number
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.serialNumber}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-end text-gray-500 dark:text-gray-400">
                      Quantity
                    </div>
                    <div className="text-sm text-end font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.quantity}
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
                <span className="text-sm">Loading more warranties...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more warranties to load
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
