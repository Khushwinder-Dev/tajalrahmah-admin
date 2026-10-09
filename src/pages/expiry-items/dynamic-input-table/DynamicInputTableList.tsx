/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@mantine/core";
import { FixedSizeList as List } from "react-window";
import VirtualizedInputRow from "./VirtualizedInputRow";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import AddItemModal from "./AddItemModal";

export type FormValuesType = {
  SN: number;
  batchNumber: string;
  itemName: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  unitCost: number;
  status: "Expired" | "Near Expiry" | "Warning" | "Good";
  daysUntilExpiry: number;
  totalValue: number;
};

// table header constant data
const TableHeaderData = [
  {
    id: "SN",
    label: "SN",
  },
  {
    id: "ITEM_NAME",
    label: "Item Name",
  },
  {
    id: "BATCH_NUMBER",
    label: "Batch Number",
  },
  {
    id: "EXPIRY_DATE",
    label: "Expiry Date",
  },
  {
    id: "QUANTITY",
    label: "Quantity",
  },
  {
    id: "UNIT",
    label: "Unit",
  },
  {
    id: "UNIT_COST",
    label: "Unit Cost",
  },
  {
    id: "STATUS",
    label: "Status",
  },
  {
    id: "Action",
    label: "Action",
  },
];

// Calculate days until expiry
const calculateDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Calculate status based on days until expiry
const calculateStatus = (
  daysUntilExpiry: number
): "Expired" | "Near Expiry" | "Warning" | "Good" => {
  if (daysUntilExpiry < 0) return "Expired";
  if (daysUntilExpiry <= 2) return "Near Expiry";
  if (daysUntilExpiry <= 7) return "Warning";
  return "Good";
};

// Mock form data is no longer needed since we're using manual input fields

// Item Data :: For Item Select and Auto-fill
const ItemData = [
  {
    id: "item1",
    label: "Fresh Milk 1L",
    batchNumber: "MLK001",
    unit: "bottles",
    unitCost: 3.99,
  },
  {
    id: "item2",
    label: "Brown Bread",
    batchNumber: "BRD002",
    unit: "loaves",
    unitCost: 2.5,
  },
  // Add more items as needed
];

// Item Data is no longer needed since we're using text input for item name

// Unit Data :: Unit Select Field
const UnitData = [
  { value: "bottles", label: "bottles", id: "bottles" },
  { value: "cups", label: "cups", id: "cups" },
  { value: "loaves", label: "loaves", id: "loaves" },
  { value: "kg", label: "kg", id: "kg" },
  { value: "g", label: "g", id: "g" },
  { value: "cans", label: "cans", id: "cans" },
  { value: "packs", label: "packs", id: "packs" },
  { value: "bags", label: "bags", id: "bags" },
  { value: "pieces", label: "pieces", id: "pieces" },
  { value: "ml", label: "ml", id: "ml" },
  { value: "l", label: "l", id: "l" },
  { value: "box", label: "box", id: "box" },
];

const initialRow: FormValuesType = {
  SN: 1,
  batchNumber: "",
  itemName: "",
  expiryDate: "",
  quantity: 0,
  unit: "",
  unitCost: 0,
  status: "Good",
  daysUntilExpiry: 0,
  totalValue: 0,
};

// Edit Row Data :: Edit Row :: For Edit Mode
const initialEditRow: FormValuesType[] = [
  {
    SN: 1,
    batchNumber: "MLK001",
    itemName: "Fresh Milk 1L",
    expiryDate: "2024-02-15",
    quantity: 24,
    unit: "bottles",
    unitCost: 3.99,
    status: calculateStatus(calculateDaysUntilExpiry("2024-02-15")),
    daysUntilExpiry: calculateDaysUntilExpiry("2024-02-15"),
    totalValue: 24 * 3.99,
  },
];

type Props = {
  isEdit?: boolean;
};

