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
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import PageLayout from "@/components/common/PageLayout";

const MOCK_COUNTRIES = [
  {
    customerNo: "CUST001", // *
    customerName: "Global Tech Ltd", // *
    shortName: "GTL",

    vatNumber: "VAT123456",
    vendorCode: "VEND001",
    paymentMode: "Bank Transfer", // *
    currency: "USD", // *
    phone: "+1-202-555-0100",
    fax: "+1-202-555-0110",
    mobile: "+1-202-555-0120",
    whatsapp: "+1-202-555-0120",
    country: "United States", // *
    state: "California", // *
    city: "Los Angeles",
    postCode: "90001",
    address: "123 Innovation Drive",
    email: "info@globaltech.com",
    website: "https://globaltech.com",
    language: "English", // *
    locationUrl: "https://maps.example.com/globaltech",
    flag: "/customer-dummy-image.jpg",

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  },
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

const COUNTRY_DATA = MOCK_COUNTRIES.map((country) => country.customerNo);

export default function CustomerDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("CUST001");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);

  let customerData = {
    customerNo: "CUST001", // *
    customerName: "Global Tech Ltd", // *
    shortName: "GTL",

    vatNumber: "VAT123456",
    vendorCode: "VEND001",
    paymentMode: "Bank Transfer", // *
    currency: "USD", // *
    phone: "+1-202-555-0100",
    fax: "+1-202-555-0110",
    mobile: "+1-202-555-0120",
    whatsapp: "+1-202-555-0120",
    country: "United States", // *
    state: "California", // *
    city: "Los Angeles",
    postCode: "90001",
    address: "123 Innovation Drive",
    email: "info@globaltech.com",
    website: "https://globaltech.com",
    language: "English", // *
    locationUrl: "https://maps.example.com/globaltech",
    flag: "/customer-dummy-image.jpg",

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: new Date(),
    draftedAt: null,
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  };

  //   let countryData = {
  //     code: selectedCountry,
  //     callingCode:
  //       MOCK_COUNTRIES.find((c) => c.code === selectedCountry)?.callingCode ||
  //       "+1",
  //     title:
  //       MOCK_COUNTRIES.find((c) => c.code === selectedCountry)?.name ||
  //       "United States",
  //     isDefault: true,
  //     isActive: true,
  //     isDraft: false,
  //     isDeleted: false,
  //     flag: "https://flagcdn.com/us.svg",
  //     createdAt: "2023-05-15T10:30:00Z",
  //     updatedAt: "2023-11-20T14:45:00Z",
  //     draftedAt: "2025-05-20T14:45:00Z",
  //     deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  //   };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      customerData = {
        customerNo: "",
        customerName: "",
        shortName: "",
        vatNumber: "",
        vendorCode: "",
        paymentMode: "",
        currency: "",
        phone: "",
        fax: "",
        mobile: "",
        whatsapp: "",
        country: "",
        state: "",
        city: "",
        postCode: "",
        address: "",
        email: "",
        website: "",
        language: "",
        locationUrl: "",
        flag: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        draftedAt: null,
        deletedAt: null,
      };
    }
  }, []);

  const handlePrintCountry = (customerData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Customer Report",
        data: customerData,
        fieldLabels: {
          customerNo: "Customer No",
          customerName: "Customer Name",
          shortName: "Short Name",
          vatNumber: "VAT Number",
          vendorCode: "Vendor Code",
          paymentMode: "Payment Mode",
          currency: "Currency",
          phone: "Phone",
          fax: "Fax",
          mobile: "Mobile",
          whatsapp: "WhatsApp",
          country: "Country",
          state: "State",
          city: "City",
          postCode: "Post Code",
          address: "Address",
          email: "Email",
          website: "Website",
          language: "Language",
          locationUrl: "Location URL",
          flag: "Flag",
          isDefault: "Is Default",
          isActive: "Is Active",
          isDraft: "Is Draft",
          isDeleted: "Is Deleted",
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
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrintCountry(customerData), 100);
    }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    if (pdfChecked) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handleExportPDF(), 100);
    }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("customerData on pdf click", customerData);
      const blob = await pdf(
        <GenericPDF
          data={[customerData]}
          title="Customer Details"
          subtitle="Customer Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-details.pdf";
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
    console.log(customerData.isDeleted ? "Restoring..." : "Deleting...");

  const getRelativeTime = (dateString: string | null) => {
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

  return (
    <>
      <PageLayout
        title={t("button.viewingCustomer")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        onListClick={() => navigate("/customers")}
        listText="List"
        listPath="/customers"
        popoverOptions={[
          {
            label: "Create",
            onClick: () => navigate("/customers/create"),
          },
          {
            label: "Edit",
            onClick: () => navigate("/customers/edit/1"),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        onHistoryClick={() => setIsOptionModalOpen(true)}
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Customer No</h3>
            <Autocomplete
              data={COUNTRY_DATA}
              value={selectedCustomer}
              onChange={setSelectedCustomer}
              placeholder="Select a country..."
              display="name"
              disabled={false}
              className="w-full"
              styles={{
                input: {
                  "&:focus": {
                    borderColor: "var(--primary)",
                  },
                },
              }}
            />
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Customer Name</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.customerName}
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Short Name</h3>
            </div>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.shortName}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">VAT Number</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.vatNumber}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Vendor Code</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.vendorCode}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Payment Mode</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.paymentMode}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Currency</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.currency}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Phone</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.phone}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Fax</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.fax}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Mobile</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.mobile}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Whatsapp</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.whatsapp}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Post Code</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.postCode}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Address</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.address}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Website</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.website}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Language</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.language}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Location URL</h3>
            <div className="w-full px-1 py-1 text-gray-500 font-normal text-md">
              {customerData.locationUrl}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Default Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Default</h3>
            <Switch
              checked={customerData.isDefault}
              disabled
              className={` data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Active Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Active</h3>
            <Switch
              checked={customerData.isActive}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Draft Switch */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Draft</h3>
            <Switch
              checked={customerData.isDraft}
              disabled
              className={`data-[state=unchecked]:bg-gray-600`}
            />
          </div>

          {/* Delete/Restore Button */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">
              {customerData.isDeleted ? "Restore" : "Delete"}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteRestore}
              disabled={customerData.isDeleted}
              className="disabled:cursor-not-allowed disabled:text-gray-400"
            >
              {customerData.isDeleted ? (
                <Undo size={20} className="text-blue-500" />
              ) : (
                <Trash2 size={20} className="text-red-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Created</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(customerData.createdAt?.toString() || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Updated</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(customerData.updatedAt?.toString() || "")}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Drafted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(customerData.draftedAt)}
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-medium mb-1">Deleted</h3>
            <p className="text-gray-500 text-md font-normal">
              {getRelativeTime(customerData.deletedAt)}
            </p>
          </div>
        </div>

        {/* Flag */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-medium mb-2 text-center">Flag</h3>
          <div className="w-32 h-20 border rounded-md bg-gray-100 overflow-hidden dark:bg-gray-700 mx-auto hover:scale-120 transition duration-300">
            {customerData.flag ? (
              <img
                src={customerData.flag}
                alt="Flag"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No flag
              </div>
            )}
          </div>
        </div>
      </PageLayout>

      {/* History Modal */}
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
              Customer History
            </span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockHistoryData} />
        </Modal.Body>
      </Modal>
    </>
  );
}
