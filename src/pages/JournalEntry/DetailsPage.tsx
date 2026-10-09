/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useTranslation } from "react-i18next";

type PackageType = {
  account: string;
  debit: string;
  description: string;
  credit: string;
};

type TermsData = {
  number: string;
  journalDate: string;
  journalEntry: string;
  reference: string;
  totalCycles: string;

  PackageType: PackageType;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: TermsData = {
  number: "001",
  journalDate: "2025-08-18",
  journalEntry: "JE-001",
  reference: "REF-1001",
  totalCycles: "12",
  PackageType: {
    account: "Cash",
    debit: "5000",
    description: "Office supplies purchase",
    credit: "0",
  },

  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

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

export default function JournalEntryDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  // const [selectedLeaveType, setSelectedLeaveType] = useState("Dhaka");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("journalEntry", "create");
  const canView: boolean = usePermission("journalEntry", "view");
  const canEdit: boolean = usePermission("journalEntry", "edit");
  const canDelete: boolean = usePermission("journalEntry", "delete");
  const canExport: boolean = usePermission("journalEntry", "export");
  const canPdf: boolean = usePermission("journalEntry", "pdf");
  const canPrint: boolean = usePermission("journalEntry", "print");
  const canSeeHistory: boolean = usePermission("journalEntry", "history");

  // // Field-level permissions
  // const branch: boolean = usePermission("journalEntry", "view", "branch");
  // const voucherNumber: boolean = usePermission(
  //   "journalEntry",
  //   "view",
  //   "voucherNumber"
  // );

  // const category: boolean = usePermission("journalEntry", "view", "category");

  // const subCategory: boolean = usePermission("journalEntry", "view", "subCategory");

  // const expense: boolean = usePermission("journalEntry", "view", "expense");

  // const date: boolean = usePermission("journalEntry", "view", "date");
  // const amount: boolean = usePermission("journalEntry", "view", "amount");
  // const currency: boolean = usePermission("journalEntry", "view", "currency");
  // const paymentMode: boolean = usePermission("journalEntry", "view", "paymentMode");
  // const vat: boolean = usePermission("journalEntry", "view", "vat");
  // const supplier: boolean = usePermission("journalEntry", "view", "supplier");
  // const approvedBy: boolean = usePermission("journalEntry", "view", "approvedBy");
  // const purchaseInvoiceNumber: boolean = usePermission(
  //   "journalEntry",
  //   "view",
  //   "purchaseInvoiceNumber"
  // );
  // const supplierVatNumber: boolean = usePermission(
  //   "journalEntry",
  //   "view",
  //   "supplierVatNumber"
  // );
  // const expenseBy: boolean = usePermission("journalEntry", "view", "expenseBy");
  // const expenseFor: boolean = usePermission("journalEntry", "view", "expenseFor");
  // const note: boolean = usePermission("journalEntry", "view", "note");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  const inputRef = useRef<HTMLInputElement>(null);

  // Update leaves data when selection changes
  // useEffect(() => {
  //   setinitialData(getinitialData(selectedLeaveType));
  // }, [selectedLeaveType]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeaves = (initialData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expense Details",
        data: [initialData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          voucherNumber: "Voucher Number",
          category: "Category",
          subCategory: "Sub Category",
          expense: "Expense",
          date: "Date",
          amount: "Amount",
          currency: "Currency",
          paymentMode: "Payment Mode",
          vat: "VAT",
          supplier: "Supplier",
          approvedBy: "Approved By",
          purchaseInvoiceNumber: "Purchase Invoice Number",
          supplierVatNumber: "Supplier VAT Number",
          expenseBy: "Expense By",
          expenseFor: "Expense For",
          isDefault: "Default Leave",
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
      console.log("pdf click", initialData);
      const blob = await pdf(
        <GenericPDF
          data={[initialData]}
          title="Expense Details"
          subtitle="Expense Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expense-details.pdf";
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

  // const displayValue = (value: any) => {
  //   return value === undefined || value === null || value === "" ? "–" : value;
  // };

  return (
    <>
      <PageLayout
        title={t("button.viewingShipment")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/journal-entry")}
        listText="List"
        listPath="journal-entry"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/journal-entry/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/journal-entry/edit/1"),
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
                  handlePrintLeaves(initialData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Leave Types, Notes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {/* Basic Info */}
            {initialData.number && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Number</h3>
                <div className="py-1 font-bold">{initialData.number}</div>
              </div>
            )}

            {initialData.journalDate && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Journal Date</h3>
                <div className="py-1 font-bold">{initialData.journalDate}</div>
              </div>
            )}

            {initialData.journalEntry && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Journal Entry
                </h3>
                <div className="py-1 font-bold">{initialData.journalEntry}</div>
              </div>
            )}

            {initialData.reference && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Reference</h3>
                <div className="py-1 font-bold">{initialData.reference}</div>
              </div>
            )}

            {initialData.totalCycles && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Total Cycles</h3>
                <div className="py-1 font-bold">{initialData.totalCycles}</div>
              </div>
            )}

            {/* Package Info */}
            {initialData.PackageType && (
              <div className="md:col-span-4">
                <h3 className="font-normal mb-1 text-gray-600">Package Info</h3>
                <div className="p-3 border rounded mb-2">
                  <div>
                    <strong>Account:</strong> {initialData.PackageType.account}
                  </div>
                  <div>
                    <strong>Debit:</strong> {initialData.PackageType.debit}
                  </div>
                  <div>
                    <strong>Description:</strong>{" "}
                    {initialData.PackageType.description}
                  </div>
                  <div>
                    <strong>Credit:</strong> {initialData.PackageType.credit}
                  </div>
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
          created: getRelativeTime(initialData.createdAt),
          updated: getRelativeTime(initialData.updatedAt),
          drafted: getRelativeTime(initialData.draftedAt),
          deleted: getRelativeTime(initialData.deletedAt),
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
