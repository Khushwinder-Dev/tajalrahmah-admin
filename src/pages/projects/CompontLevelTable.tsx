/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type DataTableDataType = {
  id: string;
  branch: string;
  code: string;
  customer: string;
  customerNo: string;
  vendorCode: string;
  projectName: string;
  projectCode: string;
  projectType: string;
  startDate: string;
  projectLocation: string;
  poNumber: string;
  description: string;

  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  actionMessage: string;
  status: string;

  isDeleted: boolean;
  isActive: boolean;
  isDraft: boolean;
  isUpdated: boolean;
};

const projectDataTable: DataTableDataType[] = [
  {
    id: "PJT001",
    branch: "Dhaka",
    code: "PRJ-DHK-001",
    customer: "ABC Corporation",
    customerNo: "CUST001",
    vendorCode: "VND001",
    projectName: "ERP Implementation",
    projectCode: "ERP-DHK-001",
    projectType: "Software",
    startDate: "2025-06-01",
    projectLocation: "Dhaka HQ",
    poNumber: "PO10001",
    description: "Company-wide ERP implementation.",
    createdAt: "2025-06-01T09:00:00Z",
    updatedAt: "2025-06-10T12:00:00Z",
    draftedAt: "2025-05-20T15:00:00Z",
    actionMessage: "Project initiated",
    status: "Active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: true,
  },
  {
    id: "PJT002",
    branch: "Chattogram",
    code: "PRJ-CTG-002",
    customer: "Delta Ltd.",
    customerNo: "CUST002",
    vendorCode: "VND002",
    projectName: "Warehouse Automation",
    projectCode: "WA-CTG-002",
    projectType: "Automation",
    startDate: "2025-05-15",
    projectLocation: "CTG Warehouse",
    poNumber: "PO10002",
    description: "Automating warehouse operations.",
    createdAt: "2025-05-01T08:00:00Z",
    updatedAt: "2025-05-16T10:00:00Z",
    draftedAt: "2025-04-25T14:00:00Z",
    actionMessage: "Awaiting vendor approval",
    status: "Inactive",
    isDeleted: false,
    isActive: false,
    isDraft: false,
    isUpdated: true,
  },
  {
    id: "PJT003",
    branch: "Sylhet",
    code: "PRJ-SYL-003",
    customer: "Tea Valley Co.",
    customerNo: "CUST003",
    vendorCode: "VND003",
    projectName: "Tea Garden Management",
    projectCode: "TGM-SYL-003",
    projectType: "Management",
    startDate: "2025-07-10",
    projectLocation: "Sylhet Tea Estate",
    poNumber: "PO10003",
    description: "Digital system for garden operations.",
    createdAt: "2025-07-01T11:00:00Z",
    updatedAt: "2025-07-12T13:00:00Z",
    draftedAt: "2025-06-25T17:00:00Z",
    actionMessage: "Field survey completed",
    status: "Active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    id: "PJT004",
    branch: "Khulna",
    code: "PRJ-KHL-004",
    customer: "Oceanic Traders",
    customerNo: "CUST004",
    vendorCode: "VND004",
    projectName: "Port System Upgrade",
    projectCode: "PSU-KHL-004",
    projectType: "Infrastructure",
    startDate: "2025-08-01",
    projectLocation: "Khulna Port",
    poNumber: "PO10004",
    description: "Upgrading port infrastructure and systems.",
    createdAt: "2025-07-20T09:00:00Z",
    updatedAt: "2025-08-03T10:30:00Z",
    draftedAt: "2025-07-10T12:00:00Z",
    actionMessage: "Initial inspection done",
    status: "Active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: true,
  },
  {
    id: "PJT005",
    branch: "Rajshahi",
    code: "PRJ-RJS-005",
    customer: "Green Agro",
    customerNo: "CUST005",
    vendorCode: "VND005",
    projectName: "Farm Analytics System",
    projectCode: "FAS-RJS-005",
    projectType: "Analytics",
    startDate: "2025-07-20",
    projectLocation: "Rajshahi Fields",
    poNumber: "PO10005",
    description: "Analytics platform for farm data.",
    createdAt: "2025-07-10T10:00:00Z",
    updatedAt: "2025-07-22T09:30:00Z",
    draftedAt: "2025-06-30T11:00:00Z",
    actionMessage: "Prototype under review",
    status: "Draft",
    isDeleted: false,
    isActive: false,
    isDraft: true,
    isUpdated: true,
  },
  {
    id: "PJT006",
    branch: "Barishal",
    code: "PRJ-BSL-006",
    customer: "Blue River Ltd.",
    customerNo: "CUST006",
    vendorCode: "VND006",
    projectName: "Flood Monitoring System",
    projectCode: "FMS-BSL-006",
    projectType: "IoT",
    startDate: "2025-09-05",
    projectLocation: "Barishal River Side",
    poNumber: "PO10006",
    description: "Real-time flood detection and alerts.",
    createdAt: "2025-08-01T14:00:00Z",
    updatedAt: "2025-08-05T12:00:00Z",
    draftedAt: "2025-07-25T15:00:00Z",
    actionMessage: "Sensor calibration pending",
    status: "Pending",
    isDeleted: false,
    isActive: false,
    isDraft: false,
    isUpdated: true,
  },
  {
    id: "PJT007",
    branch: "Mymensingh",
    code: "PRJ-MYM-007",
    customer: "Fresh Dairy",
    customerNo: "CUST007",
    vendorCode: "VND007",
    projectName: "Cold Chain Logistics",
    projectCode: "CCL-MYM-007",
    projectType: "Logistics",
    startDate: "2025-07-25",
    projectLocation: "Mymensingh Dairy Plant",
    poNumber: "PO10007",
    description: "Logistics system for cold chain transport.",
    createdAt: "2025-07-15T09:30:00Z",
    updatedAt: "2025-07-28T10:00:00Z",
    draftedAt: "2025-07-05T11:45:00Z",
    actionMessage: "Logistics vendor finalized",
    status: "Active",
    isDeleted: false,
    isActive: true,
    isDraft: false,
    isUpdated: false,
  },
  {
    id: "PJT008",
    branch: "Rangpur",
    code: "PRJ-RGP-008",
    customer: "Eco Builders",
    customerNo: "CUST008",
    vendorCode: "VND008",
    projectName: "Eco Housing Project",
    projectCode: "EHP-RGP-008",
    projectType: "Construction",
    startDate: "2025-06-10",
    projectLocation: "Rangpur Green Zone",
    poNumber: "PO10008",
    description: "Sustainable residential development.",
    createdAt: "2025-05-30T13:00:00Z",
    updatedAt: "2025-06-15T14:30:00Z",
    draftedAt: "2025-05-20T12:00:00Z",
    actionMessage: "Construction started",
    status: "Completed",
    isDeleted: true,
    isActive: false,
    isDraft: false,
    isUpdated: false,
  },
  {
    id: "PJT009",
    branch: "Jessore",
    code: "PRJ-JSR-009",
    customer: "City Transport",
    customerNo: "CUST009",
    vendorCode: "VND009",
    projectName: "Smart Ticketing System",
    projectCode: "STS-JSR-009",
    projectType: "Software",
    startDate: "2025-10-01",
    projectLocation: "Jessore City Center",
    poNumber: "PO10009",
    description: "Digital ticketing for local transport.",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-15T12:00:00Z",
    draftedAt: "2025-08-20T09:00:00Z",
    actionMessage: "Design phase in progress",
    status: "Draft",
    isDeleted: false,
    isActive: false,
    isDraft: true,
    isUpdated: true,
  },
  {
    id: "PJT010",
    branch: "Cumilla",
    code: "PRJ-CML-010",
    customer: "Smart Energy Co.",
    customerNo: "CUST010",
    vendorCode: "VND010",
    projectName: "Smart Meter Installation",
    projectCode: "SMI-CML-010",
    projectType: "Energy",
    startDate: "2025-11-01",
    projectLocation: "Cumilla Grid",
    poNumber: "PO10010",
    description: "Smart meters for efficient power usage.",
    createdAt: "2025-10-01T08:00:00Z",
    updatedAt: "2025-10-10T09:30:00Z",
    draftedAt: "2025-09-25T10:00:00Z",
    actionMessage: "Procurement in progress",
    status: "Pending",
    isDeleted: false,
    isActive: false,
    isDraft: false,
    isUpdated: false,
  },
];

