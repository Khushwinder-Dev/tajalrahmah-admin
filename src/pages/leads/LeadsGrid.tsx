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
import {
  DollarSign,
  Briefcase,
  CheckCircle,
  Clock,
  Archive,
  FileText,
} from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Lead interface
interface Lead {
  id: string;
  clientName: string;
  service: string;
  budget: number;
  status: "active" | "archived" | "upcoming" | "draft";
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const leads: Lead[] = [
  {
    id: "1",
    clientName: "John Doe",
    service: "Web Development",
    budget: 50000,
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    clientName: "Jane Smith",
    service: "Mobile App Development",
    budget: 80000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "3",
    clientName: "Kamrul Islam",
    service: "E-commerce Website",
    budget: 60000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "4",
    clientName: "Shamima Akter",
    service: "Digital Marketing",
    budget: 45000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "5",
    clientName: "Tanvir Ahmed",
    service: "Cloud Infrastructure Setup",
    budget: 120000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "6",
    clientName: "Farhana Rahman",
    service: "UI/UX Design",
    budget: 30000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "7",
    clientName: "Rashed Khan",
    service: "SEO Optimization",
    budget: 25000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "8",
    clientName: "Mehnaz Sultana",
    service: "Content Creation",
    budget: 20000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "9",
    clientName: "Sajib Chowdhury",
    service: "Social Media Management",
    budget: 28000,
    status: "archived",
    isDeleted: false,
  },
  {
    id: "10",
    clientName: "Omar Faruque",
    service: "Cybersecurity Audit",
    budget: 90000,
    status: "upcoming",
    isDeleted: false,
  },
  {
    id: "11",
    clientName: "Sumaiya Haque",
    service: "Email Marketing Campaign",
    budget: 15000,
    status: "draft",
    isDeleted: false,
  },
  {
    id: "12",
    clientName: "Imran Kabir",
    service: "ERP System Integration",
    budget: 110000,
    status: "draft",
    isDeleted: false,
  },
  {
    id: "13",
    clientName: "Nazmul Hasan",
    service: "Database Management",
    budget: 35000,
    status: "active",
    isDeleted: false,
  },
  {
    id: "14",
    clientName: "Fatima Begum",
    service: "Graphic Design",
    budget: 22000,
    status: "upcoming",
    isDeleted: false,
  },
  {
    id: "15",
    clientName: "Rakibul Islam",
    service: "Video Production",
    budget: 40000,
    status: "draft",
    isDeleted: false,
  },
  {
    id: "16",
    clientName: "Taslima Khatun",
    service: "Content Writing",
    budget: 18000,
    status: "active",
    isDeleted: false,
  },
  {
    id: "17",
    clientName: "Karim Uddin",
    service: "Network Security",
    budget: 75000,
    status: "upcoming",
    isDeleted: false,
  },
  {
    id: "18",
    clientName: "Nasrin Akter",
    service: "App Testing",
    budget: 30000,
    status: "draft",
    isDeleted: false,
  },
  {
    id: "19",
    clientName: "Mizanur Rahman",
    service: "Data Analysis",
    budget: 45000,
    status: "active",
    isDeleted: false,
  },
  {
    id: "20",
    clientName: "Rashida Begum",
    service: "Customer Support",
    budget: 25000,
    status: "upcoming",
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

export default function LeadsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Leads grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [leadsData, setLeadsData] = useState(leads);
  // const canDelete: boolean = usePermission("leads", "delete");
  // const canRestore: boolean = usePermission("leads", "restore");
  // const canEdit: boolean = usePermission("leads", "edit");

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

    const firstNames = [
      "John",
      "Jane",
      "Michael",
      "Emily",
      "David",
      "Sarah",
      "Robert",
      "Lisa",
      "James",
      "Maria",
      "Ahmed",
      "Fatima",
      "Hassan",
      "Aisha",
      "Omar",
      "Zainab",
      "Ali",
      "Khadija",
      "Yusuf",
      "Amina",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hassan",
      "Ahmed",
      "Ali",
      "Khan",
      "Rahman",
      "Islam",
      "Chowdhury",
      "Uddin",
      "Begum",
      "Akter",
    ];

    const services = [
      "Web Development",
      "Mobile App Development",
      "E-commerce Website",
      "Digital Marketing",
      "Cloud Infrastructure Setup",
      "UI/UX Design",
      "SEO Optimization",
      "Content Creation",
      "Social Media Management",
      "Cybersecurity Audit",
      "Email Marketing Campaign",
      "ERP System Integration",
      "Database Management",
      "Graphic Design",
      "Video Production",
      "Content Writing",
      "Network Security",
      "App Testing",
      "Data Analysis",
      "Customer Support",
    ];

    const statuses: Lead["status"][] = [
      "active",
      "archived",
      "upcoming",
      "draft",
    ];

    const newItems: Lead[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const firstName =
          firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName =
          lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        const service = services[Math.floor(Math.random() * services.length)];
        const budget = Math.floor(Math.random() * 100000) + 10000; // 10k to 110k

        return {
          id: `${Date.now()}-${index}`,
          clientName: fullName,
          service: service,
          budget: budget,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          isDeleted: false,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (leadsData.length >= 46) {
      setHasMore(false);
    } else {
      setLeadsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [leadsData.length, isLoading, hasMore]);

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

  // Filter leads based on search query (search across multiple fields)
  const filteredLeads = leadsData.filter(
    (lead) =>
      lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.budget.toString().includes(searchQuery) ||
      lead.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (leadId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/leads/edit/${leadId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (leadId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/leads/view/${leadId}?fromView=${viewMode}`);
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
            {filteredLeads.map((lead, index) => {
              // Function to get status icon and color
              const getStatusInfo = (status: Lead["status"]) => {
                switch (status) {
                  case "active":
                    return {
                      icon: CheckCircle,
                      color: "text-green-600",
                      bgColor: "bg-green-100",
                    };
                  case "upcoming":
                    return {
                      icon: Clock,
                      color: "text-blue-600",
                      bgColor: "bg-blue-100",
                    };
                  case "draft":
                    return {
                      icon: FileText,
                      color: "text-yellow-600",
                      bgColor: "bg-yellow-100",
                    };
                  case "archived":
                    return {
                      icon: Archive,
                      color: "text-gray-600",
                      bgColor: "bg-gray-100",
                    };
                  default:
                    return {
                      icon: CheckCircle,
                      color: "text-gray-600",
                      bgColor: "bg-gray-100",
                    };
                }
              };

              const statusInfo = getStatusInfo(lead.status);
              const StatusIcon = statusInfo.icon;

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
                  onClick={() => handleViewClick(lead.id)}
                >
                  {/* Lead Header with Client Name and Status */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {lead.clientName}
                    </CardTitle>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        statusInfo.bgColor,
                        statusInfo.color
                      )}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{lead.status}</span>
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{lead.service}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span>${lead.budget.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Budget and Service Details */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Budget:
                    </span>
                    <div className="flex gap-2">
                      <div className="px-2 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                        ${lead.budget.toLocaleString()}
                      </div>
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
                <span className="text-sm">Loading more leads...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLeads.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more leads to load
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
                data={leads}
                setFilteredData={setLeadsData}
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
                data={leads}
                setFilteredData={setLeadsData}
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
