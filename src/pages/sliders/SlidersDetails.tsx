/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete } from "@/components/common/Autocomplete";
import HistoryDataTable from "@/components/common/HistoryDataTableNew";
import { mockHistoryData } from "@/mockData/country-mockdata";
import video from "@/assets/videos/test.mp4";
import { printHtmlContent } from "@/lib/printHtmlContent";
import { PrintCommonLayout } from "@/lib/printContents/PrintCommonLayout";
import { toastError } from "@/lib/toast";
import GenericPDF from "@/components/common/pdf";
import { pdf } from "@react-pdf/renderer";
import { Edit, Plus } from "lucide-react";
import { ResetFormModal } from "@/components/common/ResetFormModal";
import { usePermission } from "@/hooks/usePermissions";
import MinimizablePageLayout from "@/components/MinimizablePageLayout";

const MOCK_SLIDERS = [
  {
    id: "1",
    titleEn: "Welcome to Our Platform",
    titleAr: "مرحباً بكم في منصتنا",
    topTitleEn: "Get Started",
    topTitleAr: "ابدأ الآن",
    keyTagsEn: "Welcome, Platform, Introduction",
    keyTagsAr: "ترحيب، منصة، مقدمة",
    bannerType: "Hero",
    bannerEn: "hero-banner-en.jpg",
    bannerAr: "hero-banner-ar.jpg",
    status: "Active",
  },
  {
    id: "2",
    titleEn: "Premium Services",
    titleAr: "خدمات متميزة",
    topTitleEn: "Quality First",
    topTitleAr: "الجودة أولاً",
    keyTagsEn: "Premium, Quality, Services",
    keyTagsAr: "متميز، جودة، خدمات",
    bannerType: "Service",
    bannerEn: "service-banner-en.jpg",
    bannerAr: "service-banner-ar.jpg",
    status: "Active",
  },
  {
    id: "3",
    titleEn: "Latest Technology",
    titleAr: "أحدث التقنيات",
    topTitleEn: "Innovation",
    topTitleAr: "الابتكار",
    keyTagsEn: "Technology, Innovation, Modern",
    keyTagsAr: "تقنية، ابتكار، حديث",
    bannerType: "Tech",
    bannerEn: "tech-banner-en.jpg",
    bannerAr: "tech-banner-ar.jpg",
    status: "Draft",
  },
  {
    id: "4",
    titleEn: "Customer Support",
    titleAr: "دعم العملاء",
    topTitleEn: "24/7 Help",
    topTitleAr: "مساعدة 24/7",
    keyTagsEn: "Support, Help, Customer",
    keyTagsAr: "دعم، مساعدة، عميل",
    bannerType: "Support",
    bannerEn: "support-banner-en.jpg",
    bannerAr: "support-banner-ar.jpg",
    status: "InActive",
  },
];

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

