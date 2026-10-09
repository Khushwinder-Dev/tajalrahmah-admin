import { Select, type SelectProps } from "@mantine/core";
import { useState } from "react";
import clsx from "clsx";
import React from "react";

type FloatingSelectProps = SelectProps & {
  label: string;
};

// export function FloatingSelect({
//   label,
//   value,
//   onChange,
//   data,
//   disabled,
//   ...props
// }: FloatingSelectProps) {
//   const hasValue = value;
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div className="relative w-full">
//       <Select
//         data={data}
//         value={value}
//         onChange={onChange}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         searchable
//         clearable
//         disabled={disabled}
//         maxDropdownHeight={200}
//         classNames={{
//           input: clsx(
//             "peer pt-6 pb-1 !min-h-[50px] !h-full !rounded-[12px] !flex !items-center !bg-[#f8fafc]",
//             { "!border-primary !border-2": isFocused },
//             { disabled: "!border-gray-600 !cursor-not-allowed" }
//           ),
//         }}
//         placeholder=" "
//         {...props}
//       />

//       <label
//         className={clsx(
//           "absolute left-1 px-2 text-base text-gray-800 dark:text-gray-400 bg-[#f8fafc] dark:bg-gray-900 transition-all duration-200 pointer-events-none",
//           {
//             "top-0 text-sm -translate-y-1/2 scale-75": isFocused || hasValue,
//             "top-1/2 -translate-y-1/2": !isFocused && !hasValue,
//             "!bg-transparent": disabled,
//             "text-primary": isFocused,
//           }
//         )}
//       >
//         {label}
//       </label>
//     </div>
//   );
// }

export const FloatingSelect = React.forwardRef<
  HTMLDivElement,
  FloatingSelectProps
>(({ label, value, onChange, data, disabled, ...props }, ref) => {
  const hasValue = value;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full" ref={ref}>
      <Select
        data={data}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        searchable
        clearable
        disabled={disabled}
        maxDropdownHeight={200}
        classNames={{
          input: clsx(
            "peer pt-6 pb-1 !min-h-[50px] !h-full !rounded-[12px] !flex !items-center !bg-[#f8fafc]",
            { "!border-primary !border-2": isFocused },
            { disabled: "!border-gray-600 !cursor-not-allowed" }
          ),
        }}
        placeholder=" "
        {...props}
      />
      <label
        className={clsx(
          "absolute left-1 px-2 text-base text-gray-800 dark:text-gray-400 bg-[#f8fafc] dark:bg-gray-900 transition-all duration-200 pointer-events-none",
          {
            "top-0 text-sm -translate-y-1/2 scale-75": isFocused || hasValue,
            "top-1/2 -translate-y-1/2": !isFocused && !hasValue,
            "!bg-transparent": disabled,
            "text-primary": isFocused,
          }
        )}
      >
        {label}
      </label>
    </div>
  );
});
