/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  branch: string;
  voucherNumber: string;
  category: string;
  subCategory: string;
  expense: string;
  date: string;
  amount: string;
  currency: string;
  paymentMode: string;
  vat: string;
  supplier: string;
  approvedBy: string;
  purchaseInvoiceNumber: string;
  supplierVatNumber: string;
  expenseBy: string;
  expenseFor: string;

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
    branch: "Dhaka HQ",
    voucherNumber: "VCH-1001",
    category: "Office Supplies",
    subCategory: "Stationery",
    expense: "Printer Paper",
    date: "2025-08-01",
    amount: "2500",
    currency: "BDT",
    paymentMode: "Cash",
    vat: "5%",
    supplier: "Paper Plus Ltd.",
    approvedBy: "Rahim Uddin",
    purchaseInvoiceNumber: "INV-5001",
    supplierVatNumber: "VAT-12345",
    expenseBy: "Karim Ahmed",
    expenseFor: "Office Use",
    status: "Approved",
    createdAt: "2025-08-01T09:15:00Z",
    updatedAt: "2025-08-01T10:00:00Z",
    draftedAt: null,
    actionMessage: "Expense approved by manager",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    branch: "Chittagong",
    voucherNumber: "VCH-1002",
    category: "Travel",
    subCategory: "Flight",
    expense: "Air Ticket",
    date: "2025-08-02",
    amount: "12000",
    currency: "BDT",
    paymentMode: "Bank Transfer",
    vat: "0%",
    supplier: "Biman Bangladesh",
    approvedBy: "Nusrat Jahan",
    purchaseInvoiceNumber: "INV-5002",
    supplierVatNumber: "VAT-67890",
    expenseBy: "Sabbir Hossain",
    expenseFor: "Client Meeting",
    status: "Approved",
    createdAt: "2025-08-02T11:20:00Z",
    updatedAt: "2025-08-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Travel expense confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    branch: "Dhaka HQ",
    voucherNumber: "VCH-1003",
    category: "Utilities",
    subCategory: "Electricity",
    expense: "Electric Bill",
    date: "2025-08-03",
    amount: "8500",
    currency: "BDT",
    paymentMode: "Online Payment",
    vat: "0%",
    supplier: "DESCO",
    approvedBy: "Rahim Uddin",
    purchaseInvoiceNumber: "INV-5003",
    supplierVatNumber: "VAT-23456",
    expenseBy: "Jahidul Islam",
    expenseFor: "Office Maintenance",
    status: "Approved",
    createdAt: "2025-08-03T08:45:00Z",
    updatedAt: "2025-08-03T09:00:00Z",
    draftedAt: null,
    actionMessage: "Bill paid successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    branch: "Khulna",
    voucherNumber: "VCH-1004",
    category: "Maintenance",
    subCategory: "Plumbing",
    expense: "Water Pipe Repair",
    date: "2025-08-04",
    amount: "3000",
    currency: "BDT",
    paymentMode: "Cash",
    vat: "0%",
    supplier: "Khulna Services",
    approvedBy: "Nusrat Jahan",
    purchaseInvoiceNumber: "INV-5004",
    supplierVatNumber: "VAT-78901",
    expenseBy: "Hasan Mahmud",
    expenseFor: "Office Repair",
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
    branch: "Dhaka HQ",
    voucherNumber: "VCH-1005",
    category: "Marketing",
    subCategory: "Advertising",
    expense: "Facebook Ads",
    date: "2025-08-05",
    amount: "15000",
    currency: "BDT",
    paymentMode: "Credit Card",
    vat: "0%",
    supplier: "Meta Platforms",
    approvedBy: "Rahim Uddin",
    purchaseInvoiceNumber: "INV-5005",
    supplierVatNumber: "VAT-45678",
    expenseBy: "Sabbir Ahmed",
    expenseFor: "Product Launch",
    status: "Approved",
    createdAt: "2025-08-05T15:00:00Z",
    updatedAt: "2025-08-05T15:30:00Z",
    draftedAt: null,
    actionMessage: "Campaign payment completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    branch: "Sylhet",
    voucherNumber: "VCH-1006",
    category: "Hospitality",
    subCategory: "Food & Beverages",
    expense: "Team Lunch",
    date: "2025-08-06",
    amount: "5000",
    currency: "BDT",
    paymentMode: "Cash",
    vat: "5%",
    supplier: "Sylhet Restaurant",
    approvedBy: "Nusrat Jahan",
    purchaseInvoiceNumber: "INV-5006",
    supplierVatNumber: "VAT-56789",
    expenseBy: "Rashid Khan",
    expenseFor: "Team Building",
    status: "Approved",
    createdAt: "2025-08-06T12:10:00Z",
    updatedAt: "2025-08-06T12:30:00Z",
    draftedAt: null,
    actionMessage: "Expense settled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    branch: "Dhaka HQ",
    voucherNumber: "VCH-1007",
    category: "Office Equipment",
    subCategory: "Furniture",
    expense: "Office Chair",
    date: "2025-08-07",
    amount: "7000",
    currency: "BDT",
    paymentMode: "Bank Transfer",
    vat: "5%",
    supplier: "Furniture World",
    approvedBy: "Rahim Uddin",
    purchaseInvoiceNumber: "INV-5007",
    supplierVatNumber: "VAT-89012",
    expenseBy: "Karim Ahmed",
    expenseFor: "New Employee Setup",
    status: "Approved",
    createdAt: "2025-08-07T10:45:00Z",
    updatedAt: "2025-08-07T11:00:00Z",
    draftedAt: null,
    actionMessage: "Payment cleared",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    branch: "Chittagong",
    voucherNumber: "VCH-1008",
    category: "IT Services",
    subCategory: "Domain & Hosting",
    expense: "Domain Renewal",
    date: "2025-08-08",
    amount: "1500",
    currency: "BDT",
    paymentMode: "Online Payment",
    vat: "0%",
    supplier: "Namecheap",
    approvedBy: "Nusrat Jahan",
    purchaseInvoiceNumber: "INV-5008",
    supplierVatNumber: "VAT-90123",
    expenseBy: "Sabbir Hossain",
    expenseFor: "Company Website",
    status: "Approved",
    createdAt: "2025-08-08T14:00:00Z",
    updatedAt: "2025-08-08T14:10:00Z",
    draftedAt: null,
    actionMessage: "Service renewed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    branch: "Dhaka HQ",
    voucherNumber: "VCH-1009",
    category: "Training",
    subCategory: "Workshop",
    expense: "React Workshop Fee",
    date: "2025-08-09",
    amount: "8000",
    currency: "BDT",
    paymentMode: "Bank Transfer",
    vat: "0%",
    supplier: "Tech Academy",
    approvedBy: "Rahim Uddin",
    purchaseInvoiceNumber: "INV-5009",
    supplierVatNumber: "VAT-01234",
    expenseBy: "Hasan Mahmud",
    expenseFor: "Developer Training",
    status: "Approved",
    createdAt: "2025-08-09T09:00:00Z",
    updatedAt: "2025-08-09T09:15:00Z",
    draftedAt: null,
    actionMessage: "Training fee paid",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    branch: "Khulna",
    voucherNumber: "VCH-1010",
    category: "Office Supplies",
    subCategory: "Stationery",
    expense: "Pens & Notebooks",
    date: "2025-08-10",
    amount: "1200",
    currency: "BDT",
    paymentMode: "Cash",
    vat: "5%",
    supplier: "Khulna Stationery",
    approvedBy: "Nusrat Jahan",
    purchaseInvoiceNumber: "INV-5010",
    supplierVatNumber: "VAT-34567",
    expenseBy: "Rashid Khan",
    expenseFor: "Daily Office Use",
    status: "Pending",
    createdAt: "2025-08-10T11:20:00Z",
    updatedAt: "2025-08-10T11:30:00Z",
    draftedAt: null,
    actionMessage: "Waiting for approval",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    branch: "Sylhet",
    voucherNumber: "VCH-1011",
    category: "Hospitality",
    subCategory: "Accommodation",
    expense: "Hotel Stay",
    date: "2025-08-11",
    amount: "6500",
    currency: "BDT",
    paymentMode: "Credit Card",
    vat: "0%",
    supplier: "Sylhet Grand Hotel",
    approvedBy: "Rahim Uddin",
    purchaseInvoiceNumber: "INV-5011",
    supplierVatNumber: "VAT-67891",
    expenseBy: "Karim Ahmed",
    expenseFor: "Business Trip",
    status: "Approved",
    createdAt: "2025-08-11T20:00:00Z",
    updatedAt: "2025-08-11T20:10:00Z",
    draftedAt: null,
    actionMessage: "Hotel bill settled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    branch: "Dhaka HQ",
    voucherNumber: "VCH-1012",
    category: "Miscellaneous",
    subCategory: "Gifts",
    expense: "Client Gift",
    date: "2025-08-12",
    amount: "1800",
    currency: "BDT",
    paymentMode: "Cash",
    vat: "0%",
    supplier: "Gift World",
    approvedBy: "Nusrat Jahan",
    purchaseInvoiceNumber: "INV-5012",
    supplierVatNumber: "VAT-78912",
    expenseBy: "Sabbir Ahmed",
    expenseFor: "Client Relationship",
    status: "Approved",
    createdAt: "2025-08-12T18:00:00Z",
    updatedAt: "2025-08-12T18:10:00Z",
    draftedAt: null,
    actionMessage: "Gift purchased",
    isActive: true,
    isDraft: false,
    isDeleted: false,
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
      accessorKey: "voucherNumber",
      title: "Voucher Number",
      options: [...new Set(mockTableData.map((item) => item.voucherNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("voucherNumber")
          .localeCompare(row2.getValue("voucherNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "voucherNumber",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "category",
      title: "Category",
      options: [...new Set(mockTableData.map((item) => item.category))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("category")
          .localeCompare(row2.getValue("category"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "category",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "subCategory",
      title: "Sub Category",
      options: [...new Set(mockTableData.map((item) => item.subCategory))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("subCategory")
          .localeCompare(row2.getValue("subCategory"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "subCategory",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "expense",
      title: "Expense",
      options: [...new Set(mockTableData.map((item) => item.expense))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("expense").localeCompare(row2.getValue("expense"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "expense",
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
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "amount",
      title: "Amount",
      options: [...new Set(mockTableData.map((item) => item.amount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("amount").localeCompare(row2.getValue("amount"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "amount",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockTableData.map((item) => item.currency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currency")
          .localeCompare(row2.getValue("currency"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "currency",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "paymentMode",
      title: "Payment Mode",
      options: [...new Set(mockTableData.map((item) => item.paymentMode))],
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
      minSize: 180,
      meta: {
        exportLabel: "paymentMode",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "vat",
      title: "VAT",
      options: [...new Set(mockTableData.map((item) => item.vat))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("vat").localeCompare(row2.getValue("vat"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "vat",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "supplier",
      title: "Supplier",
      options: [...new Set(mockTableData.map((item) => item.supplier))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplier")
          .localeCompare(row2.getValue("supplier"));
      },
      size: 150,
      minSize: 180,
      meta: {
        exportLabel: "supplier",
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
      pathName="expenses"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
