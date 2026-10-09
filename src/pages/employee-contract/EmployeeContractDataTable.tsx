/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockEmployeeContracts = [
  {
    id: "1",
    staffName: "Ahmed Al-Rashid",
    contactType: "Full Time",
    status: "Active",
    salaryAllowance: "8000 SAR",
    effectiveDate: "2024-01-15",
    expirationDate: "2025-01-15",
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
    staffName: "Fatima Al-Zahra",
    contactType: "Part Time",
    status: "Pending",
    salaryAllowance: "4000 SAR",
    effectiveDate: "2024-02-01",
    expirationDate: "2024-08-01",
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
    staffName: "Omar Al-Sayed",
    contactType: "Contract",
    status: "Expired",
    salaryAllowance: "6000 SAR",
    effectiveDate: "2023-06-01",
    expirationDate: "2024-06-01",
    createdAt: "2023-06-01",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    staffName: "Layla Al-Mahmoud",
    contactType: "Temporary",
    status: "Draft",
    salaryAllowance: "3500 SAR",
    effectiveDate: "2024-03-01",
    expirationDate: "2024-09-01",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-25",
    actionMessage: "15 Apr",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    staffName: "Khalid Al-Nasser",
    contactType: "Full Time",
    status: "Active",
    salaryAllowance: "12000 SAR",
    effectiveDate: "2023-12-01",
    expirationDate: "2025-12-01",
    createdAt: "2023-12-01",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    staffName: "Aisha Al-Hassan",
    contactType: "Part Time",
    status: "Pending",
    salaryAllowance: "4500 SAR",
    effectiveDate: "2024-03-15",
    expirationDate: "2024-09-15",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    staffName: "Yusuf Al-Qahtani",
    contactType: "Contract",
    status: "Active",
    salaryAllowance: "7500 SAR",
    effectiveDate: "2024-01-01",
    expirationDate: "2025-01-01",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    staffName: "Noor Al-Sabah",
    contactType: "Temporary",
    status: "Expired",
    salaryAllowance: "3000 SAR",
    effectiveDate: "2023-09-01",
    expirationDate: "2024-03-01",
    createdAt: "2023-09-01",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    staffName: "Hassan Al-Mansouri",
    contactType: "Full Time",
    status: "Active",
    salaryAllowance: "15000 SAR",
    effectiveDate: "2022-06-01",
    expirationDate: "2027-06-01",
    createdAt: "2022-06-01",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    staffName: "Mariam Al-Rashid",
    contactType: "Part Time",
    status: "Pending",
    salaryAllowance: "5000 SAR",
    effectiveDate: "2024-04-01",
    expirationDate: "2024-10-01",
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
    staffName: "Abdullah Al-Zahra",
    contactType: "Contract",
    status: "Active",
    salaryAllowance: "9000 SAR",
    effectiveDate: "2024-02-15",
    expirationDate: "2025-02-15",
    createdAt: "2024-02-15",
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
    staffName: "Zahra Al-Mahmoud",
    contactType: "Temporary",
    status: "Draft",
    salaryAllowance: "4000 SAR",
    effectiveDate: "2024-05-01",
    expirationDate: "2024-11-01",
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
    staffName: "Ibrahim Al-Sayed",
    contactType: "Full Time",
    status: "Active",
    salaryAllowance: "11000 SAR",
    effectiveDate: "2023-08-01",
    expirationDate: "2026-08-01",
    createdAt: "2023-08-01",
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
    staffName: "Sara Al-Nasser",
    contactType: "Part Time",
    status: "Active",
    salaryAllowance: "5500 SAR",
    effectiveDate: "2024-01-01",
    expirationDate: "2024-07-01",
    createdAt: "2024-01-01",
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
    staffName: "Mohammed Al-Hassan",
    contactType: "Contract",
    status: "Pending",
    salaryAllowance: "7000 SAR",
    effectiveDate: "2024-04-15",
    expirationDate: "2025-04-15",
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
    staffName: "Amina Al-Qahtani",
    contactType: "Full Time",
    status: "Active",
    salaryAllowance: "13000 SAR",
    effectiveDate: "2023-03-01",
    expirationDate: "2028-03-01",
    createdAt: "2023-03-01",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    staffName: "Rashid Al-Sabah",
    contactType: "Temporary",
    status: "Draft",
    salaryAllowance: "3800 SAR",
    effectiveDate: "2024-06-01",
    expirationDate: "2024-12-01",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    staffName: "Layla Al-Mansouri",
    contactType: "Part Time",
    status: "Active",
    salaryAllowance: "4800 SAR",
    effectiveDate: "2024-02-01",
    expirationDate: "2024-08-01",
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
    staffName: "Khalil Al-Rashid",
    contactType: "Contract",
    status: "Active",
    salaryAllowance: "8500 SAR",
    effectiveDate: "2024-01-10",
    expirationDate: "2025-01-10",
    createdAt: "2024-01-10",
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
    staffName: "Nada Al-Zahra",
    contactType: "Temporary",
    status: "Expired",
    salaryAllowance: "3200 SAR",
    effectiveDate: "2023-10-01",
    expirationDate: "2024-04-01",
    createdAt: "2023-10-01",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function EmployeeContractDataTable({
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
  const canCreate = usePermission("employeeContract", "create");

  const componentColumns = [
    {
      accessorKey: "staffName",
      title: "Staff Name",
      options: [
        ...new Set(mockEmployeeContracts.map((item) => item.staffName)),
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
          .getValue("staffName")
          .localeCompare(row2.getValue("staffName"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "staffName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contactType",
      title: "Contact Type",
      options: [
        ...new Set(mockEmployeeContracts.map((item) => item.contactType)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("contactType")
          .localeCompare(row2.getValue("contactType"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "contactType",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "salaryAllowance",
      title: "Salary Allowance",
      options: [
        ...new Set(mockEmployeeContracts.map((item) => item.salaryAllowance)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        const salary1 = parseInt(
          row1.getValue("salaryAllowance").split(" ")[0]
        );
        const salary2 = parseInt(
          row2.getValue("salaryAllowance").split(" ")[0]
        );
        return salary1 - salary2;
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "salaryAllowance",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "effectiveDate",
      title: "Effective Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("effectiveDate")).getTime() -
          new Date(row2.getValue("effectiveDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "effectiveDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "expirationDate",
      title: "Expiration Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("expirationDate")).getTime() -
          new Date(row2.getValue("expirationDate")).getTime()
        );
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "expirationDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [],
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
      options: [],
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
      options: [],
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

  const filteredData = mockEmployeeContracts.filter((contract) => {
    if (dataTableFilter.status === "Active") {
      return contract.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !contract.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return contract.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return contract.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return contract.isUpdated;
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
      fixedColumns={["staffName"]}
      pathName="employee-contract"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
