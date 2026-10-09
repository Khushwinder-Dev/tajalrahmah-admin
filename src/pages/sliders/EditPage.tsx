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

type SliderData = {
  titleEn: string;
  titleAr: string;
  topTitleEn: string;
  topTitleAr: string;
  keyTagsEn: string;
  keyTagsAr: string;
  bannerType: string;
  bannerEn: string;
  bannerAr: string;
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

type SliderModuleData = {
  formData: SliderData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: SliderData = {
  titleEn: "Welcome to Our Platform",
  titleAr: "مرحباً بكم في منصتنا",
  topTitleEn: "Get Started",
  topTitleAr: "ابدأ الآن",
  keyTagsEn: "Welcome, Platform, Introduction",
  keyTagsAr: "ترحيب، منصة، مقدمة",
  bannerType: "Hero",
  bannerEn: "hero-banner-en.jpg",
  bannerAr: "hero-banner-ar.jpg",
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

export default function SliderEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  // const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Get module ID for this edit page
  const moduleId = `slider-edit-module-${id || "new"}`;

  // Use the custom hook for minimized module data
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useMinimizedModuleData<SliderModuleData>(moduleId);

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
  const titleEn: boolean = usePermission("sliders", "edit", "titleEn");
  const titleAr: boolean = usePermission("sliders", "edit", "titleAr");
  const topTitleEn: boolean = usePermission("sliders", "edit", "topTitleEn");
  const topTitleAr: boolean = usePermission("sliders", "edit", "topTitleAr");
  const keyTagsEn: boolean = usePermission("sliders", "edit", "keyTagsEn");
  const keyTagsAr: boolean = usePermission("sliders", "edit", "keyTagsAr");
  const bannerType: boolean = usePermission("sliders", "edit", "bannerType");
  const bannerEn: boolean = usePermission("sliders", "edit", "bannerEn");
  const bannerAr: boolean = usePermission("sliders", "edit", "bannerAr");
  const status: boolean = usePermission("sliders", "edit", "status");
  const isDefault: boolean = usePermission("sliders", "edit", "isDefault");
  const canPdf: boolean = usePermission("sliders", "pdf");
  const canPrint: boolean = usePermission("sliders", "print");

  // Form state
  const [formData, setFormData] = useState<SliderData>({
    titleEn: "",
    titleAr: "",
    topTitleEn: "",
    topTitleAr: "",
    keyTagsEn: "",
    keyTagsAr: "",
    bannerType: "",
    bannerEn: "",
    bannerAr: "",
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
        !formData.titleEn);

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
    formData.titleEn,
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
  }, [
    isEdit,
    hasMinimizedData,
    isRestoredFromMinimized,
    moduleId,
    formData.titleEn,
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
      handlePrintSlider(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Slider updated successfully!");
      handleReset();
    } else {
      toastSuccess("Slider updated successfully!");
      navigate("/sliders");
    }
  };

  // Update handleReset function to use the custom hook
  const handleReset = async () => {
    setFormData({
      titleEn: "",
      titleAr: "",
      topTitleEn: "",
      topTitleAr: "",
      keyTagsEn: "",
      keyTagsAr: "",
      bannerType: "",
      bannerEn: "",
      bannerAr: "",
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
      inputRefs.current["titleEn"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintSlider = (sliderData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Slider Details",
        data: [sliderData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          titleEn: "Title (EN)",
          titleAr: "Title (AR)",
          topTitleEn: "Top Title (EN)",
          topTitleAr: "Top Title (AR)",
          keyTagsEn: "Key Tags (EN)",
          keyTagsAr: "Key Tags (AR)",
          bannerType: "Banner Type",
          bannerEn: "Banner (EN)",
          bannerAr: "Banner (AR)",
          status: "Status",
          isDefault: "Default Slider",
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
          title="Slider Details"
          subtitle="Slider Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "slider-details.pdf";
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
        navigate("/sliders/create");
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/sliders/view");
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
              toastRestore("Slider saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler using the custom hook
  const handleMinimize = useCallback((): SliderModuleData => {
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
        moduleName={`Edit Slider`}
        moduleRoute={`/sliders/edit/${id || "new"}`}
        onMinimize={handleMinimize}
        title="Edit Slider"
        listPath="sliders"
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
        module="sliders"
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
            {/* First Row: Title En, Title Ar, Top Title En, Top Title Ar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Title En field - only show if user can edit */}
              {titleEn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("titleEn")}
                    id="titleEn"
                    name="titleEn"
                    value={formData.titleEn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("titleAr")}
                    onCancel={() => setFormData({ ...formData, titleEn: "" })}
                    labelText="Title (EN)"
                    tooltipText="Enter the English title"
                    required
                  />
                </div>
              )}

              {/* Title Ar field - only show if user can edit */}
              {titleAr && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("titleAr")}
                    id="titleAr"
                    name="titleAr"
                    value={formData.titleAr}
                    onChange={handleChange}
                    onNext={() => focusNextInput("topTitleEn")}
                    onCancel={() => setFormData({ ...formData, titleAr: "" })}
                    labelText="Title (AR)"
                    tooltipText="Enter the Arabic title"
                    required
                  />
                </div>
              )}

              {/* Top Title En field - only show if user can edit */}
              {topTitleEn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("topTitleEn")}
                    id="topTitleEn"
                    name="topTitleEn"
                    value={formData.topTitleEn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("topTitleAr")}
                    onCancel={() =>
                      setFormData({ ...formData, topTitleEn: "" })
                    }
                    labelText="Top Title (EN)"
                    tooltipText="Enter the English top title"
                    required
                  />
                </div>
              )}

              {/* Top Title Ar field - only show if user can edit */}
              {topTitleAr && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("topTitleAr")}
                    id="topTitleAr"
                    name="topTitleAr"
                    value={formData.topTitleAr}
                    onChange={handleChange}
                    onNext={() => focusNextInput("keyTagsEn")}
                    onCancel={() =>
                      setFormData({ ...formData, topTitleAr: "" })
                    }
                    labelText="Top Title (AR)"
                    tooltipText="Enter the Arabic top title"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Key Tags En, Key Tags Ar, Banner Type, Banner En */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Key Tags En field - only show if user can edit */}
              {keyTagsEn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("keyTagsEn")}
                    id="keyTagsEn"
                    name="keyTagsEn"
                    value={formData.keyTagsEn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("keyTagsAr")}
                    onCancel={() => setFormData({ ...formData, keyTagsEn: "" })}
                    labelText="Key Tags (EN)"
                    tooltipText="Enter English key tags (comma separated)"
                    required
                  />
                </div>
              )}

              {/* Key Tags Ar field - only show if user can edit */}
              {keyTagsAr && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("keyTagsAr")}
                    id="keyTagsAr"
                    name="keyTagsAr"
                    value={formData.keyTagsAr}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bannerType")}
                    onCancel={() => setFormData({ ...formData, keyTagsAr: "" })}
                    labelText="Key Tags (AR)"
                    tooltipText="Enter Arabic key tags (comma separated)"
                    required
                  />
                </div>
              )}

              {/* Banner Type field - only show if user can edit */}
              {bannerType && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("bannerType")}
                    id="bannerType"
                    name="bannerType"
                    value={formData.bannerType}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bannerEn")}
                    onCancel={() =>
                      setFormData({ ...formData, bannerType: "" })
                    }
                    labelText="Banner Type"
                    tooltipText="Enter banner type (e.g., Hero, Service, Tech)"
                    required
                  />
                </div>
              )}

              {/* Banner En field - only show if user can edit */}
              {bannerEn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("bannerEn")}
                    id="bannerEn"
                    name="bannerEn"
                    value={formData.bannerEn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bannerAr")}
                    onCancel={() => setFormData({ ...formData, bannerEn: "" })}
                    labelText="Banner (EN)"
                    tooltipText="Enter English banner filename"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third Row: Banner Ar, Status, Default */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Banner Ar field - only show if user can edit */}
              {bannerAr && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("bannerAr")}
                    id="bannerAr"
                    name="bannerAr"
                    value={formData.bannerAr}
                    onChange={handleChange}
                    onNext={() => focusNextInput("status")}
                    onCancel={() => setFormData({ ...formData, bannerAr: "" })}
                    labelText="Banner (AR)"
                    tooltipText="Enter Arabic banner filename"
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
                    multiSelect={false}
                    options={[
                      {
                        label: "Active",
                        value: "active",
                        date: "Set active slider",
                      },
                      {
                        label: "Inactive",
                        value: "inactive",
                        date: "Set inactive slider",
                      },
                      {
                        label: "Draft",
                        value: "draft",
                        date: "Set draft slider",
                      },
                      {
                        label: "Delete",
                        value: "deleted",
                        date: "Set delete slider",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;
                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as
                          | "active"
                          | "inactive"
                          | "draft"
                          | "deleted",
                        isDeleted: stringValue === "deleted",
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
                    tooltipText="Set the slider status"
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
                        date: "Set default slider",
                      },
                      {
                        label: "No",
                        value: "No",
                        date: "Remove default slider",
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
                    tooltipText="Set as default slider"
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
                  tooltipText="Slider Action History"
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
