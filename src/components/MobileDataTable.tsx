import React, { useState } from "react";
import {
  FunnelIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface DataItem {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  role: string;
  joinDate: string;
  department: string;
  phone: string;
}

interface FilterState {
  status: string;
  role: string;
  department: string;
}

const VerticalDataTable: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    role: "",
    department: "",
  });

  const recordsPerPage = 5; // Show more records since they're scrollable

  // Sample data
  const data: DataItem[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      role: "Admin",
      joinDate: "2023-01-15",
      department: "IT",
      phone: "+1-555-0123",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
      role: "User",
      joinDate: "2023-02-20",
      department: "Marketing",
      phone: "+1-555-0124",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Inactive",
      role: "Moderator",
      joinDate: "2023-03-10",
      department: "Sales",
      phone: "+1-555-0125",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      status: "Active",
      role: "User",
      joinDate: "2023-04-05",
      department: "HR",
      phone: "+1-555-0126",
    },
    {
      id: "5",
      name: "Alex Brown",
      email: "alex@example.com",
      status: "Active",
      role: "Admin",
      joinDate: "2023-05-12",
      department: "IT",
      phone: "+1-555-0127",
    },
    {
      id: "6",
      name: "Lisa Davis",
      email: "lisa@example.com",
      status: "Pending",
      role: "User",
      joinDate: "2023-06-08",
      department: "Marketing",
      phone: "+1-555-0128",
    },
  ];

  // Define table rows (headers)
  const tableRows = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" },
    { key: "department", label: "Dept" },
    { key: "joinDate", label: "Joined" },
    { key: "phone", label: "Phone" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setFilters({ status: "", role: "", department: "" });
    setCurrentPage(0);
  };

  const filteredData = data.filter((item) => {
    return (
      (filters.status === "" || item.status === filters.status) &&
      (filters.role === "" || item.role === filters.role) &&
      (filters.department === "" || item.department === filters.department)
    );
  });

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentRecords = filteredData.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  const renderCellValue = (item: DataItem, rowKey: string) => {
    const value = item[rowKey as keyof DataItem];

    if (rowKey === "status") {
      return (
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
            value as string
          )}`}
        >
          {value}
        </span>
      );
    }

    if (rowKey === "email") {
      return <span className="text-blue-600 text-xs truncate">{value}</span>;
    }

    if (rowKey === "name") {
      return <span className="font-medium text-gray-900 text-xs">{value}</span>;
    }

    if (rowKey === "joinDate") {
      return <span className="text-gray-700 text-xs">{value}</span>;
    }

    return <span className="text-gray-700 text-xs">{value}</span>;
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-20">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Users</h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FunnelIcon className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Vertical Table */}
      <div className="">
        {currentRecords.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table container */}
            <div className="relative">
              {/* Fixed header column + Scrollable data columns */}
              <div className="flex">
                {/* Fixed Header Column */}
                <div className="flex-shrink-0 w-20 border-r border-gray-200 bg-gray-50">
                  {/* Header cell for header column */}
                  <div className="h-10 px-2 py-2 bg-gray-100 border-b border-gray-200 flex items-center">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Field
                    </span>
                  </div>

                  {/* Header labels */}
                  {tableRows.map((row, rowIndex) => (
                    <div
                      key={row.key}
                      className={`h-12 px-2 py-2 border-b border-gray-100 flex items-center font-medium text-xs text-gray-700 ${
                        rowIndex % 2 === 0 ? "bg-gray-50" : "bg-gray-25"
                      }`}
                    >
                      <span className="truncate">{row.label}</span>
                    </div>
                  ))}
                </div>

                {/* Scrollable Data Columns */}
                <div className="flex-1 overflow-x-auto">
                  <div className="flex" style={{ minWidth: "max-content" }}>
                    {currentRecords.map((item, colIndex) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-32 border-r border-gray-200 last:border-r-0"
                      >
                        {/* Column header */}
                        <div className="h-10 px-2 py-2 bg-gray-100 border-b border-gray-200 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600 text-center">
                            #{currentPage * recordsPerPage + colIndex + 1}
                          </span>
                        </div>

                        {/* Data cells */}
                        {tableRows.map((row, rowIndex) => (
                          <div
                            key={`${item.id}-${row.key}`}
                            className={`h-12 px-2 py-2 border-b border-gray-100 flex items-center justify-center ${
                              rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }`}
                          >
                            <div className="text-center w-full">
                              {renderCellValue(item, row.key)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageIndex = i;
                    if (totalPages > 5) {
                      if (currentPage > 2) {
                        pageIndex = currentPage - 2 + i;
                      }
                      if (pageIndex >= totalPages) {
                        pageIndex = totalPages - 5 + i;
                      }
                    }

                    return (
                      <button
                        key={pageIndex}
                        onClick={() => setCurrentPage(pageIndex)}
                        className={`w-8 h-8 text-xs font-medium rounded transition-colors ${
                          pageIndex === currentPage
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageIndex + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === totalPages - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No records found</p>
            <p className="text-gray-400 text-xs mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/20 transition-all duration-200"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl transform transition-transform max-h-[80vh] flex flex-col">
            {/* Drawer handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Status
                </label>
                <div className="space-y-2">
                  {["", "Active", "Inactive", "Pending"].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={filters.status === status}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">
                        {status || "All Statuses"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange("role", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) =>
                    handleFilterChange("department", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalDataTable;
