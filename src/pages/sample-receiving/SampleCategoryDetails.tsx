/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_SAMPLE_RECEIVINGS = [
  {
    id: "1",
    branch: "Main Branch",
    receivingNo: "SR-001",
    clientName: "ABC Food Corp",
    clientReference: "REF-2024-001",
    typeOfSample: "Food Product",
    requiredTests: "Microbiology, Chemical Analysis",
    numberOfSample: 5,
    section: "Quality Control",
    deliveredBy: "John Smith",
    receivedBy: "Sarah Johnson",
    receivingDate: "2024-01-15",
    receivingTime: "09:30",
    status: "Active",
  },
  {
    id: "2",
    branch: "North Branch",
    receivingNo: "SR-002",
    clientName: "XYZ Beverages Ltd",
    clientReference: "REF-2024-002",
    typeOfSample: "Beverage Sample",
    requiredTests: "Chemical Analysis, pH Testing",
    numberOfSample: 3,
    section: "Lab Testing",
    deliveredBy: "Mike Wilson",
    receivedBy: "Emily Davis",
    receivingDate: "2024-01-16",
    receivingTime: "14:15",
    status: "Active",
  },
  {
    id: "3",
    branch: "South Branch",
    receivingNo: "SR-003",
    clientName: "Fresh Produce Co",
    clientReference: "REF-2024-003",
    typeOfSample: "Agricultural Product",
    requiredTests: "Pesticide Residue, Quality Check",
    numberOfSample: 8,
    section: "Agricultural Testing",
    deliveredBy: "David Brown",
    receivedBy: "Lisa Anderson",
    receivingDate: "2024-01-17",
    receivingTime: "11:45",
    status: "Draft",
  },
  {
    id: "4",
    branch: "East Branch",
    receivingNo: "SR-004",
    clientName: "Dairy Products Inc",
    clientReference: "REF-2024-004",
    typeOfSample: "Dairy Product",
    requiredTests: "Microbiology, Fat Content",
    numberOfSample: 6,
    section: "Dairy Testing",
    deliveredBy: "Robert Taylor",
    receivedBy: "Jennifer White",
    receivingDate: "2024-01-18",
    receivingTime: "16:20",
    status: "Inactive",
  },
];

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

export default function SampleReceivingDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedSampleReceiving, setSelectedSampleReceiving] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("sample-receiving", "pdf");
  const canPrint: boolean = usePermission("sample-receiving", "print");
  const canSeeHistory: boolean = usePermission("sample-receiving", "history");

  let reportData = {
    id: selectedSampleReceiving,
    branch:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.branch || "Main Branch",
    receivingNo:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.receivingNo || "SR-001",
    clientName:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.clientName || "ABC Food Corp",
    clientReference:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.clientReference || "REF-2024-001",
    typeOfSample:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.typeOfSample || "Food Product",
    requiredTests:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.requiredTests || "Microbiology, Chemical Analysis",
    numberOfSample:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.numberOfSample || 5,
    section:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.section || "Quality Control",
    deliveredBy:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.deliveredBy || "John Smith",
    receivedBy:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.receivedBy || "Sarah Johnson",
    receivingDate:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.receivingDate || "2024-01-15",
    receivingTime:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.receivingTime || "09:30",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_SAMPLE_RECEIVINGS.find((r) => r.id === selectedSampleReceiving)
        ?.status || "Active",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  } as any;

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      reportData = {
        id: selectedSampleReceiving,
        branch: "",
        receivingNo: "",
        clientName: "",
        clientReference: "",
        typeOfSample: "",
        requiredTests: "",
        numberOfSample: 0,
        section: "",
        deliveredBy: "",
        receivedBy: "",
        receivingDate: "",
        receivingTime: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        status: "Active",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      } as any;
    }
  }, []);

  const handlePrintReport = (report: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Sample Receiving Details",
        data: [report],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          receivingNo: "Receiving No",
          clientName: "Client Name",
          clientReference: "Client Reference",
          typeOfSample: "Type of Sample",
          requiredTests: "Required Tests",
          numberOfSample: "Number of Sample",
          section: "Section",
          deliveredBy: "Delivered By",
          receivedBy: "Received By",
          receivingDate: "Receiving Date",
          receivingTime: "Receiving Time",
          isDefault: "Default",
          isActive: "Active",
          isDraft: "Draft",
          isDeleted: "Deleted",
          status: "Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
          deletedAt: "Deleted At",
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
      console.log("reportData on pdf click", reportData);
      const blob = await pdf(
        <GenericPDF
          data={[reportData]}
          title="Sample Receiving Details"
          subtitle="Sample Receiving Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample-receiving-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "–";

    const date = new Date(dateString);
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
      <MinimizablePageLayout
        moduleId="sample-receiving-details-module"
        moduleName="Sample Receiving Details"
        moduleRoute="/sample-receiving/view"
        title="Viewing Sample Receiving"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="sample-receiving"
        activePage="view"
        module="sample-receiving"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/sample-receiving/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/sample-receiving/edit/1"),
          },
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
                  handlePrintReport(reportData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Sample Receiving Selection, Branch, Receiving No, Client Name */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_SAMPLE_RECEIVINGS}
              value={selectedSampleReceiving}
              onValueChange={setSelectedSampleReceiving}
              placeholder=" "
              displayKey="clientName"
              valueKey="id"
              searchKey="clientName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Sample Receiving"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Branch</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.branch)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Receiving No</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.receivingNo)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Client Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.clientName)}
            </div>
          </div>
        </div>

        {/* Row 2: Client Reference, Type of Sample, Required Tests, Number of Sample */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Client Reference</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.clientReference)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Type of Sample</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.typeOfSample)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Required Tests</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.requiredTests)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Number of Sample</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.numberOfSample)}
            </div>
          </div>
        </div>

        {/* Row 3: Section, Delivered By, Received By, Receiving Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Section</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.section)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Delivered By</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.deliveredBy)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Received By</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.receivedBy)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Receiving Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.receivingDate)}
            </div>
          </div>
        </div>

        {/* Row 4: Receiving Time, Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Receiving Time</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.receivingTime)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(reportData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {reportData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(reportData.createdAt),
          updated: getRelativeTime(reportData.updatedAt),
          drafted: getRelativeTime(reportData.draftedAt),
          deleted: getRelativeTime(reportData.deletedAt),
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
