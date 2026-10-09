import { Card, CardTitle } from "@/components/ui/card";
// import { toastDelete, toastRestore } from "@/lib/toast";
// import { Tooltip } from "@mantine/core";
// import { RefreshCw, Trash2, Check, Pause } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
// import { Shield, User, Crown } from "lucide-react";
// import GridExportComponent from "./GridExportComponent";
import GridFilterComponent from "./GridFilterComponent";
import useIsMobile from "@/hooks/useIsMobile";

// import { usePermission } from "@/hooks/usePermissions";

// Slider interface
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
}

// Mock data - replace with real data from your API
const sliders: SliderItem[] = [
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
  },
];

type Props = {
  searchQuery: string;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  isFilterOpen: boolean;
  setIsExportOpen: (isExportOpen: boolean) => void;
  isExportOpen: boolean;
};

export default function SlidersGrid({
  searchQuery,
  setIsFilterOpen,
  isFilterOpen,
  setIsExportOpen,
  isExportOpen,
}: Props) {
  console.log("Sliders grid rendered");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const isMobile = useIsMobile();

  const [slidersData, setSlidersData] = useState<SliderItem[]>(sliders);
  // const canDelete: boolean = usePermission("users", "delete");
  // const canRestore: boolean = usePermission("users", "restore");
  // const canEdit: boolean = usePermission("users", "edit");

  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [, setPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 4;

  // Simulate API call to load more data
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const titleEnOptions = [
      "Welcome to Our Platform",
      "Premium Services",
      "Latest Technology",
      "Customer Support",
      "Special Offers",
      "About Us",
      "Contact Information",
      "Product Showcase",
      "News & Updates",
      "Partnership Program",
      "Digital Solutions",
      "Creative Design",
      "Professional Services",
      "Innovation Hub",
      "Quality Assurance",
    ];
    const titleArOptions = [
      "مرحباً بكم في منصتنا",
      "خدمات متميزة",
      "أحدث التقنيات",
      "دعم العملاء",
      "عروض خاصة",
      "من نحن",
      "معلومات الاتصال",
      "عرض المنتجات",
      "الأخبار والتحديثات",
      "برنامج الشراكة",
      "الحلول الرقمية",
      "التصميم الإبداعي",
      "الخدمات المهنية",
      "مركز الابتكار",
      "ضمان الجودة",
    ];
    const topTitleEnOptions = [
      "Get Started",
      "Quality First",
      "Innovation",
      "24/7 Help",
      "Limited Time",
      "Our Story",
      "Get in Touch",
      "Featured",
      "Latest News",
      "Join Us",
      "Explore",
      "Create",
      "Professional",
      "Discover",
      "Excellence",
    ];
    const topTitleArOptions = [
      "ابدأ الآن",
      "الجودة أولاً",
      "الابتكار",
      "مساعدة 24/7",
      "وقت محدود",
      "قصتنا",
      "تواصل معنا",
      "مميز",
      "آخر الأخبار",
      "انضم إلينا",
      "استكشف",
      "أنشئ",
      "مهني",
      "اكتشف",
      "التميز",
    ];
    const bannerTypes = [
      "Hero",
      "Service",
      "Tech",
      "Support",
      "Promo",
      "About",
      "Contact",
      "Product",
      "News",
      "Partnership",
    ];

    const newItems: SliderItem[] = Array.from(
      { length: ITEMS_PER_PAGE },
      (_, index) => {
        const titleEn =
          titleEnOptions[Math.floor(Math.random() * titleEnOptions.length)];
        const titleAr =
          titleArOptions[Math.floor(Math.random() * titleArOptions.length)];
        const topTitleEn =
          topTitleEnOptions[
            Math.floor(Math.random() * topTitleEnOptions.length)
          ];
        const topTitleAr =
          topTitleArOptions[
            Math.floor(Math.random() * topTitleArOptions.length)
          ];
        const bannerType =
          bannerTypes[Math.floor(Math.random() * bannerTypes.length)];

        return {
          id: `${Date.now()}-${index}`,
          titleEn: titleEn,
          titleAr: titleAr,
          topTitleEn: topTitleEn,
          topTitleAr: topTitleAr,
          keyTagsEn: `${titleEn
            .split(" ")
            .slice(0, 2)
            .join(", ")}, ${bannerType}`,
          keyTagsAr: `${titleAr
            .split(" ")
            .slice(0, 2)
            .join("، ")}, ${bannerType}`,
          bannerType: bannerType,
          bannerEn: `${bannerType.toLowerCase()}-banner-en-${index}.jpg`,
          bannerAr: `${bannerType.toLowerCase()}-banner-ar-${index}.jpg`,
        };
      }
    );

    // Stop loading more after reaching 50 items for demo
    if (slidersData.length >= 46) {
      setHasMore(false);
    } else {
      setSlidersData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  }, [slidersData.length, isLoading, hasMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMoreData();
    }
  }, [loadMoreData]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Filter sliders based on search query (search across multiple fields)
  const filteredSliders = slidersData.filter(
    (item) =>
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topTitleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topTitleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyTagsEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyTagsAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bannerType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditClick = (colorId: string) => {
  //   const viewMode = searchParams.get("view") || "grid";
  //   navigate(`/colors/edit/${colorId}?fromView=${viewMode}`);
  // };

  const handleViewClick = (sliderId: string) => {
    const viewMode = searchParams.get("view") || "grid";
    navigate(`/sliders/view/${sliderId}?fromView=${viewMode}`);
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col bg-white dark:bg-gray-900 parent relative rounded-lg overflow-hidden"
      )}
    >
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Cards container with animated width */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "overflow-y-auto grid-scroll transition-all duration-300 ease-in-out",
            isRTL ? "" : ""
          )}
          style={{
            width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
          }}
        >
          <div
            className={cn(
              "grid gap-6 pb-4 p-5",
              // Mobile: 1 column, Tablet: 2 columns, Desktop: 3-4 columns
              isMobile
                ? "grid-cols-1"
                : "grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            )}
          >
            {filteredSliders.map((item, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    "transition-all relative group dark:bg-gray-800 duration-200 w-full shadow-[2px_3px_8px_0_rgba(0,0,0,0.10)] border-[#E2E4EB] border border-solid rounded-[12px] flex p-5 flex-col gap-4 cursor-pointer",
                    // Different hover effects for mobile vs desktop
                    isMobile
                      ? "hover:shadow-lg hover:border-primary"
                      : "hover:scale-105 hover:z-50 hover:relative hover:border-primary min-w-[280px]"
                  )}
                  onClick={() => handleViewClick(item.id)}
                >
                  {/* Slider Header with Title */}
                  <div className="flex items-center justify-between">
                    <CardTitle
                      className="text-lg font-semibold transition-colors flex-1"
                      style={{ fontSize: "18px" }}
                    >
                      {item.titleEn}
                    </CardTitle>
                  </div>

                  {/* Slider Information */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Arabic:</span>
                      <span className="truncate">{item.titleAr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Top Title:</span>
                      <span className="truncate">{item.topTitleEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Type:</span>
                      <span className="truncate font-mono text-xs bg-blue-100 px-2 py-1 rounded">
                        {item.bannerType}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Tags:</span>{" "}
                      {item.keyTagsEn}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm">Loading more sliders...</span>
              </div>
            </div>
          )}

          {/* End of data indicator */}
          {!hasMore && filteredSliders.length > 12 && (
            <div className="flex justify-center items-center py-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No more sliders to load
              </span>
            </div>
          )}
        </div>

        {/* Animated Filter Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isFilterOpen
              ? "translate-x-0 opacity-100 visible"
              : isRTL
              ? "-translate-x-full opacity-0 invisible"
              : "translate-x-full opacity-0 invisible"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isFilterOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <GridFilterComponent
                key={`filter-panel-${isFilterOpen}`}
                data={sliders}
                setFilteredData={setSlidersData}
                setShowTabs={setIsFilterOpen}
                defaultTab="filter"
              />
            </div>
          </div>
        </div>

        {/* Animated Export Panel */}
        <div
          className={cn(
            "absolute top-0 h-full transition-all duration-300 ease-in-out transform z-10",
            isRTL ? "left-0" : "right-0",
            isExportOpen
              ? "translate-x-0 opacity-100"
              : isRTL
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          )}
          style={{
            width: isMobile ? "100%" : "320px", // Full width on mobile
          }}
        >
          <div
            className={cn(
              "h-full",
              isMobile ? "pb-4 mt-1" : "p-2" // Less padding on mobile
            )}
          >
            <div
              className={cn(
                "w-full flex-shrink-0 border rounded-[20px] border-gray-200 dark:border-gray-700 h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out",
                isExportOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <GridFilterComponent
                key={`export-panel-${isExportOpen}`}
                data={sliders}
                setFilteredData={setSlidersData}
                setShowTabs={setIsExportOpen}
                defaultTab="export"
              />
            </div>
          </div>
        </div>

        {/* Backdrop overlay for mobile/smaller screens */}
        {(isFilterOpen || isExportOpen) && (
          <div
            className={cn(
              "fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out z-5",
              isMobile ? "" : "md:hidden", // Always show overlay on mobile
              isFilterOpen || isExportOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => {
              setIsFilterOpen(false);
              setIsExportOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
