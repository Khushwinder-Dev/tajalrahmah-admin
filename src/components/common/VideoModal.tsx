import { useRef, useState } from "react";
import { Text, Modal, Tooltip } from "@mantine/core";
import { X } from "lucide-react";

type TVideoModalProps = {
  src: string;
  header: string;
  trigger?: React.ReactNode; // Add optional trigger prop for custom button
};

const VideoModal = ({ src, header, trigger }: TVideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [opened, setOpened] = useState<boolean>(false);

  const defaultTrigger = //add tooltip
    (
      <Tooltip
        label="Play video"
        position="top"
        withArrow
        arrowSize={8}
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
        <button
          onClick={() => setOpened(true)}
          className="shrink-0"
          style={{
            width: "40px",
            height: "40px",
            flexShrink: 0,
            aspectRatio: "1/1",
          }}
        >
          <img
            src="/vidoe-modal.svg"
            alt="Play video"
            className="cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              width: "40px",
              height: "40px",
              flexShrink: 0,
              aspectRatio: "1/1",
            }}
          />
        </button>
      </Tooltip>
    );

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpened(true)}>{trigger}</div>
      ) : (
        defaultTrigger
      )}

      <Modal
        size="xlg"
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        withCloseButton={false}
        classNames={{
          // header: "hidden rounded-full!",
          content: "rounded-md!",
          // body: "rounded-xl!",
        }}
      >
        <div className="relative text-white w-full max-w-2xl mx-auto p-4">
          {/* Close Button */}
          <button
            onClick={() => setOpened(false)}
            className="absolute -top-3 -right-3 rtl:right-auto rtl:-left-3 z-10 rounded-full p-2 transition-all duration-200 cursor-pointer hover:bg-red-500 text-black hover:text-red-100"
          >
            <X className="w-5 h-5 transition-all" />
          </button>

          {/* HTML Video Element */}
          <video
            ref={videoRef}
            src={src}
            className="w-full rounded-md my-3"
            controls
            disablePictureInPicture
            controlsList="nodownload noremoteplayback noplaybackrate"
          />

          <Text
            size="lg"
            className="absolute -top-2 text-primary! py-4 rounded-md font-semibold!"
          >
            {header}
          </Text>
        </div>
      </Modal>
    </>
  );
};

export default VideoModal;
