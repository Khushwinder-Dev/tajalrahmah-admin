/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import { usePermission } from "@/hooks/usePermissions";

const mockRepairJobs = [
  {
    id: "1",
    repairJobId: "RJ001",
    repairJobName: "Printer Maintenance Service",
    appointmentDate: "2024-01-15",
    estimatedCompletionDate: "2024-01-17",
    device: "HP LaserJet Pro M404dn",
    repairLocation: "Customer Site",
    billingType: "Hourly",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "Pickup",
    mechanic: "John Smith",
    customer: "ABC Corporation",
    status: "In Progress",
    reference: "REF001",
    discount: 0,
    issueDescription: "Printer jamming frequently and print quality issues",
    jobDescription: "Complete maintenance and cleaning of printer mechanisms",
    additionDescription: "Replace worn rollers and clean print heads",
    termsCondition: "Standard 30-day warranty on repairs",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    draftedAt: null,
  },
  {
    id: "2",
    repairJobId: "RJ002",
    repairJobName: "Laptop Screen Replacement",
    appointmentDate: "2024-01-20",
    estimatedCompletionDate: "2024-01-22",
    device: "Dell OptiPlex Desktop",
    repairLocation: "Workshop",
    billingType: "Fixed",
    deliveryType: "Pickup",
    appointmentType: "Walk-in",
    collectionType: "Delivery",
    mechanic: "Sarah Johnson",
    customer: "XYZ Solutions",
    status: "Completed",
    reference: "REF002",
    discount: 50,
    issueDescription: "Cracked laptop screen affecting display quality",
    jobDescription: "Replace damaged LCD screen with new OEM part",
    additionDescription: "Test display functionality and calibrate colors",
    termsCondition: "90-day warranty on screen replacement",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-22",
    draftedAt: null,
  },
  {
    id: "3",
    repairJobId: "RJ003",
    repairJobName: "Network Router Configuration",
    appointmentDate: "2024-01-25",
    estimatedCompletionDate: "2024-01-26",
    device: "Cisco Router",
    repairLocation: "Customer Site",
    billingType: "Hourly",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "N/A",
    mechanic: "Mike Chen",
    customer: "Tech Innovations Ltd",
    status: "Pending",
    reference: "REF003",
    discount: 0,
    issueDescription:
      "Router configuration issues causing network connectivity problems",
    jobDescription: "Reconfigure router settings and update firmware",
    additionDescription: "Test network connectivity and optimize performance",
    termsCondition: "30-day support included",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-01-25",
    updatedAt: "2024-01-25",
    draftedAt: null,
  },
  {
    id: "4",
    repairJobId: "RJ004",
    repairJobName: "Monitor Color Calibration",
    appointmentDate: "2024-02-01",
    estimatedCompletionDate: "2024-02-01",
    device: "Samsung Monitor",
    repairLocation: "Workshop",
    billingType: "Fixed",
    deliveryType: "Pickup",
    appointmentType: "Scheduled",
    collectionType: "Pickup",
    mechanic: "Lisa Wong",
    customer: "Creative Agency",
    status: "In Progress",
    reference: "REF004",
    discount: 25,
    issueDescription:
      "Monitor displaying incorrect colors affecting design work",
    jobDescription: "Professional color calibration and profile setup",
    additionDescription:
      "Install color management software and provide training",
    termsCondition: "6-month calibration warranty",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
    draftedAt: null,
  },
  {
    id: "5",
    repairJobId: "RJ005",
    repairJobName: "Laptop Battery Replacement",
    appointmentDate: "2024-02-05",
    estimatedCompletionDate: "2024-02-06",
    device: "Lenovo ThinkPad",
    repairLocation: "Workshop",
    billingType: "Fixed",
    deliveryType: "Delivery",
    appointmentType: "Walk-in",
    collectionType: "Pickup",
    mechanic: "David Kim",
    customer: "Consulting Group",
    status: "Completed",
    reference: "REF005",
    discount: 0,
    issueDescription:
      "Battery not holding charge, laptop shuts down unexpectedly",
    jobDescription: "Replace faulty battery with genuine OEM part",
    additionDescription:
      "Test charging system and update power management settings",
    termsCondition: "1-year warranty on battery replacement",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-02-05",
    updatedAt: "2024-02-06",
    draftedAt: null,
  },
  {
    id: "6",
    repairJobId: "RJ006",
    repairJobName: "Printer Toner Replacement",
    appointmentDate: "2024-02-10",
    estimatedCompletionDate: "2024-02-10",
    device: "Canon Multifunction Printer",
    repairLocation: "Customer Site",
    billingType: "Fixed",
    deliveryType: "On-Site",
    appointmentType: "Scheduled",
    collectionType: "N/A",
    mechanic: "Alex Rodriguez",
    customer: "Marketing Solutions",
    status: "Cancelled",
    reference: "REF006",
    discount: 0,
    issueDescription: "Low toner warning and print quality degradation",
    jobDescription: "Replace all toner cartridges and clean print heads",
    additionDescription: "Perform maintenance cycle and test print quality",
    termsCondition: "Standard consumables warranty",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
    draftedAt: null,
  },
];

