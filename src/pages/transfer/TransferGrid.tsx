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
const transferData = [
  {
    id: "1",
    date: new Date("2024-02-15"),
    iqamaNo: "1234567890",
    branch: "Riyadh Branch",
    from: "Warehouse A",
    to: "Warehouse B",
    description: "Stock moved for seasonal demand",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    date: new Date("2024-02-10"),
    iqamaNo: "2345678901",
    branch: "Jeddah Branch",
    from: "Store 1",
    to: "Store 2",
    description: "Inter-store transfer",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    date: new Date("2024-02-20"),
    iqamaNo: "3456789012",
    branch: "Dammam Branch",
    from: "Section X",
    to: "Section Y",
    description: "Reorganization of sections",
    isActive: false,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    date: new Date("2024-02-25"),
    iqamaNo: "4567890123",
    branch: "Riyadh Branch",
    from: "Warehouse B",
    to: "Outlet 3",
    description: "Urgent transfer for promotion",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-18"),
    draftedAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    date: new Date("2024-02-28"),
    iqamaNo: "5678901234",
    branch: "Jeddah Branch",
    from: "Outlet 1",
    to: "Outlet 5",
    description: "Balancing stock levels",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    date: new Date("2024-03-01"),
    iqamaNo: "6789012345",
    branch: "Dammam Branch",
    from: "Store 4",
    to: "Warehouse C",
    description: "Return to central warehouse",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    date: new Date("2024-03-05"),
    iqamaNo: "7890123456",
    branch: "Riyadh Branch",
    from: "Floor A",
    to: "Floor B",
    description: "Fixture relocation",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-21"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    date: new Date("2024-03-10"),
    iqamaNo: "8901234567",
    branch: "Jeddah Branch",
    from: "Kitchen",
    to: "Dining",
    description: "Equipment repositioning",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-22"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    date: new Date("2024-03-15"),
    iqamaNo: "9012345678",
    branch: "Dammam Branch",
    from: "Outlet 2",
    to: "Outlet 6",
    description: "Demand spike support",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-23"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    date: new Date("2024-03-20"),
    iqamaNo: "0123456789",
    branch: "Riyadh Branch",
    from: "Warehouse A",
    to: "Warehouse D",
    description: "Consolidation",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-24"),
    draftedAt: null,
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    date: new Date("2024-03-25"),
    iqamaNo: "1234567891",
    branch: "Jeddah Branch",
    from: "Zone 1",
    to: "Zone 3",
    description: "Layout update",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    date: new Date("2024-03-30"),
    iqamaNo: "2345678902",
    branch: "Dammam Branch",
    from: "Counter 2",
    to: "Counter 4",
    description: "Service optimization",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function TransferGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Transfer grid rendered");

  const navigate = useNavigate();

  const [transferDataState, setTransferDataState] = useState(transferData);
  const canDelete: boolean = usePermission("transfer", "delete");
  const canRestore: boolean = usePermission("transfer", "restore");
  const canEdit: boolean = usePermission("transfer", "edit");

  // Debug permissions
  console.log("Transfer Permissions:", {
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

    const fromLocations = [
      "Warehouse A",
      "Warehouse B",
      "Store 1",
      "Store 2",
      "Section X",
      "Section Y",
    ];
    const toLocations = [
      "Warehouse C",
      "Warehouse D",
      "Outlet 1",
      "Outlet 2",
      "Zone 1",
      "Zone 2",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      date: new Date(),
      branch: ["Riyadh Branch", "Jeddah Branch", "Dammam Branch"][
        Math.floor(Math.random() * 3)
      ],
      iqamaNo: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      from: fromLocations[Math.floor(Math.random() * fromLocations.length)],
      to: toLocations[Math.floor(Math.random() * toLocations.length)],
      description: "Sample transfer entry",
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (transferDataState.length >= 46) {
      setHasMore(false);
    } else {
      setTransferDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [transferDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (transferId: string) => {
    setTransferDataState((prevTransfers) =>
      prevTransfers.map((transfer) =>
        transfer.id === transferId
          ? {
              ...transfer,
              isDeleted: transfer.isDeleted === true ? false : true,
            }
          : transfer
      )
    );
  };

  const handleRestoreClick = (transferId: string) => {
    setTransferDataState((prevTransfers) =>
      prevTransfers.map((transfer) =>
        transfer.id === transferId
          ? {
              ...transfer,
              isDeleted: transfer.isDeleted === true ? false : true,
            }
          : transfer
      )
    );
  };

  // Filter bonuses based on search query
  const filteredTransfers = transferDataState.filter((t) => {
    const q = searchQuery.toLowerCase();
    const dateStr =
      t.date instanceof Date
        ? t.date.toISOString().split("T")[0]
        : String(t.date);
    return (
      t.branch.toLowerCase().includes(q) ||
      t.iqamaNo.includes(searchQuery) ||
      (t.from?.toLowerCase?.().includes(q) ?? false) ||
      (t.to?.toLowerCase?.().includes(q) ?? false) ||
      dateStr.includes(searchQuery)
    );
  });

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
          Total {transferData.length} transfers
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
            {filteredTransfers.map((transfer, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/transfer/1`)}
                  >
                    {transfer.branch}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transfer.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {transfer.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Bonus Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* From - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      From
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {transfer.from}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        transfer.isDeleted && canRestore
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
                        disabled={transfer.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          transfer.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && transfer.isDeleted) {
                            handleRestoreClick(transfer.id);
                            toastRestore("Transfer restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(transfer.id);
                              toastDelete("Transfer deleted successfully");
                            }
                          }
                        }}
                      >
                        {transfer.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/transfer/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* To - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      To
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {transfer.to}
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
                <span className="text-sm">Loading more transfers...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTransfers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more transfers to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={transferData}
                setFilteredData={setTransferDataState}
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
                data={transferData}
                setFilteredData={setTransferDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
