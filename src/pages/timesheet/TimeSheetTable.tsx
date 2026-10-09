import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import React, { useState } from "react";
import TimeSheetTableView from "./TimeSheetTableView";
import dayjs from "dayjs";

// 1. Define the data structure
export type EmployeeRow = {
  id: number;
  branch: string;
  iqamaNo: string;
  employeeName: string;
  designation: string;
  dailyHours: number[]; // 30 days
  overtimeHours: number;
  totalHours: number;
  absentHours: number;
  netHours: number;
  actualHours: number;
};

type ColumnMeta = {
  headerClassName?: string;
  cellClassName?: string;
};

type MetaColumnDef<T> = ColumnDef<T> & {
  meta?: ColumnMeta;
};

//  Initial data
const initialData: EmployeeRow[] = [
  {
    id: 1,
    branch: "ABHA",
    iqamaNo: "2538274321",
    employeeName: "Muhammad Arshad",
    designation: "Site Technician",
    dailyHours: Array(30).fill(0),
    overtimeHours: 0,
    totalHours: 240,
    absentHours: 0,
    netHours: 240,
    actualHours: 240,
  },
  {
    id: 2,
    branch: "ABHA",
    iqamaNo: "2531977508",
    employeeName: "Arslan Ali",
    designation: "Lab/Site Technician",
    dailyHours: Array(30).fill(0),
    overtimeHours: 0,
    totalHours: 240,
    absentHours: 0,
    netHours: 240,
    actualHours: 240,
  },
  {
    id: 3,
    branch: "ABHA",
    iqamaNo: "243186514",
    employeeName: "Md Nadeem Shahzad",
    designation: "Quality Manager",
    dailyHours: Array(30).fill(0),
    overtimeHours: 0,
    totalHours: 240,
    absentHours: 0,
    netHours: 240,
    actualHours: 240,
  },
];

// Helper to calculate summaries
function calculateSummaries(dailyHours: number[], actualHours: number) {
  const dailySum = dailyHours.reduce((a, b) => a + (b || 0), 0);
  const totalHours = actualHours + dailySum;
  const netHours = totalHours;
  const overtimeHours = Math.max(0, totalHours - 208); // Example: 208 = 8*26
  return { overtimeHours, totalHours, netHours };
}