const DynamicInputTableList = ({ isEdit = false }: Props) => {
  const [formRows, setFormRows] = useState<FormValuesType[]>(
    isEdit ? initialEditRow : [initialRow]
  );
  const [discountType, setDiscountType] = useState<"amount" | "percentage">(
    "amount"
  );
  const [discount, setDiscount] = useState<number>(0);

  const memoizedUnitData = useMemo(() => [...UnitData], []);
  const memoizedHeaderData = useMemo(() => [...TableHeaderData], []);
  const { t } = useTranslation();

  // calculate row fields
  const calculateFields = useCallback(
    (data: FormValuesType): FormValuesType => {
      const { quantity, unitCost, expiryDate } = data;
      const totalValue = quantity * unitCost;
      const daysUntilExpiry = calculateDaysUntilExpiry(expiryDate);
      const status = calculateStatus(daysUntilExpiry);

      return {
        ...data,
        totalValue: Number(totalValue.toFixed(2)),
        daysUntilExpiry,
        status,
      };
    },
    []
  );

  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const LAST_FIELD = "status";
  const FIRST_FIELD = "itemName";
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleItemCreated = (newItem: any) => {
    console.log("New item created:", newItem);
    // Here you can add logic to add the item to your items list
    // or refresh the items from your API
  };

  const handleAddRowAndFocus = () => {
    const lastRow = formRows[formRows.length - 1];
    if (!lastRow.itemName || lastRow.itemName.trim() === "") {
      if (listRef.current) {
        listRef.current.scrollToItem(formRows.length - 1, "center");
      }
      setTimeout(() => {
        inputRefs.current[`${formRows.length - 1}_${FIRST_FIELD}`]?.focus();
      }, 50);
      return;
    }
    setFormRows((prev) => [
      ...prev,
      {
        SN: prev.length + 1,
        batchNumber: "",
        itemName: "",
        expiryDate: "",
        quantity: 0,
        unit: "",
        unitCost: 0,
        status: "Good",
        daysUntilExpiry: 0,
        totalValue: 0,
      },
    ]);
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToItem(formRows.length, "center");
      }
      setTimeout(() => {
        inputRefs.current[`${formRows.length}_${FIRST_FIELD}`]?.focus();
      }, 50);
    }, 0);
  };

  const handleAddRow = () => {
    setFormRows((prev) => [...prev, { ...initialRow, SN: prev.length + 1 }]);
  };

  const setRef = (rowIdx: number, name: string) => (el: HTMLElement | null) => {
    inputRefs.current[`${rowIdx}_${name}`] = el;
  };

  const focusNextInput = (rowIdx: number, nextField: string) => {
    if (nextField !== LAST_FIELD) {
      if (listRef.current) {
        listRef.current.scrollToItem(rowIdx, "center");
      }
      setTimeout(() => {
        inputRefs.current[`${rowIdx}_${nextField}`]?.focus();
      }, 50);
    } else {
      handleAddRowAndFocus();
    }
  };

  const handleChange = useCallback(
    (
      rowIdx: number,
      e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
    ) => {
      // Type guard for Select (itemName)
      if (
        typeof e === "object" &&
        "name" in e &&
        "value" in e &&
        typeof e.value === "string"
      ) {
        const { name, value } = e;
        if (name === "itemName") {
          const selectedItem = ItemData.find(
            (item) => item.label === value || item.id === value
          );
          setFormRows((prev) => {
            const updatedRow = {
              ...prev[rowIdx],
              itemName: selectedItem ? selectedItem.label : value,
              batchNumber: selectedItem ? selectedItem.batchNumber : "",
              unit: selectedItem ? selectedItem.unit : "",
              unitCost: selectedItem ? selectedItem.unitCost : 0,
            };
            const calculated = calculateFields(updatedRow);
            const newRows = [...prev];
            newRows[rowIdx] = calculated;
            return newRows;
          });
          return;
        }
      }
      // Otherwise, treat as input event
      if ("target" in e) {
        const { name, value, type } = e.target;
        let parsedValue: any = value;
        if (type === "number") {
          parsedValue = value === "" ? "" : Number(value);
        }
        setFormRows((prev) => {
          const updatedRow = {
            ...prev[rowIdx],
            [name]: parsedValue,
          };
          const calculated = calculateFields(updatedRow);
          const newRows = [...prev];
          newRows[rowIdx] = calculated;
          return newRows;
        });
      }
    },
    [calculateFields]
  );

  // handleItemChange is no longer needed since we're using text input for item name

  const handleUnitChange = (rowIdx: number, value: string | null) => {
    if (value) {
      setFormRows((prev) =>
        prev.map((row, idx) =>
          idx === rowIdx ? { ...row, Unit: value ?? "" } : row
        )
      );
    }
    focusNextInput(rowIdx, "Rate");
  };

  const handleRemoveRow = (rowIdx: number) => {
    setFormRows((prev) =>
      prev
        .filter((_, idx) => idx !== rowIdx)
        .map((row, idx) => ({ ...row, SN: idx + 1 }))
    );
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<any>(null); // keep for vertical/row scroll if needed

  return (
    <>
      <div className="relative">
        <Button
          variant="filled"
          className="my-4 h-[50px] rounded-full! bg-sky-500! hover:bg-sky-400! shadow!"
          onClick={formRows.length > 0 ? handleAddRowAndFocus : handleAddRow}
        >
          {t("common.addRow")}
        </Button>

        {/* Single scroll container for both header and rows */}
        <div className="overflow-auto border rounded-lg h-[250px] grid-scroll">
          {/* Sticky header */}
          <div
            className="grid sticky top-0 z-20 h-[50px] bg-gray-100 dark:bg-gray-900 gap-[1px]"
            style={{
              gridTemplateColumns: `repeat(${
                TableHeaderData?.length || 13
              }, minmax(100px, 1fr))`,
              width: "100%",
              minWidth: "1300px",
            }}
            ref={headerRef}
          >
            {TableHeaderData?.map((item) => (
              <div
                className="text-sm font-semibold items-center justify-center flex border-r border-gray-300 dark:border-gray-600 last:border-r-0 px-2"
                key={item.id}
              >
                {/* Check if this is the Item Name column and add the button */}
                {item.label.toLowerCase() === "item name" ? (
                  <div className="flex items-center justify-between w-full px-1">
                    <span className="text-xs font-semibold truncate">
                      {item.label}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddItemModalOpen(true)}
                      className="h-5 w-5 p-0 bg-sky-500! rounded-full! hover:bg-sky-400! ml-1 shadow! flex-shrink-0"
                      title="Create Item"
                    >
                      <Plus size={12} className="text-blue-50 font-bold!" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs font-semibold">{item.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Rows container */}
          <div style={{ minWidth: "1300px", width: "100%" }}>
            <List
              ref={listRef}
              height={200}
              itemCount={formRows.length}
              itemSize={76}
              width="100%"
              style={{ overflow: "visible" }}
              itemData={{
                formRows,
                setRef,
                handleChange,
                handleUnitChange,
                handleRemoveRow,
                focusNextInput,
                UnitData: memoizedUnitData,
                TableHeaderData: memoizedHeaderData,
                ItemData, // Pass ItemData for select
              }}
            >
              {VirtualizedInputRow}
            </List>
          </div>
        </div>

        {/* Total Summary */}
        <div
          className="grid items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 border-t mt-4 rounded-lg"
          style={{
            gridTemplateColumns: "1fr auto 1fr 1fr 1fr",
            minWidth: "1300px",
            width: "100%",
          }}
        >
          <div className="text-sm font-medium">
            Total Value:{" "}
            <span className="font-semibold text-blue-600">
              {formRows
                .reduce((sum, row) => {
                  const rowTotal = row.quantity * row.unitCost;
                  return sum + rowTotal;
                }, 0)
                .toFixed(2)}{" "}
              SAR
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm bg-white dark:bg-gray-700 p-2 rounded-full border">
            <span className="font-medium">Discount:</span>
            <select
              name="discount_type"
              id="discount_type"
              value={discountType}
              onChange={(e) =>
                setDiscountType(e.target.value as "amount" | "percentage")
              }
              className="border rounded-full p-1 text-xs min-w-[40px]"
            >
              <option value="amount">$</option>
              <option value="percentage">%</option>
            </select>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value) || 0)}
              className="w-20 border rounded-full p-1 text-xs"
              min="0"
              step={discountType === "percentage" ? "0.01" : "1"}
              max={discountType === "percentage" ? "100" : undefined}
              placeholder="0"
            />
            {discountType === "percentage" && (
              <span className="text-xs">%</span>
            )}
          </div>

          {(() => {
            const subtotal = formRows.reduce(
              (sum, row) => sum + row.quantity * row.unitCost,
              0
            );
            let discountAmount = 0;

            if (discountType === "percentage") {
              discountAmount = (subtotal * discount) / 100;
            } else {
              discountAmount = Math.min(discount, subtotal);
            }

            const totalAfterDiscount = subtotal - discountAmount;
            const vatAmount = totalAfterDiscount * 0.15; // Assuming 15% VAT
            const netTotal = totalAfterDiscount + vatAmount;

            return (
              <>
                <div className="text-sm font-medium">
                  Total After Discount:{" "}
                  <span className="font-semibold text-green-600">
                    {totalAfterDiscount.toFixed(2)} SAR
                  </span>
                </div>
                <div className="text-sm font-medium">
                  Total VAT (15%):{" "}
                  <span className="font-semibold text-orange-600">
                    {vatAmount.toFixed(2)} SAR
                  </span>
                </div>
                <div className="text-sm font-bold bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  Net Total:{" "}
                  <span className="text-blue-800 dark:text-blue-200">
                    {netTotal.toFixed(2)} SAR
                  </span>
                </div>
              </>
            );
          })()}
          <AddItemModal
            isOpen={isAddItemModalOpen}
            onClose={() => setIsAddItemModalOpen(false)}
            onSave={handleItemCreated}
          />
        </div>
      </div>
    </>
  );
};

export default DynamicInputTableList;
