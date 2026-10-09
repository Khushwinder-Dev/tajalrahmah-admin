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

// Leaves Application interface
interface LeaveItem {
  id: string;
  branch: string;
  iqamaNo: string;
  leaveType: string;
  fromDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  applicationHardCopy: string;
}

// Mock data - replace with real data from your API
const leaves: LeaveItem[] = [
  {
    id: "1",
    branch: "Main Branch",
    iqamaNo: "2345678901",
    leaveType: "Annual Leave",
    fromDate: "2024-10-15",
    endDate: "2024-10-20",
    totalDays: 5,
    reason: "Family vacation",
    applicationHardCopy: "Yes",
  },
  {
    id: "2",
    branch: "East Branch",
    iqamaNo: "3456789012",
    leaveType: "Sick Leave",
    fromDate: "2024-10-10",
    endDate: "2024-10-12",
    totalDays: 2,
    reason: "Medical treatment",
    applicationHardCopy: "No",
  },
  {
    id: "3",
    branch: "North Branch",
    iqamaNo: "4567890123",
    leaveType: "Emergency Leave",
    fromDate: "2024-10-08",
    endDate: "2024-10-09",
    totalDays: 1,
    reason: "Family emergency",
    applicationHardCopy: "Yes",
  },
  {
    id: "4",
    branch: "West Branch",
    iqamaNo: "5678901234",
    leaveType: "Maternity Leave",
    fromDate: "2024-10-01",
    endDate: "2024-12-01",
    totalDays: 60,
    reason: "Maternity",
    applicationHardCopy: "Yes",
  },
  {
    id: "5",
    branch: "South Branch",
    iqamaNo: "6789012345",
    leaveType: "Study Leave",
    fromDate: "2024-11-01",
    endDate: "2024-11-05",
    totalDays: 4,
    reason: "Professional training",
    applicationHardCopy: "No",
  },
  {
    id: "6",
    branch: "Main Branch",
    iqamaNo: "7890123456",
    leaveType: "Personal Leave",
    fromDate: "2024-10-20",
    endDate: "2024-10-22",
    totalDays: 2,
    reason: "Personal matters",
    applicationHardCopy: "Yes",
  },
  {
    id: "7",
    branch: "East Branch",
    iqamaNo: "8901234567",
    leaveType: "Annual Leave",
    fromDate: "2024-11-10",
    endDate: "2024-11-15",
    totalDays: 5,
    reason: "Travel",
    applicationHardCopy: "No",
  },
  {
    id: "8",
    branch: "North Branch",
    iqamaNo: "9012345678",
    leaveType: "Sick Leave",
    fromDate: "2024-10-25",
    endDate: "2024-10-27",
    totalDays: 2,
    reason: "Medical checkup",
    applicationHardCopy: "Yes",
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

    const branches = [
      "Main Branch",
      "East Branch",
      "West Branch",
      "North Branch",
      "South Branch",
    ];
    const leaveTypes = [
      "Annual Leave",
      "Sick Leave",
      "Maternity Leave",
      "Paternity Leave",
      "Emergency Leave",
      "Study Leave",
      "Bereavement Leave",
      "Personal Leave",
    ];
    const reasons = [
      "Family vacation",
      "Medical treatment",
      "Family emergency",
      "Maternity",
      "Professional training",
      "Personal matters",
      "Travel",
      "Medical checkup",
    ];
    const hardCopyOptions = ["Yes", "No"];

    const newItems: LeaveItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const branch = branches[Math.floor(Math.random() * branches.length)];
        const leaveType =
          leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        const hardCopy =
          hardCopyOptions[Math.floor(Math.random() * hardCopyOptions.length)];
        const totalDays = Math.floor(Math.random() * 14) + 1;
        const iqamaNo = `${
          Math.floor(Math.random() * 9000000000) + 1000000000
        }`;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + totalDays);

        return {
          id: `${Date.now()}-${index}`,
          branch,
          iqamaNo,
          leaveType,
          fromDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          totalDays,
          reason,
          applicationHardCopy: hardCopy,
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
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.iqamaNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.applicationHardCopy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (leaveId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/leaves/view/${leaveId}?fromView=${viewMode}`);
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
                  {/* Leave Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.leaveType}
                    </CardTitle>
                  </div>

                  {/* Leave Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Branch:</span>
                      <span className="truncate">{item.branch}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Iqama No:</span>
                      <span>{item.iqamaNo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">From Date:</span>
                      <span>{item.fromDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">End Date:</span>
                      <span>{item.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Total Days:</span>
                      <span>{item.totalDays}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Reason:</span>
                      <span className="truncate">{item.reason}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Hard Copy:</span>
                      <span>{item.applicationHardCopy}</span>
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
                <span className="text-sm">Loading more leaves...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLeaves.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more leaves to load
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
