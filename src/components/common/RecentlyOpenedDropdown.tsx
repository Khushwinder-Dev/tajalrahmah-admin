import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  History,
  FileText,
  Package,
  ShoppingCart,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export interface RecentItem {
  id: string;
  title: string;
  time?: string;
  icon: LucideIcon;
  path: string;
}

const DEFAULT_RECENT_ITEMS: RecentItem[] = [
  {
    id: "sales-invoice",
    title: "Sales Invoice",
    time: "Just now",
    icon: FileText,
    path: "/sales-invoice",
  },
  {
    id: "item-master",
    title: "Item Master",
    time: "5 min ago",
    icon: Package,
    path: "/item",
  },
  {
    id: "purchase-invoice",
    title: "Purchase Invoice",
    icon: ShoppingCart,
    path: "/purchase-invoice",
  },
];

interface RecentlyOpenedDropdownProps {
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
}

export const RecentlyOpenedDropdown: React.FC<RecentlyOpenedDropdownProps> = ({
  trigger,
  align = "end",
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items] = useState<RecentItem[]>(DEFAULT_RECENT_ITEMS);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
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
            aria-label="Recently Opened"
            title="Recently Opened"
          >
            <History size={20} />
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent
        align={align}
        sideOffset={8}
        className="w-[300px] sm:w-[320px] p-4 bg-white dark:bg-gray-900 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-gray-800 z-50 outline-none animate-in fade-in-0 zoom-in-95 duration-150"
      >
        {/* Header matching reference image */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <History className="w-5 h-5 text-gray-800 dark:text-gray-100 stroke-[2.2]" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Recently Opened
          </h3>
        </div>

        {/* Content list container matching reference image */}
        <div className="bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl p-1.5 space-y-0.5 border border-gray-100/60 dark:border-gray-700/40">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.path)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white dark:hover:bg-gray-700/80 transition-all text-left cursor-pointer group hover:shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300 stroke-[1.9] shrink-0 group-hover:text-[#009b90] dark:group-hover:text-[#55d1c9] transition-colors" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#009b90] dark:group-hover:text-[#55d1c9] transition-colors truncate">
                    {item.title}
                  </span>
                </div>

                {item.time && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium shrink-0 ml-2">
                    {item.time}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RecentlyOpenedDropdown;
