import { Card, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// User Location interface
interface UserLocation {
  id: string;
  name: string;
  avatar: string;
  totalCompanies: number;
  totalBranches: number;
  status: "active" | "inactive";
  isDeleted: boolean;
}

// Mock data - replace with real data from your API
const userLocations: UserLocation[] = [
  {
    id: "1",
    name: "John Smith",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 5,
    totalBranches: 12,
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 3,
    totalBranches: 8,
    status: "active",
    isDeleted: false,
  },
  {
    id: "3",
    name: "Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 7,
    totalBranches: 15,
    status: "active",
    isDeleted: false,
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 2,
    totalBranches: 6,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "5",
    name: "David Wilson",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 4,
    totalBranches: 9,
    status: "active",
    isDeleted: false,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 6,
    totalBranches: 11,
    status: "active",
    isDeleted: false,
  },
  {
    id: "7",
    name: "Robert Taylor",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 8,
    totalBranches: 18,
    status: "active",
    isDeleted: false,
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 3,
    totalBranches: 7,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "9",
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 3,
    totalBranches: 7,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "10",
    name: "Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 3,
    totalBranches: 7,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "11",
    name: "Christopher Lee",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 3,
    totalBranches: 7,
    status: "inactive",
    isDeleted: false,
  },
  {
    id: "12",
    name: "Jennifer Thompson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    totalCompanies: 3,
    totalBranches: 7,
    status: "inactive",
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

export default function UserLocationGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("User Location grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [userLocationsData, setUserLocationsData] = useState(userLocations);
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
    ];

    const avatarUrls = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    ];

    const newItems: UserLocation[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const firstName =
          firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName =
          lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;

        return {
          id: `${Date.now()}-${index}`,
          name: fullName,
          avatar: avatarUrls[Math.floor(Math.random() * avatarUrls.length)],
          totalCompanies: Math.floor(Math.random() * 10) + 1,
          totalBranches: Math.floor(Math.random() * 20) + 1,
          status: Math.random() > 0.3 ? "active" : "inactive",
          isDeleted: false,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (userLocationsData.length >= 46) {
      setHasMore(false);
    } else {
      setUserLocationsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [userLocationsData.length, isLoading, hasMore]);

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

  // Filter user locations based on search query
  const filteredLocations = userLocationsData.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (userId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/users/edit/${userId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (locationId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/user-location/view/${locationId}?fromView=${viewMode}`);
  };

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2 relative">
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
            {filteredLocations.map((location, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                )}
                onClick={() => handleViewClick(location.id)}
              >
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={location.avatar}
                      alt={location.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
                      }}
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mb-2 -mt-4">
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {location.name}
                  </CardTitle>
                </div>

                {/* Badges */}
                <div className="flex justify-between gap-2 mb-2 -mt-6">
                  {/* Total Companies Badge */}
                  <Tooltip
                    label="Total Companies"
                    position="top"
                    arrowSize={8}
                    withArrow
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "#374151",
                        color: "white",
                        borderRadius: "6px",
                        fontWeight: "500",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "#374151",
                      },
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {location.totalCompanies}
                      </span>
                    </div>
                  </Tooltip>

                  {/* Total Branches Badge */}
                  <Tooltip
                    label="Total Branches"
                    position="top"
                    arrowSize={8}
                    withArrow
                    styles={{
                      tooltip: {
                        fontSize: "14px",
                        padding: "8px 12px",
                        backgroundColor: "#374151",
                        color: "white",
                        borderRadius: "6px",
                        fontWeight: "500",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      },
                      arrow: {
                        backgroundColor: "#374151",
                      },
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {location.totalBranches}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more user locations...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredLocations.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more user locations to load
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
                data={userLocations}
                setFilteredData={setUserLocationsData}
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
                data={userLocations}
                setFilteredData={setUserLocationsData}
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
