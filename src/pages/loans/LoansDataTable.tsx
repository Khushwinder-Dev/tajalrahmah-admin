/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;
  date: string;
  iqamaNo: string;
  branch: string;

  permittedBy: string;
  approvedDate: string;
  repaymentFrom: string;
  amount: string;
  interestPercentage: string;
  installmentPeriod: string;
  repaymentAmount: string;
  installment: string;
  loanDetails: string;

  name: string;

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
    id: "L001",
    date: "2025-08-01",
    iqamaNo: "IQ1234561",
    branch: "Dubai",
    permittedBy: "Samiul Bhai",
    approvedDate: "2025-08-02",
    repaymentFrom: "2025-09-01",
    amount: "5000",
    interestPercentage: "5",
    installmentPeriod: "12",
    repaymentAmount: "5250",
    installment: "437.5",
    loanDetails: "Personal emergency loan",
    name: "Ahmed Raza",
    status: "Approved",
    createdAt: "2025-08-01T09:00:00Z",
    updatedAt: "2025-08-02T10:00:00Z",
    draftedAt: null,
    actionMessage: "Loan approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L002",
    date: "2025-07-15",
    iqamaNo: "IQ1234562",
    branch: "Abu Dhabi",
    permittedBy: "Nazifa",
    approvedDate: "2025-07-16",
    repaymentFrom: "2025-08-01",
    amount: "3000",
    interestPercentage: "4",
    installmentPeriod: "10",
    repaymentAmount: "3120",
    installment: "312",
    loanDetails: "Medical assistance",
    name: "Fatima Noor",
    status: "Approved",
    createdAt: "2025-07-15T11:30:00Z",
    updatedAt: "2025-07-16T09:45:00Z",
    draftedAt: null,
    actionMessage: "Medical loan processed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L003",
    date: "2025-06-10",
    iqamaNo: "IQ1234563",
    branch: "Sharjah",
    permittedBy: "Samiul Bhai",
    approvedDate: "2025-06-11",
    repaymentFrom: "2025-07-01",
    amount: "4500",
    interestPercentage: "6",
    installmentPeriod: "15",
    repaymentAmount: "4770",
    installment: "318",
    loanDetails: "Loan for home repair",
    name: "Mohammed Ali",
    status: "Approved",
    createdAt: "2025-06-10T08:15:00Z",
    updatedAt: "2025-06-11T10:00:00Z",
    draftedAt: null,
    actionMessage: "Approved for home repair",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L004",
    date: "2025-08-05",
    iqamaNo: "IQ1234564",
    branch: "Dubai",
    permittedBy: "Owasima Amin",
    approvedDate: "2025-08-06",
    repaymentFrom: "2025-09-01",
    amount: "2500",
    interestPercentage: "3",
    installmentPeriod: "5",
    repaymentAmount: "2575",
    installment: "515",
    loanDetails: "Advance salary",
    name: "Sarah Khan",
    status: "Approved",
    createdAt: "2025-08-05T10:45:00Z",
    updatedAt: "2025-08-06T09:30:00Z",
    draftedAt: null,
    actionMessage: "Advance approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L005",
    date: "2025-05-20",
    iqamaNo: "IQ1234565",
    branch: "Ajman",
    permittedBy: "Nazifa",
    approvedDate: "2025-05-21",
    repaymentFrom: "2025-06-01",
    amount: "4000",
    interestPercentage: "5",
    installmentPeriod: "8",
    repaymentAmount: "4200",
    installment: "525",
    loanDetails: "Vehicle maintenance",
    name: "Bilal Hussain",
    status: "Approved",
    createdAt: "2025-05-20T07:50:00Z",
    updatedAt: "2025-05-21T10:00:00Z",
    draftedAt: null,
    actionMessage: "Loan cleared",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L006",
    date: "2025-04-01",
    iqamaNo: "IQ1234566",
    branch: "Dubai",
    permittedBy: "Samiul Bhai",
    approvedDate: "2025-04-02",
    repaymentFrom: "2025-05-01",
    amount: "6000",
    interestPercentage: "7",
    installmentPeriod: "12",
    repaymentAmount: "6420",
    installment: "535",
    loanDetails: "Wedding expenses",
    name: "Ayesha Malik",
    status: "Approved",
    createdAt: "2025-04-01T12:00:00Z",
    updatedAt: "2025-04-02T13:30:00Z",
    draftedAt: null,
    actionMessage: "Approved with note",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "L007",
    date: "2025-03-12",
    iqamaNo: "IQ1234567",
    branch: "Sharjah",
    permittedBy: "Owasima Amin",
    approvedDate: "2025-03-13",
    repaymentFrom: "2025-04-01",
    amount: "3500",
    interestPercentage: "4",
    installmentPeriod: "7",
    repaymentAmount: "3640",
    installment: "520",
    loanDetails: "Travel support",
    name: "Usman Ghani",
    status: "Approved",
    createdAt: "2025-03-12T10:00:00Z",
    updatedAt: "2025-03-13T11:00:00Z",
    draftedAt: null,
    actionMessage: "Loan for travel approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "L008",
    date: "2025-07-01",
    iqamaNo: "IQ1234568",
    branch: "Dubai",
    permittedBy: "Nazifa",
    approvedDate: "2025-07-02",
    repaymentFrom: "2025-08-01",
    amount: "3200",
    interestPercentage: "4",
    installmentPeriod: "6",
    repaymentAmount: "3328",
    installment: "554.67",
    loanDetails: "Child’s education",
    name: "Hafsa Begum",
    status: "Approved",
    createdAt: "2025-07-01T09:15:00Z",
    updatedAt: "2025-07-02T08:45:00Z",
    draftedAt: null,
    actionMessage: "Education loan",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L009",
    date: "2025-06-25",
    iqamaNo: "IQ1234569",
    branch: "Abu Dhabi",
    permittedBy: "Samiul Bhai",
    approvedDate: "2025-06-26",
    repaymentFrom: "2025-07-15",
    amount: "2800",
    interestPercentage: "3",
    installmentPeriod: "4",
    repaymentAmount: "2884",
    installment: "721",
    loanDetails: "Short-term emergency",
    name: "Tanveer Ahmed",
    status: "Approved",
    createdAt: "2025-06-25T11:00:00Z",
    updatedAt: "2025-06-26T09:20:00Z",
    draftedAt: null,
    actionMessage: "Fast-track approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L010",
    date: "2025-05-05",
    iqamaNo: "IQ1234570",
    branch: "Ajman",
    permittedBy: "Owasima Amin",
    approvedDate: "2025-05-06",
    repaymentFrom: "2025-06-01",
    amount: "3900",
    interestPercentage: "4.5",
    installmentPeriod: "9",
    repaymentAmount: "4075.5",
    installment: "453.94",
    loanDetails: "Device purchase",
    name: "Zara Shah",
    status: "Approved",
    createdAt: "2025-05-05T14:00:00Z",
    updatedAt: "2025-05-06T10:00:00Z",
    draftedAt: null,
    actionMessage: "Installments setup",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L011",
    date: "2025-04-15",
    iqamaNo: "IQ1234571",
    branch: "Dubai",
    permittedBy: "Nazifa",
    approvedDate: "2025-04-16",
    repaymentFrom: "2025-05-15",
    amount: "4700",
    interestPercentage: "6",
    installmentPeriod: "10",
    repaymentAmount: "4982",
    installment: "498.2",
    loanDetails: "Business trip",
    name: "Imran Farooq",
    status: "Approved",
    createdAt: "2025-04-15T08:00:00Z",
    updatedAt: "2025-04-16T08:00:00Z",
    draftedAt: null,
    actionMessage: "Trip budget cleared",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "L012",
    date: "2025-06-01",
    iqamaNo: "IQ1234572",
    branch: "Sharjah",
    permittedBy: "Samiul Bhai",
    approvedDate: "2025-06-02",
    repaymentFrom: "2025-07-01",
    amount: "5200",
    interestPercentage: "5",
    installmentPeriod: "11",
    repaymentAmount: "5460",
    installment: "496.36",
    loanDetails: "Tech course support",
    name: "Naila Jannat",
    status: "Approved",
    createdAt: "2025-06-01T12:00:00Z",
    updatedAt: "2025-06-02T12:30:00Z",
    draftedAt: null,
    actionMessage: "Education approved",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function LoansDataTable({
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
  const canCreate = usePermission("loans", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockTableData.map((item) => item.name))],
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "iqamaNo",
      title: "Iqama No",
      options: [...new Set(mockTableData.map((item) => item.iqamaNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("iqamaNo").localeCompare(row2.getValue("iqamaNo"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "iqamaNo",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockTableData.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "branch",
      title: "Branch",
      options: [...new Set(mockTableData.map((item) => item.branch))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "branch",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "amount",
      title: "Amount",
      options: [...new Set(mockTableData.map((item) => item.amount))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("amount").localeCompare(row2.getValue("amount"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "amount",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "interestPercentage",
      title: "Interest Percentage",
      options: [
        ...new Set(mockTableData.map((item) => item.interestPercentage)),
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
          .getValue("interestPercentage")
          .localeCompare(row2.getValue("interestPercentage"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "interestPercentage",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "installment",
      title: "Installment",
      options: [...new Set(mockTableData.map((item) => item.installment))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("installment")
          .localeCompare(row2.getValue("installment"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "installment",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "installmentPeriod",
      title: "Installment Period",
      options: [
        ...new Set(mockTableData.map((item) => item.installmentPeriod)),
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
          .getValue("installmentPeriod")
          .localeCompare(row2.getValue("installmentPeriod"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "installmentPeriod",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "approvedDate",
      title: "Approved Date",
      options: [...new Set(mockTableData.map((item) => item.approvedDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("approvedDate")
          .localeCompare(row2.getValue("approvedDate"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "approvedDate",
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
      fixedColumns={["name", "iqamaNo"]} // Pin leave types column
      pathName="project-types"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
