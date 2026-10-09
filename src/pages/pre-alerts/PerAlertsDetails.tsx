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

type PreAlertsData = {
  tracking: string;
  date: string;
  customer: string;
  shippingCompany: string;
  supplier: string;
  packageDescription: string;
  deliveryDate: string;
  purchasePrice: number;
  status: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: PreAlertsData = {
  tracking: "TRK-2024-001",
  date: "2024-01-15",
  customer: "Tech Solutions Inc",
  shippingCompany: "FedEx Express",
  supplier: "Microsoft Store",
  packageDescription: "Microsoft Office 365 License Keys",
  deliveryDate: "2024-01-20",
  purchasePrice: 2500.0,
  status: "In Transit",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Pre-alert options for autocomplete
const preAlertOptions = [
  "TRK-2024-001 - Microsoft Office 365 - Tech Solutions Inc",
  "TRK-2024-002 - Adobe Creative Suite - Creative Design Studio",
  "TRK-2024-003 - AutoCAD Professional - Engineering Corp",
  "TRK-2024-004 - QuickBooks Enterprise - Finance Corp",
  "TRK-2024-005 - VMware Workstation Pro - IT Solutions",
  "TRK-2024-006 - Salesforce CRM - Sales Force",
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

export default function PreAlertsDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPreAlert, setSelectedPreAlert] = useState(
    "TRK-2024-001 - Microsoft Office 365 - Tech Solutions Inc"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("preAlerts", "create");
  const canView: boolean = usePermission("preAlerts", "view");
  const canEdit: boolean = usePermission("preAlerts", "edit");
  const canDelete: boolean = usePermission("preAlerts", "delete");
  const canExport: boolean = usePermission("preAlerts", "export");
  const canPdf: boolean = usePermission("preAlerts", "pdf");
  const canPrint: boolean = usePermission("preAlerts", "pdf");
  const canSeeHistory: boolean = usePermission("preAlerts", "history");

  // Field-level permissions
  const canViewTracking: boolean = usePermission(
    "preAlerts",
    "view",
    "tracking"
  );
  const canViewDate: boolean = usePermission("preAlerts", "view", "date");
  const canViewCustomer: boolean = usePermission(
    "preAlerts",
    "view",
    "customer"
  );
  const canViewShippingCompany: boolean = usePermission(
    "preAlerts",
    "view",
    "shippingCompany"
  );
  const canViewSupplier: boolean = usePermission(
    "preAlerts",
    "view",
    "supplier"
  );
  const canViewPackageDescription: boolean = usePermission(
    "preAlerts",
    "view",
    "packageDescription"
  );
  const canViewDeliveryDate: boolean = usePermission(
    "preAlerts",
    "view",
    "deliveryDate"
  );
  const canViewPurchasePrice: boolean = usePermission(
    "preAlerts",
    "view",
    "purchasePrice"
  );
  const canViewStatus: boolean = usePermission("preAlerts", "view", "status");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get pre-alert data based on selected pre-alert
  const getPreAlertData = (preAlertName: string): PreAlertsData => {
    const preAlertMap: Record<string, PreAlertsData> = {
      "TRK-2024-001 - Microsoft Office 365 - Tech Solutions Inc": {
        tracking: "TRK-2024-001",
        date: "2024-01-15",
        customer: "Tech Solutions Inc",
        shippingCompany: "FedEx Express",
        supplier: "Microsoft Store",
        packageDescription: "Microsoft Office 365 License Keys",
        deliveryDate: "2024-01-20",
        purchasePrice: 2500.0,
        status: "In Transit",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "TRK-2024-002 - Adobe Creative Suite - Creative Design Studio": {
        tracking: "TRK-2024-001",
        date: "2024-01-16",
        customer: "Creative Design Studio",
        shippingCompany: "UPS Ground",
        supplier: "Adobe Store",
        packageDescription: "Adobe Creative Suite Licenses",
        deliveryDate: "2024-01-22",
        purchasePrice: 1800.0,
        status: "Delivered",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-22T11:30:00Z"),
        isDeleted: false,
      },
      "TRK-2024-003 - AutoCAD Professional - Engineering Corp": {
        tracking: "TRK-2024-003",
        date: "2024-01-17",
        customer: "Engineering Corp",
        shippingCompany: "DHL Express",
        supplier: "Autodesk Store",
        packageDescription: "AutoCAD Professional Licenses",
        deliveryDate: "2024-01-25",
        purchasePrice: 3200.0,
        status: "In Transit",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-25T13:45:00Z"),
        isDeleted: false,
      },
      "TRK-2024-004 - QuickBooks Enterprise - Finance Corp": {
        tracking: "TRK-2024-004",
        date: "2024-01-18",
        customer: "Finance Corp",
        shippingCompany: "USPS Priority",
        supplier: "Intuit Store",
        packageDescription: "QuickBooks Enterprise Licenses",
        deliveryDate: "2024-01-23",
        purchasePrice: 1500.0,
        status: "Delivered",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-23T10:00:00Z"),
        isDeleted: false,
      },
      "TRK-2024-005 - VMware Workstation Pro - IT Solutions": {
        tracking: "TRK-2024-005",
        date: "2024-01-19",
        customer: "IT Solutions",
        shippingCompany: "FedEx Ground",
        supplier: "VMware Store",
        packageDescription: "VMware Workstation Pro Licenses",
        deliveryDate: "2024-01-26",
        purchasePrice: 1200.0,
        status: "Pending",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-26T10:00:00Z"),
        isDeleted: false,
      },
      "TRK-2024-006 - Salesforce CRM - Sales Force": {
        tracking: "TRK-2024-006",
        date: "2024-01-20",
        customer: "Sales Force",
        shippingCompany: "UPS Express",
        supplier: "Salesforce Store",
        packageDescription: "Salesforce CRM Licenses",
        deliveryDate: "2024-01-27",
        purchasePrice: 3000.0,
        status: "In Transit",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-27T16:40:00Z"),
        isDeleted: false,
      },
    };

    return preAlertMap[preAlertName] || initialData;
  };

  const [preAlertData, setPreAlertData] = useState<PreAlertsData>(
    getPreAlertData(selectedPreAlert)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update pre-alert data when selection changes
  useEffect(() => {
    setPreAlertData(getPreAlertData(selectedPreAlert));
  }, [selectedPreAlert]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintPreAlert = (preAlertData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Pre-Alert Details",
        data: [preAlertData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          tracking: "Tracking",
          date: "Date",
          customer: "Customer",
          shippingCompany: "Shipping Company",
          supplier: "Supplier",
          packageDescription: "Package Description",
          deliveryDate: "Delivery Date",
          purchasePrice: "Purchase Price",
          status: "Status",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("preAlertData on pdf click", preAlertData);
      const blob = await pdf(
        <GenericPDF
          data={[preAlertData]}
          title="Pre-Alert Details"
          subtitle="Pre-Alert Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pre-alert-details.pdf";
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
        title="Viewing Pre-Alert Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/pre-alerts")}
        listText="List"
        listPath="pre-alerts"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/pre-alerts/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/pre-alerts/edit/1"),
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
                  handlePrintPreAlert(preAlertData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Tracking, Date, Customer, Shipping Company */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewTracking && (
              <div className="mt-1">
                <Autocomplete
                  options={preAlertOptions}
                  value={selectedPreAlert}
                  onValueChange={setSelectedPreAlert}
                  placeholder=" "
                  displayKey="preAlert"
                  valueKey="preAlert"
                  searchKey="preAlert"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Pre-Alert"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.date)}
                </div>
              </div>
            )}

            {canViewCustomer && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Customer</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.customer)}
                </div>
              </div>
            )}

            {canViewShippingCompany && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping Company
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.shippingCompany)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Supplier, Package Description, Delivery Date, Purchase Price */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewSupplier && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Supplier</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.supplier)}
                </div>
              </div>
            )}

            {canViewPackageDescription && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Package Description
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.packageDescription)}
                </div>
              </div>
            )}

            {canViewDeliveryDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Delivery Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.deliveryDate)}
                </div>
              </div>
            )}

            {canViewPurchasePrice && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Price
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.purchasePrice)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(preAlertData.status)}
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
          created: getRelativeTime(preAlertData.createdAt),
          updated: getRelativeTime(preAlertData.updatedAt),
          drafted: getRelativeTime(preAlertData.createdAt), // Assuming draftedAt is not used in this context
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
