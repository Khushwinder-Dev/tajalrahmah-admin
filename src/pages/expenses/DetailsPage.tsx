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

type TermsData = {
  branch: string;
  voucherNumber: string;
  category: string;
  subCategory: string;
  expense: string;
  date: string;
  amount: string;
  currency: string;
  paymentMode: string;
  vat: string;
  supplier: string;
  approvedBy: string;
  purchaseInvoiceNumber: string;
  supplierVatNumber: string;
  expenseBy: string;
  expenseFor: string;
  note: string;

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
  branch: "Dhaka",
  voucherNumber: "VCH-1012",
  category: "Miscellaneous",
  subCategory: "Gifts",
  expense: "Client Gift",
  date: "2025-08-12",
  amount: "1800",
  currency: "BDT",
  paymentMode: "Cash",
  vat: "0%",
  supplier: "Gift World",
  approvedBy: "Nusrat Jahan",
  purchaseInvoiceNumber: "INV-5012",
  supplierVatNumber: "VAT-78912",
  expenseBy: "Sabbir Ahmed",
  expenseFor: "Client Relationship",
  note: "Gift for client relationship",

  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Leave Types options for autocomplete
const projectTypeOptions = [
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Barisal",
  "Rajshahi",
  "Sylhet",
  "Mymensingh",
  "Rangpur",
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

export default function ExpensesDetails() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState("Dhaka");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("expenses", "create");
  const canView: boolean = usePermission("expenses", "view");
  const canEdit: boolean = usePermission("expenses", "edit");
  const canDelete: boolean = usePermission("expenses", "delete");
  const canExport: boolean = usePermission("expenses", "export");
  const canPdf: boolean = usePermission("expenses", "pdf");
  const canPrint: boolean = usePermission("expenses", "print");
  const canSeeHistory: boolean = usePermission("expenses", "history");

  // Field-level permissions
  const branch: boolean = usePermission("expenses", "view", "branch");
  const voucherNumber: boolean = usePermission(
    "expenses",
    "view",
    "voucherNumber"
  );

  const category: boolean = usePermission("expenses", "view", "category");

  const subCategory: boolean = usePermission("expenses", "view", "subCategory");

  const expense: boolean = usePermission("expenses", "view", "expense");

  const date: boolean = usePermission("expenses", "view", "date");
  const amount: boolean = usePermission("expenses", "view", "amount");
  const currency: boolean = usePermission("expenses", "view", "currency");
  const paymentMode: boolean = usePermission("expenses", "view", "paymentMode");
  const vat: boolean = usePermission("expenses", "view", "vat");
  const supplier: boolean = usePermission("expenses", "view", "supplier");
  const approvedBy: boolean = usePermission("expenses", "view", "approvedBy");
  const purchaseInvoiceNumber: boolean = usePermission(
    "expenses",
    "view",
    "purchaseInvoiceNumber"
  );
  const supplierVatNumber: boolean = usePermission(
    "expenses",
    "view",
    "supplierVatNumber"
  );
  const expenseBy: boolean = usePermission("expenses", "view", "expenseBy");
  const expenseFor: boolean = usePermission("expenses", "view", "expenseFor");
  const note: boolean = usePermission("expenses", "view", "note");

  const canViewIsDraft: boolean = usePermission("expenses", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "expenses",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get leaves data based on selected leave type
  const getLeavesData = (leaveType: string): TermsData => {
    const leavesMap: Record<string, TermsData> = {
      Dhaka: {
        branch: "Dhaka",
        voucherNumber: "VCH-1012",
        category: "Miscellaneous",
        subCategory: "Gifts",
        expense: "Client Gift",
        date: "2025-08-12",
        amount: "1800",
        currency: "BDT",
        paymentMode: "Cash",
        vat: "0%",
        supplier: "Gift World",
        approvedBy: "Nusrat Jahan",
        purchaseInvoiceNumber: "INV-5012",
        supplierVatNumber: "VAT-78912",
        expenseBy: "Sabbir Ahmed",
        expenseFor: "Client Relationship",
        note: "Gift for client relationship",

        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Chittagong: {
        branch: "Chittagong",
        voucherNumber: "VCH-1012",
        category: "Miscellaneous",
        subCategory: "Gifts",
        expense: "Client Gift",
        date: "2025-08-12",
        amount: "1800",
        currency: "BDT",
        paymentMode: "Cash",
        vat: "0%",
        supplier: "Gift World",
        approvedBy: "Nusrat Jahan",
        purchaseInvoiceNumber: "INV-5012",
        supplierVatNumber: "VAT-78912",
        expenseBy: "Sabbir Ahmed",
        expenseFor: "Client Relationship",
        note: "Gift for client relationship",

        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      Khulna: {
        branch: "Khulna",
        voucherNumber: "VCH-1012",
        category: "Something Else",
        subCategory: "Gifts",
        expense: "Client Gift",
        date: "2025-08-12",
        amount: "1800",
        currency: "BDT",
        paymentMode: "Cash",
        vat: "0%",
        supplier: "Gift World",
        approvedBy: "Nusrat Jahan",
        purchaseInvoiceNumber: "INV-5012",
        supplierVatNumber: "VAT-78912",
        expenseBy: "Sabbir Ahmed",
        expenseFor: "Client Relationship",
        note: "Gift for client relationship",

        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return leavesMap[leaveType] || initialData;
  };

  const [leavesData, setLeavesData] = useState<TermsData>(
    getLeavesData(selectedLeaveType)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update leaves data when selection changes
  useEffect(() => {
    setLeavesData(getLeavesData(selectedLeaveType));
  }, [selectedLeaveType]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Expense Details",
        data: [leavesData],
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
      console.log("pdf click", leavesData);
      const blob = await pdf(
        <GenericPDF
          data={[leavesData]}
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

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <PageLayout
        title="Viewing Expense"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/expenses")}
        listText="List"
        listPath="expenses"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/expenses/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/expenses/edit/1"),
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
                  handlePrintLeaves(leavesData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Leave Types, Notes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {branch && (
              <div className="mt-1">
                <Autocomplete
                  options={projectTypeOptions}
                  value={selectedLeaveType}
                  onValueChange={setSelectedLeaveType}
                  placeholder=" "
                  displayKey="jobLocation"
                  valueKey="jobLocation"
                  searchKey="jobLocation"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Job Location"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {voucherNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Voucher Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.voucherNumber)}
                </div>
              </div>
            )}

            {category && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Category</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.category)}
                </div>
              </div>
            )}
            {subCategory && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Sub Category</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.subCategory)}
                </div>
              </div>
            )}

            {expense && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Expense</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.expense)}
                </div>
              </div>
            )}
            {date && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.date)}
                </div>
              </div>
            )}
            {amount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Amount</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.amount)}
                </div>
              </div>
            )}
            {currency && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Currency</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.currency)}
                </div>
              </div>
            )}
            {paymentMode && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Payment Mode</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.paymentMode)}
                </div>
              </div>
            )}
            {vat && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">VAT</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.vat)}
                </div>
              </div>
            )}
            {supplier && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Supplier</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.supplier)}
                </div>
              </div>
            )}
            {approvedBy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Approved By</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.approvedBy)}
                </div>
              </div>
            )}
            {purchaseInvoiceNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Invoice Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.purchaseInvoiceNumber)}
                </div>
              </div>
            )}
            {supplierVatNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Supplier VAT Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.supplierVatNumber)}
                </div>
              </div>
            )}
            {expenseBy && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Expense By</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.expenseBy)}
                </div>
              </div>
            )}
            {expenseFor && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Expense For</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.expenseFor)}
                </div>
              </div>
            )}
            {note && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Note</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(leavesData.note)}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {leavesData.isDraft ? (
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
                  {leavesData.isDeleted ? (
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
          created: getRelativeTime(leavesData.createdAt),
          updated: getRelativeTime(leavesData.updatedAt),
          drafted: getRelativeTime(leavesData.draftedAt),
          deleted: getRelativeTime(leavesData.deletedAt),
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
