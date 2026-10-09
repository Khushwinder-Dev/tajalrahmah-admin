/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useUserMasterPermissions } from "@/hooks/usePermissions";

// User interface to match the grid component
interface User {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  userType: "admin" | "super admin" | "user";
  password: string;
  confirmPassword: string;
  otp?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    mobileNumber: "+1234567890",
    email: "john.doe@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    otp: "123456",
    facebook: "john.doe.fb",
    linkedin: "john-doe-linkedin",
    instagram: "john_doe_insta",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    name: "Jane Smith",
    mobileNumber: "+1234567891",
    email: "jane.smith@example.com",
    userType: "super admin",
    password: "********",
    confirmPassword: "********",
    facebook: "jane.smith.fb",
    linkedin: "jane-smith-linkedin",
    status: "active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    name: "Michael Johnson",
    mobileNumber: "+1234567892",
    email: "michael.johnson@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    instagram: "michael_johnson_insta",
    status: "active",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    name: "Emily Davis",
    mobileNumber: "+1234567893",
    email: "emily.davis@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    linkedin: "emily-davis-linkedin",
    status: "active",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    name: "David Wilson",
    mobileNumber: "+1234567894",
    email: "david.wilson@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    facebook: "david.wilson.fb",
    status: "active",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    name: "Sarah Brown",
    mobileNumber: "+1234567895",
    email: "sarah.brown@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    instagram: "sarah_brown_insta",
    status: "active",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    name: "Robert Miller",
    mobileNumber: "+1234567896",
    email: "robert.miller@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    status: "active",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    mobileNumber: "+1234567897",
    email: "lisa.anderson@example.com",
    userType: "super admin",
    password: "********",
    confirmPassword: "********",
    linkedin: "lisa-anderson-linkedin",
    facebook: "lisa.anderson.fb",
    status: "active",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    name: "James Taylor",
    mobileNumber: "+1234567898",
    email: "james.taylor@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    instagram: "james_taylor_insta",
    status: "active",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    name: "Maria Garcia",
    mobileNumber: "+1234567899",
    email: "maria.garcia@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    facebook: "maria.garcia.fb",
    linkedin: "maria-garcia-linkedin",
    status: "active",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    name: "Christopher Martinez",
    mobileNumber: "+1234567800",
    email: "christopher.martinez@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    status: "inactive",
    createdAt: "2023-04-15",
    updatedAt: "2023-09-10",
    draftedAt: "2023-04-10",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    name: "Jennifer Thompson",
    mobileNumber: "+1234567801",
    email: "jennifer.thompson@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    instagram: "jennifer_thompson_insta",
    status: "active",
    createdAt: "2023-05-01",
    updatedAt: "2023-11-12",
    draftedAt: "2023-04-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "13",
    name: "Daniel Rodriguez",
    mobileNumber: "+1234567802",
    email: "daniel.rodriguez@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    linkedin: "daniel-rodriguez-linkedin",
    status: "active",
    createdAt: "2023-05-10",
    updatedAt: "2023-10-30",
    draftedAt: "2023-05-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "14",
    name: "Jessica White",
    mobileNumber: "+1234567803",
    email: "jessica.white@example.com",
    userType: "super admin",
    password: "********",
    confirmPassword: "********",
    facebook: "jessica.white.fb",
    status: "active",
    createdAt: "2023-05-20",
    updatedAt: "2023-11-02",
    draftedAt: "2023-05-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "15",
    name: "Matthew Lee",
    mobileNumber: "+1234567804",
    email: "matthew.lee@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    status: "active",
    createdAt: "2023-06-01",
    updatedAt: "2023-11-08",
    draftedAt: "2023-05-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "16",
    name: "Ashley Harris",
    mobileNumber: "+1234567805",
    email: "ashley.harris@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    instagram: "ashley_harris_insta",
    linkedin: "ashley-harris-linkedin",
    status: "active",
    createdAt: "2023-06-10",
    updatedAt: "2023-10-25",
    draftedAt: "2023-06-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "17",
    name: "Andrew Martinez",
    mobileNumber: "+1234567806",
    email: "andrew.martinez@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    facebook: "andrew.martinez.fb",
    status: "draft",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-20",
    draftedAt: "2023-06-12",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "18",
    name: "Brandon Davis",
    mobileNumber: "+1234567807",
    email: "brandon.davis@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    linkedin: "brandon-davis-linkedin",
    status: "active",
    createdAt: "2023-07-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-06-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "19",
    name: "Jonathan Rodriguez",
    mobileNumber: "+1234567808",
    email: "jonathan.rodriguez@example.com",
    userType: "user",
    password: "********",
    confirmPassword: "********",
    instagram: "jonathan_rodriguez_insta",
    status: "active",
    createdAt: "2023-07-10",
    updatedAt: "2023-10-18",
    draftedAt: "2023-07-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "20",
    name: "David Martinez",
    mobileNumber: "+1234567809",
    email: "david.martinez@example.com",
    userType: "admin",
    password: "********",
    confirmPassword: "********",
    linkedin: "david-martinez-linkedin",
    status: "inactive",
    createdAt: "2023-07-20",
    updatedAt: "2023-09-15",
    draftedAt: "2023-07-15",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function UsersDataTable({
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
  isFilterOpen,
  setIsFilterOpen,
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
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const { canCreate } = useUserMasterPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "name",
      title: "Name",
      options: [...new Set(mockUsers.map((item) => item.name))],
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
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Name",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockUsers.map((item) => item.email))],
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
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Email",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mobileNumber",
      title: "Mobile",
      options: [...new Set(mockUsers.map((item) => item.mobileNumber))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.includes(filterVal)
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("mobileNumber")
          .localeCompare(row2.getValue("mobileNumber"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Mobile Number",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "userType",
      title: "User Type",
      options: [...new Set(mockUsers.map((item) => item.userType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("userType")
          .localeCompare(row2.getValue("userType"));
      },
      size: isMobile ? 100 : 130,
      minSize: 100,
      meta: {
        exportLabel: "User Type",
        readOnly: !canCreate,
      },
    },
    // {
    //   accessorKey: "status",
    //   title: "Status",
    //   options: [...new Set(mockUsers.map((item) => item.status))],
    //   filterFn: (row: any, columnId: any, filterValue: any) => {
    //     if (!filterValue || filterValue.length === 0) return true;
    //     const cellValue = row.getValue(columnId) as string;
    //     return filterValue.includes(cellValue);
    //   },
    //   sortingFn: (row1: any, row2: any) => {
    //     return row1.getValue("status").localeCompare(row2.getValue("status"));
    //   },
    //   size: isMobile ? 80 : 180,
    //   minSize: 80,
    //   meta: {
    //     exportLabel: "Status",
    //     readOnly: !canCreate,
    //   },
    // },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
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
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockUsers.filter((user) => {
    if (dataTableFilter.status === "Active") {
      return user.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !user.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return user.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return user.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return user.isUpdated;
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
      fixedColumns={["name", "email"]} // Pin user name and email columns
      pathName="user-master"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
