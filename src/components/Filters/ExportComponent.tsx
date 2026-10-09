/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  FileSpreadsheet,
  FileText,
  Download,
  Printer,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@mantine/core";
import { cn } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";
import { toastError, toastSuccess } from "@/lib/toast";
import { exportToExcel } from "@/lib/exportToExcel";
import { exportToCSV } from "@/lib/exportToCSV";
import { printHtmlContent } from "@/lib/printHtmlContent";
import dynamicPrintContent from "@/lib/printContents/countryDetails";
import { TablePDF } from "@/components/TablePDF";
import { useDisclosure } from "@mantine/hooks";
import WhatsAppPopup from "../common/WhatsAppPopup";
import EmailPopup from "../common/EmailPopup";
import FloatingCloseButton from "../common/FloatingCloseButton";
import HeaderSearch from "../HeaderSearch";

interface ExportComponentProps {
  data?: any[];
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

// Mock data for demonstration
const mockData = [
  {
    id: 1,
    name: "United States",
    code: "US",
    isd: "+1",
    currency: "USD",
    states: 50,
    cities: 300,
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    status: "Active",
  },
  {
    id: 2,
    name: "Canada",
    code: "CA",
    isd: "+1",
    currency: "CAD",
    states: 13,
    cities: 65,
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    status: "Active",
  },
  {
    id: 3,
    name: "United Kingdom",
    code: "GB",
    isd: "+44",
    currency: "GBP",
    states: 12,
    cities: 55,
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Germany",
    code: "DE",
    isd: "+49",
    currency: "EUR",
    states: 16,
    cities: 80,
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    status: "Active",
  },
  {
    id: 5,
    name: "France",
    code: "FR",
    isd: "+33",
    currency: "EUR",
    states: 18,
    cities: 75,
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    status: "Active",
  },
];

export default function ExportComponent({
  data = mockData,
  onClose,
}: ExportComponentProps) {
  const [search, setSearch] = useState("");
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set());

  const [whatsappOpened, { open: openWhatsapp, close: closeWhatsapp }] =
    useDisclosure(false);
  const [emailOpened, { open: openEmail, close: closeEmail }] =
    useDisclosure(false);

