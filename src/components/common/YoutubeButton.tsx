import { PlayIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import YouTube from "react-youtube";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type youtubeOptions = {
  height: string;
  width: string;
  playerVars: {
    autoplay: number;
  };
};

type YoutubeButtonProps = {
  videoId: string;
  youtubeOptions?: youtubeOptions;
};

const YoutubeButton = ({ videoId, youtubeOptions }: YoutubeButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 sm:w-12 hover:bg-primary bg-primary border-primary cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <PlayIcon className="size-4 text-white" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Country Guide Video</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <YouTube videoId={videoId} opts={youtubeOptions} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default YoutubeButton;
