import { useState } from "react";
import { cn } from "@/lib/utils";

type BillPayment = {
  dueDate: string;
  vendor: string;
  refNumber: string;
  amount: number;
  billDate: string;
};

type BillPaymentTableProps = {
  payments?: BillPayment[];
  className?: string;
  onPaymentSelect?: (payments: BillPayment[]) => void;
};

const mockPayments: BillPayment[] = [
  {
    dueDate: "04-07-2025",
    vendor: "ABC Office Supplies",
    refNumber: "INV-2025-001",
    amount: 1250.0,
    billDate: "04-07-2025",
  },
  {
    dueDate: "10-07-2025",
    vendor: "TechCorp Solutions",
    refNumber: "BILL-789",
    amount: 850.0,
    billDate: "08-07-2025",
  },
  {
    dueDate: "10-07-2025",
    vendor: "Metro Utilities",
    refNumber: "UTL-456",
    amount: 340.5,
    billDate: "05-07-2025",
  },
  {
    dueDate: "15-07-2025",
    vendor: "Global Marketing Inc",
    refNumber: "MKT-2025-123",
    amount: 2500.0,
    billDate: "12-07-2025",
  },
  {
    dueDate: "20-07-2025",
    vendor: "Prime Logistics",
    refNumber: "SHIP-567",
    amount: 675.25,
    billDate: "18-07-2025",
  },
];

export default function BillPaymentTable({
  payments = mockPayments,
  className,
  onPaymentSelect,
}: BillPaymentTableProps) {
  const [selectedPayments, setSelectedPayments] = useState<BillPayment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.refNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePaymentToggle = (payment: BillPayment) => {
    const isSelected = selectedPayments.some(
      (p) =>
        p.dueDate === payment.dueDate &&
        p.vendor === payment.vendor &&
        p.refNumber === payment.refNumber
    );

    let newSelected: BillPayment[];
    if (isSelected) {
      newSelected = selectedPayments.filter(
        (p) =>
          !(
            p.dueDate === payment.dueDate &&
            p.vendor === payment.vendor &&
            p.refNumber === payment.refNumber
          )
      );
    } else {
      newSelected = [...selectedPayments, payment];
    }

    setSelectedPayments(newSelected);
    onPaymentSelect?.(newSelected);
  };

  const totalSelectedAmount = selectedPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div
      className={cn("bg-white border border-gray-200 rounded-lg", className)}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Bill Payment Information:
          </h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 text-sky-500 hover:text-sky-600 transition-colors cursor-pointer duration-300"
          >
            <span className="text-[15px] font-medium">
              {isCollapsed ? "Show Bills" : "Hide Bills"}
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${
                isCollapsed ? "" : "rotate-180"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">Export</span>
            <button className="text-sky-500 hover:text-sky-600 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <svg
              className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table - Only show when expanded */}
      {!isCollapsed && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPayments([...paginatedPayments]);
                        onPaymentSelect?.([...paginatedPayments]);
                      } else {
                        setSelectedPayments([]);
                        onPaymentSelect?.([]);
                      }
                    }}
                    checked={
                      selectedPayments.length === paginatedPayments.length &&
                      paginatedPayments.length > 0
                    }
                    className="rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Due date
                  <svg
                    className="w-3 h-3 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ref number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedPayments.map((payment, index) => {
                const isSelected = selectedPayments.some(
                  (p) =>
                    p.dueDate === payment.dueDate &&
                    p.vendor === payment.vendor &&
                    p.refNumber === payment.refNumber
                );

                return (
                  <tr
                    key={index}
                    className={cn(
                      "hover:bg-gray-50 cursor-pointer",
                      isSelected && "bg-sky-50"
                    )}
                    onClick={() => handlePaymentToggle(payment)}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handlePaymentToggle(payment)}
                        className="rounded border-gray-300 text-sky-500 focus:ring-sky-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {payment.dueDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {payment.vendor}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {payment.refNumber || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {payment.billDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer - Only show when expanded */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of{" "}
            {filteredPayments.length} entries
            {selectedPayments.length > 0 && (
              <span className="ml-4 font-medium text-sky-500">
                Selected: {selectedPayments.length} (
                {formatCurrency(totalSelectedAmount)})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            <span className="px-3 py-1 bg-sky-500 text-white rounded text-sm font-medium">
              {currentPage}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
