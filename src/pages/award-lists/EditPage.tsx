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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type ProjectTypeDataType = {
  awardName: string;
  employeeName: string;
  awardBy: string;
  date: string;
  giftItem: string;
  awardDescription: string;

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
  awardName: "Best Team Player",
  employeeName: "Rakib Hasan",
  awardBy: "Team Lead",
  date: "2025-01-15",
  giftItem: "Gold Medal",
  awardDescription: "For outstanding performance and punctuality.",

  isDefault: false,
  isActive: false,
  isDeleted: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function AwardListsEditPage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("awardLists", "create");
  const canView = usePermission("awardLists", "view");
  const canEdit = usePermission("awardLists", "edit");
  const canDelete = usePermission("awardLists", "delete");
  const canPdf: boolean = usePermission("awardLists", "pdf");
  const canPrint: boolean = usePermission("awardLists", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const permissionsFieldLevel = usePermission<keyof ProjectTypeDataType>(
    "awardLists",
    "create",
    [
      "awardName",
      "employeeName",
      "awardBy",
      "date",
      "giftItem",
      "awardDescription",

      "isDefault",
      "isActive",
      "isDeleted",
    ]
  );

  console.log("permissionsFieldLevel", permissionsFieldLevel);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    awardName: "",
    employeeName: "",
    awardBy: "",
    date: "",
    giftItem: "",
    awardDescription: "",

    isDefault: isDefaultState === "Yes",
    isActive: false,
    isDeleted: false,
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
          navigate("/award-lists/create");
        } else {
          navigate("/award-lists/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/award-lists/view");
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
      toastSuccess("Award List updated successfully!");
      handleReset();
    } else {
      toastSuccess("Award List updated successfully!");
      navigate("/award-lists");
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
      awardName: "",
      employeeName: "",
      awardBy: "",
      date: "",
      giftItem: "",
      awardDescription: "",

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
      inputRefs.current["awardName"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Award List Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          awardName: "Award Name",
          employeeName: "Employee Name",
          awardBy: "Award By",
          date: "Date",
          giftItem: "Gift Item",
          awardDescription: "Award Description",

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
          title="Award List Details"
          subtitle="Award List Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "award-list-details.pdf";
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
                isDraft: true,
              }));
              toastRestore("Award List saved as draft successfully");
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
        title={isEdit ? "Editing Award List" : "Creating Award List"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="award-lists"
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFieldLevel.awardName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("awardName")}
                    type="text"
                    id="awardName"
                    name="awardName"
                    value={formData.awardName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("employeeName")}
                    onCancel={() => setFormData({ ...formData, awardName: "" })}
                    labelText="Award Name"
                    tooltipText="Enter award name"
                    required
                  />
                </div>
              )}
              {permissionsFieldLevel.employeeName && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("employeeName")(el)}
                    id="employeeName"
                    name="employeeName"
                    options={["Employee one", "Employee Two"]}
                    value={formData.employeeName}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        employeeName: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("awardBy");
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
                    labelText="Employee Name"
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

              {permissionsFieldLevel.awardBy && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("awardBy")}
                    type="text"
                    id="awardBy"
                    name="awardBy"
                    value={formData.awardBy}
                    onChange={handleChange}
                    onNext={() => focusNextInput("date")}
                    onCancel={() => setFormData({ ...formData, awardBy: "" })}
                    labelText="Award By"
                    tooltipText="Enter award by"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.date && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("date")}
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onNext={() => focusNextInput("giftItem")}
                    onCancel={() => setFormData({ ...formData, date: "" })}
                    labelText="Date"
                    tooltipText="Enter date"
                    required
                  />
                </div>
              )}
              {permissionsFieldLevel.giftItem && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("giftItem")}
                    type="text"
                    id="giftItem"
                    name="giftItem"
                    value={formData.giftItem}
                    onChange={handleChange}
                    onNext={() => focusNextInput("awardDescription")}
                    onCancel={() => setFormData({ ...formData, giftItem: "" })}
                    labelText="Gift Item"
                    tooltipText="Enter gift item"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.awardDescription && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("awardDescription")}
                    type="text"
                    id="awardDescription"
                    name="awardDescription"
                    value={formData.awardDescription}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, awardDescription: "" })
                    }
                    labelText="Award Description"
                    tooltipText="Enter award description"
                    required
                  />
                </div>
              )}

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

              {permissionsFieldLevel.isActive && (
                <div className="space-y-2">
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

              {permissionsFieldLevel.isDeleted && (
                <div className="space-y-2">
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
