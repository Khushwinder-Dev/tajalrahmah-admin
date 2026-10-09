/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const packingData = [
  {
    id: "1",
    sn: "001",
    documentName: "Packing List - Electronics",
    selectFile: "electronics_packing.pdf",
    status: "Active",
    date: "2024-01-15",
    loginId: "user001",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    sn: "002",
    documentName: "Packing List - Clothing",
    selectFile: "clothing_packing.pdf",
    status: "Inactive",
    date: "2024-01-16",
    loginId: "user002",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    sn: "003",
    documentName: "Packing List - Furniture",
    selectFile: "furniture_packing.pdf",
    status: "Active",
    date: "2024-01-17",
    loginId: "user003",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    sn: "004",
    documentName: "Packing List - Books",
    selectFile: "books_packing.pdf",
    status: "Deleted",
    date: "2024-01-18",
    loginId: "user004",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isActive: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    sn: "005",
    documentName: "Packing List - Toys",
    selectFile: "toys_packing.pdf",
    status: "Active",
    date: "2024-01-19",
    loginId: "user005",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    sn: "006",
    documentName: "Packing List - Kitchen",
    selectFile: "kitchen_packing.pdf",
    status: "Approved",
    date: "2024-01-20",
    loginId: "user006",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    sn: "007",
    documentName: "Packing List - Garden",
    selectFile: "garden_packing.pdf",
    status: "In Transit",
    date: "2024-01-21",
    loginId: "user007",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    sn: "008",
    documentName: "Packing List - Sports",
    selectFile: "sports_packing.pdf",
    status: "Pending",
    date: "2024-01-22",
    loginId: "user008",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    sn: "009",
    documentName: "Packing List - Tools",
    selectFile: "tools_packing.pdf",
    status: "Approved",
    date: "2024-01-23",
    loginId: "user009",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    sn: "010",
    documentName: "Packing List - Art",
    selectFile: "art_packing.pdf",
    status: "In Transit",
    date: "2024-01-24",
    loginId: "user010",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    sn: "011",
    documentName: "Packing List - Music",
    selectFile: "music_packing.pdf",
    status: "Delivered",
    date: "2024-01-25",
    loginId: "user011",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    sn: "012",
    documentName: "Packing List - Jewelry",
    selectFile: "jewelry_packing.pdf",
    status: "Pending",
    date: "2024-01-26",
    loginId: "user012",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    sn: "013",
    documentName: "Packing List - Electronics",
    selectFile: "electronics_packing.pdf",
    status: "Approved",
    date: "2024-01-27",
    loginId: "user013",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    sn: "014",
    documentName: "Packing List - Clothing",
    selectFile: "clothing_packing.pdf",
    status: "In Transit",
    date: "2024-01-28",
    loginId: "user014",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    sn: "015",
    documentName: "Packing List - Furniture",
    selectFile: "furniture_packing.pdf",
    status: "Delivered",
    date: "2024-01-29",
    loginId: "user015",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    sn: "016",
    documentName: "Packing List - Books",
    selectFile: "books_packing.pdf",
    status: "Pending",
    date: "2024-01-30",
    loginId: "user016",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    sn: "017",
    documentName: "Packing List - Toys",
    selectFile: "toys_packing.pdf",
    status: "Approved",
    date: "2024-01-31",
    loginId: "user017",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    sn: "018",
    documentName: "Packing List - Kitchen",
    selectFile: "kitchen_packing.pdf",
    status: "In Transit",
    date: "2024-02-01",
    loginId: "user018",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    sn: "019",
    documentName: "Packing List - Garden",
    selectFile: "garden_packing.pdf",
    status: "Delivered",
    date: "2024-02-02",
    loginId: "user019",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    sn: "020",
    documentName: "Packing List - Sports",
    selectFile: "sports_packing.pdf",
    status: "Pending",
    date: "2024-02-03",
    loginId: "user020",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function PackingDataTable({
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
  setShowFilter: (setShowFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (setShowVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("packing", "create");

  const componentColumns = [
    {
      accessorKey: "sn",
      title: "SN",
      options: [...new Set(packingData.map((item) => item.sn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("sn").localeCompare(row2.getValue("sn"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "sn",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "documentName",
      title: "Document Name",
      options: [...new Set(packingData.map((item) => item.documentName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("documentName")
          .localeCompare(row2.getValue("documentName"));
      },
      size: 300,
      minSize: 250,
      meta: {
        exportLabel: "documentName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "selectFile",
      title: "Select File",
      options: [...new Set(packingData.map((item) => item.selectFile))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("selectFile")
          .localeCompare(row2.getValue("selectFile"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "selectFile",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(packingData.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "status",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(packingData.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "loginId",
      title: "Login ID",
      options: [...new Set(packingData.map((item) => item.loginId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("loginId").localeCompare(row2.getValue("loginId"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "loginId",
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
      size: 150,
      minSize: 120,
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = packingData.filter((packing) => {
    if (dataTableFilter.status === "Active") {
      return packing.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !packing.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return packing.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return packing.isUpdated;
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
      fixedColumns={["sn"]} // Pin SN column
      pathName="packing"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
