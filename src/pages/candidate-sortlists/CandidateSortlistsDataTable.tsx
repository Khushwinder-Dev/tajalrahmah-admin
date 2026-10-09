/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

type TabDataType = {
  id: string;
  candidateName: string;
  shortlistedDate: string;
  interviewDate: string;

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
    id: "CAND-001",
    candidateName: "Md. Arif Hossain",
    shortlistedDate: "2025-08-01",
    interviewDate: "2025-08-05",
    status: "Shortlisted",
    createdAt: "2025-08-01T10:15:00",
    updatedAt: "2025-08-02T09:00:00",
    draftedAt: null,
    actionMessage: "Candidate shortlisted successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "CAND-002",
    candidateName: "Nusrat Jahan",
    shortlistedDate: "2025-08-02",
    interviewDate: "2025-08-07",
    status: "Interview Scheduled",
    createdAt: "2025-08-02T11:20:00",
    updatedAt: "2025-08-03T14:30:00",
    draftedAt: null,
    actionMessage: "Interview date confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "CAND-003",
    candidateName: "Shakil Ahmed",
    shortlistedDate: "2025-08-03",
    interviewDate: "2025-08-09",
    status: "Shortlisted",
    createdAt: "2025-08-03T09:45:00",
    updatedAt: "2025-08-04T16:10:00",
    draftedAt: null,
    actionMessage: "Candidate profile updated",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "CAND-004",
    candidateName: "Razia Sultana",
    shortlistedDate: "2025-08-04",
    interviewDate: "2025-08-10",
    status: "Draft",
    createdAt: "2025-08-04T08:15:00",
    updatedAt: "2025-08-05T09:30:00",
    draftedAt: "2025-08-05T09:30:00",
    actionMessage: "Draft saved for review",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "CAND-005",
    candidateName: "Tanvir Hasan",
    shortlistedDate: "2025-08-05",
    interviewDate: "2025-08-12",
    status: "Interview Scheduled",
    createdAt: "2025-08-05T12:10:00",
    updatedAt: "2025-08-06T15:00:00",
    draftedAt: null,
    actionMessage: "Interview call sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "CAND-006",
    candidateName: "Mehnaz Rahman",
    shortlistedDate: "2025-08-06",
    interviewDate: "2025-08-13",
    status: "Shortlisted",
    createdAt: "2025-08-06T13:25:00",
    updatedAt: "2025-08-07T17:40:00",
    draftedAt: null,
    actionMessage: "Candidate moved to shortlist",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "CAND-007",
    candidateName: "Rafiq Chowdhury",
    shortlistedDate: "2025-08-07",
    interviewDate: "2025-08-14",
    status: "Deleted",
    createdAt: "2025-08-07T10:50:00",
    updatedAt: "2025-08-08T08:20:00",
    draftedAt: null,
    actionMessage: "Candidate record removed",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "CAND-008",
    candidateName: "Sumaiya Akter",
    shortlistedDate: "2025-08-08",
    interviewDate: "2025-08-15",
    status: "Shortlisted",
    createdAt: "2025-08-08T09:40:00",
    updatedAt: "2025-08-09T11:30:00",
    draftedAt: null,
    actionMessage: "Candidate shortlisted successfully",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "CAND-009",
    candidateName: "Mahmudul Hasan",
    shortlistedDate: "2025-08-09",
    interviewDate: "2025-08-16",
    status: "Interview Scheduled",
    createdAt: "2025-08-09T14:10:00",
    updatedAt: "2025-08-10T13:50:00",
    draftedAt: null,
    actionMessage: "Interview scheduled by HR",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
  {
    id: "CAND-010",
    candidateName: "Sadia Afrin",
    shortlistedDate: "2025-08-10",
    interviewDate: "2025-08-17",
    status: "Deleted",
    createdAt: "2025-08-10T15:25:00",
    updatedAt: "2025-08-11T10:45:00",
    draftedAt: null,
    actionMessage: "Candidate withdrawn",
    isActive: false,
    isDraft: false,
    isDeleted: true,
    isUpdated: false,
  },
  {
    id: "CAND-011",
    candidateName: "Fahim Reza",
    shortlistedDate: "2025-08-11",
    interviewDate: "2025-08-18",
    status: "Shortlisted",
    createdAt: "2025-08-11T11:35:00",
    updatedAt: "2025-08-12T16:05:00",
    draftedAt: null,
    actionMessage: "Shortlist confirmed",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "CAND-012",
    candidateName: "Lubna Chowdhury",
    shortlistedDate: "2025-08-12",
    interviewDate: "2025-08-19",
    status: "Interview Scheduled",
    createdAt: "2025-08-12T09:55:00",
    updatedAt: "2025-08-13T12:15:00",
    draftedAt: null,
    actionMessage: "Interview details sent",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: true,
  },
];

export default function TermsDataTable({
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
  const canCreate = usePermission("transferCash", "create");

  const componentColumns = [
    {
      accessorKey: "candidateName",
      title: "Candidate Name",
      options: [...new Set(mockTableData.map((item) => item.candidateName))],
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
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "candidateName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "shortlistedDate",
      title: "Shortlisted Date",
      options: [...new Set(mockTableData.map((item) => item.shortlistedDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("shortlistedDate")
          .localeCompare(row2.getValue("shortlistedDate"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "shortlistedDate",
        readOnly: !canCreate,
      },
    },

    {
      accessorKey: "interviewDate",
      title: "Interview Date",
      options: [...new Set(mockTableData.map((item) => item.interviewDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("interviewDate")
          .localeCompare(row2.getValue("interviewDate"));
      },
      size: 150,
      minSize: 400,
      meta: {
        exportLabel: "interviewDate",
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
      fixedColumns={["candidateName"]} // Pin leave types column
      pathName="candidateSortlists"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
