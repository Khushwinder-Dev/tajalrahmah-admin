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

// Department interface
interface DepartmentItem {
  id: string;
  code: string;
  departmentName: string;
  description: string;
  manager: string;
  employees: number;
  budget: string;
}

// Mock data - replace with real data from your API
const departments: DepartmentItem[] = [
  {
    id: "1",
    code: "DEPT-001",
    departmentName: "Human Resources",
    description: "Managing employee relations and recruitment",
    manager: "Sarah Johnson",
    employees: 12,
    budget: "$500,000",
  },
  {
    id: "2",
    code: "DEPT-002",
    departmentName: "Information Technology",
    description: "Software development and IT infrastructure",
    manager: "Michael Chen",
    employees: 25,
    budget: "$1,200,000",
  },
  {
    id: "3",
    code: "DEPT-003",
    departmentName: "Marketing",
    description: "Brand promotion and customer acquisition",
    manager: "Emily Rodriguez",
    employees: 18,
    budget: "$800,000",
  },
  {
    id: "4",
    code: "DEPT-004",
    departmentName: "Finance",
    description: "Financial planning and accounting operations",
    manager: "David Thompson",
    employees: 15,
    budget: "$600,000",
  },
  {
    id: "5",
    code: "DEPT-005",
    departmentName: "Sales",
    description: "Customer acquisition and revenue generation",
    manager: "Lisa Anderson",
    employees: 30,
    budget: "$1,500,000",
  },
  {
    id: "6",
    code: "DEPT-006",
    departmentName: "Operations",
    description: "Business operations and process optimization",
    manager: "Robert Wilson",
    employees: 22,
    budget: "$900,000",
  },
  {
    id: "7",
    code: "DEPT-007",
    departmentName: "Customer Service",
    description: "Customer support and satisfaction",
    manager: "Jennifer Brown",
    employees: 20,
    budget: "$700,000",
  },
  {
    id: "8",
    code: "DEPT-008",
    departmentName: "Research & Development",
    description: "Product innovation and development",
    manager: "Dr. Alex Kumar",
    employees: 16,
    budget: "$1,000,000",
  },
  {
    id: "9",
    code: "DEPT-009",
    departmentName: "Legal",
    description: "Legal compliance and contract management",
    manager: "Attorney Maria Garcia",
    employees: 8,
    budget: "$400,000",
  },
  {
    id: "10",
    code: "DEPT-010",
    departmentName: "Quality Assurance",
    description: "Product quality control and testing",
    manager: "James Miller",
    employees: 14,
    budget: "$550,000",
  },
  {
    id: "11",
    code: "DEPT-011",
    departmentName: "Supply Chain",
    description: "Procurement and logistics management",
    manager: "Amanda Taylor",
    employees: 19,
    budget: "$750,000",
  },
  {
    id: "12",
    code: "DEPT-012",
    departmentName: "Training & Development",
    description: "Employee training and skill development",
    manager: "Kevin Lee",
    employees: 10,
    budget: "$350,000",
  },
  {
    id: "13",
    code: "DEPT-013",
    departmentName: "Security",
    description: "Physical and cybersecurity operations",
    manager: "Captain John Smith",
    employees: 12,
    budget: "$450,000",
  },
  {
    id: "14",
    code: "DEPT-014",
    departmentName: "Administration",
    description: "General administrative support services",
    manager: "Patricia Davis",
    employees: 6,
    budget: "$300,000",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function DepartmentGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Department grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [departmentsData, setDepartmentsData] =
    useState<DepartmentItem[]>(departments);
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

    const codes = [
      "DEPT-015",
      "DEPT-016",
      "DEPT-017",
      "DEPT-018",
      "DEPT-019",
      "DEPT-020",
      "DEPT-021",
      "DEPT-022",
      "DEPT-023",
      "DEPT-024",
    ];
    const departmentNames = [
      "Human Resources",
      "Information Technology",
      "Marketing",
      "Finance",
      "Sales",
      "Operations",
      "Customer Service",
      "Research & Development",
      "Legal",
      "Quality Assurance",
    ];
    const descriptions = [
      "Managing employee relations and recruitment",
      "Software development and IT infrastructure",
      "Brand promotion and customer acquisition",
      "Financial planning and accounting operations",
      "Customer acquisition and revenue generation",
      "Business operations and process optimization",
      "Customer support and satisfaction",
      "Product innovation and development",
      "Legal compliance and contract management",
      "Product quality control and testing",
    ];
    const managers = [
      "Sarah Johnson",
      "Michael Chen",
      "Emily Rodriguez",
      "David Thompson",
      "Lisa Anderson",
      "Robert Wilson",
      "Jennifer Brown",
      "Dr. Alex Kumar",
      "Attorney Maria Garcia",
      "James Miller",
    ];
    const employeeCounts = [12, 15, 18, 20, 25, 30, 8, 16, 10, 14];
    const budgets = [
      "$500,000",
      "$800,000",
      "$1,200,000",
      "$600,000",
      "$1,500,000",
      "$900,000",
      "$700,000",
      "$1,000,000",
      "$400,000",
      "$550,000",
    ];

    const newItems: DepartmentItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const departmentName =
          departmentNames[Math.floor(Math.random() * departmentNames.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];
        const manager = managers[Math.floor(Math.random() * managers.length)];
        const employees =
          employeeCounts[Math.floor(Math.random() * employeeCounts.length)];
        const budget = budgets[Math.floor(Math.random() * budgets.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          departmentName,
          description,
          manager,
          employees,
          budget,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (departmentsData.length >= 46) {
      setHasMore(false);
    } else {
      setDepartmentsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [departmentsData.length, isLoading, hasMore]);

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

  // Filter departments based on search query (search across multiple fields)
  const filteredDepartments = departmentsData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.budget.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (departmentId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/department/view/${departmentId}?fromView=${viewMode}`);
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
            {filteredDepartments.map((item, index) => {
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
                  {/* Department Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.departmentName}
                    </CardTitle>
                  </div>

                  {/* Department Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Description:</span>
                      <span className="truncate">{item.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Manager:</span>
                      <span className="truncate">{item.manager}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Employees:</span>
                      <span className="truncate">{item.employees}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Budget:</span>
                      <span className="truncate">{item.budget}</span>
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
                <span className="text-sm">Loading more departments...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDepartments.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more departments to load
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
                data={departments}
                setFilteredData={setDepartmentsData}
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
                data={departments}
                setFilteredData={setDepartmentsData}
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
