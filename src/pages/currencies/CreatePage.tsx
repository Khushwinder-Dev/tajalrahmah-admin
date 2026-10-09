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
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { CountryModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useCountryFormData } from "@/hooks/useCountryFormData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";
import { TemplateContent } from "@/components/common/TemplateContent";

// Adapted for currencies: Code, Currency (title), Exchange (ISD), Country (countryTitle), Symbol (symbol)
type CurrencyFormData = {
  code: string;
  title: string; // Currency name
  countryTitle: string; // Country name
  exchange: string; // store as string for input; convert as needed
  symbol: string | null; // uploaded symbol (image url/base64)
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
  title_ar?: string;
  title_hi?: string;
  title_ur?: string;
  title_bn?: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CurrencyFormData = {
  code: "USD",
  title: "US Dollar",
  countryTitle: "United States",
  exchange: "1.0",
  symbol: null,
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

export default function CurrenciesCreatePage({ isEdit = false }: Props) {
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

  // Field-level permissions (reuse permission system)
  const codePerm: boolean = usePermission("currencies", "create", "code");
  const currencyNamePerm: boolean = usePermission(
    "currencies",
    "create",
    "currency"
  );
  const exchangePerm: boolean = usePermission(
    "currencies",
    "create",
    "exchange"
  );
  const countryPerm: boolean = usePermission("currencies", "create", "country");
  const isDefaultPerm: boolean = usePermission(
    "currencies",
    "create",
    "isDefault"
  );
  const canPdf: boolean = usePermission("currencies", "pdf");
  const canPrint: boolean = usePermission("currencies", "print");

  // Currency codes for autocomplete
  const currencyCodes = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "INR",
    "AUD",
    "CAD",
    "SAR",
    "AED",
    "BDT",
  ];

  // Form state
  const [formData, setFormData] = useState<CurrencyFormData>({
    code: "",
    title: "",
    countryTitle: "",
    exchange: "",
    symbol: null,
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
    title_ar: "",
    title_hi: "",
    title_ur: "",
    title_bn: "",
  });

  // Simplified restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.title &&
      !formData.code &&
      !formData.exchange;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData as any;
      setFormData({
        ...(savedFormData as CurrencyFormData),
        exchange: String((savedFormData as any)?.exchange ?? ""),
      });
      setIsDefaultState(savedFormData.isDefault ? "Yes" : "No");
      setStatusState(savedFormData.isActive ? "Active" : "Draft");
      setIsRestoredFromMinimized(true);
      const scrollPosition = getModuleScrollPosition("currency-form-module");
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
    formData.title,
    formData.code,
    formData.exchange,
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
          navigate("/currencies/create");
        } else {
          navigate("/currencies/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/currencies/view");
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
    } as CurrencyFormData;
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintCurrency(formData);
    }

    if (keepCreating) {
      toastSuccess("Currency created successfully!");
      handleReset();
    } else {
      toastSuccess("Currency created successfully!");
      navigate("/currencies");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      code: "",
      title: "",
      countryTitle: "",
      exchange: "",
      symbol: null,
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
      title_ar: "",
      title_hi: "",
      title_ur: "",
      title_bn: "",
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

  const handlePrintCurrency = (currencyData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Currency Details",
        data: [currencyData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Code",
          title: "Currency",
          countryTitle: "Country",
          exchange: "Exchange",
          symbol: "Symbol",
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
          title="Currency Details"
          subtitle="Currency Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "currency-details.pdf";
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
        moduleId="currency-form-module"
        moduleName={isEdit ? "Edit Currency" : "Adding Currency"}
        moduleRoute={
          isEdit
            ? `/currencies/edit/${formData.code || "new"}`
            : "/currencies/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Currency" : "Add Currency"}
        listPath="currencies"
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
        module="currencies"
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
            {/* First Row: Code, Exchange, Currency, Country */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Code */}
              {codePerm && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("code")(el)}
                    id="code"
                    name="code"
                    allowCustomInput={true}
                    options={currencyCodes}
                    value={formData.code}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, code: value });
                      if (value) {
                        focusNextInput("exchange");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.code) focusNextInput("exchange");
                    }}
                    placeholder=" "
                    labelText="Code"
                    className="relative"
                    tooltipText="Enter the currency code"
                    userLang={isRTL ? "ar" : "en"}
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    setShowTemplates={setShowTemplates}
                    showTemplates={showTemplates}
                    isShowTemplateIcon={true}
                  />
                </div>
              )}

              {/* Exchange */}
              {exchangePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("exchange")}
                    id="exchange"
                    name="exchange"
                    value={formData.exchange}
                    onChange={handleChange}
                    onNext={() => focusNextInput("title")}
                    onCancel={() => setFormData({ ...formData, exchange: "" })}
                    labelText="Exchange"
                    tooltipText="Enter the exchange rate"
                    required
                    type="number"
                  />
                </div>
              )}

              {/* Currency Name */}
              {currencyNamePerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("title")}
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      onNext={() => focusNextInput("countryTitle")}
                      onCancel={() => setFormData({ ...formData, title: "" })}
                      labelText="Currency"
                      tooltipText="Enter the currency name"
                      required
                    />
                    {/* Translations for currency name */}
                    <LanguageInputDropdown
                      onSubmit={(values) => {
                        setCurrencyLanguageValues(values);
                        setFormData((prev) => ({
                          ...prev,
                          title_ar: values.ar || "",
                          title_hi: values.hi || "",
                          title_ur: values.ur || "",
                          title_bn: values.bn || "",
                        }));
                        setTimeout(() => focusNextInput("countryTitle"), 100);
                      }}
                      title="Currency Name"
                      initialValues={currencyLanguageValues}
                    />
                  </div>
                </div>
              )}

              {/* Country */}
              {countryPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("countryTitle")}
                    id="countryTitle"
                    name="countryTitle"
                    value={formData.countryTitle}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, countryTitle: "" })
                    }
                    labelText="Country"
                    tooltipText="Enter the country name"
                    required
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

            {/* Symbol Upload */}
            <div className="space-y-2 my-4">
              <ImageUploader
                onImageSelect={(file: any) => {
                  try {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setFormData((prev) => ({
                        ...prev,
                        symbol: (e.target?.result as string) || null,
                      }));
                    };
                    reader.readAsDataURL(file);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                existingImages={formData.symbol ? [formData.symbol] : []}
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
