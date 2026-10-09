// components/EditIconModal.tsx
import React, { useRef, useState } from "react";
import { Modal, Text, Group, Stack, ThemeIcon } from "@mantine/core";
import { Button } from "@/components/ui/button";
import EditableInput from "@/components/common/EditableInput";
import { Edit, Upload, X } from "lucide-react";

type IconData = {
  id: string;
  name: string;
  description: string;
  svgContent: string | null;
  fileName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

interface EditIconModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (data: EditFormData) => void;
  initialData?: EditFormData;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

interface EditFormData {
  name: string;
  description: string;
  svgContent: string | null;
  fileName: string | null;
}

const initialData: IconData = {
  id: "",
  name: "",
  description: "",
  svgContent: null,
  fileName: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const EditIconModal: React.FC<EditIconModalProps> = ({
  opened,
  onClose,
  onSave,
  title = "Edit Icon",
  confirmText = "Save Changes",
  cancelText = "Cancel",
}) => {
  const [formData, setFormData] = useState<EditFormData>(initialData);
  const [svgPreview, setSvgPreview] = useState<string | null>(
    initialData.svgContent
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editFormData, setEditFormData] = useState<IconData>(initialData);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSvgPreview(content);
        setFormData((prev) => ({
          ...prev,
          svgContent: content,
          fileName: file.name,
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSvgPreview(content);
        setFormData((prev) => ({
          ...prev,
          svgContent: content,
          fileName: file.name,
        }));
      };
      reader.readAsText(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeSvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSvgPreview(null);
    setFormData((prev) => ({
      ...prev,
      svgContent: null,
      fileName: null,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    // Reset form to initial data
    setFormData(initialData);
    setSvgPreview(initialData.svgContent);
    onClose();
  };

  // Handle edit form field changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCancel}
      withCloseButton={false}
      centered
      size="sm"
      radius="lg"
      padding="xl"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="lg" className="py-2">
        {/* Header with Icon */}
        <Stack gap="md" align="center">
          <ThemeIcon
            size={50}
            radius="xl"
            variant="light"
            color="blue"
            className="bg-blue-50 border-2 border-blue-200"
          >
            <Edit size={24} className="text-blue-500" strokeWidth={1.5} />
          </ThemeIcon>

          <Text size="lg" fw={600} ta="center" className="text-gray-800">
            {title}
          </Text>
        </Stack>

        {/* Form Fields */}
        <Stack gap="md">
          {/* Icon Name */}
          <div>
            <EditableInput
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleEditChange}
              onNext={() => {}}
              onCancel={() => setFormData({ ...formData, name: "" })}
              labelText="Name"
              tooltipText="Display name for the icon"
              required
            />
          </div>

          {/* Icon Description */}
          <div>
            <EditableInput
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleEditChange}
              onNext={() => {}}
              onCancel={() => setFormData({ ...formData, description: "" })}
              labelText="Description"
              tooltipText="Brief description of the icon"
              required
            />
          </div>

          {/* SVG Upload */}
          <div>
            <Text size="sm" fw={500} className="text-gray-700 mb-2">
              Icon (SVG only)
            </Text>
            <div
              className={`border-2 border-dashed rounded-lg p-4 bg-gray-50 text-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              {svgPreview ? (
                <div className="relative inline-block">
                  <div
                    className="w-20 h-16 flex items-center justify-center rounded-md border bg-white"
                    dangerouslySetInnerHTML={{ __html: svgPreview }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white shadow-sm hover:bg-gray-100"
                    onClick={removeSvg}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <Text size="xs" className="text-gray-600 mt-1">
                    {formData.fileName}
                  </Text>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <Text size="xs" className="text-gray-500">
                    Drop SVG or click to upload
                  </Text>
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
        </Stack>

        {/* Action Buttons */}
        <Group gap="sm" justify="center" className="mt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium"
          >
            {cancelText}
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!formData.name.trim() || !formData.description.trim()}
          >
            {confirmText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
