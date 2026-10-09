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
const consigneeData = [
  {
    id: "1",
    customerCode: "CS001",
    customerName: "Al-Rashid Trading Company",
    notification: "Email & SMS",
    country: "Saudi Arabia",
    zipCode: "21452",
    address: "King Fahd Road, Jeddah",
    landmark: "Near King Abdulaziz International Airport",
    poBox: "12345",
    currency: "SAR",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "50000",
    mobileNo: "+966-50-123-4567",
    contactPerson: "Ahmed Al-Rashid",
    faxNo: "+966-12-123-4568",
    phoneNo: "+966-12-123-4567",
    website: "www.alrashid-trading.sa",
    email: "info@alrashid-trading.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    customerCode: "CS002",
    customerName: "Al-Zahrani Enterprises",
    notification: "Email",
    country: "Saudi Arabia",
    zipCode: "31451",
    address: "King Khalid Road, Dammam",
    landmark: "Near King Fahd International Airport",
    poBox: "23456",
    currency: "SAR",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "75000",
    mobileNo: "+966-50-234-5678",
    contactPerson: "Mohammed Al-Zahrani",
    faxNo: "+966-13-234-5679",
    phoneNo: "+966-13-234-5678",
    website: "www.alzahrani-enterprises.sa",
    email: "info@alzahrani-enterprises.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    customerCode: "CS003",
    customerName: "Al-Otaibi Industries",
    notification: "SMS & WhatsApp",
    country: "Saudi Arabia",
    zipCode: "41912",
    address: "Industrial City Road, Yanbu",
    landmark: "Near Yanbu Industrial City",
    poBox: "34567",
    currency: "SAR",
    paymentTerms: "Net 60",
    creditPeriod: "60 days",
    creditLimit: "100000",
    mobileNo: "+966-50-345-6789",
    contactPerson: "Khalid Al-Otaibi",
    faxNo: "+966-14-345-6790",
    phoneNo: "+966-14-345-6789",
    website: "www.alotaibi-industries.sa",
    email: "info@alotaibi-industries.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    customerCode: "CS004",
    customerName: "Al-Shehri Solutions",
    notification: "Email",
    country: "Saudi Arabia",
    zipCode: "31961",
    address: "Industrial City Road, Jubail",
    landmark: "Near Jubail Industrial City",
    poBox: "45678",
    currency: "SAR",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "60000",
    mobileNo: "+966-50-456-7890",
    contactPerson: "Omar Al-Shehri",
    faxNo: "+966-13-456-7891",
    phoneNo: "+966-13-456-7890",
    website: "www.alshehri-solutions.sa",
    email: "info@alshehri-solutions.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    customerCode: "CS005",
    customerName: "Al-Ghamdi Trading",
    notification: "SMS",
    country: "Saudi Arabia",
    zipCode: "23932",
    address: "Economic City Road, Rabigh",
    landmark: "Near King Abdullah Economic City",
    poBox: "56789",
    currency: "SAR",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "40000",
    mobileNo: "+966-50-567-8901",
    contactPerson: "Salman Al-Ghamdi",
    faxNo: "+966-12-567-8902",
    phoneNo: "+966-12-567-8901",
    website: "www.alghamdi-trading.sa",
    email: "info@alghamdi-trading.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    customerCode: "CS006",
    customerName: "Al-Harbi Corporation",
    notification: "Email & SMS",
    country: "Saudi Arabia",
    zipCode: "45142",
    address: "Economic City Road, Jizan",
    landmark: "Near Jizan Economic City",
    poBox: "67890",
    currency: "SAR",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "80000",
    mobileNo: "+966-50-678-9012",
    contactPerson: "Abdullah Al-Harbi",
    faxNo: "+966-17-678-9013",
    phoneNo: "+966-17-678-9012",
    website: "www.alharbi-corporation.sa",
    email: "info@alharbi-corporation.sa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    customerCode: "CS007",
    customerName: "Al-Maktoum Trading",
    notification: "Email",
    country: "UAE",
    zipCode: "00000",
    address: "Sheikh Zayed Road, Dubai",
    landmark: "Near Dubai Creek",
    poBox: "78901",
    currency: "AED",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "120000",
    mobileNo: "+971-50-789-0123",
    contactPerson: "Ali Al-Maktoum",
    faxNo: "+971-4-789-0124",
    phoneNo: "+971-4-789-0123",
    website: "www.almaktoum-trading.ae",
    email: "info@almaktoum-trading.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    customerCode: "CS008",
    customerName: "Al-Nahyan Enterprises",
    notification: "SMS & WhatsApp",
    country: "UAE",
    zipCode: "00000",
    address: "Corniche Road, Abu Dhabi",
    landmark: "Near Mina Zayed",
    poBox: "89012",
    currency: "AED",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "150000",
    mobileNo: "+971-50-890-1234",
    contactPerson: "Fatima Al-Nahyan",
    faxNo: "+971-2-890-1235",
    phoneNo: "+971-2-890-1234",
    website: "www.alnahyan-enterprises.ae",
    email: "info@alnahyan-enterprises.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    customerCode: "CS009",
    customerName: "Al-Qasimi Trading",
    notification: "Email",
    country: "UAE",
    zipCode: "00000",
    address: "Al Wahda Street, Sharjah",
    landmark: "Near Khalid Port",
    poBox: "90123",
    currency: "AED",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "90000",
    mobileNo: "+971-50-901-2345",
    contactPerson: "Hassan Al-Qasimi",
    faxNo: "+971-6-901-2346",
    phoneNo: "+971-6-901-2345",
    website: "www.alqasimi-trading.ae",
    email: "info@alqasimi-trading.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    customerCode: "CS010",
    customerName: "Al-Sharqi Corporation",
    notification: "SMS",
    country: "UAE",
    zipCode: "00000",
    address: "Free Zone Road, Fujairah",
    landmark: "Near Fujairah Free Zone",
    poBox: "01234",
    currency: "AED",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "70000",
    mobileNo: "+971-50-012-3456",
    contactPerson: "Rashid Al-Sharqi",
    faxNo: "+971-9-012-3457",
    phoneNo: "+971-9-012-3456",
    website: "www.alsharqi-corporation.ae",
    email: "info@alsharqi-corporation.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    customerCode: "CS011",
    customerName: "Al-Sabah Trading",
    notification: "Email & SMS",
    country: "Kuwait",
    zipCode: "00000",
    address: "Gulf Road, Kuwait City",
    landmark: "Near Shuwaikh Port",
    poBox: "12345",
    currency: "KWD",
    paymentTerms: "Net 30",
    creditPeriod: "30 days",
    creditLimit: "100000",
    mobileNo: "+965-50-123-4567",
    contactPerson: "Nasser Al-Sabah",
    faxNo: "+965-1-123-4568",
    phoneNo: "+965-1-123-4567",
    website: "www.alsabah-trading.kw",
    email: "info@alsabah-trading.kw",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    customerCode: "CS012",
    customerName: "Al-Khalifa Enterprises",
    notification: "Email",
    country: "Bahrain",
    zipCode: "00000",
    address: "King Faisal Highway, Manama",
    landmark: "Near Khalifa Bin Salman Port",
    poBox: "23456",
    currency: "BHD",
    paymentTerms: "Net 45",
    creditPeriod: "45 days",
    creditLimit: "80000",
    mobileNo: "+973-50-234-5678",
    contactPerson: "Khalid Al-Khalifa",
    faxNo: "+973-17-234-5679",
    phoneNo: "+973-17-234-5678",
    website: "www.alkhalifa-enterprises.bh",
    email: "info@alkhalifa-enterprises.bh",
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

export default function ConsigneeMasterGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Consignee Master grid rendered");

  const navigate = useNavigate();

  const [consigneeDataState, setConsigneeDataState] = useState(consigneeData);
  const canDelete: boolean = usePermission("consigneeMaster", "delete");
  const canRestore: boolean = usePermission("consigneeMaster", "restore");
  const canEdit: boolean = usePermission("consigneeMaster", "edit");

  // Debug permissions
  console.log("Consignee Master Permissions:", {
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

    const customerCodes = [
      "CS013",
      "CS014",
      "CS015",
      "CS016",
      "CS017",
      "CS018",
    ];
    const customerNames = [
      "Al-Thani Trading Company",
      "Al-Said Enterprises",
      "Al-Hashemi Corporation",
      "Aoun Trading Solutions",
      "El-Sisi Enterprises",
      "Al-Kadhimi Trading",
    ];
    const notifications = [
      "Email",
      "SMS",
      "Email & SMS",
      "WhatsApp",
      "SMS & WhatsApp",
    ];
    const countries = ["Qatar", "Oman", "Jordan", "Lebanon", "Egypt", "Iraq"];
    const currencies = ["QAR", "OMR", "JOD", "LBP", "EGP", "IQD"];
    const paymentTerms = ["Net 30", "Net 45", "Net 60", "Net 90"];
    const contactPersons = [
      "Hamad Al-Thani",
      "Sultan Al-Said",
      "Abdullah Al-Hashemi",
      "Michel Aoun",
      "Ahmed El-Sisi",
      "Mustafa Al-Kadhimi",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      customerCode:
        customerCodes[Math.floor(Math.random() * customerCodes.length)],
      customerName:
        customerNames[Math.floor(Math.random() * customerNames.length)],
      notification:
        notifications[Math.floor(Math.random() * notifications.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      zipCode: "00000",
      address: "Customer Address",
      landmark: "Customer Landmark",
      poBox: "00000",
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      paymentTerms:
        paymentTerms[Math.floor(Math.random() * paymentTerms.length)],
      creditPeriod: "30 days",
      creditLimit: "50000",
      mobileNo: "+966-50-000-0000",
      contactPerson:
        contactPersons[Math.floor(Math.random() * contactPersons.length)],
      faxNo: "+966-12-000-0001",
      phoneNo: "+966-12-000-0000",
      website: "www.customer.com",
      email: "info@customer.com",
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (consigneeDataState.length >= 46) {
      setHasMore(false);
    } else {
      setConsigneeDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [consigneeDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (consigneeId: string) => {
    setConsigneeDataState((prevConsignees) =>
      prevConsignees.map((consignee) =>
        consignee.id === consigneeId
          ? {
              ...consignee,
              isDeleted: consignee.isDeleted === true ? false : true,
            }
          : consignee
      )
    );
  };

  const handleRestoreClick = (consigneeId: string) => {
    setConsigneeDataState((prevConsignees) =>
      prevConsignees.map((consignee) =>
        consignee.id === consigneeId
          ? {
              ...consignee,
              isDeleted: consignee.isDeleted === true ? false : true,
            }
          : consignee
      )
    );
  };

  // Filter consignee records based on search query
  const filteredConsignees = consigneeDataState.filter(
    (consignee) =>
      consignee.customerCode
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      consignee.customerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      consignee.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consignee.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consignee.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {consigneeData.length} consignee records
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
            {filteredConsignees.map((consignee, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/consignee-master/1`)}
                  >
                    {consignee.customerName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        consignee.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {consignee.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Customer Code | Actions | Country */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Customer Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Customer Code
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {consignee.customerCode}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        consignee.isDeleted && canRestore
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
                        disabled={consignee.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          consignee.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && consignee.isDeleted) {
                            handleRestoreClick(consignee.id);
                            toastRestore(
                              "Consignee record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(consignee.id);
                              toastDelete(
                                "Consignee record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {consignee.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/consignee-master/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Country - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {consignee.country}
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
                  Loading more consignee records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredConsignees.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more consignee records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={consigneeData}
                setFilteredData={setConsigneeDataState}
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
                data={consigneeData}
                setFilteredData={setConsigneeDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
