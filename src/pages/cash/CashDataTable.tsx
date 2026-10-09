/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;
  branch: string;
  transferFrom: string;
  transferTo: string;
  transferAmount: string;

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
    id: "TC-001",
    branch: "Dhaka Main",
    transferFrom: "Cash Register 1",
    transferTo: "Cash Register 2",
    transferAmount: "5000",
    status: "Completed",
    createdAt: "2025-08-01T10:30:00",
    updatedAt: "2025-08-01T10:30:00",
    draftedAt: null,
    actionMessage: "Transfer completed successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-002",
    branch: "Chittagong Branch",
    transferFrom: "Cash Vault",
    transferTo: "ATM Machine 1",
    transferAmount: "15000",
    status: "Completed",
    createdAt: "2025-08-02T14:45:00",
    updatedAt: "2025-08-02T14:45:00",
    draftedAt: null,
    actionMessage: "Transfer to ATM completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-003",
    branch: "Sylhet Branch",
    transferFrom: "Cash Counter",
    transferTo: "Cash Vault",
    transferAmount: "8000",
    status: "Completed",
    createdAt: "2025-08-03T09:15:00",
    updatedAt: "2025-08-03T09:15:00",
    draftedAt: null,
    actionMessage: "Cash deposited to vault",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-004",
    branch: "Khulna Branch",
    transferFrom: "ATM Machine 2",
    transferTo: "Cash Vault",
    transferAmount: "12000",
    status: "Completed",
    createdAt: "2025-08-04T12:00:00",
    updatedAt: "2025-08-04T12:00:00",
    draftedAt: null,
    actionMessage: "ATM cash collected",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-005",
    branch: "Rajshahi Branch",
    transferFrom: "Cash Register 3",
    transferTo: "Cash Vault",
    transferAmount: "4000",
    status: "Draft",
    createdAt: "2025-08-05T08:45:00",
    updatedAt: "2025-08-05T08:45:00",
    draftedAt: "2025-08-05T08:45:00",
    actionMessage: "Draft created for transfer",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-006",
    branch: "Dhaka Main",
    transferFrom: "Cash Vault",
    transferTo: "ATM Machine 3",
    transferAmount: "25000",
    status: "Completed",
    createdAt: "2025-08-06T11:30:00",
    updatedAt: "2025-08-06T11:30:00",
    draftedAt: null,
    actionMessage: "Large ATM refill completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-007",
    branch: "Chittagong Branch",
    transferFrom: "Cash Register 4",
    transferTo: "Cash Vault",
    transferAmount: "9000",
    status: "Deleted",
    createdAt: "2025-08-07T16:20:00",
    updatedAt: "2025-08-07T16:20:00",
    draftedAt: null,
    actionMessage: "Transfer record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "TC-008",
    branch: "Sylhet Branch",
    transferFrom: "ATM Machine 4",
    transferTo: "Cash Vault",
    transferAmount: "17000",
    status: "Completed",
    createdAt: "2025-08-08T13:15:00",
    updatedAt: "2025-08-08T13:15:00",
    draftedAt: null,
    actionMessage: "ATM cash collection done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-009",
    branch: "Khulna Branch",
    transferFrom: "Cash Vault",
    transferTo: "Cash Counter",
    transferAmount: "6000",
    status: "Completed",
    createdAt: "2025-08-09T09:40:00",
    updatedAt: "2025-08-09T09:40:00",
    draftedAt: null,
    actionMessage: "Cash sent to counter",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-010",
    branch: "Rajshahi Branch",
    transferFrom: "Cash Counter",
    transferTo: "ATM Machine 5",
    transferAmount: "13000",
    status: "Updated",
    createdAt: "2025-08-10T10:50:00",
    updatedAt: "2025-08-11T09:15:00",
    draftedAt: null,
    actionMessage: "Transfer amount updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "TC-011",
    branch: "Dhaka Main",
    transferFrom: "Cash Vault",
    transferTo: "ATM Machine 6",
    transferAmount: "20000",
    status: "Completed",
    createdAt: "2025-08-11T12:30:00",
    updatedAt: "2025-08-11T12:30:00",
    draftedAt: null,
    actionMessage: "ATM refill done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "TC-012",
    branch: "Chittagong Branch",
    transferFrom: "Cash Register 5",
    transferTo: "Cash Vault",
    transferAmount: "7500",
    status: "Completed",
    createdAt: "2025-08-12T15:00:00",
    updatedAt: "2025-08-12T15:00:00",
    draftedAt: null,
    actionMessage: "Daily deposit done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function TermsDataTable({
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
  const canCreate = usePermission("transferCash", "create");

  const componentColumns = [
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockTableData.map((item) => item.branch))],
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
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "branch",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "transferFrom",
      title: "Transfer From",
      options: [...new Set(mockTableData.map((item) => item.transferFrom))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("transferFrom")
          .localeCompare(row2.getValue("transferFrom"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "transferFrom",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "transferTo",
      title: "Transfer To",
      options: [...new Set(mockTableData.map((item) => item.transferTo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("transferTo")
          .localeCompare(row2.getValue("transferTo"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "transferTo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "transferAmount",
      title: "Transfer Amount",
      options: [...new Set(mockTableData.map((item) => item.transferAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("transferAmount")
          .localeCompare(row2.getValue("transferAmount"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "transferAmount",
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
      fixedColumns={["branch"]} // Pin leave types column
      pathName="terms"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
