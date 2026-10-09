import { Card, CardTitle } from "@/components/ui/card";
// import { toastDelete, toastRestore } from "@/lib/toast";
// import { Tooltip } from "@mantine/core";
// import { RefreshCw, Trash2, Check, Pause } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { Shield, User, Crown } from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Task Category interface
interface TaskCategoryItem {
  id: string;
  department: string;
  designation: string;
  task: string;
  description: string;
}

// Mock data - replace with real data from your API
const taskCategories: TaskCategoryItem[] = [
  {
    id: "1",
    department: "Kitchen",
    designation: "Head Chef",
    task: "Menu Planning",
    description: "Plan and design restaurant menu items",
  },
  {
    id: "2",
    department: "Kitchen",
    designation: "Sous Chef",
    task: "Food Preparation",
    description: "Prepare and cook food items according to recipes",
  },
  {
    id: "3",
    department: "Service",
    designation: "Waiter",
    task: "Table Service",
    description: "Serve customers and take orders",
  },
  {
    id: "4",
    department: "Service",
    designation: "Host/Hostess",
    task: "Customer Greeting",
    description: "Welcome and seat customers",
  },
  {
    id: "5",
    department: "Management",
    designation: "Restaurant Manager",
    task: "Staff Management",
    description: "Manage restaurant staff and operations",
  },
  {
    id: "6",
    department: "Kitchen",
    designation: "Line Cook",
    task: "Food Cooking",
    description: "Cook food items on the line during service",
  },
  {
    id: "7",
    department: "Service",
    designation: "Bartender",
    task: "Beverage Service",
    description: "Prepare and serve drinks to customers",
  },
  {
    id: "8",
    department: "Cleaning",
    designation: "Dishwasher",
    task: "Dish Washing",
    description: "Clean dishes, utensils, and kitchen equipment",
  },
  {
    id: "9",
    department: "Management",
    designation: "Assistant Manager",
    task: "Inventory Management",
    description: "Manage restaurant inventory and supplies",
  },
  {
    id: "10",
    department: "Service",
    designation: "Cashier",
    task: "Payment Processing",
    description: "Process customer payments and handle cash",
  },
  {
    id: "11",
    department: "Kitchen",
    designation: "Prep Cook",
    task: "Food Prep",
    description: "Prepare ingredients for cooking",
  },
  {
    id: "12",
    department: "Cleaning",
    designation: "Janitor",
    task: "General Cleaning",
    description: "Clean restaurant premises and facilities",
  },
  {
    id: "13",
    department: "Management",
    designation: "Shift Supervisor",
    task: "Shift Management",
    description: "Supervise restaurant operations during shifts",
  },
  {
    id: "14",
    department: "Service",
    designation: "Busboy",
    task: "Table Clearing",
    description: "Clear and clean tables after customers leave",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function TaskCategoryGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Task Category grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [taskCategoriesData, setTaskCategoriesData] =
    useState<TaskCategoryItem[]>(taskCategories);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

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

    const departments = [
      "Kitchen",
      "Service",
      "Management",
      "Cleaning",
      "Bar",
      "Front Office",
      "Maintenance",
      "Security",
    ];
    const designations = [
      "Head Chef",
      "Sous Chef",
      "Waiter",
      "Manager",
      "Bartender",
      "Host/Hostess",
      "Line Cook",
      "Cashier",
    ];
    const tasks = [
      "Menu Planning",
      "Food Preparation",
      "Table Service",
      "Staff Management",
      "Beverage Service",
      "Customer Greeting",
      "Food Cooking",
      "Payment Processing",
    ];
    const descriptions = [
      "Plan and design restaurant menu items",
      "Prepare and cook food items according to recipes",
      "Serve customers and take orders",
      "Manage restaurant staff and operations",
      "Prepare and serve drinks to customers",
      "Welcome and seat customers",
      "Cook food items on the line during service",
      "Process customer payments and handle cash",
    ];

    const newItems: TaskCategoryItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const department =
          departments[Math.floor(Math.random() * departments.length)];
        const designation =
          designations[Math.floor(Math.random() * designations.length)];
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          department,
          designation,
          task,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (taskCategoriesData.length >= 46) {
      setHasMore(false);
    } else {
      setTaskCategoriesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [taskCategoriesData.length, isLoading, hasMore]);

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

  // Filter task categories based on search query (search across multiple fields)
  const filteredTaskCategories = taskCategoriesData.filter(
    (item) =>
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (taskCategoryId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/task-category/view/${taskCategoryId}?fromView=${viewMode}`);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg overflow-hidden"
      )}
    >
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Cards container with animated width */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-y-auto grid-scroll transition-all duration-300 ease-in-out",
            isRTL ? "" : ""
          )}
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div
            className={cn(
              "grid gap-6 pb-4 p-5",
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {filteredTaskCategories.map((item, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(item.id)}
                >
                  {/* Task Category Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.task}
                    </CardTitle>
                  </div>

                  {/* Task Category Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Department:</span>
                      <span className="truncate">{item.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Designation:</span>
                      <span className="truncate">{item.designation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Description:</span>
                      <span className="truncate">{item.description}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more task categories...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTaskCategories.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more task categories to load
              </span>
            </div>
          )}
        </div>

        {/* Animated Filter Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isFilterOpen
              ? "translate-x-0 opacity-100 visible"
              : isRTL
              ? "-translate-x-full opacity-0 invisible"
              : "translate-x-full opacity-0 invisible"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={taskCategories}
                setFilteredData={setTaskCategoriesData}
                setShowTabs={setIsFilterOpen}
                defaultTab="filter"
              />
            </div>
          </div>
        </div>

        {/* Animated Export Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isExportOpen
              ? "translate-x-0 opacity-100"
              : isRTL
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={taskCategories}
                setFilteredData={setTaskCategoriesData}
                setShowTabs={setIsExportOpen}
                defaultTab="export"
              />
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile/smaller screens */}
        {(isFilterOpen || isExportOpen) && (
          <div
            className={cn(
              "fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out z-5",
              isMobile ? "" : "md:hidden", // Always show overlay on mobile
              isFilterOpen || isExportOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => {
              setIsFilterOpen(false);
              setIsExportOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
