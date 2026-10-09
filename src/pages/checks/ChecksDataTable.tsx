/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Check interface to match the grid component
interface CheckItem {
  id: string;
  vendorName: string;
  date: string;
  bankAccount: string;
  amount: string;
  checkNumber: string;
  status: "Pending" | "Approved" | "Paid" | "Rejected";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockChecks: CheckItem[] = [
  {
    id: "1",
    vendorName: "ABC Supply Co.",
    date: "2024-10-15",
    bankAccount: "****1234",
    amount: "$2,500.00",
    checkNumber: "CHK-001",
    status: "Pending",
    createdAt: "2024-10-15",
    updatedAt: "2024-10-20",
    draftedAt: "2024-10-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    vendorName: "XYZ Services Ltd.",
    date: "2024-10-14",
    bankAccount: "****5678",
    amount: "$1,750.50",
    checkNumber: "CHK-002",
    status: "Approved",
    createdAt: "2024-10-14",
    updatedAt: "2024-10-19",
    draftedAt: "2024-10-09",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    vendorName: "Tech Solutions Inc.",
    date: "2024-10-13",
    bankAccount: "****9012",
    amount: "$3,200.75",
    checkNumber: "CHK-003",
    status: "Paid",
    createdAt: "2024-10-13",
    updatedAt: "2024-10-18",
    draftedAt: "2024-10-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    vendorName: "Office Supplies Plus",
    date: "2024-10-12",
    bankAccount: "****3456",
    amount: "$890.25",
    checkNumber: "CHK-004",
    status: "Rejected",
    createdAt: "2024-10-12",
    updatedAt: "2024-10-17",
    draftedAt: "2024-10-07",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    vendorName: "Global Logistics Corp.",
    date: "2024-10-11",
    bankAccount: "****7890",
    amount: "$4,500.00",
    checkNumber: "CHK-005",
    status: "Pending",
    createdAt: "2024-10-11",
    updatedAt: "2024-10-16",
    draftedAt: "2024-10-06",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    vendorName: "Marketing Masters",
    date: "2024-10-10",
    bankAccount: "****2345",
    amount: "$1,200.00",
    checkNumber: "CHK-006",
    status: "Approved",
    createdAt: "2024-10-10",
    updatedAt: "2024-10-15",
    draftedAt: "2024-10-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    vendorName: "Construction Materials LLC",
    date: "2024-10-09",
    bankAccount: "****6789",
    amount: "$7,850.30",
    checkNumber: "CHK-007",
    status: "Paid",
    createdAt: "2024-10-09",
    updatedAt: "2024-10-14",
    draftedAt: "2024-10-04",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    vendorName: "Professional Services Group",
    date: "2024-10-08",
    bankAccount: "****0123",
    amount: "$2,100.00",
    checkNumber: "CHK-008",
    status: "Pending",
    createdAt: "2024-10-08",
    updatedAt: "2024-10-13",
    draftedAt: "2024-10-03",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    vendorName: "Equipment Rental Co.",
    date: "2024-10-07",
    bankAccount: "****4567",
    amount: "$3,750.00",
    checkNumber: "CHK-009",
    status: "Approved",
    createdAt: "2024-10-07",
    updatedAt: "2024-10-12",
    draftedAt: "2024-10-02",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    vendorName: "Catering Services Inc.",
    date: "2024-10-06",
    bankAccount: "****8901",
    amount: "$950.75",
    checkNumber: "CHK-010",
    status: "Paid",
    createdAt: "2024-10-06",
    updatedAt: "2024-10-11",
    draftedAt: "2024-10-01",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    vendorName: "IT Support Solutions",
    date: "2024-10-05",
    bankAccount: "****2468",
    amount: "$1,500.00",
    checkNumber: "CHK-011",
    status: "Rejected",
    createdAt: "2024-10-05",
    updatedAt: "2024-10-10",
    draftedAt: "2024-09-30",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    vendorName: "Maintenance & Repair LLC",
    date: "2024-10-04",
    bankAccount: "****1357",
    amount: "$2,800.50",
    checkNumber: "CHK-012",
    status: "Pending",
    createdAt: "2024-10-04",
    updatedAt: "2024-10-09",
    draftedAt: "2024-09-29",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function ChecksDataTable({
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
      accessorKey: "checkNumber",
      title: "Check Number",
      options: [...new Set(mockChecks.map((item) => item.checkNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("checkNumber")
          .localeCompare(row2.getValue("checkNumber"));
      },
      size: isMobile ? 130 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Check Number",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vendorName",
      title: "Vendor Name",
      options: [...new Set(mockChecks.map((item) => item.vendorName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vendorName")
          .localeCompare(row2.getValue("vendorName"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Vendor Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockChecks.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("date"));
        const date2 = new Date(row2.getValue("date"));
        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Date",
        readOnly: true,
      },
    },
    {
      accessorKey: "amount",
      title: "Amount",
      options: [...new Set(mockChecks.map((item) => item.amount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const amount1 = parseFloat(
          row1.getValue("amount").replace(/[$,]/g, "")
        );
        const amount2 = parseFloat(
          row2.getValue("amount").replace(/[$,]/g, "")
        );
        return amount1 - amount2;
      },
      size: isMobile ? 120 : 140,
      minSize: 100,
      meta: {
        exportLabel: "Amount",
        readOnly: true,
      },
    },
    {
      accessorKey: "bankAccount",
      title: "Bank Account",
      options: [...new Set(mockChecks.map((item) => item.bankAccount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bankAccount")
          .localeCompare(row2.getValue("bankAccount"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Bank Account",
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

  const filteredData = mockChecks.filter((item: CheckItem) => {
    // Filter by check status
    if (dataTableFilter.status === "Pending") {
      return item.status === "Pending";
    } else if (dataTableFilter.status === "Approved") {
      return item.status === "Approved";
    } else if (dataTableFilter.status === "Paid") {
      return item.status === "Paid";
    } else if (dataTableFilter.status === "Rejected") {
      return item.status === "Rejected";
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
      fixedColumns={["checkNumber", "status"]}
      pathName="checks"
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
