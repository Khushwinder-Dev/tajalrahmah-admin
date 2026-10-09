import video from "@/assets/videos/test.mp4";
import VideoModal from "@/components/common/VideoModal";
import { Button } from "@/components/ui/button";
import { Popover } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

interface Props {
  value: [string | null, string | null];
  setValue: (value: [string | null, string | null]) => void;
}

const PageHeader = ({ value, setValue }: Props) => {
  const formatted = value.map((d) =>
    d ? dayjs(d).format("MMM DD, YYYY") : null
  );

  return (
    <div className="flex items-center justify-between mb-8 w-full">
      {/* Left side - Title and Video */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <VideoModal src={video} header={"Tutorial video"} />
        <h1 className="text-2xl font-bold text-primary">Activity Log</h1>
      </div>

      {/* Right side - Date Picker */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <Popover width={700} position="bottom-end" withArrow shadow="md">
          <Popover.Target>
            <Button variant="outline" className="min-w-[100px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value[0] && value[1] ? formatted.join(" - ") : "Date"}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker
              size="sm"
              value={value}
              onChange={setValue}
              type="range"
              numberOfColumns={2}
              presets={[
                {
                  value: [
                    dayjs().format("YYYY-MM-DD"),
                    dayjs().format("YYYY-MM-DD"),
                  ],
                  label: "Today",
                },
                {
                  value: [
                    dayjs().startOf("week").format("YYYY-MM-DD"),
                    dayjs().endOf("week").format("YYYY-MM-DD"),
                  ],
                  label: "This Week",
                },
                {
                  value: [
                    dayjs()
                      .subtract(1, "week")
                      .startOf("week")
                      .format("YYYY-MM-DD"),
                    dayjs()
                      .subtract(1, "week")
                      .endOf("week")
                      .format("YYYY-MM-DD"),
                  ],
                  label: "Last Week",
                },
                {
                  value: [
                    dayjs().startOf("month").format("YYYY-MM-DD"),
                    dayjs().endOf("month").format("YYYY-MM-DD"),
                  ],
                  label: "This Month",
                },
                {
                  value: [
                    dayjs()
                      .subtract(1, "month")
                      .startOf("month")
                      .format("YYYY-MM-DD"),
                    dayjs()
                      .subtract(1, "month")
                      .endOf("month")
                      .format("YYYY-MM-DD"),
                  ],
                  label: "Last Month",
                },
                {
                  value: [
                    dayjs().subtract(30, "days").format("YYYY-MM-DD"),
                    dayjs().format("YYYY-MM-DD"),
                  ],
                  label: "Last 30 Days",
                },
                {
                  value: [
                    dayjs().subtract(7, "days").format("YYYY-MM-DD"),
                    dayjs().format("YYYY-MM-DD"),
                  ],
                  label: "Last 7 Days",
                },
              ]}
            />
          </Popover.Dropdown>
        </Popover>
      </div>
    </div>
  );
};

export default PageHeader;
