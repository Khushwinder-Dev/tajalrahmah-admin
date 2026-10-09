import {
  Card,
  CardDescription,
  CardTitle,
  CartDateRange,
} from "@/components/ui/card";
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
const rentalData = [
  {
    id: 1,
    seg: "001",
    name: "Home Asset",
    number: "1234",
    agreementName: "Agreement 1",
    agreementType: "Lease",
    agreementDate: "2022-01-01",
    expireDate: "2023-01-01",
    installmentNo: 12,
    installmentAmount: 1000,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to the user's home.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 2,
    seg: "002",
    name: "Canada Asset",
    number: "2345",
    agreementName: "Agreement 2",
    agreementType: "Lease",
    agreementDate: "2022-02-01",
    expireDate: "2023-02-01",
    installmentNo: 12,
    installmentAmount: 1500,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Canada.",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: 3,
    seg: "003",
    name: "United States Asset",
    number: "3456",
    agreementName: "Agreement 3",
    agreementType: "Lease",
    agreementDate: "2022-03-01",
    expireDate: "2023-03-01",
    installmentNo: 12,
    installmentAmount: 2000,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to the United States.",
    status: "draft",
    isDeleted: false,
  },
  {
    id: 4,
    seg: "004",
    name: "United Kingdom Asset",
    number: "4567",
    agreementName: "Agreement 4",
    agreementType: "Lease",
    agreementDate: "2022-04-01",
    expireDate: "2023-04-01",
    installmentNo: 12,
    installmentAmount: 1300,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to the United Kingdom.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 5,
    seg: "005",
    name: "Germany Asset",
    number: "5678",
    agreementName: "Agreement 5",
    agreementType: "Lease",
    agreementDate: "2022-05-01",
    expireDate: "2023-05-01",
    installmentNo: 12,
    installmentAmount: 1400,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Germany.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 6,
    seg: "006",
    name: "France Asset",
    number: "6789",
    agreementName: "Agreement 6",
    agreementType: "Lease",
    agreementDate: "2022-06-01",
    expireDate: "2023-06-01",
    installmentNo: 12,
    installmentAmount: 1200,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to France.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 7,
    seg: "007",
    name: "Australia Asset",
    number: "7890",
    agreementName: "Agreement 7",
    agreementType: "Lease",
    agreementDate: "2022-07-01",
    expireDate: "2023-07-01",
    installmentNo: 12,
    installmentAmount: 1600,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Australia.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 8,
    seg: "008",
    name: "South Africa Asset",
    number: "8901",
    agreementName: "Agreement 8",
    agreementType: "Lease",
    agreementDate: "2022-08-01",
    expireDate: "2023-08-01",
    installmentNo: 12,
    installmentAmount: 1100,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to South Africa.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 9,
    seg: "009",
    name: "Brazil Asset",
    number: "9012",
    agreementName: "Agreement 9",
    agreementType: "Lease",
    agreementDate: "2022-09-01",
    expireDate: "2023-09-01",
    installmentNo: 12,
    installmentAmount: 1700,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Brazil.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 10,
    seg: "010",
    name: "Argentina Asset",
    number: "0123",
    agreementName: "Agreement 10",
    agreementType: "Lease",
    agreementDate: "2022-10-01",
    expireDate: "2023-10-01",
    installmentNo: 12,
    installmentAmount: 1800,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Argentina.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 11,
    seg: "011",
    name: "Mexico Asset",
    number: "1123",
    agreementName: "Agreement 11",
    agreementType: "Lease",
    agreementDate: "2022-11-01",
    expireDate: "2023-11-01",
    installmentNo: 12,
    installmentAmount: 1250,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Mexico.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 12,
    seg: "012",
    name: "India Asset",
    number: "1223",
    agreementName: "Agreement 12",
    agreementType: "Lease",
    agreementDate: "2022-12-01",
    expireDate: "2023-12-01",
    installmentNo: 12,
    installmentAmount: 1350,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to India.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 13,
    seg: "013",
    name: "China Asset",
    number: "1323",
    agreementName: "Agreement 13",
    agreementType: "Lease",
    agreementDate: "2023-01-01",
    expireDate: "2024-01-01",
    installmentNo: 12,
    installmentAmount: 1400,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to China.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 14,
    seg: "014",
    name: "Japan Asset",
    number: "1423",
    agreementName: "Agreement 14",
    agreementType: "Lease",
    agreementDate: "2023-02-01",
    expireDate: "2024-02-01",
    installmentNo: 12,
    installmentAmount: 1450,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Japan.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 15,
    seg: "015",
    name: "Russia Asset",
    number: "1523",
    agreementName: "Agreement 15",
    agreementType: "Lease",
    agreementDate: "2023-03-01",
    expireDate: "2024-03-01",
    installmentNo: 12,
    installmentAmount: 1500,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Russia.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 16,
    seg: "016",
    name: "South Korea Asset",
    number: "1623",
    agreementName: "Agreement 16",
    agreementType: "Lease",
    agreementDate: "2023-04-01",
    expireDate: "2024-04-01",
    installmentNo: 12,
    installmentAmount: 1550,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to South Korea.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 17,
    seg: "017",
    name: "Turkey Asset",
    number: "1723",
    agreementName: "Agreement 17",
    agreementType: "Lease",
    agreementDate: "2023-05-01",
    expireDate: "2024-05-01",
    installmentNo: 12,
    installmentAmount: 1600,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Turkey.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 18,
    seg: "018",
    name: "Saudi Arabia Asset",
    number: "1823",
    agreementName: "Agreement 18",
    agreementType: "Lease",
    agreementDate: "2023-06-01",
    expireDate: "2024-06-01",
    installmentNo: 12,
    installmentAmount: 1650,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Saudi Arabia.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 19,
    seg: "019",
    name: "Egypt Asset",
    number: "1923",
    agreementName: "Agreement 19",
    agreementType: "Lease",
    agreementDate: "2023-07-01",
    expireDate: "2024-07-01",
    installmentNo: 12,
    installmentAmount: 1700,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Egypt.",
    status: "active",
    isDeleted: false,
  },
  {
    id: 20,
    seg: "020",
    name: "Nigeria Asset",
    number: "2023",
    agreementName: "Agreement 20",
    agreementType: "Lease",
    agreementDate: "2023-08-01",
    expireDate: "2024-08-01",
    installmentNo: 12,
    installmentAmount: 1750,
    installmentPlan: "Monthly",
    NotificationDays: 30,
    description:
      "This asset represents resources and details related to Nigeria.",
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

export default function RentalGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("Countries grid rendered");

  const navigate = useNavigate();

  const [rental, setRental] = useState(rentalData);
  const canDelete: boolean = usePermission("rental", "delete");
  const canRestore: boolean = usePermission("rental", "restore");
  const canEdit: boolean = usePermission("rental", "edit");

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
      id: rental.length + index + 1,
      seg: `0${rental.length + index + 1}`,
      name: `Rental ${rental.length + index + 1}`,
      number: `N-${rental.length + index + 1}`,
      agreementName: `Agreement ${rental.length + index + 1}`,
      agreementType: "Lease",
      agreementDate: "2023-01-01",
      expireDate: "2024-01-01",
      installmentNo: 12,
      installmentAmount: 1000,
      installmentPlan: "Monthly",
      NotificationDays: 30,
      description: `This is a mock Rental item number ${
        rental.length + index + 1
      }.`,
      status: ["active", "inactive", "draft"][Math.floor(Math.random() * 3)],
      isDeleted: false,
    }));

    if (rental.length >= 50) {
      setHasMore(false);
    } else {
      setRental((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [rental.length, isLoading, hasMore]);

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
    setRental((prevRental) =>
      prevRental.map((rental) =>
        rental.id === id ? { ...rental, isDeleted: !rental.isDeleted } : rental
      )
    );
  };

  const handleRestoreClick = (id: number | string) => {
    setRental((prevRental) =>
      prevRental.map((rental) =>
        rental.id === id ? { ...rental, isDeleted: false } : rental
      )
    );
  };

  const filteredRental = rental.filter((rent) =>
    rent.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {filteredRental?.length} Rental
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
            {filteredRental.map((rent, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/rental/1`)}
                  >
                    {rent.name}
                  </CardTitle>

                  <div className="flex items-center justify-end">
                    <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize bg-purple-200 text-purple-800">
                      {rent.seg}
                    </div>
                  </div>
                </div>

                {/* Middle Row */}
                <div className="border-b pb-1">
                  <CardDescription>{rent.description}</CardDescription>
                </div>
                <div className="">
                  <CartDateRange
                    startDate={rent.agreementDate}
                    endDate={rent.expireDate}
                  />
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Type
                    </div>
                    <div className="text-sm font-semibold">
                      {rent.agreementType}
                    </div>
                  </div>
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
                            toastRestore("Rental restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(rent.id);
                              toastDelete("Rental deleted successfully");
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
                          onClick={() => navigate(`/rental/edit/1`)}
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
          {!hasMore && filteredRental.length > 12 && (
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
                data={rental}
                setFilteredData={setRental}
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
                data={rental}
                setFilteredData={setRental}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
