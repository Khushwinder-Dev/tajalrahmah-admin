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

type ArrivalPortDataType = {
  id: string;
  country: string;
  company: string;
  containerNo: string;
  arrivalDate: string;
  validityTill: string;
  status: string;
  date: string;
  loginId: string;

  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const arrivalPortData: ArrivalPortDataType[] = [
  {
    id: "1",
    country: "Saudi Arabia",
    company: "Al-Rashid Trading Company",
    containerNo: "C123456",
    arrivalDate: "2024-01-15",
    validityTill: "2024-01-20",
    status: "Active",
    date: "2024-01-15",
    loginId: "admin",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    country: "United Arab Emirates",
    company: "Dubai Logistics LLC",
    containerNo: "C654321",
    arrivalDate: "2024-02-05",
    validityTill: "2024-02-12",
    status: "Inactive",
    date: "2024-02-05",
    loginId: "manager",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-12"),
  },
  {
    id: "3",
    country: "Bangladesh",
    company: "Chittagong Shipping Lines",
    containerNo: "C987654",
    arrivalDate: "2024-03-10",
    validityTill: "2024-03-15",
    status: "Active",
    date: "2024-03-10",
    loginId: "sabbir",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "4",
    country: "India",
    company: "Mumbai Exports Pvt Ltd",
    containerNo: "C456789",
    arrivalDate: "2024-04-02",
    validityTill: "2024-04-08",
    status: "Draft",
    date: "2024-04-02",
    loginId: "operator",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-04-02"),
    updatedAt: new Date("2024-04-08"),
  },
  {
    id: "5",
    country: "China",
    company: "Shanghai Cargo Co.",
    containerNo: "C112233",
    arrivalDate: "2024-05-20",
    validityTill: "2024-05-28",
    status: "Active",
    date: "2024-05-20",
    loginId: "admin",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-05-20"),
    updatedAt: new Date("2024-05-28"),
  },
  {
    id: "6",
    country: "USA",
    company: "New York Freight Corp",
    containerNo: "C445566",
    arrivalDate: "2024-06-11",
    validityTill: "2024-06-18",
    status: "Deleted",
    date: "2024-06-11",
    loginId: "john",
    isActive: false,
    isDeleted: true,
    createdAt: new Date("2024-06-11"),
    updatedAt: new Date("2024-06-18"),
  },
  {
    id: "7",
    country: "Germany",
    company: "Berlin Transport AG",
    containerNo: "C778899",
    arrivalDate: "2024-07-05",
    validityTill: "2024-07-12",
    status: "Updated",
    date: "2024-07-05",
    loginId: "manager",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-07-05"),
    updatedAt: new Date("2024-07-12"),
  },
  {
    id: "8",
    country: "UK",
    company: "London Shipping Ltd",
    containerNo: "C332211",
    arrivalDate: "2024-08-01",
    validityTill: "2024-08-07",
    status: "Active",
    date: "2024-08-01",
    loginId: "admin",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-07"),
  },
  {
    id: "9",
    country: "Singapore",
    company: "Singapore Marine Services",
    containerNo: "C998877",
    arrivalDate: "2024-09-09",
    validityTill: "2024-09-16",
    status: "Inactive",
    date: "2024-09-09",
    loginId: "user123",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-09-09"),
    updatedAt: new Date("2024-09-16"),
  },
  {
    id: "10",
    country: "Malaysia",
    company: "Kuala Lumpur Cargo Ltd",
    containerNo: "C221133",
    arrivalDate: "2024-10-12",
    validityTill: "2024-10-18",
    status: "Draft",
    date: "2024-10-12",
    loginId: "manager",
    isActive: false,
    isDeleted: false,
    createdAt: new Date("2024-10-12"),
    updatedAt: new Date("2024-10-18"),
  },
  {
    id: "11",
    country: "Qatar",
    company: "Doha Freight Solutions",
    containerNo: "C554433",
    arrivalDate: "2024-11-03",
    validityTill: "2024-11-09",
    status: "Active",
    date: "2024-11-03",
    loginId: "admin",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-11-03"),
    updatedAt: new Date("2024-11-09"),
  },
  {
    id: "12",
    country: "Oman",
    company: "Muscat Logistics LLC",
    containerNo: "C667788",
    arrivalDate: "2024-12-15",
    validityTill: "2024-12-22",
    status: "Updated",
    date: "2024-12-15",
    loginId: "operator",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-22"),
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ArrivalPortGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Purchase Order Logistic grid rendered");

  const navigate = useNavigate();

  const [arrivalPortDataState, setArrivalPortDataState] =
    useState(arrivalPortData);
  const canDelete: boolean = usePermission("arrivalPort", "delete");
  const canRestore: boolean = usePermission("arrivalPort", "restore");
  const canEdit: boolean = usePermission("arrivalPort", "edit");

  // Field-level permissions
  const fieldPermissions = usePermission<keyof ArrivalPortDataType>(
    "arrivalPort",
    "view",
    [
      "country",
      "company",
      "isActive",
      "isDeleted",
      "createdAt",
      "updatedAt",
      "loginId",
      "status",
      "date",
      "containerNo",
      "arrivalDate",
      "validityTill",
      "id",
    ]
  );

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

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (arrivalPortDataState.length >= 46) {
      setHasMore(false);
    } else {
      setArrivalPortDataState(
        (prev) => [...prev, ...newItems] as ArrivalPortDataType[]
      );
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [arrivalPortDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (arrivalPortId: string) => {
    setArrivalPortDataState((prevArrivalPorts) =>
      prevArrivalPorts.map((arrivalPort) =>
        arrivalPort.id === arrivalPortId
          ? {
              ...arrivalPort,
              isDeleted: arrivalPort.isDeleted === true ? false : true,
            }
          : arrivalPort
      )
    );
  };

  const handleRestoreClick = (arrivalPortId: string) => {
    setArrivalPortDataState((prevArrivalPorts) =>
      prevArrivalPorts.map((arrivalPort) =>
        arrivalPort.id === arrivalPortId
          ? {
              ...arrivalPort,
              isDeleted: arrivalPort.isDeleted === true ? false : true,
            }
          : arrivalPort
      )
    );
  };

  // Filter arrival port records based on search query
  const filteredArrivalPorts = arrivalPortDataState.filter((arrivalPort) => {
    const searchLower = searchQuery.toLowerCase();

    // Only search by fields user has permission to view
    const searchableFields = [];

    if (fieldPermissions.country) {
      searchableFields.push(
        arrivalPort.country.toLowerCase().includes(searchLower)
      );
    }

    if (fieldPermissions.company) {
      searchableFields.push(
        arrivalPort.company.toLowerCase().includes(searchLower)
      );
    }

    // If no fields are searchable, return false
    if (searchableFields.length === 0) {
      return false;
    }

    // Return true if any searchable field matches
    return searchableFields.some((field) => field);
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
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
          Total {arrivalPortDataState.length} arrival port records
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
            {filteredArrivalPorts.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  {fieldPermissions.company && (
                    <CardTitle
                      className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                      onClick={() => navigate(`/arrival-port/1`)}
                    >
                      {item.company}
                    </CardTitle>
                  )}

                  {/* Right - Status */}
                  {fieldPermissions.isActive && (
                    <div className="flex justify-end">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.isActive
                        )}`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row - Grid with 3 columns: Country | Actions | Created Date */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Country */}
                  {fieldPermissions.country && (
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                        Country
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {item.country}
                      </div>
                    </div>
                  )}

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
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
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore(
                              "Arrival port record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(
                                "Arrival port record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/arrival-port/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Created Date */}
                  {fieldPermissions.createdAt && (
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                        Created
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {item.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  )}
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
                  Loading more arrival port records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && arrivalPortData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more arrival port records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={arrivalPortData}
                setFilteredData={setArrivalPortDataState}
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
                data={arrivalPortData}
                setFilteredData={setArrivalPortDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
