/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Modal, Stepper } from "@mantine/core";
import Papa from "papaparse";
import { FiUploadCloud } from "react-icons/fi";
import { Dropzone } from "@mantine/dropzone";
import {
  CircleX,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  X,
} from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";

interface ImportStepperProps {
  opened: boolean;
  onClose: () => void;
}

const ImportStepper = ({ opened, onClose }: ImportStepperProps) => {
  const [active, setActive] = useState(0);
  const [missingField, setMissingField] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));

  const resetStepper = () => {
    setActive(0);
    setMissingField(false);
    setImportStatus(null);
    setCsvData([]);
    setErrMsg("");
    setValidationErrors([]);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetStepper();
    onClose();
  };

  const requiredFields = ["country_code", "calling_code", "country_name"];

  // Auto-progress to next step when fields are successfully matched
  useEffect(() => {
    if (active === 1 && !missingField && csvData.length > 0) {
      const timer = setTimeout(() => {
        nextStep(); // Move to "In Progress" step
      }, 2000); // Wait 2 seconds to show success message

      return () => clearTimeout(timer);
    }
  }, [active, missingField, csvData.length]);

  // Generate and download sample CSV
  const downloadSampleCSV = () => {
    const sampleData = [
      {
        country_code: "BD",
        calling_code: "+880",
        country_name: "Bangladesh",
        default: "false",
        active: "true",
        draft: "false",
        delete: "false",
      },
      {
        country_code: "US",
        calling_code: "+1",
        country_name: "United States",
        default: "false",
        active: "true",
        draft: "false",
        delete: "false",
      },
      {
        country_code: "UK",
        calling_code: "+44",
        country_name: "United Kingdom",
        default: "true",
        active: "true",
        draft: "false",
        delete: "false",
      },
      {
        country_code: "IN",
        calling_code: "+91",
        country_name: "India",
        default: "false",
        active: "false",
        draft: "true",
        delete: "false",
      },
    ];

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample_countries.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (files: any) => {
    setMissingField(false);
    setValidationErrors([]);
    setIsProcessing(true);

    const file = files?.[0];
    if (!file) {
      setIsProcessing(false);
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setErrMsg("Please upload a CSV file only.");
      setMissingField(true);
      setIsProcessing(false);
      return;
    }

    nextStep();

    Papa.parse(file, {
      complete: (result: any) => {
        setIsProcessing(false);

        if (result.errors && result.errors.length > 0) {
          setErrMsg("Error parsing CSV file. Please check the file format.");
          setMissingField(true);
          return;
        }

        const validation = validateRequiredFields(result.data);

        if (!validation.isValid) {
          setValidationErrors(validation.missingFields);
          setMissingField(true);
          return;
        }

        // Process and transform the data
        const updatedData = result.data
          .filter(
            (row: any) => row.country_code && row.country_code.trim() !== ""
          )
          .map((row: any, index: number) => ({
            id: index + 1,
            country_code: row.country_code?.trim().toUpperCase(),
            calling_code: row.calling_code?.trim(),
            country_name: row.country_name?.trim(),
            is_default: convertStringToBoolean(row.default),
            is_active: convertStringToBoolean(row.active),
            draft: convertStringToBoolean(row.draft),
            is_deleted: convertStringToBoolean(row.delete),
            name_in_bangla: null,
            name_in_arabic: null,
            flag: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: convertStringToBoolean(row.delete)
              ? new Date().toISOString()
              : null,
          }));

        if (updatedData.length === 0) {
          setErrMsg("No valid data found in the CSV file.");
          setMissingField(true);
          return;
        }

        setCsvData(updatedData);
      },
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
    });
  };

  // Validate required fields
  const validateRequiredFields = (data: any[]) => {
    if (!data || data.length === 0) {
      return { isValid: false, missingFields: ["No data found"] };
    }

    const firstRow = data[0];
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (
        !Object.prototype.hasOwnProperty.call(firstRow, field) ||
        firstRow[field] === undefined ||
        firstRow[field] === ""
      ) {
        missingFields.push(field);
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  };

  // Convert string boolean values to actual booleans
  const convertStringToBoolean = (value: any): boolean => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      return value.toLowerCase() === "true" || value === "1";
    }
    return Boolean(value);
  };

  const handleImport = async () => {
    setErrMsg("");
    setImportStatus(null);
    if (!csvData) return;

    console.log("Importing countries:", csvData);
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const isSuccess = true; // Set to true/false for demo

      if (isSuccess) {
        setImportStatus("success");
      } else {
        setImportStatus("error");
        setErrMsg(
          "Failed to import some countries. Please check the data and try again."
        );
      }
    } catch (err: any) {
      console.error("Import error:", err);
      setImportStatus("error");
      setErrMsg(
        err?.data?.message || "An unexpected error occurred during import."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const canImport =
    active === 2 &&
    csvData.length > 0 &&
    !missingField &&
    !isProcessing &&
    importStatus === null;

  // Calculate stepper completion status
  const getStepperActive = () => {
    if (importStatus === "success") {
      return 3; // Show completion tick mark
    }
    return active;
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      size="lg"
      centered
      radius={20}
      withCloseButton={false}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Custom Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Import Countries
          </h2>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {importStatus === "success" ? (
            // Success message outside stepper, styled like dropzone
            <div className="mt-4">
              <div className="h-[280px] border-2 border-green-300 rounded-lg bg-green-50 flex flex-col items-center justify-center text-center p-4">
                <CheckCircle size={80} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold text-green-500 mb-2">
                  Import Completed Successfully!
                </h3>
                <p className="text-gray-600 mb-4">
                  {csvData?.length || 0} countries have been imported
                  successfully.
                </p>
                <button
                  onClick={resetStepper}
                  className="min-w-[160px] px-6 py-2 rounded-lg cursor-pointer border border-primary bg-white text-primary hover:text-white hover:bg-primary transition-colors"
                >
                  Import More Countries
                </button>
              </div>
            </div>
          ) : (
            // Normal stepper flow
            <Stepper
              active={getStepperActive()}
              color="var(--primary)"
              size="sm"
            >
              <Stepper.Step label="Upload File">
                <div className="mt-4">
                  <Dropzone
                    onDrop={handleFileUpload}
                    radius={10}
                    loading={isProcessing}
                    accept={["text/csv", ".csv"]}
                    disabled={isProcessing}
                    styles={{
                      root: {
                        height: "280px",
                        border: "2px dashed #e9ecef",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  >
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <FiUploadCloud className="text-4xl text-gray-500 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        {isProcessing
                          ? "Processing file..."
                          : "Drag and drop a file or click to browse"}
                      </p>
                      <p className="text-sm text-primary mb-2">
                        Note: Only .CSV format is accepted.
                      </p>
                    </div>
                  </Dropzone>
                </div>
              </Stepper.Step>

              <Stepper.Step label="Match Fields">
                <div className="mt-4 min-h-[280px] flex items-center justify-center">
                  {missingField ? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <CircleX size={80} className="text-red-500 mb-4" />
                      <h3 className="text-2xl font-semibold text-red-500 mb-2">
                        Failed to Import!
                      </h3>
                      <p className="text-lg font-medium text-gray-700 mb-4">
                        {errMsg || "Fields validation failed!"}
                      </p>
                      {validationErrors.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-medium text-red-500 mb-2">
                            Missing required fields:
                          </p>
                          <ul className="list-disc list-inside text-red-500 text-sm">
                            {validationErrors.map((field, index) => (
                              <li key={index}>{field}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button
                        onClick={resetStepper}
                        className="min-w-[120px] px-6 py-2 rounded-lg cursor-pointer border border-primary bg-white text-primary hover:text-white hover:bg-primary transition-colors"
                      >
                        Back to Upload
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <FileCheck size={80} className="text-green-500 mb-4" />
                      <h3 className="text-2xl font-semibold text-green-500 mb-2">
                        Fields Matched Successfully!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Found {csvData?.length || 0} countries ready to import
                      </p>
                      <p className="text-sm text-gray-500">
                        Proceeding to next step...
                      </p>
                    </div>
                  )}
                </div>
              </Stepper.Step>

              <Stepper.Step label="In Progress">
                <div className="mt-4 min-h-[280px] flex items-center justify-center">
                  {importStatus === "error" ? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <AlertTriangle size={80} className="text-red-500 mb-4" />
                      <h3 className="text-2xl font-semibold text-red-500 mb-2">
                        Import Failed!
                      </h3>
                      <p className="text-red-500 mb-6 max-w-md">
                        {errMsg ||
                          "An error occurred during the import process."}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={resetStepper}
                          className="min-w-[100px] px-6 py-2 rounded-lg cursor-pointer border border-primary bg-white text-primary hover:text-white hover:bg-primary transition-colors"
                        >
                          Start Over
                        </button>
                        <button
                          onClick={handleImport}
                          disabled={isProcessing}
                          className={`min-w-[100px] px-6 py-2 rounded-lg border border-primary transition-colors ${
                            isProcessing
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-primary hover:text-white hover:bg-primary cursor-pointer"
                          }`}
                        >
                          {isProcessing ? "Retrying..." : "Try Again"}
                        </button>
                      </div>
                    </div>
                  ) : isProcessing ? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-6"></div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Importing {csvData?.length || 0} countries...
                      </p>
                      <p className="text-gray-600">
                        Please wait while we process your data
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-6"></div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Ready to import {csvData?.length || 0} countries
                      </p>
                      <p className="text-gray-600">
                        Click "Import Now" to start the process
                      </p>
                    </div>
                  )}
                </div>
              </Stepper.Step>
            </Stepper>
          )}
        </div>

        {/* Footer with Action Buttons */}
        <div
          className={`flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 ${
            isMobile ? "" : ""
          }`}
        >
          {importStatus === "success" ? (
            <></>
          ) : (
            <>
              <button
                onClick={downloadSampleCSV}
                disabled={isProcessing}
                className={`py-2 rounded-full border border-primary transition-colors ${
                  isProcessing
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-primary hover:text-white hover:bg-primary cursor-pointer"
                } ${isMobile ? "w-40 text-xs!" : "text-sm min-w-[140px] px-6"}`}
              >
                Download Sample CSV
              </button>

              <button
                onClick={handleImport}
                disabled={!canImport}
                className={`px-6 py-2 rounded-full border border-primary transition-colors ${
                  canImport
                    ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } ${isMobile ? "w-40 text-xs!" : "text-sm min-w-[140px]"}`}
              >
                {isProcessing ? "Processing..." : "Import Now"}
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImportStepper;
