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
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
// import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { CountryModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useCountryFormData } from "@/hooks/useCountryFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";
import { TemplateContent } from "@/components/common/TemplateContent";

// Deliveryman form: Code, Name, Phone, Email, Address, National ID, Vehicle Type, Assigned Area, Customer Logo
type DeliverymanFormData = {
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  vehicleType: string;
  assignedArea: string;
  customerLogo: string | null;
  isDefault: boolean;
  isStatusActive: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: DeliverymanFormData = {
  code: "DM-001",
  name: "",
  phone: "",
  email: "",
  address: "",
  nationalId: "",
  vehicleType: "",
  assignedArea: "",
  customerLogo: null,
  isDefault: false,
  isStatusActive: true,
  isActive: true,
  isDraft: false,
  rating: 3,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function DeliverymanCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useCountryFormData();

  const [showTemplates, setShowTemplates] = useState(false);

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
  const [currencyLanguageValues, setCurrencyLanguageValues] = useState<
    Record<string, string>
  >({});
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const codePerm: boolean = usePermission("deliverymen", "create", "code");
  const namePerm: boolean = usePermission("deliverymen", "create", "name");
  const phonePerm: boolean = usePermission("deliverymen", "create", "phone");
  const emailPerm: boolean = usePermission("deliverymen", "create", "email");
  const addressPerm: boolean = usePermission(
    "deliverymen",
    "create",
    "address"
  );
  const nationalIdPerm: boolean = usePermission(
    "deliverymen",
    "create",
    "nationalId"
  );
  const vehicleTypePerm: boolean = usePermission(
    "deliverymen",
    "create",
    "vehicleType"
  );
  const assignedAreaPerm: boolean = usePermission(
    "deliverymen",
    "create",
    "assignedArea"
  );
  const isDefaultPerm: boolean = usePermission(
    "deliverymen",
    "create",
    "isDefault"
  );
  const canPdf: boolean = usePermission("deliverymen", "pdf");
  const canPrint: boolean = usePermission("deliverymen", "print");

  // Vehicle types and assigned areas
  const vehicleTypes = ["Bike", "Car", "Van", "Scooter"];
  const assignedAreas = [
    "Downtown",
    "Uptown",
    "Westside",
    "Eastside",
    "Central",
    "Harbour",
  ];

  // Form state
  const [formData, setFormData] = useState<DeliverymanFormData>({
    code: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    nationalId: "",
    vehicleType: "",
    assignedArea: "",
    customerLogo: null,
    isDefault: false,
    isStatusActive: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 3,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.code &&
      !formData.name;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData as any;
      setFormData({ ...(savedFormData as DeliverymanFormData) });
      setIsDefaultState(savedFormData.isDefault ? "Yes" : "No");
      setStatusState(savedFormData.isActive ? "Active" : "Draft");
      setIsRestoredFromMinimized(true);
      const scrollPosition = getModuleScrollPosition("deliveryman-form-module");
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
    formData.code,
    formData.name,
    getModuleScrollPosition,
  ]);

  // Initialize with edit data if available (but only if not restoring from minimized)
  useEffect(() => {
    if (
      isEdit &&
      initialData &&
      !hasMinimizedData &&
      !isRestoredFromMinimized
    ) {
      setFormData({ ...initialData });
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
          navigate("/deliverymen/create");
        } else {
          navigate("/deliverymen/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/deliverymen/view");
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
    } as DeliverymanFormData;
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrint(formData);
    }

    if (keepCreating) {
      toastSuccess("Currency created successfully!");
      handleReset();
    } else {
      toastSuccess("Deliveryman created successfully!");
      navigate("/deliverymen");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      code: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      nationalId: "",
      vehicleType: "",
      assignedArea: "",
      customerLogo: null,
      isDefault: false,
      isStatusActive: true,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      rating: 3,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState("No");
    setStatusState("Active");
    setCurrencyLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset module data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData("currency-form-module");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handlePrint = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Deliveryman Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          name: "Name",
          phone: "Phone",
          email: "Email",
          address: "Address",
          nationalId: "National ID",
          vehicleType: "Vehicle Type",
          assignedArea: "Assigned Area",
          customerLogo: "Customer Logo",
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
          title="Deliveryman Details"
          subtitle="Deliveryman Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deliveryman-details.pdf";
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
              toastRestore("Currency saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): CountryModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      countryLanguageValues: currencyLanguageValues,
    } as any;
  }, [formData, currencyLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="deliveryman-form-module"
        moduleName={isEdit ? "Edit Deliveryman" : "Adding Deliveryman"}
        moduleRoute={
          isEdit
            ? `/deliverymen/edit/${formData.code || "new"}`
            : "/deliverymen/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Deliveryman" : "Add Deliveryman"}
        listPath="deliverymen"
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
        module="deliverymen"
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
            {/* First Row: Code, Name, Phone, Email */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Code */}
              {codePerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("code")(el)}
                    id="code"
                    name="code"
                    value={formData.code}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, code: value });
                      if (value) {
                        focusNextInput("name");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.code) focusNextInput("name");
                    }}
                    placeholder=" "
                    labelText="Code"
                    className="relative"
                    tooltipText="Enter the deliveryman code"
                    userLang={isRTL ? "ar" : "en"}
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

              {/* Name */}
              {namePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("phone")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Name"
                    tooltipText="Enter the deliveryman name"
                    required
                  />
                </div>
              )}

              {/* Phone */}
              {phonePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("phone")}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, phone: "" })}
                    labelText="Phone"
                    tooltipText="Enter phone number"
                    required
                  />
                </div>
              )}

              {/* Email */}
              {emailPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("address")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter email address"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Address, National ID, Vehicle Type, Assigned Area */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4 relative">
              {addressPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("address")}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onNext={() => focusNextInput("nationalId")}
                    onCancel={() => setFormData({ ...formData, address: "" })}
                    labelText="Address"
                    tooltipText="Enter address"
                    required
                  />
                </div>
              )}

              {nationalIdPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("nationalId")}
                    id="nationalId"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vehicleType")}
                    onCancel={() =>
                      setFormData({ ...formData, nationalId: "" })
                    }
                    labelText="National ID"
                    tooltipText="Enter national ID"
                    required
                  />
                </div>
              )}

              {vehicleTypePerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("vehicleType")(el)}
                    id="vehicleType"
                    name="vehicleType"
                    options={vehicleTypes}
                    value={formData.vehicleType}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, vehicleType: value });
                      if (value) focusNextInput("assignedArea");
                    }}
                    onEnterPress={() => {
                      if (formData.vehicleType) focusNextInput("assignedArea");
                    }}
                    placeholder=" "
                    labelText="Vehicle Type"
                    className="relative"
                    tooltipText="Select vehicle type"
                    userLang={isRTL ? "ar" : "en"}
                  />
                </div>
              )}

              {assignedAreaPerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("assignedArea")(el)}
                    id="assignedArea"
                    name="assignedArea"
                    options={assignedAreas}
                    value={formData.assignedArea}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, assignedArea: value });
                    }}
                    onEnterPress={() => undefined}
                    placeholder=" "
                    labelText="Assigned Area"
                    className="relative"
                    tooltipText="Select assigned area"
                    userLang={isRTL ? "ar" : "en"}
                  />
                </div>
              )}
            </div>

            {/* Default and Status (unchanged behavior) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {isDefaultPerm && (
                <div className="md:col-span-3 space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    labelText={labels.default}
                    multiSelect={false}
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
                      setIsDefaultState(isYes ? "Yes" : "No");
                      setFormData((prev) => ({ ...prev, isDefault: isYes }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": { borderColor: "var(--primary)" },
                      },
                    }}
                    tooltipText="Set as default"
                  />
                </div>
              )}

              {isStatusActive && (
                <div className="md:col-span-3 space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      { label: "Active", value: "Active", date: "Set active" },
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
                        "&:focus": { borderColor: "var(--primary)" },
                      },
                    }}
                    tooltipText={labels.statusTooltip}
                  />
                </div>
              )}
            </div>

            {/* Customer Logo Upload */}
            <div className="space-y-2 my-4">
              <ImageUploader
                onImageSelect={(file: any) => {
                  try {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setFormData((prev) => ({
                        ...prev,
                        customerLogo: (e.target?.result as string) || null,
                      }));
                    };
                    reader.readAsDataURL(file);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                existingImages={
                  formData.customerLogo ? [formData.customerLogo] : []
                }
              />
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

      {/* Templates Modal */}
      <Modal
        opened={showTemplates}
        onClose={() => setShowTemplates(false)}
        size="xl"
        radius={20}
        overlayProps={{ backgroundOpacity: 0.25, blur: 1 }}
        withCloseButton={false}
        centered
      >
        <TemplateContent
          headers={[
            { key: "code", label: "Code" },
            { key: "name", label: "Currency" },
          ]}
          data={[
            { code: "USD", name: "US Dollar" },
            { code: "EUR", name: "Euro" },
            { code: "GBP", name: "British Pound" },
            { code: "JPY", name: "Japanese Yen" },
            { code: "INR", name: "Indian Rupee" },
          ]}
          onSelect={(selectedData: any) => {
            setShowTemplates(false);
            setFormData((prev) => ({
              ...prev,
              code: selectedData.code,
              title: selectedData.name,
            }));
          }}
          onClose={() => setShowTemplates(false)}
        />
      </Modal>
    </>
  );
}
