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

// Project Contract Type interface
interface ProjectContractTypeItem {
  id: string;
  fieldName: string;
  description: string;
}

// Mock data - replace with real data from your API
const projectContractTypeData: ProjectContractTypeItem[] = [
  {
    id: "1",
    fieldName: "Fixed Price Contract",
    description:
      "A contract with a predetermined fixed price for the entire project scope and deliverables",
  },
  {
    id: "2",
    fieldName: "Time & Material Contract",
    description:
      "A contract where payment is based on actual time spent and materials used during project execution",
  },
  {
    id: "3",
    fieldName: "Cost Plus Contract",
    description:
      "A contract where the client pays for all project costs plus an additional fee or percentage",
  },
  {
    id: "4",
    fieldName: "Retainer Contract",
    description:
      "A contract with ongoing monthly or periodic payments for continuous services and support",
  },
  {
    id: "5",
    fieldName: "Milestone-Based Contract",
    description:
      "A contract with payments tied to specific project milestones and deliverable completions",
  },
  {
    id: "6",
    fieldName: "Performance-Based Contract",
    description:
      "A contract where payment is linked to achieving specific performance metrics and outcomes",
  },
  {
    id: "7",
    fieldName: "Hybrid Contract",
    description:
      "A contract combining multiple pricing models such as fixed price and time & material components",
  },
  {
    id: "8",
    fieldName: "Subscription Contract",
    description:
      "A contract with recurring payments for ongoing access to services or software solutions",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ProjectContractTypeGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Project Contract Type grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [contractTypeEntries, setContractTypeEntries] = useState<
    ProjectContractTypeItem[]
  >(projectContractTypeData);
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

    const fieldNames = [
      "Fixed Price Contract",
      "Time & Material Contract",
      "Cost Plus Contract",
      "Retainer Contract",
      "Milestone-Based Contract",
      "Performance-Based Contract",
      "Hybrid Contract",
      "Subscription Contract",
      "Unit Price Contract",
      "Lump Sum Contract",
      "Design-Build Contract",
      "Turnkey Contract",
    ];

    const descriptions = [
      "A contract with a predetermined fixed price for the entire project scope and deliverables",
      "A contract where payment is based on actual time spent and materials used during project execution",
      "A contract where the client pays for all project costs plus an additional fee or percentage",
      "A contract with ongoing monthly or periodic payments for continuous services and support",
      "A contract with payments tied to specific project milestones and deliverable completions",
      "A contract where payment is linked to achieving specific performance metrics and outcomes",
      "A contract combining multiple pricing models such as fixed price and time & material components",
      "A contract with recurring payments for ongoing access to services or software solutions",
      "A contract where pricing is based on predetermined unit rates for specific deliverables or services",
      "A contract with a single total price for all project work and deliverables combined",
      "A contract where the contractor handles both design and construction phases of the project",
      "A contract where the contractor provides a complete solution ready for immediate use by the client",
    ];

    const newItems: ProjectContractTypeItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const fieldName =
          fieldNames[Math.floor(Math.random() * fieldNames.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          fieldName: `${fieldName} ${index + 1}`,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (contractTypeEntries.length >= 46) {
      setHasMore(false);
    } else {
      setContractTypeEntries((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [contractTypeEntries.length, isLoading, hasMore]);

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

  // Filter contract type entries based on search query (search across multiple fields)
  const filteredContractTypes = contractTypeEntries.filter(
    (item) =>
      item.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (contractTypeId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(
      `/project-contract-type/view/${contractTypeId}?fromView=${viewMode}`
    );
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
            {filteredContractTypes.map((item, index) => {
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
                  {/* Contract Type Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.fieldName}
                    </CardTitle>
                    {/* Contract Type Badge */}
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      )}
                    >
                      Contract
                    </span>
                  </div>

                  {/* Contract Type Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Description:
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
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
                <span className="text-sm">Loading more contract types...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredContractTypes.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more contract types to load
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
                data={projectContractTypeData}
                setFilteredData={setContractTypeEntries}
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
                data={projectContractTypeData}
                setFilteredData={setContractTypeEntries}
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