export default function RepairJobsDataTable({
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
  const canCreate = usePermission("repairJobs", "create");

  const componentColumns = [
    {
      accessorKey: "repairJobId",
      title: "Job ID",
      options: [...new Set(mockRepairJobs.map((item) => item.repairJobId))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("repairJobId")
          .localeCompare(row2.getValue("repairJobId"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "repairJobId",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "repairJobName",
      title: "Job Name",
      options: [...new Set(mockRepairJobs.map((item) => item.repairJobName))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("repairJobName")
          .localeCompare(row2.getValue("repairJobName"));
      },
      size: 200,
      minSize: 150,
      meta: {
        exportLabel: "repairJobName",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "device",
      title: "Device",
      options: [...new Set(mockRepairJobs.map((item) => item.device))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("device").localeCompare(row2.getValue("device"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "device",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "customer",
      title: "Customer",
      options: [...new Set(mockRepairJobs.map((item) => item.customer))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("customer")
          .localeCompare(row2.getValue("customer"));
      },
      size: 180,
      minSize: 150,
      meta: {
        exportLabel: "customer",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "mechanic",
      title: "Mechanic",
      options: [...new Set(mockRepairJobs.map((item) => item.mechanic))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("mechanic")
          .localeCompare(row2.getValue("mechanic"));
      },
      size: 150,
      minSize: 120,
      meta: {
        exportLabel: "mechanic",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "appointmentDate",
      title: "Appointment Date",
      options: [...new Set(mockRepairJobs.map((item) => item.appointmentDate))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("appointmentDate")
          .localeCompare(row2.getValue("appointmentDate"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "appointmentDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "estimatedCompletionDate",
      title: "Est. Completion",
      options: [
        ...new Set(mockRepairJobs.map((item) => item.estimatedCompletionDate)),
      ],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("estimatedCompletionDate")
          .localeCompare(row2.getValue("estimatedCompletionDate"));
      },
      size: 140,
      minSize: 120,
      meta: {
        exportLabel: "estimatedCompletionDate",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "status",
      title: "Status",
      options: [...new Set(mockRepairJobs.map((item) => item.status))],
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
        exportLabel: "status",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "billingType",
      title: "Billing Type",
      options: [...new Set(mockRepairJobs.map((item) => item.billingType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("billingType")
          .localeCompare(row2.getValue("billingType"));
      },
      size: 120,
      minSize: 100,
      meta: {
        exportLabel: "billingType",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "repairLocation",
      title: "Location",
      options: [...new Set(mockRepairJobs.map((item) => item.repairLocation))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("repairLocation")
          .localeCompare(row2.getValue("repairLocation"));
      },
      size: 130,
      minSize: 110,
      meta: {
        exportLabel: "repairLocation",
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

  const filteredData = mockRepairJobs.filter((repairJob) => {
    if (dataTableFilter.status === "Active") {
      return repairJob.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !repairJob.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return repairJob.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return repairJob.isDeleted;
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
      fixedColumns={["repairJobId"]} // Pin repair job ID column
      pathName="repair-jobs"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
    />
  );
}
