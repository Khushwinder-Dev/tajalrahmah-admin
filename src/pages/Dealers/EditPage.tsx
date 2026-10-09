/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useColorsPermissions, usePermission } from "@/hooks/usePermissions";
// import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

type DealerData = {
  customerNo: string;
  customerName: string;
  shortName: string;
  vatNumber: string;
  vendorCode: string;
  currency: string;
  phone: string;
  fax: string;
  mobile: string;
  whatsapp: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  address: string;
  email: string;
  website: string;
  language: string;
  locationUrl: string;
  paymentMode: string;
  status: "active" | "inactive" | "draft" | "deleted";
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type DealerModuleData = {
  formData: DealerData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: DealerData = {
  customerNo: "CUST001",
  customerName: "Tech Solutions Ltd",
  shortName: "TechSol",
  vatNumber: "VAT123456789",
  vendorCode: "VEND001",
  currency: "USD",
  phone: "+1-555-0123",
  fax: "+1-555-0124",
  mobile: "+1-555-0125",
  whatsapp: "+1-555-0125",
  country: "United States",
  state: "California",
  city: "San Francisco",
  postCode: "94105",
  address: "123 Market Street, Suite 100",
  email: "info@techsolutions.com",
  website: "www.techsolutions.com",
  language: "English",
  locationUrl: "https://maps.google.com/techsolutions",
  paymentMode: "Credit Card",
  status: "active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function DealerEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `dealer-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<DealerModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [selectedAction, setSelectedAction] = useState<string>("");

  // Permission checks
  const { canCreate, canView } = useColorsPermissions();

  // Field-level permissions
  const customerName: boolean = usePermission(
    "dealers",
    "edit",
    "customerName"
  );
  const customerNo: boolean = usePermission("dealers", "edit", "customerNo");
  const shortName: boolean = usePermission("dealers", "edit", "shortName");
  const vatNumber: boolean = usePermission("dealers", "edit", "vatNumber");
  const vendorCode: boolean = usePermission("dealers", "edit", "vendorCode");
  const currency: boolean = usePermission("dealers", "edit", "currency");
  const phone: boolean = usePermission("dealers", "edit", "phone");
  const mobile: boolean = usePermission("dealers", "edit", "mobile");
  const email: boolean = usePermission("dealers", "edit", "email");
  const country: boolean = usePermission("dealers", "edit", "country");
  const city: boolean = usePermission("dealers", "edit", "city");
  const address: boolean = usePermission("dealers", "edit", "address");
  const paymentMode: boolean = usePermission("dealers", "edit", "paymentMode");
  const status: boolean = usePermission("dealers", "edit", "status");
  const isDefault: boolean = usePermission("dealers", "edit", "isDefault");
  const canPdf: boolean = usePermission("dealers", "pdf");
  const canPrint: boolean = usePermission("dealers", "print");

  // Form state
  const [formData, setFormData] = useState<DealerData>({
    customerNo: "",
    customerName: "",
    shortName: "",
    vatNumber: "",
    vendorCode: "",
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
    paymentMode: "",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  // Check for restore flag from taskbar
  useEffect(() => {
    const shouldRestore = localStorage.getItem(`restore-${moduleId}`);
    if (shouldRestore === "true") {
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.customerName);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      setFormData(moduleData.formData);

      // Restore UI states based on form data
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");

      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
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
    shouldRestoreFromMinimized,
    formData.customerName,
    moduleId,
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
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized, moduleId]);

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
      handlePrintDealer(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Dealer updated successfully!");
      handleReset();
    } else {
      toastSuccess("Dealer updated successfully!");
      navigate("/dealers");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      customerNo: "",
      customerName: "",
      shortName: "",
      vatNumber: "",
      vendorCode: "",
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
      paymentMode: "",
      status: "active",
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

    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset form data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["customerName"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintDealer = (dealerData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Dealer Details",
        data: [dealerData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          customerName: "Customer Name",
          customerNo: "Customer No",
          shortName: "Short Name",
          vatNumber: "VAT Number",
          vendorCode: "Vendor Code",
          currency: "Currency",
          phone: "Phone",
          mobile: "Mobile",
          email: "Email",
          country: "Country",
          city: "City",
          address: "Address",
          paymentMode: "Payment Mode",
          status: "Status",
          isDefault: "Default Dealer",
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
          title="Dealer Details"
          subtitle="Dealer Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dealer-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const [popoverOptions, setPopoverOptions] = useState([
    {
      label: "Create",
      icon: <Plus className="w-5 h-5 text-green-500" />,
      onClick: () => {
        navigate("/dealers/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/dealers/view");
      },
      show: canView,
    },
  ]);

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
              toastRestore("Dealer saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): DealerModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit Dealer`}
        moduleRoute={`/dealers/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Dealer"
        listPath="dealers"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
        module="dealers"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
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
            className="space-y-6"
          >
            {/* First Row: Customer Name, Customer No, Short Name, VAT Number */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Customer Name field - only show if user can edit */}
              {customerName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customerName")}
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("customerNo")}
                    onCancel={() =>
                      setFormData({ ...formData, customerName: "" })
                    }
                    labelText="Customer Name"
                    tooltipText="Enter the customer name"
                    required
                  />
                </div>
              )}

              {/* Customer No field - only show if user can edit */}
              {customerNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("customerNo")}
                    id="customerNo"
                    name="customerNo"
                    value={formData.customerNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("shortName")}
                    onCancel={() =>
                      setFormData({ ...formData, customerNo: "" })
                    }
                    labelText="Customer No"
                    tooltipText="Enter the customer number (e.g., CUST001)"
                    required
                  />
                </div>
              )}

              {/* Short Name field - only show if user can edit */}
              {shortName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shortName")}
                    id="shortName"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vatNumber")}
                    onCancel={() => setFormData({ ...formData, shortName: "" })}
                    labelText="Short Name"
                    tooltipText="Enter a short name for the customer"
                    required
                  />
                </div>
              )}

              {/* VAT Number field - only show if user can edit */}
              {vatNumber && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vatNumber")}
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vendorCode")}
                    onCancel={() => setFormData({ ...formData, vatNumber: "" })}
                    labelText="VAT Number"
                    tooltipText="Enter the VAT number"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Vendor Code, Currency, Phone, Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Vendor Code field - only show if user can edit */}
              {vendorCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vendorCode")}
                    id="vendorCode"
                    name="vendorCode"
                    value={formData.vendorCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("currency")}
                    onCancel={() =>
                      setFormData({ ...formData, vendorCode: "" })
                    }
                    labelText="Vendor Code"
                    tooltipText="Enter the vendor code"
                    required
                  />
                </div>
              )}

              {/* Currency field - only show if user can edit */}
              {currency && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("currency")}
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phone")}
                    onCancel={() => setFormData({ ...formData, currency: "" })}
                    labelText="Currency"
                    tooltipText="Enter the currency (e.g., USD, EUR)"
                    required
                  />
                </div>
              )}

              {/* Phone field - only show if user can edit */}
              {phone && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phone")}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("mobile")}
                    onCancel={() => setFormData({ ...formData, phone: "" })}
                    labelText="Phone"
                    tooltipText="Enter the phone number"
                    required
                  />
                </div>
              )}

              {/* Mobile field - only show if user can edit */}
              {mobile && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("mobile")}
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, mobile: "" })}
                    labelText="Mobile"
                    tooltipText="Enter the mobile number"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third Row: Email, Country, City, Address */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Email field - only show if user can edit */}
              {email && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("country")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter the email address"
                    type="email"
                    required
                  />
                </div>
              )}

              {/* Country field - only show if user can edit */}
              {country && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("country")}
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    onNext={() => focusNextInput("city")}
                    onCancel={() => setFormData({ ...formData, country: "" })}
                    labelText="Country"
                    tooltipText="Enter the country"
                    required
                  />
                </div>
              )}

              {/* City field - only show if user can edit */}
              {city && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("city")}
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() => setFormData({ ...formData, city: "" })}
                    labelText="City"
                    tooltipText="Enter the city"
                    required
                  />
                </div>
              )}

              {/* Address field - only show if user can edit */}
              {address && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("paymentMode")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter the address"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fourth Row: Payment Mode, Status, Default */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Payment Mode field - only show if user can edit */}
              {paymentMode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("paymentMode")}
                    id="paymentMode"
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() =>
                      setFormData({ ...formData, paymentMode: "" })
                    }
                    labelText="Payment Mode"
                    tooltipText="Enter the payment mode"
                    required
                  />
                </div>
              )}

              {/* Status field - only show if user can edit */}
              {status && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false} // Single select mode
                    options={[
                      {
                        label: "Active",
                        value: "active",
                        date: "Set active dealer",
                      },
                      {
                        label: "Inactive",
                        value: "InActive",
                        date: "Set inactive dealer",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft dealer",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete dealer",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      console.log("switch value", stringValue);
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as
                          | "active"
                          | "inactive"
                          | "draft"
                          | "deleted",
                        isDeleted: stringValue === "deleted",
                        isDraft: stringValue === "Draft",
                        isActive: stringValue === "Active",
                      }));

                      // Update your form data
                      setFormData((prev) => ({
                        ...prev,
                        isDeleted: stringValue === "Delete",
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
                    tooltipText="Set the dealer status"
                  />
                </div>
              )}

              {/* Default field - only show if user can edit */}
              {isDefault && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: "Yes",
                        value: "Yes",
                        date: "Set default dealer",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default dealer",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("actions");
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default dealer"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "John",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Sarah",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Inactive",
                      user: "Mike",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "inactive",
                    },
                    {
                      action: "Drafted",
                      user: "John",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Dealer Action History"
                />
              </div>
            </div>
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Reset Form"
        message="Are you sure you want to reset the form?"
        confirmText="Reset"
        cancelText="Cancel"
      />
    </>
  );
}
