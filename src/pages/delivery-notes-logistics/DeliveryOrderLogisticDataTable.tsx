/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockDeliveryOrderLogistics = [
  {
    id: "1",
    sn: "DOL001",
    country: "Saudi Arabia",
    company: "Al-Rashid Trading Company",
    piNo: "PI-2024-001",
    invoiceNo: "INV-2024-001",
    supplierName: "Global Supplies Ltd",
    status: "Active",
    dateLoginId: "2024-01-15",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    sn: "DOL002",
    country: "UAE",
    company: "Al-Zahrani Enterprises",
    piNo: "PI-2024-002",
    invoiceNo: "INV-2024-002",
    supplierName: "Emirates Trading Co",
    status: "Delivered",
    dateLoginId: "2024-01-16",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
  },
  {
    id: "3",
    sn: "DOL003",
    country: "Kuwait",
    company: "Al-Otaibi Industries",
    piNo: "PI-2024-003",
    invoiceNo: "INV-2024-003",
    supplierName: "Kuwait Supply Chain",
    status: "In Transit",
    dateLoginId: "2024-01-17",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
  },
  {
    id: "4",
    sn: "DOL004",
    country: "Qatar",
    company: "Al-Shehri Solutions",
    piNo: "PI-2024-004",
    invoiceNo: "INV-2024-004",
    supplierName: "Qatar Logistics Hub",
    status: "Pending",
    dateLoginId: "2024-01-18",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
  },
  {
    id: "5",
    sn: "DOL005",
    country: "Bahrain",
    company: "Al-Ghamdi Trading",
    piNo: "PI-2024-005",
    invoiceNo: "INV-2024-005",
    supplierName: "Bahrain Express",
    status: "Processing",
    dateLoginId: "2024-01-19",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
  },
  {
    id: "6",
    sn: "DOL006",
    country: "Oman",
    company: "Al-Harbi Corporation",
    piNo: "PI-2024-006",
    invoiceNo: "INV-2024-006",
    supplierName: "Oman Distribution",
    status: "Delivered",
    dateLoginId: "2024-01-20",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
  },
  {
    id: "7",
    sn: "DOL007",
    country: "Jordan",
    company: "Al-Maktoum Trading",
    piNo: "PI-2024-007",
    invoiceNo: "INV-2024-007",
    supplierName: "Jordan Freight",
    status: "Cancelled",
    dateLoginId: "2024-01-21",
    isActive: false,
    isDeleted: false,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
  },
  {
    id: "8",
    sn: "DOL008",
    country: "Lebanon",
    company: "Al-Nahyan Enterprises",
    piNo: "PI-2024-008",
    invoiceNo: "INV-2024-008",
    supplierName: "Lebanon Logistics",
    status: "Active",
    dateLoginId: "2024-01-22",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
  },
  {
    id: "9",
    sn: "DOL009",
    country: "Egypt",
    company: "Al-Qasimi Trading",
    piNo: "PI-2024-009",
    invoiceNo: "INV-2024-009",
    supplierName: "Egypt Supply Co",
    status: "In Transit",
    dateLoginId: "2024-01-23",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
  },
  {
    id: "10",
    sn: "DOL010",
    country: "Iraq",
    company: "Al-Sharqi Corporation",
    piNo: "PI-2024-010",
    invoiceNo: "INV-2024-010",
    supplierName: "Iraq Trading House",
    status: "Delivered",
    dateLoginId: "2024-01-24",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
  },
  {
    id: "11",
    sn: "DOL011",
    country: "Turkey",
    company: "Al-Sabah Trading",
    piNo: "PI-2024-011",
    invoiceNo: "INV-2024-011",
    supplierName: "Turkish Suppliers",
    status: "Processing",
    dateLoginId: "2024-01-25",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
  },
  {
    id: "12",
    sn: "DOL012",
    country: "Iran",
    company: "Al-Khalifa Enterprises",
    piNo: "PI-2024-012",
    invoiceNo: "INV-2024-012",
    supplierName: "Iran Global Trade",
    status: "Pending",
    dateLoginId: "2024-01-26",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
  },
  {
    id: "13",
    sn: "DOL013",
    country: "Pakistan",
    company: "Al-Thani Trading Company",
    piNo: "PI-2024-013",
    invoiceNo: "INV-2024-013",
    supplierName: "Pakistani Export Co",
    status: "Active",
    dateLoginId: "2024-01-27",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
  },
  {
    id: "14",
    sn: "DOL014",
    country: "India",
    company: "Al-Said Enterprises",
    piNo: "PI-2024-014",
    invoiceNo: "INV-2024-014",
    supplierName: "Indian Trading Partners",
    status: "In Transit",
    dateLoginId: "2024-01-28",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
  },
  {
    id: "15",
    sn: "DOL015",
    country: "China",
    company: "Al-Hashemi Corporation",
    piNo: "PI-2024-015",
    invoiceNo: "INV-2024-015",
    supplierName: "Chinese Export Group",
    status: "Delivered",
    dateLoginId: "2024-01-29",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
  },
  {
    id: "16",
    sn: "DOL016",
    country: "Japan",
    company: "Aoun Trading Solutions",
    piNo: "PI-2024-016",
    invoiceNo: "INV-2024-016",
    supplierName: "Japanese Trading Solutions",
    status: "Pending",
    dateLoginId: "2024-01-30",
    isActive: false,
    isDeleted: false,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
  },
  {
    id: "17",
    sn: "DOL017",
    country: "South Korea",
    company: "El-Sisi Enterprises",
    piNo: "PI-2024-017",
    invoiceNo: "INV-2024-017",
    supplierName: "Korean Export Company",
    status: "Active",
    dateLoginId: "2024-01-31",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
  },
  {
    id: "18",
    sn: "DOL018",
    country: "Singapore",
    company: "Al-Kadhimi Trading",
    piNo: "PI-2024-018",
    invoiceNo: "INV-2024-018",
    supplierName: "Singapore Trading Partners",
    status: "In Transit",
    dateLoginId: "2024-02-01",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
  },
  {
    id: "19",
    sn: "DOL019",
    country: "Malaysia",
    company: "Erdogan Trading",
    piNo: "PI-2024-019",
    invoiceNo: "INV-2024-019",
    supplierName: "Malaysian Export Co",
    status: "Delivered",
    dateLoginId: "2024-02-02",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
  },
  {
    id: "20",
    sn: "DOL020",
    country: "Thailand",
    company: "Mitsotakis Enterprises",
    piNo: "PI-2024-020",
    invoiceNo: "INV-2024-020",
    supplierName: "Thai Trading Solutions",
    status: "Processing",
    dateLoginId: "2024-02-03",
    isActive: false,
    isDeleted: false,
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
  },
  {
    id: "21",
    sn: "DOL021",
    country: "Vietnam",
    company: "Vietnam Export Ltd",
    piNo: "PI-2024-021",
    invoiceNo: "INV-2024-021",
    supplierName: "Vietnamese Suppliers",
    status: "Cancelled",
    dateLoginId: "2024-02-04",
    isActive: false,
    isDeleted: false,
    createdAt: "2024-02-04",
    updatedAt: "2024-02-09",
  },
  {
    id: "22",
    sn: "DOL022",
    country: "Philippines",
    company: "Manila Trading Co",
    piNo: "PI-2024-022",
    invoiceNo: "INV-2024-022",
    supplierName: "Philippine Export House",
    status: "Active",
    dateLoginId: "2024-02-05",
    isActive: true,
    isDeleted: false,
    createdAt: "2024-02-05",
    updatedAt: "2024-02-10",
  },
];

