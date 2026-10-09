/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockDeliveryNotes = [
  {
    id: "1",
    deliveryNo: "DN001",
    branch: "Main Branch",
    deliveryDate: "2024-01-15",
    customerName: "ABC Corporation",
    salesmen: "John Smith",
    customerReference: "PO-2024-001",
    quotationNumber: "QT001",
    email: "contact@abccorp.com",
    address: "123 Business Ave, Downtown, NY 10001",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    deliveryNo: "DN002",
    branch: "North Branch",
    deliveryDate: "2024-01-16",
    customerName: "XYZ Ltd",
    salesmen: "Sarah Johnson",
    customerReference: "REF-XYZ-456",
    quotationNumber: "QT002",
    email: "orders@xyzltd.com",
    address: "456 Industrial Blvd, North City, CA 90210",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    deliveryNo: "DN003",
    branch: "South Branch",
    deliveryDate: "2024-01-17",
    customerName: "Global Industries",
    salesmen: "Mike Davis",
    customerReference: "ORD-2024-789",
    quotationNumber: "QT003",
    email: "procurement@globalind.com",
    address: "789 Corporate Plaza, South District, TX 75001",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "active",
  },
  {
    id: "4",
    deliveryNo: "DN004",
    branch: "East Branch",
    deliveryDate: "2024-01-18",
    customerName: "Tech Solutions Inc",
    salesmen: "Emily Wilson",
    customerReference: "PUR-2024-012",
    quotationNumber: "QT004",
    email: "orders@techsolutions.com",
    address: "321 Innovation Drive, East Valley, FL 33101",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    deliveryNo: "DN005",
    branch: "West Branch",
    deliveryDate: "2024-01-19",
    customerName: "Metro Supplies",
    salesmen: "David Brown",
    customerReference: "MS-2024-345",
    quotationNumber: "QT005",
    email: "purchasing@metrosupplies.com",
    address: "555 Commerce Street, West Town, WA 98001",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    deliveryNo: "DN006",
    branch: "Central Branch",
    deliveryDate: "2024-01-20",
    customerName: "Prime Logistics",
    salesmen: "Lisa Garcia",
    customerReference: "PL-REF-678",
    quotationNumber: "QT006",
    email: "logistics@primelogistics.com",
    address: "888 Distribution Center, Central City, IL 60601",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    deliveryNo: "DN007",
    branch: "Downtown Branch",
    deliveryDate: "2024-01-21",
    customerName: "Urban Enterprises",
    salesmen: "Robert Lee",
    customerReference: "UE-ORDER-901",
    quotationNumber: "QT007",
    email: "orders@urbanenterprises.com",
    address: "999 Urban Plaza, Downtown District, NY 10002",
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "8",
    deliveryNo: "DN008",
    branch: "Suburban Branch",
    deliveryDate: "2024-01-22",
    customerName: "Retail Partners Co",
    salesmen: "Amanda Taylor",
    customerReference: "RP-2024-234",
    quotationNumber: "QT008",
    email: "retail@retailpartners.com",
    address: "111 Suburban Mall, Suburban Area, NJ 07001",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "active",
  },
  {
    id: "9",
    deliveryNo: "DN009",
    branch: "Uptown Branch",
    deliveryDate: "2024-01-23",
    customerName: "Express Trading",
    salesmen: "Kevin White",
    customerReference: "ET-REF-567",
    quotationNumber: "QT009",
    email: "trading@expresstrading.com",
    address: "222 Uptown Square, Uptown District, NY 10003",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    deliveryNo: "DN010",
    branch: "Riverside Branch",
    deliveryDate: "2024-01-24",
    customerName: "Coastal Imports",
    salesmen: "Jennifer Chen",
    customerReference: "CI-PO-890",
    quotationNumber: "QT010",
    email: "imports@coastalimports.com",
    address: "333 Riverside Drive, Coastal Area, CA 90401",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
  {
    id: "11",
    deliveryNo: "DN011",
    branch: "Hillside Branch",
    deliveryDate: "2024-01-25",
    customerName: "Mountain View Corp",
    salesmen: "Thomas Anderson",
    customerReference: "MVC-ORDER-123",
    quotationNumber: "QT011",
    email: "orders@mountainview.com",
    address: "444 Hillside Avenue, Mountain District, CO 80301",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    isDeleted: false,
    status: "active",
  },
  {
    id: "12",
    deliveryNo: "DN012",
    branch: "Lakeside Branch",
    deliveryDate: "2024-01-26",
    customerName: "Lakefront Industries",
    salesmen: "Michelle Rodriguez",
    customerReference: "LF-REF-456",
    quotationNumber: "QT012",
    email: "industry@lakefront.com",
    address: "555 Lakeside Boulevard, Lake District, MI 48001",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    isDeleted: false,
    status: "active",
  },
  {
    id: "13",
    deliveryNo: "DN013",
    branch: "Garden Branch",
    deliveryDate: "2024-01-27",
    customerName: "Green Valley Co",
    salesmen: "James Wilson",
    customerReference: "GV-PO-789",
    quotationNumber: "QT013",
    email: "green@greenvalley.com",
    address: "666 Garden Park, Valley District, OR 97001",
    isActive: true,
    isDraft: true,
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "14",
    deliveryNo: "DN014",
    branch: "Plaza Branch",
    deliveryDate: "2024-01-28",
    customerName: "Plaza Retailers",
    salesmen: "Maria Gonzalez",
    customerReference: "PR-ORDER-012",
    quotationNumber: "QT014",
    email: "retail@plazaretailers.com",
    address: "777 Plaza Center, Shopping District, AZ 85001",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    isDeleted: false,
    status: "active",
  },
  {
    id: "15",
    deliveryNo: "DN015",
    branch: "Metro Branch",
    deliveryDate: "2024-01-29",
    customerName: "Metropolitan Goods",
    salesmen: "Christopher Lee",
    customerReference: "MG-REF-345",
    quotationNumber: "QT015",
    email: "metro@metropolitangoods.com",
    address: "888 Metropolitan Avenue, Metro Area, DC 20001",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    isDeleted: false,
    status: "active",
  },
  {
    id: "16",
    deliveryNo: "DN016",
    branch: "Business District",
    deliveryDate: "2024-01-30",
    customerName: "Corporate Solutions",
    salesmen: "Patricia Martinez",
    customerReference: "CS-PO-678",
    quotationNumber: "QT016",
    email: "corporate@corpsolutions.com",
    address: "999 Business Tower, Financial District, NY 10004",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    isDeleted: false,
    status: "active",
  },
  {
    id: "17",
    deliveryNo: "DN017",
    branch: "Airport Branch",
    deliveryDate: "2024-01-31",
    customerName: "Sky Logistics",
    salesmen: "Daniel Kim",
    customerReference: "SL-ORDER-901",
    quotationNumber: "QT017",
    email: "sky@skylogistics.com",
    address: "101 Airport Terminal, Aviation District, GA 30301",
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    isDeleted: false,
    status: "active",
  },
  {
    id: "18",
    deliveryNo: "DN018",
    branch: "Mall Branch",
    deliveryDate: "2024-02-01",
    customerName: "Shopping Center Inc",
    salesmen: "Rachel Thompson",
    customerReference: "SC-REF-234",
    quotationNumber: "QT018",
    email: "shopping@shoppingcenter.com",
    address: "202 Mall Entrance, Shopping Center, TX 75201",
    isActive: false,
    isDraft: true,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "19",
    deliveryNo: "DN019",
    branch: "Harbor Branch",
    deliveryDate: "2024-02-02",
    customerName: "Port Authority",
    salesmen: "Brian Clark",
    customerReference: "PA-PO-567",
    quotationNumber: "QT019",
    email: "port@portauthority.com",
    address: "303 Harbor View, Port District, CA 90801",
    isActive: true,
    isDraft: false,
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    isDeleted: false,
    status: "active",
  },
  {
    id: "20",
    deliveryNo: "DN020",
    branch: "Industrial Branch",
    deliveryDate: "2024-02-03",
    customerName: "Manufacturing Corp",
    salesmen: "Nicole Johnson",
    customerReference: "MC-ORDER-890",
    quotationNumber: "QT020",
    email: "manufacturing@mfgcorp.com",
    address: "404 Industrial Park, Manufacturing Zone, OH 44101",
    isActive: true,
    isDraft: false,
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    isDeleted: false,
    status: "active",
  },
];

export default function DeliveryNoteDataTable({
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
      accessorKey: "deliveryNo",
      title: "Delivery No.",
      options: [
        "DN001",
        "DN002",
        "DN003",
        "DN004",
        "DN005",
        "DN006",
        "DN007",
        "DN008",
        "DN009",
        "DN010",
        "DN011",
        "DN012",
        "DN013",
        "DN014",
        "DN015",
        "DN016",
        "DN017",
        "DN018",
        "DN019",
        "DN020",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("deliveryNo")
          .localeCompare(row2.getValue("deliveryNo"));
      },
      size: 140,
      minSize: 120,
    },
    {
      accessorKey: "branch",
      title: "Branch",
      options: [
        "Main Branch",
        "North Branch",
        "South Branch",
        "East Branch",
        "West Branch",
        "Central Branch",
        "Downtown Branch",
        "Suburban Branch",
        "Uptown Branch",
        "Riverside Branch",
        "Hillside Branch",
        "Lakeside Branch",
        "Garden Branch",
        "Plaza Branch",
        "Metro Branch",
        "Business District",
        "Airport Branch",
        "Mall Branch",
        "Harbor Branch",
        "Industrial Branch",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("branch").localeCompare(row2.getValue("branch"));
      },
      size: 160,
      minSize: 140,
    },
    {
      accessorKey: "deliveryDate",
      title: "Delivery Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("deliveryDate")).getTime() -
          new Date(row2.getValue("deliveryDate")).getTime()
        );
      },
      size: 130,
      minSize: 110,
      meta: {
        type: "date",
        exportLabel: "Delivery Date",
      },
    },
    {
      accessorKey: "customerName",
      title: "Customer Name",
      options: [
        "ABC Corporation",
        "XYZ Ltd",
        "Global Industries",
        "Tech Solutions Inc",
        "Metro Supplies",
        "Prime Logistics",
        "Urban Enterprises",
        "Retail Partners Co",
        "Express Trading",
        "Coastal Imports",
        "Mountain View Corp",
        "Lakefront Industries",
        "Green Valley Co",
        "Plaza Retailers",
        "Metropolitan Goods",
        "Corporate Solutions",
        "Sky Logistics",
        "Shopping Center Inc",
        "Port Authority",
        "Manufacturing Corp",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerName")
          .localeCompare(row2.getValue("customerName"));
      },
      size: 180,
      minSize: 160,
    },
    {
      accessorKey: "salesmen",
      title: "Salesmen",
      options: [
        "John Smith",
        "Sarah Johnson",
        "Mike Davis",
        "Emily Wilson",
        "David Brown",
        "Lisa Garcia",
        "Robert Lee",
        "Amanda Taylor",
        "Kevin White",
        "Jennifer Chen",
        "Thomas Anderson",
        "Michelle Rodriguez",
        "James Wilson",
        "Maria Gonzalez",
        "Christopher Lee",
        "Patricia Martinez",
        "Daniel Kim",
        "Rachel Thompson",
        "Brian Clark",
        "Nicole Johnson",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("salesmen")
          .localeCompare(row2.getValue("salesmen"));
      },
      size: 150,
      minSize: 130,
    },
    {
      accessorKey: "customerReference",
      title: "Customer Reference",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customerReference")
          .localeCompare(row2.getValue("customerReference"));
      },
      size: 160,
      minSize: 140,
    },
    {
      accessorKey: "quotationNumber",
      title: "Quotation",
      options: [
        "QT001",
        "QT002",
        "QT003",
        "QT004",
        "QT005",
        "QT006",
        "QT007",
        "QT008",
        "QT009",
        "QT010",
        "QT011",
        "QT012",
        "QT013",
        "QT014",
        "QT015",
        "QT016",
        "QT017",
        "QT018",
        "QT019",
        "QT020",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("quotationNumber")
          .localeCompare(row2.getValue("quotationNumber"));
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "email",
      title: "Email",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("email").localeCompare(row2.getValue("email"));
      },
      size: 200,
      minSize: 180,
    },
    {
      accessorKey: "address",
      title: "Address",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("address").localeCompare(row2.getValue("address"));
      },
      size: 300,
      minSize: 250,
    },
    {
      accessorKey: "isActive",
      title: "Active Status",
      options: ["Active", "Inactive"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        const statusText = cellValue ? "Active" : "Inactive";
        return filterValue.includes(statusText);
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("isActive") ? "Active" : "Inactive";
        const val2 = row2.getValue("isActive") ? "Active" : "Inactive";
        return val1.localeCompare(val2);
      },
      size: 120,
      minSize: 100,
      meta: {
        type: "boolean",
        exportLabel: "Active Status",
      },
    },
    {
      accessorKey: "isDraft",
      title: "Draft Status",
      options: ["Draft", "Final"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        const statusText = cellValue ? "Draft" : "Final";
        return filterValue.includes(statusText);
      },
      sortingFn: (row1: any, row2: any) => {
        const val1 = row1.getValue("isDraft") ? "Draft" : "Final";
        const val2 = row2.getValue("isDraft") ? "Draft" : "Final";
        return val1.localeCompare(val2);
      },
      size: 110,
      minSize: 90,
      meta: {
        type: "boolean",
        exportLabel: "Draft Status",
      },
    },
    {
      accessorKey: "status",
      title: "Overall Status",
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
      minSize: 100,
      meta: {
        exportLabel: "Overall Status",
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 130,
      minSize: 110,
      meta: {
        type: "date",
        exportLabel: "Created Date",
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated Date",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        if (Array.isArray(filterValue)) {
          return filterValue.some((val: string) =>
            cellValue.toLowerCase().includes(val.toLowerCase())
          );
        }
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 130,
      minSize: 110,
      meta: {
        type: "date",
        exportLabel: "Updated Date",
      },
    },
  ];

  // Filter logic for delivery note data
  const filteredData = mockDeliveryNotes.filter((delivery) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return delivery.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !delivery.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return delivery.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return delivery.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return delivery.updatedAt !== delivery.createdAt;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      columnData={filteredData}
      componentColumns={componentColumns}
      viewMode={viewMode}
      setViewMode={setViewMode}
      fixedColumns={[]}
    />
  );
}
