/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";

const mockInvoices = [
  {
    id: "1",
    documentNumber: "DOC001",
    invoiceNumber: "INV-2024-001",
    invoiceDate: "2024-01-15",
    customer: "ABC Trading LLC",
    trnNumber: "TRN-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: "2024-02-14",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    remarks: "Urgent delivery required",
    salesman: "John Smith",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    documentNumber: "DOC002",
    invoiceNumber: "INV-2024-002",
    invoiceDate: "2024-01-16",
    customer: "Global Exports",
    trnNumber: "TRN-2345678901",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: "2024-01-31",
    country: "United States",
    state: "New York",
    city: "New York",
    remarks: "Standard delivery",
    salesman: "Sarah Johnson",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    documentNumber: "DOC003",
    invoiceNumber: "INV-2024-003",
    invoiceDate: "2024-01-17",
    customer: "Sunrise Mart",
    trnNumber: "TRN-3456789012",
    paymentMode: "Cash",
    dueDays: 7,
    paymentDate: "2024-01-24",
    country: "United States",
    state: "Florida",
    city: "Miami",
    remarks: "Daily fresh delivery",
    salesman: "Michael Brown",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "active",
  },
  {
    id: "4",
    documentNumber: "DOC004",
    invoiceNumber: "INV-2024-004",
    invoiceDate: "2024-01-18",
    customer: "Blue Ocean Foods",
    trnNumber: "TRN-4567890123",
    paymentMode: "Check",
    dueDays: 45,
    paymentDate: "2024-03-04",
    country: "United States",
    state: "Texas",
    city: "Houston",
    remarks: "Temperature controlled delivery",
    salesman: "Emily Davis",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    documentNumber: "DOC005",
    invoiceNumber: "INV-2024-005",
    invoiceDate: "2024-01-19",
    customer: "Prime Retailers",
    trnNumber: "TRN-5678901234",
    paymentMode: "ACH Transfer",
    dueDays: 21,
    paymentDate: "2024-02-09",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    remarks: "Live delivery required",
    salesman: "John Smith",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
];

export default function InvoicesDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
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
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const componentColumns = [
    {
      accessorKey: "documentNumber",
      title: "Document",
      options: [
        "DOC001",
        "DOC002",
        "DOC003",
        "DOC004",
        "DOC005",
        "DOC006",
        "DOC007",
        "DOC008",
        "DOC009",
        "DOC010",
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
          .getValue("documentNumber")
          .localeCompare(row2.getValue("documentNumber"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "invoiceNumber",
      title: "Invoice Number",
      options: [
        "INV-2024-001",
        "INV-2024-002",
        "INV-2024-003",
        "INV-2024-004",
        "INV-2024-005",
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
          .getValue("invoiceNumber")
          .localeCompare(row2.getValue("invoiceNumber"));
      },
      size: 130,
      minSize: 110,
    },
    {
      accessorKey: "invoiceDate",
      title: "Invoice Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("invoiceDate")).getTime() -
          new Date(row2.getValue("invoiceDate")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [
        "ABC Trading LLC",
        "Global Exports",
        "Sunrise Mart",
        "Blue Ocean Foods",
        "Prime Retailers",
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
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 180,
      minSize: 150,
    },
    {
      accessorKey: "trnNumber",
      title: "TRN Number",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return (Array.isArray(filterValue) ? filterValue : [filterValue]).some(
          (val: string) => cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("trnNumber")
          .localeCompare(row2.getValue("trnNumber"));
      },
      size: 160,
      minSize: 140,
    },
    {
      accessorKey: "paymentMode",
      title: "Payment Mode",
      options: [
        "Bank Transfer",
        "Credit Card",
        "Cash",
        "Check",
        "ACH Transfer",
        "Net Banking",
        "PayPal",
        "Wire Transfer",
        "Credit Line",
        "Cash on Delivery",
        "Debit Card",
        "Electronic Payment",
        "Letter of Credit",
        "Mobile Payment",
        "Installment Plan",
        "Crypto Payment",
        "Gift Card Credit",
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
          .getValue("paymentMode")
          .localeCompare(row2.getValue("paymentMode"));
      },
      size: 150,
      minSize: 120,
    },
    {
      accessorKey: "dueDays",
      title: "Due Days",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("dueDays") - row2.getValue("dueDays");
      },
      size: 90,
      minSize: 70,
    },
    {
      accessorKey: "paymentDate",
      title: "Payment Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("paymentDate")).getTime() -
          new Date(row2.getValue("paymentDate")).getTime()
        );
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "salesman",
      title: "Salesman",
      options: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return (Array.isArray(filterValue) ? filterValue : [filterValue]).some(
          (val: string) => cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("salesman")
          .localeCompare(row2.getValue("salesman"));
      },
      size: 140,
      minSize: 120,
    },
    {
      accessorKey: "remarks",
      title: "Remarks",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "country",
      title: "Country",
      options: ["United States"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "state",
      title: "State",
      options: [
        "California",
        "New York",
        "Florida",
        "Texas",
        "Washington",
        "Wisconsin",
        "Oregon",
        "Louisiana",
        "Georgia",
        "Illinois",
        "Colorado",
        "Minnesota",
        "Nevada",
        "Arizona",
        "North Carolina",
        "Massachusetts",
        "Tennessee",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("state").localeCompare(row2.getValue("state"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "city",
      title: "City",
      options: [
        "Los Angeles",
        "New York",
        "Miami",
        "Houston",
        "Seattle",
        "Milwaukee",
        "Portland",
        "New Orleans",
        "Atlanta",
        "Chicago",
        "Denver",
        "Minneapolis",
        "Las Vegas",
        "Phoenix",
        "Charlotte",
        "Boston",
        "Nashville",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("city").localeCompare(row2.getValue("city"));
      },
      size: 120,
      minSize: 100,
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
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
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
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

  const filteredData = mockInvoices.filter((invoice) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return invoice.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return invoice.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return invoice.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return invoice.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return invoice.updatedAt !== invoice.createdAt;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      componentColumns={componentColumns}
      viewMode={viewMode}
      setViewMode={setViewMode}
      fixedColumns={["documentNumber"]}
      searchQuery={""}
      pathName={""}
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
    />
  );
}
