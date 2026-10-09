import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Download, RotateCcw, Trash } from "lucide-react";
import React, { useState } from "react";
import DatabaseTableView from "./DatabaseTableView";
import { Button } from "@/components/ui/button";
import { DatabaseModal } from "./DatabaseModal";

// 1. Define the data structure
export type EmployeeRow = {
  id: number;
  fileName: string;
  createdBy: string;
  createdAt: string;
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
    fileName: "Backup-0019-database.zip",
    createdBy: "Admin",
    createdAt: "2025-08-07",
  },
  // Use unique IDs for all rows!
  ...Array.from({ length: 49 }, (_, i) => ({
    id: i + 2,
    fileName: `Backup-${String(1018 - i).padStart(4, "0")}-database.zip`,
    createdBy: "It Support",
    createdAt: "2025-08-07",
  })),
];

const initialDataRestore: EmployeeRow[] = [
  {
    id: 1,
    fileName: "Restore-0019-database.zip",
    createdBy: "Admin",
    createdAt: "2025-08-07",
  },
  // Use unique IDs for all rows!
  ...Array.from({ length: 49 }, (_, i) => ({
    id: i + 2,
    fileName: `Restore-${String(1018 - i).padStart(4, "0")}-database.zip`,
    createdBy: "It Support",
    createdAt: "2025-08-07",
  })),
];

interface DatabaseTableProps {
  tableView: "Backup" | "Restore";
  search?: string;
}

const DatabaseTable: React.FC<DatabaseTableProps> = ({
  tableView,
  search = "",
}) => {
  const [data, setData] = useState<EmployeeRow[]>(
    tableView === "Backup" ? initialData : initialDataRestore
  );

  // Filtered data based on search
  const filteredData = React.useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter(
      (row) =>
        row.fileName.toLowerCase().includes(lower) ||
        row.createdBy.toLowerCase().includes(lower) ||
        row.createdAt.toLowerCase().includes(lower)
    );
  }, [data, search]);
  const [isRestore, setIsRestore] = useState(false);

  React.useEffect(() => {
    setData(tableView === "Backup" ? initialData : initialDataRestore);
    setIsRestore(tableView === "Restore");
  }, [tableView]);
  const [opened, setOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const handleDelete = () => {
    if (selectedId !== null) {
      setData((prev) => prev.filter((item) => item.id !== selectedId));
      setSelectedId(null);
    }
  };

  const columns: MetaColumnDef<EmployeeRow>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "SN",
        cell: ({ row }) => row.index + 1,
        meta: {
          headerClassName: "text-center max-w-[50px] w-[50px] ",
          cellClassName: "text-center px-2 py-1 max-w-[50px] w-[50px]",
        },
      },
      {
        accessorKey: "fileName",
        header: "File Name",
        meta: {
          headerClassName: "text-left",
          cellClassName: "text-left px-2 py-1",
        },
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        meta: {
          headerClassName: "text-left",
          cellClassName: "text-left px-2 py-1",
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        meta: {
          headerClassName: "text-left",
          cellClassName: "text-left px-2 py-1",
        },
      },

      {
        accessorKey: "actions",
        header: "Actions",
        meta: {
          headerClassName: "text-left",
          cellClassName: "text-left px-2 py-1",
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => console.log("Download:", row.original.id)}
              variant="ghost"
              className="text-blue-500 hover:text-blue-600"
            >
              <Download />
            </Button>
            {!isRestore ? (
              <Button
                onClick={() => {
                  setSelectedId(row.original.id);
                  setOpened(true);
                }}
                variant="ghost"
                className="text-red-500 hover:text-red-600"
              >
                <Trash />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setSelectedId(row.original.id);
                  setOpened(true);
                }}
                variant="ghost"
                className="text-green-500 hover:text-green-600"
              >
                <RotateCcw />
              </Button>
            )}
          </div>
        ),
      },
    ],
    [isRestore]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: { sorting, pagination },
  });

  return (
    <>
      <DatabaseTableView table={table} />

      <DatabaseModal
        title={isRestore ? "Restore Database" : "Delete Database"}
        description={
          isRestore
            ? "Are you sure you want to restore this database?"
            : "Are you sure you want to delete this database?"
        }
        tableView={isRestore ? "Restore" : "Backup"}
        opened={opened}
        setOpened={setOpened}
        onDelete={handleDelete}
      />
    </>
  );
};

export default DatabaseTable;
