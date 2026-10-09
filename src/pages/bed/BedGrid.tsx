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

// Bed interface
interface BedItem {
  id: string;
  roomName: string;
  bedNumber: string;
  description: string;
}

// Mock data - replace with real data from your API
const beds: BedItem[] = [
  {
    id: "1",
    roomName: "Room 101",
    bedNumber: "Bed 1",
    description: "Single bed with window view",
  },
  {
    id: "2",
    roomName: "Room 101",
    bedNumber: "Bed 2",
    description: "Single bed near entrance",
  },
  {
    id: "3",
    roomName: "Room 102",
    bedNumber: "Bed 1",
    description: "Double bed with balcony",
  },
  {
    id: "4",
    roomName: "Room 102",
    bedNumber: "Bed 2",
    description: "Double bed with city view",
  },
  {
    id: "5",
    roomName: "Room 201",
    bedNumber: "Bed 1",
    description: "King size bed with ocean view",
  },
  {
    id: "6",
    roomName: "Room 201",
    bedNumber: "Bed 2",
    description: "King size bed with garden view",
  },
  {
    id: "7",
    roomName: "Room 202",
    bedNumber: "Bed 1",
    description: "Queen bed with mountain view",
  },
  {
    id: "8",
    roomName: "Room 202",
    bedNumber: "Bed 2",
    description: "Queen bed with pool view",
  },
  {
    id: "9",
    roomName: "Room 301",
    bedNumber: "Bed 1",
    description: "Twin beds with river view",
  },
  {
    id: "10",
    roomName: "Room 301",
    bedNumber: "Bed 2",
    description: "Twin beds with forest view",
  },
  {
    id: "11",
    roomName: "Room 302",
    bedNumber: "Bed 1",
    description: "Single bed with lake view",
  },
  {
    id: "12",
    roomName: "Room 302",
    bedNumber: "Bed 2",
    description: "Single bed with valley view",
  },
  {
    id: "13",
    roomName: "Room 401",
    bedNumber: "Bed 1",
    description: "Double bed with sunset view",
  },
  {
    id: "14",
    roomName: "Room 401",
    bedNumber: "Bed 2",
    description: "Double bed with sunrise view",
  },
  {
    id: "15",
    roomName: "Room 402",
    bedNumber: "Bed 1",
    description: "King bed with beach view",
  },
  {
    id: "16",
    roomName: "Room 402",
    bedNumber: "Bed 2",
    description: "King bed with cliff view",
  },
  {
    id: "17",
    roomName: "Room 501",
    bedNumber: "Bed 1",
    description: "Queen bed with skyline view",
  },
  {
    id: "18",
    roomName: "Room 501",
    bedNumber: "Bed 2",
    description: "Queen bed with park view",
  },
  {
    id: "19",
    roomName: "Room 502",
    bedNumber: "Bed 1",
    description: "Twin beds with courtyard view",
  },
  {
    id: "20",
    roomName: "Room 502",
    bedNumber: "Bed 2",
    description: "Twin beds with fountain view",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function BedGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Bed grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [bedsData, setBedsData] = useState<BedItem[]>(beds);
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

    const roomNames = [
      "Room 101",
      "Room 102",
      "Room 201",
      "Room 202",
      "Room 301",
      "Room 302",
      "Room 401",
      "Room 402",
      "Room 501",
      "Room 502",
      "Room 601",
      "Room 602",
      "Room 701",
      "Room 702",
      "Room 801",
      "Room 802",
      "Room 901",
      "Room 902",
    ];
    const bedNumbers = ["Bed 1", "Bed 2", "Bed 3", "Bed 4"];
    const descriptions = [
      "Single bed with window view",
      "Double bed with balcony",
      "King size bed with ocean view",
      "Queen bed with mountain view",
      "Twin beds with river view",
      "Single bed with lake view",
      "Double bed with sunset view",
      "King bed with beach view",
      "Queen bed with skyline view",
      "Twin beds with courtyard view",
      "Single bed with garden view",
      "Double bed with city view",
    ];

    const newItems: BedItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const roomName =
          roomNames[Math.floor(Math.random() * roomNames.length)];
        const bedNumber =
          bedNumbers[Math.floor(Math.random() * bedNumbers.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          roomName: roomName,
          bedNumber: bedNumber,
          description: description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (bedsData.length >= 46) {
      setHasMore(false);
    } else {
      setBedsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [bedsData.length, isLoading, hasMore]);

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

  // Filter beds based on search query (search across multiple fields)
  const filteredBeds = bedsData.filter(
    (item) =>
      item.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (bedId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/beds/view/${bedId}?fromView=${viewMode}`);
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
            {filteredBeds.map((item, index) => {
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
                  {/* Bed Header with Room Name and Bed Number */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.roomName} - {item.bedNumber}
                    </CardTitle>
                  </div>

                  {/* Bed Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
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
                <span className="text-sm">Loading more beds...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredBeds.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more beds to load
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
                data={beds}
                setFilteredData={setBedsData}
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
                data={beds}
                setFilteredData={setBedsData}
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
