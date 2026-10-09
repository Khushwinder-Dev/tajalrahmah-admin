/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface FieldSectionProps {
  label: string;
  value: string | number | React.ReactNode;
}

const FieldSection: React.FC<FieldSectionProps> = ({ label, value }) => {
  const displayValue = (value: any) => {
    return value === undefined || value === null || value === "" ? "-" : value;
  };

  return (
    <div className="mb-3">
      <h3 className="font-normal mb-1 text-gray-600">{label}</h3>
      <div className="w-full py-1 text-gray-900 font-bold text-md dark:text-white">
        {displayValue(value)}
      </div>
    </div>
  );
};

export default FieldSection;
