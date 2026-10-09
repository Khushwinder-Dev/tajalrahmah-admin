/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import EditableInput from "@/components/common/EditableInput";
import GenericPDF from "@/components/common/pdf";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { toastError, toastRestore, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { Check, Edit, Eye, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColorsPermissions, usePermission } from "@/hooks/usePermissions";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import { useAppSelector } from "@/store/hooks";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import { SwitchSelect } from "@/components/common/SwitchAutoComplete";

type ItemMasterData = {
  itemCode: string;
  itemName: string;
  arabicName: string;
  costPrice: number;
  regularPrice: number;
  offerPrice: number;
  startDate: string;
  endDate: string;
  openingStock: number;
  category: string;
  subCategory: string;
  unit: string;
  description: string;
  status: "active" | "inactive" | "draft";
  isDefault: boolean;
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

const initialData: ItemMasterData = {
  itemCode: "ITM001",
  itemName: "Laptop Pro 15",
  arabicName: "لابتوب برو 15",
  costPrice: 1200,
  regularPrice: 1500,
  offerPrice: 1350,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  openingStock: 50,
  category: "Electronics",
  subCategory: "Laptops",
  unit: "Piece",
  description: "High-performance laptop for professionals",
  status: "active",
  isDefault: false,
  isActive: true,
  isDraft: false,
  createdAt: new Date(),
  draftedAt: null,
  updatedAt: new Date(),
  deletedAt: null,
  isDeleted: false,
};

export default function ItemFormPage({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const labels = useLanguageLabels();
  const { isRTL } = useAppSelector((state) => state.language);

  const [keepCreating, setKeepCreating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [isDefaultState, setIsDefaultState] = useState<"Yes" | "No">("No");

  // Permission checks
  const { canCreate, canView } = useColorsPermissions();

  // Field-level permissions
  const itemName: boolean = usePermission("items", "create", "itemName");
  const itemCode: boolean = usePermission("items", "create", "itemCode");
  const arabicName: boolean = usePermission("items", "create", "arabicName");
  const costPrice: boolean = usePermission("items", "create", "costPrice");
  const regularPrice: boolean = usePermission(
    "items",
    "create",
    "regularPrice"
  );
  const offerPrice: boolean = usePermission("items", "create", "offerPrice");
  const startDate: boolean = usePermission("items", "create", "startDate");
  const endDate: boolean = usePermission("items", "create", "endDate");
  const openingStock: boolean = usePermission(
    "items",
    "create",
    "openingStock"
  );
  const category: boolean = usePermission("items", "create", "category");
  const subCategory: boolean = usePermission("items", "create", "subCategory");
  const unit: boolean = usePermission("items", "create", "unit");
  const description: boolean = usePermission("items", "create", "description");
  const status: boolean = usePermission("items", "create", "status");
  const isDefault: boolean = usePermission("items", "create", "isDefault");
  const canPdf: boolean = usePermission("items", "pdf");
  const canPrint: boolean = usePermission("items", "print");

  // Form state
  const [formData, setFormData] = useState<ItemMasterData>({
    itemCode: "",
    itemName: "",
    arabicName: "",
    costPrice: 0,
    regularPrice: 0,
    offerPrice: 0,
    startDate: "",
    endDate: "",
    openingStock: 0,
    category: "",
    subCategory: "",
    unit: "",
    description: "",
    status: "active",
    isDefault: false,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    createdAt: null,
    draftedAt: null,
    updatedAt: null,
    deletedAt: null,
  });

  // Initialize with edit data if available
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData(initialData);
      setIsDefaultState(initialData.isDefault ? "Yes" : "No");
    }
  }, [isEdit]);

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
          navigate("/items/create");
        } else {
          navigate("/items/edit/undefined");
        }
      },
      show: canCreate,
    },
    {
      label: "View",
      icon: <Eye className="w-5 h-5 text-green-600" />,
      onClick: () => {
        navigate("/items/view");
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

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintItem(formData);
    }

    // keep switch functionality
    if (keepCreating) {
      toastSuccess("Item created successfully!");
      handleReset();
    } else {
      toastSuccess("Item created successfully!");
      navigate("/items");
    }
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  const handleReset = async () => {
    setFormData({
      itemCode: "",
      itemName: "",
      arabicName: "",
      costPrice: 0,
      regularPrice: 0,
      offerPrice: 0,
      startDate: "",
      endDate: "",
      openingStock: 0,
      category: "",
      subCategory: "",
      unit: "",
      description: "",
      status: "active",
      isDefault: false,
      isActive: true,
      isDraft: false,
      isDeleted: false,
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
      inputRefs.current["itemName"]?.focus();
    }, 100);
  };

  const handlePrintItem = (itemData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Item Details",
        data: [itemData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          itemCode: "Item Code",
          itemName: "Item Name",
          arabicName: "Arabic Name",
          costPrice: "Cost Price",
          regularPrice: "Regular Price",
          offerPrice: "Offer Price",
          startDate: "Start Date",
          endDate: "End Date",
          openingStock: "Opening Stock",
          category: "Category",
          subCategory: "Sub Category",
          unit: "Unit",
          description: "Description",
          status: "Status",
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
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Item Details"
          subtitle="Item Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "item-details.pdf";
      a.click();
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
              toastRestore("Item saved as draft successfully");
            },
            show: canCreate,
          },
        ];
      }
      return filteredOptions;
    });
  }, [formData.isDraft, canCreate]);

  // Create minimize handler
  const handleMinimize = useCallback(() => {
    return {
      formData,
      hasChanges: true,
      scrollPosition: window.scrollY,
    };
  }, [formData]);

  return (
    <>
      <MinimizablePageLayout
        moduleId="item-form-module"
        moduleName={isEdit ? labels.editingItem : labels.addingItem}
        moduleRoute={
          isEdit ? `/items/edit/${formData.itemName || "new"}` : "/items/create"
        }
        onMinimize={handleMinimize}
        title={isEdit ? labels.editingItem : labels.addingItem}
        listPath="items"
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
        module="items"
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90! bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
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
            {/* First Row: Item Name, Item Code, Arabic Name, Description */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Item Name field - only show if user can create */}
              {itemName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("itemName")}
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("itemCode")}
                    onCancel={() => setFormData({ ...formData, itemName: "" })}
                    labelText={labels.itemName}
                    tooltipText={labels.itemNameTooltip}
                    required
                  />
                </div>
              )}

              {/* Item Code field - only show if user can create */}
              {itemCode && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("itemCode")}
                    id="itemCode"
                    name="itemCode"
                    value={formData.itemCode}
                    onChange={handleChange}
                    onNext={() => focusNextInput("arabicName")}
                    onCancel={() => setFormData({ ...formData, itemCode: "" })}
                    labelText={labels.itemCode}
                    tooltipText={labels.itemCodeTooltip}
                    required
                  />
                </div>
              )}

              {/* Arabic Name field - only show if user can create */}
              {arabicName && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("arabicName")}
                    id="arabicName"
                    name="arabicName"
                    value={formData.arabicName}
                    onChange={handleChange}
                    onNext={() => focusNextInput("description")}
                    onCancel={() =>
                      setFormData({ ...formData, arabicName: "" })
                    }
                    labelText={labels.arabicName}
                    tooltipText={labels.arabicNameTooltip}
                    required
                  />
                </div>
              )}

              {/* Description field - only show if user can create */}
              {description && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("description")}
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onNext={() => focusNextInput("costPrice")}
                    onCancel={() =>
                      setFormData({ ...formData, description: "" })
                    }
                    labelText={labels.description}
                    tooltipText="Enter a description for the item"
                    type="text"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row: Cost Price, Regular Price, Offer Price, Opening Stock */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Cost Price field - only show if user can create */}
              {costPrice && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("costPrice")}
                    id="costPrice"
                    name="costPrice"
                    type="number"
                    value={formData.costPrice.toString()}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        costPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    onNext={() => focusNextInput("regularPrice")}
                    onCancel={() => setFormData({ ...formData, costPrice: 0 })}
                    labelText={labels.costPrice}
                    tooltipText={labels.costPriceTooltip}
                    required
                  />
                </div>
              )}

              {/* Regular Price field - only show if user can create */}
              {regularPrice && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("regularPrice")}
                    id="regularPrice"
                    name="regularPrice"
                    type="number"
                    value={formData.regularPrice.toString()}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        regularPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    onNext={() => focusNextInput("offerPrice")}
                    onCancel={() =>
                      setFormData({ ...formData, regularPrice: 0 })
                    }
                    labelText={labels.regularPrice}
                    tooltipText={labels.regularPriceTooltip}
                    required
                  />
                </div>
              )}

              {/* Offer Price field - only show if user can create */}
              {offerPrice && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("offerPrice")}
                    id="offerPrice"
                    name="offerPrice"
                    type="number"
                    value={formData.offerPrice.toString()}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        offerPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    onNext={() => focusNextInput("openingStock")}
                    onCancel={() => setFormData({ ...formData, offerPrice: 0 })}
                    labelText={labels.offerPrice}
                    tooltipText={labels.offerPriceTooltip}
                    required
                  />
                </div>
              )}

              {/* Opening Stock field - only show if user can create */}
              {openingStock && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("openingStock")}
                    id="openingStock"
                    name="openingStock"
                    type="number"
                    value={formData.openingStock.toString()}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        openingStock: parseInt(e.target.value) || 0,
                      })
                    }
                    onNext={() => focusNextInput("category")}
                    onCancel={() =>
                      setFormData({ ...formData, openingStock: 0 })
                    }
                    labelText={labels.openingStock}
                    tooltipText={labels.openingStockTooltip}
                    required
                  />
                </div>
              )}
            </div>

            {/* Third Row: Category, Sub Category, Unit, Start Date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* Category field - only show if user can create */}
              {category && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("category")}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onNext={() => focusNextInput("subCategory")}
                    onCancel={() => setFormData({ ...formData, category: "" })}
                    labelText={labels.category}
                    tooltipText={labels.categoryTooltip}
                    required
                  />
                </div>
              )}

              {/* Sub Category field - only show if user can create */}
              {subCategory && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("subCategory")}
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    onNext={() => focusNextInput("unit")}
                    onCancel={() =>
                      setFormData({ ...formData, subCategory: "" })
                    }
                    labelText={labels.subCategory}
                    tooltipText={labels.subCategoryTooltip}
                    required
                  />
                </div>
              )}

              {/* Unit field - only show if user can create */}
              {unit && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("unit")}
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    onNext={() => focusNextInput("startDate")}
                    onCancel={() => setFormData({ ...formData, unit: "" })}
                    labelText={labels.unit}
                    tooltipText={labels.unitTooltip}
                    required
                  />
                </div>
              )}

              {/* Start Date field - only show if user can create */}
              {startDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("startDate")}
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("endDate")}
                    onCancel={() => setFormData({ ...formData, startDate: "" })}
                    labelText={labels.startDate}
                    tooltipText={labels.startDateTooltip}
                    required
                  />
                </div>
              )}
            </div>

            {/* Fourth Row: End Date, Default, Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
              {/* End Date field - only show if user can create */}
              {endDate && (
                <div className="space-y-2">
                  <EditableInput
                    setRef={setRef("endDate")}
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    onNext={() => focusNextInput("isDefault")}
                    onCancel={() => setFormData({ ...formData, endDate: "" })}
                    labelText={labels.endDate}
                    tooltipText={labels.endDateTooltip}
                    required
                  />
                </div>
              )}

              {/* Default field - only show if user can create */}
              {isDefault && (
                <div className="space-y-2 relative">
                  <SwitchSelect
                    ref={(el: any) => setRef("isDefault")(el)}
                    id="isDefault"
                    name="isDefault"
                    multiSelect={false}
                    options={[
                      {
                        label: labels.yes,
                        value: labels.yes,
                        date: "Set default item",
                      },
                      {
                        label: labels.no,
                        value: labels.no,
                        date: "Remove default item",
                      },
                    ]}
                    value={isDefaultState === "Yes" ? labels.yes : labels.no}
                    labelClassName="rounded-lg"
                    onValueChange={(value: string | string[]) => {
                      const isYes = Array.isArray(value)
                        ? value[0] === labels.yes
                        : value === labels.yes;
                      setIsDefaultState(isYes ? "Yes" : "No");
                      const newValue = isYes;
                      setFormData((prev) => ({
                        ...prev,
                        isDefault: newValue,
                      }));
                    }}
                    onEnterPress={() => {
                      if (
                        formData.isDefault === true ||
                        formData.isDefault === false
                      ) {
                        // Form submission or next action
                      }
                    }}
                    placeholder=" "
                    labelText="Default"
                    className="relative"
                    tooltipText={labels.defaultItemTooltip}
                  />
                </div>
              )}
              {/* Status field - only show if user can create */}
              {status && (
                <div className="space-y-2">
                  <SwitchSelect
                    ref={(el: any) => setRef("statusSwitch")(el)}
                    id="statusSwitch"
                    name="statusSwitch"
                    labelText="Status"
                    multiSelect={false}
                    options={[
                      {
                        label: "Active",
                        value: "active",
                        date: "Set active",
                      },
                      {
                        label: "Inactive",
                        value: "inactive",
                        date: "Set inactive",
                      },
                      {
                        label: "Draft",
                        value: "draft",
                        date: "Set draft",
                      },
                    ]}
                    value={formData.status}
                    onValueChange={(value: string | string[]) => {
                      const stringValue = Array.isArray(value)
                        ? value[0] || ""
                        : value;

                      setFormData((prev) => ({
                        ...prev,
                        status: stringValue as "active" | "inactive" | "draft",
                        isDraft: stringValue === "draft",
                        isActive: stringValue === "active",
                      }));
                    }}
                    placeholder=""
                    styles={{
                      input: {
                        borderColor: "var(--primary)",
                        "&:focus": {
                          borderColor: "var(--primary)",
                        },
                      },
                    }}
                    tooltipText={labels.itemStatusTooltip}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </MinimizablePageLayout>

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
