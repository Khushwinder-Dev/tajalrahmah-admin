/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TableDataType = {
  id: string;

  description: string;
  netWeight: string;
  totalCTN: string;
  totalPCS: string;
  artWork: string;
  piNoImage: string;

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

const mockTableData: TableDataType[] = [
  {
    id: "1",
    description: "Men's Cotton T-Shirt",
    netWeight: "12.5",
    totalCTN: "25",
    totalPCS: "600",
    artWork: "artwork1.png",
    piNoImage: "pi1.png",
    status: "Active",
    createdAt: "2025-08-01T10:00:00Z",
    updatedAt: "2025-08-05T12:00:00Z",
    draftedAt: null,
    actionMessage: "Created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    description: "Ladies Denim Jeans",
    netWeight: "20.0",
    totalCTN: "30",
    totalPCS: "450",
    artWork: "artwork2.png",
    piNoImage: "pi2.png",
    status: "Active",
    createdAt: "2025-08-02T09:30:00Z",
    updatedAt: "2025-08-06T11:00:00Z",
    draftedAt: null,
    actionMessage: "Record updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    description: "Children's Hoodie",
    netWeight: "15.7",
    totalCTN: "18",
    totalPCS: "360",
    artWork: "artwork3.png",
    piNoImage: "pi3.png",
    status: "Draft",
    createdAt: "2025-08-03T14:00:00Z",
    updatedAt: "2025-08-04T09:00:00Z",
    draftedAt: "2025-08-04T09:00:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    description: "Winter Jackets",
    netWeight: "50.2",
    totalCTN: "40",
    totalPCS: "500",
    artWork: "artwork4.png",
    piNoImage: "pi4.png",
    status: "Deleted",
    createdAt: "2025-08-01T16:00:00Z",
    updatedAt: "2025-08-07T12:00:00Z",
    draftedAt: null,
    actionMessage: "Deleted by admin",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    description: "Sports Shoes",
    netWeight: "10.3",
    totalCTN: "22",
    totalPCS: "300",
    artWork: "artwork5.png",
    piNoImage: "pi5.png",
    status: "Active",
    createdAt: "2025-08-02T08:45:00Z",
    updatedAt: "2025-08-05T13:00:00Z",
    draftedAt: null,
    actionMessage: "Re-activated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    description: "Leather Belts",
    netWeight: "7.8",
    totalCTN: "12",
    totalPCS: "240",
    artWork: "artwork6.png",
    piNoImage: "pi6.png",
    status: "Active",
    createdAt: "2025-08-03T11:00:00Z",
    updatedAt: "2025-08-04T15:00:00Z",
    draftedAt: null,
    actionMessage: "Created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    description: "Canvas Bags",
    netWeight: "9.5",
    totalCTN: "15",
    totalPCS: "350",
    artWork: "artwork7.png",
    piNoImage: "pi7.png",
    status: "Draft",
    createdAt: "2025-08-05T10:00:00Z",
    updatedAt: "2025-08-05T12:00:00Z",
    draftedAt: "2025-08-05T12:00:00Z",
    actionMessage: "Draft in progress",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    description: "Formal Shirts",
    netWeight: "14.4",
    totalCTN: "28",
    totalPCS: "420",
    artWork: "artwork8.png",
    piNoImage: "pi8.png",
    status: "Active",
    createdAt: "2025-08-01T09:00:00Z",
    updatedAt: "2025-08-07T14:30:00Z",
    draftedAt: null,
    actionMessage: "Updated stock count",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    description: "Woolen Caps",
    netWeight: "4.1",
    totalCTN: "10",
    totalPCS: "200",
    artWork: "artwork9.png",
    piNoImage: "pi9.png",
    status: "Deleted",
    createdAt: "2025-08-02T13:00:00Z",
    updatedAt: "2025-08-06T16:00:00Z",
    draftedAt: null,
    actionMessage: "Deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    description: "Travel Backpacks",
    netWeight: "18.9",
    totalCTN: "20",
    totalPCS: "380",
    artWork: "artwork10.png",
    piNoImage: "pi10.png",
    status: "Active",
    createdAt: "2025-08-04T11:30:00Z",
    updatedAt: "2025-08-08T15:00:00Z",
    draftedAt: null,
    actionMessage: "Created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    description: "Office Trousers",
    netWeight: "13.6",
    totalCTN: "24",
    totalPCS: "410",
    artWork: "artwork11.png",
    piNoImage: "pi11.png",
    status: "Active",
    createdAt: "2025-08-06T08:00:00Z",
    updatedAt: "2025-08-07T11:30:00Z",
    draftedAt: null,
    actionMessage: "Updated successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    description: "Sunglasses",
    netWeight: "6.2",
    totalCTN: "8",
    totalPCS: "160",
    artWork: "artwork12.png",
    piNoImage: "pi12.png",
    status: "Draft",
    createdAt: "2025-08-07T10:00:00Z",
    updatedAt: "2025-08-07T12:00:00Z",
    draftedAt: "2025-08-07T12:00:00Z",
    actionMessage: "Draft created",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function DocumentsDataTable({
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
  const canCreate = usePermission("goods", "create");

  const componentColumns = [
    {
      accessorKey: "totalCTN",
      title: "Total CTN",
      options: [...new Set(mockTableData.map((item) => item.totalCTN))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("totalCTN")
          .localeCompare(row2.getValue("totalCTN"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "totalCTN",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "totalPCS",
      title: "Total PCS",
      options: [...new Set(mockTableData.map((item) => item.totalPCS))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("totalPCS")
          .localeCompare(row2.getValue("totalPCS"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "totalPCS",
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
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "description",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "netWeight",
      title: "Net Weight",
      options: [...new Set(mockTableData.map((item) => item.netWeight))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("netWeight")
          .localeCompare(row2.getValue("netWeight"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "netWeight",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "artWork",
      title: "Art Work",
      options: [...new Set(mockTableData.map((item) => item.artWork))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("artWork").localeCompare(row2.getValue("artWork"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "artWork",
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
      fixedColumns={["totalCTN", "totalPCS"]} // Pin leave types column
      pathName="goods"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
