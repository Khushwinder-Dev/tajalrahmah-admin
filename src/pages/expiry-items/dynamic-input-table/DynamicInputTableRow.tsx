/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Button, Select } from "@mantine/core";
import EditableInput from "@/components/common/EditableInput";
import { X } from "lucide-react";

export interface DynamicInputTableRowProps {
  rowIdx: number;
  formData: any;
  setRef: (rowIdx: number, name: string) => (el: HTMLElement | null) => void;
  handleChange: (
    rowIdx: number,
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => void;
  handleUnitChange: (rowIdx: number, value: string | null) => void;
  handleRemoveRow: (rowIdx: number) => void;
  focusNextInput: (rowIdx: number, nextField: string) => void;
  UnitData: { value: string; label: string; id: string }[];
  TableHeaderData: { id: string; label: string }[];
  ItemData: {
    id: string;
    label: string;
    batchNumber: string;
    unit: string;
    unitCost: number;
  }[];
}

const DynamicInputTableRow: React.FC<DynamicInputTableRowProps> = React.memo(
  ({
    rowIdx,
    formData,
    setRef,
    handleChange,
    handleUnitChange,
    handleRemoveRow,
    focusNextInput,
    UnitData,
    TableHeaderData,
    ItemData,
  }) => {
    return (
      <div
        className="grid border-b h-[60px] gap-[1px] mt-4"
        style={{
          gridTemplateColumns: `repeat(${
            TableHeaderData?.length || 8
          }, minmax(100px, 1fr))`,
          width: "100%",
          minWidth: "1300px",
        }}
        key={formData.SN}
      >
        {/* Serial Number */}
        <div className="w-full flex items-center justify-center px-2 text-sm font-medium -mt-4">
          {formData.SN}
        </div>

        {/* Item Name */}
        <div className="w-full px-1">
          <Select
            id={`itemName_${rowIdx}`}
            name="itemName"
            className="w-full h-10"
            value={formData.itemName ?? ""}
            onChange={(value) => {
              handleChange(rowIdx, { name: "itemName", value: value ?? "" });
              focusNextInput(rowIdx, "batchNumber");
            }}
            data={ItemData.map((item) => ({
              value: item.label,
              label: item.label,
            }))}
            placeholder="Select item..."
            searchable
            clearable
            required
            ref={setRef(rowIdx, "itemName")}
            styles={{
              input: {
                height: "40px",
                fontSize: "12px",
                "&:focus": {
                  borderColor: "var(--primary)",
                },
                borderRadius: "12px",
              },
              dropdown: {
                fontSize: "12px",
              },
            }}
          />
        </div>

        {/* Batch Number */}
        <div className="w-full px-1">
          <EditableInput
            type="text"
            id={`batchNumber_${rowIdx}`}
            name="batchNumber"
            className="w-full h-10 text-xs"
            value={formData.batchNumber ?? ""}
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "expiryDate")}
            setRef={setRef(rowIdx, "batchNumber")}
            tooltipText="Enter batch number"
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="w-full px-1">
          <input
            type="date"
            id={`expiryDate_${rowIdx}`}
            name="expiryDate"
            className="w-full h-10 text-xs border rounded-lg px-2"
            value={formData.expiryDate ?? ""}
            onChange={(e) => handleChange(rowIdx, e)}
            required
          />
        </div>

        {/* Quantity */}
        <div className="w-full px-1">
          <EditableInput
            type="number"
            id={`quantity_${rowIdx}`}
            name="quantity"
            className="w-full h-10 text-xs"
            value={
              formData.quantity !== undefined && formData.quantity !== null
                ? String(formData.quantity)
                : ""
            }
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "unit")}
            setRef={setRef(rowIdx, "quantity")}
            tooltipText="Enter quantity"
            required
          />
        </div>

        {/* Unit */}
        <div className="w-full px-1">
          <Select
            ref={(el) => setRef(rowIdx, "unit")(el as HTMLElement)}
            id={`unit_${rowIdx}`}
            name="unit"
            className="w-full h-10"
            value={formData.unit}
            onChange={(value) => {
              handleUnitChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "unitCost");
              }
            }}
            data={UnitData.map((item) => ({
              value: item.value,
              label: item.label,
              id: item.id,
            }))}
            placeholder="Select unit..."
            searchable
            clearable
            required
            styles={{
              input: {
                height: "40px",
                fontSize: "12px",
                "&:focus": {
                  borderColor: "var(--primary)",
                },
                borderRadius: "12px",
              },
              dropdown: {
                fontSize: "12px",
              },
            }}
          />
        </div>

        {/* Unit Cost */}
        <div className="w-full px-1">
          <EditableInput
            type="number"
            id={`unitCost_${rowIdx}`}
            name="unitCost"
            className="w-full h-10 text-xs"
            value={
              formData.unitCost != null ? formData.unitCost.toString() : ""
            }
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "status")}
            setRef={setRef(rowIdx, "unitCost")}
            tooltipText="Enter unit cost"
            required
          />
        </div>

        {/* Status */}
        <div className="w-full px-1">
          <div className="w-full h-10 text-xs bg-gray-50 flex items-center px-2 rounded-lg border">
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                formData.status === "Expired"
                  ? "bg-red-100 text-red-800"
                  : formData.status === "Near Expiry"
                  ? "bg-yellow-100 text-yellow-800"
                  : formData.status === "Warning"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {formData.status}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full px-1 flex items-center justify-center">
          <Button
            variant="subtle"
            type="button"
            size="sm"
            className="cursor-pointer w-8 h-8 p-0 flex justify-center items-center hover:bg-red-200! rounded-full! -mt-4"
            onClick={() => handleRemoveRow(rowIdx)}
          >
            <X size={16} className="text-red-500" />
          </Button>
        </div>
      </div>
    );
  }
);

DynamicInputTableRow.displayName = "DynamicInputTableRow";

export default DynamicInputTableRow;
