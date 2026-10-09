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

type PackingData = {
  sn: string;
  documentName: string;
  selectFile: string;
  status: string;
  date: string;
  loginId: string;
  isActive: boolean;
  isDraft: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  isDeleted: boolean;
};

type Props = {
  isEdit?: boolean;
};

const initialData: PackingData = {
  sn: "001",
  documentName: "Packing List - Electronics",
  selectFile: "electronics_packing.pdf",
  status: "Active",
  date: "2024-01-15",
  loginId: "user001",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

export default function PackingEditPage({ isEdit = true }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<PackingData>({
    sn: "",
    documentName: "",
    selectFile: "",
    status: "",
    date: "",
    loginId: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("packing", "create");
  const canView = usePermission("packing", "view");
  const canEdit = usePermission("packing", "edit");
  const canDelete = usePermission("packing", "delete");

  // Field-level permissions
  const permissionsFields = usePermission<keyof PackingData>(
    "packing",
    "edit",
    [
      "sn",
      "documentName",
      "selectFile",
      "status",
      "date",
      "loginId",
      "isActive",
      "isDraft",
    ]
  );

  const canPdf: boolean = usePermission("packing", "pdf");
  const canPrint: boolean = usePermission("packing", "print");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const statusOptions = [
    "Pending",
    "Approved",
    "In Transit",
    "Delivered",
    "Cancelled",
    "On Hold",
    "Under Review",
    "Completed",
  ];

  const documentNameOptions = [
    "Packing List - Electronics",
    "Packing List - Clothing",
    "Packing List - Furniture",
    "Packing List - Books",
    "Packing List - Toys",
    "Packing List - Kitchen",
    "Packing List - Garden",
    "Packing List - Sports",
    "Packing List - Tools",
    "Packing List - Art",
    "Packing List - Music",
    "Packing List - Jewelry",
  ];

  const fileTypeOptions = [
    "electronics_packing.pdf",
    "clothing_packing.pdf",
    "furniture_packing.pdf",
    "books_packing.pdf",
    "toys_packing.pdf",
    "kitchen_packing.pdf",
    "garden_packing.pdf",
    "sports_packing.pdf",
    "tools_packing.pdf",
    "art_packing.pdf",
    "music_packing.pdf",
    "jewelry_packing.pdf",
  ];

  const loginIdOptions = [
    "user001",
    "user002",
    "user003",
    "user004",
    "user005",
    "user006",
    "user007",
    "user008",
    "user009",
    "user010",
    "user011",
    "user012",
    "user013",
    "user014",
    "user015",
    "user016",
    "user017",
    "user018",
    "user019",
    "user020",
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
      navigate("/packing");
    }
    toastSuccess("Packing record edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      sn: "",
      documentName: "",
      selectFile: "",
      status: "",
      date: "",
      loginId: "",
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
          navigate("/packing/create");
        } else {
          navigate("/packing/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/packing/view");
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
        title={isEdit ? "Editing Packing" : "Creating Packing"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="packing"
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
            {/* Basic Packing Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.sn && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("sn")}
                    id="sn"
                    name="sn"
                    value={formData.sn}
                    onChange={handleChange}
                    onNext={() => focusNextInput("documentName")}
                    onCancel={() => setFormData({ ...formData, sn: "" })}
                    labelText="SN"
                    tooltipText="Enter serial number (e.g., 001, 002)"
                    required
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.documentName && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("documentName")(el)}
                    id="documentName"
                    name="documentName"
                    options={documentNameOptions}
                    value={formData.documentName}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        documentName: value,
                      }));
                      focusNextInput("selectFile");
                    }}
                    onEnterPress={() => {
                      if (formData.documentName) {
                        focusNextInput("selectFile");
                      }
                    }}
                    placeholder=" "
                    labelText="Document Name"
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

              {permissionsFields.selectFile && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("selectFile")(el)}
                    id="selectFile"
                    name="selectFile"
                    options={fileTypeOptions}
                    value={formData.selectFile}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        selectFile: value,
                      }));
                      focusNextInput("status");
                    }}
                    onEnterPress={() => {
                      if (formData.selectFile) {
                        focusNextInput("status");
                      }
                    }}
                    placeholder=" "
                    labelText="Select File"
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
                      focusNextInput("date");
                    }}
                    onEnterPress={() => {
                      if (formData.status) {
                        focusNextInput("date");
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
            </div>

            {/* Date and Login Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {permissionsFields.date && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("date")}
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onNext={() => focusNextInput("loginId")}
                    onCancel={() => setFormData({ ...formData, date: "" })}
                    labelText="Date"
                    tooltipText="Enter packing date (YYYY-MM-DD)"
                    required
                    type="date"
                    maxLength={10}
                  />
                </div>
              )}

              {permissionsFields.loginId && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("loginId")(el)}
                    id="loginId"
                    name="loginId"
                    options={loginIdOptions}
                    value={formData.loginId}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        loginId: value,
                      }));
                      focusNextInput("isActive");
                    }}
                    onEnterPress={() => {
                      if (formData.loginId) {
                        focusNextInput("isActive");
                      }
                    }}
                    placeholder=" "
                    labelText="Login ID"
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
