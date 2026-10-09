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
const deliveryOrderLogisticData = [
  {
    id: "1",
    sn: "DOL001",
    country: "Saudi Arabia",
    company: "Al-Rashid Trading Company",
    piNo: "PI-2024-001",
    invoiceNo: "INV-2024-001",
    supplierName: "Global Supplies Ltd",
    status: "Active",
    dateLoginId: new Date("2024-01-15"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sn: "DOL002",
    country: "UAE",
    company: "Al-Zahrani Enterprises",
    piNo: "PI-2024-002",
    invoiceNo: "INV-2024-002",
    supplierName: "Emirates Trading Co",
    status: "Active",
    dateLoginId: new Date("2024-01-16"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    sn: "DOL003",
    country: "Kuwait",
    company: "Al-Otaibi Industries",
    piNo: "PI-2024-003",
    invoiceNo: "INV-2024-003",
    supplierName: "Kuwait Supply Chain",
    status: "Pending",
    dateLoginId: new Date("2024-01-17"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    sn: "DOL004",
    country: "Qatar",
    company: "Al-Shehri Solutions",
    piNo: "PI-2024-004",
    invoiceNo: "INV-2024-004",
    supplierName: "Qatar Logistics Hub",
    status: "Delivered",
    dateLoginId: new Date("2024-01-18"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    sn: "DOL005",
    country: "Bahrain",
    company: "Al-Ghamdi Trading",
    piNo: "PI-2024-005",
    invoiceNo: "INV-2024-005",
    supplierName: "Bahrain Express",
    status: "In Transit",
    dateLoginId: new Date("2024-01-19"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    sn: "DOL006",
    country: "Oman",
    company: "Al-Harbi Corporation",
    piNo: "PI-2024-006",
    invoiceNo: "INV-2024-006",
    supplierName: "Oman Distribution",
    status: "Active",
    dateLoginId: new Date("2024-01-20"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    sn: "DOL007",
    country: "Jordan",
    company: "Al-Maktoum Trading",
    piNo: "PI-2024-007",
    invoiceNo: "INV-2024-007",
    supplierName: "Jordan Freight",
    status: "Cancelled",
    dateLoginId: new Date("2024-01-21"),
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    sn: "DOL008",
    country: "Lebanon",
    company: "Al-Nahyan Enterprises",
    piNo: "PI-2024-008",
    invoiceNo: "INV-2024-008",
    supplierName: "Lebanon Logistics",
    status: "Active",
    dateLoginId: new Date("2024-01-22"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    sn: "DOL009",
    country: "Egypt",
    company: "Al-Qasimi Trading",
    piNo: "PI-2024-009",
    invoiceNo: "INV-2024-009",
    supplierName: "Egypt Supply Co",
    status: "Processing",
    dateLoginId: new Date("2024-01-23"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    sn: "DOL010",
    country: "Iraq",
    company: "Al-Sharqi Corporation",
    piNo: "PI-2024-010",
    invoiceNo: "INV-2024-010",
    supplierName: "Iraq Trading House",
    status: "Delivered",
    dateLoginId: new Date("2024-01-24"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    sn: "DOL011",
    country: "Turkey",
    company: "Al-Sabah Trading",
    piNo: "PI-2024-011",
    invoiceNo: "INV-2024-011",
    supplierName: "Turkish Suppliers",
    status: "Active",
    dateLoginId: new Date("2024-01-25"),
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    sn: "DOL012",
    country: "Iran",
    company: "Al-Khalifa Enterprises",
    piNo: "PI-2024-012",
    invoiceNo: "INV-2024-012",
    supplierName: "Iran Global Trade",
    status: "Pending",
    dateLoginId: new Date("2024-01-26"),
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

export default function DeliveryOrderLogisticGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Delivery Order Logistic grid rendered");

  const navigate = useNavigate();

  const [deliveryOrderLogisticDataState, setDeliveryOrderLogisticDataState] =
    useState(deliveryOrderLogisticData);
  const canDelete: boolean = usePermission("deliveryOrderLogistic", "delete");
  const canRestore: boolean = usePermission("deliveryOrderLogistic", "restore");
  const canEdit: boolean = usePermission("deliveryOrderLogistic", "edit");

  // Field-level permissions
  const canViewSn: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "sn"
  );
  const canViewCountry: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "country"
  );
  const canViewCompany: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "company"
  );
  const canViewPiNo: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "piNo"
  );
  const canViewInvoiceNo: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "invoiceNo"
  );
  const canViewSupplierName: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "supplierName"
  );
  const canViewStatus: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "status"
  );
  const canViewDateLoginId: boolean = usePermission(
    "deliveryOrderLogistic",
    "view",
    "dateLoginId"
  );

  // Debug permissions
  console.log("Delivery Order Logistic Permissions:", {
    canDelete,
    canRestore,
    canEdit,
    canViewSn,
    canViewCountry,
    canViewCompany,
    canViewPiNo,
    canViewInvoiceNo,
    canViewSupplierName,
    canViewStatus,
    canViewDateLoginId,
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
    const suppliers = [
      "Global Trade Partners",
      "International Suppliers",
      "Worldwide Logistics",
      "Express Distribution",
      "Premium Supply Chain",
      "Elite Trading House",
    ];
    const statuses = [
      "Active",
      "Pending",
      "In Transit",
      "Delivered",
      "Processing",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
      const itemIndex = deliveryOrderLogisticDataState.length + index + 1;
      return {
        id: `${Date.now()}-${index}`,
        sn: `DOL${String(itemIndex).padStart(3, "0")}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        piNo: `PI-2024-${String(itemIndex).padStart(3, "0")}`,
        invoiceNo: `INV-2024-${String(itemIndex).padStart(3, "0")}`,
        supplierName: suppliers[Math.floor(Math.random() * suppliers.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        dateLoginId: new Date(),
        isActive: Math.random() > 0.3,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // Stop loading more after reaching 50 items for demo
    if (deliveryOrderLogisticDataState.length >= 46) {
      setHasMore(false);
    } else {
      setDeliveryOrderLogisticDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [deliveryOrderLogisticDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (deliveryOrderLogisticId: string) => {
    setDeliveryOrderLogisticDataState((prevDeliveryOrderLogistics) =>
      prevDeliveryOrderLogistics.map((deliveryOrderLogistic) =>
        deliveryOrderLogistic.id === deliveryOrderLogisticId
          ? {
              ...deliveryOrderLogistic,
              isDeleted:
                deliveryOrderLogistic.isDeleted === true ? false : true,
            }
          : deliveryOrderLogistic
      )
    );
  };

  const handleRestoreClick = (deliveryOrderLogisticId: string) => {
    setDeliveryOrderLogisticDataState((prevDeliveryOrderLogistics) =>
      prevDeliveryOrderLogistics.map((deliveryOrderLogistic) =>
        deliveryOrderLogistic.id === deliveryOrderLogisticId
          ? {
              ...deliveryOrderLogistic,
              isDeleted:
                deliveryOrderLogistic.isDeleted === true ? false : true,
            }
          : deliveryOrderLogistic
      )
    );
  };

  // Filter delivery order logistic records based on search query
  const filteredDeliveryOrderLogistics = deliveryOrderLogisticDataState.filter(
    (deliveryOrderLogistic) => {
      const searchLower = searchQuery.toLowerCase();

      // Only search by fields user has permission to view
      const searchableFields = [];

      if (canViewSn) {
        searchableFields.push(
          deliveryOrderLogistic.sn.toLowerCase().includes(searchLower)
        );
      }

      if (canViewCountry) {
        searchableFields.push(
          deliveryOrderLogistic.country.toLowerCase().includes(searchLower)
        );
      }

      if (canViewCompany) {
        searchableFields.push(
          deliveryOrderLogistic.company.toLowerCase().includes(searchLower)
        );
      }

      if (canViewPiNo) {
        searchableFields.push(
          deliveryOrderLogistic.piNo.toLowerCase().includes(searchLower)
        );
      }

      if (canViewInvoiceNo) {
        searchableFields.push(
          deliveryOrderLogistic.invoiceNo.toLowerCase().includes(searchLower)
        );
      }

      if (canViewSupplierName) {
        searchableFields.push(
          deliveryOrderLogistic.supplierName.toLowerCase().includes(searchLower)
        );
      }

      if (canViewStatus) {
        searchableFields.push(
          deliveryOrderLogistic.status.toLowerCase().includes(searchLower)
        );
      }

      // If no fields are searchable, return false
      if (searchableFields.length === 0) {
        return false;
      }

      // Return true if any searchable field matches
      return searchableFields.some((field) => field);
    }
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "delivered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "in transit":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "processing":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
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
          Total {deliveryOrderLogisticData.length} delivery order logistic
          records
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
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-4 p-2">
            {filteredDeliveryOrderLogistics.map(
              (deliveryOrderLogistic, index) => (
                <Card
                  key={index}
                  className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
                >
                  {/* Header Row - SN and Status */}
                  <div className="grid grid-cols-2 items-center gap-2 mb-3">
                    {/* Left - Serial Number */}
                    {canViewSn && (
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {deliveryOrderLogistic.sn}
                      </div>
                    )}

                    {/* Right - Status */}
                    {canViewStatus && (
                      <div className="flex justify-end">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            deliveryOrderLogistic.status
                          )}`}
                        >
                          {deliveryOrderLogistic.status}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Company Name - Main Title */}
                  {canViewCompany && (
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate mb-3"
                      onClick={() => navigate(`/delivery-order-logistic/1`)}
                    >
                      {deliveryOrderLogistic.company}
                    </CardTitle>
                  )}

                  {/* Details Grid - 2 columns */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* Country */}
                    {canViewCountry && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Country
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {deliveryOrderLogistic.country}
                        </div>
                      </div>
                    )}

                    {/* Supplier Name */}
                    {canViewSupplierName && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Supplier
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {deliveryOrderLogistic.supplierName}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Invoice Details Grid - 2 columns */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* P.I. Number */}
                    {canViewPiNo && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          P.I. No
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {deliveryOrderLogistic.piNo}
                        </div>
                      </div>
                    )}

                    {/* Invoice Number */}
                    {canViewInvoiceNo && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Invoice No
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {deliveryOrderLogistic.invoiceNo}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row - Date and Actions */}
                  <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    {/* Date Login ID */}
                    {canViewDateLoginId && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Date Login
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {deliveryOrderLogistic.dateLoginId.toLocaleDateString()}
                        </div>
                      </div>
                    )}

                    {/* Middle - Action Icons */}
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Delete/Restore */}
                      <Tooltip
                        label={
                          deliveryOrderLogistic.isDeleted && canRestore
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
                          disabled={
                            deliveryOrderLogistic.isDeleted && !canRestore
                          }
                          className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            deliveryOrderLogistic.isDeleted
                              ? "text-blue-500"
                              : "text-red-500"
                          }`}
                          onClick={() => {
                            if (canRestore && deliveryOrderLogistic.isDeleted) {
                              handleRestoreClick(deliveryOrderLogistic.id);
                              toastRestore(
                                "Delivery order logistic record restored successfully"
                              );
                            } else {
                              if (canDelete) {
                                handleDeleteClick(deliveryOrderLogistic.id);
                                toastDelete(
                                  "Delivery order logistic record deleted successfully"
                                );
                              }
                            }
                          }}
                        >
                          {deliveryOrderLogistic.isDeleted && canRestore ? (
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
                            onClick={() =>
                              navigate(`/delivery-order-logistic/edit/1`)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="h-4 w-4"
                            />
                          </div>
                        </Tooltip>
                      )}
                    </div>

                    {/* Spacer for grid alignment */}
                    <div></div>
                  </div>
                </Card>
              )
            )}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">
                  Loading more delivery order logistic records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDeliveryOrderLogistics.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more delivery order logistic records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={deliveryOrderLogisticData}
                setFilteredData={setDeliveryOrderLogisticDataState}
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
                data={deliveryOrderLogisticData}
                setFilteredData={setDeliveryOrderLogisticDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
