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

type EmployeeContractData = {
  staffName: string;
  contactType: string;
  status: string;
  salaryAllowance: string;
  effectiveDate: string;
  expirationDate: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: EmployeeContractData = {
  staffName: "Ahmed Al-Rashid",
  contactType: "Full Time",
  status: "Active",
  salaryAllowance: "8000 SAR",
  effectiveDate: "2024-01-15",
  expirationDate: "2025-01-15",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function EmployeeContractFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Employee modal states
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    name: string;
    designation: string;
    photo: string;
    iqamaImage: string;
  } | null>(null);

  // Permission checks
  const canCreate = usePermission("employeeContract", "create");
  const canView = usePermission("employeeContract", "view");
  const canEdit = usePermission("employeeContract", "edit");
  const canDelete = usePermission("employeeContract", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const staffName: boolean = usePermission(
    "employeeContract",
    "create",
    "staffName"
  );
  const contactType: boolean = usePermission(
    "employeeContract",
    "create",
    "contactType"
  );
  const status: boolean = usePermission("employeeContract", "create", "status");
  const salaryAllowance: boolean = usePermission(
    "employeeContract",
    "create",
    "salaryAllowance"
  );
  const effectiveDate: boolean = usePermission(
    "employeeContract",
    "create",
    "effectiveDate"
  );
  const expirationDate: boolean = usePermission(
    "employeeContract",
    "create",
    "expirationDate"
  );
  const isDraft: boolean = usePermission(
    "employeeContract",
    "create",
    "isDraft"
  );
  const canPdf: boolean = usePermission("employeeContract", "pdf");
  const canPrint: boolean = usePermission("employeeContract", "print");

  console.log("staffName", staffName);
  console.log("contactType", contactType);
  console.log("status", status);
  console.log("salaryAllowance", salaryAllowance);
  console.log("effectiveDate", effectiveDate);
  console.log("expirationDate", expirationDate);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const staffNameOptions = [
    "Ahmed Al-Rashid",
    "Fatima Al-Zahra",
    "Omar Al-Sayed",
    "Layla Al-Mahmoud",
    "Khalid Al-Nasser",
    "Aisha Al-Hassan",
    "Yusuf Al-Qahtani",
    "Noor Al-Sabah",
    "Hassan Al-Mansouri",
    "Mariam Al-Rashid",
  ];

  const contactTypeOptions = [
    "Full Time",
    "Part Time",
    "Contract",
    "Temporary",
  ];

  const statusOptions = ["Active", "Pending", "Expired", "Draft"];

  const salaryOptions = [
    "3000 SAR",
    "3500 SAR",
    "4000 SAR",
    "4500 SAR",
    "5000 SAR",
    "5500 SAR",
    "6000 SAR",
    "7000 SAR",
    "7500 SAR",
    "8000 SAR",
    "8500 SAR",
    "9000 SAR",
    "11000 SAR",
    "12000 SAR",
    "13000 SAR",
    "15000 SAR",
  ];

  // Employee data mapping for staff names
  const employeeData: Record<
    string,
    {
      name: string;
      designation: string;
      photo: string;
      iqamaImage: string;
    }
  > = {
    "Ahmed Al-Rashid": {
      name: "Ahmed Al-Rashid",
      designation: "Software Engineer",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Fatima Al-Zahra": {
      name: "Fatima Al-Zahra",
      designation: "HR Specialist",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Omar Al-Sayed": {
      name: "Omar Al-Sayed",
      designation: "Project Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Layla Al-Mahmoud": {
      name: "Layla Al-Mahmoud",
      designation: "Business Analyst",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Khalid Al-Nasser": {
      name: "Khalid Al-Nasser",
      designation: "Finance Manager",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Aisha Al-Hassan": {
      name: "Aisha Al-Hassan",
      designation: "Marketing Coordinator",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
  };

  // Form state
  const [formData, setFormData] = useState<EmployeeContractData>({
    staffName: "",
    contactType: "",
    status: "",
    salaryAllowance: "",
    effectiveDate: "",
    expirationDate: "",
    isActive: true,
    isDraft: false,
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
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/employee-contract/create");
        } else {
          navigate("/employee-contract/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/employee-contract/view");
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

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
      });
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

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintContract(formData);
    }

    if (keepCreating) {
      toastSuccess("Employee contract created successfully!");
      handleReset();
    } else {
      toastSuccess("Employee contract created successfully!");
      navigate("/employee-contract");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    setFormData({
      staffName: "",
      contactType: "",
      status: "",
      salaryAllowance: "",
      effectiveDate: "",
      expirationDate: "",
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    setTimeout(() => {
      inputRefs.current["staffName"]?.focus();
    }, 100);
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintContract = (contractData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Employee Contract Details",
        data: [contractData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          staffName: "Staff Name",
          contactType: "Contact Type",
          status: "Status",
          salaryAllowance: "Salary Allowance",
          effectiveDate: "Effective Date",
          expirationDate: "Expiration Date",
          isDefault: "Default Contract",
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
    console.log("Export PDF clicked");
    try {
      console.log("contractData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Employee Contract Details"
          subtitle="Contract Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "employee-contract-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

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
              toastRestore("Employee contract saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={
          isEdit ? "Editing Employee Contract" : "Creating Employee Contract"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="employee-contract"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        additionalFooterButtons={
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
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Staff Name field */}
              {staffName && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("staffName")(el)}
                      id="staffName"
                      name="staffName"
                      allowCustomInput={true}
                      options={staffNameOptions}
                      value={formData.staffName}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, staffName: value });

                        if (value && employeeData[value]) {
                          setSelectedEmployee(employeeData[value]);
                          setIsEmployeeModalOpen(true);
                        }

                        if (value) {
                          focusNextInput("contactType");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.staffName) {
                          focusNextInput("contactType");
                        }
                      }}
                      placeholder=" "
                      labelText="Staff Name"
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
                </div>
              )}

              {/* Contact Type field */}
              {contactType && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("contactType")(el)}
                      id="contactType"
                      name="contactType"
                      allowCustomInput={true}
                      options={contactTypeOptions}
                      value={formData.contactType}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, contactType: value });
                        if (value) {
                          focusNextInput("status");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.contactType) {
                          focusNextInput("status");
                        }
                      }}
                      placeholder=" "
                      labelText="Contact Type"
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
                </div>
              )}

              {/* Status field */}
              {status && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("status")(el)}
                      id="status"
                      name="status"
                      allowCustomInput={true}
                      options={statusOptions}
                      value={formData.status}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, status: value });
                        if (value) {
                          focusNextInput("salaryAllowance");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.status) {
                          focusNextInput("salaryAllowance");
                        }
                      }}
                      placeholder=" "
                      labelText="Status"
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
                </div>
              )}

              {/* Salary Allowance field */}
              {salaryAllowance && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("salaryAllowance")(el)}
                      id="salaryAllowance"
                      name="salaryAllowance"
                      allowCustomInput={true}
                      options={salaryOptions}
                      value={formData.salaryAllowance}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, salaryAllowance: value });
                        if (value) {
                          focusNextInput("effectiveDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.salaryAllowance) {
                          focusNextInput("effectiveDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Salary Allowance"
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
                </div>
              )}
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Effective Date field */}
              {effectiveDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("effectiveDate")}
                    id="effectiveDate"
                    name="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("expirationDate")}
                    onCancel={() =>
                      setFormData({ ...formData, effectiveDate: "" })
                    }
                    labelText="Effective Date"
                    tooltipText="Select contract start date"
                    required
                  />
                </div>
              )}

              {/* Expiration Date field */}
              {expirationDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("expirationDate")}
                    id="expirationDate"
                    name="expirationDate"
                    type="date"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("submitButton")}
                    onCancel={() =>
                      setFormData({ ...formData, expirationDate: "" })
                    }
                    labelText="Expiration Date"
                    tooltipText="Select contract end date"
                    required
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

      {/* Employee Details Modal */}
      <Modal
        opened={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        title="Employee Details"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        centered
      >
        {selectedEmployee && (
          <div className="p-6">
            {/* Employee Header with Photo and Basic Info */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  src={selectedEmployee.photo}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedEmployee.name}
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  {selectedEmployee.designation}
                </p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Active Employee
                </div>
              </div>
            </div>

            {/* Iqama Card Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Iqama Card
                </h3>
                <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  Verified ✓
                </span>
              </div>

              {/* Iqama Card Display */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-300">
                <div className="bg-green-600 text-white px-4 py-2 text-center font-bold">
                  Kingdom of Saudi Arabia - Iqama Card
                </div>
                <div className="p-4">
                  <img
                    src={selectedEmployee.iqamaImage}
                    alt="Iqama Card"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Employee Name</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formData.staffName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-full transition-colors"
              >
                Continue with Contract
              </Button>
            </div>
          </div>
        )}
      </Modal>

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
