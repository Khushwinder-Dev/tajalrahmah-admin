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

type ConsigneeData = {
  customerCode: string;
  customerName: string;
  notification: string;
  country: string;
  zipCode: string;
  address: string;
  landmark: string;
  poBox: string;
  currency: string;
  paymentTerms: string;
  creditPeriod: string;
  creditLimit: string;
  mobileNo: string;
  contactPerson: string;
  faxNo: string;
  phoneNo: string;
  website: string;
  email: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

const initialData: ConsigneeData = {
  customerCode: "CS001",
  customerName: "Al-Rashid Trading Company",
  notification: "Email & SMS",
  country: "Saudi Arabia",
  zipCode: "21452",
  address: "King Fahd Road, Jeddah",
  landmark: "Near King Abdulaziz International Airport",
  poBox: "12345",
  currency: "SAR",
  paymentTerms: "Net 30",
  creditPeriod: "30 days",
  creditLimit: "50000",
  mobileNo: "+966-50-123-4567",
  contactPerson: "Ahmed Al-Rashid",
  faxNo: "+966-12-123-4568",
  phoneNo: "+966-12-123-4567",
  website: "www.alrashid-trading.sa",
  email: "info@alrashid-trading.sa",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

// Consignee options for autocomplete
const consigneeOptions = [
  "CS001 - Al-Rashid Trading Company",
  "CS002 - Al-Zahrani Trading Services",
  "CS003 - Al-Sayed Trading Co.",
  "CS004 - Al-Mansouri Trading Agency",
  "CS005 - Al-Qahtani Trading",
  "CS006 - Al-Otaibi Trading",
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

export default function ConsigneeMasterDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedConsignee, setSelectedConsignee] = useState(
    "CS001 - Al-Rashid Trading Company"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("consigneeMaster", "create");
  const canView: boolean = usePermission("consigneeMaster", "view");
  const canEdit: boolean = usePermission("consigneeMaster", "edit");
  const canDelete: boolean = usePermission("consigneeMaster", "delete");
  const canExport: boolean = usePermission("consigneeMaster", "export");
  const canPdf: boolean = usePermission("consigneeMaster", "pdf");
  const canPrint: boolean = usePermission("consigneeMaster", "print");
  const canSeeHistory: boolean = usePermission("consigneeMaster", "history");

  // Field-level permissions
  const canViewCustomerCode: boolean = usePermission(
    "consigneeMaster",
    "view",
    "customerCode"
  );
  const canViewCustomerName: boolean = usePermission(
    "consigneeMaster",
    "view",
    "customerName"
  );
  const canViewCountry: boolean = usePermission(
    "consigneeMaster",
    "view",
    "country"
  );
  const canViewNotification: boolean = usePermission(
    "consigneeMaster",
    "view",
    "notification"
  );
  const canViewZipCode: boolean = usePermission(
    "consigneeMaster",
    "view",
    "zipCode"
  );
  const canViewAddress: boolean = usePermission(
    "consigneeMaster",
    "view",
    "address"
  );
  const canViewLandmark: boolean = usePermission(
    "consigneeMaster",
    "view",
    "landmark"
  );
  const canViewPoBox: boolean = usePermission(
    "consigneeMaster",
    "view",
    "poBox"
  );
  const canViewCurrency: boolean = usePermission(
    "consigneeMaster",
    "view",
    "currency"
  );
  const canViewPaymentTerms: boolean = usePermission(
    "consigneeMaster",
    "view",
    "paymentTerms"
  );
  const canViewCreditPeriod: boolean = usePermission(
    "consigneeMaster",
    "view",
    "creditPeriod"
  );
  const canViewCreditLimit: boolean = usePermission(
    "consigneeMaster",
    "view",
    "creditLimit"
  );
  const canViewContactPerson: boolean = usePermission(
    "consigneeMaster",
    "view",
    "contactPerson"
  );
  const canViewMobileNo: boolean = usePermission(
    "consigneeMaster",
    "view",
    "mobileNo"
  );
  const canViewPhoneNo: boolean = usePermission(
    "consigneeMaster",
    "view",
    "phoneNo"
  );
  const canViewFaxNo: boolean = usePermission(
    "consigneeMaster",
    "view",
    "faxNo"
  );
  const canViewEmail: boolean = usePermission(
    "consigneeMaster",
    "view",
    "email"
  );
  const canViewWebsite: boolean = usePermission(
    "consigneeMaster",
    "view",
    "website"
  );
  const canViewIsDefault: boolean = usePermission(
    "consigneeMaster",
    "view",
    "isDefault"
  );
  const canViewIsActive: boolean = usePermission(
    "consigneeMaster",
    "view",
    "isActive"
  );
  const canViewIsDraft: boolean = usePermission(
    "consigneeMaster",
    "view",
    "isDraft"
  );
  const canViewIsDeleted: boolean = usePermission(
    "consigneeMaster",
    "view",
    "isDeleted"
  );

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get consignee data based on selected consignee
  const getConsigneeData = (consigneeName: string): ConsigneeData => {
    const consigneeMap: Record<string, ConsigneeData> = {
      "CS001 - Al-Rashid Trading Company": {
        customerCode: "CS001",
        customerName: "Al-Rashid Trading Company",
        notification: "Email & SMS",
        country: "Saudi Arabia",
        zipCode: "21452",
        address: "King Fahd Road, Jeddah",
        landmark: "Near King Abdulaziz International Airport",
        poBox: "12345",
        currency: "SAR",
        paymentTerms: "Net 30",
        creditPeriod: "30 days",
        creditLimit: "50000",
        mobileNo: "+966-50-123-4567",
        contactPerson: "Ahmed Al-Rashid",
        faxNo: "+966-12-123-4568",
        phoneNo: "+966-12-123-4567",
        website: "www.alrashid-trading.sa",
        email: "info@alrashid-trading.sa",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "CS002 - Al-Zahrani Trading Services": {
        customerCode: "CS002",
        customerName: "Al-Zahrani Trading Services",
        notification: "Email & WhatsApp",
        country: "Saudi Arabia",
        zipCode: "31452",
        address: "King Abdullah Road, Dammam",
        landmark: "Near King Fahd International Airport",
        poBox: "23456",
        currency: "SAR",
        paymentTerms: "Net 45",
        creditPeriod: "45 days",
        creditLimit: "75000",
        mobileNo: "+966-50-234-5678",
        contactPerson: "Mohammed Al-Zahrani",
        phoneNo: "+966-13-234-5678",
        faxNo: "+966-13-234-5679",
        website: "www.alzahrani-trading.sa",
        email: "info@alzahrani-trading.sa",
        isDefault: true,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "CS003 - Al-Sayed Trading Co.": {
        customerCode: "CS003",
        customerName: "Al-Sayed Trading Co.",
        notification: "SMS & WhatsApp",
        country: "Saudi Arabia",
        zipCode: "41452",
        address: "King Faisal Road, Jubail",
        landmark: "Near Jubail Industrial City",
        poBox: "34567",
        currency: "SAR",
        paymentTerms: "Net 60",
        creditPeriod: "60 days",
        creditLimit: "100000",
        mobileNo: "+966-50-345-6789",
        contactPerson: "Fatima Al-Sayed",
        phoneNo: "+966-13-345-6789",
        faxNo: "+966-13-345-6790",
        website: "www.alsayed-trading.sa",
        email: "info@alsayed-trading.sa",
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "CS004 - Al-Mansouri Trading Agency": {
        customerCode: "CS004",
        customerName: "Al-Mansouri Trading Agency",
        notification: "Email",
        country: "Saudi Arabia",
        zipCode: "51452",
        address: "King Salman Road, Yanbu",
        landmark: "Near Yanbu Industrial City",
        poBox: "45678",
        currency: "SAR",
        paymentTerms: "Due on Receipt",
        creditPeriod: "0 days",
        creditLimit: "25000",
        mobileNo: "+966-50-456-7890",
        contactPerson: "Omar Al-Mansouri",
        phoneNo: "+966-14-456-7890",
        faxNo: "+966-14-456-7891",
        website: "www.almansouri-trading.sa",
        email: "info@almansouri-trading.sa",
        isDefault: false,
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        draftedAt: null,
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "CS005 - Al-Qahtani Trading": {
        customerCode: "CS005",
        customerName: "Al-Qahtani Trading",
        notification: "SMS",
        country: "Saudi Arabia",
        zipCode: "61452",
        address: "King Khalid Road, Dhahran",
        landmark: "Near Dhahran Airport",
        poBox: "56789",
        currency: "SAR",
        paymentTerms: "Advance Payment",
        creditPeriod: "0 days",
        creditLimit: "15000",
        mobileNo: "+966-50-567-8901",
        contactPerson: "Aisha Al-Qahtani",
        phoneNo: "+966-13-567-8901",
        faxNo: "+966-13-567-8902",
        website: "www.alqahtani-trading.sa",
        email: "info@alqahtani-trading.sa",
        isDefault: false,
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        draftedAt: new Date("2024-01-25T10:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        deletedAt: null,
        isDeleted: false,
      },
      "CS006 - Al-Otaibi Trading": {
        customerCode: "CS006",
        customerName: "Al-Otaibi Trading",
        notification: "Email & SMS",
        country: "Saudi Arabia",
        zipCode: "71452",
        address: "King Abdulaziz Road, Rabigh",
        landmark: "Near Rabigh Industrial City",
        poBox: "67890",
        currency: "SAR",
        paymentTerms: "Net 30",
        creditPeriod: "30 days",
        creditLimit: "35000",
        mobileNo: "+966-50-678-9012",
        contactPerson: "Khalid Al-Otaibi",
        phoneNo: "+966-12-678-9012",
        faxNo: "+966-12-678-9013",
        website: "www.alotaibi-trading.sa",
        email: "info@alotaibi-trading.sa",
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

    return consigneeMap[consigneeName] || initialData;
  };

  const [consigneeData, setConsigneeData] = useState<ConsigneeData>(
    getConsigneeData(selectedConsignee)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update consignee data when selection changes
  useEffect(() => {
    setConsigneeData(getConsigneeData(selectedConsignee));
  }, [selectedConsignee]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintConsignee = (consigneeData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Consignee Details",
        data: [consigneeData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          customerCode: "Customer Code",
          customerName: "Customer Name",
          notification: "Notification",
          country: "Country",
          zipCode: "Zip Code",
          address: "Address",
          landmark: "Landmark",
          poBox: "P.O. Box",
          currency: "Currency",
          paymentTerms: "Payment Terms",
          creditPeriod: "Credit Period",
          creditLimit: "Credit Limit",
          mobileNo: "Mobile No.",
          contactPerson: "Contact Person",
          faxNo: "Fax No.",
          phoneNo: "Phone No.",
          website: "Website",
          email: "Email",
          isDefault: "Default Consignee",
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
      console.log("consigneeData on pdf click", consigneeData);
      const blob = await pdf(
        <GenericPDF
          data={[consigneeData]}
          title="Consignee Details"
          subtitle="Consignee Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "consignee-details.pdf";
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
        title="Viewing Consignee"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/consignee-master")}
        listText="List"
        listPath="consignee-master"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/consignee-master/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/consignee-master/edit/1"),
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
                  handlePrintConsignee(consigneeData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: Customer Code, Customer Name, Country, Notification */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewCustomerCode && (
              <div className="mt-1">
                <Autocomplete
                  options={consigneeOptions}
                  value={selectedConsignee}
                  onValueChange={setSelectedConsignee}
                  placeholder=" "
                  displayKey="consignee"
                  valueKey="consignee"
                  searchKey="consignee"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Consignee"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewCustomerName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Customer Name
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.customerName)}
                </div>
              </div>
            )}

            {canViewCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Country</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.country)}
                </div>
              </div>
            )}

            {canViewNotification && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Notification</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.notification)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Zip Code, Address, Landmark, P.O. Box */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewZipCode && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Zip Code</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.zipCode)}
                </div>
              </div>
            )}

            {canViewAddress && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Address</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.address)}
                </div>
              </div>
            )}

            {canViewLandmark && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Landmark</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.landmark)}
                </div>
              </div>
            )}

            {canViewPoBox && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">P.O. Box</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.poBox)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Currency, Payment Terms, Credit Period, Credit Limit */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewCurrency && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Currency</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.currency)}
                </div>
              </div>
            )}

            {canViewPaymentTerms && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Payment Terms
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.paymentTerms)}
                </div>
              </div>
            )}

            {canViewCreditPeriod && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Credit Period
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.creditPeriod)}
                </div>
              </div>
            )}

            {canViewCreditLimit && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Credit Limit</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.creditLimit)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Contact Person, Mobile No, Phone No, Fax No */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewContactPerson && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Contact Person
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.contactPerson)}
                </div>
              </div>
            )}

            {canViewMobileNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Mobile No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.mobileNo)}
                </div>
              </div>
            )}

            {canViewPhoneNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Phone No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.phoneNo)}
                </div>
              </div>
            )}

            {canViewFaxNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Fax No.</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.faxNo)}
                </div>
              </div>
            )}
          </div>

          {/* Row 5: Email, Website, Default, Draft */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.email)}
                </div>
              </div>
            )}

            {canViewWebsite && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(consigneeData.website)}
                </div>
              </div>
            )}

            {canViewIsDefault && (
              <div className="flex flex-col">
                <div className="">
                  <span className="text-[15px] text-gray-600">Default</span>
                </div>
                <div className="">
                  {consigneeData.isDefault ? (
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
                  {consigneeData.isDraft ? (
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
                  {consigneeData.isActive ? (
                    <span className="text-black font-bold text-[15px]">
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
                  {consigneeData.isDeleted ? (
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
          created: getRelativeTime(consigneeData.createdAt),
          updated: getRelativeTime(consigneeData.updatedAt),
          drafted: getRelativeTime(consigneeData.draftedAt),
          deleted: getRelativeTime(consigneeData.deletedAt),
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
