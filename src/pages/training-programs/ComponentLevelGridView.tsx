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
  trainingProgramName: string;
  trainingType: string;
  programItems: string;
  point: string;
  trainingMode: string;
  departments: string;
  applyPosition: string;
  description: string;
  attachment: string;

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

const trainingProgramsData: GridDataType[] = [
  {
    id: "1",
    trainingProgramName: "React.js Fundamentals",
    trainingType: "Technical",
    programItems: "JSX, Components, Props, State",
    point: "50",
    trainingMode: "Online",
    departments: "Engineering",
    applyPosition: "Frontend Developer",
    description: "Introduction to React.js for building modern web apps.",
    attachment: "react-fundamentals.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-10"),
    draftedAt: null,
    updatedAt: new Date("2025-02-05"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    trainingProgramName: "Next.js Advanced",
    trainingType: "Technical",
    programItems: "SSR, SSG, API Routes, Middleware",
    point: "70",
    trainingMode: "Online",
    departments: "Engineering",
    applyPosition: "Fullstack Developer",
    description: "Deep dive into Next.js for building scalable apps.",
    attachment: "nextjs-advanced.pdf",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-01"),
    draftedAt: null,
    updatedAt: new Date("2025-02-15"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    trainingProgramName: "UI/UX Design Basics",
    trainingType: "Design",
    programItems: "Wireframing, Prototyping, Figma",
    point: "40",
    trainingMode: "Onsite",
    departments: "Design",
    applyPosition: "UI Designer",
    description: "Foundation of UI/UX with hands-on design projects.",
    attachment: "uiux-basics.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-20"),
    draftedAt: null,
    updatedAt: new Date("2025-02-02"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    trainingProgramName: "Agile & Scrum Mastery",
    trainingType: "Management",
    programItems: "Scrum Roles, Agile Practices, Sprint Planning",
    point: "60",
    trainingMode: "Onsite",
    departments: "Project Management",
    applyPosition: "Scrum Master",
    description: "Master Agile methodology and Scrum ceremonies.",
    attachment: "agile-scrum.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-25"),
    draftedAt: null,
    updatedAt: new Date("2025-02-12"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    trainingProgramName: "Cybersecurity Essentials",
    trainingType: "Technical",
    programItems: "Threats, Attacks, Firewalls, Encryption",
    point: "55",
    trainingMode: "Hybrid",
    departments: "IT Security",
    applyPosition: "Security Analyst",
    description: "Understanding cybersecurity fundamentals.",
    attachment: "cybersecurity.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-12"),
    draftedAt: null,
    updatedAt: new Date("2025-02-14"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "6",
    trainingProgramName: "Leadership Development",
    trainingType: "Soft Skills",
    programItems: "Decision Making, Communication, Mentorship",
    point: "45",
    trainingMode: "Onsite",
    departments: "Management",
    applyPosition: "Team Lead",
    description: "Build leadership skills for managing teams.",
    attachment: "leadership.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-05"),
    draftedAt: null,
    updatedAt: new Date("2025-01-28"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "7",
    trainingProgramName: "Data Analysis with Excel",
    trainingType: "Technical",
    programItems: "Pivot Tables, Charts, Macros",
    point: "35",
    trainingMode: "Online",
    departments: "Analytics",
    applyPosition: "Data Analyst",
    description: "Practical Excel training for data analysis.",
    attachment: "excel-analysis.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-18"),
    draftedAt: null,
    updatedAt: new Date("2025-02-08"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "8",
    trainingProgramName: "Cloud Computing Basics",
    trainingType: "Technical",
    programItems: "AWS, Azure, Google Cloud Fundamentals",
    point: "65",
    trainingMode: "Hybrid",
    departments: "Engineering",
    applyPosition: "Cloud Engineer",
    description: "Introduction to cloud infrastructure and services.",
    attachment: "cloud-computing.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-02-05"),
    draftedAt: null,
    updatedAt: new Date("2025-02-17"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "9",
    trainingProgramName: "Communication Skills",
    trainingType: "Soft Skills",
    programItems: "Public Speaking, Writing, Listening",
    point: "30",
    trainingMode: "Onsite",
    departments: "HR",
    applyPosition: "HR Executive",
    description: "Improve workplace communication.",
    attachment: "communication.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-22"),
    draftedAt: null,
    updatedAt: new Date("2025-02-11"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "10",
    trainingProgramName: "Digital Marketing",
    trainingType: "Marketing",
    programItems: "SEO, Social Media, Ads",
    point: "50",
    trainingMode: "Online",
    departments: "Marketing",
    applyPosition: "Marketing Executive",
    description: "Learn digital marketing strategies and tools.",
    attachment: "digital-marketing.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-30"),
    draftedAt: null,
    updatedAt: new Date("2025-02-13"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "11",
    trainingProgramName: "Time Management",
    trainingType: "Soft Skills",
    programItems: "Planning, Prioritization, Focus",
    point: "25",
    trainingMode: "Onsite",
    departments: "All",
    applyPosition: "All Employees",
    description: "Boost productivity with time management.",
    attachment: "time-management.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-15"),
    draftedAt: null,
    updatedAt: new Date("2025-02-07"),
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "12",
    trainingProgramName: "Advanced JavaScript",
    trainingType: "Technical",
    programItems: "Closures, Async/Await, ES6+",
    point: "60",
    trainingMode: "Online",
    departments: "Engineering",
    applyPosition: "Frontend Developer",
    description: "In-depth JavaScript concepts for developers.",
    attachment: "advanced-js.pdf",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: new Date("2025-01-28"),
    draftedAt: null,
    updatedAt: new Date("2025-02-16"),
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

  const [gridData, setGridData] = useState(trainingProgramsData);
  const canDelete: boolean = usePermission("trainingPrograms", "delete");
  const canRestore: boolean = usePermission("trainingPrograms", "restore");
  const canEdit: boolean = usePermission("trainingPrograms", "edit");

  // Debug permissions
  console.log("trainingPrograms Permissions:", {
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
      id: `${Date.now()}-${index}`,

      trainingProgramName: `Training Program ${index + 1}`,
      trainingType: `Training Type ${index + 1}`,
      programItems: `Program Items ${index + 1}`,
      point: `Point ${index + 1}`,
      trainingMode: `Training Mode ${index + 1}`,
      departments: `Departments ${index + 1}`,
      applyPosition: `Apply Position ${index + 1}`,
      description: `Description ${index + 1}`,
      attachment: `Attachment ${index + 1}`,

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

  // Filter leaves based on search query
  const filteredData = gridData.filter(
    (item) =>
      item.trainingProgramName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.trainingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.programItems.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.point.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.trainingMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.departments.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.applyPosition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.attachment.toLowerCase().includes(searchQuery.toLowerCase())
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
          Total {gridData.length} Training Programs
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
                    onClick={() => navigate(`/training-programs/1`)}
                  >
                    {item.trainingProgramName}
                  </CardTitle>

                  <div className="text-end">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Training Type
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.trainingType}
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Grid with 3 columns: Leave Type | Actions | Notes */}
                <div className="grid grid-cols-3 items-center gap-4 pt-2 dark:border-gray-700">
                  {/* Leave Type - Left aligned */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Point
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.point}
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
                            toastRestore(
                              "Training Program restored successfully"
                            );
                          } else {
                            if (canDelete) {
                              handleDeleteClick(item.id);
                              toastDelete(
                                "Training Program deleted successfully"
                              );
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
                          onClick={() => navigate(`/training-programs/edit/1`)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Training Mode
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.trainingMode}
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
                <span className="text-sm">
                  Loading more training programs...
                </span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && gridData.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more training programs to load
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
