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
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type InterviewData = {
  interviewDate: string;
  candidateName: string;
  interviewer: string;
  vivaMarks: number;
  writtenTotalMarks: number;
  mcqTotalMarks: number;
  totalMarks: number;
  recommendation: boolean;
  selectInterviewer: string;
  details: string;
  isDraft: boolean;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

type Props = { isEdit?: boolean };

const initialData: InterviewData = {
  interviewDate: "2024-02-15",
  candidateName: "John Doe",
  interviewer: "Jane Smith",
  vivaMarks: 18,
  writtenTotalMarks: 75,
  mcqTotalMarks: 40,
  totalMarks: 133,
  recommendation: true,
  selectInterviewer: "Jane Smith",
  details: "Strong problem-solving skills",
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function InterviewEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // File upload handlers (removed for bonus)

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Interviewer options
  const interviewerOptions = [
    "Jane Smith",
    "Ahmed Khan",
    "Sara Lee",
    "Emily Davis",
    "Omar Faruk",
    "Priya Patel",
    "Mohammed Ali",
    "Fatima Noor",
    "David Kim",
    "Ibrahim Musa",
    "Chen Wei",
    "Yuki Tanaka",
  ];

  // File upload states (removed for bonus)

  // Form state
  const [formData, setFormData] = useState<InterviewData>({
    interviewDate: "",
    candidateName: "",
    interviewer: "",
    vivaMarks: 0,
    writtenTotalMarks: 0,
    mcqTotalMarks: 0,
    totalMarks: 0,
    recommendation: false,
    selectInterviewer: "",
    details: "",
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Permissions
  const candidateNamePerm: boolean = usePermission(
    "interview",
    "edit",
    "candidateName"
  );
  const interviewerPerm: boolean = usePermission(
    "interview",
    "edit",
    "interviewer"
  );
  const interviewDatePerm: boolean = usePermission(
    "interview",
    "edit",
    "interviewDate"
  );
  const vivaMarksPerm: boolean = usePermission(
    "interview",
    "edit",
    "vivaMarks"
  );
  const writtenTotalMarksPerm: boolean = usePermission(
    "interview",
    "edit",
    "writtenTotalMarks"
  );
  const mcqTotalMarksPerm: boolean = usePermission(
    "interview",
    "edit",
    "mcqTotalMarks"
  );
  const totalMarksPerm: boolean = usePermission(
    "interview",
    "edit",
    "totalMarks"
  );
  const recommendationPerm: boolean = usePermission(
    "interview",
    "edit",
    "recommendation"
  );
  const selectInterviewerPerm: boolean = usePermission(
    "interview",
    "edit",
    "selectInterviewer"
  );
  const detailsPerm: boolean = usePermission("interview", "edit", "details");
  const canPdf: boolean = usePermission("interview", "pdf");
  const canPrint: boolean = usePermission("interview", "print");

  // No iqama/branch/from/to for interview edit

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
  }, [isEdit]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const parsedValue =
      name === "vivaMarks" ||
      name === "writtenTotalMarks" ||
      name === "mcqTotalMarks" ||
      name === "totalMarks"
        ? Number(value || 0)
        : value;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : (parsedValue as any),
    });
  };

  // Auto-calc total
  useEffect(() => {
    const total =
      Number(formData.vivaMarks || 0) +
      Number(formData.writtenTotalMarks || 0) +
      Number(formData.mcqTotalMarks || 0);
    setFormData((prev) => ({ ...prev, totalMarks: total }));
  }, [formData.vivaMarks, formData.writtenTotalMarks, formData.mcqTotalMarks]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Normal submit logic here (API call)

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintInterview(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("candidateName");
    } else {
      navigate("/interview");
    }
    toastSuccess("Interview edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      interviewDate: "",
      candidateName: "",
      interviewer: "",
      vivaMarks: 0,
      writtenTotalMarks: 0,
      mcqTotalMarks: 0,
      totalMarks: 0,
      recommendation: false,
      selectInterviewer: "",
      details: "",
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    // Reset file preview (removed for bonus)

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["candidateName"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintInterview = (data: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Interview Details",
        data: [data],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          interviewDate: "Interview Date",
          candidateName: "Candidate Name",
          interviewer: "Interviewer",
          vivaMarks: "Viva Marks",
          writtenTotalMarks: "Written Total Marks",
          mcqTotalMarks: "MCQ Total Marks",
          totalMarks: "Total Marks",
          recommendation: "Recommendation",
          selectInterviewer: "Select Interviewer",
          details: "Details",
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
      console.log("interviewData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Interview Details"
          subtitle="Interview Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "interview-details.pdf";
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
          navigate("/interview/create");
        } else {
          navigate("/interview/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/interview/view");
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
            label: "Draft",
            icon: <Check className="text-green-500" />,
            onClick: () => {
              setFormData((prev) => ({
                ...prev,
                isDraft: true,
              }));
              toastRestore("Interview saved as draft successfully");
            },
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Interview" : "Creating Interview"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="interview"
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
              Reset
            </Button>
            <Button
              ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
              id="submitButton"
              name="submitButton"
              variant="outline"
              className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold! focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:transform focus:scale-105 focus:transition-all focus:duration-300`}
              onClick={() => formRef.current?.requestSubmit()}
            >
              Submit
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
            {/* All fields in multiple rows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Candidate Name */}
              {candidateNamePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("candidateName")}
                    id="candidateName"
                    name="candidateName"
                    type="text"
                    value={formData.candidateName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("interviewer")}
                    onCancel={() =>
                      setFormData({ ...formData, candidateName: "" })
                    }
                    labelText="Candidate Name"
                    tooltipText="Enter candidate name"
                    required
                  />
                </div>
              )}

              {/* Interviewer */}
              {interviewerPerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("interviewer")(el)}
                      id="interviewer"
                      name="interviewer"
                      allowCustomInput={true}
                      options={interviewerOptions}
                      value={formData.interviewer}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, interviewer: value });
                        if (value) {
                          focusNextInput("interviewDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.interviewer) {
                          focusNextInput("interviewDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Interviewer"
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

              {/* Interview Date */}
              {interviewDatePerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("interviewDate")}
                    id="interviewDate"
                    name="interviewDate"
                    type="date"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vivaMarks")}
                    onCancel={() =>
                      setFormData({ ...formData, interviewDate: "" })
                    }
                    labelText="Interview Date"
                    tooltipText="Select interview date"
                    required
                  />
                </div>
              )}

              {/* Viva Marks */}
              {vivaMarksPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vivaMarks")}
                    id="vivaMarks"
                    name="vivaMarks"
                    type="number"
                    value={String(formData.vivaMarks)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("writtenTotalMarks")}
                    onCancel={() => setFormData({ ...formData, vivaMarks: 0 })}
                    labelText="Viva Marks"
                    tooltipText="Enter viva marks"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Written Total Marks */}
              {writtenTotalMarksPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("writtenTotalMarks")}
                    id="writtenTotalMarks"
                    name="writtenTotalMarks"
                    type="number"
                    value={String(formData.writtenTotalMarks)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("mcqTotalMarks")}
                    onCancel={() =>
                      setFormData({ ...formData, writtenTotalMarks: 0 })
                    }
                    labelText="Written Total Marks"
                    tooltipText="Enter written total marks"
                    required
                  />
                </div>
              )}

              {/* MCQ Total Marks */}
              {mcqTotalMarksPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("mcqTotalMarks")}
                    id="mcqTotalMarks"
                    name="mcqTotalMarks"
                    type="number"
                    value={String(formData.mcqTotalMarks)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("totalMarks")}
                    onCancel={() =>
                      setFormData({ ...formData, mcqTotalMarks: 0 })
                    }
                    labelText="MCQ Total Marks"
                    tooltipText="Enter MCQ total marks"
                    required
                  />
                </div>
              )}

              {/* Total Marks */}
              {totalMarksPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("totalMarks")}
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    value={String(formData.totalMarks)}
                    onChange={handleChange}
                    onNext={() => focusNextInput("recommendation")}
                    onCancel={() => setFormData({ ...formData, totalMarks: 0 })}
                    labelText="Total Marks"
                    tooltipText="Sum of all marks"
                    required
                  />
                </div>
              )}

              {/* Recommendation */}
              {recommendationPerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("recommendation")(el)}
                      id="recommendation"
                      name="recommendation"
                      allowCustomInput={false}
                      options={["Recommended", "Not Recommended"]}
                      value={
                        formData.recommendation
                          ? "Recommended"
                          : "Not Recommended"
                      }
                      onValueChange={(value: string) => {
                        setFormData({
                          ...formData,
                          recommendation: value === "Recommended",
                        });
                        if (value) {
                          focusNextInput("selectInterviewer");
                        }
                      }}
                      onEnterPress={() => {
                        focusNextInput("selectInterviewer");
                      }}
                      placeholder=" "
                      labelText="Recommandation"
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Select Interviewer */}
              {selectInterviewerPerm && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("selectInterviewer")(el)}
                      id="selectInterviewer"
                      name="selectInterviewer"
                      allowCustomInput={true}
                      options={interviewerOptions}
                      value={formData.selectInterviewer}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, selectInterviewer: value });
                        if (value) {
                          focusNextInput("details");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.selectInterviewer) {
                          focusNextInput("details");
                        }
                      }}
                      placeholder=" "
                      labelText="Select Interviewer"
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

              {/* Details */}
              {detailsPerm && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("details")}
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    onNext={() => focusNextInput("submitButton")}
                    onCancel={() => setFormData({ ...formData, details: "" })}
                    labelText="Details"
                    tooltipText="Enter details"
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

      {/* Removed employee modal for interview edit */}

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
