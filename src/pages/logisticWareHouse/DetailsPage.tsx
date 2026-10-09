/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
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

export default function LogisticWarehouseDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canPdf: boolean = usePermission("logisticWareHouse", "pdf");
  const canEdit: boolean = usePermission("logisticWareHouse", "edit");
  const canDelete: boolean = usePermission("logisticWareHouse", "delete");
  const canCreate: boolean = usePermission("logisticWareHouse", "create");
  const canView: boolean = usePermission("logisticWareHouse", "view");
  const canPrint: boolean = usePermission("logisticWareHouse", "print");
  const canSeeHistory: boolean = usePermission("logisticWareHouse", "history");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  let DummyData = {
    name: "Global Trade International",
    country: "Bangladesh",
    contactPerson: "Mr. Rahim Uddin",
    mobile: "+8801712345678",
    phone: "+88029876543",
    fax: "+88029876544",
    email: "info@globaltrade.com",
    website: "www.globaltrade.com",
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
      DummyData = {
        name: "Global Trade International",
        country: "Bangladesh",
        contactPerson: "Mr. Rahim Uddin",
        mobile: "+8801712345678",
        phone: "+88029876543",
        fax: "+88029876544",
        email: "info@globaltrade.com",
        website: "www.globaltrade.com",
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

  const handlePrintRoomSize = (DummyData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Logistic Warehouse Details",
        data: [DummyData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          isDefault: "Default",
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
    //   setTimeout(() => handlePrintRoomSize(DummyData), 100);
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
      console.log("DummyData on pdf click", DummyData);
      const blob = await pdf(
        <GenericPDF
          data={[DummyData]}
          title="Logistic Warehouse Details"
          subtitle="Logistic Warehouse Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Rooms-details.pdf";
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
        title={t("button.viewingLogisticWarehouse")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/logistic-warehouse")}
        listText="List"
        listPath="logistic-warehouse"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/logistic-warehouse/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/logistic-warehouse/edit/1"),
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
                  handlePrintRoomSize(DummyData);
                }
              }
            : undefined
        }
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Company Name</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.name)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Country</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.country)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Contact Person</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.contactPerson)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Mobile</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.mobile)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Phone</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.phone)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Fax</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.fax)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Email</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.email)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Website</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(DummyData.website)}
            </div>
          </div>

          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {DummyData.isDefault ? (
                  <span className="text-black font-bold text-[15px]">Yes</span>
                ) : (
                  <span className="text-black font-bold text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
          {/* InActive Label */}
          <div className="flex flex-col">
            <div className="">
              <span className="text-[15px] text-gray-600">Inactive</span>
            </div>
            <div className="">
              {!DummyData.isActive ? (
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
              {DummyData.isDraft ? (
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
              {DummyData.isDeleted ? (
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
          created: getRelativeTime(DummyData.createdAt),
          updated: getRelativeTime(DummyData.updatedAt),
          drafted: getRelativeTime(DummyData.draftedAt),
          deleted: getRelativeTime(DummyData.deletedAt),
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
