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

// Table interface
interface TableItem {
  id: string;
  code: string;
  tableName: string;
  person: string;
  location: string;
  description: string;
}

// Mock data - replace with real data from your API
const tables: TableItem[] = [
  {
    id: "1",
    code: "TBL-001",
    tableName: "VIP Table 1",
    person: "John Smith",
    location: "Main Dining Hall",
    description: "Premium table with ocean view and private service",
  },
  {
    id: "2",
    code: "TBL-002",
    tableName: "Family Table 2",
    person: "Sarah Johnson",
    location: "Family Section",
    description: "Large table suitable for families with children",
  },
  {
    id: "3",
    code: "TBL-003",
    tableName: "Business Table 3",
    person: "Mike Davis",
    location: "Business Lounge",
    description: "Quiet table for business meetings and discussions",
  },
  {
    id: "4",
    code: "TBL-004",
    tableName: "Romantic Table 4",
    person: "Emma Wilson",
    location: "Garden Terrace",
    description: "Intimate table for couples with candlelight ambiance",
  },
  {
    id: "5",
    code: "TBL-005",
    tableName: "Group Table 5",
    person: "David Brown",
    location: "Party Hall",
    description: "Large round table for group celebrations",
  },
  {
    id: "6",
    code: "TBL-006",
    tableName: "Window Table 6",
    person: "Lisa Anderson",
    location: "Window Section",
    description: "Table by the window with city skyline view",
  },
  {
    id: "7",
    code: "TBL-007",
    tableName: "Corner Table 7",
    person: "Tom Miller",
    location: "Quiet Corner",
    description: "Secluded corner table for private conversations",
  },
  {
    id: "8",
    code: "TBL-008",
    tableName: "Bar Table 8",
    person: "Anna Garcia",
    location: "Bar Area",
    description: "High-top table near the bar for casual dining",
  },
  {
    id: "9",
    code: "TBL-009",
    tableName: "Outdoor Table 9",
    person: "Chris Taylor",
    location: "Outdoor Patio",
    description: "Al fresco dining table with garden view",
  },
  {
    id: "10",
    code: "TBL-010",
    tableName: "Chef's Table 10",
    person: "Maria Rodriguez",
    location: "Kitchen View",
    description: "Special table with view of the open kitchen",
  },
  {
    id: "11",
    code: "TBL-011",
    tableName: "Booth Table 11",
    person: "James White",
    location: "Booth Section",
    description: "Comfortable booth seating for casual dining",
  },
  {
    id: "12",
    code: "TBL-012",
    tableName: "Center Table 12",
    person: "Jennifer Lee",
    location: "Center Hall",
    description: "Central table with panoramic restaurant view",
  },
  {
    id: "13",
    code: "TBL-013",
    tableName: "Balcony Table 13",
    person: "Robert Kim",
    location: "Upper Balcony",
    description: "Elevated table with overview of dining area",
  },
  {
    id: "14",
    code: "TBL-014",
    tableName: "Private Table 14",
    person: "Amanda Clark",
    location: "Private Room",
    description: "Exclusive private dining table with dedicated service",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function TableGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Table grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [tablesData, setTablesData] = useState<TableItem[]>(tables);
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
      "TBL-015",
      "TBL-016",
      "TBL-017",
      "TBL-018",
      "TBL-019",
      "TBL-020",
      "TBL-021",
      "TBL-022",
      "TBL-023",
      "TBL-024",
    ];
    const tableNames = [
      "Executive Table 15",
      "Garden Table 16",
      "Rooftop Table 17",
      "Poolside Table 18",
      "Library Table 19",
      "Wine Cellar Table 20",
      "Terrace Table 21",
      "Lounge Table 22",
      "Conference Table 23",
      "Banquet Table 24",
    ];
    const persons = [
      "Alex Thompson",
      "Sophie Martin",
      "Daniel Wilson",
      "Olivia Davis",
      "Lucas Brown",
      "Chloe Garcia",
      "Noah Martinez",
      "Ava Rodriguez",
      "Liam Anderson",
      "Mia Taylor",
    ];
    const locations = [
      "Executive Suite",
      "Garden Pavilion",
      "Rooftop Terrace",
      "Pool Area",
      "Library Room",
      "Wine Cellar",
      "Outdoor Terrace",
      "VIP Lounge",
      "Conference Room",
      "Banquet Hall",
    ];
    const descriptions = [
      "Executive dining table with premium service",
      "Garden view table with natural ambiance",
      "Rooftop table with city skyline view",
      "Poolside table for casual dining",
      "Quiet library table for intimate meals",
      "Wine cellar table with sommelier service",
      "Terrace table with outdoor dining experience",
      "VIP lounge table with exclusive access",
      "Conference table for business dining",
      "Banquet table for large celebrations",
    ];

    const newItems: TableItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const tableName =
          tableNames[Math.floor(Math.random() * tableNames.length)];
        const person = persons[Math.floor(Math.random() * persons.length)];
        const location =
          locations[Math.floor(Math.random() * locations.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          tableName,
          person,
          location,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (tablesData.length >= 46) {
      setHasMore(false);
    } else {
      setTablesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [tablesData.length, isLoading, hasMore]);

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

  // Filter tables based on search query (search across multiple fields)
  const filteredTables = tablesData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (tableId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/table/view/${tableId}?fromView=${viewMode}`);
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
            {filteredTables.map((item, index) => {
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
                  {/* Table Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.tableName}
                    </CardTitle>
                  </div>

                  {/* Table Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Person:</span>
                      <span className="truncate">{item.person}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span className="truncate">{item.location}</span>
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
                <span className="text-sm">Loading more tables...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTables.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more tables to load
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
                data={tables}
                setFilteredData={setTablesData}
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
                data={tables}
                setFilteredData={setTablesData}
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
