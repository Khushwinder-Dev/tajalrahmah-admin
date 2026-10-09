/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockBenefitPenalties = [
  {
    id: "1",
    type: "Benefit",
    subject: "Performance Bonus",
    criteria: "Exceeds targets by 20%",
    date: "2024-02-15",
    driver: "Ahmed Al-Rashid",
    formality: "Monthly Review",
    description: "Outstanding performance in Q1 2024",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    type: "Penalty",
    subject: "Late Arrival",
    criteria: "3+ late arrivals in month",
    date: "2024-02-10",
    driver: "Mohammed Al-Zahrani",
    formality: "HR Warning",
    description: "Multiple late arrivals without notice",
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    type: "Benefit",
    subject: "Safety Award",
    criteria: "Zero accidents for 6 months",
    date: "2024-02-20",
    driver: "Omar Al-Saadi",
    formality: "Quarterly Review",
    description: "Maintained perfect safety record",
    status: "inactive",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    actionMessage: "20m",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    type: "Penalty",
    subject: "Vehicle Damage",
    criteria: "Minor damage to company vehicle",
    date: "2024-02-25",
    driver: "Khalid Al-Mansouri",
    formality: "Incident Report",
    description: "Scratched company van during parking",
    status: "draft",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-25",
    actionMessage: "15 Apr",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    type: "Benefit",
    subject: "Customer Service",
    criteria: "95% customer satisfaction",
    date: "2024-02-28",
    driver: "Abdullah Al-Qahtani",
    formality: "Monthly Review",
    description: "Excellent customer feedback ratings",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    actionMessage: "15 Apr 2023",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    type: "Penalty",
    subject: "Route Deviation",
    criteria: "Unauthorized route change",
    date: "2024-03-01",
    driver: "Hassan Al-Otaibi",
    formality: "Manager Review",
    description: "Changed route without approval",
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    type: "Benefit",
    subject: "Fuel Efficiency",
    criteria: "15% below fuel budget",
    date: "2024-03-05",
    driver: "Saleh Al-Harbi",
    formality: "Monthly Review",
    description: "Consistently maintained fuel efficiency",
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    type: "Penalty",
    subject: "Documentation",
    criteria: "Missing delivery receipts",
    date: "2024-03-10",
    driver: "Fahad Al-Dossary",
    formality: "HR Warning",
    description: "Failed to collect delivery confirmations",
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    type: "Benefit",
    subject: "Team Player",
    criteria: "Helped 3+ colleagues",
    date: "2024-03-15",
    driver: "Yousef Al-Shammari",
    formality: "Peer Recognition",
    description: "Assisted team members with deliveries",
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    actionMessage: "15 Apr 2024",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    type: "Penalty",
    subject: "Vehicle Maintenance",
    criteria: "Skipped scheduled maintenance",
    date: "2024-03-20",
    driver: "Ibrahim Al-Rashid",
    formality: "Manager Review",
    description: "Missed vehicle service appointment",
    status: "active",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    type: "Benefit",
    subject: "Innovation",
    criteria: "Process improvement suggestion",
    date: "2024-03-25",
    driver: "Nasser Al-Mutairi",
    formality: "Management Review",
    description: "Proposed new delivery route optimization",
    status: "active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    type: "Penalty",
    subject: "Communication",
    criteria: "Failed to report delays",
    date: "2024-03-30",
    driver: "Majed Al-Zahrani",
    formality: "HR Warning",
    description: "Did not inform about delivery delays",
    status: "active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "13",
    type: "Benefit",
    subject: "Attendance",
    criteria: "Perfect attendance for 3 months",
    date: "2024-04-01",
    driver: "Sami Al-Ghamdi",
    formality: "Monthly Review",
    description: "No absences or late arrivals",
    status: "active",
    createdAt: "2024-01-27",
    updatedAt: "2024-02-01",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "14",
    type: "Penalty",
    subject: "Equipment Misuse",
    criteria: "Improper use of company tools",
    date: "2024-04-05",
    driver: "Rashid Al-Sulaiman",
    formality: "Manager Review",
    description: "Used company equipment for personal use",
    status: "active",
    createdAt: "2024-01-28",
    updatedAt: "2024-02-02",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "15",
    type: "Benefit",
    subject: "Cost Savings",
    criteria: "Reduced operational costs by 10%",
    date: "2024-04-10",
    driver: "Tariq Al-Nasser",
    formality: "Quarterly Review",
    description: "Implemented cost-saving measures",
    status: "active",
    createdAt: "2024-01-29",
    updatedAt: "2024-02-03",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "16",
    type: "Penalty",
    subject: "Policy Violation",
    criteria: "Breach of company policy",
    date: "2024-04-15",
    driver: "Waleed Al-Qahtani",
    formality: "HR Warning",
    description: "Violated dress code policy",
    status: "active",
    createdAt: "2024-01-30",
    updatedAt: "2024-02-04",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "17",
    type: "Benefit",
    subject: "Training Completion",
    criteria: "Completed all required training",
    date: "2024-04-20",
    driver: "Hamad Al-Mansouri",
    formality: "Training Review",
    description: "Successfully completed safety training",
    status: "draft",
    createdAt: "2024-01-31",
    updatedAt: "2024-02-05",
    draftedAt: "2024-02-01",
    actionMessage: "2h",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "18",
    type: "Penalty",
    subject: "Quality Issues",
    criteria: "Multiple quality complaints",
    date: "2024-04-25",
    driver: "Saud Al-Zahrani",
    formality: "Quality Review",
    description: "Received customer complaints about service",
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-06",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "19",
    type: "Benefit",
    subject: "Leadership",
    criteria: "Led team of 5+ members",
    date: "2024-05-01",
    driver: "Khalil Al-Rashid",
    formality: "Management Review",
    description: "Successfully led delivery team project",
    status: "active",
    createdAt: "2024-02-02",
    updatedAt: "2024-02-07",
    draftedAt: null,
    actionMessage: "2h",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "20",
    type: "Penalty",
    subject: "Time Management",
    criteria: "Frequent deadline misses",
    date: "2024-05-05",
    driver: "Adel Al-Saadi",
    formality: "Manager Review",
    description: "Consistently missed project deadlines",
    status: "inactive",
    createdAt: "2024-02-03",
    updatedAt: "2024-02-08",
    draftedAt: null,
    actionMessage: "2h",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function BenefitPenaltyDataTable({
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
  setShowFilter: (setShowFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("benefitPenalty", "create");

  const componentColumns = [
    {
      accessorKey: "type",
      title: "Type",
      options: [...new Set(mockBenefitPenalties.map((item) => item.type))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("type").localeCompare(row2.getValue("type"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "type",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "subject",
      title: "Subject",
      options: [...new Set(mockBenefitPenalties.map((item) => item.subject))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("subject").localeCompare(row2.getValue("subject"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "subject",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "criteria",
      title: "Criteria",
      options: [...new Set(mockBenefitPenalties.map((item) => item.criteria))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("criteria")
          .localeCompare(row2.getValue("criteria"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "criteria",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "date",
      title: "Date",
      options: [...new Set(mockBenefitPenalties.map((item) => item.date))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("date").localeCompare(row2.getValue("date"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "date",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "driver",
      title: "Driver",
      options: [...new Set(mockBenefitPenalties.map((item) => item.driver))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("driver").localeCompare(row2.getValue("driver"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "driver",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "formality",
      title: "Formality",
      options: [...new Set(mockBenefitPenalties.map((item) => item.formality))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("formality")
          .localeCompare(row2.getValue("formality"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "formality",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "description",
      title: "Description",
      options: [
        ...new Set(mockBenefitPenalties.map((item) => item.description)),
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
          .getValue("description")
          .localeCompare(row2.getValue("description"));
      },
      size: 250,
      minSize: 200,
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

  const filteredData = mockBenefitPenalties.filter((benefitPenalty) => {
    if (dataTableFilter.status === "Active") {
      return benefitPenalty.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !benefitPenalty.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return benefitPenalty.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return benefitPenalty.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return benefitPenalty.isUpdated;
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
      fixedColumns={["type"]} // Pin type column
      pathName="benefit-penalty"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