  const filterableFields = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => key !== "id");
  }, [data]);

  // Filter fields based on search - matches field name OR any value in that field
  const filteredFields = useMemo(() => {
    if (!search) return filterableFields;

    const searchLower = search.toLowerCase();

    return filterableFields.filter((field) => {
      // Check if field name matches
      const fieldNameMatches = field.toLowerCase().includes(searchLower);

      if (fieldNameMatches) return true;

      // Check if any value in this field matches the search
      const hasMatchingValue = data.some((row) => {
        const value = row[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      });

      return hasMatchingValue;
    });
  }, [search, filterableFields, data]);

  // All export functions remain the same...
  const handleExportToPDF = async () => {
    try {
      if (selectedFields.size === 0) {
        toastError("Please select at least one column to export to PDF");
        return;
      }
      const fieldsToExport =
        selectedFields.size > 0 ? Array.from(selectedFields) : filterableFields;

      const exportData = data.map((row) => {
        const filteredRow: Record<string, any> = {};
        fieldsToExport.forEach((field) => {
          filteredRow[field] = row[field];
        });
        return filteredRow;
      });

      const columns = fieldsToExport.map((field) => ({
        key: field,
        header:
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1"),
        width: 100,
      }));

      const blob = await pdf(
        <TablePDF
          data={exportData}
          columns={columns}
          title="Data Export"
          subtitle="Exported Data Report"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data-export.pdf";
      a.click();
      URL.revokeObjectURL(url);

      toastSuccess("PDF export completed successfully");
    } catch (error) {
      console.error(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const handleExportToExcel = () => {
    try {
      if (selectedFields.size === 0) {
        toastError("Please select at least one column to export to Excel");
        return;
      }
      const fieldsToExport =
        selectedFields.size > 0 ? Array.from(selectedFields) : filterableFields;

      const exportData = data.map((row) => {
        const filteredRow: Record<string, any> = {};
        fieldsToExport.forEach((field) => {
          const header =
            field.charAt(0).toUpperCase() +
            field.slice(1).replace(/([A-Z])/g, " $1");
          filteredRow[header] = row[field];
        });
        return filteredRow;
      });

      const columnWidths = fieldsToExport.map(() => 20);

      exportToExcel(exportData, "data-export", "Data Export", columnWidths);
    } catch (error) {
      console.error("Export to Excel failed", error);
      toastError("Export to Excel failed");
    }
  };

  const handleExportToCSV = () => {
    try {
      if (selectedFields.size === 0) {
        toastError("Please select at least one column to export to CSV");
        return;
      }
      const fieldsToExport =
        selectedFields.size > 0 ? Array.from(selectedFields) : filterableFields;

      const exportData = data.map((row) => {
        const filteredRow: Record<string, any> = {};
        fieldsToExport.forEach((field) => {
          const header =
            field.charAt(0).toUpperCase() +
            field.slice(1).replace(/([A-Z])/g, " $1");
          filteredRow[header] = row[field];
        });
        return filteredRow;
      });

      exportToCSV(exportData, "data-export.csv");
    } catch (error) {
      console.error("Export to CSV failed", error);
      toastError("Export to CSV failed");
    }
  };

  const handlePrint = () => {
    try {
      if (selectedFields.size === 0) {
        toastError("Please select at least one column to print");
        return;
      }
      const fieldsToExport =
        selectedFields.size > 0 ? Array.from(selectedFields) : filterableFields;

      const exportData = data.map((row) => {
        const filteredRow: Record<string, any> = {};
        fieldsToExport.forEach((field) => {
          filteredRow[field] = row[field];
        });
        return filteredRow;
      });

      const headers = fieldsToExport.map((field) => ({
        key: field,
        label:
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1"),
      }));

      const html = dynamicPrintContent(exportData, headers, "Data Export");
      printHtmlContent(html);
    } catch (error) {
      console.error(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleExportToDoc = () => {
    try {
      const fieldsToExport =
        selectedFields.size > 0 ? Array.from(selectedFields) : filterableFields;

      // Create Word-compatible HTML with proper XML namespace
      let htmlContent = `
  <html xmlns:o="urn:schemas-microsoft-com:office:office" 
        xmlns:w="urn:schemas-microsoft-com:office:word" 
        xmlns="http://www.w3.org/TR/REC-html40">
  <head>
  <meta charset="utf-8">
  <title>Data Export Report</title>
  <!--[if gte mso 9]>
  <xml>
  <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>90</w:Zoom>
  <w:DoNotPromptForConvert/>
  <w:DoNotShowRevisions/>
  <w:DoNotPrintRevisions/>
  <w:DoNotShowComments/>
  <w:DoNotShowInsertionsAndDeletions/>
  <w:DoNotShowPropertyChanges/>
  <w:DoNotShowMarkup/>
  <w:DoNotShowRevisions/>
  <w:DoNotShowComments/>
  <w:DoNotShowInsertionsAndDeletions/>
  <w:DoNotShowPropertyChanges/>
  </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
  @page {
    margin: 1in;
  }
  body {
    font-family: 'Calibri', sans-serif;
    font-size: 11pt;
    line-height: 1.2;
    margin: 0;
    padding: 0;
  }
  h1 {
    font-size: 18pt;
    font-weight: bold;
    color: #20b7fa;
    margin-bottom: 20pt;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10pt;
  }
  th {
    background-color: #20b7fa;
    color: white;
    font-weight: bold;
    border: 1pt solid #20b7fa;
    padding: 8pt;
    text-align: left;
  }
  td {
    border: 1pt solid #20b7fa;
    padding: 6pt 8pt;
    vertical-align: top;
  }
  tr:nth-child(even) {
    background-color: #F2F2F2;
  }
  tr:hover {
    background-color: #E7E6E6;
  }
  </style>
  </head>
  <body>
    <h1>Data Export Report</h1>
    <p style="margin-bottom: 15pt; color: #666;">Generated on ${new Date().toLocaleDateString()}</p>
    
    <table>
      <thead>
        <tr>`;

      // Add headers
      fieldsToExport.forEach((field) => {
        const header =
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1");
        htmlContent += `<th>${header}</th>`;
      });

      htmlContent += `</tr></thead><tbody>`;

      // Add data rows
      data.forEach((row) => {
        htmlContent += "<tr>";
        fieldsToExport.forEach((field) => {
          htmlContent += `<td>${row[field] || ""}</td>`;
        });
        htmlContent += "</tr>";
      });

      htmlContent += `
      </tbody>
    </table>
    
    <p style="margin-top: 20pt; font-size: 9pt; color: #666;">
      Total records: ${data.length} | Fields exported: ${fieldsToExport.length}
    </p>
  </body>
  </html>`;

      // Create and download as .doc file with proper MIME type
      const blob = new Blob([htmlContent], {
        type: "application/vnd.ms-word",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data-export.doc";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export to Word failed", error);
      toastError("Export to Word failed");
    }
  };

  const exportButtons = [
    {
      id: "excel",
      icon: FileSpreadsheet,
      label: "Export to Excel",
      color: "text-green-600",
      onClick: handleExportToExcel,
    },
    {
      id: "pdf",
      icon: FileText,
      label: "Export to PDF",
      color: "text-red-600",
      onClick: handleExportToPDF,
    },
    {
      id: "csv",
      icon: Download,
      label: "Export to CSV",
      color: "text-blue-600",
      onClick: handleExportToCSV,
    },
    {
      id: "print",
      icon: Printer,
      label: "Export to Print",
      color: "text-gray-600",
      onClick: handlePrint,
    },
    {
      id: "docs",
      icon: FileText,
      label: "Export to Docs",
      color: "text-purple-600",
      onClick: handleExportToDoc,
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "Export to WhatsApp",
      color: "text-green-500",
      onClick: () => {
        openWhatsapp();
      },
    },
    {
      id: "email",
      icon: Mail,
      label: "Export to Email",
      color: "text-blue-500",
      onClick: () => {
        openEmail();
      },
    },
  ];

  const handleFieldCheck = (field: string, checked: boolean) => {
    setSelectedFields((prev) => {
      const updated = new Set(prev);
      if (checked) {
        updated.add(field);
      } else {
        updated.delete(field);
      }
      return updated;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedFields(checked ? new Set(filteredFields) : new Set());
  };

  const isSelectAllChecked =
    selectedFields.size === filteredFields.length && filteredFields.length > 0;

  return (
    <>
      <div className="h-full flex flex-col relative">
        {/* Floating Close Button */}
        <FloatingCloseButton onClose={onClose} />

        {/* Full Width Search */}
        <div className="p-3 border-b flex-shrink-0">
          <HeaderSearch searchQuery={search} setSearchQuery={setSearch} />
        </div>

        {/* Full Width Select All */}
        <div className="px-6 py-4 border-b bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="flex items-center justify-between gap-2 font-medium">
            <span className="text-gray-900 dark:text-gray-100">Select All</span>
            <div
              className={cn(
                "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                isSelectAllChecked
                  ? "bg-sky-400 justify-end"
                  : "bg-sky-200 justify-start"
              )}
              onClick={() => handleSelectAll(!isSelectAllChecked)}
            >
              <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
            </div>
          </div>
        </div>

        {/* Content Area with Single Scroll */}
        <div className="flex-1 flex overflow-hidden">
          {/* Combined Content Area with Single Scroll */}
          <div className="flex-1 overflow-y-auto grid-scroll">
            <div className="flex">
              {/* Left side - Field names */}
              <div className="flex-1 px-6 py-4 space-y-3">
                {filteredFields.map((field) => {
                  const isFieldChecked = selectedFields.has(field);
                  const displayName =
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1");

                  return (
                    <div
                      key={field}
                      className="flex items-center justify-between gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-2"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                        {displayName}
                      </span>
                      <div
                        className={cn(
                          "w-[36px] h-4 rounded-[190px] flex items-center gap-2.5 transition-all duration-200 cursor-pointer",
                          isFieldChecked
                            ? "bg-sky-400 justify-end"
                            : "bg-sky-200 justify-start"
                        )}
                        onClick={() => handleFieldCheck(field, !isFieldChecked)}
                      >
                        <div className="w-4.5 h-4.5 bg-gray-50 rounded-full shadow-[-1px_14px_18px_0px_rgba(0,0,0,0.25)] transition-all duration-200" />
                      </div>
                    </div>
                  );
                })}

                {/* Empty State */}
                {filteredFields.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No matching fields found
                  </div>
                )}
              </div>

              {/* Right side - Export options (sticky) */}
              <div className="w-20 border-l sticky top-0">
                <div className="flex flex-col items-center space-y-4 p-2 py-6">
                  {exportButtons.map((button) => {
                    const IconComponent = button.icon;
                    return (
                      <Tooltip
                        key={button.id}
                        label={button.label}
                        position="left"
                        withArrow
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className={`w-12 h-12 rounded-full hover:scale-105 transition-transform flex-shrink-0 ${button.color}`}
                          onClick={button.onClick}
                        >
                          <IconComponent className="w-6 h-6" />
                        </Button>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailPopup closeEmail={closeEmail} emailOpened={emailOpened} />
      <WhatsAppPopup
        closeWhatsapp={closeWhatsapp}
        whatsappOpened={whatsappOpened}
      />
    </>
  );
}
