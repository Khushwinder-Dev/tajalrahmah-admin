/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Edit, Eye, Plus, Upload, X, Search, Pencil } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "./MinimizablePageLayout";
import { MaterialButton } from "@/components/ui/material-button";
import { useIconFormData } from "@/hooks/useIconFormData";
import { EditIconModal } from "./EditIconModal";

type IconData = {
  id: string;
  name: string;
  description: string;
  svgContent: string | null;
  fileName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type IconModuleData = {
  formData: IconData;
  hasChanges: boolean;
  scrollPosition: number;
};

type Props = {
  isEdit?: boolean;
};

const initialData: IconData = {
  id: "",
  name: "",
  description: "",
  svgContent: null,
  fileName: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function IconUploadPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  // Custom hook
  const {
    moduleData,
    hasMinimizedData,
    resetModuleData,
    getModuleScrollPosition,
  } = useIconFormData();

  const [keepCreating, setKeepCreating] = useState(false);
  const [svgPreview, setSvgPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isRestoredFromMinimized, setIsRestoredFromMinimized] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  // Icons list and search
  const [uploadedIcons, setUploadedIcons] = useState<IconData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIcons, setFilteredIcons] = useState<IconData[]>([]);

  // Edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIcon, setEditingIcon] = useState<IconData | null>(null);
  const [editFormData, setEditFormData] = useState<IconData>(initialData);
  const [, setEditSvgPreview] = useState<string | null>(null);
  const [, setEditIsDragging] = useState(false);

  // Permission checks
  const canCreate: boolean = usePermission("icons", "create") || true;
  const canView: boolean = usePermission("icons", "view") || true;
  const canPdf: boolean = usePermission("icons", "pdf") || true;
  const canPrint: boolean = usePermission("icons", "print") || true;

  // Field-level permissions
  const iconId: boolean = usePermission("icons", "create", "iconId") || true;
  const iconName: boolean =
    usePermission("icons", "create", "iconName") || true;
  const iconDescription: boolean =
    usePermission("icons", "create", "iconDescription") || true;
  const iconUpload: boolean =
    usePermission("icons", "create", "iconUpload") || true;

  // Form state
  const [formData, setFormData] = useState<IconData>(initialData);

  // Load uploaded icons from localStorage
  useEffect(() => {
    const loadUploadedIcons = () => {
      const savedIcons = localStorage.getItem("uploadedIcons");
      if (savedIcons) {
        const icons = JSON.parse(savedIcons);
        setUploadedIcons(icons);
        setFilteredIcons(icons);
      }
    };
    loadUploadedIcons();
  }, []);

  // Filter icons based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredIcons(uploadedIcons);
    } else {
      const filtered = uploadedIcons.filter(
        (icon) =>
          icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          icon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          icon.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIcons(filtered);
    }
  }, [searchTerm, uploadedIcons]);

  // Restore logic using custom hook
  useEffect(() => {
    const shouldAutoRestore =
      hasMinimizedData &&
      moduleData?.formData &&
      !isRestoredFromMinimized &&
      !formData.name &&
      !formData.id &&
      !formData.description;

    if (shouldAutoRestore) {
      const savedFormData = moduleData.formData;
      setFormData(savedFormData);

      if (savedFormData.svgContent) {
        setSvgPreview(savedFormData.svgContent);
      }

      setIsRestoredFromMinimized(true);

      const scrollPosition = getModuleScrollPosition("icon-form-module");
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      }
    }
  }, [
    hasMinimizedData,
    moduleData,
    isRestoredFromMinimized,
    formData.name,
    formData.id,
    formData.description,
    getModuleScrollPosition,
  ]);

  const [popoverOptions] = useState([
    {
      label: isEdit ? "Create" : "Edit",
      icon: isEdit ? (
        <Plus className="w-5 h-5 text-green-500" />
      ) : (
        <Edit className="w-5 h-5 text-blue-500" />
      ),
      onClick: () => {
        if (isEdit) {
          navigate("/icons/create");
        } else {
          navigate("/icons/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/icons/view");
      },
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

  // Validation: Check if user already has an icon uploaded
  const validateSingleIcon = () => {
    if (formData.svgContent && svgPreview) {
      toastError(
        "You can only upload one icon at a time. Please remove the current icon first."
      );
      return false;
    }
    return true;
  };

  // Handle drag events for main form
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
      if (validateSingleIcon()) {
        handleSvgFile(files[0]);
      }
    }
  };

  // Handle drag events for edit modal
  // const handleEditDragEnter = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setEditIsDragging(true);
  // };

  // const handleEditDragLeave = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setEditIsDragging(false);
  // };

  // const handleEditDragOver = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // const handleEditDrop = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setEditIsDragging(false);

  //   const files = e.dataTransfer.files;
  //   if (files && files.length > 0) {
  //     handleEditSvgFile(files[0]);
  //   }
  // };

  // Handle SVG file selection for main form
  const handleSvgFile = (file: File) => {
    if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svgContent = e.target?.result as string;
        setSvgPreview(svgContent);
        setFormData({
          ...formData,
          svgContent: svgContent,
          fileName: file.name,
        });
      };
      reader.readAsText(file);
    } else {
      toastError("Please upload only SVG files");
    }
  };

  // Handle SVG file selection for edit modal
  // const handleEditSvgFile = (file: File) => {
  //   if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const svgContent = e.target?.result as string;
  //       setEditSvgPreview(svgContent);
  //       setEditFormData({
  //         ...editFormData,
  //         svgContent: svgContent,
  //         fileName: file.name,
  //       });
  //     };
  //     reader.readAsText(file);
  //   } else {
  //     toastError("Please upload only SVG files");
  //   }
  // };

  // Handle file upload for main form
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateSingleIcon()) {
        handleSvgFile(file);
        setTimeout(() => {
          focusNextInput("submitButton");
        }, 0);
      }
    }
  };

  // Handle file upload for edit modal
  // const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     handleEditSvgFile(file);
  //   }
  // };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  // Handle edit form field changes
  // const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEditFormData({
  //     ...editFormData,
  //     [name]: value,
  //   });
  // };

  // Open edit modal
  const openEditModal = (icon: IconData) => {
    setEditingIcon(icon);
    setEditFormData({ ...icon });
    setEditSvgPreview(icon.svgContent);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingIcon(null);
    setEditFormData(initialData);
    setEditSvgPreview(null);
    setEditIsDragging(false);
  };

  // Save edited icon
  const saveEditedIcon = () => {
    if (
      !editFormData.name ||
      !editFormData.description ||
      !editFormData.svgContent
    ) {
      toastError(
        "Please fill all required fields and ensure an icon is uploaded"
      );
      return;
    }

    const existingIcons = JSON.parse(
      localStorage.getItem("uploadedIcons") || "[]"
    );
    const iconIndex = existingIcons.findIndex(
      (icon: IconData) => icon.id === editingIcon?.id
    );

    if (iconIndex >= 0) {
      existingIcons[iconIndex] = {
        ...editFormData,
        updatedAt: new Date(),
      };

      localStorage.setItem("uploadedIcons", JSON.stringify(existingIcons));
      setUploadedIcons(existingIcons);
      setFilteredIcons(existingIcons);
      saveIconToFolder(existingIcons[iconIndex]);

      toastSuccess("Icon updated successfully!");
      closeEditModal();
    } else {
      toastError("Icon not found");
    }
  };

  // Trigger file input click for main form
  const triggerFileInput = () => {
    if (validateSingleIcon()) {
      fileInputRef.current?.click();
    }
  };

  // Save icon to downloads folder
  const saveIconToFolder = async (iconData: IconData) => {
    try {
      if (!iconData.svgContent) {
        throw new Error("No SVG content to save");
      }

      // Create filename
      const sanitizedName = iconData.name
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      const fileName = `${sanitizedName}_${iconData.id}.svg`;

      // Create blob and download
      const blob = new Blob([iconData.svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Save metadata to localStorage for the app to remember
      const existingIcons = JSON.parse(
        localStorage.getItem("uploadedIcons") || "[]"
      );
      const newIcon = {
        ...iconData,
        fileName: fileName,
        filePath: `desktop/${fileName}`, // User's desktop folder
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const existingIndex = existingIcons.findIndex(
        (icon: IconData) => icon.id === newIcon.id
      );

      if (existingIndex >= 0) {
        existingIcons[existingIndex] = newIcon;
      } else {
        existingIcons.push(newIcon);
      }

      localStorage.setItem("uploadedIcons", JSON.stringify(existingIcons));
      setUploadedIcons(existingIcons);

      return true;
    } catch (error) {
      console.error("Error saving icon:", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.svgContent) {
      toastError("Please fill all required fields and upload an SVG file");
      return;
    }

    const success = await saveIconToFolder(formData);

    if (success) {
      if (pdfChecked) {
        await handleExportPDF();
      }
      if (printEnabled) {
        handlePrintIcon(formData);
      }

      if (keepCreating) {
        toastSuccess("Icon uploaded successfully!");
        handleReset();
      } else {
        toastSuccess("Icon uploaded successfully!");
        navigate("/icons");
      }
    } else {
      toastError("Failed to upload icon");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Handle reset
  const handleReset = async () => {
    setFormData(initialData);
    setSvgPreview(null);
    setIsRestoredFromMinimized(false);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormKey((prev) => prev + 1);

    if (hasMinimizedData) {
      try {
        await resetModuleData("icon-form-module");
        console.log("Form data reset in Redux");
      } catch (error) {
        console.error("Error resetting form data:", error);
      }
    }

    setTimeout(() => {
      inputRefs.current["id"]?.focus();
    }, 100);
  };

  const handlePrintIcon = (iconData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Icon Details",
        data: [iconData],
        excludeFields: ["svgContent"],
        fieldLabels: {
          id: "Icon ID",
          name: "Icon Name",
          description: "Icon Description",
          fileName: "File Name",
          createdAt: "Created At",
          updatedAt: "Updated At",
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
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Icon Details"
          subtitle="Icon Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "icon-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  // Create minimize handler
  const handleMinimize = useCallback((): IconModuleData => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="icon-form-module"
        moduleName={isEdit ? "Edit Icon" : "Upload Icon"}
        moduleRoute={
          isEdit ? `/icons/edit/${formData.id || "new"}` : "/icons/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? "Edit Icon" : "Upload Icon"}
        listPath="icons"
        popoverOptions={popoverOptions}
        videoSrc={video}
        videoHeader="Tutorial video"
        keepChanges={keepCreating}
        onKeepChangesChange={setKeepCreating}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        activePage="create"
        module="icons"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 items-center">
              <MaterialButton
                variant="default"
                className="gap-2 text-primary hover:bg-primary rounded-full border-primary w-32 font-semibold!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </MaterialButton>
              <MaterialButton
                variant="default"
                className="gap-2 text-primary hover:bg-primary rounded-full border-primary w-32 font-semibold!"
                onClick={() => formRef.current?.requestSubmit()}
              >
                Submit
              </MaterialButton>
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
            {/* First Row: Icon ID, Name, Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-8 relative">
              {/* Icon ID field */}
              {iconId && (
                <div className="md:col-span-2 space-y-2">
                  <EditableInput
                    setRef={setRef("id")}
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    onNext={() => focusNextInput("name")}
                    onCancel={() => setFormData({ ...formData, id: "" })}
                    labelText="ID"
                    tooltipText="Unique identifier for the icon"
                    required
                  />
                </div>
              )}

              {/* Icon Name field */}
              {iconName && (
                <div className="md:col-span-4 space-y-2">
                  <EditableInput
                    setRef={setRef("name")}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() => setFormData({ ...formData, name: "" })}
                    labelText="Name"
                    tooltipText="Display name for the icon"
                    required
                  />
                </div>
              )}

              {/* Icon Description field */}
              {iconDescription && (
                <div className="md:col-span-6 space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("fileUploadElement")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText="Description"
                    tooltipText="Brief description of the icon"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: SVG Upload */}
            {iconUpload && (
              <div className="space-y-2 my-8 cursor-pointer relative">
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
                      if (svgPreview) {
                        setSvgPreview(null);
                        setFormData({
                          ...formData,
                          svgContent: null,
                          fileName: null,
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
                  {svgPreview ? (
                    <div className="relative inline-block">
                      <div
                        className="w-40 h-28 flex items-center justify-center rounded-md border"
                        dangerouslySetInnerHTML={{ __html: svgPreview }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSvgPreview(null);
                          setFormData({
                            ...formData,
                            svgContent: null,
                            fileName: null,
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        {formData.fileName}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-14">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-base text-gray-500">
                        Drop SVG or click to upload (one icon only)
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept=".svg,image/svg+xml"
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </form>

          {/* Icons Display Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 my-8 min-h-[400px]">
            <div className="space-y-4">
              {/* Search Bar - Rounded and less width */}
              <div className="flex justify-center">
                <div className="relative w-96">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Icons Grid - Scrollable with more height */}
              <div className="max-h-96 overflow-y-auto">
                {filteredIcons.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {searchTerm
                        ? "No icons found matching your search."
                        : "No icons uploaded yet."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-8">
                    {filteredIcons.map((icon, index) => (
                      <div
                        key={index}
                        className="border rounded-[30px] p-4 bg-white hover:shadow-md transition-shadow relative group"
                      >
                        {/* Edit Icon */}
                        <button
                          onClick={() => openEditModal(icon)}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 cursor-pointer"
                        >
                          <Pencil className="h-6 w-6 text-gray-600" />
                        </button>

                        <div className="flex flex-col items-center space-y-3">
                          {/* SVG Preview */}
                          <div
                            className="w-16 h-16 flex items-center justify-center"
                            dangerouslySetInnerHTML={{
                              __html: icon.svgContent || "",
                            }}
                          />

                          {/* Icon Info */}
                          <div className="text-center w-full">
                            <h4 className="font-semibold text-sm text-gray-800 truncate">
                              {icon.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      <EditIconModal
        opened={isEditModalOpen}
        onClose={closeEditModal}
        onSave={saveEditedIcon}
        title="Edit Icon"
        confirmText="Save Changes"
        cancelText="Cancel"
      />

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />
    </>
  );
}
