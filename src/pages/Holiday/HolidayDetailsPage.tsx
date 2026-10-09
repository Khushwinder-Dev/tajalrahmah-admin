/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
// import { Autocomplete } from "@/components/common/Autocomplete";
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

export default function HolidayDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  // const [selectedName, setSelectedName] = useState("Canada");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // const { canCreate, canView, canEdit, canDelete } = useCountriesPermissions();

  const canCreate: boolean = usePermission("holiday", "create");
  const canView: boolean = usePermission("holiday", "view");
  const canEdit: boolean = usePermission("holiday", "edit");
  const canDelete: boolean = usePermission("holiday", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // get permission
  const canCreate2: boolean = usePermission("holiday", "create");
  const canEdit2: boolean = usePermission("holiday", "edit");
  const canDelete2: boolean = usePermission("holiday", "delete");
  const canExport2: boolean = usePermission("holiday", "export");
  const canPdf: boolean = usePermission("holiday", "pdf");
  const canPrint: boolean = usePermission("holiday", "print");
  const canSeeHistory: boolean = usePermission("holiday", "history");

  // Field-level permissions
  const canEditCountryName2: boolean = usePermission(
    "holiday",
    "edit",
    "assetName"
  );

  console.log("canCreate2", canCreate2);
  console.log("canEdit2", canEdit2);
  console.log("canDelete2", canDelete2);
  console.log("canExport2", canExport2);
  console.log("canEditCountryName2", canEditCountryName2);

  let HolidayData = {
    id: 12,
    name: "August Victory Day",
    fromDate: "2022-12-01",
    endDate: "2023-12-01",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    deletedAt: "2023-01-10",
    actionMessage: "",
    isActive: true,
    isDraft: false,
    isDefault: false,
    isDeleted: false,
    isUpdated: false,
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      HolidayData = {
        id: 12,
        name: "August Victory Day",
        fromDate: "2022-12-01",
        endDate: "2023-12-01",
        status: "active",
        createdAt: "2023-01-15",
        updatedAt: "2023-11-20",
        draftedAt: "2023-01-10",
        deletedAt: "2023-01-10",
        actionMessage: "",
        isActive: true,
        isDraft: false,
        isDefault: false,
        isDeleted: false,
        isUpdated: false,
      };
    }
  }, []);

  const handlePrintCountry = (HolidayData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Holiday Details",
        data: [HolidayData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
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
    //   setTimeout(() => handlePrintCountry(HolidayData), 100);
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
      console.log("HolidayData on pdf click", HolidayData);
      const blob = await pdf(
        <GenericPDF
          data={[HolidayData]}
          title="Holiday Details"
          subtitle="Holiday Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Holiday-details.pdf";
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

  // interface HistoryEntry {
  //   name: string;
  //   description: string;
  //   status: string;
  //   isDelete: boolean;

  // }

  //   const doing: HistoryEntry = {
  //   name: "Bangladesh",
  //   description: "A South Asian country marked by lush greenery and rivers.",
  //   status: "active", // or "inactive"
  //   isDelete: false, // or true
  // };

  return (
    <>
      <PageLayout
        title={t("button.viewingHoliday")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/holiday")}
        listText="List"
        listPath="holiday"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/holiday/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/holiday/edit/1"),
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
                  handlePrintCountry(HolidayData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Name</h3>
            </div>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(HolidayData.name)}
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">From Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(HolidayData.fromDate)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">End Date</h3>
            </div>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(HolidayData.endDate)}
            </div>
          </div>
          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {HolidayData.isDefault ? (
                  <span className="text-black font-bold text-[15px]">Yes</span>
                ) : (
                  <span className="text-black font-bold text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row  - Status Labels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* InActive Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Inactive</span>
            </div>
            <div className="">
              {!HolidayData.isActive ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>

          {/* Draft Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Draft</span>
            </div>
            <div className="">
              {HolidayData.isDraft ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>

          {/* Deleted Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Deleted</span>
            </div>
            <div className="">
              {HolidayData.isDeleted ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Created</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(HolidayData.createdAt)}
            </div>
          </div>
        </div>

        {/* Row 3 - Created and Updated */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Updated</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(HolidayData.updatedAt)}
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
          created: getRelativeTime(HolidayData.createdAt),
          updated: getRelativeTime(HolidayData.updatedAt),
          drafted: getRelativeTime(HolidayData.draftedAt),
          deleted: getRelativeTime(HolidayData.deletedAt),
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
