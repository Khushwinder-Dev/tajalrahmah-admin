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

// Company interface
interface CompanyItem {
  id: string;
  code: string;
  companyName: string;
  taxNumber: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  state: string;
  city: string;
  currency: string;
  timezone: string;
  dateFormat: string;
}

// Mock data - replace with real data from your API
const companies: CompanyItem[] = [
  {
    id: "1",
    code: "COM-001",
    companyName: "TechCorp Solutions",
    taxNumber: "TX-123456789",
    email: "info@techcorp.com",
    phone: "+1-555-0100",
    website: "www.techcorp.com",
    country: "United States",
    state: "California",
    city: "San Francisco",
    currency: "USD",
    timezone: "PST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "2",
    code: "COM-002",
    companyName: "Global Industries Ltd",
    taxNumber: "TX-987654321",
    email: "contact@globalind.com",
    phone: "+1-555-0200",
    website: "www.globalind.com",
    country: "United States",
    state: "New York",
    city: "New York City",
    currency: "USD",
    timezone: "EST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "3",
    code: "COM-003",
    companyName: "Innovation Systems Inc",
    taxNumber: "TX-456789123",
    email: "hello@innovationsys.com",
    phone: "+1-555-0300",
    website: "www.innovationsys.com",
    country: "United States",
    state: "Texas",
    city: "Austin",
    currency: "USD",
    timezone: "CST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "4",
    code: "COM-004",
    companyName: "Digital Dynamics Corp",
    taxNumber: "TX-789123456",
    email: "support@digitaldyn.com",
    phone: "+1-555-0400",
    website: "www.digitaldyn.com",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    currency: "USD",
    timezone: "PST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "5",
    code: "COM-005",
    companyName: "Future Technologies LLC",
    taxNumber: "TX-321654987",
    email: "info@futuretech.com",
    phone: "+1-555-0500",
    website: "www.futuretech.com",
    country: "United States",
    state: "Florida",
    city: "Miami",
    currency: "USD",
    timezone: "EST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "6",
    code: "COM-006",
    companyName: "Smart Solutions Group",
    taxNumber: "TX-654987321",
    email: "contact@smartsol.com",
    phone: "+1-555-0600",
    website: "www.smartsol.com",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    currency: "USD",
    timezone: "CST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "7",
    code: "COM-007",
    companyName: "Advanced Systems Co",
    taxNumber: "TX-147258369",
    email: "admin@advancedsys.com",
    phone: "+1-555-0700",
    website: "www.advancedsys.com",
    country: "United States",
    state: "Massachusetts",
    city: "Boston",
    currency: "USD",
    timezone: "EST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "8",
    code: "COM-008",
    companyName: "NextGen Enterprises",
    taxNumber: "TX-369258147",
    email: "info@nextgenent.com",
    phone: "+1-555-0800",
    website: "www.nextgenent.com",
    country: "United States",
    state: "Colorado",
    city: "Denver",
    currency: "USD",
    timezone: "MST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "9",
    code: "COM-009",
    companyName: "Elite Business Solutions",
    taxNumber: "TX-852741963",
    email: "support@elitebiz.com",
    phone: "+1-555-0900",
    website: "www.elitebiz.com",
    country: "United States",
    state: "Georgia",
    city: "Atlanta",
    currency: "USD",
    timezone: "EST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "10",
    code: "COM-010",
    companyName: "Premier Tech Services",
    taxNumber: "TX-963741852",
    email: "hello@premiertech.com",
    phone: "+1-555-1000",
    website: "www.premiertech.com",
    country: "United States",
    state: "Arizona",
    city: "Phoenix",
    currency: "USD",
    timezone: "MST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "11",
    code: "COM-011",
    companyName: "Strategic Innovations",
    taxNumber: "TX-741852963",
    email: "contact@strategicinn.com",
    phone: "+1-555-1100",
    website: "www.strategicinn.com",
    country: "United States",
    state: "Oregon",
    city: "Portland",
    currency: "USD",
    timezone: "PST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "12",
    code: "COM-012",
    companyName: "Dynamic Solutions Inc",
    taxNumber: "TX-159753486",
    email: "info@dynamicsol.com",
    phone: "+1-555-1200",
    website: "www.dynamicsol.com",
    country: "United States",
    state: "Nevada",
    city: "Las Vegas",
    currency: "USD",
    timezone: "PST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "13",
    code: "COM-013",
    companyName: "Progressive Technologies",
    taxNumber: "TX-486159753",
    email: "admin@progtech.com",
    phone: "+1-555-1300",
    website: "www.progtech.com",
    country: "United States",
    state: "Utah",
    city: "Salt Lake City",
    currency: "USD",
    timezone: "MST",
    dateFormat: "MM/DD/YYYY",
  },
  {
    id: "14",
    code: "COM-014",
    companyName: "Modern Systems Group",
    taxNumber: "TX-753486159",
    email: "support@modernsys.com",
    phone: "+1-555-1400",
    website: "www.modernsys.com",
    country: "United States",
    state: "Tennessee",
    city: "Nashville",
    currency: "USD",
    timezone: "CST",
    dateFormat: "MM/DD/YYYY",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function CompaniesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Companies grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [companiesData, setCompaniesData] = useState<CompanyItem[]>(companies);
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

    const codes = [
      "COM-015",
      "COM-016",
      "COM-017",
      "COM-018",
      "COM-019",
      "COM-020",
      "COM-021",
      "COM-022",
      "COM-023",
      "COM-024",
    ];
    const companyNames = [
      "Alpha Technologies",
      "Beta Solutions Inc",
      "Gamma Systems LLC",
      "Delta Enterprises",
      "Epsilon Corp",
      "Zeta Industries",
      "Eta Technologies",
      "Theta Solutions",
      "Iota Systems",
      "Kappa Group",
    ];
    const taxNumbers = [
      "TX-111222333",
      "TX-444555666",
      "TX-777888999",
      "TX-000111222",
      "TX-333444555",
      "TX-666777888",
      "TX-999000111",
      "TX-222333444",
      "TX-555666777",
      "TX-888999000",
    ];
    const emails = [
      "info@alphatech.com",
      "contact@betasol.com",
      "hello@gammasys.com",
      "support@deltaent.com",
      "admin@epsiloncorp.com",
      "info@zetaind.com",
      "contact@etatech.com",
      "hello@thetasol.com",
      "support@iotasys.com",
      "admin@kappagroup.com",
    ];
    const phones = [
      "+1-555-1500",
      "+1-555-1600",
      "+1-555-1700",
      "+1-555-1800",
      "+1-555-1900",
      "+1-555-2000",
      "+1-555-2100",
      "+1-555-2200",
      "+1-555-2300",
      "+1-555-2400",
    ];
    const websites = [
      "www.alphatech.com",
      "www.betasol.com",
      "www.gammasys.com",
      "www.deltaent.com",
      "www.epsiloncorp.com",
      "www.zetaind.com",
      "www.etatech.com",
      "www.thetasol.com",
      "www.iotasys.com",
      "www.kappagroup.com",
    ];
    const countries = [
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "France",
      "Australia",
      "Japan",
      "Brazil",
      "India",
      "Mexico",
    ];
    const states = [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Pennsylvania",
      "Illinois",
      "Ohio",
      "Georgia",
      "North Carolina",
      "Michigan",
    ];
    const cities = [
      "Los Angeles",
      "Houston",
      "Jacksonville",
      "New York City",
      "Philadelphia",
      "Chicago",
      "Columbus",
      "Atlanta",
      "Charlotte",
      "Detroit",
    ];
    const currencies = [
      "USD",
      "CAD",
      "GBP",
      "EUR",
      "AUD",
      "JPY",
      "BRL",
      "INR",
      "MXN",
      "CHF",
    ];
    const timezones = [
      "PST",
      "CST",
      "EST",
      "MST",
      "GMT",
      "CET",
      "JST",
      "BRT",
      "IST",
      "CST",
    ];
    const dateFormats = [
      "MM/DD/YYYY",
      "DD/MM/YYYY",
      "YYYY-MM-DD",
      "DD-MM-YYYY",
      "MM-DD-YYYY",
      "YYYY/MM/DD",
      "DD.MM.YYYY",
      "MM.DD.YYYY",
      "YYYY.MM.DD",
      "DD/MM/YY",
    ];

    const newItems: CompanyItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const companyName =
          companyNames[Math.floor(Math.random() * companyNames.length)];
        const taxNumber =
          taxNumbers[Math.floor(Math.random() * taxNumbers.length)];
        const email = emails[Math.floor(Math.random() * emails.length)];
        const phone = phones[Math.floor(Math.random() * phones.length)];
        const website = websites[Math.floor(Math.random() * websites.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const currency =
          currencies[Math.floor(Math.random() * currencies.length)];
        const timezone =
          timezones[Math.floor(Math.random() * timezones.length)];
        const dateFormat =
          dateFormats[Math.floor(Math.random() * dateFormats.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          companyName,
          taxNumber,
          email,
          phone,
          website,
          country,
          state,
          city,
          currency,
          timezone,
          dateFormat,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (companiesData.length >= 46) {
      setHasMore(false);
    } else {
      setCompaniesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [companiesData.length, isLoading, hasMore]);

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

  // Filter companies based on search query (search across multiple fields)
  const filteredCompanies = companiesData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.taxNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.timezone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dateFormat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (companyId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/companies/view/${companyId}?fromView=${viewMode}`);
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
            {filteredCompanies.map((item, index) => {
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
                  {/* Company Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.companyName}
                    </CardTitle>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Tax Number:</span>
                      <span className="truncate">{item.taxNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span className="truncate">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Website:</span>
                      <span className="truncate">{item.website}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Country:</span>
                      <span className="truncate">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">State:</span>
                      <span className="truncate">{item.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">City:</span>
                      <span className="truncate">{item.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Currency:</span>
                      <span className="truncate">{item.currency}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Timezone:</span>
                      <span className="truncate">{item.timezone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Date Format:</span>
                      <span className="truncate">{item.dateFormat}</span>
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
                <span className="text-sm">Loading more companies...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredCompanies.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more companies to load
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
                data={companies}
                setFilteredData={setCompaniesData}
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
                data={companies}
                setFilteredData={setCompaniesData}
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
