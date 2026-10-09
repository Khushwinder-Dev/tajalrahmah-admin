import { Card, CardTitle } from "@/components/ui/card";
import { toastDelete, toastRestore } from "@/lib/toast";
import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
import { RefreshCw, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, getModuleFromPath } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import { usePermission } from "@/hooks/usePermissions";
import { SearchFunction } from "@/lib/SearchFunction";
import {
  searchableKeys,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";

// do not change
type GridDataType = ModuleFieldsType & {
  id: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date;
  draftedAt: Date | null;
  updatedAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
};

export const plansData: GridDataType[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "********",
    phoneNo: "+1 555-0100",
    mobileNo: "+1 555-1100",
    bloodGroup: "O+",
    sex: "Male",
    dateOfBirth: "1985-04-12",
    address: "123 Main St, Cityville",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-01"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "********",
    phoneNo: "+1 555-0200",
    mobileNo: "+1 555-1200",
    bloodGroup: "A+",
    sex: "Female",
    dateOfBirth: "1990-09-23",
    address: "45 Oak Ave, Townsburg",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-02"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    firstName: "Ahmed",
    lastName: "Khan",
    email: "ahmed.khan@example.com",
    password: "********",
    phoneNo: "+1 555-0300",
    mobileNo: "+1 555-1300",
    bloodGroup: "B+",
    sex: "Male",
    dateOfBirth: "1988-12-01",
    address: "9 Crescent Rd, Metropolis",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-03"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    firstName: "Liu",
    lastName: "Wen",
    email: "liu.wen@example.com",
    password: "********",
    phoneNo: "+1 555-0400",
    mobileNo: "+1 555-1400",
    bloodGroup: "AB+",
    sex: "Female",
    dateOfBirth: "1992-03-18",
    address: "77 Lake View, Harbor City",
    status: "Draft",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: new Date("2025-01-04"),
    draftedAt: new Date("2025-01-30"),
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    firstName: "Carlos",
    lastName: "Diaz",
    email: "carlos.diaz@example.com",
    password: "********",
    phoneNo: "+1 555-0500",
    mobileNo: "+1 555-1500",
    bloodGroup: "O-",
    sex: "Male",
    dateOfBirth: "1987-07-07",
    address: "12 River St, Oldtown",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    password: "********",
    phoneNo: "+1 555-0600",
    mobileNo: "+1 555-1600",
    bloodGroup: "A-",
    sex: "Female",
    dateOfBirth: "1995-11-15",
    address: "88 Pine St, Greenville",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-06"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    password: "********",
    phoneNo: "+1 555-0700",
    mobileNo: "+1 555-1700",
    bloodGroup: "B-",
    sex: "Male",
    dateOfBirth: "1983-06-20",
    address: "55 Hill Ave, Mountain View",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-07"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    password: "********",
    phoneNo: "+1 555-0800",
    mobileNo: "+1 555-1800",
    bloodGroup: "AB-",
    sex: "Female",
    dateOfBirth: "1991-02-14",
    address: "22 Valley Rd, Sunset Hills",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-08"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    password: "********",
    phoneNo: "+1 555-0900",
    mobileNo: "+1 555-1900",
    bloodGroup: "O+",
    sex: "Male",
    dateOfBirth: "1993-08-30",
    address: "33 Oak St, Riverside",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-09"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@example.com",
    password: "********",
    phoneNo: "+1 555-1000",
    mobileNo: "+1 555-2000",
    bloodGroup: "A+",
    sex: "Female",
    dateOfBirth: "1989-12-05",
    address: "77 Maple Dr, Forest Park",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    firstName: "Robert",
    lastName: "Taylor",
    email: "robert.taylor@example.com",
    password: "********",
    phoneNo: "+1 555-1100",
    mobileNo: "+1 555-2100",
    bloodGroup: "B+",
    sex: "Male",
    dateOfBirth: "1986-04-22",
    address: "44 Cedar Ln, Woodside",
    status: "Active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-11"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    password: "********",
    phoneNo: "+1 555-1200",
    mobileNo: "+1 555-2200",
    bloodGroup: "AB+",
    sex: "Female",
    dateOfBirth: "1980-09-10",
    address: "99 Executive Blvd, Downtown",
    status: "Active",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-12"),
    draftedAt: null,
    updatedAt: new Date("2025-01-31"),
    deletedAt: null,
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

export default function ComponentLevelGridView({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("grid rendered");

  const navigate = useNavigate();
  const location = useLocation();

  const detectedModule = getModuleFromPath(location.pathname);

  const [gridData, setGridData] = useState(plansData);
  const canDelete: boolean = usePermission(detectedModule, "delete");
  const canRestore: boolean = usePermission(detectedModule, "restore");
  const canEdit: boolean = usePermission(detectedModule, "edit");

  // Debug permissions
  console.log("Permissions:", {
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

    const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      ...plansData[index % plansData.length],
      id: `${Date.now()}-${index}`,
      isDefault: false,
      isActive: Math.random() > 0.3,
      isDraft: Math.random() > 0.7,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
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

  const handleDeleteClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  const handleRestoreClick = (id: string) => {
    setGridData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDeleted: item.isDeleted === true ? false : true,
            }
          : item
      )
    );
  };

  // filter
  const filteredData = SearchFunction(gridData, searchQuery, searchableKeys);

  // get page name
  const PAGE_NAME = location.pathname.split("/")[1].replace("-", " ");

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
          Total {gridData.length} {PAGE_NAME}
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
            {filteredData.map((item, index) => (
              <Card
                key={index}
                className="transition-all hover:border-primary/90 hover:shadow-lg hover:translate-y-[-5px] relative group dark:bg-gray-800 p-4 duration-200"
              >
                {/* Top Row - Grid with 2 columns: Patient Name | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Patient Name */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.firstName} {item.lastName}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.status}
                    </div>
                  </div>
                </div>

                {/* Middle Row - Blood Group & Sex */}
                <div className="mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Blood Group
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {item.bloodGroup}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Sex
                      </div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {item.sex}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Phone No | Actions | Default */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Phone No - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Phone No
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.phoneNo}
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
                            toastRestore(`${PAGE_NAME} restored successfully`);
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(`${PAGE_NAME} deleted successfully`);
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
                          onClick={() =>
                            navigate(`${location.pathname}/edit/1`)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Default
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.isDefault ? "Yes" : "No"}
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
                <span className="text-sm">Loading more {PAGE_NAME}...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more {PAGE_NAME} to load
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
                title={location.pathname.split("/")[1].replace("-", " ")}
                fileName={location.pathname.split("/")[1]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
