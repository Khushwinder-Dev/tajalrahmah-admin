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

type MaintenanceData = {
  vehicle: string;
  garage: string;
  maintenanceType: string;
  serviceName: string;
  startDate: string;
  completionDate: string;
  parts: string;
  cost: number;
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

const initialData: MaintenanceData = {
  vehicle: "Toyota Camry 2023",
  garage: "Al-Rashid Auto Service",
  maintenanceType: "Preventive",
  serviceName: "Oil Change & Filter",
  startDate: "2024-02-15",
  completionDate: "2024-02-15",
  parts: "Oil Filter, Engine Oil",
  cost: 150.0,
  description: "Regular oil change and filter replacement",
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function MaintenanceEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Form state
  const [formData, setFormData] = useState<MaintenanceData>({
    vehicle: "",
    garage: "",
    maintenanceType: "",
    serviceName: "",
    startDate: "",
    completionDate: "",
    parts: "",
    cost: 0,
    description: "",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Field-level permissions
  const vehicle: boolean = usePermission("maintenance", "edit", "vehicle");
  const garage: boolean = usePermission("maintenance", "edit", "garage");
  const maintenanceType: boolean = usePermission(
    "maintenance",
    "edit",
    "maintenanceType"
  );
  const serviceName: boolean = usePermission(
    "maintenance",
    "edit",
    "serviceName"
  );
  const startDate: boolean = usePermission("maintenance", "edit", "startDate");
  const completionDate: boolean = usePermission(
    "maintenance",
    "edit",
    "completionDate"
  );
  const parts: boolean = usePermission("maintenance", "edit", "parts");
  const cost: boolean = usePermission("maintenance", "edit", "cost");
  const description: boolean = usePermission(
    "maintenance",
    "edit",
    "description"
  );

  const canPdf: boolean = usePermission("maintenance", "pdf");
  const canPrint: boolean = usePermission("maintenance", "print");

  // Options for autocomplete fields
  const maintenanceTypeOptions = ["Preventive", "Repair", "Inspection"];

  const vehicleOptions = [
    "Toyota Camry 2023",
    "Ford Transit Van",
    "Honda Civic 2022",
    "Mercedes Sprinter",
    "Nissan Patrol",
    "Toyota Hilux",
    "Ford Ranger",
    "Chevrolet Silverado",
    "Volkswagen Golf",
    "Hyundai Tucson",
    "BMW X5",
    "Audi A6",
    "Toyota Corolla 2024",
    "Ford F-150",
    "Honda CR-V",
    "Mercedes C-Class",
    "Nissan Altima",
    "Ford Escape",
    "Chevrolet Malibu",
    "Volkswagen Passat",
  ];

  const garageOptions = [
    "Al-Rashid Auto Service",
    "Quick Fix Garage",
    "Premium Auto Care",
    "Luxury Auto Service",
    "Desert Auto Works",
    "Off-Road Specialists",
    "City Auto Service",
    "American Auto Care",
    "European Auto Service",
    "Korean Auto Care",
    "Premium German Auto",
    "Luxury European Auto",
    "Truck Specialists",
  ];

  const serviceNameOptions = [
    "Oil Change & Filter",
    "Brake System Repair",
    "Annual Safety Inspection",
    "Tire Rotation & Balance",
    "AC System Repair",
    "Suspension Check",
    "Electrical System Fix",
    "Transmission Service",
    "Emission Test",
    "Wheel Alignment",
    "Spark Plug Replacement",
    "Fuel Pump Replacement",
    "Brake Fluid Check",
    "Engine Tune-up",
    "Pre-purchase Inspection",
    "Coolant System Service",
    "CV Joint Replacement",
    "Power Steering Service",
    "Safety Equipment Check",
    "Timing Belt Replacement",
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
  }, [isEdit, initialData]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
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
      handlePrintMaintenance(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("vehicle");
    } else {
      navigate("/maintenances");
    }
    toastSuccess("Maintenance record edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      vehicle: "",
      garage: "",
      maintenanceType: "",
      serviceName: "",
      startDate: "",
      completionDate: "",
      parts: "",
      cost: 0,
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
      inputRefs.current["vehicle"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintMaintenance = (maintenanceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Maintenance Details",
        data: [maintenanceData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vehicle: "Vehicle",
          garage: "Garage",
          maintenanceType: "Maintenance Type",
          serviceName: "Service Name",
          startDate: "Start Date",
          completionDate: "Completion Date",
          parts: "Parts",
          cost: "Cost",
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
      console.log("maintenanceData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Maintenance Details"
          subtitle="Maintenance Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "maintenance-details.pdf";
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
          navigate("/maintenances/create");
        } else {
          navigate("/maintenances/edit/undefined");
        }
      },
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/maintenances/view");
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
              toastRestore("Maintenance record saved as draft successfully");
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
        title={isEdit ? "Editing Maintenance" : "Creating Maintenance"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="maintenances"
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
            {/* First row - Vehicle, Garage, Maintenance Type, Service Name */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Vehicle field */}
              {vehicle && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("vehicle")(el)}
                      id="vehicle"
                      name="vehicle"
                      allowCustomInput={true}
                      options={vehicleOptions}
                      value={formData.vehicle}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, vehicle: value });
                        if (value) {
                          focusNextInput("garage");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.vehicle) {
                          focusNextInput("garage");
                        }
                      }}
                      placeholder=" "
                      labelText="Vehicle"
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

              {/* Garage field */}
              {garage && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("garage")(el)}
                      id="garage"
                      name="garage"
                      allowCustomInput={true}
                      options={garageOptions}
                      value={formData.garage}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, garage: value });

                        if (value) {
                          focusNextInput("maintenanceType");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.garage) {
                          focusNextInput("maintenanceType");
                        }
                      }}
                      placeholder=" "
                      labelText="Garage"
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

              {/* Maintenance Type field */}
              {maintenanceType && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("maintenanceType")(el)}
                      id="maintenanceType"
                      name="maintenanceType"
                      allowCustomInput={true}
                      options={maintenanceTypeOptions}
                      value={formData.maintenanceType}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, maintenanceType: value });
                        if (value) {
                          focusNextInput("serviceName");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.maintenanceType) {
                          focusNextInput("serviceName");
                        }
                      }}
                      placeholder=" "
                      labelText="Maintenance Type"
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

              {/* Service Name field */}
              {serviceName && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("serviceName")(el)}
                      id="serviceName"
                      name="serviceName"
                      allowCustomInput={true}
                      options={serviceNameOptions}
                      value={formData.serviceName}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, serviceName: value });
                        if (value) {
                          focusNextInput("startDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.serviceName) {
                          focusNextInput("startDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Service Name"
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

            {/* Second row - Start Date, Completion Date, Parts, Cost */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Start Date field */}
              {startDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("startDate")}
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("completionDate")}
                    onCancel={() => setFormData({ ...formData, startDate: "" })}
                    labelText="Start Date"
                    tooltipText="Select start date"
                    required
                  />
                </div>
              )}

              {/* Completion Date field */}
              {completionDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("completionDate")}
                    id="completionDate"
                    name="completionDate"
                    type="date"
                    value={formData.completionDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("parts")}
                    onCancel={() =>
                      setFormData({ ...formData, completionDate: "" })
                    }
                    labelText="Completion Date"
                    tooltipText="Select completion date"
                    required
                  />
                </div>
              )}

              {/* Parts field */}
              {parts && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("parts")}
                    id="parts"
                    name="parts"
                    value={formData.parts}
                    onChange={handleChange}
                    onNext={() => focusNextInput("cost")}
                    onCancel={() => setFormData({ ...formData, parts: "" })}
                    labelText="Parts"
                    tooltipText="Enter parts used"
                    required
                  />
                </div>
              )}

              {/* Cost field */}
              {cost && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("cost")}
                    id="cost"
                    name="cost"
                    type="number"
                    value={formData.cost.toString()}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, cost: 0 })}
                    labelText="Cost"
                    tooltipText="Enter cost"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third row - Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
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
