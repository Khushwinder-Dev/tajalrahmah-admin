import { Card, CardTitle } from "@/components/ui/card";
// import { toastDelete, toastRestore } from "@/lib/toast";
// import { Tooltip } from "@mantine/core";
// import { RefreshCw, Trash2, Check, Pause } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { Shield, User, Crown } from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Payment interface
interface PaymentItem {
  id: string;
  code: string;
  invoiceType: string;
  currency: string;
  paymentTerms: string;
  dueDays: number;
  totalAmount: number;
  containerAmount: number;
  typeOfDeposit: string;
  depositAmount: number;
  depositDate: string;
  exchangeRate: number;
  localAmount: number;
}

// Mock data - replace with real data from your API
const payments: PaymentItem[] = [
  {
    id: "1",
    code: "PAY-001",
    invoiceType: "Commercial Invoice",
    currency: "USD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 15000.0,
    containerAmount: 12000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 3000.0,
    depositDate: "2024-01-15",
    exchangeRate: 1.0,
    localAmount: 15000.0,
  },
  {
    id: "2",
    code: "PAY-002",
    invoiceType: "Proforma Invoice",
    currency: "EUR",
    paymentTerms: "Net 15",
    dueDays: 15,
    totalAmount: 25000.0,
    containerAmount: 20000.0,
    typeOfDeposit: "Credit Card",
    depositAmount: 5000.0,
    depositDate: "2024-01-20",
    exchangeRate: 0.85,
    localAmount: 21250.0,
  },
  {
    id: "3",
    code: "PAY-003",
    invoiceType: "Commercial Invoice",
    currency: "GBP",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 18000.0,
    containerAmount: 15000.0,
    typeOfDeposit: "Wire Transfer",
    depositAmount: 3000.0,
    depositDate: "2024-01-25",
    exchangeRate: 0.79,
    localAmount: 14220.0,
  },
  {
    id: "4",
    code: "PAY-004",
    invoiceType: "Proforma Invoice",
    currency: "JPY",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 2000000.0,
    containerAmount: 1800000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 200000.0,
    depositDate: "2024-02-01",
    exchangeRate: 110.5,
    localAmount: 18099.55,
  },
  {
    id: "5",
    code: "PAY-005",
    invoiceType: "Commercial Invoice",
    currency: "CAD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 22000.0,
    containerAmount: 19000.0,
    typeOfDeposit: "Check",
    depositAmount: 3000.0,
    depositDate: "2024-02-05",
    exchangeRate: 1.35,
    localAmount: 16296.3,
  },
  {
    id: "6",
    code: "PAY-006",
    invoiceType: "Proforma Invoice",
    currency: "AUD",
    paymentTerms: "Net 20",
    dueDays: 20,
    totalAmount: 32000.0,
    containerAmount: 28000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 4000.0,
    depositDate: "2024-02-10",
    exchangeRate: 1.52,
    localAmount: 21052.63,
  },
  {
    id: "7",
    code: "PAY-007",
    invoiceType: "Commercial Invoice",
    currency: "CHF",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 28000.0,
    containerAmount: 24000.0,
    typeOfDeposit: "Wire Transfer",
    depositAmount: 4000.0,
    depositDate: "2024-02-15",
    exchangeRate: 0.88,
    localAmount: 24640.0,
  },
  {
    id: "8",
    code: "PAY-008",
    invoiceType: "Proforma Invoice",
    currency: "CNY",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 150000.0,
    containerAmount: 130000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 20000.0,
    depositDate: "2024-02-20",
    exchangeRate: 7.2,
    localAmount: 20833.33,
  },
  {
    id: "9",
    code: "PAY-009",
    invoiceType: "Commercial Invoice",
    currency: "INR",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 1200000.0,
    containerAmount: 1000000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 200000.0,
    depositDate: "2024-02-25",
    exchangeRate: 83.0,
    localAmount: 14457.83,
  },
  {
    id: "10",
    code: "PAY-010",
    invoiceType: "Proforma Invoice",
    currency: "BRL",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 85000.0,
    containerAmount: 75000.0,
    typeOfDeposit: "Credit Card",
    depositAmount: 10000.0,
    depositDate: "2024-03-01",
    exchangeRate: 5.2,
    localAmount: 16346.15,
  },
  {
    id: "11",
    code: "PAY-011",
    invoiceType: "Commercial Invoice",
    currency: "MXN",
    paymentTerms: "Net 15",
    dueDays: 15,
    totalAmount: 450000.0,
    containerAmount: 400000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 50000.0,
    depositDate: "2024-03-05",
    exchangeRate: 17.5,
    localAmount: 25714.29,
  },
  {
    id: "12",
    code: "PAY-012",
    invoiceType: "Proforma Invoice",
    currency: "KRW",
    paymentTerms: "Net 20",
    dueDays: 20,
    totalAmount: 35000000.0,
    containerAmount: 30000000.0,
    typeOfDeposit: "Wire Transfer",
    depositAmount: 5000000.0,
    depositDate: "2024-03-10",
    exchangeRate: 1300.0,
    localAmount: 26923.08,
  },
  {
    id: "13",
    code: "PAY-013",
    invoiceType: "Commercial Invoice",
    currency: "SGD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 35000.0,
    containerAmount: 30000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 5000.0,
    depositDate: "2024-03-15",
    exchangeRate: 1.35,
    localAmount: 25925.93,
  },
  {
    id: "14",
    code: "PAY-014",
    invoiceType: "Proforma Invoice",
    currency: "HKD",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 180000.0,
    containerAmount: 160000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 20000.0,
    depositDate: "2024-03-20",
    exchangeRate: 7.8,
    localAmount: 23076.92,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function PaymentGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Payment grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [paymentsData, setPaymentsData] = useState<PaymentItem[]>(payments);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

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

    const codes = [
      "PAY-015",
      "PAY-016",
      "PAY-017",
      "PAY-018",
      "PAY-019",
      "PAY-020",
      "PAY-021",
      "PAY-022",
      "PAY-023",
      "PAY-024",
    ];
    const invoiceTypes = [
      "Commercial Invoice",
      "Proforma Invoice",
      "Commercial Invoice",
      "Proforma Invoice",
      "Commercial Invoice",
      "Proforma Invoice",
      "Commercial Invoice",
      "Proforma Invoice",
      "Commercial Invoice",
      "Proforma Invoice",
    ];
    const currencies = [
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "CAD",
      "AUD",
      "CHF",
      "CNY",
      "INR",
      "BRL",
    ];
    const paymentTermsList = [
      "Net 30",
      "Net 15",
      "Net 45",
      "Net 60",
      "Net 20",
      "Net 30",
      "Net 15",
      "Net 45",
      "Net 60",
      "Net 20",
    ];
    const dueDaysList = [30, 15, 45, 60, 20, 30, 15, 45, 60, 20];
    const totalAmounts = [
      15000, 25000, 18000, 2000000, 22000, 32000, 28000, 150000, 1200000, 85000,
    ];
    const containerAmounts = [
      12000, 20000, 15000, 1800000, 19000, 28000, 24000, 130000, 1000000, 75000,
    ];
    const typeOfDeposits = [
      "Bank Transfer",
      "Credit Card",
      "Wire Transfer",
      "Bank Transfer",
      "Check",
      "Bank Transfer",
      "Wire Transfer",
      "Bank Transfer",
      "Bank Transfer",
      "Credit Card",
    ];
    const depositAmounts = [
      3000, 5000, 3000, 200000, 3000, 4000, 4000, 20000, 200000, 10000,
    ];
    const depositDates = [
      "2024-03-25",
      "2024-03-30",
      "2024-04-05",
      "2024-04-10",
      "2024-04-15",
      "2024-04-20",
      "2024-04-25",
      "2024-04-30",
      "2024-05-05",
      "2024-05-10",
    ];
    const exchangeRates = [
      1.0, 0.85, 0.79, 110.5, 1.35, 1.52, 0.88, 7.2, 83.0, 5.2,
    ];
    const localAmounts = [
      15000, 21250, 14220, 18099.55, 16296.3, 21052.63, 24640, 20833.33,
      14457.83, 16346.15,
    ];

    const newItems: PaymentItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const invoiceType =
          invoiceTypes[Math.floor(Math.random() * invoiceTypes.length)];
        const currency =
          currencies[Math.floor(Math.random() * currencies.length)];
        const paymentTerms =
          paymentTermsList[Math.floor(Math.random() * paymentTermsList.length)];
        const dueDays =
          dueDaysList[Math.floor(Math.random() * dueDaysList.length)];
        const totalAmount =
          totalAmounts[Math.floor(Math.random() * totalAmounts.length)];
        const containerAmount =
          containerAmounts[Math.floor(Math.random() * containerAmounts.length)];
        const typeOfDeposit =
          typeOfDeposits[Math.floor(Math.random() * typeOfDeposits.length)];
        const depositAmount =
          depositAmounts[Math.floor(Math.random() * depositAmounts.length)];
        const depositDate =
          depositDates[Math.floor(Math.random() * depositDates.length)];
        const exchangeRate =
          exchangeRates[Math.floor(Math.random() * exchangeRates.length)];
        const localAmount =
          localAmounts[Math.floor(Math.random() * localAmounts.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          invoiceType,
          currency,
          paymentTerms,
          dueDays,
          totalAmount,
          containerAmount,
          typeOfDeposit,
          depositAmount,
          depositDate,
          exchangeRate,
          localAmount,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (paymentsData.length >= 46) {
      setHasMore(false);
    } else {
      setPaymentsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [paymentsData.length, isLoading, hasMore]);

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

  // Filter payments based on search query (search across multiple fields)
  const filteredPayments = paymentsData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paymentTerms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dueDays.toString().includes(searchQuery.toLowerCase()) ||
      item.totalAmount.toString().includes(searchQuery.toLowerCase()) ||
      item.containerAmount.toString().includes(searchQuery.toLowerCase()) ||
      item.typeOfDeposit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.depositAmount.toString().includes(searchQuery.toLowerCase()) ||
      item.depositDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exchangeRate.toString().includes(searchQuery.toLowerCase()) ||
      item.localAmount.toString().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (paymentId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/payment/view/${paymentId}?fromView=${viewMode}`);
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
            {filteredPayments.map((item, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(item.id)}
                >
                  {/* Payment Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.invoiceType}
                    </CardTitle>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Currency:</span>
                      <span className="truncate">{item.currency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Payment Terms:</span>
                      <span className="truncate">{item.paymentTerms}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Due Days:</span>
                      <span className="truncate">{item.dueDays}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Total Amount:</span>
                      <span className="truncate">
                        {item.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Container Amount:</span>
                      <span className="truncate">
                        {item.containerAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Type of Deposit:</span>
                      <span className="truncate">{item.typeOfDeposit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Deposit Amount:</span>
                      <span className="truncate">
                        {item.depositAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Deposit Date:</span>
                      <span className="truncate">{item.depositDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Exchange Rate:</span>
                      <span className="truncate">{item.exchangeRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Local Amount:</span>
                      <span className="truncate">
                        {item.localAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more payments...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredPayments.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more payments to load
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
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={payments}
                setFilteredData={setPaymentsData}
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
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={payments}
                setFilteredData={setPaymentsData}
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
              isMobile ? "" : "md:hidden", // Always show overlay on mobile
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
