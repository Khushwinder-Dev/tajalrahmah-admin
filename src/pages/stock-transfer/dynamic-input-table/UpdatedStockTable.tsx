/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Table,
  TextInput,
  ScrollArea,
  Text,
  ActionIcon,
  Select,
} from "@mantine/core";
import { Button as ShadcnButton } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
// import EditableInput from "@/components/common/EditableInput";
import AddItemModal from "../AddItemModal";

export type FormValuesType = {
  SN: number;
  Item: string;
  Description: string;
  Qty: number;
  Unit: string;
  Rate: number;
  Disc: number;
  DiscAmt: number;
  ExcludingVAT: number;
  VAT: number;
  VATAmount: number;
  IncludingVAT: number;
};

// Column definitions with smaller widths
const columnConfig = [
  { id: "SN", label: "SN", width: "60px" },
  { id: "Item", label: "Item", width: "160px" },
  { id: "Description", label: "Description", width: "200px" },
  { id: "Qty", label: "Qty", width: "80px" },
  { id: "Unit", label: "Unit", width: "100px" },
  { id: "Rate", label: "Rate", width: "100px" },
  { id: "IncludingVAT", label: "Including VAT", width: "130px" },
  { id: "Action", label: "Actions", width: "80px" },
];

// Mock form data
const mockFormData: FormValuesType[] = [
  {
    SN: 1,
    Item: "Laptop",
    Description: "Dell Inspiron 15",
    Qty: 1,
    Unit: "pcs",
    Rate: 100,
    Disc: 0,
    DiscAmt: 0.0,
    ExcludingVAT: 100.0,
    VAT: 15,
    VATAmount: 15.0,
    IncludingVAT: 115.0,
  },
  {
    SN: 2,
    Item: "Monitor",
    Description: "HP 24-inch FHD",
    Qty: 3,
    Unit: "pcs",
    Rate: 15000,
    Disc: 0,
    DiscAmt: 0.0,
    ExcludingVAT: 45000.0,
    VAT: 7.5,
    VATAmount: 3375.0,
    IncludingVAT: 48375.0,
  },
  {
    SN: 3,
    Item: "Mouse",
    Description: "Logitech Wireless",
    Qty: 5,
    Unit: "pcs",
    Rate: 1200,
    Disc: 10,
    DiscAmt: 600.0,
    ExcludingVAT: 5400.0,
    VAT: 5,
    VATAmount: 270.0,
    IncludingVAT: 5670.0,
  },
];

// Item Data
const ItemData = mockFormData.map((item) => ({
  value: item.Item,
  label: item.Item,
  id: item.Item,
}));

// Unit Data
const UnitData = [
  { value: "pcs", label: "pcs", id: "pcs" },
  { value: "kg", label: "kg", id: "kg" },
  { value: "g", label: "g", id: "g" },
  { value: "ml", label: "ml", id: "ml" },
  { value: "l", label: "l", id: "l" },
  { value: "box", label: "box", id: "box" },
  { value: "bag", label: "bag", id: "bag" },
  { value: "carton", label: "carton", id: "carton" },
  { value: "piece", label: "piece", id: "piece" },
];

const initialRow: FormValuesType = {
  SN: 1,
  Item: "",
  Description: "",
  Qty: 0,
  Unit: "",
  Rate: 0,
  Disc: 0,
  DiscAmt: 0,
  ExcludingVAT: 0,
  VAT: 0,
  VATAmount: 0,
  IncludingVAT: 0,
};

const initialEditRow: FormValuesType[] = [
  {
    SN: 1,
    Item: "Laptop",
    Description: "Dell Inspiron 15",
    Qty: 1,
    Unit: "pcs",
    Rate: 100,
    Disc: 0,
    DiscAmt: 0.0,
    ExcludingVAT: 100.0,
    VAT: 15,
    VATAmount: 15.0,
    IncludingVAT: 115.0,
  },
];

