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

export default function AssetsDetailsPage() {
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

  const canCreate: boolean = usePermission("assetsCategory", "create");
  const canView: boolean = usePermission("assetsCategory", "view");
  const canEdit: boolean = usePermission("assetsCategory", "edit");
  const canDelete: boolean = usePermission("assetsCategory", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // get permission
  const canCreate2: boolean = usePermission("assetsCategory", "create");
  const canEdit2: boolean = usePermission("assetsCategory", "edit");
  const canDelete2: boolean = usePermission("assetsCategory", "delete");
  const canExport2: boolean = usePermission("assetsCategory", "export");
  const canPdf: boolean = usePermission("assetsCategory", "pdf");
  const canPrint: boolean = usePermission("assetsCategory", "print");
  const canSeeHistory: boolean = usePermission("assetsCategory", "history");

  // Field-level permissions
  const canEditCountryName2: boolean = usePermission(
    "assetsCategory",
    "edit",
    "assetName"
  );

  console.log("canCreate2", canCreate2);
  console.log("canEdit2", canEdit2);
  console.log("canDelete2", canDelete2);
  console.log("canExport2", canExport2);
  console.log("canEditCountryName2", canEditCountryName2);

  let assetsData = {
    id: "1",
    // code: selectedName,
    assetName: "United States",
    description: "The most populous country in the world",
    status: "active",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: true,
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
      assetsData = {
        id: "1",
        // code: selectedName,
        assetName: "United States",
        description: "The most populous country in the world",
        status: "active",
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

  const handlePrintCountry = (assetsData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Assets Details",
        data: [assetsData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Assets Code",
          title: "Assets Name",
          callingCode: "Calling Code",
          isDefault: "Default Country",
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
    // Remove auto-print on toggle
    // if (checked) {
    //   setTimeout(() => handlePrintCountry(assetsData), 100);
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
      console.log("assetsData on pdf click", assetsData);
      const blob = await pdf(
        <GenericPDF
          data={[assetsData]}
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
        title={t("button.viewingAssetsCategory")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/assets-category")}
        listText="List"
        listPath="assets-category"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/assets-category/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/assets-category/edit/1"),
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
                  handlePrintCountry(assetsData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* <div className="mt-1">
            <Autocomplete
              options={MOCK_ASSETS}
              value={selectedName}
              onValueChange={setSelectedName}
              placeholder="Select name..."
              displayKey="assetName"
              valueKey="assetName"
              searchKey="assetName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Asset Name"
              inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
            />
          </div> */}

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Assets Name</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(assetsData.assetName)}
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Description</h3>
            </div>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(assetsData.description)}
            </div>
          </div>
          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {assetsData.isDefault ? (
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
          {/* InActive Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Inactive</span>
            </div>
            <div className="">
              {!assetsData.isActive ? (
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
              {assetsData.isDraft ? (
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
              {assetsData.isDeleted ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
              )}
            </div>
          </div>
        </div>

        {/* Flag */}
        {/* <div className="mt-14 relative">
          <div className="border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary py-16">
            <div className="w-48 h-28 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300 cursor-pointer">
              {assetsData.flag ? (
                <img
                  src={assetsData.flag}
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
        </div> */}

        {/* <div className="mt-6 w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-2">
            <div className="text-xl font-semibold text-gray-800 dark:text-white">
              {doing.name || "No Name"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {doing.description || "No description available."}
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm font-medium">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    doing.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {doing.status?.toUpperCase() || "UNKNOWN"}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Deleted:{" "}
                <span
                  className={
                    doing.isDelete ? "text-red-600" : "text-green-600"
                  }
                >
                  {doing.isDelete ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </PageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(assetsData.createdAt),
          updated: getRelativeTime(assetsData.updatedAt),
          drafted: getRelativeTime(assetsData.draftedAt),
          deleted: getRelativeTime(assetsData.deletedAt),
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
