/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockAppointments = [
  {
    id: "1",
    name: "John Smith",
    mobile: "+1 555-0123",
    email: "john.smith@email.com",
    appointmentDate: "2024-01-15",
    appointmentTime: "09:00 AM",
    appointmentBy: "Dr. Sarah Johnson",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "2",
    name: "Emily Davis",
    mobile: "+1 555-0124",
    email: "emily.davis@email.com",
    appointmentDate: "2024-01-16",
    appointmentTime: "10:30 AM",
    appointmentBy: "Dr. Michael Chen",
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "3",
    name: "Robert Wilson",
    mobile: "+1 555-0125",
    email: "robert.wilson@email.com",
    appointmentDate: "2024-01-17",
    appointmentTime: "02:15 PM",
    appointmentBy: "Dr. Lisa Rodriguez",
    status: "active",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    actionMessage: "20m",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "4",
    name: "Maria Garcia",
    mobile: "+1 555-0126",
    email: "maria.garcia@email.com",
    appointmentDate: "2024-01-18",
    appointmentTime: "11:45 AM",
    appointmentBy: "Dr. David Thompson",
    status: "active",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    actionMessage: "15 Apr",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "5",
    name: "James Brown",
    mobile: "+1 555-0127",
    email: "james.brown@email.com",
    appointmentDate: "2024-01-19",
    appointmentTime: "03:30 PM",
    appointmentBy: "Dr. Sarah Johnson",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "6",
    name: "Jennifer Lee",
    mobile: "+1 555-0128",
    email: "jennifer.lee@email.com",
    appointmentDate: "2024-01-20",
    appointmentTime: "09:15 AM",
    appointmentBy: "Dr. Michael Chen",
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "7",
    name: "Christopher Taylor",
    mobile: "+1 555-0129",
    email: "christopher.taylor@email.com",
    appointmentDate: "2024-01-21",
    appointmentTime: "01:00 PM",
    appointmentBy: "Dr. Lisa Rodriguez",
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "8",
    name: "Amanda Martinez",
    mobile: "+1 555-0130",
    email: "amanda.martinez@email.com",
    appointmentDate: "2024-01-22",
    appointmentTime: "04:45 PM",
    appointmentBy: "Dr. David Thompson",
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "9",
    name: "Daniel Anderson",
    mobile: "+1 555-0131",
    email: "daniel.anderson@email.com",
    appointmentDate: "2024-01-23",
    appointmentTime: "10:00 AM",
    appointmentBy: "Dr. Sarah Johnson",
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "10",
    name: "Jessica White",
    mobile: "+1 555-0132",
    email: "jessica.white@email.com",
    appointmentDate: "2024-01-24",
    appointmentTime: "02:30 PM",
    appointmentBy: "Dr. Michael Chen",
    status: "active",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "11",
    name: "Matthew Harris",
    mobile: "+1 555-0133",
    email: "matthew.harris@email.com",
    appointmentDate: "2024-01-25",
    appointmentTime: "11:00 AM",
    appointmentBy: "Dr. Lisa Rodriguez",
    status: "inactive",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    actionMessage: "2h",
    isActive: false,
    isDeleted: false,
  },
  {
    id: "12",
    name: "Nicole Clark",
    mobile: "+1 555-0134",
    email: "nicole.clark@email.com",
    appointmentDate: "2024-01-26",
    appointmentTime: "03:15 PM",
    appointmentBy: "Dr. David Thompson",
    status: "active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "13",
    name: "Alex Johnson",
    mobile: "+1 555-0135",
    email: "alex.johnson@email.com",
    appointmentDate: "2024-01-27",
    appointmentTime: "09:30 AM",
    appointmentBy: "Dr. Sarah Johnson",
    status: "active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "14",
    name: "Sarah Williams",
    mobile: "+1 555-0136",
    email: "sarah.williams@email.com",
    appointmentDate: "2024-01-28",
    appointmentTime: "01:45 PM",
    appointmentBy: "Dr. Michael Chen",
    status: "active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "15",
    name: "Michael Brown",
    mobile: "+1 555-0137",
    email: "michael.brown@email.com",
    appointmentDate: "2024-01-29",
    appointmentTime: "10:15 AM",
    appointmentBy: "Dr. Lisa Rodriguez",
    status: "active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "16",
    name: "Emma Davis",
    mobile: "+1 555-0138",
    email: "emma.davis@email.com",
    appointmentDate: "2024-01-30",
    appointmentTime: "03:00 PM",
    appointmentBy: "Dr. David Thompson",
    status: "active",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "17",
    name: "David Wilson",
    mobile: "+1 555-0139",
    email: "david.wilson@email.com",
    appointmentDate: "2024-01-31",
    appointmentTime: "11:30 AM",
    appointmentBy: "Dr. Sarah Johnson",
    status: "active",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "18",
    name: "Lisa Anderson",
    mobile: "+1 555-0140",
    email: "lisa.anderson@email.com",
    appointmentDate: "2024-02-01",
    appointmentTime: "02:00 PM",
    appointmentBy: "Dr. Michael Chen",
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "19",
    name: "Kevin Thompson",
    mobile: "+1 555-0141",
    email: "kevin.thompson@email.com",
    appointmentDate: "2024-02-02",
    appointmentTime: "09:45 AM",
    appointmentBy: "Dr. Lisa Rodriguez",
    status: "active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    actionMessage: "2h",
    isActive: true,
    isDeleted: false,
  },
  {
    id: "20",
    name: "Rachel Green",
    mobile: "+1 555-0142",
    email: "rachel.green@email.com",
    appointmentDate: "2024-02-03",
    appointmentTime: "01:30 PM",
    appointmentBy: "Dr. David Thompson",
    status: "inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    actionMessage: "2h",
    isActive: false,
    isDeleted: false,
  },
];

export default function AppointmentDataTable({
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
  const canCreate = usePermission("appointments", "create");

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockAppointments.map((item: any) => item.name))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mobile",
      title: "Mobile",
      options: [...new Set(mockAppointments.map((item: any) => item.mobile))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("mobile").localeCompare(row2.getValue("mobile"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "mobile",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockAppointments.map((item: any) => item.email))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "email",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "appointmentDate",
      title: "Appointment Date",
      options: [
        ...new Set(mockAppointments.map((item: any) => item.appointmentDate)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("appointmentDate")).getTime() -
          new Date(row2.getValue("appointmentDate")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "appointmentDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "appointmentTime",
      title: "Appointment Time",
      options: [
        ...new Set(mockAppointments.map((item: any) => item.appointmentTime)),
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
          .getValue("appointmentTime")
          .localeCompare(row2.getValue("appointmentTime"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "appointmentTime",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "appointmentBy",
      title: "Appointment By",
      options: [
        ...new Set(mockAppointments.map((item: any) => item.appointmentBy)),
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
          .getValue("appointmentBy")
          .localeCompare(row2.getValue("appointmentBy"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "appointmentBy",
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

  const filteredData = mockAppointments.filter((appointment: any) => {
    if (dataTableFilter.status === "Active") {
      return appointment.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !appointment.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return appointment.isDeleted;
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
      fixedColumns={["name"]} // Pin name column
      pathName="appointments"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
