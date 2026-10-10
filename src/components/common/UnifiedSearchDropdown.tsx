import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  X,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Droplets,
  Layers,
  Paintbrush,
  HardHat,
  Receipt,
  Boxes,
  Warehouse,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import clsx from "clsx";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Services" | "Solutions" | "Projects" | "Industries" | "Resources";
  icon: LucideIcon;
  path?: string;
}

const DEFAULT_SEARCH_ITEMS: SearchItem[] = [
  {
    id: "waterproofing-solutions",
    title: "Waterproofing Solutions",
    subtitle: "Solutions",
    category: "Solutions",
    icon: ShieldCheck,
    path: "/services",
  },
  {
    id: "grp-fiberglass",
    title: "GRP & Fiberglass Waterproofing",
    subtitle: "Services",
    category: "Services",
    icon: Droplets,
    path: "/services",
  },
  {
    id: "combo-system",
    title: "Combo System Roof Waterproofing",
    subtitle: "Roofing Division",
    category: "Solutions",
    icon: Layers,
    path: "/services",
  },
  {
    id: "epoxy-floor",
    title: "Epoxy Floor Coating",
    subtitle: "Flooring Systems",
    category: "Services",
    icon: Paintbrush,
    path: "/services",
  },
  {
    id: "subcontracting-tenders",
    title: "Subcontracting & Tenders",
    subtitle: "B2B Contracting",
    category: "Projects",
    icon: HardHat,
    path: "/projects",
  },
  {
    id: "sales-invoice",
    title: "Sales Invoice",
    subtitle: "Sales & Billing",
    category: "Services",
    icon: Receipt,
    path: "/sales-invoice",
  },
  {
    id: "item-master",
    title: "Item Master",
    subtitle: "Inventory Management",
    category: "Resources",
    icon: Boxes,
    path: "/item",
  },
  {
    id: "warehouse-management",
    title: "Warehouse Management",
    subtitle: "Supply Chain & Storage",
    category: "Industries",
    icon: Warehouse,
    path: "/warehouse",
  },
  {
    id: "chart-of-accounts",
    title: "Chart of Accounts",
    subtitle: "Financial Accounts",
    category: "Solutions",
    icon: BookOpen,
    path: "/chart-of-accounts",
  },
  {
    id: "stock-reports",
    title: "Current Stock Reports",
    subtitle: "Stock Analytics",
    category: "Resources",
    icon: ClipboardList,
    path: "/current-stock-reports",
  },
];

export const CATEGORIES = [
  "All",
  "Services",
  "Solutions",
  "Projects",
  "Industries",
  "Resources",
] as const;

export type Category = (typeof CATEGORIES)[number];

interface UnifiedSearchDropdownProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
}

export const UnifiedSearchDropdown: React.FC<UnifiedSearchDropdownProps> = ({
  trigger,
  isOpen: controlledOpen,
  onOpenChange,
  align = "end",
}) => {
  const navigate = useNavigate();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setAiResponse(null);
    } else {
      setQuery("");
      setActiveCategory("All");
      setAiResponse(null);
    }
  }, [open]);

  // Global shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const filteredItems = useMemo(() => {
    return DEFAULT_SEARCH_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const handleItemClick = (item: SearchItem) => {
    if (item.path) {
      navigate(item.path);
    }
    setOpen(false);
  };

  const handleAskAi = () => {
    setIsAiLoading(true);
    setAiResponse(null);
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResponse(
        query
          ? `AI Agent: Found 3 relevant matches for "${query}" in ERP services & solutions.`
          : "AI Agent: How can I help you find services, solutions, or ERP records today?"
      );
    }, 600);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <button
            type="button"
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Search"
            title="Search (Ctrl+K)"
          >
            <Search size={20} />
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent
        align={align}
        sideOffset={10}
        className="w-[calc(100vw-24px)] sm:w-[500px] md:w-[540px] max-w-[560px] p-5 sm:p-6 rounded-[28px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50 flex flex-col gap-4 outline-none animate-in fade-in-0 zoom-in-95 duration-150"
      >
        {/* Top Search Input Box with Teal/Brand Border (No Mic, No Camera) */}
        <div className="flex items-center w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-[#009b90] dark:border-[#008f87] bg-white dark:bg-gray-800 shadow-xs focus-within:ring-2 focus-within:ring-[#009b90]/30 transition-all">
          <Search className="w-5 h-5 text-[#009b90] dark:text-[#38bdf8] mr-3 shrink-0 stroke-[2.2]" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent border-0 outline-none text-sm sm:text-base text-gray-800 dark:text-gray-100 placeholder-gray-400 font-normal"
          />

          {/* Close / Clear icon button */}
          <button
            type="button"
            onClick={() => {
              if (query) {
                setQuery("");
              } else {
                setOpen(false);
              }
            }}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer ml-1"
            title={query ? "Clear search" : "Close"}
            aria-label="Close search"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
          </button>
        </div>

        {/* Filter Pills (All, Services, Solutions, Projects, Industries, Resources) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0",
                  isActive
                    ? "bg-[#e6f7f6] dark:bg-[#008f87]/25 text-[#008f87] dark:text-[#55d1c9] border border-[#008f87]/30 shadow-xs"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] sm:text-xs font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider">
            {query.trim() ? `Search Results (${filteredItems.length})` : "MOST USED"}
          </span>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-[#009b90] dark:text-[#38bdf8] hover:underline cursor-pointer font-medium"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Results List Items */}
        <div className="max-h-[280px] sm:max-h-[310px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#eaf8f7] dark:bg-[#008f87]/15 border border-[#c1ede9] dark:border-[#008f87]/30 text-[#008f87] dark:text-[#55d1c9] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#009b90] group-hover:text-white group-hover:border-[#009b90] transition-all duration-150">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-[#009b90] dark:group-hover:text-[#55d1c9] transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-normal truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-600 group-hover:text-[#009b90] dark:group-hover:text-[#55d1c9] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* AI Agent Banner / Response */}
        {aiResponse && (
          <div className="p-3 bg-[#e6f7f6] dark:bg-[#008f87]/20 border border-[#008f87]/30 rounded-2xl text-xs sm:text-sm text-[#0070ba] dark:text-[#38bdf8] flex items-start gap-2 animate-in fade-in duration-150">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <span>{aiResponse}</span>
          </div>
        )}

        {/* Footer: "Need help finding something?" + "Ask AI Agent" */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3.5 sm:pt-4 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
            Need help finding something?
          </span>

          <button
            type="button"
            onClick={handleAskAi}
            disabled={isAiLoading}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 bg-[#e6f7f6] dark:bg-[#008f87]/20 hover:bg-[#d5f3f1] dark:hover:bg-[#008f87]/30 text-[#008f87] dark:text-[#55d1c9] text-xs sm:text-sm font-bold rounded-2xl transition-all cursor-pointer shadow-xs disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{isAiLoading ? "Asking AI..." : "Ask AI Agent"}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UnifiedSearchDropdown;
