/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// update

const mockData = [
  {
    id: 1,
    SN: "001",
    country: "Bangladesh",
    company: "Dhaka Freight Movers",
    piNo: "PI-1001",
    invoiceNo: "INV-5001",
    SupplierName: "Kamal Hossain",
    date: "2023-03-12",
    loginId: "kamal.hossain",
    action: "Pending approval",
    status: "active",
    createdAt: "2023-03-12",
    updatedAt: "2023-09-25",
    draftedAt: "2023-03-08",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 2,
    SN: "002",
    country: "Bangladesh",
    company: "Chittagong Port Logistics",
    piNo: "PI-1002",
    invoiceNo: "INV-5002",
    SupplierName: "Nurul Islam",
    date: "2023-04-05",
    loginId: "nurul.islam",
    action: "Ongoing shipment",
    status: "inactive",
    createdAt: "2023-04-05",
    updatedAt: "2023-09-12",
    draftedAt: "2023-04-01",
    actionMessage: "4h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: 3,
    SN: "003",
    country: "Bangladesh",
    company: "Sylhet Parcel Express",
    piNo: "PI-1003",
    invoiceNo: "INV-5003",
    SupplierName: "Tanvir Chowdhury",
    date: "2023-05-22",
    loginId: "tanvir.chowdhury",
    action: "Service paused",
    status: "draft",
    createdAt: "2023-05-22",
    updatedAt: "2023-09-10",
    draftedAt: "2023-05-18",
    actionMessage: "Pending",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 4,
    SN: "004",
    country: "Bangladesh",
    company: "Rajshahi Transport Co.",
    piNo: "PI-1004",
    invoiceNo: "INV-5004",
    SupplierName: "Jahangir Alam",
    date: "2023-06-18",
    loginId: "jahangir.alam",
    action: "Live tracking enabled",
    status: "active",
    createdAt: "2023-06-18",
    updatedAt: "2023-09-02",
    draftedAt: "2023-06-12",
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 5,
    SN: "005",
    country: "Bangladesh",
    company: "Khulna Cargo Movers",
    piNo: "PI-1005",
    invoiceNo: "INV-5005",
    SupplierName: "Shafiqul Bari",
    date: "2023-07-14",
    loginId: "shafiqul.bari",
    action: "Awaiting documents",
    status: "inactive",
    createdAt: "2023-07-14",
    updatedAt: "2023-08-25",
    draftedAt: "2023-07-10",
    actionMessage: "Pending",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 6,
    SN: "006",
    country: "Bangladesh",
    company: "Barisal River Transport",
    piNo: "PI-1006",
    invoiceNo: "INV-5006",
    SupplierName: "Mokbul Hossain",
    date: "2023-08-03",
    loginId: "mokbul.hossain",
    action: "Pending approval",
    status: "draft",
    createdAt: "2023-08-03",
    updatedAt: "2023-08-20",
    draftedAt: "2023-08-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 7,
    SN: "007",
    country: "Bangladesh",
    company: "Mymensingh Logistics Ltd.",
    piNo: "PI-1007",
    invoiceNo: "INV-5007",
    SupplierName: "Rashed Karim",
    date: "2023-09-09",
    loginId: "rashed.karim",
    action: "Running delivery",
    status: "active",
    createdAt: "2023-09-09",
    updatedAt: "2023-09-19",
    draftedAt: "2023-09-05",
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 8,
    SN: "008",
    country: "Bangladesh",
    company: "Gazipur Industrial Transport",
    piNo: "PI-1008",
    invoiceNo: "INV-5008",
    SupplierName: "Mahbub Alam",
    date: "2023-10-12",
    loginId: "mahbub.alam",
    action: "Temporarily closed",
    status: "inactive",
    createdAt: "2023-10-12",
    updatedAt: "2023-10-28",
    draftedAt: "2023-10-08",
    actionMessage: "Pending",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 9,
    SN: "009",
    country: "Bangladesh",
    company: "Rangpur Parcel Line",
    piNo: "PI-1009",
    invoiceNo: "INV-5009",
    SupplierName: "Habibur Rahman",
    date: "2023-11-05",
    loginId: "habibur.rahman",
    action: "Draft entry",
    status: "draft",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-15",
    draftedAt: "2023-11-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 10,
    SN: "010",
    country: "Bangladesh",
    company: "Comilla Transport Agency",
    piNo: "PI-1010",
    invoiceNo: "INV-5010",
    SupplierName: "Abdur Rahim",
    date: "2023-12-01",
    loginId: "abdur.rahim",
    action: "On schedule",
    status: "active",
    createdAt: "2023-12-01",
    updatedAt: "2023-12-18",
    draftedAt: "2023-11-28",
    actionMessage: "Approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function PendingOrderDataTable2({
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
      accessorKey: "company",
      title: "company",
      options: [...new Set(mockData.map((item) => item.company))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "company",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "piNo",
      title: "piNo",
      options: [...new Set(mockData.map((item) => item.piNo))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "piNo",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "invoiceNo",
      title: "invoiceNo",
      options: [...new Set(mockData.map((item) => item.invoiceNo))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "invoiceNo",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "SupplierName",
      title: "SupplierName",
      options: [...new Set(mockData.map((item) => item.SupplierName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("SupplierName")
          .localeCompare(row2.getValue("SupplierName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "SupplierName",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "country",
      title: "country",
      options: [...new Set(mockData.map((item) => item.country))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "country",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "status",
      title: "status",
      options: [...new Set(mockData.map((item) => item.status))],
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
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockData.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) => cellValue === filterVal);
      },
    },
  ];

  const filteredData = mockData.filter((item) => {
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
      fixedColumns={["supplierName", "status"]} // Pin name column
      pathName="pending-order"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
