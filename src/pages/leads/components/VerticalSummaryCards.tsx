import useContainerWidth from "@/hooks/useCOntainerWidth";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mantine/core";

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
  imgSrc: string;
  icon: React.ReactNode;
  color: string;
  total: number;
};

type Props = {
  statistics: StatisticsType;
  data: ProgressCardDataType[];
  borderColor?: string;
};

const colorMap: Record<string, { background: string; iconBg: string }> = {
  blue: {
    background: "linear-gradient(100deg, #70D3FC 24.22%, #D2F1FE 73.78%)",
    iconBg: "bg-[#20B7FA]",
  },
  green: {
    background: "linear-gradient(98deg, #6BE4A0 25.78%, #C4FFDD 76.35%)",
    iconBg: "bg-[#6BE4A0]",
  },
  yellow: {
    background: "linear-gradient(96deg, #F8D56B 28.65%, #FFF4D3 85.82%)",
    iconBg: "bg-[#FFCC2F]",
  },
  purple: {
    background: "linear-gradient(96deg, #9A78FF 18.47%, #D6C8FF 74.92%)",
    iconBg: "bg-[#9A78FF]",
  },
  gray: {
    background: "linear-gradient(276deg, #E2FBFF 15.76%, #82CAD2 82.53%)",
    iconBg: "bg-[#82CAD2]",
  },
  red: {
    background: "linear-gradient(96deg, #FC9296 22.14%, #FFDFE0 76.81%)",
    iconBg: "bg-[#FC9296]",
  },
};

const VerticalSummaryCards = ({
  data,
  borderColor = "border-gray-200",
}: Props) => {
  // Calculate dummy percentages for demonstration
  const calculatePercentage = (index: number) => {
    const dummyPercentages = [100, 35, 12, 28, 8, 17];
    return dummyPercentages[index] || Math.floor(Math.random() * 40) + 5;
  };

  const { containerWidth, containerRef } = useContainerWidth();

  console.log("containerWidth", containerWidth);

  // Calculate dynamic minWidth based on container width and number of columns
  const calculateMinWidth = () => {
    const numColumns = 5; // You have 4 cards per row
    const gap = 24; // gap-6 = 24px
    const padding = 32; // px-4 on both sides = 32px total
    const availableWidth = containerWidth - padding - gap * (numColumns - 1);
    const maxCardWidth = availableWidth / numColumns;

    // Set minWidth to 85% of available space per card, with absolute min/max
    return Math.min(Math.max(maxCardWidth * 0.85, 200), 270);
  };

  console.log("maxCardWidth", calculateMinWidth());

  // const dynamicMinWidth = 230;

  return (
    <div
      className={cn(
        "relative rounded-lg bg-white dark:bg-gray-900",
        borderColor
      )}
    >
      {/* Cards Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
        {data?.map((config, index) => {
          const cardBackground =
            colorMap[config.color]?.background || colorMap.blue.background;
          const iconBgColor =
            colorMap[config.color]?.iconBg || colorMap.blue.iconBg;

          const percentage = calculatePercentage(index);

          return (
            <div
              key={config.key}
              className="w-full flex justify-center"
              ref={containerRef}
            >
              <Tooltip
                label={`${percentage}%`}
                position="top"
                withArrow
                arrowSize={10}
                styles={{
                  tooltip: {
                    fontSize: "14px",
                    padding: "8px 12px",
                    backgroundColor: "white",
                    color: "var(--primary)",
                    border: "1px solid var(--primary)",
                    borderRadius: "6px",
                    fontWeight: "600",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  },
                  arrow: {
                    backgroundColor: "white",
                    border: "1px solid var(--primary)",
                  },
                }}
              >
                <div className="cursor-pointer transition-transform duration-200 w-full">
                  <div
                    className="flex items-center relative min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[160px] xl:min-w-[160px] min-[1600px]:min-w-[230px]"
                    style={{
                      background: cardBackground,
                      borderRadius: "100px",
                      width: "100%",
                      height: "70px",
                      // minWidth: `${dynamicMinWidth}px`,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex items-center justify-center text-white relative z-10 flex-shrink-0",
                        iconBgColor
                      )}
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        filter:
                          "drop-shadow(4px 4px 10px rgba(255, 255, 255, 0.14))",
                      }}
                    >
                      <img
                        src={config.imgSrc}
                        alt="Total counter"
                        className="w-6 h-6 min-[1600px]:w-9 min-[1600px]:h-9"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex items-center justify-between flex-1 ml-2 mr-4">
                      {/* Title - Centered */}
                      <div className="flex-1 flex items-center justify-center">
                        <span
                          className="truncate text-center text-base font-bold leading-[130%] min-[1600px]:text-xl"
                          style={{
                            color: "#4E516C",
                          }}
                          title={config.title}
                        >
                          {config.title}
                        </span>
                      </div>

                      {/* Counter - Right Side */}
                      <span
                        className="flex-shrink-0 ml-2 text-base font-bold leading-[130%] min-[1600px]:text-xl"
                        style={{
                          color: "#4E516C",
                        }}
                      >
                        {config.total}
                      </span>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalSummaryCards;
