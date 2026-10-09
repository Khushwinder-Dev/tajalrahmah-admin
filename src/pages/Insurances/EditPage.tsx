/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { se } from "date-fns/locale";
// import { de } from "date-fns/locale";

type Employee = {
  name: string;
  iqamaNo: string;
  designation: string;
  image: string;
  branch: string;
};

const employeeData: Employee[] = [
  {
    name: "Sabbir Shuvo",
    iqamaNo: "9876543210",
    designation: "Software Engineer",
    image: "https://www.gravatar.com/avatar/1?d=identicon&s=250",
    branch: "Dubai Head Office",
  },
  {
    name: "Nusrat Jahan",
    iqamaNo: "1234509876",
    designation: "HR Manager",
    image: "https://www.gravatar.com/avatar/2?d=identicon&s=250",
    branch: "Chittagong Regional Office",
  },
  {
    name: "Tanvir Alam",
    iqamaNo: "1122334455",
    designation: "Finance Officer",
    image: "https://www.gravatar.com/avatar/3?d=identicon&s=250",
    branch: "Khulna Branch",
  },
  {
    name: "Sadia Afreen",
    iqamaNo: "9988776655",
    designation: "Marketing Executive",
    image: "https://www.gravatar.com/avatar/4?d=identicon&s=250",
    branch: "Sylhet Branch",
  },
  {
    name: "Farhan Kabir",
    iqamaNo: "5566778899",
    designation: "IT Support Specialist",
    image: "https://www.gravatar.com/avatar/5?d=identicon&s=250",
    branch: "Barisal Branch",
  },
  {
    name: "Ayesha Siddiqua",
    iqamaNo: "1029384756",
    designation: "Operations Coordinator",
    image: "https://www.gravatar.com/avatar/6?d=identicon&s=250",
    branch: "Rajshahi Branch",
  },
];
type InsurancesData = {
  name: string;
  description: string;
  iqamaNo: string;
  employeeName: string;
  employeeDesignation: string;
  employeeBranch: string;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: InsurancesData = {
  name: "",
  description: "",
  iqamaNo: "",
  employeeName: "",
  employeeDesignation: "",
  employeeBranch: "",
  isDefault: false,
  isActive: true,
  isDraft: false,
  rating: 3,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function InsurancesEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const [keepCreating, setKeepCreating] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(
    employeeData[0]
  );
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<InsurancesData>({
    name: "Life Insurance",
    description: "Life Insurance Description",
    iqamaNo: selectedEmployee.iqamaNo,
    employeeName: selectedEmployee.name,
    employeeDesignation: selectedEmployee.designation,
    employeeBranch: selectedEmployee.branch,
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 3,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // get permission
  const canPdf: boolean = usePermission("insurances", "pdf");
  const canPrint: boolean = usePermission("insurances", "print");
  const canEdit: boolean = usePermission("insurances", "edit");

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

      setIsDefaultState(initialData.isDefault ? labels.yes : labels.no);
      setIsActiveState(initialData.isActive ? labels.yes : labels.no);
    }
  }, [isEdit, initialData, labels]);

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
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintCountry(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("name");
    } else {
      navigate("/insurances");
    }
    toastSuccess("Insurances Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      iqamaNo: selectedEmployee.iqamaNo,
      employeeName: selectedEmployee.name,
      employeeDesignation: selectedEmployee.designation,
      employeeBranch: selectedEmployee.branch,
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      rating: 3,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });
    setIsDefaultState(labels.no);
    setIsActiveState(labels.no);
    setIsDeletedState("");
    setSelectedEmployee({});
    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["code"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintCountry = (InsurancesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Insurances Details",
        data: [InsurancesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          description: "Description",
          iqamaNo: "Iqama No",
          employeeName: "Employee Name",
          employeeDesignation: "Employee Designation",
          employeeBranch: "Employee Branch",
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
      console.log("InsurancesData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Insurances Details"
          subtitle="Insurances Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "insurances-details.pdf";
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
          navigate("/insurances/create");
        } else {
          navigate("/insurances/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/insurances/view");
      },
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
              toastRestore("Insurances saved as draft successfully");
            },
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, labels]);

  return (
    <>
      <PageLayout
        title={isEdit ? labels.editingInsurances : labels.creatingInsurances}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="insurances"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              className="gap-2 text-primary bg-sky-200 hover:bg-primary rounded-full border-primary w-32 font-semibold!"
              onClick={handleResetClick}
            >
              {labels.reset}
            </Button>
            <Button
              ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
              id="submitButton"
              name="submitButton"
              variant="outline"
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
              onClick={() => formRef.current?.requestSubmit()}
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
              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText={labels.insuranceNameTooltip}
                    tooltipText={labels.insuranceNameTooltip}
                    required
                  />
                </div>
              )}

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("description")}
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      onNext={() => focusNextInput("isDefault")}
                      onCancel={() =>
                        setFormData({ ...formData, description: "" })
                      }
                      labelText={labels.insuranceDetailsTooltip}
                      tooltipText={labels.insuranceDetailsTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDefault")(el)}
                  id="isDefault"
                  name="isDefault"
                  options={[labels.no, labels.yes]}
                  isSelectableOnly={true}
                  value={isDefaultState === "Yes" ? labels.yes : labels.no}
                  onValueChange={(value: string) => {
                    const isYes = value === labels.yes;
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
                  labelText={labels.default}
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

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isActive")(el)}
                  id="isActive"
                  name="isActive"
                  labelText="Inactive"
                  isSelectableOnly={true}
                  options={[labels.no, labels.yes]}
                  value={isActiveState === "Yes" ? labels.yes : labels.no}
                  onValueChange={(value: string) => {
                    const isYes = value === labels.yes;
                    setIsActiveState(isYes ? "Yes" : "No");
                    setFormData((prev) => ({
                      ...prev,
                      isActive: isYes,
                    }));
                    focusNextInput("employeeName");
                  }}
                  onEnterPress={() => {
                    focusNextInput("employeeName");
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

              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("employeeName")(el)}
                    id="employeeName"
                    name="employeeName"
                    allowCustomInput={true}
                    options={employeeData.map((option) => option.name)}
                    value={selectedEmployee.name}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, employeeName: value });
                      setSelectedEmployee(
                        employeeData.find((emp) => emp.name === value)
                      );
                      if (value) {
                        focusNextInput("isDeleted");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.employeeName) {
                        focusNextInput("isDeleted");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.insuranceEmployeeNameTooltip}
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

              {/* Calling Code field - only show if user can create */}
              {canEdit && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("employeeBranch")}
                    id="employeeBranch"
                    name="employeeBranch"
                    value={selectedEmployee.name ? selectedEmployee.branch : ""}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() =>
                      setFormData({ ...formData, employeeBranch: "" })
                    }
                    labelText={labels.insuranceEmployeeBranchTooltip}
                    tooltipText={labels.insuranceEmployeeBranchTooltip}
                    required
                    readOnly
                    disabled
                  />
                </div>
              )}

              <div className="md:col-span-3 space-y-2">
                <Autocomplete
                  ref={(el: any) => setRef("isDeleted")(el)}
                  id="isDeleted"
                  name="isDeleted"
                  labelText="Deleted"
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
            </div>

            {selectedEmployee.name && (
              <div className="max-w-2xl w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden flex">
                {/* Left section (image) */}
                <div className="bg-gradient-to-b from-blue-100 to-blue-200 p-6 flex items-center justify-center">
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>

                {/* Right section (info) */}
                <div className="flex-1 p-5 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedEmployee.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-900">
                        Iqama No:
                      </span>{" "}
                      {selectedEmployee.iqamaNo}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">
                        Designation:
                      </span>{" "}
                      {selectedEmployee.designation}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Branch:</span>{" "}
                      {selectedEmployee.branch}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Email:</span>{" "}
                      example@example.com
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </PageLayout>

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
