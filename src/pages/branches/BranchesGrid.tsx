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

// Branch interface
interface BranchItem {
  id: string;
  code: string;
  branchName: string;
  taxNumber: string;
  phone: string;
  fax: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  bankDetails: string;
}

// Mock data - replace with real data from your API
const branches: BranchItem[] = [
  {
    id: "1",
    code: "BR-001",
    branchName: "Main Branch",
    taxNumber: "TX-123456789",
    phone: "+1-555-0100",
    fax: "+1-555-0101",
    mobile: "+1-555-0102",
    email: "main@company.com",
    website: "www.company.com",
    address: "123 Main Street",
    country: "United States",
    state: "California",
    city: "San Francisco",
    postCode: "94105",
    bankDetails: "Bank of America - 1234567890",
  },
  {
    id: "2",
    code: "BR-002",
    branchName: "Downtown Branch",
    taxNumber: "TX-987654321",
    phone: "+1-555-0200",
    fax: "+1-555-0201",
    mobile: "+1-555-0202",
    email: "downtown@company.com",
    website: "www.company.com",
    address: "456 Business Ave",
    country: "United States",
    state: "New York",
    city: "New York City",
    postCode: "10001",
    bankDetails: "Chase Bank - 9876543210",
  },
  {
    id: "3",
    code: "BR-003",
    branchName: "Westside Branch",
    taxNumber: "TX-456789123",
    phone: "+1-555-0300",
    fax: "+1-555-0301",
    mobile: "+1-555-0302",
    email: "westside@company.com",
    website: "www.company.com",
    address: "789 West Street",
    country: "United States",
    state: "Texas",
    city: "Austin",
    postCode: "73301",
    bankDetails: "Wells Fargo - 4567891230",
  },
  {
    id: "4",
    code: "BR-004",
    branchName: "North Branch",
    taxNumber: "TX-789123456",
    phone: "+1-555-0400",
    fax: "+1-555-0401",
    mobile: "+1-555-0402",
    email: "north@company.com",
    website: "www.company.com",
    address: "321 North Blvd",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    postCode: "98101",
    bankDetails: "US Bank - 7891234560",
  },
  {
    id: "5",
    code: "BR-005",
    branchName: "South Branch",
    taxNumber: "TX-321654987",
    phone: "+1-555-0500",
    fax: "+1-555-0501",
    mobile: "+1-555-0502",
    email: "south@company.com",
    website: "www.company.com",
    address: "654 South Road",
    country: "United States",
    state: "Florida",
    city: "Miami",
    postCode: "33101",
    bankDetails: "SunTrust - 3216549870",
  },
  {
    id: "6",
    code: "BR-006",
    branchName: "Central Branch",
    taxNumber: "TX-654987321",
    phone: "+1-555-0600",
    fax: "+1-555-0601",
    mobile: "+1-555-0602",
    email: "central@company.com",
    website: "www.company.com",
    address: "987 Central Plaza",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    postCode: "60601",
    bankDetails: "Fifth Third - 6549873210",
  },
  {
    id: "7",
    code: "BR-007",
    branchName: "East Branch",
    taxNumber: "TX-147258369",
    phone: "+1-555-0700",
    fax: "+1-555-0701",
    mobile: "+1-555-0702",
    email: "east@company.com",
    website: "www.company.com",
    address: "147 East Avenue",
    country: "United States",
    state: "Massachusetts",
    city: "Boston",
    postCode: "02101",
    bankDetails: "TD Bank - 1472583690",
  },
  {
    id: "8",
    code: "BR-008",
    branchName: "Mountain Branch",
    taxNumber: "TX-369258147",
    phone: "+1-555-0800",
    fax: "+1-555-0801",
    mobile: "+1-555-0802",
    email: "mountain@company.com",
    website: "www.company.com",
    address: "369 Mountain View",
    country: "United States",
    state: "Colorado",
    city: "Denver",
    postCode: "80201",
    bankDetails: "PNC Bank - 3692581470",
  },
  {
    id: "9",
    code: "BR-009",
    branchName: "Peachtree Branch",
    taxNumber: "TX-852741963",
    phone: "+1-555-0900",
    fax: "+1-555-0901",
    mobile: "+1-555-0902",
    email: "peachtree@company.com",
    website: "www.company.com",
    address: "852 Peachtree St",
    country: "United States",
    state: "Georgia",
    city: "Atlanta",
    postCode: "30301",
    bankDetails: "Regions Bank - 8527419630",
  },
  {
    id: "10",
    code: "BR-010",
    branchName: "Desert Branch",
    taxNumber: "TX-963741852",
    phone: "+1-555-1000",
    fax: "+1-555-1001",
    mobile: "+1-555-1002",
    email: "desert@company.com",
    website: "www.company.com",
    address: "963 Desert Way",
    country: "United States",
    state: "Arizona",
    city: "Phoenix",
    postCode: "85001",
    bankDetails: "BBVA - 9637418520",
  },
  {
    id: "11",
    code: "BR-011",
    branchName: "Pacific Branch",
    taxNumber: "TX-741852963",
    phone: "+1-555-1100",
    fax: "+1-555-1101",
    mobile: "+1-555-1102",
    email: "pacific@company.com",
    website: "www.company.com",
    address: "741 Pacific Blvd",
    country: "United States",
    state: "Oregon",
    city: "Portland",
    postCode: "97201",
    bankDetails: "KeyBank - 7418529630",
  },
  {
    id: "12",
    code: "BR-012",
    branchName: "Vegas Branch",
    taxNumber: "TX-159753486",
    phone: "+1-555-1200",
    fax: "+1-555-1201",
    mobile: "+1-555-1202",
    email: "vegas@company.com",
    website: "www.company.com",
    address: "159 Vegas Strip",
    country: "United States",
    state: "Nevada",
    city: "Las Vegas",
    postCode: "89101",
    bankDetails: "Zions Bank - 1597534860",
  },
  {
    id: "13",
    code: "BR-013",
    branchName: "Salt Lake Branch",
    taxNumber: "TX-486159753",
    phone: "+1-555-1300",
    fax: "+1-555-1301",
    mobile: "+1-555-1302",
    email: "saltlake@company.com",
    website: "www.company.com",
    address: "486 Salt Lake Dr",
    country: "United States",
    state: "Utah",
    city: "Salt Lake City",
    postCode: "84101",
    bankDetails: "First National - 4861597530",
  },
  {
    id: "14",
    code: "BR-014",
    branchName: "Music City Branch",
    taxNumber: "TX-753486159",
    phone: "+1-555-1400",
    fax: "+1-555-1401",
    mobile: "+1-555-1402",
    email: "musiccity@company.com",
    website: "www.company.com",
    address: "753 Music Row",
    country: "United States",
    state: "Tennessee",
    city: "Nashville",
    postCode: "37201",
    bankDetails: "First Horizon - 7534861590",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function BranchesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Branches grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [branchesData, setBranchesData] = useState<BranchItem[]>(branches);
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
      "BR-015",
      "BR-016",
      "BR-017",
      "BR-018",
      "BR-019",
      "BR-020",
      "BR-021",
      "BR-022",
      "BR-023",
      "BR-024",
    ];
    const branchNames = [
      "Alpha Branch",
      "Beta Branch",
      "Gamma Branch",
      "Delta Branch",
      "Epsilon Branch",
      "Zeta Branch",
      "Eta Branch",
      "Theta Branch",
      "Iota Branch",
      "Kappa Branch",
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
    const faxes = [
      "+1-555-1501",
      "+1-555-1601",
      "+1-555-1701",
      "+1-555-1801",
      "+1-555-1901",
      "+1-555-2001",
      "+1-555-2101",
      "+1-555-2201",
      "+1-555-2301",
      "+1-555-2401",
    ];
    const mobiles = [
      "+1-555-1502",
      "+1-555-1602",
      "+1-555-1702",
      "+1-555-1802",
      "+1-555-1902",
      "+1-555-2002",
      "+1-555-2102",
      "+1-555-2202",
      "+1-555-2302",
      "+1-555-2402",
    ];
    const emails = [
      "alpha@company.com",
      "beta@company.com",
      "gamma@company.com",
      "delta@company.com",
      "epsilon@company.com",
      "zeta@company.com",
      "eta@company.com",
      "theta@company.com",
      "iota@company.com",
      "kappa@company.com",
    ];
    const websites = [
      "www.company.com",
      "www.company.com",
      "www.company.com",
      "www.company.com",
      "www.company.com",
      "www.company.com",
      "www.company.com",
      "www.company.com",
      "www.company.com",
      "www.company.com",
    ];
    const addresses = [
      "100 Alpha Street",
      "200 Beta Avenue",
      "300 Gamma Road",
      "400 Delta Boulevard",
      "500 Epsilon Lane",
      "600 Zeta Drive",
      "700 Eta Court",
      "800 Theta Place",
      "900 Iota Way",
      "1000 Kappa Circle",
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
    const postCodes = [
      "10001",
      "20002",
      "30003",
      "40004",
      "50005",
      "60006",
      "70007",
      "80008",
      "90009",
      "10010",
    ];
    const bankDetails = [
      "Bank of America - 1112223330",
      "Chase Bank - 4445556660",
      "Wells Fargo - 7778889990",
      "US Bank - 0001112220",
      "PNC Bank - 3334445550",
      "TD Bank - 6667778880",
      "Fifth Third - 9990001110",
      "Regions Bank - 2223334440",
      "BBVA - 5556667770",
      "KeyBank - 8889990000",
    ];

    const newItems: BranchItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const code = codes[Math.floor(Math.random() * codes.length)];
        const branchName =
          branchNames[Math.floor(Math.random() * branchNames.length)];
        const taxNumber =
          taxNumbers[Math.floor(Math.random() * taxNumbers.length)];
        const phone = phones[Math.floor(Math.random() * phones.length)];
        const fax = faxes[Math.floor(Math.random() * faxes.length)];
        const mobile = mobiles[Math.floor(Math.random() * mobiles.length)];
        const email = emails[Math.floor(Math.random() * emails.length)];
        const website = websites[Math.floor(Math.random() * websites.length)];
        const address = addresses[Math.floor(Math.random() * addresses.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const postCode =
          postCodes[Math.floor(Math.random() * postCodes.length)];
        const bankDetail =
          bankDetails[Math.floor(Math.random() * bankDetails.length)];

        return {
          id: `${Date.now()}-${index}`,
          code,
          branchName,
          taxNumber,
          phone,
          fax,
          mobile,
          email,
          website,
          address,
          country,
          state,
          city,
          postCode,
          bankDetails: bankDetail,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (branchesData.length >= 46) {
      setHasMore(false);
    } else {
      setBranchesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [branchesData.length, isLoading, hasMore]);

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

  // Filter branches based on search query (search across multiple fields)
  const filteredBranches = branchesData.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.taxNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fax.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.postCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bankDetails.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (branchId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/branches/view/${branchId}?fromView=${viewMode}`);
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
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 2-3 columns for better height management
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
            )}
          >
            {filteredBranches.map((item, index) => {
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
                  {/* Branch Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.branchName}
                    </CardTitle>
                  </div>

                  {/* Branch Information - Organized in 2 columns for better space usage */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Code:</span>
                      <span className="truncate">{item.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Tax Number:</span>
                      <span className="truncate">{item.taxNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span className="truncate">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Fax:</span>
                      <span className="truncate">{item.fax}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Mobile:</span>
                      <span className="truncate">{item.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{item.email}</span>
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
                      <span className="font-medium">Post Code:</span>
                      <span className="truncate">{item.postCode}</span>
                    </div>
                    <div className="col-span-2 flex items-start gap-2">
                      <span className="font-medium">Address:</span>
                      <span className="truncate">{item.address}</span>
                    </div>
                    <div className="col-span-2 flex items-start gap-2">
                      <span className="font-medium">Bank Details:</span>
                      <span className="truncate">{item.bankDetails}</span>
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
                <span className="text-sm">Loading more branches...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredBranches.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more branches to load
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
                data={branches}
                setFilteredData={setBranchesData}
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
                data={branches}
                setFilteredData={setBranchesData}
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
