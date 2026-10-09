/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the type for the column configuration
// types/table.d.ts or anywhere globally accessible

export type TTableColumnConfig = {
  accessorKey: string;
  cell: (info: {
    getValue: () => any;
    row: { original: any };
    table: any;
  }) => React.ReactNode;
  id: string;
  header: (data: { table: any }) => React.ReactNode;
};

export type TEditableRows = Record<
  string,
  Record<string, string | number | undefined>
>;

export type TDeleteAbleRows = (string | number)[];
