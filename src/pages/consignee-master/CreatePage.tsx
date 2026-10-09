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

type Props = {
  isEdit?: boolean;
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

export default function ConsigneeMasterFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("consigneeMaster", "create");
  const canView = usePermission("consigneeMaster", "view");
  const canEdit = usePermission("consigneeMaster", "edit");
  const canDelete = usePermission("consigneeMaster", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const permissionsFields = usePermission<keyof ConsigneeData>(
    "consigneeMaster",
    "create",
    [
      "customerCode",
      "customerName",
      "notification",
      "country",
      "zipCode",
      "address",
      "landmark",
      "poBox",
      "currency",
      "paymentTerms",
      "creditPeriod",
      "creditLimit",
      "mobileNo",
      "contactPerson",
      "faxNo",
      "phoneNo",
      "email",
      "website",
      "isDefault",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("consigneeMaster", "pdf");
  const canPrint: boolean = usePermission("consigneeMaster", "print");

  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const currencyOptions = [
    "SAR",
    "AED",
    "KWD",
    "BHD",
    "QAR",
    "OMR",
    "JOD",
    "LBP",
    "EGP",
    "IQD",
    "TRY",
    "EUR",
    "USD",
    "GBP",
    "JPY",
    "CNY",
    "INR",
    "PKR",
    "BDT",
    "LKR",
  ];

  const paymentTermsOptions = [
    "Net 30",
    "Net 45",
    "Net 60",
    "Net 90",
    "Due on Receipt",
    "Cash on Delivery",
    "Advance Payment",
    "Letter of Credit",
    "Bank Transfer",
    "Check Payment",
  ];

  const creditPeriodOptions = [
    "15 days",
    "30 days",
    "45 days",
    "60 days",
    "90 days",
    "120 days",
    "180 days",
    "365 days",
  ];

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

  const contactPersonOptions = [
    "Ahmed Al-Rashid",
    "Mohammed Al-Zahrani",
    "Khalid Al-Otaibi",
    "Omar Al-Shehri",
    "Salman Al-Ghamdi",
    "Abdullah Al-Harbi",
    "Ali Al-Maktoum",
    "Fatima Al-Nahyan",
    "Hassan Al-Qasimi",
    "Rashid Al-Sharqi",
    "Nasser Al-Sabah",
    "Khalid Al-Khalifa",
    "Hamad Al-Thani",
    "Sultan Al-Said",
    "Abdullah Al-Hashemi",
    "Michel Aoun",
    "Ahmed El-Sisi",
    "Mustafa Al-Kadhimi",
    "Recep Erdogan",
    "Kyriakos Mitsotakis",
  ];

  // Form state
  const [formData, setFormData] = useState<ConsigneeData>({
    customerCode: "",
    customerName: "",
    notification: "",
    country: "",
    zipCode: "",
    address: "",
    landmark: "",
    poBox: "",
    currency: "",
    paymentTerms: "",
    creditPeriod: "",
    creditLimit: "",
    mobileNo: "",
    contactPerson: "",
    faxNo: "",
    phoneNo: "",
    website: "",
    email: "",
    isDefault: isDefaultState === "Yes",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
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
          navigate("/consignee-master/create");
        } else {
          navigate("/consignee-master/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/consignee-master/view");
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
      setIsDraftState(initialData.isDraft ? "Yes" : "No");
    }
  }, [isEdit, initialData]);

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
      handlePrintConsignee(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Consignee record created successfully!");
      handleReset();
    } else {
      toastSuccess("Consignee record created successfully!");
      navigate("/consignee-master");
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
      customerCode: "",
      customerName: "",
      notification: "",
      country: "",
      zipCode: "",
      address: "",
      landmark: "",
      poBox: "",
      currency: "",
      paymentTerms: "",
      creditPeriod: "",
      creditLimit: "",
      mobileNo: "",
      contactPerson: "",
      faxNo: "",
      phoneNo: "",
      website: "",
      email: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["customerCode"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

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
      console.log("consigneeData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
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
              toastRestore("Consignee record saved as draft successfully");
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
        title={isEdit ? "Editing Consignee" : "Creating Consignee"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="consignee-master"
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
                Reset
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
              >
                Submit
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
            {/* Basic Consignee Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.customerCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customerCode")}
                    id="customerCode"
                    name="customerCode"
                    value={formData.customerCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("customerName")}
                    onCancel={() =>
                      setFormData({ ...formData, customerCode: "" })
                    }
                    labelText="Customer Code"
                    tooltipText="Enter unique customer code (e.g., CS001, CS002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.customerName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customerName")}
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("notification")}
                    onCancel={() =>
                      setFormData({ ...formData, customerName: "" })
                    }
                    labelText="Customer Name"
                    tooltipText="Enter full customer name"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.notification && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("notification")(el)}
                    id="notification"
                    name="notification"
                    options={[
                      "Email",
                      "SMS",
                      "Email & SMS",
                      "WhatsApp",
                      "SMS & WhatsApp",
                    ]}
                    value={formData.notification}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        notification: value,
                      }));
                      focusNextInput("country");
                    }}
                    onEnterPress={() => {
                      if (formData.notification) {
                        focusNextInput("country");
                      }
                    }}
                    placeholder=" "
                    labelText="Notification"
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

              {permissionsFields.country && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    options={countryOptions}
                    value={formData.country}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        country: value,
                      }));
                      focusNextInput("zipCode");
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("zipCode");
                      }
                    }}
                    placeholder=" "
                    labelText="Country"
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

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.zipCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("zipCode")}
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() => setFormData({ ...formData, zipCode: "" })}
                    labelText="Zip Code"
                    tooltipText="Enter postal/zip code"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.address && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("landmark")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter customer address"
                    required
                    maxLength={200}
                  />
                </div>
              )}

              {permissionsFields.landmark && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("landmark")}
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    onNext={() => focusNextInput("poBox")}
                    onCancel={() => setFormData({ ...formData, landmark: "" })}
                    labelText="Landmark"
                    tooltipText="Enter nearby landmark for easy identification"
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.poBox && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("poBox")}
                    id="poBox"
                    name="poBox"
                    value={formData.poBox}
                    onChange={handleChange}
                    onNext={() => focusNextInput("currency")}
                    onCancel={() => setFormData({ ...formData, poBox: "" })}
                    labelText="P.O. Box"
                    tooltipText="Enter post office box number"
                    maxLength={10}
                  />
                </div>
              )}
            </div>

            {/* Financial Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.currency && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("currency")(el)}
                    id="currency"
                    name="currency"
                    options={currencyOptions}
                    value={formData.currency}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        currency: value,
                      }));
                      focusNextInput("paymentTerms");
                    }}
                    onEnterPress={() => {
                      if (formData.currency) {
                        focusNextInput("paymentTerms");
                      }
                    }}
                    placeholder=" "
                    labelText="Currency"
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

              {permissionsFields.paymentTerms && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("paymentTerms")(el)}
                    id="paymentTerms"
                    name="paymentTerms"
                    options={paymentTermsOptions}
                    value={formData.paymentTerms}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        paymentTerms: value,
                      }));
                      focusNextInput("creditPeriod");
                    }}
                    onEnterPress={() => {
                      if (formData.paymentTerms) {
                        focusNextInput("creditPeriod");
                      }
                    }}
                    placeholder=" "
                    labelText="Payment Terms"
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

              {permissionsFields.creditPeriod && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("creditPeriod")(el)}
                    id="creditPeriod"
                    name="creditPeriod"
                    options={creditPeriodOptions}
                    value={formData.creditPeriod}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        creditPeriod: value,
                      }));
                      focusNextInput("creditLimit");
                    }}
                    onEnterPress={() => {
                      if (formData.creditPeriod) {
                        focusNextInput("creditLimit");
                      }
                    }}
                    placeholder=" "
                    labelText="Credit Period"
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

              {permissionsFields.creditLimit && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("creditLimit")}
                    id="creditLimit"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    onNext={() => focusNextInput("mobileNo")}
                    onCancel={() =>
                      setFormData({ ...formData, creditLimit: "" })
                    }
                    labelText="Credit Limit"
                    tooltipText="Enter credit limit amount"
                    required
                    maxLength={20}
                  />
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.mobileNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("mobileNo")}
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("contactPerson")}
                    onCancel={() => setFormData({ ...formData, mobileNo: "" })}
                    labelText="Mobile No."
                    tooltipText="Enter mobile number with country code"
                    required
                    type="tel"
                    maxLength={20}
                  />
                </div>
              )}

              {permissionsFields.contactPerson && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("contactPerson")(el)}
                    id="contactPerson"
                    name="contactPerson"
                    options={contactPersonOptions}
                    value={formData.contactPerson}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        contactPerson: value,
                      }));
                      focusNextInput("faxNo");
                    }}
                    onEnterPress={() => {
                      if (formData.contactPerson) {
                        focusNextInput("faxNo");
                      }
                    }}
                    placeholder=" "
                    labelText="Contact Person"
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

              {permissionsFields.faxNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("faxNo")}
                    id="faxNo"
                    name="faxNo"
                    value={formData.faxNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phoneNo")}
                    onCancel={() => setFormData({ ...formData, faxNo: "" })}
                    labelText="Fax No."
                    tooltipText="Enter fax number"
                    type="tel"
                    maxLength={20}
                  />
                </div>
              )}

              {permissionsFields.phoneNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phoneNo")}
                    id="phoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, phoneNo: "" })}
                    labelText="Phone No."
                    tooltipText="Enter office phone number"
                    type="tel"
                    maxLength={20}
                  />
                </div>
              )}
            </div>

            {/* Additional Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.email && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("website")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter contact email address"
                    required
                    type="email"
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.website && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("website")}
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, website: "" })}
                    labelText="Website"
                    tooltipText="Enter customer website URL"
                    type="url"
                    maxLength={100}
                  />
                </div>
              )}
            </div>

            {/* System Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
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
                    labelText="Default"
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

              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("submitButton");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("submitButton");
                      }
                    }}
                    placeholder=" "
                    labelText="Draft"
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
        title="Reset Form"
        message="Are you sure you want to reset the form? All changes will be lost."
        confirmText="Reset"
        cancelText="Cancel"
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
