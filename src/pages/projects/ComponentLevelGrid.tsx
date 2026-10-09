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

type GridDataType = {
  id: string;
  branch: string;
  customer: string;
  customerNo: string;
  vendorCode: string;
  status: string;
  projectName: string;
  projectCode: string;
  projectType: string;
  startDate: string;
  projectLocation: string;
  poNumber: string;
  description: string;
  isDeleted: boolean;
};

const projectGridData: GridDataType[] = [
  {
    id: "PRJ001",
    branch: "Dhaka",
    customer: "ABC Corporation",
    customerNo: "CUST001",
    vendorCode: "VND001",
    status: "Active",
    projectName: "ERP Implementation",
    projectCode: "ERP-DHK-001",
    projectType: "Software",
    startDate: "2025-07-01",
    projectLocation: "Dhaka HQ",
    poNumber: "PO12345",
    description: "Implementing ERP system across departments",
    isDeleted: false,
  },
  {
    id: "PRJ002",
    branch: "Chattogram",
    customer: "Delta Ltd.",
    customerNo: "CUST002",
    vendorCode: "VND002",
    status: "Inactive",
    projectName: "Warehouse Automation",
    projectCode: "WA-CTG-002",
    projectType: "Automation",
    startDate: "2025-06-15",
    projectLocation: "CTG Industrial Area",
    poNumber: "PO12346",
    description: "Automation of inventory warehouse",
    isDeleted: false,
  },
  {
    id: "PRJ003",
    branch: "Khulna",
    customer: "Oceanic Traders",
    customerNo: "CUST003",
    vendorCode: "VND003",
    status: "Completed",
    projectName: "Port Management System",
    projectCode: "PMS-KHL-003",
    projectType: "Software",
    startDate: "2025-04-10",
    projectLocation: "Khulna Port",
    poNumber: "PO12347",
    description: "Software solution for port operations",
    isDeleted: false,
  },
  {
    id: "PRJ004",
    branch: "Rajshahi",
    customer: "Green Agro",
    customerNo: "CUST004",
    vendorCode: "VND004",
    status: "Draft",
    projectName: "Farm Analytics System",
    projectCode: "FAS-RJS-004",
    projectType: "Analytics",
    startDate: "2025-08-01",
    projectLocation: "Rajshahi Agri Field",
    poNumber: "PO12348",
    description: "Data-driven analytics for farm operations",
    isDeleted: false,
  },
  {
    id: "PRJ005",
    branch: "Sylhet",
    customer: "Tea Valley Co.",
    customerNo: "CUST005",
    vendorCode: "VND005",
    status: "Active",
    projectName: "Tea Garden Management",
    projectCode: "TGM-SYL-005",
    projectType: "Management",
    startDate: "2025-05-20",
    projectLocation: "Sylhet Tea Estate",
    poNumber: "PO12349",
    description: "Digital platform for garden management",
    isDeleted: false,
  },
  {
    id: "PRJ006",
    branch: "Barishal",
    customer: "Blue River Ltd.",
    customerNo: "CUST006",
    vendorCode: "VND006",
    status: "Pending",
    projectName: "Flood Monitoring System",
    projectCode: "FMS-BSL-006",
    projectType: "IoT",
    startDate: "2025-09-01",
    projectLocation: "Barishal Delta Area",
    poNumber: "PO12350",
    description: "Real-time flood monitoring via sensors",
    isDeleted: false,
  },
  {
    id: "PRJ007",
    branch: "Mymensingh",
    customer: "Fresh Dairy",
    customerNo: "CUST007",
    vendorCode: "VND007",
    status: "Active",
    projectName: "Cold Chain Logistics",
    projectCode: "CCL-MYM-007",
    projectType: "Logistics",
    startDate: "2025-07-15",
    projectLocation: "Mymensingh Distribution Center",
    poNumber: "PO12351",
    description: "Cold storage and transport tracking system",
    isDeleted: false,
  },
  {
    id: "PRJ008",
    branch: "Rangpur",
    customer: "Eco Builders",
    customerNo: "CUST008",
    vendorCode: "VND008",
    status: "Deleted",
    projectName: "Eco Housing Project",
    projectCode: "EHP-RGP-008",
    projectType: "Construction",
    startDate: "2025-03-01",
    projectLocation: "Rangpur City",
    poNumber: "PO12352",
    description: "Sustainable housing development",
    isDeleted: true,
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function ComponentLevelGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Countries grid rendered");

  const navigate = useNavigate();

  const [gridData, setGridData] = useState(projectGridData);
  const canDelete: boolean = usePermission("projects", "delete");
  const canRestore: boolean = usePermission("projects", "restore");
  const canEdit: boolean = usePermission("projects", "edit");

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
      branch: `Branch ${projectGridData.length + index + 1}`,
      customer: `Customer ${projectGridData.length + index + 1}`,
      customerNo: `Customer No ${projectGridData.length + index + 1}`,
      vendorCode: `Vendor Code ${projectGridData.length + index + 1}`,
      status: `Status ${projectGridData.length + index + 1}`,
      projectName: `Project Name ${projectGridData.length + index + 1}`,
      projectCode: `Project Code ${projectGridData.length + index + 1}`,
      projectType: `Project Type ${projectGridData.length + index + 1}`,
      startDate: `Start Date ${projectGridData.length + index + 1}`,
      projectLocation: `Project Location ${projectGridData.length + index + 1}`,
      poNumber: `PO Number ${projectGridData.length + index + 1}`,
      description: `Description ${projectGridData.length + index + 1}`,
      isDeleted: false,
    }));

    // Stop loading more after reaching 50 items for demo
    if (gridData.length >= 46) {
      setHasMore(false);
    } else {
      setGridData((prev) => [...prev, ...newItems] as GridDataType[]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [gridData.length, isLoading, hasMore]);

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

  const handleDeleteClick = (countryId: string) => {
    setGridData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  const handleRestoreClick = (countryId: string) => {
    setGridData((prevCountries) =>
      prevCountries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              isDeleted: country.isDeleted === true ? false : true,
            }
          : country
      )
    );
  };

  // Filter countries based on search query
  const filterdData = gridData.filter(
    (item) =>
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} projects
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
            {filterdData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`/projects/1`)}
                  >
                    {item.projectName}
                  </CardTitle>

                  {/* Right - Flag */}
                  <div className="flex items-end flex-col">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      customer
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.customer}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 2 columns: Code | Currency */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Code - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.startDate}
                    </div>
                  </div>

                  {/* Middle - Action Icons */}
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Delete/Restore */}
                    <Tooltip
                      label={
                        item.isDeleted && canRestore
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
                        disabled={item.isDeleted && !canRestore}
                        className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          item.isDeleted ? "text-blue-500" : "text-red-500"
                        }`}
                        onClick={() => {
                          if (canRestore && item.isDeleted) {
                            handleRestoreClick(item.id);
                            toastRestore("projects restored successfully");
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete("projects deleted successfully");
                            }
                          }
                        }}
                      >
                        {item.isDeleted && canRestore ? (
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
                          onClick={() => navigate(`/projects/edit/${item.id}`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  {/* Currency - Right aligned */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Customer No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.customerNo}
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
                <span className="text-sm">Loading more projects...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filterdData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more projects to load
              </span>
            </div>
          )}
        </div>

        {/* Filter component - Right side only */}
        {isFilterOpen && (
          <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="h-full flex flex-col">
              <GridFilterComponent
                data={gridData}
                setFilteredData={setGridData}
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
                data={gridData}
                setFilteredData={setGridData}
                setIsExportOpen={setIsExportOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
