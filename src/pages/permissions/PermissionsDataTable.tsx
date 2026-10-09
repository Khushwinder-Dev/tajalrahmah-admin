/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type MockDataType = {
  id: string;

  code: string;
  name: string;
  Role: string;

  add: boolean;
  edit: boolean;
  view: boolean;
  delete: boolean;
  import: boolean;
  export: boolean;
  pdf: boolean;
  print: boolean;
  history: boolean;
  restore: boolean;

  status: string;
  actionMessage: string;

  draftedAt: string;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

const mockPermissionsData: MockDataType[] = [
  {
    id: "1",
    code: "ADM001",
    name: "Admin Dashboard",
    Role: "Admin",
    add: true,
    edit: true,
    view: true,
    delete: true,
    import: true,
    export: true,
    pdf: true,
    print: true,
    history: true,
    restore: true,
    status: "Active",
    actionMessage: "Full access granted",
    draftedAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-07-20T14:30:00Z",
    createdAt: "2025-01-01T10:00:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    code: "USR002",
    name: "User Management",
    Role: "Manager",
    add: true,
    edit: true,
    view: true,
    delete: false,
    import: false,
    export: true,
    pdf: false,
    print: true,
    history: true,
    restore: false,
    status: "Active",
    actionMessage: "Limited access to user module",
    draftedAt: "2025-01-15T11:20:00Z",
    updatedAt: "2025-05-10T09:00:00Z",
    createdAt: "2025-01-10T08:45:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    code: "FIN003",
    name: "Finance Reports",
    Role: "Accountant",
    add: false,
    edit: false,
    view: true,
    delete: false,
    import: false,
    export: true,
    pdf: true,
    print: true,
    history: true,
    restore: false,
    status: "Active",
    actionMessage: "View and export finance reports",
    draftedAt: "2025-02-10T13:00:00Z",
    updatedAt: "2025-06-01T10:00:00Z",
    createdAt: "2025-02-01T09:00:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    code: "INV004",
    name: "Inventory",
    Role: "Staff",
    add: true,
    edit: true,
    view: true,
    delete: true,
    import: false,
    export: false,
    pdf: false,
    print: false,
    history: false,
    restore: false,
    status: "Draft",
    actionMessage: "Draft version for inventory access",
    draftedAt: "2025-07-01T08:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z",
    createdAt: "2025-06-25T10:00:00Z",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    code: "ORD005",
    name: "Order Processing",
    Role: "Operator",
    add: true,
    edit: true,
    view: true,
    delete: false,
    import: true,
    export: true,
    pdf: false,
    print: false,
    history: false,
    restore: false,
    status: "Inactive",
    actionMessage: "Temporarily disabled",
    draftedAt: "2025-03-01T12:00:00Z",
    updatedAt: "2025-06-15T10:00:00Z",
    createdAt: "2025-02-20T11:00:00Z",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    code: "PRD006",
    name: "Product List",
    Role: "Editor",
    add: true,
    edit: true,
    view: true,
    delete: false,
    import: false,
    export: true,
    pdf: false,
    print: false,
    history: true,
    restore: true,
    status: "Active",
    actionMessage: "Updated export rights",
    draftedAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-07-29T15:00:00Z",
    createdAt: "2025-01-01T07:30:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    code: "SAL007",
    name: "Sales Records",
    Role: "Sales",
    add: true,
    edit: false,
    view: true,
    delete: false,
    import: false,
    export: true,
    pdf: true,
    print: true,
    history: false,
    restore: false,
    status: "Active",
    actionMessage: "Sales team read-only with export",
    draftedAt: "2025-01-20T10:00:00Z",
    updatedAt: "2025-03-01T12:00:00Z",
    createdAt: "2025-01-20T10:00:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    code: "HR008",
    name: "HR Panel",
    Role: "HR",
    add: false,
    edit: true,
    view: true,
    delete: false,
    import: false,
    export: false,
    pdf: true,
    print: false,
    history: true,
    restore: true,
    status: "Active",
    actionMessage: "HR can edit/view, limited export",
    draftedAt: "2025-04-01T09:00:00Z",
    updatedAt: "2025-06-01T09:00:00Z",
    createdAt: "2025-03-25T09:00:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    code: "LOG009",
    name: "Audit Logs",
    Role: "Auditor",
    add: false,
    edit: false,
    view: true,
    delete: false,
    import: false,
    export: true,
    pdf: true,
    print: true,
    history: true,
    restore: false,
    status: "Active",
    actionMessage: "Audit read-only with export tools",
    draftedAt: "2025-02-10T08:00:00Z",
    updatedAt: "2025-07-20T14:00:00Z",
    createdAt: "2025-02-05T08:00:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    code: "CMP010",
    name: "Complaints",
    Role: "Support",
    add: true,
    edit: true,
    view: true,
    delete: true,
    import: false,
    export: false,
    pdf: false,
    print: false,
    history: false,
    restore: true,
    status: "Draft",
    actionMessage: "Pending final approval",
    draftedAt: "2025-07-15T10:00:00Z",
    updatedAt: "2025-07-15T10:00:00Z",
    createdAt: "2025-07-10T09:00:00Z",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    code: "TRN011",
    name: "Training Module",
    Role: "Trainer",
    add: true,
    edit: false,
    view: true,
    delete: false,
    import: true,
    export: false,
    pdf: true,
    print: true,
    history: false,
    restore: false,
    status: "Active",
    actionMessage: "Trainer can add and print content",
    draftedAt: "2025-03-01T08:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
    createdAt: "2025-02-20T07:00:00Z",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    code: "ARC012",
    name: "Archived Records",
    Role: "Archive Manager",
    add: false,
    edit: false,
    view: true,
    delete: false,
    import: false,
    export: true,
    pdf: true,
    print: true,
    history: true,
    restore: true,
    status: "Inactive",
    actionMessage: "Archived module - no edits",
    draftedAt: "2025-05-01T08:00:00Z",
    updatedAt: "2025-06-15T09:00:00Z",
    createdAt: "2025-04-20T08:30:00Z",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function CountriesDataTable2({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowVisibility,
  showVisibility,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
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
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
}) {
  const canCreate = usePermission("permissions", "create");

  const permissionFields = [
    { key: "add", title: "Add" },
    { key: "edit", title: "Edit" },
    { key: "view", title: "View" },
    { key: "delete", title: "Delete" },
    { key: "import", title: "Import" },
    { key: "export", title: "Export" },
    { key: "pdf", title: "PDF" },
    { key: "print", title: "Print" },
    { key: "history", title: "History" },
    { key: "restore", title: "Restore" },
  ];

  const componentColumns = [
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockPermissionsData.map((item) => item.code))],
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
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockPermissionsData.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "Role",
      title: "Role",
      options: [...new Set(mockPermissionsData.map((item) => item.Role))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("Role").localeCompare(row2.getValue("Role"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "Role",
        readOnly: !canCreate,
      },
    },
    // Insert all permission columns here
    ...permissionFields.map(({ key, title }) => ({
      accessorKey: key,
      title,
      options: ["Yes", "No"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const value = row.getValue(columnId);
        const label = value ? "Yes" : "No";
        return filterValue.includes(label);
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue(key) ? 1 : 0;
        const val2 = row2.getValue(key) ? 1 : 0;
        return val1 - val2;
      },
      cell: (info: any) => {
        const value = info.getValue();
        return (
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold \
              ${
                value
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
          >
            {value ? "Yes" : "No"}
          </span>
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: key,
        readOnly: !canCreate,
      },
    })),
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

  const filteredData = mockPermissionsData.filter((country) => {
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
      fixedColumns={["title"]} // Pin country name column
      pathName="countries"
      setShowExport={setIsExportOpen}
      showExport={isExportOpen}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      setShowFilter={setIsFilterOpen}
      showFilter={isFilterOpen}
    />
  );
}
