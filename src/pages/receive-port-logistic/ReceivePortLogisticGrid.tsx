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
const receivePortLogisticData = [
  {
    id: "1",
    country: "Saudi Arabia",
    company: "Al-Rashid Trading Company",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    country: "UAE",
    company: "Al-Zahrani Enterprises",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    country: "Kuwait",
    company: "Al-Otaibi Industries",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    country: "Qatar",
    company: "Al-Shehri Solutions",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    country: "Bahrain",
    company: "Al-Ghamdi Trading",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    country: "Oman",
    company: "Al-Harbi Corporation",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    country: "Jordan",
    company: "Al-Maktoum Trading",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    country: "Lebanon",
    company: "Al-Nahyan Enterprises",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    country: "Egypt",
    company: "Al-Qasimi Trading",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    country: "Iraq",
    company: "Al-Sharqi Corporation",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    country: "Turkey",
    company: "Al-Sabah Trading",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    country: "Iran",
    company: "Al-Khalifa Enterprises",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-31"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ReceivePortLogisticGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Receive Port Logistic grid rendered");

  const navigate = useNavigate();

  const [receivePortLogisticDataState, setReceivePortLogisticDataState] =
    useState(receivePortLogisticData);
  const canDelete: boolean = usePermission("receivePortLogistic", "delete");
  const canRestore: boolean = usePermission("receivePortLogistic", "restore");
  const canEdit: boolean = usePermission("receivePortLogistic", "edit");

  // Field-level permissions
  const canViewCountry: boolean = usePermission(
    "receivePortLogistic",
    "view",
    "country"
  );
  const canViewCompany: boolean = usePermission(
    "receivePortLogistic",
    "view",
    "company"
  );
  const canViewIsActive: boolean = usePermission(
    "receivePortLogistic",
    "view",
    "isActive"
  );
  const canViewIsDeleted: boolean = usePermission(
    "receivePortLogistic",
    "view",
    "isDeleted"
  );
  const canViewCreatedAt: boolean = usePermission(
    "receivePortLogistic",
    "view",
    "createdAt"
  );
  const canViewUpdatedAt: boolean = usePermission(
    "receivePortLogistic",
    "view",
    "updatedAt"
  );

  // Debug permissions
  console.log("Receive Port Logistic Permissions:", {
    canDelete,
    canRestore,
    canEdit,
    canViewCountry,
    canViewCompany,
    canViewIsActive,
    canViewIsDeleted,
    canViewCreatedAt,
    canViewUpdatedAt,
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

    const countries = [
      "Pakistan",
      "India",
      "China",
      "Japan",
      "South Korea",
      "Singapore",
    ];
    const companies = [
      "Al-Thani Trading Company",
      "Al-Said Enterprises",
      "Al-Hashemi Corporation",
      "Aoun Trading Solutions",
      "El-Sisi Enterprises",
      "Al-Kadhimi Trading",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      company: companies[Math.floor(Math.random() * countries.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (receivePortLogisticDataState.length >= 46) {
      setHasMore(false);
    } else {
      setReceivePortLogisticDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [receivePortLogisticDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (receivePortLogisticId: string) => {
    setReceivePortLogisticDataState((prevReceivePortLogistics) =>
      prevReceivePortLogistics.map((receivePortLogistic) =>
        receivePortLogistic.id === receivePortLogisticId
          ? {
              ...receivePortLogistic,
              isDeleted: receivePortLogistic.isDeleted === true ? false : true,
            }
          : receivePortLogistic
      )
    );
  };

  const handleRestoreClick = (receivePortLogisticId: string) => {
    setReceivePortLogisticDataState((prevReceivePortLogistics) =>
      prevReceivePortLogistics.map((receivePortLogistic) =>
        receivePortLogistic.id === receivePortLogisticId
          ? {
              ...receivePortLogistic,
              isDeleted: receivePortLogistic.isDeleted === true ? false : true,
            }
          : receivePortLogistic
      )
    );
  };

  // Filter receive port logistic records based on search query
  const filteredReceivePortLogistics = receivePortLogisticDataState.filter(
    (receivePortLogistic) => {
      const searchLower = searchQuery.toLowerCase();

      // Only search by fields user has permission to view
      const searchableFields = [];

      if (canViewCountry) {
        searchableFields.push(
          receivePortLogistic.country.toLowerCase().includes(searchLower)
        );
      }

      if (canViewCompany) {
        searchableFields.push(
          receivePortLogistic.company.toLowerCase().includes(searchLower)
        );
      }

      // If no fields are searchable, return false
      if (searchableFields.length === 0) {
        return false;
      }

      // Return true if any searchable field matches
      return searchableFields.some((field) => field);
    }
  );

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
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
          Total {receivePortLogisticData.length} receive port logistic records
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
            {filteredReceivePortLogistics.map((receivePortLogistic, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  {canViewCompany && (
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/receive-port-logistic/1`)}
                    >
                      {receivePortLogistic.company}
                    </CardTitle>
                  )}

                  {/* Right - Status */}
                  {canViewIsActive && (
                    <div className="flex justify-end">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          receivePortLogistic.isActive
                        )}`}
                      >
                        {receivePortLogistic.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row - Grid with 3 columns: Country | Actions | Created Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Country */}
                  {canViewCountry && (
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                        Country
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {receivePortLogistic.country}
                      </div>
                    </div>
                  )}

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        receivePortLogistic.isDeleted && canRestore
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
                        disabled={receivePortLogistic.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          receivePortLogistic.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && receivePortLogistic.isDeleted) {
                            handleRestoreClick(receivePortLogistic.id);
                            toastRestore(
                              "Purchase order logistic record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(receivePortLogistic.id);
                              toastDelete(
                                "Purchase order logistic record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {receivePortLogistic.isDeleted && canRestore ? (
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
                          onClick={() =>
                            navigate(`/receive-port-logistic/edit/1`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Created Date */}
                  {canViewCreatedAt && (
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                        Created
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {receivePortLogistic.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">
                  Loading more purchase order logistic records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredReceivePortLogistics.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more purchase order logistic records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={receivePortLogisticData}
                setFilteredData={setReceivePortLogisticDataState}
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
                data={receivePortLogisticData}
                setFilteredData={setReceivePortLogisticDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
