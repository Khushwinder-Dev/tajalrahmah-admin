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

// Order Type interface
interface OrderTypeItem {
  id: string;
  orderType: string;
  customerId: string;
  description: string;
  requiresDeliveryman: "yes" | "no";
}

// Mock data - replace with real data from your API
const orderTypes: OrderTypeItem[] = [
  {
    id: "1",
    orderType: "Dine-In",
    customerId: "CUST-001",
    description: "Customer dining at restaurant",
    requiresDeliveryman: "no",
  },
  {
    id: "2",
    orderType: "Takeaway",
    customerId: "CUST-002",
    description: "Customer picking up order",
    requiresDeliveryman: "no",
  },
  {
    id: "3",
    orderType: "Home Delivery",
    customerId: "CUST-003",
    description: "Order delivered to customer address",
    requiresDeliveryman: "yes",
  },
  {
    id: "4",
    orderType: "Curbside Pickup",
    customerId: "CUST-004",
    description: "Customer pickup from parking lot",
    requiresDeliveryman: "no",
  },
  {
    id: "5",
    orderType: "Express Delivery",
    customerId: "CUST-005",
    description: "Fast delivery service",
    requiresDeliveryman: "yes",
  },
  {
    id: "6",
    orderType: "Drive-Thru",
    customerId: "CUST-006",
    description: "Order through drive-thru window",
    requiresDeliveryman: "no",
  },
  {
    id: "7",
    orderType: "Catering",
    customerId: "CUST-007",
    description: "Large event catering service",
    requiresDeliveryman: "yes",
  },
  {
    id: "8",
    orderType: "Online Order",
    customerId: "CUST-008",
    description: "Order placed through website",
    requiresDeliveryman: "yes",
  },
  {
    id: "9",
    orderType: "Phone Order",
    customerId: "CUST-009",
    description: "Order placed via phone call",
    requiresDeliveryman: "yes",
  },
  {
    id: "10",
    orderType: "Pre-Order",
    customerId: "CUST-010",
    description: "Advance order placement",
    requiresDeliveryman: "no",
  },
  {
    id: "11",
    orderType: "Mobile App",
    customerId: "CUST-011",
    description: "Order through mobile application",
    requiresDeliveryman: "yes",
  },
  {
    id: "12",
    orderType: "Walk-In",
    customerId: "CUST-012",
    description: "Customer walk-in order",
    requiresDeliveryman: "no",
  },
  {
    id: "13",
    orderType: "Corporate Order",
    customerId: "CUST-013",
    description: "Bulk order for company",
    requiresDeliveryman: "yes",
  },
  {
    id: "14",
    orderType: "Party Order",
    customerId: "CUST-014",
    description: "Special party arrangements",
    requiresDeliveryman: "yes",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function OrderTypeGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Order Type grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [orderTypesData, setOrderTypesData] =
    useState<OrderTypeItem[]>(orderTypes);
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

    const orderTypesList = [
      "Dine-In",
      "Takeaway",
      "Home Delivery",
      "Curbside Pickup",
      "Express Delivery",
      "Drive-Thru",
      "Catering",
      "Online Order",
      "Phone Order",
      "Pre-Order",
      "Mobile App",
      "Walk-In",
      "Corporate Order",
      "Party Order",
    ];
    const customerIds = [
      "CUST-015",
      "CUST-016",
      "CUST-017",
      "CUST-018",
      "CUST-019",
      "CUST-020",
      "CUST-021",
      "CUST-022",
      "CUST-023",
      "CUST-024",
    ];
    const descriptions = [
      "Customer dining at restaurant",
      "Customer picking up order",
      "Order delivered to customer address",
      "Customer pickup from parking lot",
      "Fast delivery service",
      "Order through drive-thru window",
      "Large event catering service",
      "Order placed through website",
      "Order placed via phone call",
      "Advance order placement",
      "Order through mobile application",
      "Customer walk-in order",
      "Bulk order for company",
      "Special party arrangements",
    ];
    const requiresDeliverymanOptions: ("yes" | "no")[] = ["yes", "no"];

    const newItems: OrderTypeItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const orderType =
          orderTypesList[Math.floor(Math.random() * orderTypesList.length)];
        const customerId =
          customerIds[Math.floor(Math.random() * customerIds.length)];
        const description =
          descriptions[Math.floor(Math.random() * descriptions.length)];
        const requiresDeliveryman =
          requiresDeliverymanOptions[
            Math.floor(Math.random() * requiresDeliverymanOptions.length)
          ];

        return {
          id: `${Date.now()}-${index}`,
          orderType: orderType,
          customerId: customerId,
          description: description,
          requiresDeliveryman: requiresDeliveryman,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (orderTypesData.length >= 46) {
      setHasMore(false);
    } else {
      setOrderTypesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [orderTypesData.length, isLoading, hasMore]);

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

  // Filter order types based on search query (search across multiple fields)
  const filteredOrderTypes = orderTypesData.filter(
    (item) =>
      item.orderType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiresDeliveryman.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (typeId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/order-type/view/${typeId}?fromView=${viewMode}`);
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
            {filteredOrderTypes.map((item, index) => {
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
                  {/* Order Type Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.orderType}
                    </CardTitle>
                  </div>

                  {/* Order Type Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Customer ID:</span>
                      <span className="truncate">{item.customerId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Description:</span>
                      <span className="truncate">{item.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Requires Deliveryman:</span>
                      <span
                        className={cn(
                          "truncate font-semibold capitalize",
                          item.requiresDeliveryman === "yes"
                            ? "text-green-600"
                            : "text-gray-500"
                        )}
                      >
                        {item.requiresDeliveryman}
                      </span>
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
                <span className="text-sm">Loading more order types...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredOrderTypes.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more order types to load
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
                data={orderTypes}
                setFilteredData={setOrderTypesData}
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
                data={orderTypes}
                setFilteredData={setOrderTypesData}
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
