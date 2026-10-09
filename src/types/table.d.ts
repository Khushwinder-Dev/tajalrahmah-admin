// file: types/react-table.d.ts or any global type file

import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    isFixed?: boolean;
    fixedPosition?: "left" | "right";
    exportLabel?: string;
    headerClassName?: string;
    cellClassName?: string;
    stickyWidth?: number;
  }
}
