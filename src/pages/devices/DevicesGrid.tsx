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
const devicesData = [
  {
    id: "1",
    deviceCode: "DEV001",
    name: "HP LaserJet Pro",
    serialNo: "HP123456789",
    customer: "ABC Corporation",
    model: "M404dn",
    productionDate: new Date("2023-01-15"),
    purchaseDate: new Date("2023-02-01"),
    warrantyStartingDate: new Date("2023-02-01"),
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: new Date("2025-02-01"),
    warrantyExpiringAlert: true,
    description: "High-performance laser printer for office use",
    image: "/device-images/hp-printer.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-01-15"),
    draftedAt: null,
    updatedAt: new Date("2023-01-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    deviceCode: "DEV002",
    name: "Dell OptiPlex Desktop",
    serialNo: "DELL987654321",
    customer: "XYZ Solutions",
    model: "7090 MT",
    productionDate: new Date("2023-03-10"),
    purchaseDate: new Date("2023-03-15"),
    warrantyStartingDate: new Date("2023-03-15"),
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: new Date("2026-03-15"),
    warrantyExpiringAlert: false,
    description: "Business desktop computer with Intel i7 processor",
    image: "/device-images/dell-desktop.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-03-10"),
    draftedAt: null,
    updatedAt: new Date("2023-03-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    deviceCode: "DEV003",
    name: "Cisco Router",
    serialNo: "CISCO555666777",
    customer: "Tech Innovations Ltd",
    model: "ISR 4331",
    productionDate: new Date("2023-05-20"),
    purchaseDate: new Date("2023-06-01"),
    warrantyStartingDate: new Date("2023-06-01"),
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: new Date("2024-06-01"),
    warrantyExpiringAlert: true,
    description: "Enterprise-grade router for network infrastructure",
    image: "/device-images/cisco-router.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-05-20"),
    draftedAt: null,
    updatedAt: new Date("2023-05-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    deviceCode: "DEV004",
    name: "Samsung Monitor",
    serialNo: "SAM111222333",
    customer: "Creative Agency",
    model: "27CF391",
    productionDate: new Date("2023-07-10"),
    purchaseDate: new Date("2023-07-15"),
    warrantyStartingDate: new Date("2023-07-15"),
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: new Date("2025-07-15"),
    warrantyExpiringAlert: false,
    description: "27-inch curved monitor for design work",
    image: "/device-images/samsung-monitor.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-07-10"),
    draftedAt: null,
    updatedAt: new Date("2023-07-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    deviceCode: "DEV005",
    name: "Lenovo ThinkPad",
    serialNo: "LEN444555666",
    customer: "Consulting Group",
    model: "X1 Carbon",
    productionDate: new Date("2023-09-05"),
    purchaseDate: new Date("2023-09-10"),
    warrantyStartingDate: new Date("2023-09-10"),
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: new Date("2026-09-10"),
    warrantyExpiringAlert: false,
    description: "Ultra-lightweight business laptop",
    image: "/device-images/lenovo-laptop.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-09-05"),
    draftedAt: null,
    updatedAt: new Date("2023-09-07"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    deviceCode: "DEV006",
    name: "Canon Multifunction Printer",
    serialNo: "CAN777888999",
    customer: "Marketing Solutions",
    model: "imageRUNNER 2630i",
    productionDate: new Date("2023-11-15"),
    purchaseDate: new Date("2023-11-20"),
    warrantyStartingDate: new Date("2023-11-20"),
    warrantyPeriodMonths: 18,
    warrantyExpiryDate: new Date("2025-05-20"),
    warrantyExpiringAlert: true,
    description: "All-in-one printer with scanning and copying",
    image: "/device-images/canon-printer.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2023-11-15"),
    draftedAt: null,
    updatedAt: new Date("2023-11-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    deviceCode: "DEV007",
    name: "Apple iMac",
    serialNo: "APPLE123789456",
    customer: "Design Studio",
    model: "24-inch M1",
    productionDate: new Date("2024-01-10"),
    purchaseDate: new Date("2024-01-15"),
    warrantyStartingDate: new Date("2024-01-15"),
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: new Date("2025-01-15"),
    warrantyExpiringAlert: false,
    description: "All-in-one desktop for creative professionals",
    image: "/device-images/apple-imac.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-01-10"),
    draftedAt: null,
    updatedAt: new Date("2024-01-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    deviceCode: "DEV008",
    name: "Microsoft Surface Pro",
    serialNo: "MS987321654",
    customer: "Consulting Firm",
    model: "Surface Pro 9",
    productionDate: new Date("2024-02-20"),
    purchaseDate: new Date("2024-02-25"),
    warrantyStartingDate: new Date("2024-02-25"),
    warrantyPeriodMonths: 24,
    warrantyExpiryDate: new Date("2026-02-25"),
    warrantyExpiringAlert: false,
    description: "2-in-1 tablet and laptop for mobility",
    image: "/device-images/surface-pro.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-02-20"),
    draftedAt: null,
    updatedAt: new Date("2024-02-22"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    deviceCode: "DEV009",
    name: "Epson Projector",
    serialNo: "EPS654987321",
    customer: "Training Center",
    model: "PowerLite 2247U",
    productionDate: new Date("2024-03-05"),
    purchaseDate: new Date("2024-03-10"),
    warrantyStartingDate: new Date("2024-03-10"),
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: new Date("2027-03-10"),
    warrantyExpiringAlert: false,
    description: "High-brightness projector for presentations",
    image: "/device-images/epson-projector.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-03-05"),
    draftedAt: null,
    updatedAt: new Date("2024-03-07"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    deviceCode: "DEV010",
    name: "Netgear Switch",
    serialNo: "NET147258369",
    customer: "IT Services Co",
    model: "GS724T",
    productionDate: new Date("2024-04-12"),
    purchaseDate: new Date("2024-04-15"),
    warrantyStartingDate: new Date("2024-04-15"),
    warrantyPeriodMonths: 60,
    warrantyExpiryDate: new Date("2029-04-15"),
    warrantyExpiringAlert: false,
    description: "24-port managed Gigabit switch",
    image: "/device-images/netgear-switch.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-04-12"),
    draftedAt: null,
    updatedAt: new Date("2024-04-14"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    deviceCode: "DEV011",
    name: "Brother Label Printer",
    serialNo: "BRO369258147",
    customer: "Warehouse Solutions",
    model: "QL-820NWB",
    productionDate: new Date("2024-05-18"),
    purchaseDate: new Date("2024-05-20"),
    warrantyStartingDate: new Date("2024-05-20"),
    warrantyPeriodMonths: 12,
    warrantyExpiryDate: new Date("2025-05-20"),
    warrantyExpiringAlert: true,
    description: "Professional label printer with wireless connectivity",
    image: "/device-images/brother-printer.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-05-18"),
    draftedAt: null,
    updatedAt: new Date("2024-05-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    deviceCode: "DEV012",
    name: "ASUS Gaming Monitor",
    serialNo: "ASUS852741963",
    customer: "Gaming Cafe",
    model: "ROG Swift PG279Q",
    productionDate: new Date("2024-06-25"),
    purchaseDate: new Date("2024-06-30"),
    warrantyStartingDate: new Date("2024-06-30"),
    warrantyPeriodMonths: 36,
    warrantyExpiryDate: new Date("2027-06-30"),
    warrantyExpiringAlert: false,
    description: "27-inch gaming monitor with 165Hz refresh rate",
    image: "/device-images/asus-monitor.jpg",
    isActive: true,
    isDraft: false,
    createdAt: new Date("2024-06-25"),
    draftedAt: null,
    updatedAt: new Date("2024-06-27"),
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

export default function DevicesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Devices grid rendered");

  const navigate = useNavigate();

  const [devicesDataState, setDevicesDataState] = useState(devicesData);
  const canDelete: boolean = usePermission("devices", "delete");
  const canRestore: boolean = usePermission("devices", "restore");
  const canEdit: boolean = usePermission("devices", "edit");

  // Debug permissions
  console.log("Devices Permissions:", {
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

    const deviceTypes = [
      "Printer",
      "Desktop Computer",
      "Laptop",
      "Monitor",
      "Router",
      "Switch",
      "Projector",
      "Scanner",
    ];

    const customers = [
      "ABC Corporation",
      "XYZ Solutions",
      "Tech Innovations Ltd",
      "Creative Agency",
      "Consulting Group",
      "Marketing Solutions",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      deviceCode: `DEV${String(Date.now() + index).slice(-3)}`,
      name: `${
        deviceTypes[Math.floor(Math.random() * deviceTypes.length)]
      } Device`,
      serialNo: `SN${Math.floor(Math.random() * 900000000) + 100000000}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      model: `Model-${Math.floor(Math.random() * 9000) + 1000}`,
      productionDate: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ),
      purchaseDate: new Date(
        Date.now() - Math.random() * 300 * 24 * 60 * 60 * 1000
      ),
      warrantyStartingDate: new Date(
        Date.now() - Math.random() * 300 * 24 * 60 * 60 * 1000
      ),
      warrantyPeriodMonths: [12, 24, 36, 48, 60][Math.floor(Math.random() * 5)],
      warrantyExpiryDate: new Date(
        Date.now() + Math.random() * 730 * 24 * 60 * 60 * 1000
      ),
      warrantyExpiringAlert: Math.random() > 0.7,
      description: "Sample device description",
      image: "/device-images/sample-device.jpg",
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (devicesDataState.length >= 46) {
      setHasMore(false);
    } else {
      setDevicesDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [devicesDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (deviceId: string) => {
    setDevicesDataState((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              isDeleted: device.isDeleted === true ? false : true,
            }
          : device
      )
    );
  };

  const handleRestoreClick = (deviceId: string) => {
    setDevicesDataState((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              isDeleted: device.isDeleted === true ? false : true,
            }
          : device
      )
    );
  };

  // Filter devices based on search query
  const filteredDevices = devicesDataState.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.deviceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.serialNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {devicesData.length} devices
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
            {filteredDevices.map((device, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/devices/1`)}
                  >
                    {device.name}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        device.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {device.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Device Code | Actions | Customer */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Device Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Device Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {device.deviceCode}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        device.isDeleted && canRestore
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
                        disabled={device.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          device.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && device.isDeleted) {
                            handleRestoreClick(device.id);
                            toastRestore("Device restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(device.id);
                              toastDelete("Device deleted successfully");
                            }
                          }
                        }}
                      >
                        {device.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/devices/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Customer - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {device.customer}
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
                <span className="text-sm">Loading more devices...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDevices.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more devices to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={devicesData}
                setFilteredData={setDevicesDataState}
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
                data={devicesData}
                setFilteredData={setDevicesDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
