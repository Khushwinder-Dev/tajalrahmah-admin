declare module "react-canvas-wrapper" {
  import { ComponentType } from "react";

  interface CanvasProps {
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    onTouchStart?: (e: React.TouchEvent<HTMLCanvasElement>) => void;
    onTouchMove?: (e: React.TouchEvent<HTMLCanvasElement>) => void;
    onTouchEnd?: (e: React.TouchEvent<HTMLCanvasElement>) => void;
    ref?: React.Ref<HTMLCanvasElement>;
  }

  const Canvas: ComponentType<CanvasProps>;
  export default Canvas;
}
