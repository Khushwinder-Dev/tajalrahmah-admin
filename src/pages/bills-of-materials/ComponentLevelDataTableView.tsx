/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  product: string;
  productVariant: string;
  quantity: string;
  unitOfMeasure: string;
  routing: string;
  bomType: string;
  manufacturingReadiness: string;
  consumption: string;
  description: string;

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
    product: "Laptop",
    productVariant: "16GB RAM / 512GB SSD",
    quantity: "50",
    unitOfMeasure: "pcs",
    routing: "Assembly Line 1",
    bomType: "Standard",
    manufacturingReadiness: "Ready",
    consumption: "Flexible",
    description: "High-performance business laptop",
    status: "Active",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-10",
    draftedAt: null,
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    product: "Smartphone",
    productVariant: "128GB / Black",
    quantity: "200",
    unitOfMeasure: "pcs",
    routing: "Assembly Line 2",
    bomType: "Phantom",
    manufacturingReadiness: "In Progress",
    consumption: "Strict",
    description: "Flagship smartphone model",
    status: "Active",
    createdAt: "2025-08-02",
    updatedAt: "2025-08-11",
    draftedAt: null,
    actionMessage: "In Production",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    product: "Air Conditioner",
    productVariant: "1.5 Ton / Inverter",
    quantity: "75",
    unitOfMeasure: "pcs",
    routing: "Cooling Unit Line",
    bomType: "Standard",
    manufacturingReadiness: "Ready",
    consumption: "Flexible",
    description: "Energy efficient AC unit",
    status: "Active",
    createdAt: "2025-08-03",
    updatedAt: "2025-08-12",
    draftedAt: null,
    actionMessage: "Stock Updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    product: "Electric Fan",
    productVariant: "16-inch / White",
    quantity: "300",
    unitOfMeasure: "pcs",
    routing: "Fan Production Line",
    bomType: "Standard",
    manufacturingReadiness: "Ready",
    consumption: "Flexible",
    description: "Cooling fan for home use",
    status: "Active",
    createdAt: "2025-08-04",
    updatedAt: "2025-08-12",
    draftedAt: null,
    actionMessage: "Production Completed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    product: "Washing Machine",
    productVariant: "7kg / Front Load",
    quantity: "60",
    unitOfMeasure: "pcs",
    routing: "Appliance Line A",
    bomType: "Standard",
    manufacturingReadiness: "Pending",
    consumption: "Strict",
    description: "Automatic washing machine",
    status: "Draft",
    createdAt: "2025-08-05",
    updatedAt: "2025-08-13",
    draftedAt: "2025-08-10",
    actionMessage: "Waiting Approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    product: "Microwave Oven",
    productVariant: "30L / Black",
    quantity: "90",
    unitOfMeasure: "pcs",
    routing: "Appliance Line B",
    bomType: "Standard",
    manufacturingReadiness: "Ready",
    consumption: "Flexible",
    description: "Compact microwave oven",
    status: "Active",
    createdAt: "2025-08-06",
    updatedAt: "2025-08-14",
    draftedAt: null,
    actionMessage: "Shipped",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    product: "Tablet",
    productVariant: "10-inch / 256GB",
    quantity: "120",
    unitOfMeasure: "pcs",
    routing: "Assembly Line 3",
    bomType: "Phantom",
    manufacturingReadiness: "In Progress",
    consumption: "Strict",
    description: "High-resolution display tablet",
    status: "Active",
    createdAt: "2025-08-07",
    updatedAt: "2025-08-15",
    draftedAt: null,
    actionMessage: "Ongoing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    product: "Smartwatch",
    productVariant: "42mm / Silver",
    quantity: "150",
    unitOfMeasure: "pcs",
    routing: "Wearable Line",
    bomType: "Standard",
    manufacturingReadiness: "Ready",
    consumption: "Flexible",
    description: "Fitness tracking smartwatch",
    status: "Active",
    createdAt: "2025-08-08",
    updatedAt: "2025-08-15",
    draftedAt: null,
    actionMessage: "Stock Ready",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    product: "Refrigerator",
    productVariant: "350L / Double Door",
    quantity: "40",
    unitOfMeasure: "pcs",
    routing: "Cooling Line",
    bomType: "Standard",
    manufacturingReadiness: "Pending",
    consumption: "Strict",
    description: "Frost-free refrigerator",
    status: "Inactive",
    createdAt: "2025-08-09",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "Paused",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    product: "Bluetooth Speaker",
    productVariant: "20W / Black",
    quantity: "250",
    unitOfMeasure: "pcs",
    routing: "Audio Line",
    bomType: "Standard",
    manufacturingReadiness: "Ready",
    consumption: "Flexible",
    description: "Portable wireless speaker",
    status: "Active",
    createdAt: "2025-08-10",
    updatedAt: "2025-08-16",
    draftedAt: null,
    actionMessage: "Ready for Dispatch",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    product: "Printer",
    productVariant: "Laser / WiFi",
    quantity: "80",
    unitOfMeasure: "pcs",
    routing: "Office Equipment Line",
    bomType: "Standard",
    manufacturingReadiness: "In Progress",
    consumption: "Strict",
    description: "Wireless laser printer",
    status: "Active",
    createdAt: "2025-08-11",
    updatedAt: "2025-08-17",
    draftedAt: null,
    actionMessage: "In Queue",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    product: "Headphones",
    productVariant: "Over-Ear / Noise Canceling",
    quantity: "180",
    unitOfMeasure: "pcs",
    routing: "Audio Line",
    bomType: "Standard",
    manufacturingReadiness: "Ready",
    consumption: "Flexible",
    description: "Premium noise-canceling headphones",
    status: "Active",
    createdAt: "2025-08-12",
    updatedAt: "2025-08-18",
    draftedAt: null,
    actionMessage: "Delivered",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function ComponentLevelDataTableView({
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
  const canCreate = usePermission("billsOfMaterials", "create");

  const componentColumns = [
    {
      accessorKey: "product",
      title: "Product",
      options: [...new Set(mockTableData.map((item) => item.product))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("product").localeCompare(row2.getValue("product"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "product",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "productVariant",
      title: "Product Variant",
      options: [...new Set(mockTableData.map((item) => item.productVariant))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("productVariant")
          .localeCompare(row2.getValue("productVariant"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "productVariant",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "quantity",
      title: "Quantity",
      options: [...new Set(mockTableData.map((item) => item.quantity))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("quantity")
          .localeCompare(row2.getValue("quantity"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "quantity",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "unitOfMeasure",
      title: "Unit of Measure",
      options: [...new Set(mockTableData.map((item) => item.unitOfMeasure))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("unitOfMeasure")
          .localeCompare(row2.getValue("unitOfMeasure"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "unitOfMeasure",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "routing",
      title: "Routing",
      options: [...new Set(mockTableData.map((item) => item.routing))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("routing").localeCompare(row2.getValue("routing"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "routing",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "bomType",
      title: "BOM Type",
      options: [...new Set(mockTableData.map((item) => item.bomType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("bomType").localeCompare(row2.getValue("bomType"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "bomType",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "manufacturingReadiness",
      title: "Manufacturing Readiness",
      options: [
        ...new Set(mockTableData.map((item) => item.manufacturingReadiness)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("manufacturingReadiness")
          .localeCompare(row2.getValue("manufacturingReadiness"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "manufacturingReadiness",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "consumption",
      title: "Consumption",
      options: [...new Set(mockTableData.map((item) => item.consumption))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("consumption")
          .localeCompare(row2.getValue("consumption"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "consumption",
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
      fixedColumns={["product", "productVariant"]} // Pin leave types column
      pathName="bills-of-materials"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