export default function ProjectsDataTable({
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
  const canCreate = usePermission("projects", "create");

  const componentColumns = [
    {
      accessorKey: "projectName",
      title: "Project Name",
      options: [...new Set(projectDataTable.map((item) => item.projectName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("projectName")
          .localeCompare(row2.getValue("projectName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "projectName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "code",
      title: "Code",
      options: [...new Set(projectDataTable.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(projectDataTable.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "projectType",
      title: "Project Type",
      options: [...new Set(projectDataTable.map((item) => item.projectType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("projectType")
          .localeCompare(row2.getValue("projectType"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Project Type",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "projectType",
      title: "Project Type",
      options: [...new Set(projectDataTable.map((item) => item.projectType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("projectType")
          .localeCompare(row2.getValue("projectType"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Project Type",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "projectCode",
      title: "Project Code",
      options: [...new Set(projectDataTable.map((item) => item.projectCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("projectCode")
          .localeCompare(row2.getValue("projectCode"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Project Code",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "projectLocation",
      title: "Project Location",
      options: [
        ...new Set(projectDataTable.map((item) => item.projectLocation)),
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
          .getValue("projectLocation")
          .localeCompare(row2.getValue("projectLocation"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Project Location",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customerNo",
      title: "Customer No",
      options: [...new Set(projectDataTable.map((item) => item.customerNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerNo")
          .localeCompare(row2.getValue("customerNo"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Customer No",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "poNumber",
      title: "PO Number",
      options: [...new Set(projectDataTable.map((item) => item.poNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("poNumber")
          .localeCompare(row2.getValue("poNumber"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "PO Number",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(projectDataTable.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "Description",
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
  ];

  const filteredData = projectDataTable.filter((country) => {
    if (dataTableFilter.status === "Active") {
      return country.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !country.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return country.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return country.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return country.isUpdated;
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
      fixedColumns={["projectName", "code"]} // Pin country name column
      pathName="projects"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
