/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";

const mockOpeningStocks = [
  {
    id: "1",
    documentNumber: "OS001",
    sourceBranch: "Main Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-15",
    remarks: "Initial inventory setup",
    amount: 15000.5,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    documentNumber: "OS002",
    sourceBranch: "North Branch",
    destinationBranch: "South Branch",
    documentDate: "2024-01-16",
    remarks: "Quarterly stock adjustment",
    amount: 8750.25,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    documentNumber: "OS003",
    sourceBranch: "South Branch",
    destinationBranch: "East Branch",
    documentDate: "2024-01-17",
    remarks: "New location inventory",
    amount: 12300.75,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "active",
  },
  {
    id: "4",
    documentNumber: "OS004",
    sourceBranch: "East Branch",
    destinationBranch: "West Branch",
    documentDate: "2024-01-18",
    remarks: "Stock reconciliation",
    amount: 9850.0,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    documentNumber: "OS005",
    sourceBranch: "West Branch",
    destinationBranch: "Central Branch",
    documentDate: "2024-01-19",
    remarks: "Monthly inventory update",
    amount: 16750.3,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    documentNumber: "OS006",
    sourceBranch: "Central Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-20",
    remarks: "Year-end stock count",
    amount: 22100.45,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    documentNumber: "OS007",
    sourceBranch: "Downtown Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-21",
    remarks: "Seasonal inventory adjustment",
    amount: 7890.6,
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "8",
    documentNumber: "OS008",
    sourceBranch: "Suburban Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-22",
    remarks: "New product line addition",
    amount: 13450.8,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "active",
  },
  {
    id: "9",
    documentNumber: "OS009",
    sourceBranch: "Uptown Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-23",
    remarks: "Bulk purchase inventory",
    amount: 18600.9,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    documentNumber: "OS010",
    sourceBranch: "Riverside Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-24",
    remarks: "Emergency stock replenishment",
    amount: 5320.15,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
  {
    id: "11",
    documentNumber: "OS011",
    sourceBranch: "Hillside Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-25",
    remarks: "Inventory transfer documentation",
    amount: 11750.25,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isDeleted: false,
    status: "active",
  },
  {
    id: "12",
    documentNumber: "OS012",
    sourceBranch: "Lakeside Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-26",
    remarks: "Seasonal clearance stock",
    amount: 6780.4,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isDeleted: false,
    status: "active",
  },
  {
    id: "13",
    documentNumber: "OS013",
    sourceBranch: "Garden Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-27",
    remarks: "Pending audit verification",
    amount: 14250.75,
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "14",
    documentNumber: "OS014",
    sourceBranch: "Plaza Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-28",
    remarks: "Weekly stock update",
    amount: 8920.55,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isDeleted: false,
    status: "active",
  },
  {
    id: "15",
    documentNumber: "OS015",
    sourceBranch: "Metro Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-29",
    remarks: "Special category inventory",
    amount: 19850.35,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isDeleted: false,
    status: "active",
  },
  {
    id: "16",
    documentNumber: "OS016",
    sourceBranch: "Business District",
    destinationBranch: "North Branch",
    documentDate: "2024-01-30",
    remarks: "Technology equipment stock",
    amount: 25600.2,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isDeleted: false,
    status: "active",
  },
  {
    id: "17",
    documentNumber: "OS017",
    sourceBranch: "Airport Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-01-31",
    remarks: "High-value inventory items",
    amount: 31200.75,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isDeleted: false,
    status: "active",
  },
  {
    id: "18",
    documentNumber: "OS018",
    sourceBranch: "Mall Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-02-01",
    remarks: "Retail inventory setup",
    amount: 17890.5,
    isActive: false,
    isDraft: true,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "19",
    documentNumber: "OS019",
    sourceBranch: "Harbor Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-02-02",
    remarks: "Import inventory documentation",
    amount: 28450.9,
    isActive: true,
    isDraft: false,
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isDeleted: false,
    status: "active",
  },
  {
    id: "20",
    documentNumber: "OS020",
    sourceBranch: "Industrial Branch",
    destinationBranch: "North Branch",
    documentDate: "2024-02-03",
    remarks: "Manufacturing inventory count",
    amount: 45670.25,
    isActive: true,
    isDraft: false,
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isDeleted: false,
    status: "active",
  },
];

export default function OpeningStockDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  setIsExportOpen,
  isExportOpen,
  setIsFilterOpen,
  isFilterOpen,
  setIsVisibilityOpen,
  isVisibilityOpen,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsVisibilityOpen: (isVisibilityOpen: boolean) => void;
  isVisibilityOpen: boolean;
}) {
  const componentColumns = [
    {
      accessorKey: "documentNumber",
      title: "Document Number",
      options: [
        "OS001",
        "OS002",
        "OS003",
        "OS004",
        "OS005",
        "OS006",
        "OS007",
        "OS008",
        "OS009",
        "OS010",
        "OS011",
        "OS012",
        "OS013",
        "OS014",
        "OS015",
        "OS016",
        "OS017",
        "OS018",
        "OS019",
        "OS020",
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
      size: 140,
      minSize: 120,
    },
    {
      accessorKey: "sourceBranch",
      title: "Source Branch",
      options: [
        "Main Branch",
        "North Branch",
        "South Branch",
        "East Branch",
        "West Branch",
        "Central Branch",
        "Downtown Branch",
        "Suburban Branch",
        "Uptown Branch",
        "Riverside Branch",
        "Hillside Branch",
        "Lakeside Branch",
        "Garden Branch",
        "Plaza Branch",
        "Metro Branch",
        "Business District",
        "Airport Branch",
        "Mall Branch",
        "Harbor Branch",
        "Industrial Branch",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 160,
      minSize: 140,
    },
    {
      accessorKey: "destinationBranch",
      title: "Destination Branch",
      options: [
        "Main Branch",
        "North Branch",
        "South Branch",
        "East Branch",
        "West Branch",
        "Central Branch",
        "Downtown Branch",
        "Suburban Branch",
        "Uptown Branch",
        "Riverside Branch",
        "Hillside Branch",
        "Lakeside Branch",
        "Garden Branch",
        "Plaza Branch",
        "Metro Branch",
        "Business District",
        "Airport Branch",
        "Mall Branch",
        "Harbor Branch",
        "Industrial Branch",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 160,
      minSize: 140,
    },
    {
      accessorKey: "documentDate",
      title: "Document Date",
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
          new Date(row1.getValue("documentDate")).getTime() -
          new Date(row2.getValue("documentDate")).getTime()
        );
      },
      size: 130,
      minSize: 110,
    },
    {
      accessorKey: "remarks",
      title: "Remarks",
      options: [
        "Initial inventory setup",
        "Quarterly stock adjustment",
        "New location inventory",
        "Stock reconciliation",
        "Monthly inventory update",
        "Year-end stock count",
        "Seasonal inventory adjustment",
        "New product line addition",
        "Bulk purchase inventory",
        "Emergency stock replenishment",
        "Inventory transfer documentation",
        "Seasonal clearance stock",
        "Pending audit verification",
        "Weekly stock update",
        "Special category inventory",
        "Technology equipment stock",
        "High-value inventory items",
        "Retail inventory setup",
        "Import inventory documentation",
        "Manufacturing inventory count",
      ],
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
        return row1.getValue("remarks").localeCompare(row2.getValue("remarks"));
      },
      size: 250,
      minSize: 200,
    },
    {
      accessorKey: "amount",
      title: "Amount",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) => {
            const numVal = parseFloat(val);
            return !isNaN(numVal) && cellValue === numVal;
          });
        }
        const numVal = parseFloat(filterValue);
        return !isNaN(numVal) && cellValue === numVal;
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("amount") - row2.getValue("amount");
      },
      size: 120,
      minSize: 100,
      meta: {
        type: "currency",
        exportLabel: "Amount ($)",
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created Date",
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
      size: 130,
      minSize: 110,
      meta: {
        type: "date",
        exportLabel: "Created Date",
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated Date",
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
      size: 130,
      minSize: 110,
      meta: {
        type: "date",
        exportLabel: "Updated Date",
      },
    },
  ];

  // Filter logic for opening stock data
  const filteredData = mockOpeningStocks.filter((stock) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return stock.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !stock.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return stock.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return stock.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return stock.updatedAt !== stock.createdAt;
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
      searchQuery={""}
      pathName={""}
      setShowExport={setIsExportOpen}
      showExport={isExportOpen}
      setShowFilter={setIsFilterOpen}
      showFilter={isFilterOpen}
      setShowVisibility={setIsVisibilityOpen}
      showVisibility={isVisibilityOpen}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
    />
  );
}
