/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { Button } from "@mantine/core";
import { Autocomplete, TextInput } from "@mantine/core";
import { Trash2, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import AddItemModal from "../AddItemModal";

export interface TableRowData {
  id: string;
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
}

interface DynamicTableProps {
  isEdit?: boolean;
  maxVisibleRows?: number;
}

// Static data
const ITEM_OPTIONS = [
  {
    value: "Laptop",
    label: "Laptop",
    description: "Dell Inspiron 15",
    rate: 100,
    vat: 15,
  },
  {
    value: "Monitor",
    label: "Monitor",
    description: "HP 24-inch FHD",
    rate: 15000,
    vat: 7.5,
  },
  {
    value: "Mouse",
    label: "Mouse",
    description: "Logitech Wireless",
    rate: 1200,
    vat: 5,
  },
  {
    value: "Keyboard",
    label: "Keyboard",
    description: "A4Tech Mechanical",
    rate: 3500,
    vat: 5,
  },
  {
    value: "Desk",
    label: "Desk",
    description: "Wooden Office Desk",
    rate: 8000,
    vat: 10,
  },
  {
    value: "Chair",
    label: "Chair",
    description: "Ergonomic Mesh Chair",
    rate: 7500,
    vat: 10,
  },
  {
    value: "Pen Drive",
    label: "Pen Drive",
    description: "SanDisk 64GB",
    rate: 800,
    vat: 5,
  },
  {
    value: "Printer",
    label: "Printer",
    description: "Canon Inkjet",
    rate: 18000,
    vat: 7.5,
  },
  {
    value: "UPS",
    label: "UPS",
    description: "APC 650VA",
    rate: 5000,
    vat: 7.5,
  },
  {
    value: "Webcam",
    label: "Webcam",
    description: "Logitech C920",
    rate: 5500,
    vat: 7.5,
  },
];

const UNIT_OPTIONS = [
  { value: "pcs", label: "pcs" },
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "ml", label: "ml" },
  { value: "l", label: "l" },
  { value: "box", label: "box" },
  { value: "bag", label: "bag" },
  { value: "carton", label: "carton" },
  { value: "piece", label: "piece" },
];

const TABLE_HEADERS = [
  { id: "sn", label: "SN", width: "60px" },
  { id: "item", label: "Item", width: "150px" },
  { id: "description", label: "Description", width: "200px" },
  { id: "qty", label: "Qty", width: "80px" },
  { id: "unit", label: "Unit", width: "100px" },
  { id: "rate", label: "Rate", width: "100px" },
  { id: "includingVat", label: "Including VAT", width: "120px" },
  { id: "action", label: "Action", width: "80px" },
];

const createEmptyRow = (sn: number): TableRowData => ({
  id: `row-${Date.now()}-${sn}`,
  SN: sn,
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
});

const calculateRowValues = (row: Partial<TableRowData>): TableRowData => {
  const { Qty = 0, Rate = 0, Disc = 0, VAT = 0 } = row;
  const total = Qty * Rate;
  const DiscAmt = Number(((total * Disc) / 100).toFixed(2));
  const ExcludingVAT = Number((total - DiscAmt).toFixed(2));
  const VATAmount = Number(((ExcludingVAT * VAT) / 100).toFixed(2));
  const IncludingVAT = Number((ExcludingVAT + VATAmount).toFixed(2));

  return {
    ...row,
    DiscAmt,
    ExcludingVAT,
    VATAmount,
    IncludingVAT,
  } as TableRowData;
};

