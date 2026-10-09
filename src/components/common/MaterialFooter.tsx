import * as React from "react";
import { useTranslation } from "react-i18next";
import Button from "material-web-components-react/button";

interface FooterMaterialButtonProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: React.ReactNode;
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  buttonRef?: React.RefObject<HTMLElement>;
}

export const FooterMaterialButton: React.FC<FooterMaterialButtonProps> = ({
  checked,
  onCheckedChange,
  icon,
  ariaLabel,
  className = "",
  disabled = false,
  buttonRef,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    event.preventDefault();
    onCheckedChange(!checked);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      onCheckedChange(!checked);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <style>{`
        .google-meet-button {
          --md-filled-tonal-button-container-shape: 24px;
          --md-filled-tonal-button-container-height: 48px;
          --md-filled-tonal-button-label-text-font: 'Inter', system-ui, sans-serif;
          --md-filled-tonal-button-label-text-size: 14px;
          --md-filled-tonal-button-label-text-weight: 500;
          min-width: 70px;
          width: 70px;
          transition: all 0.2s ease-in-out;
          ${
            checked
              ? `--md-sys-color-secondary-container: #1976d2;
               --md-sys-color-on-secondary-container: #ffffff;`
              : `--md-sys-color-secondary-container: #e8f4fd;
               --md-sys-color-on-secondary-container: #1976d2;`
          }
          ${disabled ? "opacity: 0.5; pointer-events: none;" : ""}
        }
                
        .google-meet-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.25);
        }
                
        .google-meet-button:active:not(:disabled) {
          transform: translateY(0px);
        }
                
        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          ${isRTL ? "flex-direction: row-reverse;" : ""}
        }
                
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }
      `}</style>

      <Button
        ref={buttonRef}
        variant="filled-tonal"
        className="google-meet-button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="button-content">
          <div className="icon-wrapper">{icon}</div>
        </div>
      </Button>
    </div>
  );
};

export default FooterMaterialButton;
