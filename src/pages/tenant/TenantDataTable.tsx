/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;
  tenants: string;
  propertyCode: string;
  propertyName: string;
  propertyPrice: string;
  referenceNumber: string;
  primaryContact: string;
  invoice: string;
  invoiceDate: string;
  contract: string;
  contractAmount: string;
  term: string;
  leaseTerm: string;

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
    tenants: "John Smith",
    propertyCode: "PR-001",
    propertyName: "Sunset Apartments",
    propertyPrice: "$1,200",
    referenceNumber: "REF-1001",
    primaryContact: "+1-555-1234",
    invoice: "INV-2001",
    invoiceDate: "2025-01-15",
    contract: "CNT-3001",
    contractAmount: "$14,400",
    term: "12 months",
    leaseTerm: "2025-01-15 to 2026-01-14",

    status: "Active",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-15",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    tenants: "Emily Johnson",
    propertyCode: "PR-002",
    propertyName: "Greenwood Villas",
    propertyPrice: "$1,500",
    referenceNumber: "REF-1002",
    primaryContact: "+1-555-5678",
    invoice: "INV-2002",
    invoiceDate: "2025-02-01",
    contract: "CNT-3002",
    contractAmount: "$18,000",
    term: "12 months",
    leaseTerm: "2025-02-01 to 2026-01-31",

    status: "Active",
    createdAt: "2025-01-28",
    updatedAt: "2025-02-01",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    tenants: "Michael Brown",
    propertyCode: "PR-003",
    propertyName: "Lakeside Homes",
    propertyPrice: "$950",
    referenceNumber: "REF-1003",
    primaryContact: "+1-555-9876",
    invoice: "INV-2003",
    invoiceDate: "2025-03-05",
    contract: "CNT-3003",
    contractAmount: "$11,400",
    term: "12 months",
    leaseTerm: "2025-03-05 to 2026-03-04",

    status: "Active",
    createdAt: "2025-03-01",
    updatedAt: "2025-03-05",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    tenants: "Sophia Davis",
    propertyCode: "PR-004",
    propertyName: "Maple Residency",
    propertyPrice: "$1,800",
    referenceNumber: "REF-1004",
    primaryContact: "+1-555-2222",
    invoice: "INV-2004",
    invoiceDate: "2025-04-12",
    contract: "CNT-3004",
    contractAmount: "$21,600",
    term: "12 months",
    leaseTerm: "2025-04-12 to 2026-04-11",

    status: "Active",
    createdAt: "2025-04-10",
    updatedAt: "2025-04-12",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    tenants: "Daniel Wilson",
    propertyCode: "PR-005",
    propertyName: "Hilltop Towers",
    propertyPrice: "$1,300",
    referenceNumber: "REF-1005",
    primaryContact: "+1-555-3333",
    invoice: "INV-2005",
    invoiceDate: "2025-05-01",
    contract: "CNT-3005",
    contractAmount: "$15,600",
    term: "12 months",
    leaseTerm: "2025-05-01 to 2026-04-30",

    status: "Draft",
    createdAt: "2025-04-28",
    updatedAt: "2025-05-01",
    draftedAt: "2025-05-01",
    actionMessage: "Draft pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    tenants: "Olivia Martinez",
    propertyCode: "PR-006",
    propertyName: "Cedar Park",
    propertyPrice: "$1,400",
    referenceNumber: "REF-1006",
    primaryContact: "+1-555-4444",
    invoice: "INV-2006",
    invoiceDate: "2025-06-10",
    contract: "CNT-3006",
    contractAmount: "$16,800",
    term: "12 months",
    leaseTerm: "2025-06-10 to 2026-06-09",

    status: "Active",
    createdAt: "2025-06-05",
    updatedAt: "2025-06-10",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    tenants: "James Anderson",
    propertyCode: "PR-007",
    propertyName: "Ocean View",
    propertyPrice: "$2,000",
    referenceNumber: "REF-1007",
    primaryContact: "+1-555-5555",
    invoice: "INV-2007",
    invoiceDate: "2025-07-15",
    contract: "CNT-3007",
    contractAmount: "$24,000",
    term: "12 months",
    leaseTerm: "2025-07-15 to 2026-07-14",

    status: "Active",
    createdAt: "2025-07-10",
    updatedAt: "2025-07-15",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    tenants: "Ava Thompson",
    propertyCode: "PR-008",
    propertyName: "Riverbank Estates",
    propertyPrice: "$1,100",
    referenceNumber: "REF-1008",
    primaryContact: "+1-555-6666",
    invoice: "INV-2008",
    invoiceDate: "2025-08-05",
    contract: "CNT-3008",
    contractAmount: "$13,200",
    term: "12 months",
    leaseTerm: "2025-08-05 to 2026-08-04",

    status: "Active",
    createdAt: "2025-08-01",
    updatedAt: "2025-08-05",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    tenants: "William Garcia",
    propertyCode: "PR-009",
    propertyName: "Pine Grove",
    propertyPrice: "$900",
    referenceNumber: "REF-1009",
    primaryContact: "+1-555-7777",
    invoice: "INV-2009",
    invoiceDate: "2025-09-12",
    contract: "CNT-3009",
    contractAmount: "$10,800",
    term: "12 months",
    leaseTerm: "2025-09-12 to 2026-09-11",

    status: "Inactive",
    createdAt: "2025-09-10",
    updatedAt: "2025-09-12",
    draftedAt: null,
    actionMessage: "Lease ended",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    tenants: "Mia Rodriguez",
    propertyCode: "PR-010",
    propertyName: "Elm Street Flats",
    propertyPrice: "$1,250",
    referenceNumber: "REF-1010",
    primaryContact: "+1-555-8888",
    invoice: "INV-2010",
    invoiceDate: "2025-10-01",
    contract: "CNT-3010",
    contractAmount: "$15,000",
    term: "12 months",
    leaseTerm: "2025-10-01 to 2026-09-30",

    status: "Active",
    createdAt: "2025-09-28",
    updatedAt: "2025-10-01",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    tenants: "Benjamin Lee",
    propertyCode: "PR-011",
    propertyName: "Willow Creek",
    propertyPrice: "$1,600",
    referenceNumber: "REF-1011",
    primaryContact: "+1-555-9999",
    invoice: "INV-2011",
    invoiceDate: "2025-11-15",
    contract: "CNT-3011",
    contractAmount: "$19,200",
    term: "12 months",
    leaseTerm: "2025-11-15 to 2026-11-14",

    status: "Draft",
    createdAt: "2025-11-10",
    updatedAt: "2025-11-15",
    draftedAt: "2025-11-15",
    actionMessage: "Draft pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    tenants: "Charlotte Harris",
    propertyCode: "PR-012",
    propertyName: "Birchwood Heights",
    propertyPrice: "$1,750",
    referenceNumber: "REF-1012",
    primaryContact: "+1-555-0000",
    invoice: "INV-2012",
    invoiceDate: "2025-12-05",
    contract: "CNT-3012",
    contractAmount: "$21,000",
    term: "12 months",
    leaseTerm: "2025-12-05 to 2026-12-04",

    status: "Active",
    createdAt: "2025-12-01",
    updatedAt: "2025-12-05",
    draftedAt: null,
    actionMessage: "Lease signed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function TenantDataTable({
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
  const canCreate = usePermission("tenant", "create");

  const componentColumns = [
    {
      accessorKey: "tenants",
      title: "Tenants",
      options: [...new Set(mockTableData.map((item) => item.tenants))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("tenants").localeCompare(row2.getValue("tenants"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "tenants",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "propertyCode",
      title: "Property Code",
      options: [...new Set(mockTableData.map((item) => item.propertyCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("propertyCode")
          .localeCompare(row2.getValue("propertyCode"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "propertyCode",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "propertyName",
      title: "Property Name",
      options: [...new Set(mockTableData.map((item) => item.propertyName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("propertyName")
          .localeCompare(row2.getValue("propertyName"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "propertyName",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "propertyPrice",
      title: "Property Price",
      options: [...new Set(mockTableData.map((item) => item.propertyPrice))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("propertyPrice")
          .localeCompare(row2.getValue("propertyPrice"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "propertyPrice",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "referenceNumber",
      title: "Reference Number",
      options: [...new Set(mockTableData.map((item) => item.referenceNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("referenceNumber")
          .localeCompare(row2.getValue("referenceNumber"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "referenceNumber",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "primaryContact",
      title: "Primary Contact",
      options: [...new Set(mockTableData.map((item) => item.primaryContact))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("primaryContact")
          .localeCompare(row2.getValue("primaryContact"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "primaryContact",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "invoice",
      title: "Invoice",
      options: [...new Set(mockTableData.map((item) => item.invoice))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("invoice").localeCompare(row2.getValue("invoice"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "invoice",
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
      accessorKey: "contract",
      title: "Contract",
      options: [...new Set(mockTableData.map((item) => item.contract))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("contract")
          .localeCompare(row2.getValue("contract"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "contract",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contractAmount",
      title: "Contract Amount",
      options: [...new Set(mockTableData.map((item) => item.contractAmount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("contractAmount")
          .localeCompare(row2.getValue("contractAmount"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "contractAmount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "term",
      title: "Term",
      options: [...new Set(mockTableData.map((item) => item.term))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("term").localeCompare(row2.getValue("term"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "term",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "leaseTerm",
      title: "Lease Term",
      options: [...new Set(mockTableData.map((item) => item.leaseTerm))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("leaseTerm")
          .localeCompare(row2.getValue("leaseTerm"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "leaseTerm",
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
