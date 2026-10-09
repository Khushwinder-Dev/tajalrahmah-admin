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
const increments = [
  {
    id: "1",
    name: "3 Months Increment",
    date: "2023-03-01",
    amount: 1000,
    note: "this is a note for 3 months increment",
    iqamaNo: "46SFD97ASDF64",
    employeeName: "Sadia Afreen",
    employeeDesignation: "CTO",
    employeeBranch: "Dubai Head Office",
    isDeleted: false,
  },
  {
    id: "2",
    name: "Canada Increment",
    date: "2023-03-01",
    amount: 2000,
    note: "Increment for Canada employee",
    iqamaNo: "CAIQAMA123",
    employeeName: "John Doe",
    employeeDesignation: "Manager",
    employeeBranch: "Canada Branch",
    isDeleted: false,
  },
  {
    id: "3",
    name: "Japan Increment",
    date: "2023-03-01",
    amount: 2500,
    note: "Increment for Japan office",
    iqamaNo: "JPIQAMA456",
    employeeName: "Yuki Tanaka",
    employeeDesignation: "Engineer",
    employeeBranch: "Tokyo Branch",
    isDeleted: false,
  },
  {
    id: "4",
    name: "Germany Increment",
    date: "2023-03-01",
    amount: 2100,
    note: "Annual increment in Germany",
    iqamaNo: "DEIQAMA789",
    employeeName: "Hans Müller",
    employeeDesignation: "Developer",
    employeeBranch: "Berlin Branch",
    isDeleted: false,
  },
  {
    id: "5",
    name: "France Increment",
    date: "2023-03-01",
    amount: 2200,
    note: "Performance increment",
    iqamaNo: "FRIQAMA101",
    employeeName: "Marie Curie",
    employeeDesignation: "Analyst",
    employeeBranch: "Paris Branch",
    isDeleted: false,
  },
  {
    id: "6",
    name: "Italy Increment",
    date: "2023-03-01",
    amount: 2300,
    note: "Quarterly increment for Italy",
    iqamaNo: "ITIQAMA102",
    employeeName: "Luca Rossi",
    employeeDesignation: "Designer",
    employeeBranch: "Rome Branch",
    isDeleted: false,
  },
  {
    id: "7",
    name: "Spain Increment",
    date: "2023-03-01",
    amount: 1800,
    note: "Cost of living adjustment",
    iqamaNo: "ESIQAMA103",
    employeeName: "Carlos Díaz",
    employeeDesignation: "Sales Executive",
    employeeBranch: "Madrid Branch",
    isDeleted: false,
  },
  {
    id: "8",
    name: "Portugal Increment",
    date: "2023-03-01",
    amount: 1700,
    note: "Annual salary revision",
    iqamaNo: "PTIQAMA104",
    employeeName: "Ana Silva",
    employeeDesignation: "HR Officer",
    employeeBranch: "Lisbon Branch",
    isDeleted: false,
  },
  {
    id: "9",
    name: "Switzerland Increment",
    date: "2023-03-01",
    amount: 3000,
    note: "Standard increment",
    iqamaNo: "CHIQAMA105",
    employeeName: "Lina Meier",
    employeeDesignation: "Finance Manager",
    employeeBranch: "Zurich Branch",
    isDeleted: false,
  },
  {
    id: "10",
    name: "Netherlands Increment",
    date: "2023-03-01",
    amount: 2400,
    note: "Salary increase based on review",
    iqamaNo: "NLIQAMA106",
    employeeName: "Tom Jansen",
    employeeDesignation: "Team Lead",
    employeeBranch: "Amsterdam Branch",
    isDeleted: false,
  },
  {
    id: "11",
    name: "Belgium Increment",
    date: "2023-03-01",
    amount: 2000,
    note: "Monthly increment adjustment",
    iqamaNo: "BEIQAMA107",
    employeeName: "Emma Dubois",
    employeeDesignation: "Support Specialist",
    employeeBranch: "Brussels Branch",
    isDeleted: false,
  },
  {
    id: "12",
    name: "United Kingdom Increment",
    date: "2023-03-01",
    amount: 2600,
    note: "UK branch increment",
    iqamaNo: "GBIQAMA108",
    employeeName: "Oliver Smith",
    employeeDesignation: "Operations Head",
    employeeBranch: "London Branch",
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

export default function IncrementsGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("increments grid rendered");

  const navigate = useNavigate();

  const [incrementsData, setIncrementsData] = useState(increments);
  const canDelete: boolean = usePermission("increments", "delete");
  const canRestore: boolean = usePermission("increments", "restore");
  const canEdit: boolean = usePermission("increments", "edit");

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
      name: `Increment ${incrementsData.length + index + 1}`,
      iqamaNo: `IQAMA${incrementsData.length + index + 1}`,
      status:
        Math.random() > 0.3
          ? "active"
          : Math.random() > 0.5
          ? "inactive"
          : "draft",
      date: "2023-03-01",
      amount: 1000,
      note: `Note for Increment ${incrementsData.length + index + 1}`,
      employeeName: `Employee ${incrementsData.length + index + 1}`,
      employeeDesignation: `Designation ${incrementsData.length + index + 1}`,
      employeeBranch: `Branch ${incrementsData.length + index + 1}`,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (incrementsData.length >= 46) {
      setHasMore(false);
    } else {
      setIncrementsData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [incrementsData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (incrementsId: string) => {
    setIncrementsData((prevIncrements) =>
      prevIncrements.map((increment) =>
        increment.id === incrementsId
          ? {
              ...increment,
              isDeleted: increment.isDeleted === true ? false : true,
            }
          : increment
      )
    );
  };

  const handleRestoreClick = (incrementsId: string) => {
    setIncrementsData((prevIncrements) =>
      prevIncrements.map((increment) =>
        increment.id === incrementsId
          ? {
              ...increment,
              isDeleted: increment.isDeleted === true ? false : true,
            }
          : increment
      )
    );
  };

  // Filter increments based on search query
  const filteredIncrements = incrementsData.filter(
    (increment) =>
      increment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      increment.iqamaNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      increment.date.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {increments.length} increments
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
            {filteredIncrements.map((increment, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/increments/1`)}
                  >
                    {increment.name}
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
                      {increment.iqamaNo}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        increment.isDeleted && canRestore
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
                        disabled={increment.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          increment.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && increment.isDeleted) {
                            handleRestoreClick(increment.id);
                            toastRestore("Increment restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(increment.id);
                              toastDelete("Increment deleted successfully");
                            }
                          }
                        }}
                      >
                        {increment.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/increments/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Amount
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {increment.amount}
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
                <span className="text-sm">Loading more increments...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredIncrements.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more increments to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={increments}
                setFilteredData={setIncrementsData}
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
                data={increments}
                setFilteredData={setIncrementsData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
