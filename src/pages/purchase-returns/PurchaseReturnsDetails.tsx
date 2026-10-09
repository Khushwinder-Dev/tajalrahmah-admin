/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

// Define PurchaseReturn interface
interface PurchaseReturn {
  id: string;
  purchaseInvoiceNumber: string;
  documentNumber: string;
  poNumber: string;
  poDate: string;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  documents: string;
  expiryDate: string;
  image: string | null;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  deletedAt: string;
}

const MOCK_PURCHASE_RETURNS = [
  {
    documentNumber: "PR001",
    supplierName: "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
  },
  { documentNumber: "PR002", supplierName: "SimplyNayela" },
  {
    documentNumber: "PR003",
    supplierName: "BROWN HUT AUTO ACCESSORISE TR L.L.C",
  },
  { documentNumber: "PR004", supplierName: "PIDILITE MEA CHEMICALS L.L.C" },
  {
    documentNumber: "PR005",
    supplierName: "TOP LEATHER Vehicles Upholstery Service L.L.C",
  },
  { documentNumber: "PR006", supplierName: "AL WESAL AUTO ACCESSORIES LLC" },
];

// Mock summary table data type
export type MockSummaryTableDataType = {
  SN: number;
  Item: string;
  Description: string;
  Qty: number;
  Unit: string;
  Rate: number;
  Disc: number;
  DiscAmt: number;
  ExcludingVAT: number;
  VAT: number;
  VATAmount: number;
  IncludingVAT: number;
};

// Mock summary table data
const MOCK_SUMMARY_TABLE_DATA: MockSummaryTableDataType[] = [
  {
    SN: 1,
    Item: "Laptop",
    Description: "Dell Inspiron 15",
    Qty: 1,
    Unit: "pcs",
    Rate: 100,
    Disc: 0,
    DiscAmt: 0.0,
    ExcludingVAT: 100.0,
    VAT: 15,
    VATAmount: 15.0,
    IncludingVAT: 115.0,
  },
  {
    SN: 2,
    Item: "Monitor",
    Description: "HP 24-inch FHD",
    Qty: 3,
    Unit: "pcs",
    Rate: 15000,
    Disc: 0,
    DiscAmt: 0.0,
    ExcludingVAT: 45000.0,
    VAT: 7.5,
    VATAmount: 3375.0,
    IncludingVAT: 48375.0,
  },
  {
    SN: 3,
    Item: "Mouse",
    Description: "Logitech Wireless",
    Qty: 5,
    Unit: "pcs",
    Rate: 1200,
    Disc: 10,
    DiscAmt: 600.0,
    ExcludingVAT: 5400.0,
    VAT: 5,
    VATAmount: 270.0,
    IncludingVAT: 5670.0,
  },
];

