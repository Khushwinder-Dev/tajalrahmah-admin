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
// Removed unused Modal and Button imports for interview details

type ContactTypeData = {
  name: string;
  description: string;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: ContactTypeData = {
  name: "Customer Contact",
  description: "Contact type for customer inquiries",
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Contact type options for autocomplete
const contactTypeOptions = [
  "Customer Contact",
  "Supplier Contact",
  "Partner Contact",
  "Employee Contact",
  "Vendor Contact",
  "Client Contact",
  "Support Contact",
  "Sales Contact",
  "Technical Contact",
  "Management Contact",
  "Emergency Contact",
  "General Contact",
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

export default function ContactTypeDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedContactType, setSelectedContactType] =
    useState("Customer Contact");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // No employee modal in contact type details

  // get permission
  const canCreate: boolean = usePermission("contactType", "create");
  const canView: boolean = usePermission("contactType", "view");
  const canEdit: boolean = usePermission("contactType", "edit");
  const canDelete: boolean = usePermission("contactType", "delete");
  const canExport: boolean = usePermission("contactType", "export");
  const canPdf: boolean = usePermission("contactType", "pdf");
  const canPrint: boolean = usePermission("contactType", "print");
  const canSeeHistory: boolean = usePermission("contactType", "history");

  // Field-level permissions
  const canViewName: boolean = usePermission("contactType", "view", "name");
  const canViewDescription: boolean = usePermission(
    "contactType",
    "view",
    "description"
  );
  const canViewIsDraft: boolean = usePermission(
    "contactType",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "contactType",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get contact type data based on selected type
  const getContactTypeData = (contactTypeName: string): ContactTypeData => {
    const contactTypeMap: Record<string, ContactTypeData> = {
      "Customer Contact": initialData,
      "Supplier Contact": {
        name: "Supplier Contact",
        description: "Contact type for supplier communications",
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };
    return contactTypeMap[contactTypeName] || initialData;
  };

  const [contactTypeData, setContactTypeData] = useState<ContactTypeData>(
    getContactTypeData(selectedContactType)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // No employee IQAMA map for contact type details

  // Update contact type data when selection changes
  useEffect(() => {
    const newData = getContactTypeData(selectedContactType);
    setContactTypeData(newData);
  }, [selectedContactType]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintContactType = (tData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Contact Type Details",
        data: [tData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Contact Type",
          description: "Description",
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
      console.log("contactTypeData on pdf click", contactTypeData);
      const blob = await pdf(
        <GenericPDF
          data={[contactTypeData]}
          title="Contact Type Details"
          subtitle="Contact Type Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contact-type-details.pdf";
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
        title="Viewing Contact Type"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/contact-type")}
        listText="List"
        listPath="contact-type"
        activePage="view"
        popoverOptions={[
          ...(canCreate
            ? [
                {
                  label: "Create",
                  icon: <Plus className="w-5 h-5 text-green-600" />,
                  onClick: () => navigate("/contact-type/create"),
                },
              ]
            : []),
          ...(canEdit
            ? [
                {
                  label: "Edit",
                  icon: <Edit className="w-5 h-5 text-blue-600" />,
                  onClick: () => navigate("/contact-type/edit/1"),
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

                if (pdfChecked) handleExportPDF();
                if (printEnabled) handlePrintContactType(contactTypeData);
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Contact Type Name and Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewName && (
              <div className="mt-1">
                <Autocomplete
                  options={contactTypeOptions}
                  value={selectedContactType}
                  onValueChange={setSelectedContactType}
                  placeholder="Select contact type..."
                  displayKey="name"
                  valueKey="name"
                  searchKey="name"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Contact Type"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Description</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(contactTypeData.description)}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {contactTypeData.isDraft ? (
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
                  {contactTypeData.isDeleted ? (
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
          created: getRelativeTime(contactTypeData.createdAt),
          updated: getRelativeTime(contactTypeData.updatedAt),
          drafted: getRelativeTime(contactTypeData.draftedAt),
          deleted: getRelativeTime(contactTypeData.deletedAt),
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

      {/* Removed employee modal for contact type details */}
    </>
  );
}
