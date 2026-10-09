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
const retirements = [
  {
    id: "1",
    name: "3 Months retirement",
    date: "2023-03-01",
    description: "this is a description for 3 months retirement",
    status: true,
    iqamaNo: "46SFD97ASDF64",
    employeeName: "Sam Smith",
    employeeDesignation: "CTO",
    employeeBranch: "Dubai",
    isDeleted: false,
  },
  {
    id: "2",
    name: "Canada retirement",
    date: "2023-03-01",
    description: "retirement for Canada employee",
    status: true,
    iqamaNo: "CAIQAMA123",
    employeeName: "John Doe",
    employeeDesignation: "Manager",
    employeeBranch: "Canada",
    isDeleted: false,
  },
  {
    id: "3",
    name: "Japan retirement",
    date: "2023-03-01",
    description: "retirement for Japan office",
    status: true,
    iqamaNo: "JPIQAMA456",
    employeeName: "Yuki Tanaka",
    employeeDesignation: "Engineer",
    employeeBranch: "Tokyo",
    isDeleted: false,
  },
  {
    id: "4",
    name: "Germany retirement",
    date: "2023-03-01",
    description: "Annual retirement in Germany",
    status: true,
    iqamaNo: "DEIQAMA789",
    employeeName: "Hans Müller",
    employeeDesignation: "Developer",
    employeeBranch: "Berlin",
    isDeleted: false,
  },
  {
    id: "5",
    name: "France retirement",
    date: "2023-03-01",
    description: "Performance retirement",
    status: true,
    iqamaNo: "FRIQAMA101",
    employeeName: "Marie Curie",
    employeeDesignation: "Analyst",
    employeeBranch: "Paris",
    isDeleted: false,
  },
  {
    id: "6",
    name: "Italy retirement",
    date: "2023-03-01",
    description: "Quarterly retirement for Italy",
    status: true,
    iqamaNo: "ITIQAMA102",
    employeeName: "Luca Rossi",
    employeeDesignation: "Designer",
    employeeBranch: "Rome",
    isDeleted: false,
  },
  {
    id: "7",
    name: "Spain retirement",
    date: "2023-03-01",
    description: "Cost of living adjustment",
    status: true,
    iqamaNo: "ESIQAMA103",
    employeeName: "Carlos Díaz",
    employeeDesignation: "Sales Executive",
    employeeBranch: "Madrid",
    isDeleted: false,
  },
  {
    id: "8",
    name: "Portugal retirement",
    date: "2023-03-01",
    description: "Annual salary revision",
    status: true,
    iqamaNo: "PTIQAMA104",
    employeeName: "Ana Silva",
    employeeDesignation: "HR Officer",
    employeeBranch: "Lisbon",
    isDeleted: false,
  },
  {
    id: "9",
    name: "Switzerland retirement",
    date: "2023-03-01",
    description: "Standard retirement",
    status: true,
    iqamaNo: "CHIQAMA105",
    employeeName: "Lina Meier",
    employeeDesignation: "Finance Manager",
    employeeBranch: "Zurich",
    isDeleted: false,
  },
  {
    id: "10",
    name: "Netherlands retirement",
    date: "2023-03-01",
    description: "Salary increase based on review",
    status: true,
    iqamaNo: "NLIQAMA106",
    employeeName: "Tom Jansen",
    employeeDesignation: "Team Lead",
    employeeBranch: "Amsterdam",
    isDeleted: false,
  },
  {
    id: "11",
    name: "Belgium retirement",
    date: "2023-03-01",
    description: "Monthly retirement adjustment",
    status: true,
    iqamaNo: "BEIQAMA107",
    employeeName: "Emma Dubois",
    employeeDesignation: "Support Specialist",
    employeeBranch: "Brussels",
    isDeleted: false,
  },
  {
    id: "12",
    name: "United Kingdom retirement",
    date: "2023-03-01",
    description: "UK retirement",
    status: true,
    iqamaNo: "GBIQAMA108",
    employeeName: "Oliver Smith",
    employeeDesignation: "Operations Head",
    employeeBranch: "London",
    isDeleted: false,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function RetirementGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  // console.log("Retirement grid rendered");

  const navigate = useNavigate();

  const [retirementData, setRetirementData] = useState(retirements);
  const canDelete: boolean = usePermission("retirement", "delete");
  const canRestore: boolean = usePermission("retirement", "restore");
  const canEdit: boolean = usePermission("retirement", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));
    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      name: `retirement ${retirementData.length + index + 1}`,
      iqamaNo: `IQAMA${retirementData.length + index + 1}`,
      status: true,
      date: "2023-03-01",
      description: `description for retirement ${
        retirementData.length + index + 1
      }`,
      employeeName: `Employee ${retirementData.length + index + 1}`,
      employeeDesignation: `Designation ${retirementData.length + index + 1}`,
      employeeBranch: `Branch ${retirementData.length + index + 1}`,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (retirementData.length >= 46) {
      setHasMore(false);
    } else {
      setRetirementData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [retirementData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (retirementsId: string) => {
    setRetirementData((prevRetirements) =>
      prevRetirements.map((retirement) =>
        retirement.id === retirementsId
          ? {
              ...retirement,
              isDeleted: retirement.isDeleted === true ? false : true,
            }
          : retirement
      )
    );
  };

  const handleRestoreClick = (retirementsId: string) => {
    setRetirementData((prevRetirements) =>
      prevRetirements.map((retirement) =>
        retirement.id === retirementsId
          ? {
              ...retirement,
              isDeleted: retirement.isDeleted === true ? false : true,
            }
          : retirement
      )
    );
  };

  // Filter retirements based on search query
  const filteredRetirements = retirementData.filter(
    (retirement) =>
      retirement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retirement.iqamaNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retirement.date.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {retirements.length} retirements
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
            {filteredRetirements.map((retirement, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/retirements/1`)}
                  >
                    {retirement.name}
                  </CardTitle>

                  {/* Right - Flag */}
                  {/* <div className="flex justify-end">
                    <img
                      src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                      alt={`${country.name} flag`}
                      className="h-12 w-12 object-cover border rounded-md shadow-sm"
                      onError={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `https://flagcdn.com/us.svg`;
                      }}
                    />
                  </div> */}
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Iqama
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {retirement.iqamaNo}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        retirement.isDeleted && canRestore
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
                        disabled={retirement.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          retirement.isDeleted
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && retirement.isDeleted) {
                            handleRestoreClick(retirement.id);
                            toastRestore("retirement restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(retirement.id);
                              toastDelete("retirement deleted successfully");
                            }
                          }
                        }}
                      >
                        {retirement.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/retirement/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Branch
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {retirement.employeeBranch}
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
                <span className="text-sm">Loading more retirements...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredRetirements.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more retirements to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={retirements}
                setFilteredData={setRetirementData}
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
                data={retirements}
                setFilteredData={setRetirementData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
