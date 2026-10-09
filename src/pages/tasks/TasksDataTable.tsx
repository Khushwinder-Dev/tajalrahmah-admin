/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Task interface to match the grid component
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
  status: "Active" | "Pending" | "Draft" | "Rejected";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockTasks: TaskItem[] = [
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
    description: "Set up complete user authentication system with JWT tokens.",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    draftedAt: "2024-01-14",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
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
    description: "Design and implement the complete database schema.",
    status: "Active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
    draftedAt: "2024-01-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
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
    description: "Create comprehensive API documentation for all endpoints.",
    status: "Draft",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
    draftedAt: "2024-01-16",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
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
    description: "Complete redesign of the application interface.",
    status: "Pending",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
    draftedAt: "2024-01-17",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
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
    description: "Identify and fix performance bottlenecks.",
    status: "Active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
    draftedAt: "2024-01-18",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
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
    description: "Conduct comprehensive security audit.",
    status: "Active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
    draftedAt: "2024-01-19",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
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
    description: "Develop cross-platform mobile application.",
    status: "Pending",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-21",
    draftedAt: "2024-01-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
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
    description: "Implement comprehensive testing suite.",
    status: "Draft",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22",
    draftedAt: "2024-01-21",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    subject: "Code Review Process",
    hourlyRate: 80,
    startDate: "2024-01-23",
    dueDate: "2024-01-27",
    priority: "Medium",
    repeatEvery: "Daily",
    relatedTo: "Development",
    assignees: ["Michael Johnson"],
    followers: ["Jessica Wilson"],
    checklist: [
      { item: "Review pull requests", completed: false },
      { item: "Provide feedback", completed: false },
      { item: "Approve changes", completed: false },
    ],
    tags: ["Code Review", "Quality", "Development"],
    description: "Establish comprehensive code review process.",
    status: "Active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-22",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    subject: "System Integration Testing",
    hourlyRate: 88,
    startDate: "2024-01-24",
    dueDate: "2024-02-05",
    priority: "High",
    repeatEvery: "None",
    relatedTo: "Quality Assurance",
    assignees: ["William Davis"],
    followers: ["Ashley Brown"],
    checklist: [
      { item: "Test API integration", completed: false },
      { item: "Test database connections", completed: false },
      { item: "Test third-party services", completed: false },
    ],
    tags: ["Integration", "Testing", "QA"],
    description: "Test all system integrations thoroughly.",
    status: "Rejected",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-24",
    draftedAt: "2024-01-23",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    subject: "DevOps Pipeline Setup",
    hourlyRate: 105,
    startDate: "2024-01-25",
    dueDate: "2024-02-10",
    priority: "Urgent",
    repeatEvery: "None",
    relatedTo: "Infrastructure",
    assignees: ["Thomas Wilson"],
    followers: ["Nicole Garcia"],
    checklist: [
      { item: "Setup CI/CD pipeline", completed: false },
      { item: "Configure deployment", completed: false },
      { item: "Test automation", completed: false },
    ],
    tags: ["DevOps", "CI/CD", "Infrastructure"],
    description: "Setup complete DevOps pipeline for deployment.",
    status: "Active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
    draftedAt: "2024-01-24",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    subject: "User Feedback Analysis",
    hourlyRate: 65,
    startDate: "2024-01-26",
    dueDate: "2024-02-02",
    priority: "Low",
    repeatEvery: "Monthly",
    relatedTo: "Product Management",
    assignees: ["Richard Martinez"],
    followers: ["Kimberly Lee"],
    checklist: [
      { item: "Collect user feedback", completed: false },
      { item: "Analyze data", completed: false },
      { item: "Create action plan", completed: false },
    ],
    tags: ["User Research", "Feedback", "Product"],
    description: "Analyze user feedback and create improvement plan.",
    status: "Draft",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-26",
    draftedAt: "2024-01-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function TasksDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
  isFilterOpen,
  setIsFilterOpen,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const { canCreate } = useCountriesPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "subject",
      title: "Subject",
      options: [...new Set(mockTasks.map((item) => item.subject))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("subject").localeCompare(row2.getValue("subject"));
      },
      size: isMobile ? 200 : 250,
      minSize: 180,
      meta: {
        exportLabel: "Subject",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "priority",
      title: "Priority",
      options: [...new Set(mockTasks.map((item) => item.priority))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const priorityOrder = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
        const priority1 =
          priorityOrder[
            row1.getValue("priority") as keyof typeof priorityOrder
          ] || 0;
        const priority2 =
          priorityOrder[
            row2.getValue("priority") as keyof typeof priorityOrder
          ] || 0;
        return priority2 - priority1;
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "Priority",
        readOnly: true,
      },
    },
    {
      accessorKey: "hourlyRate",
      title: "Hourly Rate",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("hourlyRate") - row2.getValue("hourlyRate");
      },
      size: isMobile ? 120 : 150,
      minSize: 100,
      meta: {
        exportLabel: "Hourly Rate",
        readOnly: true,
      },
    },
    {
      accessorKey: "startDate",
      title: "Start Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
          return false;
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("startDate"));
        const date2 = new Date(row2.getValue("startDate"));

        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Start Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "dueDate",
      title: "Due Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
          return false;
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("dueDate"));
        const date2 = new Date(row2.getValue("dueDate"));

        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Due Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "relatedTo",
      title: "Related To",
      options: [...new Set(mockTasks.map((item) => item.relatedTo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("relatedTo")
          .localeCompare(row2.getValue("relatedTo"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Related To",
        readOnly: true,
      },
    },
    {
      accessorKey: "repeatEvery",
      title: "Repeat Every",
      options: [...new Set(mockTasks.map((item) => item.repeatEvery))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("repeatEvery")
          .localeCompare(row2.getValue("repeatEvery"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Repeat Every",
        readOnly: true,
      },
    },
    {
      accessorKey: "assignees",
      title: "Assignees",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string[];
        return filterValue.some((filterVal: string) =>
          cellValue.some((assignee) =>
            assignee.toLowerCase().includes(filterVal.toLowerCase())
          )
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const assignees1 = row1.getValue("assignees") as string[];
        const assignees2 = row2.getValue("assignees") as string[];
        return assignees1.join(", ").localeCompare(assignees2.join(", "));
      },
      size: isMobile ? 180 : 220,
      minSize: 180,
      meta: {
        exportLabel: "Assignees",
        readOnly: true,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockTasks.filter((item: TaskItem) => {
    // States use the same flags for demo
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["subject", "status"]}
      pathName="tasks"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
