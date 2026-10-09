/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
// import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Modal } from "@mantine/core";
import { X, Save, RotateCcw, Upload, Image as ImageIcon } from "lucide-react";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import { toastSuccess, toastError } from "@/lib/toast";

// Define Item interface
interface Item {
  id: string;
  itemCode: string;
  barcode: string;
  shortName: string;
  price: number;
  stock: number;
  group: string;
  category: string;
  subCategory: string;
  unit: string;
  brand: string;
  size: string;
  color: string;
  image: File | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for dropdowns
const ITEM_GROUPS = [
  "Electronics",
  "Office Supplies",
  "Furniture",
  "Consumables",
  "Equipment",
  "Software",
  "Hardware",
  "Accessories",
  "Tools",
  "Safety Equipment",
];

const ITEM_CATEGORIES = [
  "Computer Hardware",
  "Office Furniture",
  "Stationery",
  "Cleaning Supplies",
  "Safety Gear",
  "Software Licenses",
  "Network Equipment",
  "Storage Solutions",
  "Printing Supplies",
  "Communication Devices",
];

const SUB_CATEGORIES = [
  "Laptops",
  "Desktops",
  "Monitors",
  "Keyboards",
  "Mice",
  "Chairs",
  "Desks",
  "Cabinets",
  "Paper Products",
  "Writing Instruments",
];

const UNIT_OPTIONS = [
  "Piece (PC)",
  "Kilogram (KG)",
  "Liter (L)",
  "Meter (M)",
  "Box",
  "Pack",
  "Set",
  "Dozen",
  "Gram (G)",
  "Square Meter (SQM)",
];

const BRAND_OPTIONS = [
  "Dell",
  "HP",
  "Lenovo",
  "Apple",
  "Samsung",
  "Canon",
  "Epson",
  "Microsoft",
  "Logitech",
  "IKEA",
  "Steelcase",
  "Herman Miller",
  "Generic",
  "No Brand",
];

const SIZE_OPTIONS = [
  "Small",
  "Medium",
  "Large",
  "Extra Large",
  "14 inch",
  "15.6 inch",
  "17 inch",
  "21 inch",
  "24 inch",
  "27 inch",
  "32 inch",
  "A4",
  "A3",
  "Letter",
  "Custom",
];

const COLOR_OPTIONS = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Brown",
  "Beige",
  "Gold",
  "Rose Gold",
  "Multi-Color",
  "Transparent",
  "N/A",
];

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Item) => void;
}

