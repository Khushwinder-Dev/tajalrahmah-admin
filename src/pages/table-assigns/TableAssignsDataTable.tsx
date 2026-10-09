/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type AssignedTableType = {
  waiterName: string;
  tableNo: string;
  description: string;

  // same for all component
  id: string;
  status: "active" | "inactive" | "draft";
  isActive: boolean;
  isDeleted: boolean;
  isDraft: boolean;
  isUpdated: boolean;
  actionMessage: string;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
};

const mockAssignedTables: AssignedTableType[] = [
  {
    id: "w1",
    waiterName: "Rahim Uddin",
    tableNo: "T01",
    description: "Near main entrance, 2 seats",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Serving table normally.",
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2025-06-01T12:00:00Z",
    draftedAt: "",
  },
  {
    id: "w2",
    waiterName: "Karim Mia",
    tableNo: "T02",
    description: "Corner table, 4 seats",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Temporarily not assigned.",
    createdAt: "2024-11-15T09:00:00Z",
    updatedAt: "2025-04-01T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "w3",
    waiterName: "Salma Akter",
    tableNo: "T03",
    description: "Family table with 6 seats",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Draft assignment.",
    createdAt: "2025-01-05T08:30:00Z",
    updatedAt: "",
    draftedAt: "2025-01-05T08:30:00Z",
  },
  {
    id: "w4",
    waiterName: "Nayeem Hasan",
    tableNo: "T04",
    description: "Near stage, VIP zone",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Recently updated assignment.",
    createdAt: "2024-10-10T11:20:00Z",
    updatedAt: "2025-06-20T15:00:00Z",
    draftedAt: "",
  },
  {
    id: "w5",
    waiterName: "Jhumur Begum",
    tableNo: "T05",
    description: "Outdoor seating",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Waiter no longer assigned.",
    createdAt: "2024-09-18T10:45:00Z",
    updatedAt: "",
    draftedAt: "",
  },
  {
    id: "w6",
    waiterName: "Shamim Reza",
    tableNo: "T06",
    description: "Near restrooms, 4 seats",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Serving as usual.",
    createdAt: "2024-12-12T13:00:00Z",
    updatedAt: "2025-05-10T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "w7",
    waiterName: "Anika Sultana",
    tableNo: "T07",
    description: "Private booth",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Pending final assignment.",
    createdAt: "2025-02-02T07:15:00Z",
    updatedAt: "",
    draftedAt: "2025-02-02T07:15:00Z",
  },
  {
    id: "w8",
    waiterName: "Imran Hossain",
    tableNo: "T08",
    description: "Middle of main hall",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Serving with good feedback.",
    createdAt: "2025-01-20T09:40:00Z",
    updatedAt: "2025-06-10T14:00:00Z",
    draftedAt: "",
  },
  {
    id: "w9",
    waiterName: "Mim Akter",
    tableNo: "T09",
    description: "Kids area table",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Off-duty today.",
    createdAt: "2024-08-30T10:00:00Z",
    updatedAt: "2025-05-01T12:30:00Z",
    draftedAt: "",
  },
  {
    id: "w10",
    waiterName: "Fahim Chowdhury",
    tableNo: "T10",
    description: "Close to kitchen",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Assigned to kitchen-side table.",
    createdAt: "2025-03-01T10:30:00Z",
    updatedAt: "2025-06-30T09:00:00Z",
    draftedAt: "",
  },
  {
    id: "w11",
    waiterName: "Meherun Nesa",
    tableNo: "T11",
    description: "Garden view table",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Profile under preparation.",
    createdAt: "2025-04-10T08:45:00Z",
    updatedAt: "",
    draftedAt: "2025-04-10T08:45:00Z",
  },
  {
    id: "w12",
    waiterName: "Badrul Alam",
    tableNo: "T12",
    description: "Executive lounge table",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Recently updated for VIP service.",
    createdAt: "2025-01-01T07:00:00Z",
    updatedAt: "2025-07-01T11:00:00Z",
    draftedAt: "",
  },
];

export default function TableAssignsDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
}) {
  const componentColumns = [
    {
      accessorKey: "tableNo",
      title: "Table No",
      options: [...new Set(mockAssignedTables.map((item) => item.tableNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("tableNo").localeCompare(row2.getValue("tableNo"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "tableNo",
      },
    },
    {
      accessorKey: "waiterName",
      title: "Waiter Name",
      options: [...new Set(mockAssignedTables.map((item) => item.waiterName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("waiterName")
          .localeCompare(row2.getValue("waiterName"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "waiterName",
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockAssignedTables.map((item) => item.description))],
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
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "description",
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: ["active", "inactive", "draft"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 80,
      meta: {
        exportLabel: "status",
      },
    },

    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("createdAt")
          .localeCompare(row2.getValue("createdAt"));
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("updatedAt")
          .localeCompare(row2.getValue("updatedAt"));
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("draftedAt")
          .localeCompare(row2.getValue("draftedAt"));
      },
    },
  ];

  const filteredData = mockAssignedTables.filter((assignedTable) => {
    if (dataTableFilter.status === "Active") {
      return assignedTable.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !assignedTable.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return assignedTable.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return assignedTable.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return assignedTable.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={[]} // Pin country name column
    />
  );
}
