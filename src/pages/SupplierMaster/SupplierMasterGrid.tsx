import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
// import { id } from "date-fns/locale";

// Mock data - replace with real data from your API
const MokData = [
  {
    id: 1,
    supplierName: "Dhaka Global Express Ltd.",
    contactPerson: "Mr. Rahim Uddin",
    status: "active",
    isDeleted: false,
  },
  {
    id: 2,
    supplierName: "Maple Freight Canada Inc.",
    contactPerson: "Emily Johnson",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: 3,
    supplierName: "American Cargo Solutions LLC",
    contactPerson: "Michael Smith",
    status: "draft",
    isDeleted: false,
  },
  {
    id: 4,
    supplierName: "Britannia Shipping Services",
    contactPerson: "James Brown",
    status: "active",
    isDeleted: false,
  },
  {
    id: 5,
    supplierName: "Deutsche Transport GmbH",
    contactPerson: "Hans Müller",
    status: "active",
    isDeleted: false,
  },
  {
    id: 6,
    supplierName: "Paris Logistics & Freight SARL",
    contactPerson: "Sophie Laurent",
    status: "active",
    isDeleted: false,
  },
  {
    id: 7,
    supplierName: "Aussie Cargo Express Pty Ltd.",
    contactPerson: "Oliver Wilson",
    status: "active",
    isDeleted: false,
  },
  {
    id: 8,
    supplierName: "CapeTown Transporters (Pty) Ltd.",
    contactPerson: "Thabo Nkosi",
    status: "active",
    isDeleted: false,
  },
  {
    id: 9,
    supplierName: "Brasil Freight & Cargo SA",
    contactPerson: "Carlos Silva",
    status: "active",
    isDeleted: false,
  },
  {
    id: 10,
    supplierName: "Buenos Aires Cargo Lines SA",
    contactPerson: "Diego Fernández",
    status: "active",
    isDeleted: false,
  },
  {
    id: 11,
    supplierName: "MexiTrans Logistics SA de CV",
    contactPerson: "Luis Martinez",
    status: "active",
    isDeleted: false,
  },
  {
    id: 12,
    supplierName: "Bharat Cargo Movers Pvt. Ltd.",
    contactPerson: "Amit Sharma",
    status: "active",
    isDeleted: false,
  },
  {
    id: 13,
    supplierName: "Dragon Express Shipping Co. Ltd.",
    contactPerson: "Li Wei",
    status: "active",
    isDeleted: false,
  },
  {
    id: 14,
    supplierName: "Nippon Freight Corporation",
    contactPerson: "Hiroshi Tanaka",
    status: "active",
    isDeleted: false,
  },
  {
    id: 15,
    supplierName: "Moscow Cargo Services JSC",
    contactPerson: "Ivan Petrov",
    status: "active",
    isDeleted: false,
  },
  {
    id: 16,
    supplierName: "Seoul Transport & Logistics Ltd.",
    contactPerson: "Kim Min-Jun",
    status: "active",
    isDeleted: false,
  },
  {
    id: 17,
    supplierName: "Ankara Freight & Shipping AS",
    contactPerson: "Mehmet Kaya",
    status: "active",
    isDeleted: false,
  },
  {
    id: 18,
    supplierName: "Riyadh Cargo & Logistics Co.",
    contactPerson: "Abdullah Al-Saud",
    status: "active",
    isDeleted: false,
  },
  {
    id: 19,
    supplierName: "Cairo Logistics & Transport SAE",
    contactPerson: "Omar Hassan",
    status: "active",
    isDeleted: false,
  },
  {
    id: 20,
    supplierName: "Lagos Transport Express Ltd.",
    contactPerson: "Chinedu Okafor",
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
};

export default function SupplierMasterGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("Countries grid rendered");

  const navigate = useNavigate();

  const [holiday, setHoliday] = useState(MokData);
  const canDelete: boolean = usePermission("supplierMaster", "delete");
  const canRestore: boolean = usePermission("supplierMaster", "restore");
  const canEdit: boolean = usePermission("supplierMaster", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: holiday.length + index + 1,

      supplierName: `Transporter ${holiday.length + index + 1}`,
      contactPerson: "2022-01-01",
      endDate: "2023-01-01",
      status: ["active", "inactive", "draft"][Math.floor(Math.random() * 3)],
      isDeleted: false,
    }));

    if (holiday.length >= 50) {
      setHasMore(false);
    } else {
      setHoliday((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [holiday.length, isLoading, hasMore]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100;

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDeleteClick = (id: number | string) => {
    setHoliday((prevHoliday) =>
      prevHoliday.map((holiday) =>
        holiday.id === id
          ? { ...holiday, isDeleted: !holiday.isDeleted }
          : holiday
      )
    );
  };

  const handleRestoreClick = (id: number | string) => {
    setHoliday((prevHoliday) =>
      prevHoliday.map((holiday) =>
        holiday.id === id ? { ...holiday, isDeleted: false } : holiday
      )
    );
  };

  const filteredHoliday = holiday.filter(
    (rent) =>
      rent.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.status.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {filteredHoliday?.length} Suppliers Master
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
            {filteredHoliday.map((rent, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/supplier-master/1`)}
                  >
                    {rent.supplierName}
                  </CardTitle>

                  <div className="flex items-center justify-end">
                    <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize bg-purple-200 text-purple-800">
                      {rent.id}
                    </div>
                  </div>
                </div>

                {/* Middle Row */}

                {/* <CardDescription>{rent.contactPerson}</CardDescription> */}

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <CardDescription>{rent.contactPerson}</CardDescription>
                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        rent.isDeleted && canRestore
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
                        disabled={rent.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          rent.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && rent.isDeleted) {
                            handleRestoreClick(rent.id);
                            toastRestore("Holiday restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(rent.id);
                              toastDelete("Holiday deleted successfully");
                            }
                          }
                        }}
                      >
                        {rent.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/supplier-master/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Right - stats section */}
                  <div className="flex justify-end">
                    <div
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize",
                        {
                          "bg-green-100 text-green-800":
                            rent.status === "active",
                          "bg-yellow-100 text-yellow-800":
                            rent.status === "draft",
                          "bg-red-100 text-red-800": rent.status === "inactive",
                          "bg-gray-200 text-gray-800": ![
                            "active",
                            "draft",
                            "inactive",
                          ].includes(rent.status),
                        }
                      )}
                    >
                      {rent.status}
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
                <span className="text-sm">Loading more countries...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredHoliday.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more countries to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={holiday}
                setFilteredData={setHoliday}
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
                data={holiday}
                setFilteredData={setHoliday}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
