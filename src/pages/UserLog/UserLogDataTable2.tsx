/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// update

const mockData = [
  {
    id: 1,
    user: "Allen Wang",
    time: "2023-01-10 09:15",
    mobile: "+1-202-555-0147",
    email: "allen.wang@example.com",
    city: "New York",
    country: "USA",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 2,
    user: "Bob Alice",
    time: "2023-01-11 14:20",
    mobile: "+1-202-555-0199",
    email: "bob.alice@example.com",
    city: "Los Angeles",
    country: "USA",
    status: "inactive",
    createdAt: "2023-02-10",
    updatedAt: "2023-10-18",
    draftedAt: "2023-02-05",
    actionMessage: "4h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: 3,
    user: "Kamal Hossain",
    time: "2023-03-12 10:00",
    mobile: "+8801911223344",
    email: "kamal.hossain@dhakafreight.com",
    city: "Dhaka",
    country: "Bangladesh",
    status: "draft",
    createdAt: "2023-03-12",
    updatedAt: "2023-09-25",
    draftedAt: "2023-03-08",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 4,
    user: "Nurul Islam",
    time: "2023-04-05 09:30",
    mobile: "+8801711556677",
    email: "nurul.islam@ctgportlogistics.com",
    city: "Chattogram",
    country: "Bangladesh",
    status: "active",
    createdAt: "2023-04-05",
    updatedAt: "2023-09-12",
    draftedAt: "2023-04-01",
    actionMessage: "Ongoing shipment",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 5,
    user: "Tanvir Chowdhury",
    time: "2023-05-22 11:15",
    mobile: "+8801922334455",
    email: "tanvir.chowdhury@sylhetexpress.com",
    city: "Sylhet",
    country: "Bangladesh",
    status: "inactive",
    createdAt: "2023-05-22",
    updatedAt: "2023-09-10",
    draftedAt: "2023-05-18",
    actionMessage: "Service paused",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 6,
    user: "Jahangir Alam",
    time: "2023-06-18 10:45",
    mobile: "+8801755667788",
    email: "jahangir.alam@rajtrans.com",
    city: "Rajshahi",
    country: "Bangladesh",
    status: "active",
    createdAt: "2023-06-18",
    updatedAt: "2023-09-02",
    draftedAt: "2023-06-12",
    actionMessage: "Live tracking enabled",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 7,
    user: "Shafiqul Bari",
    time: "2023-07-14 09:50",
    mobile: "+8801766778899",
    email: "shafiqul.bari@khulnacargomovers.com",
    city: "Khulna",
    country: "Bangladesh",
    status: "inactive",
    createdAt: "2023-07-14",
    updatedAt: "2023-08-25",
    draftedAt: "2023-07-10",
    actionMessage: "Awaiting documents",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 8,
    user: "Mokbul Hossain",
    time: "2023-08-03 12:10",
    mobile: "+8801788990011",
    email: "mokbul.hossain@barisalriver.com",
    city: "Barisal",
    country: "Bangladesh",
    status: "draft",
    createdAt: "2023-08-03",
    updatedAt: "2023-08-20",
    draftedAt: "2023-08-01",
    actionMessage: "Pending approval",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 9,
    user: "Rashed Karim",
    time: "2023-09-09 10:20",
    mobile: "+8801799001122",
    email: "rashed.karim@mymensinghlogistics.com",
    city: "Mymensingh",
    country: "Bangladesh",
    status: "active",
    createdAt: "2023-09-09",
    updatedAt: "2023-09-19",
    draftedAt: "2023-09-05",
    actionMessage: "Running delivery",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 10,
    user: "Mahbub Alam",
    time: "2023-10-12 14:00",
    mobile: "+8801712334455",
    email: "mahbub.alam@gazipurtransport.com",
    city: "Gazipur",
    country: "Bangladesh",
    status: "inactive",
    createdAt: "2023-10-12",
    updatedAt: "2023-10-28",
    draftedAt: "2023-10-08",
    actionMessage: "Temporarily closed",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 11,
    user: "Habibur Rahman",
    time: "2023-11-05 09:30",
    mobile: "+8801712889900",
    email: "habibur.rahman@rangpurparcel.com",
    city: "Rangpur",
    country: "Bangladesh",
    status: "draft",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-15",
    draftedAt: "2023-11-01",
    actionMessage: "Draft entry",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: 12,
    user: "Abdur Rahim",
    time: "2023-12-01 10:45",
    mobile: "+8801712003344",
    email: "abdur.rahim@comillatransport.com",
    city: "Comilla",
    country: "Bangladesh",
    status: "active",
    createdAt: "2023-12-01",
    updatedAt: "2023-12-18",
    draftedAt: "2023-11-28",
    actionMessage: "On schedule",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function UserLogDataTable2({
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
  const { canCreate } = useCountriesPermissions();

  const componentColumns = [
    {
      accessorKey: "user",
      title: "User",
      options: [...new Set(mockData.map((item) => item.user))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("user").localeCompare(row2.getValue("user"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "user",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "mobile",
      title: "Mobile",
      options: [...new Set(mockData.map((item) => item.mobile))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "mobile{",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "email",
      title: "email",
      options: [...new Set(mockData.map((item) => item.email))],
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
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "email",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "city",
      title: "city",
      options: [...new Set(mockData.map((item) => item.city))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("city").localeCompare(row2.getValue("city"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "city",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "country",
      title: "country",
      options: [...new Set(mockData.map((item) => item.country))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "country",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "status",
      title: "status",
      options: [...new Set(mockData.map((item) => item.status))],
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
      size: 180,
      minSize: 150,
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
        const cellValue = new Date(row.getValue(columnId) as string)
          .toISOString()
          .split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("draftedAt")).getTime() -
          new Date(row2.getValue("draftedAt")).getTime()
        );
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockData.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) => cellValue === filterVal);
      },
    },
  ];

  const filteredData = mockData.filter((item) => {
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
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
      fixedColumns={["user", "status"]} // Pin name column
      pathName="user-log"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
