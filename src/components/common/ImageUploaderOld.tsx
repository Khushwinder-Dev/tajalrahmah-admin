import React, { useRef, useState } from "react";
import { X } from "lucide-react";

const TABS = ["Attachment", "Drop", "Gallery"] as const;
type Tab = (typeof TABS)[number];

interface ImageUploaderProps {
  onImageSelect: (file: File | string) => void;
  existingImages?: string[];
  isEditPage?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  existingImages = [],
  isEditPage = false,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("Drop");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      onImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      onImageSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent, isEnter: boolean) => {
    e.preventDefault();
    setIsDragging(isEnter);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleGallerySelect = (img: string) => {
    setImagePreview(img);
    onImageSelect(img);
  };

  return (
    <div className="relative w-full h-full rounded-lg border-2 border-dashed border-gray-300 bg-stone-50">
      {/* Floating Label */}
      <div className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-gray-500 rounded-md">
        Flag
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 p-2 pb-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab(tab);
            }}
            className={`w-48 h-12 px-4 rounded-t-lg flex items-center justify-center text-base font-semibold! cursor-pointer ${
              activeTab === tab
                ? "bg-white text-primary font-bold "
                : "bg-stone-50 text-black/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white w-full h-60 rounded-b-lg flex items-center justify-center relative">
        {imagePreview && (
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setImagePreview(null)}
              className="bg-white shadow p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeTab === "Attachment" && (
          <div className="flex flex-col items-center">
            {isEditPage && !imagePreview ? (
              // Show mock image for edit page when no image is selected
              <div className="flex flex-col items-center">
                <img
                  src="/sample1.png"
                  alt="Current Flag"
                  className="w-32 h-fit object-contain rounded border cursor-pointer hover:opacity-80 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // When clicked, treat as if image was selected
                    onImageSelect("/sample1.png");
                    setImagePreview("/sample1.png");
                  }}
                />
                <p className="mt-2 text-sm text-gray-600">
                  Current Flag (Click to select)
                </p>
              </div>
            ) : (
              // Show normal upload interface
              <>
                <img
                  src="/upload.svg"
                  alt="Upload"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                  className="w-16 h-fit cursor-pointer hover:opacity-80 transition"
                />
                <p className="mt-2 text-sm text-gray-600">Upload here</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </>
            )}
          </div>
        )}
        {activeTab === "Drop" && (
          <div className="flex flex-col items-center">
            {isEditPage && !imagePreview ? (
              // Show mock image for edit page when no image is selected
              <div className="flex flex-col items-center">
                <img
                  src="/sample1.png"
                  alt="Current Flag"
                  className="w-32 h-fit object-contain rounded border cursor-pointer hover:opacity-80 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // When clicked, treat as if image was selected
                    onImageSelect("/sample1.png");
                    setImagePreview("/sample1.png");
                  }}
                />
                <p className="mt-2 text-sm text-gray-600">
                  Current Flag (Click to select)
                </p>
              </div>
            ) : (
              // Show normal drop interface
              <div
                className={`p-6 rounded-lg w-3/4 h-40 flex flex-col items-center justify-center text-center transition ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <img src="/drop.svg" alt="Drop" className="w-14 h-fit" />
                <p className="text-black/60 mt-2">Drag & Drop Your File Here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "Gallery" && (
          <div className="grid grid-cols-12 gap-2 p-2 w-full h-full content-start overflow-auto">
            {existingImages.length > 0 ? (
              existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx}`}
                  className={`w-full h-fit aspect-video object-cover cursor-pointer border rounded-md hover:opacity-80 ${
                    imagePreview === img ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleGallerySelect(img);
                  }}
                />
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center h-32">
                <p className="text-gray-500 text-center">
                  No images in gallery.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Preview Image */}
        {imagePreview && (
          <div className="absolute bottom-4 left-4 cursor-pointer">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-fit object-contain rounded border"
            />
            <div className="absolute top-[-4px] right-[-4px]">
              <button
                onClick={() => setImagePreview(null)}
                className="bg-white shadow p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
