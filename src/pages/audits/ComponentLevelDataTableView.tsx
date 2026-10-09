/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  auditTitle: string;
  auditor: string;
  auditDate: string;

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
    auditTitle: "Financial Compliance Audit",
    auditor: "John Smith",
    auditDate: "2025-01-15",
    status: "Completed",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-16",
    draftedAt: null,
    actionMessage: "Audit successfully completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    auditTitle: "HR Policy Review",
    auditor: "Emma Johnson",
    auditDate: "2025-02-10",
    status: "Pending",
    createdAt: "2025-01-20",
    updatedAt: "2025-02-05",
    draftedAt: null,
    actionMessage: "Audit scheduled for February",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    auditTitle: "IT Security Audit",
    auditor: "Michael Brown",
    auditDate: "2025-02-20",
    status: "In Progress",
    createdAt: "2025-01-25",
    updatedAt: "2025-02-18",
    draftedAt: null,
    actionMessage: "Security vulnerabilities under review",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    auditTitle: "Environmental Compliance Check",
    auditor: "Sophia Williams",
    auditDate: "2025-03-01",
    status: "Pending",
    createdAt: "2025-02-01",
    updatedAt: "2025-02-25",
    draftedAt: null,
    actionMessage: "Audit scheduled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    auditTitle: "Internal Financial Review",
    auditor: "David Wilson",
    auditDate: "2025-03-15",
    status: "Completed",
    createdAt: "2025-02-10",
    updatedAt: "2025-03-16",
    draftedAt: null,
    actionMessage: "Review completed and closed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    auditTitle: "Quality Control Inspection",
    auditor: "Olivia Taylor",
    auditDate: "2025-04-05",
    status: "In Progress",
    createdAt: "2025-03-01",
    updatedAt: "2025-04-02",
    draftedAt: null,
    actionMessage: "Inspection ongoing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    auditTitle: "Warehouse Safety Audit",
    auditor: "James Anderson",
    auditDate: "2025-04-20",
    status: "Draft",
    createdAt: "2025-03-15",
    updatedAt: "2025-03-19",
    draftedAt: "2025-03-18",
    actionMessage: "Draft version created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    auditTitle: "Supplier Process Audit",
    auditor: "Isabella Martinez",
    auditDate: "2025-05-10",
    status: "Completed",
    createdAt: "2025-04-01",
    updatedAt: "2025-05-11",
    draftedAt: null,
    actionMessage: "Supplier audit finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    auditTitle: "Customer Service Evaluation",
    auditor: "William Thomas",
    auditDate: "2025-05-25",
    status: "Rejected",
    createdAt: "2025-04-15",
    updatedAt: "2025-05-26",
    draftedAt: null,
    actionMessage: "Audit rejected due to inconsistencies",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    auditTitle: "Annual Financial Audit",
    auditor: "Mia Garcia",
    auditDate: "2025-06-15",
    status: "Completed",
    createdAt: "2025-05-01",
    updatedAt: "2025-06-16",
    draftedAt: null,
    actionMessage: "Annual audit finished successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    auditTitle: "Data Privacy Compliance",
    auditor: "Benjamin Lee",
    auditDate: "2025-07-01",
    status: "In Progress",
    createdAt: "2025-05-20",
    updatedAt: "2025-06-28",
    draftedAt: null,
    actionMessage: "Data review ongoing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    auditTitle: "Production Line Safety",
    auditor: "Charlotte Harris",
    auditDate: "2025-07-20",
    status: "Pending",
    createdAt: "2025-06-10",
    updatedAt: "2025-07-05",
    draftedAt: null,
    actionMessage: "Audit scheduled for July",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
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
  const canCreate = usePermission("warranties", "create");

  const componentColumns = [
    {
      accessorKey: "auditTitle",
      title: "Title",
      options: [...new Set(mockTableData.map((item) => item.auditTitle))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("auditTitle")
          .localeCompare(row2.getValue("auditTitle"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "auditTitle",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "auditDate",
      title: "Audit Date",
      options: [...new Set(mockTableData.map((item) => item.auditDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("auditDate")
          .localeCompare(row2.getValue("auditDate"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "auditDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "auditor",
      title: "Auditor",
      options: [...new Set(mockTableData.map((item) => item.auditor))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("auditor").localeCompare(row2.getValue("auditor"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "auditor",
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
      fixedColumns={["auditTitle", "auditDate"]} // Pin leave types column
      pathName="audits"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
