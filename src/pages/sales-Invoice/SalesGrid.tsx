import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// Define Invoice interface to ensure type consistency
interface Invoice {
  id: string;
  documentNumber: string;
  invoiceNumber: string;
  invoiceDate: Date;
  customer: string;
  trnNumber: string;
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
const invoices: Invoice[] = [
  {
    id: "1",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    id: "3",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    id: "4",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    id: "5",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    id: "6",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    id: "7",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    id: "8",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
    id: "9",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date("2024-01-15"),
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: new Date("2024-02-14"),
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
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
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
  setViewMode: (viewMode: "grid" | "list") => void;
};

export default function InvoicesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Invoices grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [invoicesData, setInvoicesData] = useState(invoices);

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
      const seq = invoicesData.length + index + 1;
      return {
        id: `${Date.now()}-${index}`,
        documentNumber: `DOC${seq.toString().padStart(3, "0")}`,
        invoiceNumber: `INV-2024-${seq.toString().padStart(3, "0")}`,
        invoiceDate: new Date(),
        customer: customers[Math.floor(Math.random() * customers.length)],
        trnNumber: `TRN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        paymentMode:
          paymentModes[Math.floor(Math.random() * paymentModes.length)],
        dueDays: Math.floor(Math.random() * 90) + 1,
        paymentDate: new Date(
          Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
        ),
        country: "United States",
        state: states[Math.floor(Math.random() * states.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        remarks: `Sales invoice remarks ${seq}`,
        salesman: salesmen[Math.floor(Math.random() * salesmen.length)],
        status: Math.random() > 0.3 ? "Active" : "Pending",
        isActive: Math.random() > 0.3,
        isDraft: Math.random() > 0.7,
        createdAt: new Date(),
        draftedAt: Math.random() > 0.7 ? new Date() : null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      } as Invoice;
    });

    if (invoicesData.length >= 46) {
      setHasMore(false);
    } else {
      setInvoicesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [invoicesData.length, isLoading, hasMore]);

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

  // Filter invoices based on search query
  const filteredInvoices = invoicesData.filter((invoice) => {
    const q = searchQuery.toLowerCase();
    return (
      invoice.customer.toLowerCase().includes(q) ||
      invoice.documentNumber.toLowerCase().includes(q) ||
      invoice.invoiceNumber.toLowerCase().includes(q) ||
      invoice.paymentMode.toLowerCase().includes(q) ||
      invoice.trnNumber.toLowerCase().includes(q) ||
      invoice.salesman.toLowerCase().includes(q) ||
      invoice.city.toLowerCase().includes(q) ||
      invoice.state.toLowerCase().includes(q) ||
      invoice.country.toLowerCase().includes(q) ||
      invoice.remarks.toLowerCase().includes(q)
    );
  });

  const handleViewClick = (invoiceId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/invoices/view/${invoiceId}?fromView=${viewMode}`);
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
            {filteredInvoices.map((invoice, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(invoice.id)}
              >
                {/* Top Row - Customer and Status */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Customer */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {invoice.customer}
                  </CardTitle>

                  {/* Right - Status Badge */}
                  <div className="flex justify-end">
                    <div
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        invoice.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                      )}
                    >
                      {invoice.status}
                    </div>
                  </div>
                </div>

                {/* Middle Row - Document Number and Payment Mode */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Document Number - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Document No.
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {invoice.documentNumber}
                    </div>
                  </div>

                  {/* Payment Mode - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payment Mode
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {invoice.paymentMode}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Invoice Number and Due Days */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700">
                  {/* Invoice Number - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Invoice No.
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {invoice.invoiceNumber}
                    </div>
                  </div>

                  {/* Right - Due Days */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Due Days
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {invoice.dueDays} days
                    </div>
                  </div>
                </div>

                {/* Extra Row - TRN and Invoice Date */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* TRN Number - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      TRN Number
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {invoice.trnNumber}
                    </div>
                  </div>
                  {/* Invoice Date - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Invoice Date
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {invoice.invoiceDate.toLocaleDateString()}
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
                <span className="text-sm">Loading more invoices...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredInvoices.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more invoices to load
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
                data={invoices}
                setFilteredData={setInvoicesData}
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
                data={invoices}
                setFilteredData={setInvoicesData}
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
