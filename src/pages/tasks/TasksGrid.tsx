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

// Task interface
interface TaskItem {
  id: string;
  subject: string;
  hourlyRate: number;
  startDate: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  repeatEvery: string;
  relatedTo: string;
  assignees: string[];
  followers: string[];
  checklist: { item: string; completed: boolean }[];
  tags: string[];
  description: string;
}

// Mock data - replace with real data from your API
const tasks: TaskItem[] = [
  {
    id: "1",
    subject: "Implement User Authentication",
    hourlyRate: 75,
    startDate: "2024-01-15",
    dueDate: "2024-01-22",
    priority: "High",
    repeatEvery: "None",
    relatedTo: "Project Alpha",
    assignees: ["John Smith", "Sarah Johnson"],
    followers: ["Mike Wilson", "Emily Davis"],
    checklist: [
      { item: "Setup authentication provider", completed: true },
      { item: "Create login page", completed: true },
      { item: "Implement JWT tokens", completed: false },
    ],
    tags: ["Authentication", "Security", "Backend"],
    description:
      "Set up complete user authentication system with JWT tokens and secure password handling.",
  },
  {
    id: "2",
    subject: "Database Schema Design",
    hourlyRate: 85,
    startDate: "2024-01-16",
    dueDate: "2024-01-20",
    priority: "Urgent",
    repeatEvery: "None",
    relatedTo: "Project Alpha",
    assignees: ["David Brown"],
    followers: ["Lisa Anderson", "Robert Taylor"],
    checklist: [
      { item: "Design user tables", completed: true },
      { item: "Create relationships", completed: false },
      { item: "Add indexes", completed: false },
    ],
    tags: ["Database", "Architecture", "Planning"],
    description:
      "Design and implement the complete database schema for the new application.",
  },
  {
    id: "3",
    subject: "API Documentation",
    hourlyRate: 60,
    startDate: "2024-01-17",
    dueDate: "2024-01-25",
    priority: "Medium",
    repeatEvery: "Weekly",
    relatedTo: "Project Beta",
    assignees: ["James Miller", "Amanda Garcia"],
    followers: ["Christopher Lee"],
    checklist: [
      { item: "Document endpoints", completed: false },
      { item: "Add examples", completed: false },
      { item: "Review with team", completed: false },
    ],
    tags: ["Documentation", "API", "Technical Writing"],
    description:
      "Create comprehensive API documentation for all endpoints with examples and use cases.",
  },
  {
    id: "4",
    subject: "UI/UX Redesign",
    hourlyRate: 90,
    startDate: "2024-01-18",
    dueDate: "2024-02-01",
    priority: "Medium",
    repeatEvery: "None",
    relatedTo: "Project Gamma",
    assignees: ["Michelle Rodriguez", "Rachel Thompson"],
    followers: ["Kevin Martinez", "Stephanie Lewis"],
    checklist: [
      { item: "Create wireframes", completed: true },
      { item: "Design mockups", completed: true },
      { item: "Get stakeholder approval", completed: false },
    ],
    tags: ["Design", "UI", "UX", "Frontend"],
    description:
      "Complete redesign of the application interface with modern UI/UX principles.",
  },
  {
    id: "5",
    subject: "Performance Optimization",
    hourlyRate: 95,
    startDate: "2024-01-19",
    dueDate: "2024-01-26",
    priority: "High",
    repeatEvery: "Monthly",
    relatedTo: "Maintenance",
    assignees: ["Daniel Clark", "Jessica Wilson"],
    followers: ["Ashley Brown"],
    checklist: [
      { item: "Profile application", completed: true },
      { item: "Identify bottlenecks", completed: false },
      { item: "Implement fixes", completed: false },
    ],
    tags: ["Performance", "Optimization", "Backend"],
    description:
      "Identify and fix performance bottlenecks to improve application speed by 50%.",
  },
  {
    id: "6",
    subject: "Security Audit",
    hourlyRate: 100,
    startDate: "2024-01-20",
    dueDate: "2024-01-30",
    priority: "Urgent",
    repeatEvery: "Quarterly",
    relatedTo: "Security",
    assignees: ["William Davis", "Michael Johnson"],
    followers: ["John Smith"],
    checklist: [
      { item: "Run security scan", completed: false },
      { item: "Fix vulnerabilities", completed: false },
      { item: "Update dependencies", completed: false },
    ],
    tags: ["Security", "Audit", "Compliance"],
    description:
      "Conduct comprehensive security audit and fix all identified vulnerabilities.",
  },
  {
    id: "7",
    subject: "Mobile App Development",
    hourlyRate: 110,
    startDate: "2024-01-21",
    dueDate: "2024-02-15",
    priority: "High",
    repeatEvery: "None",
    relatedTo: "Project Delta",
    assignees: ["Sarah Johnson", "Emily Davis", "Lisa Anderson"],
    followers: ["Mike Wilson"],
    checklist: [
      { item: "Setup React Native", completed: true },
      { item: "Create base components", completed: false },
      { item: "Implement navigation", completed: false },
    ],
    tags: ["Mobile", "React Native", "Development"],
    description:
      "Develop cross-platform mobile application using React Native.",
  },
  {
    id: "8",
    subject: "Testing & QA",
    hourlyRate: 70,
    startDate: "2024-01-22",
    dueDate: "2024-01-29",
    priority: "Low",
    repeatEvery: "Weekly",
    relatedTo: "Quality Assurance",
    assignees: ["Jennifer White", "Amanda Garcia"],
    followers: ["James Miller", "David Brown"],
    checklist: [
      { item: "Write unit tests", completed: false },
      { item: "Write integration tests", completed: false },
      { item: "Run test suite", completed: false },
    ],
    tags: ["Testing", "QA", "Quality"],
    description:
      "Implement comprehensive testing suite including unit and integration tests.",
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function TasksGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Tasks grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [tasksData, setTasksData] = useState<TaskItem[]>(tasks);
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

    const subjects = [
      "Implement User Authentication",
      "Database Schema Design",
      "API Documentation",
      "UI/UX Redesign",
      "Performance Optimization",
      "Security Audit",
      "Mobile App Development",
      "Testing & QA",
      "Code Review",
      "Bug Fixing",
      "Feature Implementation",
      "System Integration",
    ];
    const priorities: ("Low" | "Medium" | "High" | "Urgent")[] = [
      "Low",
      "Medium",
      "High",
      "Urgent",
    ];
    const repeatOptions = ["None", "Daily", "Weekly", "Monthly", "Quarterly"];
    const relatedToOptions = [
      "Project Alpha",
      "Project Beta",
      "Project Gamma",
      "Project Delta",
      "Maintenance",
      "Security",
      "Quality Assurance",
      "Development",
    ];
    const assigneePool = [
      "John Smith",
      "Sarah Johnson",
      "Mike Wilson",
      "Emily Davis",
      "David Brown",
      "Lisa Anderson",
      "Robert Taylor",
      "Jennifer White",
      "James Miller",
      "Amanda Garcia",
    ];
    const followerPool = [
      "Christopher Lee",
      "Michelle Rodriguez",
      "Kevin Martinez",
      "Rachel Thompson",
      "Daniel Clark",
      "Stephanie Lewis",
      "Jessica Wilson",
      "Ashley Brown",
      "William Davis",
      "Michael Johnson",
    ];
    const tagOptions = [
      ["Authentication", "Security", "Backend"],
      ["Database", "Architecture", "Planning"],
      ["Documentation", "API", "Technical Writing"],
      ["Design", "UI", "UX", "Frontend"],
      ["Performance", "Optimization", "Backend"],
      ["Security", "Audit", "Compliance"],
      ["Mobile", "React Native", "Development"],
      ["Testing", "QA", "Quality"],
    ];

    const newItems: TaskItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const priority =
          priorities[Math.floor(Math.random() * priorities.length)];
        const repeatEvery =
          repeatOptions[Math.floor(Math.random() * repeatOptions.length)];
        const relatedTo =
          relatedToOptions[Math.floor(Math.random() * relatedToOptions.length)];
        const hourlyRate = Math.floor(Math.random() * 60) + 50; // 50-110
        const assigneeCount = Math.floor(Math.random() * 3) + 1;
        const followerCount = Math.floor(Math.random() * 3) + 1;
        const assignees = Array.from(
          { length: assigneeCount },
          () => assigneePool[Math.floor(Math.random() * assigneePool.length)]
        );
        const followers = Array.from(
          { length: followerCount },
          () => followerPool[Math.floor(Math.random() * followerPool.length)]
        );
        const tags = tagOptions[Math.floor(Math.random() * tagOptions.length)];
        const startDate = new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];
        const dueDate = new Date(
          Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];

        return {
          id: `${Date.now()}-${index}`,
          subject: `${subject} ${index + 1}`,
          hourlyRate,
          startDate,
          dueDate,
          priority,
          repeatEvery,
          relatedTo,
          assignees,
          followers,
          checklist: [
            { item: "Task setup", completed: Math.random() > 0.5 },
            { item: "Implementation", completed: Math.random() > 0.5 },
            { item: "Testing", completed: Math.random() > 0.5 },
          ],
          tags,
          description: `This is a ${priority.toLowerCase()} priority task related to ${relatedTo}.`,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (tasksData.length >= 46) {
      setHasMore(false);
    } else {
      setTasksData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [tasksData.length, isLoading, hasMore]);

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

  // Filter tasks based on search query (search across multiple fields)
  const filteredTasks = tasksData.filter(
    (item) =>
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.relatedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.repeatEvery.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignees.some((assignee) =>
        assignee.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      item.followers.some((follower) =>
        follower.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (typeId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/order-type/edit/${typeId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (taskId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/tasks/view/${taskId}?fromView=${viewMode}`);
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
            {filteredTasks.map((item, index) => {
              const priorityColors = {
                Low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                Medium:
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                High: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                Urgent:
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
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
                  {/* Task Header */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.subject}
                    </CardTitle>
                  </div>

                  {/* Priority Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        priorityColors[item.priority]
                      )}
                    >
                      {item.priority}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ${item.hourlyRate}/hr
                    </span>
                  </div>

                  {/* Task Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Start:</span>
                      <span className="truncate">{item.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Due:</span>
                      <span className="truncate">{item.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Related To:</span>
                      <span className="truncate">{item.relatedTo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Assignees:</span>
                      <span className="truncate">
                        {item.assignees.join(", ")}
                      </span>
                    </div>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
                <span className="text-sm">Loading more tasks...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredTasks.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more tasks to load
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
                data={tasks}
                setFilteredData={setTasksData}
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
                data={tasks}
                setFilteredData={setTasksData}
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
