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

// Designation interface
interface DesignationItem {
  id: string;
  code: string;
  designationName: string;
  description: string;
  department: string;
  employeeCount: number;
  minSalary: string;
  maxSalary: string;
}

// Mock data - replace with real data from your API
const designations: DesignationItem[] = [
  {
    id: "1",
    code: "DES-001",
    designationName: "Software Engineer",
    description: "Develops and maintains software applications",
    department: "Information Technology",
    employeeCount: 25,
    minSalary: "$60,000",
    maxSalary: "$120,000",
  },
  {
    id: "2",
    code: "DES-002",
    designationName: "HR Manager",
    description: "Manages human resources operations and policies",
    department: "Human Resources",
    employeeCount: 8,
    minSalary: "$70,000",
    maxSalary: "$110,000",
  },
  {
    id: "3",
    code: "DES-003",
    designationName: "Marketing Specialist",
    description: "Creates and executes marketing campaigns",
    department: "Marketing",
    employeeCount: 12,
    minSalary: "$45,000",
    maxSalary: "$80,000",
  },
  {
    id: "4",
    code: "DES-004",
    designationName: "Financial Analyst",
    description: "Analyzes financial data and prepares reports",
    department: "Finance",
    employeeCount: 10,
    minSalary: "$55,000",
    maxSalary: "$95,000",
  },
  {
    id: "5",
    code: "DES-005",
    designationName: "Sales Representative",
    description: "Generates leads and closes sales deals",
    department: "Sales",
    employeeCount: 20,
    minSalary: "$40,000",
    maxSalary: "$90,000",
  },
  {
    id: "6",
    code: "DES-006",
    designationName: "Operations Manager",
    description: "Oversees daily business operations",
    department: "Operations",
    employeeCount: 6,
    minSalary: "$65,000",
    maxSalary: "$105,000",
  },
  {
    id: "7",
    code: "DES-007",
    designationName: "Customer Support Agent",
    description: "Provides customer service and support",
    department: "Customer Service",
    employeeCount: 15,
    minSalary: "$35,000",
    maxSalary: "$55,000",
  },
  {
    id: "8",
    code: "DES-008",
    designationName: "Research Scientist",
    description: "Conducts research and development activities",
    department: "Research & Development",
    employeeCount: 8,
    minSalary: "$75,000",
    maxSalary: "$130,000",
  },
  {
    id: "9",
    code: "DES-009",
    designationName: "Legal Counsel",
    description: "Provides legal advice and representation",
    department: "Legal",
    employeeCount: 4,
    minSalary: "$90,000",
    maxSalary: "$150,000",
  },
  {
    id: "10",
    code: "DES-010",
    designationName: "Quality Assurance Tester",
    description: "Tests software and ensures quality standards",
    department: "Quality Assurance",
    employeeCount: 12,
    minSalary: "$50,000",
    maxSalary: "$85,000",
  },
  {
    id: "11",
    code: "DES-011",
    designationName: "Supply Chain Coordinator",
    description: "Manages supply chain and logistics operations",
    department: "Supply Chain",
    employeeCount: 7,
    minSalary: "$45,000",
    maxSalary: "$75,000",
  },
  {
    id: "12",
    code: "DES-012",
    designationName: "Training Coordinator",
    description: "Develops and delivers training programs",
    department: "Training & Development",
    employeeCount: 5,
    minSalary: "$40,000",
    maxSalary: "$70,000",
  },
  {
    id: "13",
    code: "DES-013",
    designationName: "Security Officer",
    description: "Ensures physical and digital security",
    department: "Security",
    employeeCount: 10,
    minSalary: "$35,000",
    maxSalary: "$60,000",
  },
  {
    id: "14",
    code: "DES-014",
    designationName: "Administrative Assistant",
    description: "Provides administrative support services",
    department: "Administration",
    employeeCount: 8,
    minSalary: "$30,000",
    maxSalary: "$50,000",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function DesignationGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Designation grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [designationsData, setDesignationsData] =
    useState<DesignationItem[]>(designations);
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
      "DES-015",
      "DES-016",
      "DES-017",
      "DES-018",
      "DES-019",
      "DES-020",
      "DES-021",
      "DES-022",
      "DES-023",
      "DES-024",
    ];
    const designationNames = [
      "Software Engineer",
      "HR Manager",
      "Marketing Specialist",
      "Financial Analyst",
      "Sales Representative",
      "Operations Manager",
      "Customer Support Agent",
      "Research Scientist",
      "Legal Counsel",
      "Quality Assurance Tester",
    ];
    const descriptions = [
      "Develops and maintains software applications",
      "Manages human resources operations and policies",
      "Creates and executes marketing campaigns",
      "Analyzes financial data and prepares reports",
      "Generates leads and closes sales deals",
      "Oversees daily business operations",
      "Provides customer service and support",
      "Conducts research and development activities",
      "Provides legal advice and representation",
      "Tests software and ensures quality standards",
    ];
    const departments = [
      "Information Technology",
      "Human Resources",
      "Marketing",
      "Finance",
      "Sales",
      "Operations",
      "Customer Service",
      "Research & Development",
      "Legal",
      "Quality Assurance",
    ];
    const employeeCounts = [25, 8, 12, 10, 20, 6, 15, 8, 4, 12];
    const minSalaries = [
      "$60,000",
      "$70,000",
      "$45,000",
      "$55,000",
      "$40,000",
      "$65,000",
      "$35,000",
      "$75,000",
      "$90,000",
      "$50,000",
    ];
    const maxSalaries = [
      "$120,000",
      "$110,000",
      "$80,000",
      "$95,000",
      "$90,000",
      "$105,000",
      "$55,000",
      "$130,000",
      "$150,000",
      "$85,000",
    ];

    const newItems: DesignationItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const designationName =
          designationNames[Math.floor(Math.random() * designationNames.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];
        const department =
          departments[Math.floor(Math.random() * departments.length)];
        const employeeCount =
          employeeCounts[Math.floor(Math.random() * employeeCounts.length)];
        const minSalary =
          minSalaries[Math.floor(Math.random() * minSalaries.length)];
        const maxSalary =
          maxSalaries[Math.floor(Math.random() * maxSalaries.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          designationName,
          description,
          department,
          employeeCount,
          minSalary,
          maxSalary,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (designationsData.length >= 46) {
      setHasMore(false);
    } else {
      setDesignationsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [designationsData.length, isLoading, hasMore]);

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

  // Filter designations based on search query (search across multiple fields)
  const filteredDesignations = designationsData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.minSalary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.maxSalary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (designationId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/designation/view/${designationId}?fromView=${viewMode}`);
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
            {filteredDesignations.map((item, index) => {
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
                  {/* Designation Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.designationName}
                    </CardTitle>
                  </div>

                  {/* Designation Information */}
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
                      <span className="font-medium">Department:</span>
                      <span className="truncate">{item.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Employee Count:</span>
                      <span className="truncate">{item.employeeCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Min Salary:</span>
                      <span className="truncate">{item.minSalary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Max Salary:</span>
                      <span className="truncate">{item.maxSalary}</span>
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
                <span className="text-sm">Loading more designations...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDesignations.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more designations to load
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
                data={designations}
                setFilteredData={setDesignationsData}
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
                data={designations}
                setFilteredData={setDesignationsData}
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
