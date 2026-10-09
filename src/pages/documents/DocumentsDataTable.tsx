/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TableDataType = {
  id: string;

  documentNo: string;
  piNo: string;
  invoiceNo: string;
  orderBy: string;
  shipmentType: string;
  documentDate: string;
  piDate: string;
  invoiceDate: string;
  mobileNo: string;

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

const mockTableData: TableDataType[] = [
  {
    id: "1",
    documentNo: "DOC-1001",
    piNo: "PI-2001",
    invoiceNo: "INV-3001",
    orderBy: "Rahim Traders",
    shipmentType: "Air",
    documentDate: "2025-01-05",
    piDate: "2025-01-03",
    invoiceDate: "2025-01-06",
    mobileNo: "01711111111",
    status: "Active",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-06",
    draftedAt: null,
    actionMessage: "Document created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    documentNo: "DOC-1002",
    piNo: "PI-2002",
    invoiceNo: "INV-3002",
    orderBy: "Karim & Co.",
    shipmentType: "Sea",
    documentDate: "2025-01-10",
    piDate: "2025-01-07",
    invoiceDate: "2025-01-11",
    mobileNo: "01822222222",
    status: "Active",
    createdAt: "2025-01-07",
    updatedAt: "2025-01-11",
    draftedAt: null,
    actionMessage: "Invoice approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    documentNo: "DOC-1003",
    piNo: "PI-2003",
    invoiceNo: "INV-3003",
    orderBy: "Delta Supplies",
    shipmentType: "Courier",
    documentDate: "2025-01-15",
    piDate: "2025-01-13",
    invoiceDate: "2025-01-16",
    mobileNo: "01633333333",
    status: "Draft",
    createdAt: "2025-01-13",
    updatedAt: "2025-01-16",
    draftedAt: "2025-01-14",
    actionMessage: "Saved as draft",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    documentNo: "DOC-1004",
    piNo: "PI-2004",
    invoiceNo: "INV-3004",
    orderBy: "Green Line Export",
    shipmentType: "Air",
    documentDate: "2025-01-18",
    piDate: "2025-01-16",
    invoiceDate: "2025-01-19",
    mobileNo: "01544444444",
    status: "Active",
    createdAt: "2025-01-16",
    updatedAt: "2025-01-19",
    draftedAt: null,
    actionMessage: "Shipment confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    documentNo: "DOC-1005",
    piNo: "PI-2005",
    invoiceNo: "INV-3005",
    orderBy: "Shahjalal Imports",
    shipmentType: "Sea",
    documentDate: "2025-01-22",
    piDate: "2025-01-20",
    invoiceDate: "2025-01-23",
    mobileNo: "01355555555",
    status: "Deleted",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-23",
    draftedAt: null,
    actionMessage: "Document deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    documentNo: "DOC-1006",
    piNo: "PI-2006",
    invoiceNo: "INV-3006",
    orderBy: "Metro Distributors",
    shipmentType: "Courier",
    documentDate: "2025-01-25",
    piDate: "2025-01-22",
    invoiceDate: "2025-01-26",
    mobileNo: "01766666666",
    status: "Active",
    createdAt: "2025-01-22",
    updatedAt: "2025-01-26",
    draftedAt: null,
    actionMessage: "Invoice finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    documentNo: "DOC-1007",
    piNo: "PI-2007",
    invoiceNo: "INV-3007",
    orderBy: "Alpha Traders",
    shipmentType: "Air",
    documentDate: "2025-02-01",
    piDate: "2025-01-29",
    invoiceDate: "2025-02-02",
    mobileNo: "01977777777",
    status: "Active",
    createdAt: "2025-01-29",
    updatedAt: "2025-02-02",
    draftedAt: null,
    actionMessage: "Air shipment booked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    documentNo: "DOC-1008",
    piNo: "PI-2008",
    invoiceNo: "INV-3008",
    orderBy: "Prime Logistics",
    shipmentType: "Sea",
    documentDate: "2025-02-05",
    piDate: "2025-02-03",
    invoiceDate: "2025-02-06",
    mobileNo: "01488888888",
    status: "Draft",
    createdAt: "2025-02-03",
    updatedAt: "2025-02-06",
    draftedAt: "2025-02-04",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    documentNo: "DOC-1009",
    piNo: "PI-2009",
    invoiceNo: "INV-3009",
    orderBy: "City Mart",
    shipmentType: "Courier",
    documentDate: "2025-02-08",
    piDate: "2025-02-06",
    invoiceDate: "2025-02-09",
    mobileNo: "01899999999",
    status: "Active",
    createdAt: "2025-02-06",
    updatedAt: "2025-02-09",
    draftedAt: null,
    actionMessage: "Courier dispatched",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    documentNo: "DOC-1010",
    piNo: "PI-2010",
    invoiceNo: "INV-3010",
    orderBy: "Skyline Enterprises",
    shipmentType: "Air",
    documentDate: "2025-02-12",
    piDate: "2025-02-10",
    invoiceDate: "2025-02-13",
    mobileNo: "01710101010",
    status: "Active",
    createdAt: "2025-02-10",
    updatedAt: "2025-02-13",
    draftedAt: null,
    actionMessage: "Invoice sent to client",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    documentNo: "DOC-1011",
    piNo: "PI-2011",
    invoiceNo: "INV-3011",
    orderBy: "Global Exporters",
    shipmentType: "Sea",
    documentDate: "2025-02-15",
    piDate: "2025-02-13",
    invoiceDate: "2025-02-16",
    mobileNo: "01611112222",
    status: "Active",
    createdAt: "2025-02-13",
    updatedAt: "2025-02-16",
    draftedAt: null,
    actionMessage: "Shipping finalized",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    documentNo: "DOC-1012",
    piNo: "PI-2012",
    invoiceNo: "INV-3012",
    orderBy: "NextGen Supplies",
    shipmentType: "Courier",
    documentDate: "2025-02-18",
    piDate: "2025-02-16",
    invoiceDate: "2025-02-19",
    mobileNo: "01912121212",
    status: "Draft",
    createdAt: "2025-02-16",
    updatedAt: "2025-02-19",
    draftedAt: "2025-02-17",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function DocumentsDataTable({
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
  const canCreate = usePermission("documents", "create");

  const componentColumns = [
    {
      accessorKey: "documentNo",
      title: "Document No",
      options: [...new Set(mockTableData.map((item) => item.documentNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("documentNo")
          .localeCompare(row2.getValue("documentNo"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "documentNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "piNo",
      title: "PI No",
      options: [...new Set(mockTableData.map((item) => item.piNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("piNo").localeCompare(row2.getValue("piNo"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "piNo",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "invoiceNo",
      title: "Invoice No",
      options: [...new Set(mockTableData.map((item) => item.invoiceNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("invoiceNo")
          .localeCompare(row2.getValue("invoiceNo"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "invoiceNo",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "orderBy",
      title: "Order By",
      options: [...new Set(mockTableData.map((item) => item.orderBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("orderBy").localeCompare(row2.getValue("orderBy"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "orderBy",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "shipmentType",
      title: "Shipment Type",
      options: [...new Set(mockTableData.map((item) => item.shipmentType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shipmentType")
          .localeCompare(row2.getValue("shipmentType"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "shipmentType",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "documentDate",
      title: "Document Date",
      options: [...new Set(mockTableData.map((item) => item.documentDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("documentDate")
          .localeCompare(row2.getValue("documentDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "documentDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "piDate",
      title: "PI Date",
      options: [...new Set(mockTableData.map((item) => item.piDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("piDate").localeCompare(row2.getValue("piDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "piDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "invoiceDate",
      title: "Invoice Date",
      options: [...new Set(mockTableData.map((item) => item.invoiceDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("invoiceDate")
          .localeCompare(row2.getValue("invoiceDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "invoiceDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "mobileNo",
      title: "Mobile No",
      options: [...new Set(mockTableData.map((item) => item.mobileNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("mobileNo")
          .localeCompare(row2.getValue("mobileNo"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "mobileNo",
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
      fixedColumns={["documentNo", "piNo"]} // Pin leave types column
      pathName="documents"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
