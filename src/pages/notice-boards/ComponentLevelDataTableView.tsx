/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  noticeType: string;
  noticeBy: string;
  noticeDate: string;
  description: string;

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
    noticeType: "General Notice",
    noticeBy: "HR Department",
    noticeDate: "2025-01-10",
    description:
      "All employees are requested to update their emergency contact details.",
    status: "Active",
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-10T09:00:00Z",
    draftedAt: null,
    actionMessage: "Notice published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    noticeType: "Holiday Notice",
    noticeBy: "Admin Office",
    noticeDate: "2025-02-18",
    description:
      "The office will remain closed on International Mother Language Day.",
    status: "Draft",
    createdAt: "2025-02-18T10:30:00Z",
    updatedAt: "2025-02-18T10:30:00Z",
    draftedAt: "2025-02-18T09:50:00Z",
    actionMessage: "Draft saved but not published.",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    noticeType: "Meeting Notice",
    noticeBy: "CEO Office",
    noticeDate: "2025-03-01",
    description:
      "Board meeting scheduled on 5th March, 10 AM in Conference Room A.",
    status: "Updated",
    createdAt: "2025-03-01T08:00:00Z",
    updatedAt: "2025-03-03T14:00:00Z",
    draftedAt: null,
    actionMessage: "Meeting time updated from 9 AM to 10 AM.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    noticeType: "Policy Update",
    noticeBy: "HR Department",
    noticeDate: "2025-03-12",
    description: "Updated remote work policy effective from 15th March 2025.",
    status: "Deleted",
    createdAt: "2025-03-12T11:00:00Z",
    updatedAt: "2025-03-14T09:00:00Z",
    draftedAt: null,
    actionMessage: "Notice removed by admin.",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    noticeType: "Training Notice",
    noticeBy: "Training Department",
    noticeDate: "2025-04-02",
    description:
      "Mandatory cybersecurity training scheduled for all employees.",
    status: "Active",
    createdAt: "2025-04-02T09:30:00Z",
    updatedAt: "2025-04-02T09:30:00Z",
    draftedAt: null,
    actionMessage: "Notice published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    noticeType: "Holiday Notice",
    noticeBy: "Admin Office",
    noticeDate: "2025-04-15",
    description: "Office will remain closed on Pahela Baishakh.",
    status: "Draft",
    createdAt: "2025-04-15T14:00:00Z",
    updatedAt: "2025-04-15T14:00:00Z",
    draftedAt: "2025-04-15T13:30:00Z",
    actionMessage: "Draft created but not finalized.",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    noticeType: "General Notice",
    noticeBy: "Admin Office",
    noticeDate: "2025-05-10",
    description: "Parking area renovation will start from next week.",
    status: "Active",
    createdAt: "2025-05-10T07:45:00Z",
    updatedAt: "2025-05-10T07:45:00Z",
    draftedAt: null,
    actionMessage: "Notice published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    noticeType: "Event Notice",
    noticeBy: "Cultural Committee",
    noticeDate: "2025-06-01",
    description: "Annual cultural program will be held on 10th June.",
    status: "Updated",
    createdAt: "2025-06-01T12:15:00Z",
    updatedAt: "2025-06-05T10:00:00Z",
    draftedAt: null,
    actionMessage: "Venue changed from Hall A to Hall B.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    noticeType: "Meeting Notice",
    noticeBy: "Finance Department",
    noticeDate: "2025-06-18",
    description: "Quarterly financial review meeting on 20th June, 2 PM.",
    status: "Active",
    createdAt: "2025-06-18T09:50:00Z",
    updatedAt: "2025-06-18T09:50:00Z",
    draftedAt: null,
    actionMessage: "Notice published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    noticeType: "Policy Update",
    noticeBy: "IT Department",
    noticeDate: "2025-07-05",
    description: "Password reset policy updated. Stronger passwords required.",
    status: "Deleted",
    createdAt: "2025-07-05T16:00:00Z",
    updatedAt: "2025-07-07T12:00:00Z",
    draftedAt: null,
    actionMessage: "Notice deleted by IT Admin.",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "11",
    noticeType: "General Notice",
    noticeBy: "Admin Office",
    noticeDate: "2025-07-25",
    description: "Cafeteria menu updated with healthier options.",
    status: "Active",
    createdAt: "2025-07-25T08:30:00Z",
    updatedAt: "2025-07-25T08:30:00Z",
    draftedAt: null,
    actionMessage: "Notice published successfully.",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    noticeType: "Event Notice",
    noticeBy: "Sports Committee",
    noticeDate: "2025-08-12",
    description: "Annual sports day will be organized on 20th August.",
    status: "Updated",
    createdAt: "2025-08-12T11:20:00Z",
    updatedAt: "2025-08-15T09:00:00Z",
    draftedAt: null,
    actionMessage: "Event date changed from 18th to 20th August.",
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
      accessorKey: "noticeType",
      title: "Notice Type",
      options: [...new Set(mockTableData.map((item) => item.noticeType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("noticeType")
          .localeCompare(row2.getValue("noticeType"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "noticeType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "noticeBy",
      title: "Notice By",
      options: [...new Set(mockTableData.map((item) => item.noticeBy))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("noticeBy")
          .localeCompare(row2.getValue("noticeBy"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "noticeBy",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "noticeDate",
      title: "Notice Date",
      options: [...new Set(mockTableData.map((item) => item.noticeDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("noticeDate")
          .localeCompare(row2.getValue("noticeDate"));
      },
      size: 200,
      minSize: 180,
      meta: {
        exportLabel: "noticeDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockTableData.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 200,
      minSize: 180,
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
      fixedColumns={["noticeType", "noticeBy"]} // Pin leave types column
      pathName="notice-boards"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
