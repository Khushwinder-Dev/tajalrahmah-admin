/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Modal } from "@mantine/core";
import HistoryDataTable from "@/components/common/HistoryDataTable";
import { mockHistoryData } from "@/mockData/country-mockdata";
import { Edit, Plus } from "lucide-react";
import NewPageLayout from "@/components/common/NewPageLayout";
import { Eye, List } from "lucide-react";
import CreateComponent from "@/pages/Country/CreatePage";
import EditComponent from "@/pages/Country/EditPage";
import ViewComponent from "@/pages/Country/CountryDetails";
import { ResetFormModal } from "@/components/common/ResetFormModal";

// Type definition for TypeScript
export type HistoryEntry = {
  id: string;
  date: string;
  user: string;
  status: "Active" | "InActive" | "Delete" | "Draft";
  export: "Single" | "Bulk";
  pdf: boolean;
  csv: boolean;
  xls: boolean;
  doc: boolean;
  print: boolean;
};

export default function CountryDetailsPage() {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [, setActiveTab] = useState<string | null>("create");

  return (
    <>
      <NewPageLayout
        title="Your Page Title"
        activeTab="create"
        onTabChange={(value) => setActiveTab(value)}
        tabsData={[
          {
            value: "create",
            label: "Create",
            icon: <Plus size={16} />,
            content: <CreateComponent />,
          },
          {
            value: "edit",
            label: "Edit",
            icon: <Edit size={16} />,
            content: <EditComponent />,
          },
          {
            value: "view",
            label: "View",
            icon: <Eye size={16} />,
            content: <ViewComponent />,
          },
          {
            value: "list",
            label: "List",
            icon: <List size={16} />,
            content: <></>,
          },
        ]}
        // ... other props
      >
        <div>test</div>
      </NewPageLayout>

      {/* History Modal */}
      <Modal
        opened={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        size="50%"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        withCloseButton={false}
        styles={{
          body: {
            height: "620px", // Fixed height in pixels
            overflow: "hidden",
            padding: 4,
          },
          content: {
            // height: "80vh", // Fixed height - 80% of viewport height
            display: "flex",
            flexDirection: "column",
          },
          header: {
            flexShrink: 0,
          },
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-lg font-semibold text-blue-600">History</span>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <HistoryDataTable columnData={mockHistoryData} />
        </Modal.Body>
      </Modal>

      {/* Export Warning Modal */}
      <ResetFormModal
        opened={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={() => setShowExportModal(false)}
        title="Export Options Required"
        message="Please select PDF/Print options before exporting. You need to enable at least one to export the data."
        confirmText="OK"
        cancelText="Cancel"
      />
    </>
  );
}
