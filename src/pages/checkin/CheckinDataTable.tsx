/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const checkinData = [
  {
    id: "1",
    bookingNo: "BK001",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    arrivalFrom: "Dubai, UAE",
    bookingType: "Online",
    bookingReference: "REF001",
    bookingRefNo: "BRN001",
    purposeOfVisit: "Business",
    remarks: "VIP Guest",
    roomType: "Deluxe",
    roomNo: "101",
    adults: 2,
    children: 1,
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    bookingNo: "BK002",
    checkIn: "2024-01-16",
    checkOut: "2024-01-19",
    arrivalFrom: "Riyadh, KSA",
    bookingType: "Phone",
    bookingReference: "REF002",
    bookingRefNo: "BRN002",
    purposeOfVisit: "Leisure",
    remarks: "Honeymoon",
    roomType: "Suite",
    roomNo: "201",
    adults: 2,
    children: 0,
    status: "Active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    bookingNo: "BK003",
    checkIn: "2024-01-17",
    checkOut: "2024-01-20",
    arrivalFrom: "Kuwait City",
    bookingType: "Walk-in",
    bookingReference: "REF003",
    bookingRefNo: "BRN003",
    purposeOfVisit: "Conference",
    remarks: "Speaker",
    roomType: "Standard",
    roomNo: "301",
    adults: 1,
    children: 0,
    status: "Active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    bookingNo: "BK004",
    checkIn: "2024-01-18",
    checkOut: "2024-01-21",
    arrivalFrom: "Doha, Qatar",
    bookingType: "Online",
    bookingReference: "REF004",
    bookingRefNo: "BRN004",
    purposeOfVisit: "Medical",
    remarks: "Hospital appointment",
    roomType: "Accessible",
    roomNo: "401",
    adults: 1,
    children: 0,
    status: "Inactive",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    bookingNo: "BK005",
    checkIn: "2024-01-19",
    checkOut: "2024-01-22",
    arrivalFrom: "Muscat, Oman",
    bookingType: "Travel Agent",
    bookingReference: "REF005",
    bookingRefNo: "BRN005",
    purposeOfVisit: "Family Visit",
    remarks: "Large family",
    roomType: "Family",
    roomNo: "501",
    adults: 4,
    children: 3,
    status: "Active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    bookingNo: "BK006",
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    arrivalFrom: "Amman, Jordan",
    bookingType: "Online",
    bookingReference: "REF006",
    bookingRefNo: "BRN006",
    purposeOfVisit: "Education",
    remarks: "Student",
    roomType: "Budget",
    roomNo: "601",
    adults: 1,
    children: 0,
    status: "Active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    bookingNo: "BK007",
    checkIn: "2024-01-21",
    checkOut: "2024-01-24",
    arrivalFrom: "Beirut, Lebanon",
    bookingType: "Phone",
    bookingReference: "REF007",
    bookingRefNo: "BRN007",
    purposeOfVisit: "Shopping",
    remarks: "Weekend trip",
    roomType: "Deluxe",
    roomNo: "701",
    adults: 2,
    children: 1,
    status: "Inactive",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    bookingNo: "BK008",
    checkIn: "2024-01-22",
    checkOut: "2024-01-25",
    arrivalFrom: "Cairo, Egypt",
    bookingType: "Walk-in",
    bookingReference: "REF008",
    bookingRefNo: "BRN008",
    purposeOfVisit: "Tourism",
    remarks: "First time visitor",
    roomType: "Standard",
    roomNo: "801",
    adults: 2,
    children: 0,
    status: "Active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    bookingNo: "BK009",
    checkIn: "2024-01-23",
    checkOut: "2024-01-26",
    arrivalFrom: "Baghdad, Iraq",
    bookingType: "Online",
    bookingReference: "REF009",
    bookingRefNo: "BRN009",
    purposeOfVisit: "Business",
    remarks: "Meeting with clients",
    roomType: "Executive",
    roomNo: "901",
    adults: 1,
    children: 0,
    status: "Active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    bookingNo: "BK010",
    checkIn: "2024-01-24",
    checkOut: "2024-01-27",
    arrivalFrom: "Istanbul, Turkey",
    bookingType: "Travel Agent",
    bookingReference: "REF010",
    bookingRefNo: "BRN010",
    purposeOfVisit: "Cultural Exchange",
    remarks: "Artist residency",
    roomType: "Studio",
    roomNo: "1001",
    adults: 1,
    children: 0,
    status: "Inactive",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    bookingNo: "BK011",
    checkIn: "2024-01-25",
    checkOut: "2024-01-28",
    arrivalFrom: "Athens, Greece",
    bookingType: "Online",
    bookingReference: "REF011",
    bookingRefNo: "BRN011",
    purposeOfVisit: "Research",
    remarks: "Academic conference",
    roomType: "Standard",
    roomNo: "1101",
    adults: 1,
    children: 0,
    status: "Active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    bookingNo: "BK012",
    checkIn: "2024-01-26",
    checkOut: "2024-01-29",
    arrivalFrom: "New Delhi, India",
    bookingType: "Phone",
    bookingReference: "REF012",
    bookingRefNo: "BRN012",
    purposeOfVisit: "Medical Tourism",
    remarks: "Surgery scheduled",
    roomType: "Medical Suite",
    roomNo: "1201",
    adults: 2,
    children: 0,
    status: "Active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    bookingNo: "BK013",
    checkIn: "2024-01-27",
    checkOut: "2024-01-30",
    arrivalFrom: "Dubai, UAE",
    bookingType: "Online",
    bookingReference: "REF013",
    bookingRefNo: "BRN013",
    purposeOfVisit: "Business",
    remarks: "Corporate meeting",
    roomType: "Deluxe",
    roomNo: "1301",
    adults: 1,
    children: 0,
    status: "Active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    bookingNo: "BK014",
    checkIn: "2024-01-28",
    checkOut: "2024-01-31",
    arrivalFrom: "Riyadh, KSA",
    bookingType: "Phone",
    bookingReference: "REF014",
    bookingRefNo: "BRN014",
    purposeOfVisit: "Leisure",
    remarks: "Weekend getaway",
    roomType: "Suite",
    roomNo: "1401",
    adults: 2,
    children: 1,
    status: "Active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    bookingNo: "BK015",
    checkIn: "2024-01-29",
    checkOut: "2024-02-01",
    arrivalFrom: "Kuwait City",
    bookingType: "Walk-in",
    bookingReference: "REF015",
    bookingRefNo: "BRN015",
    purposeOfVisit: "Conference",
    remarks: "Industry summit",
    roomType: "Standard",
    roomNo: "1501",
    adults: 1,
    children: 0,
    status: "Active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    bookingNo: "BK016",
    checkIn: "2024-01-30",
    checkOut: "2024-02-02",
    arrivalFrom: "Doha, Qatar",
    bookingType: "Online",
    bookingReference: "REF016",
    bookingRefNo: "BRN016",
    purposeOfVisit: "Medical",
    remarks: "Follow-up appointment",
    roomType: "Accessible",
    roomNo: "1601",
    adults: 1,
    children: 0,
    status: "Inactive",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    bookingNo: "BK017",
    checkIn: "2024-01-31",
    checkOut: "2024-02-03",
    arrivalFrom: "Muscat, Oman",
    bookingType: "Travel Agent",
    bookingReference: "REF017",
    bookingRefNo: "BRN017",
    purposeOfVisit: "Family Visit",
    remarks: "Elderly parents",
    roomType: "Family",
    roomNo: "1701",
    adults: 3,
    children: 2,
    status: "Active",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    bookingNo: "BK018",
    checkIn: "2024-02-01",
    checkOut: "2024-02-04",
    arrivalFrom: "Amman, Jordan",
    bookingType: "Online",
    bookingReference: "REF018",
    bookingRefNo: "BRN018",
    purposeOfVisit: "Education",
    remarks: "University visit",
    roomType: "Budget",
    roomNo: "1801",
    adults: 1,
    children: 0,
    status: "Active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    bookingNo: "BK019",
    checkIn: "2024-02-02",
    checkOut: "2024-02-05",
    arrivalFrom: "Beirut, Lebanon",
    bookingType: "Phone",
    bookingReference: "REF019",
    bookingRefNo: "BRN019",
    purposeOfVisit: "Shopping",
    remarks: "Fashion week",
    roomType: "Deluxe",
    roomNo: "1901",
    adults: 2,
    children: 0,
    status: "Active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    bookingNo: "BK020",
    checkIn: "2024-02-03",
    checkOut: "2024-02-06",
    arrivalFrom: "Cairo, Egypt",
    bookingType: "Walk-in",
    bookingReference: "REF020",
    bookingRefNo: "BRN020",
    purposeOfVisit: "Tourism",
    remarks: "Pyramids tour",
    roomType: "Standard",
    roomNo: "2001",
    adults: 2,
    children: 1,
    status: "Inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function CheckinDataTable({
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
  const canCreate = usePermission("checkin", "create");

  const componentColumns = [
    {
      accessorKey: "bookingNo",
      title: "Booking No",
      options: [...new Set(checkinData.map((item) => item.bookingNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bookingNo")
          .localeCompare(row2.getValue("bookingNo"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "bookingNo",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "checkIn",
      title: "Check In",
      options: [...new Set(checkinData.map((item) => item.checkIn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("checkIn").localeCompare(row2.getValue("checkIn"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "checkIn",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "checkOut",
      title: "Check Out",
      options: [...new Set(checkinData.map((item) => item.checkOut))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("checkOut")
          .localeCompare(row2.getValue("checkOut"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "checkOut",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "arrivalFrom",
      title: "Arrival From",
      options: [...new Set(checkinData.map((item) => item.arrivalFrom))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("arrivalFrom")
          .localeCompare(row2.getValue("arrivalFrom"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "arrivalFrom",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "bookingType",
      title: "Booking Type",
      options: [...new Set(checkinData.map((item) => item.bookingType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bookingType")
          .localeCompare(row2.getValue("bookingType"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "bookingType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "purposeOfVisit",
      title: "Purpose of Visit",
      options: [...new Set(checkinData.map((item) => item.purposeOfVisit))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("purposeOfVisit")
          .localeCompare(row2.getValue("purposeOfVisit"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "purposeOfVisit",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "roomType",
      title: "Room Type",
      options: [...new Set(checkinData.map((item) => item.roomType))],
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
      accessorKey: "roomNo",
      title: "Room No",
      options: [...new Set(checkinData.map((item) => item.roomNo))],
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
      accessorKey: "adults",
      title: "Adults",
      options: [...new Set(checkinData.map((item) => item.adults))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("adults") - row2.getValue("adults");
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "adults",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "children",
      title: "Children",
      options: [...new Set(checkinData.map((item) => item.children))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("children") - row2.getValue("children");
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "children",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(checkinData.map((item) => item.status))],
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

  const filteredData = checkinData.filter((checkin) => {
    if (dataTableFilter.status === "Active") {
      return checkin.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !checkin.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return checkin.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return checkin.isUpdated;
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
      fixedColumns={["bookingNo"]} // Pin Booking No column
      pathName="checkin"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
