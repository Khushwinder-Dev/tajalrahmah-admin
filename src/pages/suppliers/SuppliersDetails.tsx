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

type SupplierData = {
  sn: string;
  country: string;
  supplierName: string;
  paymentTerms: string;
  dueDays: number;
  typeOfDeposit: string;
  paymentType: string;
  depositAmount: number;
  currency: string;
  exchangeRate: number;
  localAmt: number;
  contactPerson: string;
  mobileNo: string;
  email: string;
  website: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: SupplierData = {
  sn: "001",
  country: "Saudi Arabia",
  supplierName: "Global Suppliers Ltd",
  paymentTerms: "Net 30",
  dueDays: 30,
  typeOfDeposit: "Bank Guarantee",
  paymentType: "Wire Transfer",
  depositAmount: 5000,
  currency: "USD",
  exchangeRate: 3.75,
  localAmt: 18750,
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966-50-123-4567",
  email: "ahmed@globalsuppliers.com",
  website: "www.globalsuppliers.com",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Supplier options for autocomplete
const supplierOptions = [
  "001 - Global Suppliers Ltd",
  "002 - Middle East Trading Co",
  "003 - Gulf Suppliers International",
  "004 - Qatar Trading Partners",
  "005 - Bahrain Import Export",
  "006 - Oman Trading Solutions",
];

// Country options for autocomplete
const countryOptions = [
  "Saudi Arabia",
  "UAE",
  "Kuwait",
  "Bahrain",
  "Qatar",
  "Oman",
  "Jordan",
  "Lebanon",
  "Egypt",
  "Iraq",
  "Turkey",
  "Greece",
  "India",
  "Pakistan",
  "Bangladesh",
  "Sri Lanka",
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "Philippines",
  "China",
  "Japan",
  "South Korea",
  "Australia",
  "New Zealand",
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
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

export default function SupplierDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(
    "001 - Global Suppliers Ltd"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("supplier", "create");
  const canView: boolean = usePermission("supplier", "view");
  const canEdit: boolean = usePermission("supplier", "edit");
  const canDelete: boolean = usePermission("supplier", "delete");
  const canExport: boolean = usePermission("supplier", "export");
  const canPdf: boolean = usePermission("supplier", "pdf");
  const canPrint: boolean = usePermission("supplier", "print");
  const canSeeHistory: boolean = usePermission("supplier", "history");

  // Field-level permissions
  const canViewSn: boolean = usePermission("supplier", "view", "sn");
  const canViewCountry: boolean = usePermission("supplier", "view", "country");
  const canViewSupplierName: boolean = usePermission(
    "supplier",
    "view",
    "supplierName"
  );
  const canViewPaymentTerms: boolean = usePermission(
    "supplier",
    "view",
    "paymentTerms"
  );
  const canViewDueDays: boolean = usePermission("supplier", "view", "dueDays");
  const canViewTypeOfDeposit: boolean = usePermission(
    "supplier",
    "view",
    "typeOfDeposit"
  );
  const canViewPaymentType: boolean = usePermission(
    "supplier",
    "view",
    "paymentType"
  );
  const canViewDepositAmount: boolean = usePermission(
    "supplier",
    "view",
    "depositAmount"
  );
  const canViewCurrency: boolean = usePermission(
    "supplier",
    "view",
    "currency"
  );
  const canViewExchangeRate: boolean = usePermission(
    "supplier",
    "view",
    "exchangeRate"
  );
  const canViewLocalAmt: boolean = usePermission(
    "supplier",
    "view",
    "localAmt"
  );
  const canViewContactPerson: boolean = usePermission(
    "supplier",
    "view",
    "contactPerson"
  );
  const canViewMobileNo: boolean = usePermission(
    "supplier",
    "view",
    "mobileNo"
  );
  const canViewEmail: boolean = usePermission("supplier", "view", "email");
  const canViewWebsite: boolean = usePermission("supplier", "view", "website");
  const canViewIsDefault: boolean = usePermission(
    "supplier",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "supplier",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission("supplier", "view", "isDraft");
  const canViewIsDeleted: boolean = usePermission(
    "supplier",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get supplier data based on selected supplier
  // Get country-specific data (currency, exchange rate)
  const getCountryData = (country: string) => {
    const countryDataMap: Record<
      string,
      { currency: string; exchangeRate: number }
    > = {
      "Saudi Arabia": { currency: "SAR", exchangeRate: 1.0 },
      UAE: { currency: "AED", exchangeRate: 0.98 },
      Kuwait: { currency: "KWD", exchangeRate: 12.25 },
      Bahrain: { currency: "BHD", exchangeRate: 9.95 },
      Qatar: { currency: "QAR", exchangeRate: 1.03 },
      Oman: { currency: "OMR", exchangeRate: 9.75 },
      Jordan: { currency: "JOD", exchangeRate: 5.28 },
      Lebanon: { currency: "LBP", exchangeRate: 0.00066 },
      Egypt: { currency: "EGP", exchangeRate: 0.12 },
      Iraq: { currency: "IQD", exchangeRate: 0.00076 },
      Turkey: { currency: "TRY", exchangeRate: 0.12 },
      Greece: { currency: "EUR", exchangeRate: 3.67 },
      India: { currency: "INR", exchangeRate: 0.044 },
      Pakistan: { currency: "PKR", exchangeRate: 0.013 },
      Bangladesh: { currency: "BDT", exchangeRate: 0.034 },
      "Sri Lanka": { currency: "LKR", exchangeRate: 0.012 },
      Malaysia: { currency: "MYR", exchangeRate: 0.79 },
      Singapore: { currency: "SGD", exchangeRate: 2.75 },
      Indonesia: { currency: "IDR", exchangeRate: 0.00024 },
      Thailand: { currency: "THB", exchangeRate: 0.1 },
      Vietnam: { currency: "VND", exchangeRate: 0.00015 },
      Philippines: { currency: "PHP", exchangeRate: 0.067 },
      China: { currency: "CNY", exchangeRate: 0.51 },
      Japan: { currency: "JPY", exchangeRate: 0.025 },
      "South Korea": { currency: "KRW", exchangeRate: 0.0028 },
      Australia: { currency: "AUD", exchangeRate: 2.45 },
      "New Zealand": { currency: "NZD", exchangeRate: 2.25 },
      "United States": { currency: "USD", exchangeRate: 3.75 },
      Canada: { currency: "CAD", exchangeRate: 2.75 },
      "United Kingdom": { currency: "GBP", exchangeRate: 4.8 },
      Germany: { currency: "EUR", exchangeRate: 3.67 },
      France: { currency: "EUR", exchangeRate: 3.67 },
      Italy: { currency: "EUR", exchangeRate: 3.67 },
      Spain: { currency: "EUR", exchangeRate: 3.67 },
      Netherlands: { currency: "EUR", exchangeRate: 3.67 },
      Belgium: { currency: "EUR", exchangeRate: 3.67 },
      Switzerland: { currency: "CHF", exchangeRate: 4.25 },
      Austria: { currency: "EUR", exchangeRate: 3.67 },
      Sweden: { currency: "SEK", exchangeRate: 0.35 },
      Norway: { currency: "NOK", exchangeRate: 0.35 },
      Denmark: { currency: "DKK", exchangeRate: 0.54 },
      Finland: { currency: "EUR", exchangeRate: 3.67 },
    };

    return countryDataMap[country] || { currency: "SAR", exchangeRate: 1.0 };
  };

  const getSupplierData = (supplierName: string): SupplierData => {
    const supplierMap: Record<string, SupplierData> = {
      "001 - Global Suppliers Ltd": {
        sn: "001",
        country: "Saudi Arabia",
        supplierName: "Global Suppliers Ltd",
        paymentTerms: "Net 30",
        dueDays: 30,
        typeOfDeposit: "Bank Guarantee",
        paymentType: "Wire Transfer",
        depositAmount: 5000,
        currency: "USD",
        exchangeRate: 3.75,
        localAmt: 18750,
        contactPerson: "Ahmed Al-Rashid",
        mobileNo: "+966-50-123-4567",
        email: "ahmed@globalsuppliers.com",
        website: "www.globalsuppliers.com",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "002 - Middle East Trading Co": {
        sn: "002",
        country: "UAE",
        supplierName: "Middle East Trading Co",
        paymentTerms: "Net 45",
        dueDays: 45,
        typeOfDeposit: "Letter of Credit",
        paymentType: "Bank Transfer",
        depositAmount: 7500,
        currency: "EUR",
        exchangeRate: 4.1,
        localAmt: 30750,
        contactPerson: "Fatima Al-Zahrani",
        mobileNo: "+971-50-987-6543",
        email: "fatima@metc.com",
        website: "www.metc.com",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "003 - Gulf Suppliers International": {
        sn: "003",
        country: "Kuwait",
        supplierName: "Gulf Suppliers International",
        paymentTerms: "Net 60",
        dueDays: 60,
        typeOfDeposit: "Security Bond",
        paymentType: "Credit Card",
        depositAmount: 3000,
        currency: "GBP",
        exchangeRate: 4.8,
        localAmt: 14400,
        contactPerson: "Khalid Al-Sayed",
        mobileNo: "+965-50-456-7890",
        email: "khalid@gsi.com",
        website: "www.gsi.com",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "004 - Qatar Trading Partners": {
        sn: "004",
        country: "Qatar",
        supplierName: "Qatar Trading Partners",
        paymentTerms: "Net 90",
        dueDays: 90,
        typeOfDeposit: "Performance Bond",
        paymentType: "Check",
        depositAmount: 10000,
        currency: "SAR",
        exchangeRate: 1.0,
        localAmt: 10000,
        contactPerson: "Mariam Al-Mansouri",
        mobileNo: "+974-50-321-0987",
        email: "mariam@qtp.com",
        website: "www.qtp.com",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "005 - Bahrain Import Export": {
        sn: "005",
        country: "Bahrain",
        supplierName: "Bahrain Import Export",
        paymentTerms: "Net 15",
        dueDays: 15,
        typeOfDeposit: "Advance Payment",
        paymentType: "Cash",
        depositAmount: 2000,
        currency: "BHD",
        exchangeRate: 9.95,
        localAmt: 19900,
        contactPerson: "Hassan Al-Qahtani",
        mobileNo: "+973-50-654-3210",
        email: "hassan@bie.com",
        website: "www.bie.com",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "006 - Oman Trading Solutions": {
        sn: "006",
        country: "Oman",
        supplierName: "Oman Trading Solutions",
        paymentTerms: "Net 120",
        dueDays: 120,
        typeOfDeposit: "No Deposit Required",
        paymentType: "Digital Payment",
        depositAmount: 0,
        currency: "OMR",
        exchangeRate: 9.75,
        localAmt: 0,
        contactPerson: "Salim Al-Otaibi",
        mobileNo: "+968-50-789-0123",
        email: "salim@ots.com",
        website: "www.ots.com",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
    };

    return supplierMap[supplierName] || initialData;
  };

  const [supplierData, setSupplierData] = useState<SupplierData>(
    getSupplierData(selectedSupplier)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update supplier data when selection changes
  useEffect(() => {
    setSupplierData(getSupplierData(selectedSupplier));
  }, [selectedSupplier]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintSupplier = (supplierData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Supplier Details",
        data: [supplierData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          country: "Country",
          supplierName: "Supplier Name",
          paymentTerms: "Payment Terms",
          dueDays: "Due Days",
          typeOfDeposit: "Type of Deposit",
          paymentType: "Payment Type",
          depositAmount: "Deposit Amount",
          currency: "Currency",
          exchangeRate: "Exchange Rate",
          localAmt: "Local Amount",
          contactPerson: "Contact Person",
          mobileNo: "Mobile No",
          email: "Email",
          website: "Website",
          isDefault: "Default Supplier",
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
      console.log("supplierData on pdf click", supplierData);
      const blob = await pdf(
        <GenericPDF
          data={[supplierData]}
          title="Supplier Details"
          subtitle="Supplier Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "supplier-details.pdf";
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
        title="Viewing Supplier"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/supplier")}
        listText="List"
        listPath="supplier"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/supplier/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/supplier/edit/1"),
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
                  handlePrintSupplier(supplierData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: SN, Country, Supplier Name, Payment Terms */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSn && (
              <div className="mt-1">
                <Autocomplete
                  options={supplierOptions}
                  value={selectedSupplier}
                  onValueChange={setSelectedSupplier}
                  placeholder=" "
                  displayKey="supplier"
                  valueKey="supplier"
                  searchKey="supplier"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Supplier"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCountry && (
              <div className="">
                <Autocomplete
                  options={countryOptions}
                  value={supplierData.country}
                  onValueChange={(value: string) => {
                    // Get country-specific data
                    const countryData = getCountryData(value);
                    setSupplierData((prev) => ({
                      ...prev,
                      country: value,
                      currency: countryData.currency,
                      exchangeRate: countryData.exchangeRate,
                      localAmt: prev.depositAmount * countryData.exchangeRate,
                    }));
                  }}
                  placeholder=" "
                  displayKey="country"
                  valueKey="country"
                  searchKey="country"
                  disabled={false}
                  className="w-full bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Country"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewSupplierName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Supplier Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.supplierName)}
                </div>
              </div>
            )}

            {canViewPaymentTerms && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Payment Terms
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.paymentTerms)}
                </div>
              </div>
            )}

            {canViewDueDays && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Due Days</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.dueDays)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Due Days, Type of Deposit, Payment Type, Deposit Amount */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewTypeOfDeposit && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Type of Deposit
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.typeOfDeposit)}
                </div>
              </div>
            )}

            {canViewPaymentType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Payment Type</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.paymentType)}
                </div>
              </div>
            )}

            {canViewDepositAmount && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Deposit Amount
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.depositAmount)}
                </div>
              </div>
            )}

            {canViewCurrency && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Currency</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.currency)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Currency, Exchange Rate, Local Amount, Contact Person */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewExchangeRate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Exchange Rate
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.exchangeRate)}
                </div>
              </div>
            )}

            {canViewLocalAmt && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Local Amount</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.localAmt)}
                </div>
              </div>
            )}

            {canViewContactPerson && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Contact Person
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.contactPerson)}
                </div>
              </div>
            )}

            {canViewMobileNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Mobile No</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.mobileNo)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Mobile No, Email, Website, Default */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.email)}
                </div>
              </div>
            )}

            {canViewWebsite && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(supplierData.website)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {supplierData.isDefault ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsDraft && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Draft</span>
                </div>
                <div className="">
                  {supplierData.isDraft ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}

            {canViewIsActive && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Active</span>
                </div>
                <div className="">
                  {supplierData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
                      Yes
                    </span>
                  ) : (
                    <span className="text-black font-bold text-[15px]">No</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Row 5: Draft, Active, Deleted */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewIsDeleted && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Deleted</span>
                </div>
                <div className="">
                  {supplierData.isDeleted ? (
                    <span className="text-black font-bold text-[15px]">
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
          created: getRelativeTime(supplierData.createdAt),
          updated: getRelativeTime(supplierData.updatedAt),
          drafted: getRelativeTime(supplierData.draftedAt),
          deleted: getRelativeTime(supplierData.deletedAt),
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
