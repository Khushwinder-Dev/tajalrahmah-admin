/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import StatusDateDisplay from "@/components/common/create-page-components/StatusDateDisplay";
import ToggleStatusControls from "@/components/common/create-page-components/ToggleStatusControls";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import { Button } from "@/components/ui/button";

import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  isEdit?: boolean;
};

type Customer = {
  customerNo: string; // required
  customerName: string; // required
  shortName?: string;

  vatNumber?: string;
  vendorCode?: string;
  paymentMode: "Cash" | "Card" | "Bank Transfer" | "Mobile Payment"; // required
  currency: "USD" | "EUR" | "BDT" | "INR" | "GBP"; // required
  phone?: string;
  fax?: string;
  mobile?: string;
  whatsapp?: string;
  country: string; // required
  state: string; // required
  city?: string;
  postCode?: string;
  address?: string;
  email?: string;
  website?: string;
  language: "English" | "Bengali" | "Hindi" | "Spanish" | "French"; // required
  locationUrl?: string;
  flag: string | null;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;

  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
};

const initialData: Customer = {
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

export default function CustomerCreatePage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Customer>({
    customerNo: "",
    customerName: "",
    shortName: "",

    vatNumber: "",
    vendorCode: "",
    paymentMode: "Cash",
    currency: "USD",
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
    language: "English",
    locationUrl: "",
    flag: null,

    isDefault: false,
    isActive: true,
    isDraft: false,

    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
    isDeleted: false,
  });

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        flag: null,
      });
      if (initialData.flag) {
        setImagePreview(initialData.flag);
      }
    }
  }, [isEdit]);

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  // Handle image file selection
  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, flag: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handle form reset
  const handleReset = () => {
    if (window.confirm(t("form.resetConfirm"))) {
      setFormData({
        customerNo: "",
        customerName: "",
        shortName: "",

        vatNumber: "",
        vendorCode: "",
        paymentMode: "Cash",
        currency: "USD",
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
        language: "English",
        locationUrl: "",
        flag: null,
        isDefault: false,
        isActive: true,
        isDraft: false,
        createdAt: new Date(),
        draftedAt: null,
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false,
      });
      setImagePreview(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePrint = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Reservation Report",
        data: printData,
        fieldLabels: {
          name: "Full Name",
          email: "Email Address",
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
    if (checked && formData) {
      // Small delay to allow switch animation to complete
      setTimeout(() => handlePrint(formData), 100);
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
      console.log("customerData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Customer Details"
          subtitle="Customer Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customers-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <>
      <PageLayout
        title={isEdit ? t("form.editingCustomer") : t("form.creatingCustomer")}
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/customers"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/customers/create");
              } else {
                // Navigate to edit page
                navigate("/customers/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/customers/view");
            },
          },
        ]}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={handlePDFSwitchChange}
        printEnabled={printEnabled}
        onPrintToggle={handleSwitchChange}
        additionalFooterButtons={
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={handleReset}
            >
              {t("button.reset")}
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-primary rounded-full border-primary"
              onClick={() => formRef.current?.requestSubmit()}
            >
              {t("button.submit")}
            </Button>
          </div>
        }
        className="w-full"
      >
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* First Row: Code, Calling Code, Country */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.customerNo")}</h3>
              <EditableInput
                type="text"
                id="customerNo"
                name="customerNo"
                className="w-full h-10"
                value={formData.customerNo}
                onChange={handleChange}
                onNext={() => focusNextInput("customerName")}
                setRef={setRef("customerNo")}
                tooltipText="Please enter customer number"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.customerName")}</h3>
              <EditableInput
                type="text"
                id="customerName"
                name="customerName"
                className="w-full h-10"
                value={formData.customerName}
                onChange={handleChange}
                onNext={() => focusNextInput("shortName")}
                setRef={setRef("customerName")}
                tooltipText="Please enter customer name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.shortName")}</h3>
              <EditableInput
                type="text"
                id="shortName"
                name="shortName"
                className="w-full h-10"
                value={formData.shortName ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("vatNumber")}
                setRef={setRef("shortName")}
                tooltipText="Please enter short name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.vatNumber")}</h3>
              <EditableInput
                type="text"
                id="vatNumber"
                name="vatNumber"
                className="w-full h-10"
                value={formData.vatNumber ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("vendorCode")}
                setRef={setRef("vatNumber")}
                tooltipText="Please enter VAT number"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.vendorCode")}</h3>
              <EditableInput
                type="text"
                id="vendorCode"
                name="vendorCode"
                className="w-full h-10"
                value={formData.vendorCode ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("currency")}
                setRef={setRef("vendorCode")}
                tooltipText="Please enter vendor code"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.currency")}</h3>
              <EditableInput
                type="text"
                id="currency"
                name="currency"
                className="w-full h-10"
                value={formData.currency ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("phone")}
                setRef={setRef("currency")}
                tooltipText="Please enter currency"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.phone")}</h3>
              <EditableInput
                type="text"
                id="phone"
                name="phone"
                className="w-full h-10"
                value={formData.phone ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("fax")}
                setRef={setRef("phone")}
                tooltipText="Please enter phone"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.fax")}</h3>
              <EditableInput
                type="text"
                id="fax"
                name="fax"
                className="w-full h-10"
                value={formData.fax ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("mobile")}
                setRef={setRef("fax")}
                tooltipText="Please enter fax"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.mobile")}</h3>
              <EditableInput
                type="text"
                id="mobile"
                name="mobile"
                className="w-full h-10"
                value={formData.mobile ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("whatsapp")}
                setRef={setRef("mobile")}
                tooltipText="Please enter mobile"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.whatsapp")}</h3>
              <EditableInput
                type="text"
                id="whatsapp"
                name="whatsapp"
                className="w-full h-10"
                value={formData.whatsapp ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                setRef={setRef("whatsapp")}
                tooltipText="Please enter whatsapp"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.country")}</h3>
              <EditableInput
                type="text"
                id="country"
                name="country"
                className="w-full h-10"
                value={formData.country ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                setRef={setRef("country")}
                tooltipText="Please enter country"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.state")}</h3>
              <EditableInput
                type="text"
                id="state"
                name="state"
                className="w-full h-10"
                value={formData.state ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("city")}
                setRef={setRef("state")}
                tooltipText="Please enter state"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.city")}</h3>
              <EditableInput
                type="text"
                id="city"
                name="city"
                className="w-full h-10"
                value={formData.city ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("postCode")}
                setRef={setRef("city")}
                tooltipText="Please enter city"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.postCode")}</h3>
              <EditableInput
                type="text"
                id="postCode"
                name="postCode"
                className="w-full h-10"
                value={formData.postCode ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("address")}
                setRef={setRef("postCode")}
                tooltipText="Please enter post code"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.address")}</h3>
              <EditableInput
                type="text"
                id="address"
                name="address"
                className="w-full h-10"
                value={formData.address ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                setRef={setRef("address")}
                tooltipText="Please enter address"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
              <EditableInput
                type="text"
                id="email"
                name="email"
                className="w-full h-10"
                value={formData.email ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("website")}
                setRef={setRef("email")}
                tooltipText="Please enter email"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.website")}</h3>
              <EditableInput
                type="text"
                id="website"
                name="website"
                className="w-full h-10"
                value={formData.website ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("language")}
                setRef={setRef("website")}
                tooltipText="Please enter website"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.language")}</h3>
              <EditableInput
                type="text"
                id="language"
                name="language"
                className="w-full h-10"
                value={formData.language ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("locationUrl")}
                setRef={setRef("language")}
                tooltipText="Please enter language"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.locationUrl")}</h3>
              <EditableInput
                type="text"
                id="locationUrl"
                name="locationUrl"
                className="w-full h-10"
                value={formData.locationUrl ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("paymentMode")}
                setRef={setRef("locationUrl")}
                tooltipText="Please enter location url"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.paymentMode")}</h3>
              <EditableInput
                type="text"
                id="paymentMode"
                name="paymentMode"
                className="w-full h-10"
                value={formData.paymentMode ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("isDefault")}
                setRef={setRef("paymentMode")}
                tooltipText="Please enter payment mode. EG: Cash, Bank Transfer."
                required
              />
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <ToggleStatusControls
            formData={formData}
            setFormData={setFormData}
            focusNextInput={focusNextInput}
            setRef={setRef}
            lastField="fileUploadElement"
          />

          {/* Third Row: Dates */}
          <StatusDateDisplay formData={formData} />

          {/* Flag Upload */}
          <div className="space-y-2">
            <h3 className="font-medium mb-1">{t("form.customerLogo")}</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              tabIndex={0}
              ref={(el) => setRef("fileUploadElement")(el as HTMLElement)}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  triggerFileInput();
                }
              }}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt={t("form.flagPreview")}
                    className="w-40 h-28 object-contain rounded-md"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                      setFormData({ ...formData, flag: null });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {t("form.dragDropImage")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t("form.orClickToSelect")}
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </form>
      </PageLayout>

      {/* Options Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        title="Options"
        size="xl"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <div className="pt-5 pb-14 px-5">Modal Content</div>
      </Modal>
    </>
  );
}
