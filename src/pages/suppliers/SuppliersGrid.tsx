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
const supplierData = [
  {
    id: "1",
    sn: "001",
    country: "Saudi Arabia",
    supplierName: "Al-Rashid Trading Company",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Bank Transfer",
    depositAmount: 50000,
    currency: "SAR",
    exchangeRate: 1.0,
    localAmt: 50000,
    contactPerson: "Ahmed Al-Rashid",
    mobileNo: "+966-50-123-4567",
    email: "ahmed@alrashid.com",
    website: "www.alrashid.com",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sn: "002",
    country: "UAE",
    supplierName: "Al-Zahrani Enterprises",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Credit Card",
    depositAmount: 75000,
    currency: "AED",
    exchangeRate: 0.98,
    localAmt: 73500,
    contactPerson: "Fatima Al-Zahrani",
    mobileNo: "+971-50-987-6543",
    email: "fatima@alzahrani.ae",
    website: "www.alzahrani.ae",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    sn: "003",
    country: "Kuwait",
    supplierName: "Al-Otaibi Industries",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Wire Transfer",
    depositAmount: 100000,
    currency: "KWD",
    exchangeRate: 12.5,
    localAmt: 1250000,
    contactPerson: "Khalid Al-Otaibi",
    mobileNo: "+965-50-555-1234",
    email: "khalid@alotaibi.kw",
    website: "www.alotaibi.kw",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    sn: "004",
    country: "Qatar",
    supplierName: "Al-Shehri Solutions",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Performance Bond",
    paymentType: "Bank Transfer",
    depositAmount: 60000,
    currency: "QAR",
    exchangeRate: 1.02,
    localAmt: 61200,
    contactPerson: "Mariam Al-Shehri",
    mobileNo: "+974-50-777-8888",
    email: "mariam@alshehri.qa",
    website: "www.alshehri.qa",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    sn: "005",
    country: "Bahrain",
    supplierName: "Al-Ghamdi Trading",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Credit Card",
    depositAmount: 40000,
    currency: "BHD",
    exchangeRate: 10.0,
    localAmt: 400000,
    contactPerson: "Omar Al-Ghamdi",
    mobileNo: "+973-50-111-2222",
    email: "omar@alghamdi.bh",
    website: "www.alghamdi.bh",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    sn: "006",
    country: "Oman",
    supplierName: "Al-Harbi Corporation",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Bank Transfer",
    depositAmount: 80000,
    currency: "OMR",
    exchangeRate: 9.8,
    localAmt: 784000,
    contactPerson: "Aisha Al-Harbi",
    mobileNo: "+968-50-333-4444",
    email: "aisha@alharbi.om",
    website: "www.alharbi.om",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    sn: "007",
    country: "Jordan",
    supplierName: "Al-Maktoum Trading",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Wire Transfer",
    depositAmount: 90000,
    currency: "JOD",
    exchangeRate: 5.3,
    localAmt: 477000,
    contactPerson: "Yusuf Al-Maktoum",
    mobileNo: "+962-50-666-7777",
    email: "yusuf@almaktoum.jo",
    website: "www.almaktoum.jo",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    sn: "008",
    country: "Lebanon",
    supplierName: "Al-Nahyan Enterprises",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Performance Bond",
    paymentType: "Bank Transfer",
    depositAmount: 55000,
    currency: "LBP",
    exchangeRate: 0.00066,
    localAmt: 36.3,
    contactPerson: "Layla Al-Nahyan",
    mobileNo: "+961-50-888-9999",
    email: "layla@alnahyan.lb",
    website: "www.alnahyan.lb",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    sn: "009",
    country: "Egypt",
    supplierName: "Al-Qasimi Trading",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Cash Deposit",
    paymentType: "Credit Card",
    depositAmount: 70000,
    currency: "EGP",
    exchangeRate: 0.13,
    localAmt: 9100,
    contactPerson: "Hassan Al-Qasimi",
    mobileNo: "+20-50-123-4567",
    email: "hassan@alqasimi.eg",
    website: "www.alqasimi.eg",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    sn: "010",
    country: "Iraq",
    supplierName: "Al-Sharqi Corporation",
    paymentTerms: "Net 60",
    dueDays: 60,
    typeOfDeposit: "Bank Guarantee",
    paymentType: "Bank Transfer",
    depositAmount: 65000,
    currency: "IQD",
    exchangeRate: 0.00076,
    localAmt: 49.4,
    contactPerson: "Noor Al-Sharqi",
    mobileNo: "+964-50-555-6666",
    email: "noor@alsharqi.iq",
    website: "www.alsharqi.iq",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    sn: "011",
    country: "Turkey",
    supplierName: "Al-Sabah Trading",
    paymentTerms: "Net 45",
    dueDays: 45,
    typeOfDeposit: "Performance Bond",
    paymentType: "Wire Transfer",
    depositAmount: 85000,
    currency: "TRY",
    exchangeRate: 0.12,
    localAmt: 10200,
    contactPerson: "Mehmet Al-Sabah",
    mobileNo: "+90-50-777-8888",
    email: "mehmet@alsabah.tr",
    website: "www.alsabah.tr",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    sn: "012",
    country: "Iran",
    supplierName: "Al-Khalifa Enterprises",
    paymentTerms: "Net 30",
    dueDays: 30,
    typeOfDeposit: "Letter of Credit",
    paymentType: "Bank Transfer",
    depositAmount: 95000,
    currency: "IRR",
    exchangeRate: 0.000024,
    localAmt: 2.28,
    contactPerson: "Reza Al-Khalifa",
    mobileNo: "+98-50-999-0000",
    email: "reza@alkhalifa.ir",
    website: "www.alkhalifa.ir",
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

export default function SuppliersGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Suppliers grid rendered");

  const navigate = useNavigate();

  const [supplierDataState, setSupplierDataState] = useState(supplierData);
  const canDelete: boolean = usePermission("supplier", "delete");
  const canRestore: boolean = usePermission("supplier", "restore");
  const canEdit: boolean = usePermission("supplier", "edit");

  // Debug permissions
  console.log("Supplier Permissions:", {
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
    const supplierNames = [
      "Al-Thani Trading Company",
      "Al-Said Enterprises",
      "Al-Hashemi Corporation",
      "Aoun Trading Solutions",
      "El-Sisi Enterprises",
      "Al-Kadhimi Trading",
    ];
    const paymentTerms = ["Net 30", "Net 45", "Net 60", "Net 90"];
    const typeOfDeposits = [
      "Bank Guarantee",
      "Cash Deposit",
      "Letter of Credit",
      "Performance Bond",
    ];
    const paymentTypes = [
      "Bank Transfer",
      "Credit Card",
      "Wire Transfer",
      "Cash",
    ];
    const currencies = ["PKR", "INR", "CNY", "JPY", "KRW", "SGD"];
    const contactPersons = [
      "Ahmed Al-Thani",
      "Fatima Al-Said",
      "Khalid Al-Hashemi",
      "Mariam Aoun",
      "Omar El-Sisi",
      "Aisha Al-Kadhimi",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      sn: `${String(supplierDataState.length + index + 1).padStart(3, "0")}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      supplierName:
        supplierNames[Math.floor(Math.random() * supplierNames.length)],
      paymentTerms:
        paymentTerms[Math.floor(Math.random() * paymentTerms.length)],
      dueDays: [30, 45, 60, 90][Math.floor(Math.random() * 4)],
      typeOfDeposit:
        typeOfDeposits[Math.floor(Math.random() * typeOfDeposits.length)],
      paymentType:
        paymentTypes[Math.floor(Math.random() * paymentTypes.length)],
      depositAmount: Math.floor(Math.random() * 100000) + 20000,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      exchangeRate: Math.random() * 2 + 0.5,
      localAmt: Math.floor(Math.random() * 1000000) + 100000,
      contactPerson:
        contactPersons[Math.floor(Math.random() * contactPersons.length)],
      mobileNo: `+${Math.floor(Math.random() * 999) + 1}-${
        Math.floor(Math.random() * 999) + 50
      }-${Math.floor(Math.random() * 9999) + 1000}`,
      email: `contact@${supplierNames[
        Math.floor(Math.random() * supplierNames.length)
      ]
        .toLowerCase()
        .replace(/\s+/g, "")}.com`,
      website: `www.${supplierNames[
        Math.floor(Math.random() * supplierNames.length)
      ]
        .toLowerCase()
        .replace(/\s+/g, "")}.com`,
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (supplierDataState.length >= 46) {
      setHasMore(false);
    } else {
      setSupplierDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [supplierDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (supplierId: string) => {
    setSupplierDataState((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === supplierId
          ? {
              ...supplier,
              isDeleted: supplier.isDeleted === true ? false : true,
            }
          : supplier
      )
    );
  };

  const handleRestoreClick = (supplierId: string) => {
    setSupplierDataState((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === supplierId
          ? {
              ...supplier,
              isDeleted: supplier.isDeleted === true ? false : true,
            }
          : supplier
      )
    );
  };

  // Filter supplier records based on search query
  const filteredSuppliers = supplierDataState.filter(
    (supplier) =>
      supplier.sn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.paymentTerms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.typeOfDeposit
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      supplier.paymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      supplier.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.website.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Net 30":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Net 45":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Net 60":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Net 90":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
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
          Total {supplierData.length} supplier records
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
            {filteredSuppliers.map((supplier, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/supplier/1`)}
                  >
                    {supplier.supplierName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        supplier.paymentTerms
                      )}`}
                    >
                      {supplier.paymentTerms}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Country | Actions | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Country */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {supplier.country}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        supplier.isDeleted && canRestore
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
                        disabled={supplier.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          supplier.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && supplier.isDeleted) {
                            handleRestoreClick(supplier.id);
                            toastRestore(
                              "Supplier record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(supplier.id);
                              toastDelete(
                                "Supplier record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {supplier.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/supplier/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Currency
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {supplier.currency}
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
                  Loading more supplier records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSuppliers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more supplier records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={supplierData}
                setFilteredData={setSupplierDataState}
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
                data={supplierData}
                setFilteredData={setSupplierDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
