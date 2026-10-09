/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/MobilePaginationDrawer.tsx
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MobilePaginationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  table: any;
  className?: string;
  overlayClassName?: string;
}

const MobilePaginationDrawer = ({
  isOpen,
  onClose,
  table,
  className = "",
  overlayClassName = "",
}: MobilePaginationDrawerProps) => {
  const [, setIsInputFocused] = useState(false);
  const [pageInputValue, setPageInputValue] = useState(
    (table.getState().pagination.pageIndex + 1).toString()
  );
  const [customPageSize, setCustomPageSize] = useState("");
  const pageInputRef = useRef<HTMLInputElement>(null);

  const defaultSizes = [10, 25, 50, 75];
  const moreSizes = [100, 300, 500, 750, 999];

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  // Calculate the range of items being shown
  const startItem = table.getState().pagination.pageIndex * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalRows);

  const handlePageInputChange = (value: string) => {
    setPageInputValue(value);
  };

  const handlePageInputSubmit = () => {
    const pageNumber = parseInt(pageInputValue);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      table.setPageIndex(pageNumber - 1);
    } else {
      setPageInputValue(currentPage.toString());
    }
  };

  const handleCustomPageSizeSubmit = () => {
    const size = parseInt(customPageSize);
    if (!size) return;
    if (size > 0 && size <= totalRows) {
      table.setPageSize(size);
    }
    setCustomPageSize("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  };

  const handlePageInputFocus = () => {
    setIsInputFocused(true);
    setTimeout(() => {
      pageInputRef.current?.select();
    }, 0);
  };

  const handlePageInputBlur = () => {
    setIsInputFocused(false);
    handlePageInputSubmit();
  };

  // Update input value when page changes externally
  useEffect(() => {
    setPageInputValue(currentPage.toString());
  }, [currentPage]);

  return (
    <>
      {/* Mobile Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 ${overlayClassName}`}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
            <div className="relative w-full pointer-events-auto">
              {/* Cross Button - Outside white background, centered at top */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors border border-gray-200 dark:border-gray-600"
                  aria-label="Close drawer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Drawer Content */}
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.4,
                }}
                className={`w-full bg-white dark:bg-gray-800 rounded-t-3xl shadow-xl mt-12 ${className}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Showing {startItem}-{endItem} of {totalRows}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
                  {/* Data Count Display */}
                  {/* <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Showing {startItem}-{endItem} of {totalRows}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {totalRows === 1 ? "Country" : "Countries"}
                    </div>
                  </div> */}

                  {/* Page Navigation */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Page Navigation
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="hover:text-white hover:bg-primary bg-sky-200 text-black"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="hover:text-white hover:bg-primary bg-sky-200 text-black"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      {/* Page Input */}
                      <div className="flex items-center space-x-2">
                        <Input
                          ref={pageInputRef}
                          type="number"
                          min="1"
                          max={totalPages}
                          value={pageInputValue}
                          onChange={(e) =>
                            handlePageInputChange(e.target.value)
                          }
                          onKeyPress={handleKeyPress}
                          onFocus={handlePageInputFocus}
                          onBlur={handlePageInputBlur}
                          className="w-16 h-8 text-center border-sky-200 bg-sky-50 text-sky-500"
                        />
                        <span className="text-sm text-gray-600">
                          of {totalPages}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="hover:text-white hover:bg-primary bg-sky-200 text-black"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                        className="hover:text-white hover:bg-primary bg-sky-200 text-black"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quick Page Jump - Mobile optimized */}
                    {totalPages > 1 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Quick Jump
                        </div>
                        <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                          {Array.from(
                            { length: Math.min(totalPages, 15) },
                            (_, i) => i + 1
                          ).map((pageNum) => (
                            <Button
                              key={pageNum}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => {
                                table.setPageIndex(pageNum - 1);
                                setPageInputValue(pageNum.toString());
                              }}
                              className={`text-xs ${
                                currentPage === pageNum
                                  ? "bg-primary text-white"
                                  : "bg-white text-sky-500 border-sky-300 hover:bg-primary hover:text-white"
                              }`}
                            >
                              {pageNum}
                            </Button>
                          ))}
                        </div>
                        {totalPages > 15 && (
                          <div className="text-xs text-gray-500 text-center">
                            Showing first 15 pages. Use input above for other
                            pages.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Page Size Selection */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Items per Page
                    </div>

                    {/* Default Page Sizes */}
                    <div className="grid grid-cols-4 gap-2">
                      {defaultSizes.map((size) => (
                        <Button
                          key={size}
                          variant={pageSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => table.setPageSize(Number(size))}
                          className={`${
                            pageSize === size
                              ? "bg-primary text-white border-primary hover:bg-primary"
                              : "hover:text-white hover:bg-primary bg-white text-sky-500 border-sky-300"
                          }`}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>

                    {/* More Sizes */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        More Options
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {/* All option */}
                        <Button
                          variant={
                            pageSize >= totalRows ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => table.setPageSize(totalRows)}
                          className={`text-xs ${
                            pageSize >= totalRows
                              ? "bg-primary text-white hover:bg-primary"
                              : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                          }`}
                        >
                          All
                        </Button>

                        {/* More size options */}
                        {moreSizes.slice(0, 5).map((size) => (
                          <Button
                            key={size}
                            variant={pageSize === size ? "default" : "outline"}
                            size="sm"
                            onClick={() => table.setPageSize(Number(size))}
                            className={`text-xs ${
                              pageSize === size
                                ? "bg-primary text-white hover:bg-primary"
                                : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                            }`}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>

                      {/* Custom Page Size Input */}
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Custom size"
                          value={customPageSize}
                          onChange={(e) => setCustomPageSize(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") handleCustomPageSizeSubmit();
                          }}
                          onBlur={handleCustomPageSizeSubmit}
                          className="flex-1 bg-sky-50 h-8 text-xs text-center text-sky-400 placeholder:text-sky-400 border-sky-300"
                        />
                        <Button
                          size="sm"
                          onClick={handleCustomPageSizeSubmit}
                          className="bg-primary text-white hover:bg-primary"
                        >
                          Set
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobilePaginationDrawer;
