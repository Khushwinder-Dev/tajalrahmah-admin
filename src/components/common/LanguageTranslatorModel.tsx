import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface TranslationRow {
  id: number;
  english: string;
  arabic: string;
  bangla: string;
}

interface LanguageTranslatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: TranslationRow[];
  onSave: (data: TranslationRow[]) => void;
  title?: string;
}

const LanguageTranslatorModal: React.FC<LanguageTranslatorModalProps> = ({
  isOpen,
  onClose,
  initialData = [{ id: 1, english: "Bangladesh", arabic: "", bangla: "" }],
  onSave,
  title = "Language Translator",
}) => {
  const [translations, setTranslations] =
    useState<TranslationRow[]>(initialData);

  const handleInputChange = (
    id: number,
    field: "arabic" | "bangla",
    value: string
  ) => {
    setTranslations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    onSave(translations);
    onClose();
  };

  const handleClose = () => {
    // Reset to initial data when closing without saving
    setTranslations(initialData);
    onClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      size="xl"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      withCloseButton={false}
      centered
      styles={{
        body: {
          padding: 0,
        },
        content: {
          borderRadius: "12px",
          overflow: "hidden",
          marginTop: "2rem",
        },
      }}
    >
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-700 border-r border-gray-200">
                SL
              </div>
              <div className="p-4 font-medium text-gray-700 border-r border-gray-200">
                English
              </div>
              <div className="p-4 font-medium text-gray-700 border-r border-gray-200">
                Arabic
              </div>
              <div className="p-4 font-medium text-gray-700">Bangla</div>
            </div>

            {/* Table Rows */}
            {translations.map((row, index) => (
              <div
                key={row.id}
                className="grid grid-cols-4 border-b border-gray-200 last:border-b-0"
              >
                {/* Serial Number */}
                <div className="p-4 border-r border-gray-200 flex items-center">
                  <span className="text-gray-600">{index + 1}</span>
                </div>

                {/* English */}
                <div className="p-4 border-r border-gray-200 flex items-center">
                  <span className="text-gray-800">{row.english}</span>
                </div>

                {/* Arabic Input */}
                <div className="p-4 border-r border-gray-200">
                  <Input
                    value={row.arabic}
                    onChange={(e) =>
                      handleInputChange(row.id, "arabic", e.target.value)
                    }
                    placeholder="أدخل الترجمة العربية"
                    className="w-full border-gray-300 focus:border-primary focus:ring-primary text-right"
                    style={{
                      fontFamily:
                        "'Noto Sans Arabic', 'Arial Unicode MS', sans-serif",
                      direction: "rtl",
                      textAlign: "right",
                    }}
                  />
                </div>

                {/* Bangla Input */}
                <div className="p-4">
                  <Input
                    value={row.bangla}
                    onChange={(e) =>
                      handleInputChange(row.id, "bangla", e.target.value)
                    }
                    placeholder="বাংলা অনুবাদ লিখুন"
                    className="w-full border-gray-300 focus:border-primary focus:ring-primary"
                    style={{
                      fontFamily:
                        "'Noto Sans Bengali', 'SolaimanLipi', sans-serif",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <Button
            onClick={handleSave}
            className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LanguageTranslatorModal;
