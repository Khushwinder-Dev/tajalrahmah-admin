/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  number: string;
  journalDate: string;
  journalEntry: string;
  reference: string;
  totalCycles: string;

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
    journalDate: "2025-08-01",
    number: "10001",
    journalEntry: "FastShip Ltd.",
    totalCycles: "5",
    reference: "Md. Rahim",
    status: "Active",
    createdAt: "2025-08-01T09:15:00Z",
    updatedAt: "2025-08-01T10:00:00Z",
    draftedAt: null,
    actionMessage: "Shipment created",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    journalDate: "2025-08-02",
    number: "10002",
    journalEntry: "Creative Logistics",
    totalCycles: "3",
    reference: "Nusrat Jahan",
    status: "Active",
    createdAt: "2025-08-02T11:20:00Z",
    updatedAt: "2025-08-02T12:00:00Z",
    draftedAt: null,
    actionMessage: "Shipment booked",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    journalDate: "2025-08-03",
    number: "10003",
    journalEntry: "SkyNet Courier",
    totalCycles: "7",
    reference: "Jahidul Islam",
    status: "Inactive",
    createdAt: "2025-08-03T08:45:00Z",
    updatedAt: "2025-08-03T09:00:00Z",
    draftedAt: null,
    actionMessage: "Shipment cancelled",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "4",
    journalDate: "2025-08-04",
    number: "10004",
    journalEntry: "Khulna Express",
    totalCycles: "4",
    reference: "Hasan Mahmud",
    status: "Pending",
    createdAt: "2025-08-04T13:10:00Z",
    updatedAt: "2025-08-04T13:15:00Z",
    draftedAt: null,
    actionMessage: "Awaiting pickup",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "5",
    journalDate: "2025-08-05",
    number: "10005",
    journalEntry: "Metro Logistics",
    totalCycles: "6",
    reference: "Sabbir Ahmed",
    status: "Active",
    createdAt: "2025-08-05T15:00:00Z",
    updatedAt: "2025-08-05T15:30:00Z",
    draftedAt: null,
    actionMessage: "Shipment confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    journalDate: "2025-08-06",
    number: "10006",
    journalEntry: "Sylhet Cargo",
    totalCycles: "8",
    reference: "Rashid Khan",
    status: "Active",
    createdAt: "2025-08-06T12:10:00Z",
    updatedAt: "2025-08-06T12:30:00Z",
    draftedAt: null,
    actionMessage: "Shipment dispatched",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    journalDate: "2025-08-07",
    number: "10007",
    journalEntry: "Prime Logistics",
    totalCycles: "9",
    reference: "Rahim Uddin",
    status: "Active",
    createdAt: "2025-08-07T10:45:00Z",
    updatedAt: "2025-08-07T11:00:00Z",
    draftedAt: null,
    actionMessage: "Updated customer details",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    journalDate: "2025-08-08",
    number: "10008",
    journalEntry: "Chittagong Express",
    totalCycles: "2",
    reference: "Sabbir Hossain",
    status: "Inactive",
    createdAt: "2025-08-08T14:00:00Z",
    updatedAt: "2025-08-08T14:10:00Z",
    draftedAt: null,
    actionMessage: "Shipment disabled",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function JournalEntryDataTable({
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
  const canCreate = usePermission("expenses", "create");

  const componentColumns = [
    {
      accessorKey: "number",
      title: "S.Number",
      options: [...new Set(mockTableData.map((item) => item.number))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("number").localeCompare(row2.getValue("number"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "number",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "journalEntry",
      title: "Journal Entry",
      options: [...new Set(mockTableData.map((item) => item.journalEntry))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("journalEntry")
          .localeCompare(row2.getValue("journalEntry"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "journalEntry",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "journalDate",
      title: "Journal Date",
      options: [...new Set(mockTableData.map((item) => item.journalDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("journalDate")
          .localeCompare(row2.getValue("journalDate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "journalDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "totalCycles",
      title: "Total Cycles",
      options: [...new Set(mockTableData.map((item) => item.totalCycles))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("totalCycles")
          .localeCompare(row2.getValue("totalCycles"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "totalCycles",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "reference",
      title: "Reference",
      options: [...new Set(mockTableData.map((item) => item.reference))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("reference")
          .localeCompare(row2.getValue("reference"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "reference",
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
      fixedColumns={["name"]} // Pin leave types column
      pathName="journal-entry"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
