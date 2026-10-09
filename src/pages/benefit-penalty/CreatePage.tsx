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

type BenefitPenaltyData = {
  type: string;
  subject: string;
  criteria: string;
  date: string;
  driver: string;
  formality: string;
  description: string;
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

const initialData: BenefitPenaltyData = {
  type: "Benefit",
  subject: "Performance Bonus",
  criteria: "Exceeds targets by 20%",
  date: "2024-02-15",
  driver: "Ahmed Al-Rashid",
  formality: "Monthly Review",
  description: "Outstanding performance in Q1 2024",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function BenefitPenaltyFormPage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("benefitPenalty", "create");
  const canView = usePermission("benefitPenalty", "view");
  const canEdit = usePermission("benefitPenalty", "edit");
  const canDelete = usePermission("benefitPenalty", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const type: boolean = usePermission("benefitPenalty", "create", "type");
  const subject: boolean = usePermission("benefitPenalty", "create", "subject");
  const criteria: boolean = usePermission(
    "benefitPenalty",
    "create",
    "criteria"
  );
  const date: boolean = usePermission("benefitPenalty", "create", "date");
  const driver: boolean = usePermission("benefitPenalty", "create", "driver");
  const formality: boolean = usePermission(
    "benefitPenalty",
    "create",
    "formality"
  );
  const description: boolean = usePermission(
    "benefitPenalty",
    "create",
    "description"
  );
  const isDraft: boolean = usePermission("benefitPenalty", "create", "isDraft");
  const canPdf: boolean = usePermission("benefitPenalty", "pdf");
  const canPrint: boolean = usePermission("benefitPenalty", "print");

  console.log("type", type);
  console.log("subject", subject);
  console.log("criteria", criteria);
  console.log("date", date);
  console.log("driver", driver);
  console.log("formality", formality);
  console.log("description", description);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const typeOptions = ["Benefit", "Penalty"];

  const subjectOptions = [
    "Performance Bonus",
    "Late Arrival",
    "Safety Award",
    "Vehicle Damage",
    "Customer Service",
    "Route Deviation",
    "Fuel Efficiency",
    "Documentation",
    "Team Player",
    "Vehicle Maintenance",
    "Innovation",
    "Communication",
    "Attendance",
    "Equipment Misuse",
    "Cost Savings",
    "Policy Violation",
    "Training Completion",
    "Quality Issues",
    "Leadership",
    "Time Management",
  ];

  const formalityOptions = [
    "Monthly Review",
    "HR Warning",
    "Quarterly Review",
    "Incident Report",
    "Manager Review",
    "Peer Recognition",
    "Management Review",
    "Training Review",
    "Quality Review",
  ];

  const driverOptions = [
    "Ahmed Al-Rashid",
    "Mohammed Al-Zahrani",
    "Omar Al-Saadi",
    "Khalid Al-Mansouri",
    "Abdullah Al-Qahtani",
    "Hassan Al-Otaibi",
    "Saleh Al-Harbi",
    "Fahad Al-Dossary",
    "Yousef Al-Shammari",
    "Ibrahim Al-Rashid",
    "Nasser Al-Mutairi",
    "Majed Al-Zahrani",
    "Sami Al-Ghamdi",
    "Rashid Al-Sulaiman",
    "Tariq Al-Nasser",
    "Waleed Al-Qahtani",
    "Hamad Al-Mansouri",
    "Saud Al-Zahrani",
    "Khalil Al-Rashid",
    "Adel Al-Saadi",
  ];

  // Driver data mapping
  const driverData: Record<
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
      designation: "Senior Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Mohammed Al-Zahrani": {
      name: "Mohammed Al-Zahrani",
      designation: "Delivery Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Omar Al-Saadi": {
      name: "Omar Al-Saadi",
      designation: "Fleet Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Khalid Al-Mansouri": {
      name: "Khalid Al-Mansouri",
      designation: "Transport Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
    "Abdullah Al-Qahtani": {
      name: "Abdullah Al-Qahtani",
      designation: "Logistics Driver",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
      iqamaImage:
        "https://agtsipk.com/wp-content/uploads/2023/09/What-is-Iqama-in-Saudi-Arabia-4-1.png",
    },
  };

  // Form state
  const [formData, setFormData] = useState<BenefitPenaltyData>({
    type: "",
    subject: "",
    criteria: "",
    date: "",
    driver: "",
    formality: "",
    description: "",
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
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/benefit-penalty/create");
        } else {
          navigate("/benefit-penalty/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/benefit-penalty/view");
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
      handlePrintBenefitPenalty(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Benefit/penalty record created successfully!");
      handleReset();
    } else {
      toastSuccess("Benefit/penalty record created successfully!");
      navigate("/benefit-penalty");
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
      type: "",
      subject: "",
      criteria: "",
      date: "",
      driver: "",
      formality: "",
      description: "",
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

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["type"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintBenefitPenalty = (benefitPenaltyData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Benefit/Penalty Details",
        data: [benefitPenaltyData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          type: "Type",
          subject: "Subject",
          criteria: "Criteria",
          date: "Date",
          driver: "Driver",
          formality: "Formality",
          description: "Description",
          isDefault: "Default Status",
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
      console.log("benefitPenaltyData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Benefit/Penalty Details"
          subtitle="Benefit/Penalty Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "benefit-penalty-details.pdf";
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
                "Benefit/penalty record saved as draft successfully"
              );
            },
            show: canCreate, // Only show draft option if user can create
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Benefit/Penalty" : "Creating Benefit/Penalty"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="benefit-penalty"
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
            {/* First row - Type, Subject, Criteria, Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Type field */}
              {type && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("type")(el)}
                      id="type"
                      name="type"
                      allowCustomInput={true}
                      options={typeOptions}
                      value={formData.type}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, type: value });
                        if (value) {
                          focusNextInput("subject");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.type) {
                          focusNextInput("subject");
                        }
                      }}
                      placeholder=" "
                      labelText="Type"
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

              {/* Subject field */}
              {subject && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("subject")(el)}
                      id="subject"
                      name="subject"
                      allowCustomInput={true}
                      options={subjectOptions}
                      value={formData.subject}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, subject: value });
                        if (value) {
                          focusNextInput("criteria");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.subject) {
                          focusNextInput("criteria");
                        }
                      }}
                      placeholder=" "
                      labelText="Subject"
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

              {/* Criteria field */}
              {criteria && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("criteria")}
                    id="criteria"
                    name="criteria"
                    value={formData.criteria}
                    onChange={handleChange}
                    onNext={() => focusNextInput("date")}
                    onCancel={() => setFormData({ ...formData, criteria: "" })}
                    labelText="Criteria"
                    tooltipText="Enter criteria"
                    required
                  />
                </div>
              )}

              {/* Date field */}
              {date && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("date")}
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    onNext={() => focusNextInput("driver")}
                    onCancel={() => setFormData({ ...formData, date: "" })}
                    labelText="Date"
                    tooltipText="Select date"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second row - Driver, Formality, Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Driver field */}
              {driver && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("driver")(el)}
                      id="driver"
                      name="driver"
                      allowCustomInput={true}
                      options={driverOptions}
                      value={formData.driver}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, driver: value });

                        // Show driver details if valid driver is selected
                        if (value && driverData[value]) {
                          setSelectedEmployee(driverData[value]);
                          setIsEmployeeModalOpen(true);
                        }

                        if (value) {
                          focusNextInput("formality");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.driver) {
                          focusNextInput("formality");
                        }
                      }}
                      placeholder=" "
                      labelText="Driver"
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

              {/* Formality field */}
              {formality && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("formality")(el)}
                      id="formality"
                      name="formality"
                      allowCustomInput={true}
                      options={formalityOptions}
                      value={formData.formality}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, formality: value });
                        if (value) {
                          focusNextInput("description");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.formality) {
                          focusNextInput("description");
                        }
                      }}
                      placeholder=" "
                      labelText="Formality"
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

              {/* Description field */}
              {description && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("submitButton")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter description"
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

      {/* Driver Details Modal */}
      <Modal
        opened={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        title="Driver Details"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        centered
      >
        {selectedEmployee && (
          <div className="p-6">
            {/* Driver Header with Photo and Basic Info */}
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
                  Active Driver
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
                    <p className="text-sm text-gray-600">Driver Name</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formData.driver}
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
                Continue with Application
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
