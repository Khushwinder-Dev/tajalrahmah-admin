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
const houseKeepersData = [
  {
    id: "1",
    houseKeeperName: "John Smith",
    roomSizeName: "VIP Suite",
    status: "Active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    houseKeeperName: "Maria Garcia",
    roomSizeName: "Standard Room",
    status: "Active",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    houseKeeperName: "Ahmed Hassan",
    roomSizeName: "Conference Room",
    status: "Active",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    houseKeeperName: "Sarah Johnson",
    roomSizeName: "Dining Area",
    status: "Inactive",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    houseKeeperName: "Carlos Rodriguez",
    roomSizeName: "Pool Area",
    status: "Draft",
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    houseKeeperName: "Lisa Chen",
    roomSizeName: "Spa & Wellness",
    status: "Active",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    houseKeeperName: "David Wilson",
    roomSizeName: "Lobby & Reception",
    status: "Updated",
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    houseKeeperName: "Fatima Al-Zahra",
    roomSizeName: "Staff Quarters",
    status: "Active",
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    houseKeeperName: "Michael Brown",
    roomSizeName: "Gym & Fitness",
    status: "Active",
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    houseKeeperName: "Elena Petrov",
    roomSizeName: "Banquet Hall",
    status: "Draft",
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    houseKeeperName: "James Lee",
    roomSizeName: "Parking Area",
    status: "Active",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    houseKeeperName: "Aisha Patel",
    roomSizeName: "Laundry & Storage",
    status: "Updated",
    createdAt: new Date("2024-01-26"),
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

export default function HouseKeepersGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("House Keepers grid rendered");

  const navigate = useNavigate();

  const [houseKeepersState, setHouseKeepersState] = useState(houseKeepersData);
  const canDelete: boolean = usePermission("assignHouseKeepers", "delete");
  const canRestore: boolean = usePermission("assignHouseKeepers", "restore");
  const canEdit: boolean = usePermission("assignHouseKeepers", "edit");

  // Debug permissions
  console.log("House Keeper Permissions:", {
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

    const names = [
      "John Smith",
      "Maria Garcia",
      "Ahmed Hassan",
      "Sarah Johnson",
      "Carlos Rodriguez",
      "Lisa Chen",
      "David Wilson",
      "Fatima Al-Zahra",
      "Michael Brown",
      "Elena Petrov",
      "James Lee",
      "Aisha Patel",
    ];
    const roomSizes = [
      "VIP Suite",
      "Standard Room",
      "Conference Room",
      "Dining Area",
      "Pool Area",
      "Spa & Wellness",
      "Lobby & Reception",
      "Staff Quarters",
      "Gym & Fitness",
      "Banquet Hall",
      "Parking Area",
      "Laundry & Storage",
    ];
    const statuses = ["Active", "Inactive", "Draft", "Updated"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const houseKeeperName = names[Math.floor(Math.random() * names.length)];
      const roomSizeName =
        roomSizes[Math.floor(Math.random() * roomSizes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return {
        id: `${Date.now()}-${index}`,
        houseKeeperName,
        roomSizeName,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: Math.random() > 0.85, // small chance of deleted
      };
    });

    // Stop loading more after reaching 50 items for demo
    if (houseKeepersState.length >= 46) {
      setHasMore(false);
    } else {
      setHouseKeepersState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [houseKeepersState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (houseKeeperId: string) => {
    setHouseKeepersState((prev) =>
      prev.map((hk) =>
        hk.id === houseKeeperId
          ? {
              ...hk,
              isDeleted: hk.isDeleted === true ? false : true,
            }
          : hk
      )
    );
  };

  const handleRestoreClick = (houseKeeperId: string) => {
    setHouseKeepersState((prev) =>
      prev.map((hk) =>
        hk.id === houseKeeperId
          ? {
              ...hk,
              isDeleted: hk.isDeleted === true ? false : true,
            }
          : hk
      )
    );
  };

  // Filter house keepers based on search query
  const filteredHouseKeepers = houseKeepersState.filter((hk) => {
    const q = searchQuery.toLowerCase();
    return (
      hk.houseKeeperName.toLowerCase().includes(q) ||
      hk.roomSizeName.toLowerCase().includes(q) ||
      hk.status.toLowerCase().includes(q)
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
          Total {houseKeepersData.length} house keepers
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
            {filteredHouseKeepers.map((houseKeeper, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() =>
                      navigate(`/assign-house-keepers/${houseKeeper.id}`)
                    }
                  >
                    {houseKeeper.houseKeeperName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-[10px] 2xl:text-xs font-medium ${
                        !houseKeeper.isDeleted
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {!houseKeeper.isDeleted ? "Active" : "Deleted"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Room Size | Actions | Created */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Room Size - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Room Size
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {houseKeeper.roomSizeName}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        houseKeeper.isDeleted && canRestore
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
                        disabled={houseKeeper.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          houseKeeper.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && houseKeeper.isDeleted) {
                            handleRestoreClick(houseKeeper.id);
                            toastRestore("House Keeper restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(houseKeeper.id);
                              toastDelete("House Keeper deleted successfully");
                            }
                          }
                        }}
                      >
                        {houseKeeper.isDeleted && canRestore ? (
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
                            navigate(
                              `/assign-house-keepers/edit/${houseKeeper.id}`
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Created - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Created
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {new Date(houseKeeper.createdAt).toLocaleDateString()}
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
                <span className="text-sm">Loading more house keepers...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredHouseKeepers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more house keepers to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={houseKeepersData}
                setFilteredData={setHouseKeepersState}
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
                data={houseKeepersData}
                setFilteredData={setHouseKeepersState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
