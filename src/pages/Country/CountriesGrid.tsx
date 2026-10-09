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
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Mock data - replace with real data from your API
const countries = [
  {
    id: "1",
    name: "United States",
    code: "US",
    continent: "North America",
    population: "331 million",
    currency: "USD",
    status: "Active",
    isDeleted: false,
    isd: "+1",
  },
  {
    id: "2",
    name: "Canada",
    code: "CA",
    continent: "North America",
    population: "38 million",
    currency: "CAD",
    status: "Active",
    isDeleted: false,
    isd: "+1",
  },
  {
    id: "3",
    name: "Japan",
    code: "JP",
    continent: "Asia",
    population: "125 million",
    currency: "JPY",
    status: "Inactive",
    isDeleted: false,
    isd: "+81",
  },
  {
    id: "4",
    name: "Germany",
    code: "DE",
    continent: "Europe",
    population: "83 million",
    currency: "EUR",
    status: "Active",
    isDeleted: false,
    isd: "+49",
  },
  {
    id: "5",
    name: "France",
    code: "FR",
    continent: "Europe",
    population: "68 million",
    currency: "EUR",
    status: "Draft",
    isDeleted: false,
    isd: "+33",
  },
  {
    id: "6",
    name: "Italy",
    code: "IT",
    continent: "Europe",
    population: "60 million",
    currency: "EUR",
    status: "Active",
    isDeleted: false,
    isd: "+39",
  },
  {
    id: "7",
    name: "Spain",
    code: "ES",
    continent: "Europe",
    population: "47 million",
    currency: "EUR",
    status: "Active",
    isDeleted: false,
    isd: "+34",
  },
  {
    id: "8",
    name: "Portugal",
    code: "PT",
    continent: "Europe",
    population: "10 million",
    currency: "EUR",
    status: "Inactive",
    isDeleted: false,
    isd: "+351",
  },
  {
    id: "9",
    name: "Switzerland",
    code: "CH",
    status: "Active",
    continent: "Europe",
    population: "9 million",
    currency: "CHF",
    isDeleted: false,
    isd: "+41",
  },
  {
    id: "10",
    name: "Netherlands",
    code: "NL",
    status: "Active",
    continent: "Europe",
    population: "17 million",
    currency: "EUR",
    isDeleted: false,
    isd: "+31",
  },
  {
    id: "11",
    name: "Belgium",
    code: "BE",
    status: "Active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
    isd: "+32",
  },
  {
    id: "12",
    name: "Belgium",
    code: "BE",
    status: "Active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
    isd: "+32",
  },
  {
    id: "13",
    name: "Belgium",
    code: "BE",
    status: "Active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
    isd: "+32",
  },
  {
    id: "14",
    name: "United Kingdom",
    code: "GB",
    status: "Active",
    continent: "Europe",
    population: "67 million",
    currency: "GBP",
    isDeleted: false,
    isd: "+44",
  },
  {
    id: "15",
    name: "Belgium",
    code: "BE",
    status: "Active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
    isd: "+32",
  },
  {
    id: "16",
    name: "Belgium",
    code: "BE",
    status: "Active",
    continent: "Europe",
    population: "11 million",
    currency: "EUR",
    isDeleted: false,
    isd: "+32",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function CountriesGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Countries grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [countriesData, setCountriesData] = useState(countries);
  // const canDelete: boolean = usePermission("countries", "delete");
  // const canRestore: boolean = usePermission("countries", "restore");
  // const canEdit: boolean = usePermission("countries", "edit");

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

    const continents = [
      "Europe",
      "Asia",
      "Africa",
      "North America",
      "South America",
      "Oceania",
    ];
    const statuses = ["Active", "Inactive", "Draft"];
    const isdCodes = [
      "+1",
      "+44",
      "+49",
      "+33",
      "+39",
      "+34",
      "+351",
      "+41",
      "+31",
      "+32",
    ];
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: `Country ${countriesData.length + index + 1}`,
      code: `C${(countriesData.length + index + 1)
        .toString()
        .padStart(2, "0")}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      continent: continents[Math.floor(Math.random() * continents.length)],
      population: `${Math.floor(Math.random() * 100 + 1)} million`,
      currency: "USD",
      isDeleted: false,
      isd: isdCodes[Math.floor(Math.random() * isdCodes.length)],
    }));

    // Stop loading more after reaching 50 items for demo
    if (countriesData.length >= 46) {
      setHasMore(false);
    } else {
      setCountriesData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [countriesData.length, isLoading, hasMore]);

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

  // const handleDeleteClick = (countryId: string) => {
  //   setCountriesData((prevCountries) =>
  //     prevCountries.map((country) =>
  //       country.id === countryId
  //         ? {
  //             ...country,
  //             isDeleted: country.isDeleted === true ? false : true,
  //           }
  //         : country
  //     )
  //   );
  // };

  // const handleRestoreClick = (countryId: stringId) => {
  //   setCountriesData((prevCountries) =>
  //     prevCountries.map((country) =>
  //       country.id === countryId
  //         ? {
  //             ...country,
  //             isDeleted: country.isDeleted === true ? false : true,
  //           }
  //         : country
  //     )
  //   );
  // };

  // const handleActiveInactiveClick = (countryId: string) => {
  //   setCountriesData((prevCountries) =>
  //     prevCountries.map((country) =>
  //       country.id === countryId
  //         ? {
  //             ...country,
  //             status: country.status === "Active" ? "Inactive" : "Active",
  //           }
  //         : country
  //     )
  //   );
  // };

  // Filter countries based on search query
  const filteredCountries = countriesData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.continent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (countryId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/countries/edit/${countryId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (countryId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/countries/view/${countryId}?fromView=${viewMode}`);
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
            {filteredCountries.map((country, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col items-start gap-5 cursor-pointer",
                  // Different hover effects for mobile vs desktop
                  isMobile
                    ? "hover:shadow-lg hover:border-primary"
                    : "hover:scale-110 hover:z-50 hover:relative hover:border-primary min-w-[250px]"
                )}
                onClick={() => handleViewClick(country.id)}
              >
                {/* Top Row - Title and Flag */}
                <div className="grid grid-cols-2 items-center gap-2 w-full mt-[-8px]">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-base font-normal transition-colors truncate"
                    style={{ fontSize: "18px" }}
                  >
                    {country.name}
                  </CardTitle>

                  {/* Right - Flag */}
                  <div className="flex justify-end">
                    <img
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={`${country.name} flag`}
                      className="h-12 w-16 object-cover border rounded-md shadow-sm flex-shrink-0"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://flagcdn.com/us.svg`;
                      }}
                    />
                  </div>
                </div>

                {/* Middle Row - Currency and Status */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Currency - Left */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Currency
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {country.currency}
                    </div>
                  </div>

                  {/* Status - Right */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {country.status}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Code, Action Icons, and ISD */}
                <div className="grid grid-cols-2 items-center justify-between gap-2 w-full dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Code
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {country.code}
                    </div>
                  </div>

                  {/* Right - ISD */}
                  <div className="text-right min-w-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      ISD
                    </div>
                    <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                      {country.isd}
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
          {!hasMore && filteredCountries.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more countries to load
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
                data={countries}
                setFilteredData={setCountriesData}
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
                data={countries}
                setFilteredData={setCountriesData}
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