type Props = {
  isEdit?: boolean;
  className?: string;
};

const OptimizedDynamicInputTable = ({
  isEdit = false,
  className = "",
}: Props) => {
  const [formRows, setFormRows] = useState<FormValuesType[]>(
    isEdit ? initialEditRow : [initialRow]
  );
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [focusPosition, setFocusPosition] = useState<{
    rowIndex: number;
    columnIndex: number;
    isNewRow?: boolean;
  } | null>(null);

  // New row state
  const [newRowData, setNewRowData] = useState<Partial<FormValuesType>>({});
  const [newRowError, setNewRowError] = useState<string>("");

  // Hover state for action buttons
  const [hoveredActionCell, setHoveredActionCell] = useState<string | null>(
    null
  );

  // Input states for tracking focus and changes
  const [inputStates, setInputStates] = useState<
    Record<
      string,
      { isFocused: boolean; hasChanged: boolean; originalValue: string }
    >
  >({});

  // Refs
  const inputRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLSelectElement | null;
  }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized data
  const memoizedItemData = useMemo(() => [...ItemData], []);
  const memoizedUnitData = useMemo(() => [...UnitData], []);

  // Field order for navigation
  const FIELD_ORDER = ["Item", "Qty", "Unit", "Rate"];
  const LAST_FIELD_INDEX = FIELD_ORDER.length - 1;

  // Calculate row fields
  const calculateFields = useCallback(
    (data: FormValuesType): FormValuesType => {
      const { Qty, Rate, Disc, VAT } = data;
      const total = Qty * Rate;
      const DiscAmt = Number(((total * Disc) / 100).toFixed(2));
      const ExcludingVAT = Number((total - DiscAmt).toFixed(2));
      const VATAmount = Number(((ExcludingVAT * VAT) / 100).toFixed(2));
      const IncludingVAT = Number((ExcludingVAT + VATAmount).toFixed(2));

      return {
        ...data,
        DiscAmt,
        ExcludingVAT,
        VATAmount,
        IncludingVAT,
      };
    },
    []
  );

  // Helper functions
  const getInputStateKey = (
    rowIndex: number,
    field: string,
    isNewRow: boolean = false
  ) => {
    return isNewRow ? `new-row-${field}` : `${rowIndex}-${field}`;
  };

  const shouldShowCrossIcon = (
    rowIndex: number,
    field: string,
    isNewRow: boolean = false
  ) => {
    const key = getInputStateKey(rowIndex, field, isNewRow);
    const state = inputStates[key];
    return state?.isFocused && state?.hasChanged;
  };

  const updateInputState = (
    key: string,
    updates: Partial<(typeof inputStates)[string]>
  ) => {
    setInputStates((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...updates },
    }));
  };

  // Handle input changes
  const handleChange = useCallback(
    (rowIdx: number, field: string, value: string | number) => {
      const newValue =
        field === "Qty" ||
        field === "Rate" ||
        field === "Disc" ||
        field === "VAT"
          ? parseFloat(value as string) || 0
          : value;

      setFormRows((prev) => {
        const updatedRow = {
          ...prev[rowIdx],
          [field]: newValue,
        };
        const calculated = calculateFields(updatedRow);
        const newRows = [...prev];
        newRows[rowIdx] = calculated;
        return newRows;
      });

      // Update input state
      const key = getInputStateKey(rowIdx, field);
      updateInputState(key, { hasChanged: true });
    },
    [calculateFields]
  );

  // Handle new row changes
  const handleNewRowChange = useCallback(
    (field: string, value: string | number) => {
      setNewRowData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing in Item field
      if (field === "Item" && newRowError) {
        setNewRowError("");
      }

      // Update input state
      const key = getInputStateKey(-1, field, true);
      updateInputState(key, { hasChanged: value !== "" });
    },
    [newRowError]
  );

  // Handle item change (auto-populate)
  const handleItemChange = (
    rowIdx: number | null,
    value: string | null,
    isNewRow = false
  ) => {
    if (value) {
      const item = mockFormData.find((item) => item.Item === value);
      if (item) {
        if (isNewRow) {
          setNewRowData((prev) => ({ ...prev, ...item }));
        } else if (rowIdx !== null) {
          setFormRows((prev) =>
            prev.map((row, idx) =>
              idx === rowIdx ? { ...item, SN: row.SN } : row
            )
          );
        }
      }
    }
    // Focus next input
    focusNextInput(rowIdx ?? -1, "Qty", isNewRow);
  };

  // Handle unit change
  const handleUnitChange = (
    rowIdx: number | null,
    value: string | null,
    isNewRow = false
  ) => {
    if (value) {
      if (isNewRow) {
        setNewRowData((prev) => ({ ...prev, Unit: value }));
      } else if (rowIdx !== null) {
        setFormRows((prev) =>
          prev.map((row, idx) =>
            idx === rowIdx ? { ...row, Unit: value } : row
          )
        );
      }
    }
    focusNextInput(rowIdx ?? -1, "Rate", isNewRow);
  };

  // Focus management
  const focusNextInput = (
    rowIdx: number,
    nextField: string,
    isNewRow = false
  ) => {
    const fieldIndex = FIELD_ORDER.indexOf(nextField);

    if (fieldIndex === LAST_FIELD_INDEX) {
      // Last field - add new row or move to next row
      if (isNewRow && newRowData.Item) {
        handleAddNewRow();
        return;
      } else if (!isNewRow && rowIdx < formRows.length - 1) {
        setFocusPosition({ rowIndex: rowIdx + 1, columnIndex: 0 });
        return;
      }
    }

    if (fieldIndex < LAST_FIELD_INDEX) {
      setFocusPosition({
        rowIndex: isNewRow ? -1 : rowIdx,
        columnIndex: fieldIndex + 1,
        isNewRow,
      });
    }
  };

  // Validate and add new row
  const validateNewRow = () => {
    if (!newRowData.Item || newRowData.Item.trim() === "") {
      setNewRowError("Item is required");
      setFocusPosition({ rowIndex: -1, columnIndex: 0, isNewRow: true });
      return false;
    }
    setNewRowError("");
    return true;
  };

  const handleAddNewRow = () => {
    if (!validateNewRow()) return;

    const newRow: FormValuesType = {
      SN: formRows.length + 1,
      Item: newRowData.Item || "",
      Description: newRowData.Description || "",
      Qty: newRowData.Qty || 0,
      Unit: newRowData.Unit || "",
      Rate: newRowData.Rate || 0,
      Disc: newRowData.Disc || 0,
      DiscAmt: 0,
      ExcludingVAT: 0,
      VAT: newRowData.VAT || 0,
      VATAmount: 0,
      IncludingVAT: 0,
    };

    const calculatedRow = calculateFields(newRow);
    setFormRows((prev) => [calculatedRow, ...prev]);
    setNewRowData({});

    // Clear input states for new row
    FIELD_ORDER.forEach((field) => {
      const key = getInputStateKey(-1, field, true);
      updateInputState(key, { hasChanged: false, originalValue: "" });
    });

    // Focus back to new row Item field
    setTimeout(() => {
      setFocusPosition({ rowIndex: -1, columnIndex: 0, isNewRow: true });
    }, 100);
  };

  // Remove row
  const handleRemoveRow = (rowIdx: number) => {
    setFormRows((prev) =>
      prev
        .filter((_, idx) => idx !== rowIdx)
        .map((row, idx) => ({ ...row, SN: idx + 1 }))
    );
  };

  // Clear new row
  const handleClearNewRow = () => {
    setNewRowData({});
    setNewRowError("");
    FIELD_ORDER.forEach((field) => {
      const key = getInputStateKey(-1, field, true);
      updateInputState(key, { hasChanged: false, originalValue: "" });
    });
    setFocusPosition(null);
  };

  // Set input ref
  const setInputRef = (
    key: string,
    element: HTMLInputElement | HTMLSelectElement | null
  ) => {
    inputRefs.current[key] = element;
  };

  // Focus effect
  useEffect(() => {
    if (focusPosition) {
      const { rowIndex, columnIndex, isNewRow } = focusPosition;
      const fieldName = FIELD_ORDER[columnIndex];
      const key = isNewRow
        ? `new-row-${fieldName}`
        : `${rowIndex}-${fieldName}`;
      const inputElement = inputRefs.current[key];

      if (inputElement) {
        setTimeout(() => {
          inputElement.focus();
        }, 50);
      }
    }
  }, [focusPosition]);

  // Handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent,
    rowIndex: number,
    columnIndex: number,
    isNewRow = false
  ) => {
    const { key } = event;

    if (key === "Enter") {
      event.preventDefault();

      if (isNewRow && columnIndex === 0) {
        if (!validateNewRow()) return;
      }

      if (columnIndex === LAST_FIELD_INDEX) {
        if (isNewRow) {
          handleAddNewRow();
        } else if (rowIndex < formRows.length - 1) {
          setFocusPosition({ rowIndex: rowIndex + 1, columnIndex: 0 });
        }
      } else {
        setFocusPosition({ rowIndex, columnIndex: columnIndex + 1, isNewRow });
      }
    }

    if (key === "Tab") {
      event.preventDefault();

      if (isNewRow && columnIndex === 0) {
        if (!validateNewRow()) return;
      }

      let newRowIndex = rowIndex;
      let newColumnIndex = columnIndex + 1;
      let newIsNewRow = isNewRow;

      if (newColumnIndex >= FIELD_ORDER.length) {
        newColumnIndex = 0;
        if (isNewRow) {
          newRowIndex = 0;
          newIsNewRow = false;
        } else {
          newRowIndex = rowIndex + 1;
        }
      }

      if (!newIsNewRow && newRowIndex >= formRows.length) {
        return;
      }

      setFocusPosition({
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex,
        isNewRow: newIsNewRow,
      });
    }

    if (key === "Escape") {
      if (isNewRow) {
        handleClearNewRow();
      } else {
        setFocusPosition(null);
      }
    }

    // Arrow navigation
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
      event.preventDefault();

      let newRowIndex = rowIndex;
      let newColumnIndex = columnIndex;
      let newIsNewRow = isNewRow;

      switch (key) {
        case "ArrowUp":
          if (isNewRow) return;
          newRowIndex = Math.max(0, rowIndex - 1);
          break;
        case "ArrowDown":
          if (isNewRow) {
            if (formRows.length > 0) {
              newRowIndex = 0;
              newIsNewRow = false;
            }
          } else {
            newRowIndex = Math.min(formRows.length - 1, rowIndex + 1);
          }
          break;
        case "ArrowLeft":
          newColumnIndex = Math.max(0, columnIndex - 1);
          break;
        case "ArrowRight":
          newColumnIndex = Math.min(FIELD_ORDER.length - 1, columnIndex + 1);
          break;
      }

      setFocusPosition({
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex,
        isNewRow: newIsNewRow,
      });
    }
  };

  // Handle input focus/blur
  const handleInputFocus = (
    rowIndex: number,
    field: string,
    isNewRow: boolean = false
  ) => {
    const columnIndex = FIELD_ORDER.indexOf(field);
    setFocusPosition({ rowIndex, columnIndex, isNewRow });

    const key = getInputStateKey(rowIndex, field, isNewRow);
    const currentValue = isNewRow
      ? newRowData[field as keyof FormValuesType] || ""
      : formRows[rowIndex]?.[field as keyof FormValuesType] || "";

    updateInputState(key, {
      isFocused: true,
      originalValue: inputStates[key]?.originalValue ?? String(currentValue),
    });
  };

  const handleInputBlur = (
    rowIndex: number,
    field: string,
    isNewRow: boolean = false
  ) => {
    setTimeout(() => {
      const key = getInputStateKey(rowIndex, field, isNewRow);
      updateInputState(key, { isFocused: false });
    }, 100);
  };

  // Clear input
  const handleClearInput = (
    rowIndex: number,
    field: string,
    isNewRow = false
  ) => {
    if (isNewRow) {
      handleNewRowChange(field, "");
    } else {
      handleChange(rowIndex, field, "");
    }
  };

  // Item creation
  const handleItemCreated = (newItem: any) => {
    console.log("New item created:", newItem);
  };

  // Calculate totals
  const totals = useMemo(() => {
    const netTotal = formRows.reduce((sum, row) => sum + row.IncludingVAT, 0);
    return { netTotal };
  }, [formRows]);

  return (
    <div className={`flex flex-col h-full ${className}`} ref={containerRef}>
      {/* Header */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <Text size="lg" fw={600} className="mb-1">
              Dynamic Input Table
            </Text>
            <Text size="sm" className="text-gray-600">
              Manage invoice line items with dynamic calculations
            </Text>
          </div>

          <div className="flex-shrink-0">
            <ShadcnButton
              size="sm"
              variant="outline"
              className="rounded-full w-32 h-10 gap-2"
              onClick={handleAddNewRow}
            >
              <Plus size={16} />
              <Text size="md" fw={500}>
                Add Row
              </Text>
            </ShadcnButton>
          </div>
        </div>
      </div>

      {/* Error message */}
      {newRowError && (
        <div className="flex-shrink-0 mb-2">
          <Text size="sm" className="text-red-600">
            {newRowError}
          </Text>
        </div>
      )}

      {/* Table Container */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1" type="auto" scrollbars="xy">
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            className="min-w-max relative"
          >
            <Table.Thead className="sticky top-0 z-10 bg-white">
              <Table.Tr>
                {columnConfig.map((column) => (
                  <Table.Th
                    key={column.id}
                    className="bg-gray-50"
                    style={{
                      minWidth: column.width,
                      width: column.width,
                      zIndex: 1,
                    }}
                  >
                    <div className="text-center">
                      <Text fw={600} size="sm">
                        {column.label}
                        {column.id === "Item" && (
                          <ActionIcon
                            size="xs"
                            variant="outline"
                            onClick={() => setIsAddItemModalOpen(true)}
                            className="ml-2 rounded-full"
                            title="Create Item"
                          >
                            <Plus size={12} />
                          </ActionIcon>
                        )}
                      </Text>
                    </div>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {/* New Row */}
              <Table.Tr className="bg-blue-50">
                {/* SN */}
                <Table.Td style={{ width: columnConfig[0].width }}>
                  <div className="flex items-center justify-center h-12">
                    <Text size="sm" fw={500}>
                      {formRows.length + 1}
                    </Text>
                  </div>
                </Table.Td>

                {/* Item */}
                <Table.Td style={{ width: columnConfig[1].width }}>
                  <Select
                    ref={(el) => setInputRef("new-row-Item", el)}
                    value={newRowData.Item || ""}
                    onChange={(value) => handleItemChange(null, value, true)}
                    onKeyDown={(event) => handleKeyDown(event, -1, 0, true)}
                    onFocus={() => handleInputFocus(-1, "Item", true)}
                    onBlur={() => handleInputBlur(-1, "Item", true)}
                    data={memoizedItemData}
                    placeholder="Select item..."
                    searchable
                    clearable
                    error={newRowError ? true : false}
                    styles={{
                      input: {
                        height: "48px",
                        fontSize: "14px",
                      },
                    }}
                  />
                </Table.Td>

                {/* Description */}
                <Table.Td style={{ width: columnConfig[2].width }}>
                  <TextInput
                    value={newRowData.Description || ""}
                    readOnly
                    styles={{
                      input: {
                        height: "48px",
                        fontSize: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  />
                </Table.Td>

                {/* Qty */}
                <Table.Td style={{ width: columnConfig[3].width }}>
                  <div className="relative">
                    <TextInput
                      ref={(el) => setInputRef("new-row-Qty", el)}
                      type="number"
                      value={newRowData.Qty?.toString() || ""}
                      onChange={(event) =>
                        handleNewRowChange("Qty", event.currentTarget.value)
                      }
                      onKeyDown={(event) => handleKeyDown(event, -1, 1, true)}
                      onFocus={() => handleInputFocus(-1, "Qty", true)}
                      onBlur={() => handleInputBlur(-1, "Qty", true)}
                      placeholder="0"
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          paddingRight: shouldShowCrossIcon(-1, "Qty", true)
                            ? "2rem"
                            : "0.75rem",
                        },
                      }}
                      rightSection={
                        shouldShowCrossIcon(-1, "Qty", true) && (
                          <ActionIcon
                            size="xs"
                            variant="subtle"
                            onClick={() => handleClearInput(-1, "Qty", true)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <X size={12} />
                          </ActionIcon>
                        )
                      }
                    />
                  </div>
                </Table.Td>

                {/* Unit */}
                <Table.Td style={{ width: columnConfig[4].width }}>
                  <Select
                    ref={(el) => setInputRef("new-row-Unit", el)}
                    value={newRowData.Unit || ""}
                    onChange={(value) => handleUnitChange(null, value, true)}
                    onKeyDown={(event) => handleKeyDown(event, -1, 2, true)}
                    onFocus={() => handleInputFocus(-1, "Unit", true)}
                    onBlur={() => handleInputBlur(-1, "Unit", true)}
                    data={memoizedUnitData}
                    placeholder="Unit"
                    searchable
                    clearable
                    styles={{
                      input: {
                        height: "48px",
                        fontSize: "14px",
                      },
                    }}
                  />
                </Table.Td>

                {/* Rate */}
                <Table.Td style={{ width: columnConfig[5].width }}>
                  <div className="relative">
                    <TextInput
                      ref={(el) => setInputRef("new-row-Rate", el)}
                      type="number"
                      value={newRowData.Rate?.toString() || ""}
                      onChange={(event) =>
                        handleNewRowChange("Rate", event.currentTarget.value)
                      }
                      onKeyDown={(event) => handleKeyDown(event, -1, 3, true)}
                      onFocus={() => handleInputFocus(-1, "Rate", true)}
                      onBlur={() => handleInputBlur(-1, "Rate", true)}
                      placeholder="0.00"
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          paddingRight: shouldShowCrossIcon(-1, "Rate", true)
                            ? "2rem"
                            : "0.75rem",
                        },
                      }}
                      rightSection={
                        shouldShowCrossIcon(-1, "Rate", true) && (
                          <ActionIcon
                            size="xs"
                            variant="subtle"
                            onClick={() => handleClearInput(-1, "Rate", true)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <X size={12} />
                          </ActionIcon>
                        )
                      }
                    />
                  </div>
                </Table.Td>

                {/* Including VAT */}
                <Table.Td style={{ width: columnConfig[6].width }}>
                  <TextInput
                    value={
                      newRowData.IncludingVAT?.toFixed(2) ||
                      (
                        (newRowData.Qty || 0) *
                        (newRowData.Rate || 0) *
                        1.15
                      ).toFixed(2)
                    }
                    readOnly
                    styles={{
                      input: {
                        height: "48px",
                        fontSize: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  />
                </Table.Td>

                {/* Actions */}
                <Table.Td style={{ width: columnConfig[7].width }}>
                  <div
                    className="flex justify-center"
                    onMouseEnter={() => setHoveredActionCell("new-row")}
                    onMouseLeave={() => setHoveredActionCell(null)}
                  >
                    <ActionIcon
                      variant="subtle"
                      color={hoveredActionCell === "new-row" ? "red" : "dark"}
                      size="sm"
                      onClick={handleClearNewRow}
                      className={
                        hoveredActionCell === "new-row"
                          ? "hover:bg-red-50 text-red-600 rounded-full"
                          : "text-gray-600 hover:bg-gray-50 rounded-full"
                      }
                    >
                      <X size={16} />
                    </ActionIcon>
                  </div>
                </Table.Td>
              </Table.Tr>

              {/* Existing Rows */}
              {formRows.map((row, rowIndex) => (
                <Table.Tr key={row.SN}>
                  {/* SN */}
                  <Table.Td style={{ width: columnConfig[0].width }}>
                    <div className="flex items-center justify-center h-12">
                      <Text size="sm" fw={500}>
                        {row.SN}
                      </Text>
                    </div>
                  </Table.Td>

                  {/* Item */}
                  <Table.Td style={{ width: columnConfig[1].width }}>
                    <TextInput
                      value={row.Item}
                      readOnly
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    />
                  </Table.Td>

                  {/* Description */}
                  <Table.Td style={{ width: columnConfig[2].width }}>
                    <TextInput
                      value={row.Description}
                      readOnly
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    />
                  </Table.Td>

                  {/* Qty */}
                  <Table.Td style={{ width: columnConfig[3].width }}>
                    <TextInput
                      value={row.Qty?.toString() || ""}
                      readOnly
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    />
                  </Table.Td>

                  {/* Unit */}
                  <Table.Td style={{ width: columnConfig[4].width }}>
                    <TextInput
                      value={row.Unit}
                      readOnly
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    />
                  </Table.Td>

                  {/* Rate */}
                  <Table.Td style={{ width: columnConfig[5].width }}>
                    <TextInput
                      value={row.Rate?.toString() || ""}
                      readOnly
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    />
                  </Table.Td>

                  {/* Including VAT */}
                  <Table.Td style={{ width: columnConfig[6].width }}>
                    <TextInput
                      value={row.IncludingVAT.toFixed(2)}
                      readOnly
                      styles={{
                        input: {
                          height: "48px",
                          fontSize: "14px",
                          backgroundColor: "#f8f9fa",
                        },
                      }}
                    />
                  </Table.Td>

                  {/* Actions */}
                  <Table.Td style={{ width: columnConfig[7].width }}>
                    <div
                      className="flex justify-center"
                      onMouseEnter={() =>
                        setHoveredActionCell(`row-${rowIndex}`)
                      }
                      onMouseLeave={() => setHoveredActionCell(null)}
                    >
                      <ActionIcon
                        variant="subtle"
                        color={
                          hoveredActionCell === `row-${rowIndex}`
                            ? "red"
                            : "dark"
                        }
                        size="sm"
                        onClick={() => handleRemoveRow(rowIndex)}
                        className={
                          hoveredActionCell === `row-${rowIndex}`
                            ? "hover:bg-red-50 text-red-600 rounded-full"
                            : "text-gray-600 hover:bg-gray-50 rounded-full"
                        }
                      >
                        <X size={16} />
                      </ActionIcon>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>

      {/* Total Summary - Fixed at bottom */}
      <div className="flex-shrink-0 mt-4">
        <div
          className="flex justify-end items-center h-[60px] gap-4 p-4 bg-gray-50 dark:bg-gray-800 border rounded-lg"
          style={{
            minWidth: "900px",
            width: "100%",
          }}
        >
          <div className="text-sm font-bold bg-blue-100 dark:bg-blue-900 p-3 rounded shadow-sm">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              Net Total:{" "}
            </span>
            <span className="text-blue-800 dark:text-blue-200 text-lg">
              {totals.netTotal.toFixed(2)} SAR
            </span>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onSave={handleItemCreated}
      />
    </div>
  );
};

export default OptimizedDynamicInputTable;
