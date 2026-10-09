import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";

// Mock data - replace with real data from your API
const checkoutData = [
  {
    id: "1",
    roomNo: "101",
    guestName: "Ahmed Al-Mansouri",
    checkInDate: new Date("2024-01-15"),
    checkOutDate: new Date("2024-01-18"),
    roomType: "Deluxe",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    roomNo: "205",
    guestName: "Sarah Johnson",
    checkInDate: new Date("2024-01-16"),
    checkOutDate: new Date("2024-01-19"),
    roomType: "Family Suite",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    roomNo: "301",
    guestName: "Dr. Mohammed Al-Rashid",
    checkInDate: new Date("2024-01-17"),
    checkOutDate: new Date("2024-01-20"),
    roomType: "Executive",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    roomNo: "401",
    guestName: "Fatima Hassan",
    checkInDate: new Date("2024-01-18"),
    checkOutDate: new Date("2024-01-25"),
    roomType: "Medical Suite",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    roomNo: "501",
    guestName: "The Al-Zahra Family",
    checkInDate: new Date("2024-01-19"),
    checkOutDate: new Date("2024-01-26"),
    roomType: "Budget",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    roomNo: "601",
    guestName: "James Wilson",
    checkInDate: new Date("2024-01-20"),
    checkOutDate: new Date("2024-01-23"),
    roomType: "Standard",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    roomNo: "701",
    guestName: "Layla Al-Mahmoud",
    checkInDate: new Date("2024-01-21"),
    checkOutDate: new Date("2024-01-24"),
    roomType: "Deluxe",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    roomNo: "801",
    guestName: "Carlos Rodriguez",
    checkInDate: new Date("2024-01-22"),
    checkOutDate: new Date("2024-01-25"),
    roomType: "Standard",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    roomNo: "901",
    guestName: "Aisha Al-Nasser",
    checkInDate: new Date("2024-01-23"),
    checkOutDate: new Date("2024-01-28"),
    roomType: "Executive",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    roomNo: "1001",
    guestName: "Elena Petrov",
    checkInDate: new Date("2024-01-24"),
    checkOutDate: new Date("2024-01-29"),
    roomType: "Studio",
    status: "Inactive",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    roomNo: "1101",
    guestName: "Professor David Chen",
    checkInDate: new Date("2024-01-25"),
    checkOutDate: new Date("2024-01-28"),
    roomType: "Standard",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    roomNo: "1201",
    guestName: "Raj Patel & Family",
    checkInDate: new Date("2024-01-26"),
    checkOutDate: new Date("2024-01-29"),
    roomType: "Medical Suite",
    status: "Active",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-31"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function CheckoutGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Checkout grid rendered");

  const navigate = useNavigate();

  const [checkoutDataState, setCheckoutDataState] = useState(checkoutData);
  const canDelete: boolean = usePermission("checkout", "delete");
  const canRestore: boolean = usePermission("checkout", "restore");
  const canEdit: boolean = usePermission("checkout", "edit");

  // Debug permissions
  console.log("Checkout Permissions:", {
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

    const roomTypes = [
      "Standard",
      "Deluxe",
      "Suite",
      "Accessible",
      "Family",
      "Budget",
      "Executive",
      "Studio",
      "Medical Suite",
    ];
    const statuses = ["Active", "Inactive"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      roomNo: `${String(checkoutDataState.length + index + 1).padStart(
        3,
        "0"
      )}1`,
      guestName: `Guest ${checkoutDataState.length + index + 1}`,
      checkInDate: new Date(),
      checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
      roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (checkoutDataState.length >= 46) {
      setHasMore(false);
    } else {
      setCheckoutDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [checkoutDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (checkoutId: string) => {
    setCheckoutDataState((prevCheckouts) =>
      prevCheckouts.map((checkout) =>
        checkout.id === checkoutId
          ? {
              ...checkout,
              isDeleted: checkout.isDeleted === true ? false : true,
            }
          : checkout
      )
    );
  };

  const handleRestoreClick = (checkoutId: string) => {
    setCheckoutDataState((prevCheckouts) =>
      prevCheckouts.map((checkout) =>
        checkout.id === checkoutId
          ? {
              ...checkout,
              isDeleted: checkout.isDeleted === true ? false : true,
            }
          : checkout
      )
    );
  };

  // Filter checkout records based on search query
  const filteredCheckout = checkoutDataState.filter(
    (checkout) =>
      checkout.roomNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkout.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkout.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkout.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          Total {checkoutData.length} checkout records
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
            {filteredCheckout.map((checkout, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Room No | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Room No */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/checkout/1`)}
                  >
                    Room {checkout.roomNo}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        checkout.status
                      )}`}
                    >
                      {checkout.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Room Type | Actions | Check Out */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Room Type */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Type
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {checkout.roomType}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        checkout.isDeleted && canRestore
                          ? "Restore"
                          : canDelete
                          ? "Delete"
                          : ""
                      }
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
                      <button
                        disabled={checkout.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          checkout.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && checkout.isDeleted) {
                            handleRestoreClick(checkout.id);
                            toastRestore(
                              "Checkout record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(checkout.id);
                              toastDelete(
                                "Checkout record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {checkout.isDeleted && canRestore ? (
                          <RefreshCw className="h-4 w-4" />
                        ) : (
                          canDelete && <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </Tooltip>

                    {/* Edit */}
                    {canEdit && (
                      <Tooltip
                        label="Edit"
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
                        <div
                          className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500 flex items-center justify-center w-8 h-8"
                          onClick={() => navigate(`/checkout/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Check Out Date */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Check Out
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {formatDate(checkout.checkOutDate)}
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
                <span className="text-sm">
                  Loading more checkout records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCheckout.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more checkout records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={checkoutData}
                setFilteredData={setCheckoutDataState}
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
                data={checkoutData}
                setFilteredData={setCheckoutDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
