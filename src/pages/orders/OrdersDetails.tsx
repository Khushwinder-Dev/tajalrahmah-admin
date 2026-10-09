/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Modal } from "@mantine/core";
import HistoryDataTable from "@/components/common/HistoryDataTable";
import { mockHistoryData } from "@/mockData/country-mockdata";
import { SplitButton } from "@/components/common/SplitButton";
import VideoModal from "@/components/common/VideoModal";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";

// Define Order interface to ensure type consistency
interface Order {
  id: string;
  documentNumber: string;
  poNumber: string;
  poDate: Date | string;
  supplierName: string;
  paymentMode: string;
  dueDays: number;
  paymentDate: Date | string;
  supplierNumber: string;
  supplierStatus: string;
  supplierGroup: string;
  remarks: string;
  country: string;
  state: string;
  city: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

const MOCK_ORDERS = [
  {
    documentNumber: "ORD001",
    supplierName: "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
  },
  { documentNumber: "ORD002", supplierName: "SimplyNayela" },
  {
    documentNumber: "ORD003",
    supplierName: "BROWN HUT AUTO ACCESSORISE TR L.L.C",
  },
  { documentNumber: "ORD004", supplierName: "PIDILITE MEA CHEMICALS L.L.C" },
  {
    documentNumber: "ORD005",
    supplierName: "TOP LEATHER Vehicles Upholstery Service L.L.C",
  },
  { documentNumber: "ORD006", supplierName: "AL WESAL AUTO ACCESSORIES LLC" },
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

const ORDER_DOCUMENT_NUMBERS = MOCK_ORDERS.map((order) => order.documentNumber);

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

export default function OrdersDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("ORD001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  const orderData: Order = {
    id: "1",
    documentNumber: selectedOrder,
    poNumber: "PO-2024-001",
    poDate: "2024-07-24",
    supplierName:
      MOCK_ORDERS.find((o) => o.documentNumber === selectedOrder)
        ?.supplierName || "AL AHAD CURTAINS TEX & FURNITURE TR.LLC",
    paymentMode: "Split",
    dueDays: 45,
    paymentDate: "2024-08-15",
    supplierNumber: "36",
    supplierStatus: "Active",
    supplierGroup: "Furniture Suppliers",
    remarks: "Urgent delivery required",
    country: "UAE",
    state: "Dubai",
    city: "Deira",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: new Date("2023-05-15T10:30:00Z"),
    updatedAt: new Date("2023-11-20T14:45:00Z"),
    draftedAt: new Date("2025-05-20T14:45:00Z"),
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
  }, []);

