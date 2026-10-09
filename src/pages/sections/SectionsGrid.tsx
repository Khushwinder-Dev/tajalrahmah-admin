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
interface SectionItem {
  id: string;
  code: string;
  sectionName: string;
  sectionType: string;
  description: string;
}

// Mock data - replace with real data from your API
const sections: SectionItem[] = [
  {
    id: "1",
    code: "SEC-001",
    sectionName: "Main Dining",
    sectionType: "Indoor",
    description: "Primary dining area for customers",
  },
  {
    id: "2",
    code: "SEC-002",
    sectionName: "Outdoor Patio",
    sectionType: "Outdoor",
    description: "Outdoor seating area with garden view",
  },
  {
    id: "3",
    code: "SEC-003",
    sectionName: "Private Room",
    sectionType: "Private",
    description: "Exclusive dining room for special events",
  },
  {
    id: "4",
    code: "SEC-004",
    sectionName: "Bar Area",
    sectionType: "Bar",
    description: "Cocktail and beverage service area",
  },
  {
    id: "5",
    code: "SEC-005",
    sectionName: "VIP Lounge",
    sectionType: "VIP",
    description: "Premium seating for VIP customers",
  },
  {
    id: "6",
    code: "SEC-006",
    sectionName: "Family Section",
    sectionType: "Family",
    description: "Child-friendly dining area",
  },
  {
    id: "7",
    code: "SEC-007",
    sectionName: "Business Corner",
    sectionType: "Business",
    description: "Quiet area for business meetings",
  },
  {
    id: "8",
    code: "SEC-008",
    sectionName: "Romantic Corner",
    sectionType: "Romantic",
    description: "Intimate seating for couples",
  },
  {
    id: "9",
    code: "SEC-009",
    sectionName: "Quick Service",
    sectionType: "Fast",
    description: "Fast food and quick service area",
  },
  {
    id: "10",
    code: "SEC-010",
    sectionName: "Buffet Section",
    sectionType: "Buffet",
    description: "Self-service buffet area",
  },
  {
    id: "11",
    code: "SEC-011",
    sectionName: "Coffee Corner",
    sectionType: "Cafe",
    description: "Coffee and light snacks area",
  },
  {
    id: "12",
    code: "SEC-012",
    sectionName: "Smoking Area",
    sectionType: "Smoking",
    description: "Designated smoking section",
  },
  {
    id: "13",
    code: "SEC-013",
    sectionName: "Non-Smoking",
    sectionType: "Non-Smoking",
    description: "Smoke-free dining environment",
  },
  {
    id: "14",
    code: "SEC-014",
    sectionName: "Wheelchair Accessible",
    sectionType: "Accessible",
    description: "ADA compliant accessible seating",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function SectionsGrid({
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

  const [sectionsData, setSectionsData] = useState<SectionItem[]>(sections);
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
      "SEC-015",
      "SEC-016",
      "SEC-017",
      "SEC-018",
      "SEC-019",
      "SEC-020",
      "SEC-021",
      "SEC-022",
      "SEC-023",
      "SEC-024",
    ];
    const sectionNames = [
      "Main Dining",
      "Outdoor Patio",
      "Private Room",
      "Bar Area",
      "VIP Lounge",
      "Family Section",
      "Business Corner",
      "Romantic Corner",
      "Quick Service",
      "Buffet Section",
    ];
    const sectionTypes = [
      "Indoor",
      "Outdoor",
      "Private",
      "Bar",
      "VIP",
      "Family",
      "Business",
      "Romantic",
      "Fast",
      "Buffet",
    ];
    const descriptions = [
      "Primary dining area for customers",
      "Outdoor seating area with garden view",
      "Exclusive dining room for special events",
      "Cocktail and beverage service area",
      "Premium seating for VIP customers",
      "Child-friendly dining area",
      "Quiet area for business meetings",
      "Intimate seating for couples",
      "Fast food and quick service area",
      "Self-service buffet area",
    ];

    const newItems: SectionItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const sectionName =
          sectionNames[Math.floor(Math.random() * sectionNames.length)];
        const sectionType =
          sectionTypes[Math.floor(Math.random() * sectionTypes.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          sectionName,
          sectionType,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (sectionsData.length >= 46) {
      setHasMore(false);
    } else {
      setSectionsData((prev) => [...prev, ...newItems]);
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
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sectionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (sectionId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/sections/view/${sectionId}?fromView=${viewMode}`);
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
            {filteredSections.map((item, index) => {
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
                  {/* Section Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.sectionName}
                    </CardTitle>
                  </div>

                  {/* Section Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Section Type:</span>
                      <span className="truncate">{item.sectionType}</span>
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
