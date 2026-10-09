/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const jobPostData = [
  {
    id: "1",
    sn: "001",
    company: "Tech Solutions Inc",
    jobTitle: "Senior React Developer",
    jobCategory: "Software Development",
    jobType: "Full-time",
    noOfVacancies: 3,
    closingDate: "2024-02-15",
    gender: "Any",
    minimumExperience: "5 years",
    isFeatured: true,
    status: "Active",
    shortDescription: "Experienced React developer needed",
    longDescription: "We are looking for a senior React developer...",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "2",
    sn: "002",
    company: "Digital Marketing Pro",
    jobTitle: "Marketing Manager",
    jobCategory: "Marketing",
    jobType: "Part-time",
    noOfVacancies: 1,
    closingDate: "2024-02-20",
    gender: "Any",
    minimumExperience: "3 years",
    isFeatured: false,
    status: "Active",
    shortDescription: "Creative marketing professional",
    longDescription: "Join our team as a marketing manager...",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-21",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "3",
    sn: "003",
    company: "Finance Corp",
    jobTitle: "Financial Analyst",
    jobCategory: "Finance",
    jobType: "Full-time",
    noOfVacancies: 2,
    closingDate: "2024-02-25",
    gender: "Any",
    minimumExperience: "4 years",
    isFeatured: true,
    status: "Active",
    shortDescription: "Financial analyst for corporate team",
    longDescription: "We need a skilled financial analyst...",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-22",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "4",
    sn: "004",
    company: "Healthcare Plus",
    jobTitle: "Registered Nurse",
    jobCategory: "Healthcare",
    jobType: "Full-time",
    noOfVacancies: 5,
    closingDate: "2024-03-01",
    gender: "Any",
    minimumExperience: "2 years",
    isFeatured: false,
    status: "Inactive",
    shortDescription: "Compassionate nurses needed",
    longDescription: "Join our healthcare team...",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-23",
    isActive: false,
    isDeleted: false,
    isUpdated: false,
  },
  {
    id: "5",
    sn: "005",
    company: "Education First",
    jobTitle: "English Teacher",
    jobCategory: "Education",
    jobType: "Contract",
    noOfVacancies: 2,
    closingDate: "2024-02-28",
    gender: "Any",
    minimumExperience: "3 years",
    isFeatured: false,
    status: "Active",
    shortDescription: "Experienced English teacher",
    longDescription: "We are seeking an experienced teacher...",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-24",
    isActive: true,
    isDeleted: false,
    isUpdated: false,
  },
];

export default function JobPostDataTable({
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
  setShowVisibility: (setShowVisibility: boolean) => void;
  showVisibility: boolean;
}) {
  const canCreate = usePermission("jobPost", "create");

  const componentColumns = [
    {
      accessorKey: "sn",
      title: "SN",
      options: [...new Set(jobPostData.map((item) => item.sn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("sn").localeCompare(row2.getValue("sn"));
      },
      size: 80,
      minSize: 60,
      meta: {
        exportLabel: "sn",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "company",
      title: "Company",
      options: [...new Set(jobPostData.map((item) => item.company))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("company").localeCompare(row2.getValue("company"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "company",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "jobTitle",
      title: "Job Title",
      options: [...new Set(jobPostData.map((item) => item.jobTitle))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("jobTitle")
          .localeCompare(row2.getValue("jobTitle"));
      },
      size: 250,
      minSize: 200,
      meta: {
        exportLabel: "jobTitle",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "jobCategory",
      title: "Job Category",
      options: [...new Set(jobPostData.map((item) => item.jobCategory))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("jobCategory")
          .localeCompare(row2.getValue("jobCategory"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "jobCategory",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "jobType",
      title: "Job Type",
      options: [...new Set(jobPostData.map((item) => item.jobType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("jobType").localeCompare(row2.getValue("jobType"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "jobType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "noOfVacancies",
      title: "Vacancies",
      options: [...new Set(jobPostData.map((item) => item.noOfVacancies))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as number;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("noOfVacancies") - row2.getValue("noOfVacancies");
      },
      size: 100,
      minSize: 80,
      meta: {
        exportLabel: "noOfVacancies",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "closingDate",
      title: "Closing Date",
      options: [...new Set(jobPostData.map((item) => item.closingDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("closingDate")
          .localeCompare(row2.getValue("closingDate"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "closingDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(jobPostData.map((item) => item.status))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("status").localeCompare(row2.getValue("status"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "status",
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
      size: 150,
      minSize: 120,
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
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = jobPostData.filter((jobPost) => {
    if (dataTableFilter.status === "Active") {
      return jobPost.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !jobPost.isActive;
    } else if (dataTableFilter.status === "Deleted") {
      return jobPost.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return jobPost.isUpdated;
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
      fixedColumns={["sn"]} // Pin SN column
      pathName="job-post"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
