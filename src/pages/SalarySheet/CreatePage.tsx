/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import { FloatingMultiSelect } from "@/components/common/FloatingMultiSelect";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermissions";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { cn, getModuleFromPath } from "@/lib/utils";
import type { RootState } from "@/store";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus, X } from "lucide-react";
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

type Props = {
  isEdit?: boolean;
};

export type EmployeeSalaryType = {
  id: number;
  employee: string;
  designation: string;
  basic: number;
  bonuses: number;
  overtime: number;
  allowances: number;
  gross: number;
  advance: number;
  loan: number;
  absent: number;
  insurance: number;
  deduction: number;
  net: number;
};

export const employeeSalaries: EmployeeSalaryType[] = [
  {
    id: 1,
    employee: "Sabbir Shuvo",
    designation: "Frontend Developer",
    basic: 50000,
    bonuses: 5000,
    overtime: 2000,
    allowances: 3000,
    gross: 60000,
    advance: 5000,
    loan: 2000,
    absent: 1000,
    insurance: 1500,
    deduction: 4500,
    net: 55500,
  },
  {
    id: 2,
    employee: "Rahat Bhai",
    designation: "Project Manager",
    basic: 80000,
    bonuses: 10000,
    overtime: 5000,
    allowances: 7000,
    gross: 102000,
    advance: 10000,
    loan: 5000,
    absent: 2000,
    insurance: 2500,
    deduction: 19500,
    net: 82500,
  },
  {
    id: 3,
    employee: "Fatema Akter",
    designation: "UI/UX Designer",
    basic: 45000,
    bonuses: 3000,
    overtime: 1000,
    allowances: 2000,
    gross: 51000,
    advance: 3000,
    loan: 1000,
    absent: 500,
    insurance: 1200,
    deduction: 5700,
    net: 45300,
  },
  {
    id: 4,
    employee: "Tanvir Hossain",
    designation: "Backend Developer",
    basic: 55000,
    bonuses: 4000,
    overtime: 2500,
    allowances: 3500,
    gross: 65500,
    advance: 6000,
    loan: 3000,
    absent: 800,
    insurance: 1600,
    deduction: 11400,
    net: 54100,
  },
  {
    id: 5,
    employee: "Nabila Rahman",
    designation: "HR Executive",
    basic: 40000,
    bonuses: 2000,
    overtime: 500,
    allowances: 1500,
    gross: 44000,
    advance: 2000,
    loan: 500,
    absent: 400,
    insurance: 1000,
    deduction: 3900,
    net: 40100,
  },
  {
    id: 6,
    employee: "Arif Khan",
    designation: "QA Engineer",
    basic: 48000,
    bonuses: 3000,
    overtime: 1200,
    allowances: 1800,
    gross: 54000,
    advance: 3000,
    loan: 1000,
    absent: 600,
    insurance: 1400,
    deduction: 6000,
    net: 48000,
  },
  {
    id: 7,
    employee: "Rina Sultana",
    designation: "Frontend Developer",
    basic: 52000,
    bonuses: 4000,
    overtime: 1500,
    allowances: 2500,
    gross: 60000,
    advance: 4000,
    loan: 2000,
    absent: 700,
    insurance: 1500,
    deduction: 8200,
    net: 51800,
  },
  {
    id: 8,
    employee: "Shahriar Alam",
    designation: "Backend Developer",
    basic: 57000,
    bonuses: 5000,
    overtime: 2000,
    allowances: 3000,
    gross: 67000,
    advance: 5000,
    loan: 2500,
    absent: 800,
    insurance: 1700,
    deduction: 10000,
    net: 57000,
  },
  {
    id: 9,
    employee: "Tania Ahmed",
    designation: "UI/UX Designer",
    basic: 46000,
    bonuses: 2500,
    overtime: 1000,
    allowances: 2000,
    gross: 51500,
    advance: 3000,
    loan: 1000,
    absent: 500,
    insurance: 1200,
    deduction: 5700,
    net: 45800,
  },
  {
    id: 10,
    employee: "Rafiq Hossain",
    designation: "System Analyst",
    basic: 65000,
    bonuses: 6000,
    overtime: 3000,
    allowances: 4000,
    gross: 78000,
    advance: 8000,
    loan: 4000,
    absent: 1000,
    insurance: 2000,
    deduction: 15000,
    net: 63000,
  },
  {
    id: 11,
    employee: "Nusrat Jahan",
    designation: "HR Executive",
    basic: 42000,
    bonuses: 2000,
    overtime: 500,
    allowances: 1500,
    gross: 46000,
    advance: 2000,
    loan: 500,
    absent: 400,
    insurance: 1000,
    deduction: 3900,
    net: 42100,
  },
  {
    id: 12,
    employee: "Imran Faruk",
    designation: "QA Engineer",
    basic: 50000,
    bonuses: 3500,
    overtime: 1200,
    allowances: 2000,
    gross: 56700,
    advance: 4000,
    loan: 1500,
    absent: 700,
    insurance: 1500,
    deduction: 7700,
    net: 49000,
  },
];

export default function SalarySheetCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const location = useLocation();

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");

  const [isPreview, setIsPreview] = useState(false);

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

  const handlePreview = () => {
    if (formData.from && formData.salaryMonth) {
      setIsPreview(true);
    } else {
      toastError("Please fill all required fields");
    }
  };

  return (
    <>
      <PageLayout
        title={
          isEdit
            ? `${location.pathname.split("/")[1].replace("-", " ")} Editing`
            : `${location.pathname.split("/")[1].replace("-", " ")} Creating`
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
                disabled={!isPreview}
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
            <div className="w-full flex items-center justify-between gap-4">
              <Button
                type="button"
                disabled={!canCreate}
                onClick={handlePreview}
                className="bg-sky-400 text-white hover:bg-primary/90"
              >
                Preview
              </Button>

              {isPreview && (
                <Button
                  type="button"
                  variant={"ghost"}
                  disabled={!canCreate}
                  onClick={() => setIsPreview(false)}
                  className="bg-red-500 text-white hover:bg-red-600 hover:text-white rounded-full"
                >
                  <X />
                </Button>
              )}
            </div>
            {isPreview && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        ID No
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Employee
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Designation
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Basic
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Bonuses
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Overtime
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Allowances
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Gross
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Advance
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Loan
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Absent
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Insurance
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Deduction
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Net
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employeeSalaries.map((employee, index) => (
                      <tr
                        key={employee.id}
                        className={cn(
                          "hover:bg-gray-50",
                          index % 2 === 0 ? "bg-gray-50" : ""
                        )}
                      >
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {employee.id}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {employee.employee}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {employee.designation}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.basic.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.bonuses.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.overtime.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.allowances.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.gross.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.advance.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.loan.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.absent.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.insurance.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {employee.deduction.toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right font-semibold">
                          {employee.net.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
