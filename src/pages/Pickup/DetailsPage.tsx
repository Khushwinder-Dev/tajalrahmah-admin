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
  amount: string;
  packageDetails: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  weightVol: string;
  fixedCharge: string;
  DecValue: string;
  TariffFee: string;
};

type TermsData = {
  shippingPrefix: string;
  number: string;
  agency: string;
  officeOfOrigin: string;
  customer: string;
  customerAddress: string;
  recipient: string;
  recipientAddress: string;
  logisticService: string;
  paymentTerm: string;
  typeofPackage: string;
  courierCompany: string;
  serviceMode: string;
  deliveryTime: string;
  assignDriver: string;
  currency: string;
  currencyRate: string;
  deliveryStatus: string;
  invoice: string;
  PackageType: PackageType[];
  priceKg: string;
  Discount: string;
  valueAssured: string;
  shippingInsurance: string;
  customDuties: string;
  tax: string;
  declaredValue: string;
  reissue: string;
  companyDocumentTitle: string[];
  companyDocument: File[];

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
  shippingPrefix: "SPX",
  number: "10001",
  agency: "FastShip Ltd.",
  officeOfOrigin: "Dhaka Central",
  customer: "Md. Rahim",
  customerAddress: "123, Gulshan Avenue, Dhaka",
  recipient: "Mr. Karim",
  recipientAddress: "45, Banani Road, Dhaka",
  logisticService: "Express",
  paymentTerm: "Prepaid",
  typeofPackage: "Box",
  courierCompany: "FedEx",
  serviceMode: "Air",
  deliveryTime: "2 Days",
  assignDriver: "Sabbir Ahmed",
  currency: "BDT",
  currencyRate: "1",
  deliveryStatus: "Pending",
  invoice: "INV-10001",
  PackageType: [
    {
      amount: "1500",
      packageDetails: "Electronic items",
      weight: "5",
      length: "30",
      width: "20",
      height: "15",
      weightVol: "6",
      fixedCharge: "50",
      DecValue: "2000",
      TariffFee: "100",
    },
  ],
  priceKg: "300",
  Discount: "10%",
  valueAssured: "5000",
  shippingInsurance: "Yes",
  customDuties: "50",
  tax: "15",
  declaredValue: "5000",
  reissue: "No",

  companyDocumentTitle: ["Invoice", "Packing List"],
  companyDocument: [],

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

export default function PickupDetails() {
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
  const canCreate: boolean = usePermission("pickup", "create");
  const canView: boolean = usePermission("pickup", "view");
  const canEdit: boolean = usePermission("pickup", "edit");
  const canDelete: boolean = usePermission("pickup", "delete");
  const canExport: boolean = usePermission("pickup", "export");
  const canPdf: boolean = usePermission("pickup", "pdf");
  const canPrint: boolean = usePermission("pickup", "print");
  const canSeeHistory: boolean = usePermission("pickup", "history");

  // // Field-level permissions
  // const branch: boolean = usePermission("pickup", "view", "branch");
  // const voucherNumber: boolean = usePermission(
  //   "pickup",
  //   "view",
  //   "voucherNumber"
  // );

  // const category: boolean = usePermission("pickup", "view", "category");

  // const subCategory: boolean = usePermission("pickup", "view", "subCategory");

  // const Pickup: boolean = usePermission("pickup", "view", "Pickup");

  // const date: boolean = usePermission("pickup", "view", "date");
  // const amount: boolean = usePermission("pickup", "view", "amount");
  // const currency: boolean = usePermission("pickup", "view", "currency");
  // const paymentMode: boolean = usePermission("pickup", "view", "paymentMode");
  // const vat: boolean = usePermission("pickup", "view", "vat");
  // const supplier: boolean = usePermission("pickup", "view", "supplier");
  // const approvedBy: boolean = usePermission("pickup", "view", "approvedBy");
  // const purchaseInvoiceNumber: boolean = usePermission(
  //   "pickup",
  //   "view",
  //   "purchaseInvoiceNumber"
  // );
  // const supplierVatNumber: boolean = usePermission(
  //   "pickup",
  //   "view",
  //   "supplierVatNumber"
  // );
  // const PickupBy: boolean = usePermission("pickup", "view", "PickupBy");
  // const PickupFor: boolean = usePermission("pickup", "view", "PickupFor");
  // const note: boolean = usePermission("pickup", "view", "note");

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
        onListClick={() => navigate("/pickup")}
        listText="List"
        listPath="pickup"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/pickup/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/pickup/edit/1"),
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
            {initialData.shippingPrefix && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping Prefix
                </h3>
                <div className="py-1 font-bold">
                  {initialData.shippingPrefix}
                </div>
              </div>
            )}

            {initialData.number && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipment Number
                </h3>
                <div className="py-1 font-bold">{initialData.number}</div>
              </div>
            )}

            {initialData.agency && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Agency</h3>
                <div className="py-1 font-bold">{initialData.agency}</div>
              </div>
            )}

            {initialData.officeOfOrigin && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Office of Origin
                </h3>
                <div className="py-1 font-bold">
                  {initialData.officeOfOrigin}
                </div>
              </div>
            )}

            {/* Customer */}
            {initialData.customer && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Customer</h3>
                <div className="py-1 font-bold">{initialData.customer}</div>
              </div>
            )}
            {initialData.customerAddress && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Customer Address
                </h3>
                <div className="py-1 font-bold">
                  {initialData.customerAddress}
                </div>
              </div>
            )}

            {/* Recipient */}
            {initialData.recipient && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Recipient</h3>
                <div className="py-1 font-bold">{initialData.recipient}</div>
              </div>
            )}
            {initialData.recipientAddress && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Recipient Address
                </h3>
                <div className="py-1 font-bold">
                  {initialData.recipientAddress}
                </div>
              </div>
            )}

            {/* Service Details */}
            {initialData.logisticService && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Logistic Service
                </h3>
                <div className="py-1 font-bold">
                  {initialData.logisticService}
                </div>
              </div>
            )}
            {initialData.courierCompany && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Courier Company
                </h3>
                <div className="py-1 font-bold">
                  {initialData.courierCompany}
                </div>
              </div>
            )}
            {initialData.serviceMode && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Service Mode</h3>
                <div className="py-1 font-bold">{initialData.serviceMode}</div>
              </div>
            )}
            {initialData.deliveryTime && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Delivery Time
                </h3>
                <div className="py-1 font-bold">{initialData.deliveryTime}</div>
              </div>
            )}
            {initialData.assignDriver && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Assigned Driver
                </h3>
                <div className="py-1 font-bold">{initialData.assignDriver}</div>
              </div>
            )}

            {/* Financial Info */}
            {initialData.currency && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Currency</h3>
                <div className="py-1 font-bold">{initialData.currency}</div>
              </div>
            )}
            {initialData.currencyRate && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Currency Rate
                </h3>
                <div className="py-1 font-bold">{initialData.currencyRate}</div>
              </div>
            )}
            {initialData.deliveryStatus && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Delivery Status
                </h3>
                <div className="py-1 font-bold">
                  {initialData.deliveryStatus}
                </div>
              </div>
            )}
            {initialData.invoice && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Invoice</h3>
                <div className="py-1 font-bold">{initialData.invoice}</div>
              </div>
            )}

            {/* Package Details */}
            {initialData.PackageType?.length > 0 && (
              <div className="md:col-span-4">
                <h3 className="font-normal mb-1 text-gray-600">Package Info</h3>
                {initialData.PackageType.map((pkg, index) => (
                  <div key={index} className="p-3 border rounded mb-2">
                    <div>
                      <strong>Details:</strong> {pkg.packageDetails}
                    </div>
                    <div>
                      <strong>Amount:</strong> {pkg.amount}
                    </div>
                    <div>
                      <strong>Weight:</strong> {pkg.weight} kg
                    </div>
                    <div>
                      <strong>Dimensions:</strong> {pkg.length}x{pkg.width}x
                      {pkg.height} cm
                    </div>
                    <div>
                      <strong>Vol Weight:</strong> {pkg.weightVol}
                    </div>
                    <div>
                      <strong>Declared Value:</strong> {pkg.DecValue}
                    </div>
                    <div>
                      <strong>Tariff Fee:</strong> {pkg.TariffFee}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Charges */}
            {initialData.priceKg && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Price/Kg</h3>
                <div className="py-1 font-bold">{initialData.priceKg}</div>
              </div>
            )}
            {initialData.Discount && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Discount</h3>
                <div className="py-1 font-bold">{initialData.Discount}</div>
              </div>
            )}
            {initialData.shippingInsurance && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping Insurance
                </h3>
                <div className="py-1 font-bold">
                  {initialData.shippingInsurance}
                </div>
              </div>
            )}
            {initialData.customDuties && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Custom Duties
                </h3>
                <div className="py-1 font-bold">{initialData.customDuties}</div>
              </div>
            )}
            {initialData.tax && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Tax</h3>
                <div className="py-1 font-bold">{initialData.tax}</div>
              </div>
            )}

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
