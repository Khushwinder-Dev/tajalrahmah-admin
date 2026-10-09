import React from "react";

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 120,
  strokeWidth = 12,
  color,
  label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center h-48 shadow">
      {/* Title with indicator */}
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>

      {/* Circular progress */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{score}</span>
        </div>
      </div>
    </div>
  );
};

const GoogleLighthouseWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Google Lighthouse
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <CircularProgress
          score={74}
          color="#eab308"
          label="Performance Score"
        />
        <CircularProgress score={71} color="#eab308" label="SEO Score" />
        <CircularProgress
          score={86}
          color="#22c55e"
          label="Accessibility Score"
        />
        <CircularProgress
          score={90}
          color="#22c55e"
          label="Best Practices Score"
        />
      </div>
    </div>
  );
};

export default GoogleLighthouseWidget;
