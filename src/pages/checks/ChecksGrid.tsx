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

// Check interface
interface CheckItem {
  id: string;
  vendorName: string;
  date: string;
  bankAccount: string;
  amount: string;
  checkNumber: string;
  status: string;
}

// Mock data - replace with real data from your API
const checks: CheckItem[] = [
  {
    id: "1",
    vendorName: "ABC Supply Co.",
    date: "2024-10-15",
    bankAccount: "****1234",
    amount: "$2,500.00",
    checkNumber: "CHK-001",
    status: "Pending",
  },
  {
    id: "2",
    vendorName: "XYZ Services Ltd.",
    date: "2024-10-14",
    bankAccount: "****5678",
    amount: "$1,750.50",
    checkNumber: "CHK-002",
    status: "Approved",
  },
  {
    id: "3",
    vendorName: "Tech Solutions Inc.",
    date: "2024-10-13",
    bankAccount: "****9012",
    amount: "$3,200.75",
    checkNumber: "CHK-003",
    status: "Paid",
  },
  {
    id: "4",
    vendorName: "Office Supplies Plus",
    date: "2024-10-12",
    bankAccount: "****3456",
    amount: "$890.25",
    checkNumber: "CHK-004",
    status: "Rejected",
  },
  {
    id: "5",
    vendorName: "Global Logistics Corp.",
    date: "2024-10-11",
    bankAccount: "****7890",
    amount: "$4,500.00",
    checkNumber: "CHK-005",
    status: "Pending",
  },
  {
    id: "6",
    vendorName: "Marketing Masters",
    date: "2024-10-10",
    bankAccount: "****2345",
    amount: "$1,200.00",
    checkNumber: "CHK-006",
    status: "Approved",
  },
  {
    id: "7",
    vendorName: "Construction Materials LLC",
    date: "2024-10-09",
    bankAccount: "****6789",
    amount: "$7,850.30",
    checkNumber: "CHK-007",
    status: "Paid",
  },
  {
    id: "8",
    vendorName: "Professional Services Group",
    date: "2024-10-08",
    bankAccount: "****0123",
    amount: "$2,100.00",
    checkNumber: "CHK-008",
    status: "Pending",
  },
  {
    id: "9",
    vendorName: "Equipment Rental Co.",
    date: "2024-10-07",
    bankAccount: "****4567",
    amount: "$3,750.00",
    checkNumber: "CHK-009",
    status: "Approved",
  },
  {
    id: "10",
    vendorName: "Catering Services Inc.",
    date: "2024-10-06",
    bankAccount: "****8901",
    amount: "$950.75",
    checkNumber: "CHK-010",
    status: "Paid",
  },
  {
    id: "11",
    vendorName: "IT Support Solutions",
    date: "2024-10-05",
    bankAccount: "****2468",
    amount: "$1,500.00",
    checkNumber: "CHK-011",
    status: "Rejected",
  },
  {
    id: "12",
    vendorName: "Maintenance & Repair LLC",
    date: "2024-10-04",
    bankAccount: "****1357",
    amount: "$2,800.50",
    checkNumber: "CHK-012",
    status: "Pending",
  },
  {
    id: "13",
    vendorName: "Legal Advisory Group",
    date: "2024-10-03",
    bankAccount: "****9753",
    amount: "$5,200.00",
    checkNumber: "CHK-013",
    status: "Approved",
  },
  {
    id: "14",
    vendorName: "Transportation Services",
    date: "2024-10-02",
    bankAccount: "****8642",
    amount: "$1,650.25",
    checkNumber: "CHK-014",
    status: "Paid",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ChecksGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Checks grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [checksData, setChecksData] = useState<CheckItem[]>(checks);
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

    const vendorNames = [
      "Advanced Tech Solutions",
      "Premium Office Supplies",
      "Global Manufacturing Co.",
      "Elite Consulting Group",
      "Modern Equipment Rental",
      "Professional Catering Services",
    ];
    const dates = [
      "2024-10-01",
      "2024-09-30",
      "2024-09-29",
      "2024-09-28",
      "2024-09-27",
      "2024-09-26",
    ];
    const bankAccounts = [
      "****1111",
      "****2222",
      "****3333",
      "****4444",
      "****5555",
      "****6666",
    ];
    const amounts = [
      "$1,200.00",
      "$2,500.50",
      "$3,750.75",
      "$950.25",
      "$4,100.00",
      "$1,850.30",
    ];
    const checkNumbers = [
      "CHK-015",
      "CHK-016",
      "CHK-017",
      "CHK-018",
      "CHK-019",
      "CHK-020",
    ];
    const statuses = ["Pending", "Approved", "Paid", "Rejected"];

    const newItems: CheckItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const vendorName =
          vendorNames[Math.floor(Math.random() * vendorNames.length)];
        const date = dates[Math.floor(Math.random() * dates.length)];
        const bankAccount =
          bankAccounts[Math.floor(Math.random() * bankAccounts.length)];
        const amount = amounts[Math.floor(Math.random() * amounts.length)];
        const checkNumber =
          checkNumbers[Math.floor(Math.random() * checkNumbers.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        return {
          id: `${Date.now()}-${index}`,
          vendorName,
          date,
          bankAccount,
          amount,
          checkNumber,
          status,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (checksData.length >= 46) {
      setHasMore(false);
    } else {
      setChecksData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [checksData.length, isLoading, hasMore]);

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

  // Filter checks based on search query (search across multiple fields)
  const filteredChecks = checksData.filter(
    (item) =>
      item.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bankAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.checkNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (checkId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/checks/view/${checkId}?fromView=${viewMode}`);
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
            {filteredChecks.map((item, index) => {
              const getStatusColor = (status: string) => {
                switch (status.toLowerCase()) {
                  case "paid":
                    return "text-green-600 bg-green-50";
                  case "approved":
                    return "text-blue-600 bg-blue-50";
                  case "pending":
                    return "text-yellow-600 bg-yellow-50";
                  case "rejected":
                    return "text-red-600 bg-red-50";
                  default:
                    return "text-gray-600 bg-gray-50";
                }
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
                  {/* Check Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.vendorName}
                    </CardTitle>
                    <span
                      className={cn(
                        "text-sm font-medium px-2 py-1 rounded",
                        getStatusColor(item.status)
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Check Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Check Number:</span>
                      <span className="truncate text-blue-600 font-semibold">
                        {item.checkNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Date:</span>
                      <span className="truncate">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Amount:</span>
                      <span className="truncate text-green-600 font-semibold">
                        {item.amount}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Bank Account:</span>
                      <span className="truncate">{item.bankAccount}</span>
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
                <span className="text-sm">Loading more checks...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredChecks.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more checks to load
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
                data={checks}
                setFilteredData={setChecksData}
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
                data={checks}
                setFilteredData={setChecksData}
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
