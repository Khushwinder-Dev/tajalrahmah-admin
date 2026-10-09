/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermissions";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import type { RootState } from "@/store";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus, } from "lucide-react";  // for image -> Upload, X 
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  formFields,
  initialDataWithValue,
  initialProperties,
  printConfigFieldLabels,
  type ModuleCreateEditPageTypes,
  type ModuleFieldsType,
} from "./config/ModuleLevelConfig";
import { getModuleFromPath } from "@/lib/utils";
import { FloatingMultiSelect } from "@/components/common/FloatingMultiSelect";

type Props = {
  isEdit?: boolean;
};

export default function WorkCentersCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const detectedModule = getModuleFromPath(location.pathname);

  // Permission checks
  const canCreate = usePermission(detectedModule, "create");
  const canView = usePermission(detectedModule, "view");
  const canEdit = usePermission(detectedModule, "edit");
  const canDelete = usePermission(detectedModule, "delete");
  const canPdf: boolean = usePermission(detectedModule, "pdf");
  const canPrint: boolean = usePermission(detectedModule, "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const fieldKeys = Object.keys(
    initialProperties
  ) as (keyof ModuleFieldsType)[];
  const permissionsFieldLevel = usePermission<keyof ModuleCreateEditPageTypes>(
    detectedModule,
    "create",
    [...fieldKeys, "isDefault", "isDraft"]
  );

  console.log("permissionsFieldLevel", permissionsFieldLevel);

  // Form state
  const [formData, setFormData] = useState<ModuleCreateEditPageTypes>({
    ...initialProperties,

    isDefault: isDefaultState === "Yes",
    isDraft: false,
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
          navigate(`${location.pathname}/create`);
        } else {
          navigate(`${location.pathname}/edit/undefined`);
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate(`${location.pathname}/view`);
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
    if (isEdit && initialDataWithValue) {
      setFormData({
        ...initialDataWithValue,
      });
      setIsDraftState(initialDataWithValue.isDraft ? "Yes" : "No");
    }
  }, [isEdit, initialDataWithValue]);

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
      handlePrintLeaves(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess(
        `${location.pathname.split("/")[1]} ${
          isEdit ? "updated" : "created"
        } successfully!`
      );
      handleReset();
    } else {
      toastSuccess(
        `${location.pathname.split("/")[1]} ${
          isEdit ? "updated" : "created"
        } successfully!`
      );
      navigate(`/${location.pathname.split("/")[1]}`);
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
      ...initialProperties,

      isDefault: false,
      isDraft: false,
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
      inputRefs.current[fieldKeys[0]]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: `${location.pathname.split("/")[1]} Details`,
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          ...printConfigFieldLabels,

          isDefault: "Default Status",
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
      console.log("sampleReceivingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title={`${location.pathname.split("/")[1].replace("-", " ")} Details`}
          subtitle={`${location.pathname
            .split("/")[1]
            .replace("-", " ")} Information`}
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${location.pathname.split("/")[1]}-details.pdf`;
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
              toastRestore(
                `${location.pathname.split("/")[1]} saved as draft successfully`
              );
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

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
  //       setFormData({
  //         ...formData,
  //         attachment: e.target?.result as string,
  //       });
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

  // Trigger file input click
  // const triggerFileInput = () => {
  //   fileInputRef.current?.click();
  // };

  return (
    <>
      <PageLayout
        title={
          isEdit
            ? `${location.pathname.split("/")[1]} Editing`
            : `${location.pathname.split("/")[1]} Creating`
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath={`${location.pathname.split("/")[1]}`}
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage={isEdit ? "edit" : "create"}
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
            {/* All fields in one 4-column row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {formFields.map((field) => {
                if (
                  !permissionsFieldLevel[
                    field.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return null; // skip if not allowed
                }

                if (field.component === "input") {
                  return (
                    <div key={field.name} className="space-y-2 relative">
                      <EditableInput
                        setRef={setRef(field.name)}
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onNext={() =>
                          field.nextFocus && focusNextInput(field.nextFocus)
                        }
                        onCancel={() =>
                          setFormData({ ...formData, [field.name]: "" })
                        }
                        labelText={field.label}
                        tooltipText={field.tooltip}
                        required={field.required}
                      />
                    </div>
                  );
                }

                if (field.component === "autocomplete") {
                  return (
                    <div key={field.name} className="space-y-2 relative">
                      <Autocomplete
                        ref={(el: any) => setRef(field.name)(el)}
                        id={field.name}
                        name={field.name}
                        options={field.options || []}
                        value={formData[field.name]}
                        labelClassName="rounded-lg"
                        isSelectableOnly={true}
                        onValueChange={(value: string) => {
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: value,
                          }));
                          if (field.nextFocus) focusNextInput(field.nextFocus);
                        }}
                        onEnterPress={() => {
                          if (formData[field.name] && field.nextFocus) {
                            focusNextInput(field.nextFocus);
                          }
                        }}
                        placeholder=" "
                        labelText={field.label}
                        className="relative"
                        styles={{
                          input: {
                            borderColor: "var(--primary)",
                            "&:focus": { borderColor: "var(--primary)" },
                          },
                        }}
                      />
                    </div>
                  );
                }

                if (field.component === "mutiselect") {
                  return (
                    <div key={field.name} className="space-y-2 relative">
                      <FloatingMultiSelect
                        label={field.label}
                        data={field.options || []}
                        value={
                          formData[field.name]
                            ? (formData[field.name] as string)
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            : []
                        }
                        onChange={(value: string[]) => {
                          setFormData((prev) => ({
                            ...prev,
                            [field.name]: value.join(", "),
                          }));
                          if (field.nextFocus) focusNextInput(field.nextFocus);
                        }}
                      />
                    </div>
                  );
                }

                return null;
              })}

              {/* Default field - only show if user can create */}
              {permissionsFieldLevel.isDefault && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                      // Call focusNextInput if needed
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

              {/* Draft field - only show if user can create */}
              {permissionsFieldLevel.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={isDraftState === "Yes" ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDraftState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: newValue,
                      }));
                      focusNextInput("fileUploadElement");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDraft === true ||
                        formData.isDraft === false
                      ) {
                        focusNextInput("fileUploadElement");
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

            {/* Image Upload - only show if user can create */}
            {/* {permissionsFieldLevel.attachment && (
              <div className="space-y-2 my-8 pt-4 cursor-pointer relative">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 bg-[#f8fafc] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
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
                        setFormData({ ...formData, attachment: "" });
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
                        alt={"PI No Image"}
                        className="w-40 h-28 object-contain rounded-md"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setFormData({ ...formData, attachment: "" });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-14">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-base text-gray-500">
                        {"Drag and drop image or click to upload"}
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
                </div>
              </div>
            )} */}
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
