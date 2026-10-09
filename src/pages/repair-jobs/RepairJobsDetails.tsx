/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete } from "@/components/common/Autocomplete";
import HistoryDataTable from "@/components/common/HistoryDataTableNew";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type RepairJobData = {
  repairJobId: string;
  repairJobName: string;
  appointmentDate: string;
  estimatedCompletionDate: string;
  device: string;
  repairLocation: string;
  billingType: string;
  deliveryType: string;
  appointmentType: string;
  collectionType: string;
  mechanic: string;
  customer: string;
  status: string;
  reference: string;
  discount: number;
  issueDescription: string;
  jobDescription: string;
  additionDescription: string;
  termsCondition: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  draftedAt: Date | null;
};

const initialData: RepairJobData = {
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
  createdAt: new Date(),
  updatedAt: new Date(),
  draftedAt: null,
};

// Customer options for autocomplete
const customerOptions = [
  "ABC Corporation",
  "XYZ Solutions",
  "Tech Innovations Ltd",
  "Creative Agency",
  "Consulting Group",
  "Marketing Solutions",
  "Design Studio",
  "Consulting Firm",
  "Training Center",
  "IT Services Co",
];

// Device options for autocomplete
const deviceOptions = [
  "HP LaserJet Pro M404dn",
  "Dell OptiPlex Desktop",
  "Cisco Router",
  "Samsung Monitor",
  "Lenovo ThinkPad",
  "Canon Multifunction Printer",
  "Apple iMac",
  "Microsoft Surface Pro",
  "Epson Projector",
  "Netgear Switch",
];

// Repair Job ID options for autocomplete
const repairJobIdOptions = [
  "RJ001",
  "RJ002",
  "RJ003",
  "RJ004",
  "RJ005",
  "RJ006",
  "RJ007",
  "RJ008",
  "RJ009",
  "RJ010",
];

// Mechanic options for autocomplete
const mechanicOptions = [
  "John Smith",
  "Sarah Johnson",
  "Mike Chen",
  "Lisa Wong",
  "David Kim",
  "Alex Rodriguez",
];

// Status options for autocomplete
const statusOptions = ["In Progress", "Completed", "Pending", "Cancelled"];

