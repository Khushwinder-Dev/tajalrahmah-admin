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
  date: string;
  iqamaNo: string;
  branch: string;
  allowanceAmount: string;
  allowanceType: string;
  notes: string;
  name: string;

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

const allowanceData: GridDataType[] = [
  {
    id: "1",
    date: "2025-08-01",
    iqamaNo: "2345678901",
    allowanceType: "Housing",
    branch: "Dhaka",
    allowanceAmount: "5000",
    notes: "Monthly housing allowance",
    name: "Shamim Ahmed",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01T09:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-01T09:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    date: "2025-08-02",
    iqamaNo: "1234567890",
    allowanceType: "Transport",
    branch: "Chattogram",
    allowanceAmount: "3000",
    notes: "August transport coverage",
    name: "Tanvir Hasan",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-02T08:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-02T08:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    date: "2025-08-03",
    iqamaNo: "3456789012",
    allowanceType: "Medical",
    branch: "Khulna",
    allowanceAmount: "2500",
    notes: "Medical aid support",
    name: "Farzana Rahman",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-08-03T10:00:00Z"),
    draftedAt: new Date("2025-08-03T10:15:00Z"),
    updatedAt: new Date("2025-08-03T10:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    date: "2025-08-04",
    iqamaNo: "4567890123",
    allowanceType: "Internet",
    branch: "Sylhet",
    allowanceAmount: "1000",
    notes: "Internet reimbursement",
    name: "Nayeem Islam",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-04T09:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-04T09:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    date: "2025-08-05",
    iqamaNo: "5678901234",
    allowanceType: "Fuel",
    branch: "Barisal",
    allowanceAmount: "1500",
    notes: "Bike fuel coverage",
    name: "Kamal Uddin",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-05T11:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-05T11:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    date: "2025-08-06",
    iqamaNo: "6789012345",
    allowanceType: "Meal",
    branch: "Rajshahi",
    allowanceAmount: "2000",
    notes: "Monthly meal plan",
    name: "Sadia Khatun",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-08-06T12:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-06T12:00:00Z"),
    deletedAt: new Date("2025-08-06T18:00:00Z"),
    isDeleted: true,
  },
  {
    id: "7",
    date: "2025-08-07",
    iqamaNo: "7890123456",
    allowanceType: "Education",
    branch: "Dhaka",
    allowanceAmount: "4000",
    notes: "Child education support",
    name: "Rezaul Karim",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-07T09:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-07T09:15:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    date: "2025-08-01",
    iqamaNo: "8901234567",
    allowanceType: "Special Bonus",
    branch: "Chattogram",
    allowanceAmount: "10000",
    notes: "Eid bonus",
    name: "Mizanur Rahman",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01T08:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-01T08:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    date: "2025-08-03",
    iqamaNo: "9012345678",
    allowanceType: "Overtime",
    branch: "Khulna",
    allowanceAmount: "3200",
    notes: "Weekend shifts",
    name: "Mahbub Alam",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-03T14:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-03T14:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    date: "2025-08-06",
    iqamaNo: "9123456789",
    allowanceType: "Travel",
    branch: "Sylhet",
    allowanceAmount: "2500",
    notes: "Business trip to Dhaka",
    name: "Nurjahan Begum",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-06T15:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-06T15:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    date: "2025-08-02",
    iqamaNo: "9234567890",
    allowanceType: "Communication",
    branch: "Barisal",
    allowanceAmount: "800",
    notes: "Mobile & internet",
    name: "Anwar Hossain",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-08-02T11:45:00Z"),
    draftedAt: new Date("2025-08-02T12:00:00Z"),
    updatedAt: new Date("2025-08-02T11:45:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    date: "2025-08-05",
    iqamaNo: "9345678901",
    allowanceType: "Festival",
    branch: "Rajshahi",
    allowanceAmount: "7000",
    notes: "Durga Puja bonus",
    name: "Shilpi Das",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-05T13:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-08-05T13:30:00Z"),
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

export default function AllowancesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Deduction grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(allowanceData);
  const canDelete: boolean = usePermission("allowances", "delete");
  const canRestore: boolean = usePermission("allowances", "restore");
  const canEdit: boolean = usePermission("allowances", "edit");

  // Debug permissions
  console.log("Allowance Permissions:", {
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
      date: "2025-08-01",
      iqamaNo: "1234567890",
      allowanceType: "Transport",
      name: "Someone",
      branch: "Dhaka",
      allowanceAmount: "100",
      notes: "3 times late",
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
      item.allowanceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.iqamaNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.allowanceAmount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Allowances
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
                    onClick={() => navigate(`/allowances/1`)}
                  >
                    {item.allowanceType}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.branch}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.name}
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
                            toastRestore("Allowance restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Allowance deleted successfully");
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
                          onClick={() => navigate(`/allowances/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
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
                <span className="text-sm">Loading more allowances...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more allowances to load
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
