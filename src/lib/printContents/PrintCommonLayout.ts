interface PrintCommonLayoutProps {
  title?: string;
  data: Record<string, unknown> | Record<string, unknown>[];
  excludeFields?: string[];
  fieldLabels?: Record<string, string>;
  className?: string;
  showTitle?: boolean;
  showIndex?: boolean;
}

export const PrintCommonLayout = ({
  title = "Print",
  data,
  excludeFields = ["id", "__v", "_id"],
  fieldLabels = {},
  showTitle = true,
  showIndex = true,
}: PrintCommonLayoutProps) => {
  // Ensure data is an array
  const dataArray = Array.isArray(data) ? data : [data];

  // Get all unique fields from all items
  const allFields = Array.from(
    new Set(
      dataArray.flatMap((item) =>
        Object.keys(item).filter((key) => !excludeFields.includes(key))
      )
    )
  );

  // Format field name for display
  const formatFieldName = (field: string): string => {
    return (
      fieldLabels[field] ||
      field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim()
    );
  };

  // Format field value for display
  const formatFieldValue = (value: unknown): string => {
    if (value === undefined || value === null) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return value.toLocaleString();
    if (typeof value === "object" && !Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return `
      <div className="print-container max-w-2xl mx-auto p-6 rounded-lg border border-gray-300 shadow-sm space-y-6 bg-white mb-8">
        ${dataArray
          .map(
            (item, index) => `
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8 print:shadow-none print:border print:border-gray-200 ${
              index < dataArray.length - 1 ? "page-break" : ""
            }">
              ${
                showTitle
                  ? `
                <h2 class="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
                  ${title} ${
                      showIndex && dataArray.length > 1 ? `#${index + 1}` : ""
                    }
                </h2>
              `
                  : ""
              }
              
              <div class="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-b pb-2">
                ${allFields
                  .filter((field) => item[field] !== undefined)
                  .map(
                    (field) => `
                    <div class="space-y-1">
                      <div class="font-semibold text-gray-800">
                        ${formatFieldName(field)}:
                      </div>
                      <div class="text-gray-600 break-words">
                        ${formatFieldValue(item[field])}
                      </div>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            </div>
          `
          )
          .join("")}
        
        <div class="flex justify-end mt-8 no-print">
          <button 
            onclick="window.print()" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Print
          </button>
        </div>
      </div>
  `;
};

// Example usage: you can rename any property with fieldLabels and make sure you pass a title
/*
const data = [
  { id: 1, name: "John", age: 30, isActive: true, createdAt: new Date() },
  { id: 2, name: "Jane", email: "jane@example.com", role: "Admin" }
];

const html = PrintCommonLayout({
  title: "User Report",
  data,
  excludeFields: ["id"],
  fieldLabels: {
    name: "Full Name",
    isActive: "Active Status"
  }
});
*/
