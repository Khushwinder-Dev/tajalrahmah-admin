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
import { Check, Edit, Eye, Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { Autocomplete } from "@/components/common/Autocomplete";
import { usePermission } from "@/hooks/usePermissions";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type DeviceData = {
  deviceCode: string;
  name: string;
  serialNo: string;
  customer: string;
  model: string;
  productionDate: string;
  purchaseDate: string;
  warrantyStartingDate: string;
  warrantyPeriodMonths: number;
  warrantyExpiryDate: string;
  warrantyExpiringAlert: boolean;
  description: string;
  image: File | null;
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

const initialData: DeviceData = {
  deviceCode: "DEV001",
  name: "HP LaserJet Pro",
  serialNo: "HP123456789",
  customer: "ABC Corporation",
  model: "M404dn",
  productionDate: "2023-01-15",
  purchaseDate: "2023-02-01",
  warrantyStartingDate: "2023-02-01",
  warrantyPeriodMonths: 24,
  warrantyExpiryDate: "2025-02-01",
  warrantyExpiringAlert: true,
  description: "High-performance laser printer for office use",
  image: null,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function DevicesEditPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // File upload handlers
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
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    if (file) {
      setFormData({ ...formData, image: file });

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }

      if (file) {
        focusNextInput("description");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // File upload states
  const [isDragging, setIsDragging] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<DeviceData>({
    deviceCode: "",
    name: "",
    serialNo: "",
    customer: "",
    model: "",
    productionDate: "",
    purchaseDate: "",
    warrantyStartingDate: "",
    warrantyPeriodMonths: 0,
    warrantyExpiryDate: "",
    warrantyExpiringAlert: false,
    description: "",
    image: null,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Permission checks
  const canCreate = usePermission("devices", "create");
  const canView = usePermission("devices", "view");
  const canEdit = usePermission("devices", "edit");

  // Field-level permissions
  const deviceCode: boolean = usePermission("devices", "edit", "deviceCode");
  const name: boolean = usePermission("devices", "edit", "name");
  const serialNo: boolean = usePermission("devices", "edit", "serialNo");
  const customer: boolean = usePermission("devices", "edit", "customer");
  const model: boolean = usePermission("devices", "edit", "model");
  const productionDate: boolean = usePermission(
    "devices",
    "edit",
    "productionDate"
  );
  const purchaseDate: boolean = usePermission(
    "devices",
    "edit",
    "purchaseDate"
  );
  const warrantyStartingDate: boolean = usePermission(
    "devices",
    "edit",
    "warrantyStartingDate"
  );
  const warrantyPeriodMonths: boolean = usePermission(
    "devices",
    "edit",
    "warrantyPeriodMonths"
  );
  const warrantyExpiryDate: boolean = usePermission(
    "devices",
    "edit",
    "warrantyExpiryDate"
  );
  const warrantyExpiringAlert: boolean = usePermission(
    "devices",
    "edit",
    "warrantyExpiringAlert"
  );
  const description: boolean = usePermission("devices", "edit", "description");
  const image: boolean = usePermission("devices", "edit", "image");
  const canPdf: boolean = usePermission("devices", "pdf");
  const canPrint: boolean = usePermission("devices", "print");

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

  const modelOptions = [
    "M404dn",
    "7090 MT",
    "ISR 4331",
    "27CF391",
    "X1 Carbon",
    "imageRUNNER 2630i",
    "24-inch M1",
    "Surface Pro 9",
    "PowerLite 2247U",
    "GS724T",
    "QL-820NWB",
    "ROG Swift PG279Q",
    "VersaLink C405",
    "Brio Ultra HD",
    "DS920+",
    "UniFi AP AC Pro",
    "Smart-UPS 1500VA",
    "Honeywell 1900g",
    "DS-2CD2143G0-I",
    "Zebra ZD420",
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
      handlePrintDevice(formData);
    }
    if (keepCreating) {
      handleReset();
      focusNextInput("deviceCode");
    } else {
      navigate("/devices");
    }
    toastSuccess("Device Edited successfully");
  };

  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormData({
      deviceCode: "",
      name: "",
      serialNo: "",
      customer: "",
      model: "",
      productionDate: "",
      purchaseDate: "",
      warrantyStartingDate: "",
      warrantyPeriodMonths: 0,
      warrantyExpiryDate: "",
      warrantyExpiringAlert: false,
      description: "",
      image: null,
      isActive: true,
      isDraft: false,
      isDeleted: false,
      createdAt: new Date(),
      draftedAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    });

    // Reset file preview
    setFilePreview(null);

    if (formRef.current) {
      formRef.current.reset();
    }

    // Force re-render of all inputs by changing key
    setFormKey((prev) => prev + 1);

    // Focus the first input field after reset
    setTimeout(() => {
      inputRefs.current["deviceCode"]?.focus();
    }, 100);
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handlePrintDevice = (deviceData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Device Details",
        data: [deviceData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          deviceCode: "Device Code",
          name: "Device Name",
          serialNo: "Serial Number",
          customer: "Customer",
          model: "Model",
          productionDate: "Production Date",
          purchaseDate: "Purchase Date",
          warrantyStartingDate: "Warranty Start Date",
          warrantyPeriodMonths: "Warranty Period (Months)",
          warrantyExpiryDate: "Warranty Expiry Date",
          warrantyExpiringAlert: "Warranty Alert",
          description: "Description",
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
      console.log("deviceData on pdf click", formData);
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Device Details"
          subtitle="Device Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "device-details.pdf";
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
          navigate("/devices/create");
        } else {
          navigate("/devices/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/devices/view");
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
              toastRestore("Device saved as draft successfully");
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
        title={isEdit ? "Editing Device" : "Creating Device"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="devices"
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
              {/* Device Code field */}
              {deviceCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("deviceCode")}
                    id="deviceCode"
                    name="deviceCode"
                    value={formData.deviceCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("name")}
                    onCancel={() =>
                      setFormData({ ...formData, deviceCode: "" })
                    }
                    labelText="Device Code"
                    tooltipText="Enter device code"
                    required
                  />
                </div>
              )}

              {/* Device Name field */}
              {name && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("serialNo")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Device Name"
                    tooltipText="Enter device name"
                    required
                  />
                </div>
              )}

              {/* Serial No field */}
              {serialNo && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("serialNo")}
                    id="serialNo"
                    name="serialNo"
                    value={formData.serialNo}
                    onChange={handleChange}
                    onNext={() => focusNextInput("customer")}
                    onCancel={() => setFormData({ ...formData, serialNo: "" })}
                    labelText="Serial Number"
                    tooltipText="Enter serial number"
                    required
                  />
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
                          focusNextInput("model");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.customer) {
                          focusNextInput("model");
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
              {/* Model field */}
              {model && (
                <div className="space-y-2">
                  <div className="relative">
                    <Autocomplete
                      ref={(el: any) => setRef("model")(el)}
                      id="model"
                      name="model"
                      allowCustomInput={true}
                      options={modelOptions}
                      value={formData.model}
                      onValueChange={(value: string) => {
                        setFormData({ ...formData, model: value });
                        if (value) {
                          focusNextInput("productionDate");
                        }
                      }}
                      onEnterPress={() => {
                        if (formData.model) {
                          focusNextInput("productionDate");
                        }
                      }}
                      placeholder=" "
                      labelText="Model"
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

              {/* Production Date field */}
              {productionDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("productionDate")}
                    id="productionDate"
                    name="productionDate"
                    type="date"
                    value={formData.productionDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("purchaseDate")}
                    onCancel={() =>
                      setFormData({ ...formData, productionDate: "" })
                    }
                    labelText="Production Date"
                    tooltipText="Select production date"
                    required
                  />
                </div>
              )}

              {/* Purchase Date field */}
              {purchaseDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("purchaseDate")}
                    id="purchaseDate"
                    name="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("warrantyStartingDate")}
                    onCancel={() =>
                      setFormData({ ...formData, purchaseDate: "" })
                    }
                    labelText="Purchase Date"
                    tooltipText="Select purchase date"
                    required
                  />
                </div>
              )}

              {/* Warranty Starting Date field */}
              {warrantyStartingDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("warrantyStartingDate")}
                    id="warrantyStartingDate"
                    name="warrantyStartingDate"
                    type="date"
                    value={formData.warrantyStartingDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("warrantyPeriodMonths")}
                    onCancel={() =>
                      setFormData({ ...formData, warrantyStartingDate: "" })
                    }
                    labelText="Warranty Start Date"
                    tooltipText="Select warranty start date"
                    required
                  />
                </div>
              )}
            </div>

            {/* Third row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Warranty Period Months field */}
              {warrantyPeriodMonths && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("warrantyPeriodMonths")}
                    id="warrantyPeriodMonths"
                    name="warrantyPeriodMonths"
                    type="number"
                    value={formData.warrantyPeriodMonths.toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setFormData({ ...formData, warrantyPeriodMonths: value });
                    }}
                    onNext={() => focusNextInput("warrantyExpiryDate")}
                    onCancel={() =>
                      setFormData({ ...formData, warrantyPeriodMonths: 0 })
                    }
                    labelText="Warranty Period (Months)"
                    tooltipText="Enter warranty period in months"
                    required
                  />
                </div>
              )}

              {/* Warranty Expiry Date field */}
              {warrantyExpiryDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("warrantyExpiryDate")}
                    id="warrantyExpiryDate"
                    name="warrantyExpiryDate"
                    type="date"
                    value={formData.warrantyExpiryDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() =>
                      setFormData({ ...formData, warrantyExpiryDate: "" })
                    }
                    labelText="Warranty Expiry Date"
                    tooltipText="Select warranty expiry date"
                    required
                  />
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
                    onNext={() => focusNextInput("image")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Enter device description"
                    required
                  />
                </div>
              )}

              {/* Warranty Expiring Alert field */}
              {warrantyExpiringAlert && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("warrantyExpiringAlert")}
                    id="warrantyExpiringAlert"
                    name="warrantyExpiringAlert"
                    type="checkbox"
                    checked={formData.warrantyExpiringAlert}
                    onChange={handleChange}
                    onNext={() => focusNextInput("image")}
                    onCancel={() =>
                      setFormData({ ...formData, warrantyExpiringAlert: false })
                    }
                    labelText="Warranty Expiring Alert"
                    tooltipText="Enable warranty expiring alert notifications"
                    value=""
                  />
                </div>
              )}
            </div>

            {/* Fourth row - Image Upload */}
            <div className="grid my-8 relative -mt-8">
              {/* Device Image field */}
              {image && (
                <div className="space-y-2 my-8 cursor-pointer relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Device Image
                  </label>
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
                        if (filePreview) {
                          setFilePreview(null);
                          setFormData({
                            ...formData,
                            image: null,
                          });
                          setTimeout(() => {
                            triggerFileInput();
                          }, 0);
                        } else {
                          triggerFileInput();
                        }
                      }
                    }}
                  >
                    {filePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={filePreview}
                          alt="Device Preview"
                          className="w-40 h-28 object-contain rounded-md"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilePreview(null);
                            setFormData({
                              ...formData,
                              image: null,
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : formData.image ? (
                      <div className="flex flex-col items-center justify-center gap-2 py-14">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <p className="text-base text-gray-500">
                          {formData.image.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-14">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <p className="text-base text-gray-500">
                          Drag and drop device image here, or click to browse
                        </p>
                        <p className="text-sm text-gray-400">
                          Supports JPG, JPEG, PNG, GIF
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file) {
                          handleFileChange(file);
                        }
                      }}
                      accept=".jpg,.jpeg,.png,.gif"
                      className="hidden"
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
    </>
  );
}
