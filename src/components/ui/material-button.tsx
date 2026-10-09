import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Import from material-web-components-react
import Button from "material-web-components-react/button";

const materialButtonVariants = cva(
  "material-web-button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer relative",
  {
    variants: {
      variant: {
        default: "google-meet-style",
        destructive: "google-meet-destructive",
        ghost: "google-meet-ghost",
        link: "google-meet-link",
      },
      size: {
        default: "h-12 px-6", // Increased height
        sm: "h-10 px-4", // Increased height
        lg: "h-14 px-8", // Increased height
        icon: "size-12", // Increased size
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface MaterialButtonProps
  extends VariantProps<typeof materialButtonVariants> {
  className?: string;
  asChild?: boolean;
  textColor?: string;
  borderColor?: string;
  outerBorderColor?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  id?: string;
}

function MaterialButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  textColor,
  borderColor,
  outerBorderColor,
  children,
  disabled = false,
  onClick,
  onKeyDown,
  ...props
}: MaterialButtonProps) {
  const buttonId = React.useId().replace(/:/g, "");

  // Always use blue as the base color
  const blueColor = "#1976d2";

  // Determine colors based on variant and props
  const getColors = () => {
    const defaultTextColor = textColor || "#ffffff"; // White text on blue background
    const defaultBorderColor = borderColor || blueColor;
    const defaultOuterBorderColor = outerBorderColor || blueColor;

    switch (variant) {
      case "destructive":
        return {
          bg: "#dc2626", // Red for destructive
          text: textColor || "#ffffff",
          border: borderColor || "#dc2626",
          outerBorder: outerBorderColor || "#dc2626",
        };
      case "ghost":
        return {
          bg: "transparent",
          text: textColor || blueColor,
          border: "transparent",
          outerBorder: defaultOuterBorderColor,
        };
      case "link":
        return {
          bg: "transparent",
          text: textColor || blueColor,
          border: "transparent",
          outerBorder: "transparent",
        };
      default:
        return {
          bg: blueColor, // Always blue for default
          text: defaultTextColor,
          border: defaultBorderColor,
          outerBorder: defaultOuterBorderColor,
        };
    }
  };

  const colors = getColors();

  // Generate unique style ID
  const styleId = `material-button-${buttonId}`;
  const wrapperStyleId = `material-button-wrapper-${buttonId}`;

  React.useEffect(() => {
    // Add styles dynamically
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .${wrapperStyleId} {
        position: relative;
        display: inline-flex;
        border: 2px solid ${colors.outerBorder};
        border-radius: 28px;
        padding: 3px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        background: transparent;
        ${disabled ? "opacity: 0.5;" : ""}
      }

      .${wrapperStyleId}:hover:not(.disabled) {
        border-color: ${colors.border};
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }

      .${wrapperStyleId}:active:not(.disabled) {
        transform: translateY(0px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .${styleId} {
        --md-filled-button-container-shape: 24px;
        --md-filled-button-container-height: ${
          size === "sm"
            ? "40px"
            : size === "lg"
            ? "56px"
            : size === "icon"
            ? "48px"
            : "48px"
        };
        --md-filled-button-label-text-font: 'Inter', system-ui, sans-serif;
        --md-filled-button-label-text-size: ${
          size === "sm" ? "13px" : size === "lg" ? "16px" : "14px"
        };
        --md-filled-button-label-text-weight: 500;
        --md-filled-button-container-color: ${colors.bg};
        --md-filled-button-label-text-color: ${colors.text};
        --md-filled-button-hover-container-color: ${colors.bg};
        --md-filled-button-hover-label-text-color: ${colors.text};
        --md-filled-button-pressed-container-color: ${colors.bg};
        --md-filled-button-pressed-label-text-color: ${colors.text};
        --md-filled-button-focus-container-color: ${colors.bg};
        --md-filled-button-focus-label-text-color: ${colors.text};
        --md-filled-button-disabled-container-color: rgba(0, 0, 0, 0.12);
        --md-filled-button-disabled-label-text-color: rgba(0, 0, 0, 0.38);
        min-width: ${
          size === "icon"
            ? "48px"
            : size === "sm"
            ? "100px"
            : size === "lg"
            ? "140px"
            : "120px"
        };
        width: 100%;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 24px !important;
        ${disabled ? "pointer-events: none;" : ""}
      }
      
      .${styleId}:hover:not([disabled]) {
        --md-filled-button-hover-container-color: ${
          variant === "ghost" || variant === "link"
            ? "rgba(0, 0, 0, 0.04)"
            : `color-mix(in srgb, ${colors.bg} 90%, white)`
        };
      }
      
      .${styleId}:active:not([disabled]) {
        --md-filled-button-pressed-container-color: ${
          variant === "ghost" || variant === "link"
            ? "rgba(0, 0, 0, 0.08)"
            : `color-mix(in srgb, ${colors.bg} 85%, black)`
        };
      }
      
      .${styleId}:focus-visible {
        outline: 2px solid ${colors.bg};
        outline-offset: 2px;
      }

      /* Special styles for outlined variants (ghost) */
      ${
        variant === "ghost"
          ? `
        .${styleId} {
          --md-outlined-button-container-shape: 24px;
          --md-outlined-button-outline-color: ${colors.border};
          --md-outlined-button-outline-width: 2px;
          --md-outlined-button-label-text-color: ${colors.text};
          --md-outlined-button-hover-label-text-color: ${colors.text};
          --md-outlined-button-pressed-label-text-color: ${colors.text};
          --md-outlined-button-focus-label-text-color: ${colors.text};
          background: transparent !important;
        }
      `
          : ""
      }

      /* Special styles for link variant */
      ${
        variant === "link"
          ? `
        .${wrapperStyleId} {
          border: none;
          padding: 0;
        }
        .${styleId} {
          --md-text-button-label-text-color: ${colors.text};
          --md-text-button-hover-label-text-color: ${colors.text};
          --md-text-button-pressed-label-text-color: ${colors.text};
          --md-text-button-focus-label-text-color: ${colors.text};
          text-decoration: underline;
          text-underline-offset: 4px;
          background: transparent !important;
        }
        .${styleId}:hover:not([disabled]) {
          text-decoration: underline;
          background: transparent !important;
        }
      `
          : ""
      }

      /* Icon only button styles */
      ${
        size === "icon"
          ? `
        .${wrapperStyleId} {
          border-radius: 26px;
        }
        .${styleId} {
          --md-filled-button-container-width: 48px;
          --md-filled-button-container-height: 48px;
          --md-filled-button-container-shape: 22px;
          min-width: 48px !important;
          width: 48px;
          height: 48px;
        }
      `
          : ""
      }

      /* Ghost variant special wrapper styling */
      ${
        variant === "ghost"
          ? `
        .${wrapperStyleId} {
          border-color: transparent;
        }
        .${wrapperStyleId}:hover:not(.disabled) {
          border-color: ${colors.outerBorder};
          background-color: rgba(0, 0, 0, 0.02);
        }
      `
          : ""
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [
    textColor,
    borderColor,
    outerBorderColor,
    variant,
    size,
    disabled,
    colors,
    styleId,
    wrapperStyleId,
  ]);

  // Determine which button variant to use
  const getButtonVariant = () => {
    switch (variant) {
      case "ghost":
        return "outlined";
      case "link":
        return "text";
      default:
        return "filled"; // Use filled for default to get blue background
    }
  };

  if (asChild) {
    return (
      <Slot
        className={cn(materialButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <div className={cn(wrapperStyleId, disabled && "disabled")}>
      <Button
        variant={getButtonVariant()}
        className={cn(
          materialButtonVariants({ variant, size }),
          styleId,
          className
        )}
        disabled={disabled}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}

export { MaterialButton, materialButtonVariants };
export type { MaterialButtonProps };
