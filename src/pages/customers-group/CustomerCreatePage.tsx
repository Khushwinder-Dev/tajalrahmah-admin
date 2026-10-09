/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { CustomerGroupModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useCustomerGroupFormData } from "@/hooks/useModuleFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";

type CustomerGroup = {
  customerNo: string;
  customerGroupName: string;
  shortName?: string;
  vatNumber?: string;
  vendorCode?: string;
  paymentMode: "Cash" | "Card" | "Bank Transfer" | "Mobile Payment";
  currency: "USD" | "EUR" | "BDT" | "INR" | "GBP";
  phone?: string;
  fax?: string;
  mobile?: string;
  whatsapp?: string;
  country: string;
  state: string;
  city?: string;
  postCode?: string;
  address?: string;
  email?: string;
  website?: string;
  language: "English" | "Bengali" | "Hindi" | "Spanish" | "French";
  locationUrl?: string;
  flag: string | null;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
  isDefault: boolean;
  isStatusActive: boolean;
  isActive: boolean;
  isDraft: boolean;

  customerGroupName_ar?: string;
  customerGroupName_hi?: string;
  customerGroupName_ur?: string;
  customerGroupName_bn?: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CustomerGroup = {
  customerNo: "CUST001",
  customerGroupName: "Global Tech Ltd",
  shortName: "GTL",
  vatNumber: "VAT123456",
  vendorCode: "VEND001",
  paymentMode: "Bank Transfer",
  currency: "USD",
  phone: "+1-202-555-0100",
  fax: "+1-202-555-0110",
  mobile: "+1-202-555-0120",
  whatsapp: "+1-202-555-0120",
  country: "United States",
  state: "California",
  city: "Los Angeles",
  postCode: "90001",
  address: "123 Innovation Drive",
  email: "info@globaltech.com",
  website: "https://globaltech.com",
  language: "English",
  locationUrl: "https://maps.example.com/globaltech",
  flag: null,
  isDefault: false,
  isStatusActive: true,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function CustomerGroupFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useCustomerGroupFormData();

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [isStatusActive] = useState<boolean>(true);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [customerGroupLanguageValues, setCustomerGroupLanguageValues] =
    useState<Record<string, string>>({});
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  // Permission checks
  const canCreate: boolean = usePermission("customerGroups", "create");
  const canView: boolean = usePermission("customerGroups", "view");
  const canPdf: boolean = usePermission("customerGroups", "pdf");
  const canPrint: boolean = usePermission("customerGroups", "print");

  // Field-level permissions
  const customerGroupName: boolean = usePermission(
    "customerGroups",
    "create",
    "customerGroupName"
  );
  const customerNo: boolean = usePermission(
    "customerGroups",
    "create",
    "customerNo"
  );
  const flag: boolean = usePermission("customerGroups", "create", "flag");

  // Payment modes and currencies for autocomplete
  const paymentModes = ["Cash", "Card", "Bank Transfer", "Mobile Payment"];
  const currencies = ["USD", "EUR", "BDT", "INR", "GBP"];
  const languages = ["English", "Bengali", "Hindi", "Spanish", "French"];

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
    isStatusActive: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Focus management
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.customerGroupName &&
      !formData.customerNo;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;

      setFormData({
        ...(savedFormData as any),
        isStatusActive:
          (savedFormData as any)?.isStatusActive !== undefined
            ? (savedFormData as any).isStatusActive
            : true,
      });

      if (moduleData.customerGroupLanguageValues) {
        setCustomerGroupLanguageValues(moduleData.customerGroupLanguageValues);
      }

      setIsDefaultState(savedFormData.isDefault ? "Yes" : "No");
      setStatusState(savedFormData.isActive ? "Active" : "Draft");
      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition(
        "customer-group-form-module"
      );
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    formData.customerGroupName,
    formData.customerNo,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available
  useEffect(() => {
    if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData({
        ...initialData,
        flag: null,
      });
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setStatusState(initialData.isActive ? "Active" : "Draft");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized]);

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/customer-group/create");
        } else {
          navigate("/customer-group/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/customer-group/view");
      },
      show: canView,
    },
  ]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintCustomerGroup(formData);
    }

    if (keepCreating) {
      toastSuccess("Customer group created successfully!");
      handleReset();
    } else {
      toastSuccess("Customer group created successfully!");
      navigate("/customer-group");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
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
      isStatusActive: true,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    setIsDefaultState("No");
    setStatusState("Active");
    setCustomerGroupLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("customer-group-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["customerNo"]?.focus();
    }, 100);
  };

  const handlePrintCustomerGroup = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Customer Group Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          customerNo: "Customer No",
          customerGroupName: "Customer Group Name",
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
          isDefault: "Default",
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
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Customer Group Details"
          subtitle="Customer Group Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customer-group-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  useEffect(() => {
    setPopoverOptions((prevOptions) => {
      const filteredOptions = prevOptions.filter(
        (opt) => opt.label !== "Draft"
      );

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
              toastRestore("Customer group saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const handleMinimize = useCallback((): CustomerGroupModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      customerGroupLanguageValues,
    };
  }, [formData, customerGroupLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="customer-group-form-module"
        moduleName={isEdit ? "Edit Customer Group" : "Adding Customer Group"}
        moduleRoute={
          isEdit
            ? `/customer-group/edit/${formData.customerNo || "new"}`
            : "/customer-group/create"
        }
        onMinimize={handleMinimize}
        title={
          isEdit
            ? labels.editingCustomerGroups || "Editing Customer Group"
            : labels.creatingCustomerGroups || "Adding Customer Group"
        }
        listPath="customer-group"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        module="customer-groups"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90! bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
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
            {/* First Row: Customer No, Group Name, Short Name, VAT */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {customerNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customerNo")}
                    id="customerNo"
                    name="customerNo"
                    value={formData.customerNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("customerGroupName")}
                    onCancel={() =>
                      setFormData({ ...formData, customerNo: "" })
                    }
                    labelText="Customer No"
                    tooltipText="Enter customer number"
                    required
                  />
                </div>
              )}

              {customerGroupName && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("customerGroupName")}
                      id="customerGroupName"
                      name="customerGroupName"
                      value={formData.customerGroupName}
                      onChange={handleChange}
                      onNext={() => focusNextInput("shortName")}
                      onCancel={() =>
                        setFormData({ ...formData, customerGroupName: "" })
                      }
                      labelText="Customer Group Name"
                      tooltipText="Enter customer group name"
                      required
                    />

                    <LanguageInputDropdown
                      onSubmit={(values) => {
                        setCustomerGroupLanguageValues(values);
                        setFormData((prev) => ({
                          ...prev,
                          customerGroupName_ar: values.ar || "",
                          customerGroupName_hi: values.hi || "",
                          customerGroupName_ur: values.ur || "",
                          customerGroupName_bn: values.bn || "",
                        }));
                        setTimeout(() => {
                          focusNextInput("shortName");
                        }, 100);
                      }}
                      title="Customer Group Name"
                      initialValues={customerGroupLanguageValues}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("shortName")}
                  id="shortName"
                  name="shortName"
                  value={formData.shortName || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("vatNumber")}
                  onCancel={() => setFormData({ ...formData, shortName: "" })}
                  labelText="Short Name"
                  tooltipText="Enter short name"
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("vatNumber")}
                  id="vatNumber"
                  name="vatNumber"
                  value={formData.vatNumber || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("vendorCode")}
                  onCancel={() => setFormData({ ...formData, vatNumber: "" })}
                  labelText="VAT Number"
                  tooltipText="Enter VAT number"
                />
              </div>
            </div>

            {/* Second Row: Vendor Code, Payment Mode, Currency, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("vendorCode")}
                  id="vendorCode"
                  name="vendorCode"
                  value={formData.vendorCode || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("paymentMode")}
                  onCancel={() => setFormData({ ...formData, vendorCode: "" })}
                  labelText="Vendor Code"
                  tooltipText="Enter vendor code"
                />
              </div>

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("paymentMode")(el)}
                  id="paymentMode"
                  name="paymentMode"
                  allowCustomInput={false}
                  options={paymentModes}
                  value={formData.paymentMode}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, paymentMode: value as any });
                    if (value) {
                      focusNextInput("currency");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.paymentMode) {
                      focusNextInput("currency");
                    }
                  }}
                  placeholder=" "
                  labelText="Payment Mode"
                  tooltipText="Select payment mode"
                  userLang={isRTL ? "ar" : "en"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("currency")(el)}
                  id="currency"
                  name="currency"
                  allowCustomInput={false}
                  options={currencies}
                  value={formData.currency}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, currency: value as any });
                    if (value) {
                      focusNextInput("phone");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.currency) {
                      focusNextInput("phone");
                    }
                  }}
                  placeholder=" "
                  labelText="Currency"
                  tooltipText="Select currency"
                  userLang={isRTL ? "ar" : "en"}
                  required
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("phone")}
                  id="phone"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("fax")}
                  onCancel={() => setFormData({ ...formData, phone: "" })}
                  labelText="Phone"
                  tooltipText="Enter phone number"
                />
              </div>
            </div>

            {/* Third Row: Fax, Mobile, WhatsApp, Country */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("fax")}
                  id="fax"
                  name="fax"
                  value={formData.fax || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("mobile")}
                  onCancel={() => setFormData({ ...formData, fax: "" })}
                  labelText="Fax"
                  tooltipText="Enter fax number"
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("mobile")}
                  id="mobile"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("whatsapp")}
                  onCancel={() => setFormData({ ...formData, mobile: "" })}
                  labelText="Mobile"
                  tooltipText="Enter mobile number"
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("whatsapp")}
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("country")}
                  onCancel={() => setFormData({ ...formData, whatsapp: "" })}
                  labelText="WhatsApp"
                  tooltipText="Enter WhatsApp number"
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("country")}
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onNext={() => focusNextInput("state")}
                  onCancel={() => setFormData({ ...formData, country: "" })}
                  labelText="Country"
                  tooltipText="Enter country name"
                  required
                />
              </div>
            </div>

            {/* Fourth Row: State, City, Post Code, Address */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("state")}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onNext={() => focusNextInput("city")}
                  onCancel={() => setFormData({ ...formData, state: "" })}
                  labelText="State"
                  tooltipText="Enter state name"
                  required
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("city")}
                  id="city"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("postCode")}
                  onCancel={() => setFormData({ ...formData, city: "" })}
                  labelText="City"
                  tooltipText="Enter city name"
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("postCode")}
                  id="postCode"
                  name="postCode"
                  value={formData.postCode || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("address")}
                  onCancel={() => setFormData({ ...formData, postCode: "" })}
                  labelText="Post Code"
                  tooltipText="Enter post code"
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("address")}
                  id="address"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("email")}
                  onCancel={() => setFormData({ ...formData, address: "" })}
                  labelText="Address"
                  tooltipText="Enter address"
                />
              </div>
            </div>

            {/* Fifth Row: Email, Website, Language, Location URL */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("email")}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("website")}
                  onCancel={() => setFormData({ ...formData, email: "" })}
                  labelText="Email"
                  tooltipText="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("website")}
                  id="website"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("language")}
                  onCancel={() => setFormData({ ...formData, website: "" })}
                  labelText="Website"
                  tooltipText="Enter website URL"
                />
              </div>

              <div className="space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("language")(el)}
                  id="language"
                  name="language"
                  allowCustomInput={false}
                  options={languages}
                  value={formData.language}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, language: value as any });
                    if (value) {
                      focusNextInput("locationUrl");
                    }
                  }}
                  onEnterPress={() => {
                    if (formData.language) {
                      focusNextInput("locationUrl");
                    }
                  }}
                  placeholder=" "
                  labelText="Language"
                  tooltipText="Select language"
                  userLang={isRTL ? "ar" : "en"}
                  required
                />
              </div>

              <div className="space-y-2">
                <EditableInput
                  setRef={setRef("locationUrl")}
                  id="locationUrl"
                  name="locationUrl"
                  value={formData.locationUrl || ""}
                  onChange={handleChange}
                  onNext={() => focusNextInput("isDefault")}
                  onCancel={() => setFormData({ ...formData, locationUrl: "" })}
                  labelText="Location URL"
                  tooltipText="Enter location URL"
                />
              </div>
            </div>

            {/* Status Controls Row: Default and Status */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              <div className="md:col-span-3 space-y-2 relative">
                <SwitchSelect
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  multiSelect={false}
                  options={[
                    {
                      label: labels.yes,
                      value: labels.yes,
                      date: "Set as default customer group",
                    },
                    {
                      label: labels.no,
                      value: labels.no,
                      date: "Remove default customer group",
                    },
                  ]}
                  value={isDefaultState === "Yes" ? labels.yes : labels.no}
                  labelClassName="rounded-lg"
                  onValueChange={(value: string | string[]) => {
                    const isYes = Array.isArray(value)
                      ? value[0] === labels.yes
                      : value === labels.yes;
                    setIsDefaultState(isYes ? "Yes" : "No");
                    const newValue = isYes;
                    setFormData((prev) => ({
                      ...prev,
                      isDefault: newValue,
                    }));
                    focusNextInput("status");
                  }}
                  onEnterPress={() => {
                    if (
                      formData.isDefault === true ||
                      formData.isDefault === false
                    ) {
                      focusNextInput("status");
                    }
                  }}
                  placeholder=" "
                  labelText={labels.default}
                  className="relative"
                  tooltipText="Set as default customer group"
                />
              </div>

              {isStatusActive && (
                <div className="md:col-span-3 space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText={labels.status}
                    multiSelect={false}
                    options={[
                      {
                        label: "Active",
                        value: "Active",
                        date: "Set active",
                      },
                      { label: "Draft", value: "Draft", date: "Set draft" },
                    ]}
                    value={statusState}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      setStatusState(stringValue);

                      setFormData((prev) => ({
                        ...prev,
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    tooltipText={labels.statusTooltip}
                  />
                </div>
              )}
            </div>

            {/* Flag/Logo Upload */}
            {flag && (
              <ImageUploader
                onImageSelect={(file: any) => {
                  console.log("Selected:", file);
                  setFormData({ ...formData, flag: file });
                }}
                existingImages={formData.flag ? [formData.flag] : []}
              />
            )}
          </form>
        </div>
      </MinimizablePageLayout>

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
