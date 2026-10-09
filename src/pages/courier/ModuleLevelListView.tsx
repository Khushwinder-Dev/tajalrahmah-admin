/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TableDataType = {
  id: string;

  documentRequired: string;
  courierName: string;
  contactPerson: string;
  airwayLocation: string;
  trackingNo: string;
  mobileNo: string;
  email: string;

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

const mockTableData: TableDataType[] = [
  {
    id: "1",
    documentRequired: "Invoice Copy",
    courierName: "DHL Express",
    contactPerson: "Rahim Uddin",
    airwayLocation: "Dhaka Airport",
    trackingNo: "DHL123456789",
    mobileNo: "+8801711000001",
    email: "rahim@dhl.com",
    status: "Active",
    createdAt: "2025-08-01T10:30:00Z",
    updatedAt: "2025-08-05T12:00:00Z",
    draftedAt: null,
    actionMessage: "Document uploaded successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "2",
    documentRequired: "Packing List",
    courierName: "FedEx",
    contactPerson: "Karim Ahmed",
    airwayLocation: "Chittagong Airport",
    trackingNo: "FDX987654321",
    mobileNo: "+8801711000002",
    email: "karim@fedex.com",
    status: "Active",
    createdAt: "2025-08-02T09:20:00Z",
    updatedAt: "2025-08-06T11:15:00Z",
    draftedAt: null,
    actionMessage: "Pending verification",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "3",
    documentRequired: "BL Copy",
    courierName: "UPS",
    contactPerson: "Sadia Khan",
    airwayLocation: "Dhaka Cargo",
    trackingNo: "UPS111223344",
    mobileNo: "+8801711000003",
    email: "sadia@ups.com",
    status: "Draft",
    createdAt: "2025-08-03T08:15:00Z",
    updatedAt: "2025-08-04T14:40:00Z",
    draftedAt: "2025-08-03T08:15:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    documentRequired: "Commercial Invoice",
    courierName: "TNT",
    contactPerson: "Abdul Malik",
    airwayLocation: "Chittagong Cargo",
    trackingNo: "TNT555666777",
    mobileNo: "+8801711000004",
    email: "malik@tnt.com",
    status: "Deleted",
    createdAt: "2025-08-01T07:10:00Z",
    updatedAt: "2025-08-02T09:50:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "5",
    documentRequired: "Certificate of Origin",
    courierName: "Aramex",
    contactPerson: "Nusrat Jahan",
    airwayLocation: "Sylhet Airport",
    trackingNo: "ARMX888999000",
    mobileNo: "+8801711000005",
    email: "nusrat@aramex.com",
    status: "Active",
    createdAt: "2025-08-05T13:05:00Z",
    updatedAt: "2025-08-07T15:20:00Z",
    draftedAt: null,
    actionMessage: "Delivered successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "6",
    documentRequired: "Insurance Certificate",
    courierName: "DHL Express",
    contactPerson: "Hasan Mahmud",
    airwayLocation: "Dhaka Airport",
    trackingNo: "DHL654321000",
    mobileNo: "+8801711000006",
    email: "hasan@dhl.com",
    status: "Inactive",
    createdAt: "2025-08-06T12:00:00Z",
    updatedAt: "2025-08-07T16:30:00Z",
    draftedAt: null,
    actionMessage: "Inactive record",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "7",
    documentRequired: "Invoice Copy",
    courierName: "FedEx",
    contactPerson: "Mahfuz Alam",
    airwayLocation: "Chittagong Airport",
    trackingNo: "FDX123456111",
    mobileNo: "+8801711000007",
    email: "mahfuz@fedex.com",
    status: "Active",
    createdAt: "2025-08-07T09:40:00Z",
    updatedAt: "2025-08-09T10:10:00Z",
    draftedAt: null,
    actionMessage: "Processing",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "8",
    documentRequired: "Packing List",
    courierName: "UPS",
    contactPerson: "Shamim Reza",
    airwayLocation: "Dhaka Cargo",
    trackingNo: "UPS222333444",
    mobileNo: "+8801711000008",
    email: "shamim@ups.com",
    status: "Draft",
    createdAt: "2025-08-08T10:50:00Z",
    updatedAt: "2025-08-09T11:25:00Z",
    draftedAt: "2025-08-08T10:50:00Z",
    actionMessage: "Draft saved",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    documentRequired: "BL Copy",
    courierName: "TNT",
    contactPerson: "Rafiq Islam",
    airwayLocation: "Sylhet Cargo",
    trackingNo: "TNT999000111",
    mobileNo: "+8801711000009",
    email: "rafiq@tnt.com",
    status: "Deleted",
    createdAt: "2025-08-09T14:20:00Z",
    updatedAt: "2025-08-10T15:00:00Z",
    draftedAt: null,
    actionMessage: "Record deleted",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "10",
    documentRequired: "Commercial Invoice",
    courierName: "Aramex",
    contactPerson: "Selina Akter",
    airwayLocation: "Chittagong Airport",
    trackingNo: "ARMX555444333",
    mobileNo: "+8801711000010",
    email: "selina@aramex.com",
    status: "Active",
    createdAt: "2025-08-10T11:15:00Z",
    updatedAt: "2025-08-11T12:45:00Z",
    draftedAt: null,
    actionMessage: "Shipment confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "11",
    documentRequired: "Certificate of Origin",
    courierName: "DHL Express",
    contactPerson: "Jamil Hossain",
    airwayLocation: "Dhaka Airport",
    trackingNo: "DHL777888999",
    mobileNo: "+8801711000011",
    email: "jamil@dhl.com",
    status: "Inactive",
    createdAt: "2025-08-11T12:30:00Z",
    updatedAt: "2025-08-12T14:00:00Z",
    draftedAt: null,
    actionMessage: "Inactive record",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "12",
    documentRequired: "Insurance Certificate",
    courierName: "FedEx",
    contactPerson: "Farhana Rahman",
    airwayLocation: "Sylhet Airport",
    trackingNo: "FDX444555666",
    mobileNo: "+8801711000012",
    email: "farhana@fedex.com",
    status: "Active",
    createdAt: "2025-08-12T15:40:00Z",
    updatedAt: "2025-08-13T17:10:00Z",
    draftedAt: null,
    actionMessage: "Delivered successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function CourierDataTable({
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
  const canCreate = usePermission("courier", "create");

  const componentColumns = [
    {
      accessorKey: "courierName",
      title: "Courier Name",
      options: [...new Set(mockTableData.map((item) => item.courierName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("courierName")
          .localeCompare(row2.getValue("courierName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "courierName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "contactPerson",
      title: "Contact Person",
      options: [...new Set(mockTableData.map((item) => item.contactPerson))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("contactPerson")
          .localeCompare(row2.getValue("contactPerson"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "contactPerson",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "airwayLocation",
      title: "Airway Location",
      options: [...new Set(mockTableData.map((item) => item.airwayLocation))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("airwayLocation")
          .localeCompare(row2.getValue("airwayLocation"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "airwayLocation",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "trackingNo",
      title: "Tracking No",
      options: [...new Set(mockTableData.map((item) => item.trackingNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("trackingNo")
          .localeCompare(row2.getValue("trackingNo"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "trackingNo",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "mobileNo",
      title: "Mobile No",
      options: [...new Set(mockTableData.map((item) => item.mobileNo))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("mobileNo")
          .localeCompare(row2.getValue("mobileNo"));
      },
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "mobileNo",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "email",
      title: "Email",
      options: [...new Set(mockTableData.map((item) => item.email))],
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
      size: 150,
      minSize: 150,
      meta: {
        exportLabel: "email",
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
      fixedColumns={["courierName"]} // Pin leave types column
      pathName="courier"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
