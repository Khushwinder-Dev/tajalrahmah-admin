/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";

const mockInvoices = [
  {
    id: "1",
    documentNumber: "DOC001",
    poNumber: "PO-2024-001",
    poDate: "2024-01-15",
    supplierName: "ABC Food Supplies",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: "2024-02-14",
    supplierNumber: "SUP001",
    supplierStatus: "Active",
    supplierGroup: "Food & Beverages",
    remarks: "Urgent delivery required",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    documentNumber: "DOC002",
    poNumber: "PO-2024-002",
    poDate: "2024-01-16",
    supplierName: "XYZ Restaurant Equipment",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: "2024-01-31",
    supplierNumber: "SUP002",
    supplierStatus: "Active",
    supplierGroup: "Equipment",
    remarks: "Standard delivery",
    country: "United States",
    state: "New York",
    city: "New York",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    documentNumber: "DOC003",
    poNumber: "PO-2024-003",
    poDate: "2024-01-17",
    supplierName: "Fresh Produce Co.",
    paymentMode: "Cash",
    dueDays: 7,
    paymentDate: "2024-01-24",
    supplierNumber: "SUP003",
    supplierStatus: "Active",
    supplierGroup: "Fresh Produce",
    remarks: "Daily fresh delivery",
    country: "United States",
    state: "Florida",
    city: "Miami",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "active",
  },
  {
    id: "4",
    documentNumber: "DOC004",
    poNumber: "PO-2024-004",
    poDate: "2024-01-18",
    supplierName: "Premium Meat Suppliers",
    paymentMode: "Check",
    dueDays: 45,
    paymentDate: "2024-03-04",
    supplierNumber: "SUP004",
    supplierStatus: "Active",
    supplierGroup: "Meat & Poultry",
    remarks: "Temperature controlled delivery",
    country: "United States",
    state: "Texas",
    city: "Houston",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    documentNumber: "DOC005",
    poNumber: "PO-2024-005",
    poDate: "2024-01-19",
    supplierName: "Ocean Fresh Seafood",
    paymentMode: "ACH Transfer",
    dueDays: 21,
    paymentDate: "2024-02-09",
    supplierNumber: "SUP005",
    supplierStatus: "Active",
    supplierGroup: "Seafood",
    remarks: "Live delivery required",
    country: "United States",
    state: "Washington",
    city: "Seattle",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    documentNumber: "DOC006",
    poNumber: "PO-2024-006",
    poDate: "2024-01-20",
    supplierName: "Dairy Farm Products",
    paymentMode: "Net Banking",
    dueDays: 14,
    paymentDate: "2024-02-03",
    supplierNumber: "SUP006",
    supplierStatus: "Active",
    supplierGroup: "Dairy",
    remarks: "Refrigerated transport",
    country: "United States",
    state: "Wisconsin",
    city: "Milwaukee",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    documentNumber: "DOC007",
    poNumber: "PO-2024-007",
    poDate: "2024-01-21",
    supplierName: "Organic Vegetables Ltd",
    paymentMode: "PayPal",
    dueDays: 10,
    paymentDate: "2024-01-31",
    supplierNumber: "SUP007",
    supplierStatus: "Pending",
    supplierGroup: "Organic Produce",
    remarks: "Organic certification required",
    country: "United States",
    state: "Oregon",
    city: "Portland",
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "8",
    documentNumber: "DOC008",
    poNumber: "PO-2024-008",
    poDate: "2024-01-22",
    supplierName: "Spice World International",
    paymentMode: "Wire Transfer",
    dueDays: 60,
    paymentDate: "2024-03-23",
    supplierNumber: "SUP008",
    supplierStatus: "Active",
    supplierGroup: "Spices & Herbs",
    remarks: "Bulk order - quarterly supply",
    country: "United States",
    state: "Louisiana",
    city: "New Orleans",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "active",
  },
  {
    id: "9",
    documentNumber: "DOC009",
    poNumber: "PO-2024-009",
    poDate: "2024-01-23",
    supplierName: "Beverage Distributors Inc",
    paymentMode: "Credit Line",
    dueDays: 30,
    paymentDate: "2024-02-22",
    supplierNumber: "SUP009",
    supplierStatus: "Active",
    supplierGroup: "Beverages",
    remarks: "Weekly delivery schedule",
    country: "United States",
    state: "Georgia",
    city: "Atlanta",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    documentNumber: "DOC010",
    poNumber: "PO-2024-010",
    poDate: "2024-01-24",
    supplierName: "Kitchen Supplies Pro",
    paymentMode: "Cash on Delivery",
    dueDays: 0,
    paymentDate: "2024-01-24",
    supplierNumber: "SUP010",
    supplierStatus: "Active",
    supplierGroup: "Kitchen Supplies",
    remarks: "Installation included",
    country: "United States",
    state: "Illinois",
    city: "Chicago",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
  {
    id: "11",
    documentNumber: "DOC011",
    poNumber: "PO-2024-011",
    poDate: "2024-01-25",
    supplierName: "Bakery Ingredients Corp",
    paymentMode: "Debit Card",
    dueDays: 20,
    paymentDate: "2024-02-14",
    supplierNumber: "SUP011",
    supplierStatus: "Active",
    supplierGroup: "Bakery",
    remarks: "Temperature sensitive items",
    country: "United States",
    state: "Colorado",
    city: "Denver",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isDeleted: false,
    status: "active",
  },
  {
    id: "12",
    documentNumber: "DOC012",
    poNumber: "PO-2024-012",
    poDate: "2024-01-26",
    supplierName: "Frozen Foods Express",
    paymentMode: "Electronic Payment",
    dueDays: 25,
    paymentDate: "2024-02-20",
    supplierNumber: "SUP012",
    supplierStatus: "Active",
    supplierGroup: "Frozen Foods",
    remarks: "Frozen storage required",
    country: "United States",
    state: "Minnesota",
    city: "Minneapolis",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isDeleted: false,
    status: "active",
  },
  {
    id: "13",
    documentNumber: "DOC013",
    poNumber: "PO-2024-013",
    poDate: "2024-01-27",
    supplierName: "Gourmet Food Imports",
    paymentMode: "Letter of Credit",
    dueDays: 90,
    paymentDate: "2024-04-26",
    supplierNumber: "SUP013",
    supplierStatus: "Pending",
    supplierGroup: "Gourmet Foods",
    remarks: "Import documentation pending",
    country: "United States",
    state: "Nevada",
    city: "Las Vegas",
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "14",
    documentNumber: "DOC014",
    poNumber: "PO-2024-014",
    poDate: "2024-01-28",
    supplierName: "Cleaning Supplies Direct",
    paymentMode: "Mobile Payment",
    dueDays: 15,
    paymentDate: "2024-02-12",
    supplierNumber: "SUP014",
    supplierStatus: "Active",
    supplierGroup: "Cleaning Supplies",
    remarks: "Eco-friendly products only",
    country: "United States",
    state: "Arizona",
    city: "Phoenix",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isDeleted: false,
    status: "active",
  },
  {
    id: "15",
    documentNumber: "DOC015",
    poNumber: "PO-2024-015",
    poDate: "2024-01-29",
    supplierName: "Restaurant Furniture Co",
    paymentMode: "Installment Plan",
    dueDays: 120,
    paymentDate: "2024-05-28",
    supplierNumber: "SUP015",
    supplierStatus: "Active",
    supplierGroup: "Furniture",
    remarks: "Custom design requirements",
    country: "United States",
    state: "North Carolina",
    city: "Charlotte",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isDeleted: false,
    status: "active",
  },
  {
    id: "16",
    documentNumber: "DOC016",
    poNumber: "PO-2024-016",
    poDate: "2024-01-30",
    supplierName: "Tech Solutions Restaurant",
    paymentMode: "Crypto Payment",
    dueDays: 30,
    paymentDate: "2024-03-01",
    supplierNumber: "SUP016",
    supplierStatus: "Active",
    supplierGroup: "Technology",
    remarks: "Software licensing included",
    country: "United States",
    state: "Massachusetts",
    city: "Boston",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isDeleted: false,
    status: "active",
  },
  {
    id: "17",
    documentNumber: "DOC017",
    poNumber: "PO-2024-017",
    poDate: "2024-01-31",
    supplierName: "Uniform & Apparel Supply",
    paymentMode: "Gift Card Credit",
    dueDays: 45,
    paymentDate: "2024-03-17",
    supplierNumber: "SUP017",
    supplierStatus: "Active",
    supplierGroup: "Uniforms",
    remarks: "Custom embroidery required",
    country: "United States",
    state: "Tennessee",
    city: "Nashville",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
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
      title: "Document Number",
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
      accessorKey: "poNumber",
      title: "P.O Number",
      options: [
        "PO-2024-001",
        "PO-2024-002",
        "PO-2024-003",
        "PO-2024-004",
        "PO-2024-005",
        "PO-2024-006",
        "PO-2024-007",
        "PO-2024-008",
        "PO-2024-009",
        "PO-2024-010",
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
          .getValue("poNumber")
          .localeCompare(row2.getValue("poNumber"));
      },
      size: 130,
      minSize: 110,
    },
    {
      accessorKey: "poDate",
      title: "P.O Date",
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
          new Date(row1.getValue("poDate")).getTime() -
          new Date(row2.getValue("poDate")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "supplierName",
      title: "Supplier Name",
      options: [
        "ABC Food Supplies",
        "XYZ Restaurant Equipment",
        "Fresh Produce Co.",
        "Premium Meat Suppliers",
        "Ocean Fresh Seafood",
        "Dairy Farm Products",
        "Organic Vegetables Ltd",
        "Spice World International",
        "Beverage Distributors Inc",
        "Kitchen Supplies Pro",
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
          .getValue("supplierName")
          .localeCompare(row2.getValue("supplierName"));
      },
      size: 180,
      minSize: 150,
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
      accessorKey: "supplierNumber",
      title: "Supplier Number",
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
      size: 130,
      minSize: 110,
    },
    {
      accessorKey: "supplierStatus",
      title: "Supplier Status",
      options: ["Active", "Pending", "Inactive"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplierStatus")
          .localeCompare(row2.getValue("supplierStatus"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "supplierGroup",
      title: "Supplier Group",
      options: [
        "Food & Beverages",
        "Equipment",
        "Fresh Produce",
        "Meat & Poultry",
        "Seafood",
        "Dairy",
        "Organic Produce",
        "Spices & Herbs",
        "Beverages",
        "Kitchen Supplies",
        "Bakery",
        "Frozen Foods",
        "Gourmet Foods",
        "Cleaning Supplies",
        "Furniture",
        "Technology",
        "Uniforms",
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
          .getValue("supplierGroup")
          .localeCompare(row2.getValue("supplierGroup"));
      },
      size: 150,
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
