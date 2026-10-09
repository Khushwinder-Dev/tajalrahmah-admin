import { useState } from "react";
import { Modal } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Footer = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  const tabs = [
    { id: "list", label: "List" },
    { id: "add", label: "Add" },
    { id: "edit", label: "Edit" },
    { id: "view", label: "View" },
    { id: "history", label: "History" },
  ];

  const getTabContent = (tabId: string) => {
    const content = {
      list: {
        content: `
          The List view provides a comprehensive table format to display your data with advanced features:

          Key Features:
          • Sortable columns - Click on any column header to sort data in ascending or descending order
          • Search functionality - Use the search bar to find specific records quickly
          • Filtering options - Apply multiple filters to narrow down your results
          • Column visibility - Show or hide columns based on your preferences
          • Pagination - Navigate through large datasets efficiently
          • Bulk actions - Select multiple items for batch operations

          Navigation Tips:
          • Use keyboard shortcuts: Ctrl+F for quick search
          • Right-click on column headers for additional options
          • Drag column headers to reorder them
          • Use the visibility toggle to customize your view

          Performance:
          • The list view supports virtual scrolling for large datasets
          • Filters are applied in real-time without page refresh
          • Export options available for filtered results
        `,
      },
      add: {
        content: `
          Creating new records is simple and intuitive with our guided form system:

          Getting Started:
          • Click the "Add" button to open the creation form
          • All required fields are marked with red asterisks (*)
          • Form validation occurs in real-time as you type
          • Auto-save functionality prevents data loss

          Form Features:
          • Smart field suggestions based on previous entries
          • File upload support with drag-and-drop functionality
          • Date picker with calendar integration
          • Rich text editor for description fields
          • Dynamic form fields that adjust based on selections

          Validation Rules:
          • Email fields must contain valid email format
          • Phone numbers are automatically formatted
          • Required fields prevent form submission until completed
          • Custom validation messages provide clear guidance

          Tips for Success:
          • Save draft versions using Ctrl+S
          • Use tab navigation to move between fields quickly
          • Upload images in JPG, PNG, or WebP formats
          • Review all information before final submission
        `,
      },
      edit: {
        content: `
          Modify existing records with our powerful editing interface:

          Accessing Edit Mode:
          • Click the edit icon (pencil) next to any record
          • Double-click on editable fields for quick edit
          • Use keyboard shortcut 'E' when a record is selected
          • Access edit from the record detail view

          Edit Features:
          • Track changes with visual indicators
          • Undo/Redo functionality for all modifications
          • Auto-save every 30 seconds to prevent data loss
          • Field-level permissions control what can be modified
          • Change history log maintains audit trail

          Advanced Options:
          • Bulk edit multiple records simultaneously
          • Copy values from one field to another
          • Revert individual fields to previous values
          • Compare current version with original

          Best Practices:
          • Review changes before saving
          • Use comments to document reasons for changes
          • Check dependent fields when making modifications
          • Verify data integrity after updates
        `,
      },
      view: {
        content: `
          The detailed view provides comprehensive information about individual records:

          View Components:
          • Header section with key identifying information
          • Tabbed interface for organized data presentation
          • Related records section showing connections
          • Activity timeline displaying recent actions
          • File attachments and media gallery

          Navigation Features:
          • Previous/Next arrows to browse through records
          • Breadcrumb navigation showing your path
          • Quick action buttons for common tasks
          • Print-friendly layout option
          • Full-screen mode for detailed analysis

          Data Presentation:
          • Responsive layout adapts to screen size
          • Color-coded status indicators
          • Interactive charts and graphs where applicable
          • Expandable sections for detailed information
          • Export individual record data

          Interaction Options:
          • Click to call on phone numbers
          • Email links open default email client
          • Address links integrate with maps
          • Social media links open in new tabs
          • Document preview without downloading
        `,
      },
      history: {
        content: `
          Track all changes and activities with our comprehensive history system:

          History Types:
          • Create events - When records were first added
          • Modification events - What changed and when
          • Delete events - Removal and restoration activities
          • Access events - Who viewed what and when
          • System events - Automated actions and updates

          History Details:
          • User information - Who performed the action
          • Timestamp - Exact date and time of changes
          • Change description - What specifically was modified
          • Before/After values - See what changed
          • IP address and device information for security

          Filtering Options:
          • Filter by date range to find specific periods
          • Filter by user to see individual activity
          • Filter by action type (create, edit, delete, view)
          • Search within history descriptions
          • Export history reports for compliance

          Security Features:
          • Immutable history records cannot be altered
          • Role-based access to history information
          • Automatic archiving of old history data
          • Compliance reporting for audit requirements
        `,
      },
    };

    return content[tabId as keyof typeof content] || content.list;
  };

  return (
    <>
      <footer className="border-t border-gray-200 dark:border-gray-700 py-4 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-center sm:justify-between flex-wrap gap-4 mx-auto cursor-pointer">
          {/* Left Section - Powered by (left-aligned) / Live Chat (right-aligned in RTL) */}
          <div className="flex justify-start rtl:justify-end items-center cursor-pointer order-1 rtl:order-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Powered by{" "}
              <span
                className="text-primary font-medium cursor-pointer"
                onClick={() =>
                  window.open("https://rapidsmarterp.com/", "_blank")
                }
              >
                Rapid
              </span>
            </span>
          </div>

          {/* Middle Section - Help (center-aligned) */}
          <div className="flex justify-center items-center cursor-pointer order-2">
            <button
              className="flex items-center text-sm text-gray-500 hover:text-primary dark:hover:text-gray-300 transition-colors cursor-pointer"
              onClick={() => setIsHelpModalOpen(true)}
            >
              Need help?
            </button>
          </div>

          {/* Right Section - Live Chat (right-aligned) / Powered by (left-aligned in RTL) */}
          <div className="flex justify-end rtl:justify-start items-center cursor-pointer order-3 rtl:order-1">
            <button
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
              onClick={() =>
                window.open(
                  "https://web.whatsapp.com/send?phone=971562015468&text=",
                  "_blank"
                )
              }
            >
              Live Chat
            </button>
          </div>
        </div>
      </footer>

      {/* Help Documentation Modal - Mantine Modal */}
      <Modal
        opened={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        size="50%"
        centered
        withCloseButton={false}
        radius={20}
        styles={{
          body: {
            padding: 0,
            height: "calc(100% - 80px)",
            display: "flex",
            flexDirection: "column",
          },
          header: {
            display: "none", // Hide default header since we're creating custom one
          },
        }}
      >
        <div className="flex flex-col h-full">
          {/* Custom Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Documentation & Help
            </h2>
            <button
              onClick={() => setIsHelpModalOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Horizontal Tabs */}
          <div className="border-b bg-gray-50 dark:bg-gray-800/50 px-6">
            <nav className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium rounded-none border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <div
              className="flex-1 overflow-y-scroll grid-scroll p-6"
              style={{ maxHeight: "calc(60vh - 150px)" }}
            >
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {getTabContent(activeTab)
                  .content.split("\n\n")
                  .map((paragraph: string, index: number) => (
                    <div key={index} className="mb-4">
                      {paragraph
                        .split("\n")
                        .map((line: string, lineIndex: number) => {
                          if (line.trim().startsWith("•")) {
                            return (
                              <li
                                key={lineIndex}
                                className="ml-4 text-gray-700 dark:text-gray-300 mb-1"
                              >
                                {line.trim().substring(1).trim()}
                              </li>
                            );
                          }
                          if (line.trim() && !line.includes(":")) {
                            return (
                              <p
                                key={lineIndex}
                                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                              >
                                {line.trim()}
                              </p>
                            );
                          }
                          if (line.includes(":") && line.trim().length < 50) {
                            return (
                              <h3
                                key={lineIndex}
                                className="font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2"
                              >
                                {line.trim()}
                              </h3>
                            );
                          }
                          return null;
                        })}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
