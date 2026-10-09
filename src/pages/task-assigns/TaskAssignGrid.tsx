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

type TaskAssignDataType = {
  id: string;
  branch: string;
  Employee: string;
  Date: string;
  Timeline: string;
  Description: string;
  isDeleted: boolean;
};

// Mock data - replace with real data from your API
const taskAssignData: TaskAssignDataType[] = [
  {
    id: "TASK-001",
    branch: "Dhaka",
    Employee: "Rahim Uddin",
    Date: "2025-08-01",
    Timeline: "2 weeks",
    Description:
      "Setup initial project repository and configure CI/CD pipelines.",
    isDeleted: false,
  },
  {
    id: "TASK-002",
    branch: "Chattogram",
    Employee: "Shuvo Roy",
    Date: "2025-08-03",
    Timeline: "1 week",
    Description: "Design dashboard wireframes for management review.",
    isDeleted: false,
  },
  {
    id: "TASK-003",
    branch: "Khulna",
    Employee: "Nusrat Jahan",
    Date: "2025-08-05",
    Timeline: "3 days",
    Description: "Conduct user requirement gathering from stakeholders.",
    isDeleted: false,
  },
  {
    id: "TASK-004",
    branch: "Sylhet",
    Employee: "Hasib Hasan",
    Date: "2025-08-06",
    Timeline: "1 month",
    Description: "Develop authentication module using Supabase auth.",
    isDeleted: false,
  },
  {
    id: "TASK-005",
    branch: "Dhaka",
    Employee: "Maliha Akter",
    Date: "2025-08-08",
    Timeline: "2 weeks",
    Description: "Create REST API documentation for frontend team.",
    isDeleted: false,
  },
  {
    id: "TASK-006",
    branch: "Rajshahi",
    Employee: "Jamil Khan",
    Date: "2025-08-10",
    Timeline: "10 days",
    Description: "Implement role-based access control in ERP system.",
    isDeleted: true,
  },
  {
    id: "TASK-007",
    branch: "Barishal",
    Employee: "Mahima Rahman",
    Date: "2025-08-11",
    Timeline: "5 days",
    Description: "Setup testing environment with Docker containers.",
    isDeleted: false,
  },
  {
    id: "TASK-008",
    branch: "Rangpur",
    Employee: "Faridul Islam",
    Date: "2025-08-12",
    Timeline: "8 days",
    Description: "Prepare financial report for quarterly audit.",
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

export default function CountriesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Countries grid rendered");

  const navigate = useNavigate();

  const [taskAssignsData, setTaskAssignsData] = useState(taskAssignData);
  const canDelete: boolean = usePermission("task-assigns", "delete");
  const canRestore: boolean = usePermission("task-assigns", "restore");
  const canEdit: boolean = usePermission("task-assigns", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      branch: `Branch ${taskAssignsData.length + index + 1}`,
      Employee: `Employee ${taskAssignsData.length + index + 1}`,
      Date: `Date ${taskAssignsData.length + index + 1}`,
      Timeline: `Timeline ${taskAssignsData.length + index + 1}`,
      Description: `Description ${taskAssignsData.length + index + 1}`,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (taskAssignsData.length >= 46) {
      setHasMore(false);
    } else {
      setTaskAssignsData(
        (prev) => [...prev, ...newItems] as TaskAssignDataType[]
      );
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [taskAssignsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (countryId: string) => {
    setTaskAssignsData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  const handleRestoreClick = (countryId: string) => {
    setTaskAssignsData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  // Filter countries based on search query
  const filteredTaskAssigns = taskAssignsData.filter(
    (taskAssign) =>
      taskAssign.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taskAssign.Employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taskAssign.Date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taskAssign.Timeline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taskAssign.Description.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {taskAssignsData.length} task assigns
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
            {filteredTaskAssigns.map((taskAssign, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/task-assigns/1`)}
                  >
                    {taskAssign.branch}
                  </CardTitle>

                  {/* Right - Flag */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Employee
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {taskAssign.Employee}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {taskAssign.Date}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        taskAssign.isDeleted && canRestore
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
                        disabled={taskAssign.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          taskAssign.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && taskAssign.isDeleted) {
                            handleRestoreClick(taskAssign.id);
                            toastRestore("Task assign restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(taskAssign.id);
                              toastDelete("Task assign deleted successfully");
                            }
                          }
                        }}
                      >
                        {taskAssign.isDeleted && canRestore ? (
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
                            navigate(`/task-assigns/edit/${taskAssign.id}`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Timeline
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {taskAssign.Timeline}
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
                <span className="text-sm">Loading more task assigns...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTaskAssigns.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more task assigns to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={taskAssignsData}
                setFilteredData={setTaskAssignsData}
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
                data={taskAssignsData}
                setFilteredData={setTaskAssignsData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
