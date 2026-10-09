/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type Waiter = {
  code: string;
  name: string;
  photo: string;

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

const mockWaitersData: Waiter[] = [
  {
    id: "w1",
    code: "WT001",
    name: "Rahim Uddin",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Waiter is currently serving customers.",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-22",
    draftedAt: "",
  },
  {
    id: "w2",
    code: "WT002",
    name: "Karim Mia",
    photo: "/customer-dummy-image.jpg",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Waiter is currently not assigned.",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-22",
    draftedAt: "",
  },
  {
    id: "w3",
    code: "WT003",
    name: "Salma Akter",
    photo: "/customer-dummy-image.jpg",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiter profile is in draft state.",
    createdAt: "2023-08-22",
    updatedAt: "",
    draftedAt: "2023-08-22",
  },
  {
    id: "w4",
    code: "WT004",
    name: "Nayeem Hasan",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Waiter profile was recently updated.",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-22",
    draftedAt: "",
  },
  {
    id: "w5",
    code: "WT005",
    name: "Jhumur Begum",
    photo: "/customer-dummy-image.jpg",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Waiter has been removed.",
    createdAt: "2023-08-22",
    updatedAt: "",
    draftedAt: "",
  },
  {
    id: "w6",
    code: "WT006",
    name: "Shamim Reza",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Waiter is on duty.",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-22",
    draftedAt: "",
  },
  {
    id: "w7",
    code: "WT007",
    name: "Anika Sultana",
    photo: "/customer-dummy-image.jpg",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiter profile needs completion.",
    createdAt: "2023-08-22",
    updatedAt: "",
    draftedAt: "2023-08-22",
  },
  {
    id: "w8",
    code: "WT008",
    name: "Imran Hossain",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Waiter is performing well.",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-22",
    draftedAt: "",
  },
  {
    id: "w9",
    code: "WT009",
    name: "Mim Akter",
    photo: "/customer-dummy-image.jpg",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Waiter temporarily suspended.",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-22",
    draftedAt: "",
  },
  {
    id: "w10",
    code: "WT010",
    name: "Fahim Chowdhury",
    photo: "/customer-dummy-image.jpg",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Waiter recently joined.",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-22",
    draftedAt: "",
  },
];

export default function WaitersDataTable({
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
      accessorKey: "code",
      title: "Code",
      options: [...new Set(mockWaitersData.map((item) => item.code))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("code").localeCompare(row2.getValue("code"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "code",
      },
    },
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockWaitersData.map((item) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "name",
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

  const filteredData = mockWaitersData.filter((waiter) => {
    if (dataTableFilter.status === "Active") {
      return waiter.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !waiter.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return waiter.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return waiter.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return waiter.isUpdated;
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
