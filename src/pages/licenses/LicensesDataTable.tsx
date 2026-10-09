/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const licensesData = [
  {
    id: "1",
    sn: "001",
    softwareName: "Microsoft Office 365",
    category: "Productivity",
    productKey: "XXXX-XXXX-XXXX-XXXX",
    seats: 50,
    manufacturer: "Microsoft Corporation",
    licensedName: "Tech Solutions Inc",
    licensedEmail: "admin@techsolutions.com",
    supplier: "Microsoft Store",
    orderNumber: "ORD-2024-001",
    purchaseOrderNumber: "PO-2024-001",
    purchaseCost: 2500.0,
    purchaseDate: "2024-01-15",
    expirationDate: "2025-01-15",
    terminationDate: null,
    depreciation: "25%",
    notes: "Annual subscription for office productivity suite",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    sn: "002",
    softwareName: "Adobe Creative Suite",
    category: "Design",
    productKey: "YYYY-YYYY-YYYY-YYYY",
    seats: 25,
    manufacturer: "Adobe Inc",
    licensedName: "Creative Design Studio",
    licensedEmail: "licenses@creativedesign.com",
    supplier: "Adobe Store",
    orderNumber: "ORD-2024-002",
    purchaseOrderNumber: "PO-2024-002",
    purchaseCost: 1800.0,
    purchaseDate: "2024-01-16",
    expirationDate: "2025-01-16",
    terminationDate: null,
    depreciation: "20%",
    notes: "Creative design software for design team",
    status: "Active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    sn: "003",
    softwareName: "AutoCAD Professional",
    category: "Engineering",
    productKey: "ZZZZ-ZZZZ-ZZZZ-ZZZZ",
    seats: 15,
    manufacturer: "Autodesk Inc",
    licensedName: "Engineering Corp",
    licensedEmail: "licenses@engineeringcorp.com",
    supplier: "Autodesk Store",
    orderNumber: "ORD-2024-003",
    purchaseOrderNumber: "PO-2024-003",
    purchaseCost: 3200.0,
    purchaseDate: "2024-01-17",
    expirationDate: "2025-01-17",
    terminationDate: null,
    depreciation: "30%",
    notes: "CAD software for engineering team",
    status: "Active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    sn: "004",
    softwareName: "QuickBooks Enterprise",
    category: "Accounting",
    productKey: "AAAA-AAAA-AAAA-AAAA",
    seats: 10,
    manufacturer: "Intuit Inc",
    licensedName: "Finance Corp",
    licensedEmail: "licenses@financecorp.com",
    supplier: "Intuit Store",
    orderNumber: "ORD-2024-004",
    purchaseOrderNumber: "PO-2024-004",
    purchaseCost: 1500.0,
    purchaseDate: "2024-01-18",
    expirationDate: "2025-01-18",
    terminationDate: null,
    depreciation: "15%",
    notes: "Accounting software for finance team",
    status: "Inactive",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    sn: "005",
    softwareName: "VMware Workstation Pro",
    category: "Virtualization",
    productKey: "BBBB-BBBB-BBBB-BBBB",
    seats: 20,
    manufacturer: "VMware Inc",
    licensedName: "IT Solutions",
    licensedEmail: "licenses@itsolutions.com",
    supplier: "VMware Store",
    orderNumber: "ORD-2024-005",
    purchaseOrderNumber: "PO-2024-005",
    purchaseCost: 1200.0,
    purchaseDate: "2024-01-19",
    expirationDate: "2025-01-19",
    terminationDate: null,
    depreciation: "18%",
    notes: "Virtualization software for development team",
    status: "Active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function LicensesDataTable({
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
  const canCreate = usePermission("licenses", "create");

  const componentColumns = [
    {
      accessorKey: "sn",
      title: "SN",
      options: [...new Set(licensesData.map((item) => item.sn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("sn").localeCompare(row2.getValue("sn"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "sn",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "softwareName",
      title: "Software Name",
      options: [...new Set(licensesData.map((item) => item.softwareName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("softwareName")
          .localeCompare(row2.getValue("softwareName"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "softwareName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "category",
      title: "Category",
      options: [...new Set(licensesData.map((item) => item.category))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("category")
          .localeCompare(row2.getValue("category"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "category",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "manufacturer",
      title: "Manufacturer",
      options: [...new Set(licensesData.map((item) => item.manufacturer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("manufacturer")
          .localeCompare(row2.getValue("manufacturer"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "manufacturer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "seats",
      title: "Seats",
      options: [...new Set(licensesData.map((item) => item.seats))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("seats") - row2.getValue("seats");
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "seats",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "expirationDate",
      title: "Expiration Date",
      options: [...new Set(licensesData.map((item) => item.expirationDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("expirationDate")
          .localeCompare(row2.getValue("expirationDate"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "expirationDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(licensesData.map((item) => item.status))],
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

  const filteredData = licensesData.filter((license) => {
    if (dataTableFilter.status === "Active") {
      return license.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !license.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return license.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return license.isUpdated;
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
      fixedColumns={["sn"]} // Pin SN column
      pathName="licenses"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
