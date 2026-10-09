import video from "@/assets/videos/test.mp4";
import VideoModal from "@/components/common/VideoModal";
import { Button } from "@/components/ui/button";
import { Modal } from "@mantine/core";
import { useState } from "react";

export default function FinancialYearEndingPage() {
  const [popUp, setPopUp] = useState(false);

  return (
    <div className="w-100vw px-2 py-4 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-8">
        {/* Left side - Title and Video */}
        <div className="flex items-center gap-4">
          <VideoModal src={video} header={"Tutorial video"} />
          <h1 className="text-2xl font-bold text-primary capitalize">
            Financial Year Ending
          </h1>
        </div>
      </div>

      <div className="text-center">
        <Button
          className="bg-sky-400 h-[50px] px-8 font-semibold hover:bg-primary text-black rounded-full cursor-pointer"
          onClick={() => setPopUp(true)}
        >
          End Your Financial Year
        </Button>
      </div>

      <Modal opened={popUp} onClose={() => setPopUp(false)} centered>
        <div className="space-y-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-black capitalize">
            Year Ending
          </h2>

          <h3 className="text-2xl font-bold capitalize text-red-400">
            Are You Sure?
          </h3>
          <div className="my-8 flex gap-8">
            <Button
              className="bg-sky-400 hover:bg-primary text-black rounded-full cursor-pointer"
              onClick={() => setPopUp(false)}
            >
              Confirm
            </Button>

            <Button
              className="bg-red-400 hover:bg-primary text-black rounded-full cursor-pointer"
              onClick={() => setPopUp(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
