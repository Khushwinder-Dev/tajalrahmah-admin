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
  code: string;
  propertyName: string;
  group: string;
  countryName: string;

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

const propertyData: GridDataType[] = [
  {
    code: "P-001",
    propertyName: "Sunrise Villa",
    group: "Residential",
    countryName: "Bangladesh",
    id: "1",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10T09:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-05T11:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-002",
    propertyName: "Green Horizon Apartments",
    group: "Residential",
    countryName: "India",
    id: "2",
    isDefault: true,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-12T14:00:00Z"),
    draftedAt: new Date("2025-01-12T14:00:00Z"),
    updatedAt: new Date("2025-01-15T10:15:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-003",
    propertyName: "Blue Lagoon Resort",
    group: "Hospitality",
    countryName: "Sri Lanka",
    id: "3",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-02-01T08:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-10T09:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-004",
    propertyName: "Golden Plaza Mall",
    group: "Commercial",
    countryName: "Malaysia",
    id: "4",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-20T12:00:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-14T15:00:00Z"),
    deletedAt: new Date("2025-02-14T15:00:00Z"),
    isDeleted: true,
  },
  {
    code: "P-005",
    propertyName: "Ocean View Hotel",
    group: "Hospitality",
    countryName: "Thailand",
    id: "5",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-05T06:15:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-12T07:30:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-006",
    propertyName: "Emerald Residency",
    group: "Residential",
    countryName: "Nepal",
    id: "6",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-18T09:50:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-01-25T08:00:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-007",
    propertyName: "City Light Tower",
    group: "Commercial",
    countryName: "Singapore",
    id: "7",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-02-03T11:45:00Z"),
    draftedAt: new Date("2025-02-03T11:45:00Z"),
    updatedAt: new Date("2025-02-04T10:20:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-008",
    propertyName: "Royal Garden Estate",
    group: "Residential",
    countryName: "Bangladesh",
    id: "8",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-22T07:30:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-01T08:10:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-009",
    propertyName: "Lakeview Paradise",
    group: "Hospitality",
    countryName: "Bhutan",
    id: "9",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-15T05:45:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-09T09:00:00Z"),
    deletedAt: new Date("2025-02-09T09:00:00Z"),
    isDeleted: true,
  },
  {
    code: "P-010",
    propertyName: "Metro Business Hub",
    group: "Commercial",
    countryName: "India",
    id: "10",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-30T13:10:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-11T12:15:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-011",
    propertyName: "Pearl Residency",
    group: "Residential",
    countryName: "Pakistan",
    id: "11",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-28T14:25:00Z"),
    draftedAt: null,
    updatedAt: new Date("2025-02-03T09:35:00Z"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    code: "P-012",
    propertyName: "Seaside Retreat",
    group: "Hospitality",
    countryName: "Maldives",
    id: "12",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-02-06T16:40:00Z"),
    draftedAt: new Date("2025-02-06T16:40:00Z"),
    updatedAt: new Date("2025-02-07T17:10:00Z"),
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

export default function PropertyGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(propertyData);
  const canDelete: boolean = usePermission("property", "delete");
  const canRestore: boolean = usePermission("property", "restore");
  const canEdit: boolean = usePermission("property", "edit");

  // Debug permissions
  console.log("Property Permissions:", {
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
      code: `Property Code ${index + 1}`,
      countryName: `Country ${index + 1}`,
      propertyName: `Property Name ${index + 1}`,
      group: `Group ${index + 1}`,
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
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Properties
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
                    onClick={() => navigate(`/property/1`)}
                  >
                    {item.propertyName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.countryName}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Group
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.group}
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
                            toastRestore("Property restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("Property deleted successfully");
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
                          onClick={() => navigate(`/property/edit/1`)}
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
                <span className="text-sm">Loading more properties...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more properties to load
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
