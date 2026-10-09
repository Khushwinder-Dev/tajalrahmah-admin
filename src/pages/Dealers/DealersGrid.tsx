import { Card, CardTitle } from "@/components/ui/card";
// import { toastDelete, toastRestore } from "@/lib/toast";
// import { Tooltip } from "@mantine/core";
// import { RefreshCw, Trash2, Check, Pause } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { Shield, User, Crown } from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Dealer interface
interface DealerItem {
  id: string;
  customerNo: string;
  customerName: string;
  shortName: string;
  vatNumber: string;
  vendorCode: string;
  currency: string;
  phone: string;
  fax: string;
  mobile: string;
  whatsapp: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  address: string;
  email: string;
  website: string;
  language: string;
  locationUrl: string;
  paymentMode: string;
}

// Mock data - replace with real data from your API
const dealers: DealerItem[] = [
  {
    id: "1",
    customerNo: "CUST001",
    customerName: "Tech Solutions Ltd",
    shortName: "TechSol",
    vatNumber: "VAT123456789",
    vendorCode: "VEND001",
    currency: "USD",
    phone: "+1-555-0123",
    fax: "+1-555-0124",
    mobile: "+1-555-0125",
    whatsapp: "+1-555-0125",
    country: "United States",
    state: "California",
    city: "San Francisco",
    postCode: "94105",
    address: "123 Market Street, Suite 100",
    email: "info@techsolutions.com",
    website: "www.techsolutions.com",
    language: "English",
    locationUrl: "https://maps.google.com/techsolutions",
    paymentMode: "Credit Card",
  },
  {
    id: "2",
    customerNo: "CUST002",
    customerName: "Global Electronics Inc",
    shortName: "GlobalElec",
    vatNumber: "VAT987654321",
    vendorCode: "VEND002",
    currency: "EUR",
    phone: "+44-20-7946-0958",
    fax: "+44-20-7946-0959",
    mobile: "+44-7700-900123",
    whatsapp: "+44-7700-900123",
    country: "United Kingdom",
    state: "England",
    city: "London",
    postCode: "SW1A 1AA",
    address: "10 Downing Street",
    email: "contact@globalelectronics.co.uk",
    website: "www.globalelectronics.co.uk",
    language: "English",
    locationUrl: "https://maps.google.com/globalelectronics",
    paymentMode: "Bank Transfer",
  },
  {
    id: "3",
    customerNo: "CUST003",
    customerName: "Digital Innovations GmbH",
    shortName: "DigitalInno",
    vatNumber: "VAT456789123",
    vendorCode: "VEND003",
    currency: "EUR",
    phone: "+49-30-12345678",
    fax: "+49-30-12345679",
    mobile: "+49-170-1234567",
    whatsapp: "+49-170-1234567",
    country: "Germany",
    state: "Berlin",
    city: "Berlin",
    postCode: "10115",
    address: "Unter den Linden 1",
    email: "info@digitalinnovations.de",
    website: "www.digitalinnovations.de",
    language: "German",
    locationUrl: "https://maps.google.com/digitalinnovations",
    paymentMode: "PayPal",
  },
  {
    id: "4",
    customerNo: "CUST004",
    customerName: "Asia Pacific Trading Co",
    shortName: "AsiaPac",
    vatNumber: "VAT789123456",
    vendorCode: "VEND004",
    currency: "JPY",
    phone: "+81-3-1234-5678",
    fax: "+81-3-1234-5679",
    mobile: "+81-90-1234-5678",
    whatsapp: "+81-90-1234-5678",
    country: "Japan",
    state: "Tokyo",
    city: "Tokyo",
    postCode: "100-0001",
    address: "1-1-1 Marunouchi, Chiyoda-ku",
    email: "sales@asiapacific.co.jp",
    website: "www.asiapacific.co.jp",
    language: "Japanese",
    locationUrl: "https://maps.google.com/asiapacific",
    paymentMode: "Wire Transfer",
  },
  {
    id: "5",
    customerNo: "CUST005",
    customerName: "Middle East Distributors",
    shortName: "MEDist",
    vatNumber: "VAT321654987",
    vendorCode: "VEND005",
    currency: "AED",
    phone: "+971-4-123-4567",
    fax: "+971-4-123-4568",
    mobile: "+971-50-123-4567",
    whatsapp: "+971-50-123-4567",
    country: "UAE",
    state: "Dubai",
    city: "Dubai",
    postCode: "00000",
    address: "Sheikh Zayed Road, Business Bay",
    email: "info@medistributors.ae",
    website: "www.medistributors.ae",
    language: "Arabic",
    locationUrl: "https://maps.google.com/medistributors",
    paymentMode: "Cash",
  },
  {
    id: "6",
    customerNo: "CUST006",
    customerName: "European Tech Partners",
    shortName: "EuroTech",
    vatNumber: "VAT654321987",
    vendorCode: "VEND006",
    currency: "EUR",
    phone: "+33-1-42-86-83-26",
    fax: "+33-1-42-86-83-27",
    mobile: "+33-6-12-34-56-78",
    whatsapp: "+33-6-12-34-56-78",
    country: "France",
    state: "Île-de-France",
    city: "Paris",
    postCode: "75001",
    address: "1 Place du Louvre",
    email: "contact@eurotech.fr",
    website: "www.eurotech.fr",
    language: "French",
    locationUrl: "https://maps.google.com/eurotech",
    paymentMode: "Credit Card",
  },
  {
    id: "7",
    customerNo: "CUST007",
    customerName: "North American Systems",
    shortName: "NASys",
    vatNumber: "VAT147258369",
    vendorCode: "VEND007",
    currency: "CAD",
    phone: "+1-416-555-0123",
    fax: "+1-416-555-0124",
    mobile: "+1-416-555-0125",
    whatsapp: "+1-416-555-0125",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    postCode: "M5H 2N2",
    address: "100 King Street West",
    email: "info@nasystems.ca",
    website: "www.nasystems.ca",
    language: "English",
    locationUrl: "https://maps.google.com/nasystems",
    paymentMode: "Bank Transfer",
  },
  {
    id: "8",
    customerNo: "CUST008",
    customerName: "South American Ventures",
    shortName: "SAVentures",
    vatNumber: "VAT369258147",
    vendorCode: "VEND008",
    currency: "BRL",
    phone: "+55-11-1234-5678",
    fax: "+55-11-1234-5679",
    mobile: "+55-11-99999-1234",
    whatsapp: "+55-11-99999-1234",
    country: "Brazil",
    state: "São Paulo",
    city: "São Paulo",
    postCode: "01310-100",
    address: "Av. Paulista, 1000",
    email: "contato@saventures.com.br",
    website: "www.saventures.com.br",
    language: "Portuguese",
    locationUrl: "https://maps.google.com/saventures",
    paymentMode: "PIX",
  },
  {
    id: "9",
    customerNo: "CUST009",
    customerName: "African Tech Solutions",
    shortName: "AfriTech",
    vatNumber: "VAT852741963",
    vendorCode: "VEND009",
    currency: "ZAR",
    phone: "+27-11-123-4567",
    fax: "+27-11-123-4568",
    mobile: "+27-82-123-4567",
    whatsapp: "+27-82-123-4567",
    country: "South Africa",
    state: "Gauteng",
    city: "Johannesburg",
    postCode: "2000",
    address: "1 Nelson Mandela Square",
    email: "info@afritech.co.za",
    website: "www.afritech.co.za",
    language: "English",
    locationUrl: "https://maps.google.com/afritech",
    paymentMode: "EFT",
  },
  {
    id: "10",
    customerNo: "CUST010",
    customerName: "Oceanic Electronics",
    shortName: "OceanElec",
    vatNumber: "VAT963852741",
    vendorCode: "VEND010",
    currency: "AUD",
    phone: "+61-2-1234-5678",
    fax: "+61-2-1234-5679",
    mobile: "+61-4-1234-5678",
    whatsapp: "+61-4-1234-5678",
    country: "Australia",
    state: "New South Wales",
    city: "Sydney",
    postCode: "2000",
    address: "1 Martin Place",
    email: "sales@oceanicelectronics.com.au",
    website: "www.oceanicelectronics.com.au",
    language: "English",
    locationUrl: "https://maps.google.com/oceanicelectronics",
    paymentMode: "Credit Card",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function DealersGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Dealers grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [dealersData, setDealersData] = useState<DealerItem[]>(dealers);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

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

    const companyNames = [
      "Tech Solutions Ltd",
      "Global Electronics Inc",
      "Digital Innovations GmbH",
      "Asia Pacific Trading Co",
      "Middle East Distributors",
      "European Tech Partners",
      "North American Systems",
      "South American Ventures",
      "African Tech Solutions",
      "Oceanic Electronics",
      "Innovation Hub",
      "Smart Systems Co",
      "Future Tech Ltd",
      "Digital Dynamics",
      "Tech Pioneers",
      "NextGen Solutions",
      "Cyber Systems",
      "Data Flow Inc",
      "Cloud Technologies",
      "AI Solutions Co",
    ];
    const countries = [
      "United States",
      "United Kingdom",
      "Germany",
      "Japan",
      "UAE",
      "France",
      "Canada",
      "Brazil",
      "South Africa",
      "Australia",
    ];
    const currencies = [
      "USD",
      "EUR",
      "JPY",
      "AED",
      "CAD",
      "BRL",
      "ZAR",
      "AUD",
      "GBP",
      "CHF",
    ];
    const paymentModes = [
      "Credit Card",
      "Bank Transfer",
      "PayPal",
      "Wire Transfer",
      "Cash",
      "PIX",
      "EFT",
      "Check",
    ];
    const languages = [
      "English",
      "German",
      "Japanese",
      "Arabic",
      "French",
      "Portuguese",
      "Spanish",
      "Italian",
    ];

    const newItems: DealerItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const companyName =
          companyNames[Math.floor(Math.random() * companyNames.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const currency =
          currencies[Math.floor(Math.random() * currencies.length)];
        const paymentMode =
          paymentModes[Math.floor(Math.random() * paymentModes.length)];
        const language =
          languages[Math.floor(Math.random() * languages.length)];

        return {
          id: `${Date.now()}-${index}`,
          customerNo: `CUST${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          customerName: companyName,
          shortName: companyName
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .substring(0, 8),
          vatNumber: `VAT${Math.floor(Math.random() * 1000000000)}`,
          vendorCode: `VEND${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          currency: currency,
          phone: `+${Math.floor(Math.random() * 99) + 1}-${Math.floor(
            Math.random() * 999
          )}-${Math.floor(Math.random() * 999)}-${Math.floor(
            Math.random() * 9999
          )}`,
          fax: `+${Math.floor(Math.random() * 99) + 1}-${Math.floor(
            Math.random() * 999
          )}-${Math.floor(Math.random() * 999)}-${Math.floor(
            Math.random() * 9999
          )}`,
          mobile: `+${Math.floor(Math.random() * 99) + 1}-${Math.floor(
            Math.random() * 999
          )}-${Math.floor(Math.random() * 999)}-${Math.floor(
            Math.random() * 9999
          )}`,
          whatsapp: `+${Math.floor(Math.random() * 99) + 1}-${Math.floor(
            Math.random() * 999
          )}-${Math.floor(Math.random() * 999)}-${Math.floor(
            Math.random() * 9999
          )}`,
          country: country,
          state: "State",
          city: "City",
          postCode: Math.floor(Math.random() * 99999)
            .toString()
            .padStart(5, "0"),
          address: `${Math.floor(Math.random() * 9999) + 1} Main Street`,
          email: `info@${companyName.toLowerCase().replace(/\s+/g, "")}.com`,
          website: `www.${companyName.toLowerCase().replace(/\s+/g, "")}.com`,
          language: language,
          locationUrl: `https://maps.google.com/${companyName
            .toLowerCase()
            .replace(/\s+/g, "")}`,
          paymentMode: paymentMode,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (dealersData.length >= 46) {
      setHasMore(false);
    } else {
      setDealersData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [dealersData.length, isLoading, hasMore]);

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

  // Filter dealers based on search query (search across multiple fields)
  const filteredDealers = dealersData.filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vatNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (dealerId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/dealers/view/${dealerId}?fromView=${viewMode}`);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg overflow-hidden"
      )}
    >
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Cards container with animated width */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-y-auto grid-scroll transition-all duration-300 ease-in-out",
            isRTL ? "" : ""
          )}
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div
            className={cn(
              "grid gap-6 pb-4 p-5",
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {filteredDealers.map((item, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(item.id)}
                >
                  {/* Dealer Header with Name */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.customerName}
                    </CardTitle>
                  </div>

                  {/* Dealer Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Customer No:</span>
                      <span className="truncate font-mono">
                        {item.customerNo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Short Name:</span>
                      <span className="truncate">{item.shortName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Country:</span>
                      <span className="truncate">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Currency:</span>
                      <span className="truncate">{item.currency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span className="truncate">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate text-blue-600 dark:text-blue-400">
                        {item.email}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.address}, {item.city}, {item.state} {item.postCode}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more dealers...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredDealers.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more dealers to load
              </span>
            </div>
          )}
        </div>

        {/* Animated Filter Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isFilterOpen
              ? "translate-x-0 opacity-100 visible"
              : isRTL
              ? "-translate-x-full opacity-0 invisible"
              : "translate-x-full opacity-0 invisible"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={dealers}
                setFilteredData={setDealersData}
                setShowTabs={setIsFilterOpen}
                defaultTab="filter"
              />
            </div>
          </div>
        </div>

        {/* Animated Export Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isExportOpen
              ? "translate-x-0 opacity-100"
              : isRTL
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={dealers}
                setFilteredData={setDealersData}
                setShowTabs={setIsExportOpen}
                defaultTab="export"
              />
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile/smaller screens */}
        {(isFilterOpen || isExportOpen) && (
          <div
            className={cn(
              "fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out z-5",
              isMobile ? "" : "md:hidden", // Always show overlay on mobile
              isFilterOpen || isExportOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => {
              setIsFilterOpen(false);
              setIsExportOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
