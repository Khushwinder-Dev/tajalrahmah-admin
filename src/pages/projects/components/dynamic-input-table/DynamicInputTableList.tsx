/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useRef, useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { FixedSizeList as List } from "react-window";
import VirtualizedInputRow from "./VirtualizedInputRow";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import AddItemModal from "./AddItemModal";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export type FormValuesType = {
  SN: number;
  itemRefNo: string;
  category: string;
  services: string;
  unitPrice: string;
};

// table header constant data
const TableHeaderData = [
  {
    id: "SN",
    label: "SN",
  },
  {
    id: "itemRefNo",
    label: "Item Ref No",
  },
  {
    id: "Category",
    label: "Category",
  },
  {
    id: "services",
    label: "Services",
  },
  {
    id: "unitPrice",
    label: "Unit Price",
  },

  {
    id: "Action",
    label: "Action",
  },
];

const initialRow: FormValuesType = {
  SN: 1,
  itemRefNo: "",
  category: "",
  services: "",
  unitPrice: "",
};

// Edit Row Data :: Edit Row :: For Edit Mode
const initialEditRow: FormValuesType[] = [
  {
    SN: 1,
    itemRefNo: "Test One",
    category: "Test Two",
    services: "Test Three",
    unitPrice: "100",
  },
];

type Props = {
  isEdit?: boolean;
  onFormRowsChange?: (formRows: FormValuesType[]) => void;
};

const DynamicInputTableList = ({ isEdit = false, onFormRowsChange }: Props) => {
  const [formRows, setFormRows] = useState<FormValuesType[]>(
    isEdit ? initialEditRow : [initialRow]
  );

  const { t } = useTranslation();

  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const LAST_FIELD = "unitPrice";
  const FIRST_FIELD = "itemRefNo";
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleItemCreated = (newItem: any) => {
    console.log("New item created:", newItem);
    // Here you can add logic to add the item to your items list
    // or refresh the items from your API
  };

  const handleAddRowAndFocus = () => {
    const lastRow = formRows[formRows.length - 1];
    if (!lastRow.itemRefNo || lastRow.itemRefNo.trim() === "") {
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
        itemRefNo: "",
        category: "",
        services: "",
        unitPrice: "",
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
      const newValue = value;
      setFormRows((prev) => {
        const updatedRow = {
          ...prev[rowIdx],
          [name]: newValue,
        };
        const newRows = [...prev];
        newRows[rowIdx] = updatedRow;
        return newRows;
      });
    },
    []
  );

  const handleCategoryChange = (rowIdx: number, value: string | null) => {
    setFormRows((prev) =>
      prev.map((row, idx) =>
        idx === rowIdx ? { ...row, category: value ?? "" } : row
      )
    );
    focusNextInput(rowIdx, "services");
  };

  const handleServicesChange = (rowIdx: number, value: string | null) => {
    setFormRows((prev) =>
      prev.map((row, idx) =>
        idx === rowIdx ? { ...row, services: value ?? "" } : row
      )
    );
    focusNextInput(rowIdx, "unitPrice");
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

  const ItemData: any[] = ["Test One", "Test Two", "Test Three"];

  // Add useEffect to notify parent component when formRows changes
  useEffect(() => {
    if (onFormRowsChange) {
      onFormRowsChange(formRows);
    }
  }, [formRows, onFormRowsChange]);

  return (
    <>
      <div className="relative">
        <Button
          variant="filled"
          className="my-4 h-[50px]"
          onClick={formRows.length > 0 ? handleAddRowAndFocus : handleAddRow}
        >
          {t("common.addRow")}
        </Button>

        {/* Single scroll container for both header and rows */}
        <div className="overflow-auto border rounded-lg h-[250px]">
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
                      className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full ml-2"
                      title="Create Item"
                    >
                      <Plus
                        size={12}
                        className="text-blue-600 dark:text-blue-400"
                      />
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
                handleCategoryChange,
                handleServicesChange,
                handleRemoveRow,
                focusNextInput,
                ItemData,
                TableHeaderData,
                LAST_FIELD,
              }}
            >
              {VirtualizedInputRow}
            </List>
          </div>
        </div>

        <AddItemModal
          isOpen={isAddItemModalOpen}
          onClose={() => setIsAddItemModalOpen(false)}
          onSave={handleItemCreated}
        />
      </div>
    </>
  );
};

export default DynamicInputTableList;
