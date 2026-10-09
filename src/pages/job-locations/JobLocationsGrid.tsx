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
  jobLocation: string;
  country: string;
  description: string;

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

const jobLocationData: GridDataType[] = [
  {
    jobLocation: "Dhaka",
    country: "Bangladesh",
    description: "Head office for administrative and tech roles",
    id: "LOC-001",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01T09:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-02T10:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Chittagong",
    country: "Bangladesh",
    description: "Port city office, focus on logistics and shipping",
    id: "LOC-002",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-02T11:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-03T12:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Sylhet",
    country: "Bangladesh",
    description: "Regional branch for tea industry operations",
    id: "LOC-003",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-08-03T13:00:00"),
    draftedAt: new Date("2025-08-03T15:00:00"),
    updatedAt: new Date("2025-08-04T14:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Khulna",
    country: "Bangladesh",
    description: "Manufacturing and industrial hub office",
    id: "LOC-004",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-04T15:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-05T16:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Barisal",
    country: "Bangladesh",
    description: "Agricultural support and logistics center",
    id: "LOC-005",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-05T17:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-06T18:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Rajshahi",
    country: "Bangladesh",
    description: "Textile industry regional office",
    id: "LOC-006",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-06T19:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-07T20:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Rangpur",
    country: "Bangladesh",
    description: "Agricultural and rural development office",
    id: "LOC-007",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-07T21:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-08T22:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Comilla",
    country: "Bangladesh",
    description: "Regional office for textile and manufacturing",
    id: "LOC-008",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-08-08T23:00:00"),
    draftedAt: new Date("2025-08-09T00:00:00"),
    updatedAt: new Date("2025-08-09T01:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Narayanganj",
    country: "Bangladesh",
    description: "Industrial and commercial hub near Dhaka",
    id: "LOC-009",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-09T02:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-10T03:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Gazipur",
    country: "Bangladesh",
    description: "Industrial zone with textile factories",
    id: "LOC-010",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-10T04:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-11T05:00:00"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    jobLocation: "Feni",
    country: "Bangladesh",
    description: "Regional office for manufacturing and trade",
    id: "LOC-011",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-08-11T06:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-12T07:00:00"),
    deletedAt: new Date("2025-08-12T07:00:00"),
    isDeleted: true,
  },
  {
    jobLocation: "Cox's Bazar",
    country: "Bangladesh",
    description: "Tourism office and coastal operations",
    id: "LOC-012",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-12T08:00:00"),
    draftedAt: null,
    updatedAt: new Date("2025-08-13T09:00:00"),
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

export default function JobLocationsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Terms grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(jobLocationData);
  const canDelete: boolean = usePermission("jobLocations", "delete");
  const canRestore: boolean = usePermission("jobLocations", "restore");
  const canEdit: boolean = usePermission("jobLocations", "edit");

  // Debug permissions
  console.log("Job Locations Permissions:", {
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
      jobLocation: `Job Location ${index + 1}`,
      country: `Country ${index + 1}`,
      description: `Description ${index + 1}`,
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
      item.jobLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Job Locations
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
                    onClick={() => navigate(`/job-locations/1`)}
                  >
                    {item.jobLocation}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.country}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Description
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.description}
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
                            toastRestore("Job Location restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Job Location deleted successfully");
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
                          onClick={() => navigate(`/job-locations/edit/1`)}
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
                <span className="text-sm">Loading more job locations...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more job locations to load
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
