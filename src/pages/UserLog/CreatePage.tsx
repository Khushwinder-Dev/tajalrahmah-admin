/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
// import { FloatingSelect } from "@/components/common/FloatingSelect";

type FakeData = {
  id: number;
  supplierName: string;
  code: string;
  country: string;
  currency: string;
  paymentTerms: string;
  paymentType: string;
  dueDay: string;
  depositType: string;
  depositAmount: string;
  exchangeRate: string;
  localAmt: string;
  reference: string;
  poBox: string;
  contactPerson: string;
  landMark: string;
  zip: string;
  notification: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  createdAt: string | null;
  updatedAt: string | null;
  draftedAt: string | null;
  actionMessage: string;
  isActive: boolean;
  isDraft: boolean;
  isDefault: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: FakeData = {
  id: 12,
  supplierName: "",
  code: "",
  country: "",
  currency: "",
  paymentTerms: "",
  paymentType: "",
  dueDay: "",
  depositType: "",
  depositAmount: "",
  exchangeRate: "",
  localAmt: "",
  reference: "",
  poBox: "",
  contactPerson: "",
  landMark: "",
  zip: "",
  notification: "",
  address: "",
  phone: "",
  fax: "",
  email: "",
  website: "",
  createdAt: "2023-01-15",
  updatedAt: "2023-11-20",
  draftedAt: "2023-01-10",
  actionMessage: "",
  isActive: true,
  isDraft: false,
  isDefault: false,
  isDeleted: false,
  isUpdated: false,
};

export default function SupplierMasterFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks - similar to CountryDetails.tsx
  const canCreate: boolean = usePermission("supplierMaster", "create");
  const canView: boolean = usePermission("supplierMaster", "view");
  console.log("canCreate", canCreate);
  // console.log("canView", canView);
  // console.log("canEdit", canEdit);
  // console.log("canDelete", canDelete);

  // Field-level permissions
  const name: boolean = usePermission("supplierMaster", "create", "name");
  const isDefault: boolean = usePermission(
    "supplierMaster",
    "create",
    "isDefault"
  );
  const isDraft: boolean = usePermission("supplierMaster", "create", "isDraft");
  const canPdf: boolean = usePermission("supplierMaster", "pdf");
  const canPrint: boolean = usePermission("supplierMaster", "print");

  // console.log("assetName", assetName);
  // console.log("canCreate", canCreate);
  console.log("initialData", initialData, name);
  // console.log("isDefault", isDefault);
  // console.log("isDraft", isDraft);
  // console.log("flag", flag);
  // console.log("canPdf", canPdf);
  // console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<FakeData>({
    id: 1,
    supplierName: "",
    code: "",
    country: "",
    currency: "",
    paymentTerms: "",
    paymentType: "",
    dueDay: "",
    depositType: "",
    depositAmount: "",
    exchangeRate: "",
    localAmt: "",
    reference: "",
    poBox: "",
    contactPerson: "",
    landMark: "",
    zip: "",
    notification: "",
    address: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    actionMessage: "",
    isActive: true,
    isDraft: false,
    isDefault: false,
    isDeleted: false,
    isUpdated: false,
  });

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/supplier-master/create");
        } else {
          navigate("/supplier-master/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/supplier-master/view");
      },
      // Only show if user has permission
      show: canView,
    },
  ]);

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)------------

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintCountry(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Transport Master successfully!");
      handleReset();
    } else {
      toastSuccess("Transport Master successfully!");
      navigate("/supplier-master");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      id: 0,
      supplierName: "",
      code: "",
      country: "",
      currency: "",
      paymentTerms: "",
      paymentType: "",
      dueDay: "",
      depositType: "",
      depositAmount: "",
      exchangeRate: "",
      localAmt: "",
      reference: "",
      poBox: "",
      contactPerson: "",
      landMark: "",
      zip: "",
      notification: "",
      address: "",
      phone: "",
      fax: "",
      email: "",
      website: "",
      createdAt: "",
      updatedAt: "",
      draftedAt: null,
      actionMessage: "",
      isActive: true,
      isDraft: false,
      isDefault: false,
      isDeleted: false,
      isUpdated: false,
    });

    setIsDefaultState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const handlePrintCountry = (countryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Transport Details",
        data: [countryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          transporterName: "Transporter Name",
          landMark: "Landmark",
          notification: "Notification",
          contactPerson: "Contact Person",
          phone: "Phone",
          fax: "Fax",
          email: "Email",
          website: "Website",
          isDefault: "Default Country",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          rating: "Rating",
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
    // if (checked && formData) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handlePrintCountry(formData), 100);
    // }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    // if (pdfChecked) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handleExportPDF(), 100);
    // }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("FakeData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Transport Details"
          subtitle="Transport Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Transport-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      // Filter out any existing draft option first
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

      // Add draft option only if not already a draft
      if (!formData.isDraft) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Transport saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={
          isEdit ? labels.editingSupplierMaster : labels.creatingSupplierMaster
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="supplier-master"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        // Removed onExport prop
        additionalFooterButtons={
          // Only show buttons if user can create
          canCreate ? (
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                className="gap-2 text-primary bg-sky-200 hover:bg-primary rounded-full border-primary w-32 font-semibold!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
              >
                {labels.submit}
              </Button>
            </div>
          ) : null
        }
        className="w-full"
      >
        <div dir={isRTL ? "rtl" : "ltr"}>
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6 relative"
          >
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* field - only show if user can create */}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("supplierName")}
                      id="supplierName"
                      name="supplierName"
                      value={formData.supplierName}
                      onChange={handleChange}
                      onNext={() => focusNextInput("code")}
                      onCancel={() =>
                        setFormData({ ...formData, supplierName: "" })
                      }
                      labelText={labels.supplierNameTooltip}
                      tooltipText={labels.supplierNameTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("code")}
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      onNext={() => focusNextInput("country")}
                      onCancel={() =>
                        setFormData({ ...formData, code: "COD-571" })
                      }
                      labelText={labels.codeTooltip}
                      tooltipText={labels.codeTooltip}
                      required
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    options={["Bahamas", "Barbados", "Jamaica", "Trinidad"]}
                    value={formData.country}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        country: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("currency");
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("currency");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.countryTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={["BDT", "INR", "USD", "EUR"]}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("paymentTerms");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("paymentTerms");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.currencyTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentTerms")(el)}
                    id="paymentTerms"
                    name="paymentTerms"
                    options={["Net 15", "Net 30", "Net 45", "Net 60"]}
                    value={formData.paymentTerms}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentTerms: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("dueDay");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentTerms) {
                        focusNextInput("dueDay");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.paymentTermsTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("dueDay")(el)}
                    id="dueDay"
                    name="dueDay"
                    options={["1st", "2nd", "3rd", "4th"]}
                    value={formData.dueDay}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        dueDay: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("depositType");
                    }}
                    onEnterPress={() => {
                      if (formData.dueDay) {
                        focusNextInput("depositType");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.dueDayTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("depositType")(el)}
                    id="depositType"
                    name="depositType"
                    options={["Cash", "Cheque", "Bank Transfer"]}
                    value={formData.depositType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        depositType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("depositAmount");
                    }}
                    onEnterPress={() => {
                      if (formData.depositType) {
                        focusNextInput("depositAmount");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.depositTypeTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("depositAmount")}
                      id="depositAmount"
                      name="depositAmount"
                      value={formData.depositAmount}
                      onChange={handleChange}
                      onNext={() => focusNextInput("paymentType")}
                      onCancel={() =>
                        setFormData({ ...formData, depositAmount: "" })
                      }
                      labelText={labels.depositAmountTooltip}
                      tooltipText={labels.depositAmountTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentType")(el)}
                    id="paymentType"
                    name="paymentType"
                    options={["Cash", "Cheque", "Bank Transfer"]}
                    value={formData.paymentType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("currency");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentType) {
                        focusNextInput("currency");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.paymentTypeTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={["USD", "EUR", "GBP"]}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("exchangeRate");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("exchangeRate");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.currencyTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("exchangeRate")}
                      id="exchangeRate"
                      name="exchangeRate"
                      value={formData.exchangeRate}
                      onChange={handleChange}
                      onNext={() => focusNextInput("localAmt")}
                      onCancel={() =>
                        setFormData({ ...formData, exchangeRate: "" })
                      }
                      labelText={labels.exchangeRateTooltip}
                      tooltipText={labels.exchangeRateTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("localAmt")}
                      id="localAmt"
                      name="localAmt"
                      value={formData.localAmt}
                      onChange={handleChange}
                      onNext={() => focusNextInput("notification")}
                      onCancel={() =>
                        setFormData({ ...formData, localAmt: "" })
                      }
                      labelText={labels.localAmtTooltip}
                      tooltipText={labels.localAmtTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("notification")(el)}
                    id="notification"
                    name="notification"
                    options={["Yes", "No"]}
                    value={formData.notification}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        notification: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("address");
                    }}
                    onEnterPress={() => {
                      if (formData.notification) {
                        focusNextInput("address");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.notificationTooltip}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("landMark")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText={labels.addressTooltip}
                    tooltipText={labels.addressTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("landMark")}
                    id="landMark"
                    name="landMark"
                    value={formData.landMark}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reference")}
                    onCancel={() => setFormData({ ...formData, landMark: "" })}
                    labelText={labels.landMarkTooltip}
                    tooltipText={labels.landMarkTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("reference")}
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("contactPerson")}
                    onCancel={() => setFormData({ ...formData, reference: "" })}
                    labelText={labels.referenceTooltip}
                    tooltipText={labels.referenceTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("contactPerson")}
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phone")}
                    onCancel={() =>
                      setFormData({ ...formData, contactPerson: "" })
                    }
                    labelText={labels.contactPersonTooltip}
                    tooltipText={labels.contactPersonTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("phone")}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("poBox")}
                    onCancel={() => setFormData({ ...formData, phone: "" })}
                    labelText={labels.phoneTooltip}
                    tooltipText={labels.phoneTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("poBox")}
                    id="poBox"
                    name="poBox"
                    value={formData.poBox}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, poBox: "" })}
                    labelText={labels.poBoxTooltip}
                    tooltipText={labels.poBoxTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fax")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText={labels.emailTooltip}
                    tooltipText={labels.emailTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("fax")}
                    id="fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    onNext={() => focusNextInput("zip")}
                    onCancel={() => setFormData({ ...formData, fax: "" })}
                    labelText={labels.faxTooltip}
                    tooltipText={labels.faxTooltip}
                    required
                  />
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("zip")}
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    onNext={() => focusNextInput("website")}
                    onCancel={() => setFormData({ ...formData, zip: "" })}
                    labelText={labels.zipTooltip}
                    tooltipText={labels.zipTooltip}
                    required
                  />
                </div>
              )}

              {/* field - only show if user can create */}
              {canCreate && (
                <div className="md:col-span-3 space-y-2 relative">
                  <EditableInput
                    setRef={setRef("website")}
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText={labels.websiteTooltip}
                    tooltipText={labels.websiteTooltip}
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={[labels.no, labels.yes]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === labels.yes;
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.default}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Draft field - only show if user can create */}
              {isDraft && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={[labels.no, labels.yes]}
                    value={isDraftState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === labels.yes;
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("fileUploadElement");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("fileUploadElement");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.draft}
                    className="relative"
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </PageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />

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
