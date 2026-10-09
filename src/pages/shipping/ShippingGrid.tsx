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
const shippingData = [
  {
    id: "1",
    sn: "001",
    shipperCountry: "Saudi Arabia",
    shipperName: "Al-Rashid Shipping Co",
    contactPerson: "Ahmed Al-Rashid",
    mobileNo: "+966501234567",
    phoneNo: "+966114567890",
    faxNo: "+966114567891",
    email: "ahmed@rashidshipping.com",
    website: "www.rashidshipping.com",
    shipmentRate: "150.00",
    cbm: "25.5",
    freightCost: "3825.00",
    currencyType: "SAR",
    status: "Active",
    date: new Date("2024-01-15"),
    loginId: "user001",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    sn: "002",
    shipperCountry: "UAE",
    shipperName: "Al-Zahrani Shipping",
    contactPerson: "Mohammed Al-Zahrani",
    mobileNo: "+971501234567",
    phoneNo: "+971114567890",
    faxNo: "+971114567891",
    email: "mohammed@alzahrani.com",
    website: "www.alzahrani.com",
    shipmentRate: "200.00",
    cbm: "30.0",
    freightCost: "4500.00",
    currencyType: "AED",
    status: "Inactive",
    date: new Date("2024-01-16"),
    loginId: "user002",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "3",
    sn: "003",
    shipperCountry: "Kuwait",
    shipperName: "Al-Otaibi Shipping",
    contactPerson: "Ali Al-Otaibi",
    mobileNo: "+965501234567",
    phoneNo: "+965114567890",
    faxNo: "+965114567891",
    email: "ali@alotaibi.com",
    website: "www.alotaibi.com",
    shipmentRate: "100.00",
    cbm: "15.0",
    freightCost: "1500.00",
    currencyType: "KWD",
    status: "Active",
    date: new Date("2024-01-17"),
    loginId: "user003",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    sn: "004",
    shipperCountry: "Qatar",
    shipperName: "Al-Shehri Shipping",
    contactPerson: "Youssef Al-Shehri",
    mobileNo: "+974501234567",
    phoneNo: "+974114567890",
    faxNo: "+974114567891",
    email: "youssef@alshehri.com",
    website: "www.alshehri.com",
    shipmentRate: "180.00",
    cbm: "28.0",
    freightCost: "4200.00",
    currencyType: "QAR",
    status: "Active",
    date: new Date("2024-01-18"),
    loginId: "user004",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    id: "5",
    sn: "005",
    shipperCountry: "Bahrain",
    shipperName: "Al-Ghamdi Shipping",
    contactPerson: "Khaled Al-Ghamdi",
    mobileNo: "+973501234567",
    phoneNo: "+973114567890",
    faxNo: "+973114567891",
    email: "khaled@algamdi.com",
    website: "www.algamdi.com",
    shipmentRate: "120.00",
    cbm: "20.0",
    freightCost: "2400.00",
    currencyType: "BHD",
    status: "Inactive",
    date: new Date("2024-01-19"),
    loginId: "user005",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    id: "6",
    sn: "006",
    shipperCountry: "Oman",
    shipperName: "Al-Harbi Shipping",
    contactPerson: "Faisal Al-Harbi",
    mobileNo: "+968501234567",
    phoneNo: "+968114567890",
    faxNo: "+968114567891",
    email: "faisal@alharbi.com",
    website: "www.alharbi.com",
    shipmentRate: "160.00",
    cbm: "22.0",
    freightCost: "3200.00",
    currencyType: "OMR",
    status: "Active",
    date: new Date("2024-01-20"),
    loginId: "user006",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    sn: "007",
    shipperCountry: "Jordan",
    shipperName: "Al-Maktoum Shipping",
    contactPerson: "Hassan Al-Maktoum",
    mobileNo: "+962501234567",
    phoneNo: "+962114567890",
    faxNo: "+962114567891",
    email: "hassan@almaktoum.com",
    website: "www.almaktoum.com",
    shipmentRate: "140.00",
    cbm: "18.0",
    freightCost: "2100.00",
    currencyType: "JOD",
    status: "Inactive",
    date: new Date("2024-01-21"),
    loginId: "user007",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    id: "8",
    sn: "008",
    shipperCountry: "Lebanon",
    shipperName: "Al-Nahyan Shipping",
    contactPerson: "Rami Al-Nahyan",
    mobileNo: "+961501234567",
    phoneNo: "+961114567890",
    faxNo: "+961114567891",
    email: "rami@alnahyan.com",
    website: "www.alnahyan.com",
    shipmentRate: "130.00",
    cbm: "17.0",
    freightCost: "1950.00",
    currencyType: "LBP",
    status: "Active",
    date: new Date("2024-01-22"),
    loginId: "user008",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    id: "9",
    sn: "009",
    shipperCountry: "Egypt",
    shipperName: "Al-Qasimi Shipping",
    contactPerson: "Ahmed Al-Qasimi",
    mobileNo: "+20501234567",
    phoneNo: "+20114567890",
    faxNo: "+20114567891",
    email: "ahmed@alqasimi.com",
    website: "www.alqasimi.com",
    shipmentRate: "110.00",
    cbm: "14.0",
    freightCost: "1540.00",
    currencyType: "EGP",
    status: "Active",
    date: new Date("2024-01-23"),
    loginId: "user009",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    id: "10",
    sn: "010",
    shipperCountry: "Iraq",
    shipperName: "Al-Sharqi Shipping",
    contactPerson: "Ali Al-Sharqi",
    mobileNo: "+964501234567",
    phoneNo: "+964114567890",
    faxNo: "+964114567891",
    email: "ali@alsharqi.com",
    website: "www.alsharqi.com",
    shipmentRate: "120.00",
    cbm: "15.0",
    freightCost: "1800.00",
    currencyType: "IQD",
    status: "Inactive",
    date: new Date("2024-01-24"),
    loginId: "user010",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    id: "11",
    sn: "011",
    shipperCountry: "Turkey",
    shipperName: "Al-Sabah Shipping",
    contactPerson: "Mehmet Al-Sabah",
    mobileNo: "+90501234567",
    phoneNo: "+90114567890",
    faxNo: "+90114567891",
    email: "mehmet@alsabah.com",
    website: "www.alsabah.com",
    shipmentRate: "100.00",
    cbm: "10.0",
    freightCost: "1000.00",
    currencyType: "TRY",
    status: "Active",
    date: new Date("2024-01-25"),
    loginId: "user011",
    isActive: true,
    isDeleted: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
  {
    id: "12",
    sn: "012",
    shipperCountry: "Iran",
    shipperName: "Al-Khalifa Shipping",
    contactPerson: "Mohammad Al-Khalifa",
    mobileNo: "+98501234567",
    phoneNo: "+98114567890",
    faxNo: "+98114567891",
    email: "mohammad@alkhalifa.com",
    website: "www.alkhalifa.com",
    shipmentRate: "110.00",
    cbm: "11.0",
    freightCost: "1100.00",
    currencyType: "IRR",
    status: "Inactive",
    date: new Date("2024-01-26"),
    loginId: "user012",
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

export default function ShippingGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Shipping grid rendered");

  const navigate = useNavigate();

  const [shippingDataState, setShippingDataState] = useState(shippingData);
  const canDelete: boolean = usePermission("shipping", "delete");
  const canRestore: boolean = usePermission("shipping", "restore");
  const canEdit: boolean = usePermission("shipping", "edit");

  // Debug permissions
  console.log("Shipping Permissions:", {
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

    const shipperCountries = [
      "Saudi Arabia",
      "UAE",
      "Kuwait",
      "Qatar",
      "Bahrain",
      "Oman",
      "Jordan",
      "Lebanon",
      "Egypt",
      "Iraq",
      "Turkey",
      "Iran",
    ];
    const shipperNames = [
      "Al-Rashid Shipping Co",
      "Al-Zahrani Enterprises",
      "Al-Otaibi Industries",
      "Al-Shehri Solutions",
      "Al-Ghamdi Trading",
      "Al-Harbi Corporation",
      "Al-Maktoum Trading",
      "Al-Nahyan Enterprises",
      "Al-Qasimi Trading",
      "Al-Sharqi Corporation",
      "Al-Sabah Trading",
      "Al-Khalifa Enterprises",
    ];
    const contactPersons = [
      "Ahmed Al-Rashid",
      "Mohammed Al-Zahrani",
      "Ali Al-Otaibi",
      "Youssef Al-Shehri",
      "Khaled Al-Ghamdi",
      "Faisal Al-Harbi",
      "Hassan Al-Maktoum",
      "Rami Al-Nahyan",
      "Ahmed Al-Qasimi",
      "Ali Al-Sharqi",
      "Mehmet Al-Sabah",
      "Mohammad Al-Khalifa",
    ];
    const mobileNos = [
      "+966501234567",
      "+971501234567",
      "+965501234567",
      "+974501234567",
      "+973501234567",
      "+968501234567",
      "+962501234567",
      "+961501234567",
      "+20501234567",
      "+964501234567",
      "+90501234567",
      "+98501234567",
    ];
    const phoneNos = [
      "+966114567890",
      "+971114567890",
      "+965114567890",
      "+974114567890",
      "+973114567890",
      "+968114567890",
      "+962114567890",
      "+961114567890",
      "+20114567890",
      "+964114567890",
      "+90114567890",
      "+98114567890",
    ];
    const faxNos = [
      "+966114567891",
      "+971114567891",
      "+965114567891",
      "+974114567891",
      "+973114567891",
      "+968114567891",
      "+962114567891",
      "+961114567891",
      "+20114567891",
      "+964114567891",
      "+90114567891",
      "+98114567891",
    ];
    const emails = [
      "ahmed@rashidshipping.com",
      "mohammed@alzahrani.com",
      "ali@alotaibi.com",
      "youssef@alshehri.com",
      "khaled@algamdi.com",
      "faisal@alharbi.com",
      "hassan@almaktoum.com",
      "rami@alnahyan.com",
      "ahmed@alqasimi.com",
      "ali@alsharqi.com",
      "mehmet@alsabah.com",
      "mohammad@alkhalifa.com",
    ];
    const websites = [
      "www.rashidshipping.com",
      "www.alzahrani.com",
      "www.alotaibi.com",
      "www.alshehri.com",
      "www.algamdi.com",
      "www.alharbi.com",
      "www.almaktoum.com",
      "www.alnahyan.com",
      "www.alqasimi.com",
      "www.alsharqi.com",
      "www.alsabah.com",
      "www.alkhalifa.com",
    ];
    const shipmentRates = [
      "150.00",
      "200.00",
      "100.00",
      "180.00",
      "120.00",
      "160.00",
      "140.00",
      "130.00",
      "110.00",
      "120.00",
      "100.00",
      "110.00",
    ];
    const cbms = [
      "25.5",
      "30.0",
      "15.0",
      "28.0",
      "20.0",
      "22.0",
      "18.0",
      "17.0",
      "14.0",
      "15.0",
      "10.0",
      "11.0",
    ];
    const freightCosts = [
      "3825.00",
      "4500.00",
      "1500.00",
      "4200.00",
      "2400.00",
      "3200.00",
      "2100.00",
      "1950.00",
      "1540.00",
      "1800.00",
      "1000.00",
      "1100.00",
    ];
    const currencyTypes = [
      "SAR",
      "AED",
      "KWD",
      "QAR",
      "BHD",
      "OMR",
      "JOD",
      "LBP",
      "EGP",
      "IQD",
      "TRY",
      "IRR",
    ];
    const statuses = ["Active", "Inactive"];
    const loginIds = [
      "user013",
      "user014",
      "user015",
      "user016",
      "user017",
      "user018",
    ];

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      sn: `${String(shippingDataState.length + index + 1).padStart(3, "0")}`,
      shipperCountry:
        shipperCountries[Math.floor(Math.random() * shipperCountries.length)],
      shipperName:
        shipperNames[Math.floor(Math.random() * shipperNames.length)],
      contactPerson:
        contactPersons[Math.floor(Math.random() * contactPersons.length)],
      mobileNo: mobileNos[Math.floor(Math.random() * mobileNos.length)],
      phoneNo: phoneNos[Math.floor(Math.random() * phoneNos.length)],
      faxNo: faxNos[Math.floor(Math.random() * faxNos.length)],
      email: emails[Math.floor(Math.random() * emails.length)],
      website: websites[Math.floor(Math.random() * websites.length)],
      shipmentRate:
        shipmentRates[Math.floor(Math.random() * shipmentRates.length)],
      cbm: cbms[Math.floor(Math.random() * cbms.length)],
      freightCost:
        freightCosts[Math.floor(Math.random() * freightCosts.length)],
      currencyType:
        currencyTypes[Math.floor(Math.random() * currencyTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(),
      loginId: loginIds[Math.floor(Math.random() * loginIds.length)],
      isActive: Math.random() > 0.3,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Stop loading more after reaching 50 items for demo
    if (shippingDataState.length >= 46) {
      setHasMore(false);
    } else {
      setShippingDataState((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [shippingDataState.length, isLoading, hasMore]);

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

  const handleDeleteClick = (shippingId: string) => {
    setShippingDataState((prevShippings) =>
      prevShippings.map((shipping) =>
        shipping.id === shippingId
          ? {
              ...shipping,
              isDeleted: shipping.isDeleted === true ? false : true,
            }
          : shipping
      )
    );
  };

  const handleRestoreClick = (shippingId: string) => {
    setShippingDataState((prevShippings) =>
      prevShippings.map((shipping) =>
        shipping.id === shippingId
          ? {
              ...shipping,
              isDeleted: shipping.isDeleted === true ? false : true,
            }
          : shipping
      )
    );
  };

  // Filter shipping records based on search query
  const filteredShipping = shippingDataState.filter(
    (shipping) =>
      shipping.sn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.shipperCountry
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      shipping.shipperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.contactPerson
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      shipping.mobileNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.phoneNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.shipmentRate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.cbm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.freightCost.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.currencyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipping.loginId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
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
          Total {shippingData.length} shipping records
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
            {filteredShipping.map((shipping, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/shipping/1`)}
                  >
                    {shipping.shipperName}
                  </CardTitle>

                  {/* Right - Status */}
                  <div className="flex justify-end">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        shipping.status
                      )}`}
                    >
                      {shipping.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: SN | Actions | Country */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* P.I.No */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      P.I.No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {shipping.sn}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        shipping.isDeleted && canRestore
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
                        disabled={shipping.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          shipping.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && shipping.isDeleted) {
                            handleRestoreClick(shipping.id);
                            toastRestore(
                              "Shipping record restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(shipping.id);
                              toastDelete(
                                "Shipping record deleted successfully"
                              );
                            }
                          }
                        }}
                      >
                        {shipping.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/shipping/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Invoice No */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 w-max">
                      Shipper Country
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {shipping.shipperCountry}
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
                  Loading more shipping records...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredShipping.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more shipping records to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={shippingData}
                setFilteredData={setShippingDataState}
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
                data={shippingData}
                setFilteredData={setShippingDataState}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
