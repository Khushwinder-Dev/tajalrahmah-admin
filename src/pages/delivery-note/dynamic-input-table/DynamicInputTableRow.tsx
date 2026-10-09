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
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleItemChange: (rowIdx: number, value: string | null) => void;
  handleUnitChange: (rowIdx: number, value: string | null) => void;
  handleRemoveRow: (rowIdx: number) => void;
  focusNextInput: (rowIdx: number, nextField: string) => void;
  ItemData: { value: string; label: string; id: string }[];
  UnitData: { value: string; label: string; id: string }[];
  TableHeaderData: { id: string; label: string }[];
  LAST_FIELD: string;
}

const DynamicInputTableRow: React.FC<DynamicInputTableRowProps> = React.memo(
  ({
    rowIdx,
    formData,
    setRef,
    handleChange,
    handleItemChange,
    handleUnitChange,
    handleRemoveRow,
    focusNextInput,
    ItemData,
    UnitData,
    TableHeaderData,
    LAST_FIELD,
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
        <div className="w-full flex items-center justify-center px-2 text-sm font-medium">
          {formData.SN}
        </div>

        {/* Item Select */}
        <div className="w-full px-1">
          <Select
            ref={(el) => setRef(rowIdx, "Item")(el as HTMLElement)}
            id={`Item_${rowIdx}`}
            name="Item"
            className="w-full h-10"
            value={formData.Item}
            onChange={(value) => {
              handleItemChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "Qty");
              }
            }}
            data={ItemData.map((item) => ({
              value: item.value,
              label: item.label,
              id: item.id,
            }))}
            placeholder="Select item..."
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
              },
              dropdown: {
                fontSize: "12px",
              },
            }}
          />
        </div>

        {/* Description */}
        <div className="w-full px-1">
          <EditableInput
            type="text"
            id={`Description_${rowIdx}`}
            name="Description"
            className="w-full h-10 text-xs"
            value={formData.Description ?? ""}
            onChange={(e) => handleChange(rowIdx, e)}
            tooltipText="Please enter description"
            readOnly
            required
          />
        </div>

        {/* Quantity */}
        <div className="w-full px-1">
          <EditableInput
            type="number"
            id={`Qty_${rowIdx}`}
            name="Qty"
            className="w-full h-10 text-xs"
            value={formData.Qty != null ? formData.Qty.toString() : ""}
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "Unit")}
            setRef={setRef(rowIdx, "Qty")}
            tooltipText="Please enter quantity"
            required
          />
        </div>

        {/* Unit Select */}
        <div className="w-full px-1">
          <Select
            ref={(el) => setRef(rowIdx, "Unit")(el as HTMLElement)}
            id={`Unit_${rowIdx}`}
            name="Unit"
            className="w-full h-10"
            value={formData.Unit}
            onChange={(value) => {
              handleUnitChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "Rate");
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
              },
              dropdown: {
                fontSize: "12px",
              },
            }}
          />
        </div>

        {/* Rate */}
        <div className="w-full px-1">
          <EditableInput
            type="number"
            id={`Rate_${rowIdx}`}
            name="Rate"
            className="w-full h-10 text-xs"
            value={formData.Rate != null ? formData.Rate.toString() : ""}
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "IncludingVAT")}
            setRef={setRef(rowIdx, "Rate")}
            tooltipText="Please enter rate"
            required
          />
        </div>

        {/* Including VAT */}
        <div className="w-full px-1">
          <EditableInput
            type="number"
            id={`IncludingVAT_${rowIdx}`}
            name="IncludingVAT"
            className="w-full h-10 text-xs bg-gray-50"
            value={
              formData.IncludingVAT != null
                ? formData.IncludingVAT.toString()
                : ""
            }
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, LAST_FIELD)}
            setRef={setRef(rowIdx, "IncludingVAT")}
            tooltipText="Including VAT amount"
            readOnly
            required
          />
        </div>

        {/* Action Button */}
        <div className="w-full px-1 flex items-center justify-center">
          <Button
            variant="subtle"
            type="button"
            size="sm"
            className="cursor-pointer w-8 h-8 p-0 flex justify-center items-center hover:bg-red-50 rounded"
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
