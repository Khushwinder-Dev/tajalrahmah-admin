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
    handleCustomerChange: any;
    handleProjectChange: any;
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
    handleItemChange,
    handleCustomerChange,
    handleProjectChange,
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
        handleItemChange={handleItemChange}
        handleCustomerChange={handleCustomerChange}
        handleProjectChange={handleProjectChange}
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
