/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/FixedColumnDataTable";

const mockTaxes = [
  {
    id: "1",
    name: "VAT Standard Rate",
    taxRate: 15.0,
    isDefault: true,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isDeleted: false,
    status: "active",
  },
  {
    id: "2",
    name: "VAT Zero Rate",
    taxRate: 0.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isDeleted: false,
    status: "active",
  },
  {
    id: "3",
    name: "VAT Reduced Rate",
    taxRate: 5.0,
    isDefault: false,
    isActive: false,
    isDraft: true,
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isDeleted: false,
    status: "draft",
  },
  {
    id: "4",
    name: "Corporate Tax",
    taxRate: 20.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isDeleted: false,
    status: "active",
  },
  {
    id: "5",
    name: "Income Tax",
    taxRate: 10.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isDeleted: false,
    status: "active",
  },
  {
    id: "6",
    name: "Excise Tax",
    taxRate: 25.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    isDeleted: false,
    status: "active",
  },
  {
    id: "7",
    name: "Customs Duty",
    taxRate: 12.5,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    isDeleted: false,
    status: "active",
  },
  {
    id: "8",
    name: "Property Tax",
    taxRate: 2.5,
    isDefault: false,
    isActive: false,
    isDraft: false,
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    isDeleted: false,
    status: "inactive",
  },
  {
    id: "9",
    name: "Service Tax",
    taxRate: 8.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    isDeleted: false,
    status: "active",
  },
  {
    id: "10",
    name: "Luxury Tax",
    taxRate: 30.0,
    isDefault: false,
    isActive: true,
    isDraft: false,
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    isDeleted: false,
    status: "active",
  },
];

export default function TaxesDataTable({
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
      accessorKey: "name",
      title: "Tax Name",
      options: [
        "VAT Standard Rate",
        "VAT Zero Rate",
        "VAT Reduced Rate",
        "Corporate Tax",
        "Income Tax",
        "Excise Tax",
        "Customs Duty",
        "Property Tax",
        "Service Tax",
        "Luxury Tax",
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((val: string) =>
          cellValue.toLowerCase().includes(val.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("name").localeCompare(row2.getValue("name"));
      },
      size: 200,
      minSize: 150,
    },
    {
      accessorKey: "taxRate",
      title: "Tax Rate (%)",
      options: [0.0, 2.5, 5.0, 8.0, 10.0, 12.5, 15.0, 18.0, 20.0, 25.0, 30.0],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.some((val: number) => cellValue === val);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("taxRate") - row2.getValue("taxRate");
      },
      size: 120,
      minSize: 100,
    },
    {
      accessorKey: "isDefault",
      title: "Default",
      options: [true, false],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("isDefault") === row2.getValue("isDefault")
          ? 0
          : row1.getValue("isDefault")
          ? -1
          : 1;
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "isActive",
      title: "Active",
      options: [true, false],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("isActive") === row2.getValue("isActive")
          ? 0
          : row1.getValue("isActive")
          ? -1
          : 1;
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "isDraft",
      title: "Draft",
      options: [true, false],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as boolean;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("isDraft") === row2.getValue("isDraft")
          ? 0
          : row1.getValue("isDraft")
          ? -1
          : 1;
      },
      size: 100,
      minSize: 80,
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
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "status",
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("createdAt")).getTime() -
          new Date(row2.getValue("createdAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [],
      sortingFn: (row1: any, row2: any) => {
        return (
          new Date(row1.getValue("updatedAt")).getTime() -
          new Date(row2.getValue("updatedAt")).getTime()
        );
      },
      size: 100,
      minSize: 80,
    },
  ];

  const filteredData = mockTaxes.filter((tax) => {
    if (!dataTableFilter || !dataTableFilter.status) {
      return true;
    }
    if (dataTableFilter.status === "Active") {
      return tax.status === "active";
    } else if (dataTableFilter.status === "Inactive") {
      return tax.status === "inactive";
    } else if (dataTableFilter.status === "Draft") {
      return tax.status === "draft";
    } else if (dataTableFilter.status === "Deleted") {
      return tax.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return tax.updatedAt !== tax.createdAt;
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
