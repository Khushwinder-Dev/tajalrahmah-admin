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
    patientId: "PAT001",
    date: "2025-09-15",
    title: "Annual Physical Examination",
    description:
      "Comprehensive health checkup including blood work and vital signs monitoring",
    doctorName: "Dr. Sarah Johnson",
    status: "Scheduled",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-01"),
    draftedAt: null,
    updatedAt: new Date("2025-09-05"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "2",
    patientId: "PAT002",
    date: "2025-09-16",
    title: "Follow-up Consultation",
    description: "Review test results and adjust medication dosage",
    doctorName: "Dr. Michael Chen",
    status: "Confirmed",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-02"),
    draftedAt: null,
    updatedAt: new Date("2025-09-06"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "3",
    patientId: "PAT003",
    date: "2025-09-17",
    title: "Cardiology Consultation",
    description: "Heart health assessment and ECG review",
    doctorName: "Dr. Emily Rodriguez",
    status: "Pending",
    isDefault: false,
    isActive: true,
    isDraft: true,
    createdAt: new Date("2025-09-03"),
    draftedAt: new Date("2025-09-03"),
    updatedAt: new Date("2025-09-07"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "4",
    patientId: "PAT004",
    date: "2025-09-18",
    title: "Dermatology Screening",
    description: "Skin examination and mole mapping",
    doctorName: "Dr. James Wilson",
    status: "Completed",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: new Date("2025-08-28"),
    draftedAt: null,
    updatedAt: new Date("2025-09-18"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "5",
    patientId: "PAT005",
    date: "2025-09-19",
    title: "Pediatric Checkup",
    description: "Routine childhood vaccination and growth assessment",
    doctorName: "Dr. Lisa Thompson",
    status: "Scheduled",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-04"),
    draftedAt: null,
    updatedAt: new Date("2025-09-08"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "6",
    patientId: "PAT006",
    date: "2025-09-20",
    title: "Orthopedic Consultation",
    description: "Knee pain evaluation and treatment planning",
    doctorName: "Dr. Robert Davis",
    status: "Confirmed",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-05"),
    draftedAt: null,
    updatedAt: new Date("2025-09-09"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "7",
    patientId: "PAT007",
    date: "2025-09-21",
    title: "Mental Health Assessment",
    description: "Psychological evaluation and therapy session",
    doctorName: "Dr. Amanda Foster",
    status: "Scheduled",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-06"),
    draftedAt: null,
    updatedAt: new Date("2025-09-10"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "8",
    patientId: "PAT008",
    date: "2025-09-22",
    title: "Gynecological Examination",
    description: "Annual women's health screening",
    doctorName: "Dr. Maria Garcia",
    status: "Pending",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-07"),
    draftedAt: null,
    updatedAt: new Date("2025-09-11"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "9",
    patientId: "PAT009",
    date: "2025-09-23",
    title: "Oncology Follow-up",
    description: "Cancer treatment progress review",
    doctorName: "Dr. David Kumar",
    status: "Confirmed",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-08"),
    draftedAt: null,
    updatedAt: new Date("2025-09-12"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
  },
  {
    id: "10",
    patientId: "PAT010",
    date: "2025-09-24",
    title: "Dental Cleaning",
    description: "Routine dental hygiene and cavity check",
    doctorName: "Dr. Susan Lee",
    status: "Scheduled",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-09-09"),
    draftedAt: null,
    updatedAt: new Date("2025-09-13"),
    deletedAt: null,
    isDeleted: false,
    attachment: "",
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
      ...plansData[index],
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
                {/* Top Row - Grid with 2 columns: Title | Date */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.title}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Date
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.date}
                    </div>
                  </div>
                </div>

                {/* Middle Row - Description */}
                <div className="mb-4 pt-2 border-t dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Description
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {item.description}
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Doctor | Actions | Status */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 border-t dark:border-gray-700">
                  {/* Doctor Name - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Doctor
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.doctorName}
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

                  {/* Status - Right aligned */}
                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Status
                    </div>
                    <div
                      className={`text-sm font-semibold truncate ${
                        item.status === "Completed"
                          ? "text-green-600 dark:text-green-400"
                          : item.status === "Confirmed"
                          ? "text-blue-600 dark:text-blue-400"
                          : item.status === "Scheduled"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>

                {/* Additional Row - Patient ID */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 mt-2 border-t dark:border-gray-700">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Patient ID
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.patientId}
                    </div>
                  </div>
                  <div></div> {/* Empty middle column for spacing */}
                  <div></div> {/* Empty right column for spacing */}
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
