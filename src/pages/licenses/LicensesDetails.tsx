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

type LicensesData = {
  sn: string;
  softwareName: string;
  category: string;
  productKey: string;
  seats: number;
  manufacturer: string;
  licensedName: string;
  licensedEmail: string;
  supplier: string;
  orderNumber: string;
  purchaseOrderNumber: string;
  purchaseCost: number;
  purchaseDate: string;
  expirationDate: string;
  terminationDate: string | null;
  depreciation: string;
  notes: string;
  status: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: LicensesData = {
  sn: "001",
  softwareName: "Microsoft Office 365",
  category: "Productivity",
  productKey: "XXXX-XXXX-XXXX-XXXX",
  seats: 50,
  manufacturer: "Microsoft Corporation",
  licensedName: "Tech Solutions Inc",
  licensedEmail: "admin@techsolutions.com",
  supplier: "Microsoft Store",
  orderNumber: "ORD-2024-001",
  purchaseOrderNumber: "PO-2024-001",
  purchaseCost: 2500.0,
  purchaseDate: "2024-01-15",
  expirationDate: "2025-01-15",
  terminationDate: null,
  depreciation: "25%",
  notes: "Annual subscription for office productivity suite",
  status: "Active",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// License options for autocomplete
const licenseOptions = [
  "001 - Microsoft Office 365 - Tech Solutions Inc",
  "002 - Adobe Creative Suite - Creative Design Studio",
  "003 - AutoCAD Professional - Engineering Corp",
  "004 - QuickBooks Enterprise - Finance Corp",
  "005 - VMware Workstation Pro - IT Solutions",
  "006 - Salesforce CRM - Sales Force",
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

export default function LicensesDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(
    "001 - Microsoft Office 365 - Tech Solutions Inc"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("licenses", "create");
  const canView: boolean = usePermission("licenses", "view");
  const canEdit: boolean = usePermission("licenses", "edit");
  const canDelete: boolean = usePermission("licenses", "delete");
  const canExport: boolean = usePermission("licenses", "export");
  const canPdf: boolean = usePermission("licenses", "pdf");
  const canPrint: boolean = usePermission("licenses", "pdf");
  const canSeeHistory: boolean = usePermission("licenses", "history");

  // Field-level permissions
  const canViewSn: boolean = usePermission("licenses", "view", "sn");
  const canViewSoftwareName: boolean = usePermission(
    "licenses",
    "view",
    "softwareName"
  );
  const canViewCategory: boolean = usePermission(
    "licenses",
    "view",
    "category"
  );
  const canViewProductKey: boolean = usePermission(
    "licenses",
    "view",
    "productKey"
  );
  const canViewSeats: boolean = usePermission("licenses", "view", "seats");
  const canViewManufacturer: boolean = usePermission(
    "licenses",
    "view",
    "manufacturer"
  );
  const canViewLicensedName: boolean = usePermission(
    "licenses",
    "view",
    "licensedName"
  );
  const canViewLicensedEmail: boolean = usePermission(
    "licenses",
    "view",
    "licensedEmail"
  );
  const canViewSupplier: boolean = usePermission(
    "licenses",
    "view",
    "supplier"
  );
  const canViewOrderNumber: boolean = usePermission(
    "licenses",
    "view",
    "orderNumber"
  );
  const canViewPurchaseOrderNumber: boolean = usePermission(
    "licenses",
    "view",
    "purchaseOrderNumber"
  );
  const canViewPurchaseCost: boolean = usePermission(
    "licenses",
    "view",
    "purchaseCost"
  );
  const canViewPurchaseDate: boolean = usePermission(
    "licenses",
    "view",
    "purchaseDate"
  );
  const canViewExpirationDate: boolean = usePermission(
    "licenses",
    "view",
    "expirationDate"
  );
  const canViewTerminationDate: boolean = usePermission(
    "licenses",
    "view",
    "terminationDate"
  );
  const canViewDepreciation: boolean = usePermission(
    "licenses",
    "view",
    "depreciation"
  );
  const canViewNotes: boolean = usePermission("licenses", "view", "notes");
  const canViewStatus: boolean = usePermission("licenses", "view", "status");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get license data based on selected license
  const getLicenseData = (licenseName: string): LicensesData => {
    const licenseMap: Record<string, LicensesData> = {
      "001 - Microsoft Office 365 - Tech Solutions Inc": {
        sn: "001",
        softwareName: "Microsoft Office 365",
        category: "Productivity",
        productKey: "XXXX-XXXX-XXXX-XXXX",
        seats: 50,
        manufacturer: "Microsoft Corporation",
        licensedName: "Tech Solutions Inc",
        licensedEmail: "admin@techsolutions.com",
        supplier: "Microsoft Store",
        orderNumber: "ORD-2024-001",
        purchaseOrderNumber: "PO-2024-001",
        purchaseCost: 2500.0,
        purchaseDate: "2024-01-15",
        expirationDate: "2025-01-15",
        terminationDate: null,
        depreciation: "25%",
        notes: "Annual subscription for office productivity suite",
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "002 - Adobe Creative Suite - Creative Design Studio": {
        sn: "002",
        softwareName: "Adobe Creative Suite",
        category: "Design",
        productKey: "YYYY-YYYY-YYYY-YYYY",
        seats: 25,
        manufacturer: "Adobe Inc",
        licensedName: "Creative Design Studio",
        licensedEmail: "licenses@creativedesign.com",
        supplier: "Adobe Store",
        orderNumber: "ORD-2024-002",
        purchaseOrderNumber: "PO-2024-002",
        purchaseCost: 1800.0,
        purchaseDate: "2024-01-16",
        expirationDate: "2025-01-16",
        terminationDate: null,
        depreciation: "20%",
        notes: "Creative design software for design team",
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
      },
      "003 - AutoCAD Professional - Engineering Corp": {
        sn: "003",
        softwareName: "AutoCAD Professional",
        category: "Engineering",
        productKey: "ZZZZ-ZZZZ-ZZZZ-ZZZZ",
        seats: 15,
        manufacturer: "Autodesk Inc",
        licensedName: "Engineering Corp",
        licensedEmail: "licenses@engineeringcorp.com",
        supplier: "Autodesk Store",
        orderNumber: "ORD-2024-003",
        purchaseOrderNumber: "PO-2024-003",
        purchaseCost: 3200.0,
        purchaseDate: "2024-01-17",
        expirationDate: "2025-01-17",
        terminationDate: null,
        depreciation: "30%",
        notes: "CAD software for engineering team",
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
      },
      "004 - QuickBooks Enterprise - Finance Corp": {
        sn: "004",
        softwareName: "QuickBooks Enterprise",
        category: "Accounting",
        productKey: "AAAA-AAAA-AAAA-AAAA",
        seats: 10,
        manufacturer: "Intuit Inc",
        licensedName: "Finance Corp",
        licensedEmail: "licenses@financecorp.com",
        supplier: "Intuit Store",
        orderNumber: "ORD-2024-004",
        purchaseOrderNumber: "PO-2024-004",
        purchaseCost: 1500.0,
        purchaseDate: "2024-01-18",
        expirationDate: "2025-01-18",
        terminationDate: null,
        depreciation: "15%",
        notes: "Accounting software for finance team",
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "005 - VMware Workstation Pro - IT Solutions": {
        sn: "005",
        softwareName: "VMware Workstation Pro",
        category: "Virtualization",
        productKey: "BBBB-BBBB-BBBB-BBBB",
        seats: 20,
        manufacturer: "VMware Inc",
        licensedName: "IT Solutions",
        licensedEmail: "licenses@itsolutions.com",
        supplier: "VMware Store",
        orderNumber: "ORD-2024-005",
        purchaseOrderNumber: "PO-2024-005",
        purchaseCost: 1200.0,
        purchaseDate: "2024-01-19",
        expirationDate: "2025-01-19",
        terminationDate: null,
        depreciation: "18%",
        notes: "Virtualization software for development team",
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "006 - Salesforce CRM - Sales Force": {
        sn: "006",
        softwareName: "Salesforce CRM",
        category: "CRM",
        productKey: "CCCC-CCCC-CCCC-CCCC",
        seats: 30,
        manufacturer: "Salesforce Inc",
        licensedName: "Sales Force",
        licensedEmail: "licenses@salesforce.com",
        supplier: "Salesforce Store",
        orderNumber: "ORD-2024-006",
        purchaseOrderNumber: "PO-2024-006",
        purchaseCost: 3000.0,
        purchaseDate: "2024-01-20",
        expirationDate: "2025-01-20",
        terminationDate: null,
        depreciation: "22%",
        notes: "CRM software for sales team",
        status: "Active",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
      },
    };

    return licenseMap[licenseName] || initialData;
  };

  const [licenseData, setLicenseData] = useState<LicensesData>(
    getLicenseData(selectedLicense)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update license data when selection changes
  useEffect(() => {
    setLicenseData(getLicenseData(selectedLicense));
  }, [selectedLicense]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintLicense = (licenseData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "License Details",
        data: [licenseData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          softwareName: "Software Name",
          category: "Category",
          productKey: "Product Key",
          seats: "Seats",
          manufacturer: "Manufacturer",
          licensedName: "Licensed Name",
          licensedEmail: "Licensed Email",
          supplier: "Supplier",
          orderNumber: "Order Number",
          purchaseOrderNumber: "Purchase Order Number",
          purchaseCost: "Purchase Cost",
          purchaseDate: "Purchase Date",
          expirationDate: "Expiration Date",
          terminationDate: "Termination Date",
          depreciation: "Depreciation",
          notes: "Notes",
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
      console.log("licenseData on pdf click", licenseData);
      const blob = await pdf(
        <GenericPDF
          data={[licenseData]}
          title="License Details"
          subtitle="License Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "license-details.pdf";
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
        title="Viewing License Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/licenses")}
        listText="List"
        listPath="licenses"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/licenses/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/licenses/edit/1"),
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
                  handlePrintLicense(licenseData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: SN, Software Name, Category, Product Key */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSn && (
              <div className="mt-1">
                <Autocomplete
                  options={licenseOptions}
                  value={selectedLicense}
                  onValueChange={setSelectedLicense}
                  placeholder=" "
                  displayKey="license"
                  valueKey="license"
                  searchKey="license"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select License"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewSoftwareName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Software Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.softwareName)}
                </div>
              </div>
            )}

            {canViewCategory && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Category</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.category)}
                </div>
              </div>
            )}

            {canViewProductKey && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Product Key</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.productKey)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Seats, Manufacturer, Licensed Name, Licensed Email */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewSeats && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Seats</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.seats)}
                </div>
              </div>
            )}

            {canViewManufacturer && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Manufacturer</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.manufacturer)}
                </div>
              </div>
            )}

            {canViewLicensedName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Licensed Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.licensedName)}
                </div>
              </div>
            )}

            {canViewLicensedEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Licensed Email
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.licensedEmail)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Supplier, Status, Purchase Cost, Purchase Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewSupplier && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Supplier</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.supplier)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.status)}
                </div>
              </div>
            )}

            {canViewPurchaseCost && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Cost
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.purchaseCost)}
                </div>
              </div>
            )}

            {canViewPurchaseDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.purchaseDate)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Expiration Date, Depreciation, Notes, Order Number */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewExpirationDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Expiration Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.expirationDate)}
                </div>
              </div>
            )}

            {canViewDepreciation && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Depreciation</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.depreciation)}
                </div>
              </div>
            )}

            {canViewNotes && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Notes</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.notes)}
                </div>
              </div>
            )}

            {canViewOrderNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Order Number</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.orderNumber)}
                </div>
              </div>
            )}
          </div>

          {/* Row 5: Purchase Order Number, Termination Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewPurchaseOrderNumber && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Purchase Order Number
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.purchaseOrderNumber)}
                </div>
              </div>
            )}

            {canViewTerminationDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Termination Date
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(licenseData.terminationDate)}
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
          created: getRelativeTime(licenseData.createdAt),
          updated: getRelativeTime(licenseData.updatedAt),
          drafted: getRelativeTime(licenseData.createdAt), // Assuming draftedAt is not used in this context
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
