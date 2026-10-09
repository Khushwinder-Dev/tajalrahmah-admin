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

// Inspections interface
interface InspectionItem {
  id: string;
  vehicle: string;
  inspectionForm: string;
  addedFrom: string;
  fromDate: string;
  toDate: string;
}

// Mock data - replace with real data from your API
const inspectionsData: InspectionItem[] = [
  {
    id: "1",
    vehicle: "Toyota Camry - ABC123",
    inspectionForm: "Annual Safety Inspection",
    addedFrom: "Fleet Manager",
    fromDate: "2024-01-15",
    toDate: "2024-01-20",
  },
  {
    id: "2",
    vehicle: "Ford Transit - XYZ789",
    inspectionForm: "Monthly Maintenance Check",
    addedFrom: "Maintenance Team",
    fromDate: "2024-02-01",
    toDate: "2024-02-05",
  },
  {
    id: "3",
    vehicle: "Honda Civic - DEF456",
    inspectionForm: "Pre-Trip Inspection",
    addedFrom: "Driver",
    fromDate: "2024-02-10",
    toDate: "2024-02-12",
  },
  {
    id: "4",
    vehicle: "Chevrolet Silverado - GHI789",
    inspectionForm: "DOT Compliance Check",
    addedFrom: "Compliance Officer",
    fromDate: "2024-02-15",
    toDate: "2024-02-18",
  },
  {
    id: "5",
    vehicle: "Nissan Altima - JKL012",
    inspectionForm: "Quarterly Review",
    addedFrom: "Quality Assurance",
    fromDate: "2024-03-01",
    toDate: "2024-03-05",
  },
  {
    id: "6",
    vehicle: "BMW X5 - MNO345",
    inspectionForm: "Executive Vehicle Check",
    addedFrom: "Executive Assistant",
    fromDate: "2024-03-10",
    toDate: "2024-03-12",
  },
  {
    id: "7",
    vehicle: "Mercedes Sprinter - PQR678",
    inspectionForm: "Commercial Vehicle Inspection",
    addedFrom: "Operations Manager",
    fromDate: "2024-03-15",
    toDate: "2024-03-20",
  },
  {
    id: "8",
    vehicle: "Hyundai Elantra - STU901",
    inspectionForm: "Routine Safety Check",
    addedFrom: "Safety Inspector",
    fromDate: "2024-03-25",
    toDate: "2024-03-28",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function InspectionsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Inspections grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [inspectionEntries, setInspectionEntries] =
    useState<InspectionItem[]>(inspectionsData);
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

    const vehicles = [
      "Toyota Camry - ABC123",
      "Ford Transit - XYZ789",
      "Honda Civic - DEF456",
      "Chevrolet Silverado - GHI789",
      "Nissan Altima - JKL012",
      "BMW X5 - MNO345",
      "Mercedes Sprinter - PQR678",
      "Hyundai Elantra - STU901",
      "Audi A4 - VWX234",
      "Volkswagen Jetta - YZA567",
      "Subaru Outback - BCD890",
      "Mazda CX-5 - EFG123",
    ];
    const inspectionForms = [
      "Annual Safety Inspection",
      "Monthly Maintenance Check",
      "Pre-Trip Inspection",
      "DOT Compliance Check",
      "Quarterly Review",
      "Executive Vehicle Check",
      "Commercial Vehicle Inspection",
      "Routine Safety Check",
      "Emergency Inspection",
      "Post-Accident Review",
      "Emissions Test",
      "Brake System Check",
    ];
    const addedFromOptions = [
      "Fleet Manager",
      "Maintenance Team",
      "Driver",
      "Compliance Officer",
      "Quality Assurance",
      "Executive Assistant",
      "Operations Manager",
      "Safety Inspector",
      "Supervisor",
      "Mechanic",
      "Transport Coordinator",
      "Vehicle Administrator",
    ];
    const fromDates = [
      "2024-01-15",
      "2024-02-01",
      "2024-02-10",
      "2024-02-15",
      "2024-03-01",
      "2024-03-10",
      "2024-03-15",
      "2024-03-25",
      "2024-04-01",
      "2024-04-10",
      "2024-04-15",
      "2024-04-20",
    ];
    const toDates = [
      "2024-01-20",
      "2024-02-05",
      "2024-02-12",
      "2024-02-18",
      "2024-03-05",
      "2024-03-12",
      "2024-03-20",
      "2024-03-28",
      "2024-04-05",
      "2024-04-15",
      "2024-04-20",
      "2024-04-25",
    ];

    const newItems: InspectionItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        const inspectionForm =
          inspectionForms[Math.floor(Math.random() * inspectionForms.length)];
        const addedFrom =
          addedFromOptions[Math.floor(Math.random() * addedFromOptions.length)];
        const fromDate =
          fromDates[Math.floor(Math.random() * fromDates.length)];
        const toDate = toDates[Math.floor(Math.random() * toDates.length)];

        return {
          id: `${Date.now()}-${index}`,
          vehicle: `${vehicle} ${index + 1}`,
          inspectionForm,
          addedFrom,
          fromDate,
          toDate,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (inspectionEntries.length >= 46) {
      setHasMore(false);
    } else {
      setInspectionEntries((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [inspectionEntries.length, isLoading, hasMore]);

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

  // Filter inspection entries based on search query (search across multiple fields)
  const filteredInspections = inspectionEntries.filter(
    (item) =>
      item.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inspectionForm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.addedFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fromDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (inspectionId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/inspections/view/${inspectionId}?fromView=${viewMode}`);
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
            {filteredInspections.map((item, index) => {
              const statusColors = {
                "Annual Safety Inspection":
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                "Monthly Maintenance Check":
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                "Pre-Trip Inspection":
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                "DOT Compliance Check":
                  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                "Quarterly Review":
                  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                "Executive Vehicle Check":
                  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
                "Commercial Vehicle Inspection":
                  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
                "Routine Safety Check":
                  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
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
                  {/* Inspection Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.vehicle}
                    </CardTitle>
                    {/* Status Badge */}
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        statusColors[
                          item.inspectionForm as keyof typeof statusColors
                        ] ||
                          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      )}
                    >
                      {item.inspectionForm}
                    </span>
                  </div>

                  {/* Inspection Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Added From:</span>
                      <span className="truncate font-semibold text-blue-600">
                        {item.addedFrom}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">From Date:</span>
                      <span className="truncate text-gray-700">
                        {new Date(item.fromDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">To Date:</span>
                      <span className="truncate text-green-600">
                        {new Date(item.toDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Duration:</span>
                      <span className="truncate text-purple-600">
                        {Math.ceil(
                          (new Date(item.toDate).getTime() -
                            new Date(item.fromDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
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
                  Loading more inspection entries...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredInspections.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more inspection entries to load
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
                data={inspectionsData}
                setFilteredData={setInspectionEntries}
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
                data={inspectionsData}
                setFilteredData={setInspectionEntries}
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
