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
import { Check, Edit, Eye, Plus } from "lucide-react";
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
import FieldMoreItems, {
  type FieldConfig,
  type ItemData,
} from "@/components/FieldMoreItems";

type Props = {
  isEdit?: boolean;
};

export default function ProductionEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const location = useLocation();

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  // Service items state for FieldMoreItems
  const [serviceItems, setServiceItems] = useState<ItemData[]>([
    {
      serviceName: "",
      quantity: 1,
      rate: 0,
    },
  ]);

  // Field configuration for service items
  const serviceFieldConfig: FieldConfig[] = [
    {
      key: "serviceName",
      label: "Service Name",
      type: "select",
      placeholder: "Select Service",
      options: [
        "Room Charges",
        "Consultation Fee",
        "Medicine Charges",
        "Laboratory Tests",
        "Operation Charges",
        "Emergency Services",
        "Ambulance Service",
        "Nursing Care",
        "Physiotherapy",
        "X-Ray Services",
        "CT Scan",
        "MRI Scan",
      ],
      required: true,
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "1",
      required: true,
    },
    {
      key: "rate",
      label: "Rate",
      type: "number",
      placeholder: "0.00",
      required: true,
    },
  ];

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

      // Initialize service items from edit data
      if (initialDataWithValue.serviceName) {
        setServiceItems([
          {
            serviceName: initialDataWithValue.serviceName,
            quantity: Number(initialDataWithValue.quantity) || 1,
            rate: Number(initialDataWithValue.rate) || 0,
          },
        ]);
      }
    }
  }, [isEdit]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle service items change
  const handleServiceItemsChange = (items: ItemData[]) => {
    setServiceItems(items);

    // Update form data with service items
    const firstServiceItem = items[0];
    if (firstServiceItem) {
      const quantity = Number((firstServiceItem as any).quantity) || 0;
      const rate = Number((firstServiceItem as any).rate) || 0;
      const subTotal = quantity * rate;

      setFormData((prev) => ({
        ...prev,
        serviceName: String((firstServiceItem as any).serviceName || ""),
        quantity: String(quantity),
        rate: String(rate),
        subTotal: String(subTotal),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Service Items:", serviceItems);
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
    setIsDraftState("No");

    // Reset service items
    setServiceItems([
      {
        serviceName: "",
        quantity: 1,
        rate: 0,
      },
    ]);

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
  }, [formData.isDraft, canCreate, location.pathname]);

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
            {/* Grid layout with image taking 2 cols on right, fields on left */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Patient Image - 2 columns width, 2 rows height, positioned at top-right */}
              <div className="col-span-2 row-span-2 order-last md:order-none">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Patient Image
                </label>
                <div className="relative w-full h-56 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Patient"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400 dark:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        No image uploaded
                      </p>
                      <button
                        type="button"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
                        onClick={() => {
                          console.log("Upload image clicked");
                        }}
                      >
                        Click to upload
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setFormData({
                            ...formData,
                            image: e.target?.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Form fields - first few fields in left columns */}
              {formFields.slice(0, 4).map((field) => {
                if (
                  !permissionsFieldLevel[
                    field.name as keyof typeof permissionsFieldLevel
                  ]
                ) {
                  return null; // skip if not allowed
                }

                if (field.component === "input") {
                  return (
                    <div key={field.name} className="relative">
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
                    <div key={field.name} className="relative">
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
                    <div key={field.name} className="relative">
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
            </div>

            {/* Remaining fields - each taking full width (4 columns) outside the grid */}
            <div className="mt-6 grid grid-cols-4 gap-8">
              {formFields
                .slice(4)
                .filter(
                  (field) =>
                    !["serviceName", "quantity", "rate", "subTotal"].includes(
                      field.name
                    )
                )
                .map((field) => {
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
                            if (field.nextFocus)
                              focusNextInput(field.nextFocus);
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
                            if (field.nextFocus)
                              focusNextInput(field.nextFocus);
                          }}
                        />
                      </div>
                    );
                  }

                  return null;
                })}
            </div>

            {/* Service Items Section */}
            <div className="mt-8 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Service Details
              </h3>
              <FieldMoreItems
                fields={serviceFieldConfig}
                items={serviceItems}
                onItemsChange={handleServiceItemsChange}
                addButtonText="Add Service Item"
                deleteButtonText="Remove"
                className="w-full"
                minItems={1}
                maxItems={10}
                showAddButton={true}
                showDeleteButton={true}
              />
            </div>

            {/* System fields in a separate row */}
            <div className="mt-6">
              <div className="flex gap-10">
                {/* Default field - only show if user can create */}
                {permissionsFieldLevel.isDefault && (
                  <div className="relative">
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
                  <div className="relative">
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
                        focusNextInput("submitButton");
                      }}
                      onEnterPress={() => {
                        if (
                          formData.isDraft === true ||
                          formData.isDraft === false
                        ) {
                          focusNextInput("submitButton");
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
            </div>
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
