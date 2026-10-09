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

type ShippingData = {
  sn: string;
  shipperCountry: string;
  shipperName: string;
  contactPerson: string;
  mobileNo: string;
  phoneNo: string;
  faxNo: string;
  email: string;
  website: string;
  shipmentRate: string;
  cbm: string;
  freightCost: string;
  currencyType: string;
  status: string;
  date: string;
  loginId: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

const initialData: ShippingData = {
  sn: "001",
  shipperCountry: "Saudi Arabia",
  shipperName: "Al-Rashid Shipping Co",
  contactPerson: "Ahmed Al-Rashid",
  mobileNo: "+966501234567",
  phoneNo: "+966114567890",
  faxNo: "+966114567891",
  email: "ahmed@rashidshipping.com",
  website: "www.rashidshipping.com",
  shipmentRate: "150.00",
  cbm: "25.5",
  freightCost: "3825.00",
  currencyType: "SAR",
  status: "Active",
  date: "2024-01-15",
  loginId: "user001",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

// Shipping options for autocomplete
const shippingOptions = [
  "001 - Al-Rashid Shipping Co",
  "002 - Al-Zahrani Shipping Services",
  "003 - Al-Sayed Shipping Co.",
  "004 - Al-Mansouri Shipping Agency",
  "005 - Al-Qahtani Shipping",
  "006 - Al-Otaibi Shipping",
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

export default function ShippingDetailsPage() {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(
    "001 - Al-Rashid Shipping Co"
  );
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // get permission
  const canCreate: boolean = usePermission("shipping", "create");
  const canView: boolean = usePermission("shipping", "view");
  const canEdit: boolean = usePermission("shipping", "edit");
  const canDelete: boolean = usePermission("shipping", "delete");
  const canExport: boolean = usePermission("shipping", "export");
  const canPdf: boolean = usePermission("shipping", "pdf");
  const canPrint: boolean = usePermission("shipping", "print");
  const canSeeHistory: boolean = usePermission("shipping", "history");

  // Field-level permissions
  const canViewSn: boolean = usePermission("shipping", "view", "sn");
  const canViewShipperCountry: boolean = usePermission(
    "shipping",
    "view",
    "shipperCountry"
  );
  const canViewShipperName: boolean = usePermission(
    "shipping",
    "view",
    "shipperName"
  );
  const canViewContactPerson: boolean = usePermission(
    "shipping",
    "view",
    "contactPerson"
  );
  const canViewMobileNo: boolean = usePermission(
    "shipping",
    "view",
    "mobileNo"
  );
  const canViewPhoneNo: boolean = usePermission("shipping", "view", "phoneNo");
  const canViewFaxNo: boolean = usePermission("shipping", "view", "faxNo");
  const canViewEmail: boolean = usePermission("shipping", "view", "email");
  const canViewWebsite: boolean = usePermission("shipping", "view", "website");
  const canViewShipmentRate: boolean = usePermission(
    "shipping",
    "view",
    "shipmentRate"
  );
  const canViewCbm: boolean = usePermission("shipping", "view", "cbm");
  const canViewFreightCost: boolean = usePermission(
    "shipping",
    "view",
    "freightCost"
  );
  const canViewCurrencyType: boolean = usePermission(
    "shipping",
    "view",
    "currencyType"
  );
  const canViewStatus: boolean = usePermission("shipping", "view", "status");
  const canViewDate: boolean = usePermission("shipping", "view", "date");
  const canViewLoginId: boolean = usePermission("shipping", "view", "loginId");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canExport", canExport);

  // Get shipping data based on selected shipping
  const getShippingData = (shippingName: string): ShippingData => {
    const shippingMap: Record<string, ShippingData> = {
      "001 - Al-Rashid Shipping Co": {
        sn: "001",
        shipperCountry: "Saudi Arabia",
        shipperName: "Al-Rashid Shipping Co",
        contactPerson: "Ahmed Al-Rashid",
        mobileNo: "+966501234567",
        phoneNo: "+966114567890",
        faxNo: "+966114567891",
        email: "ahmed@rashidshipping.com",
        website: "www.rashidshipping.com",
        shipmentRate: "150.00",
        cbm: "25.5",
        freightCost: "3825.00",
        currencyType: "SAR",
        status: "Active",
        date: "2024-01-15",
        loginId: "user001",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        updatedAt: new Date("2024-01-20T14:45:00Z"),
        isDeleted: false,
      },
      "002 - Al-Zahrani Shipping Services": {
        sn: "002",
        shipperCountry: "Saudi Arabia",
        shipperName: "Al-Zahrani Shipping Services",
        contactPerson: "Mohammed Al-Zahrani",
        mobileNo: "+966502345678",
        phoneNo: "+966114567892",
        faxNo: "+966114567893",
        email: "mohammed@zahranishipping.com",
        website: "www.zahranishipping.com",
        shipmentRate: "200.00",
        cbm: "30.0",
        freightCost: "4500.00",
        currencyType: "SAR",
        status: "Approved",
        date: "2024-01-16",
        loginId: "user002",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-16T09:15:00Z"),
        updatedAt: new Date("2024-01-21T11:30:00Z"),
        isDeleted: false,
      },
      "003 - Al-Sayed Shipping Co.": {
        sn: "003",
        shipperCountry: "Saudi Arabia",
        shipperName: "Al-Sayed Shipping Co.",
        contactPerson: "Ali Al-Sayed",
        mobileNo: "+966503456789",
        phoneNo: "+966114567894",
        faxNo: "+966114567895",
        email: "ali@sayedshipping.com",
        website: "www.sayedshipping.com",
        shipmentRate: "180.00",
        cbm: "28.0",
        freightCost: "4200.00",
        currencyType: "SAR",
        status: "In Transit",
        date: "2024-01-17",
        loginId: "user003",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-17T16:20:00Z"),
        updatedAt: new Date("2024-01-22T13:45:00Z"),
        isDeleted: false,
      },
      "004 - Al-Mansouri Shipping Agency": {
        sn: "004",
        shipperCountry: "Saudi Arabia",
        shipperName: "Al-Mansouri Shipping Agency",
        contactPerson: "Khaled Al-Mansouri",
        mobileNo: "+966504567890",
        phoneNo: "+966114567896",
        faxNo: "+966114567897",
        email: "khaled@mansouriagency.com",
        website: "www.mansouriagency.com",
        shipmentRate: "220.00",
        cbm: "32.0",
        freightCost: "5000.00",
        currencyType: "SAR",
        status: "Delivered",
        date: "2024-01-18",
        loginId: "user004",
        isActive: false,
        isDraft: false,
        createdAt: new Date("2024-01-18T12:00:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "005 - Al-Qahtani Shipping": {
        sn: "005",
        shipperCountry: "Saudi Arabia",
        shipperName: "Al-Qahtani Shipping",
        contactPerson: "Fahad Al-Qahtani",
        mobileNo: "+966505678901",
        phoneNo: "+966114567898",
        faxNo: "+966114567899",
        email: "fahad@qahtanishipping.com",
        website: "www.qahtanishipping.com",
        shipmentRate: "190.00",
        cbm: "29.0",
        freightCost: "4700.00",
        currencyType: "SAR",
        status: "Cancelled",
        date: "2024-01-19",
        loginId: "user005",
        isActive: true,
        isDraft: true,
        createdAt: new Date("2024-01-19T08:30:00Z"),
        updatedAt: new Date("2024-01-25T10:00:00Z"),
        isDeleted: false,
      },
      "006 - Al-Otaibi Shipping": {
        sn: "006",
        shipperCountry: "Saudi Arabia",
        shipperName: "Al-Otaibi Shipping",
        contactPerson: "Yousef Al-Otaibi",
        mobileNo: "+966506789012",
        phoneNo: "+966114567900",
        faxNo: "+966114567901",
        email: "yousef@otaibishipping.com",
        website: "www.otaibishipping.com",
        shipmentRate: "210.00",
        cbm: "31.0",
        freightCost: "5100.00",
        currencyType: "SAR",
        status: "On Hold",
        date: "2024-01-20",
        loginId: "user006",
        isActive: true,
        isDraft: false,
        createdAt: new Date("2024-01-20T14:15:00Z"),
        updatedAt: new Date("2024-01-25T16:40:00Z"),
        isDeleted: false,
      },
    };

    return shippingMap[shippingName] || initialData;
  };

  const [shippingData, setShippingData] = useState<ShippingData>(
    getShippingData(selectedShipping)
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Update shipping data when selection changes
  useEffect(() => {
    setShippingData(getShippingData(selectedShipping));
  }, [selectedShipping]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintShipping = (shippingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Shipping Details",
        data: [shippingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          shipperCountry: "Shipper Country",
          shipperName: "Shipper Name",
          contactPerson: "Contact Person",
          mobileNo: "Mobile No",
          phoneNo: "Phone No",
          faxNo: "Fax No",
          email: "Email",
          website: "Website",
          shipmentRate: "Shipment Rate",
          cbm: "CBM",
          freightCost: "Freight Cost",
          currencyType: "Currency Type",
          status: "Status",
          date: "Date",
          loginId: "Login ID",
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
      console.log("shippingData on pdf click", shippingData);
      const blob = await pdf(
        <GenericPDF
          data={[shippingData]}
          title="Shipping Details"
          subtitle="Shipping Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "shipping-details.pdf";
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
        title="Viewing Shipping Details"
        videoSrc={video}
        videoHeader="Tutorial video"
        onListClick={() => navigate("/shipping")}
        listText="List"
        listPath="shipping"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/shipping/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/shipping/edit/1"),
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
                  handlePrintShipping(shippingData);
                }
              }
            : undefined
        }
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          {/* Row 1: SN, Shipper Country, Shipper Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {canViewSn && (
              <div className="mt-1">
                <Autocomplete
                  options={shippingOptions}
                  value={selectedShipping}
                  onValueChange={setSelectedShipping}
                  placeholder=" "
                  displayKey="shipping"
                  valueKey="shipping"
                  searchKey="shipping"
                  disabled={false}
                  className="w-[96%] bg-gray-100 rounded-xl"
                  labelClassName="bg-gray-50 rounded-2xl"
                  labelText="Select Shipping"
                  inputClassName="border-none bg-stone-50 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-2! focus-visible:border-blue-500"
                />
              </div>
            )}

            {canViewShipperCountry && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipper Country
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.shipperCountry)}
                </div>
              </div>
            )}

            {canViewShipperName && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Shipper Name</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.shipperName)}
                </div>
              </div>
            )}

            {canViewContactPerson && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Contact Person
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.contactPerson)}
                </div>
              </div>
            )}

            {canViewLoginId && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Login ID</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.loginId)}
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Mobile No, Phone No, Fax No */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewMobileNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Mobile No</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.mobileNo)}
                </div>
              </div>
            )}

            {canViewPhoneNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Phone No</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.phoneNo)}
                </div>
              </div>
            )}

            {canViewFaxNo && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Fax No</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.faxNo)}
                </div>
              </div>
            )}

            {canViewEmail && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Email</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.email)}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Website, Shipment Rate, CBM */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewWebsite && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Website</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.website)}
                </div>
              </div>
            )}

            {canViewShipmentRate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Shipment Rate
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.shipmentRate)}
                </div>
              </div>
            )}

            {canViewCbm && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">CBM</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.cbm)}
                </div>
              </div>
            )}

            {canViewFreightCost && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Freight Cost</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.freightCost)}
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Currency Type, Status, Date, Login ID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {canViewCurrencyType && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">
                  Currency Type
                </h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.currencyType)}
                </div>
              </div>
            )}

            {canViewStatus && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Status</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.status)}
                </div>
              </div>
            )}

            {canViewDate && (
              <div className="">
                <h3 className="font-normal mb-1 text-gray-600">Date</h3>
                <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
                  {displayValue(shippingData.date)}
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
          created: getRelativeTime(shippingData.createdAt),
          updated: getRelativeTime(shippingData.updatedAt),
          drafted: getRelativeTime(shippingData.createdAt), // Assuming draftedAt is not used in this context
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
