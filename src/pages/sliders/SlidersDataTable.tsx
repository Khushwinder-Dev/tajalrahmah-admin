/* eslint-disable @typescript-eslint/no-explicit-any */
import FixedColumnDataTable from "@/components/common/country-page-table/FixedColumnDataTable";
import useIsMobile from "@/hooks/useIsMobile";
import { useColorsPermissions } from "@/hooks/usePermissions";

// Slider interface to match the grid component
interface SliderItem {
  id: string;
  titleEn: string;
  titleAr: string;
  topTitleEn: string;
  topTitleAr: string;
  keyTagsEn: string;
  keyTagsAr: string;
  bannerType: string;
  bannerEn: string;
  bannerAr: string;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
  draftedAt: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
  actionMessage: string;
}

const mockSliders: SliderItem[] = [
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
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-11-20",
    draftedAt: "2023-01-10",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
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
    status: "active",
    createdAt: "2023-01-18",
    updatedAt: "2023-10-15",
    draftedAt: "2023-01-12",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
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
    status: "active",
    createdAt: "2023-02-01",
    updatedAt: "2023-11-10",
    draftedAt: "2023-01-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
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
    status: "active",
    createdAt: "2023-02-10",
    updatedAt: "2023-11-05",
    draftedAt: "2023-02-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "Yesterday",
  },
  {
    id: "5",
    titleEn: "Special Offers",
    titleAr: "عروض خاصة",
    topTitleEn: "Limited Time",
    topTitleAr: "وقت محدود",
    keyTagsEn: "Offers, Discount, Special",
    keyTagsAr: "عروض، خصم، خاص",
    bannerType: "Promo",
    bannerEn: "promo-banner-en.jpg",
    bannerAr: "promo-banner-ar.jpg",
    status: "active",
    createdAt: "2023-02-15",
    updatedAt: "2023-10-28",
    draftedAt: "2023-02-08",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "6",
    titleEn: "About Us",
    titleAr: "من نحن",
    topTitleEn: "Our Story",
    topTitleAr: "قصتنا",
    keyTagsEn: "About, Company, Story",
    keyTagsAr: "حول، شركة، قصة",
    bannerType: "About",
    bannerEn: "about-banner-en.jpg",
    bannerAr: "about-banner-ar.jpg",
    status: "draft",
    createdAt: "2023-03-01",
    updatedAt: "2023-11-15",
    draftedAt: "2023-02-20",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "7",
    titleEn: "Contact Information",
    titleAr: "معلومات الاتصال",
    topTitleEn: "Get in Touch",
    topTitleAr: "تواصل معنا",
    keyTagsEn: "Contact, Information, Reach",
    keyTagsAr: "اتصال، معلومات، تواصل",
    bannerType: "Contact",
    bannerEn: "contact-banner-en.jpg",
    bannerAr: "contact-banner-ar.jpg",
    status: "active",
    createdAt: "2023-03-10",
    updatedAt: "2023-11-08",
    draftedAt: "2023-03-05",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "8",
    titleEn: "Product Showcase",
    titleAr: "عرض المنتجات",
    topTitleEn: "Featured",
    topTitleAr: "مميز",
    keyTagsEn: "Products, Showcase, Featured",
    keyTagsAr: "منتجات، عرض، مميز",
    bannerType: "Product",
    bannerEn: "product-banner-en.jpg",
    bannerAr: "product-banner-ar.jpg",
    status: "inactive",
    createdAt: "2023-03-20",
    updatedAt: "2023-10-22",
    draftedAt: "2023-03-15",
    isActive: false,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "9",
    titleEn: "News & Updates",
    titleAr: "الأخبار والتحديثات",
    topTitleEn: "Latest News",
    topTitleAr: "آخر الأخبار",
    keyTagsEn: "News, Updates, Latest",
    keyTagsAr: "أخبار، تحديثات، آخر",
    bannerType: "News",
    bannerEn: "news-banner-en.jpg",
    bannerAr: "news-banner-ar.jpg",
    status: "active",
    createdAt: "2023-04-01",
    updatedAt: "2023-11-25",
    draftedAt: "2023-03-25",
    isActive: true,
    isDraft: false,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
  {
    id: "10",
    titleEn: "Partnership Program",
    titleAr: "برنامج الشراكة",
    topTitleEn: "Join Us",
    topTitleAr: "انضم إلينا",
    keyTagsEn: "Partnership, Join, Program",
    keyTagsAr: "شراكة، انضم، برنامج",
    bannerType: "Partnership",
    bannerEn: "partnership-banner-en.jpg",
    bannerAr: "partnership-banner-ar.jpg",
    status: "draft",
    createdAt: "2023-04-10",
    updatedAt: "2023-11-18",
    draftedAt: "2023-04-05",
    isActive: false,
    isDraft: true,
    isDeleted: false,
    isUpdated: false,
    actionMessage: "1 day ago",
  },
];

