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
    handleCategoryChange: any;
    handleServicesChange: any;
    handleRemoveRow: any;
    focusNextInput: any;
    ItemData: any[];
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
    handleCategoryChange,
    handleServicesChange,
    handleRemoveRow,
    focusNextInput,
    ItemData,

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
        handleCategoryChange={handleCategoryChange}
        handleServicesChange={handleServicesChange}
        handleRemoveRow={handleRemoveRow}
        focusNextInput={focusNextInput}
        ItemData={ItemData}
        TableHeaderData={TableHeaderData}
        LAST_FIELD={LAST_FIELD}
      />
    </div>
  );
};

export default VirtualizedInputRow;