const TableHeaderData = [
  "SN",
  "ITEM",
  "DESCRIPTION",
  "Qty",
  "Unit",
  "Rate",
  "Disc",
  "Disc Amt",
  "Excluding VAT",
  "VAT",
  "VAT Amount",
  "Including VAT",
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

export default function PurchaseReturnsDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedPurchaseReturn, setSelectedPurchaseReturn] = useState("PR001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const canCreate: boolean = usePermission("purchase-returns", "create");
  // const canEdit: boolean = usePermission("purchase-returns", "edit");
  // const canDelete: boolean = usePermission("purchase-returns", "delete");
  // const canExport: boolean = usePermission("purchase-returns", "export");
  const canPdf: boolean = usePermission("purchase-returns", "pdf");
  const canPrint: boolean = usePermission("purchase-returns", "print");
  const canSeeHistory: boolean = usePermission("purchase-returns", "history");

  let purchaseReturnData: PurchaseReturn = {
    id: "1",
    purchaseInvoiceNumber: "INV-2024-001",
    documentNumber: selectedPurchaseReturn,
    poNumber: "PO-2024-001",
    poDate: "2024-07-24",
    supplierName:
      MOCK_PURCHASE_RETURNS.find(
        (pr) => pr.documentNumber === selectedPurchaseReturn
      )?.supplierName || "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
    paymentMode: "Split",
    dueDays: 45,
    paymentDate: "2024-08-15",
    supplierNumber: "36",
    supplierStatus: "Active",
    supplierGroup: "Furniture Suppliers",
    remarks: "Return for defective items",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    documents: "Return Authorization",
    expiryDate: "2024-12-31",
    image: "/customer-dummy-image.jpg",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-11-20T14:45:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      purchaseReturnData = {
        ...purchaseReturnData,
        purchaseInvoiceNumber: "",
        poNumber: "",
        poDate: "",
        supplierName: "",
        paymentMode: "",
        dueDays: 0,
        paymentDate: "",
        supplierNumber: "",
        supplierStatus: "",
        supplierGroup: "",
        remarks: "",
        country: "",
        state: "",
        city: "",
        documents: "",
        expiryDate: "",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      };
    }
  }, []);

  const handlePrintPurchaseReturn = (purchaseReturnData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Purchase Return Details",
        data: [purchaseReturnData],
        excludeFields: ["id", "__v", "_id", "image"],
        fieldLabels: {
          purchaseInvoiceNumber: "Purchase Invoice Number",
          documentNumber: "Document Number",
          poNumber: "P.O Number",
          poDate: "P.O Date",
          supplierName: "Supplier Name",
          paymentMode: "Payment Mode",
          dueDays: "Due Days",
          paymentDate: "Payment Date",
          supplierNumber: "Supplier Number",
          supplierStatus: "Supplier Status",
          supplierGroup: "Supplier Group",
          remarks: "Remarks",
          country: "Country",
          state: "State",
          city: "City",
          documents: "Documents",
          expiryDate: "Expiry Date",
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
      console.log("purchaseReturnData on pdf click", purchaseReturnData);
      const blob = await pdf(
        <GenericPDF
          data={[purchaseReturnData]}
          title="Purchase Return Details"
          subtitle="Purchase Return Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `purchase-return-${selectedPurchaseReturn}-details.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "–";

    const date = new Date(dateString);
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

  // Number to words conversion function
  const numberToWords = (amount: number): string => {
    const ones = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const scales = ["", "thousand", "million", "billion"];

    const convertHundreds = (num: number): string => {
      let result = "";
      if (num >= 100) {
        result += ones[Math.floor(num / 100)] + " hundred ";
        num %= 100;
      }
      if (num >= 20) {
        result += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }
      if (num > 0) {
        result += ones[num] + " ";
      }
      return result.trim();
    };

    if (amount === 0) return "zero";
    if (amount < 0) return "negative " + numberToWords(-amount);

    const integerPart = Math.floor(amount);
    const decimalPart = Math.round((amount - integerPart) * 100);

    let result = "";
    let scaleIndex = 0;
    let num = integerPart;

    if (num === 0) {
      result = "zero";
    } else {
      while (num > 0) {
        const chunk = num % 1000;
        if (chunk !== 0) {
          const chunkWords = convertHundreds(chunk);
          result =
            chunkWords +
            (scales[scaleIndex] ? " " + scales[scaleIndex] : "") +
            (result ? " " + result : "");
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
      }
    }

    if (decimalPart > 0) {
      result += " and " + convertHundreds(decimalPart) + " cents";
    }

    return result.trim();
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    return MOCK_SUMMARY_TABLE_DATA.reduce((total, item) => {
      return total + item.IncludingVAT;
    }, 0);
  };

  return (
    <>
      <MinimizablePageLayout
        moduleId="purchase-return-details-module"
        moduleName="Purchase Return Details"
        moduleRoute="/purchase-returns/view"
        title={t("form.viewingPurchaseReturn")}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="purchase-returns"
        activePage="view"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/purchase-returns/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () =>
              navigate(`/purchase-returns/edit/${purchaseReturnData.id}`),
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
                  handlePrintPurchaseReturn(purchaseReturnData);
                }
              }
            : undefined
        }
        module="purchase-returns"
      >
        {/* Row 1: Purchase Invoice Number, Document Number, P.O Number, P.O Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_PURCHASE_RETURNS}
              value={selectedPurchaseReturn}
              onValueChange={setSelectedPurchaseReturn}
              placeholder=""
              displayKey="documentNumber"
              valueKey="documentNumber"
              searchKey="supplierName"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Document Number"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">
              Purchase Invoice Number
            </h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.purchaseInvoiceNumber)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">P.O Number</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.poNumber)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">P.O Date</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.poDate)}
            </div>
          </div>
        </div>

        {/* Row 2: Supplier Name, Payment Mode, Due Days, Payment Date */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supplier Name</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.supplierName)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Payment Mode</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.paymentMode)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Due Days</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {purchaseReturnData.dueDays
                ? `${purchaseReturnData.dueDays} days`
                : "–"}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Payment Date</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.paymentDate)}
            </div>
          </div>
        </div>

        {/* Row 3: Supplier Number, Supplier Status, Supplier Group, Remarks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supplier Number</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.supplierNumber)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supplier Status</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {purchaseReturnData.supplierStatus ? (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    purchaseReturnData.supplierStatus === "Active"
                      ? "bg-green-100 text-green-800"
                      : purchaseReturnData.supplierStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : purchaseReturnData.supplierStatus === "Suspended"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {purchaseReturnData.supplierStatus}
                </span>
              ) : (
                "–"
              )}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Supplier Group</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.supplierGroup)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Remarks</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.remarks)}
            </div>
          </div>
        </div>

        {/* Row 4: Country, State, City, Documents, Expiry Date, Status, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Country</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.country)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">State</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.state)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">City</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.city)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Documents</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.documents)}
            </div>
          </div>
        </div>

        {/* Row 5: Expiry Date, Status, Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Expiry Date</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(purchaseReturnData.expiryDate)}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Status</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {purchaseReturnData.isDeleted
                ? "Deleted"
                : purchaseReturnData.isDraft
                ? "Draft"
                : "Active"}
            </div>
          </div>

          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Action</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              Updated
            </div>
          </div>
        </div>

        {/* Document Image */}
        <div className="mt-14 relative">
          <div className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-500 rounded-md">
            Document Image
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary py-16">
            <div className="w-48 h-28 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300 cursor-pointer">
              {purchaseReturnData.image ? (
                <img
                  src={purchaseReturnData.image}
                  alt="Document"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  –
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Purchase Return Items Table */}
        <div className="mt-14 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-primary">
              Purchase Return Items
            </h3>
            <span className="text-sm text-gray-500">
              Total Items: {MOCK_SUMMARY_TABLE_DATA.length}
            </span>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {TableHeaderData.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {MOCK_SUMMARY_TABLE_DATA.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50 dark:bg-gray-800"
                      } hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-center text-gray-900 dark:text-gray-100">
                        {item.SN}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-100">
                        <div className="font-medium">{item.Item}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-300">
                        <div
                          className="max-w-xs truncate"
                          title={item.Description}
                        >
                          {item.Description}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {item.Qty}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {item.Unit}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.Rate)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {item.Disc}%
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.DiscAmt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.ExcludingVAT)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {item.VAT}%
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.VATAmount)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(item.IncludingVAT)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Table Footer */}
                <tfoot className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Amount in Words:
                        </span>
                        <span className="font-semibold capitalize">
                          {numberToWords(calculateTotalAmount())} dollars only
                        </span>
                      </div>
                    </td>
                    <td
                      colSpan={2}
                      className="px-4 py-3 text-sm font-bold text-right text-gray-900 dark:text-gray-100"
                    >
                      Grand Total:
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-right text-green-600 dark:text-green-400">
                      {formatCurrency(calculateTotalAmount())}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="Purchase Return History"
        statusInfo={{
          created: getRelativeTime(purchaseReturnData.createdAt),
          updated: getRelativeTime(purchaseReturnData.updatedAt),
          drafted: getRelativeTime(purchaseReturnData.draftedAt),
          deleted: getRelativeTime(purchaseReturnData.deletedAt),
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
