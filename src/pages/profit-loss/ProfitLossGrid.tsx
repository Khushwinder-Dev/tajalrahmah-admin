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

// Profit Loss interface
interface ProfitLossItem {
  id: string;
  branch: string;
  month: string;
  particulars: string;
  debit: number;
  credit: number;
  status: string;
}

// Mock data - replace with real data from your API
const profitLossData: ProfitLossItem[] = [
  {
    id: "1",
    branch: "Main Branch",
    month: "January 2024",
    particulars: "Sales Revenue",
    debit: 0,
    credit: 150000,
    status: "Active",
  },
  {
    id: "2",
    branch: "Downtown Branch",
    month: "January 2024",
    particulars: "Cost of Goods Sold",
    debit: 85000,
    credit: 0,
    status: "Active",
  },
  {
    id: "3",
    branch: "Main Branch",
    month: "February 2024",
    particulars: "Operating Expenses",
    debit: 25000,
    credit: 0,
    status: "Active",
  },
  {
    id: "4",
    branch: "North Branch",
    month: "February 2024",
    particulars: "Sales Revenue",
    debit: 0,
    credit: 120000,
    status: "Active",
  },
  {
    id: "5",
    branch: "Downtown Branch",
    month: "March 2024",
    particulars: "Rental Income",
    debit: 0,
    credit: 45000,
    status: "Active",
  },
  {
    id: "6",
    branch: "Main Branch",
    month: "March 2024",
    particulars: "Salaries & Wages",
    debit: 60000,
    credit: 0,
    status: "Active",
  },
  {
    id: "7",
    branch: "North Branch",
    month: "April 2024",
    particulars: "Utilities Expense",
    debit: 8500,
    credit: 0,
    status: "Active",
  },
  {
    id: "8",
    branch: "Downtown Branch",
    month: "April 2024",
    particulars: "Interest Income",
    debit: 0,
    credit: 3200,
    status: "Active",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ProfitLossGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Profit Loss grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [profitLossEntries, setProfitLossEntries] =
    useState<ProfitLossItem[]>(profitLossData);
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

    const branches = [
      "Main Branch",
      "Downtown Branch",
      "North Branch",
      "South Branch",
      "East Branch",
      "West Branch",
    ];
    const months = [
      "January 2024",
      "February 2024",
      "March 2024",
      "April 2024",
      "May 2024",
      "June 2024",
      "July 2024",
      "August 2024",
      "September 2024",
      "October 2024",
      "November 2024",
      "December 2024",
    ];
    const particulars = [
      "Sales Revenue",
      "Cost of Goods Sold",
      "Operating Expenses",
      "Rental Income",
      "Salaries & Wages",
      "Utilities Expense",
      "Interest Income",
      "Depreciation",
      "Marketing Expenses",
      "Insurance",
      "Tax Expense",
      "Miscellaneous Income",
    ];
    const statuses = ["Active", "Pending", "Draft", "Completed"];

    const newItems: ProfitLossItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const branch = branches[Math.floor(Math.random() * branches.length)];
        const month = months[Math.floor(Math.random() * months.length)];
        const particular =
          particulars[Math.floor(Math.random() * particulars.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const isDebit = Math.random() > 0.5;
        const debit = isDebit ? Math.floor(Math.random() * 100000) + 1000 : 0;
        const credit = !isDebit ? Math.floor(Math.random() * 100000) + 1000 : 0;

        return {
          id: `${Date.now()}-${index}`,
          branch: `${branch}`,
          month,
          particulars: particular,
          debit,
          credit,
          status,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (profitLossEntries.length >= 46) {
      setHasMore(false);
    } else {
      setProfitLossEntries((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [profitLossEntries.length, isLoading, hasMore]);

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

  // Filter profit loss based on search query (search across multiple fields)
  const filteredProfitLoss = profitLossEntries.filter(
    (item) =>
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.particulars.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (profitLossId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/profit-loss/view/${profitLossId}?fromView=${viewMode}`);
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
            {filteredProfitLoss.map((item, index) => {
              const statusColors = {
                Active:
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                Pending:
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                Draft:
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                Completed:
                  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
              };

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
                  {/* Profit Loss Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.particulars}
                    </CardTitle>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        statusColors[item.status as keyof typeof statusColors]
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Profit Loss Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Branch:</span>
                      <span className="truncate">{item.branch}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Month:</span>
                      <span className="truncate">{item.month}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Debit:</span>
                      <span className="truncate text-red-600 font-semibold">
                        ${item.debit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Credit:</span>
                      <span className="truncate text-green-600 font-semibold">
                        ${item.credit.toLocaleString()}
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
                <span className="text-sm">
                  Loading more profit loss entries...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredProfitLoss.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more profit loss entries to load
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
                data={profitLossData}
                setFilteredData={setProfitLossEntries}
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
                data={profitLossData}
                setFilteredData={setProfitLossEntries}
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
