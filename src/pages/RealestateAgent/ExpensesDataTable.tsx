/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  fastName: string;
  phone: string;
  email: string;
  vatNumber: string;
  hourlyRate: string;
  company: string;

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
    fastName: "Karim Ahmed",
    phone: "+8801711000001",
    email: "karim.ahmed@example.com",
    vatNumber: "VAT-12345",
    hourlyRate: "1500",
    company: "Dhaka HQ",
    status: "Active",
    createdAt: "2025-08-01T09:15:00Z",
    updatedAt: "2025-08-01T10:00:00Z",
    draftedAt: null,
    actionMessage: "Profile created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    fastName: "Nusrat Jahan",
    phone: "+8801711000002",
    email: "nusrat.jahan@example.com",
    vatNumber: "VAT-67890",
    hourlyRate: "1800",
    company: "Chittagong Branch",
    status: "Active",
    createdAt: "2025-08-02T11:20:00Z",
    updatedAt: "2025-08-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "User added",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    fastName: "Jahidul Islam",
    phone: "+8801711000003",
    email: "jahidul.islam@example.com",
    vatNumber: "VAT-23456",
    hourlyRate: "1700",
    company: "Dhaka HQ",
    status: "Inactive",
    createdAt: "2025-08-03T08:45:00Z",
    updatedAt: "2025-08-03T09:00:00Z",
    draftedAt: null,
    actionMessage: "Account deactivated",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    fastName: "Hasan Mahmud",
    phone: "+8801711000004",
    email: "hasan.mahmud@example.com",
    vatNumber: "VAT-78901",
    hourlyRate: "1600",
    company: "Khulna Branch",
    status: "Pending",
    createdAt: "2025-08-04T13:10:00Z",
    updatedAt: "2025-08-04T13:15:00Z",
    draftedAt: null,
    actionMessage: "Waiting for approval",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    fastName: "Sabbir Ahmed",
    phone: "+8801711000005",
    email: "sabbir.ahmed@example.com",
    vatNumber: "VAT-45678",
    hourlyRate: "2000",
    company: "Dhaka HQ",
    status: "Active",
    createdAt: "2025-08-05T15:00:00Z",
    updatedAt: "2025-08-05T15:30:00Z",
    draftedAt: null,
    actionMessage: "Employee onboarded",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    fastName: "Rashid Khan",
    phone: "+8801711000006",
    email: "rashid.khan@example.com",
    vatNumber: "VAT-56789",
    hourlyRate: "1750",
    company: "Sylhet Branch",
    status: "Active",
    createdAt: "2025-08-06T12:10:00Z",
    updatedAt: "2025-08-06T12:30:00Z",
    draftedAt: null,
    actionMessage: "Profile verified",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    fastName: "Rahim Uddin",
    phone: "+8801711000007",
    email: "rahim.uddin@example.com",
    vatNumber: "VAT-89012",
    hourlyRate: "2200",
    company: "Dhaka HQ",
    status: "Active",
    createdAt: "2025-08-07T10:45:00Z",
    updatedAt: "2025-08-07T11:00:00Z",
    draftedAt: null,
    actionMessage: "Manager account updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    fastName: "Sabbir Hossain",
    phone: "+8801711000008",
    email: "sabbir.hossain@example.com",
    vatNumber: "VAT-90123",
    hourlyRate: "1550",
    company: "Chittagong Branch",
    status: "Inactive",
    createdAt: "2025-08-08T14:00:00Z",
    updatedAt: "2025-08-08T14:10:00Z",
    draftedAt: null,
    actionMessage: "Account disabled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function ExpensesDataTable({
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
  const canCreate = usePermission("expenses", "create");

  const componentColumns = [
    {
      accessorKey: "fastName",
      title: "Name",
      options: [...new Set(mockTableData.map((item) => item.fastName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("fastName")
          .localeCompare(row2.getValue("fastName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "fastName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vatNumber",
      title: "Vat Number",
      options: [...new Set(mockTableData.map((item) => item.vatNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vatNumber")
          .localeCompare(row2.getValue("vatNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "vatNumber",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "phone",
      title: "Phone",
      options: [...new Set(mockTableData.map((item) => item.phone))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "phone",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockTableData.map((item) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "email",
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
      fixedColumns={["fastName"]} // Pin leave types column
      pathName="realestate-agent"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
