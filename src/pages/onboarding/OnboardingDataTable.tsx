/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useCountriesPermissions } from "@/hooks/usePermissions";

// Onboarding interface to match the grid component
interface OnboardingItem {
  id: string;
  selectStaff: string;
  generalInformation: string;
  staffFullName: string;
  address: string;
  assetAllocation: string;
  typeOfTraining: string;
  trainingProgram: string;
  status: "Active" | "Pending" | "Draft" | "Rejected";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockOnboarding: OnboardingItem[] = [
  {
    id: "1",
    selectStaff: "John Smith",
    generalInformation: "New Employee",
    staffFullName: "John Michael Smith",
    address: "123 Main St, New York, NY 10001",
    assetAllocation: "Laptop, Phone, ID Badge",
    typeOfTraining: "Orientation",
    trainingProgram: "Company Policies & Procedures",
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    draftedAt: "2024-01-14",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "2",
    selectStaff: "Sarah Johnson",
    generalInformation: "Transfer Employee",
    staffFullName: "Sarah Elizabeth Johnson",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    assetAllocation: "Desktop, Monitor, Keyboard",
    typeOfTraining: "Technical",
    trainingProgram: "Software Development",
    status: "Active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
    draftedAt: "2024-01-15",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "3",
    selectStaff: "Mike Davis",
    generalInformation: "Intern",
    staffFullName: "Michael James Davis",
    address: "789 Pine Rd, Chicago, IL 60601",
    assetAllocation: "Tablet, Notebook",
    typeOfTraining: "Safety",
    trainingProgram: "Workplace Safety & Security",
    status: "Draft",
    createdAt: "2024-02-17",
    updatedAt: "2024-02-17",
    draftedAt: "2024-02-16",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "4",
    selectStaff: "Emily Wilson",
    generalInformation: "Contractor",
    staffFullName: "Emily Rose Wilson",
    address: "321 Elm St, Houston, TX 77001",
    assetAllocation: "Temporary Access Card",
    typeOfTraining: "Compliance",
    trainingProgram: "Regulatory Compliance",
    status: "Pending",
    createdAt: "2024-02-18",
    updatedAt: "2024-02-18",
    draftedAt: "2024-02-17",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    selectStaff: "David Brown",
    generalInformation: "Part-time Employee",
    staffFullName: "David Christopher Brown",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    assetAllocation: "Shared Workstation",
    typeOfTraining: "Customer Service",
    trainingProgram: "Customer Relations Training",
    status: "Active",
    createdAt: "2024-03-19",
    updatedAt: "2024-03-19",
    draftedAt: "2024-03-18",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    selectStaff: "Lisa Garcia",
    generalInformation: "Full-time Employee",
    staffFullName: "Lisa Maria Garcia",
    address: "987 Cedar Ln, Philadelphia, PA 19101",
    assetAllocation: "Laptop, Headset, Mouse",
    typeOfTraining: "Leadership",
    trainingProgram: "Management Development",
    status: "Active",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
    draftedAt: "2024-03-19",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    selectStaff: "Robert Miller",
    generalInformation: "Seasonal Worker",
    staffFullName: "Robert Thomas Miller",
    address: "147 Birch St, San Antonio, TX 78201",
    assetAllocation: "Uniform, Safety Equipment",
    typeOfTraining: "Operational",
    trainingProgram: "Equipment Operation",
    status: "Pending",
    createdAt: "2024-04-21",
    updatedAt: "2024-04-21",
    draftedAt: "2024-04-20",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    selectStaff: "Jennifer Taylor",
    generalInformation: "Remote Employee",
    staffFullName: "Jennifer Lynn Taylor",
    address: "258 Spruce Ave, San Diego, CA 92101",
    assetAllocation: "Remote Setup Kit",
    typeOfTraining: "Remote Work",
    trainingProgram: "Remote Collaboration Tools",
    status: "Draft",
    createdAt: "2024-04-22",
    updatedAt: "2024-04-22",
    draftedAt: "2024-04-21",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    selectStaff: "William Anderson",
    generalInformation: "Temporary Worker",
    staffFullName: "William James Anderson",
    address: "369 Willow Way, Dallas, TX 75201",
    assetAllocation: "Company Vehicle, GPS",
    typeOfTraining: "Quality Assurance",
    trainingProgram: "Quality Control Standards",
    status: "Active",
    createdAt: "2024-05-23",
    updatedAt: "2024-05-23",
    draftedAt: "2024-05-22",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    selectStaff: "Maria Rodriguez",
    generalInformation: "Consultant",
    staffFullName: "Maria Elena Rodriguez",
    address: "741 Poplar Pl, San Jose, CA 95101",
    assetAllocation: "Specialized Tools",
    typeOfTraining: "Data Security",
    trainingProgram: "Information Security",
    status: "Rejected",
    createdAt: "2024-05-24",
    updatedAt: "2024-05-24",
    draftedAt: "2024-05-23",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "11",
    selectStaff: "James Wilson",
    generalInformation: "Volunteer",
    staffFullName: "James Patrick Wilson",
    address: "852 Ash Ave, Austin, TX 78701",
    assetAllocation: "Mobile Device, Charger",
    typeOfTraining: "Communication",
    trainingProgram: "Effective Communication",
    status: "Active",
    createdAt: "2024-06-25",
    updatedAt: "2024-06-25",
    draftedAt: "2024-06-24",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "12",
    selectStaff: "Patricia Martinez",
    generalInformation: "Freelancer",
    staffFullName: "Patricia Ann Martinez",
    address: "963 Hickory Hwy, Jacksonville, FL 32201",
    assetAllocation: "Office Supplies Kit",
    typeOfTraining: "Project Management",
    trainingProgram: "Agile Project Management",
    status: "Draft",
    createdAt: "2024-06-26",
    updatedAt: "2024-06-26",
    draftedAt: "2024-06-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function OnboardingDataTable({
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
  const { canCreate } = useCountriesPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "selectStaff",
      title: "Select Staff",
      options: [...new Set(mockOnboarding.map((item) => item.selectStaff))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("selectStaff")
          .localeCompare(row2.getValue("selectStaff"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Select Staff",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "generalInformation",
      title: "General Information",
      options: [
        ...new Set(mockOnboarding.map((item) => item.generalInformation)),
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
          .getValue("generalInformation")
          .localeCompare(row2.getValue("generalInformation"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "General Information",
        readOnly: true,
      },
    },
    {
      accessorKey: "staffFullName",
      title: "Staff Full Name",
      options: [...new Set(mockOnboarding.map((item) => item.staffFullName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("staffFullName")
          .localeCompare(row2.getValue("staffFullName"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Staff Full Name",
        readOnly: true,
      },
    },
    {
      accessorKey: "address",
      title: "Address",
      options: [...new Set(mockOnboarding.map((item) => item.address))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("address").localeCompare(row2.getValue("address"));
      },
      size: isMobile ? 200 : 250,
      minSize: 200,
      meta: {
        exportLabel: "Address",
        readOnly: true,
      },
    },
    {
      accessorKey: "assetAllocation",
      title: "Asset Allocation",
      options: [...new Set(mockOnboarding.map((item) => item.assetAllocation))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("assetAllocation")
          .localeCompare(row2.getValue("assetAllocation"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Asset Allocation",
        readOnly: true,
      },
    },
    {
      accessorKey: "typeOfTraining",
      title: "Type of Training",
      options: [...new Set(mockOnboarding.map((item) => item.typeOfTraining))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("typeOfTraining")
          .localeCompare(row2.getValue("typeOfTraining"));
      },
      size: isMobile ? 150 : 180,
      minSize: 140,
      meta: {
        exportLabel: "Type of Training",
        readOnly: true,
      },
    },
    {
      accessorKey: "trainingProgram",
      title: "Training Program",
      options: [...new Set(mockOnboarding.map((item) => item.trainingProgram))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("trainingProgram")
          .localeCompare(row2.getValue("trainingProgram"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Training Program",
        readOnly: true,
      },
    },
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

  const filteredData = mockOnboarding.filter((item: OnboardingItem) => {
    // States use the same flags for demo
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
      fixedColumns={["selectStaff", "status"]}
      pathName="onboarding"
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
