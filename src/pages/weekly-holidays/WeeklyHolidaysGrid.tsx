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

// Mock data for weekly holidays
const weeklyHolidaysData = [
  {
    id: "1",
    holidayName: "Eid Al-Fitr",
    fromDate: new Date("2024-04-10"),
    endDate: new Date("2024-04-12"),
    totalDays: 3,
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
    holidayName: "Eid Al-Adha",
    fromDate: new Date("2024-06-17"),
    endDate: new Date("2024-06-19"),
    totalDays: 3,
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
    holidayName: "National Day",
    fromDate: new Date("2024-09-23"),
    endDate: new Date("2024-09-23"),
    totalDays: 1,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-05-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    holidayName: "Prophet's Birthday",
    fromDate: new Date("2024-09-28"),
    endDate: new Date("2024-09-28"),
    totalDays: 1,
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
    holidayName: "New Year's Day",
    fromDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-01"),
    totalDays: 1,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-12-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    holidayName: "Saudi Founding Day",
    fromDate: new Date("2024-02-22"),
    endDate: new Date("2024-02-22"),
    totalDays: 1,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-12-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    holidayName: "Weekend Extension",
    fromDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-17"),
    totalDays: 3,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-08-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    holidayName: "Spring Break",
    fromDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-05"),
    totalDays: 5,
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
    holidayName: "Summer Vacation",
    fromDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-31"),
    totalDays: 31,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2021-12-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    holidayName: "Holiday Season",
    fromDate: new Date("2024-12-25"),
    endDate: new Date("2024-12-26"),
    totalDays: 2,
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
    holidayName: "Company Anniversary",
    fromDate: new Date("2024-05-15"),
    endDate: new Date("2024-05-15"),
    totalDays: 1,
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
    holidayName: "Team Building Day",
    fromDate: new Date("2024-08-15"),
    endDate: new Date("2024-08-16"),
    totalDays: 2,
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-26"),
    draftedAt: new Date("2024-01-31"),
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

export default function WeeklyHolidaysGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Weekly Holidays grid rendered");

  const navigate = useNavigate();

  const [weeklyHolidaysDataState, setWeeklyHolidaysDataState] =
    useState(weeklyHolidaysData);
  const canDelete: boolean = usePermission("weeklyHolidays", "delete");
  const canRestore: boolean = usePermission("weeklyHolidays", "restore");
  const canEdit: boolean = usePermission("weeklyHolidays", "edit");

  // Debug permissions
  console.log("Weekly Holidays Permissions:", {
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

    const holidayNames = [
      "Public Holiday",
      "Company Holiday",
      "Special Event",
      "Religious Holiday",
      "National Holiday",
      "Seasonal Break",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      holidayName: `${
        holidayNames[Math.floor(Math.random() * holidayNames.length)]
      } ${Math.floor(Math.random() * 1000)}`,
      fromDate: new Date(),
      endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      totalDays: Math.floor(Math.random() * 10) + 1,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (weeklyHolidaysDataState.length >= 46) {
      setHasMore(false);
    } else {
      setWeeklyHolidaysDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [weeklyHolidaysDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (holidayId: string) => {
    setWeeklyHolidaysDataState((prevHolidays) =>
      prevHolidays.map((holiday) =>
        holiday.id === holidayId
          ? {
              ...holiday,
              isDeleted: holiday.isDeleted === true ? false : true,
            }
          : holiday
      )
    );
  };

  const handleRestoreClick = (holidayId: string) => {
    setWeeklyHolidaysDataState((prevHolidays) =>
      prevHolidays.map((holiday) =>
        holiday.id === holidayId
          ? {
              ...holiday,
              isDeleted: holiday.isDeleted === true ? false : true,
            }
          : holiday
      )
    );
  };

  // Filter holidays based on search query
  const filteredHolidays = weeklyHolidaysDataState.filter(
    (holiday) =>
      holiday.holidayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holiday.fromDate
        .toDateString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      holiday.endDate
        .toDateString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      holiday.totalDays.toString().includes(searchQuery)
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
          Total {weeklyHolidaysData.length} holidays
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
            {filteredHolidays.map((holiday, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/weekly-holidays/1`)}
                  >
                    {holiday.holidayName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        holiday.isActive && !holiday.isDraft
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : holiday.isDraft
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {holiday.isDraft
                        ? "Draft"
                        : holiday.isActive
                        ? "Active"
                        : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: From Date | Actions | Total Days */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* From Date - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      From Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {holiday.fromDate.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        holiday.isDeleted && canRestore
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
                        disabled={holiday.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          holiday.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && holiday.isDeleted) {
                            handleRestoreClick(holiday.id);
                            toastRestore("Holiday restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(holiday.id);
                              toastDelete("Holiday deleted successfully");
                            }
                          }
                        }}
                      >
                        {holiday.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/weekly-holidays/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Total Days - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total Days
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {holiday.totalDays} days
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
                <span className="text-sm">Loading more holidays...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredHolidays.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more holidays to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={weeklyHolidaysData}
                setFilteredData={setWeeklyHolidaysDataState}
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
                data={weeklyHolidaysData}
                setFilteredData={setWeeklyHolidaysDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