  const handlePrintOrder = (orderData: Order) => {
    try {
      const html = PrintCommonLayout({
        title: "Order Details",
        data: [orderData as unknown as Record<string, unknown>],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
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
    if (checked) {
      setTimeout(() => handlePrintOrder(orderData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("orderData on pdf click", orderData);
      const blob = await pdf(
        <GenericPDF
          data={[orderData]}
          title="Order Details"
          subtitle="Order Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "order-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleDeleteRestore = () =>
    console.log(orderData.isDeleted ? "Restoring..." : "Deleting...");

  const getRelativeTime = (dateString: string | null | Date) => {
    if (!dateString) return "--/--/----";

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

  // Generate initials for supplier
  const getSupplierInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getInitialsColor = (code: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-yellow-500",
    ];
    const index = parseInt(code.slice(-1)) % colors.length;
    return colors[index];
  };

  // Add this function before the component or in a utils file
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

    // Handle negative numbers
    if (amount < 0) return "negative " + numberToWords(-amount);

    // Split into integer and decimal parts
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

    // Add decimal part if present
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
      return total + item.Qty * item.Rate;
    }, 0);
  };

  return (
    <div className="relative w-full">
      {/* Container with full height minus external footer (80px assumed) */}
      <div className="flex flex-col h-[82vh] overflow-hidden border rounded shadow bg-white dark:bg-gray-800 ">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <VideoModal src={video} header={"Rapid ERP Video"} />
            <h1 className="text-xl font-bold text-primary">
              {t("form.viewingOrder")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <SplitButton
                onListClick={() => navigate("/orders")}
                listText="List"
                listPath="/orders"
                popoverOptions={[
                  {
                    label: "Create",
                    onClick: () => navigate("/orders/create"),
                  },
                  {
                    label: "Edit",
                    onClick: () => navigate("/orders/1/edit"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Scrollable Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* First Row: Document Number, P.O Number, P.O Date, Supplier Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                Document Number <span className="text-red-500">*</span>
              </h3>
              <Autocomplete
                data={ORDER_DOCUMENT_NUMBERS}
                value={selectedOrder}
                onChange={setSelectedOrder}
                placeholder="Select an order..."
                disabled={false}
                className="w-full"
                styles={{
                  input: {
                    "&:focus": {
                      borderColor: "var(--primary)",
                    },
                    height: "40px",
                  },
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">P.O Number</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.poNumber}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">
                P.O Date <span className="text-red-500">*</span>
              </h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.poDate?.toString()}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">
                  Supplier Name <span className="text-red-500">*</span>
                </h3>
              </div>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.supplierName}
              </div>
            </div>
          </div>

          {/* Second Row: Payment Mode, Due Days, Payment Date, Supplier Number, Supplier Status, Supplier Group */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Mode</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.paymentMode}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Due Days</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.dueDays} days
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Payment Date</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.paymentDate?.toString()}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Number</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.supplierNumber}
              </div>
            </div>

            {/* Third Row: Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Supplier Status</h3>
                <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      orderData.supplierStatus === "Active"
                        ? "bg-green-100 text-green-800"
                        : orderData.supplierStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : orderData.supplierStatus === "Suspended"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {orderData.supplierStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Supplier Group</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.supplierGroup}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Remarks</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.remarks}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium mb-1">Country</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.country}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-1">State</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.state}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-1">City</h3>
              <div className="w-full py-2 text-gray-500 font-normal text-md min-h-[40px] flex items-center">
                {orderData.city}
              </div>
            </div>{" "}
          </div>

          {/* Row 6: Status Switches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Active Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <Switch
                checked={orderData.isActive}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Draft Switch */}
            <div className="">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <Switch
                checked={orderData.isDraft}
                disabled
                className={`data-[state=unchecked]:bg-gray-600`}
              />
            </div>

            {/* Delete/Restore Button */}
            <div className="">
              <h3 className="font-medium mb-1">
                {orderData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDeleteRestore}
                disabled={orderData.isDeleted}
                className="disabled:cursor-not-allowed disabled:text-gray-400"
              >
                {orderData.isDeleted ? (
                  <Undo size={20} className="text-blue-500" />
                ) : (
                  <Trash2 size={20} className="text-red-600" />
                )}
              </Button>
            </div>
          </div>

          {/* Row 7: Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="">
              <h3 className="font-medium mb-1">Created</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(orderData.createdAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Updated</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(orderData.updatedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(orderData.draftedAt)}
              </p>
            </div>
            <div className="">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p className="text-gray-500 text-md font-normal">
                {getRelativeTime(orderData.deletedAt)}
              </p>
            </div>
          </div>

          {/* Supplier Visual */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-medium mb-2 text-center">Supplier</h3>
            <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-110 transition duration-300">
              <div
                className={`w-full h-full flex items-center justify-center text-white font-bold text-lg ${getInitialsColor(
                  orderData.documentNumber
                )}`}
              >
                {getSupplierInitials(orderData.supplierName)}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
              {orderData.supplierName}
            </p>
          </div>

          {/*  Order Items Table */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">
                Order Items
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
                          {item.Rate}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.Disc}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.DiscAmt}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.ExcludingVAT}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.VAT}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.VATAmount}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                          {item.IncludingVAT}
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
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="sticky bottom-0 z-30 bg-white dark:bg-gray-800 border-t px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Switch
                  checked={keepChanges}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={setKeepChanges}
                />
                <span className="dark:text-gray-200">{t("button.keep")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={pdfChecked}
                  className="data-[state=checked]:bg-blue-400"
                  onCheckedChange={handlePDFSwitchChange}
                />
                <span className="dark:text-gray-200">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={printEnabled}
                  onCheckedChange={handleSwitchChange}
                  className="data-[state=checked]:bg-blue-400"
                />
                <span className="dark:text-gray-200">Print</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="gap-2 text-primary rounded-full cursor-pointer border-primary"
                onClick={() => setIsOptionModalOpen(true)}
              >
                <span className="hidden sm:inline">History</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        size="50%"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        withCloseButton={false}
        styles={{
          body: {
            height: "720px", // Fixed height in pixels
            overflow: "hidden",
            padding: 4,
          },
          content: {
            // height: "80vh", // Fixed height - 80% of viewport height
            display: "flex",
            flexDirection: "column",
          },
          header: {
            flexShrink: 0,
          },
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-lg font-semibold text-blue-600">
              {t("form.orderHistory")}
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockHistoryData} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
