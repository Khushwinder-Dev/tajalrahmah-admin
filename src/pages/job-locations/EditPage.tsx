/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type ProjectTypeDataType = {
  jobLocation: string;
  country: string;
  description: string;

  isDefault: boolean;
  isActive: boolean;
  isDeleted: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  jobLocation: "Dhaka",
  country: "BD",
  description: "This is description",
  isDefault: false,
  isActive: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function JobLocationsEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isActiveState, setIsActiveState] = useState<"Yes" | "No" | string>(
    "No"
  );
  const [isDeletedState, setIsDeletedState] = useState<
    "Delete" | "Restore" | string
  >("");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("jobLocations", "create");
  const canView = usePermission("jobLocations", "view");
  const canEdit = usePermission("jobLocations", "edit");
  const canDelete = usePermission("jobLocations", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const jobLocation: boolean = usePermission(
    "jobLocations",
    "create",
    "jobLocation"
  );

  const country: boolean = usePermission("jobLocations", "create", "country");

  const description: boolean = usePermission(
    "jobLocations",
    "create",
    "description"
  );

  const isDefault: boolean = usePermission(
    "jobLocations",
    "create",
    "isDefault"
  );

  const isActive: boolean = usePermission("jobLocations", "create", "isActive");
  const isDeleted: boolean = usePermission(
    "jobLocations",
    "create",
    "isDeleted"
  );
  const canPdf: boolean = usePermission("jobLocations", "pdf");
  const canPrint: boolean = usePermission("jobLocations", "print");

  console.log("jobLocation", jobLocation);
  console.log("country", country);
  console.log("isDefault", isDefault);
  console.log("isActive", isActive);
  console.log("isDeleted", isDeleted);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    jobLocation: "",
    country: "",
    description: "",
    isDefault: isDefaultState === "Yes",
    isActive: isActiveState === "Yes",
    isDeleted: isDeletedState === "Delete",
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
          navigate("/job-locations/create");
        } else {
          navigate("/job-locations/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/job-locations/view");
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
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
      setIsActiveState(initialData.isActive ? "Yes" : "No");
      setIsDeletedState(initialData.isDeleted ? "Delete" : "Restore");
    }
  }, [isEdit, initialData]);

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
      toastSuccess("Job Location created successfully!");
      handleReset();
    } else {
      toastSuccess("Job Location created successfully!");
      navigate("/job-locations");
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
      jobLocation: "",
      country: "",
      description: "",
      isDefault: false,
      isActive: false,
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
      inputRefs.current["jobLocation"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Job Location Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          jobLocation: "Job Location",
          country: "Country",
          description: "Description",
          isDefault: "Default Leave",
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
          title="Job Location Details"
          subtitle="Job Location Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "job-location-details.pdf";
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
      if (!formData.isActive) {
        return [
          ...filteredOptions,
          {
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isActive: false,
              }));
              toastRestore("Job Location saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isActive, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Job Location" : "Creating Job Location"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="job-locations"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="edit"
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* Leave Types field - only show if user can create */}
              {jobLocation && (
                <div className="space-y-2 md:col-span-4">
                  <EditableInput
                    setRef={setRef("jobLocation")}
                    type="text"
                    id="jobLocation"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    onNext={() => focusNextInput("country")}
                    onCancel={() =>
                      setFormData({ ...formData, jobLocation: "" })
                    }
                    labelText="Job Location"
                    tooltipText="Enter job location"
                    required
                  />
                </div>
              )}

              {/* Notes field - only show if user can create */}
              {country && (
                <div className="space-y-2 md:col-span-4">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    options={["BD", "US", "UK", "IN"]}
                    value={formData.country}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        country: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("isDefault");
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("isDefault");
                      }
                    }}
                    placeholder=" "
                    labelText="Country"
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

              {description && (
                <div className="space-y-2 md:col-span-4">
                  <EditableInput
                    setRef={setRef("description")}
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter description"
                    required
                  />
                </div>
              )}

              {isDefault && (
                <div className="md:col-span-4 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={["No", "Yes"]}
                    isSelectableOnly={true}
                    value={isDefaultState === "Yes" ? "Yes" : "No"}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsDefaultState(isYes ? "Yes" : "No");
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: isYes,
                      }));
                      focusNextInput("isActive");
                    }}
                    onEnterPress={() => {
                      focusNextInput("isActive");
                    }}
                    placeholder=" "
                    labelText="Default"
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

              {isActive && (
                <div className="md:col-span-4 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("isActive")(el)}
                    id="isActive"
                    name="isActive"
                    labelText="Inactive"
                    isSelectableOnly={true}
                    options={["No", "Yes"]}
                    value={isActiveState === "Yes" ? "Yes" : "No"}
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setIsActiveState(isYes ? "Yes" : "No");
                      setFormData((prev) => ({
                        ...prev,
                        isActive: isYes,
                      }));
                      focusNextInput("isDeleted");
                    }}
                    onEnterPress={() => {
                      focusNextInput("isDeleted");
                    }}
                    placeholder=" "
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

              {isDeleted && (
                <div className="md:col-span-4 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("isDeleted")(el)}
                    id="isDeleted"
                    name="isDeleted"
                    labelText="Status"
                    isSelectableOnly={true}
                    options={["Delete", "Restore"]}
                    value={isDeletedState}
                    onValueChange={(value: "Delete" | "Restore") => {
                      if (value === "Delete" || value === "Restore") {
                        setIsDeletedState(value);
                        const newValue = value === "Delete";
                        setFormData((prev) => ({
                          ...prev,
                          isDeleted: newValue,
                        }));
                      }
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        focusNextInput("fileUploadElement");
                      }
                    }}
                    placeholder=" "
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
