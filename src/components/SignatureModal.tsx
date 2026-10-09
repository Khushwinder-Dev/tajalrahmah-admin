import { useState, useRef, useEffect } from "react";
import { Modal } from "@mantine/core";
import Canvas from "react-canvas-wrapper";

type SignatureModalProps = {
  opened: boolean;
  onClose: () => void;
  onSignatureSave: (signatureData: string) => void;
};

export default function SignatureModal({
  opened,
  onClose,
  onSignatureSave,
}: SignatureModalProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState<string>("");
  const [isSignatureAvailable, setIsSignatureAvailable] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas when modal opens
  useEffect(() => {
    if (opened && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        // Set canvas size explicitly
        canvas.width = 550;
        canvas.height = 200;

        // Clear canvas and set up drawing context
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2;

        // Fill with white background
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        console.log("Canvas initialized:", canvas.width, canvas.height);
      }
    }
  }, [opened]);

  const getCoordinates = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
      | MouseEvent
      | TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Scale coordinates based on canvas display size vs actual size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e, canvas);

    context.beginPath();
    context.moveTo(x, y);
    console.log("Start drawing at:", x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { x, y } = getCoordinates(e, canvas);

    context.lineTo(x, y);
    context.stroke();

    // Update signature data
    const dataURL = canvas.toDataURL();
    setSignatureData(dataURL);
    setIsSignatureAvailable(true);

    console.log("Drawing to:", x, y);
  };

  const stopDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setIsDrawing(false);
    console.log("Stop drawing");
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Fill with white background again
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setSignatureData("");
        setIsSignatureAvailable(false);
      }
    }
  };

  const testLine = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = "red";
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(50, 50);
        context.lineTo(200, 100);
        context.stroke();
        context.strokeStyle = "black";
        context.lineWidth = 2;

        // Update signature data
        const dataURL = canvas.toDataURL();
        setSignatureData(dataURL);
        setIsSignatureAvailable(true);
      }
    }
  };

  const handleSign = () => {
    if (signatureData) {
      // Save signature to server first
      saveSignatureToServer(signatureData);
      onSignatureSave(signatureData);
      onClose();
    }
  };

  const saveSignatureToServer = async (signatureData: string) => {
    try {
      // Save signature to localStorage
      const signatureKey = `signature_${new Date().toISOString()}`;
      const signatureDataToSave = {
        signatureData: signatureData,
        timestamp: new Date().toISOString(),
        id: signatureKey,
      };

      // Get existing signatures or initialize empty array
      const existingSignatures = JSON.parse(
        localStorage.getItem("signatures") || "[]"
      );

      // Add new signature
      existingSignatures.push(signatureDataToSave);

      // Save back to localStorage
      localStorage.setItem("signatures", JSON.stringify(existingSignatures));

      // Also download signature as PNG file to user's Downloads folder
      const link = document.createElement("a");
      link.download = `signature_${signatureKey}.png`;
      link.href = signatureData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(
        "Signature saved locally and downloaded successfully",
        signatureDataToSave
      );
    } catch (error) {
      console.error("Error saving signature locally:", error);
    }
  };

  const handleImportSignature = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSignatureData(result);
          setIsSignatureAvailable(true);

          // Draw the imported image on canvas
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
              const img = new Image();
              img.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = "white";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
              };
              img.src = result;
            }
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <span className="font-bold text-sky-500 ml-2">
          Please use your signature
        </span>
      }
      size="lg"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <div className="space-y-6 p-4">
        {/* Signature Canvas */}
        <div className="space-y-3">
          <div className="text-xs text-gray-500 mb-2">
            Click and drag to draw your signature
          </div>

          <div className="border border-gray-300 rounded bg-white">
            <Canvas
              ref={canvasRef}
              width={550}
              height={200}
              className="cursor-crosshair block"
              style={{
                width: "100%",
                height: "200px",
                touchAction: "none",
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearCanvas}
              className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50 cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={testLine}
              className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50 cursor-pointer"
            >
              Test Line
            </button>
          </div>
        </div>

        {/* Signature Available Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSignatureAvailable}
            onChange={(e) => setIsSignatureAvailable(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-900">
            Signature is Available
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleImportSignature}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 cursor-pointer"
          >
            Import Signature
          </button>
          <button
            onClick={handleSign}
            disabled={!isSignatureAvailable}
            className="px-4 py-2 bg-sky-500 text-white rounded-full text-sm hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Sign
          </button>
        </div>
      </div>
    </Modal>
  );
}
