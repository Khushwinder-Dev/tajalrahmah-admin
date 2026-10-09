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

// Promotion interface
interface PromotionItem {
  id: string;
  code: string;
  employeeName: string;
  fromPosition: string;
  toPosition: string;
  fromDepartment: string;
  toDepartment: string;
  fromSalary: string;
  toSalary: string;
  promotionDate: string;
  effectiveDate: string;
  approvedBy: string;
  reason: string;
  description: string;
}

// Mock data - replace with real data from your API
const promotions: PromotionItem[] = [
  {
    id: "1",
    code: "PRM-001",
    employeeName: "John Smith",
    fromPosition: "Junior Developer",
    toPosition: "Senior Developer",
    fromDepartment: "IT",
    toDepartment: "IT",
    fromSalary: "$60,000",
    toSalary: "$75,000",
    promotionDate: "2024-01-15",
    effectiveDate: "2024-02-01",
    approvedBy: "Sarah Johnson",
    reason: "Outstanding performance and technical growth",
    description:
      "Promoted due to exceptional coding skills and leadership potential",
  },
  {
    id: "2",
    code: "PRM-002",
    employeeName: "Emily Davis",
    fromPosition: "Marketing Coordinator",
    toPosition: "Marketing Manager",
    fromDepartment: "Marketing",
    toDepartment: "Marketing",
    fromSalary: "$45,000",
    toSalary: "$65,000",
    promotionDate: "2024-02-20",
    effectiveDate: "2024-03-01",
    approvedBy: "Michael Brown",
    reason: "Successful campaign management and team leadership",
    description:
      "Promoted for managing multiple successful marketing campaigns",
  },
  {
    id: "3",
    code: "PRM-003",
    employeeName: "Robert Wilson",
    fromPosition: "Sales Representative",
    toPosition: "Sales Manager",
    fromDepartment: "Sales",
    toDepartment: "Sales",
    fromSalary: "$50,000",
    toSalary: "$70,000",
    promotionDate: "2024-03-10",
    effectiveDate: "2024-04-01",
    approvedBy: "Lisa Anderson",
    reason: "Consistent sales performance and team building skills",
    description:
      "Promoted for exceeding sales targets and mentoring junior staff",
  },
  {
    id: "4",
    code: "PRM-004",
    employeeName: "Lisa Anderson",
    fromPosition: "HR Assistant",
    toPosition: "HR Specialist",
    fromDepartment: "Human Resources",
    toDepartment: "Human Resources",
    fromSalary: "$40,000",
    toSalary: "$55,000",
    promotionDate: "2024-04-05",
    effectiveDate: "2024-05-01",
    approvedBy: "David Martinez",
    reason: "Improved recruitment processes and employee relations",
    description:
      "Promoted for streamlining HR processes and improving employee satisfaction",
  },
  {
    id: "5",
    code: "PRM-005",
    employeeName: "David Martinez",
    fromPosition: "Accountant",
    toPosition: "Senior Accountant",
    fromDepartment: "Finance",
    toDepartment: "Finance",
    fromSalary: "$55,000",
    toSalary: "$70,000",
    promotionDate: "2024-05-12",
    effectiveDate: "2024-06-01",
    approvedBy: "Jennifer Taylor",
    reason: "Advanced financial analysis and reporting capabilities",
    description: "Promoted for developing new financial reporting systems",
  },
  {
    id: "6",
    code: "PRM-006",
    employeeName: "Jennifer Taylor",
    fromPosition: "Customer Service Rep",
    toPosition: "Customer Service Supervisor",
    fromDepartment: "Customer Service",
    toDepartment: "Customer Service",
    fromSalary: "$35,000",
    toSalary: "$50,000",
    promotionDate: "2024-06-18",
    effectiveDate: "2024-07-01",
    approvedBy: "Christopher Lee",
    reason: "Excellent customer satisfaction scores and team management",
    description:
      "Promoted for maintaining high customer satisfaction and training new staff",
  },
  {
    id: "7",
    code: "PRM-007",
    employeeName: "Christopher Lee",
    fromPosition: "Operations Analyst",
    toPosition: "Operations Manager",
    fromDepartment: "Operations",
    toDepartment: "Operations",
    fromSalary: "$60,000",
    toSalary: "$80,000",
    promotionDate: "2024-07-25",
    effectiveDate: "2024-08-01",
    approvedBy: "Amanda White",
    reason: "Process optimization and efficiency improvements",
    description:
      "Promoted for implementing cost-saving operational improvements",
  },
  {
    id: "8",
    code: "PRM-008",
    employeeName: "Amanda White",
    fromPosition: "Quality Inspector",
    toPosition: "Quality Manager",
    fromDepartment: "Quality Assurance",
    toDepartment: "Quality Assurance",
    fromSalary: "$45,000",
    toSalary: "$65,000",
    promotionDate: "2024-08-30",
    effectiveDate: "2024-09-01",
    approvedBy: "Kevin Thompson",
    reason: "Zero defect rate and quality system improvements",
    description:
      "Promoted for maintaining perfect quality standards and process improvements",
  },
  {
    id: "9",
    code: "PRM-009",
    employeeName: "Kevin Thompson",
    fromPosition: "Project Coordinator",
    toPosition: "Project Manager",
    fromDepartment: "Project Management",
    toDepartment: "Project Management",
    fromSalary: "$50,000",
    toSalary: "$70,000",
    promotionDate: "2024-09-15",
    effectiveDate: "2024-10-01",
    approvedBy: "Michelle Garcia",
    reason: "Successful project delivery and stakeholder management",
    description:
      "Promoted for delivering multiple projects on time and within budget",
  },
  {
    id: "10",
    code: "PRM-010",
    employeeName: "Michelle Garcia",
    fromPosition: "Business Analyst",
    toPosition: "Senior Business Analyst",
    fromDepartment: "Business Analysis",
    toDepartment: "Business Analysis",
    fromSalary: "$65,000",
    toSalary: "$85,000",
    promotionDate: "2024-10-22",
    effectiveDate: "2024-11-01",
    approvedBy: "Daniel Rodriguez",
    reason: "Strategic insights and process improvements",
    description:
      "Promoted for providing valuable business insights and recommendations",
  },
  {
    id: "11",
    code: "PRM-011",
    employeeName: "Daniel Rodriguez",
    fromPosition: "Junior Designer",
    toPosition: "UI/UX Designer",
    fromDepartment: "Design",
    toDepartment: "Design",
    fromSalary: "$45,000",
    toSalary: "$60,000",
    promotionDate: "2024-11-08",
    effectiveDate: "2024-12-01",
    approvedBy: "Rachel Moore",
    reason: "Creative design solutions and user experience improvements",
    description:
      "Promoted for innovative design work and improved user experience",
  },
  {
    id: "12",
    code: "PRM-012",
    employeeName: "Rachel Moore",
    fromPosition: "Content Writer",
    toPosition: "Content Manager",
    fromDepartment: "Content",
    toDepartment: "Content",
    fromSalary: "$40,000",
    toSalary: "$55,000",
    promotionDate: "2024-12-05",
    effectiveDate: "2025-01-01",
    approvedBy: "James Clark",
    reason: "Content strategy development and team leadership",
    description:
      "Promoted for developing comprehensive content strategies and managing writers",
  },
  {
    id: "13",
    code: "PRM-013",
    employeeName: "James Clark",
    fromPosition: "Network Administrator",
    toPosition: "IT Manager",
    fromDepartment: "IT",
    toDepartment: "IT",
    fromSalary: "$70,000",
    toSalary: "$90,000",
    promotionDate: "2025-01-10",
    effectiveDate: "2025-02-01",
    approvedBy: "Stephanie Lewis",
    reason: "IT infrastructure improvements and team management",
    description:
      "Promoted for modernizing IT infrastructure and leading technical team",
  },
  {
    id: "14",
    code: "PRM-014",
    employeeName: "Stephanie Lewis",
    fromPosition: "Training Coordinator",
    toPosition: "Training Manager",
    fromDepartment: "Training",
    toDepartment: "Training",
    fromSalary: "$45,000",
    toSalary: "$65,000",
    promotionDate: "2025-01-25",
    effectiveDate: "2025-02-15",
    approvedBy: "John Smith",
    reason: "Training program development and employee development",
    description:
      "Promoted for creating comprehensive training programs and improving employee skills",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function PromotionsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Promotions grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [promotionsData, setPromotionsData] =
    useState<PromotionItem[]>(promotions);
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
      "PRM-015",
      "PRM-016",
      "PRM-017",
      "PRM-018",
      "PRM-019",
      "PRM-020",
    ];
    const employeeNames = [
      "Alex Johnson",
      "Maria Rodriguez",
      "David Chen",
      "Sarah Williams",
      "Michael Brown",
      "Lisa Garcia",
      "James Wilson",
      "Emma Davis",
    ];
    const fromPositions = [
      "Junior Developer",
      "Marketing Coordinator",
      "Sales Representative",
      "HR Assistant",
      "Accountant",
      "Customer Service Rep",
      "Operations Analyst",
      "Quality Inspector",
    ];
    const toPositions = [
      "Senior Developer",
      "Marketing Manager",
      "Sales Manager",
      "HR Specialist",
      "Senior Accountant",
      "Customer Service Supervisor",
      "Operations Manager",
      "Quality Manager",
    ];
    const fromDepartments = [
      "IT",
      "Marketing",
      "Sales",
      "Human Resources",
      "Finance",
      "Customer Service",
      "Operations",
      "Quality Assurance",
    ];
    const toDepartments = [
      "IT",
      "Marketing",
      "Sales",
      "Human Resources",
      "Finance",
      "Customer Service",
      "Operations",
      "Quality Assurance",
    ];
    const fromSalaries = [
      "$40,000",
      "$45,000",
      "$50,000",
      "$55,000",
      "$60,000",
      "$65,000",
      "$70,000",
    ];
    const toSalaries = [
      "$55,000",
      "$60,000",
      "$65,000",
      "$70,000",
      "$75,000",
      "$80,000",
      "$85,000",
      "$90,000",
    ];
    const promotionDates = [
      "2024-01-15",
      "2024-02-20",
      "2024-03-10",
      "2024-04-05",
      "2024-05-12",
      "2024-06-18",
      "2024-07-25",
      "2024-08-30",
    ];
    const effectiveDates = [
      "2024-02-01",
      "2024-03-01",
      "2024-04-01",
      "2024-05-01",
      "2024-06-01",
      "2024-07-01",
      "2024-08-01",
      "2024-09-01",
    ];
    const approvedBy = [
      "Sarah Johnson",
      "Michael Brown",
      "Lisa Anderson",
      "David Martinez",
      "Jennifer Taylor",
      "Christopher Lee",
      "Amanda White",
      "Kevin Thompson",
    ];
    const reasons = [
      "Outstanding performance and technical growth",
      "Successful campaign management and team leadership",
      "Consistent sales performance and team building skills",
      "Improved recruitment processes and employee relations",
      "Advanced financial analysis and reporting capabilities",
      "Excellent customer satisfaction scores and team management",
      "Process optimization and efficiency improvements",
      "Zero defect rate and quality system improvements",
    ];
    const descriptions = [
      "Promoted due to exceptional coding skills and leadership potential",
      "Promoted for managing multiple successful marketing campaigns",
      "Promoted for exceeding sales targets and mentoring junior staff",
      "Promoted for streamlining HR processes and improving employee satisfaction",
      "Promoted for developing new financial reporting systems",
      "Promoted for maintaining high customer satisfaction and training new staff",
      "Promoted for implementing cost-saving operational improvements",
      "Promoted for maintaining perfect quality standards and process improvements",
    ];

    const newItems: PromotionItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const employeeName =
          employeeNames[Math.floor(Math.random() * employeeNames.length)];
        const fromPosition =
          fromPositions[Math.floor(Math.random() * fromPositions.length)];
        const toPosition =
          toPositions[Math.floor(Math.random() * toPositions.length)];
        const fromDepartment =
          fromDepartments[Math.floor(Math.random() * fromDepartments.length)];
        const toDepartment =
          toDepartments[Math.floor(Math.random() * toDepartments.length)];
        const fromSalary =
          fromSalaries[Math.floor(Math.random() * fromSalaries.length)];
        const toSalary =
          toSalaries[Math.floor(Math.random() * toSalaries.length)];
        const promotionDate =
          promotionDates[Math.floor(Math.random() * promotionDates.length)];
        const effectiveDate =
          effectiveDates[Math.floor(Math.random() * effectiveDates.length)];
        const approvedByPerson =
          approvedBy[Math.floor(Math.random() * approvedBy.length)];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          employeeName,
          fromPosition,
          toPosition,
          fromDepartment,
          toDepartment,
          fromSalary,
          toSalary,
          promotionDate,
          effectiveDate,
          approvedBy: approvedByPerson,
          reason,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (promotionsData.length >= 46) {
      setHasMore(false);
    } else {
      setPromotionsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [promotionsData.length, isLoading, hasMore]);

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

  // Filter promotions based on search query (search across multiple fields)
  const filteredPromotions = promotionsData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fromPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fromDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fromSalary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toSalary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.promotionDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.effectiveDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.approvedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (promotionId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/promotion/view/${promotionId}?fromView=${viewMode}`);
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
            {filteredPromotions.map((item, index) => {
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
                  {/* Promotion Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.employeeName}
                    </CardTitle>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {item.code}
                    </span>
                  </div>

                  {/* Promotion Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">From Position:</span>
                      <span className="truncate">{item.fromPosition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">To Position:</span>
                      <span className="truncate text-green-600 font-semibold">
                        {item.toPosition}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">From Department:</span>
                      <span className="truncate">{item.fromDepartment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">To Department:</span>
                      <span className="truncate">{item.toDepartment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">From Salary:</span>
                      <span className="truncate">{item.fromSalary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">To Salary:</span>
                      <span className="truncate text-green-600 font-semibold">
                        {item.toSalary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Promotion Date:</span>
                      <span className="truncate">{item.promotionDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Effective Date:</span>
                      <span className="truncate">{item.effectiveDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Approved By:</span>
                      <span className="truncate text-blue-600">
                        {item.approvedBy}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Reason:</span>
                      <span className="truncate">{item.reason}</span>
                    </div>
                    <div className="flex items-start gap-2">
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
                <span className="text-sm">Loading more promotions...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredPromotions.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more promotions to load
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
                data={promotions}
                setFilteredData={setPromotionsData}
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
                data={promotions}
                setFilteredData={setPromotionsData}
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
