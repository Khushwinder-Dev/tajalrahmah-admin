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

type GridDataType = {
  propertyName: string;
  customer: string;
  requestNumber: string;
  inspectionDate: string;
  leaseStartDate: string;
  term: string;
  endDate: string;
  dateCreated: string;
  propertyPrice: string;
  contractAmount: string;
  clientNote: string;
  adminNote: string;

  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export const rentalRequestsData: GridDataType[] = [
  {
    id: "1",
    propertyName: "Greenwood Apartments",
    customer: "John Doe",
    requestNumber: "REQ-1001",
    inspectionDate: "2025-01-15",
    leaseStartDate: "2025-01-15",
    term: "12 months",
    endDate: "2026-01-14",
    dateCreated: "2025-01-01",
    propertyPrice: "150000",
    contractAmount: "12000",
    clientNote: "Wants early move-in.",
    adminNote: "Check documents before finalizing.",

    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-01"),
    draftedAt: null,
    updatedAt: new Date("2025-02-01"),
    deletedAt: null,
  },
  {
    id: "2",
    propertyName: "Lakeside Villa",
    customer: "Jane Smith",
    requestNumber: "REQ-1002",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-02-01",
    term: "24 months",
    endDate: "2027-01-31",
    dateCreated: "2025-01-10",
    propertyPrice: "250000",
    contractAmount: "20000",
    clientNote: "Requested furnished house.",
    adminNote: "Need approval from manager.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-02-05"),
    deletedAt: null,
  },
  {
    id: "3",
    propertyName: "Downtown Office Space",
    customer: "TechCorp Ltd",
    requestNumber: "REQ-1003",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-03-01",
    term: "36 months",
    endDate: "2028-02-28",
    dateCreated: "2025-01-20",
    propertyPrice: "500000",
    contractAmount: "45000",
    clientNote: "Needs high-speed internet setup.",
    adminNote: "Schedule inspection on 25th Jan.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-02-10"),
    deletedAt: null,
  },
  {
    id: "4",
    propertyName: "Seaside Cottage",
    customer: "Emily Johnson",
    requestNumber: "REQ-1004",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-04-01",
    term: "6 months",
    endDate: "2025-09-30",
    dateCreated: "2025-02-01",
    propertyPrice: "90000",
    contractAmount: "6000",
    clientNote: "Short-term lease required.",
    adminNote: "Confirm availability in April.",
    isDefault: false,
    isActive: false,
    isDraft: true,
    isDeleted: false,
    createdAt: new Date("2025-02-01"),
    draftedAt: new Date("2025-02-02"),
    updatedAt: new Date("2025-02-03"),
    deletedAt: null,
  },
  {
    id: "5",
    propertyName: "Hilltop Mansion",
    customer: "Michael Brown",
    requestNumber: "REQ-1005",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-05-15",
    term: "60 months",
    endDate: "2030-05-14",
    dateCreated: "2025-02-15",
    propertyPrice: "800000",
    contractAmount: "70000",
    clientNote: "VIP client, prioritize.",
    adminNote: "Prepare luxury package.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-02-15"),
    draftedAt: null,
    updatedAt: new Date("2025-03-01"),
    deletedAt: null,
  },
  {
    id: "6",
    propertyName: "City Center Plaza",
    customer: "Global Retail Inc",
    requestNumber: "REQ-1006",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-06-01",
    term: "48 months",
    endDate: "2029-05-31",
    dateCreated: "2025-02-20",
    propertyPrice: "600000",
    contractAmount: "50000",
    clientNote: "Needs multiple shop partitions.",
    adminNote: "Discuss layout with architect.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-02-20"),
    draftedAt: null,
    updatedAt: new Date("2025-03-05"),
    deletedAt: null,
  },
  {
    id: "7",
    propertyName: "Sunset Apartments",
    customer: "Olivia White",
    requestNumber: "REQ-1007",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-07-01",
    term: "18 months",
    endDate: "2026-12-31",
    dateCreated: "2025-02-25",
    propertyPrice: "200000",
    contractAmount: "15000",
    clientNote: "Needs parking space.",
    adminNote: "Assign dedicated parking.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-02-25"),
    draftedAt: null,
    updatedAt: new Date("2025-03-10"),
    deletedAt: null,
  },
  {
    id: "8",
    propertyName: "Countryside Farmhouse",
    customer: "Daniel Green",
    requestNumber: "REQ-1008",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-08-10",
    term: "24 months",
    endDate: "2027-08-09",
    dateCreated: "2025-03-01",
    propertyPrice: "120000",
    contractAmount: "10000",
    clientNote: "Wants pet-friendly policy.",
    adminNote: "Check local regulations.",
    isDefault: false,
    isActive: false,
    isDraft: false,
    isDeleted: true,
    createdAt: new Date("2025-03-01"),
    draftedAt: null,
    updatedAt: new Date("2025-03-05"),
    deletedAt: new Date("2025-03-06"),
  },
  {
    id: "9",
    propertyName: "Riverside Loft",
    customer: "Sophia Miller",
    requestNumber: "REQ-1009",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-09-01",
    term: "12 months",
    endDate: "2026-08-31",
    dateCreated: "2025-03-10",
    propertyPrice: "180000",
    contractAmount: "14000",
    clientNote: "Prefers top-floor unit.",
    adminNote: "Confirm elevator access.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-03-10"),
    draftedAt: null,
    updatedAt: new Date("2025-03-15"),
    deletedAt: null,
  },
  {
    id: "10",
    propertyName: "Harbor View Offices",
    customer: "Oceanic Shipping Ltd",
    requestNumber: "REQ-1010",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-10-01",
    term: "36 months",
    endDate: "2028-09-30",
    dateCreated: "2025-03-20",
    propertyPrice: "750000",
    contractAmount: "60000",
    clientNote: "Needs dock access.",
    adminNote: "Coordinate with port authority.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-03-20"),
    draftedAt: null,
    updatedAt: new Date("2025-03-25"),
    deletedAt: null,
  },
  {
    id: "11",
    propertyName: "Meadowland Duplex",
    customer: "William Davis",
    requestNumber: "REQ-1011",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-11-15",
    term: "12 months",
    endDate: "2026-11-14",
    dateCreated: "2025-03-25",
    propertyPrice: "160000",
    contractAmount: "13000",
    clientNote: "Wants garden access.",
    adminNote: "Check maintenance schedule.",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-03-25"),
    draftedAt: null,
    updatedAt: new Date("2025-03-30"),
    deletedAt: null,
  },
  {
    id: "12",
    propertyName: "Skyline Tower",
    customer: "FutureTech Inc",
    requestNumber: "REQ-1012",
    inspectionDate: "2025-01-15",

    leaseStartDate: "2025-12-01",
    term: "60 months",
    endDate: "2030-11-30",
    dateCreated: "2025-04-01",
    propertyPrice: "1000000",
    contractAmount: "85000",
    clientNote: "Needs multiple floors.",
    adminNote: "Plan phased handover.",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2025-04-01"),
    draftedAt: null,
    updatedAt: new Date("2025-04-05"),
    deletedAt: null,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(rentalRequestsData);
  const canDelete: boolean = usePermission("rentalRequests", "delete");
  const canRestore: boolean = usePermission("rentalRequests", "restore");
  const canEdit: boolean = usePermission("rentalRequests", "edit");

  // Debug permissions
  console.log("rentalRequests Permissions:", {
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

      propertyName: `Property ${index + 1}`,
      customer: `Customer ${index + 1}`,
      requestNumber: `REQ-${index + 1}`,
      inspectionDate: "2025-01-15",
      leaseStartDate: new Date().toISOString().split("T")[0],
      term: `6 months`,
      endDate: new Date().toISOString().split("T")[0],
      dateCreated: new Date().toISOString().split("T")[0],
      propertyPrice: "100000",
      contractAmount: "10000",
      clientNote: `Client note ${index + 1}`,
      adminNote: `Admin note ${index + 1}`,

      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [gridData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const handleRestoreClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  // Filter leaves based on search query
  const filteredData = gridData.filter(
    (item) =>
      item.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inspectionDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leaseStartDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.endDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dateCreated.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyPrice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contractAmount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.adminNote.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Total {gridData.length} Rental Requests
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
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/rental-requests/1`)}
                  >
                    {item.propertyName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.customer}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Inspection Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.inspectionDate}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
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
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore(
                              "Rental Request restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(
                                "Rental Request deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/rental-requests/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Lease Start Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.leaseStartDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Term
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.term}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      End Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.endDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Property Price
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.propertyPrice}
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
                <span className="text-sm">Loading more rental requests...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more rental requests to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
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
                data={gridData}
                setFilteredData={setGridData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
