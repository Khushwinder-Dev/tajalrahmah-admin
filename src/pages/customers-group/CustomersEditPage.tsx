/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Modal } from "@mantine/core";
import video from "@/assets/videos/test.mp4";
import GenericPDF from "@/components/common/pdf";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import PageLayout from "@/components/common/PageLayout";
import { useNavigate } from "react-router-dom";

type Props = {
  isEdit?: boolean;
};

type CustomerGroup = {
  customerNo: string; // required
  customerGroupName: string; // required
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

const initialData: CustomerGroup = {
  customerNo: "CUST001", // *
  customerGroupName: "Global Tech Ltd", // *
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

export default function CustomerEditPage({ isEdit = false }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keepCreating, setKeepCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const customerNoInputRef = useRef<EditableInputRef>(null);
  const customerNameInputRef = useRef<EditableInputRef>(null);
  const shortNameInputRef = useRef<EditableInputRef>(null);
  const vendorCodeInputRef = useRef<EditableInputRef>(null);
  const vatNumberInputRef = useRef<EditableInputRef>(null);
  const currencyInputRef = useRef<EditableInputRef>(null);
  const phoneInputRef = useRef<EditableInputRef>(null);
  const faxInputRef = useRef<EditableInputRef>(null);
  const mobileInputRef = useRef<EditableInputRef>(null);
  const whatsappInputRef = useRef<EditableInputRef>(null);
  const countryInputRef = useRef<EditableInputRef>(null);
  const stateInputRef = useRef<EditableInputRef>(null);
  const cityInputRef = useRef<EditableInputRef>(null);
  const postCodeInputRef = useRef<EditableInputRef>(null);
  const addressInputRef = useRef<EditableInputRef>(null);
  const emailInputRef = useRef<EditableInputRef>(null);
  const websiteInputRef = useRef<EditableInputRef>(null);
  const languageInputRef = useRef<EditableInputRef>(null);
  const locationUrlInputRef = useRef<EditableInputRef>(null);
  const paymentModeInputRef = useRef<EditableInputRef>(null);

  const defaultSwitchRef = useRef<HTMLButtonElement>(null);
  const activeSwitchRef = useRef<HTMLButtonElement>(null);
  const draftSwitchRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const flagUploadRef = useRef<HTMLInputElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CustomerGroup>({
    customerNo: "",
    customerGroupName: "",
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

  // Update the focusNextInput function to include all form elements
  const focusNextInput = (currentField: string) => {
    console.log("Current field:", currentField);
    switch (currentField) {
      case "customerNo":
        customerNameInputRef.current?.focus();
        break;
      case "customerGroupName":
        shortNameInputRef.current?.focus();
        break;
      case "shortName":
        vatNumberInputRef.current?.focus();
        break;
      case "vatNumber":
        vendorCodeInputRef.current?.focus();
        break;
      case "vendorCode":
        currencyInputRef.current?.focus();
        break;
      case "currency":
        phoneInputRef.current?.focus();
        break;
      case "phone":
        faxInputRef.current?.focus();
        break;
      case "fax":
        mobileInputRef.current?.focus();
        break;
      case "mobile":
        whatsappInputRef.current?.focus();
        break;
      case "whatsapp":
        countryInputRef.current?.focus();
        break;
      case "country":
        stateInputRef.current?.focus();
        break;
      case "state":
        cityInputRef.current?.focus();
        break;
      case "city":
        postCodeInputRef.current?.focus();
        break;
      case "postCode":
        addressInputRef.current?.focus();
        break;
      case "address":
        emailInputRef.current?.focus();
        break;
      case "email":
        websiteInputRef.current?.focus();
        break;
      case "website":
        languageInputRef.current?.focus();
        break;
      case "language":
        locationUrlInputRef.current?.focus();
        break;
      case "locationUrl":
        paymentModeInputRef.current?.focus();
        break;
      case "paymentMode":
        defaultSwitchRef.current?.focus();
        break;
      case "default":
        activeSwitchRef.current?.focus();
        break;
      case "active":
        draftSwitchRef.current?.focus();
        break;
      case "draft":
        deleteButtonRef.current?.focus();
        break;
      case "delete":
        flagUploadRef.current?.focus();
        break;
      default:
        break;
    }
  };

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

  // Add this function to handle key navigation for switches and buttons
  const handleSwitchKeyDown = (
    e: React.KeyboardEvent,
    currentField: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Trigger the switch/button action first
      switch (currentField) {
        case "default":
          setFormData({ ...formData, isDefault: !formData.isDefault });
          break;
        case "active":
          setFormData({ ...formData, isActive: !formData.isActive });
          break;
        case "draft":
          setFormData({ ...formData, isDraft: !formData.isDraft });
          break;
        case "delete":
          setFormData({ ...formData, isDeleted: !formData.isDeleted });
          break;
      }
      // Then move to next field
      setTimeout(() => focusNextInput(currentField), 50);
    }
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
        customerGroupName: "",
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

  const handlePrintCountry = (customerData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Customer Report",
        data: customerData,
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
      setTimeout(() => handlePrintCountry(formData), 100);
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
        title={
          isEdit
            ? t("form.editingCustomerGroup")
            : t("form.creatingCustomerGroup")
        }
        videoSrc={video}
        videoHeader="Rapid ERP Video"
        listPath="/customer-group"
        popoverOptions={[
          {
            label: isEdit ? "Create" : "Edit",
            onClick: () => {
              // Handle navigation based on current state
              if (isEdit) {
                // Navigate to create page
                navigate("/customer-group/create");
              } else {
                // Navigate to edit page
                navigate("/customer-group/edit/undefined");
              }
            },
          },
          {
            label: "View",
            onClick: () => {
              navigate("/customer-group/view");
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
                ref={customerNoInputRef}
                id="customerNo"
                name="customerNo"
                className="w-full h-10"
                value={formData.customerNo}
                onChange={handleChange}
                onNext={() => focusNextInput("customerNo")}
                onCancel={() => {}}
                tooltipText="Please enter customer number"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.customerGroupName")}</h3>
              <EditableInput
                ref={customerNameInputRef}
                id="customerGroupName"
                name="customerGroupName"
                className="w-full h-10"
                value={formData.customerGroupName}
                onChange={handleChange}
                onNext={() => focusNextInput("customerGroupName")}
                onCancel={() => {}}
                tooltipText="Please enter customer name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.shortName")}</h3>
              <EditableInput
                ref={shortNameInputRef}
                id="shortName"
                name="shortName"
                className="w-full h-10"
                value={formData.shortName ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("shortName")}
                onCancel={() => {}}
                tooltipText="Please enter short name"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.vatNumber")}</h3>
              <EditableInput
                ref={vatNumberInputRef}
                id="vatNumber"
                name="vatNumber"
                className="w-full h-10"
                value={formData.vatNumber ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("vatNumber")}
                onCancel={() => {}}
                tooltipText="Please enter VAT number"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.vendorCode")}</h3>
              <EditableInput
                ref={vendorCodeInputRef}
                id="vendorCode"
                name="vendorCode"
                className="w-full h-10"
                value={formData.vendorCode ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("vendorCode")}
                onCancel={() => {}}
                tooltipText="Please enter vendor code"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.currency")}</h3>
              <EditableInput
                ref={currencyInputRef}
                id="currency"
                name="currency"
                className="w-full h-10"
                value={formData.currency ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("currency")}
                onCancel={() => {}}
                tooltipText="Please enter currency"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.phone")}</h3>
              <EditableInput
                ref={phoneInputRef}
                id="phone"
                name="phone"
                className="w-full h-10"
                value={formData.phone ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("phone")}
                onCancel={() => {}}
                tooltipText="Please enter phone"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.fax")}</h3>
              <EditableInput
                ref={faxInputRef}
                id="fax"
                name="fax"
                className="w-full h-10"
                value={formData.fax ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("fax")}
                onCancel={() => {}}
                tooltipText="Please enter fax"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.mobile")}</h3>
              <EditableInput
                ref={mobileInputRef}
                id="mobile"
                name="mobile"
                className="w-full h-10"
                value={formData.mobile ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("mobile")}
                onCancel={() => {}}
                tooltipText="Please enter mobile"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.whatsapp")}</h3>
              <EditableInput
                ref={whatsappInputRef}
                id="whatsapp"
                name="whatsapp"
                className="w-full h-10"
                value={formData.whatsapp ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("whatsapp")}
                onCancel={() => {}}
                tooltipText="Please enter whatsapp"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.country")}</h3>
              <EditableInput
                ref={countryInputRef}
                id="country"
                name="country"
                className="w-full h-10"
                value={formData.country ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("country")}
                onCancel={() => {}}
                tooltipText="Please enter country"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.state")}</h3>
              <EditableInput
                ref={stateInputRef}
                id="state"
                name="state"
                className="w-full h-10"
                value={formData.state ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("state")}
                onCancel={() => {}}
                tooltipText="Please enter state"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.city")}</h3>
              <EditableInput
                ref={cityInputRef}
                id="city"
                name="city"
                className="w-full h-10"
                value={formData.city ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("city")}
                onCancel={() => {}}
                tooltipText="Please enter city"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.postCode")}</h3>
              <EditableInput
                ref={postCodeInputRef}
                id="postCode"
                name="postCode"
                className="w-full h-10"
                value={formData.postCode ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("postCode")}
                onCancel={() => {}}
                tooltipText="Please enter post code"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.address")}</h3>
              <EditableInput
                ref={addressInputRef}
                id="address"
                name="address"
                className="w-full h-10"
                value={formData.address ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("address")}
                onCancel={() => {}}
                tooltipText="Please enter address"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.email")}</h3>
              <EditableInput
                ref={emailInputRef}
                id="email"
                name="email"
                className="w-full h-10"
                value={formData.email ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("email")}
                onCancel={() => {}}
                tooltipText="Please enter email"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.website")}</h3>
              <EditableInput
                ref={websiteInputRef}
                id="website"
                name="website"
                className="w-full h-10"
                value={formData.website ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("website")}
                onCancel={() => {}}
                tooltipText="Please enter website"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.language")}</h3>
              <EditableInput
                ref={languageInputRef}
                id="language"
                name="language"
                className="w-full h-10"
                value={formData.language ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("language")}
                onCancel={() => {}}
                tooltipText="Please enter language"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.locationUrl")}</h3>
              <EditableInput
                ref={locationUrlInputRef}
                id="locationUrl"
                name="locationUrl"
                className="w-full h-10"
                value={formData.locationUrl ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("locationUrl")}
                onCancel={() => {}}
                tooltipText="Please enter location url"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("form.paymentMode")}</h3>
              <EditableInput
                ref={paymentModeInputRef}
                id="paymentMode"
                name="paymentMode"
                className="w-full h-10"
                value={formData.paymentMode ?? ""}
                onChange={handleChange}
                onNext={() => focusNextInput("paymentMode")}
                onCancel={() => {}}
                tooltipText="Please enter payment mode. EG: Cash, Bank Transfer."
                required
              />
            </div>
          </div>

          {/* Second Row: Default, Draft, Active, Delete */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.default")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={defaultSwitchRef}
                  id="isDefault"
                  name="isDefault"
                  className=""
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "default")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.active")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={activeSwitchRef}
                  id="isActive"
                  name="isActive"
                  className=""
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "active")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">{t("common.draft")}</h3>
              <div className="h-10 flex items-center">
                <Switch
                  ref={draftSwitchRef}
                  id="isDraft"
                  name="isDraft"
                  className=""
                  checked={formData.isDraft}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDraft: checked })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "draft")}
                />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium mb-1">
                {formData.isDeleted ? t("button.restore") : t("button.delete")}
              </h3>
              <div className="h-10 flex items-center">
                <Button
                  ref={deleteButtonRef}
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isDeleted: !formData.isDeleted,
                    })
                  }
                  onKeyDown={(e) => handleSwitchKeyDown(e, "delete")}
                >
                  {formData.isDeleted ? (
                    <Undo2 className="text-green-500" />
                  ) : (
                    <Trash2 className="text-red-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Third Row: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Created</h3>
              <p>{getRelativeTime(formData.createdAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Updated</h3>
              <p>{getRelativeTime(formData.updatedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Drafted</h3>
              <p>{getRelativeTime(formData.draftedAt)}</p>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-medium mb-1">Deleted</h3>
              <p>{getRelativeTime(formData.deletedAt)}</p>
            </div>
          </div>

          {/* Flag Upload */}
          <div className="space-y-2">
            <h3 className="font-medium mb-1">{t("form.customerLogo")}</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              tabIndex={0}
              ref={flagUploadRef}
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
