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
const salaryAdvanceData = [
  {
    id: "1",
    date: new Date("2024-02-15"),
    iqamaNo: "1234567890",
    branch: "Riyadh Branch",
    paymentMode: "Cash",
    advanceAmount: 5000,
    description: "Emergency advance payment",
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
    paymentMode: "Bank Transfer",
    advanceAmount: 3000,
    description: "Monthly advance",
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
    paymentMode: "Check",
    advanceAmount: 7500,
    description: "Special advance",
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
    paymentMode: "Credit Card",
    advanceAmount: 2000,
    description: "Travel advance",
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
    paymentMode: "Debit Card",
    advanceAmount: 4000,
    description: "Medical advance",
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
    paymentMode: "Cash",
    advanceAmount: 6000,
    description: "Emergency advance",
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
    paymentMode: "Bank Transfer",
    advanceAmount: 3500,
    description: "Housing advance",
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
    paymentMode: "Check",
    advanceAmount: 8000,
    description: "Education advance",
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
    paymentMode: "Credit Card",
    advanceAmount: 1500,
    description: "Transport advance",
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
    paymentMode: "Debit Card",
    advanceAmount: 4500,
    description: "Equipment advance",
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
    paymentMode: "Cash",
    advanceAmount: 7000,
    description: "Business advance",
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
    paymentMode: "Bank Transfer",
    advanceAmount: 2500,
    description: "Utility advance",
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

export default function SalaryAdvanceGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Salary advance grid rendered");

  const navigate = useNavigate();

  const [salaryAdvanceDataState, setSalaryAdvanceDataState] =
    useState(salaryAdvanceData);
  const canDelete: boolean = usePermission("salaryAdvance", "delete");
  const canRestore: boolean = usePermission("salaryAdvance", "restore");
  const canEdit: boolean = usePermission("salaryAdvance", "edit");

  // Debug permissions
  console.log("Salary Advance Permissions:", {
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

    const paymentModes = [
      "Cash",
      "Bank Transfer",
      "Check",
      "Credit Card",
      "Debit Card",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      date: new Date(),
      branch: ["Riyadh Branch", "Jeddah Branch", "Dammam Branch"][
        Math.floor(Math.random() * 3)
      ],
      iqamaNo: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      paymentMode:
        paymentModes[Math.floor(Math.random() * paymentModes.length)],
      advanceAmount: Math.floor(Math.random() * 10000) + 1000,
      description: "Sample salary advance",
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (salaryAdvanceDataState.length >= 46) {
      setHasMore(false);
    } else {
      setSalaryAdvanceDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [salaryAdvanceDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (salaryAdvanceId: string) => {
    setSalaryAdvanceDataState((prevSalaryAdvances) =>
      prevSalaryAdvances.map((salaryAdvance) =>
        salaryAdvance.id === salaryAdvanceId
          ? {
              ...salaryAdvance,
              isDeleted: salaryAdvance.isDeleted === true ? false : true,
            }
          : salaryAdvance
      )
    );
  };

  const handleRestoreClick = (salaryAdvanceId: string) => {
    setSalaryAdvanceDataState((prevSalaryAdvances) =>
      prevSalaryAdvances.map((salaryAdvance) =>
        salaryAdvance.id === salaryAdvanceId
          ? {
              ...salaryAdvance,
              isDeleted: salaryAdvance.isDeleted === true ? false : true,
            }
          : salaryAdvance
      )
    );
  };

  // Filter salary advances based on search query
  const filteredSalaryAdvances = salaryAdvanceDataState.filter(
    (salaryAdvance) =>
      salaryAdvance.paymentMode
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      salaryAdvance.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      salaryAdvance.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salaryAdvance.iqamaNo.includes(searchQuery)
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
          Total {salaryAdvanceData.length} salary advances
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
            {filteredSalaryAdvances.map((salaryAdvance, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/salary-advance/1`)}
                  >
                    {salaryAdvance.paymentMode}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        salaryAdvance.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {salaryAdvance.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Payment Mode | Actions | Description */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Payment Mode - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payment Mode
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {salaryAdvance.paymentMode}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        salaryAdvance.isDeleted && canRestore
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
                        disabled={salaryAdvance.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          salaryAdvance.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && salaryAdvance.isDeleted) {
                            handleRestoreClick(salaryAdvance.id);
                            toastRestore(
                              "Salary advance restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(salaryAdvance.id);
                              toastDelete(
                                "Salary advance deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {salaryAdvance.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/salary-advance/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Description - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Description
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {salaryAdvance.description}
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
                <span className="text-sm">Loading more salary advances...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSalaryAdvances.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more salary advances to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={salaryAdvanceData}
                setFilteredData={setSalaryAdvanceDataState}
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
                data={salaryAdvanceData}
                setFilteredData={setSalaryAdvanceDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