export default function SlidersDataTable({
  viewMode,
  setViewMode,
  dataTableFilter,
  searchQuery,
  setShowExport,
  showExport,
  setShowFilter,
  showFilter,
  setShowVisibility,
  showVisibility,
  isFilterOpen,
  setIsFilterOpen,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  dataTableFilter: any;
  searchQuery: string;
  setShowExport: (showExport: boolean) => void;
  showExport: boolean;
  setShowFilter: (showFilter: boolean) => void;
  showFilter: boolean;
  setShowVisibility: (showVisibility: boolean) => void;
  showVisibility: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const { canCreate } = useColorsPermissions();
  const isMobile = useIsMobile();

  const componentColumns = [
    {
      accessorKey: "titleEn",
      title: "Title (EN)",
      options: [...new Set(mockSliders.map((item) => item.titleEn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("titleEn").localeCompare(row2.getValue("titleEn"));
      },
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Title (EN)",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "titleAr",
      title: "Title (AR)",
      options: [...new Set(mockSliders.map((item) => item.titleAr))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1.getValue("titleAr").localeCompare(row2.getValue("titleAr"));
      },
      size: isMobile ? 120 : 180,
      minSize: 120,
      meta: {
        exportLabel: "Title (AR)",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "topTitleEn",
      title: "Top Title (EN)",
      options: [...new Set(mockSliders.map((item) => item.topTitleEn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("topTitleEn")
          .localeCompare(row2.getValue("topTitleEn"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Top Title (EN)",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "topTitleAr",
      title: "Top Title (AR)",
      options: [...new Set(mockSliders.map((item) => item.topTitleAr))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("topTitleAr")
          .localeCompare(row2.getValue("topTitleAr"));
      },
      size: isMobile ? 120 : 150,
      minSize: 120,
      meta: {
        exportLabel: "Top Title (AR)",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "bannerType",
      title: "Banner Type",
      options: [...new Set(mockSliders.map((item) => item.bannerType))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("bannerType")
          .localeCompare(row2.getValue("bannerType"));
      },
      size: isMobile ? 100 : 120,
      minSize: 100,
      meta: {
        exportLabel: "Banner Type",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "keyTagsEn",
      title: "Key Tags (EN)",
      options: [...new Set(mockSliders.map((item) => item.keyTagsEn))],
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const cellValue = row.getValue(columnId) as string;
        return filterValue.some((filterVal: string) =>
          cellValue.toLowerCase().includes(filterVal.toLowerCase())
        );
      },
      sortingFn: (row1: any, row2: any) => {
        return row1
          .getValue("keyTagsEn")
          .localeCompare(row2.getValue("keyTagsEn"));
      },
      size: isMobile ? 150 : 200,
      minSize: 150,
      meta: {
        exportLabel: "Key Tags (EN)",
        readOnly: !canCreate,
      },
    },
    {
      accessorKey: "createdAt",
      title: "Created",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("createdAt"));
        const date2 = new Date(row2.getValue("createdAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "createdAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "updatedAt",
      title: "Updated",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("updatedAt"));
        const date2 = new Date(row2.getValue("updatedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return 0;
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "updatedAt",
        readOnly: true,
      },
    },
    {
      accessorKey: "draftedAt",
      title: "Drafted",
      options: [], // Dates are typically not filtered with predefined options
      filterFn: (row: any, columnId: any, filterValue: any) => {
        if (!filterValue || filterValue.length === 0) return true;
        const dateValue = row.getValue(columnId) as string;
        const date = new Date(dateValue);

        // Check if the date is valid before calling toISOString
        if (isNaN(date.getTime())) {
          return false; // Invalid date, exclude from results
        }

        const cellValue = date.toISOString().split("T")[0];
        return filterValue.includes(cellValue);
      },
      sortingFn: (row1: any, row2: any) => {
        const date1 = new Date(row1.getValue("draftedAt"));
        const date2 = new Date(row2.getValue("draftedAt"));

        // Handle invalid dates by placing them at the end
        if (isNaN(date1.getTime())) return 1;
        if (isNaN(date2.getTime())) return -1;

        return date1.getTime() - date2.getTime();
      },
      size: isMobile ? 150 : 180,
      minSize: 150,
      meta: {
        exportLabel: "draftedAt",
        readOnly: true,
      },
    },
  ];

  const filteredData = mockSliders.filter((item: SliderItem) => {
    // Sliders use the same flags for demo
    if (dataTableFilter.status === "Active") {
      return item.isActive;
    } else if (dataTableFilter.status === "Inactive") {
      return !item.isActive;
    } else if (dataTableFilter.status === "Draft") {
      return item.isDraft;
    } else if (dataTableFilter.status === "Deleted") {
      return item.isDeleted;
    } else if (dataTableFilter.status === "Updated") {
      return item.isUpdated;
    }
    return true;
  });

  return (
    <FixedColumnDataTable
      searchQuery={searchQuery}
      columnData={filteredData}
      viewMode={viewMode}
      setViewMode={setViewMode}
      componentColumns={componentColumns}
      fixedColumns={["titleEn", "titleAr"]}
      pathName="sliders"
      setShowExport={setShowExport}
      showExport={showExport}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
      setShowVisibility={setShowVisibility}
      showVisibility={showVisibility}
      isFilterOpen={isFilterOpen}
      setIsFilterOpen={setIsFilterOpen}
      showImages={false}
    />
  );
}
