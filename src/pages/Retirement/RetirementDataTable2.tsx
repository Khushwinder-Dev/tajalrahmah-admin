/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockRetirements = [
  {
    id: "1",
    name: "Spain Increment",
    date: "2023-03-01",
    status: true,
    description: "Cost of living adjustment",
    iqamaNo: "ESIQAMA103",
    employeeName: "Carlos Díaz",
    employeeDesignation: "Sales Executive",
    employeeBranch: "Madrid Branch",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    name: "Canada Increment",
    date: "2023-03-01",
    status: true,
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
    name: "UK Increment",
    date: "2023-03-01",
    status: true,
    description: "Quarterly increment for UK staff",
    iqamaNo: "GBIQAMA002",
    employeeName: "Emma Johnson",
    employeeDesignation: "HR Officer",
    employeeBranch: "London Branch",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    actionMessage: "20m",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    name: "Germany Increment",
    date: "2023-03-01",
    status: true,
    description: "Performance-based increment",
    iqamaNo: "DEIQAMA003",
    employeeName: "Lena Müller",
    employeeDesignation: "Developer",
    employeeBranch: "Berlin Branch",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    actionMessage: "15 Apr",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    name: "France Increment",
    date: "2023-03-01",
    status: true,
    description: "Annual revision",
    iqamaNo: "FRIQAMA004",
    employeeName: "Louis Martin",
    employeeDesignation: "Engineer",
    employeeBranch: "Paris Branch",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    name: "Japan Increment",
    date: "2023-03-01",
    status: true,
    description: "Mid-year increment",
    iqamaNo: "JPIQAMA005",
    employeeName: "Taro Suzuki",
    employeeDesignation: "System Analyst",
    employeeBranch: "Tokyo Branch",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    name: "Australia Increment",
    date: "2023-03-01",
    status: true,
    description: "Cost of living increment",
    iqamaNo: "AUIQAMA006",
    employeeName: "Olivia Brown",
    employeeDesignation: "Marketing Lead",
    employeeBranch: "Sydney Branch",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    name: "Brazil Increment",
    date: "2023-03-01",
    status: true,
    description: "Regional adjustment",
    iqamaNo: "BRIQAMA007",
    employeeName: "Lucas Silva",
    employeeDesignation: "Data Analyst",
    employeeBranch: "Rio Branch",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    name: "India Increment",
    date: "2023-03-01",
    status: true,
    description: "Annual performance increment",
    iqamaNo: "INIQAMA008",
    employeeName: "Amit Kumar",
    employeeDesignation: "Support Engineer",
    employeeBranch: "Delhi Branch",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    name: "China Increment",
    date: "2023-03-01",
    status: true,
    description: "Team growth incentive",
    iqamaNo: "CNIQAMA009",
    employeeName: "Li Wei",
    employeeDesignation: "Operations Manager",
    employeeBranch: "Beijing Branch",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function RetirementDataTable2({
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
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockRetirements.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockRetirements.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockRetirements.map((item) => item.iqamaNo))],
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
      options: [...new Set(mockRetirements.map((item) => item.employeeName))],
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
        ...new Set(mockRetirements.map((item) => item.employeeDesignation)),
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
      options: [...new Set(mockRetirements.map((item) => item.employeeBranch))],
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

  const filteredData = mockRetirements.filter((increment) => {
    if (dataTableFilter.status === "Active") {
      return increment.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !increment.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return increment.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return increment.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return increment.isUpdated;
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
      fixedColumns={["name", "status"]} // Pin country name column
      pathName="retirement"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
