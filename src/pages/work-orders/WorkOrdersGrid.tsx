import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";

// Mock data - replace with real data from your API
const workOrdersData = [
  {
    id: "1",
    workOrder: "WO-001",
    startDate: new Date("2024-01-15"),
    workCenter: "Production Line A",
    manufacturingOrder: "MO-2024-001",
    productQuantity: 100,
    unit: "Pieces",
    status: "In Progress",
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    workOrder: "WO-002",
    startDate: new Date("2024-01-16"),
    workCenter: "Assembly Line B",
    manufacturingOrder: "MO-2024-002",
    productQuantity: 50,
    unit: "Units",
    status: "Completed",
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "3",
    workOrder: "WO-003",
    startDate: new Date("2024-01-17"),
    workCenter: "Packaging Line C",
    manufacturingOrder: "MO-2024-003",
    productQuantity: 200,
    unit: "Boxes",
    status: "Pending",
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "4",
    workOrder: "WO-004",
    startDate: new Date("2024-01-18"),
    workCenter: "Quality Control D",
    manufacturingOrder: "MO-2024-004",
    productQuantity: 75,
    unit: "Sets",
    status: "On Hold",
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    workOrder: "WO-005",
    startDate: new Date("2024-01-19"),
    workCenter: "Testing Lab E",
    manufacturingOrder: "MO-2024-005",
    productQuantity: 25,
    unit: "Samples",
    status: "In Progress",
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "6",
    workOrder: "WO-006",
    startDate: new Date("2024-01-20"),
    workCenter: "Finishing Line F",
    manufacturingOrder: "MO-2024-006",
    productQuantity: 150,
    unit: "Items",
    status: "Completed",
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "7",
    workOrder: "WO-007",
    startDate: new Date("2024-01-21"),
    workCenter: "Production Line A",
    manufacturingOrder: "MO-2024-007",
    productQuantity: 80,
    unit: "Pieces",
    status: "Pending",
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "8",
    workOrder: "WO-008",
    startDate: new Date("2024-01-22"),
    workCenter: "Assembly Line B",
    manufacturingOrder: "MO-2024-008",
    productQuantity: 120,
    unit: "Units",
    status: "In Progress",
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "9",
    workOrder: "WO-009",
    startDate: new Date("2024-01-23"),
    workCenter: "Packaging Line C",
    manufacturingOrder: "MO-2024-009",
    productQuantity: 90,
    unit: "Boxes",
    status: "On Hold",
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "10",
    workOrder: "WO-010",
    startDate: new Date("2024-01-24"),
    workCenter: "Quality Control D",
    manufacturingOrder: "MO-2024-010",
    productQuantity: 60,
    unit: "Sets",
    status: "Completed",
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-31"),
  },
  {
    id: "11",
    workOrder: "WO-011",
    startDate: new Date("2024-01-25"),
    workCenter: "Testing Lab E",
    manufacturingOrder: "MO-2024-011",
    productQuantity: 40,
    unit: "Samples",
    status: "Pending",
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "12",
    workOrder: "WO-012",
    startDate: new Date("2024-01-26"),
    workCenter: "Finishing Line F",
    manufacturingOrder: "MO-2024-012",
    productQuantity: 180,
    unit: "Items",
    status: "In Progress",
    isDeleted: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-02-02"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function WorkOrdersGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Work Orders grid rendered");

  const navigate = useNavigate();

  const [workOrdersDataState, setWorkOrdersDataState] =
    useState(workOrdersData);
  const canDelete: boolean = usePermission("workOrders", "delete");
  const canRestore: boolean = usePermission("workOrders", "restore");
  const canEdit: boolean = usePermission("workOrders", "edit");

  // Debug permissions
  console.log("Work Orders Permissions:", {
    canDelete,
    canRestore,
    canEdit,
  });

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

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      workOrder: `WO-${Date.now()}-${index + 1}`,
      startDate: new Date(),
      workCenter: `New Work Center ${index + 1}`,
      manufacturingOrder: `MO-${new Date().getFullYear()}-${String(
        index + 1
      ).padStart(3, "0")}`,
      productQuantity: Math.floor(Math.random() * 200) + 10,
      unit: "Pieces",
      status: "Pending",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (workOrdersDataState.length >= 46) {
      setHasMore(false);
    } else {
      setWorkOrdersDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [workOrdersDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (workOrderId: string) => {
    setWorkOrdersDataState((prevWorkOrders) =>
      prevWorkOrders.map((workOrder) =>
        workOrder.id === workOrderId
          ? {
              ...workOrder,
              isDeleted: workOrder.isDeleted === true ? false : true,
            }
          : workOrder
      )
    );
  };

  const handleRestoreClick = (workOrderId: string) => {
    setWorkOrdersDataState((prevWorkOrders) =>
      prevWorkOrders.map((workOrder) =>
        workOrder.id === workOrderId
          ? {
              ...workOrder,
              isDeleted: workOrder.isDeleted === true ? false : true,
            }
          : workOrder
      )
    );
  };

  // Filter work order records based on search query
  const filteredWorkOrders = workOrdersDataState.filter(
    (workOrder) =>
      workOrder.workOrder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workOrder.workCenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workOrder.manufacturingOrder
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "On Hold":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Floating Label - Left Top */}
      <div
        className={cn(
          "absolute -top-4 left-6 rtl:left-auto rtl:right-6 py-1 rounded-md z-40! bg-white w-fit"
        )}
      >
        <span
          className={cn(
            "text-md font-semibold tracking-wide capitalize text-gray-600"
          )}
        >
          Total {workOrdersData.length} work order records
        </span>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 p-2">
            {filteredWorkOrders.map((workOrder, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/work-orders/1`)}
                  >
                    {workOrder.workOrder}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        workOrder.status
                      )}`}
                    >
                      {workOrder.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Work Center | Actions | Start Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Work Center */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Work Center
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {workOrder.workCenter}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        workOrder.isDeleted && canRestore
                          ? "Restore"
                          : canDelete
                          ? "Delete"
                          : ""
                      }
                      position="top"
                      arrowSize={8}
                      withArrow
                      styles={{
                        tooltip: {
                          fontSize: "14px",
                          padding: "8px 12px",
                          backgroundColor: "#374151",
                          color: "white",
                          borderRadius: "6px",
                          fontWeight: "500",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                        arrow: {
                          backgroundColor: "#374151",
                        },
                      }}
                    >
                      <button
                        disabled={workOrder.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          workOrder.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && workOrder.isDeleted) {
                            handleRestoreClick(workOrder.id);
                            toastRestore("Work order restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(workOrder.id);
                              toastDelete("Work order deleted successfully");
                            }
                          }
                        }}
                      >
                        {workOrder.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {canEdit && (
                      <Tooltip
                        label="Edit"
                        position="top"
                        arrowSize={8}
                        withArrow
                        styles={{
                          tooltip: {
                            fontSize: "14px",
                            padding: "8px 12px",
                            backgroundColor: "#374151",
                            color: "white",
                            borderRadius: "6px",
                            fontWeight: "500",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          },
                          arrow: {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        <div
                          className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center w-8 h-8"
                          onClick={() => navigate(`/work-orders/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Start Date */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Start Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {workOrder.startDate.toLocaleDateString()}
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
                <span className="text-sm">Loading more work orders...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredWorkOrders.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more work orders to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={workOrdersData}
                setFilteredData={setWorkOrdersDataState}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={workOrdersData}
                setFilteredData={setWorkOrdersDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
