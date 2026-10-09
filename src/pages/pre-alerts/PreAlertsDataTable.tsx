/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const preAlertsData = [
  {
    id: "1",
    tracking: "TRK-2024-001",
    date: "2024-01-15",
    customer: "Tech Solutions Inc",
    shippingCompany: "FedEx Express",
    supplier: "Microsoft Store",
    packageDescription: "Microsoft Office 365 License Keys",
    deliveryDate: "2024-01-20",
    purchasePrice: 2500.0,
    status: "In Transit",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    tracking: "TRK-2024-002",
    date: "2024-01-16",
    customer: "Creative Design Studio",
    shippingCompany: "UPS Ground",
    supplier: "Adobe Store",
    packageDescription: "Adobe Creative Suite Licenses",
    deliveryDate: "2024-01-22",
    purchasePrice: 1800.0,
    status: "Delivered",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-22",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    tracking: "TRK-2024-003",
    date: "2024-01-17",
    customer: "Engineering Corp",
    shippingCompany: "DHL Express",
    supplier: "Autodesk Store",
    packageDescription: "AutoCAD Professional Licenses",
    deliveryDate: "2024-01-25",
    purchasePrice: 3200.0,
    status: "In Transit",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-25",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    tracking: "TRK-2024-004",
    date: "2024-01-18",
    customer: "Finance Corp",
    shippingCompany: "USPS Priority",
    supplier: "Intuit Store",
    packageDescription: "QuickBooks Enterprise Licenses",
    deliveryDate: "2024-01-23",
    purchasePrice: 1500.0,
    status: "Delivered",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    tracking: "TRK-2024-005",
    date: "2024-01-19",
    customer: "IT Solutions",
    shippingCompany: "FedEx Ground",
    supplier: "VMware Store",
    packageDescription: "VMware Workstation Pro Licenses",
    deliveryDate: "2024-01-26",
    purchasePrice: 1200.0,
    status: "Pending",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-26",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function PreAlertsDataTable({
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
  const canCreate = usePermission("preAlerts", "create");

  const componentColumns = [
    {
      accessorKey: "tracking",
      title: "Tracking",
      options: [...new Set(preAlertsData.map((item) => item.tracking))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("tracking")
          .localeCompare(row2.getValue("tracking"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "tracking",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(preAlertsData.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(preAlertsData.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "shippingCompany",
      title: "Shipping Company",
      options: [...new Set(preAlertsData.map((item) => item.shippingCompany))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shippingCompany")
          .localeCompare(row2.getValue("shippingCompany"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "shippingCompany",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "supplier",
      title: "Supplier",
      options: [...new Set(preAlertsData.map((item) => item.supplier))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplier")
          .localeCompare(row2.getValue("supplier"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "supplier",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "packageDescription",
      title: "Package Description",
      options: [
        ...new Set(preAlertsData.map((item) => item.packageDescription)),
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
          .getValue("packageDescription")
          .localeCompare(row2.getValue("packageDescription"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "packageDescription",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "deliveryDate",
      title: "Delivery Date",
      options: [...new Set(preAlertsData.map((item) => item.deliveryDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deliveryDate")
          .localeCompare(row2.getValue("deliveryDate"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "deliveryDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "purchasePrice",
      title: "Purchase Price",
      options: [...new Set(preAlertsData.map((item) => item.purchasePrice))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("purchasePrice") - row2.getValue("purchasePrice");
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "purchasePrice",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(preAlertsData.map((item) => item.status))],
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
      size: 120,
      minSize: 100,
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

  const filteredData = preAlertsData.filter((preAlert) => {
    if (dataTableFilter.status === "Active") {
      return preAlert.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !preAlert.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return preAlert.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return preAlert.isUpdated;
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
      fixedColumns={["tracking"]} // Pin Tracking column
      pathName="pre-alerts"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
