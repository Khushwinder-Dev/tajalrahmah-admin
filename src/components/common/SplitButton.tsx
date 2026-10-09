import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface PopoverOption {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

interface SplitButtonProps {
  onListClick?: () => void;
  listText?: string;
  listPath?: string;
  popoverOptions: PopoverOption[];
}

export const SplitButton = ({
  onListClick,
  listText = "List",
  listPath,
  popoverOptions,
}: SplitButtonProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleListClick = () => {
    if (onListClick) {
      onListClick();
    } else if (listPath) {
      navigate(listPath);
    }
  };

  const handleOptionClick = (option: PopoverOption) => {
    setIsOpen(false); // Close the popover
    if (option.onClick) {
      option.onClick();
    } else if (option.path) {
      navigate(option.path);
    }
  };

  return (
    <div className="flex items-center rtl:flex-row-reverse w-32 group">
      {/* Main Button */}
      <Button
        variant="outline"
        className="bg-sky-200 group-hover:bg-primary hover:bg-primary text-white group-hover:text-white hover:text-white rounded-l-full rounded-r-none border-r-1 px-4 py-2 w-[calc(100%-40px)] transition-colors border-sky-200 shadow font-semibold!"
        onClick={handleListClick}
      >
        <span className="group-hover:text-white hover:text-white text-inherit w-full">
          {listText}
        </span>
      </Button>

      {/* Dropdown Button */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-sky-200 group group-hover:bg-primary hover:bg-primary text-white group-hover:text-white hover:text-white rounded-r-full rounded-l-none border-l-0 px-2 py-2 transition-colors border-sky-200 shadow font-semibold!"
          >
            <ChevronDown className="h-4 w-4 group-hover:text-white hover:text-white text-inherit" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-1" align="end">
          <div className="flex flex-col">
            {popoverOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "justify-start items-center gap-2 h-9 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200",
                  "hover:shadow-sm active:scale-[0.98]"
                )}
                onClick={() => handleOptionClick(option)}
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
