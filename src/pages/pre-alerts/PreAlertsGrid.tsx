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
const preAlertsData = [
  {
    id: "1",
    tracking: "TRK-2024-001",
    date: new Date("2024-01-15"),
    customer: "Tech Solutions Inc",
    shippingCompany: "FedEx Express",
    supplier: "Microsoft Store",
    packageDescription: "Microsoft Office 365 License Keys",
    deliveryDate: new Date("2024-01-20"),
    purchasePrice: 2500.0,
    status: "In Transit",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    tracking: "TRK-2024-002",
    date: new Date("2024-01-16"),
    customer: "Creative Design Studio",
    shippingCompany: "UPS Ground",
    supplier: "Adobe Store",
    packageDescription: "Adobe Creative Suite Licenses",
    deliveryDate: new Date("2024-01-22"),
    purchasePrice: 1800.0,
    status: "Delivered",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "3",
    tracking: "TRK-2024-003",
    date: new Date("2024-01-17"),
    customer: "Engineering Corp",
    shippingCompany: "DHL Express",
    supplier: "Autodesk Store",
    packageDescription: "AutoCAD Professional Licenses",
    deliveryDate: new Date("2024-01-25"),
    purchasePrice: 3200.0,
    status: "In Transit",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "4",
    tracking: "TRK-2024-004",
    date: new Date("2024-01-18"),
    customer: "Finance Corp",
    shippingCompany: "USPS Priority",
    supplier: "Intuit Store",
    packageDescription: "QuickBooks Enterprise Licenses",
    deliveryDate: new Date("2024-01-23"),
    purchasePrice: 1500.0,
    status: "Delivered",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    tracking: "TRK-2024-005",
    date: new Date("2024-01-19"),
    customer: "IT Solutions",
    shippingCompany: "FedEx Ground",
    supplier: "VMware Store",
    packageDescription: "VMware Workstation Pro Licenses",
    deliveryDate: new Date("2024-01-26"),
    purchasePrice: 1200.0,
    status: "Pending",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "6",
    tracking: "TRK-2024-006",
    date: new Date("2024-01-20"),
    customer: "Data Analytics Corp",
    shippingCompany: "UPS Express",
    supplier: "Tableau Store",
    packageDescription: "Tableau Desktop Licenses",
    deliveryDate: new Date("2024-01-27"),
    purchasePrice: 2100.0,
    status: "In Transit",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "7",
    tracking: "TRK-2024-007",
    date: new Date("2024-01-21"),
    customer: "Manufacturing Inc",
    shippingCompany: "DHL Ground",
    supplier: "SolidWorks Store",
    packageDescription: "SolidWorks Premium Licenses",
    deliveryDate: new Date("2024-01-28"),
    purchasePrice: 4500.0,
    status: "Pending",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "8",
    tracking: "TRK-2024-008",
    date: new Date("2024-01-22"),
    customer: "Enterprise Corp",
    shippingCompany: "FedEx Express",
    supplier: "SAP Store",
    packageDescription: "SAP Business One Licenses",
    deliveryDate: new Date("2024-01-29"),
    purchasePrice: 8500.0,
    status: "In Transit",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "9",
    tracking: "TRK-2024-009",
    date: new Date("2024-01-23"),
    customer: "Software Dev Inc",
    shippingCompany: "UPS Ground",
    supplier: "GitHub Store",
    packageDescription: "GitHub Enterprise Licenses",
    deliveryDate: new Date("2024-01-30"),
    purchasePrice: 2800.0,
    status: "Delivered",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "10",
    tracking: "TRK-2024-010",
    date: new Date("2024-01-24"),
    customer: "Network Security Corp",
    shippingCompany: "DHL Express",
    supplier: "Cisco Store",
    packageDescription: "Cisco AnyConnect Licenses",
    deliveryDate: new Date("2024-01-31"),
    purchasePrice: 1800.0,
    status: "In Transit",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-31"),
  },
  {
    id: "11",
    tracking: "TRK-2024-011",
    date: new Date("2024-01-25"),
    customer: "Communication Corp",
    shippingCompany: "USPS Priority",
    supplier: "Slack Store",
    packageDescription: "Slack Enterprise Licenses",
    deliveryDate: new Date("2024-02-01"),
    purchasePrice: 1200.0,
    status: "Pending",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "12",
    tracking: "TRK-2024-012",
    date: new Date("2024-01-26"),
    customer: "Project Management Inc",
    shippingCompany: "FedEx Ground",
    supplier: "Atlassian Store",
    packageDescription: "Jira Software Licenses",
    deliveryDate: new Date("2024-02-02"),
    purchasePrice: 1600.0,
    status: "In Transit",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-02-02"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function PreAlertsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Pre-alerts grid rendered");

  const navigate = useNavigate();

  const [preAlertsDataState, setPreAlertsDataState] = useState(preAlertsData);
  const canDelete: boolean = usePermission("preAlerts", "delete");
  const canRestore: boolean = usePermission("preAlerts", "restore");
  const canEdit: boolean = usePermission("preAlerts", "edit");

  // Debug permissions
  console.log("Pre-alerts Permissions:", {
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

    const statuses = ["In Transit", "Delivered", "Pending"];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      tracking: `TRK-${Date.now()}-${index + 1}`,
      date: new Date(),
      customer: "New Company Inc",
      shippingCompany: "FedEx Express",
      supplier: "Software Store",
      packageDescription: "Software License Keys",
      deliveryDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
      purchasePrice: Math.floor(Math.random() * 5000) + 500,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (preAlertsDataState.length >= 46) {
      setHasMore(false);
    } else {
      setPreAlertsDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [preAlertsDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (preAlertId: string) => {
    setPreAlertsDataState((prevPreAlerts) =>
      prevPreAlerts.map((preAlert) =>
        preAlert.id === preAlertId
          ? {
              ...preAlert,
              isDeleted: preAlert.isDeleted === true ? false : true,
            }
          : preAlert
      )
    );
  };

  const handleRestoreClick = (preAlertId: string) => {
    setPreAlertsDataState((prevPreAlerts) =>
      prevPreAlerts.map((preAlert) =>
        preAlert.id === preAlertId
          ? {
              ...preAlert,
              isDeleted: preAlert.isDeleted === true ? false : true,
            }
          : preAlert
      )
    );
  };

  // Filter pre-alert records based on search query
  const filteredPreAlerts = preAlertsDataState.filter(
    (preAlert) =>
      preAlert.tracking.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preAlert.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preAlert.shippingCompany
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      preAlert.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preAlert.packageDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      preAlert.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
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
          Total {preAlertsData.length} pre-alert records
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
            {filteredPreAlerts.map((preAlert, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/pre-alerts/1`)}
                  >
                    {preAlert.tracking}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end gap-2">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        preAlert.status
                      )}`}
                    >
                      {preAlert.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Customer | Actions | Delivery Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Customer */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Customer
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {preAlert.customer}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        preAlert.isDeleted && canRestore
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
                        disabled={preAlert.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          preAlert.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && preAlert.isDeleted) {
                            handleRestoreClick(preAlert.id);
                            toastRestore("Pre-alert restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(preAlert.id);
                              toastDelete("Pre-alert deleted successfully");
                            }
                          }
                        }}
                      >
                        {preAlert.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/pre-alerts/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Delivery Date */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Delivery Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {preAlert.deliveryDate.toLocaleDateString()}
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
                <span className="text-sm">Loading more pre-alerts...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredPreAlerts.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more pre-alerts to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={preAlertsData}
                setFilteredData={setPreAlertsDataState}
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
                data={preAlertsData}
                setFilteredData={setPreAlertsDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
