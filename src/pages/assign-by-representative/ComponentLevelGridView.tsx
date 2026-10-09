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
    planName: "Software Engineer Hiring Plan",
    position: "Frontend Developer",
    department: "Engineering",
    quantityToBeRecruited: "3",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "50000",
    startingSalaryTo: "70000",
    fromDate: "2025-09-01",
    toDate: "2025-12-31",
    reason: "Expansion of product team",
    jobDescription: "Work on React and Next.js projects",
    approver: "CTO",
    ageFrom: "22",
    ageTo: "35",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in CS",
    seniority: "Junior to Mid",
    attachment: "JD_Frontend.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-01"),
    draftedAt: null,
    updatedAt: new Date("2025-08-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    planName: "Marketing Specialist Hiring",
    position: "Digital Marketer",
    department: "Marketing",
    quantityToBeRecruited: "2",
    workingForm: "Full-time",
    workplace: "Remote",
    startingSalaryFrom: "35000",
    startingSalaryTo: "50000",
    fromDate: "2025-09-10",
    toDate: "2025-11-30",
    reason: "New campaign projects",
    jobDescription: "Manage SEO, SEM, and social ads",
    approver: "CMO",
    ageFrom: "23",
    ageTo: "32",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Marketing",
    seniority: "Mid",
    attachment: "JD_Marketing.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-03"),
    draftedAt: null,
    updatedAt: new Date("2025-08-16"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    planName: "Finance Analyst Recruitment",
    position: "Financial Analyst",
    department: "Finance",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "60000",
    startingSalaryTo: "80000",
    fromDate: "2025-10-01",
    toDate: "2025-12-15",
    reason: "Business growth",
    jobDescription: "Analyze company financial data",
    approver: "CFO",
    ageFrom: "25",
    ageTo: "40",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Master in Finance",
    seniority: "Mid-Senior",
    attachment: "JD_Finance.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-05"),
    draftedAt: null,
    updatedAt: new Date("2025-08-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    planName: "Customer Support Hiring",
    position: "Customer Support Agent",
    department: "Support",
    quantityToBeRecruited: "5",
    workingForm: "Shift-based",
    workplace: "Call Center - Dhaka",
    startingSalaryFrom: "20000",
    startingSalaryTo: "30000",
    fromDate: "2025-09-15",
    toDate: "2025-11-20",
    reason: "Increase in customer base",
    jobDescription: "Handle customer queries and tickets",
    approver: "Head of Support",
    ageFrom: "20",
    ageTo: "30",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor",
    seniority: "Entry-level",
    attachment: "JD_Support.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-06"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    planName: "HR Manager Hiring",
    position: "HR Manager",
    department: "Human Resources",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "70000",
    startingSalaryTo: "90000",
    fromDate: "2025-09-20",
    toDate: "2025-11-30",
    reason: "Leadership expansion",
    jobDescription: "Manage recruitment and policies",
    approver: "CEO",
    ageFrom: "28",
    ageTo: "40",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "MBA in HR",
    seniority: "Senior",
    attachment: "JD_HR.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-07"),
    draftedAt: null,
    updatedAt: new Date("2025-08-18"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    planName: "UI/UX Designer Hiring",
    position: "UI/UX Designer",
    department: "Design",
    quantityToBeRecruited: "2",
    workingForm: "Full-time",
    workplace: "Remote",
    startingSalaryFrom: "45000",
    startingSalaryTo: "60000",
    fromDate: "2025-09-25",
    toDate: "2025-12-05",
    reason: "New product design",
    jobDescription: "Design user interfaces and experiences",
    approver: "Design Lead",
    ageFrom: "22",
    ageTo: "32",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Design",
    seniority: "Mid",
    attachment: "JD_Design.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-08"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    planName: "QA Engineer Hiring",
    position: "QA Engineer",
    department: "Engineering",
    quantityToBeRecruited: "3",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "40000",
    startingSalaryTo: "55000",
    fromDate: "2025-10-01",
    toDate: "2025-12-20",
    reason: "Quality assurance needs",
    jobDescription: "Test and ensure software quality",
    approver: "QA Lead",
    ageFrom: "22",
    ageTo: "34",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in CS",
    seniority: "Junior to Mid",
    attachment: "JD_QA.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-09"),
    draftedAt: null,
    updatedAt: new Date("2025-08-19"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    planName: "Backend Engineer Hiring",
    position: "Backend Developer",
    department: "Engineering",
    quantityToBeRecruited: "2",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "60000",
    startingSalaryTo: "85000",
    fromDate: "2025-09-15",
    toDate: "2025-12-10",
    reason: "API and database scaling",
    jobDescription: "Work on Node.js and databases",
    approver: "CTO",
    ageFrom: "23",
    ageTo: "36",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in CS",
    seniority: "Mid",
    attachment: "JD_Backend.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-10"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    planName: "Sales Executive Hiring",
    position: "Sales Executive",
    department: "Sales",
    quantityToBeRecruited: "4",
    workingForm: "Full-time",
    workplace: "Dhaka & Chittagong",
    startingSalaryFrom: "30000",
    startingSalaryTo: "50000",
    fromDate: "2025-09-12",
    toDate: "2025-12-01",
    reason: "Increase in sales targets",
    jobDescription: "Handle client sales and accounts",
    approver: "Sales Director",
    ageFrom: "21",
    ageTo: "35",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in Business",
    seniority: "Junior",
    attachment: "JD_Sales.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-11"),
    draftedAt: null,
    updatedAt: new Date("2025-08-20"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    planName: "Content Writer Hiring",
    position: "Content Writer",
    department: "Marketing",
    quantityToBeRecruited: "2",
    workingForm: "Remote",
    workplace: "Home",
    startingSalaryFrom: "25000",
    startingSalaryTo: "40000",
    fromDate: "2025-09-20",
    toDate: "2025-11-25",
    reason: "New blogs and SEO content",
    jobDescription: "Write blogs, social, and website content",
    approver: "Marketing Manager",
    ageFrom: "21",
    ageTo: "30",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Bachelor in English",
    seniority: "Junior",
    attachment: "JD_Content.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-12"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    planName: "Data Scientist Hiring",
    position: "Data Scientist",
    department: "Engineering",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "90000",
    startingSalaryTo: "120000",
    fromDate: "2025-10-05",
    toDate: "2025-12-30",
    reason: "AI and ML projects",
    jobDescription: "Develop machine learning models",
    approver: "CTO",
    ageFrom: "25",
    ageTo: "38",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "Master in Data Science",
    seniority: "Senior",
    attachment: "JD_DataScience.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-13"),
    draftedAt: null,
    updatedAt: new Date("2025-08-21"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    planName: "Project Manager Hiring",
    position: "Project Manager",
    department: "PMO",
    quantityToBeRecruited: "1",
    workingForm: "Full-time",
    workplace: "Dhaka HQ",
    startingSalaryFrom: "100000",
    startingSalaryTo: "140000",
    fromDate: "2025-09-25",
    toDate: "2025-12-31",
    reason: "New client projects",
    jobDescription: "Manage cross-team projects",
    approver: "CEO",
    ageFrom: "28",
    ageTo: "42",
    gender: "Any",
    height: "Any",
    weight: "Any",
    literacy: "MBA",
    seniority: "Senior",
    attachment: "JD_PM.pdf",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-08-14"),
    draftedAt: null,
    updatedAt: new Date("2025-08-22"),
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
                {/* Top Row - Grid with 2 columns: Title | Status */}
                <div className="grid grid-cols-2 items-center gap-2 mb-4">
                  {/* Left - Title */}
                  <CardTitle
                    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                    onClick={() => navigate(`${location.pathname}/1`)}
                  >
                    {item.planName}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Position
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.position}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Working Form
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.workingForm}
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
                      Department
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.department}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700 border-t">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Quantity To Be Recruited
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.quantityToBeRecruited}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Workplace
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.workplace}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-end text-gray-500 dark:text-gray-400">
                      Starting Salary From
                    </div>
                    <div className="text-sm font-semibold text-end text-gray-900 dark:text-gray-100 truncate">
                      {item.startingSalaryFrom}
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
