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
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCountriesPermissions, usePermission } from "@/hooks/usePermissions";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

type CurrencyData = {
  code: string;
  title: string; // currency name
  countryTitle: string; // country name
  exchange: string; // exchange rate as string
  symbol: string | null; // uploaded symbol (base64/url)
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type CurrencyModuleData = {
  formData: CurrencyData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CurrencyData = {
  code: "USD",
  title: "US Dollar",
  countryTitle: "United States",
  exchange: "1.0",
  symbol: null,
  isDefault: false,
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function CurrenciesEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isRTL } = useAppSelector((state) => state.language);

  const moduleId = `currency-edit-module-${id || "new"}`;

  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<CurrencyModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [statusState, setStatusState] = useState<string>("Active");
  const [selectedAction, setSelectedAction] = useState<string>("");

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const codePerm: boolean = usePermission("currencies", "edit", "code");
  const currencyNamePerm: boolean = usePermission(
    "currencies",
    "edit",
    "currency"
  );
  const exchangePerm: boolean = usePermission("currencies", "edit", "exchange");
  const countryPerm: boolean = usePermission("currencies", "edit", "country");
  const isDefaultPerm: boolean = usePermission(
    "currencies",
    "edit",
    "isDefault"
  );
  const canPdf: boolean = usePermission("currencies", "pdf");
  const canPrint: boolean = usePermission("currencies", "print");

  // currency code options
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
  const [formData, setFormData] = useState<CurrencyData>({
    code: "",
    title: "",
    countryTitle: "",
    exchange: "",
    symbol: null,
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

  // Restore logic using the custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.title &&
      !formData.code;

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      setFormData(moduleData.formData);
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");
      if (moduleData.formData.isDeleted) {
        setStatusState("Delete");
      } else if (moduleData.formData.isDraft) {
        setStatusState("Draft");
      } else if (moduleData.formData.isActive) {
        setStatusState("Active");
      } else {
        setStatusState("InActive");
      }
      setIsRestoredFromMinimized(true);

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
    formData.title,
    formData.code,
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
      if (initialData.isDeleted) {
        setStatusState("Delete");
      } else if (initialData.isDraft) {
        setStatusState("Draft");
      } else if (initialData.isActive) {
        setStatusState("Active");
      } else {
        setStatusState("InActive");
      }
    }
  }, [isEdit, hasMinimizedData, isRestoredFromMinimized]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    } as CurrencyData;
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

    toastSuccess("Currency updated successfully!");
    navigate("/currencies");
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

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData(moduleId);
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
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
          navigate(`/currencies/edit/${id || "new"}`);
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
              setFormData((prev) => ({ ...prev, isDraft: true }));
              toastRestore("Currency saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const handleMinimize = useCallback((): CurrencyModuleData => {
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
        moduleName={`Edit Currency`}
        moduleRoute={`/currencies/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Currency"
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
        activePage="edit"
        module="currencies"
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
                      if (value) focusNextInput("exchange");
                    }}
                    onEnterPress={() => {
                      if (formData.code) focusNextInput("exchange");
                    }}
                    placeholder=" "
                    labelText="Code"
                    className="relative"
                    tooltipText="Enter the currency code"
                    userLang={isRTL ? "ar" : "en"}
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Default */}
              {isDefaultPerm && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    labelText="Default"
                    multiSelect={false}
                    options={[
                      { label: "Yes", value: "Yes", date: "Set default" },
                      { label: "No", value: "No", date: "Remove default" },
                    ]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === "Yes"
                        : value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: isYes,
                      }));
                    }}
                    placeholder=""
                  />
                </div>
              )}
              {/* Status - Active, InActive, Draft, Delete */}
              <div className="space-y-2">
                <SwitchSelect
                  ref={(el: any) => setRef("status")(el)}
                  id="status"
                  name="status"
                  labelText="Status"
                  multiSelect={false}
                  options={[
                    { label: "Active", value: "Active", date: "Set active" },
                    {
                      label: "InActive",
                      value: "InActive",
                      date: "Set inactive",
                    },
                    { label: "Draft", value: "Draft", date: "Set draft" },
                    { label: "Delete", value: "Delete", date: "Set delete" },
                  ]}
                  value={statusState}
                  onValueChange={(value: string | string[]) => {
                    const stringValue = Array.isArray(value)
                      ? value[0] || ""
                      : value;
                    setStatusState(stringValue);
                    setFormData((prev) => ({
                      ...prev,
                      isDeleted: stringValue === "Delete",
                      isDraft: stringValue === "Draft",
                      isActive: stringValue === "Active",
                    }));
                  }}
                  placeholder=""
                />
              </div>

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
                />
              </div>
            </div>

            {/* Symbol Upload at bottom */}
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
        title="Reset Form"
        message="Are you sure you want to reset the form?"
        confirmText="Reset"
        cancelText="Cancel"
      />
    </>
  );
}
