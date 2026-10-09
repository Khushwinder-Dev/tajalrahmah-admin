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

// Salesman interface
interface SalesmanItem {
  id: string;
  code: string;
  salesmanName: string;
  commission: string;
  territory: string;
  experience: string;
  department: string;
  manager: string;
  phone: string;
  email: string;
  description: string;
}

// Mock data - replace with real data from your API
const salesmen: SalesmanItem[] = [
  {
    id: "1",
    code: "SLM-001",
    salesmanName: "John Smith",
    commission: "5%",
    territory: "North Region",
    experience: "5 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0123",
    email: "john.smith@company.com",
    description: "Experienced salesman specializing in corporate accounts",
  },
  {
    id: "2",
    code: "SLM-002",
    salesmanName: "Emily Davis",
    commission: "7%",
    territory: "South Region",
    experience: "3 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0124",
    email: "emily.davis@company.com",
    description: "Top performer in retail sales and customer relations",
  },
  {
    id: "3",
    code: "SLM-003",
    salesmanName: "Robert Wilson",
    commission: "6%",
    territory: "East Region",
    experience: "8 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0125",
    email: "robert.wilson@company.com",
    description: "Senior salesman with expertise in enterprise solutions",
  },
  {
    id: "4",
    code: "SLM-004",
    salesmanName: "Lisa Anderson",
    commission: "5.5%",
    territory: "West Region",
    experience: "4 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0126",
    email: "lisa.anderson@company.com",
    description: "Specialized in technology sales and client onboarding",
  },
  {
    id: "5",
    code: "SLM-005",
    salesmanName: "David Martinez",
    commission: "6.5%",
    territory: "Central Region",
    experience: "6 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0127",
    email: "david.martinez@company.com",
    description: "Expert in B2B sales and relationship management",
  },
  {
    id: "6",
    code: "SLM-006",
    salesmanName: "Jennifer Taylor",
    commission: "5%",
    territory: "Northwest Region",
    experience: "2 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0128",
    email: "jennifer.taylor@company.com",
    description: "Rising star in digital sales and online marketing",
  },
  {
    id: "7",
    code: "SLM-007",
    salesmanName: "Christopher Lee",
    commission: "7.5%",
    territory: "Southeast Region",
    experience: "10 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0129",
    email: "christopher.lee@company.com",
    description: "Veteran salesman with extensive industry connections",
  },
  {
    id: "8",
    code: "SLM-008",
    salesmanName: "Amanda White",
    commission: "6%",
    territory: "Northeast Region",
    experience: "4 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0130",
    email: "amanda.white@company.com",
    description: "Specialized in healthcare and pharmaceutical sales",
  },
  {
    id: "9",
    code: "SLM-009",
    salesmanName: "Kevin Thompson",
    commission: "5.5%",
    territory: "Southwest Region",
    experience: "3 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0131",
    email: "kevin.thompson@company.com",
    description: "Focused on manufacturing and industrial sales",
  },
  {
    id: "10",
    code: "SLM-010",
    salesmanName: "Michelle Garcia",
    commission: "6.5%",
    territory: "Midwest Region",
    experience: "7 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0132",
    email: "michelle.garcia@company.com",
    description: "Expert in financial services and investment products",
  },
  {
    id: "11",
    code: "SLM-011",
    salesmanName: "Daniel Rodriguez",
    commission: "5%",
    territory: "Pacific Region",
    experience: "1 year",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0133",
    email: "daniel.rodriguez@company.com",
    description: "New graduate with strong potential in tech sales",
  },
  {
    id: "12",
    code: "SLM-012",
    salesmanName: "Rachel Moore",
    commission: "7%",
    territory: "Atlantic Region",
    experience: "9 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0134",
    email: "rachel.moore@company.com",
    description: "Senior sales professional specializing in luxury goods",
  },
  {
    id: "13",
    code: "SLM-013",
    salesmanName: "James Clark",
    commission: "6%",
    territory: "Mountain Region",
    experience: "5 years",
    department: "Sales",
    manager: "Sarah Johnson",
    phone: "+1-555-0135",
    email: "james.clark@company.com",
    description: "Expert in automotive and transportation sales",
  },
  {
    id: "14",
    code: "SLM-014",
    salesmanName: "Stephanie Lewis",
    commission: "5.5%",
    territory: "Great Lakes Region",
    experience: "4 years",
    department: "Sales",
    manager: "Michael Brown",
    phone: "+1-555-0136",
    email: "stephanie.lewis@company.com",
    description: "Specialized in education and training solutions",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function SalesmanGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Salesman grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [salesmenData, setSalesmenData] = useState<SalesmanItem[]>(salesmen);
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
      "SLM-015",
      "SLM-016",
      "SLM-017",
      "SLM-018",
      "SLM-019",
      "SLM-020",
    ];
    const salesmanNames = [
      "Alex Johnson",
      "Maria Rodriguez",
      "David Chen",
      "Sarah Williams",
      "Michael Brown",
      "Lisa Garcia",
      "James Wilson",
      "Emma Davis",
    ];
    const commissions = ["5%", "5.5%", "6%", "6.5%", "7%", "7.5%", "8%"];
    const territories = [
      "North Region",
      "South Region",
      "East Region",
      "West Region",
      "Central Region",
      "Northeast Region",
      "Southeast Region",
      "Northwest Region",
    ];
    const experiences = [
      "1 year",
      "2 years",
      "3 years",
      "4 years",
      "5 years",
      "6 years",
      "7 years",
      "8 years",
    ];
    const departments = [
      "Sales",
      "Business Development",
      "Account Management",
      "Customer Success",
    ];
    const managers = [
      "Sarah Johnson",
      "Michael Brown",
      "Lisa Anderson",
      "David Martinez",
    ];
    const phones = [
      "+1-555-0200",
      "+1-555-0201",
      "+1-555-0202",
      "+1-555-0203",
      "+1-555-0204",
    ];
    const emails = [
      "sales@company.com",
      "rep@company.com",
      "agent@company.com",
    ];
    const descriptions = [
      "Experienced salesman specializing in corporate accounts",
      "Top performer in retail sales and customer relations",
      "Senior salesman with expertise in enterprise solutions",
      "Specialized in technology sales and client onboarding",
      "Expert in B2B sales and relationship management",
    ];

    const newItems: SalesmanItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const salesmanName =
          salesmanNames[Math.floor(Math.random() * salesmanNames.length)];
        const commission =
          commissions[Math.floor(Math.random() * commissions.length)];
        const territory =
          territories[Math.floor(Math.random() * territories.length)];
        const experience =
          experiences[Math.floor(Math.random() * experiences.length)];
        const department =
          departments[Math.floor(Math.random() * departments.length)];
        const manager = managers[Math.floor(Math.random() * managers.length)];
        const phone = phones[Math.floor(Math.random() * phones.length)];
        const email = emails[Math.floor(Math.random() * emails.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          salesmanName,
          commission,
          territory,
          experience,
          department,
          manager,
          phone,
          email,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (salesmenData.length >= 46) {
      setHasMore(false);
    } else {
      setSalesmenData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [salesmenData.length, isLoading, hasMore]);

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

  // Filter salesmen based on search query (search across multiple fields)
  const filteredSalesmen = salesmenData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.salesmanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.commission.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (salesmanId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/salesman/view/${salesmanId}?fromView=${viewMode}`);
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
            {filteredSalesmen.map((item, index) => {
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
                  {/* Salesman Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.salesmanName}
                    </CardTitle>
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {item.code}
                    </span>
                  </div>

                  {/* Salesman Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Commission:</span>
                      <span className="truncate text-green-600 font-semibold">
                        {item.commission}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Territory:</span>
                      <span className="truncate">{item.territory}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Experience:</span>
                      <span className="truncate">{item.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Department:</span>
                      <span className="truncate">{item.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Manager:</span>
                      <span className="truncate">{item.manager}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span className="truncate">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate text-blue-600">
                        {item.email}
                      </span>
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
                <span className="text-sm">Loading more salesmen...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSalesmen.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more salesmen to load
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
                data={salesmen}
                setFilteredData={setSalesmenData}
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
                data={salesmen}
                setFilteredData={setSalesmenData}
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
