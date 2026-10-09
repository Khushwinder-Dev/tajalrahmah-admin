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

// Employee interface
interface EmployeeItem {
  id: string;
  code: string;
  employeeName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: string;
  manager: string;
  location: string;
}

// Mock data - replace with real data from your API
const employees: EmployeeItem[] = [
  {
    id: "1",
    code: "EMP-001",
    employeeName: "John Smith",
    email: "john.smith@company.com",
    phone: "+1-555-0123",
    department: "Information Technology",
    designation: "Software Engineer",
    salary: "$85,000",
    manager: "Sarah Johnson",
    location: "New York, NY",
  },
  {
    id: "2",
    code: "EMP-002",
    employeeName: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1-555-0124",
    department: "Human Resources",
    designation: "HR Manager",
    salary: "$75,000",
    manager: "Michael Chen",
    location: "Los Angeles, CA",
  },
  {
    id: "3",
    code: "EMP-003",
    employeeName: "Robert Wilson",
    email: "robert.wilson@company.com",
    phone: "+1-555-0125",
    department: "Marketing",
    designation: "Marketing Specialist",
    salary: "$65,000",
    manager: "Lisa Rodriguez",
    location: "Chicago, IL",
  },
  {
    id: "4",
    code: "EMP-004",
    employeeName: "Jennifer Brown",
    email: "jennifer.brown@company.com",
    phone: "+1-555-0126",
    department: "Finance",
    designation: "Financial Analyst",
    salary: "$70,000",
    manager: "David Thompson",
    location: "Houston, TX",
  },
  {
    id: "5",
    code: "EMP-005",
    employeeName: "Michael Garcia",
    email: "michael.garcia@company.com",
    phone: "+1-555-0127",
    department: "Sales",
    designation: "Sales Representative",
    salary: "$60,000",
    manager: "Amanda White",
    location: "Phoenix, AZ",
  },
  {
    id: "6",
    code: "EMP-006",
    employeeName: "Sarah Martinez",
    email: "sarah.martinez@company.com",
    phone: "+1-555-0128",
    department: "Operations",
    designation: "Operations Manager",
    salary: "$80,000",
    manager: "James Anderson",
    location: "Philadelphia, PA",
  },
  {
    id: "7",
    code: "EMP-007",
    employeeName: "David Lee",
    email: "david.lee@company.com",
    phone: "+1-555-0129",
    department: "Customer Service",
    designation: "Customer Support Agent",
    salary: "$45,000",
    manager: "Rachel Green",
    location: "San Antonio, TX",
  },
  {
    id: "8",
    code: "EMP-008",
    employeeName: "Lisa Taylor",
    email: "lisa.taylor@company.com",
    phone: "+1-555-0130",
    department: "Research & Development",
    designation: "Research Scientist",
    salary: "$95,000",
    manager: "Kevin Miller",
    location: "San Diego, CA",
  },
  {
    id: "9",
    code: "EMP-009",
    employeeName: "James Anderson",
    email: "james.anderson@company.com",
    phone: "+1-555-0131",
    department: "Legal",
    designation: "Legal Counsel",
    salary: "$120,000",
    manager: "Patricia Davis",
    location: "Dallas, TX",
  },
  {
    id: "10",
    code: "EMP-010",
    employeeName: "Rachel Green",
    email: "rachel.green@company.com",
    phone: "+1-555-0132",
    department: "Quality Assurance",
    designation: "Quality Assurance Tester",
    salary: "$65,000",
    manager: "Thomas Wilson",
    location: "San Jose, CA",
  },
  {
    id: "11",
    code: "EMP-011",
    employeeName: "Kevin Miller",
    email: "kevin.miller@company.com",
    phone: "+1-555-0133",
    department: "Supply Chain",
    designation: "Supply Chain Coordinator",
    salary: "$55,000",
    manager: "Jennifer Brown",
    location: "Austin, TX",
  },
  {
    id: "12",
    code: "EMP-012",
    employeeName: "Patricia Davis",
    email: "patricia.davis@company.com",
    phone: "+1-555-0134",
    department: "Training & Development",
    designation: "Training Coordinator",
    salary: "$50,000",
    manager: "Robert Wilson",
    location: "Jacksonville, FL",
  },
  {
    id: "13",
    code: "EMP-013",
    employeeName: "Thomas Wilson",
    email: "thomas.wilson@company.com",
    phone: "+1-555-0135",
    department: "Security",
    designation: "Security Officer",
    salary: "$40,000",
    manager: "Emily Davis",
    location: "Fort Worth, TX",
  },
  {
    id: "14",
    code: "EMP-014",
    employeeName: "Amanda White",
    email: "amanda.white@company.com",
    phone: "+1-555-0136",
    department: "Administration",
    designation: "Administrative Assistant",
    salary: "$35,000",
    manager: "John Smith",
    location: "Columbus, OH",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function EmployeeGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Employee grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [employeesData, setEmployeesData] = useState<EmployeeItem[]>(employees);
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
      "EMP-015",
      "EMP-016",
      "EMP-017",
      "EMP-018",
      "EMP-019",
      "EMP-020",
      "EMP-021",
      "EMP-022",
      "EMP-023",
      "EMP-024",
    ];
    const employeeNames = [
      "Alex Johnson",
      "Maria Rodriguez",
      "Chris Thompson",
      "Jessica Lee",
      "Daniel Kim",
      "Ashley Brown",
      "Ryan Davis",
      "Samantha Wilson",
      "Matthew Garcia",
      "Nicole Martinez",
    ];
    const emails = [
      "alex.johnson@company.com",
      "maria.rodriguez@company.com",
      "chris.thompson@company.com",
      "jessica.lee@company.com",
      "daniel.kim@company.com",
      "ashley.brown@company.com",
      "ryan.davis@company.com",
      "samantha.wilson@company.com",
      "matthew.garcia@company.com",
      "nicole.martinez@company.com",
    ];
    const phones = [
      "+1-555-0201",
      "+1-555-0202",
      "+1-555-0203",
      "+1-555-0204",
      "+1-555-0205",
      "+1-555-0206",
      "+1-555-0207",
      "+1-555-0208",
      "+1-555-0209",
      "+1-555-0210",
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
    const designations = [
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
    const salaries = [
      "$85,000",
      "$75,000",
      "$65,000",
      "$70,000",
      "$60,000",
      "$80,000",
      "$45,000",
      "$95,000",
      "$120,000",
      "$65,000",
    ];
    const managers = [
      "Sarah Johnson",
      "Michael Chen",
      "Lisa Rodriguez",
      "David Thompson",
      "Amanda White",
      "James Anderson",
      "Rachel Green",
      "Kevin Miller",
      "Patricia Davis",
      "Thomas Wilson",
    ];
    const locations = [
      "New York, NY",
      "Los Angeles, CA",
      "Chicago, IL",
      "Houston, TX",
      "Phoenix, AZ",
      "Philadelphia, PA",
      "San Antonio, TX",
      "San Diego, CA",
      "Dallas, TX",
      "San Jose, CA",
    ];

    const newItems: EmployeeItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const employeeName =
          employeeNames[Math.floor(Math.random() * employeeNames.length)];
        const email = emails[Math.floor(Math.random() * emails.length)];
        const phone = phones[Math.floor(Math.random() * phones.length)];
        const department =
          departments[Math.floor(Math.random() * departments.length)];
        const designation =
          designations[Math.floor(Math.random() * designations.length)];
        const salary = salaries[Math.floor(Math.random() * salaries.length)];
        const manager = managers[Math.floor(Math.random() * managers.length)];
        const location =
          locations[Math.floor(Math.random() * locations.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          employeeName,
          email,
          phone,
          department,
          designation,
          salary,
          manager,
          location,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (employeesData.length >= 46) {
      setHasMore(false);
    } else {
      setEmployeesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [employeesData.length, isLoading, hasMore]);

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

  // Filter employees based on search query (search across multiple fields)
  const filteredEmployees = employeesData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.salary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (employeeId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/employee/view/${employeeId}?fromView=${viewMode}`);
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
            {filteredEmployees.map((item, index) => {
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
                  {/* Employee Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.employeeName}
                    </CardTitle>
                  </div>

                  {/* Employee Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span className="truncate">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Department:</span>
                      <span className="truncate">{item.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Designation:</span>
                      <span className="truncate">{item.designation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Salary:</span>
                      <span className="truncate">{item.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Manager:</span>
                      <span className="truncate">{item.manager}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="truncate">{item.location}</span>
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
                <span className="text-sm">Loading more employees...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredEmployees.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more employees to load
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
                data={employees}
                setFilteredData={setEmployeesData}
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
                data={employees}
                setFilteredData={setEmployeesData}
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
