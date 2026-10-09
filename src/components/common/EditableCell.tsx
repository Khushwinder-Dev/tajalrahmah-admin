/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@mantine/core";
import { useRef, useEffect } from "react";

export default function EditableCell({
  info,
  editingCell,
  setEditingCell,
  editValue,
  setEditValue,
  handleEdit,
  //   selectedCell,
  setSelectedCell,
}: {
  info: any;
  editingCell: { rowId: string; columnId: string } | null;
  setEditingCell: React.Dispatch<
    React.SetStateAction<{ rowId: string; columnId: string } | null>
  >;
  editValue: any;
  setEditValue: React.Dispatch<React.SetStateAction<any>>;
  handleEdit: (rowId: string, columnId: string, value: any) => void;
  selectedCell: { rowIndex: number; columnId: string };
  setSelectedCell: React.Dispatch<
    React.SetStateAction<{ rowIndex: number; columnId: string }>
  >;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditing =
    editingCell?.rowId === info.row.id &&
    editingCell?.columnId === info.column.id;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent table navigation while editing

    if (e.key === "Enter") {
      handleEdit(info.row.id, info.column.id, editValue);
      // Keep cell selected after editing
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
    }
    if (e.key === "Escape") {
      setEditingCell(null);
      // Return to selection mode
      setSelectedCell({ rowIndex: info.row.index, columnId: info.column.id });
    }
    if (e.key === "Tab") {
      e.preventDefault();
      handleEdit(info.row.id, info.column.id, editValue);
      if (e.shiftKey) {
        focusPreviousCell(info.row.id, info.column.id);
      } else {
        focusNextCell(info.row.id, info.column.id);
      }
    }
  };

  const focusNextCell = (rowId: string, columnId: string) => {
    console.log(rowId, columnId);
    const columnsOrder = [
      "select",
      "name",
      "email",
      "status",
      "createdAt",
      "deletedAt",
      "draftedAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const nextColumnId = columnsOrder[currentIndex + 1] || columnsOrder[0];

    // If we're at the last column, move to first column of next row
    if (currentIndex === columnsOrder.length - 1) {
      const nextRowIndex = info.row.index + 1;
      setSelectedCell({ rowIndex: nextRowIndex, columnId: columnsOrder[0] });
    } else {
      setSelectedCell({ rowIndex: info.row.index, columnId: nextColumnId });
    }
  };

  const focusPreviousCell = (rowId: string, columnId: string) => {
    console.log(rowId, columnId);
    const columnsOrder = [
      "select",
      "name",
      "email",
      "status",
      "createdAt",
      "deletedAt",
      "draftedAt",
      "actions",
    ];
    const currentIndex = columnsOrder.indexOf(columnId);
    const prevColumnId =
      currentIndex > 0
        ? columnsOrder[currentIndex - 1]
        : columnsOrder[columnsOrder.length - 1];

    // If we're at the first column, move to last column of previous row
    if (currentIndex === 0) {
      const prevRowIndex = Math.max(0, info.row.index - 1);
      setSelectedCell({
        rowIndex: prevRowIndex,
        columnId: columnsOrder[columnsOrder.length - 1],
      });
    } else {
      setSelectedCell({ rowIndex: info.row.index, columnId: prevColumnId });
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        type={info.column.id === "email" ? "email" : "text"}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          handleEdit(info.row.id, info.column.id, editValue);
          setSelectedCell({
            rowIndex: info.row.index,
            columnId: info.column.id,
          });
        }}
        className="h-full w-full border-0 outline-0 focus:ring-0 focus:border-0 p-0 bg-white dark:bg-gray-800"
        style={{
          minHeight: "100%",
          margin: "-1rem -1.5rem",
          padding: "1rem 1.5rem",
          borderRadius: 0,
          width: "calc(100% + 3rem)",
          marginLeft: "-1.5rem",
        }}
      />
    );
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800">
      {info.column.id === "createdAt" ||
      info.column.id === "deletedAt" ||
      info.column.id === "draftedAt"
        ? info.getValue()
          ? new Date(info.getValue() as string).toLocaleDateString()
          : "—"
        : info.getValue()}
    </div>
  );
}
