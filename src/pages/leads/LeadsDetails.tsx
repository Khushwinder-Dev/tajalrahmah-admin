/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
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
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
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

export default function LeadsDetailsPage() {
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
  const canPdf: boolean = usePermission("taxRates", "pdf");
  const canEdit: boolean = usePermission("taxRates", "edit");
  const canDelete: boolean = usePermission("taxRates", "delete");
  const canCreate: boolean = usePermission("taxRates", "create");
  const canView: boolean = usePermission("taxRates", "view");
  const canPrint: boolean = usePermission("taxRates", "print");
  const canSeeHistory: boolean = usePermission("taxRates", "history");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  let LeadsData = {
    clientName: "Global Tech Solutions Ltd.",
    productGroup: "Electronics",
    service: "Inventory",
    budget: 150000,
    priority: "High",
    startDate: "2025-08-01",
    assignee: "John Doe",
    contact: "+971 50 123 4567",
    position: "Procurement Manager",
    source: "Web",
    employees: "150",
    branches: "Main Branch",
    business: "B2B Electronics Wholesale",
    automation: true,
    status: "Open",
    language: "English",
    mobile: "+971 50 765 4321",
    whatsapp: "+971 50 765 4321",
    email: "contact@globaltech.com",
    fax: "+971 4 123 4568",
    country: "Dubai",
    state: "State 1",
    city: "City 1",
    area: "Area 2",
    website: "https://www.globaltech.com",
    facebook: "https://facebook.com/globaltech",
    instagram: "https://instagram.com/globaltech",
    linkedin: "https://linkedin.com/company/globaltech",
    location: "Building 12, Tech Park, Dubai, UAE",
    notes:
      "Client requires bulk delivery every quarter and integration with ERP system.",
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
      LeadsData = {
        clientName: "Global Tech Solutions Ltd.",
        productGroup: "Electronics",
        service: "Inventory",
        budget: 150000,
        priority: "High",
        startDate: "2025-08-01",
        assignee: "John Doe",
        contact: "+971 50 123 4567",
        position: "Procurement Manager",
        source: "Web",
        employees: "150",
        branches: "Main Branch",
        business: "B2B Electronics Wholesale",
        automation: true,
        status: "Open",
        language: "English",
        mobile: "+971 50 765 4321",
        whatsapp: "+971 50 765 4321",
        email: "contact@globaltech.com",
        fax: "+971 4 123 4568",
        country: "Dubai",
        state: "State 1",
        city: "City 1",
        area: "Area 2",
        website: "https://www.globaltech.com",
        facebook: "https://facebook.com/globaltech",
        instagram: "https://instagram.com/globaltech",
        linkedin: "https://linkedin.com/company/globaltech",
        location: "Building 12, Tech Park, Dubai, UAE",
        notes:
          "Client requires bulk delivery every quarter and integration with ERP system.",
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

  const handlePrintTaxRates = (LeadsData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Tax Rates Details",
        data: [LeadsData],
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
    //   setTimeout(() => handlePrintTaxRates(LeadsData), 100);
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
      console.log("LeadsData on pdf click", LeadsData);
      const blob = await pdf(
        <GenericPDF
          data={[LeadsData]}
          title="Tax Rates Details"
          subtitle="Tax Rates Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "TaxRates-details.pdf";
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

  // Create minimize handler
  const handleMinimize = useCallback(() => {
    return {
      LeadsData,
      hasChanges: false,
      scrollPosition: window.scrollY,
    };
  }, [LeadsData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="leads-details-module"
        moduleName="View Leads Details"
        moduleRoute="/leads/view"
        onMinimize={handleMinimize}
        title={t("button.viewingLeads")}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="leads"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/leads/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/leads/edit/1"),
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
                  handlePrintTaxRates(LeadsData);
                }
              }
            : undefined
        }
        module="leads"
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Client Name</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.clientName)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Product Group</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.productGroup)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Service</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.service)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Budget</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.budget)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Priority</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.priority)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Start Date</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.startDate)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Assignee</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.assignee)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Contact</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.contact)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Position</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.position)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Source</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.source)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Employees</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.employees)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Branches</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.branches)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Business</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.business)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Automation</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.automation ? "Yes" : "No")}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Status</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.status)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Language</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.language)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Mobile</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.mobile)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">WhatsApp</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.whatsapp)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Email</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.email)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Fax</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.fax)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Country</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.country)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">State</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.state)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">City</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.city)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Area</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.area)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Website</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.website)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Facebook</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.facebook)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Instagram</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.instagram)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">LinkedIn</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.linkedin)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Location</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.location)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Notes</h3>
            <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
              {displayValue(LeadsData.notes)}
            </div>
          </div>

          {/* Default Label */}
          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {LeadsData.isDefault ? (
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
              {!LeadsData.isActive ? (
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
              {LeadsData.isDraft ? (
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
              {LeadsData.isDeleted ? (
                <span className="text-black font-bold text-[15px]">Yes</span>
              ) : (
                <span className="text-black font-bold text-[15px]">No</span>
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
          created: getRelativeTime(LeadsData.createdAt),
          updated: getRelativeTime(LeadsData.updatedAt),
          drafted: getRelativeTime(LeadsData.draftedAt),
          deleted: getRelativeTime(LeadsData.deletedAt),
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
