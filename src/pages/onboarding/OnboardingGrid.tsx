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

// Onboarding interface
interface OnboardingItem {
  id: string;
  selectStaff: string;
  generalInformation: string;
  staffFullName: string;
  address: string;
  assetAllocation: string;
  typeOfTraining: string;
  trainingProgram: string;
}

// Mock data - replace with real data from your API
const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    selectStaff: "John Smith",
    generalInformation: "New Employee",
    staffFullName: "John Michael Smith",
    address: "123 Main St, New York, NY 10001",
    assetAllocation: "Laptop, Phone, ID Badge",
    typeOfTraining: "Orientation",
    trainingProgram: "Company Policies & Procedures",
  },
  {
    id: "2",
    selectStaff: "Sarah Johnson",
    generalInformation: "Transfer Employee",
    staffFullName: "Sarah Elizabeth Johnson",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    assetAllocation: "Desktop, Monitor, Keyboard",
    typeOfTraining: "Technical",
    trainingProgram: "Software Development",
  },
  {
    id: "3",
    selectStaff: "Mike Davis",
    generalInformation: "Intern",
    staffFullName: "Michael James Davis",
    address: "789 Pine Rd, Chicago, IL 60601",
    assetAllocation: "Tablet, Notebook",
    typeOfTraining: "Safety",
    trainingProgram: "Workplace Safety & Security",
  },
  {
    id: "4",
    selectStaff: "Emily Wilson",
    generalInformation: "Contractor",
    staffFullName: "Emily Rose Wilson",
    address: "321 Elm St, Houston, TX 77001",
    assetAllocation: "Temporary Access Card",
    typeOfTraining: "Compliance",
    trainingProgram: "Regulatory Compliance",
  },
  {
    id: "5",
    selectStaff: "David Brown",
    generalInformation: "Part-time Employee",
    staffFullName: "David Christopher Brown",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    assetAllocation: "Shared Workstation",
    typeOfTraining: "Customer Service",
    trainingProgram: "Customer Relations Training",
  },
  {
    id: "6",
    selectStaff: "Lisa Garcia",
    generalInformation: "Full-time Employee",
    staffFullName: "Lisa Maria Garcia",
    address: "987 Cedar Ln, Philadelphia, PA 19101",
    assetAllocation: "Laptop, Headset, Mouse",
    typeOfTraining: "Leadership",
    trainingProgram: "Management Development",
  },
  {
    id: "7",
    selectStaff: "Robert Miller",
    generalInformation: "Seasonal Worker",
    staffFullName: "Robert Thomas Miller",
    address: "147 Birch St, San Antonio, TX 78201",
    assetAllocation: "Uniform, Safety Equipment",
    typeOfTraining: "Operational",
    trainingProgram: "Equipment Operation",
  },
  {
    id: "8",
    selectStaff: "Jennifer Taylor",
    generalInformation: "Remote Employee",
    staffFullName: "Jennifer Lynn Taylor",
    address: "258 Spruce Ave, San Diego, CA 92101",
    assetAllocation: "Remote Setup Kit",
    typeOfTraining: "Remote Work",
    trainingProgram: "Remote Collaboration Tools",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function OnboardingGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Onboarding grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [onboardingEntries, setOnboardingEntries] =
    useState<OnboardingItem[]>(onboardingData);
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

    const selectStaffs = [
      "John Smith",
      "Sarah Johnson",
      "Mike Davis",
      "Emily Wilson",
      "David Brown",
      "Lisa Garcia",
      "Robert Miller",
      "Jennifer Taylor",
      "William Anderson",
      "Maria Rodriguez",
      "James Wilson",
      "Patricia Martinez",
    ];
    const generalInformations = [
      "New Employee",
      "Transfer Employee",
      "Intern",
      "Contractor",
      "Part-time Employee",
      "Full-time Employee",
      "Seasonal Worker",
      "Remote Employee",
      "Temporary Worker",
      "Consultant",
      "Volunteer",
      "Freelancer",
    ];
    const staffFullNames = [
      "John Michael Smith",
      "Sarah Elizabeth Johnson",
      "Michael James Davis",
      "Emily Rose Wilson",
      "David Christopher Brown",
      "Lisa Maria Garcia",
      "Robert Thomas Miller",
      "Jennifer Lynn Taylor",
      "William James Anderson",
      "Maria Elena Rodriguez",
      "James Patrick Wilson",
      "Patricia Ann Martinez",
    ];
    const addresses = [
      "123 Main St, New York, NY 10001",
      "456 Oak Ave, Los Angeles, CA 90210",
      "789 Pine Rd, Chicago, IL 60601",
      "321 Elm St, Houston, TX 77001",
      "654 Maple Dr, Phoenix, AZ 85001",
      "987 Cedar Ln, Philadelphia, PA 19101",
      "147 Birch St, San Antonio, TX 78201",
      "258 Spruce Ave, San Diego, CA 92101",
      "369 Willow Way, Dallas, TX 75201",
      "741 Poplar Pl, San Jose, CA 95101",
      "852 Ash Ave, Austin, TX 78701",
      "963 Hickory Hwy, Jacksonville, FL 32201",
    ];
    const assetAllocations = [
      "Laptop, Phone, ID Badge",
      "Desktop, Monitor, Keyboard",
      "Tablet, Notebook",
      "Temporary Access Card",
      "Shared Workstation",
      "Laptop, Headset, Mouse",
      "Uniform, Safety Equipment",
      "Remote Setup Kit",
      "Company Vehicle, GPS",
      "Specialized Tools",
      "Mobile Device, Charger",
      "Office Supplies Kit",
    ];
    const typeOfTrainings = [
      "Orientation",
      "Technical",
      "Safety",
      "Compliance",
      "Customer Service",
      "Leadership",
      "Operational",
      "Remote Work",
      "Quality Assurance",
      "Data Security",
      "Communication",
      "Project Management",
    ];
    const trainingPrograms = [
      "Company Policies & Procedures",
      "Software Development",
      "Workplace Safety & Security",
      "Regulatory Compliance",
      "Customer Relations Training",
      "Management Development",
      "Equipment Operation",
      "Remote Collaboration Tools",
      "Quality Control Standards",
      "Information Security",
      "Effective Communication",
      "Agile Project Management",
    ];

    const newItems: OnboardingItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const selectStaff =
          selectStaffs[Math.floor(Math.random() * selectStaffs.length)];
        const generalInformation =
          generalInformations[
            Math.floor(Math.random() * generalInformations.length)
          ];
        const staffFullName =
          staffFullNames[Math.floor(Math.random() * staffFullNames.length)];
        const address = addresses[Math.floor(Math.random() * addresses.length)];
        const assetAllocation =
          assetAllocations[Math.floor(Math.random() * assetAllocations.length)];
        const typeOfTraining =
          typeOfTrainings[Math.floor(Math.random() * typeOfTrainings.length)];
        const trainingProgram =
          trainingPrograms[Math.floor(Math.random() * trainingPrograms.length)];

        return {
          id: `${Date.now()}-${index}`,
          selectStaff: `${selectStaff} ${index + 1}`,
          generalInformation,
          staffFullName,
          address,
          assetAllocation,
          typeOfTraining,
          trainingProgram,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (onboardingEntries.length >= 46) {
      setHasMore(false);
    } else {
      setOnboardingEntries((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [onboardingEntries.length, isLoading, hasMore]);

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

  // Filter onboarding entries based on search query (search across multiple fields)
  const filteredOnboarding = onboardingEntries.filter(
    (item) =>
      item.selectStaff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.generalInformation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.staffFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assetAllocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.typeOfTraining.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.trainingProgram.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (onboardingId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/onboarding/view/${onboardingId}?fromView=${viewMode}`);
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
            {filteredOnboarding.map((item, index) => {
              const statusColors = {
                "New Employee":
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                "Transfer Employee":
                  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                Intern:
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                Contractor:
                  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                "Part-time Employee":
                  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                "Full-time Employee":
                  "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
                "Seasonal Worker":
                  "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
                "Remote Employee":
                  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
              };

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
                  {/* Onboarding Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.staffFullName}
                    </CardTitle>
                    {/* Status Badge */}
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        statusColors[
                          item.generalInformation as keyof typeof statusColors
                        ] ||
                          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      )}
                    >
                      {item.generalInformation}
                    </span>
                  </div>

                  {/* Onboarding Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Staff:</span>
                      <span className="truncate font-semibold text-blue-600">
                        {item.selectStaff}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Address:</span>
                      <span className="truncate text-gray-700">
                        {item.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Assets:</span>
                      <span className="truncate text-green-600">
                        {item.assetAllocation}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Training:</span>
                      <span className="truncate text-purple-600">
                        {item.typeOfTraining} - {item.trainingProgram}
                      </span>
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
                  Loading more onboarding entries...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredOnboarding.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more onboarding entries to load
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
                data={onboardingData}
                setFilteredData={setOnboardingEntries}
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
                data={onboardingData}
                setFilteredData={setOnboardingEntries}
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
