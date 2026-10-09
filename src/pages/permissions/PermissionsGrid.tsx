import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";
import { Shield, User } from "lucide-react";

// Updated mock data structure
type PermissionModule = {
  moduleName: string;
  permissionNumber: number;
};

type PermissionsGridDataType = {
  id: string;
  userName: string;
  modules: PermissionModule[];
  status: "Active" | "Inactive" | "Draft";
  isDeleted: boolean;
};

const mockPermissionsData: PermissionsGridDataType[] = [
  {
    id: "1",
    userName: "Alice Rahman",
    modules: [
      { moduleName: "Users", permissionNumber: 15 },
      { moduleName: "Countries", permissionNumber: 8 },
      { moduleName: "Reports", permissionNumber: 12 },
    ],
    status: "Active",
    isDeleted: false,
  },
  {
    id: "2",
    userName: "Bashir Khan",
    modules: [
      { moduleName: "Users", permissionNumber: 5 },
      { moduleName: "Countries", permissionNumber: 3 },
    ],
    status: "Active",
    isDeleted: false,
  },
  {
    id: "3",
    userName: "Chinmoy Das",
    modules: [{ moduleName: "Reports", permissionNumber: 2 }],
    status: "Inactive",
    isDeleted: true,
  },
  {
    id: "4",
    userName: "Dola Akter",
    modules: [
      { moduleName: "Users", permissionNumber: 20 },
      { moduleName: "Countries", permissionNumber: 15 },
      { moduleName: "Reports", permissionNumber: 18 },
      { moduleName: "Settings", permissionNumber: 10 },
    ],
    status: "Active",
    isDeleted: false,
  },
  {
    id: "5",
    userName: "Ehsan Haque",
    modules: [
      { moduleName: "Users", permissionNumber: 8 },
      { moduleName: "Countries", permissionNumber: 6 },
    ],
    status: "Draft",
    isDeleted: true,
  },
  {
    id: "6",
    userName: "Farzana Mitu",
    modules: [{ moduleName: "Reports", permissionNumber: 4 }],
    status: "Active",
    isDeleted: false,
  },
  {
    id: "7",
    userName: "Gias Uddin",
    modules: [
      { moduleName: "Users", permissionNumber: 25 },
      { moduleName: "Countries", permissionNumber: 20 },
      { moduleName: "Reports", permissionNumber: 22 },
      { moduleName: "Settings", permissionNumber: 15 },
      { moduleName: "Analytics", permissionNumber: 12 },
    ],
    status: "Active",
    isDeleted: false,
  },
  {
    id: "8",
    userName: "Hafsa Noor",
    modules: [{ moduleName: "Reports", permissionNumber: 3 }],
    status: "Inactive",
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

export default function PermissionsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Permissions grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [permissionsData, setPermissionsData] = useState(mockPermissionsData);
  // const canDelete: boolean = usePermission("permissions", "delete");
  // const canRestore: boolean = usePermission("permissions", "restore");
  // const canEdit: boolean = usePermission("permissions", "edit");

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

    const moduleNames = [
      "Users",
      "Countries",
      "Reports",
      "Settings",
      "Analytics",
    ];
    const statuses: ("Active" | "Inactive" | "Draft")[] = [
      "Active",
      "Inactive",
      "Draft",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      userName: `User ${permissionsData.length + index + 1}`,
      modules: Array.from(
        { length: Math.floor(Math.random() * 4) + 1 },
        () => ({
          moduleName:
            moduleNames[Math.floor(Math.random() * moduleNames.length)],
          permissionNumber: Math.floor(Math.random() * 25) + 1,
        })
      ),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (permissionsData.length >= 46) {
      setHasMore(false);
    } else {
      setPermissionsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [permissionsData.length, isLoading, hasMore]);

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

  // Filter permissions based on search query
  const filteredPermissions = permissionsData.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.modules.some((module) =>
        module.moduleName.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleViewClick = (userId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/permissions/view/${userId}?fromView=${viewMode}`);
  };

  // Calculate total permissions for a user
  const getTotalPermissions = (modules: PermissionModule[]) => {
    return modules.reduce(
      (total, module) => total + module.permissionNumber,
      0
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
            {filteredPermissions.map((user, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(user.id)}
              >
                {/* Top Row - User Name and Avatar */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - User Name */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {user.userName}
                  </CardTitle>

                  {/* Right - Avatar */}
                  <div className="flex justify-end">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                      <User className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Middle Row - Total Permissions and Status */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Total Permissions - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Total Permissions
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {getTotalPermissions(user.modules)}
                    </div>
                  </div>

                  {/* Status - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          user.status === "Active" &&
                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                          user.status === "Inactive" &&
                            "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
                          user.status === "Draft" &&
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        )}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modules Section */}
                <div className="w-full min-w-0">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Modules ({user.modules.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.modules.slice(0, 3).map((module, moduleIndex) => (
                      <span
                        key={moduleIndex}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-md text-xs font-medium"
                      >
                        <Shield className="h-3 w-3" />
                        {module.moduleName} ({module.permissionNumber})
                      </span>
                    ))}
                    {user.modules.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-md text-xs">
                        +{user.modules.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more users...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredPermissions.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more users to load
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
                data={mockPermissionsData}
                setFilteredData={setPermissionsData}
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
                data={mockPermissionsData}
                setFilteredData={setPermissionsData}
                setShowTabs={setIsFilterOpen}
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
