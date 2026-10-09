/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const MockData = [
  {
    id: "1",
    product: "Conion Ceiling Fan",
    quantity: "100",
    deadline: "2025-09-15",
    planFrom: "Sales Order",
    unitOfMeasure: "pcs",
    responsible: "Mr. Rahim",
    bomCode: "BOM-001",
    referenceCode: "REF-1001",
    routing: "Assembly Line A",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    product: "Samsung Refrigerator",
    quantity: "50",
    deadline: "2025-09-20",
    planFrom: "Forecast",
    unitOfMeasure: "pcs",
    responsible: "Ms. Jahanara",
    bomCode: "BOM-002",
    referenceCode: "REF-1002",
    routing: "Assembly Line B",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    status: "active",
    actionMessage: "4h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    product: "LG Washing Machine",
    quantity: "30",
    deadline: "2025-10-01",
    planFrom: "Manual Plan",
    unitOfMeasure: "pcs",
    responsible: "Mr. Karim",
    bomCode: "BOM-003",
    referenceCode: "REF-1003",
    routing: "Assembly Line C",
    createdAt: "2022-01-10",
    updatedAt: "2022-12-20",
    draftedAt: "2022-01-01",
    status: "archived",
    actionMessage: "6mo",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    product: "Panasonic Microwave",
    quantity: "75",
    deadline: "2025-09-25",
    planFrom: "Sales Order",
    unitOfMeasure: "pcs",
    responsible: "Ms. Nabila",
    bomCode: "BOM-004",
    referenceCode: "REF-1004",
    routing: "Assembly Line A",
    createdAt: "2021-01-12",
    updatedAt: "2021-12-22",
    draftedAt: "2020-12-30",
    status: "archived",
    actionMessage: "1y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    product: "Philips Blender",
    quantity: "120",
    deadline: "2025-11-10",
    planFrom: "Forecast",
    unitOfMeasure: "pcs",
    responsible: "Mr. Alam",
    bomCode: "BOM-005",
    referenceCode: "REF-1005",
    routing: "Assembly Line B",
    createdAt: "2020-01-10",
    updatedAt: "2020-12-15",
    draftedAt: "2020-01-01",
    status: "archived",
    actionMessage: "2y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    product: "Sony TV",
    quantity: "40",
    deadline: "2025-12-05",
    planFrom: "Sales Order",
    unitOfMeasure: "pcs",
    responsible: "Mr. Babul",
    bomCode: "BOM-006",
    referenceCode: "REF-1006",
    routing: "Assembly Line C",
    createdAt: "2019-01-08",
    updatedAt: "2019-12-10",
    draftedAt: "2018-12-28",
    status: "archived",
    actionMessage: "3y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    product: "Walton AC",
    quantity: "20",
    deadline: "2026-01-20",
    planFrom: "Manual Plan",
    unitOfMeasure: "pcs",
    responsible: "Mr. Imran",
    bomCode: "BOM-007",
    referenceCode: "REF-1007",
    routing: "Assembly Line A",
    createdAt: "2018-01-05",
    updatedAt: "2018-12-12",
    draftedAt: "2017-12-30",
    status: "archived",
    actionMessage: "4y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    product: "Miyako Rice Cooker",
    quantity: "200",
    deadline: "2025-09-30",
    planFrom: "Forecast",
    unitOfMeasure: "pcs",
    responsible: "Ms. Farzana",
    bomCode: "BOM-008",
    referenceCode: "REF-1008",
    routing: "Assembly Line B",
    createdAt: "2024-12-01",
    updatedAt: "2025-06-01",
    draftedAt: "2024-11-20",
    status: "draft",
    actionMessage: "3d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    product: "Vision Air Cooler",
    quantity: "60",
    deadline: "2025-10-15",
    planFrom: "Sales Order",
    unitOfMeasure: "pcs",
    responsible: "Mr. Rashed",
    bomCode: "BOM-009",
    referenceCode: "REF-1009",
    routing: "Assembly Line C",
    createdAt: "2025-12-15",
    updatedAt: "2026-01-05",
    draftedAt: "2025-12-01",
    status: "draft",
    actionMessage: "2d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    product: "Singer Sewing Machine",
    quantity: "90",
    deadline: "2025-11-05",
    planFrom: "Manual Plan",
    unitOfMeasure: "pcs",
    responsible: "Ms. Sadia",
    bomCode: "BOM-010",
    referenceCode: "REF-1010",
    routing: "Assembly Line A",
    createdAt: "2026-12-20",
    updatedAt: "2027-01-02",
    draftedAt: "2026-12-10",
    status: "upcoming",
    actionMessage: "1d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    product: "Sharp Oven",
    quantity: "110",
    deadline: "2025-12-01",
    planFrom: "Forecast",
    unitOfMeasure: "pcs",
    responsible: "Mr. Hossain",
    bomCode: "BOM-011",
    referenceCode: "REF-1011",
    routing: "Assembly Line B",
    createdAt: "2025-11-10",
    updatedAt: "2025-12-05",
    draftedAt: "2025-11-01",
    status: "draft",
    actionMessage: "5d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    product: "Hitachi Vacuum Cleaner",
    quantity: "70",
    deadline: "2025-10-25",
    planFrom: "Sales Order",
    unitOfMeasure: "pcs",
    responsible: "Ms. Tanjila",
    bomCode: "BOM-012",
    referenceCode: "REF-1012",
    routing: "Assembly Line C",
    createdAt: "2025-12-10",
    updatedAt: "2026-01-03",
    draftedAt: "2025-12-01",
    status: "draft",
    actionMessage: "2d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function ManufacturingOrdersDataTable({
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
  const { canCreate } = useCountriesPermissions();

  const componentColumns = [
    {
      accessorKey: "product",
      title: "Product",
      options: [...new Set(MockData.map((item) => item.product))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("product").localeCompare(row2.getValue("product"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "product",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "quantity",
      title: "Quantity",
      options: [...new Set(MockData.map((item) => item.quantity))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("quantity")
          .localeCompare(row2.getValue("quantity"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "quantity",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "deadline",
      title: "Deadline",
      options: [...new Set(MockData.map((item) => item.deadline))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deadline")
          .localeCompare(row2.getValue("deadline"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "deadline",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "planFrom",
      title: "Plan From",
      options: [...new Set(MockData.map((item) => item.planFrom))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("planFrom")
          .localeCompare(row2.getValue("planFrom"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "planFrom",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(MockData.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 180,
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
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("draftedAt")).getTime() -
          new Date(row2.getValue("draftedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = MockData.filter((item) => {
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
      fixedColumns={["product", "status"]} // Pin country name column
      pathName="manufacturing-orders"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
