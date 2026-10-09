/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type ReservationDataType = {
  reservationNo: string;
  reservationDate: string; // Format: "YYYY-MM-DD"

  customerName: string;

  table: string;
  persons: number;
  startTime: string; // Format: "HH:mm" or full ISO string
  endTime: string; // Format: "HH:mm" or full ISO string

  mobile: string;
  phone: string;
  email: string;
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

const mockReservationData: ReservationDataType[] = [
  {
    id: "r1",
    reservationNo: "RSV1001",
    reservationDate: "2025-07-09",
    customerName: "Rahim Uddin",
    table: "T01",
    persons: 2,
    startTime: "18:30",
    endTime: "20:00",
    mobile: "01710000001",
    phone: "029999001",
    email: "rahim@example.com",
    description: "Near main entrance, window seat.",

    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Confirmed by staff.",
    createdAt: "2025-07-05T10:00:00Z",
    updatedAt: "2025-07-06T12:00:00Z",
    draftedAt: "",
  },
  {
    id: "r2",
    reservationNo: "RSV1002",
    reservationDate: "2025-07-08",
    customerName: "Salma Akter",
    table: "T02",
    persons: 4,
    startTime: "19:00",
    endTime: "21:00",
    mobile: "01710000002",
    phone: "029999002",
    email: "salma@example.com",
    description: "Family table near kids area.",
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Reservation canceled.",
    createdAt: "2025-07-04T09:00:00Z",
    updatedAt: "2025-07-06T09:30:00Z",
    draftedAt: "",
  },
  {
    id: "r3",
    reservationNo: "RSV1003",
    reservationDate: "2025-07-10",
    customerName: "Karim Mia",
    table: "T03",
    persons: 3,
    startTime: "20:00",
    endTime: "22:00",
    mobile: "01710000003",
    phone: "029999003",
    email: "karim@example.com",
    description: "VIP booth, romantic setup.",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Awaiting confirmation.",
    createdAt: "2025-07-06T14:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-06T14:00:00Z",
  },
  {
    id: "r4",
    reservationNo: "RSV1004",
    reservationDate: "2025-07-11",
    customerName: "Nayeem Hasan",
    table: "T04",
    persons: 6,
    startTime: "17:30",
    endTime: "19:30",
    mobile: "01710000004",
    phone: "029999004",
    email: "nayeem@example.com",
    description: "Group event for birthday.",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated with cake order.",
    createdAt: "2025-07-03T13:00:00Z",
    updatedAt: "2025-07-07T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "r5",
    reservationNo: "RSV1005",
    reservationDate: "2025-07-06",
    customerName: "Jhumur Begum",
    table: "T05",
    persons: 1,
    startTime: "18:00",
    endTime: "19:00",
    mobile: "01710000005",
    phone: "029999005",
    email: "jhumur@example.com",
    description: "Solo customer prefers quiet area.",
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Deleted by system.",
    createdAt: "2025-07-02T15:00:00Z",
    updatedAt: "",
    draftedAt: "",
  },
  {
    id: "r6",
    reservationNo: "RSV1006",
    reservationDate: "2025-07-12",
    customerName: "Shamim Reza",
    table: "T06",
    persons: 5,
    startTime: "20:30",
    endTime: "22:30",
    mobile: "01710000006",
    phone: "029999006",
    email: "shamim@example.com",
    description: "Business meeting.",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Special menu requested.",
    createdAt: "2025-07-05T08:30:00Z",
    updatedAt: "2025-07-08T10:00:00Z",
    draftedAt: "",
  },
  {
    id: "r7",
    reservationNo: "RSV1007",
    reservationDate: "2025-07-09",
    customerName: "Anika Sultana",
    table: "T07",
    persons: 2,
    startTime: "16:00",
    endTime: "17:30",
    mobile: "01710000007",
    phone: "029999007",
    email: "anika@example.com",
    description: "Coffee and dessert only.",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Incomplete form.",
    createdAt: "2025-07-05T12:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-05T12:00:00Z",
  },
  {
    id: "r8",
    reservationNo: "RSV1008",
    reservationDate: "2025-07-13",
    customerName: "Imran Hossain",
    table: "T08",
    persons: 4,
    startTime: "19:00",
    endTime: "21:00",
    mobile: "01710000008",
    phone: "029999008",
    email: "imran@example.com",
    description: "Friends night out.",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated number of guests.",
    createdAt: "2025-07-06T17:00:00Z",
    updatedAt: "2025-07-08T18:00:00Z",
    draftedAt: "",
  },
  {
    id: "r9",
    reservationNo: "RSV1009",
    reservationDate: "2025-07-14",
    customerName: "Mim Akter",
    table: "T09",
    persons: 2,
    startTime: "21:00",
    endTime: "22:00",
    mobile: "01710000009",
    phone: "029999009",
    email: "mim@example.com",
    description: "Late night reservation.",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Confirmed via SMS.",
    createdAt: "2025-07-07T13:45:00Z",
    updatedAt: "2025-07-08T10:15:00Z",
    draftedAt: "",
  },
  {
    id: "r10",
    reservationNo: "RSV1010",
    reservationDate: "2025-07-15",
    customerName: "Fahim Chowdhury",
    table: "T10",
    persons: 3,
    startTime: "18:45",
    endTime: "20:15",
    mobile: "01710000010",
    phone: "029999010",
    email: "fahim@example.com",
    description: "Anniversary celebration.",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Table changed as per request.",
    createdAt: "2025-07-06T09:00:00Z",
    updatedAt: "2025-07-07T11:00:00Z",
    draftedAt: "",
  },
  {
    id: "r11",
    reservationNo: "RSV1011",
    reservationDate: "2025-07-16",
    customerName: "Meherun Nesa",
    table: "T11",
    persons: 4,
    startTime: "17:00",
    endTime: "19:00",
    mobile: "01710000011",
    phone: "029999011",
    email: "meherun@example.com",
    description: "Family reunion table.",
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Pending payment.",
    createdAt: "2025-07-07T14:00:00Z",
    updatedAt: "",
    draftedAt: "2025-07-07T14:00:00Z",
  },
  {
    id: "r12",
    reservationNo: "RSV1012",
    reservationDate: "2025-07-17",
    customerName: "Badrul Alam",
    table: "T12",
    persons: 5,
    startTime: "20:00",
    endTime: "22:00",
    mobile: "01710000012",
    phone: "029999012",
    email: "badrul@example.com",
    description: "Conference guests dinner.",
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Extended time approved.",
    createdAt: "2025-07-08T08:00:00Z",
    updatedAt: "2025-07-09T10:30:00Z",
    draftedAt: "",
  },
];

export default function ReservationDataTable({
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
      accessorKey: "reservationNo",
      title: "Reservation No",
      options: [
        ...new Set(mockReservationData.map((item) => item.reservationNo)),
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
          .getValue("reservationNo")
          .localeCompare(row2.getValue("reservationNo"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "reservationNo",
      },
    },
    {
      accessorKey: "reservationDate",
      title: "Reservation Date",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("reservationDate")
          .localeCompare(row2.getValue("reservationDate"));
      },
    },
    {
      accessorKey: "customerName",
      title: "Customer Name",
      options: [
        ...new Set(mockReservationData.map((item) => item.customerName)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerName")
          .localeCompare(row2.getValue("customerName"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "customerName",
      },
    },
    {
      accessorKey: "table",
      title: "Table",
      options: [...new Set(mockReservationData.map((item) => item.table))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("table").localeCompare(row2.getValue("table"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "table",
      },
    },
    {
      accessorKey: "persons",
      title: "Persons",
      options: [...new Set(mockReservationData.map((item) => item.persons))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("persons").localeCompare(row2.getValue("persons"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "persons",
      },
    },
    {
      accessorKey: "startTime",
      title: "Start Time",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("startTime")
          .localeCompare(row2.getValue("startTime"));
      },
    },
    {
      accessorKey: "endTime",
      title: "End Time",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) => cellValue.includes(val));
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("endTime").localeCompare(row2.getValue("endTime"));
      },
    },
    {
      accessorKey: "mobile",
      title: "Mobile",
      options: [...new Set(mockReservationData.map((item) => item.mobile))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("mobile").localeCompare(row2.getValue("mobile"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "mobile",
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [...new Set(mockReservationData.map((item) => item.phone))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "phone",
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockReservationData.map((item) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "email",
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [
        ...new Set(mockReservationData.map((item) => item.description)),
      ],
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

  const filteredData = mockReservationData.filter((reservation) => {
    if (dataTableFilter.status === "Active") {
      return reservation.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !reservation.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return reservation.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return reservation.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return reservation.isUpdated;
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
