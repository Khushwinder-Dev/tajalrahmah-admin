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
import FieldSection from "@/components/common/FieldSection";

type PackageType = {
  ruleName: string;
  pointFrom: string;
  pointTo: string;
  weight: string;
  rulesStatus: string;
};

type TermsData = {
  name: string;
  customerGroup: string;
  customer: string;
  startDate: string;
  endDate: string;
  ruleBase: string;
  minimumPurchase: string;
  accountCreationPoint: string;
  birthdayPoint: string;
  redeemType: string;
  minimumPointToRedeem: string;
  maxAmountReceive: string;
  status: string;
  redeemInPortal: string;
  redeemInPos: string;
  description: string;

  PackageType: PackageType[];

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
  name: "Festive Rewards Program",
  customerGroup: "Gold Members",
  customer: "John Doe",
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  ruleBase: "Purchase Amount",
  minimumPurchase: "2000", // in BDT
  accountCreationPoint: "100",
  birthdayPoint: "250",
  redeemType: "Discount Voucher",
  minimumPointToRedeem: "500",
  maxAmountReceive: "5000", // max discount limit
  status: "active",
  redeemInPortal: "true",
  redeemInPos: "true",
  description:
    "Exclusive loyalty program for Gold Members with special rewards on purchases and birthdays.",
  PackageType: [
    {
      ruleName: "Silver Tier",
      pointFrom: "1",
      pointTo: "999",
      weight: "1", // 1 point per 100 BDT
      rulesStatus: "active",
    },
    {
      ruleName: "Gold Tier",
      pointFrom: "1000",
      pointTo: "4999",
      weight: "2", // 2 points per 100 BDT
      rulesStatus: "active",
    },
    {
      ruleName: "Platinum Tier",
      pointFrom: "5000",
      pointTo: "10000",
      weight: "3", // 3 points per 100 BDT
      rulesStatus: "active",
    },
  ],

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

export default function LoyaltyProgramsDetailsPage() {
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
  const canCreate: boolean = usePermission("loyaltyPrograms", "create");
  const canView: boolean = usePermission("loyaltyPrograms", "view");
  const canEdit: boolean = usePermission("loyaltyPrograms", "edit");
  const canDelete: boolean = usePermission("loyaltyPrograms", "delete");
  const canExport: boolean = usePermission("loyaltyPrograms", "export");
  const canPdf: boolean = usePermission("loyaltyPrograms", "pdf");
  const canPrint: boolean = usePermission("loyaltyPrograms", "print");
  const canSeeHistory: boolean = usePermission("loyaltyPrograms", "history");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  const inputRef = useRef<HTMLInputElement>(null);

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
        title: "Pickup Details",
        data: [initialData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          branch: "Branch",
          voucherNumber: "Voucher Number",
          category: "Category",
          subCategory: "Sub Category",
          Pickup: "Pickup",
          date: "Date",
          amount: "Amount",
          currency: "Currency",
          paymentMode: "Payment Mode",
          vat: "VAT",
          supplier: "Supplier",
          approvedBy: "Approved By",
          purchaseInvoiceNumber: "Purchase Invoice Number",
          supplierVatNumber: "Supplier VAT Number",
          PickupBy: "Pickup By",
          PickupFor: "Pickup For",
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
          title="Pickup Details"
          subtitle="Pickup Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Pickup-details.pdf";
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
        title={t("button.viewingPickup")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/loyalty-programs")}
        listText="List"
        listPath="loyalty-programs"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/loyalty-programs/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/loyalty-programs/edit/1"),
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
            {/* Shipment Basic Info */}
            <FieldSection label="Name" value={initialData.name} />
            <FieldSection
              label="Customer Group"
              value={initialData.customerGroup}
            />
            <FieldSection label="Customer" value={initialData.customer} />
            <FieldSection label="Start Date" value={initialData.startDate} />
            <FieldSection label="End Date" value={initialData.endDate} />
            <FieldSection label="Rule Base" value={initialData.ruleBase} />
            <FieldSection
              label="Minimum Purchase"
              value={initialData.minimumPurchase}
            />
            <FieldSection
              label="Account Creation Point"
              value={initialData.accountCreationPoint}
            />
            <FieldSection
              label="Birthday Point"
              value={initialData.birthdayPoint}
            />
            <FieldSection label="Redeem Type" value={initialData.redeemType} />
            <FieldSection
              label="Minimum Point to Redeem"
              value={initialData.minimumPointToRedeem}
            />
            <FieldSection
              label="Max Amount Receive"
              value={initialData.maxAmountReceive}
            />
            <FieldSection label="Status" value={initialData.status} />
            <FieldSection
              label="Redeem in Portal"
              value={initialData.redeemInPortal}
            />
            <FieldSection
              label="Redeem in POS"
              value={initialData.redeemInPos}
            />
            <FieldSection label="Description" value={initialData.description} />

            {/* PackageType mapping */}
            {initialData.PackageType.map((pkg, index) => (
              <div key={index} className="ml-4 mt-2 border-l pl-4">
                <FieldSection label="Rule Name" value={pkg.ruleName} />
                <FieldSection label="Point From" value={pkg.pointFrom} />
                <FieldSection label="Point To" value={pkg.pointTo} />
                <FieldSection label="Weight" value={pkg.weight} />
                <FieldSection label="Rules Status" value={pkg.rulesStatus} />
              </div>
            ))}

            {/* Status Flags */}
            <div>
              <h3 className="font-normal mb-1 text-gray-600">Default</h3>
              <div className="py-1 font-bold">
                {initialData.isDefault ? "Yes" : "No"}
              </div>
            </div>
            <div>
              <h3 className="font-normal mb-1 text-gray-600">Active</h3>
              <div className="py-1 font-bold">
                {initialData.isActive ? "Yes" : "No"}
              </div>
            </div>
            <div>
              <h3 className="font-normal mb-1 text-gray-600">Draft</h3>
              <div className="py-1 font-bold">
                {initialData.isDraft ? "Yes" : "No"}
              </div>
            </div>
            <div>
              <h3 className="font-normal mb-1 text-gray-600">Deleted</h3>
              <div className="py-1 font-bold">
                {initialData.isDeleted ? "Yes" : "No"}
              </div>
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