export default function DeliveryOrderLogisticDataTable({
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
  const canCreate = usePermission("deliveryOrderLogistic", "create");
  const canViewSn = usePermission("deliveryOrderLogistic", "view", "sn");
  const canViewCountry = usePermission(
    "deliveryOrderLogistic",
    "view",
    "country"
  );
  const canViewCompany = usePermission(
    "deliveryOrderLogistic",
    "view",
    "company"
  );
  const canViewPiNo = usePermission("deliveryOrderLogistic", "view", "piNo");
  const canViewInvoiceNo = usePermission(
    "deliveryOrderLogistic",
    "view",
    "invoiceNo"
  );
  const canViewSupplierName = usePermission(
    "deliveryOrderLogistic",
    "view",
    "supplierName"
  );
  const canViewStatus = usePermission(
    "deliveryOrderLogistic",
    "view",
    "status"
  );
  const canViewDateLoginId = usePermission(
    "deliveryOrderLogistic",
    "view",
    "dateLoginId"
  );
  const canViewIsActive = usePermission(
    "deliveryOrderLogistic",
    "view",
    "isActive"
  );
  const canViewCreatedAt = usePermission(
    "deliveryOrderLogistic",
    "view",
    "createdAt"
  );
  const canViewUpdatedAt = usePermission(
    "deliveryOrderLogistic",
    "view",
    "updatedAt"
  );

  const componentColumns = [
    {
      accessorKey: "sn",
      title: "SN",
      options: canViewSn
        ? [...new Set(mockDeliveryOrderLogistics.map((item) => item.sn))]
        : [],
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
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "sn",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: canViewCountry
        ? [...new Set(mockDeliveryOrderLogistics.map((item) => item.country))]
        : [],
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
      options: canViewCompany
        ? [...new Set(mockDeliveryOrderLogistics.map((item) => item.company))]
        : [],
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
      options: canViewPiNo
        ? [...new Set(mockDeliveryOrderLogistics.map((item) => item.piNo))]
        : [],
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
      options: canViewInvoiceNo
        ? [...new Set(mockDeliveryOrderLogistics.map((item) => item.invoiceNo))]
        : [],
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
      options: canViewSupplierName
        ? [
            ...new Set(
              mockDeliveryOrderLogistics.map((item) => item.supplierName)
            ),
          ]
        : [],
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
      options: canViewStatus
        ? [...new Set(mockDeliveryOrderLogistics.map((item) => item.status))]
        : [],
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
      accessorKey: "dateLoginId",
      title: "Date Login ID",
      options: canViewDateLoginId
        ? [
            ...new Set(
              mockDeliveryOrderLogistics.map((item) => item.dateLoginId)
            ),
          ]
        : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("dateLoginId")
          .localeCompare(row2.getValue("dateLoginId"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "dateLoginId",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "isActive",
      title: "Active",
      options: canViewIsActive ? ["Yes", "No"] : [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        const displayValue = cellValue ? "Yes" : "No";
        return filterValue.includes(displayValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("isActive") ? 1 : 0;
        const val2 = row2.getValue("isActive") ? 1 : 0;
        return val1 - val2;
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "isActive",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: canViewCreatedAt ? [] : [], // Dates are typically not filtered with predefined options
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
      options: canViewUpdatedAt ? [] : [], // Dates are typically not filtered with predefined options
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

  const filteredData = mockDeliveryOrderLogistics.filter(
    (deliveryOrderLogistic) => {
      if (dataTableFilter.status === "Active") {
        return deliveryOrderLogistic.isActive;
      } else if (dataTableFilter.status === "Inactive") {
        return !deliveryOrderLogistic.isActive;
      } else if (dataTableFilter.status === "Deleted") {
        return deliveryOrderLogistic.isDeleted;
      }
      return true;
    }
  );

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["sn"]} // Pin SN column
      pathName="delivery-order-logistic"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
