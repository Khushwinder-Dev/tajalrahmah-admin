/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Button, Select } from "@mantine/core";
import EditableInput from "../EditableInput";
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

const fieldOrder = [
  "Item",
  "Description",
  "Qty",
  "Unit",
  "Rate",
  "Disc",
  "DiscAmt",
  "ExcludingVAT",
  "VAT",
  "VATAmount",
  "IncludingVAT",
];

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
    LAST_FIELD,
  }) => {
    const readOnlyFields = new Set([
      "Description",
      "DiscAmt",
      "ExcludingVAT",
      "VAT",
      "VATAmount",
      "IncludingVAT",
    ]);

    const getNextField = (field: string) => {
      let idx = fieldOrder.indexOf(field);
      do {
        idx++;
      } while (idx < fieldOrder.length && readOnlyFields.has(fieldOrder[idx]));
      return idx < fieldOrder.length ? fieldOrder[idx] : fieldOrder[fieldOrder.length - 1];
    };
    const getPrevField = (field: string) => {
      let idx = fieldOrder.indexOf(field);
      do {
        idx--;
      } while (idx >= 0 && readOnlyFields.has(fieldOrder[idx]));
      return idx >= 0 ? fieldOrder[idx] : fieldOrder[0];
    };


    const handleArrowNavigation = (
      e: React.KeyboardEvent,
      rowIdx: number,
      field: string
    ) => {
      if (e.key === "ArrowRight") {
        focusNextInput(rowIdx, getNextField(field));
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        focusNextInput(rowIdx, getPrevField(field));
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        focusNextInput(rowIdx + 1, field);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        focusNextInput(rowIdx - 1, field);
        e.preventDefault();
      }
    };
    return (
      <div
        className="grid grid-cols-[repeat(13,minmax(100px,1fr))] border-b h-[60px] gap-[5px] mt-4"
        key={formData.SN}
      >
        <div className="w-full flex items-center justify-center">
          {formData.SN}
        </div>

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
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "Item")}
          data={ItemData.map((item) => ({
            value: item.value,
            label: item.label,
            id: item.id,
          }))}
          placeholder="Select a item..."
          searchable
          clearable
          required
          styles={{
            input: {
              height: "40px",
              "&:focus": {
                borderColor: "var(--primary)",
              },
            },
          }}
        />

        <EditableInput
          type="text"
          id={`Description_${rowIdx}`}
          name="Description"
          className="w-full h-10"
          value={formData.Description ?? ""}
          onChange={(e) => handleChange(rowIdx, e)}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "Description")}
          tooltipText="Please enter description"
          readOnly
          required
        />
        <EditableInput
          type="number"
          id={`Qty_${rowIdx}`}
          name="Qty"
          className="w-full h-10"
          value={formData.Qty != null ? formData.Qty.toString() : ""}
          onChange={(e) => handleChange(rowIdx, e)}
          onNext={() => focusNextInput(rowIdx, "Unit")}
          setRef={setRef(rowIdx, "Qty")}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "Qty")}
          tooltipText="Please enter quantity"
          required
        />

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
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "Unit")}
          data={UnitData.map((item) => ({
            value: item.value,
            label: item.label,
            id: item.id,
          }))}
          placeholder="Select a unit..."
          searchable
          clearable
          required
          styles={{
            input: {
              height: "40px",
              "&:focus": {
                borderColor: "var(--primary)",
              },
            },
          }}
        />

        <EditableInput
          type="number"
          id={`Rate_${rowIdx}`}
          name="Rate"
          className="w-full h-10"
          value={formData.Rate != null ? formData.Rate.toString() : ""}
          onChange={(e) => handleChange(rowIdx, e)}
          onNext={() => focusNextInput(rowIdx, "Disc")}
          setRef={setRef(rowIdx, "Rate")}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "Rate")}
          tooltipText="Please enter rate"
          required
        />
        <EditableInput
          type="number"
          id={`Disc_${rowIdx}`}
          name="Disc"
          className="w-full h-10"
          value={formData.Disc != null ? formData.Disc.toString() : ""}
          onChange={(e) => handleChange(rowIdx, e)}
          // onNext={() => focusNextInput(rowIdx, "DiscAmt")}
          setRef={setRef(rowIdx, "Disc")}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "Disc")}
          tooltipText="Please enter discount %"
          onNext={() => focusNextInput(rowIdx, LAST_FIELD)}
          required
        />
        <EditableInput
          type="number"
          id={`DiscAmt_${rowIdx}`}
          name="DiscAmt"
          className="w-full h-10"
          value={formData.DiscAmt != null ? formData.DiscAmt.toString() : ""}
          onChange={(e) => handleChange(rowIdx, e)}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "DiscAmt")}
          tooltipText="Please enter discount amount"
          readOnly
          required
        />
        <EditableInput
          type="number"
          id={`ExcludingVAT_${rowIdx}`}
          name="ExcludingVAT"
          className="w-full h-10"
          value={
            formData.ExcludingVAT != null
              ? formData.ExcludingVAT.toString()
              : ""
          }
          onChange={(e) => handleChange(rowIdx, e)}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "ExcludingVAT")}
          tooltipText="Please enter excluding VAT"
          readOnly
          required
        />
        <EditableInput
          type="number"
          id={`VAT_${rowIdx}`}
          name="VAT"
          className="w-full h-10"
          value={formData.VAT != null ? formData.VAT.toString() : ""}
          onChange={(e) => handleChange(rowIdx, e)}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "VAT")}
          tooltipText="Please enter VAT %"
          readOnly
          required
        />
        <EditableInput
          type="number"
          id={`VATAmount_${rowIdx}`}
          name="VATAmount"
          className="w-full h-10"
          value={
            formData.VATAmount != null ? formData.VATAmount.toString() : ""
          }
          onChange={(e) => handleChange(rowIdx, e)}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "VATAmount")}
          tooltipText="Please enter VAT amount"
          readOnly
          required
        />
        <EditableInput
          type="number"
          id={`IncludingVAT_${rowIdx}`}
          name="IncludingVAT"
          className="w-full h-10"
          value={
            formData.IncludingVAT != null
              ? formData.IncludingVAT.toString()
              : ""
          }
          onChange={(e) => handleChange(rowIdx, e)}
          onKeyDown={(e) => handleArrowNavigation(e, rowIdx, "IncludingVAT")}
          tooltipText="Please enter including VAT"
          readOnly
          required
        />
        {/* Action Button */}
        <Button
          variant="subtle"
          type="button"
          className="cursor-pointer w-full flex justify-center items-center"
          onClick={() => handleRemoveRow(rowIdx)}
        >
          <X size={24} className="text-red-500" />
        </Button>
      </div>
    );
  }
);

export default DynamicInputTableRow;
