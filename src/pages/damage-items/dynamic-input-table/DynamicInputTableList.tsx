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

// table header constant data
const TableHeaderData = [
  {
    id: "SN",
    label: "SN",
  },
  {
    id: "ITEM",
    label: "Item",
  },
  {
    id: "DESCRIPTION",
    label: "Description",
  },
  {
    id: "Qty",
    label: "Qty",
  },
  {
    id: "Unit",
    label: "Unit",
  },
  {
    id: "Rate",
    label: "Rate",
  },

  {
    id: "IncludingVAT",
    label: "Including VAT",
  },
  {
    id: "Action",
    label: "Action",
  },
];

// mock form data
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
  {
    SN: 4,
    Item: "Keyboard",
    Description: "A4Tech Mechanical",
    Qty: 4,
    Unit: "pcs",
    Rate: 3500,
    Disc: 5,
    DiscAmt: 700.0,
    ExcludingVAT: 13300.0,
    VAT: 5,
    VATAmount: 665.0,
    IncludingVAT: 13965.0,
  },
  {
    SN: 5,
    Item: "Desk",
    Description: "Wooden Office Desk",
    Qty: 2,
    Unit: "pcs",
    Rate: 8000,
    Disc: 0,
    DiscAmt: 0.0,
    ExcludingVAT: 16000.0,
    VAT: 10,
    VATAmount: 1600.0,
    IncludingVAT: 17600.0,
  },
  {
    SN: 6,
    Item: "Chair",
    Description: "Ergonomic Mesh Chair",
    Qty: 2,
    Unit: "pcs",
    Rate: 7500,
    Disc: 5,
    DiscAmt: 750.0,
    ExcludingVAT: 14250.0,
    VAT: 10,
    VATAmount: 1425.0,
    IncludingVAT: 15675.0,
  },
  {
    SN: 7,
    Item: "Pen Drive",
    Description: "SanDisk 64GB",
    Qty: 10,
    Unit: "pcs",
    Rate: 800,
    Disc: 0,
    DiscAmt: 0.0,
    ExcludingVAT: 8000.0,
    VAT: 5,
    VATAmount: 400.0,
    IncludingVAT: 8400.0,
  },
  {
    SN: 8,
    Item: "Printer",
    Description: "Canon Inkjet",
    Qty: 1,
    Unit: "pcs",
    Rate: 18000,
    Disc: 10,
    DiscAmt: 1800.0,
    ExcludingVAT: 16200.0,
    VAT: 7.5,
    VATAmount: 1215.0,
    IncludingVAT: 17415.0,
  },
  {
    SN: 9,
    Item: "UPS",
    Description: "APC 650VA",
    Qty: 2,
    Unit: "pcs",
    Rate: 5000,
    Disc: 5,
    DiscAmt: 500.0,
    ExcludingVAT: 9500.0,
    VAT: 7.5,
    VATAmount: 712.5,
    IncludingVAT: 10212.5,
  },
  {
    SN: 10,
    Item: "Webcam",
    Description: "Logitech C920",
    Qty: 3,
    Unit: "pcs",
    Rate: 5500,
    Disc: 10,
    DiscAmt: 1650.0,
    ExcludingVAT: 14850.0,
    VAT: 7.5,
    VATAmount: 1113.75,
    IncludingVAT: 15963.75,
  },
];

// Item Data :: Item Select Field
const ItemData = mockFormData.map((item) => ({
  value: item.Item,
  label: item.Item,
  id: item.Item,
}));

// Unit Data :: Unit Select Field
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

// Edit Row Data :: Edit Row :: For Edit Mode
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
};

const DynamicInputTableList = ({ isEdit = false }: Props) => {
  const [formRows, setFormRows] = useState<FormValuesType[]>(
    isEdit ? initialEditRow : [initialRow]
  );
  const [discountType, setDiscountType] = useState<"amount" | "percentage">(
    "amount"
  );
  const [discount, setDiscount] = useState<number>(0);

  const memoizedItemData = useMemo(() => [...ItemData], []);
  const memoizedUnitData = useMemo(() => [...UnitData], []);
  const memoizedHeaderData = useMemo(() => [...TableHeaderData], []);
  const { t } = useTranslation();

  // calculate row fields
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

  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const LAST_FIELD = "IncludingVAT";
  const FIRST_FIELD = "Item";
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleItemCreated = (newItem: any) => {
    console.log("New item created:", newItem);
    // Here you can add logic to add the item to your items list
    // or refresh the items from your API
  };

  const handleAddRowAndFocus = () => {
    const lastRow = formRows[formRows.length - 1];
    if (!lastRow.Item || lastRow.Item.trim() === "") {
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
    (rowIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newValue =
        name === "Qty" || name === "Rate" || name === "Disc" || name === "VAT"
          ? parseFloat(value) || 0
          : value;
      setFormRows((prev) => {
        const updatedRow = {
          ...prev[rowIdx],
          [name]: newValue,
        };
        const calculated = calculateFields(updatedRow);
        const newRows = [...prev];
        newRows[rowIdx] = calculated;
        return newRows;
      });
    },
    [calculateFields]
  );

  const handleItemChange = (rowIdx: number, value: string | null) => {
    if (value) {
      const item = mockFormData.find((item) => item.Item === value);
      if (item) {
        setFormRows((prev) =>
          prev.map((row, idx) =>
            idx === rowIdx ? { ...item, SN: row.SN } : row
          )
        );
      }
    }
    focusNextInput(rowIdx, "Qty");
  };

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
                {/* Check if this is the Item column and add the button */}
                {item.label.toLowerCase() === "item" ? (
                  <div className="flex items-center justify-between w-full">
                    <span>{item.label}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddItemModalOpen(true)}
                      className="h-6 w-6 p-0 bg-sky-500! rounded-full! hover:bg-sky-400! ml-2 shadow!"
                      title="Create Item"
                    >
                      <Plus size={16} className="text-blue-50 font-bold!" />
                    </Button>
                  </div>
                ) : (
                  <span>{item.label}</span>
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
                handleItemChange,
                handleUnitChange,
                handleRemoveRow,
                focusNextInput,
                ItemData: memoizedItemData,
                UnitData: memoizedUnitData,
                TableHeaderData: memoizedHeaderData,
                LAST_FIELD,
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
            Total Before Discount:{" "}
            <span className="font-semibold text-blue-600">
              {formRows
                .reduce((sum, row) => {
                  const rowTotal = row.Qty * row.Rate;
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
              (sum, row) => sum + row.Qty * row.Rate,
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
