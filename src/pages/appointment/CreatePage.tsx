/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { Autocomplete } from "@/components/common/Autocomplete";
import EditableInput from "@/components/common/EditableInput";
import MobileEditableInput from "@/components/common/MobileEditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastSuccess } from "@/lib/toast";
import { Modal } from "@mantine/core";
import { pdf } from "@react-pdf/renderer";
import { Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type AppointmentData = {
  name: string;
  mobile: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentBy: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: AppointmentData = {
  name: "John Smith",
  mobile: "+1 555-0123",
  email: "john.smith@email.com",
  appointmentDate: "2024-01-15",
  appointmentTime: "09:00 AM",
  appointmentBy: "Dr. Sarah Johnson",
  isActive: true,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export default function AppointmentFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Permission checks
  const canCreate = usePermission("appointments", "create");
  const canView = usePermission("appointments", "view");
  const canEdit = usePermission("appointments", "edit");
  const canDelete = usePermission("appointments", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions
  const name: boolean = usePermission("appointments", "create", "name");
  const mobile: boolean = usePermission("appointments", "create", "mobile");
  const email: boolean = usePermission("appointments", "create", "email");
  const appointmentDate: boolean = usePermission(
    "appointments",
    "create",
    "appointmentDate"
  );
  const appointmentTime: boolean = usePermission(
    "appointments",
    "create",
    "appointmentTime"
  );
  const appointmentBy: boolean = usePermission(
    "appointments",
    "create",
    "appointmentBy"
  );
  const canPdf: boolean = usePermission("appointments", "pdf");
  const canPrint: boolean = usePermission("appointments", "print");

  console.log("name", name);
  console.log("mobile", mobile);
  console.log("email", email);
  console.log("appointmentDate", appointmentDate);
  console.log("appointmentTime", appointmentTime);
  console.log("appointmentBy", appointmentBy);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Options for autocomplete fields
  const nameOptions = [
    "John Smith",
    "Emily Davis",
    "Robert Wilson",
    "Maria Garcia",
    "James Brown",
    "Jennifer Lee",
    "Christopher Taylor",
    "Amanda Martinez",
    "Daniel Anderson",
    "Jessica White",
  ];

  const appointmentByOptions = [
    "Dr. Sarah Johnson",
    "Dr. Michael Chen",
    "Dr. Lisa Rodriguez",
    "Dr. David Thompson",
    "Dr. Emily Wilson",
    "Dr. Robert Davis",
  ];

  // Form state
  const [formData, setFormData] = useState<AppointmentData>({
    name: "",
    mobile: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentBy: "",
    isActive: true,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  const [popoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" /> // Green for Plus
      ) : (
        <Edit className="w-5 h-5 text-blue-500" /> // Blue for Edit
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/appointments/create");
        } else {
          navigate("/appointments/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/appointments/view");
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
  }, [isEdit]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle phone number change
  const handlePhoneChange = (value: string | undefined) => {
    setFormData({
      ...formData,
      mobile: value || "",
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
      handlePrintAppointments(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Appointment created successfully!");
      handleReset();
    } else {
      toastSuccess("Appointment created successfully!");
      navigate("/appointments");
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
      name: "",
      mobile: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentBy: "",
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
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
      inputRefs.current["name"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintAppointments = (appointmentData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Appointment Details",
        data: [appointmentData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          name: "Name",
          mobile: "Mobile",
          email: "Email",
          appointmentDate: "Appointment Date",
          appointmentTime: "Appointment Time",
          appointmentBy: "Appointment By",
          isActive: "Active Status",
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
      console.log("appointmentData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Appointment Details"
          subtitle="Appointment Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "appointment-details.pdf";
      a.click();
      console.log("a", a);
      console.log("url", url);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Appointment" : "Creating Appointment"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="appointments"
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Name field - only show if user can create */}
              {name && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("name")(el)}
                      id="name"
                      name="name"
                      allowCustomInput={true}
                      options={nameOptions}
                      value={formData.name}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, name: value });
                        if (value) {
                          focusNextInput("mobile");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.name) {
                          focusNextInput("mobile");
                        }
                      }}
                      placeholder=" "
                      labelText="Name"
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

              {/* Mobile field - only show if user can create */}
              {mobile && (
                <div className="space-y-2">
                  <MobileEditableInput
                    setRef={setRef("mobile")}
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onPhoneChange={handlePhoneChange}
                    onNext={() => focusNextInput("email")}
                    onCancel={() => setFormData({ ...formData, mobile: "" })}
                    labelText="Mobile"
                    tooltipText="Enter your mobile number"
                    isPhone={true}
                    required
                  />
                </div>
              )}

              {/* Email field - only show if user can create */}
              {email && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("email")}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onNext={() => focusNextInput("appointmentDate")}
                    onCancel={() => setFormData({ ...formData, email: "" })}
                    labelText="Email"
                    tooltipText="Enter email address"
                    required
                  />
                </div>
              )}

              {/* Appointment Date field - only show if user can create */}
              {appointmentDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("appointmentDate")}
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("appointmentTime")}
                    onCancel={() =>
                      setFormData({ ...formData, appointmentDate: "" })
                    }
                    labelText="Appointment Date"
                    tooltipText="Select appointment date"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second row for remaining fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Appointment Time field - only show if user can create */}
              {appointmentTime && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("appointmentTime")}
                    id="appointmentTime"
                    name="appointmentTime"
                    type="time"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    onNext={() => focusNextInput("appointmentBy")}
                    onCancel={() =>
                      setFormData({ ...formData, appointmentTime: "" })
                    }
                    labelText="Appointment Time"
                    tooltipText="Select appointment time"
                    required
                  />
                </div>
              )}

              {/* Appointment By field - only show if user can create */}
              {appointmentBy && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("appointmentBy")(el)}
                      id="appointmentBy"
                      name="appointmentBy"
                      allowCustomInput={true}
                      options={appointmentByOptions}
                      value={formData.appointmentBy}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, appointmentBy: value });
                        if (value) {
                          focusNextInput("submitButton");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.appointmentBy) {
                          focusNextInput("submitButton");
                        }
                      }}
                      placeholder=" "
                      labelText="Appointment By"
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
