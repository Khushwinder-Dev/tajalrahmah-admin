/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockSalaryAdvances = [
  {
    id: "1",
    date: "2024-02-15",
    iqamaNo: "1234567890",
    branch: "Riyadh Branch",
    paymentMode: "Cash",
    advanceAmount: 5000,
    description: "Emergency advance payment",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    date: "2024-02-10",
    iqamaNo: "2345678901",
    branch: "Jeddah Branch",
    paymentMode: "Bank Transfer",
    advanceAmount: 3000,
    description: "Monthly advance",
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    date: "2024-02-20",
    iqamaNo: "3456789012",
    branch: "Dammam Branch",
    paymentMode: "Check",
    advanceAmount: 7500,
    description: "Special advance",
    status: "inactive",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    date: "2024-02-25",
    iqamaNo: "4567890123",
    branch: "Riyadh Branch",
    paymentMode: "Credit Card",
    advanceAmount: 2000,
    description: "Travel advance",
    status: "draft",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-25",
    actionMessage: "15 Apr",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    date: "2024-02-28",
    iqamaNo: "5678901234",
    branch: "Jeddah Branch",
    paymentMode: "Debit Card",
    advanceAmount: 4000,
    description: "Medical advance",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    date: "2024-03-01",
    iqamaNo: "6789012345",
    branch: "Dammam Branch",
    paymentMode: "Cash",
    advanceAmount: 6000,
    description: "Emergency advance",
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    date: "2024-03-05",
    iqamaNo: "7890123456",
    branch: "Riyadh Branch",
    paymentMode: "Bank Transfer",
    advanceAmount: 3500,
    description: "Housing advance",
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    date: "2024-03-10",
    iqamaNo: "8901234567",
    branch: "Jeddah Branch",
    paymentMode: "Check",
    advanceAmount: 8000,
    description: "Education advance",
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    date: "2024-03-15",
    iqamaNo: "9012345678",
    branch: "Dammam Branch",
    paymentMode: "Credit Card",
    advanceAmount: 1500,
    description: "Transport advance",
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    date: "2024-03-20",
    iqamaNo: "0123456789",
    branch: "Riyadh Branch",
    paymentMode: "Debit Card",
    advanceAmount: 4500,
    description: "Equipment advance",
    status: "active",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    date: "2024-03-25",
    iqamaNo: "1234567891",
    branch: "Jeddah Branch",
    paymentMode: "Cash",
    advanceAmount: 7000,
    description: "Business advance",
    status: "active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    date: "2024-03-30",
    iqamaNo: "2345678902",
    branch: "Dammam Branch",
    paymentMode: "Bank Transfer",
    advanceAmount: 2500,
    description: "Utility advance",
    status: "active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    date: "2024-04-01",
    iqamaNo: "3456789013",
    branch: "Riyadh Branch",
    paymentMode: "Check",
    advanceAmount: 5500,
    description: "Maintenance advance",
    status: "active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    date: "2024-04-05",
    iqamaNo: "4567890124",
    branch: "Jeddah Branch",
    paymentMode: "Credit Card",
    advanceAmount: 1800,
    description: "Food advance",
    status: "active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    date: "2024-04-10",
    iqamaNo: "5678901235",
    branch: "Dammam Branch",
    paymentMode: "Debit Card",
    advanceAmount: 3200,
    description: "Clothing advance",
    status: "active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    date: "2024-04-15",
    iqamaNo: "6789012346",
    branch: "Riyadh Branch",
    paymentMode: "Cash",
    advanceAmount: 9000,
    description: "Investment advance",
    status: "active",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    date: "2024-04-20",
    iqamaNo: "7890123457",
    branch: "Jeddah Branch",
    paymentMode: "Bank Transfer",
    advanceAmount: 2800,
    description: "Insurance advance",
    status: "draft",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    date: "2024-04-25",
    iqamaNo: "8901234568",
    branch: "Dammam Branch",
    paymentMode: "Check",
    advanceAmount: 6500,
    description: "Technology advance",
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    date: "2024-05-01",
    iqamaNo: "9012345679",
    branch: "Riyadh Branch",
    paymentMode: "Credit Card",
    advanceAmount: 1200,
    description: "Entertainment advance",
    status: "active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    date: "2024-05-05",
    iqamaNo: "0123456780",
    branch: "Jeddah Branch",
    paymentMode: "Debit Card",
    advanceAmount: 3800,
    description: "Furniture advance",
    status: "inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function SalaryAdvanceDataTable({
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
  const canCreate = usePermission("salaryAdvance", "create");

  const componentColumns = [
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockSalaryAdvances.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockSalaryAdvances.map((item) => item.iqamaNo))],
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "iqamaNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockSalaryAdvances.map((item) => item.branch))],
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "branch",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "paymentMode",
      title: "Payment Mode",
      options: [...new Set(mockSalaryAdvances.map((item) => item.paymentMode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentMode")
          .localeCompare(row2.getValue("paymentMode"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "paymentMode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "advanceAmount",
      title: "Advance Amount",
      options: [
        ...new Set(mockSalaryAdvances.map((item) => item.advanceAmount)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("advanceAmount") - row2.getValue("advanceAmount");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "advanceAmount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockSalaryAdvances.map((item) => item.description))],
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
      minSize: 150,
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

  const filteredData = mockSalaryAdvances.filter((salaryAdvance) => {
    if (dataTableFilter.status === "Active") {
      return salaryAdvance.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !salaryAdvance.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return salaryAdvance.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return salaryAdvance.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return salaryAdvance.isUpdated;
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
      fixedColumns={["branch"]} // Pin branch column
      pathName="salary-advance"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
