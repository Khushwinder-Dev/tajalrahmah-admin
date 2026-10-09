/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const checkoutData = [
  {
    id: "1",
    roomNo: "101",
    guestName: "Ahmed Al-Mansouri",
    checkInDate: "2024-01-15",
    checkOutDate: "2024-01-18",
    roomType: "Deluxe",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    roomNo: "205",
    guestName: "Sarah Johnson",
    checkInDate: "2024-01-16",
    checkOutDate: "2024-01-19",
    roomType: "Family Suite",
    status: "Active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    roomNo: "301",
    guestName: "Dr. Mohammed Al-Rashid",
    checkInDate: "2024-01-17",
    checkOutDate: "2024-01-20",
    roomType: "Executive",
    status: "Active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    roomNo: "401",
    guestName: "Fatima Hassan",
    checkInDate: "2024-01-18",
    checkOutDate: "2024-01-25",
    roomType: "Medical Suite",
    status: "Inactive",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    roomNo: "501",
    guestName: "The Al-Zahra Family",
    checkInDate: "2024-01-19",
    checkOutDate: "2024-01-26",
    roomType: "Budget",
    status: "Active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    roomNo: "601",
    guestName: "James Wilson",
    checkInDate: "2024-01-20",
    checkOutDate: "2024-01-23",
    roomType: "Standard",
    status: "Active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    roomNo: "701",
    guestName: "Layla Al-Mahmoud",
    checkInDate: "2024-01-21",
    checkOutDate: "2024-01-24",
    roomType: "Deluxe",
    status: "Inactive",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    roomNo: "801",
    guestName: "Carlos Rodriguez",
    checkInDate: "2024-01-22",
    checkOutDate: "2024-01-25",
    roomType: "Standard",
    status: "Active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    roomNo: "901",
    guestName: "Aisha Al-Nasser",
    checkInDate: "2024-01-23",
    checkOutDate: "2024-01-28",
    roomType: "Executive",
    status: "Active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    roomNo: "1001",
    guestName: "Elena Petrov",
    checkInDate: "2024-01-24",
    checkOutDate: "2024-01-29",
    roomType: "Studio",
    status: "Inactive",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    roomNo: "1101",
    guestName: "Professor David Chen",
    checkInDate: "2024-01-25",
    checkOutDate: "2024-01-28",
    roomType: "Standard",
    status: "Active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    roomNo: "1201",
    guestName: "Raj Patel & Family",
    checkInDate: "2024-01-26",
    checkOutDate: "2024-01-29",
    roomType: "Medical Suite",
    status: "Active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    roomNo: "1301",
    guestName: "Maria Garcia",
    checkInDate: "2024-01-27",
    checkOutDate: "2024-01-30",
    roomType: "Deluxe",
    status: "Active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    roomNo: "1401",
    guestName: "Ali Hassan",
    checkInDate: "2024-01-28",
    checkOutDate: "2024-01-31",
    roomType: "Suite",
    status: "Active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    roomNo: "1501",
    guestName: "Sophie Martin",
    checkInDate: "2024-01-29",
    checkOutDate: "2024-02-01",
    roomType: "Standard",
    status: "Active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    roomNo: "1601",
    guestName: "Omar Khalil",
    checkInDate: "2024-01-30",
    checkOutDate: "2024-02-02",
    roomType: "Accessible",
    status: "Inactive",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    roomNo: "1701",
    guestName: "Lisa Thompson",
    checkInDate: "2024-01-31",
    checkOutDate: "2024-02-03",
    roomType: "Family",
    status: "Active",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    roomNo: "1801",
    guestName: "Ahmed Saleh",
    checkInDate: "2024-02-01",
    checkOutDate: "2024-02-04",
    roomType: "Budget",
    status: "Active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    roomNo: "1901",
    guestName: "Emma Wilson",
    checkInDate: "2024-02-02",
    checkOutDate: "2024-02-05",
    roomType: "Deluxe",
    status: "Active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    roomNo: "2001",
    guestName: "Hassan Al-Rashid",
    checkInDate: "2024-02-03",
    checkOutDate: "2024-02-06",
    roomType: "Standard",
    status: "Inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function CheckoutDataTable({
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
  const canCreate = usePermission("checkout", "create");

  const componentColumns = [
    {
      accessorKey: "roomNo",
      title: "Room No",
      options: [...new Set(checkoutData.map((item) => item.roomNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("roomNo").localeCompare(row2.getValue("roomNo"));
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "roomNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "guestName",
      title: "Guest Name",
      options: [...new Set(checkoutData.map((item) => item.guestName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("guestName")
          .localeCompare(row2.getValue("guestName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "guestName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "checkInDate",
      title: "Check In Date",
      options: [...new Set(checkoutData.map((item) => item.checkInDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("checkInDate")
          .localeCompare(row2.getValue("checkInDate"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "checkInDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "checkOutDate",
      title: "Check Out Date",
      options: [...new Set(checkoutData.map((item) => item.checkOutDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("checkOutDate")
          .localeCompare(row2.getValue("checkOutDate"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "checkOutDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "roomType",
      title: "Room Type",
      options: [...new Set(checkoutData.map((item) => item.roomType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("roomType")
          .localeCompare(row2.getValue("roomType"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "roomType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(checkoutData.map((item) => item.status))],
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

  const filteredData = checkoutData.filter((checkout) => {
    if (dataTableFilter.status === "Active") {
      return checkout.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !checkout.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return checkout.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return checkout.isUpdated;
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
      fixedColumns={["roomNo"]} // Pin Room No column
      pathName="checkout"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
