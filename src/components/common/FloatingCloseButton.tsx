import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingCloseButtonProps {
  onClose: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const FloatingCloseButton = ({
  onClose,
  className,
  size = "md",
  position = "top-right",
}: FloatingCloseButtonProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "absolute z-[10] rounded-full transition-colors bg-white/90 backdrop-blur-sm shadow-lg dark:bg-gray-900",
        "hover:border hover:border-red-200 hover:text-red-500 hover:bg-white hover:shadow-xl",
        "group",
        sizeClasses[size],
        positionClasses[position],
        className
      )}
      onClick={onClose}
    >
      <X
        className={cn(
          "transition-colors text-primary group-hover:text-red-500",
          iconSizes[size]
        )}
      />
    </Button>
  );
};

export default FloatingCloseButton;
