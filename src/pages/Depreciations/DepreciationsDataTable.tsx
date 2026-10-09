/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  assetName: string;
  image: string;
  serialNumber: string;
  deprecationName: string;
  numberOfMonths: string;
  checkout: string;
  purchaseDate: string;
  eol: string;
  cost: string;
  maintenance: string;
  currentValue: string;
  monthlyDepreciation: string;
  remaining: string;

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
    assetName: "Laptop Dell XPS 13",
    image: "https://via.placeholder.com/150",
    serialNumber: "DLXPS123456",
    deprecationName: "Electronics",
    numberOfMonths: "24",
    checkout: "No",
    purchaseDate: "2023-01-10",
    eol: "2025-01-10",
    cost: "1200",
    maintenance: "50",
    currentValue: "1000",
    monthlyDepreciation: "50",
    remaining: "12",
    status: "Active",
    createdAt: "2023-01-10",
    updatedAt: "2023-08-01",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    assetName: "Office Chair Ergonomic",
    image: "https://via.placeholder.com/150",
    serialNumber: "OC123456",
    deprecationName: "Furniture",
    numberOfMonths: "36",
    checkout: "No",
    purchaseDate: "2022-06-15",
    eol: "2025-06-15",
    cost: "250",
    maintenance: "20",
    currentValue: "200",
    monthlyDepreciation: "8",
    remaining: "18",
    status: "Active",
    createdAt: "2022-06-15",
    updatedAt: "2023-07-20",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    assetName: "Projector Epson",
    image: "https://via.placeholder.com/150",
    serialNumber: "EP123789",
    deprecationName: "Electronics",
    numberOfMonths: "48",
    checkout: "Yes",
    purchaseDate: "2021-03-01",
    eol: "2025-03-01",
    cost: "800",
    maintenance: "30",
    currentValue: "500",
    monthlyDepreciation: "12",
    remaining: "24",
    status: "Active",
    createdAt: "2021-03-01",
    updatedAt: "2023-08-05",
    draftedAt: null,
    actionMessage: "Under Maintenance",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    assetName: "iPhone 14 Pro",
    image: "https://via.placeholder.com/150",
    serialNumber: "IP14PRO567",
    deprecationName: "Electronics",
    numberOfMonths: "24",
    checkout: "No",
    purchaseDate: "2023-05-12",
    eol: "2025-05-12",
    cost: "1000",
    maintenance: "0",
    currentValue: "950",
    monthlyDepreciation: "20",
    remaining: "18",
    status: "Active",
    createdAt: "2023-05-12",
    updatedAt: "2023-08-10",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    assetName: "Office Desk",
    image: "https://via.placeholder.com/150",
    serialNumber: "OD987654",
    deprecationName: "Furniture",
    numberOfMonths: "60",
    checkout: "No",
    purchaseDate: "2020-02-20",
    eol: "2025-02-20",
    cost: "500",
    maintenance: "30",
    currentValue: "200",
    monthlyDepreciation: "5",
    remaining: "6",
    status: "Active",
    createdAt: "2020-02-20",
    updatedAt: "2023-07-25",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    assetName: "Printer HP LaserJet",
    image: "https://via.placeholder.com/150",
    serialNumber: "HP123456",
    deprecationName: "Electronics",
    numberOfMonths: "36",
    checkout: "Yes",
    purchaseDate: "2021-09-05",
    eol: "2024-09-05",
    cost: "300",
    maintenance: "25",
    currentValue: "150",
    monthlyDepreciation: "10",
    remaining: "12",
    status: "Active",
    createdAt: "2021-09-05",
    updatedAt: "2023-08-01",
    draftedAt: null,
    actionMessage: "Under Maintenance",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    assetName: "Server Rack",
    image: "https://via.placeholder.com/150",
    serialNumber: "SR123321",
    deprecationName: "IT Equipment",
    numberOfMonths: "60",
    checkout: "No",
    purchaseDate: "2019-11-10",
    eol: "2024-11-10",
    cost: "2000",
    maintenance: "100",
    currentValue: "1000",
    monthlyDepreciation: "20",
    remaining: "12",
    status: "Active",
    createdAt: "2019-11-10",
    updatedAt: "2023-08-10",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    assetName: 'MacBook Pro 16"',
    image: "https://via.placeholder.com/150",
    serialNumber: "MBP16X123",
    deprecationName: "Electronics",
    numberOfMonths: "36",
    checkout: "No",
    purchaseDate: "2022-01-15",
    eol: "2025-01-15",
    cost: "2500",
    maintenance: "0",
    currentValue: "2200",
    monthlyDepreciation: "100",
    remaining: "24",
    status: "Active",
    createdAt: "2022-01-15",
    updatedAt: "2023-08-12",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    assetName: "Conference Table",
    image: "https://via.placeholder.com/150",
    serialNumber: "CT456789",
    deprecationName: "Furniture",
    numberOfMonths: "60",
    checkout: "No",
    purchaseDate: "2020-07-20",
    eol: "2025-07-20",
    cost: "800",
    maintenance: "50",
    currentValue: "400",
    monthlyDepreciation: "8",
    remaining: "12",
    status: "Active",
    createdAt: "2020-07-20",
    updatedAt: "2023-08-05",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "10",
    assetName: "iPad Air",
    image: "https://via.placeholder.com/150",
    serialNumber: "IPAD12345",
    deprecationName: "Electronics",
    numberOfMonths: "24",
    checkout: "Yes",
    purchaseDate: "2023-03-01",
    eol: "2025-03-01",
    cost: "600",
    maintenance: "0",
    currentValue: "550",
    monthlyDepreciation: "25",
    remaining: "20",
    status: "Active",
    createdAt: "2023-03-01",
    updatedAt: "2023-08-10",
    draftedAt: null,
    actionMessage: "Under Maintenance",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    assetName: "Router Cisco",
    image: "https://via.placeholder.com/150",
    serialNumber: "CS123987",
    deprecationName: "IT Equipment",
    numberOfMonths: "48",
    checkout: "No",
    purchaseDate: "2021-06-15",
    eol: "2025-06-15",
    cost: "400",
    maintenance: "20",
    currentValue: "250",
    monthlyDepreciation: "10",
    remaining: "18",
    status: "Active",
    createdAt: "2021-06-15",
    updatedAt: "2023-08-01",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    assetName: "Whiteboard",
    image: "https://via.placeholder.com/150",
    serialNumber: "WB654321",
    deprecationName: "Office Supplies",
    numberOfMonths: "60",
    checkout: "No",
    purchaseDate: "2019-10-10",
    eol: "2024-10-10",
    cost: "150",
    maintenance: "10",
    currentValue: "50",
    monthlyDepreciation: "2",
    remaining: "6",
    status: "Active",
    createdAt: "2019-10-10",
    updatedAt: "2023-07-25",
    draftedAt: null,
    actionMessage: "Checked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function DepreciationsDataTable({
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
  const canCreate = usePermission("depreciations", "create");

  const componentColumns = [
    {
      accessorKey: "assetName",
      title: "Asset Name",
      options: [...new Set(mockTableData.map((item) => item.assetName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("assetName")
          .localeCompare(row2.getValue("assetName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "assetName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "serialNumber",
      title: "Serial Number",
      options: [...new Set(mockTableData.map((item) => item.serialNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("serialNumber")
          .localeCompare(row2.getValue("serialNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "serialNumber",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "deprecationName",
      title: "Depreciation Name",
      options: [...new Set(mockTableData.map((item) => item.deprecationName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deprecationName")
          .localeCompare(row2.getValue("deprecationName"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "deprecationName",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "numberOfMonths",
      title: "Number of Months",
      options: [...new Set(mockTableData.map((item) => item.numberOfMonths))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("numberOfMonths")
          .localeCompare(row2.getValue("numberOfMonths"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "numberOfMonths",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "checkout",
      title: "Checkout",
      options: [...new Set(mockTableData.map((item) => item.checkout))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("checkout")
          .localeCompare(row2.getValue("checkout"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "checkout",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "purchaseDate",
      title: "Purchase Date",
      options: [...new Set(mockTableData.map((item) => item.purchaseDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("purchaseDate")
          .localeCompare(row2.getValue("purchaseDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "purchaseDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "eol",
      title: "EOL",
      options: [...new Set(mockTableData.map((item) => item.eol))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("eol").localeCompare(row2.getValue("eol"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "eol",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "cost",
      title: "Cost",
      options: [...new Set(mockTableData.map((item) => item.cost))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("cost").localeCompare(row2.getValue("cost"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "cost",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "maintenance",
      title: "Maintenance",
      options: [...new Set(mockTableData.map((item) => item.maintenance))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("maintenance")
          .localeCompare(row2.getValue("maintenance"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "maintenance",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "currentValue",
      title: "CurrentValue",
      options: [...new Set(mockTableData.map((item) => item.currentValue))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currentValue")
          .localeCompare(row2.getValue("currentValue"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "currentValue",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "monthlyDepreciation",
      title: "Monthly Depreciation",
      options: [
        ...new Set(mockTableData.map((item) => item.monthlyDepreciation)),
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
          .getValue("monthlyDepreciation")
          .localeCompare(row2.getValue("monthlyDepreciation"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "monthlyDepreciation",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "remaining",
      title: "Remaining",
      options: [...new Set(mockTableData.map((item) => item.remaining))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("remaining")
          .localeCompare(row2.getValue("remaining"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "remaining",
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
      fixedColumns={["tenants", "propertyCode"]} // Pin leave types column
      pathName="tenant"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
