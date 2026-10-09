/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  customerName: string;
  dateAndTime: string;
  description: string;

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
    customerName: "Rahim Uddin",
    dateAndTime: "2025-08-20 10:30 AM",
    description: "Purchased annual subscription",
    status: "Active",
    createdAt: "2025-08-20T10:30:00",
    updatedAt: "2025-08-20T11:00:00",
    draftedAt: null,
    actionMessage: "Successfully purchased plan",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    customerName: "Karim Khan",
    dateAndTime: "2025-08-19 02:45 PM",
    description: "Requested support call",
    status: "Updated",
    createdAt: "2025-08-19T14:45:00",
    updatedAt: "2025-08-19T15:10:00",
    draftedAt: null,
    actionMessage: "Support ticket updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    customerName: "Shamima Akter",
    dateAndTime: "2025-08-18 09:10 AM",
    description: "Updated billing information",
    status: "Active",
    createdAt: "2025-08-18T09:10:00",
    updatedAt: "2025-08-18T09:30:00",
    draftedAt: null,
    actionMessage: "Billing info updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    customerName: "Jamil Hossain",
    dateAndTime: "2025-08-17 05:20 PM",
    description: "Drafted order for approval",
    status: "Draft",
    createdAt: "2025-08-17T17:20:00",
    updatedAt: "2025-08-17T17:25:00",
    draftedAt: "2025-08-17T17:25:00",
    actionMessage: "Order is in draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    customerName: "Nusrat Jahan",
    dateAndTime: "2025-08-16 11:05 AM",
    description: "Cancelled subscription",
    status: "Deleted",
    createdAt: "2025-08-16T11:05:00",
    updatedAt: "2025-08-16T11:30:00",
    draftedAt: null,
    actionMessage: "Account deleted by user",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    customerName: "Farhan Ali",
    dateAndTime: "2025-08-15 04:15 PM",
    description: "Requested invoice copy",
    status: "Active",
    createdAt: "2025-08-15T16:15:00",
    updatedAt: "2025-08-15T16:20:00",
    draftedAt: null,
    actionMessage: "Invoice emailed to customer",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    customerName: "Mitu Chowdhury",
    dateAndTime: "2025-08-14 08:40 PM",
    description: "Changed password",
    status: "Updated",
    createdAt: "2025-08-14T20:40:00",
    updatedAt: "2025-08-14T20:42:00",
    draftedAt: null,
    actionMessage: "Password successfully changed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    customerName: "Sajid Rahman",
    dateAndTime: "2025-08-13 06:55 PM",
    description: "Marked account as default",
    status: "Active",
    createdAt: "2025-08-13T18:55:00",
    updatedAt: "2025-08-13T19:05:00",
    draftedAt: null,
    actionMessage: "Default account set",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    customerName: "Rifat Hasan",
    dateAndTime: "2025-08-12 01:25 PM",
    description: "Deleted old payment method",
    status: "Deleted",
    createdAt: "2025-08-12T13:25:00",
    updatedAt: "2025-08-12T13:35:00",
    draftedAt: null,
    actionMessage: "Payment method removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    customerName: "Anika Sultana",
    dateAndTime: "2025-08-11 07:15 AM",
    description: "Registered new account",
    status: "Active",
    createdAt: "2025-08-11T07:15:00",
    updatedAt: "2025-08-11T07:20:00",
    draftedAt: null,
    actionMessage: "New account created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    customerName: "Mahmudul Hasan",
    dateAndTime: "2025-08-10 09:50 AM",
    description: "Updated contact number",
    status: "Updated",
    createdAt: "2025-08-10T09:50:00",
    updatedAt: "2025-08-10T09:55:00",
    draftedAt: null,
    actionMessage: "Contact details changed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    customerName: "Tania Akter",
    dateAndTime: "2025-08-09 03:35 PM",
    description: "Requested account deletion",
    status: "Deleted",
    createdAt: "2025-08-09T15:35:00",
    updatedAt: "2025-08-09T15:50:00",
    draftedAt: null,
    actionMessage: "Account permanently removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
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
  const canCreate = usePermission("wakeUpCalls", "create");

  const componentColumns = [
    {
      accessorKey: "customerName",
      title: "Customer Name",
      options: [...new Set(mockTableData.map((item) => item.customerName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerName")
          .localeCompare(row2.getValue("customerName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "customerName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "dateAndTime",
      title: "Date and Time",
      options: [...new Set(mockTableData.map((item) => item.dateAndTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("dateAndTime")
          .localeCompare(row2.getValue("dateAndTime"));
      },
      size: 200,
      minSize: 400,
      meta: {
        exportLabel: "dateAndTime",
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
      minSize: 400,
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
      fixedColumns={["customerName"]} // Pin leave types column
      pathName="wake-up-calls"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
