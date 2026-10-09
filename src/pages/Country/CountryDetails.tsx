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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { useCountriesPermissions } from "@/hooks/usePermissions";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_COUNTRIES = [
  { code: "US", name: "United States", ISD: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", ISD: "+44", flag: "🇬🇧" },
  { code: "AE", name: "United Arab Emirates", ISD: "+971", flag: "🇦🇪" },
  { code: "IN", name: "India", ISD: "+91", flag: "🇮🇳" },
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

export default function CountryDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const { canCreate, canView, canEdit, canDelete } = useCountriesPermissions();
  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // get permission
  const canCreate2: boolean = usePermission("countries", "create");
  const canEdit2: boolean = usePermission("countries", "edit");
  const canDelete2: boolean = usePermission("countries", "delete");
  const canExport2: boolean = usePermission("countries", "export");
  const canPdf: boolean = usePermission("countries", "pdf");
  const canPrint: boolean = usePermission("countries", "print");
  const canSeeHistory: boolean = usePermission("countries", "history");

  // Field-level permissions
  const canEditCountryName2: boolean = usePermission(
    "countries",
    "edit",
    "countryName"
  );

  console.log("canCreate2", canCreate2);
  console.log("canEdit2", canEdit2);
  console.log("canDelete2", canDelete2);
  console.log("canExport2", canExport2);
  console.log("canEditCountryName2", canEditCountryName2);

  let countryData = {
    code: selectedCountry,
    ISD: MOCK_COUNTRIES.find((c) => c.code === selectedCountry)?.ISD || "+1",
    title:
      MOCK_COUNTRIES.find((c) => c.code === selectedCountry)?.name ||
      "United States",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: true,
    flag: "https://flagcdn.com/us.svg",
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
      countryData = {
        code: selectedCountry,
        ISD: "",
        title: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        flag: "",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintCountry = (countryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Country Details",
        data: [countryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Country Code",
          title: "Country Name",
          ISD: "ISD",
          isDefault: "Default Country",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          flag: "Flag",
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
      console.log("countryData on pdf click", countryData);
      const blob = await pdf(
        <GenericPDF
          data={[countryData]}
          title="Country Details"
          subtitle="Country Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-details.pdf";
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
      <MinimizablePageLayout
        moduleId="country-details-module"
        moduleName="Country Details"
        moduleRoute="/countries/view"
        title={t("button.viewingCountry")}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="countries"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/countries/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/countries/edit/1"),
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
                  handlePrintCountry(countryData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_COUNTRIES}
              value={selectedCountry}
              onValueChange={setSelectedCountry}
              placeholder=" "
              displayKey="code"
              valueKey="code"
              searchKey="name"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Code"
              isShowTemplateIcon={false}
              // inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
            />
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">ISD</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(countryData.ISD)}
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Country</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(countryData.title)}
            </div>
          </div>
          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {countryData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 - Status and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Status</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {countryData.isDeleted
                ? "Deleted"
                : countryData.isDraft
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

        {/* Flag */}
        <div className="mt-14 relative">
          {/* Floating Label */}
          <div className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-500 rounded-md">
            Flag
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary py-16">
            <div className="w-48 h-28 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300 cursor-pointer">
              {countryData.flag ? (
                <img
                  src={countryData.flag}
                  alt="Flag"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  –
                </div>
              )}
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
          created: getRelativeTime(countryData.createdAt),
          updated: getRelativeTime(countryData.updatedAt),
          drafted: getRelativeTime(countryData.draftedAt),
          deleted: getRelativeTime(countryData.deletedAt),
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