const TimeSheetTable: React.FC = () => {
  const [data, setData] = useState<EmployeeRow[]>(initialData);
  const startDate = dayjs("2025-08-01");

  // Update a single cell and recalculate summaries
  const updateDailyHour = (rowIdx: number, dayIdx: number, value: number) => {
    setData((old) =>
      old.map((row, idx) => {
        if (idx !== rowIdx) return row;
        const newDaily = [...row.dailyHours];
        newDaily[dayIdx] = value;
        const { overtimeHours, totalHours, netHours } = calculateSummaries(
          newDaily,
          row.actualHours
        );
        return {
          ...row,
          dailyHours: newDaily,
          overtimeHours,
          totalHours,
          netHours,
          absentHours: row.absentHours, // Keep the existing value from data
        };
      })
    );
  };

  const columns: MetaColumnDef<EmployeeRow>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "SN",
        cell: ({ row }) => row.index + 1,

        meta: {
          headerClassName: "w-[50px] min-w-[50px] text-center",
          cellClassName: "w-[50px] min-w-[50px] text-center px-2 py-1",
          stickyWidth: 50,
        },
      },
      {
        accessorKey: "branch",
        header: "Branch",
        meta: {
          headerClassName: "w-[150px] min-w-[150px] text-center",
          cellClassName: "w-[150px] min-w-[150px] text-center px-2 py-1",
          stickyWidth: 150,
        },
      },
      {
        accessorKey: "iqamaNo",
        header: "Iqama no",
        meta: {
          headerClassName: "w-[150px] min-w-[150px] text-left",
          cellClassName: "w-[150px] min-w-[150px] text-left px-2 py-1",
          stickyWidth: 150,
        },
      },
      {
        accessorKey: "employeeName",
        header: "Employee Name",
        meta: {
          headerClassName: "w-[150px] min-w-[150px] text-left",
          cellClassName: "w-[150px] min-w-[150px] text-left px-2 py-1",
          stickyWidth: 150,
        },
      },
      {
        accessorKey: "designation",
        header: "Designation",
        meta: {
          headerClassName: "w-[150px] min-w-[150px] text-left",
          cellClassName: "w-[150px] min-w-[150px] text-left px-2 py-1",
          stickyWidth: 150,
        },
      },

      {
        accessorKey: "actualHours",
        header: "Actual Hours",
        cell: (info) => (
          <div className="h-full w-full">
            <input
              type="number"
              value={info.getValue<number>()}
              className="w-full h-full text-center border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition py-1"
              tabIndex={-1}
              readOnly
            />
          </div>
        ),
        meta: {
          headerClassName: "w-[110px] min-w-[110px] text-center",
          cellClassName: "w-[110px] min-w-[110px] text-center px-2 py-1",
          stickyWidth: 110,
        },
      },

      {
        accessorKey: "overtimeHours",
        header: "Overtime Hours",
        cell: (info) => (
          <div className="h-full w-full">
            <input
              type="number"
              value={info.getValue<number>()}
              className="w-full h-full text-center border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition py-1"
              tabIndex={-1}
              readOnly
            />
          </div>
        ),
        meta: {
          headerClassName: "w-[110px] min-w-[110px] text-center",
          cellClassName: "w-[110px] min-w-[110px] text-center px-2 py-1",
          stickyWidth: 110,
        },
      },
      {
        accessorKey: "totalHours",
        header: "Total Hours",
        cell: (info) => (
          <div className="h-full w-full">
            <input
              type="number"
              value={info.getValue<number>()}
              className="w-full h-full text-center border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition py-1"
              tabIndex={-1}
              readOnly
            />
          </div>
        ),
        meta: {
          headerClassName: "w-[110px] min-w-[110px] text-center",
          cellClassName: "w-[110px] min-w-[110px] text-center px-2 py-1",
          stickyWidth: 110,
        },
      },
      {
        accessorKey: "absentHours",
        header: "Absent Hours",
        cell: (info) => (
          <div className="h-full w-full">
            <input
              type="number"
              value={info.getValue<number>()}
              className="w-full h-full text-center border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition py-1"
              tabIndex={-1}
              readOnly
            />
          </div>
        ),
        meta: {
          headerClassName: "w-[110px] min-w-[110px] text-center",
          cellClassName: "w-[110px] min-w-[110px] text-center px-2 py-1",
          stickyWidth: 110,
        },
      },
      {
        accessorKey: "netHours",
        header: "Net Hours",
        cell: (info) => (
          <div className="h-full w-full">
            <input
              type="number"
              value={info.getValue<number>()}
              className="w-full h-full text-center border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition py-1"
              tabIndex={-1}
              readOnly
            />
          </div>
        ),
        meta: {
          headerClassName: "w-[110px] min-w-[110px] text-center",
          cellClassName: "w-[110px] min-w-[110px] text-center px-2 py-1",
          stickyWidth: 110,
        },
      },
      // 30 dynamic daily columns
      ...Array.from({ length: 30 }, (_, i) => ({
        id: `day${i + 1}`,
        accessorFn: (row: EmployeeRow) => row.dailyHours[i],
        header: () => (
          <div className="flex flex-col items-center">
            <span>{startDate.add(i, "day").format("DD")}</span>
            <span className="text-xs text-gray-400">
              {startDate.add(i, "day").format("ddd")}
            </span>
          </div>
        ),

        cell: ({ row }: { row: Row<EmployeeRow> }) => {
          const rowIndex = row.index;
          return (
            <DailyHourInput
              rowIndex={rowIndex}
              data={data}
              updateDailyHour={updateDailyHour}
              i={i}
            />
          );
        },
        meta: {
          headerClassName: "text-center w-[100px] min-w-[100px]",
          cellClassName: "text-center w-[100px] min-w-[100px] px-0 py-0 border",
        },
      })),
    ],
    [data]
  );

  // 6. Set up the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 7. Render
  return (
    <TimeSheetTableView
      table={table}
      sticky={[
        "id",
        "branch",
        "iqamaNo",
        "employeeName",
        "designation",
        "actualHours",
        "overtimeHours",
        "totalHours",
        "absentHours",
        "netHours",
      ]}
    />
  );
};

export default TimeSheetTable;

type DailyHourInputProps = {
  rowIndex: number;
  data: EmployeeRow[];
  i: number;
  updateDailyHour: (rowIdx: number, dayIdx: number, value: number) => void;
};

const DailyHourInput = ({
  rowIndex,
  data,
  i,
  updateDailyHour,
}: DailyHourInputProps) => {
  const [localValue, setLocalValue] = React.useState(
    String(data[rowIndex].dailyHours[i] ?? "")
  );

  React.useEffect(() => {
    setLocalValue(String(data[rowIndex].dailyHours[i] ?? ""));
  }, [data[rowIndex].dailyHours[i]]);

  const handleBlur = () => {
    updateDailyHour(rowIndex, i, Number(localValue));
  };

  return (
    <input
      type="number"
      value={localValue}
      min={0}
      max={24}
      className="w-full h-full text-center border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleBlur();
          e.currentTarget.blur();
        }
      }}
    />
  );
};
