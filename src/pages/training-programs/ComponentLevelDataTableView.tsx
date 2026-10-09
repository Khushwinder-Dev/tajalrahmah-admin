/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  trainingProgramName: string;
  trainingType: string;
  programItems: string;
  point: string;
  trainingMode: string;
  departments: string;
  applyPosition: string;
  description: string;
  attachment: string;

  status: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

const mockTableData: TabDataType[] = [
  {
    id: "1",
    trainingProgramName: "React.js Fundamentals",
    trainingType: "Technical",
    programItems: "JSX, Components, Props, State",
    point: "50",
    trainingMode: "Online",
    departments: "Engineering",
    applyPosition: "Frontend Developer",
    description: "Introduction to React.js for modern web apps.",
    attachment: "react-fundamentals.pdf",
    status: "Active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-02-05T12:30:00Z",
    draftedAt: null,
    actionMessage: "Activated successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
    description: "Deep dive into Next.js for scalable apps.",
    attachment: "nextjs-advanced.pdf",
    status: "Updated",
    createdAt: "2025-01-15T09:30:00Z",
    updatedAt: "2025-02-12T11:20:00Z",
    draftedAt: null,
    actionMessage: "Content updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
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
    description: "Foundations of UI/UX design with projects.",
    attachment: "uiux-basics.pdf",
    status: "Draft",
    createdAt: "2025-01-20T14:10:00Z",
    updatedAt: "2025-01-22T08:45:00Z",
    draftedAt: "2025-01-20T14:10:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
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
    description: "Master Agile methodology and Scrum practices.",
    attachment: "agile-scrum.pdf",
    status: "Deleted",
    createdAt: "2025-01-18T13:00:00Z",
    updatedAt: "2025-01-25T09:15:00Z",
    draftedAt: null,
    actionMessage: "Program removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
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
    description: "Understand core cybersecurity principles.",
    attachment: "cybersecurity.pdf",
    status: "Active",
    createdAt: "2025-01-12T16:40:00Z",
    updatedAt: "2025-02-03T10:25:00Z",
    draftedAt: null,
    actionMessage: "Activated successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
    description: "Develop leadership and mentoring skills.",
    attachment: "leadership.pdf",
    status: "Draft",
    createdAt: "2025-01-05T08:00:00Z",
    updatedAt: "2025-01-06T09:30:00Z",
    draftedAt: "2025-01-05T08:00:00Z",
    actionMessage: "Draft in progress",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
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
    description: "Practical Excel training for analysis.",
    attachment: "excel-analysis.pdf",
    status: "Active",
    createdAt: "2025-01-18T12:10:00Z",
    updatedAt: "2025-02-08T17:00:00Z",
    draftedAt: null,
    actionMessage: "Program launched",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    trainingProgramName: "Cloud Computing Basics",
    trainingType: "Technical",
    programItems: "AWS, Azure, Google Cloud",
    point: "65",
    trainingMode: "Hybrid",
    departments: "Engineering",
    applyPosition: "Cloud Engineer",
    description: "Introduction to cloud platforms.",
    attachment: "cloud-computing.pdf",
    status: "Updated",
    createdAt: "2025-02-01T11:25:00Z",
    updatedAt: "2025-02-14T15:10:00Z",
    draftedAt: null,
    actionMessage: "Content updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
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
    description: "Improve professional communication.",
    attachment: "communication.pdf",
    status: "Active",
    createdAt: "2025-01-22T10:15:00Z",
    updatedAt: "2025-02-10T09:50:00Z",
    draftedAt: null,
    actionMessage: "Active and ongoing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
    description: "Learn digital marketing strategies.",
    attachment: "digital-marketing.pdf",
    status: "Deleted",
    createdAt: "2025-01-28T13:30:00Z",
    updatedAt: "2025-02-01T11:20:00Z",
    draftedAt: null,
    actionMessage: "Marked as deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
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
    description: "Boost productivity with effective planning.",
    attachment: "time-management.pdf",
    status: "Active",
    createdAt: "2025-01-15T09:00:00Z",
    updatedAt: "2025-02-05T08:45:00Z",
    draftedAt: null,
    actionMessage: "Available to all employees",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
    description: "In-depth JavaScript concepts.",
    attachment: "advanced-js.pdf",
    status: "Updated",
    createdAt: "2025-01-28T07:20:00Z",
    updatedAt: "2025-02-15T12:40:00Z",
    draftedAt: null,
    actionMessage: "Training material updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function ComponentLevelDataTableView({
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
}) {
  const canCreate = usePermission("awardLists", "create");

  const componentColumns = [
    {
      accessorKey: "trainingProgramName",
      title: "Training Program Name",
      options: [
        ...new Set(mockTableData.map((item) => item.trainingProgramName)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("trainingProgramName")
          .localeCompare(row2.getValue("trainingProgramName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "trainingProgramName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "trainingType",
      title: "Training Type",
      options: [...new Set(mockTableData.map((item) => item.trainingType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("trainingType")
          .localeCompare(row2.getValue("trainingType"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "trainingType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "programItems",
      title: "Program Items",
      options: [...new Set(mockTableData.map((item) => item.programItems))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("programItems")
          .localeCompare(row2.getValue("programItems"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "programItems",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "point",
      title: "Point",
      options: [...new Set(mockTableData.map((item) => item.point))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("point").localeCompare(row2.getValue("point"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "point",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "trainingMode",
      title: "Training Mode",
      options: [...new Set(mockTableData.map((item) => item.trainingMode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("trainingMode")
          .localeCompare(row2.getValue("trainingMode"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "trainingMode",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "departments",
      title: "Departments",
      options: [...new Set(mockTableData.map((item) => item.departments))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("departments")
          .localeCompare(row2.getValue("departments"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "departments",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockTableData.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "description",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 180,
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
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 180,
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
        const cellValue = row.getValue(columnId);
        if (!cellValue) return false;
        const dateValue = new Date(cellValue as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(dateValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = row1.getValue("draftedAt");
        const date2 = row2.getValue("draftedAt");
        if (!date1 && !date2) return 0;
        if (!date1) return 1;
        if (!date2) return -1;
        return new Date(date1).getTime() - new Date(date2).getTime();
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockTableData.filter((leave) => {
    if (dataTableFilter.status === "Active") {
      return leave.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !leave.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return leave.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return leave.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return leave.isUpdated;
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
      fixedColumns={["trainingProgramName", "trainingType"]} // Pin leave types column
      pathName="training-programs"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
