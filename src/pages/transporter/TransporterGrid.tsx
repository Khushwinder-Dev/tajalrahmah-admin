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
const transporterData = [
  {
    id: "1",
    transporterCountry: "Saudi Arabia",
    transporterName: "Al-Rashid Transport Services",
    contactPerson: "Ahmed Al-Rashid",
    mobileNo: "+966-50-123-4567",
    phoneNo: "+966-11-234-5678",
    faxNo: "+966-11-234-5679",
    email: "ahmed@alrashid-transport.com",
    website: "www.alrashid-transport.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    transporterCountry: "UAE",
    transporterName: "Al-Zahrani Logistics",
    contactPerson: "Fatima Al-Zahrani",
    mobileNo: "+971-50-234-5678",
    phoneNo: "+971-4-345-6789",
    faxNo: "+971-4-345-6790",
    email: "fatima@alzahrani-logistics.com",
    website: "www.alzahrani-logistics.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    transporterCountry: "Kuwait",
    transporterName: "Al-Otaibi Freight Solutions",
    contactPerson: "Omar Al-Otaibi",
    mobileNo: "+965-50-345-6789",
    phoneNo: "+965-2-456-7890",
    faxNo: "+965-2-456-7891",
    email: "omar@alotaibi-freight.com",
    website: "www.alotaibi-freight.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    transporterCountry: "Qatar",
    transporterName: "Al-Shehri Cargo Services",
    contactPerson: "Aisha Al-Shehri",
    mobileNo: "+974-50-456-7890",
    phoneNo: "+974-4-567-8901",
    faxNo: "+974-4-567-8902",
    email: "aisha@alshehri-cargo.com",
    website: "www.alshehri-cargo.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    transporterCountry: "Bahrain",
    transporterName: "Al-Ghamdi Express",
    contactPerson: "Khalid Al-Ghamdi",
    mobileNo: "+973-50-567-8901",
    phoneNo: "+973-17-678-9012",
    faxNo: "+973-17-678-9013",
    email: "khalid@alghamdi-express.com",
    website: "www.alghamdi-express.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    transporterCountry: "Oman",
    transporterName: "Al-Harbi Shipping",
    contactPerson: "Salma Al-Harbi",
    mobileNo: "+968-50-678-9012",
    phoneNo: "+968-24-789-0123",
    faxNo: "+968-24-789-0124",
    email: "salma@alharbi-shipping.com",
    website: "www.alharbi-shipping.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    transporterCountry: "Jordan",
    transporterName: "Al-Maktoum Transport",
    contactPerson: "Hassan Al-Maktoum",
    mobileNo: "+962-79-789-0123",
    phoneNo: "+962-6-890-1234",
    faxNo: "+962-6-890-1235",
    email: "hassan@almaktoum-transport.com",
    website: "www.almaktoum-transport.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    transporterCountry: "Lebanon",
    transporterName: "Al-Nahyan Logistics",
    contactPerson: "Layla Al-Nahyan",
    mobileNo: "+961-70-890-1234",
    phoneNo: "+961-1-901-2345",
    faxNo: "+961-1-901-2346",
    email: "layla@alnahyan-logistics.com",
    website: "www.alnahyan-logistics.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    transporterCountry: "Egypt",
    transporterName: "Al-Qasimi Freight",
    contactPerson: "Youssef Al-Qasimi",
    mobileNo: "+20-10-901-2345",
    phoneNo: "+20-2-012-3456",
    faxNo: "+20-2-012-3457",
    email: "youssef@alqasimi-freight.com",
    website: "www.alqasimi-freight.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    transporterCountry: "Iraq",
    transporterName: "Al-Sharqi Cargo",
    contactPerson: "Noor Al-Sharqi",
    mobileNo: "+964-750-012-3456",
    phoneNo: "+964-1-123-4567",
    faxNo: "+964-1-123-4568",
    email: "noor@alsharqi-cargo.com",
    website: "www.alsharqi-cargo.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    transporterCountry: "Turkey",
    transporterName: "Al-Sabah Express",
    contactPerson: "Mehmet Al-Sabah",
    mobileNo: "+90-532-123-4567",
    phoneNo: "+90-212-234-5678",
    faxNo: "+90-212-234-5679",
    email: "mehmet@alsabah-express.com",
    website: "www.alsabah-express.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    transporterCountry: "Iran",
    transporterName: "Al-Khalifa Shipping",
    contactPerson: "Reza Al-Khalifa",
    mobileNo: "+98-912-234-5678",
    phoneNo: "+98-21-345-6789",
    faxNo: "+98-21-345-6790",
    email: "reza@alkhalifa-shipping.com",
    website: "www.alkhalifa-shipping.com",
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

export default function TransporterGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Transporter grid rendered");

  const navigate = useNavigate();

  const [transporterDataState, setTransporterDataState] =
    useState(transporterData);
  const canDelete: boolean = usePermission("transporter", "delete");
  const canRestore: boolean = usePermission("transporter", "restore");
  const canEdit: boolean = usePermission("transporter", "edit");

  // Debug permissions
  console.log("Transporter Permissions:", {
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
      "Al-Thani Transport Co",
      "Al-Said Logistics",
      "Al-Hashemi Freight",
      "Aoun Cargo Solutions",
      "El-Sisi Express",
      "Al-Kadhimi Shipping",
    ];
    const contactPersons = [
      "Ali Al-Thani",
      "Sara Al-Said",
      "Ahmed Al-Hashemi",
      "Fatima Aoun",
      "Omar El-Sisi",
      "Layla Al-Kadhimi",
    ];
    const mobileNumbers = [
      "+92-300-123-4567",
      "+91-987-234-5678",
      "+86-138-345-6789",
      "+81-90-456-7890",
      "+82-10-567-8901",
      "+65-912-678-9012",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      transporterCountry:
        countries[Math.floor(Math.random() * countries.length)],
      transporterName: companies[Math.floor(Math.random() * companies.length)],
      contactPerson:
        contactPersons[Math.floor(Math.random() * contactPersons.length)],
      mobileNo: mobileNumbers[Math.floor(Math.random() * mobileNumbers.length)],
      phoneNo: `+${Math.floor(Math.random() * 999) + 1}-${
        Math.floor(Math.random() * 999) + 1
      }-${Math.floor(Math.random() * 9999) + 1000}`,
      faxNo: `+${Math.floor(Math.random() * 999) + 1}-${
        Math.floor(Math.random() * 999) + 1
      }-${Math.floor(Math.random() * 9999) + 1000}`,
      email: `contact${transporterDataState.length + index + 1}@transporter${
        transporterDataState.length + index + 1
      }.com`,
      website: `www.transporter${transporterDataState.length + index + 1}.com`,
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (transporterDataState.length >= 46) {
      setHasMore(false);
    } else {
      setTransporterDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [transporterDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (transporterId: string) => {
    setTransporterDataState((prevTransporters) =>
      prevTransporters.map((transporter) =>
        transporter.id === transporterId
          ? {
              ...transporter,
              isDeleted: transporter.isDeleted === true ? false : true,
            }
          : transporter
      )
    );
  };

  const handleRestoreClick = (transporterId: string) => {
    setTransporterDataState((prevTransporters) =>
      prevTransporters.map((transporter) =>
        transporter.id === transporterId
          ? {
              ...transporter,
              isDeleted: transporter.isDeleted === true ? false : true,
            }
          : transporter
      )
    );
  };

  // Filter transporter records based on search query
  const filteredTransporters = transporterDataState.filter(
    (transporter) =>
      transporter.transporterCountry
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transporter.transporterName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transporter.contactPerson
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transporter.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transporter.phoneNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transporter.faxNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transporter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transporter.website.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          Total {transporterData.length} transporter records
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
            {filteredTransporters.map((transporter, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/transporter/1`)}
                  >
                    {transporter.transporterName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transporter.isActive
                      )}`}
                    >
                      {transporter.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Country | Actions | Contact */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Transporter Country */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {transporter.transporterCountry}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        transporter.isDeleted && canRestore
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
                        disabled={transporter.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          transporter.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && transporter.isDeleted) {
                            handleRestoreClick(transporter.id);
                            toastRestore(
                              "Transporter record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(transporter.id);
                              toastDelete(
                                "Transporter record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {transporter.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/transporter/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Contact
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {transporter.contactPerson}
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
                  Loading more transporter records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTransporters.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more transporter records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={transporterData}
                setFilteredData={setTransporterDataState}
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
                data={transporterData}
                setFilteredData={setTransporterDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
