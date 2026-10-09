/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  vehicle: string;
  fuelTime: string;
  odometer: string;
  gallons: string;
  price: string;
  fuelType: string;
  vendor: string;
  reference: string;
  description: string;

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
    vehicle: "Toyota Corolla",
    fuelTime: "2025-08-16T09:30:00Z",
    odometer: "45210",
    gallons: "12.5",
    price: "48.75",
    fuelType: "Petrol",
    vendor: "Shell Dhaka",
    reference: "REF-2001",
    description: "Full tank refill",
    status: "Active",
    createdAt: "2025-08-16T09:35:00Z",
    updatedAt: "2025-08-16T09:40:00Z",
    draftedAt: null,
    actionMessage: "Record created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    vehicle: "Honda Civic",
    fuelTime: "2025-08-15T14:20:00Z",
    odometer: "28975",
    gallons: "10.2",
    price: "39.80",
    fuelType: "Octane",
    vendor: "Padma Oil",
    reference: "REF-2002",
    description: "Regular fueling",
    status: "Active",
    createdAt: "2025-08-15T14:25:00Z",
    updatedAt: "2025-08-15T14:30:00Z",
    draftedAt: null,
    actionMessage: "Data updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    vehicle: "Hyundai Tucson",
    fuelTime: "2025-08-14T18:45:00Z",
    odometer: "12580",
    gallons: "15.0",
    price: "60.00",
    fuelType: "Diesel",
    vendor: "PetroBangla",
    reference: "REF-2003",
    description: "Highway refill",
    status: "Active",
    createdAt: "2025-08-14T18:50:00Z",
    updatedAt: "2025-08-14T18:55:00Z",
    draftedAt: null,
    actionMessage: "Record marked as default",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    vehicle: "Suzuki Swift",
    fuelTime: "2025-08-13T08:15:00Z",
    odometer: "68450",
    gallons: "8.3",
    price: "31.45",
    fuelType: "CNG",
    vendor: "CNG Station Uttara",
    reference: "REF-2004",
    description: "Half tank",
    status: "Draft",
    createdAt: "2025-08-13T08:20:00Z",
    updatedAt: "2025-08-13T08:30:00Z",
    draftedAt: "2025-08-13T08:25:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    vehicle: "Nissan X-Trail",
    fuelTime: "2025-08-12T20:10:00Z",
    odometer: "90500",
    gallons: "11.7",
    price: "46.80",
    fuelType: "Petrol",
    vendor: "Jamuna Oil",
    reference: "REF-2005",
    description: "Long drive refill",
    status: "Deleted",
    createdAt: "2025-08-12T20:15:00Z",
    updatedAt: "2025-08-12T20:20:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "6",
    vehicle: "Mitsubishi Pajero",
    fuelTime: "2025-08-11T10:05:00Z",
    odometer: "33000",
    gallons: "13.8",
    price: "55.20",
    fuelType: "Diesel",
    vendor: "Padma Oil",
    reference: "REF-2006",
    description: "Tour preparation",
    status: "Active",
    createdAt: "2025-08-11T10:10:00Z",
    updatedAt: "2025-08-11T10:15:00Z",
    draftedAt: null,
    actionMessage: "Record created successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    vehicle: "Ford Ranger",
    fuelTime: "2025-08-10T16:45:00Z",
    odometer: "74560",
    gallons: "18.0",
    price: "72.00",
    fuelType: "Diesel",
    vendor: "Chevron BD",
    reference: "REF-2007",
    description: "Heavy load transport",
    status: "Active",
    createdAt: "2025-08-10T16:50:00Z",
    updatedAt: "2025-08-10T16:55:00Z",
    draftedAt: null,
    actionMessage: "Record updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    vehicle: "BMW X5",
    fuelTime: "2025-08-09T12:30:00Z",
    odometer: "21500",
    gallons: "14.5",
    price: "58.00",
    fuelType: "Octane",
    vendor: "Shell Gulshan",
    reference: "REF-2008",
    description: "Premium fuel",
    status: "Active",
    createdAt: "2025-08-09T12:35:00Z",
    updatedAt: "2025-08-09T12:40:00Z",
    draftedAt: null,
    actionMessage: "Premium service applied",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    vehicle: "Toyota Hiace",
    fuelTime: "2025-08-08T07:10:00Z",
    odometer: "120350",
    gallons: "20.0",
    price: "80.00",
    fuelType: "Diesel",
    vendor: "PetroBangla",
    reference: "REF-2009",
    description: "Office transport bus fueling",
    status: "Active",
    createdAt: "2025-08-08T07:15:00Z",
    updatedAt: "2025-08-08T07:20:00Z",
    draftedAt: null,
    actionMessage: "Bulk fueling done",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    vehicle: "Mazda CX-5",
    fuelTime: "2025-08-07T19:25:00Z",
    odometer: "40215",
    gallons: "9.5",
    price: "37.60",
    fuelType: "Petrol",
    vendor: "Padma Oil",
    reference: "REF-2010",
    description: "Quarter tank refill",
    status: "Draft",
    createdAt: "2025-08-07T19:30:00Z",
    updatedAt: "2025-08-07T19:40:00Z",
    draftedAt: "2025-08-07T19:35:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    vehicle: "Tesla Model 3",
    fuelTime: "2025-08-06T11:00:00Z",
    odometer: "15000",
    gallons: "0",
    price: "20.00",
    fuelType: "Electric",
    vendor: "BP Charge",
    reference: "REF-2011",
    description: "Battery charging",
    status: "Active",
    createdAt: "2025-08-06T11:05:00Z",
    updatedAt: "2025-08-06T11:10:00Z",
    draftedAt: null,
    actionMessage: "Charging complete",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    vehicle: "Kia Sportage",
    fuelTime: "2025-08-05T21:15:00Z",
    odometer: "58600",
    gallons: "12.0",
    price: "48.00",
    fuelType: "Octane",
    vendor: "Shell Banani",
    reference: "REF-2012",
    description: "Late night refill",
    status: "Deleted",
    createdAt: "2025-08-05T21:20:00Z",
    updatedAt: "2025-08-05T21:25:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
];

export default function ComponentLevelDataTableView({
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
  const canCreate = usePermission("fuels", "create");

  const componentColumns = [
    {
      accessorKey: "vehicle",
      title: "Vehicle",
      options: [...new Set(mockTableData.map((item) => item.vehicle))],
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
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "vehicle",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "fuelTime",
      title: "Fuel Time",
      options: [...new Set(mockTableData.map((item) => item.fuelTime))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("fuelTime")
          .localeCompare(row2.getValue("fuelTime"));
      },
      size: 200,
      minSize: 200,
      meta: {
        exportLabel: "fuelTime",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "odometer",
      title: "Odometer",
      options: [...new Set(mockTableData.map((item) => item.odometer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("odometer")
          .localeCompare(row2.getValue("odometer"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "odometer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "gallons",
      title: "Gallons",
      options: [...new Set(mockTableData.map((item) => item.gallons))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("gallons").localeCompare(row2.getValue("gallons"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "gallons",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "price",
      title: "Price",
      options: [...new Set(mockTableData.map((item) => item.price))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("price").localeCompare(row2.getValue("price"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "price",
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
      fixedColumns={["vehicle", "fuelTime"]} // Pin leave types column
      pathName="fuels"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
