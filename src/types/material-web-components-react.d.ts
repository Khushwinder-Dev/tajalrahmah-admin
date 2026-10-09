/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "material-web-components-react/button" {
  import { ReactNode, Ref, MouseEvent, KeyboardEvent } from "react";

  interface ButtonProps {
    variant?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text";
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
    role?: string;
    "aria-checked"?: boolean;
    "aria-label"?: string;
    ref?: Ref<HTMLElement>;
    style?: React.CSSProperties;
    tabIndex?: number;
  }

  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module "material-web-components-react/icon-button" {
  import { ReactNode, Ref, MouseEvent } from "react";

  interface IconButtonProps {
    variant?: "standard" | "filled" | "filled-tonal" | "outlined";
    toggle?: boolean;
    selected?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    "aria-label"?: string;
    ref?: Ref<HTMLElement>;
    style?: React.CSSProperties;
  }

  const IconButton: React.FC<IconButtonProps>;
  export default IconButton;
}

// Add other common components that might be available
declare module "material-web-components-react/textfield" {
  import { Ref, ChangeEvent } from "react";

  interface TextFieldProps {
    variant?: "filled" | "outlined";
    label?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    type?: string;
    className?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref?: Ref<HTMLInputElement>;
  }

  const TextField: React.FC<TextFieldProps>;
  export default TextField;
}

declare module "material-web-components-react/checkbox" {
  import { Ref, ChangeEvent } from "react";

  interface CheckboxProps {
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    required?: boolean;
    value?: string;
    className?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    "aria-label"?: string;
    ref?: Ref<HTMLInputElement>;
  }

  const Checkbox: React.FC<CheckboxProps>;
  export default Checkbox;
}

declare module "material-web-components-react/switch" {
  import { Ref, ChangeEvent } from "react";

  interface SwitchProps {
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    "aria-label"?: string;
    ref?: Ref<HTMLInputElement>;
  }

  const Switch: React.FC<SwitchProps>;
  export default Switch;
}

declare module "material-web-components-react/chip" {
  import { Ref, MouseEvent } from "react";

  interface ChipProps {
    variant?: "assist" | "filter" | "input" | "suggestion";
    label?: string;
    disabled?: boolean;
    selected?: boolean;
    elevated?: boolean;
    children?: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    "aria-label"?: string;
    ref?: Ref<HTMLElement>;
  }

  const Chip: React.FC<ChipProps>;
  export default Chip;
}

// For any other components that might exist but aren't typed
declare module "material-web-components-react/*" {
  const component: any;
  export default component;
}
