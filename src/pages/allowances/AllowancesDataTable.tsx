/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  name: string;
  iqamaNo: string;
  branch: string;
  notes: string;
  date: string;

  allowanceAmount: string;
  allowanceType: string;

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
    name: "Hasan Ali",
    iqamaNo: "1234567890",
    branch: "Dhaka",
    notes: "Monthly housing",
    date: "2025-08-01",
    allowanceAmount: "5000",
    allowanceType: "Housing",
    status: "Active",
    createdAt: "2025-08-01T09:00:00Z",
    updatedAt: "2025-08-01T09:00:00Z",
    draftedAt: null,
    actionMessage: "Approved by HR",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    name: "Tanvir Hossain",
    iqamaNo: "2345678901",
    branch: "Chattogram",
    notes: "Transport support",
    date: "2025-08-02",
    allowanceAmount: "3000",
    allowanceType: "Transport",
    status: "Draft",
    createdAt: "2025-08-02T08:30:00Z",
    updatedAt: "2025-08-02T08:30:00Z",
    draftedAt: "2025-08-02T08:00:00Z",
    actionMessage: "Pending review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "Shirin Akhter",
    iqamaNo: "3456789012",
    branch: "Sylhet",
    notes: "Medical bills",
    date: "2025-08-03",
    allowanceAmount: "2500",
    allowanceType: "Medical",
    status: "Active",
    createdAt: "2025-08-03T10:00:00Z",
    updatedAt: "2025-08-04T10:00:00Z",
    draftedAt: null,
    actionMessage: "Processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    name: "Sabbir Rahman",
    iqamaNo: "4567890123",
    branch: "Khulna",
    notes: "Internet bill",
    date: "2025-08-04",
    allowanceAmount: "1000",
    allowanceType: "Internet",
    status: "Inactive",
    createdAt: "2025-08-04T11:00:00Z",
    updatedAt: "2025-08-04T11:00:00Z",
    draftedAt: null,
    actionMessage: "Deactivated",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    name: "Nusrat Jahan",
    iqamaNo: "5678901234",
    branch: "Barisal",
    notes: "Fuel allowance",
    date: "2025-08-05",
    allowanceAmount: "1800",
    allowanceType: "Fuel",
    status: "Active",
    createdAt: "2025-08-05T09:30:00Z",
    updatedAt: "2025-08-05T09:30:00Z",
    draftedAt: null,
    actionMessage: "Auto-approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    name: "Reza Karim",
    iqamaNo: "6789012345",
    branch: "Dhaka",
    notes: "Meal subsidy",
    date: "2025-08-06",
    allowanceAmount: "2200",
    allowanceType: "Meal",
    status: "Draft",
    createdAt: "2025-08-06T08:20:00Z",
    updatedAt: "2025-08-06T08:20:00Z",
    draftedAt: "2025-08-06T08:00:00Z",
    actionMessage: "Waiting for approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Ayesha Sultana",
    iqamaNo: "7890123456",
    branch: "Rajshahi",
    notes: "Child education",
    date: "2025-08-07",
    allowanceAmount: "4000",
    allowanceType: "Education",
    status: "Active",
    createdAt: "2025-08-07T10:15:00Z",
    updatedAt: "2025-08-07T10:15:00Z",
    draftedAt: null,
    actionMessage: "Approved by finance",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Mizan Mahmud",
    iqamaNo: "8901234567",
    branch: "Sylhet",
    notes: "Festival bonus",
    date: "2025-08-01",
    allowanceAmount: "10000",
    allowanceType: "Bonus",
    status: "Inactive",
    createdAt: "2025-08-01T07:45:00Z",
    updatedAt: "2025-08-01T07:45:00Z",
    draftedAt: null,
    actionMessage: "Marked inactive",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "9",
    name: "Nayeem Islam",
    iqamaNo: "9012345678",
    branch: "Chattogram",
    notes: "Overtime shift",
    date: "2025-08-08",
    allowanceAmount: "3200",
    allowanceType: "Overtime",
    status: "Active",
    createdAt: "2025-08-08T12:00:00Z",
    updatedAt: "2025-08-08T12:00:00Z",
    draftedAt: null,
    actionMessage: "Confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "Fahima Khan",
    iqamaNo: "9123456789",
    branch: "Khulna",
    notes: "Travel allowance",
    date: "2025-08-09",
    allowanceAmount: "2700",
    allowanceType: "Travel",
    status: "Draft",
    createdAt: "2025-08-09T09:00:00Z",
    updatedAt: "2025-08-09T09:00:00Z",
    draftedAt: "2025-08-09T08:30:00Z",
    actionMessage: "Waiting manager sign-off",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    name: "Tanjila Akter",
    iqamaNo: "9234567890",
    branch: "Barisal",
    notes: "Communication support",
    date: "2025-08-10",
    allowanceAmount: "900",
    allowanceType: "Communication",
    status: "Active",
    createdAt: "2025-08-10T13:45:00Z",
    updatedAt: "2025-08-10T13:45:00Z",
    draftedAt: null,
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    name: "Anwar Hossain",
    iqamaNo: "9345678901",
    branch: "Dhaka",
    notes: "Special project bonus",
    date: "2025-08-11",
    allowanceAmount: "8000",
    allowanceType: "Bonus",
    status: "Updated",
    createdAt: "2025-08-11T14:00:00Z",
    updatedAt: "2025-08-12T10:00:00Z",
    draftedAt: null,
    actionMessage: "Amount corrected",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "13",
    name: "Lamia Ferdous",
    iqamaNo: "9456789012",
    branch: "Rajshahi",
    notes: "Emergency leave support",
    date: "2025-08-12",
    allowanceAmount: "3500",
    allowanceType: "Special",
    status: "Active",
    createdAt: "2025-08-12T11:30:00Z",
    updatedAt: "2025-08-12T11:30:00Z",
    draftedAt: null,
    actionMessage: "Completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    name: "Mehedi Hasan",
    iqamaNo: "9567890123",
    branch: "Sylhet",
    notes: "Meal for OT shift",
    date: "2025-08-13",
    allowanceAmount: "1200",
    allowanceType: "Meal",
    status: "Draft",
    createdAt: "2025-08-13T09:20:00Z",
    updatedAt: "2025-08-13T09:20:00Z",
    draftedAt: "2025-08-13T09:00:00Z",
    actionMessage: "Saved as draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    name: "Shila Rani",
    iqamaNo: "9678901234",
    branch: "Chattogram",
    notes: "Festival bonus - Puja",
    date: "2025-08-14",
    allowanceAmount: "7000",
    allowanceType: "Bonus",
    status: "Active",
    createdAt: "2025-08-14T16:00:00Z",
    updatedAt: "2025-08-14T16:00:00Z",
    draftedAt: null,
    actionMessage: "Finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    name: "Shahadat Hossain",
    iqamaNo: "9789012345",
    branch: "Dhaka",
    notes: "Intern allowance",
    date: "2025-08-15",
    allowanceAmount: "1500",
    allowanceType: "Internship",
    status: "Inactive",
    createdAt: "2025-08-15T10:00:00Z",
    updatedAt: "2025-08-15T10:00:00Z",
    draftedAt: null,
    actionMessage: "Closed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function AllowancesDataTable({
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
  const canCreate = usePermission("allowances", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockTableData.map((item) => item.name))],
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockTableData.map((item) => item.iqamaNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("iqamaNo").localeCompare(row2.getValue("iqamaNo"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "iqamaNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "allowanceType",
      title: "Allowance Type",
      options: [...new Set(mockTableData.map((item) => item.allowanceType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("allowanceType")
          .localeCompare(row2.getValue("allowanceType"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "allowanceType",
        readOnly: !canCreate,
      },
    },
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
      accessorKey: "allowanceAmount",
      title: "Allowance Amount",
      options: [...new Set(mockTableData.map((item) => item.allowanceAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("allowanceAmount")
          .localeCompare(row2.getValue("allowanceAmount"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "allowanceAmount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "notes",
      title: "Notes",
      options: [...new Set(mockTableData.map((item) => item.notes))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("notes").localeCompare(row2.getValue("notes"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "notes",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockTableData.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "date",
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
      fixedColumns={["name", "iqamaNo"]} // Pin leave types column
      pathName="project-types"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
