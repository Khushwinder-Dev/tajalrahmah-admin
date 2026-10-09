/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockInterviews = [
  {
    id: "1",
    interviewDate: "2024-02-15",
    candidateName: "John Doe",
    interviewer: "Jane Smith",
    vivaMarks: 18,
    writtenTotalMarks: 75,
    mcqTotalMarks: 40,
    totalMarks: 133,
    recommendation: true,
    selectInterviewer: "Jane Smith",
    details: "Strong problem-solving skills",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    interviewDate: "2024-02-10",
    candidateName: "Mary Johnson",
    interviewer: "Ahmed Khan",
    vivaMarks: 15,
    writtenTotalMarks: 68,
    mcqTotalMarks: 35,
    totalMarks: 118,
    recommendation: true,
    selectInterviewer: "Ahmed Khan",
    details: "Good communication",
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    interviewDate: "2024-02-20",
    candidateName: "Ali Hassan",
    interviewer: "Sara Lee",
    vivaMarks: 10,
    writtenTotalMarks: 55,
    mcqTotalMarks: 28,
    totalMarks: 93,
    recommendation: false,
    selectInterviewer: "Sara Lee",
    details: "Needs improvement in fundamentals",
    status: "inactive",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    draftedAt: null,
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    interviewDate: "2024-02-25",
    candidateName: "Noah Brown",
    interviewer: "Emily Davis",
    vivaMarks: 20,
    writtenTotalMarks: 80,
    mcqTotalMarks: 45,
    totalMarks: 145,
    recommendation: true,
    selectInterviewer: "Emily Davis",
    details: "Excellent overall",
    status: "draft",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    draftedAt: "2024-01-25",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    interviewDate: "2024-02-28",
    candidateName: "Emma Wilson",
    interviewer: "Omar Faruk",
    vivaMarks: 12,
    writtenTotalMarks: 60,
    mcqTotalMarks: 30,
    totalMarks: 102,
    recommendation: false,
    selectInterviewer: "Omar Faruk",
    details: "Average performance",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "6",
    interviewDate: "2024-03-01",
    candidateName: "Liam Martinez",
    interviewer: "Priya Patel",
    vivaMarks: 17,
    writtenTotalMarks: 70,
    mcqTotalMarks: 37,
    totalMarks: 124,
    recommendation: true,
    selectInterviewer: "Priya Patel",
    details: "Good algorithms knowledge",
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-25",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "7",
    interviewDate: "2024-03-05",
    candidateName: "Olivia Taylor",
    interviewer: "Mohammed Ali",
    vivaMarks: 19,
    writtenTotalMarks: 78,
    mcqTotalMarks: 42,
    totalMarks: 139,
    recommendation: true,
    selectInterviewer: "Mohammed Ali",
    details: "Strong system design",
    status: "active",
    createdAt: "2024-01-21",
    updatedAt: "2024-01-26",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "8",
    interviewDate: "2024-03-10",
    candidateName: "William Anderson",
    interviewer: "Fatima Noor",
    vivaMarks: 14,
    writtenTotalMarks: 65,
    mcqTotalMarks: 33,
    totalMarks: 112,
    recommendation: true,
    selectInterviewer: "Fatima Noor",
    details: "Consistent performer",
    status: "active",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-27",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "9",
    interviewDate: "2024-03-15",
    candidateName: "Sophia Thomas",
    interviewer: "David Kim",
    vivaMarks: 16,
    writtenTotalMarks: 72,
    mcqTotalMarks: 39,
    totalMarks: 127,
    recommendation: true,
    selectInterviewer: "David Kim",
    details: "Great coding skills",
    status: "active",
    createdAt: "2024-01-23",
    updatedAt: "2024-01-28",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "10",
    interviewDate: "2024-03-20",
    candidateName: "James Scott",
    interviewer: "Ibrahim Musa",
    vivaMarks: 13,
    writtenTotalMarks: 62,
    mcqTotalMarks: 31,
    totalMarks: 106,
    recommendation: false,
    selectInterviewer: "Ibrahim Musa",
    details: "Needs mentorship",
    status: "inactive",
    createdAt: "2024-01-24",
    updatedAt: "2024-01-29",
    draftedAt: null,
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "11",
    interviewDate: "2024-03-25",
    candidateName: "Ava Robinson",
    interviewer: "Chen Wei",
    vivaMarks: 20,
    writtenTotalMarks: 84,
    mcqTotalMarks: 44,
    totalMarks: 148,
    recommendation: true,
    selectInterviewer: "Chen Wei",
    details: "Top candidate",
    status: "active",
    createdAt: "2024-01-25",
    updatedAt: "2024-01-30",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "12",
    interviewDate: "2024-03-30",
    candidateName: "Mia Clark",
    interviewer: "Yuki Tanaka",
    vivaMarks: 11,
    writtenTotalMarks: 58,
    mcqTotalMarks: 29,
    totalMarks: 98,
    recommendation: false,
    selectInterviewer: "Yuki Tanaka",
    details: "Below expectations",
    status: "active",
    createdAt: "2024-01-26",
    updatedAt: "2024-01-31",
    draftedAt: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function InterviewsDataTable({
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
  const canCreate = usePermission("interview", "create");

  const componentColumns = [
    {
      accessorKey: "candidateName",
      title: "Candidate Name",
      options: [...new Set(mockInterviews.map((item) => item.candidateName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("candidateName")
          .localeCompare(row2.getValue("candidateName"));
      },
      size: 180,
      minSize: 140,
      meta: {
        exportLabel: "candidateName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "interviewer",
      title: "Interviewer",
      options: [...new Set(mockInterviews.map((item) => item.interviewer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("interviewer")
          .localeCompare(row2.getValue("interviewer"));
      },
      size: 160,
      minSize: 120,
      meta: {
        exportLabel: "interviewer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "interviewDate",
      title: "Interview Date",
      options: [...new Set(mockInterviews.map((item) => item.interviewDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("interviewDate")
          .localeCompare(row2.getValue("interviewDate"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "interviewDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "vivaMarks",
      title: "Viva Marks",
      options: [...new Set(mockInterviews.map((item) => item.vivaMarks))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = Number(row.getValue(columnId));
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("vivaMarks")) -
          Number(row2.getValue("vivaMarks"))
        );
      },
      size: 120,
      minSize: 120,
      meta: {
        exportLabel: "vivaMarks",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "writtenTotalMarks",
      title: "Written Total Marks",
      options: [
        ...new Set(mockInterviews.map((item) => item.writtenTotalMarks)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = Number(row.getValue(columnId));
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("writtenTotalMarks")) -
          Number(row2.getValue("writtenTotalMarks"))
        );
      },
      size: 180,
      minSize: 120,
      meta: {
        exportLabel: "writtenTotalMarks",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mcqTotalMarks",
      title: "Mcq Total Marks",
      options: [...new Set(mockInterviews.map((item) => item.mcqTotalMarks))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = Number(row.getValue(columnId));
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("mcqTotalMarks")) -
          Number(row2.getValue("mcqTotalMarks"))
        );
      },
      size: 160,
      minSize: 120,
      meta: {
        exportLabel: "mcqTotalMarks",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "totalMarks",
      title: "Total Marks",
      options: [...new Set(mockInterviews.map((item) => item.totalMarks))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = Number(row.getValue(columnId));
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return (
          Number(row1.getValue("totalMarks")) -
          Number(row2.getValue("totalMarks"))
        );
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "totalMarks",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "recommendation",
      title: "Recommandation",
      options: ["Recommended", "Not Recommended"],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId)
          ? "Recommended"
          : "Not Recommended";
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const v1 = row1.getValue("recommendation") ? 1 : 0;
        const v2 = row2.getValue("recommendation") ? 1 : 0;
        return v1 - v2;
      },
      size: 160,
      minSize: 140,
      meta: {
        exportLabel: "recommendation",
        readOnly: !canCreate,
      },
      // custom cell rendering handled by FixedColumnDataTable's EditableCell (will show true/false)
    },
    {
      accessorKey: "selectInterviewer",
      title: "Select Interviewer",
      options: [...new Set(mockInterviews.map((i) => i.selectInterviewer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("selectInterviewer")
          .localeCompare(row2.getValue("selectInterviewer"));
      },
      size: 180,
      minSize: 140,
      meta: {
        exportLabel: "selectInterviewer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "details",
      title: "Details",
      options: [],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue
          .toLowerCase()
          .includes(String(filterValue).toLowerCase());
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("details").localeCompare(row2.getValue("details"));
      },
      size: 220,
      minSize: 160,
      meta: {
        exportLabel: "details",
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

  const filteredData = mockInterviews.filter((item) => {
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
      fixedColumns={["candidateName"]} // Pin candidate column
      pathName="interview"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
