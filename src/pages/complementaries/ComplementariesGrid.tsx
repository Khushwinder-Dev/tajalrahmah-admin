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
const complementariesData = [
  {
    id: "1",
    roomType: "Standard Room",
    complementary: "Breakfast",
    rate: 25.0,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    roomType: "Deluxe Room",
    complementary: "Airport Transfer",
    rate: 45.0,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "3",
    roomType: "Suite",
    complementary: "Spa Access",
    rate: 75.0,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "4",
    roomType: "Executive Room",
    complementary: "Lounge Access",
    rate: 35.0,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    roomType: "Family Room",
    complementary: "Kids Club",
    rate: 30.0,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "6",
    roomType: "Presidential Suite",
    complementary: "Butler Service",
    rate: 150.0,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "7",
    roomType: "Standard Room",
    complementary: "WiFi",
    rate: 15.0,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "8",
    roomType: "Deluxe Room",
    complementary: "Mini Bar",
    rate: 20.0,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "9",
    roomType: "Suite",
    complementary: "Room Service",
    rate: 40.0,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "10",
    roomType: "Executive Room",
    complementary: "Business Center",
    rate: 25.0,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-31"),
  },
  {
    id: "11",
    roomType: "Family Room",
    complementary: "Pool Access",
    rate: 20.0,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "12",
    roomType: "Presidential Suite",
    complementary: "Private Pool",
    rate: 200.0,
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

export default function ComplementariesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Complementaries grid rendered");

  const navigate = useNavigate();

  const [complementariesDataState, setComplementariesDataState] =
    useState(complementariesData);
  const canDelete: boolean = usePermission("complementaries", "delete");
  const canRestore: boolean = usePermission("complementaries", "restore");
  const canEdit: boolean = usePermission("complementaries", "edit");

  // Debug permissions
  console.log("Complementaries Permissions:", {
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
      roomType: `New Room Type ${index + 1}`,
      complementary: "New complementary service",
      rate: Math.floor(Math.random() * 100) + 10,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (complementariesDataState.length >= 46) {
      setHasMore(false);
    } else {
      setComplementariesDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [complementariesDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (complementaryId: string) => {
    setComplementariesDataState((prevComplementaries) =>
      prevComplementaries.map((complementary) =>
        complementary.id === complementaryId
          ? {
              ...complementary,
              isDeleted: complementary.isDeleted === true ? false : true,
            }
          : complementary
      )
    );
  };

  const handleRestoreClick = (complementaryId: string) => {
    setComplementariesDataState((prevComplementaries) =>
      prevComplementaries.map((complementary) =>
        complementary.id === complementaryId
          ? {
              ...complementary,
              isDeleted: complementary.isDeleted === true ? false : true,
            }
          : complementary
      )
    );
  };

  // Filter complementary records based on search query
  const filteredComplementaries = complementariesDataState.filter(
    (complementary) =>
      complementary.roomType
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      complementary.complementary
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const getRateColor = (rate: number) => {
    if (rate >= 100)
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    if (rate >= 50)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (rate >= 25)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
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
          Total {complementariesData.length} complementary records
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
            {filteredComplementaries.map((complementary, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Rate */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/complementaries/1`)}
                  >
                    {complementary.roomType}
                  </CardTitle>

                  {/* Right - Rate */}
                  <div className="flex justify-end gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRateColor(
                        complementary.rate
                      )}`}
                    >
                      ${complementary.rate.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Complementary | Actions | Created Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Complementary */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Complementary
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {complementary.complementary}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        complementary.isDeleted && canRestore
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
                        disabled={complementary.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          complementary.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && complementary.isDeleted) {
                            handleRestoreClick(complementary.id);
                            toastRestore("Complementary restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(complementary.id);
                              toastDelete("Complementary deleted successfully");
                            }
                          }
                        }}
                      >
                        {complementary.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/complementaries/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Created Date */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Created Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {complementary.createdAt.toLocaleDateString()}
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
                <span className="text-sm">Loading more complementaries...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredComplementaries.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more complementaries to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={complementariesData}
                setFilteredData={setComplementariesDataState}
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
                data={complementariesData}
                setFilteredData={setComplementariesDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
