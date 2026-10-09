/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockBanks = [
  {
    id: "1",
    bankName: "National Bank",
    accountNumber: "1234567890",
    branchName: "Main Branch",
    ibanNumber: "SA0380000000608010167519",
    openingBalance: 50000.0,
    address: "123 Main Street, City Center",
    bankDetails: "Primary business account for daily transactions",
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    bankName: "Commercial Bank",
    accountNumber: "0987654321",
    branchName: "Downtown Branch",
    ibanNumber: "SA0380000000608010167520",
    openingBalance: 75000.0,
    address: "456 Business Ave, Downtown",
    bankDetails: "Secondary account for investments",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    bankName: "Investment Bank",
    accountNumber: "1122334455",
    branchName: "Financial District",
    ibanNumber: "SA0380000000608010167521",
    openingBalance: 100000.0,
    address: "789 Finance Blvd, Financial District",
    bankDetails: "Investment and trading account",
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "4",
    bankName: "Islamic Bank",
    accountNumber: "5566778899",
    branchName: "Islamic Center",
    ibanNumber: "SA0380000000608010167522",
    openingBalance: 30000.0,
    address: "321 Islamic Way, Islamic Center",
    bankDetails: "Sharia-compliant banking services",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    bankName: "Central Bank",
    accountNumber: "9988776655",
    branchName: "Government Plaza",
    ibanNumber: "SA0380000000608010167523",
    openingBalance: 200000.0,
    address: "654 Government St, Government Plaza",
    bankDetails: "Government and institutional banking",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    bankName: "Development Bank",
    accountNumber: "4433221100",
    branchName: "Development Zone",
    ibanNumber: "SA0380000000608010167524",
    openingBalance: 150000.0,
    address: "987 Development Rd, Development Zone",
    bankDetails: "Development and infrastructure financing",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    bankName: "Savings Bank",
    accountNumber: "1122334455",
    branchName: "Community Center",
    ibanNumber: "SA0380000000608010167525",
    openingBalance: 25000.0,
    address: "147 Community Ave, Community Center",
    bankDetails: "Personal savings and checking accounts",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "active",
  },
  {
    id: "8",
    bankName: "Credit Bank",
    accountNumber: "6677889900",
    branchName: "Credit Union",
    ibanNumber: "SA0380000000608010167526",
    openingBalance: 40000.0,
    address: "258 Credit St, Credit Union",
    bankDetails: "Credit and loan services",
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "inactive",
  },
  {
    id: "9",
    bankName: "Merchant Bank",
    accountNumber: "8899001122",
    branchName: "Trade Center",
    ibanNumber: "SA0380000000608010167527",
    openingBalance: 80000.0,
    address: "369 Trade Blvd, Trade Center",
    bankDetails: "Merchant and trade financing",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    bankName: "Retail Bank",
    accountNumber: "3344556677",
    branchName: "Shopping Mall",
    ibanNumber: "SA0380000000608010167528",
    openingBalance: 35000.0,
    address: "741 Mall Rd, Shopping Mall",
    bankDetails: "Retail banking and personal services",
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
];

export default function BanksDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
}) {
  const componentColumns = [
    {
      accessorKey: "bankName",
      title: "Bank Name",
      options: [
        "National Bank",
        "Commercial Bank",
        "Investment Bank",
        "Islamic Bank",
        "Central Bank",
        "Development Bank",
        "Savings Bank",
        "Credit Bank",
        "Merchant Bank",
        "Retail Bank",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bankName")
          .localeCompare(row2.getValue("bankName"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "accountNumber",
      title: "Account Number",
      options: [
        "1234567890",
        "0987654321",
        "1122334455",
        "5566778899",
        "9988776655",
        "4433221100",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("accountNumber")
          .localeCompare(row2.getValue("accountNumber"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "branchName",
      title: "Branch Name",
      options: [
        "Main Branch",
        "Downtown Branch",
        "Financial District",
        "Islamic Center",
        "Government Plaza",
        "Development Zone",
        "Community Center",
        "Credit Union",
        "Trade Center",
        "Shopping Mall",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("branchName")
          .localeCompare(row2.getValue("branchName"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "ibanNumber",
      title: "IBAN Number",
      options: [
        "SA0380000000608010167519",
        "SA0380000000608010167520",
        "SA0380000000608010167521",
        "SA0380000000608010167522",
        "SA0380000000608010167523",
        "SA0380000000608010167524",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("ibanNumber")
          .localeCompare(row2.getValue("ibanNumber"));
      },
      size: 200,
      minSize: 180,
    },
    {
      accessorKey: "openingBalance",
      title: "Opening Balance",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("openingBalance") - row2.getValue("openingBalance")
        );
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "address",
      title: "Address",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 250,
      minSize: 200,
    },
    {
      accessorKey: "bankDetails",
      title: "Bank Details",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 250,
      minSize: 200,
    },
    {
      accessorKey: "status",
      title: "Status",
      options: ["active", "inactive", "draft"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "status",
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
  ];

  const filteredData = mockBanks.filter((bank) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return bank.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return bank.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return bank.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return bank.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return bank.updatedAt !== bank.createdAt;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      componentColumns={componentColumns}
      viewMode={viewMode}
      setViewMode={setViewMode}
      fixedColumns={[]}
    />
  );
}
