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

// Leaves Approval interface
interface LeaveItem {
  id: string;
  leaveType: string;
  branch: string;
  employee: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
  hardCopy: boolean;
  approvedBy: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Mock data - replace with real data from your API
const leaves: LeaveItem[] = [
  {
    id: "1",
    leaveType: "Annual Leave",
    branch: "Main Branch",
    employee: "John Doe",
    fromDate: "2025-10-10",
    endDate: "2025-10-15",
    totalDays: 5,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Approved",
  },
  {
    id: "2",
    leaveType: "Sick Leave",
    branch: "Branch B",
    employee: "Jane Smith",
    fromDate: "2025-10-08",
    endDate: "2025-10-09",
    totalDays: 2,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Pending",
  },
  {
    id: "3",
    leaveType: "Maternity Leave",
    branch: "Main Branch",
    employee: "Sarah Johnson",
    fromDate: "2025-10-20",
    endDate: "2025-12-20",
    totalDays: 60,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Approved",
  },
  {
    id: "4",
    leaveType: "Paternity Leave",
    branch: "Branch C",
    employee: "Mike Wilson",
    fromDate: "2025-10-15",
    endDate: "2025-10-22",
    totalDays: 7,
    hardCopy: true,
    approvedBy: "Manager C",
    status: "Approved",
  },
  {
    id: "5",
    leaveType: "Emergency Leave",
    branch: "Branch B",
    employee: "Emily Brown",
    fromDate: "2025-10-07",
    endDate: "2025-10-08",
    totalDays: 1,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Rejected",
  },
  {
    id: "6",
    leaveType: "Study Leave",
    branch: "Main Branch",
    employee: "David Lee",
    fromDate: "2025-11-01",
    endDate: "2025-11-10",
    totalDays: 10,
    hardCopy: true,
    approvedBy: "Manager A",
    status: "Pending",
  },
  {
    id: "7",
    leaveType: "Bereavement Leave",
    branch: "Branch C",
    employee: "Lisa Chen",
    fromDate: "2025-10-12",
    endDate: "2025-10-14",
    totalDays: 3,
    hardCopy: true,
    approvedBy: "Manager C",
    status: "Approved",
  },
  {
    id: "8",
    leaveType: "Personal Leave",
    branch: "Branch B",
    employee: "Tom Anderson",
    fromDate: "2025-10-25",
    endDate: "2025-10-26",
    totalDays: 2,
    hardCopy: false,
    approvedBy: "Manager B",
    status: "Pending",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function LeavesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Leaves grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [leavesData, setLeavesData] = useState<LeaveItem[]>(leaves);
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

    const leaveTypes = [
      "Annual Leave",
      "Sick Leave",
      "Maternity Leave",
      "Paternity Leave",
      "Emergency Leave",
      "Study Leave",
      "Bereavement Leave",
      "Personal Leave",
      "Compensatory Leave",
      "Unpaid Leave",
    ];
    const branches = [
      "Main Branch",
      "Branch A",
      "Branch B",
      "Branch C",
      "Branch D",
    ];
    const employees = [
      "John Doe",
      "Jane Smith",
      "Sarah Johnson",
      "Mike Wilson",
      "Emily Brown",
      "David Lee",
      "Lisa Chen",
      "Tom Anderson",
    ];
    const managers = ["Manager A", "Manager B", "Manager C", "Manager D"];
    const statuses: ("Pending" | "Approved" | "Rejected")[] = [
      "Pending",
      "Approved",
      "Rejected",
    ];

    const newItems: LeaveItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const leaveType =
          leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
        const branch = branches[Math.floor(Math.random() * branches.length)];
        const employee =
          employees[Math.floor(Math.random() * employees.length)];
        const manager = managers[Math.floor(Math.random() * managers.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const totalDays = Math.floor(Math.random() * 30) + 1;
        const hardCopy = Math.random() > 0.5;

        return {
          id: `${Date.now()}-${index}`,
          leaveType,
          branch,
          employee,
          fromDate: "2025-10-10",
          endDate: "2025-10-15",
          totalDays,
          hardCopy,
          approvedBy: manager,
          status,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (leavesData.length >= 46) {
      setHasMore(false);
    } else {
      setLeavesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [leavesData.length, isLoading, hasMore]);

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

  // Filter leaves based on search query (search across multiple fields)
  const filteredLeaves = leavesData.filter(
    (item) =>
      item.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.approvedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (leaveId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/leaves-approval/view/${leaveId}?fromView=${viewMode}`);
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
            {filteredLeaves.map((item, index) => {
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
                  {/* Leave Header with Status Badge */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.leaveType}
                    </CardTitle>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        item.status === "Approved" &&
                          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                        item.status === "Pending" &&
                          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
                        item.status === "Rejected" &&
                          "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Leave Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Employee:</span>
                      <span className="truncate">{item.employee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Branch:</span>
                      <span className="truncate">{item.branch}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Duration:</span>
                      <span>
                        {item.fromDate} - {item.endDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Total Days:</span>
                        <span>{item.totalDays}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Hard Copy:</span>
                        <span>{item.hardCopy ? "Yes" : "No"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Approved By:</span>
                      <span className="truncate">{item.approvedBy}</span>
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
                <span className="text-sm">Loading more leave approvals...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLeaves.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more leave approvals to load
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
                data={leaves}
                setFilteredData={setLeavesData}
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
                data={leaves}
                setFilteredData={setLeavesData}
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
