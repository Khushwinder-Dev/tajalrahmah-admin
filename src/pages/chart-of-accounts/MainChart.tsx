/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Tree from "react-d3-tree";
import type { CustomNodeElementProps } from "react-d3-tree";
import type { TreeNodeData } from "@/types/chart-of-accounts";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

// Converted structure for the tree
interface ConvertedAccount {
  id: string;
  name: string;
  accountNumber: string;
  accountType?: string;
  level: number;
  children?: ConvertedAccount[];
}

// Transform the root data to create linear chains for Level 2 children
function transformChartOfAccountsData(rootData: any): ConvertedAccount {
  const convertedRoot: ConvertedAccount = {
    id: rootData.id,
    name: rootData.name,
    accountNumber: rootData.accountNumber,
    accountType: rootData.accountType,
    level: 0, // Root level
    children: [],
  };

  // Process Level 1 accounts (Assets, Liabilities, etc.)
  if (rootData.level1Accounts && rootData.level1Accounts.length > 0) {
    rootData.level1Accounts.forEach((level1Account: any) => {
      const level1Node: ConvertedAccount = {
        id: level1Account.id,
        name: level1Account.name,
        accountNumber: level1Account.accountNumber,
        accountType: level1Account.accountType,
        level: 1,
        children: [],
      };

      // Process Level 2 accounts (Current Assets, Fixed Assets, etc.)
      if (
        level1Account.level2Accounts &&
        level1Account.level2Accounts.length > 0
      ) {
        level1Account.level2Accounts.forEach((level2Account: any) => {
          const level2Node: ConvertedAccount = {
            id: level2Account.id,
            name: level2Account.name,
            accountNumber: level2Account.accountNumber,
            level: 2,
            children: [],
          };

          // Create linear chain for Level 3 accounts (ignore level4Accounts)
          if (
            level2Account.level3Accounts &&
            level2Account.level3Accounts.length > 0
          ) {
            let previousNode = level2Node;

            level2Account.level3Accounts.forEach(
              (level3Account: any, index: number) => {
                const currentLevel = 3 + index; // Sequential levels: 3, 4, 5, etc.

                const level3Node: ConvertedAccount = {
                  id: level3Account.id,
                  name: level3Account.name,
                  accountNumber: level3Account.accountNumber,
                  level: currentLevel,
                  children: [],
                };

                // Connect to the previous node in the chain
                previousNode.children!.push(level3Node);
                previousNode = level3Node;
              }
            );
          }

          level1Node.children!.push(level2Node);
        });
      }

      convertedRoot.children!.push(level1Node);
    });
  }

  return convertedRoot;
}

// Transform flattened data to react-d3-tree format
function transformToTreeData(flattenedData: ConvertedAccount): TreeNodeData {
  const transformNode = (node: ConvertedAccount): TreeNodeData => {
    const treeNode: TreeNodeData = {
      name: node.name,
      attributes: {
        id: node.id,
        accountNumber: node.accountNumber,
        accountType: node.accountType,
        level: node.level,
      },
    };

    if (node.children && node.children.length > 0) {
      treeNode.children = node.children.map(transformNode);
    }

    return treeNode;
  };

  return transformNode(flattenedData);
}

interface MainChartProps {
  data: any; // ChartOfAccountsRoot
  onAccountSelect?: (accountId: string, level: number) => void;
}

