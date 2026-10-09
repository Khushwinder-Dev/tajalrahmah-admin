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

type ProjectTypeDataType = {
  vehicle: string;
  vin: string;
  licensePlate: string;
  vehicleType: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  registration: string;
  vehicleGroup: string;
  ownership: string;
  color: string;
  bodyType: string;
  subBodyType: string;
  msrp: string;

  isDefault: boolean;
  isDraft: boolean;

  createdAt: Date | null;
  draftedAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

type Props = {
  isEdit?: boolean;
};

const initialData: ProjectTypeDataType = {
  vehicle: "Toyota Corolla",
  vin: "1HGCM82633A123456",
  licensePlate: "DHA-1234",
  vehicleType: "Sedan",
  year: "2022",
  make: "Toyota",
  model: "Corolla",
  trim: "XLE",
  registration: "REG123456",
  vehicleGroup: "Passenger",
  ownership: "Owned",
  color: "White",
  bodyType: "Compact",
  subBodyType: "SUV",
  msrp: "25000",

  isDefault: false,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
};

export default function VehiclesCreatePage({ isEdit = false }: Props) {
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
  const canCreate = usePermission("vehicles", "create");
  const canView = usePermission("vehicles", "view");
  const canEdit = usePermission("vehicles", "edit");
  const canDelete = usePermission("vehicles", "delete");

  console.log("canCreate", canCreate);
  console.log("canView", canView);
  console.log("canEdit", canEdit);
  console.log("canDelete", canDelete);

  // Field-level permissions

  const vehicle: boolean = usePermission("vehicles", "create", "vehicle");
  const vin: boolean = usePermission("vehicles", "create", "vin");
  const licensePlate: boolean = usePermission(
    "vehicles",
    "create",
    "licensePlate"
  );
  const vehicleType: boolean = usePermission(
    "vehicles",
    "create",
    "vehicleType"
  );
  const year: boolean = usePermission("vehicles", "create", "year");
  const make: boolean = usePermission("vehicles", "create", "make");
  const model: boolean = usePermission("vehicles", "create", "model");
  const trim: boolean = usePermission("vehicles", "create", "trim");
  const registration: boolean = usePermission(
    "vehicles",
    "create",
    "registration"
  );
  const vehicleGroup: boolean = usePermission(
    "vehicles",
    "create",
    "vehicleGroup"
  );
  const ownership: boolean = usePermission("vehicles", "create", "ownership");
  const color: boolean = usePermission("vehicles", "create", "color");
  const bodyType: boolean = usePermission("vehicles", "create", "bodyType");
  const subBodyType: boolean = usePermission(
    "vehicles",
    "create",
    "subBodyType"
  );
  const msrp: boolean = usePermission("vehicles", "create", "msrp");

  const isDefault: boolean = usePermission("vehicles", "create", "isDefault");

  const isDraft: boolean = usePermission("vehicles", "create", "isDraft");
  const canPdf: boolean = usePermission("vehicles", "pdf");
  const canPrint: boolean = usePermission("vehicles", "print");

  console.log("vehicle", vehicle);
  console.log("isDefault", isDefault);
  console.log("isDraft", isDraft);
  console.log("canPdf", canPdf);
  console.log("canPrint", canPrint);

  // Form state
  const [formData, setFormData] = useState<ProjectTypeDataType>({
    vehicle: "",
    vin: "",
    licensePlate: "",
    vehicleType: "",
    year: "",
    make: "",
    model: "",
    trim: "",
    registration: "",
    vehicleGroup: "",
    ownership: "",
    color: "",
    bodyType: "",
    msrp: "",
    subBodyType: "",

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
          navigate("/vehicles/create");
        } else {
          navigate("/vehicles/edit/undefined");
        }
      },
      // Only show if user has permission
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />, // Added neutral color for Eye
      onClick: () => {
        navigate("/vehicles/view");
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
      toastSuccess("Vehicle created successfully!");
      handleReset();
    } else {
      toastSuccess("Vehicle created successfully!");
      navigate("/vehicles");
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
      vehicle: "",
      vin: "",
      licensePlate: "",
      vehicleType: "",
      year: "",
      make: "",
      model: "",
      trim: "",
      registration: "",
      vehicleGroup: "",
      ownership: "",
      color: "",
      bodyType: "",
      msrp: "",
      subBodyType: "",

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
      inputRefs.current["vehicle"]?.focus();
    }, 100); // Slightly longer delay to ensure re-render is complete
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handlePrintLeaves = (leavesData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Vehicle Details",
        data: [leavesData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          vehicle: "Vehicle",
          vin: "VIN",
          licensePlate: "License Plate",
          vehicleType: "Vehicle Type",
          year: "Year",
          make: "Make",
          model: "Model",
          trim: "Trim",
          registration: "Registration",
          vehicleGroup: "Vehicle Group",
          ownership: "Ownership",
          color: "Color",
          bodyType: "Body Type",
          msrp: "MSRP",
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
          title="Vehicle Details"
          subtitle="Vehicle Information"
        />
      ).toBlob();

      console.log("blob", blob);

      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vehicle-details.pdf";
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
              toastRestore("Vehicle saved as draft successfully");
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
        title={isEdit ? "Editing Vehicle" : "Creating Vehicle"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="vehicles"
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
              {/* Leave Types field - only show if user can create */}
              {vehicle && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vehicle")}
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vin")}
                    onCancel={() => setFormData({ ...formData, vehicle: "" })}
                    labelText="Vehicle"
                    tooltipText="Enter vehicle"
                    required
                  />
                </div>
              )}

              {vin && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("vin")}
                    type="text"
                    id="vin"
                    name="vin"
                    value={formData.vin}
                    onChange={handleChange}
                    onNext={() => focusNextInput("licensePlate")}
                    onCancel={() => setFormData({ ...formData, vin: "" })}
                    labelText="VIN"
                    tooltipText="Enter VIN"
                    required
                  />
                </div>
              )}
              {licensePlate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("licensePlate")}
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vehicleType")}
                    onCancel={() =>
                      setFormData({ ...formData, licensePlate: "" })
                    }
                    labelText="License Plate"
                    tooltipText="Enter license plate"
                    required
                  />
                </div>
              )}

              {vehicleType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("vehicleType")(el)}
                    id="vehicleType"
                    name="vehicleType"
                    options={["Sedan", "SUV", "Truck"]}
                    value={formData.vehicleType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        vehicleType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("year");
                    }}
                    onEnterPress={() => {
                      if (formData.vehicleType) {
                        focusNextInput("year");
                      }
                    }}
                    placeholder=" "
                    labelText="Vehicle Type"
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

              {year && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("year")}
                    type="date"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    onNext={() => focusNextInput("make")}
                    onCancel={() => setFormData({ ...formData, year: "" })}
                    labelText="Year"
                    tooltipText="Enter year"
                    required
                  />
                </div>
              )}

              {make && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("make")}
                    type="text"
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    onNext={() => focusNextInput("model")}
                    onCancel={() => setFormData({ ...formData, make: "" })}
                    labelText="Make"
                    tooltipText="Enter make"
                    required
                  />
                </div>
              )}

              {model && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("model")}
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    onNext={() => focusNextInput("trim")}
                    onCancel={() => setFormData({ ...formData, model: "" })}
                    labelText="Model"
                    tooltipText="Enter model"
                    required
                  />
                </div>
              )}

              {trim && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("trim")}
                    type="text"
                    id="trim"
                    name="trim"
                    value={formData.trim}
                    onChange={handleChange}
                    onNext={() => focusNextInput("registration")}
                    onCancel={() => setFormData({ ...formData, trim: "" })}
                    labelText="Trim"
                    tooltipText="Enter trim"
                    required
                  />
                </div>
              )}
              {/* Registration */}
              {registration && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("registration")}
                    type="text"
                    id="registration"
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                    onNext={() => focusNextInput("vehicleGroup")}
                    onCancel={() =>
                      setFormData({ ...formData, registration: "" })
                    }
                    labelText="Registration"
                    tooltipText="Enter registration"
                    required
                  />
                </div>
              )}

              {/* Vehicle Group */}
              {vehicleGroup && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("vehicleGroup")(el)}
                    id="vehicleGroup"
                    name="vehicleGroup"
                    options={[
                      "Passenger",
                      "Truck",
                      "SUV",
                      "Van",
                      "Bus",
                      "Motorcycle",
                      "Bike",
                    ]}
                    value={formData.vehicleGroup}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        vehicleGroup: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("ownership");
                    }}
                    onEnterPress={() => {
                      if (formData.vehicleGroup) {
                        focusNextInput("ownership");
                      }
                    }}
                    placeholder=" "
                    labelText="Vehicle Group"
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

              {ownership && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("ownership")(el)}
                    id="ownership"
                    name="ownership"
                    options={["Owned", "Leased", "Rented", "Shared", "Other"]}
                    value={formData.ownership}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        ownership: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("color");
                    }}
                    onEnterPress={() => {
                      if (formData.ownership) {
                        focusNextInput("color");
                      }
                    }}
                    placeholder=" "
                    labelText="Ownership"
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

              {/* color */}
              {color && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("color")}
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    onNext={() => focusNextInput("bodyType")}
                    onCancel={() => setFormData({ ...formData, color: "" })}
                    labelText="Color"
                    tooltipText="Enter color"
                    required
                  />
                </div>
              )}

              {/* bodyType */}
              {bodyType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("bodyType")(el)}
                    id="bodyType"
                    name="bodyType"
                    options={["Sedan", "SUV", "Coupe", "Convertible"]}
                    value={formData.bodyType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        bodyType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("subBodyType");
                    }}
                    onEnterPress={() => {
                      if (formData.bodyType) {
                        focusNextInput("subBodyType");
                      }
                    }}
                    placeholder=" "
                    labelText="Body Type"
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

              {subBodyType && (
                <div className="space-y-2">
                  <Autocomplete
                    ref={(el: any) => setRef("subBodyType")(el)}
                    id="subBodyType"
                    name="subBodyType"
                    options={["Sedan", "SUV", "Coupe", "Convertible"]}
                    value={formData.subBodyType}
                    labelClassName="rounded-lg"
                    isSelectableOnly={true}
                    onValueChange={(value: string) => {
                      setFormData((prev) => ({
                        ...prev,
                        subBodyType: value,
                      }));
                      // Call focusNextInput if needed
                      focusNextInput("msrp");
                    }}
                    onEnterPress={() => {
                      if (formData.subBodyType) {
                        focusNextInput("msrp");
                      }
                    }}
                    placeholder=" "
                    labelText="Sub Body Type"
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

              {/* msrp */}
              {msrp && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("msrp")}
                    type="text"
                    id="msrp"
                    name="msrp"
                    value={formData.msrp}
                    onChange={handleChange}
                    onNext={() => focusNextInput("trim")}
                    onCancel={() => setFormData({ ...formData, msrp: "" })}
                    labelText="MSRP"
                    tooltipText="Enter MSRP"
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
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
              {isDraft && (
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
