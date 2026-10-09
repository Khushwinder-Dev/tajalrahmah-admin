/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { useCountriesPermissions } from "@/hooks/usePermissions";

const mockRooms = [
  {
    id: "1",
    roomType: "Deluxe Suite",
    roomSize: "350",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "4500",
    bedCharge: "500",
    personalCharges: "300",
    review: "Excellent room with sea view",
    description:
      "Spacious deluxe suite with modern amenities, a king-size bed, and a private balcony.",
    bookingType: "( 1800 x 1500 )",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    roomType: "Executive Room",
    roomSize: "320",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "4200",
    bedCharge: "400",
    personalCharges: "250",
    review: "Cozy and comfortable with city view",
    description:
      "Well-furnished executive room with a queen-size bed, work desk, and modern bathroom.",
    bookingType: "( 1600 x 1400 )",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    status: "active",
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    roomType: "Modern Office Space",
    roomSize: "500",
    roomSizeName: "sq ft",
    capacity: "8",
    extraCapacity: "2",
    rate: "8000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Perfect for corporate meetings",
    description:
      "Central London, modern office space with conference facilities and fast Wi-Fi.",
    bookingType: "( 3200 x 2500 )",
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
    roomType: "Luxury Penthouse",
    roomSize: "1200",
    roomSizeName: "sq ft",
    capacity: "6",
    extraCapacity: "2",
    rate: "20000",
    bedCharge: "1000",
    personalCharges: "500",
    review: "Breathtaking city and marina views",
    description:
      "Dubai Marina, luxury penthouse suite with rooftop pool and premium services.",
    bookingType: "( 5000 x 4200 )",
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
    roomType: "Small Café Interior",
    roomSize: "300",
    roomSizeName: "sq ft",
    capacity: "20",
    extraCapacity: "5",
    rate: "6000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Cozy ambiance for coffee lovers",
    description:
      "Paris, small café shop interior with vintage décor and warm lighting.",
    bookingType: "( 1500 x 1200 )",
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
    roomType: "Conference Hall",
    roomSize: "1500",
    roomSizeName: "sq ft",
    capacity: "100",
    extraCapacity: "20",
    rate: "25000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Premium facilities for business events",
    description:
      "Singapore, premium conference hall with state-of-the-art AV equipment.",
    bookingType: "( 4500 x 3800 )",
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
    roomType: "Urban Apartment",
    roomSize: "400",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "5500",
    bedCharge: "500",
    personalCharges: "300",
    review: "Compact and efficient city living",
    description:
      "Tokyo, compact urban apartment with modern kitchen and smart storage.",
    bookingType: "( 2000 x 1700 )",
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
    roomType: "Boutique Hotel Room",
    roomSize: "350",
    roomSizeName: "sq ft",
    capacity: "2",
    extraCapacity: "1",
    rate: "4800",
    bedCharge: "400",
    personalCharges: "250",
    review: "Charming and stylish stay",
    description:
      "Rome, boutique hotel room with artistic décor and private balcony.",
    bookingType: "( 2400 x 2000 )",
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
    roomType: "Private Art Gallery",
    roomSize: "900",
    roomSizeName: "sq ft",
    capacity: "40",
    extraCapacity: "5",
    rate: "12000",
    bedCharge: "0",
    personalCharges: "0",
    review: "Elegant exhibition space",
    description:
      "Berlin, private art gallery with modern lighting and climate control.",
    bookingType: "( 2800 x 2300 )",
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
    roomType: "Beachfront Villa",
    roomSize: "1500",
    roomSizeName: "sq ft",
    capacity: "6",
    extraCapacity: "2",
    rate: "18000",
    bedCharge: "1000",
    personalCharges: "500",
    review: "Stunning oceanfront location",
    description:
      "Sydney, beachfront holiday villa with private pool and BBQ area.",
    bookingType: "( 4000 x 3500 )",
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

export default function RoomsDataTable2({
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
      accessorKey: "roomType",
      title: "Room Type",
      options: [...new Set(mockRooms.map((item) => item.roomType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue?.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("roomType")
          .localeCompare(row2.getValue("roomType"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "roomType",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "roomSize",
      title: "Room Size",
      options: [...new Set(mockRooms.map((item) => item.roomSize))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("roomSize")
          .localeCompare(row2.getValue("roomSize"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "roomSize",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "capacity",
      title: "Capacity",
      options: [...new Set(mockRooms.map((item) => item.capacity))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("capacity")
          .localeCompare(row2.getValue("capacity"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "capacity",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "extraCapacity",
      title: "Extra Capacity",
      options: [...new Set(mockRooms.map((item) => item.extraCapacity))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("extraCapacity")
          .localeCompare(row2.getValue("extraCapacity"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "extraCapacity",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "description",
      title: "Description",
      options: [...new Set(mockRooms.map((item) => item.description))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "description",
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

  const filteredData = mockRooms.filter((finance) => {
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
      fixedColumns={["roomType", "status"]} // Pin country name column
      pathName="rooms"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
