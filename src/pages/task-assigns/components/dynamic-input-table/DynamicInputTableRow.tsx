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
  handleItemChange: (rowIdx: number, value: string | null) => void;
  handleCustomerChange: (rowIdx: number, value: string | null) => void;
  handleProjectChange: (rowIdx: number, value: string | null) => void;
  handleRemoveRow: (rowIdx: number) => void;
  focusNextInput: (rowIdx: number, nextField: string) => void;
  ItemData: string[];
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
    handleCustomerChange,

    handleProjectChange,
    handleRemoveRow,
    focusNextInput,
    ItemData,
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
        <div className="w-full flex items-start justify-center px-2 text-sm font-medium">
          {formData.SN}
        </div>

        {/* Item Select */}
        <div className="w-full px-1">
          <Select
            ref={(el) => setRef(rowIdx, "taskCategory")(el as HTMLElement)}
            id={`taskCategory_${rowIdx}`}
            name="taskCategory"
            className="w-full h-10"
            value={formData.taskCategory}
            onChange={(value) => {
              handleItemChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "customer");
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
            ref={(el) => setRef(rowIdx, "customer")(el as HTMLElement)}
            id={`customer_${rowIdx}`}
            name="customer"
            className="w-full h-10"
            value={formData.customer}
            onChange={(value) => {
              handleCustomerChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "project");
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
            ref={(el) => setRef(rowIdx, "project")(el as HTMLElement)}
            id={`project_${rowIdx}`}
            name="project"
            className="w-full h-10"
            value={formData.project}
            onChange={(value) => {
              handleProjectChange(rowIdx, value);
              if (value) {
                focusNextInput(rowIdx, "startTime");
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
            type="time"
            id={`startTime_${rowIdx}`}
            name="startTime"
            className="w-full h-10 text-xs"
            value={
              formData.startTime != null ? formData.startTime.toString() : ""
            }
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "endTime")}
            setRef={setRef(rowIdx, "startTime")}
            tooltipText="Please enter rate"
            required
          />
        </div>

        {/* Rate */}
        <div className="w-full px-1">
          <EditableInput
            type="time"
            id={`endTime_${rowIdx}`}
            name="endTime"
            className="w-full h-10 text-xs"
            value={formData.endTime != null ? formData.endTime.toString() : ""}
            onChange={(e) => handleChange(rowIdx, e)}
            onNext={() => focusNextInput(rowIdx, "description")}
            setRef={setRef(rowIdx, "endTime")}
            tooltipText="Please enter rate"
            required
          />
        </div>

        <div className="w-full px-1">
          <EditableInput
            type="text"
            setRef={setRef(rowIdx, "timeline")}
            id={`timeline_${rowIdx}`}
            name="timeline"
            className="w-full h-10 text-xs"
            onNext={() => focusNextInput(rowIdx, "description")}
            value={
              formData.startTime && formData.endTime
                ? (() => {
                    const start = dayjs(formData.startTime, "HH:mm");
                    const end = dayjs(formData.endTime, "HH:mm");

                    if (!start.isValid() || !end.isValid()) return "";

                    const diffInMinutes = end.diff(start, "minute");
                    if (diffInMinutes < 0) return "";

                    const hours = Math.floor(diffInMinutes / 60);
                    const minutes = diffInMinutes % 60;

                    return `${
                      hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") : ""
                    }${
                      minutes > 0
                        ? " " + minutes + " minute" + (minutes > 1 ? "s" : "")
                        : ""
                    }`.trim();
                  })()
                : ""
            }
            onChange={(e) => handleChange(rowIdx, e)}
            tooltipText="Timeline"
            readOnly
            required
          />
        </div>

        <div className="w-full px-1">
          <EditableInput
            type="text"
            setRef={setRef(rowIdx, "description")}
            id={`description_${rowIdx}`}
            name="description"
            className="w-full h-10 text-xs"
            onNext={() => focusNextInput(rowIdx, LAST_FIELD)}
            value={formData.description ?? ""}
            onChange={(e) => handleChange(rowIdx, e)}
            tooltipText="Please enter description"
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
