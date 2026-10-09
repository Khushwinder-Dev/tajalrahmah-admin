/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useMemo } from "react";
import { Search, X } from "lucide-react";

interface TemplateContentProps {
  headers: { key: string; label: string; width?: string }[];
  data: any[];
  onSelect: (selectedData: any) => void;
  onClose: () => void;
  searchableColumns?: string[];
  title?: string;
}

export function TemplateContent({
  headers,
  data,
  onSelect,
  onClose,
  searchableColumns,
  title = "Templates",
}: TemplateContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const searchColumns = searchableColumns || headers.map((h) => h.key);

    return data.filter((row) =>
      searchColumns.some((column) =>
        String(row[column] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchableColumns, headers]);

  // Handle row selection
  const handleRowSelect = useCallback(
    (rowData: any, index: number) => {
      setSelectedRowIndex(index);
      onSelect(rowData);
    },
    [onSelect]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setSelectedRowIndex(null);
    },
    []
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header Row with Title, Search, and Close Button */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4">
        {/* Left: Title */}
        <h2 className="text-lg font-semibold text-gray-900 flex-shrink-0">
          {title}
        </h2>

        {/* Middle: Search */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[80%] sm:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Right: Close Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-hidden border border-gray-200 rounded-lg">
        <div className="flex flex-col h-96">
          {/* Fixed Header */}
          <div className="flex-shrink-0 bg-gray-50 border-b border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ width: header.width }}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto grid-scroll">
            <table className="w-full border-collapse">
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr
                      key={index}
                      className={`cursor-pointer transition-colors ${
                        selectedRowIndex === index
                          ? "bg-blue-50 ring-2 ring-blue-500 ring-inset"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleRowSelect(row, index)}
                    >
                      {headers.map((header) => (
                        <td
                          key={`${index}-${header.key}`}
                          className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
                          style={{ width: header.width }}
                        >
                          {row[header.key] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      {searchTerm
                        ? "No templates found matching your search"
                        : "No templates available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer with results count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredData.length} of {data.length} templates
        {searchTerm && (
          <span className="ml-2 text-blue-600">
            (filtered by "{searchTerm}")
          </span>
        )}
      </div>
    </div>
  );
}
