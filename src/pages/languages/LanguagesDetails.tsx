/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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

const MOCK_LANGUAGES = [
  { code: "en", name: "English", seq: 1, flag: "🇺🇸" },
  { code: "es", name: "Spanish", seq: 2, flag: "🇪🇸" },
  { code: "fr", name: "French", seq: 3, flag: "🇫🇷" },
  { code: "ar", name: "Arabic", seq: 4, flag: "🇸🇦" },
  { code: "hi", name: "Hindi", seq: 5, flag: "🇮🇳" },
  { code: "ur", name: "Urdu", seq: 6, flag: "🇵🇰" },
  { code: "bn", name: "Bengali", seq: 7, flag: "🇧🇩" },
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

export default function LanguageDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  const canCreate: boolean = usePermission("languages", "create");
  const canEdit: boolean = usePermission("languages", "edit");
  const canDelete: boolean = usePermission("languages", "delete");
  const canExport: boolean = usePermission("languages", "export");
  const canPdf: boolean = usePermission("languages", "pdf");
  const canPrint: boolean = usePermission("languages", "print");
  const canSeeHistory: boolean = usePermission("languages", "history");

  // Field-level permissions
  const canEditLanguageName: boolean = usePermission(
    "languages",
    "edit",
    "language"
  );

  console.log("canCreate", canCreate);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);
  console.log("canEditLanguageName", canEditLanguageName);

  let languageData = {
    seq: MOCK_LANGUAGES.find((l) => l.code === selectedLanguage)?.seq || 1,
    code: selectedLanguage,
    language:
      MOCK_LANGUAGES.find((l) => l.code === selectedLanguage)?.name ||
      "English",
    default: true,
    status: "active",
    isDeleted: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "",
    deletedAt: "",
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      languageData = {
        seq: 1,
        code: selectedLanguage,
        language: "",
        default: true,
        status: "active",
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintLanguage = (languageData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Language Details",
        data: [languageData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          seq: "Sequence",
          code: "Language Code",
          language: "Language Name",
          default: "Default Language",
          status: "Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
    // Remove auto-print on toggle
    // if (checked) {
    //   setTimeout(() => handlePrintCountry(countryData), 100);
    // }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    // Remove auto-download on toggle
    // if (pdfChecked) {
    //   setTimeout(() => handleExportPDF(), 100);
    // }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("languageData on pdf click", languageData);
      const blob = await pdf(
        <GenericPDF
          data={[languageData]}
          title="Language Details"
          subtitle="Language Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "languages-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
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
      <PageLayout
        title={t("button.viewingLanguage")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/languages")}
        listText="List"
        listPath="languages"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/languages/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/languages/edit/1"),
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
                  handlePrintLanguage(languageData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_LANGUAGES}
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
              placeholder="Select language code..."
              displayKey="code"
              valueKey="code"
              searchKey="name"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Code"
              inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
            />
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Sequence</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(languageData.seq)}
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Language</h3>
            </div>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(languageData.language)}
            </div>
          </div>
          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {languageData.default ? (
                  <span className="text-black font-bold text-[15px]">Yes</span>
                ) : (
                  <span className="text-black font-bold text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 - Status Labels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Status Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Status</span>
            </div>
            <div className="">
              {languageData.status === "active" ? (
                <span className="text-black font-bold text-[15px]">Active</span>
              ) : (
                <span className="text-black font-bold text-[15px]">
                  Inactive
                </span>
              )}
            </div>
          </div>

          {/* Deleted Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Deleted</span>
            </div>
            <div className="">
              {languageData.isDeleted ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
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
          created: getRelativeTime(languageData.createdAt),
          updated: getRelativeTime(languageData.updatedAt),
          deleted: getRelativeTime(languageData.deletedAt),
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
