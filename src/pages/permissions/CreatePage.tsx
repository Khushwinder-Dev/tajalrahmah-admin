/* eslint-disable @typescript-eslint/no-explicit-any */
import video from "@/assets/videos/test.mp4";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { Button } from "@/components/ui/button";
import { useLanguageLabels } from "@/hooks/useLanguageLabels";
import type { RootState } from "@/store";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PermissionComponent from "./PermissionComponent";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";
import {
  usePermission,
  usePermissionsPermissions,
} from "@/hooks/usePermissions";
import GenericPDF from "@/components/common/pdf";
import { toastError, toastSuccess } from "@/lib/toast";
import { pdf } from "@react-pdf/renderer";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { useNavigate } from "react-router-dom";

export default function PermissionsCreatePage() {
  const labels = useLanguageLabels();

  const navigate = useNavigate();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const formRef = useRef<HTMLFormElement>(null);
  const permissionRef = useRef<{ getValues: () => any }>(null);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { canCreate } = usePermissionsPermissions();

  const canPdf: boolean = usePermission("permissions", "pdf");
  const canPrint: boolean = usePermission("permissions", "print");

  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);

  const handlePrintChange = (checked: boolean) => {
    setPrintEnabled(checked);
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handlePrintPermission = (permissionData: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Permission Details",
        data: [permissionData],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          code: "Permission Code",
          title: "Permission Name",
          ISD: "ISD",
          isDefault: "Default Country",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          rating: "Rating",
          flag: "Flag",
          createdAt: "Created At",
          updatedAt: "Updated At",
          draftedAt: "Drafted At",
          deletedAt: "Deleted At",
        },
      });
      printHtmlContent(html);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when printing");
    }
  };

  const handleExportPDF = async () => {
    try {
      const blob = await pdf(
        <GenericPDF
          data={[formData]}
          title="Country Details"
          subtitle="Country Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "permissions-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form submitted");
    e.preventDefault();
    if (permissionRef.current && permissionRef.current.getValues) {
      const values = permissionRef.current.getValues();
      // console.log({
      //   selectedUser: values.selectedUser,
      //   company: values.company,
      //   branch: values.branch,
      //   permissions: values.permissions,
      // });
      console.log("Form submitted with values:", values);
    }

    if (pdfChecked) {
      await handleExportPDF();
    }
    if (printEnabled) {
      handlePrintPermission(formData);
    }
    if (keepCreating) {
      toastSuccess("Country created successfully!");
      handleReset();
    } else {
      toastSuccess("Country created successfully!");
      navigate("/countries");
    }
    // Api call
  };

  const handleResetClick = () => {
    setIsResetModalOpen(true);
  };

  // Add this state
  const [formKey, setFormKey] = useState(0);

  // Update handleReset function
  const handleReset = () => {
    setFormKey((prev) => prev + 1);
  };

  const [formData] = useState({});

  return (
    <>
      <MinimizablePageLayout
        moduleId={"permissions"}
        moduleName={"Permissions"}
        moduleRoute={"permissions"}
        popoverOptions={[]}
        title={"Creating Permission"}
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="permissions"
        scrollBoxClassNames="overflow-y-hidden px-0 py-0"
        activePage={"create"}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        onPrintToggle={canPrint ? handlePrintChange : undefined}
        onKeepChangesChange={setKeepCreating}
        additionalFooterButtons={
          canCreate ? (
            <div className="flex gap-4 max-[435px]:gap-2">
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90! bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleResetClick}
              >
                {labels.reset}
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-primary/90 bg-white dark:bg-gray-900 rounded-full border-primary w-28 max-[435px]:w-20 font-semibold! text-primary!"
                onClick={handleSubmit}
              >
                {labels.submit}
              </Button>
            </div>
          ) : null
        }
        className="w-full"
        isShowEdit={false}
        isShowView={false}
      >
        <div dir={isRTL ? "rtl" : "ltr"} className="h-full">
          <form
            ref={formRef}
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-6 relative h-full px-6 py-6"
          >
            <PermissionComponent ref={permissionRef} />
          </form>
        </div>
      </MinimizablePageLayout>

      <ResetFormModal
        opened={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title={labels.resetForm}
        message={labels.resetFormMessage}
        confirmText={labels.resetFormConfirm}
        cancelText={labels.cancel}
      />
    </>
  );
}
