/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockCertificates = [
  {
    id: "1",
    certificateNumber: "CEF-001",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-01-15",
    description: "Cost of living adjustment for Q1",
    iqamaNo: "ESIQAMA103",
    employeeName: "Carlos Díaz",
    employeeDesignation: "Sales Executive",
    employeeBranch: "Madrid Branch",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    certificateNumber: "CEF-002",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-01-15",
    description: "Annual raise for Canada team",
    iqamaNo: "CAIQAMA001",
    employeeName: "John Smith",
    employeeDesignation: "Manager",
    employeeBranch: "Toronto Branch",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    certificateNumber: "CEF-003",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-01-20",
    description: "Quarterly increment for HR department",
    iqamaNo: "GBIQAMA002",
    employeeName: "Emma Johnson",
    employeeDesignation: "HR Officer",
    employeeBranch: "London Branch",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    status: "active",
    actionMessage: "1h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    certificateNumber: "CEF-004",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-02-05",
    description: "Performance-based incentive Q2",
    iqamaNo: "DEIQAMA003",
    employeeName: "Lena Müller",
    employeeDesignation: "Developer",
    employeeBranch: "Berlin Branch",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    actionMessage: "3d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    certificateNumber: "CEF-005",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-02-08",
    description: "Annual salary revision",
    iqamaNo: "FRIQAMA004",
    employeeName: "Louis Martin",
    employeeDesignation: "Engineer",
    employeeBranch: "Paris Branch",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    status: "active",
    actionMessage: "5d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    certificateNumber: "CEF-006",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-02-20",
    description: "Mid-year performance bonus",
    iqamaNo: "JPIQAMA005",
    employeeName: "Taro Suzuki",
    employeeDesignation: "System Analyst",
    employeeBranch: "Tokyo Branch",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    actionMessage: "1w",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    certificateNumber: "CEF-007",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-03-05",
    description: "Cost of living salary adjustment",
    iqamaNo: "AUIQAMA006",
    employeeName: "Olivia Brown",
    employeeDesignation: "Marketing Lead",
    employeeBranch: "Sydney Branch",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    actionMessage: "1w",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    certificateNumber: "CEF-008",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-03-15",
    description: "Regional market adjustment",
    iqamaNo: "BRIQAMA007",
    employeeName: "Lucas Silva",
    employeeDesignation: "Data Analyst",
    employeeBranch: "Rio Branch",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    actionMessage: "6d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    certificateNumber: "CEF-009",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-03-25",
    description: "Annual performance evaluation raise",
    iqamaNo: "INIQAMA008",
    employeeName: "Amit Kumar",
    employeeDesignation: "Support Engineer",
    employeeBranch: "Delhi Branch",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    actionMessage: "3d",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    certificateNumber: "CEF-010",
    certificateType: "Basic",
    labManager: "Maria Garcia",
    generalManager: "HM Ibrahim Hassan",
    date: "2023-04-05",
    description: "Department-wide salary restructure",
    iqamaNo: "CNIQAMA009",
    employeeName: "Li Wei",
    employeeDesignation: "Operations Manager",
    employeeBranch: "Beijing Branch",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    actionMessage: "45m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function CertificatesDataTable2({
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
      accessorKey: "certificateNumber",
      title: "C.Number",
      options: [
        ...new Set(mockCertificates.map((item) => item.certificateNumber)),
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
          .getValue("certificateNumber")
          .localeCompare(row2.getValue("certificateNumber"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "certificateNumber",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "certificateType",
      title: "C.Type",
      options: [
        ...new Set(mockCertificates.map((item) => item.certificateType)),
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
          .getValue("certificateType")
          .localeCompare(row2.getValue("certificateType"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "certificateType",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockCertificates.map((item) => item.iqamaNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("iqamaNo") - row2.getValue("iqamaNo");
      },
      size: 200,
      minSize: 180,
      meta: {
        readOnly: true,
      },
    },
    {
      accessorKey: "employeeName",
      title: "E.Name",
      options: [...new Set(mockCertificates.map((item) => item.employeeName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("employeeName")
          .localeCompare(row2.getValue("employeeName"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "employeeName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "employeeDesignation",
      title: "E.Designation",
      options: [
        ...new Set(mockCertificates.map((item) => item.employeeDesignation)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("states") - row2.getValue("states");
      },
      size: 200,
      minSize: 180,
      meta: {
        readOnly: true,
      },
    },

    {
      accessorKey: "employeeBranch",
      title: "E.Branch",
      options: [
        ...new Set(mockCertificates.map((item) => item.employeeBranch)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toString().includes(val)
          );
        }
        return cellValue.toString().includes(filterValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          row1.getValue("employeeBranch") - row2.getValue("employeeBranch")
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        readOnly: true,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockCertificates.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "description",
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

  const filteredData = mockCertificates.filter((certificate) => {
    if (dataTableFilter.status === "Active") {
      return certificate.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !certificate.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return certificate.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return certificate.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return certificate.isUpdated;
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
      fixedColumns={["certificateNumber", "certificateType", "status"]} // Pin country name column
      pathName="certificates"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