const MainChart: React.FC<MainChartProps> = ({ data, onAccountSelect }) => {
  const [zoomLevel, setZoomLevel] = useState(0.45);
  const [zoomInputValue, setZoomInputValue] = useState(45); // 45% corresponds to 0.6 zoom
  const [translate, setTranslate] = useState({ x: 600, y: 40 });

  const containerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<any>(null);

  // Zoom constants
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 2.0;
  const ZOOM_STEP = 0.2;

  // Transform chart data
  const chartData = useMemo(() => {
    if (data) {
      return transformChartOfAccountsData(data);
    }
    return null;
  }, [data]);

  // Create a default empty tree structure when no data is available
  const defaultTreeData = useMemo(
    () => ({
      name: "No Data Available",
      attributes: {
        id: "no-data",
        accountNumber: "",
        level: 0,
      },
      children: [],
    }),
    []
  );

  // Transform to tree data format
  const treeData = useMemo(() => {
    if (chartData) {
      return transformToTreeData(chartData);
    }
    return defaultTreeData;
  }, [chartData, defaultTreeData]);

  // Update translate position when data changes to center the tree
  useEffect(() => {
    if (chartData) {
      // Center the tree in the available space
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setTranslate({
          x: containerWidth / 2,
          y: 50,
        });
      }
    }
  }, [chartData]);

  // Convert input value (1-100) to zoom level (0.01-1.0)
  const convertInputToZoom = useCallback((inputValue: number) => {
    return Math.max(0.01, Math.min(1.0, inputValue / 100));
  }, []);

  // Convert zoom level to input value
  const convertZoomToInput = useCallback((zoomValue: number) => {
    return Math.round(zoomValue * 100);
  }, []);

  // Add a new state for the temporary input value
  const [tempInputValue, setTempInputValue] = useState<string | number>(60);

  // Update the existing handleZoomInputChange to only update the temporary value
  const handleZoomInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setTempInputValue(value); // Only update the temporary display value
    },
    []
  );

  // Add a new function to apply the zoom change
  const applyZoomChange = useCallback(
    (value: string | number) => {
      const numValue = typeof value === "string" ? parseInt(value, 10) : value;

      if (isNaN(numValue) || value === "") {
        // Reset to current zoom if invalid
        setTempInputValue(zoomInputValue);
        return;
      }

      const inputValue = Math.max(1, Math.min(100, numValue));
      setZoomInputValue(inputValue);
      setTempInputValue(inputValue);
      setZoomLevel(convertInputToZoom(inputValue));
    },
    [convertInputToZoom, zoomInputValue]
  );

  // Add handlers for Enter key and blur
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        applyZoomChange(tempInputValue);
        e.currentTarget.blur(); // Remove focus after Enter
      } else if (e.key === "Escape") {
        // Reset to current value on Escape
        setTempInputValue(zoomInputValue);
        e.currentTarget.blur();
      }
    },
    [applyZoomChange, tempInputValue, zoomInputValue]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      applyZoomChange(tempInputValue);
      console.log("tempInputValue", e.target.value);
    },

    [applyZoomChange, tempInputValue]
  );

  // Update the useEffect to sync tempInputValue when zoom changes programmatically
  useEffect(() => {
    const inputValue = convertZoomToInput(zoomLevel);
    setZoomInputValue(inputValue);
    setTempInputValue(inputValue);
  }, [zoomLevel, convertZoomToInput]);

  // Update input value when zoom level changes programmatically
  useEffect(() => {
    setZoomInputValue(convertZoomToInput(zoomLevel));
  }, [zoomLevel, convertZoomToInput]);

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    setZoomLevel(newZoom);
  }, [zoomLevel]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    setZoomLevel(newZoom);
  }, [zoomLevel]);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(0.6);
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setTranslate({ x: containerWidth / 2, y: 120 });
    }
  }, []);

  // Custom path function
  const customPathFunc = (linkDatum: any) => {
    const { source, target } = linkDatum;
    const sourceLevel = source.data.attributes?.level;
    const targetLevel = target.data.attributes?.level;

    let startX = source.x;
    let startY = source.y;
    const endX = target.x;
    let endY = target.y;

    // Calculate start points based on source level
    if (sourceLevel === 0) {
      // Root level connections - ALL start from bottom center
      startX = source.x;
      startY = source.y + 45;
    } else if (sourceLevel === 1) {
      // Level 1 connections - ALL start from bottom center
      startX = source.x;
      startY = source.y + 45;
    } else if (sourceLevel === 2) {
      // Level 2 (diamond) connections - ALL start from bottom center
      const diamondSize = 90;
      startX = source.x;
      startY = source.y + diamondSize; // Bottom of diamond
    } else {
      // Level 3+ connections - from bottom of rectangle (for linear chain)
      startY = source.y + 45;
    }

    // Calculate end points based on target level
    if (targetLevel === 2) {
      const diamondSize = 90;
      endY = target.y - diamondSize;
    } else {
      endY = target.y - 45;
    }

    // Create paths
    if (sourceLevel === 0) {
      // Root level logic - diverge to Level 1 children
      const children = source.children || [];
      const childCount = children.length;
      const childIndex = children.findIndex(
        (child: any) => child.data.attributes?.id === target.data.attributes?.id
      );

      const midY = startY + 60;

      if (childCount === 1) {
        return `M${startX},${startY} L${endX},${endY}`;
      } else if (childCount === 2) {
        if (childIndex === 0) {
          const intermediateX = startX - 120;
          return `M${startX},${startY} L${startX},${midY} L${intermediateX},${midY} L${endX},${midY} L${endX},${endY}`;
        } else {
          const intermediateX = startX + 120;
          return `M${startX},${startY} L${startX},${midY} L${intermediateX},${midY} L${endX},${midY} L${endX},${endY}`;
        }
      } else {
        let intermediateX;
        if (childIndex === 0) intermediateX = startX - 200;
        else if (childIndex === 1) intermediateX = startX - 100;
        else if (childIndex === 2) intermediateX = startX;
        else if (childIndex === 3) intermediateX = startX + 100;
        else intermediateX = startX + 200;

        return `M${startX},${startY} L${startX},${midY} L${intermediateX},${midY} L${endX},${midY} L${endX},${endY}`;
      }
    } else if (sourceLevel === 1) {
      // Level 1 logic - diverge to Level 2 children
      const children = source.children || [];
      const childCount = children.length;
      const childIndex = children.findIndex(
        (child: any) => child.data.attributes?.id === target.data.attributes?.id
      );

      if (childCount === 1) {
        return `M${startX},${startY} L${endX},${endY}`;
      } else {
        const midY = startY + 60;
        let intermediateX;

        if (childCount === 2) {
          if (childIndex === 0) intermediateX = startX - 100;
          else intermediateX = startX + 100;
        } else if (childCount === 3) {
          if (childIndex === 0) intermediateX = startX - 120;
          else if (childIndex === 1) intermediateX = startX;
          else intermediateX = startX + 120;
        } else {
          if (childIndex === 0) intermediateX = startX - 150;
          else if (childIndex === 1) intermediateX = startX - 50;
          else if (childIndex === 2) intermediateX = startX + 50;
          else intermediateX = startX + 150;
        }

        return `M${startX},${startY} L${startX},${midY} L${intermediateX},${midY} L${endX},${midY} L${endX},${endY}`;
      }
    } else {
      // Level 2+ - straight line down for linear chain
      return `M${startX},${startY} L${endX},${endY}`;
    }
  };

  // Function to get node dimensions based on level
  const getNodeDimensions = (nodeDatum: any) => {
    const level = nodeDatum.attributes?.level as number;

    if (level === 2) {
      // Diamond shapes (Level 2)
      return {
        diamondSize: 90,
        fontSize: 16,
      };
    } else {
      // Rectangle shapes (Level 0, 1, 3+)
      const fontSize = level === 0 ? 20 : 18;
      const width = level === 0 ? 300 : 250;
      const height = level === 0 ? 100 : 90;

      return {
        width: width,
        height: height,
        halfWidth: width / 2,
        halfHeight: height / 2,
        fontSize: fontSize,
      };
    }
  };

  // Custom node rendering function
  const renderCustomNode = ({
    nodeDatum,
    toggleNode,
  }: CustomNodeElementProps) => {
    const level = nodeDatum.attributes?.level as number;

    // Handle the "No Data" case
    if (nodeDatum.attributes?.id === "no-data") {
      return (
        <g>
          <rect
            x={-140}
            y={-45}
            width={280}
            height={90}
            rx={20}
            ry={20}
            fill="#f3f4f6"
            stroke="#d1d5db"
            strokeWidth={2}
          />
          <text
            fill="#6b7280"
            strokeWidth="0"
            x={0}
            y={0}
            style={{
              fontSize: "18px",
              fontWeight: "normal",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
          >
            {nodeDatum.name}
          </text>
        </g>
      );
    }

    const dimensions = getNodeDimensions(nodeDatum);

    // Handle node click
    const handleNodeClick = (e: React.MouseEvent) => {
      e.stopPropagation();

      if (onAccountSelect && level === 1) {
        // Only Level 1 accounts can be selected for detailed view
        onAccountSelect(nodeDatum.attributes?.id as string, level);
      } else {
        toggleNode();
      }
    };

    // Level 2 nodes - Diamond shape
    if (level === 2) {
      const { diamondSize = 0, fontSize } = dimensions;

      return (
        <g>
          {/* Shadow effect for diamond */}
          <polygon
            points={`${4},${-diamondSize + 4} ${diamondSize + 4},${4} ${4},${
              diamondSize + 4
            } ${-diamondSize + 4},${4}`}
            fill="rgba(40, 172, 226, 0.2)"
            stroke="none"
          />

          {/* Diamond shape */}
          <polygon
            points={`0,${-diamondSize} ${diamondSize},0 0,${diamondSize} ${-diamondSize},0`}
            fill="#28ace2"
            stroke="#1e90da"
            strokeWidth={2}
            onClick={handleNodeClick}
            style={{
              cursor: "pointer",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
            }}
          />

          {/* Text content for diamond */}
          <foreignObject
            x={-diamondSize * 0.7}
            y={-25}
            width={diamondSize * 1.4}
            height={50}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                color: "white",
                fontSize: `${fontSize}px`,
                fontWeight: "600",
                lineHeight: "1.2",
                pointerEvents: "none",
              }}
            >
              <div>{nodeDatum.name}</div>
              {nodeDatum.attributes?.accountNumber && (
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.8,
                    marginTop: "2px",
                  }}
                >
                  #{nodeDatum.attributes.accountNumber}
                </div>
              )}
            </div>
          </foreignObject>

          {/* Level indicator for diamond */}
          <text
            fill="rgba(255, 255, 255, 0.7)"
            strokeWidth="0"
            x={diamondSize - 15}
            y={-diamondSize + 15}
            style={{
              fontSize: "10px",
              fontWeight: "bold",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
          >
            L{level}
          </text>

          {/* Connection point for diamonds with children */}
          {nodeDatum.children && nodeDatum.children.length > 0 && (
            <circle
              cx={0}
              cy={diamondSize}
              r={3}
              fill="white"
              stroke="#1e90da"
              strokeWidth={1}
            />
          )}
        </g>
      );
    }

    // Level 0, 1, and 3+ nodes - Rectangle shape
    const {
      width,
      height,
      halfWidth = 0,
      halfHeight = 0,
      fontSize,
    } = dimensions;

    // Different colors for different levels
    const getNodeColor = () => {
      if (level === 0) return { fill: "#28ace2", stroke: "#111827" }; // Darker for root
      if (level === 1) return { fill: "#28ace2", stroke: "#1e90da" }; // Blue for Level 1
      return { fill: "#28ace2", stroke: "#1e90da" }; // Blue for Level 3+
    };

    const { fill, stroke } = getNodeColor();

    return (
      <g>
        {/* Shadow effect */}
        <rect
          x={-halfWidth + 4}
          y={-halfHeight + 4}
          width={width}
          height={height}
          rx={20}
          ry={20}
          fill="rgba(40, 172, 226, 0.2)"
          stroke="none"
        />

        {/* Main rectangle */}
        <rect
          x={-halfWidth}
          y={-halfHeight}
          width={width}
          height={height}
          rx={20}
          ry={20}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          onClick={handleNodeClick}
          style={{
            cursor: level === 1 ? "pointer" : "default",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
          }}
        />

        {/* Connection indicators */}
        {((level === 0 &&
          nodeDatum.children &&
          nodeDatum.children.length > 0) ||
          (level === 1 &&
            nodeDatum.children &&
            nodeDatum.children.length > 0) ||
          (level >= 3 &&
            nodeDatum.children &&
            nodeDatum.children.length > 0)) && (
          <circle
            cx={0}
            cy={halfHeight}
            r={3}
            fill="white"
            stroke={stroke}
            strokeWidth={1}
          />
        )}

        {/* Text content */}
        <text
          fill="white"
          strokeWidth="0"
          x={0}
          y={-8}
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: level === 0 ? "bold" : "600",
            textAnchor: "middle",
            dominantBaseline: "middle",
          }}
          onClick={handleNodeClick}
        >
          {level === 0 ? nodeDatum.name.toUpperCase() : nodeDatum.name}
        </text>

        {/* Account number */}
        {nodeDatum.attributes?.accountNumber && (
          <text
            fill="rgba(255, 255, 255, 0.8)"
            strokeWidth="0"
            x={0}
            y={12}
            style={{
              fontSize: "12px",
              fontWeight: "normal",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
            onClick={handleNodeClick}
          >
            #{nodeDatum.attributes.accountNumber}
          </text>
        )}

        {/* Level indicator for non-root nodes */}
        {level > 0 && (
          <text
            fill="rgba(255, 255, 255, 0.7)"
            strokeWidth="0"
            x={halfWidth - 12}
            y={-halfHeight + 12}
            style={{
              fontSize: "10px",
              fontWeight: "bold",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
          >
            L{level}
          </text>
        )}

        {/* Click indicator for Level 1 nodes */}
        {level === 1 && (
          <text
            fill="rgba(255, 255, 255, 0.9)"
            strokeWidth="0"
            x={0}
            y={halfHeight - 8}
            style={{
              fontSize: "10px",
              fontWeight: "normal",
              textAnchor: "middle",
              dominantBaseline: "middle",
            }}
          >
            Click to view details
          </text>
        )}
      </g>
    );
  };

  // Determine if we have valid chart data
  const hasValidData = chartData !== null;

  return (
    <div className="flex flex-col w-full">
      {/* Header with Zoom Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          borderRadius: "20px 20px 0 0",
        }}
      >
        {/* Left side - Chart title */}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Chart of Accounts Overview
          </h3>
        </div>

        {/* Right side - Zoom Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            onClick={handleZoomIn}
            disabled={!hasValidData || zoomLevel >= MAX_ZOOM}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              backgroundColor: "#ffffff",
              border: `1px solid ${
                !hasValidData || zoomLevel >= MAX_ZOOM ? "#d1d5db" : "#6b7280"
              }`,
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor:
                !hasValidData || zoomLevel >= MAX_ZOOM
                  ? "not-allowed"
                  : "pointer",
              opacity: !hasValidData || zoomLevel >= MAX_ZOOM ? 0.5 : 1,
              transition: "all 0.15s",
            }}
            title="Zoom In"
          >
            <ZoomIn
              size={16}
              style={{
                color:
                  !hasValidData || zoomLevel >= MAX_ZOOM
                    ? "#9ca3af"
                    : "#374151",
              }}
            />
          </button>

          <button
            onClick={handleZoomOut}
            disabled={!hasValidData || zoomLevel <= MIN_ZOOM}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              backgroundColor: "#ffffff",
              border: `1px solid ${
                !hasValidData || zoomLevel <= MIN_ZOOM ? "#d1d5db" : "#6b7280"
              }`,
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor:
                !hasValidData || zoomLevel <= MIN_ZOOM
                  ? "not-allowed"
                  : "pointer",
              opacity: !hasValidData || zoomLevel <= MIN_ZOOM ? 0.5 : 1,
              transition: "all 0.15s",
            }}
            title="Zoom Out"
          >
            <ZoomOut
              size={16}
              style={{
                color:
                  !hasValidData || zoomLevel <= MIN_ZOOM
                    ? "#9ca3af"
                    : "#374151",
              }}
            />
          </button>

          <button
            onClick={handleResetZoom}
            disabled={!hasValidData}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              backgroundColor: "#ffffff",
              border: `1px solid ${!hasValidData ? "#d1d5db" : "#6b7280"}`,
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: !hasValidData ? "not-allowed" : "pointer",
              opacity: !hasValidData ? 0.5 : 1,
              transition: "all 0.15s",
            }}
            title="Reset Zoom"
          >
            <RotateCcw
              size={14}
              style={{ color: !hasValidData ? "#9ca3af" : "#374151" }}
            />
          </button>

          {/* Zoom Level Indicator */}
          <input
            type="number"
            min="1"
            max="100"
            value={tempInputValue} // Use tempInputValue instead of zoomInputValue
            onChange={handleZoomInputChange}
            onKeyDown={handleKeyDown} // Add keydown handler
            onBlur={handleBlur} // Add blur handler
            style={{
              width: "50px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              padding: "6px 4px",
              fontSize: "12px",
              fontWeight: "600",
              color: hasValidData ? "#374151" : "#9ca3af",
              textAlign: "center",
              outline: "none",
            }}
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>

      {/* Chart Container */}
      <div
        style={{
          width: "100%",
          height: "700px",
          backgroundColor: "#ffffff",
          borderRadius: "0 0 20px 20px",
          overflow: "hidden",
        }}
      >
        {!hasValidData ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <div className="text-center">
              <div className="text-gray-500 text-lg mb-2">
                No Chart Data Available
              </div>
              <div className="text-gray-400 text-sm">
                Please provide chart of accounts data
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* SVG definitions for arrow markers */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="6"
                  refX="7"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon
                    points="0,0 0,6 8,3"
                    fill="#28ace2"
                    stroke="#28ace2"
                    strokeWidth="1"
                  />
                </marker>
              </defs>
            </svg>

            <Tree
              ref={treeRef}
              data={[treeData]}
              renderCustomNodeElement={renderCustomNode}
              orientation="vertical"
              translate={translate}
              zoom={zoomLevel}
              scaleExtent={{ min: MIN_ZOOM, max: MAX_ZOOM }}
              separation={{ siblings: 1.2, nonSiblings: 1.2 }}
              nodeSize={{ x: 250, y: 200 }}
              collapsible={true}
              initialDepth={8} // Show more levels by default for the chains
              pathFunc={customPathFunc}
              pathClassFunc={() => "custom-link"}
              enableLegacyTransitions={false}
              onUpdate={({ translate: newTranslate, zoom: newZoom }) => {
                setTranslate(newTranslate);
                setZoomLevel(newZoom);
              }}
            />
          </div>
        )}

        {/* CSS for connecting lines */}
        <style>{`
                .custom-link {
                  stroke: #28ace2;
                  stroke-width: 3;
                  fill: none;
                  marker-end: url(#arrowhead);
                  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
                }
                
                .rd3t-svg {
                  overflow: visible;
                  z-index: 1;
                }
                
                .rd3t-node {
                  z-index: 10;
                }
                
                .rd3t-link {
                  z-index: 1;
                }
              `}</style>
      </div>
    </div>
  );
};

export default MainChart;
