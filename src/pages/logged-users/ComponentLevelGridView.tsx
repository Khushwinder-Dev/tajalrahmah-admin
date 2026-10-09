import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";

// do not change
type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export const plansData: GridDataType[] = [
  {
    id: "1",
    user: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    ipAddress: "192.168.1.100",
    country: "United States",
    city: "New York",
    state: "NY",
    address: "123 Main St, New York, NY 10001",
    loginTime: "2025-01-20 09:30:00",
    lastActivity: "2025-01-20 15:45:00",
    status: "Active",
    latitude: "40.7128",
    longitude: "-74.0060",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    ipAddress: "192.168.1.101",
    country: "United States",
    city: "Los Angeles",
    state: "CA",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    loginTime: "2025-01-20 08:15:00",
    lastActivity: "2025-01-20 16:20:00",
    status: "Active",
    latitude: "34.0522",
    longitude: "-118.2437",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    user: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1-555-0125",
    ipAddress: "192.168.1.102",
    country: "Canada",
    city: "Toronto",
    state: "ON",
    address: "789 Maple Rd, Toronto, ON M5V 2H1",
    loginTime: "2025-01-20 10:00:00",
    lastActivity: "2025-01-20 14:30:00",
    status: "Inactive",
    latitude: "43.6532",
    longitude: "-79.3832",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    user: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1-555-0126",
    ipAddress: "192.168.1.103",
    country: "United Kingdom",
    city: "London",
    state: "England",
    address: "321 Baker St, London, W1U 6TU",
    loginTime: "2025-01-20 07:45:00",
    lastActivity: "2025-01-20 17:10:00",
    status: "Active",
    latitude: "51.5074",
    longitude: "-0.1278",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    user: "David Brown",
    email: "david.brown@example.com",
    phone: "+1-555-0127",
    ipAddress: "192.168.1.104",
    country: "Australia",
    city: "Sydney",
    state: "NSW",
    address: "654 Harbour Dr, Sydney, NSW 2000",
    loginTime: "2025-01-20 11:20:00",
    lastActivity: "2025-01-20 18:45:00",
    status: "Active",
    latitude: "-33.8688",
    longitude: "151.2093",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    user: "Lisa Davis",
    email: "lisa.davis@example.com",
    phone: "+1-555-0128",
    ipAddress: "192.168.1.105",
    country: "Germany",
    city: "Berlin",
    state: "Berlin",
    address: "987 Unter den Linden, Berlin, 10117",
    loginTime: "2025-01-20 06:30:00",
    lastActivity: "2025-01-20 13:15:00",
    status: "Suspended",
    latitude: "52.5200",
    longitude: "13.4050",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    user: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1-555-0129",
    ipAddress: "192.168.1.106",
    country: "France",
    city: "Paris",
    state: "Île-de-France",
    address: "147 Champs-Élysées, Paris, 75008",
    loginTime: "2025-01-20 09:00:00",
    lastActivity: "2025-01-20 15:30:00",
    status: "Active",
    latitude: "48.8566",
    longitude: "2.3522",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    user: "Emily Anderson",
    email: "emily.anderson@example.com",
    phone: "+1-555-0130",
    ipAddress: "192.168.1.107",
    country: "Japan",
    city: "Tokyo",
    state: "Tokyo",
    address: "258 Shibuya Crossing, Tokyo, 150-0002",
    loginTime: "2025-01-20 12:00:00",
    lastActivity: "2025-01-20 19:45:00",
    status: "Active",
    latitude: "35.6762",
    longitude: "139.6503",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    user: "Michael Garcia",
    email: "michael.garcia@example.com",
    phone: "+1-555-0131",
    ipAddress: "192.168.1.108",
    country: "Brazil",
    city: "São Paulo",
    state: "SP",
    address: "369 Paulista Ave, São Paulo, SP 01310-100",
    loginTime: "2025-01-20 10:30:00",
    lastActivity: "2025-01-20 16:00:00",
    status: "Inactive",
    latitude: "-23.5505",
    longitude: "-46.6333",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    user: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    phone: "+1-555-0132",
    ipAddress: "192.168.1.109",
    country: "India",
    city: "Mumbai",
    state: "Maharashtra",
    address: "741 Marine Drive, Mumbai, MH 400002",
    loginTime: "2025-01-20 08:00:00",
    lastActivity: "2025-01-20 14:30:00",
    status: "Active",
    latitude: "19.0760",
    longitude: "72.8777",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    user: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1-555-0133",
    ipAddress: "192.168.1.110",
    country: "Canada",
    city: "Vancouver",
    state: "BC",
    address: "555 Granville St, Vancouver, BC V6C 1S4",
    loginTime: "2025-01-20 09:15:00",
    lastActivity: "2025-01-20 16:45:00",
    status: "Active",
    latitude: "49.2827",
    longitude: "-123.1207",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    user: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "+1-555-0134",
    ipAddress: "192.168.1.111",
    country: "Spain",
    city: "Madrid",
    state: "Madrid",
    address: "888 Puerta del Sol, Madrid, 28013",
    loginTime: "2025-01-20 08:30:00",
    lastActivity: "2025-01-20 17:20:00",
    status: "Active",
    latitude: "40.4168",
    longitude: "-3.7038",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-01-20"),
    deletedAt: null,
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

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();
  const location = useLocation();

  const detectedModule = getModuleFromPath(location.pathname);

  const [gridData, setGridData] = useState(plansData);
  const canDelete: boolean = usePermission(detectedModule, "delete");
  const canRestore: boolean = usePermission(detectedModule, "restore");
  const canEdit: boolean = usePermission(detectedModule, "edit");

  // Debug permissions
  console.log("Permissions:", {
    canDelete,
    canRestore,
    canEdit,
  });

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

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      ...plansData[index],
      id: `${Date.now()}-${index}`,
      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [gridData.length, isLoading, hasMore]);

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

  // filter
  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  // get page name
  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

  return (
    <div
      className={cn(
        "px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg"
      )}
    >
      {/* Floating Label - Left Top */}
      <div
        className={cn(
          "absolute -top-4 left-6 rtl:left-auto rtl:right-6 py-1 rounded-md z-40! bg-white w-fit"
        )}
      >
        <span
          className={cn(
            "text-md font-semibold tracking-wide capitalize text-gray-600"
          )}
        >
          Total {gridData.length} {PAGE_NAME}
        </span>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden mt-2">
        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 p-2">
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.user}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Email | Actions | Phone */}
                <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700 justify-between">
                  {/* Email - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Email
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.email}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Phone
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.phone}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center gap-2 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Location
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                      {item.city}, {item.state}, {item.country}
                    </div>
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
                <span className="text-sm">Loading more {PAGE_NAME}...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
                setShowFilter={setIsFilterOpen}
              />
            </div>
          </div>
        )}

        {/* Export component - Right side only */}
        {isExportOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridExportComponent
                data={gridData}
                setFilteredData={setGridData}
                setIsExportOpen={setIsExportOpen}
                title={location.pathname.split("/")[1].replace("-", " ")}
                fileName={location.pathname.split("/")[1]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
