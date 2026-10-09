/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface EditableStatusCellProps {
  info: any;
  handleEdit: (rowId: string, columnId: string, value: string) => void;
  handleDelete?: (id: string) => void;
}

export const EditableStatusCell = ({
  info,
  handleEdit,
}: EditableStatusCellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const status = info.getValue();
  const rowId = info.row.original.id;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "delete":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (newStatus: string) => {
    handleEdit(rowId, info.column.id, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(
          status
        )} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {status}
        <ChevronDown className="ml-1 h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="py-1">
            <button
              className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleStatusChange("active")}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Active
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleStatusChange("inactive")}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              Inactive
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleStatusChange("delete")}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-2"></span>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
