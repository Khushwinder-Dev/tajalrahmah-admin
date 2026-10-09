/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;

  vehicle: string;
  vin: string;
  licensePlate: string;

  vehicleType: string;
  year: string;
  make: string;

  model: string;
  trim: string;
  registration: string;

  vehicleGroup: string;
  ownership: string;
  color: string;

  bodyType: string;
  msrp: string;

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
    vin: "JTDBR32E520123456",
    licensePlate: "DHA-1234",
    vehicleType: "Sedan",
    year: "2020",
    make: "Toyota",
    model: "Corolla",
    trim: "XLE",
    registration: "2023-05-12",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "White",
    bodyType: "Sedan",
    msrp: "22000",
    status: "Active",
    createdAt: "2024-01-01",
    updatedAt: "2024-05-01",
    draftedAt: null,
    actionMessage: "Vehicle in use",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    vehicle: "Honda Civic",
    vin: "2HGES16555H123456",
    licensePlate: "CTG-5678",
    vehicleType: "Sedan",
    year: "2021",
    make: "Honda",
    model: "Civic",
    trim: "EX",
    registration: "2023-06-20",
    vehicleGroup: "Passenger",
    ownership: "Leased",
    color: "Black",
    bodyType: "Sedan",
    msrp: "24000",
    status: "Active",
    createdAt: "2024-02-05",
    updatedAt: "2024-06-01",
    draftedAt: null,
    actionMessage: "Leased vehicle",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    vehicle: "Ford F-150",
    vin: "1FTFW1EF1EKE12345",
    licensePlate: "SYL-9021",
    vehicleType: "Truck",
    year: "2019",
    make: "Ford",
    model: "F-150",
    trim: "Lariat",
    registration: "2023-07-15",
    vehicleGroup: "Commercial",
    ownership: "Owned",
    color: "Blue",
    bodyType: "Pickup",
    msrp: "35000",
    status: "Inactive",
    createdAt: "2024-03-12",
    updatedAt: "2024-06-15",
    draftedAt: null,
    actionMessage: "Under maintenance",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    vehicle: "Nissan Altima",
    vin: "1N4AL3AP1JC123456",
    licensePlate: "RAJ-4545",
    vehicleType: "Sedan",
    year: "2022",
    make: "Nissan",
    model: "Altima",
    trim: "SL",
    registration: "2023-09-05",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "Silver",
    bodyType: "Sedan",
    msrp: "25000",
    status: "Active",
    createdAt: "2024-04-02",
    updatedAt: "2024-07-01",
    draftedAt: null,
    actionMessage: "Newly purchased",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    vehicle: "BMW X5",
    vin: "5UXKR0C57F0P12345",
    licensePlate: "KHL-7777",
    vehicleType: "SUV",
    year: "2020",
    make: "BMW",
    model: "X5",
    trim: "xDrive40i",
    registration: "2023-04-18",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "White",
    bodyType: "SUV",
    msrp: "60000",
    status: "Active",
    createdAt: "2024-02-20",
    updatedAt: "2024-05-15",
    draftedAt: null,
    actionMessage: "Premium SUV",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    vehicle: "Tesla Model 3",
    vin: "5YJ3E1EA7JF123456",
    licensePlate: "DHK-5555",
    vehicleType: "Electric",
    year: "2021",
    make: "Tesla",
    model: "Model 3",
    trim: "Performance",
    registration: "2023-08-01",
    vehicleGroup: "Passenger",
    ownership: "Leased",
    color: "Red",
    bodyType: "Sedan",
    msrp: "55000",
    status: "Inactive",
    createdAt: "2024-03-05",
    updatedAt: "2024-06-25",
    draftedAt: null,
    actionMessage: "Returned to lessor",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    vehicle: "Hyundai Tucson",
    vin: "KM8J3CA46JU123456",
    licensePlate: "BAR-8888",
    vehicleType: "SUV",
    year: "2019",
    make: "Hyundai",
    model: "Tucson",
    trim: "Limited",
    registration: "2023-03-10",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "Gray",
    bodyType: "SUV",
    msrp: "28000",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-05-22",
    draftedAt: null,
    actionMessage: "Family vehicle",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    vehicle: "Mercedes-Benz C-Class",
    vin: "WDDWF4JBXKF123456",
    licensePlate: "MIR-2222",
    vehicleType: "Sedan",
    year: "2020",
    make: "Mercedes-Benz",
    model: "C-Class",
    trim: "C300",
    registration: "2023-02-15",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "Black",
    bodyType: "Sedan",
    msrp: "42000",
    status: "Active",
    createdAt: "2024-02-01",
    updatedAt: "2024-04-25",
    draftedAt: null,
    actionMessage: "Luxury sedan",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "9",
    vehicle: "Chevrolet Malibu",
    vin: "1G1ZD5ST2JF123456",
    licensePlate: "COX-9999",
    vehicleType: "Sedan",
    year: "2018",
    make: "Chevrolet",
    model: "Malibu",
    trim: "LT",
    registration: "2023-01-12",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "Blue",
    bodyType: "Sedan",
    msrp: "23000",
    status: "Inactive",
    createdAt: "2024-03-08",
    updatedAt: "2024-06-10",
    draftedAt: null,
    actionMessage: "Sold",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    vehicle: "Kia Sportage",
    vin: "KNDPM3AC3K1234567",
    licensePlate: "NAR-3333",
    vehicleType: "SUV",
    year: "2022",
    make: "Kia",
    model: "Sportage",
    trim: "EX",
    registration: "2023-11-11",
    vehicleGroup: "Passenger",
    ownership: "Leased",
    color: "White",
    bodyType: "SUV",
    msrp: "27000",
    status: "Active",
    createdAt: "2024-05-01",
    updatedAt: "2024-06-20",
    draftedAt: null,
    actionMessage: "Leased SUV",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    vehicle: "Mazda CX-5",
    vin: "JM3KFBDM5J0123456",
    licensePlate: "SYL-4444",
    vehicleType: "SUV",
    year: "2021",
    make: "Mazda",
    model: "CX-5",
    trim: "Grand Touring",
    registration: "2023-10-10",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "Silver",
    bodyType: "SUV",
    msrp: "32000",
    status: "Active",
    createdAt: "2024-04-15",
    updatedAt: "2024-06-28",
    draftedAt: null,
    actionMessage: "Daily commuter",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    vehicle: "Audi Q7",
    vin: "WA1LAAF71KD123456",
    licensePlate: "DHK-1212",
    vehicleType: "SUV",
    year: "2023",
    make: "Audi",
    model: "Q7",
    trim: "Premium Plus",
    registration: "2023-12-01",
    vehicleGroup: "Passenger",
    ownership: "Owned",
    color: "Black",
    bodyType: "SUV",
    msrp: "65000",
    status: "Active",
    createdAt: "2024-06-01",
    updatedAt: "2024-07-10",
    draftedAt: null,
    actionMessage: "Flagship SUV",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function VehiclesDataTable({
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
  const canCreate = usePermission("vehicles", "create");

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
      accessorKey: "vin",
      title: "VIN",
      options: [...new Set(mockTableData.map((item) => item.vin))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("vin").localeCompare(row2.getValue("vin"));
      },
      size: 200,
      minSize: 200,
      meta: {
        exportLabel: "vin",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "licensePlate",
      title: "License Plate",
      options: [...new Set(mockTableData.map((item) => item.licensePlate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("licensePlate")
          .localeCompare(row2.getValue("licensePlate"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "licensePlate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vehicleType",
      title: "Vehicle Type",
      options: [...new Set(mockTableData.map((item) => item.vehicleType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vehicleType")
          .localeCompare(row2.getValue("vehicleType"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "vehicleType",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "year",
      title: "Year",
      options: [...new Set(mockTableData.map((item) => item.year))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("year").localeCompare(row2.getValue("year"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "year",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "make",
      title: "Make",
      options: [...new Set(mockTableData.map((item) => item.make))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("make").localeCompare(row2.getValue("make"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "make",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "model",
      title: "Model",
      options: [...new Set(mockTableData.map((item) => item.model))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("model").localeCompare(row2.getValue("model"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "model",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "trim",
      title: "Trim",
      options: [...new Set(mockTableData.map((item) => item.trim))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("trim").localeCompare(row2.getValue("trim"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "trim",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "registration",
      title: "Registration",
      options: [...new Set(mockTableData.map((item) => item.registration))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("registration")
          .localeCompare(row2.getValue("registration"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "registration",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vehicleGroup",
      title: "Vehicle Group",
      options: [...new Set(mockTableData.map((item) => item.vehicleGroup))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("vehicleGroup")
          .localeCompare(row2.getValue("vehicleGroup"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "vehicleGroup",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "ownership",
      title: "Ownership",
      options: [...new Set(mockTableData.map((item) => item.ownership))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("ownership")
          .localeCompare(row2.getValue("ownership"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "ownership",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "color",
      title: "Color",
      options: [...new Set(mockTableData.map((item) => item.color))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("color").localeCompare(row2.getValue("color"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "color",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "bodyType",
      title: "Body Type",
      options: [...new Set(mockTableData.map((item) => item.bodyType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bodyType")
          .localeCompare(row2.getValue("bodyType"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "bodyType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "msrp",
      title: "MSRP",
      options: [...new Set(mockTableData.map((item) => item.msrp))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("msrp").localeCompare(row2.getValue("msrp"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "msrp",
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
      fixedColumns={["vehicle", "vin"]} // Pin leave types column
      pathName="vehicles"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
