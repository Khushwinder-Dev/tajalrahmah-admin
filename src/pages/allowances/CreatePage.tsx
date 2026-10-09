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

type AllowancesDataType = {
  iqamaNo: string;
  allowanceType: string;
  branch: string;
  allowanceAmount: string;
  notes: string;
  date: string;

  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: AllowancesDataType = {
  iqamaNo: "1234567890",
  allowanceType: "Late Arrival",
  branch: "Dhaka",
  allowanceAmount: "100",
  notes: "Late for 3 days",
  date: "2025-08-01",
  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function AllowancesCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("allowances", "create");
  const canView = usePermission("allowances", "view");
  const canEdit = usePermission("allowances", "edit");
  const canDelete = usePermission("allowances", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const iqamaNo: boolean = usePermission("allowances", "create", "iqamaNo");
  const allowanceType: boolean = usePermission(
    "allowances",
    "create",
    "allowanceType"
  );
  const branch: boolean = usePermission("allowances", "create", "branch");
  const allowanceAmount: boolean = usePermission(
    "allowances",
    "create",
    "allowanceAmount"
  );
  const notes: boolean = usePermission("allowances", "create", "notes");
  const date: boolean = usePermission("allowances", "create", "date");
  const isDefault: boolean = usePermission("allowances", "create", "isDefault");
  const isDraft: boolean = usePermission("allowances", "create", "isDraft");
  const canPdf: boolean = usePermission("allowances", "pdf");
  const canPrint: boolean = usePermission("allowances", "print");

  console.log("iqamaNo", iqamaNo);
  console.log("allowanceType", allowanceType);
  console.log("branch", branch);
  console.log("allowanceAmount", allowanceAmount);
  console.log("notes", notes);
  console.log("date", date);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<AllowancesDataType>({
    iqamaNo: "",
    allowanceType: "",
    branch: "",
    allowanceAmount: "",
    notes: "",
    date: "",
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
          navigate("/allowances/create");
        } else {
          navigate("/allowances/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/allowances/view");
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
      setIsDraftState(initialData.isDraft ? "Yes" : "No");
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
      toastSuccess("Allowance created successfully!");
      handleReset();
    } else {
      toastSuccess("Allowance created successfully!");
      navigate("/allowances");
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
      iqamaNo: "",
      allowanceType: "",
      branch: "",
      allowanceAmount: "",
      notes: "",
      date: "",
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
      inputRefs.current["date"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (printData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Allowance Details",
        data: [printData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          iqamaNo: "Iqama No",
          allowanceType: "Allowance Type",
          branch: "Branch",
          allowanceAmount: "Allowance Amount",
          notes: "Notes",
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
          title="Allowance Details"
          subtitle="Allowance Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "allowance-details.pdf";
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
              toastRestore("Project Type saved as draft successfully");
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  const iqamaData = [
    {
      value: "1234567890",
      name: "Rasel Ahmed",
      designation: "Line Cook",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567891",
      name: "Someone",
      designation: "Chef",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567892",
      name: "Person 2",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567893",
      name: "Person 3",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567894",
      name: "Person 4",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567895",
      name: "Person 5",
      designation: "Marketer",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567896",
      name: "Person 6",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567897",
      name: "Person 7",
      designation: "Waiter",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567898",
      name: "Person 8",
      designation: "Manager",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
    {
      value: "1234567899",
      name: "Person 9",
      designation: "Labour",
      branch: "Dhaka",
      image: "/customer-dummy-image.jpg",
    },
  ];

  const selectedEmployee = iqamaData.find(
    (item) => item.value === formData.iqamaNo
  );

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Allowance" : "Creating Allowance"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="allowances"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
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
            <div className="grid grid-cols-12 md:grid-cols-12 gap-4 my-8 relative">
              {/* Leave Types field - only show if user can create */}
              {date && (
                <div className="space-y-2 md:col-span-3">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("date")}
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onNext={() => focusNextInput("iqamaNo")}
                      onCancel={() => setFormData({ ...formData, date: "" })}
                      labelText="Date"
                      tooltipText="Enter date"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Notes field - only show if user can create */}
              {iqamaNo && (
                <div className="space-y-2 md:col-span-3">
                  <Autocomplete
                    ref={(el: any) => setRef("iqamaNo")(el)}
                    id="iqamaNo"
                    name="iqamaNo"
                    isSelectableOnly={true}
                    options={iqamaData.map((item) => item.value)}
                    value={formData.iqamaNo}
                    onValueChange={(value: string) => {
                      const selectedOption = iqamaData.find(
                        (item) => item.value === value
                      );

                      setFormData((prev) => ({
                        ...prev,
                        iqamaNo: value,
                        branch: selectedOption?.branch || "",
                      }));

                      if (value) {
                        focusNextInput("deductionType");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.iqamaNo) {
                        // focusNextInput("deductionType");
                      }
                    }}
                    placeholder=" "
                    labelText="Iqama No"
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

              {/* Description field - only show if user can create */}
              {branch && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("branch")}
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    onNext={() => focusNextInput("deductionType")}
                    onCancel={() => setFormData({ ...formData, branch: "" })}
                    labelText="Branch"
                    tooltipText="Enter branch"
                    required
                    readOnly
                  />
                </div>
              )}

              {/* Deduction Type field - only show if user can create */}
              {allowanceType && (
                <div className="space-y-2 md:col-span-3">
                  <Autocomplete
                    ref={(el: any) => setRef("allowanceType")(el)}
                    id="allowanceType"
                    name="allowanceType"
                    isSelectableOnly={true}
                    options={[
                      "Salary",
                      "Transport",
                      "Housing",
                      "Mobile",
                      "Medical",
                      "Internet",
                      "Fuel",
                      "Meal",
                    ]}
                    value={formData.allowanceType}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, allowanceType: value });
                      if (value) {
                        focusNextInput("allowanceAmount");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.allowanceType) {
                        focusNextInput("allowanceAmount");
                      }
                    }}
                    placeholder=" "
                    labelText="Allowance Type"
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

              {/* Deduction Amount field - only show if user can create */}
              {allowanceAmount && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("allowanceAmount")}
                    id="allowanceAmount"
                    name="allowanceAmount"
                    value={formData.allowanceAmount}
                    onChange={handleChange}
                    onNext={() => focusNextInput("notes")}
                    onCancel={() =>
                      setFormData({ ...formData, allowanceAmount: "" })
                    }
                    labelText="Allowance Amount"
                    tooltipText="Enter allowance amount"
                    required
                  />
                </div>
              )}

              {/* Notes field - only show if user can create */}
              {notes && (
                <div className="space-y-2 md:col-span-3">
                  <EditableInput
                    setRef={setRef("notes")}
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, notes: "" })}
                    labelText="Notes"
                    tooltipText="Enter notes"
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="space-y-2 md:col-span-3">
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
              {isDraft && (
                <div className="space-y-2 md:col-span-3 relative">
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
          </form>
          {formData.iqamaNo && selectedEmployee && (
            <div className="flex items-center bg-white shadow-md rounded-lg p-4 max-w-md">
              <img
                src={selectedEmployee.image}
                alt="Employee"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedEmployee.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedEmployee.designation}
                </p>
              </div>
            </div>
          )}
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
