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

// Sample Receiving interface
interface SampleReceivingItem {
  id: string;
  branch: string;
  receivingNo: string;
  clientName: string;
  clientReference: string;
  typeOfSample: string;
  requiredTests: string;
  numberOfSample: number;
  section: string;
  deliveredBy: string;
  receivedBy: string;
  receivingDate: string;
  receivingTime: string;
}

// Mock data - replace with real data from your API
const sampleReceivings: SampleReceivingItem[] = [
  {
    id: "1",
    branch: "Main Branch",
    receivingNo: "SR-001",
    clientName: "ABC Food Corp",
    clientReference: "REF-2024-001",
    typeOfSample: "Food Product",
    requiredTests: "Microbiology, Chemical Analysis",
    numberOfSample: 5,
    section: "Quality Control",
    deliveredBy: "John Smith",
    receivedBy: "Sarah Johnson",
    receivingDate: "2024-01-15",
    receivingTime: "09:30 AM",
  },
  {
    id: "2",
    branch: "North Branch",
    receivingNo: "SR-002",
    clientName: "XYZ Beverages Ltd",
    clientReference: "REF-2024-002",
    typeOfSample: "Beverage",
    requiredTests: "Chemical Analysis, pH Testing",
    numberOfSample: 3,
    section: "Laboratory",
    deliveredBy: "Mike Wilson",
    receivedBy: "Emily Davis",
    receivingDate: "2024-01-16",
    receivingTime: "11:15 AM",
  },
  {
    id: "3",
    branch: "South Branch",
    receivingNo: "SR-003",
    clientName: "Fresh Produce Inc",
    clientReference: "REF-2024-003",
    typeOfSample: "Agricultural Product",
    requiredTests: "Pesticide Residue, Heavy Metals",
    numberOfSample: 8,
    section: "Environmental Testing",
    deliveredBy: "David Brown",
    receivedBy: "Lisa Anderson",
    receivingDate: "2024-01-17",
    receivingTime: "02:45 PM",
  },
  {
    id: "4",
    branch: "Main Branch",
    receivingNo: "SR-004",
    clientName: "Dairy Products Co",
    clientReference: "REF-2024-004",
    typeOfSample: "Dairy Product",
    requiredTests: "Microbiology, Fat Content",
    numberOfSample: 4,
    section: "Food Safety",
    deliveredBy: "Robert Taylor",
    receivedBy: "Jennifer White",
    receivingDate: "2024-01-18",
    receivingTime: "10:00 AM",
  },
  {
    id: "5",
    branch: "East Branch",
    receivingNo: "SR-005",
    clientName: "Meat Processing Ltd",
    clientReference: "REF-2024-005",
    typeOfSample: "Meat Product",
    requiredTests: "Pathogen Testing, Nutritional Analysis",
    numberOfSample: 6,
    section: "Microbiology",
    deliveredBy: "James Miller",
    receivedBy: "Amanda Garcia",
    receivingDate: "2024-01-19",
    receivingTime: "08:30 AM",
  },
  {
    id: "6",
    branch: "West Branch",
    receivingNo: "SR-006",
    clientName: "Organic Foods LLC",
    clientReference: "REF-2024-006",
    typeOfSample: "Organic Product",
    requiredTests: "Organic Certification, Contaminant Analysis",
    numberOfSample: 7,
    section: "Organic Testing",
    deliveredBy: "Christopher Lee",
    receivedBy: "Michelle Rodriguez",
    receivingDate: "2024-01-20",
    receivingTime: "01:20 PM",
  },
  {
    id: "7",
    branch: "Main Branch",
    receivingNo: "SR-007",
    clientName: "Seafood Distributors",
    clientReference: "REF-2024-007",
    typeOfSample: "Seafood",
    requiredTests: "Mercury Content, Freshness Testing",
    numberOfSample: 3,
    section: "Chemical Analysis",
    deliveredBy: "Kevin Martinez",
    receivedBy: "Rachel Thompson",
    receivingDate: "2024-01-21",
    receivingTime: "03:15 PM",
  },
  {
    id: "8",
    branch: "North Branch",
    receivingNo: "SR-008",
    clientName: "Bakery Supplies Inc",
    clientReference: "REF-2024-008",
    typeOfSample: "Bakery Product",
    requiredTests: "Allergen Testing, Shelf Life",
    numberOfSample: 5,
    section: "Allergen Testing",
    deliveredBy: "Daniel Clark",
    receivedBy: "Stephanie Lewis",
    receivingDate: "2024-01-22",
    receivingTime: "09:45 AM",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function SampleReceivingGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sample Receiving grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [sampleReceivingsData, setSampleReceivingsData] =
    useState<SampleReceivingItem[]>(sampleReceivings);
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

    const branches = [
      "Main Branch",
      "North Branch",
      "South Branch",
      "East Branch",
      "West Branch",
      "Central Branch",
      "Downtown Branch",
      "Industrial Branch",
    ];
    const clientNames = [
      "ABC Food Corp",
      "XYZ Beverages Ltd",
      "Fresh Produce Inc",
      "Dairy Products Co",
      "Meat Processing Ltd",
      "Organic Foods LLC",
      "Seafood Distributors",
      "Bakery Supplies Inc",
      "Frozen Foods Co",
      "Spice Importers Ltd",
    ];
    const typeOfSamples = [
      "Food Product",
      "Beverage",
      "Agricultural Product",
      "Dairy Product",
      "Meat Product",
      "Organic Product",
      "Seafood",
      "Bakery Product",
      "Frozen Product",
      "Spice Product",
    ];
    const sections = [
      "Quality Control",
      "Laboratory",
      "Environmental Testing",
      "Food Safety",
      "Microbiology",
      "Organic Testing",
      "Chemical Analysis",
      "Allergen Testing",
      "Nutritional Analysis",
      "Contaminant Testing",
    ];
    const deliveredBy = [
      "John Smith",
      "Mike Wilson",
      "David Brown",
      "Robert Taylor",
      "James Miller",
      "Christopher Lee",
      "Kevin Martinez",
      "Daniel Clark",
      "Michael Johnson",
      "William Davis",
    ];
    const receivedBy = [
      "Sarah Johnson",
      "Emily Davis",
      "Lisa Anderson",
      "Jennifer White",
      "Amanda Garcia",
      "Michelle Rodriguez",
      "Rachel Thompson",
      "Stephanie Lewis",
      "Jessica Wilson",
      "Ashley Brown",
    ];

    const newItems: SampleReceivingItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const branch = branches[Math.floor(Math.random() * branches.length)];
        const clientName =
          clientNames[Math.floor(Math.random() * clientNames.length)];
        const typeOfSample =
          typeOfSamples[Math.floor(Math.random() * typeOfSamples.length)];
        const section = sections[Math.floor(Math.random() * sections.length)];
        const deliveredByPerson =
          deliveredBy[Math.floor(Math.random() * deliveredBy.length)];
        const receivedByPerson =
          receivedBy[Math.floor(Math.random() * receivedBy.length)];
        const receivingNo = `SR-${String(Date.now()).slice(-6)}`;
        const clientReference = `REF-2024-${String(index + 100).padStart(
          3,
          "0"
        )}`;
        const requiredTests = [
          "Microbiology",
          "Chemical Analysis",
          "pH Testing",
          "Allergen Testing",
          "Nutritional Analysis",
        ][Math.floor(Math.random() * 5)];
        const numberOfSample = Math.floor(Math.random() * 10) + 1;
        const receivingDate = new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];
        const receivingTime = `${String(
          Math.floor(Math.random() * 12) + 1
        ).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(
          2,
          "0"
        )} ${Math.random() > 0.5 ? "AM" : "PM"}`;

        return {
          id: `${Date.now()}-${index}`,
          branch,
          receivingNo,
          clientName,
          clientReference,
          typeOfSample,
          requiredTests,
          numberOfSample,
          section,
          deliveredBy: deliveredByPerson,
          receivedBy: receivedByPerson,
          receivingDate,
          receivingTime,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (sampleReceivingsData.length >= 46) {
      setHasMore(false);
    } else {
      setSampleReceivingsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [sampleReceivingsData.length, isLoading, hasMore]);

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

  // Filter sample receivings based on search query (search across multiple fields)
  const filteredSampleReceivings = sampleReceivingsData.filter(
    (item) =>
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.receivingNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.typeOfSample.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredTests.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deliveredBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.receivedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (sampleReceivingId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(
      `/sample-receiving/view/${sampleReceivingId}?fromView=${viewMode}`
    );
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
            {filteredSampleReceivings.map((item, index) => {
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
                  {/* Sample Receiving Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.receivingNo}
                    </CardTitle>
                  </div>

                  {/* Sample Receiving Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Client:</span>
                      <span className="truncate">{item.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Type:</span>
                      <span className="truncate">{item.typeOfSample}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Branch:</span>
                      <span className="truncate">{item.branch}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Section:</span>
                      <span className="truncate">{item.section}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Samples:</span>
                      <span className="truncate">{item.numberOfSample}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Date:</span>
                      <span className="truncate">{item.receivingDate}</span>
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
                <span className="text-sm">
                  Loading more sample receivings...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSampleReceivings.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sample receivings to load
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
                data={sampleReceivings}
                setFilteredData={setSampleReceivingsData}
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
                data={sampleReceivings}
                setFilteredData={setSampleReceivingsData}
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