export default function SliderDetailsPage() {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const [keepChanges, setKeepChanges] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState("1");
  const location = useLocation();
  const isViewPage = location.pathname.includes("/view");
  const [pdfChecked, setPdfChecked] = useState(false);
  const [printEnabled, setPrintEnabled] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Permission checks
  // const { canCreate, canView, canEdit, canDelete } = useUserMasterPermissions();

  // Field-level permissions
  const canPdf: boolean = usePermission("sliders", "pdf");
  const canPrint: boolean = usePermission("sliders", "print");
  const canSeeHistory: boolean = usePermission("sliders", "history");

  let sliderData = {
    id: selectedSlider,
    titleEn:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.titleEn ||
      "Welcome to Our Platform",
    titleAr:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.titleAr ||
      "مرحباً بكم في منصتنا",
    topTitleEn:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.topTitleEn ||
      "Get Started",
    topTitleAr:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.topTitleAr ||
      "ابدأ الآن",
    keyTagsEn:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.keyTagsEn ||
      "Welcome, Platform, Introduction",
    keyTagsAr:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.keyTagsAr ||
      "ترحيب، منصة، مقدمة",
    bannerType:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.bannerType || "Hero",
    bannerEn:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.bannerEn ||
      "hero-banner-en.jpg",
    bannerAr:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.bannerAr ||
      "hero-banner-ar.jpg",
    isDefault: true,
    isActive: true,
    isDraft: false,
    isDeleted: false,
    status:
      MOCK_SLIDERS.find((s) => s.id === selectedSlider)?.status || "Active",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    draftedAt: "2025-05-20T14:45:00Z",
    deletedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    console.log("isViewPage", isViewPage);
    if (isViewPage) {
      sliderData = {
        id: selectedSlider,
        titleEn: "",
        titleAr: "",
        topTitleEn: "",
        topTitleAr: "",
        keyTagsEn: "",
        keyTagsAr: "",
        bannerType: "",
        bannerEn: "",
        bannerAr: "",
        isDefault: true,
        isActive: true,
        isDraft: false,
        isDeleted: false,
        status: "Active",
        createdAt: "",
        updatedAt: "",
        draftedAt: "",
        deletedAt: "",
      } as any;
    }
  }, []);

  const handlePrintSlider = (slider: any) => {
    try {
      const html = PrintCommonLayout({
        title: "Slider Master Details",
        data: [slider],
        excludeFields: ["id", "__v", "_id"],
        fieldLabels: {
          titleEn: "Title (EN)",
          titleAr: "Title (AR)",
          topTitleEn: "Top Title (EN)",
          topTitleAr: "Top Title (AR)",
          keyTagsEn: "Key Tags (EN)",
          keyTagsAr: "Key Tags (AR)",
          bannerType: "Banner Type",
          bannerEn: "Banner (EN)",
          bannerAr: "Banner (AR)",
          isDefault: "Default Slider",
          isActive: "Active Status",
          isDraft: "Draft Status",
          isDeleted: "Deleted Status",
          status: "Status",
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

  const handleSwitchChange = (checked: boolean) => {
    setPrintEnabled(checked);
  };

  const handlePDFSwitchChange = (pdfChecked: boolean) => {
    setPdfChecked(pdfChecked);
  };

  const handleExportPDF = async () => {
    console.log("Export PDF clicked");
    try {
      console.log("sliderData on pdf click", sliderData);
      const blob = await pdf(
        <GenericPDF
          data={[sliderData]}
          title="Slider Master Details"
          subtitle="Slider Information"
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "slider-details.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toastError("Something went wrong when generating PDF");
    }
  };

  const getRelativeTime = (dateString: string | null) => {
    if (!dateString) return "–";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "–" : value;
  };

  return (
    <>
      <MinimizablePageLayout
        moduleId="slider-details-module"
        moduleName="Slider Details"
        moduleRoute="/sliders/view"
        title="Viewing Slider"
        videoSrc={video}
        videoHeader="Tutorial video"
        listPath="sliders"
        activePage="view"
        module="sliders"
        popoverOptions={[
          {
            label: "Create",
            icon: <Plus className="w-5 h-5 text-green-600" />,
            onClick: () => navigate("/sliders/create"),
          },
          {
            label: "Edit",
            icon: <Edit className="w-5 h-5 text-blue-600" />,
            onClick: () => navigate("/sliders/edit/1"),
          },
        ]}
        keepChanges={keepChanges}
        onKeepChangesChange={setKeepChanges}
        pdfChecked={pdfChecked}
        onPdfToggle={canPdf ? handlePDFSwitchChange : undefined}
        printEnabled={printEnabled}
        onPrintToggle={canPrint ? handleSwitchChange : undefined}
        onHistoryClick={
          canSeeHistory ? () => setIsOptionModalOpen(true) : undefined
        }
        onExport={
          canPdf && canPrint
            ? () => {
                if (!pdfChecked && !printEnabled) {
                  setShowExportModal(true);
                  return;
                }

                if (pdfChecked) {
                  handleExportPDF();
                }
                if (printEnabled) {
                  handlePrintSlider(sliderData);
                }
              }
            : undefined
        }
      >
        {/* Row 1: Slider Selection, Title En, Title Ar, Top Title En */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="mt-1">
            <Autocomplete
              options={MOCK_SLIDERS}
              value={selectedSlider}
              onValueChange={setSelectedSlider}
              placeholder=" "
              displayKey="titleEn"
              valueKey="id"
              searchKey="titleEn"
              disabled={false}
              className="w-[96%] bg-gray-100 rounded-xl"
              labelClassName="bg-gray-50 rounded-2xl"
              labelText="Slider Title"
              isShowTemplateIcon={false}
            />
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Title (EN)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.titleEn)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Title (AR)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.titleAr)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Top Title (EN)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.topTitleEn)}
            </div>
          </div>
        </div>

        {/* Row 2: Top Title Ar, Key Tags En, Key Tags Ar, Banner Type */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Top Title (AR)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.topTitleAr)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Key Tags (EN)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.keyTagsEn)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Key Tags (AR)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.keyTagsAr)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Banner Type</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.bannerType)}
            </div>
          </div>
        </div>

        {/* Row 3: Banner En, Banner Ar, Status, Default */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Banner (EN)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.bannerEn)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Banner (AR)</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.bannerAr)}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-normal text-gray-600">Status</h3>
            </div>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              {displayValue(sliderData.status)}
            </div>
          </div>

          <div className="">
            <div className="flex flex-col">
              <div className="">
                <span className="text-[15px] text-gray-600">Default</span>
              </div>
              <div className="">
                {sliderData.isDefault ? (
                  <span className="text-black text-[15px]">Yes</span>
                ) : (
                  <span className="text-black text-[15px]">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="">
            <h3 className="font-normal mb-1 text-gray-600">Action</h3>
            <div className="w-full py-1 text-gray-900 text-md dark:text-white">
              Updated
            </div>
          </div>
        </div>
      </MinimizablePageLayout>

      {/* History Modal */}
      <HistoryDataTable
        isOptionModalOpen={isOptionModalOpen}
        setIsOptionModalOpen={setIsOptionModalOpen}
        columnData={mockHistoryData}
        title="History"
        statusInfo={{
          created: getRelativeTime(sliderData.createdAt),
          updated: getRelativeTime(sliderData.updatedAt),
          drafted: getRelativeTime(sliderData.draftedAt),
          deleted: getRelativeTime(sliderData.deletedAt),
        }}
      />

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