// Type definition for TypeScript
export type HistoryEntry = {
  id: string;
  date: string;
  user: string;
  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

export default function RepairJobsDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("ABC Corporation");
  const [selectedDevice, setSelectedDevice] = useState(
    "HP LaserJet Pro M404dn"
  );
  const [selectedRepairJobId, setSelectedRepairJobId] = useState("RJ001");
  const [selectedMechanic, setSelectedMechanic] = useState("John Smith");
  const [selectedStatus, setSelectedStatus] = useState("In Progress");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("repairJobs", "create");
  const canView: boolean = usePermission("repairJobs", "view");
  const canEdit: boolean = usePermission("repairJobs", "edit");
  const canDelete: boolean = usePermission("repairJobs", "delete");
  const canExport: boolean = usePermission("repairJobs", "export");
  const canPdf: boolean = usePermission("repairJobs", "pdf");
  const canPrint: boolean = usePermission("repairJobs", "print");
  const canSeeHistory: boolean = usePermission("repairJobs", "history");

  // Field-level permissions
  const canViewRepairJobId: boolean = usePermission(
    "repairJobs",
    "view",
    "repairJobId"
  );
  const canViewRepairJobName: boolean = usePermission(
    "repairJobs",
    "view",
    "repairJobName"
  );
  const canViewAppointmentDate: boolean = usePermission(
    "repairJobs",
    "view",
    "appointmentDate"
  );
  const canViewEstimatedCompletionDate: boolean = usePermission(
    "repairJobs",
    "view",
    "estimatedCompletionDate"
  );
  const canViewDevice: boolean = usePermission("repairJobs", "view", "device");
  const canViewRepairLocation: boolean = usePermission(
    "repairJobs",
    "view",
    "repairLocation"
  );
  const canViewBillingType: boolean = usePermission(
    "repairJobs",
    "view",
    "billingType"
  );
  const canViewDeliveryType: boolean = usePermission(
    "repairJobs",
    "view",
    "deliveryType"
  );
  const canViewAppointmentType: boolean = usePermission(
    "repairJobs",
    "view",
    "appointmentType"
  );
  const canViewCollectionType: boolean = usePermission(
    "repairJobs",
    "view",
    "collectionType"
  );
  const canViewMechanic: boolean = usePermission(
    "repairJobs",
    "view",
    "mechanic"
  );
  const canViewCustomer: boolean = usePermission(
    "repairJobs",
    "view",
    "customer"
  );
  const canViewStatus: boolean = usePermission("repairJobs", "view", "status");
  const canViewReference: boolean = usePermission(
    "repairJobs",
    "view",
    "reference"
  );
  const canViewDiscount: boolean = usePermission(
    "repairJobs",
    "view",
    "discount"
  );
  const canViewIssueDescription: boolean = usePermission(
    "repairJobs",
    "view",
    "issueDescription"
  );
  const canViewJobDescription: boolean = usePermission(
    "repairJobs",
    "view",
    "jobDescription"
  );
  const canViewAdditionDescription: boolean = usePermission(
    "repairJobs",
    "view",
    "additionDescription"
  );
  const canViewTermsCondition: boolean = usePermission(
    "repairJobs",
    "view",
    "termsCondition"
  );
  const canViewIsActive: boolean = usePermission(
    "repairJobs",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "repairJobs",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "repairJobs",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get repair job data based on selected repair job ID
  const getRepairJobData = (repairJobId: string): RepairJobData => {
    const repairJobMap: Record<string, RepairJobData> = {
      RJ001: {
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
        jobDescription:
          "Complete maintenance and cleaning of printer mechanisms",
        additionDescription: "Replace worn rollers and clean print heads",
        termsCondition: "Standard 30-day warranty on repairs",
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        draftedAt: null,
      },
      RJ002: {
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
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        draftedAt: null,
      },
      RJ003: {
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
        additionDescription:
          "Test network connectivity and optimize performance",
        termsCondition: "30-day support included",
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        draftedAt: null,
      },
    };

    return repairJobMap[repairJobId] || initialData;
  };

  const [repairJobData, setRepairJobData] = useState<RepairJobData>(
    getRepairJobData(selectedRepairJobId)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update repair job data when selection changes
  useEffect(() => {
    const newRepairJobData = getRepairJobData(selectedRepairJobId);
    setRepairJobData(newRepairJobData);
    setSelectedCustomer(newRepairJobData.customer);
    setSelectedDevice(newRepairJobData.device);
    setSelectedMechanic(newRepairJobData.mechanic);
    setSelectedStatus(newRepairJobData.status);
  }, [selectedRepairJobId]);

  // Handle repair job ID change
  const handleRepairJobIdChange = (value: string) => {
    setSelectedRepairJobId(value);
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintRepairJob = (repairJobData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Repair Job Details",
        data: [repairJobData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          repairJobId: "Repair Job ID",
          repairJobName: "Repair Job Name",
          appointmentDate: "Appointment Date",
          estimatedCompletionDate: "Estimated Completion Date",
          device: "Device",
          repairLocation: "Repair Location",
          billingType: "Billing Type",
          deliveryType: "Delivery Type",
          appointmentType: "Appointment Type",
          collectionType: "Collection Type",
          mechanic: "Mechanic",
          customer: "Customer",
          status: "Status",
          reference: "Reference",
          discount: "Discount",
          issueDescription: "Issue Description",
          jobDescription: "Job Description",
          additionDescription: "Additional Description",
          termsCondition: "Terms & Conditions",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
        },
      });
      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("repairJobData on pdf click", repairJobData);
      const blob = await pdf(
        <GenericPDF
          data={[repairJobData]}
          title="Repair Job Details"
          subtitle="Repair Job Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "repair-job-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (date: Date | null) => {
    if (!date) return "–";

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <PageLayout
        title="Viewing Repair Job"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/repair-jobs")}
        listText="List"
        listPath="repair-jobs"
        activePage="view"
        popoverOptions={[
          ...(canCreate
            ? [
                {
                  label: "Create",
                  icon: <Plus className="w-5 h-5 text-green-600" />,
                  onClick: () => navigate("/repair-jobs/create"),
                },
              ]
            : []),
          ...(canEdit
            ? [
                {
                  label: "Edit",
                  icon: <Edit className="w-5 h-5 text-blue-600" />,
                  onClick: () => navigate("/repair-jobs/edit/1"),
                },
              ]
            : []),
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        onHistoryClick={
          canSeeHistory ? () => setIsOptionModalOpen(true) : undefined
        }
        onExport={
          canPdf && canPrint
            ? () => {
                if (!pdfChecked && !printEnabled) {
                  setShowExportModal(true);
                  return;
                }

                if (pdfChecked) {
                  handleExportPDF();
                }
                if (printEnabled) {
                  handlePrintRepairJob(repairJobData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Repair Job ID, Customer, Device, Mechanic */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewRepairJobId && (
              <div className="mt-1">
                <Autocomplete
                  options={repairJobIdOptions}
                  value={selectedRepairJobId}
                  onValueChange={handleRepairJobIdChange}
                  placeholder="Select repair job ID..."
                  displayKey="repairJobId"
                  valueKey="repairJobId"
                  searchKey="repairJobId"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Repair Job ID"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCustomer && (
              <div className="mt-1">
                <Autocomplete
                  options={customerOptions}
                  value={selectedCustomer}
                  onValueChange={setSelectedCustomer}
                  placeholder="Select customer..."
                  displayKey="customer"
                  valueKey="customer"
                  searchKey="customer"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Customer"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDevice && (
              <div className="mt-1">
                <Autocomplete
                  options={deviceOptions}
                  value={selectedDevice}
                  onValueChange={setSelectedDevice}
                  placeholder="Select device..."
                  displayKey="device"
                  valueKey="device"
                  searchKey="device"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Device"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewMechanic && (
              <div className="mt-1">
                <Autocomplete
                  options={mechanicOptions}
                  value={selectedMechanic}
                  onValueChange={setSelectedMechanic}
                  placeholder="Select mechanic..."
                  displayKey="mechanic"
                  valueKey="mechanic"
                  searchKey="mechanic"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Mechanic"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Row 2: Repair Job Name, Status, Appointment Date, Estimated Completion */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewRepairJobName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Repair Job Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.repairJobName)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="mt-1">
                <Autocomplete
                  options={statusOptions}
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  placeholder="Select status..."
                  displayKey="status"
                  valueKey="status"
                  searchKey="status"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Status"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewAppointmentDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Appointment Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.appointmentDate)}
                </div>
              </div>
            )}

            {canViewEstimatedCompletionDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Est. Completion Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.estimatedCompletionDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Repair Location, Billing Type, Delivery Type, Appointment Type */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewRepairLocation && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Repair Location
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.repairLocation)}
                </div>
              </div>
            )}

            {canViewBillingType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Billing Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.billingType)}
                </div>
              </div>
            )}

            {canViewDeliveryType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Delivery Type
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.deliveryType)}
                </div>
              </div>
            )}

            {canViewAppointmentType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Appointment Type
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.appointmentType)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Collection Type, Reference, Discount, Terms & Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewCollectionType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Collection Type
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.collectionType)}
                </div>
              </div>
            )}

            {canViewReference && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Reference</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.reference)}
                </div>
              </div>
            )}

            {canViewDiscount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Discount</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.discount)}
                </div>
              </div>
            )}

            {canViewTermsCondition && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Terms & Conditions
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.termsCondition)}
                </div>
              </div>
            )}
          </div>

          {/* Row 5: Issue Description, Job Description, Additional Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIssueDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Issue Description
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.issueDescription)}
                </div>
              </div>
            )}

            {canViewJobDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Job Description
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.jobDescription)}
                </div>
              </div>
            )}

            {canViewAdditionDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Additional Description
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(repairJobData.additionDescription)}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {repairJobData.isActive ? (
                    <span className="font-bold text-[15px]">Yes</span>
                  ) : (
                    <span className="font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 6: Status fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {repairJobData.isDraft ? (
                    <span className="text-orange-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {repairJobData.isDeleted ? (
                    <span className="text-red-600 font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(repairJobData.createdAt),
          updated: getRelativeTime(repairJobData.updatedAt),
          drafted: getRelativeTime(repairJobData.draftedAt),
          deleted: undefined,
        }}
      />

      {/* Export Warning Modal */}
      <ResetFormModal
        opened={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => setShowExportModal(false)}
        title="Export Options Required"
        message="Please select PDF/Print options before exporting. You need to enable at least one to export the data."
        confirmText="OK"
        cancelText="Cancel"
      />
    </>
  );
}
