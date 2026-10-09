import { Card, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import GridFilterComponent from "@/pages/Country/GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";
import { Tooltip } from "@mantine/core";
import { Trash2, RefreshCw, CheckCircle2, Circle, Pencil } from "lucide-react";
import { toastSuccess } from "@/lib/toast";

type Customer = {
  id: string;
  customerNo: string;
  customerName: string;
  paymentMode: "Cash" | "Card" | "Bank Transfer" | "Mobile Payment";
  currency: "USD" | "EUR" | "BDT" | "INR" | "GBP";
  customerLogo: string;
  status: "active" | "inactive" | "draft";
  isDeleted: boolean;
};

// Your existing customer data
const customers: Customer[] = [
  {
    id: "1",
    customerNo: "C001",
    customerName: "Global Tech Solutions",
    paymentMode: "Bank Transfer",
    currency: "USD",
    customerLogo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
  {
    id: "2",
    customerNo: "C002",
    customerName: "Dhaka Mart",
    paymentMode: "Cash",
    currency: "BDT",
    customerLogo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
  {
    id: "3",
    customerNo: "C003",
    customerName: "Eurozone Imports",
    paymentMode: "Card",
    currency: "EUR",
    customerLogo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
  {
    id: "4",
    customerNo: "C004",
    customerName: "Indian Bazaar",
    paymentMode: "Mobile Payment",
    currency: "INR",
    customerLogo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
  {
    id: "5",
    customerNo: "C005",
    customerName: "London Supplies Ltd",
    paymentMode: "Bank Transfer",
    currency: "GBP",
    customerLogo: "/customer-dummy-image.jpg",
    status: "active",
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
  setViewMode: (viewMode: "grid" | "table") => void;
};

export default function CustomersGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Customers grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [customersData, setCustomersData] = useState(customers);

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

    const paymentModes: Customer["paymentMode"][] = [
      "Cash",
      "Card",
      "Bank Transfer",
      "Mobile Payment",
    ];
    const currencies: Customer["currency"][] = [
      "USD",
      "EUR",
      "BDT",
      "INR",
      "GBP",
    ];
    const statuses: Customer["status"][] = ["active", "inactive", "draft"];

    const newItems: Customer[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => ({
        id: `${Date.now()}-${index}`,
        customerNo: `C${(customersData.length + index + 1)
          .toString()
          .padStart(3, "0")}`,
        customerName: `Customer ${customersData.length + index + 1}`,
        paymentMode:
          paymentModes[Math.floor(Math.random() * paymentModes.length)],
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        customerLogo: "/customer-dummy-image.jpg",
        status: statuses[Math.floor(Math.random() * statuses.length)],
        isDeleted: false,
      })
    );

    // Stop loading more after reaching 50 items for demo
    if (customersData.length >= 46) {
      setHasMore(false);
    } else {
      setCustomersData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [customersData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (customerId: string) => {
    setCustomersData((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              isDeleted: !customer.isDeleted,
            }
          : customer
      )
    );
  };

  const handleRestoreClick = (customerId: string) => {
    setCustomersData((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              isDeleted: !customer.isDeleted,
            }
          : customer
      )
    );
  };

  const toggleStatus = (customerId: string) => {
    setCustomersData((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              status: customer.status === "active" ? "inactive" : "active",
            }
          : customer
      )
    );
  };

  // Filter customers based on search query
  const filteredCustomers = customersData.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.customerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.paymentMode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (customerId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/customers/view/${customerId}?fromView=${viewMode}`);
  };

  const handleEditClick = (customerId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/customers/edit/${customerId}?fromView=${viewMode}`);
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
            {filteredCustomers.map((customer) => (
              <Card
                key={customer.id}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(customer.id)}
              >
                {/* Top Row - Title and Logo */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Title */}
                  <Tooltip
                    label={customer.customerName}
                    position="top"
                    withArrow
                  >
                    <CardTitle
                      className="text-base font-normal transition-colors truncate"
                      style={{ fontSize: "18px" }}
                    >
                      {customer.customerName}
                    </CardTitle>
                  </Tooltip>

                  {/* Right - Logo */}
                  <div className="flex justify-end">
                    <img
                      src={customer.customerLogo}
                      alt={`${customer.customerName} logo`}
                      className="h-12 w-16 object-cover border rounded-md shadow-sm flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/customer-dummy-image.jpg";
                      }}
                    />
                  </div>
                </div>

                {/* Action Icons - Only visible on hover */}
                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Status Toggle */}
                  <Tooltip
                    label={
                      customer.status === "active"
                        ? "Click to Inactivate"
                        : "Click to Activate"
                    }
                    position="top"
                    withArrow
                  >
                    <div
                      className={`cursor-pointer p-1.5 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                        customer.status === "active"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(customer.id);
                        toastSuccess(
                          customer.status === "active"
                            ? "Customer inactivated successfully"
                            : "Customer activated successfully"
                        );
                      }}
                    >
                      {customer.status === "active" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </div>
                  </Tooltip>

                  {/* Delete/Restore */}
                  <Tooltip
                    label={customer.isDeleted ? "Restore" : "Delete"}
                    position="top"
                    withArrow
                  >
                    <div
                      className={`cursor-pointer p-1.5 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                        customer.isDeleted ? "text-blue-500" : "text-red-500"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (customer.isDeleted) {
                          handleRestoreClick(customer.id);
                        } else {
                          handleDeleteClick(customer.id);
                        }
                        toastSuccess(
                          customer.isDeleted
                            ? "Customer restored successfully"
                            : "Customer deleted successfully"
                        );
                      }}
                    >
                      {customer.isDeleted ? (
                        <RefreshCw className="h-4 w-4" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </div>
                  </Tooltip>

                  {/* Edit */}
                  <Tooltip label="Edit" position="top" withArrow>
                    <div
                      className="cursor-pointer p-1.5 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(customer.id);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </div>
                  </Tooltip>
                </div>

                {/* Middle Row - Payment Mode and Currency */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Payment Mode - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Payment Mode
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {customer.paymentMode}
                    </div>
                  </div>

                  {/* Currency - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Currency
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {customer.currency}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Customer No and Status */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700">
                  {/* Customer No - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer No
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {customer.customerNo}
                    </div>
                  </div>

                  {/* Status - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div
                      className={cn(
                        "text-sm font-normal truncate",
                        customer.status === "active"
                          ? "text-green-600 dark:text-green-400"
                          : customer.status === "inactive"
                          ? "text-red-600 dark:text-red-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      )}
                    >
                      {customer.status.charAt(0).toUpperCase() +
                        customer.status.slice(1)}
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
                <span className="text-sm">Loading more customers...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCustomers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more customers to load
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
                data={customers}
                setFilteredData={setCustomersData}
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
                data={customers}
                setFilteredData={setCustomersData}
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
