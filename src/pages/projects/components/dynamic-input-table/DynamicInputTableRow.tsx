/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Button, Select } from "@mantine/core";
import EditableInput from "@/components/common/EditableInput";
import { X } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export interface DynamicInputTableRowProps {
  rowIdx: number;
  formData: any;
  setRef: (rowIdx: number, name: string) => (el: HTMLElement | null) => void;
  handleChange: (
    rowIdx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveRow: (rowIdx: number) => void;
  focusNextInput: (rowIdx: number, nextField: string) => void;
  ItemData: string[];
  TableHeaderData: { id: string; label: string }[];
  LAST_FIELD: string;
  handleCategoryChange: (rowIdx: number, value: string | null) => void;
  handleServicesChange: (rowIdx: number, value: string | null) => void;
}

const DynamicInputTableRow: React.FC<DynamicInputTableRowProps> = React.memo(
  ({
    rowIdx,
    formData,
    setRef,
    handleChange,
    handleRemoveRow,
    focusNextInput,
    ItemData,
    TableHeaderData,
    LAST_FIELD,
    handleCategoryChange,
    handleServicesChange,
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
        <div className="w-full flex items-start justify-center px-2 text-sm font-medium">
          {formData.SN}
        </div>

        {/* Item Ref No */}
        <div className="w-full px-1">
          <EditableInput
            id={`itemRefNo_${rowIdx}`}
            name="itemRefNo"
            className="w-full h-10 text-xs"
            value={
              formData.itemRefNo != null ? formData.itemRefNo.toString() : ""
            }
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "category")}
            setRef={setRef(rowIdx, "itemRefNo")}
            tooltipText="Please enter item ref no"
            required
          />
        </div>

        {/* Category */}
        <div className="w-full px-1">
          <Select
            ref={(el) => setRef(rowIdx, "category")(el as HTMLElement)}
            id={`category_${rowIdx}`}
            name="category"
            className="w-full h-10"
            value={formData.category}
            onChange={(value) => {
              handleCategoryChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "services");
              }
            }}
            data={ItemData}
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
          <Select
            ref={(el) => setRef(rowIdx, "services")(el as HTMLElement)}
            id={`services_${rowIdx}`}
            name="services"
            className="w-full h-10"
            value={formData.services}
            onChange={(value) => {
              handleServicesChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "unitPrice");
              }
            }}
            data={ItemData}
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

        <div className="w-full px-1">
          <EditableInput
            id={`unitPrice_${rowIdx}`}
            name="unitPrice"
            className="w-full h-10 text-xs"
            value={
              formData.unitPrice != null ? formData.unitPrice.toString() : ""
            }
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, LAST_FIELD)}
            setRef={setRef(rowIdx, "unitPrice")}
            tooltipText="Please enter unit price"
            required
          />
        </div>

        {/* Action Button */}
        <div className="w-full px-1 flex items-start justify-center">
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
