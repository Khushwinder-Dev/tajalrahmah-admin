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
import { Check, Edit, Eye, Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface TaxRatesData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  ssn: string;
  presentAddress: string;
  permanentAddress: string;
  country: string;
  zipCode: string;
  obtainedDegree: string;
  university: string;
  cgpa: string;
  comments: string;
  experienceLevel: string;
  skill: string;
  companyName: string;
  workingPeriod: string;
  duties: string;
  supervisor: string;
  picture: string | null;
  isDefault: boolean;
  isActive: boolean;
  isDraft: boolean;
  rating: number;
  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
}

type Props = {
  isEdit?: boolean;
};

const initialData: TaxRatesData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  alternatePhone: "",
  ssn: "",
  presentAddress: "",
  permanentAddress: "",
  country: "",
  zipCode: "",
  obtainedDegree: "",
  university: "",
  cgpa: "",
  comments: "",
  experienceLevel: "",
  skill: "",
  companyName: "",
  workingPeriod: "",
  duties: "",
  supervisor: "",
  picture: "",
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

const experienceLevels = ["lavel 1", "level 2", "level 3", "level 4"];
const countriesNames = [
  "Dubai",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "India",
  "Pakistan",
];

export default function CandidateListCreatePage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");
  const [isDraftState, setIsDraftState] = useState<"Yes" | "No">("No");
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks - similar to CountryDetails.tsx
  // const { canCreate, canView, canEdit, canDelete } = useCountriesPermissions();
  const canCreate: boolean = usePermission("candidateList", "create");
  const canView: boolean = usePermission("candidateList", "view");
  const canEdit: boolean = usePermission("candidateList", "edit");
  const canDelete: boolean = usePermission("candidateList", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const name: boolean = usePermission("candidateList", "create", "name");

  const isDefault: boolean = usePermission(
    "candidateList",
    "create",
    "isDefault"
  );
  const isDraft: boolean = usePermission("candidateList", "create", "isDraft");
  const canPdf: boolean = usePermission("candidateList", "pdf");
  const canPrint: boolean = usePermission("candidateList", "print");

  console.log("name", name);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<TaxRatesData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    ssn: "",
    presentAddress: "",
    permanentAddress: "",
    country: "",
    zipCode: "",
    obtainedDegree: "",
    university: "",
    cgpa: "",
    comments: "",
    experienceLevel: "",
    skill: "",
    companyName: "",
    workingPeriod: "",
    duties: "",
    supervisor: "",
    picture: "",
    isDefault: isDefaultState === "Yes",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    rating: 3,
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
          navigate("/candidate-list/create");
        } else {
          navigate("/candidate-list/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/candidate-list/view");
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
        picture: null,
      });

      if (initialData.picture) {
        setImagePreview(initialData.picture);
      }

      setIsDraftState(initialData.isDraft ? "Yes" : "No");
    }
  }, [isEdit, initialData]);

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  };

  // Handle image file selection
  const handleImageFile = (file: File) => {
    if (file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData({ ...formData, picture: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload via file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
      setTimeout(() => {
        focusNextInput("submitButton");
      }, 0);
    }
  };

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
      handlePrintIncrements(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Candidate List created successfully!");
      handleReset();
    } else {
      toastSuccess("Candidate List created successfully!");
      navigate("/candidate-list");
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      alternatePhone: "",
      ssn: "",
      presentAddress: "",
      permanentAddress: "",
      country: "",
      zipCode: "",
      obtainedDegree: "",
      university: "",
      cgpa: "",
      comments: "",
      experienceLevel: "",
      skill: "",
      companyName: "",
      workingPeriod: "",
      duties: "",
      supervisor: "",
      picture: null,
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
    setIsDefaultState("No");
    setImagePreview(null);
    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["name"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePrintIncrements = (TaxRatesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Candidate List Details",
        data: [TaxRatesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          title: "Title",
          fromDate: "From Date",
          toDate: "To Date",
          status: "Status",
          isDefault: "Default Country",
          isActive: "Active Status",
          isDraft: "Draft Status",
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
    // if (checked && formData) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handlePrintIncrements(formData), 100);
    // }
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
    // if (pdfChecked) {
    //   // Small delay to allow switch animation to complete
    //   setTimeout(() => handleExportPDF(), 100);
    // }
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("TaxRatesData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Candidate List Details"
          subtitle="Candidate List Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "TaxRates-details.pdf";
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
              toastRestore("Candidate List saved as draft successfully");
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
        title={isEdit ? labels.editingCandidateList : labels.creatingCandidateList}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="candidate-list"
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
                {labels.reset}
              </Button>
              <Button
                ref={(el) => setRef("submitButton")(el as HTMLButtonElement)}
                id="submitButton"
                name="submitButton"
                variant="outline"
                className={`gap-2 text-primary rounded-full border-primary w-32 bg-sky-200 hover:bg-primary font-semibold!`}
                onClick={() => formRef.current?.requestSubmit()}
              >
                {labels.submit}
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
            {/* First Row: Code, Calling Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <EditableInput
                    setRef={setRef("firstName")}
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("lastName")}
                    onCancel={() => setFormData({ ...formData, firstName: "" })}
                    labelText={labels.firstNameTooltip}
                    tooltipText={labels.firstNameTooltip}
                    required
                  />
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("lastName")}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onNext={() => focusNextInput("email")}
                      onCancel={() =>
                        setFormData({ ...formData, lastName: "" })
                      }
                      labelText={labels.lastNameTooltip}
                      tooltipText={labels.lastNameTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("email")}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onNext={() => focusNextInput("phone")}
                      onCancel={() => setFormData({ ...formData, email: "" })}
                      labelText={labels.emailTooltip}
                      tooltipText={labels.emailTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("phone")}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onNext={() => focusNextInput("alternatePhone")}
                      onCancel={() => setFormData({ ...formData, phone: "" })}
                      labelText={labels.phoneTooltip}
                      tooltipText={labels.phoneTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("alternatePhone")}
                      id="alternatePhone"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      onNext={() => focusNextInput("ssn")}
                      onCancel={() =>
                        setFormData({ ...formData, alternatePhone: "" })
                      }
                      labelText={labels.alternatePhoneTooltip}
                      tooltipText={labels.alternatePhoneTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("ssn")}
                      id="ssn"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      onNext={() => focusNextInput("presentAddress")}
                      onCancel={() => setFormData({ ...formData, ssn: "" })}
                      labelText={labels.ssnTooltip}
                      tooltipText={labels.ssnTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("presentAddress")}
                      id="presentAddress"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      onNext={() => focusNextInput("permanentAddress")}
                      onCancel={() =>
                        setFormData({ ...formData, presentAddress: "" })
                      }
                      labelText={labels.presentAddressTooltip}
                      tooltipText={labels.presentAddressTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("permanentAddress")}
                      id="permanentAddress"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      onNext={() => focusNextInput("country")}
                      onCancel={() =>
                        setFormData({ ...formData, permanentAddress: "" })
                      }
                      labelText={labels.permanentAddressTooltip}
                      tooltipText={labels.permanentAddressTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("country")(el)}
                    id="country"
                    name="country"
                    allowCustomInput={true}
                    options={countriesNames}
                    value={formData.country}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, country: value });
                      if (value) {
                        focusNextInput("zipCode");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.country) {
                        focusNextInput("zipCode");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.countryNameTooltip}
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
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("zipCode")}
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      onNext={() => focusNextInput("flag")}
                      onCancel={() => setFormData({ ...formData, zipCode: "" })}
                      labelText={labels.zipCodeTooltip}
                      tooltipText={labels.zipCodeTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="space-y-2 my-8 pt-4 cursor-pointer relative md:col-span-12">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 bg-[#f8fafc] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    tabIndex={0}
                    ref={(el) => setRef("fileUploadElement")(el as HTMLElement)}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (imagePreview) {
                          setImagePreview(null);
                          setFormData({ ...formData, picture: null });
                          setTimeout(() => {
                            triggerFileInput();
                          }, 0);
                        } else {
                          triggerFileInput();
                        }
                      }
                    }}
                  >
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt={labels.flagPreview}
                          className="w-40 h-28 object-contain rounded-md"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImagePreview(null);
                            setFormData({ ...formData, picture: null });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-14">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <p className="text-base text-gray-500">
                          {labels.dragDropImage}
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              <div className="md:col-span-12 space-y-2 my-8 pt-4">
                <h1 className="text-2xl font-bold text-primary">Education</h1>
              </div>

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("obtainedDegree")}
                      id="obtainedDegree"
                      name="obtainedDegree"
                      value={formData.obtainedDegree}
                      onChange={handleChange}
                      onNext={() => focusNextInput("university")}
                      onCancel={() =>
                        setFormData({ ...formData, obtainedDegree: "" })
                      }
                      labelText={labels.obtainedDegreeTooltip}
                      tooltipText={labels.obtainedDegreeTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("university")}
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      onNext={() => focusNextInput("cgpa")}
                      onCancel={() =>
                        setFormData({ ...formData, university: "" })
                      }
                      labelText={labels.universityTooltip}
                      tooltipText={labels.universityTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("cgpa")}
                      id="cgpa"
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleChange}
                      onNext={() => focusNextInput("comments")}
                      onCancel={() => setFormData({ ...formData, cgpa: "" })}
                      labelText={labels.cgpaTooltip}
                      tooltipText={labels.cgpaTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("comments")}
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      onNext={() => focusNextInput("experienceLevel")}
                      onCancel={() =>
                        setFormData({ ...formData, comments: "" })
                      }
                      labelText={labels.commentTooltip}
                      tooltipText={labels.commentTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="md:col-span-12 space-y-2 my-8 pt-4">
                <h1 className="text-2xl font-bold text-primary">
                  Work Experience
                </h1>
              </div>

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("experienceLevel")(el)}
                    id="experienceLevel"
                    name="experienceLevel"
                    allowCustomInput={true}
                    options={experienceLevels}
                    value={formData.experienceLevel}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, experienceLevel: value });
                      if (value) {
                        focusNextInput("skill");
                      }
                    }}
                    onEnterPress={() => {
                      if (formData.experienceLevel) {
                        focusNextInput("skill");
                      }
                    }}
                    placeholder=" "
                    labelText={labels.experienceLevelTooltip}
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

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("skill")}
                      id="skill"
                      name="skill"
                      value={formData.skill}
                      onChange={handleChange}
                      onNext={() => focusNextInput("companyName")}
                      onCancel={() => setFormData({ ...formData, skill: "" })}
                      labelText={labels.skillTooltip}
                      tooltipText={labels.skillTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("companyName")}
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      onNext={() => focusNextInput("workingPeriod")}
                      onCancel={() =>
                        setFormData({ ...formData, companyName: "" })
                      }
                      labelText={labels.companyNameTooltip}
                      tooltipText={labels.companyNameTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("workingPeriod")}
                      id="workingPeriod"
                      name="workingPeriod"
                      value={formData.workingPeriod}
                      onChange={handleChange}
                      onNext={() => focusNextInput("duties")}
                      onCancel={() =>
                        setFormData({ ...formData, workingPeriod: "" })
                      }
                      labelText={labels.workingPeriodTooltip}
                      tooltipText={labels.workingPeriodTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("duties")}
                      id="duties"
                      name="duties"
                      value={formData.duties}
                      onChange={handleChange}
                      onNext={() => focusNextInput("supervisor")}
                      onCancel={() => setFormData({ ...formData, duties: "" })}
                      labelText={labels.dutiesTooltip}
                      tooltipText={labels.dutiesTooltip}
                      required
                    />
                  </div>
                </div>
              )}
              {canCreate && (
                <div className="md:col-span-3 space-y-2">
                  <div className="relative">
                    <EditableInput
                      setRef={setRef("supervisor")}
                      id="supervisor"
                      name="supervisor"
                      value={formData.supervisor}
                      onChange={handleChange}
                      onNext={() => focusNextInput("isDefault")}
                      onCancel={() =>
                        setFormData({ ...formData, supervisor: "" })
                      }
                      labelText={labels.supervisorTooltip}
                      tooltipText={labels.supervisorTooltip}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    options={[labels.no, labels.yes]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === labels.yes;
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
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
                    labelText={labels.default}
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
                <div className="md:col-span-3 space-y-2 relative">
                  <Autocomplete
                    ref={(el: any) => setRef("isDraft")(el)}
                    id="isDraft"
                    name="isDraft"
                    options={[labels.no, labels.yes]}
                    value={isDraftState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      const isYes = value === labels.yes;
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
                    labelText={labels.draft}
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
