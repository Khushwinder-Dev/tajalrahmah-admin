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

type JobPostData = {
  sn: string;
  company: string;
  jobTitle: string;
  jobCategory: string;
  jobType: string;
  noOfVacancies: number;
  closingDate: string;
  gender: string;
  minimumExperience: string;
  isFeatured: boolean;
  status: string;
  shortDescription: string;
  longDescription: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: JobPostData = {
  sn: "001",
  company: "Tech Solutions Inc",
  jobTitle: "Senior React Developer",
  jobCategory: "Software Development",
  jobType: "Full-time",
  noOfVacancies: 3,
  closingDate: "2024-02-15",
  gender: "Any",
  minimumExperience: "5 years",
  isFeatured: true,
  status: "Active",
  shortDescription:
    "Experienced React developer needed for enterprise applications",
  longDescription:
    "We are looking for a senior React developer with 5+ years of experience in building scalable web applications.",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function JobPostEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<JobPostData>({
    sn: "",
    company: "",
    jobTitle: "",
    jobCategory: "",
    jobType: "",
    noOfVacancies: 1,
    closingDate: "",
    gender: "Any",
    minimumExperience: "Fresh Graduate",
    isFeatured: false,
    status: "",
    shortDescription: "",
    longDescription: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("jobPost", "create");
  const canView = usePermission("jobPost", "view");
  const canEdit = usePermission("jobPost", "edit");
  const canDelete = usePermission("jobPost", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof JobPostData>(
    "jobPost",
    "edit",
    [
      "sn",
      "company",
      "jobTitle",
      "jobCategory",
      "jobType",
      "noOfVacancies",
      "closingDate",
      "gender",
      "minimumExperience",
      "isFeatured",
      "status",
      "shortDescription",
      "longDescription",
      "isActive",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("jobPost", "pdf");
  const canPrint: boolean = usePermission("jobPost", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const statusOptions = [
    "Active",
    "Inactive",
    "On Hold",
    "Under Review",
    "Pending",
    "Approved",
    "Closed",
    "Expired",
  ];

  const companyOptions = [
    "Tech Solutions Inc",
    "Digital Marketing Pro",
    "Finance Corp",
    "Healthcare Plus",
    "Education First",
    "Logistics Express",
    "Creative Design Studio",
    "Sales Force",
    "Tech Innovations",
    "Legal Partners",
  ];

  const jobCategoryOptions = [
    "Software Development",
    "Marketing",
    "Finance",
    "Healthcare",
    "Education",
    "Logistics",
    "Design",
    "Sales",
    "Data Science",
    "Legal",
    "Media",
    "Consulting",
  ];

  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Temporary",
  ];

  const genderOptions = ["Any", "Male", "Female", "Other"];

  const experienceOptions = [
    "Fresh Graduate",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6+ years",
  ];

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
      handlePrintPacking(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("sn");
    } else {
      navigate("/job-post");
    }
    toastSuccess("Job post edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      sn: "",
      company: "",
      jobTitle: "",
      jobCategory: "",
      jobType: "",
      noOfVacancies: 1,
      closingDate: "",
      gender: "Any",
      minimumExperience: "Fresh Graduate",
      isFeatured: false,
      status: "",
      shortDescription: "",
      longDescription: "",
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["sn"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintPacking = (packingData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Packing Details",
        data: [packingData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          sn: "SN",
          documentName: "Document Name",
          selectFile: "Select File",
          status: "Status",
          date: "Date",
          loginId: "Login ID",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
      console.log("packingData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Packing Details"
          subtitle="Packing Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "packing-details.pdf";
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
          navigate("/job-post/create");
        } else {
          navigate("/job-post/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/job-post/view");
      },
      // Only show if user has permission
      show: canView,
    },
  ]);

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
              toastRestore("Packing record saved as draft successfully");
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
        title={isEdit ? "Editing Job Post" : "Creating Job Post"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="job-post"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
          // Only show buttons if user can edit
          canEdit ? (
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
            {/* Basic Job Post Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.sn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("sn")}
                    id="sn"
                    name="sn"
                    value={formData.sn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("company")}
                    onCancel={() => setFormData({ ...formData, sn: "" })}
                    labelText="SN"
                    tooltipText="Enter serial number (e.g., 001, 002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.company && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("company")(el)}
                    id="company"
                    name="company"
                    options={companyOptions}
                    value={formData.company}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        company: value,
                      }));
                      focusNextInput("jobTitle");
                    }}
                    onEnterPress={() => {
                      if (formData.company) {
                        focusNextInput("jobTitle");
                      }
                    }}
                    placeholder=" "
                    labelText="Company"
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

              {permissionsFields.jobTitle && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("jobTitle")}
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    onNext={() => focusNextInput("jobCategory")}
                    onCancel={() => setFormData({ ...formData, jobTitle: "" })}
                    labelText="Job Title"
                    tooltipText="Enter job title"
                    required
                    maxLength={100}
                  />
                </div>
              )}

              {permissionsFields.jobCategory && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("jobCategory")(el)}
                    id="jobCategory"
                    name="jobCategory"
                    options={jobCategoryOptions}
                    value={formData.jobCategory}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        jobCategory: value,
                      }));
                      focusNextInput("jobType");
                    }}
                    onEnterPress={() => {
                      if (formData.jobCategory) {
                        focusNextInput("jobType");
                      }
                    }}
                    placeholder=" "
                    labelText="Job Category"
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

              {permissionsFields.jobType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("jobType")(el)}
                    id="jobType"
                    name="jobType"
                    options={jobTypeOptions}
                    value={formData.jobType}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        jobType: value,
                      }));
                      focusNextInput("noOfVacancies");
                    }}
                    onEnterPress={() => {
                      if (formData.jobType) {
                        focusNextInput("noOfVacancies");
                      }
                    }}
                    placeholder=" "
                    labelText="Job Type"
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

            {/* Job Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.noOfVacancies && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("noOfVacancies")}
                    id="noOfVacancies"
                    name="noOfVacancies"
                    value={formData.noOfVacancies.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setFormData((prev) => ({
                        ...prev,
                        noOfVacancies: value,
                      }));
                    }}
                    onNext={() => focusNextInput("closingDate")}
                    onCancel={() =>
                      setFormData({ ...formData, noOfVacancies: 1 })
                    }
                    labelText="No. of Vacancies"
                    tooltipText="Enter number of vacancies"
                    required
                    type="number"
                    min={1}
                    max={100}
                  />
                </div>
              )}

              {permissionsFields.closingDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("closingDate")}
                    id="closingDate"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("gender")}
                    onCancel={() =>
                      setFormData({ ...formData, closingDate: "" })
                    }
                    labelText="Closing Date"
                    tooltipText="Enter job closing date (YYYY-MM-DD)"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.gender && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("gender")(el)}
                    id="gender"
                    name="gender"
                    options={genderOptions}
                    value={formData.gender}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        gender: value,
                      }));
                      focusNextInput("minimumExperience");
                    }}
                    onEnterPress={() => {
                      if (formData.gender) {
                        focusNextInput("minimumExperience");
                      }
                    }}
                    placeholder=" "
                    labelText="Gender"
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

              {permissionsFields.minimumExperience && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("minimumExperience")(el)}
                    id="minimumExperience"
                    name="minimumExperience"
                    options={experienceOptions}
                    value={formData.minimumExperience}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        minimumExperience: value,
                      }));
                      focusNextInput("isFeatured");
                    }}
                    onEnterPress={() => {
                      if (formData.minimumExperience) {
                        focusNextInput("isFeatured");
                      }
                    }}
                    placeholder=" "
                    labelText="Minimum Experience"
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

            {/* Additional Job Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.isFeatured && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("isFeatured")(el)}
                    id="isFeatured"
                    name="isFeatured"
                    options={["No", "Yes"]}
                    value={formData.isFeatured ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setFormData((prev) => ({
                        ...prev,
                        isFeatured: isYes,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (formData.isFeatured !== undefined) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText="Featured"
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

              {permissionsFields.status && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("status")(el)}
                    id="status"
                    name="status"
                    options={statusOptions}
                    value={formData.status}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: value,
                      }));
                      focusNextInput("shortDescription");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("shortDescription");
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
              )}

              {permissionsFields.shortDescription && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("shortDescription")}
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    onNext={() => focusNextInput("longDescription")}
                    onCancel={() =>
                      setFormData({ ...formData, shortDescription: "" })
                    }
                    labelText="Short Description"
                    tooltipText="Enter brief job description"
                    required
                    maxLength={200}
                  />
                </div>
              )}

              {permissionsFields.longDescription && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("longDescription")}
                    id="longDescription"
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isActive")}
                    onCancel={() =>
                      setFormData({ ...formData, longDescription: "" })
                    }
                    labelText="Long Description"
                    tooltipText="Enter detailed job description"
                    required
                    maxLength={1000}
                  />
                </div>
              )}
            </div>

            {/* Status and Draft Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.isActive && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isActive")(el)}
                    id="isActive"
                    name="isActive"
                    options={["No", "Yes"]}
                    value={formData.isActive ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setFormData((prev) => ({
                        ...prev,
                        isActive: isYes,
                      }));
                      focusNextInput("isDraft");
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isActive === true ||
                        formData.isActive === false
                      ) {
                        focusNextInput("isDraft");
                      }
                    }}
                    placeholder=" "
                    labelText="Active"
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

              {permissionsFields.isDraft && (
                <div className="space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={["No", "Yes"]}
                    value={formData.isDraft ? "Yes" : "No"}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      const isYes = value === "Yes";
                      setFormData((prev) => ({
                        ...prev,
                        isDraft: isYes,
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
