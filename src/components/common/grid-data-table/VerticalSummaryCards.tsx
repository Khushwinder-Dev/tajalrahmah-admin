import { cn } from "@/lib/utils";

export type StatisticsType = {
  total: number;
  draft: number;
  active: number;
  inactive: number;
  deleted: number;
  updated: number;
};

export type ProgressCardDataType = {
  key: keyof Props["statistics"];
  title: string;
  icon: React.ReactNode;
  color: string;
  total: number;
};

type Props = {
  statistics: StatisticsType;
  data: ProgressCardDataType[];
  borderColor?: string;
};

const colorMap: Record<string, { fill: string; deep: string; dark: string }> = {
  blue: {
    fill: "bg-[#AEE7FE]", // Original fill (lightest)
    deep: "bg-[#4AC8FF]", // Lighter than original #00B2FA
    dark: "bg-[#009EDE]", // Kept original dark
  },
  green: {
    fill: "bg-[#98FFC5]",
    deep: "bg-[#4AFF9F]", // Lighter than original #12FF81
    dark: "bg-[#00E959]",
  },
  yellow: {
    fill: "bg-[#FFE289]",
    deep: "bg-[#FFD95C]", // Lighter than original #FFCC2F
    dark: "bg-[#E8B518]",
  },
  purple: {
    fill: "bg-[#DFB9FF]",
    deep: "bg-[#C885FF]", // Lighter than original #BA69FF
    dark: "bg-[#A352E8]",
  },
  gray: {
    fill: "bg-[#B6C7DE]",
    deep: "bg-[#8CB8FF]", // Lighter than original #70ADFF
    dark: "bg-[#5491E3]",
  },
  red: {
    fill: "bg-[#FF9EA1]",
    deep: "bg-[#FF7378]", // Lighter than original #FF595E
    dark: "bg-[#E33D42]",
  },
};

const VerticalSummaryCards = ({
  data,
  statistics,
  borderColor = "border-gray-200",
}: Props) => {
  // calculate percentage
  const calculatePercentage = (value: number) => {
    return statistics.total > 0
      ? Math.round((value / statistics.total) * 100)
      : 0;
  };

  return (
    <div className={cn("relative rounded-lg  bg-white", borderColor)}>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {data?.map((config) => {
          const percentage = calculatePercentage(config.total);
          const barFillColor = colorMap[config.color].deep;
          const barBgColor = colorMap[config.color].fill;
          const barIconColorBg = colorMap[config.color].dark;

          return (
            <div
              key={config.key}
              className="flex items-center h-20 cursor-pointer"
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-18 h-18 flex items-center justify-center z-40 relative -mr-1 rtl:mr-0 rtl:-ml-1 rounded-full inset-shadow-sm inset-shadow-[#ffffff]/70 text-white",
                  barIconColorBg
                )}
              >
                {config.icon}
              </div>

              {/* Progress Bar */}
              <div className="flex-1 h-12 relative -ml-9 rtl:-mr-9 rtl:ml-0">
                <div
                  className={cn(
                    "h-full w-full bg-[#E2E4EB] border-solid border border-[#EAF7FD] overflow-hidden",
                    "rounded-[0px_100px_100px_0px] rtl:rounded-[100px_0px_0px_100px]",
                    barBgColor
                  )}
                >
                  <div
                    className={cn(
                      "h-full flex items-center justify-between relative text-white font-semibold px-4 text-sm transition-all duration-500 ease-out",
                      "rounded-[0px_100px_100px_0px] rtl:rounded-[100px_0px_0px_100px]",
                      "bg-gradient-to-r",
                      barFillColor
                    )}
                    style={{ width: `${Math.max(percentage, 20)}%` }}
                  />
                  {/* Progress bar  */}
                  <div className="absolute left-0 top-0 h-full flex items-center justify-between w-full pr-4">
                    <span className="whitespace-nowrap uppercase text-white font-bold text-base ml-12 rtl:ml-0 rtl:mr-8">
                      {config.title}
                    </span>
                    <span className="font-bold text-base text-black px-2">
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalSummaryCards;
