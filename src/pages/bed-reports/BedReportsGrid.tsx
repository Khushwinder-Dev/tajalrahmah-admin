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

// Bed Transfer interface
interface BedTransferItem {
  id: string;
  patientId: string;
  roomName: string;
  bedNumber: string;
  charge: number;
  assignDate: string;
  dischargeDate: string;
  description: string;
}

// Mock data - replace with real data from your API
const bedTransfers: BedTransferItem[] = [
  {
    id: "1",
    patientId: "PT-001",
    roomName: "ICU-A",
    bedNumber: "B-101",
    charge: 2500.0,
    assignDate: "2024-01-01",
    dischargeDate: "2024-01-05",
    description: "Critical care patient",
  },
  {
    id: "2",
    patientId: "PT-002",
    roomName: "Ward-B",
    bedNumber: "B-205",
    charge: 1200.5,
    assignDate: "2024-02-01",
    dischargeDate: "2024-02-10",
    description: "Post-operative recovery",
  },
  {
    id: "3",
    patientId: "PT-003",
    roomName: "Private-101",
    bedNumber: "B-301",
    charge: 3500.75,
    assignDate: "2024-03-01",
    dischargeDate: "2024-03-07",
    description: "VIP patient - private room",
  },
  {
    id: "4",
    patientId: "PT-004",
    roomName: "General-A",
    bedNumber: "B-102",
    charge: 800.25,
    assignDate: "2024-04-01",
    dischargeDate: "2024-04-08",
    description: "General admission",
  },
  {
    id: "5",
    patientId: "PT-005",
    roomName: "ICU-B",
    bedNumber: "B-103",
    charge: 4200.0,
    assignDate: "2024-05-01",
    dischargeDate: "2024-05-15",
    description: "Emergency admission",
  },
  {
    id: "6",
    patientId: "PT-006",
    roomName: "Ward-C",
    bedNumber: "B-206",
    charge: 1450.8,
    assignDate: "2024-06-01",
    dischargeDate: "2024-06-12",
    description: "Observation and treatment",
  },
  {
    id: "7",
    patientId: "PT-007",
    roomName: "Private-102",
    bedNumber: "B-302",
    charge: 3300.4,
    assignDate: "2024-07-01",
    dischargeDate: "2024-07-09",
    description: "Private suite - extended stay",
  },
  {
    id: "8",
    patientId: "PT-008",
    roomName: "General-B",
    bedNumber: "B-104",
    charge: 950.6,
    assignDate: "2024-08-01",
    dischargeDate: "2024-08-06",
    description: "Standard care",
  },
  {
    id: "9",
    patientId: "PT-009",
    roomName: "ICU-C",
    bedNumber: "B-105",
    charge: 2800.3,
    assignDate: "2024-09-01",
    dischargeDate: "2024-09-10",
    description: "Intensive monitoring",
  },
  {
    id: "10",
    patientId: "PT-010",
    roomName: "Ward-A",
    bedNumber: "B-207",
    charge: 1100.9,
    assignDate: "2024-10-01",
    dischargeDate: "2024-10-11",
    description: "Recovery ward",
  },
  {
    id: "11",
    patientId: "PT-011",
    roomName: "Private-103",
    bedNumber: "B-303",
    charge: 3800.7,
    assignDate: "2024-11-01",
    dischargeDate: "2024-11-08",
    description: "Executive suite",
  },
  {
    id: "12",
    patientId: "PT-012",
    roomName: "General-C",
    bedNumber: "B-106",
    charge: 750.45,
    assignDate: "2024-12-01",
    dischargeDate: "2024-12-05",
    description: "Short-term care",
  },
  {
    id: "13",
    patientId: "PT-013",
    roomName: "ICU-D",
    bedNumber: "B-107",
    charge: 5200.2,
    assignDate: "2025-01-01",
    dischargeDate: "2025-01-20",
    description: "Critical condition - extended ICU",
  },
  {
    id: "14",
    patientId: "PT-014",
    roomName: "Ward-D",
    bedNumber: "B-208",
    charge: 1350.85,
    assignDate: "2025-02-01",
    dischargeDate: "2025-02-14",
    description: "Post-surgical care",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function BedTransferGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Bed Transfer grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [bedTransfersData, setBedTransfersData] =
    useState<BedTransferItem[]>(bedTransfers);
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

    const patientIds = [
      "PT-015",
      "PT-016",
      "PT-017",
      "PT-018",
      "PT-019",
      "PT-020",
      "PT-021",
      "PT-022",
      "PT-023",
      "PT-024",
    ];
    const roomNames = [
      "ICU-A",
      "ICU-B",
      "ICU-C",
      "Ward-A",
      "Ward-B",
      "Ward-C",
      "Private-101",
      "Private-102",
      "General-A",
      "General-B",
    ];
    const bedNumbers = [
      "B-101",
      "B-102",
      "B-103",
      "B-201",
      "B-202",
      "B-301",
      "B-302",
      "B-401",
    ];
    const descriptions = [
      "Critical care patient",
      "Post-operative recovery",
      "General admission",
      "Emergency admission",
      "Observation and treatment",
      "Standard care",
      "Intensive monitoring",
      "Recovery ward",
    ];
    const assignDates = [
      "2024-01-01",
      "2024-02-01",
      "2024-03-01",
      "2024-04-01",
      "2024-05-01",
      "2024-06-01",
      "2024-07-01",
      "2024-08-01",
    ];
    const dischargeDates = [
      "2024-01-10",
      "2024-02-15",
      "2024-03-12",
      "2024-04-18",
      "2024-05-20",
      "2024-06-14",
      "2024-07-22",
      "2024-08-16",
    ];

    const newItems: BedTransferItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const patientId =
          patientIds[Math.floor(Math.random() * patientIds.length)];
        const roomName =
          roomNames[Math.floor(Math.random() * roomNames.length)];
        const bedNumber =
          bedNumbers[Math.floor(Math.random() * bedNumbers.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];
        const assignDate =
          assignDates[Math.floor(Math.random() * assignDates.length)];
        const dischargeDate =
          dischargeDates[Math.floor(Math.random() * dischargeDates.length)];
        const charge = Math.random() * 5000 + 500; // Random charge between 500 and 5500

        return {
          id: `${Date.now()}-${index}`,
          patientId: patientId,
          roomName: roomName,
          bedNumber: bedNumber,
          charge: Math.round(charge * 100) / 100, // Round to 2 decimal places
          assignDate: assignDate,
          dischargeDate: dischargeDate,
          description: description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (bedTransfersData.length >= 46) {
      setHasMore(false);
    } else {
      setBedTransfersData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [bedTransfersData.length, isLoading, hasMore]);

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

  // Filter bed transfers based on search query (search across multiple fields)
  const filteredBedTransfers = bedTransfersData.filter(
    (item) =>
      item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dischargeDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.charge.toString().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (transferId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/bed-transfer/edit/${transferId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (transferId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/bed-transfer/view/${transferId}?fromView=${viewMode}`);
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
            {filteredBedTransfers.map((item, index) => {
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
                  {/* Bed Transfer Header with Patient ID */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.patientId}
                    </CardTitle>
                  </div>

                  {/* Bed Transfer Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Room Name:</span>
                      <span className="truncate">{item.roomName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Bed Number:</span>
                      <span className="truncate">{item.bedNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Charge:</span>
                      <span className="truncate font-mono">
                        ${item.charge.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Assign Date:</span>
                      <span className="truncate">{item.assignDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Discharge Date:</span>
                      <span className="truncate">{item.dischargeDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Description:</span>
                      <span className="truncate">{item.description}</span>
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
                <span className="text-sm">Loading more bed transfers...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredBedTransfers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more bed transfers to load
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
                data={bedTransfers}
                setFilteredData={setBedTransfersData}
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
                data={bedTransfers}
                setFilteredData={setBedTransfersData}
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
