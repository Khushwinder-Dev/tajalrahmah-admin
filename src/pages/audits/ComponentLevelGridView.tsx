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
  title: string;
  auditor: string;
  auditDate: string;
  status: string;

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

const auditData: GridDataType[] = [
  {
    id: "1",
    title: "Financial Compliance Audit",
    auditor: "John Smith",
    auditDate: "2025-01-15",
    status: "Completed",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-01"),
    draftedAt: null,
    updatedAt: new Date("2025-01-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    title: "HR Policy Review",
    auditor: "Emma Johnson",
    auditDate: "2025-02-10",
    status: "Pending",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-02-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    title: "IT Security Audit",
    auditor: "Michael Brown",
    auditDate: "2025-02-20",
    status: "In Progress",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-25"),
    draftedAt: null,
    updatedAt: new Date("2025-02-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    title: "Environmental Compliance Check",
    auditor: "Sophia Williams",
    auditDate: "2025-03-01",
    status: "Pending",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-01"),
    draftedAt: null,
    updatedAt: new Date("2025-02-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    title: "Internal Financial Review",
    auditor: "David Wilson",
    auditDate: "2025-03-15",
    status: "Completed",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-10"),
    draftedAt: null,
    updatedAt: new Date("2025-03-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    title: "Quality Control Inspection",
    auditor: "Olivia Taylor",
    auditDate: "2025-04-05",
    status: "In Progress",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-03-01"),
    draftedAt: null,
    updatedAt: new Date("2025-04-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    title: "Warehouse Safety Audit",
    auditor: "James Anderson",
    auditDate: "2025-04-20",
    status: "Pending",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: new Date("2025-03-15"),
    draftedAt: new Date("2025-03-18"),
    updatedAt: new Date("2025-03-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    title: "Supplier Process Audit",
    auditor: "Isabella Martinez",
    auditDate: "2025-05-10",
    status: "Completed",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-04-01"),
    draftedAt: null,
    updatedAt: new Date("2025-05-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    title: "Customer Service Evaluation",
    auditor: "William Thomas",
    auditDate: "2025-05-25",
    status: "Rejected",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-04-15"),
    draftedAt: null,
    updatedAt: new Date("2025-05-26"),
    deletedAt: new Date("2025-05-27"),
    isDeleted: true,
  },
  {
    id: "10",
    title: "Annual Financial Audit",
    auditor: "Mia Garcia",
    auditDate: "2025-06-15",
    status: "Completed",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-05-01"),
    draftedAt: null,
    updatedAt: new Date("2025-06-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    title: "Data Privacy Compliance",
    auditor: "Benjamin Lee",
    auditDate: "2025-07-01",
    status: "In Progress",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-05-20"),
    draftedAt: null,
    updatedAt: new Date("2025-06-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    title: "Production Line Safety",
    auditor: "Charlotte Harris",
    auditDate: "2025-07-20",
    status: "Pending",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-06-10"),
    draftedAt: null,
    updatedAt: new Date("2025-07-05"),
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

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(auditData);
  const canDelete: boolean = usePermission("audits", "delete");
  const canRestore: boolean = usePermission("audits", "restore");
  const canEdit: boolean = usePermission("audits", "edit");

  // Debug permissions
  console.log("audits Permissions:", {
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

      title: `Title ${index + 1}`,
      auditor: `Auditor ${index + 1}`,
      auditDate: `Audit Date ${index + 1}`,
      status: `Status ${index + 1}`,

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
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.auditor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.auditDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Audits
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
                    onClick={() => navigate(`/audits/1`)}
                  >
                    {item.title}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Auditor
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.auditor}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Audit Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.auditDate}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                            toastRestore("Audit restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Audit deleted successfully");
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
                          onClick={() => navigate(`/audits/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.status}
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
                <span className="text-sm">Loading more audits...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more audits to load
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
