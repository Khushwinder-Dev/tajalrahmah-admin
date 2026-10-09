/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

type SupplierGroup = {
  id: string;
  groupName: string; // required
  vatNumber?: string;
  website?: string;
  phone?: string;
  currency?: "USD" | "EUR" | "BDT" | "INR" | "GBP" | string;
  country?: string;
  language?: "English" | "Bengali" | "Hindi" | "Spanish" | "French" | string;
  street?: string;
  postCode?: string;
  documents?: string[]; // array of document URLs or names

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

const suppliersGroups: SupplierGroup[] = [
  {
    id: "1",
    groupName: "Global Tech Solutions Group",
    vatNumber: "VAT001234",
    website: "https://globaltech.com",
    phone: "+1-202-555-0100",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "123 Silicon Ave",
    postCode: "90001",
    documents: ["company-profile.pdf", "vat-certificate.pdf"],
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Supplier group created",
    createdAt: "2023-01-10",
    updatedAt: "2023-04-20",
    draftedAt: "",
  },
  {
    id: "2",
    groupName: "Dhaka Electronics Group",
    vatNumber: "VATBD1245",
    website: "http://dhakaelectronics.com",
    phone: "+880-2-9889988",
    currency: "BDT",
    country: "Bangladesh",
    language: "Bengali",
    street: "Gulshan-1",
    postCode: "1212",
    documents: ["tin-certificate.pdf"],
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Supplier group info updated",
    createdAt: "2023-02-15",
    updatedAt: "2023-06-01",
    draftedAt: "",
  },
  {
    id: "3",
    groupName: "Mumbai Textiles Group",
    vatNumber: "VATIN9981",
    website: "https://mtx.in",
    phone: "+91-98201-12345",
    currency: "INR",
    country: "India",
    language: "Hindi",
    street: "Dadar East",
    postCode: "400001",
    documents: [],
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Supplier group deactivated",
    createdAt: "2022-11-20",
    updatedAt: "2023-01-01",
    draftedAt: "",
  },
  {
    id: "4",
    groupName: "Eurozone Imports Group",
    vatNumber: "VAT1004",
    website: "mailto:sales@eurozone.com",
    phone: "",
    currency: "EUR",
    country: "Germany",
    language: "French",
    street: "",
    postCode: "",
    documents: [],
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Imported successfully",
    createdAt: "2023-03-22",
    updatedAt: "2023-03-25",
    draftedAt: "",
  },
  {
    id: "5",
    groupName: "London Supplies Group",
    vatNumber: "VAT1005",
    website: "https://londonsupplies.co.uk",
    phone: "+44-20-7946-0958",
    currency: "GBP",
    country: "United Kingdom",
    language: "English",
    street: "Downtown",
    postCode: "SW1A 1AA",
    documents: [],
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Created as draft",
    createdAt: "2023-06-01",
    updatedAt: "",
    draftedAt: "2023-06-01",
  },
  {
    id: "6",
    groupName: "Barcelona Beverages Group",
    vatNumber: "VAT1006",
    website: "https://bbev.es",
    phone: "+34-91-1234567",
    currency: "EUR",
    country: "Spain",
    language: "Spanish",
    street: "La Rambla",
    postCode: "08001",
    documents: ["license.pdf"],
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Supplier group registered",
    createdAt: "2023-07-15",
    updatedAt: "2023-08-10",
    draftedAt: "",
  },
  {
    id: "7",
    groupName: "Karachi Wholesalers Group",
    vatNumber: "VAT1007",
    website: "mailto:info@karachiw.com",
    phone: "",
    currency: "USD",
    country: "Pakistan",
    language: "English",
    street: "",
    postCode: "",
    documents: [],
    status: "inactive",
    isActive: false,
    isDeleted: true,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Supplier group deleted",
    createdAt: "2022-06-10",
    updatedAt: "2022-10-10",
    draftedAt: "",
  },
  {
    id: "8",
    groupName: "Chittagong Steel Group",
    vatNumber: "VAT1008",
    website: "mailto:sales@ctgsteel.com",
    phone: "",
    currency: "BDT",
    country: "Bangladesh",
    language: "Bengali",
    street: "",
    postCode: "",
    documents: [],
    status: "inactive",
    isActive: false,
    isDeleted: false,
    isDraft: false,
    isUpdated: false,
    actionMessage: "Inactive due to debt",
    createdAt: "2023-02-01",
    updatedAt: "2023-02-20",
    draftedAt: "",
  },
  {
    id: "9",
    groupName: "New York Goods Group",
    vatNumber: "VAT1009",
    website: "mailto:contact@nygoods.com",
    phone: "",
    currency: "USD",
    country: "United States",
    language: "English",
    street: "",
    postCode: "",
    documents: [],
    status: "active",
    isActive: true,
    isDeleted: false,
    isDraft: false,
    isUpdated: true,
    actionMessage: "Updated payment info",
    createdAt: "2023-01-05",
    updatedAt: "2023-07-07",
    draftedAt: "",
  },
  {
    id: "10",
    groupName: "Paris Decor Group",
    vatNumber: "VAT1010",
    website: "https://parisdecor.fr",
    phone: "",
    currency: "EUR",
    country: "France",
    language: "French",
    street: "Rue Saint-Honoré",
    postCode: "75001",
    documents: ["business-license.pdf"],
    status: "draft",
    isActive: false,
    isDeleted: false,
    isDraft: true,
    isUpdated: false,
    actionMessage: "Waiting for approval",
    createdAt: "2023-08-01",
    updatedAt: "",
    draftedAt: "2023-08-01",
  },
];

export default function suppliersDataTable({
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
      accessorKey: "groupName",
      title: "Supplier Group",
      options: [...new Set(suppliersGroups.map((item) => item.groupName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("groupName")
          .localeCompare(row2.getValue("groupName"));
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "groupName",
      },
    },
    {
      accessorKey: "country",
      title: "Country",
      options: [...new Set(suppliersGroups.map((item) => item.country))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("country").localeCompare(row2.getValue("country"));
      },
      size: 50,
      minSize: 50,
      meta: {
        exportLabel: "country",
      },
    },
    {
      accessorKey: "currency",
      title: "Currency",
      options: [...new Set(suppliersGroups.map((item) => item.currency))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("currency")
          .localeCompare(row2.getValue("currency"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "currency",
      },
    },
    {
      accessorKey: "vatNumber",
      title: "VAT Number",
      options: [
        ...new Set(
          suppliersGroups.map((item) => item.vatNumber).filter(Boolean)
        ),
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
          .getValue("vatNumber")
          .localeCompare(row2.getValue("vatNumber"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "vatNumber",
      },
    },
    {
      accessorKey: "website",
      title: "Website",
      options: [
        ...new Set(suppliersGroups.map((item) => item.website).filter(Boolean)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("website").localeCompare(row2.getValue("website"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "website",
      },
    },
    {
      accessorKey: "phone",
      title: "Phone",
      options: [
        ...new Set(suppliersGroups.map((item) => item.phone).filter(Boolean)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("phone").localeCompare(row2.getValue("phone"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "phone",
      },
    },
    {
      accessorKey: "language",
      title: "Language",
      options: [
        ...new Set(
          suppliersGroups.map((item) => item.language).filter(Boolean)
        ),
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
          .getValue("language")
          .localeCompare(row2.getValue("language"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "language",
      },
    },
    {
      accessorKey: "postCode",
      title: "Post Code",
      options: [...new Set(suppliersGroups.map((item) => item.postCode))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("postCode")
          .localeCompare(row2.getValue("postCode"));
      },
      size: 150,
      minSize: 100,
      meta: {
        exportLabel: "postCode",
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

  const filteredData = suppliersGroups.filter((group) => {
    if (dataTableFilter.status === "Active") {
      return group.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !group.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return group.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return group.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return group.isUpdated;
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
