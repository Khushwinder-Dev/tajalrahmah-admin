/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const workOrdersData = [
  {
    id: "1",
    workOrder: "WO-001",
    startDate: "2024-01-15",
    workCenter: "Production Line A",
    manufacturingOrder: "MO-2024-001",
    productQuantity: 100,
    unit: "Pieces",
    status: "In Progress",
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    workOrder: "WO-002",
    startDate: "2024-01-16",
    workCenter: "Assembly Line B",
    manufacturingOrder: "MO-2024-002",
    productQuantity: 50,
    unit: "Units",
    status: "Completed",
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-22",
  },
  {
    id: "3",
    workOrder: "WO-003",
    startDate: "2024-01-17",
    workCenter: "Packaging Line C",
    manufacturingOrder: "MO-2024-003",
    productQuantity: 200,
    unit: "Boxes",
    status: "Pending",
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-25",
  },
  {
    id: "4",
    workOrder: "WO-004",
    startDate: "2024-01-18",
    workCenter: "Quality Control D",
    manufacturingOrder: "MO-2024-004",
    productQuantity: 75,
    unit: "Sets",
    status: "On Hold",
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
  },
  {
    id: "5",
    workOrder: "WO-005",
    startDate: "2024-01-19",
    workCenter: "Testing Lab E",
    manufacturingOrder: "MO-2024-005",
    productQuantity: 25,
    unit: "Samples",
    status: "In Progress",
    isDeleted: false,
    isUpdated: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-26",
  },
];

export default function WorkOrdersDataTable({
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
  setShowFilter: (setShowFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (setShowVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("workOrders", "create");

  const componentColumns = [
    {
      accessorKey: "workOrder",
      title: "Work Order",
      options: [...new Set(workOrdersData.map((item) => item.workOrder))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("workOrder")
          .localeCompare(row2.getValue("workOrder"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "workOrder",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "startDate",
      title: "Start Date",
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
          new Date(row1.getValue("startDate")).getTime() -
          new Date(row2.getValue("startDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "startDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "workCenter",
      title: "Work Center",
      options: [...new Set(workOrdersData.map((item) => item.workCenter))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("workCenter")
          .localeCompare(row2.getValue("workCenter"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "workCenter",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "manufacturingOrder",
      title: "Manufacturing Order",
      options: [
        ...new Set(workOrdersData.map((item) => item.manufacturingOrder)),
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
          .getValue("manufacturingOrder")
          .localeCompare(row2.getValue("manufacturingOrder"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "manufacturingOrder",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "productQuantity",
      title: "Product Quantity",
      options: [
        ...new Set(
          workOrdersData.map((item) => item.productQuantity.toString())
        ),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue.toString());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("productQuantity") - row2.getValue("productQuantity")
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "productQuantity",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "unit",
      title: "Unit",
      options: [...new Set(workOrdersData.map((item) => item.unit))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("unit").localeCompare(row2.getValue("unit"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "unit",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(workOrdersData.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 150,
      minSize: 120,
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
      size: 150,
      minSize: 120,
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = workOrdersData.filter((workOrder) => {
    if (dataTableFilter.status === "Active") {
      return !workOrder.isDeleted;
    } else if (dataTableFilter.status === "Inactive") {
      return workOrder.isDeleted;
    } else if (dataTableFilter.status === "Deleted") {
      return workOrder.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return workOrder.isUpdated;
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
      fixedColumns={["workOrder"]} // Pin Work Order column
      pathName="work-orders"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
