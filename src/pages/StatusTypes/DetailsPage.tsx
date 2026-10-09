/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Autocomplete } from "@/components/common/Autocomplete";
import HistoryDataTable from "@/components/common/HistoryDataTableNew";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_DOCUMENT_TYPES = [
  { code: "PASS", name: "Passport" },
  { code: "DL", name: "Driver's License" },
  { code: "NID", name: "National ID Card" },
  { code: "BC", name: "Birth Certificate" },
  { code: "SSN", name: "Social Security Number" },
  { code: "VISA", name: "Visa" },
  { code: "WP", name: "Work Permit" },
  { code: "RC", name: "Residence Card" },
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

export default function DocumentTypeDetailsPage() {
  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("PASS");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Get permissions
  const canCreate: boolean = usePermission("documentTypes", "create");
  const canEdit: boolean = usePermission("documentTypes", "edit");
  const canDelete: boolean = usePermission("documentTypes", "delete");
  const canExport: boolean = usePermission("documentTypes", "export");
  const canPdf: boolean = usePermission("documentTypes", "pdf");
  const canPrint: boolean = usePermission("documentTypes", "print");
  const canSeeHistory: boolean = usePermission("documentTypes", "history");

  console.log("canCreate", canCreate);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  let documentTypeData = {
    code: selectedDocumentType,
    name:
      MOCK_DOCUMENT_TYPES.find((dt) => dt.code === selectedDocumentType)
        ?.name || "Passport",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      documentTypeData = {
        code: selectedDocumentType,
        name: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintDocumentType = (documentTypeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Document Type Details",
        data: [documentTypeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Document Type Code",
          name: "Document Type Name",
          isDefault: "Default Document Type",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
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
      console.log("documentTypeData on pdf click", documentTypeData);
      const blob = await pdf(
        <GenericPDF
          data={[documentTypeData]}
          title="Document Type Details"
          subtitle="Document Type Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document-type-details.pdf";
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
        moduleId="status-type-details-module"
        moduleName="Status Type Details"
        moduleRoute="/status-types/view"
        title="Viewing Status Type"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="status-types"
        activePage="view"
        module="statusTypes"
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
                  handlePrintDocumentType(documentTypeData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 - Code, Name, Default */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_DOCUMENT_TYPES}
              value={selectedDocumentType}
              onValueChange={setSelectedDocumentType}
              placeholder=" "
              displayKey="code"
              valueKey="code"
              searchKey="name"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Code"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(documentTypeData.name)}
            </div>
          </div>

          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {documentTypeData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 - Status and Action */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Status</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {documentTypeData.isDeleted
                ? "Deleted"
                : documentTypeData.isDraft
                ? "Draft"
                : "Active"}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Action</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              Updated
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
          created: getRelativeTime(documentTypeData.createdAt),
          updated: getRelativeTime(documentTypeData.updatedAt),
          drafted: getRelativeTime(documentTypeData.draftedAt),
          deleted: getRelativeTime(documentTypeData.deletedAt),
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
