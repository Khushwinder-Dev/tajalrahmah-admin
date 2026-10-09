/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";

// Sales Quotation mock data aligned with SalesQuotationGrid
const mockSalesQuotations = [
  {
    id: "1",
    documentNumber: "SQ001",
    quotationNumber: "QUO-2024-001",
    quotationDate: "2024-01-10",
    customer: "ABC Trading LLC",
    vatNumber: "VAT-1234567890",
    paymentMode: "Bank Transfer",
    dueDays: 30,
    paymentDate: "2024-02-14",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    remarks: "Product quotation for electronics",
    salesman: "John Smith",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    draftedAt: null,
    updatedAt: "2024-01-20",
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "2",
    documentNumber: "SQ002",
    quotationNumber: "QUO-2024-002",
    quotationDate: "2024-01-12",
    customer: "Global Exports",
    vatNumber: "VAT-2345678901",
    paymentMode: "Credit Card",
    dueDays: 15,
    paymentDate: "2024-02-10",
    country: "UAE",
    state: "Dubai",
    city: "Business Bay",
    remarks: "Bulk order quotation",
    salesman: "Sarah Johnson",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    draftedAt: null,
    updatedAt: "2024-01-21",
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "3",
    documentNumber: "SQ003",
    quotationNumber: "QUO-2024-003",
    quotationDate: "2024-01-14",
    customer: "Sunrise Mart",
    vatNumber: "VAT-3456789012",
    paymentMode: "Cash",
    dueDays: 7,
    paymentDate: "2024-02-05",
    country: "UAE",
    state: "Abu Dhabi",
    city: "Mussafah",
    remarks: "Retail quotation for food items",
    salesman: "Michael Brown",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-17",
    draftedAt: null,
    updatedAt: "2024-01-22",
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "4",
    documentNumber: "SQ004",
    quotationNumber: "QUO-2024-004",
    quotationDate: "2024-01-16",
    customer: "Blue Ocean Foods",
    vatNumber: "VAT-4567890123",
    paymentMode: "Check",
    dueDays: 45,
    paymentDate: "2024-02-20",
    country: "UAE",
    state: "Sharjah",
    city: "Sharjah City",
    remarks: "Food service quotation",
    salesman: "Emily Davis",
    status: "Active",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    draftedAt: null,
    updatedAt: "2024-01-23",
    deletedAt: null,
    isDeleted: false,
  },
  {
    id: "5",
    documentNumber: "SQ005",
    quotationNumber: "QUO-2024-005",
    quotationDate: "2024-01-18",
    customer: "Prime Retailers",
    vatNumber: "VAT-5678901234",
    paymentMode: "Wire Transfer",
    dueDays: 60,
    paymentDate: "2024-03-20",
    country: "UAE",
    state: "Dubai",
    city: "DIFC",
    remarks: "Corporate quotation for office supplies",
    salesman: "Daniel Wilson",
    status: "Pending",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    draftedAt: null,
    updatedAt: "2024-01-24",
    deletedAt: null,
    isDeleted: false,
  },
];

export default function SalesReturnDataTable({
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
      options: ["SQ001", "SQ002", "SQ003", "SQ004", "SQ005"],
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
      accessorKey: "quotationNumber",
      title: "Quotation Number",
      options: [
        "QUO-2024-001",
        "QUO-2024-002",
        "QUO-2024-003",
        "QUO-2024-004",
        "QUO-2024-005",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return (Array.isArray(filterValue) ? filterValue : [filterValue]).some(
          (val: string) => cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) =>
        row1
          .getValue("quotationNumber")
          .localeCompare(row2.getValue("quotationNumber")),
      size: 170,
      minSize: 130,
    },
    {
      accessorKey: "quotationDate",
      title: "Quotation Date",
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
      sortingFn: (row1: any, row2: any) =>
        new Date(row1.getValue("quotationDate")).getTime() -
        new Date(row2.getValue("quotationDate")).getTime(),
      size: 120,
      minSize: 100,
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
      accessorKey: "vatNumber",
      title: "VAT Number",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return (Array.isArray(filterValue) ? filterValue : [filterValue]).some(
          (val: string) => cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) =>
        row1.getValue("vatNumber").localeCompare(row2.getValue("vatNumber")),
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
        "Wire Transfer",
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
      options: ["UAE"],
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
      options: ["Dubai", "Abu Dhabi", "Sharjah"],
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
      options: ["Deira", "Business Bay", "Mussafah", "Sharjah City", "DIFC"],
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

  const filteredData = mockSalesQuotations.filter((invoice) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return invoice.status === "Active";
    } else if (dataTableFilter.status === "Inactive") {
      return invoice.status === "Inactive";
    } else if (dataTableFilter.status === "Draft") {
      return invoice.status === "Draft";
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
