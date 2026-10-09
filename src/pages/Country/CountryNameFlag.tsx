/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditableTitleWithFlagProps {
  info: any;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: (cell: { rowId: string; columnId: string } | null) => void;
  editValue: any;
  setEditValue: (value: any) => void;
  handleEdit: (rowId: string, columnId: string, value: any) => void;
  handleFlagUpload: (rowId: string, file: File) => Promise<void>;
}

export const EditableTitleWithFlag = ({
  info,
  editingCell,
  setEditingCell,
  editValue,
  setEditValue,
  handleEdit,
  handleFlagUpload,
}: EditableTitleWithFlagProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempFlag, setTempFlag] = useState<string | null>(null);
  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit(info.row.id, info.column.id, editValue);
      setEditingCell(null);
    }
    if (e.key === "Escape") {
      setEditingCell(null);
      setTempFlag(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set temporary preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempFlag(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload the file
      await handleFlagUpload(info.row.id, file);
    }
  };

  const getFlagImage = () => {
    // Use temp flag if available during editing, otherwise use the original
    return (
      tempFlag ||
      info.row.original.flagUrl ||
      `https://flagcdn.com/16x12/${info.row.original.code.toLowerCase()}.png`
    );
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 w-full">
        <div className="relative">
          <img
            src={getFlagImage()}
            alt="Country flag"
            className="w-6 h-4 object-contain cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 rounded-full"
            onClick={() => fileInputRef.current?.click()}
          >
            +
          </Button>
        </div>
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            handleEdit(info.row.id, info.column.id, editValue);
            setEditingCell(null);
            setTempFlag(null);
          }}
          className="flex-1"
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] dark:bg-gray-900"
      onClick={() => {
        setEditingCell({ rowId: info.row.id, columnId: info.column.id });
        setEditValue(info.getValue());
      }}
    >
      <img
        src={getFlagImage()}
        alt={`${info.getValue()} flag`}
        className="w-5 h-4 mr-2 object-contain"
      />
      {info.getValue()}
    </div>
  );
};
