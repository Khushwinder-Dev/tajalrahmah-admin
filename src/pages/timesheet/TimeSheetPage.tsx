import video from "@/assets/videos/test.mp4";

import VideoModal from "@/components/common/VideoModal";
import TimeSheetTable from "./TimeSheetTable";

export default function TimeSheetPage() {
  return (
    <div className="w-100vw px-2 py-4 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-8">
        {/* Left side - Title and Video */}
        <div className="flex items-center gap-4">
          <VideoModal src={video} header={"Tutorial video"} />
          <h1 className="text-2xl font-bold text-primary">Time Sheet</h1>
        </div>
      </div>

      {/* Time Sheet Tabale */}
      <TimeSheetTable />
    </div>
  );
}
