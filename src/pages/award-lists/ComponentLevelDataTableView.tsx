/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  awardName: string;
  employeeName: string;
  awardBy: string;
  date: string;
  giftItem: string;
  awardDescription: string;

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
    awardName: "Employee of the Month",
    employeeName: "Rakib Hasan",
    awardBy: "HR Department",
    date: "2025-01-15",
    giftItem: "Gold Medal",
    awardDescription: "For outstanding performance and punctuality.",
    status: "Active",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
    draftedAt: null,
    actionMessage: "Award published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    awardName: "Best Team Player",
    employeeName: "Nusrat Jahan",
    awardBy: "Team Lead",
    date: "2025-02-05",
    giftItem: "Smart Watch",
    awardDescription: "For exceptional collaboration with team members.",
    status: "Draft",
    createdAt: "2025-02-05T11:30:00Z",
    updatedAt: "2025-02-05T11:30:00Z",
    draftedAt: "2025-02-05T11:00:00Z",
    actionMessage: "Draft saved but not published.",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    awardName: "Innovation Award",
    employeeName: "Shakib Al Amin",
    awardBy: "CTO",
    date: "2025-03-10",
    giftItem: "Laptop",
    awardDescription: "For developing an innovative internal tool.",
    status: "Updated",
    createdAt: "2025-03-10T09:00:00Z",
    updatedAt: "2025-03-15T14:00:00Z",
    draftedAt: null,
    actionMessage: "Award details updated.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    awardName: "Customer Excellence Award",
    employeeName: "Farhana Akter",
    awardBy: "Customer Success Dept.",
    date: "2025-04-02",
    giftItem: "Dinner Voucher",
    awardDescription: "For receiving highest customer satisfaction ratings.",
    status: "Deleted",
    createdAt: "2025-04-02T13:20:00Z",
    updatedAt: "2025-04-10T10:00:00Z",
    draftedAt: null,
    actionMessage: "Award entry deleted.",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    awardName: "Leadership Award",
    employeeName: "Mahmudul Hasan",
    awardBy: "CEO",
    date: "2025-04-28",
    giftItem: "iPad",
    awardDescription: "For showing exceptional leadership skills.",
    status: "Active",
    createdAt: "2025-04-28T12:00:00Z",
    updatedAt: "2025-04-28T12:00:00Z",
    draftedAt: null,
    actionMessage: "Award published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    awardName: "Rising Star",
    employeeName: "Jannatul Ferdous",
    awardBy: "Project Manager",
    date: "2025-05-12",
    giftItem: "Bluetooth Speaker",
    awardDescription: "For impressive growth within short time.",
    status: "Draft",
    createdAt: "2025-05-12T15:40:00Z",
    updatedAt: "2025-05-12T15:40:00Z",
    draftedAt: "2025-05-12T15:00:00Z",
    actionMessage: "Draft saved but not published.",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    awardName: "Best Attendance",
    employeeName: "Abdullah Al Mamun",
    awardBy: "HR Department",
    date: "2025-05-30",
    giftItem: "Backpack",
    awardDescription: "For maintaining 100% attendance record.",
    status: "Active",
    createdAt: "2025-05-30T08:10:00Z",
    updatedAt: "2025-05-30T08:10:00Z",
    draftedAt: null,
    actionMessage: "Award published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    awardName: "Top Performer Award",
    employeeName: "Mizanur Rahman",
    awardBy: "Department Head",
    date: "2025-06-14",
    giftItem: "Shopping Voucher",
    awardDescription: "For consistently achieving quarterly targets.",
    status: "Updated",
    createdAt: "2025-06-14T09:30:00Z",
    updatedAt: "2025-06-20T14:00:00Z",
    draftedAt: null,
    actionMessage:
      "Gift item changed from 'Dinner Voucher' to 'Shopping Voucher'.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    awardName: "Mentorship Award",
    employeeName: "Sharmin Sultana",
    awardBy: "Training Dept.",
    date: "2025-07-05",
    giftItem: "Book Set",
    awardDescription: "For mentoring junior employees effectively.",
    status: "Active",
    createdAt: "2025-07-05T11:00:00Z",
    updatedAt: "2025-07-05T11:00:00Z",
    draftedAt: null,
    actionMessage: "Award published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    awardName: "Long Service Award",
    employeeName: "Kamrul Hasan",
    awardBy: "CEO",
    date: "2025-07-20",
    giftItem: "Gold Watch",
    awardDescription: "For completing 10 years of service with dedication.",
    status: "Deleted",
    createdAt: "2025-07-20T10:30:00Z",
    updatedAt: "2025-07-25T09:00:00Z",
    draftedAt: null,
    actionMessage: "Award deleted by admin.",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "11",
    awardName: "Creative Designer Award",
    employeeName: "Tasnim Ahmed",
    awardBy: "Design Dept.",
    date: "2025-08-01",
    giftItem: "Graphic Tablet",
    awardDescription: "For exceptional creativity in design projects.",
    status: "Active",
    createdAt: "2025-08-01T09:45:00Z",
    updatedAt: "2025-08-01T09:45:00Z",
    draftedAt: null,
    actionMessage: "Award published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    awardName: "Best Problem Solver",
    employeeName: "Rafiq Uddin",
    awardBy: "Operations Dept.",
    date: "2025-08-15",
    giftItem: "Noise-Cancelling Headphones",
    awardDescription: "For resolving critical issues under pressure.",
    status: "Updated",
    createdAt: "2025-08-15T12:00:00Z",
    updatedAt: "2025-08-18T09:00:00Z",
    draftedAt: null,
    actionMessage: "Award description updated.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function ComponentLevelDataTableView({
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
  const canCreate = usePermission("awardLists", "create");

  const componentColumns = [
    {
      accessorKey: "awardName",
      title: "Award Name",
      options: [...new Set(mockTableData.map((item) => item.awardName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("awardName")
          .localeCompare(row2.getValue("awardName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "awardName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "employeeName",
      title: "Employee Name",
      options: [...new Set(mockTableData.map((item) => item.employeeName))],
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
      minSize: 150,
      meta: {
        exportLabel: "employeeName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "awardBy",
      title: "Award By",
      options: [...new Set(mockTableData.map((item) => item.awardBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("awardBy").localeCompare(row2.getValue("awardBy"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "awardBy",
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
      minSize: 180,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "giftItem",
      title: "Gift Item",
      options: [...new Set(mockTableData.map((item) => item.giftItem))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("giftItem")
          .localeCompare(row2.getValue("giftItem"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "giftItem",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "awardDescription",
      title: "Award Description",
      options: [...new Set(mockTableData.map((item) => item.awardDescription))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("awardDescription")
          .localeCompare(row2.getValue("awardDescription"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "awardDescription",
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
      fixedColumns={["awardName", "employeeName"]} // Pin leave types column
      pathName="award-lists"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
