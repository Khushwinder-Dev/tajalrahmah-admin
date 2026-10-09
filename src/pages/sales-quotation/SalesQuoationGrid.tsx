import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// Define Sales Quotation interface based on the specified data structure
interface SalesQuotation {
  id: string;
  documentNumber: string;
  quotationNumber: string;
  quotationDate: Date;
  customer: string;
  vatNumber: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date;
  country: string;
  state: string;
  city: string;
  remarks: string;
  salesman: string;
  status: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const salesQuotations: SalesQuotation[] = [
  {
    id: "1",
    documentNumber: "SQ001",
    quotationNumber: "QUO-2024-001",
    quotationDate: new Date("2024-01-10"),
    customer: "ABC Trading LLC",
    vatNumber: "VAT-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    remarks: "Product quotation for electronics",
    salesman: "John Smith",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },

  {
    id: "2",
    documentNumber: "SQ002",
    quotationNumber: "QUO-2024-002",
    quotationDate: new Date("2024-01-12"),
    customer: "Global Exports",
    vatNumber: "VAT-2345678901",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: new Date("2024-02-10"),
    country: "UAE",
    state: "Dubai",
    city: "Business Bay",
    remarks: "Bulk order quotation",
    salesman: "Sarah Johnson",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },

  {
    id: "3",
    documentNumber: "SQ003",
    quotationNumber: "QUO-2024-003",
    quotationDate: new Date("2024-01-14"),
    customer: "Sunrise Mart",
    vatNumber: "VAT-3456789012",
    paymentMode: "Cash",
    dueDays: 7,
    paymentDate: new Date("2024-02-05"),
    country: "UAE",
    state: "Abu Dhabi",
    city: "Mussafah",
    remarks: "Retail quotation for food items",
    salesman: "Michael Brown",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    documentNumber: "SQ004",
    quotationNumber: "QUO-2024-004",
    quotationDate: new Date("2024-01-16"),
    customer: "Blue Ocean Foods",
    vatNumber: "VAT-4567890123",
    paymentMode: "Check",
    dueDays: 45,
    paymentDate: new Date("2024-02-20"),
    country: "UAE",
    state: "Sharjah",
    city: "Sharjah City",
    remarks: "Food service quotation",
    salesman: "Emily Davis",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-18"),
    draftedAt: null,
    updatedAt: new Date("2024-01-23"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    documentNumber: "SQ005",
    quotationNumber: "QUO-2024-005",
    quotationDate: new Date("2024-01-18"),
    customer: "Prime Retailers",
    vatNumber: "VAT-5678901234",
    paymentMode: "Wire Transfer",
    dueDays: 60,
    paymentDate: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
    country: "UAE",
    state: "Dubai",
    city: "DIFC",
    remarks: "Corporate quotation for office supplies",
    salesman: "Daniel Wilson",
    status: "Pending",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
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
  setViewMode: (viewMode: "grid" | "list") => void;
};

export default function SalesQuotationGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sales Quotation grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [salesQuotationsData, setSalesQuotationsData] =
    useState(salesQuotations);

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

    const salesmen = [
      "John Smith",
      "Sarah Johnson",
      "Michael Brown",
      "Emily Davis",
      "Daniel Wilson",
    ];
    const customers = [
      "ABC Trading LLC",
      "Global Exports",
      "Sunrise Mart",
      "Blue Ocean Foods",
      "Prime Retailers",
    ];
    const paymentModes = [
      "Bank Transfer",
      "Credit Card",
      "Cash",
      "Check",
      "ACH Transfer",
      "Wire Transfer",
    ];
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
    const states = ["California", "Texas", "Florida", "New York", "Illinois"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const seq = salesQuotationsData.length + index + 1;
      return {
        id: `${Date.now()}-${index}`,
        documentNumber: `SQ${seq.toString().padStart(3, "0")}`,
        quotationNumber: `QUO-2024-${seq.toString().padStart(3, "0")}`,
        quotationDate: new Date(),
        customer: customers[Math.floor(Math.random() * customers.length)],
        vatNumber: `VAT-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        paymentMode:
          paymentModes[Math.floor(Math.random() * paymentModes.length)],
        dueDays: Math.floor(Math.random() * 90) + 1,
        paymentDate: new Date(
          Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
        ),
        country: "UAE",
        state: states[Math.floor(Math.random() * states.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        remarks: `Sales quotation remarks ${seq}`,
        salesman: salesmen[Math.floor(Math.random() * salesmen.length)],
        status: Math.random() > 0.3 ? "Active" : "Pending",
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: Math.random() > 0.7 ? new Date() : null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      } as SalesQuotation;
    });

    if (salesQuotationsData.length >= 46) {
      setHasMore(false);
    } else {
      setSalesQuotationsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [salesQuotationsData.length, isLoading, hasMore]);

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

  // Filter sales quotations based on search query
  const filteredSalesQuotations = salesQuotationsData.filter(
    (salesQuotation) => {
      const q = searchQuery.toLowerCase();
      return (
        salesQuotation.customer.toLowerCase().includes(q) ||
        salesQuotation.documentNumber.toLowerCase().includes(q) ||
        salesQuotation.quotationNumber.toLowerCase().includes(q) ||
        salesQuotation.paymentMode.toLowerCase().includes(q) ||
        salesQuotation.vatNumber.toLowerCase().includes(q) ||
        salesQuotation.salesman.toLowerCase().includes(q) ||
        salesQuotation.city.toLowerCase().includes(q) ||
        salesQuotation.state.toLowerCase().includes(q) ||
        salesQuotation.country.toLowerCase().includes(q) ||
        salesQuotation.remarks.toLowerCase().includes(q)
      );
    }
  );

  const handleViewClick = (salesQuotationId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/sales-quotation/view/${salesQuotationId}?fromView=${viewMode}`);
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
            {filteredSalesQuotations.map((salesQuotation, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(salesQuotation.id)}
              >
                {/* Top Row - Customer and Status */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Customer */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {salesQuotation.customer}
                  </CardTitle>

                  {/* Right - Status Badge */}
                  <div className="flex justify-end">
                    <div
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        salesQuotation.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                      )}
                    >
                      {salesQuotation.status}
                    </div>
                  </div>
                </div>

                {/* Middle Row - Document Number and Sales Invoice Number */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Document Number - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Document No.
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {salesQuotation.documentNumber}
                    </div>
                  </div>

                  {/* Sales Invoice Number - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Sales Invoice No.
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {salesQuotation.quotationNumber}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - P.O Number and P.O Date */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700">
                  {/* P.O Number - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      P.O Number
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {salesQuotation.quotationNumber}
                    </div>
                  </div>

                  {/* Right - P.O Date */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      P.O Date
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {salesQuotation.quotationDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Extra Row - VAT Number and Payment Mode */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* VAT Number - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      VAT Number
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {salesQuotation.vatNumber}
                    </div>
                  </div>
                  {/* Payment Mode - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payment Mode
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {salesQuotation.paymentMode}
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
                <span className="text-sm">Loading more sales returns...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSalesQuotations.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sales returns to load
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
            width: isMobile ? "100%" : "320px",
          }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={salesQuotations}
                setFilteredData={setSalesQuotationsData}
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
            width: isMobile ? "100%" : "320px",
          }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={salesQuotations}
                setFilteredData={setSalesQuotationsData}
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
              isMobile ? "" : "md:hidden",
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
