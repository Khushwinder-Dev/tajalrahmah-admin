import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UploadCloud,
  X,
  Check,
  Loader2,
  ChevronsRight,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";

interface CsvImportModalProps {
  open: boolean;
  onClose: () => void;
  errorCount?: number;
  successCount?: number;
}

type ImportStage = "upload" | "match" | "import" | "completed";

export default function CsvImportModal({
  open,
  onClose,
  errorCount = 23,
  successCount = 77,
}: CsvImportModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentStage, setCurrentStage] = useState<ImportStage>("upload");
  const [, setIsImporting] = useState(false);
  const [fieldMatches, setFieldMatches] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("new");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setCurrentStage("upload");
      // Simulate field matching (in a real app, you'd parse the CSV header)
      setFieldMatches({
        "Product Name": "name",
        Description: "description",
        Price: "price",
        // Add more field matches as needed
      });
    }
  };

  const startImport = () => {
    setIsImporting(true);
    setCurrentStage("match");

    // Simulate import process
    setTimeout(() => setCurrentStage("import"), 2000);
    setTimeout(() => {
      setCurrentStage("completed");
      setIsImporting(false);
    }, 4000);
  };

  useEffect(() => {
    if (!open) {
      // Reset state when modal closes
      setSelectedFile(null);
      setCurrentStage("upload");
      setIsImporting(false);
      setFieldMatches({});
      setActiveTab("new");
    }
  }, [open]);

  const getStageStatus = (stage: ImportStage) => {
    if (stage === currentStage) return "active";
    const stageOrder: ImportStage[] = [
      "upload",
      "match",
      "import",
      "completed",
    ];
    return stageOrder.indexOf(currentStage) > stageOrder.indexOf(stage)
      ? "completed"
      : "pending";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <DialogTitle className="text-blue-600 text-lg font-bold">
            Import
          </DialogTitle>
          <DialogClose asChild>
            <button className="text-gray-500 hover:text-red-500">
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="px-6 pt-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">
              <Plus className="h-4 w-4 mr-2" />
              New Tracking
            </TabsTrigger>
            <TabsTrigger value="import">
              <UploadCloud className="h-4 w-4 mr-2" />
              Import CSV
            </TabsTrigger>
          </TabsList>
          <div className="flex">
            {/* New Tracking Tab */}
            <TabsContent value="new" className="w-full p-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Add New Product</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Add Product
                </Button>
              </div>
            </TabsContent>

            {/* Import CSV Tab */}
            <TabsContent value="import" className="w-full">
              <div className="flex">
                {/* Left - Import Status */}
                <div className="w-1/3 border-r bg-gray-50 p-6">
                  <p className="text-sm text-gray-600 mb-4">Import Progress</p>

                  {/* Progress Bar */}
                  <div className="space-y-6">
                    {/* Upload File Stage */}
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          getStageStatus("upload") === "completed"
                            ? "bg-green-100 text-green-600"
                            : getStageStatus("upload") === "active"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {getStageStatus("upload") === "completed" ? (
                          <Check className="h-4 w-4" />
                        ) : getStageStatus("upload") === "active" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <span>1</span>
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            getStageStatus("upload") === "active"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          Upload file
                        </p>
                        <p className="text-xs text-gray-500">
                          Select your CSV file
                        </p>
                      </div>
                    </div>

                    {/* Match Fields Stage */}
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          getStageStatus("match") === "completed"
                            ? "bg-green-100 text-green-600"
                            : getStageStatus("match") === "active"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {getStageStatus("match") === "completed" ? (
                          <Check className="h-4 w-4" />
                        ) : getStageStatus("match") === "active" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <span>2</span>
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            getStageStatus("match") === "active"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          Match fields
                        </p>
                        <p className="text-xs text-gray-500">
                          Map CSV columns to fields
                        </p>
                      </div>
                    </div>

                    {/* Import Products Stage */}
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          getStageStatus("import") === "completed"
                            ? "bg-green-100 text-green-600"
                            : getStageStatus("import") === "active"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {getStageStatus("import") === "completed" ? (
                          <Check className="h-4 w-4" />
                        ) : getStageStatus("import") === "active" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <span>3</span>
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            getStageStatus("import") === "active"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          Import Products
                        </p>
                        <p className="text-xs text-gray-500">
                          Save to database
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Success Message */}
                  {currentStage === "completed" && (
                    <div className="mt-6 p-3 bg-green-50 rounded text-center">
                      <p className="text-green-600 font-medium flex items-center justify-center">
                        <Check className="h-4 w-4 mr-2" />
                        Import completed successfully!
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {successCount} products imported
                      </p>
                    </div>
                  )}
                </div>

                {/* Right - Content Area */}
                <div className="w-2/3 p-6">
                  {currentStage === "upload" && (
                    <>
                      <div className="flex justify-between mb-4 font-semibold text-blue-500">
                        <span>Sample</span>
                        <span>CSV</span>
                      </div>

                      {/* File Drop Area */}
                      <label
                        htmlFor="csv-upload"
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded p-6 text-center cursor-pointer hover:bg-gray-50 transition"
                      >
                        <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Drag and drop your CSV file here
                        </p>
                        <p className="text-xs text-blue-500">
                          Or select file from your computer
                        </p>
                        <input
                          id="csv-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>

                      {/* Selected File Info */}
                      {selectedFile && (
                        <div className="mt-4 p-3 bg-blue-50 rounded flex items-center justify-between">
                          <span className="text-sm text-blue-700 truncate max-w-xs">
                            {selectedFile.name}
                          </span>
                          <button
                            onClick={() => setSelectedFile(null)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {currentStage === "match" && (
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-700">
                        Match CSV Columns to Fields
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(fieldMatches).map(
                          ([csvHeader, field]) => (
                            <div
                              key={csvHeader}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <span className="text-sm text-gray-600">
                                {csvHeader}
                              </span>
                              <div className="flex items-center">
                                <ChevronsRight className="h-4 w-4 text-gray-400 mx-2" />
                                <select
                                  className="text-sm border rounded p-1"
                                  value={field}
                                  onChange={(e) =>
                                    setFieldMatches((prev) => ({
                                      ...prev,
                                      [csvHeader]: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="name">Product Name</option>
                                  <option value="description">
                                    Description
                                  </option>
                                  <option value="price">Price</option>
                                  <option value="sku">SKU</option>
                                  <option value="quantity">Quantity</option>
                                </select>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {currentStage === "import" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                      <p className="text-gray-700 font-medium">
                        Importing products...
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Please wait while we save your products
                      </p>
                    </div>
                  )}

                  {currentStage === "completed" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Check className="h-8 w-8 text-green-500 mb-4" />
                      <p className="text-gray-700 font-medium">
                        Import completed!
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {successCount} products were successfully imported
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6">
                    {currentStage === "upload" && (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setCurrentStage("match")}
                        disabled={!selectedFile}
                      >
                        Continue to Field Matching
                      </Button>
                    )}

                    {currentStage === "match" && (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={startImport}
                      >
                        Confirm and Import Products
                      </Button>
                    )}

                    {currentStage === "completed" && (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={onClose}
                      >
                        Done
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer Alert */}
        {activeTab === "import" &&
          currentStage === "completed" &&
          errorCount > 0 && (
            <div className="bg-yellow-100 border-t px-6 py-4">
              <Alert variant="default" className="text-yellow-800 text-sm">
                <AlertTitle>Some rows couldn't be processed</AlertTitle>
                <AlertDescription>
                  {errorCount} rows had invalid or missing data. Please correct
                  the data in the file and try again.
                </AlertDescription>
              </Alert>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}
