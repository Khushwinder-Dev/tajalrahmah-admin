/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormValuesType } from "./DynamicInputTableList";
import DynamicInputTableRow from "./DynamicInputTableRow";

const VirtualizedInputRow = ({
  data,
  index,
  style,
}: {
  data: {
    formRows: FormValuesType[];
    setRef: any;
    handleChange: any;
    handleItemChange: any;
    handleUnitChange: any;
    handleRemoveRow: any;
    focusNextInput: any;
    ItemData: any[];
    UnitData: any[];
    TableHeaderData: any[];
    LAST_FIELD: string;
  };
  index: number;
  style: React.CSSProperties;
}) => {
  const {
    formRows,
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
  } = data;

  return (
    <div style={style}>
      <DynamicInputTableRow
        rowIdx={index}
        formData={formRows[index]}
        setRef={setRef}
        handleChange={handleChange}
        handleItemChange={handleItemChange}
        handleUnitChange={handleUnitChange}
        handleRemoveRow={handleRemoveRow}
        focusNextInput={focusNextInput}
        ItemData={ItemData}
        UnitData={UnitData}
        TableHeaderData={TableHeaderData}
        LAST_FIELD={LAST_FIELD}
      />
    </div>
  );
};

export default VirtualizedInputRow;
