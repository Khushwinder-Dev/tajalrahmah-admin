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

// Mock data for maintenances - replace with real data from your API
const maintenanceData = [
  {
    id: "1",
    vehicle: "Toyota Camry 2023",
    garage: "Al-Rashid Auto Service",
    maintenanceType: "Preventive",
    serviceName: "Oil Change & Filter",
    startDate: new Date("2024-02-15"),
    completionDate: new Date("2024-02-15"),
    parts: "Oil Filter, Engine Oil",
    cost: 150.0,
    description: "Regular oil change and filter replacement",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-15"),
    draftedAt: null,
    updatedAt: new Date("2024-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    vehicle: "Ford Transit Van",
    garage: "Quick Fix Garage",
    maintenanceType: "Repair",
    serviceName: "Brake System Repair",
    startDate: new Date("2024-02-10"),
    completionDate: new Date("2024-02-12"),
    parts: "Brake Pads, Brake Fluid",
    cost: 320.0,
    description: "Replaced worn brake pads and flushed brake fluid",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-16"),
    draftedAt: null,
    updatedAt: new Date("2024-01-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    vehicle: "Honda Civic 2022",
    garage: "Premium Auto Care",
    maintenanceType: "Inspection",
    serviceName: "Annual Safety Inspection",
    startDate: new Date("2024-02-20"),
    completionDate: new Date("2024-02-20"),
    parts: "N/A",
    cost: 80.0,
    description: "Comprehensive vehicle safety inspection",
    isActive: false,
    isDraft: false,
    createdAt: new Date("2024-01-17"),
    draftedAt: null,
    updatedAt: new Date("2024-01-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    vehicle: "Mercedes Sprinter",
    garage: "Luxury Auto Service",
    maintenanceType: "Preventive",
    serviceName: "Tire Rotation & Balance",
    startDate: new Date("2024-02-25"),
    completionDate: new Date("2024-02-25"),
    parts: "Tire Balance Weights",
    cost: 95.0,
    description: "Tire rotation and balancing service",
    isActive: true,
    isDraft: true,
    createdAt: new Date("2024-01-18"),
    draftedAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    vehicle: "Nissan Patrol",
    garage: "Desert Auto Works",
    maintenanceType: "Repair",
    serviceName: "AC System Repair",
    startDate: new Date("2024-02-28"),
    completionDate: new Date("2024-03-01"),
    parts: "AC Compressor, Refrigerant",
    cost: 450.0,
    description: "Fixed AC compressor and recharged system",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-19"),
    draftedAt: null,
    updatedAt: new Date("2024-01-24"),
    deletedAt: new Date("2024-02-01"),
    isDeleted: true,
  },
  {
    id: "6",
    vehicle: "Toyota Hilux",
    garage: "Off-Road Specialists",
    maintenanceType: "Preventive",
    serviceName: "Suspension Check",
    startDate: new Date("2024-03-01"),
    completionDate: new Date("2024-03-01"),
    parts: "N/A",
    cost: 120.0,
    description: "Comprehensive suspension system inspection",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-20"),
    draftedAt: null,
    updatedAt: new Date("2024-01-25"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    vehicle: "Ford Ranger",
    garage: "City Auto Service",
    maintenanceType: "Repair",
    serviceName: "Electrical System Fix",
    startDate: new Date("2024-03-05"),
    completionDate: new Date("2024-03-06"),
    parts: "Battery, Alternator",
    cost: 280.0,
    description: "Replaced faulty battery and alternator",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-21"),
    draftedAt: null,
    updatedAt: new Date("2024-01-26"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    vehicle: "Chevrolet Silverado",
    garage: "American Auto Care",
    maintenanceType: "Preventive",
    serviceName: "Transmission Service",
    startDate: new Date("2024-03-10"),
    completionDate: new Date("2024-03-10"),
    parts: "Transmission Fluid, Filter",
    cost: 180.0,
    description: "Transmission fluid change and filter replacement",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-22"),
    draftedAt: null,
    updatedAt: new Date("2024-01-27"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    vehicle: "Volkswagen Golf",
    garage: "European Auto Service",
    maintenanceType: "Inspection",
    serviceName: "Emission Test",
    startDate: new Date("2024-03-15"),
    completionDate: new Date("2024-03-15"),
    parts: "N/A",
    cost: 65.0,
    description: "Annual emission compliance testing",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-23"),
    draftedAt: null,
    updatedAt: new Date("2024-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    vehicle: "Hyundai Tucson",
    garage: "Korean Auto Care",
    maintenanceType: "Repair",
    serviceName: "Wheel Alignment",
    startDate: new Date("2024-03-20"),
    completionDate: new Date("2024-03-20"),
    parts: "N/A",
    cost: 75.0,
    description: "Four-wheel alignment service",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-24"),
    draftedAt: null,
    updatedAt: new Date("2024-01-29"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    vehicle: "BMW X5",
    garage: "Premium German Auto",
    maintenanceType: "Preventive",
    serviceName: "Spark Plug Replacement",
    startDate: new Date("2024-03-25"),
    completionDate: new Date("2024-03-25"),
    parts: "Spark Plugs, Ignition Coils",
    cost: 220.0,
    description: "Replaced all spark plugs and ignition coils",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-25"),
    draftedAt: null,
    updatedAt: new Date("2024-01-30"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    vehicle: "Audi A6",
    garage: "Luxury European Auto",
    maintenanceType: "Repair",
    serviceName: "Fuel Pump Replacement",
    startDate: new Date("2024-03-30"),
    completionDate: new Date("2024-03-31"),
    parts: "Fuel Pump, Fuel Filter",
    cost: 380.0,
    description: "Replaced faulty fuel pump and filter",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-26"),
    draftedAt: null,
    updatedAt: new Date("2024-01-31"),
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

export default function MaintenancesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Maintenances grid rendered");

  const navigate = useNavigate();

  const [maintenanceDataState, setMaintenanceDataState] =
    useState(maintenanceData);
  const canDelete: boolean = usePermission("maintenance", "delete");
  const canRestore: boolean = usePermission("maintenance", "restore");
  const canEdit: boolean = usePermission("maintenance", "edit");

  // Debug permissions
  console.log("Maintenance Permissions:", {
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

    const vehicles = [
      "Toyota Camry 2023",
      "Ford Transit Van",
      "Honda Civic 2022",
      "Mercedes Sprinter",
      "Nissan Patrol",
      "Ford Ranger",
      "Chevrolet Silverado",
      "Volkswagen Golf",
      "Hyundai Tucson",
      "BMW X5",
      "Audi A6",
    ];
    const garages = [
      "Al-Rashid Auto Service",
      "Quick Fix Garage",
      "Premium Auto Care",
      "Luxury Auto Service",
      "Desert Auto Works",
      "Off-Road Specialists",
      "City Auto Service",
      "American Auto Care",
      "European Auto Service",
      "Korean Auto Care",
      "Premium German Auto",
      "Luxury European Auto",
    ];
    const maintenanceTypes = ["Preventive", "Repair", "Inspection"];
    const serviceNames = [
      "Oil Change & Filter",
      "Brake System Repair",
      "Annual Safety Inspection",
      "Tire Rotation & Balance",
      "AC System Repair",
      "Suspension Check",
      "Electrical System Fix",
      "Transmission Service",
      "Emission Test",
      "Wheel Alignment",
      "Spark Plug Replacement",
      "Fuel Pump Replacement",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
      garage: garages[Math.floor(Math.random() * garages.length)],
      maintenanceType:
        maintenanceTypes[Math.floor(Math.random() * maintenanceTypes.length)],
      serviceName:
        serviceNames[Math.floor(Math.random() * serviceNames.length)],
      startDate: new Date(),
      completionDate: new Date(),
      parts: "Sample parts for maintenance",
      cost: Math.floor(Math.random() * 500) + 50,
      description: "Sample maintenance description",
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (maintenanceDataState.length >= 46) {
      setHasMore(false);
    } else {
      setMaintenanceDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [maintenanceDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (maintenanceId: string) => {
    setMaintenanceDataState((prevMaintenances) =>
      prevMaintenances.map((maintenance) =>
        maintenance.id === maintenanceId
          ? {
              ...maintenance,
              isDeleted: maintenance.isDeleted === true ? false : true,
            }
          : maintenance
      )
    );
  };

  const handleRestoreClick = (maintenanceId: string) => {
    setMaintenanceDataState((prevMaintenances) =>
      prevMaintenances.map((maintenance) =>
        maintenance.id === maintenanceId
          ? {
              ...maintenance,
              isDeleted: maintenance.isDeleted === true ? false : true,
            }
          : maintenance
      )
    );
  };

  // Filter maintenances based on search query
  const filteredMaintenances = maintenanceDataState.filter(
    (maintenance) =>
      maintenance.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintenance.garage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintenance.maintenanceType
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      maintenance.serviceName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      maintenance.parts.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintenance.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Total {maintenanceData.length} maintenance records
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
            {filteredMaintenances.map((maintenance, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/maintenances/1`)}
                  >
                    {maintenance.maintenanceType}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        maintenance.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {maintenance.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Subject | Actions | Description */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Vehicle - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Vehicle
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {maintenance.vehicle}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        maintenance.isDeleted && canRestore
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
                        disabled={maintenance.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          maintenance.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && maintenance.isDeleted) {
                            handleRestoreClick(maintenance.id);
                            toastRestore(
                              "Maintenance record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(maintenance.id);
                              toastDelete(
                                "Maintenance record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {maintenance.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/maintenances/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Service Name - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Service
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {maintenance.serviceName}
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
                  Loading more maintenance records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredMaintenances.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more maintenance records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={maintenanceData}
                setFilteredData={setMaintenanceDataState}
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
                data={maintenanceData}
                setFilteredData={setMaintenanceDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
