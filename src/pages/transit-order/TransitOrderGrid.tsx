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
const transitOrderData = [
  {
    id: "1",
    sn: "001",
    country: "Saudi Arabia",
    company: "Al-Rashid Trading Company",
    piNo: "PI-2024-001",
    invoiceNo: "INV-2024-001",
    supplierName: "Global Suppliers Ltd",
    status: "Pending",
    date: new Date("2024-01-15"),
    loginId: "user001",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sn: "002",
    country: "UAE",
    company: "Al-Zahrani Enterprises",
    piNo: "PI-2024-002",
    invoiceNo: "INV-2024-002",
    supplierName: "Middle East Trading Co",
    status: "Approved",
    date: new Date("2024-01-16"),
    loginId: "user002",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    sn: "003",
    country: "Kuwait",
    company: "Al-Otaibi Industries",
    piNo: "PI-2024-003",
    invoiceNo: "INV-2024-003",
    supplierName: "Gulf Suppliers International",
    status: "In Transit",
    date: new Date("2024-01-17"),
    loginId: "user003",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    sn: "004",
    country: "Qatar",
    company: "Al-Shehri Solutions",
    piNo: "PI-2024-004",
    invoiceNo: "INV-2024-004",
    supplierName: "Qatar Trading Partners",
    status: "Delivered",
    date: new Date("2024-01-18"),
    loginId: "user004",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    sn: "005",
    country: "Bahrain",
    company: "Al-Ghamdi Trading",
    piNo: "PI-2024-005",
    invoiceNo: "INV-2024-005",
    supplierName: "Bahrain Import Export",
    status: "Pending",
    date: new Date("2024-01-19"),
    loginId: "user005",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    sn: "006",
    country: "Oman",
    company: "Al-Harbi Corporation",
    piNo: "PI-2024-006",
    invoiceNo: "INV-2024-006",
    supplierName: "Oman Trading Solutions",
    status: "Approved",
    date: new Date("2024-01-20"),
    loginId: "user006",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    sn: "007",
    country: "Jordan",
    company: "Al-Maktoum Trading",
    piNo: "PI-2024-007",
    invoiceNo: "INV-2024-007",
    supplierName: "Jordan Export Company",
    status: "In Transit",
    date: new Date("2024-01-21"),
    loginId: "user007",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    sn: "008",
    country: "Lebanon",
    company: "Al-Nahyan Enterprises",
    piNo: "PI-2024-008",
    invoiceNo: "INV-2024-008",
    supplierName: "Lebanon Trading Group",
    status: "Pending",
    date: new Date("2024-01-22"),
    loginId: "user008",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    sn: "009",
    country: "Egypt",
    company: "Al-Qasimi Trading",
    piNo: "PI-2024-009",
    invoiceNo: "INV-2024-009",
    supplierName: "Egypt Import Export",
    status: "Approved",
    date: new Date("2024-01-23"),
    loginId: "user009",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    sn: "010",
    country: "Iraq",
    company: "Al-Sharqi Corporation",
    piNo: "PI-2024-010",
    invoiceNo: "INV-2024-010",
    supplierName: "Iraq Trading Partners",
    status: "In Transit",
    date: new Date("2024-01-24"),
    loginId: "user010",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    sn: "011",
    country: "Turkey",
    company: "Al-Sabah Trading",
    piNo: "PI-2024-011",
    invoiceNo: "INV-2024-011",
    supplierName: "Turkish Export Company",
    status: "Delivered",
    date: new Date("2024-01-25"),
    loginId: "user011",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    sn: "012",
    country: "Iran",
    company: "Al-Khalifa Enterprises",
    piNo: "PI-2024-012",
    invoiceNo: "INV-2024-012",
    supplierName: "Iran Trading Solutions",
    status: "Pending",
    date: new Date("2024-01-26"),
    loginId: "user012",
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

export default function TransitOrderGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Transit Order grid rendered");

  const navigate = useNavigate();

  const [transitOrderDataState, setTransitOrderDataState] =
    useState(transitOrderData);
  const canDelete: boolean = usePermission("transitOrder", "delete");
  const canRestore: boolean = usePermission("transitOrder", "restore");
  const canEdit: boolean = usePermission("transitOrder", "edit");

  // Debug permissions
  console.log("Transit Order Permissions:", {
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

    const countries = [
      "Pakistan",
      "India",
      "China",
      "Japan",
      "South Korea",
      "Singapore",
    ];
    const companies = [
      "Al-Thani Trading Company",
      "Al-Said Enterprises",
      "Al-Hashemi Corporation",
      "Aoun Trading Solutions",
      "El-Sisi Enterprises",
      "Al-Kadhimi Trading",
    ];
    const supplierNames = [
      "Pakistani Export Co",
      "Indian Trading Partners",
      "Chinese Export Group",
      "Japanese Trading Solutions",
      "Korean Export Company",
      "Singapore Trading Partners",
    ];
    const statuses = ["Pending", "Approved", "In Transit", "Delivered"];
    const loginIds = [
      "user013",
      "user014",
      "user015",
      "user016",
      "user017",
      "user018",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      sn: `${String(transitOrderDataState.length + index + 1).padStart(
        3,
        "0"
      )}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      piNo: `PI-2024-${String(
        transitOrderDataState.length + index + 1
      ).padStart(3, "0")}`,
      invoiceNo: `INV-2024-${String(
        transitOrderDataState.length + index + 1
      ).padStart(3, "0")}`,
      supplierName:
        supplierNames[Math.floor(Math.random() * supplierNames.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(),
      loginId: loginIds[Math.floor(Math.random() * loginIds.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (transitOrderDataState.length >= 46) {
      setHasMore(false);
    } else {
      setTransitOrderDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [transitOrderDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (transitOrderId: string) => {
    setTransitOrderDataState((prevTransitOrders) =>
      prevTransitOrders.map((transitOrder) =>
        transitOrder.id === transitOrderId
          ? {
              ...transitOrder,
              isDeleted: transitOrder.isDeleted === true ? false : true,
            }
          : transitOrder
      )
    );
  };

  const handleRestoreClick = (transitOrderId: string) => {
    setTransitOrderDataState((prevTransitOrders) =>
      prevTransitOrders.map((transitOrder) =>
        transitOrder.id === transitOrderId
          ? {
              ...transitOrder,
              isDeleted: transitOrder.isDeleted === true ? false : true,
            }
          : transitOrder
      )
    );
  };

  // Filter transit order records based on search query
  const filteredTransitOrders = transitOrderDataState.filter(
    (transitOrder) =>
      transitOrder.sn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transitOrder.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transitOrder.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transitOrder.piNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transitOrder.invoiceNo
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transitOrder.supplierName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transitOrder.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transitOrder.loginId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Approved":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "In Transit":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
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
          Total {transitOrderData.length} transit order records
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
            {filteredTransitOrders.map((transitOrder, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/transit-order/1`)}
                  >
                    {transitOrder.company}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transitOrder.status
                      )}`}
                    >
                      {transitOrder.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: SN | Actions | Country */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* P.I.No */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      P.I.No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {transitOrder.piNo}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        transitOrder.isDeleted && canRestore
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
                        disabled={transitOrder.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          transitOrder.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && transitOrder.isDeleted) {
                            handleRestoreClick(transitOrder.id);
                            toastRestore(
                              "Transit order record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(transitOrder.id);
                              toastDelete(
                                "Transit order record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {transitOrder.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/transit-order/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Invoice No */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Invoice No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {transitOrder.invoiceNo}
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
                  Loading more transit order records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTransitOrders.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more transit order records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={transitOrderData}
                setFilteredData={setTransitOrderDataState}
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
                data={transitOrderData}
                setFilteredData={setTransitOrderDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
