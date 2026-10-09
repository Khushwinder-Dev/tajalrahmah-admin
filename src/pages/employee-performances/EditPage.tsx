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
import MultipleInputRow from "./components/MultipleInputRow";
import NextReviewPeriodInputRow from "./components/NextReviewPeriodInputRow";

type ProjectTypeDataType = {
  employeeName: string;
  reviewPeriodInMonths: string;
  nameAndPositionOfSupervisorHeadOfDepartment: string;

  // Assessment of Goals Objectives Set During the Review Period

  demonstratedKnowledgeOfDutiesQualityOfWork: string;
  demonstratedKnowledgeOfDutiesQualityOfWorkScore: string;
  demonstratedKnowledgeOfDutiesQualityOfWorkComments: string;

  timelinessOfDelivery: string;
  timelinessOfDeliveryScore: string;
  timelinessOfDeliveryComments: string;

  impactOfAchievement: string;
  impactOfAchievementScore: string;
  impactOfAchievementComments: string;

  overallAchievementOfGoalsObjectives: string;
  overallAchievementOfGoalsObjectivesScore: string;
  overallAchievementOfGoalsObjectivesComments: string;

  goingBeyondTheCallOfDuty: string;
  goingBeyondTheCallOfDutyScore: string;
  goingBeyondTheCallOfDutyComments: string;

  // B. Assessment of Other Performance Standards and Indicators

  interpersonalSkillsAbilityToWorkInATeamEnvironment: string;
  interpersonalSkillsAbilityToWorkInATeamEnvironmentScore: string;
  interpersonalSkillsAbilityToWorkInATeamEnvironmentComments: string;

  attendanceAndPunctuality: string;
  attendanceAndPunctualityScore: string;
  attendanceAndPunctualityComments: string;

  communicationSkills: string;
  communicationSkillsScore: string;
  communicationSkillsComments: string;

  contributingToCompanyMission: string;
  contributingToCompanyMissionScore: string;
  contributingToCompanyMissionComments: string;

  // C. Total Score
  totalScore: string;

  // Overall Comments / Recommendations by Reviewer
  reviewerName: string;
  reviewerSignature: string;
  reviewDate: string;
  nextReviewPeriod: string;

  // D. Comments by Employee
  employeeComments: string;

  // TODO :: E. Development Plan
  // TODO :: F. Key Goals for Next Review Period

  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

const ratingData = [
  { label: "Poor", value: 1 },
  { label: "Needs Improvement", value: 3 },
  { label: "Good", value: 6 },
  { label: "Very Good", value: 9 },
  { label: "Excellent", value: 10 },
];

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  employeeName: "",
  reviewPeriodInMonths: "",
  nameAndPositionOfSupervisorHeadOfDepartment: "",

  demonstratedKnowledgeOfDutiesQualityOfWork: "",
  demonstratedKnowledgeOfDutiesQualityOfWorkScore: "",
  demonstratedKnowledgeOfDutiesQualityOfWorkComments: "",

  timelinessOfDelivery: "",
  timelinessOfDeliveryScore: "",
  timelinessOfDeliveryComments: "",

  impactOfAchievement: "",
  impactOfAchievementScore: "",
  impactOfAchievementComments: "",

  overallAchievementOfGoalsObjectives: "",
  overallAchievementOfGoalsObjectivesScore: "",
  overallAchievementOfGoalsObjectivesComments: "",

  goingBeyondTheCallOfDuty: "",
  goingBeyondTheCallOfDutyScore: "",
  goingBeyondTheCallOfDutyComments: "",

  interpersonalSkillsAbilityToWorkInATeamEnvironment: "",
  interpersonalSkillsAbilityToWorkInATeamEnvironmentScore: "",
  interpersonalSkillsAbilityToWorkInATeamEnvironmentComments: "",

  attendanceAndPunctuality: "",
  attendanceAndPunctualityScore: "",
  attendanceAndPunctualityComments: "",

  communicationSkills: "",
  communicationSkillsScore: "",
  communicationSkillsComments: "",

  contributingToCompanyMission: "",
  contributingToCompanyMissionScore: "",
  contributingToCompanyMissionComments: "",

  totalScore: "",

  reviewerName: "",
  reviewerSignature: "",
  reviewDate: "",
  nextReviewPeriod: "",

  employeeComments: "",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function EmployeePerformancesEditPage({
  isEdit = false,
}: Props) {
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
  const canCreate = usePermission("employeePerformances", "create");
  const canView = usePermission("employeePerformances", "view");
  const canEdit = usePermission("employeePerformances", "edit");
  const canDelete = usePermission("employeePerformances", "delete");
  const canPdf: boolean = usePermission("employeePerformances", "pdf");
  const canPrint: boolean = usePermission("employeePerformances", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const permissionsFieldLevel = usePermission<keyof ProjectTypeDataType>(
    "employeePerformances",
    "create",
    [
      "employeeName",
      "reviewPeriodInMonths",
      "nameAndPositionOfSupervisorHeadOfDepartment",
      "demonstratedKnowledgeOfDutiesQualityOfWork",
      "demonstratedKnowledgeOfDutiesQualityOfWorkScore",
      "demonstratedKnowledgeOfDutiesQualityOfWorkComments",
      "timelinessOfDelivery",
      "timelinessOfDeliveryScore",
      "timelinessOfDeliveryComments",
      "impactOfAchievement",
      "impactOfAchievementScore",
      "impactOfAchievementComments",
      "overallAchievementOfGoalsObjectives",
      "overallAchievementOfGoalsObjectivesScore",
      "overallAchievementOfGoalsObjectivesComments",
      "goingBeyondTheCallOfDuty",
      "goingBeyondTheCallOfDutyScore",
      "goingBeyondTheCallOfDutyComments",
      "interpersonalSkillsAbilityToWorkInATeamEnvironment",
      "interpersonalSkillsAbilityToWorkInATeamEnvironmentScore",
      "interpersonalSkillsAbilityToWorkInATeamEnvironmentComments",
      "attendanceAndPunctuality",
      "attendanceAndPunctualityScore",
      "attendanceAndPunctualityComments",
      "communicationSkills",
      "communicationSkillsScore",
      "communicationSkillsComments",
      "contributingToCompanyMission",
      "contributingToCompanyMissionScore",
      "contributingToCompanyMissionComments",
      "totalScore",
      "reviewerName",
      "reviewerSignature",
      "reviewDate",
      "nextReviewPeriod",
      "employeeComments",
      "isDefault",
      "isDraft",
    ]
  );

  console.log("permissionsFieldLevel", permissionsFieldLevel);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    employeeName: "",
    reviewPeriodInMonths: "",
    nameAndPositionOfSupervisorHeadOfDepartment: "",
    demonstratedKnowledgeOfDutiesQualityOfWork: "",
    timelinessOfDelivery: "",
    impactOfAchievement: "",
    overallAchievementOfGoalsObjectives: "",
    goingBeyondTheCallOfDuty: "",
    interpersonalSkillsAbilityToWorkInATeamEnvironment: "",
    attendanceAndPunctuality: "",
    communicationSkills: "",
    contributingToCompanyMission: "",
    totalScore: "",
    reviewerName: "",
    reviewerSignature: "",
    reviewDate: "",
    nextReviewPeriod: "",
    employeeComments: "",

    demonstratedKnowledgeOfDutiesQualityOfWorkScore: "",
    demonstratedKnowledgeOfDutiesQualityOfWorkComments: "",
    timelinessOfDeliveryScore: "",
    timelinessOfDeliveryComments: "",
    impactOfAchievementScore: "",
    impactOfAchievementComments: "",
    overallAchievementOfGoalsObjectivesScore: "",
    overallAchievementOfGoalsObjectivesComments: "",
    goingBeyondTheCallOfDutyScore: "",
    goingBeyondTheCallOfDutyComments: "",
    interpersonalSkillsAbilityToWorkInATeamEnvironmentScore: "",
    interpersonalSkillsAbilityToWorkInATeamEnvironmentComments: "",
    attendanceAndPunctualityScore: "",
    attendanceAndPunctualityComments: "",
    communicationSkillsScore: "",
    communicationSkillsComments: "",
    contributingToCompanyMissionScore: "",
    contributingToCompanyMissionComments: "",

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
          navigate("/employee-performances/create");
        } else {
          navigate("/employee-performances/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/employee-performances/view");
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
      toastSuccess("Employee Performance updated successfully!");
      handleReset();
    } else {
      toastSuccess("Employee Performance updated successfully!");
      navigate("/employee-performances");
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
      employeeName: "",
      reviewPeriodInMonths: "",
      nameAndPositionOfSupervisorHeadOfDepartment: "",
      demonstratedKnowledgeOfDutiesQualityOfWork: "",
      timelinessOfDelivery: "",
      impactOfAchievement: "",
      overallAchievementOfGoalsObjectives: "",
      goingBeyondTheCallOfDuty: "",
      interpersonalSkillsAbilityToWorkInATeamEnvironment: "",
      attendanceAndPunctuality: "",
      communicationSkills: "",
      contributingToCompanyMission: "",
      totalScore: "",
      reviewerName: "",
      reviewerSignature: "",
      reviewDate: "",
      nextReviewPeriod: "",
      employeeComments: "",

      demonstratedKnowledgeOfDutiesQualityOfWorkScore: "",
      demonstratedKnowledgeOfDutiesQualityOfWorkComments: "",
      timelinessOfDeliveryScore: "",
      timelinessOfDeliveryComments: "",
      impactOfAchievementScore: "",
      impactOfAchievementComments: "",
      overallAchievementOfGoalsObjectivesScore: "",
      overallAchievementOfGoalsObjectivesComments: "",
      goingBeyondTheCallOfDutyScore: "",
      goingBeyondTheCallOfDutyComments: "",
      interpersonalSkillsAbilityToWorkInATeamEnvironmentScore: "",
      interpersonalSkillsAbilityToWorkInATeamEnvironmentComments: "",
      attendanceAndPunctualityScore: "",
      attendanceAndPunctualityComments: "",
      communicationSkillsScore: "",
      communicationSkillsComments: "",
      contributingToCompanyMissionScore: "",
      contributingToCompanyMissionComments: "",

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
      inputRefs.current["employeeName"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Employee Performance Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          employeeName: "Employee Name",
          reviewPeriodInMonths: "Review Period In Months",
          nameAndPositionOfSupervisorHeadOfDepartment:
            "Name And Position Of Supervisor Head Of Department",
          demonstratedKnowledgeOfDutiesQualityOfWork:
            "Demonstrated Knowledge Of Duties Quality Of Work",
          timelinessOfDelivery: "Timeliness Of Delivery",
          impactOfAchievement: "Impact Of Achievement",
          overallAchievementOfGoalsObjectives:
            "Overall Achievement Of Goals Objectives",
          goingBeyondTheCallOfDuty: "Going Beyond The Call Of Duty",
          interpersonalSkillsAbilityToWorkInATeamEnvironment:
            "Interpersonal Skills Ability To Work In A Team Environment",
          attendanceAndPunctuality: "Attendance And Punctuality",
          communicationSkills: "Communication Skills",
          contributingToCompanyMission: "Contributing To Company Mission",
          totalScore: "Total Score",
          reviewerName: "Reviewer Name",
          reviewerSignature: "Reviewer Signature",
          reviewDate: "Review Date",
          nextReviewPeriod: "Next Review Period",
          employeeComments: "Employee Comments",

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
          title="Employee Performance Details"
          subtitle="Employee Performance Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "employee-performance-details.pdf";
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
              toastRestore("Employee Performance saved as draft successfully");
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
        title={
          isEdit
            ? "Editing Employee Performance"
            : "Creating Employee Performance"
        }
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="employee-performances"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 relative">
              {permissionsFieldLevel.employeeName && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("employeeName")(el)}
                    id="employeeName"
                    name="employeeName"
                    options={[
                      "Employee One",
                      "Employee Two",
                      "Employee Three",
                      "Employee Four",
                      "Employee Five",
                      "Employee Six",
                      "Employee Seven",
                      "Employee Eight",
                      "Employee Nine",
                      "Employee Ten",
                    ]}
                    value={formData.employeeName}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        employeeName: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("reviewPeriodInMonths");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        focusNextInput("reviewPeriodInMonths");
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

              {permissionsFieldLevel.reviewPeriodInMonths && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reviewPeriodInMonths")}
                    type="text"
                    id="reviewPeriodInMonths"
                    name="reviewPeriodInMonths"
                    value={formData.reviewPeriodInMonths}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "nameAndPositionOfSupervisorHeadOfDepartment"
                      )
                    }
                    onCancel={() =>
                      setFormData({ ...formData, reviewPeriodInMonths: "" })
                    }
                    labelText="Review Period (in Months)"
                    tooltipText="Enter review period in months"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.nameAndPositionOfSupervisorHeadOfDepartment && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef(
                      "nameAndPositionOfSupervisorHeadOfDepartment"
                    )}
                    type="text"
                    id="nameAndPositionOfSupervisorHeadOfDepartment"
                    name="nameAndPositionOfSupervisorHeadOfDepartment"
                    value={formData.nameAndPositionOfSupervisorHeadOfDepartment}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "demonstratedKnowledgeOfDutiesQualityOfWork"
                      )
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        nameAndPositionOfSupervisorHeadOfDepartment: "",
                      })
                    }
                    labelText="Name and Position of Supervisor/Head of Department"
                    tooltipText="Enter name and position of supervisor/head of department"
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

            {/* Mini Sections */}

            <h3 className="text-lg font-semibold border-b pb-2">
              A. Assessment of Goals Objectives Set During the Review Period
            </h3>
            <p className="text-base font-medium">
              Demonstrated Knowledge of Duties Quality of Work:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.demonstratedKnowledgeOfDutiesQualityOfWork && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) =>
                      setRef("demonstratedKnowledgeOfDutiesQualityOfWork")(el)
                    }
                    id="demonstratedKnowledgeOfDutiesQualityOfWork"
                    name="demonstratedKnowledgeOfDutiesQualityOfWork"
                    options={ratingData.map((item) => item.label)}
                    value={formData.demonstratedKnowledgeOfDutiesQualityOfWork}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        demonstratedKnowledgeOfDutiesQualityOfWork: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput(
                        "demonstratedKnowledgeOfDutiesQualityOfWorkScore"
                      );
                    }}
                    onEnterPress={() => {
                      if (formData.demonstratedKnowledgeOfDutiesQualityOfWork) {
                        focusNextInput(
                          "demonstratedKnowledgeOfDutiesQualityOfWorkScore"
                        );
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.demonstratedKnowledgeOfDutiesQualityOfWorkScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef(
                      "demonstratedKnowledgeOfDutiesQualityOfWorkScore"
                    )}
                    type="text"
                    id="demonstratedKnowledgeOfDutiesQualityOfWorkScore"
                    name="demonstratedKnowledgeOfDutiesQualityOfWorkScore"
                    value={
                      formData.demonstratedKnowledgeOfDutiesQualityOfWorkScore
                    }
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "demonstratedKnowledgeOfDutiesQualityOfWorkComment"
                      )
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        demonstratedKnowledgeOfDutiesQualityOfWorkScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.demonstratedKnowledgeOfDutiesQualityOfWorkComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef(
                      "demonstratedKnowledgeOfDutiesQualityOfWorkComments"
                    )}
                    type="text"
                    id="demonstratedKnowledgeOfDutiesQualityOfWorkComments"
                    name="demonstratedKnowledgeOfDutiesQualityOfWorkComments"
                    value={
                      formData.demonstratedKnowledgeOfDutiesQualityOfWorkComments
                    }
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "demonstratedKnowledgeOfDutiesQualityOfWorkComment"
                      )
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        demonstratedKnowledgeOfDutiesQualityOfWorkComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>
            <p className="text-base font-medium">Timeliness of Delivery:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.timelinessOfDelivery && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("timelinessOfDelivery")(el)}
                    id="timelinessOfDelivery"
                    name="timelinessOfDelivery"
                    options={ratingData.map((item) => item.label)}
                    value={formData.timelinessOfDelivery}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        timelinessOfDelivery: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("timelinessOfDeliveryScore");
                    }}
                    onEnterPress={() => {
                      if (formData.timelinessOfDelivery) {
                        focusNextInput("timelinessOfDeliveryScore");
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.timelinessOfDeliveryScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("timelinessOfDeliveryScore")}
                    type="text"
                    id="timelinessOfDeliveryScore"
                    name="timelinessOfDeliveryScore"
                    value={formData.timelinessOfDeliveryScore}
                    onChange={handleChange}
                    onNext={() => focusNextInput("timelinessOfDeliveryComment")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        timelinessOfDeliveryScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.timelinessOfDeliveryComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("timelinessOfDeliveryComments")}
                    type="text"
                    id="timelinessOfDeliveryComments"
                    name="timelinessOfDeliveryComments"
                    value={formData.timelinessOfDeliveryComments}
                    onChange={handleChange}
                    onNext={() => focusNextInput("timelinessOfDeliveryComment")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        timelinessOfDeliveryComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            <p className="text-base font-medium">Impact of Achievement:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.impactOfAchievement && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("impactOfAchievement")(el)}
                    id="impactOfAchievement"
                    name="impactOfAchievement"
                    options={ratingData.map((item) => item.label)}
                    value={formData.impactOfAchievement}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        impactOfAchievement: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("impactOfAchievementScore");
                    }}
                    onEnterPress={() => {
                      if (formData.impactOfAchievement) {
                        focusNextInput("impactOfAchievementScore");
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.impactOfAchievementScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("impactOfAchievementScore")}
                    type="text"
                    id="impactOfAchievementScore"
                    name="impactOfAchievementScore"
                    value={formData.impactOfAchievementScore}
                    onChange={handleChange}
                    onNext={() => focusNextInput("impactOfAchievementComment")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        impactOfAchievementScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.impactOfAchievementComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("impactOfAchievementComments")}
                    type="text"
                    id="impactOfAchievementComments"
                    name="impactOfAchievementComments"
                    value={formData.impactOfAchievementComments}
                    onChange={handleChange}
                    onNext={() => focusNextInput("impactOfAchievementComment")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        impactOfAchievementComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            {/* Overall Achievement of Goals/Objectives */}
            <p className="text-base font-medium">
              Overall Achievement of Goals/Objectives:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.overallAchievementOfGoalsObjectives && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) =>
                      setRef("overallAchievementOfGoalsObjectives")(el)
                    }
                    id="overallAchievementOfGoalsObjectives"
                    name="overallAchievementOfGoalsObjectives"
                    options={ratingData.map((item) => item.label)}
                    value={formData.overallAchievementOfGoalsObjectives}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        overallAchievementOfGoalsObjectives: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput(
                        "overallAchievementOfGoalsObjectivesScore"
                      );
                    }}
                    onEnterPress={() => {
                      if (formData.overallAchievementOfGoalsObjectives) {
                        focusNextInput(
                          "overallAchievementOfGoalsObjectivesScore"
                        );
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.overallAchievementOfGoalsObjectivesScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("overallAchievementOfGoalsObjectivesScore")}
                    type="text"
                    id="overallAchievementOfGoalsObjectivesScore"
                    name="overallAchievementOfGoalsObjectivesScore"
                    value={formData.overallAchievementOfGoalsObjectivesScore}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "overallAchievementOfGoalsObjectivesComment"
                      )
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        overallAchievementOfGoalsObjectivesScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.overallAchievementOfGoalsObjectivesComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef(
                      "overallAchievementOfGoalsObjectivesComments"
                    )}
                    type="text"
                    id="overallAchievementOfGoalsObjectivesComments"
                    name="overallAchievementOfGoalsObjectivesComments"
                    value={formData.overallAchievementOfGoalsObjectivesComments}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "overallAchievementOfGoalsObjectivesComment"
                      )
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        overallAchievementOfGoalsObjectivesComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            {/* Going beyond the call of Duty */}
            <p className="text-base font-medium">
              Going beyond the call of Duty:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.goingBeyondTheCallOfDuty && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("goingBeyondTheCallOfDuty")(el)}
                    id="goingBeyondTheCallOfDuty"
                    name="goingBeyondTheCallOfDuty"
                    options={ratingData.map((item) => item.label)}
                    value={formData.goingBeyondTheCallOfDuty}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        goingBeyondTheCallOfDuty: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("goingBeyondTheCallOfDutyScore");
                    }}
                    onEnterPress={() => {
                      if (formData.goingBeyondTheCallOfDuty) {
                        focusNextInput("goingBeyondTheCallOfDutyScore");
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.goingBeyondTheCallOfDutyScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("goingBeyondTheCallOfDutyScore")}
                    type="text"
                    id="goingBeyondTheCallOfDutyScore"
                    name="goingBeyondTheCallOfDutyScore"
                    value={formData.goingBeyondTheCallOfDutyScore}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput("goingBeyondTheCallOfDutyComment")
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        goingBeyondTheCallOfDutyScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.goingBeyondTheCallOfDutyComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("goingBeyondTheCallOfDutyComments")}
                    type="text"
                    id="goingBeyondTheCallOfDutyComments"
                    name="goingBeyondTheCallOfDutyComments"
                    value={formData.goingBeyondTheCallOfDutyComments}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput("goingBeyondTheCallOfDutyComment")
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        goingBeyondTheCallOfDutyComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            {/* B. Assessment of Other Performance Standards and Indicators */}
            <h3 className="text-lg font-semibold border-b pb-2">
              B. Assessment of Other Performance Standards and Indicators
            </h3>
            {/* Interpersonal skills & ability to work in a team environment */}
            <p className="text-base font-medium">
              Interpersonal skills & ability to work in a team environment:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.interpersonalSkillsAbilityToWorkInATeamEnvironment && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) =>
                      setRef(
                        "interpersonalSkillsAbilityToWorkInATeamEnvironment"
                      )(el)
                    }
                    id="interpersonalSkillsAbilityToWorkInATeamEnvironment"
                    name="interpersonalSkillsAbilityToWorkInATeamEnvironment"
                    options={ratingData.map((item) => item.label)}
                    value={
                      formData.interpersonalSkillsAbilityToWorkInATeamEnvironment
                    }
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        interpersonalSkillsAbilityToWorkInATeamEnvironment:
                          value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput(
                        "interpersonalSkillsAbilityToWorkInATeamEnvironmentScore"
                      );
                    }}
                    onEnterPress={() => {
                      if (
                        formData.interpersonalSkillsAbilityToWorkInATeamEnvironment
                      ) {
                        focusNextInput(
                          "interpersonalSkillsAbilityToWorkInATeamEnvironmentScore"
                        );
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.interpersonalSkillsAbilityToWorkInATeamEnvironmentScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef(
                      "interpersonalSkillsAbilityToWorkInATeamEnvironmentScore"
                    )}
                    type="text"
                    id="interpersonalSkillsAbilityToWorkInATeamEnvironmentScore"
                    name="interpersonalSkillsAbilityToWorkInATeamEnvironmentScore"
                    value={
                      formData.interpersonalSkillsAbilityToWorkInATeamEnvironmentScore
                    }
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "interpersonalSkillsAbilityToWorkInATeamEnvironmentComment"
                      )
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        interpersonalSkillsAbilityToWorkInATeamEnvironmentScore:
                          "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.interpersonalSkillsAbilityToWorkInATeamEnvironmentComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef(
                      "interpersonalSkillsAbilityToWorkInATeamEnvironmentComments"
                    )}
                    type="text"
                    id="interpersonalSkillsAbilityToWorkInATeamEnvironmentComments"
                    name="interpersonalSkillsAbilityToWorkInATeamEnvironmentComments"
                    value={
                      formData.interpersonalSkillsAbilityToWorkInATeamEnvironmentComments
                    }
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput(
                        "interpersonalSkillsAbilityToWorkInATeamEnvironmentComment"
                      )
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        interpersonalSkillsAbilityToWorkInATeamEnvironmentComments:
                          "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            {/* Attendance and Punctuality */}
            <p className="text-base font-medium">Attendance and Punctuality:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.attendanceAndPunctuality && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("attendanceAndPunctuality")(el)}
                    id="attendanceAndPunctuality"
                    name="attendanceAndPunctuality"
                    options={ratingData.map((item) => item.label)}
                    value={formData.attendanceAndPunctuality}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        attendanceAndPunctuality: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("attendanceAndPunctualityScore");
                    }}
                    onEnterPress={() => {
                      if (formData.attendanceAndPunctuality) {
                        focusNextInput("attendanceAndPunctualityScore");
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.attendanceAndPunctualityScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("attendanceAndPunctualityScore")}
                    type="text"
                    id="attendanceAndPunctualityScore"
                    name="attendanceAndPunctualityScore"
                    value={formData.attendanceAndPunctualityScore}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput("attendanceAndPunctualityComment")
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        attendanceAndPunctualityScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.attendanceAndPunctualityComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("attendanceAndPunctualityComments")}
                    type="text"
                    id="attendanceAndPunctualityComments"
                    name="attendanceAndPunctualityComments"
                    value={formData.attendanceAndPunctualityComments}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput("attendanceAndPunctualityComment")
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        attendanceAndPunctualityComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            {/* Communication Skills */}
            <p className="text-base font-medium">Communication Skills:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.communicationSkills && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("communicationSkills")(el)}
                    id="communicationSkills"
                    name="communicationSkills"
                    options={ratingData.map((item) => item.label)}
                    value={formData.communicationSkills}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        communicationSkills: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("communicationSkillsScore");
                    }}
                    onEnterPress={() => {
                      if (formData.communicationSkills) {
                        focusNextInput("communicationSkillsScore");
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.communicationSkillsScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("communicationSkillsScore")}
                    type="text"
                    id="communicationSkillsScore"
                    name="communicationSkillsScore"
                    value={formData.communicationSkillsScore}
                    onChange={handleChange}
                    onNext={() => focusNextInput("communicationSkillsComment")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        communicationSkillsScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.communicationSkillsComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("communicationSkillsComments")}
                    type="text"
                    id="communicationSkillsComments"
                    name="communicationSkillsComments"
                    value={formData.communicationSkillsComments}
                    onChange={handleChange}
                    onNext={() => focusNextInput("communicationSkillsComment")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        communicationSkillsComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            {/* Contributing to Company Mission */}
            <p className="text-base font-medium">
              Contributing to Company Mission:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative">
              {permissionsFieldLevel.contributingToCompanyMission && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) =>
                      setRef("contributingToCompanyMission")(el)
                    }
                    id="contributingToCompanyMission"
                    name="contributingToCompanyMission"
                    options={ratingData.map((item) => item.label)}
                    value={formData.contributingToCompanyMission}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        contributingToCompanyMission: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("contributingToCompanyMissionScore");
                    }}
                    onEnterPress={() => {
                      if (formData.contributingToCompanyMission) {
                        focusNextInput("contributingToCompanyMissionScore");
                      }
                    }}
                    placeholder=" "
                    labelText="Rating"
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

              {permissionsFieldLevel.contributingToCompanyMissionScore && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("contributingToCompanyMissionScore")}
                    type="text"
                    id="contributingToCompanyMissionScore"
                    name="contributingToCompanyMissionScore"
                    value={formData.contributingToCompanyMissionScore}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput("contributingToCompanyMissionComment")
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        contributingToCompanyMissionScore: "",
                      })
                    }
                    labelText="Score"
                    tooltipText="Enter score"
                    required
                  />
                </div>
              )}

              {permissionsFieldLevel.contributingToCompanyMissionComments && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("contributingToCompanyMissionComments")}
                    type="text"
                    id="contributingToCompanyMissionComments"
                    name="contributingToCompanyMissionComments"
                    value={formData.contributingToCompanyMissionComments}
                    onChange={handleChange}
                    onNext={() =>
                      focusNextInput("contributingToCompanyMissionComment")
                    }
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        contributingToCompanyMissionComments: "",
                      })
                    }
                    labelText="Comments"
                    tooltipText="Enter comments"
                    required
                  />
                </div>
              )}
            </div>

            {/* Total Score */}
            <h3 className="text-lg font-semibold border-b pb-2">Total Score</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative">
              <div className="space-y-2">
                {permissionsFieldLevel.totalScore && (
                  <EditableInput
                    setRef={setRef("totalScore")}
                    type="text"
                    id="totalScore"
                    name="totalScore"
                    value={formData.totalScore}
                    onChange={handleChange}
                    onNext={() => focusNextInput("totalScoreComment")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        totalScore: "",
                      })
                    }
                    labelText="Total Score"
                    tooltipText="Enter total score"
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                {permissionsFieldLevel.reviewerName && (
                  <EditableInput
                    setRef={setRef("reviewerName")}
                    type="text"
                    id="reviewerName"
                    name="reviewerName"
                    value={formData.reviewerName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reviewerSignature")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        reviewerName: "",
                      })
                    }
                    labelText="Reviewer Name"
                    tooltipText="Enter reviewer name"
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                {permissionsFieldLevel.reviewerSignature && (
                  <EditableInput
                    setRef={setRef("reviewerSignature")}
                    type="text"
                    id="reviewerSignature"
                    name="reviewerSignature"
                    value={formData.reviewerSignature}
                    onChange={handleChange}
                    onNext={() => focusNextInput("reviewDate")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        reviewerSignature: "",
                      })
                    }
                    labelText="Reviewer Signature"
                    tooltipText="Enter reviewer signature"
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                {permissionsFieldLevel.reviewDate && (
                  <EditableInput
                    setRef={setRef("reviewDate")}
                    type="date"
                    id="reviewDate"
                    name="reviewDate"
                    value={formData.reviewDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("nextReviewPeriod")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        reviewDate: "",
                      })
                    }
                    labelText="Review Date"
                    tooltipText="Enter review date"
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                {permissionsFieldLevel.nextReviewPeriod && (
                  <EditableInput
                    setRef={setRef("nextReviewPeriod")}
                    type="text"
                    id="nextReviewPeriod"
                    name="nextReviewPeriod"
                    value={formData.nextReviewPeriod}
                    onChange={handleChange}
                    onNext={() => focusNextInput("")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        nextReviewPeriod: "",
                      })
                    }
                    labelText="Next Review Period"
                    tooltipText="Enter next review period"
                    required
                  />
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold border-b pb-2">
              D. Comments by Employee
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4 relative">
              <div className="space-y-2">
                {permissionsFieldLevel.employeeComments && (
                  <EditableInput
                    setRef={setRef("employeeComments")}
                    type="text"
                    id="employeeComments"
                    name="employeeComments"
                    value={formData.employeeComments}
                    onChange={handleChange}
                    onNext={() => focusNextInput("")}
                    onCancel={() =>
                      setFormData({
                        ...formData,
                        employeeComments: "",
                      })
                    }
                    labelText="Employee Comments"
                    tooltipText="Enter employee comments"
                    required
                  />
                )}
              </div>
            </div>

            {/* MultipleInputRow */}
            <MultipleInputRow setRef={setRef} focusNextInput={focusNextInput} />
            {/* Next Review Period */}
            <NextReviewPeriodInputRow
              setRef={setRef}
              focusNextInput={focusNextInput}
            />
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
