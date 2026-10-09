/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;
  name: string;
  customerGroup: string;
  customer: string;
  startDate: string;
  endDate: string;
  ruleBase: string;
  minimumPurchase: string;
  accountCreationPoint: string;
  birthdayPoint: string;
  redeemType: string;
  minimumPointToRedeem: string;
  maxAmountReceive: string;
  status: string;
  redeemInPortal: string;
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
    name: "Festive Rewards Program",
    customerGroup: "Gold Members",
    customer: "John Doe",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    ruleBase: "Purchase Amount",
    minimumPurchase: "2000", // in BDT
    accountCreationPoint: "100",
    birthdayPoint: "250",
    redeemType: "Discount Voucher",
    minimumPointToRedeem: "500",
    maxAmountReceive: "5000", // max discount limit
    status: "Active",
    redeemInPortal: "true",
    createdAt: "2025-08-01T09:15:00Z",
    updatedAt: "2025-08-01T10:00:00Z",
    draftedAt: null,
    actionMessage: "Program created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    name: "Summer Cashback Campaign",
    customerGroup: "Silver Members",
    customer: "Jane Smith",
    startDate: "2025-03-01",
    endDate: "2025-09-30",
    ruleBase: "Transaction Count",
    minimumPurchase: "1000",
    accountCreationPoint: "50",
    birthdayPoint: "150",
    redeemType: "Cashback",
    minimumPointToRedeem: "300",
    maxAmountReceive: "3000",
    status: "Active",
    redeemInPortal: "true",
    createdAt: "2025-08-02T11:20:00Z",
    updatedAt: "2025-08-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Program launched",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    name: "Birthday Bonus Program",
    customerGroup: "All Members",
    customer: "Karim Ahmed",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    ruleBase: "Birthday Reward",
    minimumPurchase: "0",
    accountCreationPoint: "0",
    birthdayPoint: "500",
    redeemType: "Gift Voucher",
    minimumPointToRedeem: "100",
    maxAmountReceive: "1000",
    status: "Inactive",
    redeemInPortal: "false",
    createdAt: "2025-08-03T08:45:00Z",
    updatedAt: "2025-08-03T09:00:00Z",
    draftedAt: null,
    actionMessage: "Program cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    name: "Referral Rewards",
    customerGroup: "Bronze Members",
    customer: "Hasan Mahmud",
    startDate: "2025-04-01",
    endDate: "2025-10-31",
    ruleBase: "Referral Count",
    minimumPurchase: "500",
    accountCreationPoint: "20",
    birthdayPoint: "100",
    redeemType: "Extra Points",
    minimumPointToRedeem: "200",
    maxAmountReceive: "2000",
    status: "Pending",
    redeemInPortal: "true",
    createdAt: "2025-08-04T13:10:00Z",
    updatedAt: "2025-08-04T13:15:00Z",
    draftedAt: null,
    actionMessage: "Awaiting approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    name: "Diwali Special Program",
    customerGroup: "Premium Members",
    customer: "Sabbir Ahmed",
    startDate: "2025-10-01",
    endDate: "2025-11-15",
    ruleBase: "Purchase Value",
    minimumPurchase: "3000",
    accountCreationPoint: "150",
    birthdayPoint: "300",
    redeemType: "Discount Voucher",
    minimumPointToRedeem: "400",
    maxAmountReceive: "4000",
    status: "Active",
    redeemInPortal: "true",
    createdAt: "2025-08-05T15:00:00Z",
    updatedAt: "2025-08-05T15:30:00Z",
    draftedAt: null,
    actionMessage: "Program confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    name: "Eid Reward Bonanza",
    customerGroup: "Gold Members",
    customer: "Rashid Khan",
    startDate: "2025-06-01",
    endDate: "2025-07-30",
    ruleBase: "Festive Bonus",
    minimumPurchase: "2500",
    accountCreationPoint: "200",
    birthdayPoint: "400",
    redeemType: "Cashback",
    minimumPointToRedeem: "600",
    maxAmountReceive: "6000",
    status: "Active",
    redeemInPortal: "true",
    createdAt: "2025-08-06T12:10:00Z",
    updatedAt: "2025-08-06T12:30:00Z",
    draftedAt: null,
    actionMessage: "Program dispatched",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Back to School Bonus",
    customerGroup: "Student Members",
    customer: "Rahim Uddin",
    startDate: "2025-08-01",
    endDate: "2025-09-15",
    ruleBase: "Stationery Purchase",
    minimumPurchase: "800",
    accountCreationPoint: "60",
    birthdayPoint: "120",
    redeemType: "Gift Voucher",
    minimumPointToRedeem: "250",
    maxAmountReceive: "1500",
    status: "Active",
    redeemInPortal: "true",
    createdAt: "2025-08-07T10:45:00Z",
    updatedAt: "2025-08-07T11:00:00Z",
    draftedAt: null,
    actionMessage: "Program updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    name: "Winter Warmth Campaign",
    customerGroup: "Silver Members",
    customer: "Sabbir Hossain",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
    ruleBase: "Seasonal Purchase",
    minimumPurchase: "1500",
    accountCreationPoint: "80",
    birthdayPoint: "200",
    redeemType: "Discount Voucher",
    minimumPointToRedeem: "350",
    maxAmountReceive: "2500",
    status: "Inactive",
    redeemInPortal: "false",
    createdAt: "2025-08-08T14:00:00Z",
    updatedAt: "2025-08-08T14:10:00Z",
    draftedAt: null,
    actionMessage: "Program disabled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function LoyaltyProgramsDataTable({
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
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customerGroup",
      title: "Customer Group",
      options: [...new Set(mockTableData.map((item) => item.customerGroup))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "customerGroup",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(mockTableData.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "startDate",
      title: "Start Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "startDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "endDate",
      title: "End Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "endDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockTableData.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "status",
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
      fixedColumns={["name"]} // Pin leave types column
      pathName="loyalty-programs"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
