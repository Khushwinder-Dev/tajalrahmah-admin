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

type CountryData = {
  code: string;
  title: string;
  isDefault: boolean;
  isStatusActive: boolean;
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
  title_ar?: string;
  title_hi?: string;
  title_ur?: string;
  title_bn?: string;
};

type Props = {
  isEdit?: boolean;
};

const initialData: CountryData = {
  code: "US",
  title: "United States of America",
  isDefault: false,
  isStatusActive: true,
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

export default function CountryFormPage({ isEdit = false }: Props) {
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
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  // const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");
  const [statusState, setStatusState] = useState<"Active" | "Draft" | string>(
    "Active"
  );
  const [isStatusActive] = useState<boolean>(true);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [countryLanguageValues, setCountryLanguageValues] = useState<
    Record<string, string>
  >({});
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);

  // Permission checks
  const { canCreate, canView } = useCountriesPermissions();

  // Field-level permissions
  const countryName: boolean = usePermission(
    "countries",
    "create",
    "countryName"
  );
  const ISD: boolean = usePermission("countries", "create", "ISD");
  const isDefault: boolean = usePermission("countries", "create", "isDefault");
  // const isDraft: boolean = usePermission("countries", "create", "isDraft");
  const flag: boolean = usePermission("countries", "create", "flag");
  const canPdf: boolean = usePermission("countries", "pdf");
  const canPrint: boolean = usePermission("countries", "print");

  // Country codes for autocomplete
  const countryCodes = ["US", "CA", "GB", "AU", "DE", "FR"];

  // Form state
  const [formData, setFormData] = useState<CountryData>({
    code: "",
    ISD: "",
    title: "",
    isDefault: false,
    isStatusActive: true,
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

  // Simplified restore logic using the custom hook
  useEffect(() => {
    // Auto-restore if:
    // 1. Has minimized data
    // 2. Haven't already restored
    // 3. Current form is empty (to avoid overwriting user input)
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.title &&
      !formData.code &&
      !formData.ISD;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;

      // Restore all the data (ensure required field is present)
      setFormData({
        ...(savedFormData as any),
        isStatusActive:
          (savedFormData as any)?.isStatusActive !== undefined
            ? (savedFormData as any).isStatusActive
            : true,
      });

      if (moduleData.countryLanguageValues) {
        setCountryLanguageValues(moduleData.countryLanguageValues);
      }

      setIsDefaultState(savedFormData.isDefault ? "Yes" : "No");
      // setIsDraftState(savedFormData.isDraft ? "Yes" : "No");
      setStatusState(savedFormData.isActive ? "Active" : "Draft");

      setIsRestoredFromMinimized(true);

      // Restore scroll position
      const scrollPosition = getModuleScrollPosition("country-form-module");
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
    formData.ISD,
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
      setFormData({
        ...initialData,
        flag: null,
      });
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      // setIsDraftState(initialData.isDraft ? "Yes" : "No");
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
          navigate("/countries/create");
        } else {
          navigate("/countries/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/countries/view");
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
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintCountry(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Country created successfully!");
      handleReset();
    } else {
      toastSuccess("Country created successfully!");
      navigate("/countries");
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
      isDefault: false,
      isStatusActive: true,
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
    setIsDefaultState("No");
    // setIsDraftState("No");
    setStatusState("Active");
    setCountryLanguageValues({});
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Reset module data using the custom hook
    if (hasMinimizedData) {
      try {
        await resetModuleData("country-form-module");
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

  const handlePrintCountry = (countryData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Country Details",
        data: [countryData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Country Code",
          title: "Country Name",
          ISD: "ISD",
          isDefault: "Default Country",
          isActive: "Active Status",
          isDraft: "Draft Status",
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
    try {
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
              toastRestore("Country saved as draft successfully");
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
      countryLanguageValues,
    };
  }, [formData, countryLanguageValues]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="country-form-module"
        moduleName={isEdit ? "Edit Country" : "Adding Country"}
        moduleRoute={
          isEdit
            ? `/countries/edit/${formData.code || "new"}`
            : "/countries/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? labels.editingCountry : labels.addingCountry}
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
        activePage="create"
        module="countries"
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
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Code field - only show if user can create */}
              {canCreate && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("code")(el)}
                    id="code"
                    name="code"
                    allowCustomInput={true}
                    options={countryCodes}
                    value={formData.code}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, code: value });
                      if (value) {
                        focusNextInput("ISD");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.code) {
                        focusNextInput("ISD");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.code}
                    className="relative"
                    tooltipText={labels.countryCodeTooltip}
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

              {/* Calling Code field - only show if user can create */}
              {ISD && (
                <div className="space-y-2">
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
              )}

              {/* Country field - only show if user can create */}
              {countryName && (
                <div className="space-y-2">
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
              )}

              {/* Draft field - only show if user can create */}
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
                        date: "Set default country",
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
                      focusNextInput("status");
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
                    className="relative"
                    tooltipText={labels.defaultCountryTooltip}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
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
                        date: "Set active",
                      },
                      { label: "Draft", value: "Draft", date: "Set draft" },
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

            {/* Flag Upload - only show if user can create */}
            {flag && (
              // <div className="space-y-2 my-8 pt-4 cursor-pointer relative">
              //   <div
              //     className={`border-2 border-dashed rounded-lg p-6 bg-[#f8fafc] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              //       isDragging
              //         ? "border-blue-500 bg-blue-50"
              //         : "border-gray-300"
              //     }`}
              //     tabIndex={0}
              //     ref={(el) => setRef("fileUploadElement")(el as HTMLElement)}
              //     onDragEnter={handleDragEnter}
              //     onDragLeave={handleDragLeave}
              //     onDragOver={handleDragOver}
              //     onDrop={handleDrop}
              //     onClick={triggerFileInput}
              //     onKeyDown={(e) => {
              //       if (e.key === "Enter" || e.key === " ") {
              //         e.preventDefault();
              //         if (imagePreview) {
              //           setImagePreview(null);
              //           setFormData({ ...formData, flag: null });
              //           setTimeout(() => {
              //             triggerFileInput();
              //           }, 0);
              //         } else {
              //           triggerFileInput();
              //         }
              //       }
              //     }}
              //   >
              //     {imagePreview ? (
              //       <div className="relative inline-block">
              //         <img
              //           src={imagePreview}
              //           alt={labels.flagPreview}
              //           className="w-40 h-28 object-contain rounded-md"
              //         />
              //         <Button
              //           variant="ghost"
              //           size="icon"
              //           className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
              //           onClick={(e) => {
              //             e.stopPropagation();
              //             setImagePreview(null);
              //             setFormData({ ...formData, flag: null });
              //           }}
              //         >
              //           <X className="h-4 w-4" />
              //         </Button>
              //       </div>
              //     ) : (
              //       <div className="flex flex-col items-center justify-center gap-2 py-14">
              //         <Upload className="h-10 w-10 text-gray-400" />
              //         <p className="text-base text-gray-500">
              //           {labels.dragDropImage}
              //         </p>
              //       </div>
              //     )}
              //     <input
              //       ref={fileInputRef}
              //       type="file"
              //       onChange={handleImageChange}
              //       accept="image/*"
              //       className="hidden"
              //     />
              //   </div>
              // </div>
              <ImageUploader
                onImageSelect={(file: any) => console.log("Selected:", file)}
                existingImages={[
                  "/sample1.png",
                  "/sample1.png",
                  "/sample1.png",
                ]}
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
            { key: "name", label: "Name" },
          ]}
          data={[
            { code: "US", name: "United States" },
            { code: "CA", name: "Canada" },
            { code: "GB", name: "United Kingdom" },
            { code: "AU", name: "Australia" },
            { code: "DE", name: "Germany" },
            { code: "FR", name: "France" },
            { code: "US", name: "United States" },
            { code: "CA", name: "Canada" },
            { code: "GB", name: "United Kingdom" },
            { code: "AU", name: "Australia" },
            { code: "DE", name: "Germany" },
            { code: "FR", name: "France" },
          ]}
          onSelect={(selectedData: any) => {
            console.log("Selected:", selectedData);
            setShowTemplates(false); // Close modal after selection
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
