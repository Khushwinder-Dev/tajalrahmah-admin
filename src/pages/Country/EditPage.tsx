/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import { LanguageInputDropdown } from "@/components/LanguageInputDropdown";
import type { CountryModuleData } from "@/types/modules";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { useMinimizedModuleData } from "@/hooks/useMinimizedModuleData";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";
import { ImageUploader } from "@/components/common/ImageUploader";
import { ActionsAutocomplete } from "@/components/common/ActionsAutocomplete";

type CountryData = {
  code: string;
  title: string;
  // Add multilingual country names
  title_ar?: string;
  title_hi?: string;
  title_ur?: string;
  title_bn?: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  flag: string | null;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  ISD: string;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CountryData = {
  code: "US",
  title: "United States of America",
  isDefault: false,
  isActive: true,
  isDraft: false,
  rating: 3,
  flag: null,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  ISD: "+971",
  isDeleted: false,
};

export default function CountryEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL params
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `country-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<CountryModuleData>(moduleId);

  const [keepCreating, setKeepCreating] = useState(false);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [statusState, setStatusState] = useState<
    "Active" | "Draft" | "Delete" | string
  >("Active");
  const [selectedAction, setSelectedAction] = useState<string>("");

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [countryLanguageValues, setCountryLanguageValues] = useState<
    Record<string, string>
  >({});
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [shouldRestoreFromMinimized, setShouldRestoreFromMinimized] =
    useState(false);
  const [isStatusActive] = useState<boolean>(true);

  // Form state
  const [formData, setFormData] = useState<CountryData>({
    code: "",
    ISD: "",
    title: "",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 3,
    flag: null,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // get permission
  const canPdf: boolean = usePermission("countries", "pdf");
  const canPrint: boolean = usePermission("countries", "print");

  // Country codes for autocomplete
  const countryCodes = ["US", "CA", "GB", "AU", "DE", "FR"];

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
      console.log(
        "Setting shouldRestoreFromMinimized to true from localStorage"
      );
      setShouldRestoreFromMinimized(true);
      localStorage.removeItem(`restore-${moduleId}`);
    }
  }, [moduleId]);

  // Restore logic using the custom hook
  useEffect(() => {
    console.log("Checking for restored module...");
    console.log("Has minimized data:", hasMinimizedData);
    console.log("shouldRestoreFromMinimized flag:", shouldRestoreFromMinimized);

    // Check if we should restore automatically
    const shouldAutoRestore =
      shouldRestoreFromMinimized ||
      (hasMinimizedData &&
        moduleData?.formData &&
        !isRestoredFromMinimized &&
        !formData.title &&
        !formData.code);

    if (hasMinimizedData && moduleData?.formData && shouldAutoRestore) {
      console.log("Found restored module and should restore:", moduleData);

      console.log("Restoring form data:", moduleData.formData);

      // Restore form data
      setFormData(moduleData.formData);

      // Restore language values
      if (moduleData.countryLanguageValues) {
        setCountryLanguageValues(moduleData.countryLanguageValues);
      }

      // Restore UI states based on form data
      setIsDefaultState(moduleData.formData.isDefault ? "Yes" : "No");
      if (moduleData.formData.isDeleted) {
        setStatusState("Delete");
      } else if (moduleData.formData.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }

      // Restore image preview if exists
      if (moduleData.formData.flag) {
        // setImagePreview(moduleData.formData.flag);
      }

      // Set flag to prevent re-restoration
      setIsRestoredFromMinimized(true);
      setShouldRestoreFromMinimized(false);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition(moduleId);
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    } else if (hasMinimizedData && !shouldAutoRestore) {
      console.log("Found minimized module but not restoring automatically");
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    shouldRestoreFromMinimized,
    formData.title,
    formData.code,
    moduleId,
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
      console.log("Initializing with edit data:", initialData);
      setFormData({
        ...initialData,
        flag: null,
      });
      if (initialData.flag) {
        // setImagePreview(initialData.flag);
      }
      // Initialize language values if they exist
      setCountryLanguageValues({
        ar: initialData.title_ar || "",
        hi: initialData.title_hi || "",
        ur: initialData.title_ur || "",
        bn: initialData.title_bn || "",
      });
      setIsDefaultState(initialData.isDefault ? labels.yes : labels.no);
      if (initialData.isDeleted) {
        setStatusState("Delete");
      } else if (initialData.isDraft) {
        setStatusState("Draft");
      } else {
        setStatusState("Active");
      }
    }
  }, [isEdit, labels, hasMinimizedData, isRestoredFromMinimized, moduleId]);

  // Handle drag events
  // const handleDragEnter = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(false);
  // };

  // const handleDragOver = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // const handleDrop = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(false);

  //   const files = e.dataTransfer.files;
  //   if (files && files.length > 0) {
  //     handleImageFile(files[0]);
  //   }
  // };

  // Handle image file selection
  // const handleImageFile = (file: File) => {
  //   if (file.type.match("image.*")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImagePreview(e.target?.result as string);
  //       setFormData({ ...formData, flag: e.target?.result as string });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Handle image upload via file input
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     handleImageFile(file);
  //     setTimeout(() => {
  //       focusNextInput("submitButton");
  //     }, 0);
  //   }
  // };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    console.log("Form data changed:", newFormData);
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintCountry(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Country updated successfully!");
      handleReset();
    } else {
      toastSuccess("Country updated successfully!");
      navigate("/countries");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      code: "",
      title: "",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      rating: 3,
      flag: null,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
      ISD: "",
    });
    // setImagePreview(null);
    setIsDefaultState(labels.no);
    setStatusState("Active");
    setSelectedAction("");
    setCountryLanguageValues({});
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
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  // Trigger file input click
  // const triggerFileInput = () => {
  //   fileInputRef.current?.click();
  // };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintCountry = (countryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Country Details",
        data: [countryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: labels.code,
          title: labels.country,
          ISD: "ISD",
          isDefault: labels.default,
          isActive: "Active Status",
          isDraft: labels.draft,
          isDeleted: "Deleted Status",
          rating: "Rating",
          flag: "Flag",
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
      console.log("countryData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Country Details"
          subtitle="Country Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "countries-details.pdf";
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
        navigate("/countries/create");
      },
      show: true,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/countries/view");
      },
      show: true,
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
            label: labels.draft,
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Country saved as draft successfully");
            },
            show: true,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, labels]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): CountryModuleData => {
    console.log("Minimizing edit page with data:", {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      countryLanguageValues,
    });

    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
      countryLanguageValues,
    };
  }, [formData, countryLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId={moduleId}
        moduleName={`Edit Country`}
        moduleRoute={`/countries/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title={labels.editingCountry}
        listPath="countries"
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
        module="countries"
        additionalFooterButtons={
          <div className="flex gap-4 max-[435px]:gap-2">
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleResetClick}
            >
              {labels.reset}
            </Button>
            <Button
              variant="outline"
              className="gap-2 hover:bg-primary/90 bg-white rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
              onClick={handleSubmit}
            >
              {labels.submit}
            </Button>
          </div>
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
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("code")(el)}
                  id="code"
                  name="code"
                  allowCustomInput={true}
                  options={countryCodes}
                  value={formData.code}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, code: value });
                    focusNextInput("ISD");
                  }}
                  isShowTemplateIcon={false}
                  onEnterPress={() => {
                    if (formData.code) {
                      focusNextInput("ISD");
                    }
                  }}
                  placeholder=""
                  labelText={labels.code}
                  className="relative"
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText={labels.countryCodeTooltip}
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <EditableInput
                  setRef={setRef("ISD")}
                  id="ISD"
                  name="ISD"
                  value={formData.ISD}
                  onChange={handleChange}
                  onNext={() => focusNextInput("title")}
                  onCancel={() => setFormData({ ...formData, ISD: "" })}
                  labelText="ISD"
                  tooltipText={labels.isdTooltip}
                  required
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <div className="relative">
                  <EditableInput
                    setRef={setRef("title")}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, title: "" })}
                    labelText={labels.country}
                    tooltipText={labels.countryNameTooltip}
                    required
                  />

                  {/* Language Input Dropdown */}
                  <LanguageInputDropdown
                    onSubmit={(values) => {
                      setCountryLanguageValues(values);
                      console.log("Country translations:", values);
                      setFormData((prev) => ({
                        ...prev,
                        title_ar: values.ar || "",
                        title_hi: values.hi || "",
                        title_ur: values.ur || "",
                        title_bn: values.bn || "",
                      }));
                      setTimeout(() => {
                        focusNextInput("isDefault");
                      }, 100);
                    }}
                    title="Country Name"
                    initialValues={countryLanguageValues}
                  />
                </div>
              </div>

              <div className="md:col-span-3 space-y-2">
                <SwitchSelect
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  options={[
                    {
                      label: labels.yes,
                      value: labels.yes,
                      date: "set default country",
                    },
                    {
                      label: labels.no,
                      value: labels.no,
                      date: "Remove default country",
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
                    focusNextInput("isDraft");
                  }}
                  onEnterPress={() => {
                    if (
                      formData.isDefault === true ||
                      formData.isDefault === false
                    ) {
                      focusNextInput("isDeleted");
                    }
                  }}
                  placeholder=" "
                  labelText={labels.default}
                  tooltipText={labels.defaultCountryTooltip}
                  className="relative"
                />
              </div>

              {isStatusActive && (
                <div className="md:col-span-3 space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    labelText="Status"
                    multiSelect={false} // Single select mode
                    options={[
                      {
                        label: "Active",
                        value: "Active",
                        date: "Set active country",
                      },
                      {
                        label: "InActive",
                        value: "InActive",
                        date: "Set inactive country",
                      },
                      {
                        label: "Draft",
                        value: "Draft",
                        date: "Set draft country",
                      },
                      {
                        label: "Delete",
                        value: "Delete",
                        date: "Set delete country",
                      },
                    ]}
                    value={statusState}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      console.log("switch value", stringValue);
                      setStatusState(stringValue);

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
                    tooltipText={labels.statusTooltip}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="md:col-span-3 space-y-2">
                <ActionsAutocomplete
                  ref={(el: any) => setRef("actions")(el)}
                  id="actions"
                  name="actions"
                  labelText="Action"
                  value={selectedAction}
                  actions={[
                    {
                      action: "Created",
                      user: "Karim",
                      role: "Super User",
                      date: "06 Aug 2025",
                      value: "created",
                    },
                    {
                      action: "Updated",
                      user: "Rahim",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "updated",
                    },
                    {
                      action: "Inactive",
                      user: "Rahim",
                      role: "Admin",
                      date: "08 Aug 2025",
                      value: "inactive",
                    },
                    {
                      action: "Drafted",
                      user: "Karim",
                      role: "Super User",
                      date: "07 Aug 2025",
                      value: "drafted",
                    },
                    {
                      action: "Deleted",
                      user: "Abdullah",
                      role: "Super Admin",
                      date: "09 Aug 2025",
                      value: "deleted",
                    },
                  ]}
                  placeholder=""
                  onValueChange={(value: string) => {
                    setSelectedAction(value);
                    console.log("Selected action:", value);
                  }}
                  styles={{
                    input: {
                      borderColor: "var(--primary)",
                      "&:focus": {
                        borderColor: "var(--primary)",
                      },
                    },
                  }}
                  tooltipText="Country Action"
                />
              </div>
            </div>

            {/* Flag Upload */}
            <div className="space-y-2 my-8 pt-4 cursor-pointer relative">
              {/* <div
                className={`border-2 border-dashed rounded-lg p-6 bg-[#f8fafc] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
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
                    if (imagePreview) {
                      setImagePreview(null);
                      setFormData({ ...formData, flag: null });
                      setTimeout(() => {
                        triggerFileInput();
                      }, 0);
                    } else {
                      triggerFileInput();
                    }
                  }
                }}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt={labels.flagPreview}
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
                  <div className="flex flex-col items-center justify-center gap-2 py-14">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-base text-gray-500">
                      {labels.dragDropImage}
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
              </div> */}
              <ImageUploader
                onImageSelect={(file: any) => {
                  if (file === "") {
                    // Handle flag removal
                    setFormData((prev) => ({
                      ...prev,
                      flag: null,
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      flag: file,
                    }));
                  }
                }}
                existingImages={["/sample1.png"]}
                isEditPage={true}
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
    </>
  );
}
