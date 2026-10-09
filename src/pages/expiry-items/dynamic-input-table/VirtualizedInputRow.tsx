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
    handleUnitChange: any;
    handleRemoveRow: any;
    focusNextInput: any;
    UnitData: any[];
    TableHeaderData: any[];
    ItemData: any[];
  };
  index: number;
  style: React.CSSProperties;
}) => {
  const {
    formRows,
    setRef,
    handleChange,
    handleUnitChange,
    handleRemoveRow,
    focusNextInput,
    UnitData,
    TableHeaderData,
    ItemData,
  } = data;

  return (
    <div style={style}>
      <DynamicInputTableRow
        rowIdx={index}
        formData={formRows[index]}
        setRef={setRef}
        handleChange={handleChange}
        handleUnitChange={handleUnitChange}
        handleRemoveRow={handleRemoveRow}
        focusNextInput={focusNextInput}
        UnitData={UnitData}
        TableHeaderData={TableHeaderData}
        ItemData={ItemData}
      />
    </div>
  );
};

export default VirtualizedInputRow;
