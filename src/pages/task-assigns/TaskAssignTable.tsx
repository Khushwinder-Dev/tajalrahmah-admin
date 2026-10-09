/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

type TaskAssignDataType = {
  code: string;
  branch: string;
  Employee: string;
  Date: string;
  Timeline: string;
  Description: string;

  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  actionMessage: string;
  status: string;

  isDeleted: boolean;
  isActive: boolean;
  isDraft: boolean;
  isUpdated: boolean;
};

const taskAssignData: TaskAssignDataType[] = [
  {
    code: "TASK-001",
    branch: "Dhaka",
    Employee: "Rahim Uddin",
    Date: "2025-08-01",
    Timeline: "2 weeks",
    Description: "Setup project repository and CI/CD pipelines.",
    createdAt: "2025-07-30 09:30:00",
    updatedAt: "2025-07-31 10:00:00",
    draftedAt: "2025-07-29 14:15:00",
    actionMessage: "Task created",
    status: "active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-002",
    branch: "Chattogram",
    Employee: "Shuvo Roy",
    Date: "2025-08-03",
    Timeline: "1 week",
    Description: "Design dashboard wireframes.",
    createdAt: "2025-07-31 16:00:00",
    updatedAt: "2025-08-01 09:00:00",
    draftedAt: "2025-07-31 15:00:00",
    actionMessage: "Draft saved",
    status: "draft",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: true,
  },
  {
    code: "TASK-003",
    branch: "Khulna",
    Employee: "Nusrat Jahan",
    Date: "2025-08-05",
    Timeline: "3 days",
    Description: "Gather requirements from stakeholders.",
    createdAt: "2025-08-01 11:20:00",
    updatedAt: "2025-08-02 08:30:00",
    draftedAt: "2025-07-31 13:20:00",
    actionMessage: "Updated timeline",
    status: "inactive",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: true,
  },
  {
    code: "TASK-004",
    branch: "Sylhet",
    Employee: "Hasib Hasan",
    Date: "2025-08-06",
    Timeline: "1 month",
    Description: "Develop authentication module.",
    createdAt: "2025-07-29 10:45:00",
    updatedAt: "2025-07-30 10:45:00",
    draftedAt: "2025-07-28 15:30:00",
    actionMessage: "Marked active",
    status: "active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-005",
    branch: "Dhaka",
    Employee: "Maliha Akter",
    Date: "2025-08-08",
    Timeline: "2 weeks",
    Description: "Prepare API documentation.",
    createdAt: "2025-08-01 09:00:00",
    updatedAt: "2025-08-02 11:00:00",
    draftedAt: "2025-07-30 13:00:00",
    actionMessage: "Awaiting approval",
    status: "inactive",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-006",
    branch: "Rajshahi",
    Employee: "Jamil Khan",
    Date: "2025-08-10",
    Timeline: "10 days",
    Description: "Implement role-based access.",
    createdAt: "2025-08-02 08:20:00",
    updatedAt: "2025-08-05 10:00:00",
    draftedAt: "2025-08-01 12:00:00",
    actionMessage: "Task soft deleted",
    status: "inactive",
    isDeleted: true,
    isActive: false,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-007",
    branch: "Barishal",
    Employee: "Mahima Rahman",
    Date: "2025-08-11",
    Timeline: "5 days",
    Description: "Setup Docker test environment.",
    createdAt: "2025-08-03 14:10:00",
    updatedAt: "2025-08-04 14:40:00",
    draftedAt: "2025-08-02 09:00:00",
    actionMessage: "Converted from draft",
    status: "active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-008",
    branch: "Rangpur",
    Employee: "Faridul Islam",
    Date: "2025-08-12",
    Timeline: "8 days",
    Description: "Prepare quarterly audit report.",
    createdAt: "2025-08-03 10:00:00",
    updatedAt: "2025-08-05 12:00:00",
    draftedAt: "2025-08-02 16:00:00",
    actionMessage: "Audit scheduled",
    status: "inactive",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-009",
    branch: "Mymensingh",
    Employee: "Tanvir Hossain",
    Date: "2025-08-15",
    Timeline: "12 days",
    Description: "Optimize database queries.",
    createdAt: "2025-08-04 09:00:00",
    updatedAt: "2025-08-06 10:00:00",
    draftedAt: "2025-08-03 09:30:00",
    actionMessage: "Timeline extended",
    status: "inactive",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: true,
  },
  {
    code: "TASK-010",
    branch: "Cumilla",
    Employee: "Rafiq Ahmed",
    Date: "2025-08-13",
    Timeline: "7 days",
    Description: "Create responsive email templates.",
    createdAt: "2025-08-03 14:00:00",
    updatedAt: "2025-08-04 09:00:00",
    draftedAt: "2025-08-02 10:20:00",
    actionMessage: "Draft approved",
    status: "active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-011",
    branch: "Narshingdi",
    Employee: "Nadia Islam",
    Date: "2025-08-14",
    Timeline: "4 days",
    Description: "Design landing page hero section.",
    createdAt: "2025-08-01 13:15:00",
    updatedAt: "2025-08-02 15:00:00",
    draftedAt: "2025-07-31 11:00:00",
    actionMessage: "Activated",
    status: "active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    code: "TASK-012",
    branch: "Gazipur",
    Employee: "Yasin Ali",
    Date: "2025-08-16",
    Timeline: "6 days",
    Description: "Integrate payment gateway.",
    createdAt: "2025-08-05 09:45:00",
    updatedAt: "2025-08-07 10:45:00",
    draftedAt: "2025-08-04 10:30:00",
    actionMessage: "Under review",
    status: "inactive",
    isDeleted: false,
    isActive: false,
    isDraft: true,
    isUpdated: false,
  },
];

export default function CountriesDataTable2({
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
  const { canCreate } = useCountriesPermissions();

  const componentColumns = [
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(taskAssignData.map((item) => item.branch))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "branch",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(taskAssignData.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "Employee",
      title: "Employee",
      options: [...new Set(taskAssignData.map((item) => item.Employee))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("Employee")
          .localeCompare(row2.getValue("Employee"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Employee",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "Date",
      title: "Date",
      options: [...new Set(taskAssignData.map((item) => item.Date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("Date").localeCompare(row2.getValue("Date"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "Timeline",
      title: "Timeline",
      options: [...new Set(taskAssignData.map((item) => item.Timeline))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("Timeline")
          .localeCompare(row2.getValue("Timeline"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Timeline",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "Description",
      title: "Description",
      options: [...new Set(taskAssignData.map((item) => item.Description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("Description")
          .localeCompare(row2.getValue("Description"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Description",
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
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("draftedAt")).getTime() -
          new Date(row2.getValue("draftedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = taskAssignData.filter((country) => {
    if (dataTableFilter.status === "Active") {
      return country.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !country.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return country.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return country.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return country.isUpdated;
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
      fixedColumns={["branch", "code"]} // Pin country name column
      pathName="task-assigns"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
