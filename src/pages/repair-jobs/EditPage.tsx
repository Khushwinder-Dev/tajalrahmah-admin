/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import PageLayout from "@/components/common/PageLayout";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type RepairJobData = {
  repairJobId: string;
  repairJobName: string;
  appointmentDate: string;
  estimatedCompletionDate: string;
  device: string;
  repairLocation: string;
  billingType: string;
  deliveryType: string;
  appointmentType: string;
  collectionType: string;
  mechanic: string;
  customer: string;
  status: string;
  reference: string;
  discount: number;
  issueDescription: string;
  jobDescription: string;
  additionDescription: string;
  termsCondition: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  draftedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: RepairJobData = {
  repairJobId: "RJ001",
  repairJobName: "Printer Maintenance Service",
  appointmentDate: "2024-01-15",
  estimatedCompletionDate: "2024-01-17",
  device: "HP LaserJet Pro M404dn",
  repairLocation: "Customer Site",
  billingType: "Hourly",
  deliveryType: "On-Site",
  appointmentType: "Scheduled",
  collectionType: "Pickup",
  mechanic: "John Smith",
  customer: "ABC Corporation",
  status: "In Progress",
  reference: "REF001",
  discount: 0,
  issueDescription: "Printer jamming frequently and print quality issues",
  jobDescription: "Complete maintenance and cleaning of printer mechanisms",
  additionDescription: "Replace worn rollers and clean print heads",
  termsCondition: "Standard 30-day warranty on repairs",
  isActive: true,
  isDraft: false,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  draftedAt: null,
};

export default function RepairJobsEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<RepairJobData>({
    repairJobId: "",
    repairJobName: "",
    appointmentDate: "",
    estimatedCompletionDate: "",
    device: "",
    repairLocation: "",
    billingType: "",
    deliveryType: "",
    appointmentType: "",
    collectionType: "",
    mechanic: "",
    customer: "",
    status: "",
    reference: "",
    discount: 0,
    issueDescription: "",
    jobDescription: "",
    additionDescription: "",
    termsCondition: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
    draftedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("repairJobs", "create");
  const canView = usePermission("repairJobs", "view");
  const canEdit = usePermission("repairJobs", "edit");

  // Field-level permissions
  const repairJobId: boolean = usePermission(
    "repairJobs",
    "edit",
    "repairJobId"
  );
  const repairJobName: boolean = usePermission(
    "repairJobs",
    "edit",
    "repairJobName"
  );
  const appointmentDate: boolean = usePermission(
    "repairJobs",
    "edit",
    "appointmentDate"
  );
  const estimatedCompletionDate: boolean = usePermission(
    "repairJobs",
    "edit",
    "estimatedCompletionDate"
  );
  const device: boolean = usePermission("repairJobs", "edit", "device");
  const repairLocation: boolean = usePermission(
    "repairJobs",
    "edit",
    "repairLocation"
  );
  const billingType: boolean = usePermission(
    "repairJobs",
    "edit",
    "billingType"
  );
  const deliveryType: boolean = usePermission(
    "repairJobs",
    "edit",
    "deliveryType"
  );
  const appointmentType: boolean = usePermission(
    "repairJobs",
    "edit",
    "appointmentType"
  );
  const collectionType: boolean = usePermission(
    "repairJobs",
    "edit",
    "collectionType"
  );
  const mechanic: boolean = usePermission("repairJobs", "edit", "mechanic");
  const customer: boolean = usePermission("repairJobs", "edit", "customer");
  const status: boolean = usePermission("repairJobs", "edit", "status");
  const reference: boolean = usePermission("repairJobs", "edit", "reference");
  const discount: boolean = usePermission("repairJobs", "edit", "discount");
  const issueDescription: boolean = usePermission(
    "repairJobs",
    "edit",
    "issueDescription"
  );
  const jobDescription: boolean = usePermission(
    "repairJobs",
    "edit",
    "jobDescription"
  );
  const additionDescription: boolean = usePermission(
    "repairJobs",
    "edit",
    "additionDescription"
  );
  const termsCondition: boolean = usePermission(
    "repairJobs",
    "edit",
    "termsCondition"
  );
  const canPdf: boolean = usePermission("repairJobs", "pdf");
  const canPrint: boolean = usePermission("repairJobs", "print");

  // Options for autocomplete fields
  const customerOptions = [
    "ABC Corporation",
    "XYZ Solutions",
    "Tech Innovations Ltd",
    "Creative Agency",
    "Consulting Group",
    "Marketing Solutions",
    "Design Studio",
    "Consulting Firm",
    "Training Center",
    "IT Services Co",
    "Warehouse Solutions",
    "Gaming Cafe",
    "Print Solutions Inc",
    "Remote Work Solutions",
    "Data Storage Corp",
    "Network Solutions Ltd",
    "Power Solutions Inc",
    "Retail Systems Co",
    "Security Solutions Ltd",
    "Shipping Solutions Inc",
  ];

  const deviceOptions = [
    "HP LaserJet Pro M404dn",
    "Dell OptiPlex Desktop",
    "Cisco Router",
    "Samsung Monitor",
    "Lenovo ThinkPad",
    "Canon Multifunction Printer",
    "Apple iMac",
    "Microsoft Surface Pro",
    "Epson Projector",
    "Netgear Switch",
    "Brother Label Printer",
    "ASUS Gaming Monitor",
    "Xerox Workstation",
    "Logitech Webcam",
    "Synology NAS",
    "Ubiquiti Access Point",
    "APC UPS System",
    "Barcode Scanner",
    "Security Camera",
    "Thermal Printer",
  ];

  const mechanicOptions = [
    "John Smith",
    "Sarah Johnson",
    "Mike Chen",
    "Lisa Wong",
    "David Kim",
    "Alex Rodriguez",
  ];

  const billingTypeOptions = ["Hourly", "Fixed"];
  const deliveryTypeOptions = ["On-Site", "Pickup", "Delivery"];
  const appointmentTypeOptions = ["Scheduled", "Walk-in"];
  const collectionTypeOptions = ["Pickup", "Delivery", "N/A"];
  const repairLocationOptions = ["Customer Site", "Workshop"];
  const statusOptions = ["In Progress", "Completed", "Pending", "Cancelled"];

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
      handlePrintRepairJob(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("repairJobId");
    } else {
      navigate("/repair-jobs");
    }
    toastSuccess("Repair job edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      repairJobId: "",
      repairJobName: "",
      appointmentDate: "",
      estimatedCompletionDate: "",
      device: "",
      repairLocation: "",
      billingType: "",
      deliveryType: "",
      appointmentType: "",
      collectionType: "",
      mechanic: "",
      customer: "",
      status: "",
      reference: "",
      discount: 0,
      issueDescription: "",
      jobDescription: "",
      additionDescription: "",
      termsCondition: "",
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      draftedAt: null,
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["repairJobId"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintRepairJob = (repairJobData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Repair Job Details",
        data: [repairJobData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          repairJobId: "Repair Job ID",
          repairJobName: "Repair Job Name",
          appointmentDate: "Appointment Date",
          estimatedCompletionDate: "Estimated Completion Date",
          device: "Device",
          repairLocation: "Repair Location",
          billingType: "Billing Type",
          deliveryType: "Delivery Type",
          appointmentType: "Appointment Type",
          collectionType: "Collection Type",
          mechanic: "Mechanic",
          customer: "Customer",
          status: "Status",
          reference: "Reference",
          discount: "Discount",
          issueDescription: "Issue Description",
          jobDescription: "Job Description",
          additionDescription: "Additional Description",
          termsCondition: "Terms & Conditions",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
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
      console.log("repairJobData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Repair Job Details"
          subtitle="Repair Job Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "repair-job-details.pdf";
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
          navigate("/repair-jobs/create");
        } else {
          navigate("/repair-jobs/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/repair-jobs/view");
      },
      show: canView,
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
              toastRestore("Repair job saved as draft successfully");
            },
            show: canEdit,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canEdit]);

  return (
    <>
      <PageLayout
        title={isEdit ? "Editing Repair Job" : "Creating Repair Job"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="repair-jobs"
        activePage="edit"
        popoverOptions={popoverOptions}
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        additionalFooterButtons={
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
            className="space-y-6"
          >
            {/* All fields in multiple rows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Repair Job ID field */}
              {repairJobId && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("repairJobId")}
                    id="repairJobId"
                    name="repairJobId"
                    value={formData.repairJobId}
                    onChange={handleChange}
                    onNext={() => focusNextInput("repairJobName")}
                    onCancel={() =>
                      setFormData({ ...formData, repairJobId: "" })
                    }
                    labelText="Repair Job ID"
                    tooltipText="Enter repair job ID"
                    required
                  />
                </div>
              )}

              {/* Repair Job Name field */}
              {repairJobName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("repairJobName")}
                    id="repairJobName"
                    name="repairJobName"
                    value={formData.repairJobName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("device")}
                    onCancel={() =>
                      setFormData({ ...formData, repairJobName: "" })
                    }
                    labelText="Repair Job Name"
                    tooltipText="Enter repair job name"
                    required
                  />
                </div>
              )}

              {/* Device field */}
              {device && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("device")(el)}
                      id="device"
                      name="device"
                      allowCustomInput={true}
                      options={deviceOptions}
                      value={formData.device}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, device: value });
                        if (value) {
                          focusNextInput("customer");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.device) {
                          focusNextInput("customer");
                        }
                      }}
                      placeholder=" "
                      labelText="Device"
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

              {/* Customer field */}
              {customer && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("customer")(el)}
                      id="customer"
                      name="customer"
                      allowCustomInput={true}
                      options={customerOptions}
                      value={formData.customer}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, customer: value });
                        if (value) {
                          focusNextInput("mechanic");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.customer) {
                          focusNextInput("mechanic");
                        }
                      }}
                      placeholder=" "
                      labelText="Customer"
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
              {/* Mechanic field */}
              {mechanic && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("mechanic")(el)}
                      id="mechanic"
                      name="mechanic"
                      allowCustomInput={true}
                      options={mechanicOptions}
                      value={formData.mechanic}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, mechanic: value });
                        if (value) {
                          focusNextInput("appointmentDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.mechanic) {
                          focusNextInput("appointmentDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Mechanic"
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

              {/* Appointment Date field */}
              {appointmentDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("appointmentDate")}
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("estimatedCompletionDate")}
                    onCancel={() =>
                      setFormData({ ...formData, appointmentDate: "" })
                    }
                    labelText="Appointment Date"
                    tooltipText="Select appointment date"
                    required
                  />
                </div>
              )}

              {/* Estimated Completion Date field */}
              {estimatedCompletionDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("estimatedCompletionDate")}
                    id="estimatedCompletionDate"
                    name="estimatedCompletionDate"
                    type="date"
                    value={formData.estimatedCompletionDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("repairLocation")}
                    onCancel={() =>
                      setFormData({ ...formData, estimatedCompletionDate: "" })
                    }
                    labelText="Est. Completion Date"
                    tooltipText="Select estimated completion date"
                    required
                  />
                </div>
              )}

              {/* Repair Location field */}
              {repairLocation && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("repairLocation")(el)}
                      id="repairLocation"
                      name="repairLocation"
                      allowCustomInput={true}
                      options={repairLocationOptions}
                      value={formData.repairLocation}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, repairLocation: value });
                        if (value) {
                          focusNextInput("billingType");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.repairLocation) {
                          focusNextInput("billingType");
                        }
                      }}
                      placeholder=" "
                      labelText="Repair Location"
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

            {/* Third row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Billing Type field */}
              {billingType && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("billingType")(el)}
                      id="billingType"
                      name="billingType"
                      allowCustomInput={false}
                      options={billingTypeOptions}
                      value={formData.billingType}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, billingType: value });
                        if (value) {
                          focusNextInput("deliveryType");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.billingType) {
                          focusNextInput("deliveryType");
                        }
                      }}
                      placeholder=" "
                      labelText="Billing Type"
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

              {/* Delivery Type field */}
              {deliveryType && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("deliveryType")(el)}
                      id="deliveryType"
                      name="deliveryType"
                      allowCustomInput={false}
                      options={deliveryTypeOptions}
                      value={formData.deliveryType}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, deliveryType: value });
                        if (value) {
                          focusNextInput("appointmentType");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.deliveryType) {
                          focusNextInput("appointmentType");
                        }
                      }}
                      placeholder=" "
                      labelText="Delivery Type"
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

              {/* Appointment Type field */}
              {appointmentType && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("appointmentType")(el)}
                      id="appointmentType"
                      name="appointmentType"
                      allowCustomInput={false}
                      options={appointmentTypeOptions}
                      value={formData.appointmentType}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, appointmentType: value });
                        if (value) {
                          focusNextInput("collectionType");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.appointmentType) {
                          focusNextInput("collectionType");
                        }
                      }}
                      placeholder=" "
                      labelText="Appointment Type"
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

              {/* Collection Type field */}
              {collectionType && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("collectionType")(el)}
                      id="collectionType"
                      name="collectionType"
                      allowCustomInput={false}
                      options={collectionTypeOptions}
                      value={formData.collectionType}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, collectionType: value });
                        if (value) {
                          focusNextInput("status");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.collectionType) {
                          focusNextInput("status");
                        }
                      }}
                      placeholder=" "
                      labelText="Collection Type"
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

            {/* Fourth row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Status field */}
              {status && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("status")(el)}
                      id="status"
                      name="status"
                      allowCustomInput={false}
                      options={statusOptions}
                      value={formData.status}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, status: value });
                        if (value) {
                          focusNextInput("reference");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.status) {
                          focusNextInput("reference");
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

              {/* Reference field */}
              {reference && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("reference")}
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    onNext={() => focusNextInput("discount")}
                    onCancel={() => setFormData({ ...formData, reference: "" })}
                    labelText="Reference"
                    tooltipText="Enter reference number"
                    required
                  />
                </div>
              )}

              {/* Discount field */}
              {discount && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("discount")}
                    id="discount"
                    name="discount"
                    type="number"
                    value={formData.discount.toString()}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setFormData({ ...formData, discount: value });
                    }}
                    onNext={() => focusNextInput("issueDescription")}
                    onCancel={() => setFormData({ ...formData, discount: 0 })}
                    labelText="Discount"
                    tooltipText="Enter discount amount"
                  />
                </div>
              )}

              {/* Issue Description field */}
              {issueDescription && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("issueDescription")}
                    id="issueDescription"
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    onNext={() => focusNextInput("jobDescription")}
                    onCancel={() =>
                      setFormData({ ...formData, issueDescription: "" })
                    }
                    labelText="Issue Description"
                    tooltipText="Describe the issue"
                    required
                  />
                </div>
              )}
            </div>

            {/* Fifth row - Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Job Description field */}
              {jobDescription && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("jobDescription")}
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    onNext={() => focusNextInput("additionDescription")}
                    onCancel={() =>
                      setFormData({ ...formData, jobDescription: "" })
                    }
                    labelText="Job Description"
                    tooltipText="Describe the repair job"
                    required
                  />
                </div>
              )}

              {/* Additional Description field */}
              {additionDescription && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("additionDescription")}
                    id="additionDescription"
                    name="additionDescription"
                    value={formData.additionDescription}
                    onChange={handleChange}
                    onNext={() => focusNextInput("termsCondition")}
                    onCancel={() =>
                      setFormData({ ...formData, additionDescription: "" })
                    }
                    labelText="Additional Description"
                    tooltipText="Additional repair details"
                  />
                </div>
              )}

              {/* Terms & Conditions field */}
              {termsCondition && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("termsCondition")}
                    id="termsCondition"
                    name="termsCondition"
                    value={formData.termsCondition}
                    onChange={handleChange}
                    onNext={() => focusNextInput("submitButton")}
                    onCancel={() =>
                      setFormData({ ...formData, termsCondition: "" })
                    }
                    labelText="Terms & Conditions"
                    tooltipText="Enter terms and conditions"
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
    </>
  );
}
