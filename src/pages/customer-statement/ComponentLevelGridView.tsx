import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridFilterComponent from "./GridFilterComponent";
import { SearchFunction } from "@/lib/SearchFunction";
import { Autocomplete } from "@/components/common/Autocomplete";

// Updated type for customer data
type GridDataType = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  company: string;
  totalBalance: string;
  lastTransactionDate: string;
  status: string;
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
    customerName: "Ahmed Rahman",
    email: "ahmed.rahman@techsolutions.com",
    phone: "+880 1712-345678",
    company: "Tech Solutions Ltd.",
    totalBalance: "250000.00",
    lastTransactionDate: "2025-09-10",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-15"),
    draftedAt: null,
    updatedAt: new Date("2025-09-10"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    customerName: "Fatima Khatun",
    email: "fatima@digitalmarketingpro.com",
    phone: "+880 1812-987654",
    company: "Digital Marketing Pro",
    totalBalance: "-45000.00",
    lastTransactionDate: "2025-09-08",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-20"),
    draftedAt: null,
    updatedAt: new Date("2025-09-08"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    customerName: "Mohammad Ali",
    email: "m.ali@innovationhub.bd",
    phone: "+880 1912-555123",
    company: "Innovation Hub Bangladesh",
    totalBalance: "180000.00",
    lastTransactionDate: "2025-09-05",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-03-10"),
    draftedAt: null,
    updatedAt: new Date("2025-09-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    customerName: "Sarah Ahmed",
    email: "sarah@creativestudio.com",
    phone: "+880 1612-777888",
    company: "Creative Design Studio",
    totalBalance: "75000.00",
    lastTransactionDate: "2025-09-12",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-04-05"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    customerName: "Rashid Hassan",
    email: "rashid@globalservices.bd",
    phone: "+880 1512-444555",
    company: "Global Services Ltd.",
    totalBalance: "-120000.00",
    lastTransactionDate: "2025-09-01",
    status: "Inactive",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-25"),
    draftedAt: null,
    updatedAt: new Date("2025-09-01"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    customerName: "Nusrat Jahan",
    email: "nusrat@businesspartners.com",
    phone: "+880 1712-222333",
    company: "Business Partners Inc.",
    totalBalance: "320000.00",
    lastTransactionDate: "2025-09-11",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-05-15"),
    draftedAt: null,
    updatedAt: new Date("2025-09-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    customerName: "Karim Uddin",
    email: "karim@smartsolutions.bd",
    phone: "+880 1812-666777",
    company: "Smart Solutions Bangladesh",
    totalBalance: "95000.00",
    lastTransactionDate: "2025-09-09",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-06-20"),
    draftedAt: null,
    updatedAt: new Date("2025-09-09"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    customerName: "Rehana Begum",
    email: "rehana@ecommercepro.com",
    phone: "+880 1912-111222",
    company: "E-commerce Pro",
    totalBalance: "-25000.00",
    lastTransactionDate: "2025-09-06",
    status: "Pending",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: new Date("2025-07-10"),
    draftedAt: new Date("2025-09-06"),
    updatedAt: new Date("2025-09-06"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
};

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
}: Props) {
  const navigate = useNavigate();

  const [gridData, setGridData] = useState(plansData);
  const [customerFilter, setCustomerFilter] = useState("");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Customer options for filter
  const customerOptions = Array.from(
    new Set(plansData.map((item) => item.customerName))
  );

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      ...plansData[index % plansData.length],
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
    const threshold = 100;

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Apply filters
  const searchableKeys: (keyof GridDataType)[] = [
    "customerName",
    "email",
    "company",
    "phone",
  ];
  let filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  // Apply customer filter
  if (customerFilter) {
    filteredData = filteredData.filter((item) =>
      item.customerName.toLowerCase().includes(customerFilter.toLowerCase())
    );
  }

  const PAGE_NAME = "customers";

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Floating Label - Left Top */}
      <div
        className={cn(
          "absolute -top-4 left-6 rtl:left-auto rtl:right-6 py-1 rounded-md z-40 bg-white w-fit"
        )}
      >
        <span
          className={cn(
            "text-md font-semibold tracking-wide capitalize text-gray-600"
          )}
        >
          Total {filteredData.length} {PAGE_NAME}
        </span>
      </div>

      {/* Customer Filter */}
      <div className="mb-4 mt-2">
        <div className="w-64">
          <Autocomplete
            id="customer-filter"
            name="customer"
            allowCustomInput={true}
            options={customerOptions}
            value={customerFilter}
            onValueChange={(value: string) => setCustomerFilter(value)}
            onEnterPress={() => {}}
            placeholder=""
            labelText="Customer"
            className="relative"
            tooltipText="Search customers by name"
            userLang="en"
            styles={{
              input: {
                borderColor: "var(--primary)",
                "&:focus": {
                  borderColor: "var(--primary)",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 p-2">
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200 cursor-pointer"
                onClick={() => navigate(`statements`)}
              >
                {/* Top Row - Customer Name and Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  <CardTitle className="text-lg font-semibold text-primary transition-colors truncate">
                    {item.customerName}
                  </CardTitle>
                  <div className="text-end">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : item.status === "Inactive"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Middle Row - Last Transaction and Balance */}
                <div className="mb-4 pt-2 border-t dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Last Transaction Date */}
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last Transaction
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {item.lastTransactionDate}
                      </div>
                    </div>

                    {/* Balance */}
                    <div className="text-end">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Balance
                      </div>
                      <div
                        className={`text-sm font-semibold truncate ${
                          parseFloat(item.totalBalance) >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        ৳{item.totalBalance}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Company and Phone */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Company */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Company
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.company}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Phone
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.phone}
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

        {/* Filter component */}
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
      </div>
    </div>
  );
}
