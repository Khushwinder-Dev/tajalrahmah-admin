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

// Section interface
interface Section {
  id: string;
  code: string;
  name: string;
  description: string;
  manager: string;
  employeesCount: number;
  budget: number;
}

// Mock data - replace with real data from your API
const sections: Section[] = [
  {
    id: "1",
    code: "SEC-001",
    name: "Kitchen Section",
    description: "Main kitchen operations and food preparation",
    manager: "John Smith",
    employeesCount: 15,
    budget: 50000,
  },
  {
    id: "2",
    code: "SEC-002",
    name: "Dining Hall",
    description: "Customer service and dining area management",
    manager: "Sarah Johnson",
    employeesCount: 12,
    budget: 35000,
  },
  {
    id: "3",
    code: "SEC-003",
    name: "Bar Section",
    description: "Beverage service and bar operations",
    manager: "Mike Wilson",
    employeesCount: 8,
    budget: 25000,
  },
  {
    id: "4",
    code: "SEC-004",
    name: "Reception",
    description: "Customer reception and reservations",
    manager: "Emma Davis",
    employeesCount: 6,
    budget: 20000,
  },
  {
    id: "5",
    code: "SEC-005",
    name: "Cleaning & Maintenance",
    description: "Facility cleaning and equipment maintenance",
    manager: "David Brown",
    employeesCount: 10,
    budget: 30000,
  },
  {
    id: "6",
    code: "SEC-006",
    name: "Storage & Inventory",
    description: "Inventory management and storage operations",
    manager: "Lisa Anderson",
    employeesCount: 5,
    budget: 15000,
  },
  {
    id: "7",
    code: "SEC-007",
    name: "Security",
    description: "Security and safety management",
    manager: "Robert Taylor",
    employeesCount: 4,
    budget: 18000,
  },
  {
    id: "8",
    code: "SEC-008",
    name: "Delivery Section",
    description: "Food delivery and takeout operations",
    manager: "Jennifer White",
    employeesCount: 8,
    budget: 22000,
  },
  {
    id: "9",
    code: "SEC-009",
    name: "Admin Section",
    description: "Administrative and management operations",
    manager: "Michael Clark",
    employeesCount: 3,
    budget: 12000,
  },
  {
    id: "10",
    code: "SEC-010",
    name: "Event Planning",
    description: "Special events and catering services",
    manager: "Amanda Garcia",
    employeesCount: 7,
    budget: 28000,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function SectionGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sections grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [sectionsData, setSectionsData] = useState<Section[]>(sections);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const SECTIONS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const sectionNames = [
      "Customer Service",
      "Quality Control",
      "Training Department",
      "Marketing Section",
      "Finance Department",
      "Human Resources",
      "IT Support",
      "Procurement",
      "Logistics",
      "Research & Development",
      "Legal Department",
      "Public Relations",
      "Operations",
      "Sales Department",
      "Maintenance",
      "Safety & Compliance",
      "Business Development",
      "Customer Relations",
      "Technical Support",
      "Project Management",
    ];
    const managers = [
      "Alex Thompson",
      "Maria Rodriguez",
      "James Wilson",
      "Sarah Chen",
      "David Kumar",
      "Lisa Anderson",
      "Robert Taylor",
      "Jennifer White",
      "Michael Clark",
      "Amanda Garcia",
      "Christopher Lee",
      "Rachel Brown",
      "Daniel Martinez",
      "Emily Johnson",
      "Matthew Davis",
      "Jessica Miller",
      "Andrew Wilson",
      "Samantha Taylor",
      "Kevin Anderson",
      "Nicole Garcia",
    ];
    const descriptions = [
      "Department responsible for customer satisfaction and support",
      "Quality assurance and control operations",
      "Employee training and development programs",
      "Marketing strategies and promotional activities",
      "Financial planning and budget management",
      "Human resource management and recruitment",
      "Information technology support and maintenance",
      "Procurement and vendor management",
      "Supply chain and logistics operations",
      "Research and development initiatives",
      "Legal compliance and contract management",
      "Public relations and communication",
      "Daily operations and process management",
      "Sales strategies and revenue generation",
      "Equipment maintenance and repairs",
      "Safety protocols and compliance monitoring",
      "Business growth and expansion planning",
      "Customer relationship management",
      "Technical assistance and troubleshooting",
      "Project coordination and execution",
    ];

    const newSections: Section[] = Array.from(
      { length: SECTIONS_PER_PAGE },
      (_, index) => {
        const sectionName =
          sectionNames[Math.floor(Math.random() * sectionNames.length)];
        const manager = managers[Math.floor(Math.random() * managers.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        const employeesCount = Math.floor(Math.random() * 20) + 3;
        const budget = Math.floor(Math.random() * 100000) + 10000;

        return {
          id: `${Date.now()}-${index}`,
          code: `SEC-${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          name: sectionName,
          description: description,
          manager: manager,
          employeesCount: employeesCount,
          budget: budget,
        };
      }
    );

    // Stop loading more after reaching 50 sections for demo
    if (sectionsData.length >= 46) {
      setHasMore(false);
    } else {
      setSectionsData((prev) => [...prev, ...newSections]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [sectionsData.length, isLoading, hasMore]);

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

  // Filter sections based on search query (search across multiple fields)
  const filteredSections = sectionsData.filter(
    (section) =>
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (sectionId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/section/view/${sectionId}?fromView=${viewMode}`);
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
            {filteredSections.map((section, index) => {
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
                  onClick={() => handleViewClick(section.id)}
                >
                  {/* Section Header with Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {section.name}
                    </CardTitle>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {section.code}
                    </div>
                  </div>

                  {/* Section Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Manager:</span>
                      <span className="truncate">{section.manager}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Employees:</span>
                        <span className="text-blue-600">
                          {section.employeesCount}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Budget:</span>
                        <span className="text-green-600">
                          ${section.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {section.description}
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
                <span className="text-sm">Loading more sections...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSections.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sections to load
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
                data={sections}
                setFilteredData={setSectionsData}
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
                data={sections}
                setFilteredData={setSectionsData}
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
