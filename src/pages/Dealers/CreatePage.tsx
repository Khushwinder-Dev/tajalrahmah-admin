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
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColorsPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";

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
  status: "active" | "inactive" | "draft";
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
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function DealerFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");

  // Permission checks
  const { canCreate, canView } = useColorsPermissions();

  // Field-level permissions
  const customerName: boolean = usePermission(
    "dealers",
    "create",
    "customerName"
  );
  const customerNo: boolean = usePermission("dealers", "create", "customerNo");
  const shortName: boolean = usePermission("dealers", "create", "shortName");
  const vatNumber: boolean = usePermission("dealers", "create", "vatNumber");
  const vendorCode: boolean = usePermission("dealers", "create", "vendorCode");
  const currency: boolean = usePermission("dealers", "create", "currency");
  const phone: boolean = usePermission("dealers", "create", "phone");
  const mobile: boolean = usePermission("dealers", "create", "mobile");
  const email: boolean = usePermission("dealers", "create", "email");
  const country: boolean = usePermission("dealers", "create", "country");
  const city: boolean = usePermission("dealers", "create", "city");
  const address: boolean = usePermission("dealers", "create", "address");
  const paymentMode: boolean = usePermission(
    "dealers",
    "create",
    "paymentMode"
  );
  const status: boolean = usePermission("dealers", "create", "status");
  const isDefault: boolean = usePermission("dealers", "create", "isDefault");
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit]);

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
          navigate("/dealers/create");
        } else {
          navigate("/dealers/edit/undefined");
        }
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
      toastSuccess("Dealer created successfully!");
      handleReset();
    } else {
      toastSuccess("Dealer created successfully!");
      navigate("/dealers");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

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

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["customerName"]?.focus();
    }, 100);
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
              toastRestore("Dealer saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler
  const handleMinimize = useCallback(() => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="dealer-form-module"
        moduleName={isEdit ? "Edit Dealer" : "Adding Dealer"}
        moduleRoute={
          isEdit
            ? `/dealers/edit/${formData.customerName || "new"}`
            : "/dealers/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Dealer" : "Add Dealer"}
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
        activePage="create"
        module="dealers"
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
            {/* First Row: Customer Name, Customer No, Short Name, VAT Number */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Customer Name field - only show if user can create */}
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

              {/* Customer No field - only show if user can create */}
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

              {/* Short Name field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}

              {/* VAT Number field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Vendor Code, Currency, Phone, Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Vendor Code field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Currency field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Phone field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Mobile field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third Row: Email, Country, City, Address */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Email field - only show if user can create */}
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

              {/* Country field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}

              {/* City field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Address field - only show if user can create */}
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
                    type="text"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fourth Row: Payment Mode, Status, Default */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Payment Mode field - only show if user can create */}
              {paymentMode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("paymentMode")}
                    id="paymentMode"
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("statusSwitch")}
                    onCancel={() =>
                      setFormData({ ...formData, paymentMode: "" })
                    }
                    labelText="Payment Mode"
                    tooltipText="Enter the payment mode"
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default dealer",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default dealer",
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
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        // Form submission or next action
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText="Set as default dealer"
                  />
                </div>
              )}

              {/* Status field - only show if user can create */}
              {status && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("statusSwitch")(el)}
                    id="statusSwitch"
                    name="statusSwitch"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      {
                        label: "Active",
                        value: "active",
                        date: "Set active",
                      },
                      {
                        label: "Inactive",
                        value: "inactive",
                        date: "Set inactive",
                      },
                      {
                        label: "Draft",
                        value: "draft",
                        date: "Set draft",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;

                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as "active" | "inactive" | "draft",
                        isDraft: stringValue === "draft",
                        isActive: stringValue === "active",
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
            </div>
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
    </>
  );
}