export default function AddItemModal({
  isOpen,
  onClose,
  onSave,
}: AddItemModalProps) {
  //   const { t } = useTranslation();

  // Form refs for focus management
  const itemCodeRef = useRef<EditableInputRef>(null);
  const barcodeRef = useRef<EditableInputRef>(null);
  const shortNameRef = useRef<EditableInputRef>(null);
  const priceRef = useRef<EditableInputRef>(null);
  const stockRef = useRef<EditableInputRef>(null);
  const descriptionRef = useRef<EditableInputRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate incremental item code
  const generateItemCode = () => {
    const lastNumber = localStorage.getItem("lastItemNumber") || "0";
    const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(4, "0");
    localStorage.setItem("lastItemNumber", nextNumber);
    return `ITEM${nextNumber}`;
  };

  // Form state
  const [formData, setFormData] = useState<
    Omit<Item, "id" | "createdAt" | "updatedAt">
  >({
    itemCode: generateItemCode(),
    barcode: "",
    shortName: "",
    price: 0,
    stock: 0,
    group: "",
    category: "",
    subCategory: "",
    unit: "",
    brand: "",
    size: "",
    color: "",
    image: null,
    description: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toastError("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toastError("Image size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Focus management
  const focusNextInput = (currentField: string) => {
    const groupInput = document.querySelector(
      'input[placeholder="Select group..."]'
    ) as HTMLInputElement;
    const categoryInput = document.querySelector(
      'input[placeholder="Select category..."]'
    ) as HTMLInputElement;
    const subCategoryInput = document.querySelector(
      'input[placeholder="Select sub category..."]'
    ) as HTMLInputElement;
    const unitInput = document.querySelector(
      'input[placeholder="Select unit..."]'
    ) as HTMLInputElement;
    const brandInput = document.querySelector(
      'input[placeholder="Select brand..."]'
    ) as HTMLInputElement;
    const sizeInput = document.querySelector(
      'input[placeholder="Select size..."]'
    ) as HTMLInputElement;
    const colorInput = document.querySelector(
      'input[placeholder="Select color..."]'
    ) as HTMLInputElement;
    switch (currentField) {
      case "itemCode":
        barcodeRef.current?.focus();
        break;
      case "barcode":
        shortNameRef.current?.focus();
        break;
      case "shortName":
        priceRef.current?.focus();
        break;
      case "price":
        stockRef.current?.focus();
        break;
      case "stock":
        // Focus on group dropdown
        groupInput?.focus();
        break;
      case "group":
        categoryInput?.focus();
        break;
      case "category":
        subCategoryInput?.focus();
        break;
      case "subCategory":
        unitInput?.focus();
        break;
      case "unit":
        brandInput?.focus();
        break;
      case "brand":
        sizeInput?.focus();
        break;
      case "size":
        colorInput?.focus();
        break;
      case "color":
        descriptionRef.current?.focus();
        break;
      default:
        break;
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      itemCode: generateItemCode(),
      barcode: "",
      shortName: "",
      price: 0,
      stock: 0,
      group: "",
      category: "",
      subCategory: "",
      unit: "",
      brand: "",
      size: "",
      color: "",
      image: null,
      description: "",
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.barcode.trim()) {
      toastError("Barcode is required");
      return;
    }

    if (!formData.shortName.trim()) {
      toastError("Short name is required");
      return;
    }

    // Create new item
    const newItem: Item = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save item
    onSave(newItem);
    toastSuccess("Item added successfully!");

    // Reset form and close modal
    handleReset();
    onClose();
  };

  // Handle modal close
  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">
            Add New Item
          </span>
        </div>
      }
      size="xl"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        body: { padding: 0, maxHeight: "80vh", overflow: "auto" },
        header: {
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "16px",
          marginBottom: 0,
        },
      }}
      centered
    >
      <form onSubmit={handleSubmit} className="p-6">
        {/* First Row: Item Code, Barcode, Short Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Item Code</h3>
            <EditableInput
              ref={itemCodeRef}
              id="itemCode"
              name="itemCode"
              className="w-full h-10 bg-gray-100"
              value={formData.itemCode}
              onChange={handleChange}
              onNext={() => focusNextInput("itemCode")}
              onCancel={() => {}}
              tooltipText="Auto-generated item code"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">
              Barcode <span className="text-red-500">*</span>
            </h3>
            <EditableInput
              ref={barcodeRef}
              id="barcode"
              name="barcode"
              className="w-full h-10"
              value={formData.barcode}
              onChange={handleChange}
              onNext={() => focusNextInput("barcode")}
              onCancel={() => {}}
              placeholder="Enter barcode"
              tooltipText="Enter the item barcode"
              required
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">
              Short Name <span className="text-red-500">*</span>
            </h3>
            <EditableInput
              ref={shortNameRef}
              id="shortName"
              name="shortName"
              className="w-full h-10"
              value={formData.shortName}
              onChange={handleChange}
              onNext={() => focusNextInput("shortName")}
              onCancel={() => {}}
              placeholder="Enter short name"
              tooltipText="Enter the item short name"
              required
            />
          </div>
        </div>

        {/* Second Row: Price, Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Price</h3>
            <EditableInput
              ref={priceRef}
              id="price"
              name="price"
              type="number"
              className="w-full h-10"
              value={formData.price.toString()}
              onChange={handleChange}
              onNext={() => focusNextInput("price")}
              onCancel={() => {}}
              placeholder="0.00"
              tooltipText="Enter item price"
              step="0.01"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Stock</h3>
            <EditableInput
              ref={stockRef}
              id="stock"
              name="stock"
              type="number"
              className="w-full h-10"
              value={formData.stock.toString()}
              onChange={handleChange}
              onNext={() => focusNextInput("stock")}
              onCancel={() => {}}
              placeholder="0"
              tooltipText="Enter stock quantity"
              min="0"
            />
          </div>
        </div>

        {/* Third Row: Group, Category, Sub Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Group</h3>
            <Autocomplete
              data={ITEM_GROUPS}
              value={formData.group}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, group: value || "" }));
              }}
              placeholder="Select group..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                  borderRadius: "12px",
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("group");
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Category</h3>
            <Autocomplete
              data={ITEM_CATEGORIES}
              value={formData.category}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, category: value || "" }));
              }}
              placeholder="Select category..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                  borderRadius: "12px",
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("category");
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Sub Category</h3>
            <Autocomplete
              data={SUB_CATEGORIES}
              value={formData.subCategory}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, subCategory: value || "" }));
              }}
              placeholder="Select sub category..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                  borderRadius: "12px",
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("subCategory");
              }}
            />
          </div>
        </div>

        {/* Fourth Row: Unit, Brand, Size, Color */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Unit</h3>
            <Autocomplete
              data={UNIT_OPTIONS}
              value={formData.unit}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, unit: value || "" }));
              }}
              placeholder="Select unit..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                  borderRadius: "12px",
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("unit");
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Brand</h3>
            <Autocomplete
              data={BRAND_OPTIONS}
              value={formData.brand}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, brand: value || "" }));
              }}
              placeholder="Select brand..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                  borderRadius: "12px",
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("brand");
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Size</h3>
            <Autocomplete
              data={SIZE_OPTIONS}
              value={formData.size}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, size: value || "" }));
              }}
              placeholder="Select size..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                  borderRadius: "12px",
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("size");
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">Color</h3>
            <Autocomplete
              data={COLOR_OPTIONS}
              value={formData.color}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, color: value || "" }));
              }}
              placeholder="Select color..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                  borderRadius: "12px",
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("color");
              }}
            />
          </div>
        </div>

        {/* Fifth Row: Image Upload */}
        <div className="mb-6">
          <h3 className="font-medium text-sm text-gray-700 mb-2">Image</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-center">
              {imagePreview ? (
                <div className="flex items-center gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload size={14} />
                      Change Image
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload image
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload size={14} />
                    Upload Image
                  </Button>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPG, PNG, GIF. Maximum size: 5MB
          </p>
        </div>

        {/* Sixth Row: Description */}
        <div className="mb-8">
          <h3 className="font-medium text-sm text-gray-700 mb-2">
            Description
          </h3>
          <EditableInput
            ref={descriptionRef}
            id="description"
            name="description"
            className="w-full h-20"
            value={formData.description}
            onChange={handleChange}
            onNext={() => {}}
            onCancel={() => {}}
            placeholder="Enter item description..."
            tooltipText="Enter detailed description of the item"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400"
            >
              <Save size={16} />
              Save Item
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
