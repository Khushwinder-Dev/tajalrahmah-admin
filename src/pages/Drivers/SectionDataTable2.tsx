/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockData = [
  {
    id: "1",
    employee: "Booking 1",
    vehicle: "Toyota Corolla",
    driver: "Arif Hossain",
    logBooks: "Log Book A",
    odometers: "15200",
    date: "2023-01-15",
    description: "Daily office commute sedan with fuel-efficient engine.",
    bookingType: "Commute",
    createdAt: "2023-01-10",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-08",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    employee: "Booking 2",
    vehicle: "Honda Civic",
    driver: "Nusrat Jahan",
    logBooks: "Log Book B",
    odometers: "9800",
    date: "2023-01-18",
    description: "Compact sedan for city tour and client meeting transfers.",
    bookingType: "Business",
    createdAt: "2023-01-12",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-10",
    status: "active",
    actionMessage: "5h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    employee: "Booking 3",
    vehicle: "Mercedes Sprinter",
    driver: "David Lee",
    logBooks: "Log Book C",
    odometers: "8920",
    date: "2022-03-05",
    description:
      "Corporate meeting transfer with spacious van for team travel.",
    bookingType: "Corporate",
    createdAt: "2022-01-10",
    updatedAt: "2022-12-20",
    draftedAt: "2022-01-01",
    status: "archived",
    actionMessage: "6mo",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    employee: "Booking 4",
    vehicle: "BMW X5",
    driver: "Michael Brown",
    logBooks: "Log Book D",
    odometers: "12500",
    date: "2021-05-12",
    description:
      "Luxury ride for special event with premium SUV and chauffeur.",
    bookingType: "Luxury",
    createdAt: "2021-01-12",
    updatedAt: "2021-12-22",
    draftedAt: "2020-12-30",
    status: "archived",
    actionMessage: "1y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    employee: "Booking 5",
    vehicle: "Nissan NV200",
    driver: "Emma Wilson",
    logBooks: "Log Book E",
    odometers: "6420",
    date: "2020-07-20",
    description: "City courier service with compact van for small deliveries.",
    bookingType: "Courier",
    createdAt: "2020-01-10",
    updatedAt: "2020-12-15",
    draftedAt: "2020-01-01",
    status: "archived",
    actionMessage: "2y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    employee: "Booking 6",
    vehicle: "Toyota Hiace",
    driver: "Robert Green",
    logBooks: "Log Book F",
    odometers: "18800",
    date: "2019-09-15",
    description: "Large group transfer for business event with 15-seater van.",
    bookingType: "Group",
    createdAt: "2019-01-08",
    updatedAt: "2019-12-10",
    draftedAt: "2018-12-28",
    status: "archived",
    actionMessage: "3y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    employee: "Booking 7",
    vehicle: "Hyundai Sonata",
    driver: "Sophia Martinez",
    logBooks: "Log Book G",
    odometers: "9200",
    date: "2018-06-25",
    description:
      "Daily rental for city tour with compact sedan and guide service.",
    bookingType: "Tour",
    createdAt: "2018-01-05",
    updatedAt: "2018-12-12",
    draftedAt: "2017-12-30",
    status: "archived",
    actionMessage: "4y",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    employee: "Booking 8",
    vehicle: "Kia Carnival",
    driver: "Liam Johnson",
    logBooks: "Log Book H",
    odometers: "3500",
    date: "2024-12-01",
    description:
      "Family vacation trip with comfortable minivan and driver guide.",
    bookingType: "Family",
    createdAt: "2024-12-01",
    updatedAt: "2025-06-01",
    draftedAt: "2024-11-20",
    status: "draft",
    actionMessage: "3d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    employee: "Booking 9",
    vehicle: "Audi A6",
    driver: "Olivia White",
    logBooks: "Log Book I",
    odometers: "2100",
    date: "2025-12-15",
    description:
      "Business class transfer for executive client with premium sedan.",
    bookingType: "Business",
    createdAt: "2025-12-15",
    updatedAt: "2026-01-05",
    draftedAt: "2025-12-01",
    status: "draft",
    actionMessage: "2d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    employee: "Booking 10",
    vehicle: "Range Rover Sport",
    driver: "William Davis",
    logBooks: "Log Book J",
    odometers: "1800",
    date: "2026-12-20",
    description: "Holiday villa pickup service with luxury SUV for VIP guest.",
    bookingType: "Luxury",
    createdAt: "2026-12-20",
    updatedAt: "2027-01-02",
    draftedAt: "2026-12-10",
    status: "draft",
    actionMessage: "1d",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function SectionDataTable2({
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
      accessorKey: "employee",
      title: "Employee",
      options: [...new Set(mockData.map((item) => item.employee))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("employee")
          .localeCompare(row2.getValue("employee"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "employee",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "vehicle",
      title: "Vehicle",
      options: [...new Set(mockData.map((item) => item.vehicle))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("vehicle").localeCompare(row2.getValue("vehicle"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "vehicle",
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
  ];

  const filteredData = mockData.filter((finance) => {
    if (dataTableFilter.status === "Active") {
      return finance.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !finance.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return finance.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return finance.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return finance.isUpdated;
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
      fixedColumns={["employee", "status"]} // Pin country name column
      pathName="drivers"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
