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

// Store interface
interface StoreItem {
  id: string;
  storeCode: string;
  storeName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  capacity: number;
  storeType: string;
  description: string;
}

// Mock data - replace with real data from your API
const stores: StoreItem[] = [
  {
    id: "1",
    storeCode: "STR-001",
    storeName: "Downtown Central Store",
    phone: "+1-555-0101",
    email: "downtown@store.com",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    country: "USA",
    capacity: 500,
    storeType: "Supermarket",
    description:
      "Large supermarket in downtown area with full grocery selection",
  },
  {
    id: "2",
    storeCode: "STR-002",
    storeName: "Westside Mall Store",
    phone: "+1-555-0102",
    email: "westside@store.com",
    address: "456 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    capacity: 300,
    storeType: "Department Store",
    description: "Modern department store in Westside Mall",
  },
  {
    id: "3",
    storeCode: "STR-003",
    storeName: "North Point Store",
    phone: "+1-555-0103",
    email: "northpoint@store.com",
    address: "789 Pine Street",
    city: "Chicago",
    state: "IL",
    country: "USA",
    capacity: 400,
    storeType: "Hypermarket",
    description: "Large hypermarket with electronics and groceries",
  },
  {
    id: "4",
    storeCode: "STR-004",
    storeName: "South Bay Store",
    phone: "+1-555-0104",
    email: "southbay@store.com",
    address: "321 Elm Street",
    city: "Miami",
    state: "FL",
    country: "USA",
    capacity: 250,
    storeType: "Convenience Store",
    description: "24/7 convenience store in South Bay area",
  },
  {
    id: "5",
    storeCode: "STR-005",
    storeName: "East Village Store",
    phone: "+1-555-0105",
    email: "eastvillage@store.com",
    address: "654 Maple Drive",
    city: "Seattle",
    state: "WA",
    country: "USA",
    capacity: 350,
    storeType: "Supermarket",
    description: "Organic and specialty foods supermarket",
  },
  {
    id: "6",
    storeCode: "STR-006",
    storeName: "Midtown Plaza Store",
    phone: "+1-555-0106",
    email: "midtown@store.com",
    address: "987 Cedar Lane",
    city: "Boston",
    state: "MA",
    country: "USA",
    capacity: 450,
    storeType: "Department Store",
    description: "Premium department store in Midtown Plaza",
  },
  {
    id: "7",
    storeCode: "STR-007",
    storeName: "Riverside Store",
    phone: "+1-555-0107",
    email: "riverside@store.com",
    address: "147 River Road",
    city: "Portland",
    state: "OR",
    country: "USA",
    capacity: 200,
    storeType: "Convenience Store",
    description: "Small convenience store by the river",
  },
  {
    id: "8",
    storeCode: "STR-008",
    storeName: "Highland Park Store",
    phone: "+1-555-0108",
    email: "highland@store.com",
    address: "258 Highland Avenue",
    city: "Denver",
    state: "CO",
    country: "USA",
    capacity: 600,
    storeType: "Hypermarket",
    description: "Large hypermarket with full range of products",
  },
  {
    id: "9",
    storeCode: "STR-009",
    storeName: "Valley View Store",
    phone: "+1-555-0109",
    email: "valleyview@store.com",
    address: "369 Valley Street",
    city: "Phoenix",
    state: "AZ",
    country: "USA",
    capacity: 320,
    storeType: "Supermarket",
    description: "Family-friendly supermarket with pharmacy",
  },
  {
    id: "10",
    storeCode: "STR-010",
    storeName: "Sunset Strip Store",
    phone: "+1-555-0110",
    email: "sunset@store.com",
    address: "741 Sunset Boulevard",
    city: "Las Vegas",
    state: "NV",
    country: "USA",
    capacity: 280,
    storeType: "Department Store",
    description: "Luxury department store on Sunset Strip",
  },
  {
    id: "11",
    storeCode: "STR-011",
    storeName: "Garden District Store",
    phone: "+1-555-0111",
    email: "garden@store.com",
    address: "852 Garden Way",
    city: "New Orleans",
    state: "LA",
    country: "USA",
    capacity: 180,
    storeType: "Convenience Store",
    description: "Historic convenience store in Garden District",
  },
  {
    id: "12",
    storeCode: "STR-012",
    storeName: "Mountain View Store",
    phone: "+1-555-0112",
    email: "mountain@store.com",
    address: "963 Mountain Road",
    city: "Salt Lake City",
    state: "UT",
    country: "USA",
    capacity: 420,
    storeType: "Hypermarket",
    description: "Large hypermarket with outdoor equipment section",
  },
  {
    id: "13",
    storeCode: "STR-013",
    storeName: "Coastal Store",
    phone: "+1-555-0113",
    email: "coastal@store.com",
    address: "159 Ocean Drive",
    city: "San Diego",
    state: "CA",
    country: "USA",
    capacity: 380,
    storeType: "Supermarket",
    description: "Fresh seafood and organic produce supermarket",
  },
  {
    id: "14",
    storeCode: "STR-014",
    storeName: "Metro Center Store",
    phone: "+1-555-0114",
    email: "metro@store.com",
    address: "357 Metro Plaza",
    city: "Atlanta",
    state: "GA",
    country: "USA",
    capacity: 550,
    storeType: "Department Store",
    description: "Modern department store in Metro Center",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function StoreGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Store grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [storesData, setStoresData] = useState<StoreItem[]>(stores);
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

    const storeCodes = [
      "STR-015",
      "STR-016",
      "STR-017",
      "STR-018",
      "STR-019",
      "STR-020",
      "STR-021",
      "STR-022",
      "STR-023",
      "STR-024",
    ];
    const storeNames = [
      "Central Plaza Store",
      "Northgate Mall Store",
      "Southside Store",
      "East End Store",
      "Westfield Store",
      "Downtown Express Store",
      "Metro Center Store",
      "Suburban Store",
      "City Center Store",
      "Harbor View Store",
    ];
    const phones = [
      "+1-555-0115",
      "+1-555-0116",
      "+1-555-0117",
      "+1-555-0118",
      "+1-555-0119",
      "+1-555-0120",
      "+1-555-0121",
      "+1-555-0122",
      "+1-555-0123",
      "+1-555-0124",
    ];
    const emails = [
      "central@store.com",
      "northgate@store.com",
      "southside@store.com",
      "eastend@store.com",
      "westfield@store.com",
      "downtown@store.com",
      "metro@store.com",
      "suburban@store.com",
      "citycenter@store.com",
      "harbor@store.com",
    ];
    const addresses = [
      "100 Central Plaza",
      "200 Northgate Mall",
      "300 Southside Blvd",
      "400 East End Ave",
      "500 Westfield St",
      "600 Downtown Express",
      "700 Metro Center",
      "800 Suburban Rd",
      "900 City Center",
      "1000 Harbor View",
    ];
    const cities = [
      "Dallas",
      "Houston",
      "Austin",
      "San Antonio",
      "Fort Worth",
      "El Paso",
      "Arlington",
      "Corpus Christi",
      "Plano",
      "Lubbock",
    ];
    const states = ["TX", "TX", "TX", "TX", "TX", "TX", "TX", "TX", "TX", "TX"];
    const countries = [
      "USA",
      "USA",
      "USA",
      "USA",
      "USA",
      "USA",
      "USA",
      "USA",
      "USA",
      "USA",
    ];
    const capacities = [400, 350, 280, 320, 450, 200, 380, 300, 420, 250];
    const storeTypes = [
      "Supermarket",
      "Department Store",
      "Convenience Store",
      "Hypermarket",
      "Supermarket",
      "Convenience Store",
      "Department Store",
      "Supermarket",
      "Hypermarket",
      "Convenience Store",
    ];
    const descriptions = [
      "Full-service supermarket with pharmacy",
      "Modern department store with fashion",
      "24/7 convenience store",
      "Large hypermarket with electronics",
      "Organic and specialty foods",
      "Quick service convenience store",
      "Premium department store",
      "Family-friendly supermarket",
      "Large hypermarket with variety",
      "Coastal convenience store",
    ];

    const newItems: StoreItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const storeCode =
          storeCodes[Math.floor(Math.random() * storeCodes.length)];
        const storeName =
          storeNames[Math.floor(Math.random() * storeNames.length)];
        const phone = phones[Math.floor(Math.random() * phones.length)];
        const email = emails[Math.floor(Math.random() * emails.length)];
        const address = addresses[Math.floor(Math.random() * addresses.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const capacity =
          capacities[Math.floor(Math.random() * capacities.length)];
        const storeType =
          storeTypes[Math.floor(Math.random() * storeTypes.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];

        return {
          id: `${Date.now()}-${index}`,
          storeCode,
          storeName,
          phone,
          email,
          address,
          city,
          state,
          country,
          capacity,
          storeType,
          description,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (storesData.length >= 46) {
      setHasMore(false);
    } else {
      setStoresData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [storesData.length, isLoading, hasMore]);

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

  // Filter stores based on search query (search across multiple fields)
  const filteredStores = storesData.filter(
    (item) =>
      item.storeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.capacity.toString().includes(searchQuery.toLowerCase()) ||
      item.storeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (storeId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/store/view/${storeId}?fromView=${viewMode}`);
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
            {filteredStores.map((item, index) => {
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
                  {/* Store Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.storeName}
                    </CardTitle>
                  </div>

                  {/* Store Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Store Code:</span>
                      <span className="truncate">{item.storeCode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span className="truncate">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Address:</span>
                      <span className="truncate">{item.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">City:</span>
                      <span className="truncate">{item.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">State:</span>
                      <span className="truncate">{item.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Country:</span>
                      <span className="truncate">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Capacity:</span>
                      <span className="truncate">{item.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Store Type:</span>
                      <span className="truncate">{item.storeType}</span>
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
                <span className="text-sm">Loading more stores...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredStores.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more stores to load
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
                data={stores}
                setFilteredData={setStoresData}
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
                data={stores}
                setFilteredData={setStoresData}
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
