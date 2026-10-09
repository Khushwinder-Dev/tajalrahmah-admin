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

type TermsData = {
  picture: string | null;
  code: string;
  name: string;
  vatNumber: string;
  email: string;
  phone: string;
  website: string;
  aboutInformation: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  plan: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappUrl: string;

  companyDocumentTitle: string[];
  companyDocument: File[];

  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;

  agentProfilePicture: string | null;
  agentFirstName: string;
  agentLastName: string;
  agentEmail: string;
  agentPhone: string;
  hourlyRate: string;
  agentFacebookUrl: string;
  agentLinkedinUrl: string;
  agentSkypeUrl: string;
  defaultLanguage: string;
  emailSignature: string;
  direction: string;
  memberDepertment: { label: string; value: boolean }[];
  shiftReports: string;
  vehicle: string;
  welcomeEmail: boolean;
  password: string;

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
  picture: "https://via.placeholder.com/150",
  code: "CMP-001",
  name: "Best Electronics LTD",
  vatNumber: "123456789",
  email: "info@bestelectronics.com",
  phone: "+8801712345678",
  website: "https://www.bestelectronics.com",
  aboutInformation:
    "Best Electronics LTD is one of the leading electronics retailers in Bangladesh providing high quality products.",
  address: "House #12, Road #5, Dhanmondi",
  city: "Dhaka",
  state: "Dhaka",
  zipCode: "1209",
  country: "Bangladesh",
  plan: "Premium",
  facebookUrl: "https://facebook.com/bestelectronics",
  instagramUrl: "https://instagram.com/bestelectronics",
  whatsappUrl: "https://wa.me/8801712345678",
  companyDocumentTitle: ["Trade License", "VAT Certificate"],
  companyDocument: [],
  billingStreet: "House #15, Road #2, Gulshan",
  billingCity: "Dhaka",
  billingState: "Dhaka",
  billingZipCode: "1212",
  billingCountry: "Bangladesh",
  shippingStreet: "House #10, Road #7, Mirpur",
  shippingCity: "Dhaka",
  shippingState: "Dhaka",
  shippingZipCode: "1216",
  shippingCountry: "Bangladesh",

  agentProfilePicture: "https://via.placeholder.com/100",
  agentFirstName: "Saidul",
  agentLastName: "Basar",
  agentEmail: "saidul.basar@bestelectronics.com",
  agentPhone: "+8801812345678",
  hourlyRate: "500",
  agentFacebookUrl: "https://facebook.com/saidul.basar",
  agentLinkedinUrl: "https://linkedin.com/in/saidulbasar",
  agentSkypeUrl: "live:saidulbasar",
  defaultLanguage: "en",
  emailSignature: "Best Regards, Saidul Basar",
  direction: "LTR",
  memberDepertment: [
    { label: "IT Department", value: true },
    { label: "HR Department", value: false },
    { label: "Accounts Department", value: false },
  ],
  shiftReports: "Morning shift handled by IT Department.",
  vehicle: "Toyota Corolla",
  welcomeEmail: true,
  password: "dummyPassword123",

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
// const projectTypeOptions = [
//   "Dhaka",
//   "Chittagong",
//   "Khulna",
//   "Barisal",
//   "Rajshahi",
//   "Sylhet",
//   "Mymensingh",
//   "Rangpur",
// ];

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

export default function RealEstateAgentDetails() {
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
  const canCreate: boolean = usePermission("realestateAgent", "create");
  const canView: boolean = usePermission("realestateAgent", "view");
  const canEdit: boolean = usePermission("realestateAgent", "edit");
  const canDelete: boolean = usePermission("realestateAgent", "delete");
  const canExport: boolean = usePermission("realestateAgent", "export");
  const canPdf: boolean = usePermission("realestateAgent", "pdf");
  const canPrint: boolean = usePermission("realestateAgent", "print");
  const canSeeHistory: boolean = usePermission("realestateAgent", "history");

  // // Field-level permissions
  // const branch: boolean = usePermission("realestateAgent", "view", "branch");
  // const voucherNumber: boolean = usePermission(
  //   "realestateAgent",
  //   "view",
  //   "voucherNumber"
  // );

  // const category: boolean = usePermission("realestateAgent", "view", "category");

  // const subCategory: boolean = usePermission("realestateAgent", "view", "subCategory");

  // const expense: boolean = usePermission("realestateAgent", "view", "expense");

  // const date: boolean = usePermission("realestateAgent", "view", "date");
  // const amount: boolean = usePermission("realestateAgent", "view", "amount");
  // const currency: boolean = usePermission("realestateAgent", "view", "currency");
  // const paymentMode: boolean = usePermission("realestateAgent", "view", "paymentMode");
  // const vat: boolean = usePermission("realestateAgent", "view", "vat");
  // const supplier: boolean = usePermission("realestateAgent", "view", "supplier");
  // const approvedBy: boolean = usePermission("realestateAgent", "view", "approvedBy");
  // const purchaseInvoiceNumber: boolean = usePermission(
  //   "realestateAgent",
  //   "view",
  //   "purchaseInvoiceNumber"
  // );
  // const supplierVatNumber: boolean = usePermission(
  //   "realestateAgent",
  //   "view",
  //   "supplierVatNumber"
  // );
  // const expenseBy: boolean = usePermission("realestateAgent", "view", "expenseBy");
  // const expenseFor: boolean = usePermission("realestateAgent", "view", "expenseFor");
  // const note: boolean = usePermission("realestateAgent", "view", "note");

  const canViewIsDraft: boolean = usePermission(
    "realestateAgent",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "realestateAgent",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // // Get leaves data based on selected leave type
  // const getinitialData = (leaveType: string): TermsData => {
  //   const leavesMap: Record<string, TermsData> = {
  //     Dhaka: {
  //       branch: "Dhaka",
  //       voucherNumber: "VCH-1012",
  //       category: "Miscellaneous",
  //       subCategory: "Gifts",
  //       expense: "Client Gift",
  //       date: "2025-08-12",
  //       amount: "1800",
  //       currency: "BDT",
  //       paymentMode: "Cash",
  //       vat: "0%",
  //       supplier: "Gift World",
  //       approvedBy: "Nusrat Jahan",
  //       purchaseInvoiceNumber: "INV-5012",
  //       supplierVatNumber: "VAT-78912",
  //       expenseBy: "Sabbir Ahmed",
  //       expenseFor: "Client Relationship",
  //       note: "Gift for client relationship",

  //       isDefault: false,
  //       isActive: true,
  //       isDraft: false,
  //       createdAt: new Date("2024-01-15T10:30:00Z"),
  //       draftedAt: null,
  //       updatedAt: new Date("2024-01-20T14:45:00Z"),
  //       deletedAt: null,
  //       isDeleted: false,
  //     },
  //     Chittagong: {
  //       branch: "Chittagong",
  //       voucherNumber: "VCH-1012",
  //       category: "Miscellaneous",
  //       subCategory: "Gifts",
  //       expense: "Client Gift",
  //       date: "2025-08-12",
  //       amount: "1800",
  //       currency: "BDT",
  //       paymentMode: "Cash",
  //       vat: "0%",
  //       supplier: "Gift World",
  //       approvedBy: "Nusrat Jahan",
  //       purchaseInvoiceNumber: "INV-5012",
  //       supplierVatNumber: "VAT-78912",
  //       expenseBy: "Sabbir Ahmed",
  //       expenseFor: "Client Relationship",
  //       note: "Gift for client relationship",

  //       isDefault: true,
  //       isActive: true,
  //       isDraft: false,
  //       createdAt: new Date("2024-01-16T09:15:00Z"),
  //       draftedAt: null,
  //       updatedAt: new Date("2024-01-21T11:30:00Z"),
  //       deletedAt: null,
  //       isDeleted: false,
  //     },
  //     Khulna: {
  //       branch: "Khulna",
  //       voucherNumber: "VCH-1012",
  //       category: "Something Else",
  //       subCategory: "Gifts",
  //       expense: "Client Gift",
  //       date: "2025-08-12",
  //       amount: "1800",
  //       currency: "BDT",
  //       paymentMode: "Cash",
  //       vat: "0%",
  //       supplier: "Gift World",
  //       approvedBy: "Nusrat Jahan",
  //       purchaseInvoiceNumber: "INV-5012",
  //       supplierVatNumber: "VAT-78912",
  //       expenseBy: "Sabbir Ahmed",
  //       expenseFor: "Client Relationship",
  //       note: "Gift for client relationship",

  //       isDefault: false,
  //       isActive: false,
  //       isDraft: false,
  //       createdAt: new Date("2024-01-17T16:20:00Z"),
  //       draftedAt: null,
  //       updatedAt: new Date("2024-01-22T13:45:00Z"),
  //       deletedAt: null,
  //       isDeleted: false,
  //     },
  //   };

  //   return leavesMap[leaveType] || initialData;
  // };

  // const [initialData, setinitialData] = useState<TermsData>(
  //   getinitialData(selectedLeaveType)
  // );

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

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <PageLayout
        title={t("button.viewingRealestateAgent")}
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/realestate-agent")}
        listText="List"
        listPath="realestate-agent"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/realestate-agent/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/realestate-agent/edit/1"),
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
            {/* Company Info */}

            {initialData.code && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Company Code</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.code)}
                </div>
              </div>
            )}

            {initialData.name && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Company Name</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.name)}
                </div>
              </div>
            )}

            {initialData.vatNumber && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">VAT Number</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.vatNumber)}
                </div>
              </div>
            )}

            {initialData.email && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.email)}
                </div>
              </div>
            )}

            {initialData.phone && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Phone</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.phone)}
                </div>
              </div>
            )}

            {initialData.website && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.website)}
                </div>
              </div>
            )}

            {initialData.aboutInformation && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">About</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.aboutInformation)}
                </div>
              </div>
            )}

            {/* Address */}
            {initialData.address && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Address</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.address)},{" "}
                  {displayValue(initialData.city)},{" "}
                  {displayValue(initialData.state)} -{" "}
                  {displayValue(initialData.zipCode)},{" "}
                  {displayValue(initialData.country)}
                </div>
              </div>
            )}

            {/* Plan & Social */}
            {initialData.plan && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Plan</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.plan)}
                </div>
              </div>
            )}

            {initialData.facebookUrl && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Facebook</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.facebookUrl)}
                </div>
              </div>
            )}

            {initialData.instagramUrl && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Instagram</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.instagramUrl)}
                </div>
              </div>
            )}

            {initialData.whatsappUrl && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">WhatsApp</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.whatsappUrl)}
                </div>
              </div>
            )}

            {/* Billing Info */}
            {initialData.billingStreet && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Billing Address
                </h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.billingStreet)},{" "}
                  {displayValue(initialData.billingCity)},{" "}
                  {displayValue(initialData.billingState)} -{" "}
                  {displayValue(initialData.billingZipCode)},{" "}
                  {displayValue(initialData.billingCountry)}
                </div>
              </div>
            )}

            {/* Shipping Info */}
            {initialData.shippingStreet && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipping Address
                </h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.shippingStreet)},{" "}
                  {displayValue(initialData.shippingCity)},{" "}
                  {displayValue(initialData.shippingState)} -{" "}
                  {displayValue(initialData.shippingZipCode)},{" "}
                  {displayValue(initialData.shippingCountry)}
                </div>
              </div>
            )}

            {/* Agent Info */}
            {initialData.agentProfilePicture && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Agent</h3>
                <img
                  src={initialData.agentProfilePicture}
                  alt="Agent"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <div className="py-1 font-bold">
                  {displayValue(initialData.agentFirstName)}{" "}
                  {displayValue(initialData.agentLastName)}
                </div>
                <div className="py-1">
                  {displayValue(initialData.agentEmail)}
                </div>
                <div className="py-1">
                  {displayValue(initialData.agentPhone)}
                </div>
              </div>
            )}

            {initialData.hourlyRate && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Hourly Rate</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.hourlyRate)} BDT
                </div>
              </div>
            )}

            {/* Agent Social */}
            {initialData.agentFacebookUrl && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Agent Facebook
                </h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.agentFacebookUrl)}
                </div>
              </div>
            )}

            {initialData.agentLinkedinUrl && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Agent LinkedIn
                </h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.agentLinkedinUrl)}
                </div>
              </div>
            )}

            {initialData.agentSkypeUrl && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Agent Skype</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.agentSkypeUrl)}
                </div>
              </div>
            )}

            {/* Extra Info */}
            {initialData.defaultLanguage && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Language</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.defaultLanguage)}
                </div>
              </div>
            )}

            {initialData.emailSignature && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Email Signature
                </h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.emailSignature)}
                </div>
              </div>
            )}

            {initialData.direction && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Direction</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.direction)}
                </div>
              </div>
            )}

            {initialData.memberDepertment && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Departments</h3>
                <div className="py-1 font-bold">
                  {initialData.memberDepertment
                    .filter((d) => d.value)
                    .map((d) => d.label)
                    .join(", ")}
                </div>
              </div>
            )}

            {initialData.shiftReports && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Shift Reports
                </h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.shiftReports)}
                </div>
              </div>
            )}

            {initialData.vehicle && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Vehicle</h3>
                <div className="py-1 font-bold">
                  {displayValue(initialData.vehicle)}
                </div>
              </div>
            )}

            {initialData.welcomeEmail !== undefined && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">
                  Welcome Email
                </h3>
                <div className="py-1 font-bold">
                  {initialData.welcomeEmail ? "Enabled" : "Disabled"}
                </div>
              </div>
            )}

            {initialData.password && (
              <div>
                <h3 className="font-normal mb-1 text-gray-600">Password</h3>
                <div className="py-1 font-bold">••••••••</div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {initialData.isDraft ? (
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
                  {initialData.isDeleted ? (
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
