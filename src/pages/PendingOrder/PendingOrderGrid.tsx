import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
// import { id } from "date-fns/locale";

// Mock data - replace with real data from your API
const MokData = [
  {
    id: 1,
    SN: "001",
    country: "USA",
    company: "America Cargo Solutions LLC",
    piNo: "PI-1001",
    invoiceNo: "INV-5001",
    SupplierName: "Michael Smith",
    date: "2023-01-12",
    loginId: "michael.smith",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 2,
    SN: "002",
    country: "UK",
    company: "Britannia Shipping Services",
    piNo: "PI-1002",
    invoiceNo: "INV-5002",
    SupplierName: "James Brown",
    date: "2023-01-13",
    loginId: "james.brown",
    action: "Approved",
    status: "inactive",
    isDeleted: false,
  },
  {
    id: 3,
    SN: "003",
    country: "Germany",
    company: "Deutsche Transport GmbH",
    piNo: "PI-1003",
    invoiceNo: "INV-5003",
    SupplierName: "Hans Müller",
    date: "2023-01-14",
    loginId: "hans.mueller",
    action: "Approved",
    status: "draft",
    isDeleted: false,
  },
  {
    id: 4,
    SN: "004",
    country: "France",
    company: "Paris Logistics & Freight SARL",
    piNo: "PI-1004",
    invoiceNo: "INV-5004",
    SupplierName: "Sophie Laurent",
    date: "2023-01-15",
    loginId: "sophie.laurent",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 5,
    SN: "005",
    country: "Australia",
    company: "Aussie Cargo Express Pty Ltd.",
    piNo: "PI-1005",
    invoiceNo: "INV-5005",
    SupplierName: "Oliver Wilson",
    date: "2023-01-16",
    loginId: "oliver.wilson",
    action: "Approved",
    status: "active",
    isDeleted: false,
  },
  {
    id: 6,
    SN: "006",
    country: "South Africa",
    company: "CapeTown Transporters (Pty) Ltd.",
    piNo: "PI-1006",
    invoiceNo: "INV-5006",
    SupplierName: "Thabo Nkosi",
    date: "2023-01-17",
    loginId: "thabo.nkosi",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 7,
    SN: "007",
    country: "Brazil",
    company: "Brasil Freight & Cargo SA",
    piNo: "PI-1007",
    invoiceNo: "INV-5007",
    SupplierName: "Carlos Silva",
    date: "2023-01-18",
    loginId: "carlos.silva",
    action: "Approved",
    status: "active",
    isDeleted: false,
  },
  {
    id: 8,
    SN: "008",
    country: "Argentina",
    company: "Buenos Aires Cargo Lines SA",
    piNo: "PI-1008",
    invoiceNo: "INV-5008",
    SupplierName: "Diego Fernández",
    date: "2023-01-19",
    loginId: "diego.fernandez",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 9,
    SN: "009",
    country: "Mexico",
    company: "MexiTrans Logistics SA de CV",
    piNo: "PI-1009",
    invoiceNo: "INV-5009",
    SupplierName: "Luis Martinez",
    date: "2023-01-20",
    loginId: "luis.martinez",
    action: "Approved",
    status: "active",
    isDeleted: false,
  },
  {
    id: 10,
    SN: "010",
    country: "India",
    company: "Bharat Cargo Movers Pvt. Ltd.",
    piNo: "PI-1010",
    invoiceNo: "INV-5010",
    SupplierName: "Amit Sharma",
    date: "2023-01-21",
    loginId: "amit.sharma",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 11,
    SN: "011",
    country: "China",
    company: "Dragon Express Shipping Co. Ltd.",
    piNo: "PI-1011",
    invoiceNo: "INV-5011",
    SupplierName: "Li Wei",
    date: "2023-01-22",
    loginId: "li.wei",
    action: "Approved",
    status: "active",
    isDeleted: false,
  },
  {
    id: 12,
    SN: "012",
    country: "Japan",
    company: "Nippon Freight Corporation",
    piNo: "PI-1012",
    invoiceNo: "INV-5012",
    SupplierName: "Hiroshi Tanaka",
    date: "2023-01-23",
    loginId: "hiroshi.tanaka",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 13,
    SN: "013",
    country: "Russia",
    company: "Moscow Cargo Services JSC",
    piNo: "PI-1013",
    invoiceNo: "INV-5013",
    SupplierName: "Ivan Petrov",
    date: "2023-01-24",
    loginId: "ivan.petrov",
    action: "Approved",
    status: "active",
    isDeleted: false,
  },
  {
    id: 14,
    SN: "014",
    country: "South Korea",
    company: "Seoul Transport & Logistics Ltd.",
    piNo: "PI-1014",
    invoiceNo: "INV-5014",
    SupplierName: "Kim Min-Jun",
    date: "2023-01-25",
    loginId: "kim.minjun",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 15,
    SN: "015",
    country: "Turkey",
    company: "Ankara Freight & Shipping AS",
    piNo: "PI-1015",
    invoiceNo: "INV-5015",
    SupplierName: "Mehmet Kaya",
    date: "2023-01-26",
    loginId: "mehmet.kaya",
    action: "Approved",
    status: "active",
    isDeleted: false,
  },
  {
    id: 16,
    SN: "016",
    country: "Saudi Arabia",
    company: "Riyadh Cargo & Logistics Co.",
    piNo: "PI-1016",
    invoiceNo: "INV-5016",
    SupplierName: "Abdullah Al-Saud",
    date: "2023-01-27",
    loginId: "abdullah.alsaud",
    action: "Pending",
    status: "active",
    isDeleted: false,
  },
  {
    id: 17,
    SN: "017",
    country: "Egypt",
    company: "Cairo Logistics & Transport SAE",
    piNo: "PI-1017",
    invoiceNo: "INV-5017",
    SupplierName: "Omar Hassan",
    date: "2023-01-28",
    loginId: "omar.hassan",
    action: "Approved",
    status: "active",
    isDeleted: false,
  },
  {
    id: 18,
    SN: "018",
    country: "Nigeria",
    company: "Lagos Transport Express Ltd.",
    piNo: "PI-1018",
    invoiceNo: "INV-5018",
    SupplierName: "Chinedu Okafor",
    date: "2023-01-29",
    loginId: "chinedu.okafor",
    action: "Pending",
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

export default function PendingOrderGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("Countries grid rendered");

  // const navigate = useNavigate();

  const [pendingOrder, setPendingOrder] = useState(MokData);
  const canDelete: boolean = usePermission("pendingOrder", "delete");
  const canRestore: boolean = usePermission("pendingOrder", "restore");
  // const canEdit: boolean = usePermission("pendingOrder", "edit");

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
      id: pendingOrder.length + index + 1,
      SN: `00${pendingOrder.length + index + 1}`,
      country: ["South Korea", "Turkey", "Saudi Arabia", "Egypt", "Nigeria"][
        Math.floor(Math.random() * 5)
      ],
      company: [
        "Seoul Transport & Logistics Ltd.",
        "Ankara Freight & Shipping AS",
        "Riyadh Cargo & Logistics Co.",
        "Cairo Logistics & Transport SAE",
        "Lagos Transport Express Ltd.",
      ][Math.floor(Math.random() * 5)],
      piNo: `PI-100${pendingOrder.length + index + 1}`,
      invoiceNo: `INV-500${pendingOrder.length + index + 1}`,
      SupplierName: [
        "Kim Min-Jun",
        "Mehmet Kaya",
        "Abdullah Al-Saud",
        "Omar Hassan",
        "Chinedu Okafor",
      ][Math.floor(Math.random() * 5)],
      date: "2023-01-12",
      loginId: [
        "kim.minjun",
        "mehmet.kaya",
        "abdullah.alsaud",
        "omar.hassan",
        "chinedu.okafor",
      ][Math.floor(Math.random() * 5)],
      action: ["Pending", "Approved"][Math.floor(Math.random() * 2)],
      status: ["active", "inactive", "draft"][Math.floor(Math.random() * 3)],
      isDeleted: false,
    }));

    if (pendingOrder.length >= 50) {
      setHasMore(false);
    } else {
      setPendingOrder((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [pendingOrder.length, isLoading, hasMore]);

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
    setPendingOrder((prevPendingOrder) =>
      prevPendingOrder.map((pendingOrder) =>
        pendingOrder.id === id ? { ...pendingOrder, isDeleted: !pendingOrder.isDeleted } : pendingOrder
      )
    );
  };

  const handleRestoreClick = (id: number | string) => {
    setPendingOrder((prevPendingOrder) =>
      prevPendingOrder.map((pendingOrder) =>
        pendingOrder.id === id ? { ...pendingOrder, isDeleted: false } : pendingOrder
      )
    );
  };

  const filteredPendingOrder = pendingOrder.filter(
    (rent) =>
      rent.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.piNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rent.SupplierName.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {filteredPendingOrder?.length} Pending Orders
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
            {filteredPendingOrder.map((rent, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    // onClick={() => navigate(`/supplier-master/1`)}
                  >
                    {rent.SupplierName}
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
                  <CardDescription>{rent.invoiceNo}</CardDescription>
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
                            toastRestore("pendingOrder restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(rent.id);
                              toastDelete("pendingOrder deleted successfully");
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
                    {/* {canEdit && (
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
                          onClick={() => navigate(`/pending-order/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )} */}
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
          {!hasMore && filteredPendingOrder.length > 12 && (
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
                data={pendingOrder}
                setFilteredData={setPendingOrder}
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
                data={pendingOrder}
                setFilteredData={setPendingOrder}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
