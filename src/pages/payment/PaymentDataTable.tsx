/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Payment interface to match the grid component
interface PaymentItem {
  id: string;
  code: string;
  invoiceType: string;
  currency: string;
  paymentTerms: string;
  dueDays: number;
  totalAmount: number;
  containerAmount: number;
  typeOfDeposit: string;
  depositAmount: number;
  depositDate: string;
  exchangeRate: number;
  localAmount: number;
  status: "Active" | "Pending" | "Draft" | "Rejected";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockPayments: PaymentItem[] = [
  {
    id: "1",
    code: "PAY-001",
    invoiceType: "Commercial Invoice",
    currency: "USD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 15000.0,
    containerAmount: 12000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 3000.0,
    depositDate: "2024-01-15",
    exchangeRate: 1.0,
    localAmount: 15000.0,
    status: "Active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    code: "PAY-002",
    invoiceType: "Proforma Invoice",
    currency: "EUR",
    paymentTerms: "Net 15",
    dueDays: 15,
    totalAmount: 25000.0,
    containerAmount: 20000.0,
    typeOfDeposit: "Credit Card",
    depositAmount: 5000.0,
    depositDate: "2024-01-20",
    exchangeRate: 0.85,
    localAmount: 21250.0,
    status: "Active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    code: "PAY-003",
    invoiceType: "Commercial Invoice",
    currency: "GBP",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 18000.0,
    containerAmount: 15000.0,
    typeOfDeposit: "Wire Transfer",
    depositAmount: 3000.0,
    depositDate: "2024-01-25",
    exchangeRate: 0.79,
    localAmount: 14220.0,
    status: "Draft",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    code: "PAY-004",
    invoiceType: "Proforma Invoice",
    currency: "JPY",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 2000000.0,
    containerAmount: 1800000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 200000.0,
    depositDate: "2024-02-01",
    exchangeRate: 110.5,
    localAmount: 18099.55,
    status: "Pending",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    code: "PAY-005",
    invoiceType: "Commercial Invoice",
    currency: "CAD",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 22000.0,
    containerAmount: 19000.0,
    typeOfDeposit: "Check",
    depositAmount: 3000.0,
    depositDate: "2024-02-05",
    exchangeRate: 1.35,
    localAmount: 16296.3,
    status: "Active",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    code: "PAY-006",
    invoiceType: "Proforma Invoice",
    currency: "AUD",
    paymentTerms: "Net 20",
    dueDays: 20,
    totalAmount: 32000.0,
    containerAmount: 28000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 4000.0,
    depositDate: "2024-02-10",
    exchangeRate: 1.52,
    localAmount: 21052.63,
    status: "Active",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    code: "PAY-007",
    invoiceType: "Commercial Invoice",
    currency: "CHF",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 28000.0,
    containerAmount: 24000.0,
    typeOfDeposit: "Wire Transfer",
    depositAmount: 4000.0,
    depositDate: "2024-02-15",
    exchangeRate: 0.88,
    localAmount: 24640.0,
    status: "Pending",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    code: "PAY-008",
    invoiceType: "Proforma Invoice",
    currency: "CNY",
    paymentTerms: "Net 45",
    dueDays: 45,
    totalAmount: 150000.0,
    containerAmount: 130000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 20000.0,
    depositDate: "2024-02-20",
    exchangeRate: 7.2,
    localAmount: 20833.33,
    status: "Draft",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    code: "PAY-009",
    invoiceType: "Commercial Invoice",
    currency: "INR",
    paymentTerms: "Net 60",
    dueDays: 60,
    totalAmount: 1200000.0,
    containerAmount: 1000000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 200000.0,
    depositDate: "2024-02-25",
    exchangeRate: 83.0,
    localAmount: 14457.83,
    status: "Active",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    code: "PAY-010",
    invoiceType: "Proforma Invoice",
    currency: "BRL",
    paymentTerms: "Net 30",
    dueDays: 30,
    totalAmount: 85000.0,
    containerAmount: 75000.0,
    typeOfDeposit: "Credit Card",
    depositAmount: 10000.0,
    depositDate: "2024-03-01",
    exchangeRate: 5.2,
    localAmount: 16346.15,
    status: "Rejected",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    code: "PAY-011",
    invoiceType: "Commercial Invoice",
    currency: "MXN",
    paymentTerms: "Net 15",
    dueDays: 15,
    totalAmount: 450000.0,
    containerAmount: 400000.0,
    typeOfDeposit: "Bank Transfer",
    depositAmount: 50000.0,
    depositDate: "2024-03-05",
    exchangeRate: 17.5,
    localAmount: 25714.29,
    status: "Active",
    createdAt: "2023-04-15",
    updatedAt: "2023-09-10",
    draftedAt: "2023-04-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    code: "PAY-012",
    invoiceType: "Proforma Invoice",
    currency: "KRW",
    paymentTerms: "Net 20",
    dueDays: 20,
    totalAmount: 35000000.0,
    containerAmount: 30000000.0,
    typeOfDeposit: "Wire Transfer",
    depositAmount: 5000000.0,
    depositDate: "2024-03-10",
    exchangeRate: 1300.0,
    localAmount: 26923.08,
    status: "Draft",
    createdAt: "2023-05-01",
    updatedAt: "2023-11-12",
    draftedAt: "2023-04-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function PaymentDataTable({
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
  isFilterOpen,
  setIsFilterOpen,
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
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const { canCreate } = useCountriesPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockPayments.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: isMobile ? 130 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "invoiceType",
      title: "Invoice Type",
      options: [...new Set(mockPayments.map((item) => item.invoiceType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("invoiceType")
          .localeCompare(row2.getValue("invoiceType"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Invoice Type",
        readOnly: true,
      },
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(mockPayments.map((item) => item.currency))],
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
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Currency",
        readOnly: true,
      },
    },
    {
      accessorKey: "paymentTerms",
      title: "Payment Terms",
      options: [...new Set(mockPayments.map((item) => item.paymentTerms))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("paymentTerms")
          .localeCompare(row2.getValue("paymentTerms"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Payment Terms",
        readOnly: true,
      },
    },
    {
      accessorKey: "dueDays",
      title: "Due Days",
      options: [...new Set(mockPayments.map((item) => item.dueDays))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("dueDays") - row2.getValue("dueDays");
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Due Days",
        readOnly: true,
      },
    },
    {
      accessorKey: "totalAmount",
      title: "Total Amount",
      options: [...new Set(mockPayments.map((item) => item.totalAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("totalAmount") - row2.getValue("totalAmount");
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Total Amount",
        readOnly: true,
      },
    },
    {
      accessorKey: "containerAmount",
      title: "Container Amount",
      options: [...new Set(mockPayments.map((item) => item.containerAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("containerAmount") - row2.getValue("containerAmount")
        );
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Container Amount",
        readOnly: true,
      },
    },
    {
      accessorKey: "typeOfDeposit",
      title: "Type of Deposit",
      options: [...new Set(mockPayments.map((item) => item.typeOfDeposit))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("typeOfDeposit")
          .localeCompare(row2.getValue("typeOfDeposit"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Type of Deposit",
        readOnly: true,
      },
    },
    {
      accessorKey: "depositAmount",
      title: "Deposit Amount",
      options: [...new Set(mockPayments.map((item) => item.depositAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("depositAmount") - row2.getValue("depositAmount");
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Deposit Amount",
        readOnly: true,
      },
    },
    {
      accessorKey: "depositDate",
      title: "Deposit Date",
      options: [...new Set(mockPayments.map((item) => item.depositDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("depositDate")
          .localeCompare(row2.getValue("depositDate"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Deposit Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "exchangeRate",
      title: "Exchange Rate",
      options: [...new Set(mockPayments.map((item) => item.exchangeRate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("exchangeRate") - row2.getValue("exchangeRate");
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Exchange Rate",
        readOnly: true,
      },
    },
    {
      accessorKey: "localAmount",
      title: "Local Amount",
      options: [...new Set(mockPayments.map((item) => item.localAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((filterVal: number) => cellValue === filterVal);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("localAmount") - row2.getValue("localAmount");
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Local Amount",
        readOnly: true,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockPayments.filter((item: PaymentItem) => {
    // States use the same flags for demo
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
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
      fixedColumns={["code", "status"]}
      pathName="payment"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