export default function DynamicTable({
  isEdit = false,
  maxVisibleRows = 8,
}: DynamicTableProps) {
  const { t } = useTranslation();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [discountType, setDiscountType] = useState<"amount" | "percentage">(
    "percentage"
  );
  const [discount, setDiscount] = useState<number>(0);

  // Initialize with one empty row or edit data
  const [rows, setRows] = useState<TableRowData[]>(() => {
    if (isEdit) {
      return [
        calculateRowValues({
          id: "row-edit-1",
          SN: 1,
          Item: "Laptop",
          Description: "Dell Inspiron 15",
          Qty: 1,
          Unit: "pcs",
          Rate: 100,
          VAT: 15,
        }),
      ];
    }
    return [createEmptyRow(1)];
  });

  // Memoize static options to prevent recreations
  const itemOptions = useMemo(() => ITEM_OPTIONS, []);
  const unitOptions = useMemo(() => UNIT_OPTIONS, []);

  // Update a specific row
  const updateRow = useCallback(
    (rowId: string, updates: Partial<TableRowData>) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId ? calculateRowValues({ ...row, ...updates }) : row
        )
      );
    },
    []
  );

  // Handle item selection - auto-fill related fields
  const handleItemChange = useCallback(
    (rowId: string, itemValue: string | null) => {
      if (itemValue) {
        const selectedItem = itemOptions.find(
          (item) => item.value === itemValue
        );
        if (selectedItem) {
          updateRow(rowId, {
            Item: selectedItem.value,
            Description: selectedItem.description,
            Rate: selectedItem.rate,
            VAT: selectedItem.vat,
            Unit: selectedItem.value === "Laptop" ? "pcs" : "", // Default unit for some items
          });
        }
      } else {
        updateRow(rowId, { Item: "", Description: "", Rate: 0, VAT: 0 });
      }
    },
    [itemOptions, updateRow]
  );

  // Add new row
  const addRow = useCallback(() => {
    const newRow = createEmptyRow(rows.length + 1);
    setRows((prevRows) => [...prevRows, newRow]);
  }, [rows.length]);

  // Remove row
  const removeRow = useCallback((rowId: string) => {
    setRows((prevRows) => {
      const filtered = prevRows.filter((row) => row.id !== rowId);
      // Renumber SN
      return filtered.map((row, index) => ({ ...row, SN: index + 1 }));
    });
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, rowId: string, field: string) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const currentRowIndex = rows.findIndex((row) => row.id === rowId);

        // Move to next field or next row
        if (field === "IncludingVAT" || field === "Rate") {
          // Last field - add new row if this is the last row
          if (currentRowIndex === rows.length - 1) {
            addRow();
          }
          // Focus next row's first field
          setTimeout(() => {
            const nextRowIndex = currentRowIndex + 1;
            if (
              nextRowIndex < rows.length ||
              currentRowIndex === rows.length - 1
            ) {
              const nextInput = document.querySelector(
                `input[data-row="${nextRowIndex}"][data-field="Item"]`
              ) as HTMLInputElement;
              nextInput?.focus();
            }
          }, 50);
        }
      }
    },
    [rows, addRow]
  );

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = rows.reduce((sum, row) => sum + row.Qty * row.Rate, 0);
    let discountAmount = 0;

    if (discountType === "percentage") {
      discountAmount = (subtotal * discount) / 100;
    } else {
      discountAmount = Math.min(discount, subtotal);
    }

    const totalAfterDiscount = subtotal - discountAmount;
    const totalVAT = rows.reduce((sum, row) => sum + row.VATAmount, 0);
    const netTotal = totalAfterDiscount + totalVAT;

    return {
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      totalVAT: totalVAT.toFixed(2),
      netTotal: netTotal.toFixed(2),
    };
  }, [rows, discount, discountType]);

  // Handle new item creation
  const handleItemCreated = useCallback((newItem: any) => {
    console.log("New item created:", newItem);
  }, []);

  const containerHeight = Math.min(
    rows.length * 60 + 100,
    maxVisibleRows * 60 + 100
  );

  return (
    <div className="w-full">
      {/* Add Row Button */}
      <div className="mb-4">
        <Button onClick={addRow} className="h-12">
          <Plus className="mr-2 h-4 w-4" />
          {t("common.addRow")}
        </Button>
      </div>

      {/* Table Container */}
      <div
        className="border rounded-lg overflow-auto bg-white dark:bg-gray-900"
        style={{ height: `${containerHeight}px`, maxHeight: "400px" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 border-b">
          <div
            className="grid gap-1 p-2"
            style={{
              gridTemplateColumns: TABLE_HEADERS.map((h) => h.width).join(" "),
              minWidth: "900px",
            }}
          >
            {TABLE_HEADERS.map((header) => (
              <div
                key={header.id}
                className="font-semibold text-sm text-center p-2 border-r border-gray-300 dark:border-gray-600 last:border-r-0"
              >
                {header.id === "item" ? (
                  <div className="flex items-center justify-between">
                    <span>{header.label}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddItemModalOpen(true)}
                      className="h-6 w-6 p-0 ml-2"
                      title="Create Item"
                    >
                      <Plus size={12} />
                    </Button>
                  </div>
                ) : (
                  header.label
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div style={{ minWidth: "900px" }}>
          {rows.map((row, rowIndex) => (
            <div
              key={row.id}
              className="grid gap-1 p-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              style={{
                gridTemplateColumns: TABLE_HEADERS.map((h) => h.width).join(
                  " "
                ),
              }}
            >
              {/* Serial Number */}
              <div className="flex items-center justify-center p-1">
                <span className="text-sm font-medium">{row.SN}</span>
              </div>

              {/* Item */}
              <div className="p-1">
                <Autocomplete
                  data={itemOptions.map((item) => ({
                    value: item.value,
                    label: item.label,
                  }))}
                  value={row.Item}
                  onChange={(value) => handleItemChange(row.id, value)}
                  placeholder="Select item"
                  size="sm"
                  styles={{ input: { height: "32px", fontSize: "12px" } }}
                  onKeyDown={(e) => handleKeyDown(e, row.id, "Item")}
                  data-row={rowIndex}
                  data-field="Item"
                />
              </div>

              {/* Description */}
              <div className="p-1">
                <TextInput
                  value={row.Description}
                  onChange={(e) =>
                    updateRow(row.id, { Description: e.target.value })
                  }
                  placeholder="Description"
                  size="sm"
                  styles={{ input: { height: "32px", fontSize: "12px" } }}
                  onKeyDown={(e) => handleKeyDown(e, row.id, "Description")}
                />
              </div>

              {/* Quantity */}
              <div className="p-1">
                <TextInput
                  type="number"
                  value={row.Qty || ""}
                  onChange={(e) =>
                    updateRow(row.id, { Qty: Number(e.target.value) || 0 })
                  }
                  placeholder="0"
                  size="sm"
                  styles={{ input: { height: "32px", fontSize: "12px" } }}
                  onKeyDown={(e) => handleKeyDown(e, row.id, "Qty")}
                />
              </div>

              {/* Unit */}
              <div className="p-1">
                <Autocomplete
                  data={unitOptions}
                  value={row.Unit}
                  onChange={(value) => updateRow(row.id, { Unit: value || "" })}
                  placeholder="Unit"
                  size="sm"
                  styles={{ input: { height: "32px", fontSize: "12px" } }}
                  onKeyDown={(e) => handleKeyDown(e, row.id, "Unit")}
                />
              </div>

              {/* Rate */}
              <div className="p-1">
                <TextInput
                  type="number"
                  value={row.Rate || ""}
                  onChange={(e) =>
                    updateRow(row.id, { Rate: Number(e.target.value) || 0 })
                  }
                  placeholder="0.00"
                  size="sm"
                  styles={{ input: { height: "32px", fontSize: "12px" } }}
                  onKeyDown={(e) => handleKeyDown(e, row.id, "Rate")}
                />
              </div>

              {/* Including VAT (calculated) */}
              <div className="flex items-center justify-center p-1">
                <span className="text-sm font-medium">
                  {row.IncludingVAT.toFixed(2)}
                </span>
              </div>

              {/* Action */}
              <div className="flex items-center justify-center p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRow(row.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  disabled={rows.length === 1}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals Section */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="text-sm">
            <strong>Subtotal: </strong>
            <span className="text-blue-600 font-semibold">
              {totals.subtotal} SAR
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Discount:</span>
            <select
              value={discountType}
              onChange={(e) =>
                setDiscountType(e.target.value as "amount" | "percentage")
              }
              className="border rounded p-1 text-xs"
            >
              <option value="amount">SAR</option>
              <option value="percentage">%</option>
            </select>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value) || 0)}
              className="w-20 border rounded p-1 text-xs"
              placeholder="0"
              min="0"
            />
          </div>

          <div className="text-sm">
            <strong>After Discount: </strong>
            <span className="text-green-600 font-semibold">
              {totals.totalAfterDiscount} SAR
            </span>
          </div>

          <div className="text-sm">
            <strong>Total VAT: </strong>
            <span className="text-orange-600 font-semibold">
              {totals.totalVAT} SAR
            </span>
          </div>

          <div className="text-sm font-bold bg-blue-100 dark:bg-blue-900 p-2 rounded">
            <strong>Net Total: </strong>
            <span className="text-blue-800 dark:text-blue-200">
              {totals.netTotal} SAR
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
}
