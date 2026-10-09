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

// Deliveryman interface
interface DeliverymanItem {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  vehicleType: string;
  assignedArea: string;
  customerLogo: string; // image url
}

// Mock data - replace with real data from your API
const deliverymen: DeliverymanItem[] = [
  {
    id: "1",
    code: "DM-001",
    name: "John Doe",
    phone: "+1 202-555-0147",
    email: "john.doe@example.com",
    address: "123 Main St, New York, USA",
    nationalId: "A123456789",
    vehicleType: "Bike",
    assignedArea: "Manhattan",
    customerLogo: "/sample1.png",
  },
  {
    id: "2",
    code: "DM-002",
    name: "Sarah Khan",
    phone: "+971 50 555 1234",
    email: "sarah.khan@example.com",
    address: "Al Barsha, Dubai, UAE",
    nationalId: "B987654321",
    vehicleType: "Car",
    assignedArea: "Al Barsha",
    customerLogo: "/sample1.png",
  },
  {
    id: "3",
    code: "DM-003",
    name: "Mike Lee",
    phone: "+44 20 7946 0958",
    email: "mike.lee@example.co.uk",
    address: "221B Baker St, London, UK",
    nationalId: "UK55667788",
    vehicleType: "Van",
    assignedArea: "Westminster",
    customerLogo: "/sample1.png",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function DeliverymanGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [deliverymenData, setDeliverymenData] =
    useState<DeliverymanItem[]>(deliverymen);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 6;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const names = [
      "John Doe",
      "Sarah Khan",
      "Mike Lee",
      "Priya Patel",
      "Ahmed Ali",
      "Julia Chen",
      "Carlos Diaz",
      "Fatima Noor",
    ];
    const vehicles = ["Bike", "Car", "Van", "Scooter"];
    const areas = [
      "Downtown",
      "Uptown",
      "Westside",
      "Eastside",
      "Central",
      "Harbour",
    ];

    const newItems: DeliverymanItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const idx = Math.floor(Math.random() * names.length);
        const vIdx = Math.floor(Math.random() * vehicles.length);
        const aIdx = Math.floor(Math.random() * areas.length);
        const codeNum = Math.floor(Math.random() * 900 + 100);
        return {
          id: `${Date.now()}-${index}`,
          code: `DM-${codeNum}`,
          name: names[idx],
          phone: `+1 202-555-${Math.floor(Math.random() * 9000 + 1000)}`,
          email: `${names[idx].toLowerCase().replace(/\s/g, ".")}@example.com`,
          address: `${Math.floor(Math.random() * 999)} Main St`,
          nationalId: `ID${Math.floor(Math.random() * 100000000)}`,
          vehicleType: vehicles[vIdx],
          assignedArea: areas[aIdx],
          customerLogo: "/sample1.png",
        };
      }
    );

    // Stop loading more after reaching ~60 items for demo
    if (deliverymenData.length >= 54) {
      setHasMore(false);
    } else {
      setDeliverymenData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [deliverymenData.length, isLoading, hasMore]);

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

  // Filter currencies based on search query (search across multiple fields)
  const filteredDeliverymen = deliverymenData.filter((item) =>
    [
      item.code,
      item.name,
      item.phone,
      item.email,
      item.address,
      item.nationalId,
      item.vehicleType,
      item.assignedArea,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (id: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/deliverymen/view/${id}?fromView=${viewMode}`);
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
            {filteredDeliverymen.map((item, index) => {
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
                  {/* Header with Name and Code */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.name} ({item.code})
                    </CardTitle>
                    <img
                      src={item.customerLogo}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-full ml-3"
                    />
                  </div>

                  {/* Deliveryman Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
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
                      <span className="font-medium">National ID:</span>
                      <span className="truncate">{item.nationalId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Vehicle:</span>
                      <span className="truncate">{item.vehicleType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Assigned Area:</span>
                      <span className="truncate">{item.assignedArea}</span>
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
                <span className="text-sm">Loading more currencies...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDeliverymen.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more deliverymen to load
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
          style={{ width: isMobile ? "100%" : "320px" }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={deliverymen}
                setFilteredData={setDeliverymenData}
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
          style={{ width: isMobile ? "100%" : "320px" }}
        >
          <div className={cn("h-full", isMobile ? "pb-4 mt-1" : "p-2")}>
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={deliverymen}
                setFilteredData={setDeliverymenData}
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
