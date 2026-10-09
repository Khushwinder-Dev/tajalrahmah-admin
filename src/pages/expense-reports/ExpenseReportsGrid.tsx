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

// Expense Report interface
interface ExpenseReportItem {
  id: string;
  customer: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
}

// Mock data - replace with real data from your API
const expenseReports: ExpenseReportItem[] = [
  {
    id: "1",
    customer: "Acme Corporation",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Approved",
    totalAmount: 12500.0,
  },
  {
    id: "2",
    customer: "Tech Solutions Inc",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    status: "Pending",
    totalAmount: 8750.5,
  },
  {
    id: "3",
    customer: "Global Industries",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "Draft",
    totalAmount: 15200.75,
  },
  {
    id: "4",
    customer: "Startup Ventures",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    status: "Approved",
    totalAmount: 6800.25,
  },
  {
    id: "5",
    customer: "Enterprise Systems",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    status: "Rejected",
    totalAmount: 22100.0,
  },
  {
    id: "6",
    customer: "Innovation Labs",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "Approved",
    totalAmount: 9450.8,
  },
  {
    id: "7",
    customer: "Digital Dynamics",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    status: "Pending",
    totalAmount: 11300.4,
  },
  {
    id: "8",
    customer: "Future Technologies",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    status: "Draft",
    totalAmount: 18750.6,
  },
  {
    id: "9",
    customer: "NextGen Solutions",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    status: "Approved",
    totalAmount: 14200.3,
  },
  {
    id: "10",
    customer: "Advanced Systems",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    status: "Pending",
    totalAmount: 16800.9,
  },
  {
    id: "11",
    customer: "Smart Enterprises",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    status: "Approved",
    totalAmount: 20150.7,
  },
  {
    id: "12",
    customer: "Modern Corp",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    status: "Draft",
    totalAmount: 12300.45,
  },
  {
    id: "13",
    customer: "Elite Business",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "Approved",
    totalAmount: 25600.2,
  },
  {
    id: "14",
    customer: "Premium Services",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    status: "Pending",
    totalAmount: 18900.85,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ExpenseReportsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Expense Reports grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [expenseReportsData, setExpenseReportsData] =
    useState<ExpenseReportItem[]>(expenseReports);
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

    const customers = [
      "Acme Corporation",
      "Tech Solutions Inc",
      "Global Industries",
      "Startup Ventures",
      "Enterprise Systems",
      "Innovation Labs",
      "Digital Dynamics",
      "Future Technologies",
      "NextGen Solutions",
      "Advanced Systems",
      "Smart Enterprises",
      "Modern Corp",
      "Elite Business",
      "Premium Services",
      "Dynamic Solutions",
      "Strategic Partners",
      "Visionary Corp",
      "Excellence Inc",
      "Prime Ventures",
      "Ultimate Systems",
    ];
    const statuses = ["Approved", "Pending", "Draft", "Rejected"];
    const startDates = [
      "2024-01-01",
      "2024-02-01",
      "2024-03-01",
      "2024-04-01",
      "2024-05-01",
      "2024-06-01",
      "2024-07-01",
      "2024-08-01",
      "2024-09-01",
      "2024-10-01",
      "2024-11-01",
      "2024-12-01",
      "2025-01-01",
      "2025-02-01",
      "2025-03-01",
      "2025-04-01",
      "2025-05-01",
      "2025-06-01",
      "2025-07-01",
      "2025-08-01",
    ];
    const endDates = [
      "2024-01-31",
      "2024-02-29",
      "2024-03-31",
      "2024-04-30",
      "2024-05-31",
      "2024-06-30",
      "2024-07-31",
      "2024-08-31",
      "2024-09-30",
      "2024-10-31",
      "2024-11-30",
      "2024-12-31",
      "2025-01-31",
      "2025-02-28",
      "2025-03-31",
      "2025-04-30",
      "2025-05-31",
      "2025-06-30",
      "2025-07-31",
      "2025-08-31",
    ];

    const newItems: ExpenseReportItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const customer =
          customers[Math.floor(Math.random() * customers.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const startDate =
          startDates[Math.floor(Math.random() * startDates.length)];
        const endDate = endDates[Math.floor(Math.random() * endDates.length)];
        const totalAmount = Math.random() * 30000 + 5000; // Random amount between 5000 and 35000

        return {
          id: `${Date.now()}-${index}`,
          customer: customer,
          startDate: startDate,
          endDate: endDate,
          status: status,
          totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (expenseReportsData.length >= 46) {
      setHasMore(false);
    } else {
      setExpenseReportsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [expenseReportsData.length, isLoading, hasMore]);

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

  // Filter expense reports based on search query (search across multiple fields)
  const filteredExpenseReports = expenseReportsData.filter(
    (item) =>
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.endDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.totalAmount.toString().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (reportId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/expense-reports/view/${reportId}?fromView=${viewMode}`);
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
            {filteredExpenseReports.map((item, index) => {
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
                  {/* Expense Report Header with Customer */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.customer}
                    </CardTitle>
                  </div>

                  {/* Expense Report Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Start Date:</span>
                      <span className="truncate">{item.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">End Date:</span>
                      <span className="truncate">{item.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <span className="truncate">{item.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Total Amount:</span>
                      <span className="truncate font-mono">
                        ${item.totalAmount.toLocaleString()}
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
                <span className="text-sm">Loading more expense reports...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredExpenseReports.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more expense reports to load
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
                data={expenseReports}
                setFilteredData={setExpenseReportsData}
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
                data={expenseReports}
                setFilteredData={setExpenseReportsData}
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
