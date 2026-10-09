/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockTransitOrders = [
  {
    id: "1",
    sn: "001",
    country: "Saudi Arabia",
    company: "Al-Rashid Trading Company",
    piNo: "PI-2024-001",
    invoiceNo: "INV-2024-001",
    supplierName: "Global Suppliers Ltd",
    status: "Pending",
    date: "2024-01-15",
    loginId: "user001",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    sn: "002",
    country: "UAE",
    company: "Al-Zahrani Enterprises",
    piNo: "PI-2024-002",
    invoiceNo: "INV-2024-002",
    supplierName: "Middle East Trading Co",
    status: "Approved",
    date: "2024-01-16",
    loginId: "user002",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    sn: "003",
    country: "Kuwait",
    company: "Al-Otaibi Industries",
    piNo: "PI-2024-003",
    invoiceNo: "INV-2024-003",
    supplierName: "Gulf Suppliers International",
    status: "In Transit",
    date: "2024-01-17",
    loginId: "user003",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    sn: "004",
    country: "Qatar",
    company: "Al-Shehri Solutions",
    piNo: "PI-2024-004",
    invoiceNo: "INV-2024-004",
    supplierName: "Qatar Trading Partners",
    status: "Delivered",
    date: "2024-01-18",
    loginId: "user004",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    sn: "005",
    country: "Bahrain",
    company: "Al-Ghamdi Trading",
    piNo: "PI-2024-005",
    invoiceNo: "INV-2024-005",
    supplierName: "Bahrain Import Export",
    status: "Pending",
    date: "2024-01-19",
    loginId: "user005",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    sn: "006",
    country: "Oman",
    company: "Al-Harbi Corporation",
    piNo: "PI-2024-006",
    invoiceNo: "INV-2024-006",
    supplierName: "Oman Trading Solutions",
    status: "Approved",
    date: "2024-01-20",
    loginId: "user006",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    sn: "007",
    country: "Jordan",
    company: "Al-Maktoum Trading",
    piNo: "PI-2024-007",
    invoiceNo: "INV-2024-007",
    supplierName: "Jordan Export Company",
    status: "In Transit",
    date: "2024-01-21",
    loginId: "user007",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    sn: "008",
    country: "Lebanon",
    company: "Al-Nahyan Enterprises",
    piNo: "PI-2024-008",
    invoiceNo: "INV-2024-008",
    supplierName: "Lebanon Trading Group",
    status: "Pending",
    date: "2024-01-22",
    loginId: "user008",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    sn: "009",
    country: "Egypt",
    company: "Al-Qasimi Trading",
    piNo: "PI-2024-009",
    invoiceNo: "INV-2024-009",
    supplierName: "Egypt Import Export",
    status: "Approved",
    date: "2024-01-23",
    loginId: "user009",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    sn: "010",
    country: "Iraq",
    company: "Al-Sharqi Corporation",
    piNo: "PI-2024-010",
    invoiceNo: "INV-2024-010",
    supplierName: "Iraq Trading Partners",
    status: "In Transit",
    date: "2024-01-24",
    loginId: "user010",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    sn: "011",
    country: "Turkey",
    company: "Al-Sabah Trading",
    piNo: "PI-2024-011",
    invoiceNo: "INV-2024-011",
    supplierName: "Turkish Export Company",
    status: "Delivered",
    date: "2024-01-25",
    loginId: "user011",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    sn: "012",
    country: "Iran",
    company: "Al-Khalifa Enterprises",
    piNo: "PI-2024-012",
    invoiceNo: "INV-2024-012",
    supplierName: "Iran Trading Solutions",
    status: "Pending",
    date: "2024-01-26",
    loginId: "user012",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    sn: "013",
    country: "Pakistan",
    company: "Al-Thani Trading Company",
    piNo: "PI-2024-013",
    invoiceNo: "INV-2024-013",
    supplierName: "Pakistani Export Co",
    status: "Approved",
    date: "2024-01-27",
    loginId: "user013",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    sn: "014",
    country: "India",
    company: "Al-Said Enterprises",
    piNo: "PI-2024-014",
    invoiceNo: "INV-2024-014",
    supplierName: "Indian Trading Partners",
    status: "In Transit",
    date: "2024-01-28",
    loginId: "user014",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    sn: "015",
    country: "China",
    company: "Al-Hashemi Corporation",
    piNo: "PI-2024-015",
    invoiceNo: "INV-2024-015",
    supplierName: "Chinese Export Group",
    status: "Delivered",
    date: "2024-01-29",
    loginId: "user015",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    sn: "016",
    country: "Japan",
    company: "Aoun Trading Solutions",
    piNo: "PI-2024-016",
    invoiceNo: "INV-2024-016",
    supplierName: "Japanese Trading Solutions",
    status: "Pending",
    date: "2024-01-30",
    loginId: "user016",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    sn: "017",
    country: "South Korea",
    company: "El-Sisi Enterprises",
    piNo: "PI-2024-017",
    invoiceNo: "INV-2024-017",
    supplierName: "Korean Export Company",
    status: "Approved",
    date: "2024-01-31",
    loginId: "user017",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    sn: "018",
    country: "Singapore",
    company: "Al-Kadhimi Trading",
    piNo: "PI-2024-018",
    invoiceNo: "INV-2024-018",
    supplierName: "Singapore Trading Partners",
    status: "In Transit",
    date: "2024-02-01",
    loginId: "user018",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    sn: "019",
    country: "Malaysia",
    company: "Erdogan Trading",
    piNo: "PI-2024-019",
    invoiceNo: "INV-2024-019",
    supplierName: "Malaysian Export Co",
    status: "Delivered",
    date: "2024-02-02",
    loginId: "user019",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    sn: "020",
    country: "Thailand",
    company: "Mitsotakis Enterprises",
    piNo: "PI-2024-020",
    invoiceNo: "INV-2024-020",
    supplierName: "Thai Trading Solutions",
    status: "Pending",
    date: "2024-02-03",
    loginId: "user020",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function TransitOrderDataTable({
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
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("transitOrder", "create");

  const componentColumns = [
    {
      accessorKey: "sn",
      title: "SN",
      options: [...new Set(mockTransitOrders.map((item) => item.sn))],
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
      accessorKey: "country",
      title: "Country",
      options: [...new Set(mockTransitOrders.map((item) => item.country))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "country",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "company",
      title: "Company",
      options: [...new Set(mockTransitOrders.map((item) => item.company))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("company").localeCompare(row2.getValue("company"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "company",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "piNo",
      title: "P.I.No",
      options: [...new Set(mockTransitOrders.map((item) => item.piNo))],
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
      minSize: 120,
      meta: {
        exportLabel: "piNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "invoiceNo",
      title: "Invoice No",
      options: [...new Set(mockTransitOrders.map((item) => item.invoiceNo))],
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
      minSize: 120,
      meta: {
        exportLabel: "invoiceNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "supplierName",
      title: "Supplier Name",
      options: [...new Set(mockTransitOrders.map((item) => item.supplierName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("supplierName")
          .localeCompare(row2.getValue("supplierName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "supplierName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockTransitOrders.map((item) => item.status))],
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
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockTransitOrders.map((item) => item.date))],
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
      accessorKey: "loginId",
      title: "Login ID",
      options: [...new Set(mockTransitOrders.map((item) => item.loginId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("loginId").localeCompare(row2.getValue("loginId"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "loginId",
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockTransitOrders.filter((transitOrder) => {
    if (dataTableFilter.status === "Active") {
      return transitOrder.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !transitOrder.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return transitOrder.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return transitOrder.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return transitOrder.isUpdated;
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
      pathName="transit-order"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
