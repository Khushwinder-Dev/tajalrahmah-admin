import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";
import {
  CheckCircle,
  FileText,
  XCircle,
  Trash2,
  RefreshCw,
  BarChart3,
  Activity,
  Calculator,
} from "lucide-react";

export type StatisticsType = {
  total: number;
  draft: number;
  active: number;
  inactive: number;
  deleted: number;
  updated: number;
};

export type MobileCardDataType = {
  key: keyof StatisticsType;
  title: string;
  color: string;
  total: number;
};

type Props = {
  statistics: StatisticsType;
  data: MobileCardDataType[];
  borderColor?: string;
};

const colorMap: Record<
  string,
  { titleColor: string; numberColor: string; borderColor: string }
> = {
  blue: {
    titleColor: "#20B7FA",
    numberColor: "#1E88E5",
    borderColor: "#E3F2FD",
  },
  green: {
    titleColor: "#6BE4A0",
    numberColor: "#4CAF50",
    borderColor: "#E8F5E8",
  },
  yellow: {
    titleColor: "#FFCC2F",
    numberColor: "#FF9800",
    borderColor: "#FFF8E1",
  },
  purple: {
    titleColor: "#9A78FF",
    numberColor: "#7B68EE",
    borderColor: "#F3E5F5",
  },
  gray: {
    titleColor: "#82CAD2",
    numberColor: "#607D8B",
    borderColor: "#F5F5F5",
  },
  red: {
    titleColor: "#FC9296",
    numberColor: "#F44336",
    borderColor: "#FFEBEE",
  },
};

// Icon mapping for different card types
const iconMap: Record<string, React.ReactNode> = {
  total: <Calculator size={16} />,
  active: <CheckCircle size={16} />,
  draft: <FileText size={16} />,
  inactive: <XCircle size={16} />,
  deleted: <Trash2 size={16} />,
  updated: <RefreshCw size={16} />,
  // Fallback icons
  default: <BarChart3 size={16} />,
  activity: <Activity size={16} />,
};

const MobileSummaryCards = ({
  data,
  borderColor = "border-gray-200",
}: Props) => {
  // Calculate dummy percentages for demonstration
  const calculatePercentage = (index: number) => {
    const dummyPercentages = [100, 35, 12, 28, 8, 17];
    return dummyPercentages[index] || Math.floor(Math.random() * 40) + 5;
  };

  return (
    <div className={cn("relative rounded-lg bg-white p-4", borderColor)}>
      {/* Mobile Cards Grid - 2 rows, 3 columns */}
      <div className="grid grid-cols-3 gap-3">
        {data?.slice(0, 6).map((config, index) => {
          const cardStyle = colorMap[config.color] || colorMap.blue;
          const percentage = calculatePercentage(index);
          const icon = iconMap[config.key] || iconMap.default;

          return (
            <Tooltip
              key={config.key}
              label={`${percentage}%`}
              position="top"
              withArrow
              arrowSize={8}
              styles={{
                tooltip: {
                  fontSize: "12px",
                  padding: "6px 10px",
                  backgroundColor: "white",
                  color: "var(--primary)",
                  border: "1px solid var(--primary)",
                  borderRadius: "6px",
                  fontWeight: "600",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                },
                arrow: {
                  backgroundColor: "white",
                  border: "1px solid var(--primary)",
                },
              }}
            >
              <div className="cursor-pointer transition-transform duration-200 hover:scale-105">
                <div
                  className="flex max-[450px]:flex-col items-center justify-between p-3 rounded-lg shadow-sm bg-white border h-16"
                  style={{
                    borderColor: cardStyle.borderColor,
                  }}
                >
                  {/* Left side - Icon and Title */}
                  <div className="flex items-center gap-2 flex-1">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0"
                      style={{ color: cardStyle.titleColor }}
                    >
                      {icon}
                    </div>

                    {/* Title - Full text, no truncation */}
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: cardStyle.titleColor,
                      }}
                      title={config.title}
                    >
                      {config.title}
                    </span>
                  </div>

                  {/* Right side - Counter */}
                  <span
                    className="text-sm font-bold flex-shrink-0 ml-2"
                    style={{
                      color: cardStyle.numberColor,
                    }}
                  >
                    {config.total}
                  </span>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSummaryCards;
