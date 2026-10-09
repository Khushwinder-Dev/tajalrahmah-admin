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
import type { AccountData, TreeNodeData } from "@/types/chart-of-accounts";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

// Converted structure for the tree
interface ConvertedAccount {
  id: string;
  name: string;
  accountNumber: string;
  accountType?: string;
  balance?: number;
  description?: string;
  level: number;
  children?: ConvertedAccount[];
}

function flattenLevel3ToIncrementalLevels(originalData: any): ConvertedAccount {
  const convertedAccount: ConvertedAccount = {
    id: originalData.id,
    name: originalData.name,
    accountNumber: originalData.accountNumber,
    accountType: originalData.accountType,
    level: 1,
    children: [],
  };

  // Process Level 2 accounts - they remain as Level 2
  if (originalData.level2Accounts && originalData.level2Accounts.length > 0) {
    originalData.level2Accounts.forEach((level2Account: any) => {
      const level2Node: ConvertedAccount = {
        id: level2Account.id,
        name: level2Account.name,
        accountNumber: level2Account.accountNumber,
        level: 2,
        children: [],
      };

      // Process Level 3 accounts - each becomes a separate level (3, 4, 5, etc.)
      if (
        level2Account.level3Accounts &&
        level2Account.level3Accounts.length > 0
      ) {
        // Create a chain where each Level 3 account becomes Level 3, 4, 5, etc.
        let previousNode = level2Node;

        level2Account.level3Accounts.forEach(
          (level3Account: any, index: number) => {
            const currentLevel = 3 + index;

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

      convertedAccount.children!.push(level2Node);
    });
  }

  return convertedAccount;
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
        balance: node.balance,
        description: node.description,
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

interface SelectedAccount {
  level: 1 | 2 | 3;
  accountId: string;
  level1Id: string;
  level2Id?: string;
  level3Id?: string;
}

interface HierarchicalChartProps {
  data: AccountData[];
  selectedLevel1: string;
  setSelectedAccount: (account: SelectedAccount | null) => void;
}

const HierarchicalChart: React.FC<HierarchicalChartProps> = ({
  data: initialData,
  selectedLevel1,
  setSelectedAccount,
}) => {
  const [zoomLevel, setZoomLevel] = useState(0.5);
  const [translate, setTranslate] = useState({ x: 600, y: 60 });

  const containerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<any>(null);

  // Zoom constants
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 2.0;
  const ZOOM_STEP = 0.2;

  // Filter chart data based on selectedLevel1 and flatten it
  const chartData = useMemo(() => {
    console.log("selectedLevel1 in chart ", selectedLevel1);
    if (selectedLevel1 && initialData && initialData.length > 0) {
      const selectedAccount = initialData.find(
        (account) => account.id === selectedLevel1
      );
      if (selectedAccount) {
        const flattenedData = flattenLevel3ToIncrementalLevels(selectedAccount);
        return flattenedData;
      }
    }
    return null;
  }, [initialData, selectedLevel1]);

  // Create a default empty tree structure when no data is available
  const defaultTreeData = useMemo(
    () => ({
      name: "No Data Available",
      attributes: {
        id: "no-data",
        accountNumber: "",
        level: 1,
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
          y: 120,
        });
      }
    }
  }, [chartData]);

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    setZoomLevel(newZoom);
    console.log("Zoom In clicked, new zoom:", newZoom);
  }, [zoomLevel]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    setZoomLevel(newZoom);
    console.log("Zoom Out clicked, new zoom:", newZoom);
  }, [zoomLevel]);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(0.8);
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setTranslate({ x: containerWidth / 2, y: 120 });
    }
    console.log("Reset zoom clicked");
  }, []);

  // Function to calculate text width (approximate)
  // const getTextWidth = (text: string, fontSize: number): number => {
  //   const charWidth = fontSize * 0.6;
  //   return text.length * charWidth;
  // };

  // Custom path function with special handling for root node connections
  // OLD--------------
  // const customPathFunc = (linkDatum: any, orientation: string) => {
  //   const { source, target } = linkDatum;
  //   const sourceLevel = source.data.attributes?.level;
  //   const targetLevel = target.data.attributes?.level;

  //   let startX = source.x;
  //   let startY = source.y;
  //   const endX = target.x;
  //   let endY = target.y;

  //   // Special handling for Level 1 (root) node connections
  //   if (sourceLevel === 1) {
  //     const textWidth = getTextWidth(source.data.name, 18);
  //     const minWidth = 250;
  //     const calculatedWidth = Math.max(minWidth, textWidth + 48);
  //     const halfWidth = calculatedWidth / 2;

  //     // Get all children to determine connection points
  //     const children = source.children || [];
  //     const childCount = children.length;

  //     if (childCount > 0) {
  //       // Find the index of current target among children
  //       const childIndex = children.findIndex(
  //         (child: any) =>
  //           child.data.attributes?.id === target.data.attributes?.id
  //       );

  //       if (childCount === 1) {
  //         // Single child: connect from bottom center
  //         startX = source.x;
  //         startY = source.y + 45;
  //       } else if (childCount === 2) {
  //         // Two children: left border and right border
  //         if (childIndex === 0) {
  //           // First child: left border
  //           startX = source.x - halfWidth;
  //           startY = source.y;
  //         } else {
  //           // Second child: right border
  //           startX = source.x + halfWidth;
  //           startY = source.y;
  //         }
  //       } else {
  //         // Three or more children: left, right, and rest from bottom
  //         if (childIndex === 0) {
  //           // First child: left border
  //           startX = source.x - halfWidth;
  //           startY = source.y;
  //         } else if (childIndex === 1) {
  //           // Second child: right border
  //           startX = source.x + halfWidth;
  //           startY = source.y;
  //         } else {
  //           // Rest from bottom border
  //           startX = source.x;
  //           startY = source.y + 45;
  //         }
  //       }
  //     }
  //   } else if (sourceLevel === 2) {
  //     // Level 2 (diamond) connections
  //     const textWidth = getTextWidth(source.data.name, 16);
  //     const diamondSize = Math.max(80, textWidth / 2 + 40);
  //     startY = source.y + diamondSize; // Bottom of diamond
  //   } else {
  //     // Other levels: from bottom of rectangle
  //     startY = source.y + 45;
  //   }

  //   // Calculate target connection point
  //   if (targetLevel === 2) {
  //     const textWidth = getTextWidth(target.data.name, 16);
  //     const diamondSize = Math.max(80, textWidth / 2 + 40);
  //     endY = target.y - diamondSize; // Top of diamond
  //   } else {
  //     endY = target.y - 45; // Top of rectangle
  //   }

  //   // Create straight line with arrow marker
  //   return `M${startX},${startY}L${endX},${endY}`;
  // };

  // NEW
  // const customPathFunc = (linkDatum: any) => {
  //   const { source, target } = linkDatum;
  //   const sourceLevel = source.data.attributes?.level;
  //   const targetLevel = target.data.attributes?.level;

  //   let startX = source.x;
  //   let startY = source.y;
  //   const endX = target.x;
  //   let endY = target.y;

  //   // Special handling for Level 1 (root) node connections
  //   if (sourceLevel === 1) {
  //     const textWidth = getTextWidth(source.data.name, 18);
  //     const minWidth = 250;
  //     const calculatedWidth = Math.max(minWidth, textWidth + 48);
  //     const halfWidth = calculatedWidth / 2;

  //     // Get all children to determine connection points
  //     const children = source.children || [];
  //     const childCount = children.length;

  //     if (childCount > 0) {
  //       // Find the index of current target among children
  //       const childIndex = children.findIndex(
  //         (child: any) =>
  //           child.data.attributes?.id === target.data.attributes?.id
  //       );

  //       if (childCount === 1) {
  //         // Single child: connect from bottom center
  //         startX = source.x;
  //         startY = source.y + 45;
  //       } else if (childCount === 2) {
  //         // Two children: left border and right border
  //         if (childIndex === 0) {
  //           // First child: left border
  //           startX = source.x - halfWidth;
  //           startY = source.y;
  //         } else {
  //           // Second child: right border
  //           startX = source.x + halfWidth;
  //           startY = source.y;
  //         }
  //       } else {
  //         // Three or more children: left, right, and rest from bottom
  //         if (childIndex === 0) {
  //           // First child: left border
  //           startX = source.x - halfWidth;
  //           startY = source.y;
  //         } else if (childIndex === 1) {
  //           // Second child: right border
  //           startX = source.x + halfWidth;
  //           startY = source.y;
  //         } else {
  //           // Rest from bottom border
  //           startX = source.x;
  //           startY = source.y + 45;
  //         }
  //       }
  //     }
  //   } else if (sourceLevel === 2) {
  //     // Level 2 (diamond) connections
  //     const textWidth = getTextWidth(source.data.name, 16);
  //     const diamondSize = Math.max(80, textWidth / 2 + 40);
  //     startY = source.y + diamondSize; // Bottom of diamond
  //   } else {
  //     // Other levels: from bottom of rectangle
  //     startY = source.y + 45;
  //   }

  //   // Calculate target connection point
  //   if (targetLevel === 2) {
  //     const textWidth = getTextWidth(target.data.name, 16);
  //     const diamondSize = Math.max(80, textWidth / 2 + 40);
  //     endY = target.y - diamondSize; // Top of diamond
  //   } else {
  //     endY = target.y - 45; // Top of rectangle
  //   }

  //   // Create simple L-shaped paths like Image 2 (horizontal then vertical)

  //   if (sourceLevel === 1) {
  //     // For Level 1 connections
  //     if (startX === source.x && startY === source.y + 45) {
  //       // Bottom connection - straight down, then horizontal to target
  //       const midY = (startY + endY) / 2;
  //       return `M${startX},${startY} L${startX},${midY} L${endX},${midY} L${endX},${endY}`;
  //     } else {
  //       // Side connections - straight horizontal, then straight down to target
  //       // This matches Image 2: horizontal line, then single turn down
  //       return `M${startX},${startY} L${endX},${startY} L${endX},${endY}`;
  //     }
  //   } else {
  //     // For all other levels - simple L-shape: horizontal then vertical
  //     if (Math.abs(startX - endX) < 5) {
  //       // Vertically aligned - straight line
  //       return `M${startX},${startY} L${endX},${endY}`;
  //     } else {
  //       // L-shaped path like Image 2: horizontal first, then vertical
  //       return `M${startX},${startY} L${endX},${startY} L${endX},${endY}`;
  //     }
  //   }
  // };
  // NEW------
  const customPathFunc = (linkDatum: any) => {
    const { source, target } = linkDatum;
    const sourceLevel = source.data.attributes?.level;
    const targetLevel = target.data.attributes?.level;

    let startX = source.x;
    let startY = source.y;
    const endX = target.x;
    let endY = target.y;

    // Calculate start points based on source level
    if (sourceLevel === 1) {
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
    if (sourceLevel === 1) {
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
      // All diamond shapes: Fixed size regardless of text content
      const diamondSize = 90; // Fixed diamond size
      const fontSize = 16;

      return {
        width: diamondSize * 2,
        height: diamondSize * 2,
        diamondSize: diamondSize,
        fontSize: fontSize,
      };
    } else {
      // All rectangle shapes: Fixed size regardless of text content or level
      const fontSize = level === 1 ? 18 : 16;
      const width = 250; // Fixed width for all rectangles
      const height = 90; // Fixed height for all rectangles

      return {
        width: width,
        height: height,
        halfWidth: width / 2,
        halfHeight: height / 2,
        fontSize: fontSize,
      };
    }
  };

  // Custom node rendering function with flowchart design
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

    // Handle add button click
    const handleAddClick = (e: React.MouseEvent) => {
      e.stopPropagation();

      if (level >= 3) {
        setSelectedAccount({
          level: 3,
          accountId: nodeDatum.attributes?.id as string,
          level1Id: selectedLevel1,
          level2Id: nodeDatum.attributes?.level2Id as string,
          level3Id: nodeDatum.attributes?.id as string,
        });
        return;
      }
    };

    // Handle node click
    const handleNodeClick = (e: React.MouseEvent) => {
      if (level >= 3) {
        handleAddClick(e);
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
        </g>
      );
    }

    // Level 1 and Level 3+ nodes - Rectangle shape
    const {
      width,
      height,
      halfWidth = 0,
      halfHeight = 0,
      fontSize,
    } = dimensions;

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
          fill="#28ace2"
          stroke="#1e90da"
          strokeWidth={2}
          onClick={handleNodeClick}
          style={{
            cursor: "pointer",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
          }}
        />

        {/* Connection indicators for Level 1 nodes with multiple children */}
        {level === 1 && nodeDatum.children && nodeDatum.children.length > 1 && (
          <>
            {/* Left connection point - always shown for 2+ children */}
            <circle
              cx={-halfWidth}
              cy={0}
              r={3}
              fill="white"
              stroke="#1e90da"
              strokeWidth={1}
            />
            {/* Right connection point - for 2+ children */}
            <circle
              cx={halfWidth}
              cy={0}
              r={3}
              fill="white"
              stroke="#1e90da"
              strokeWidth={1}
            />
            {/* Bottom connection point - for 3+ children */}
            {nodeDatum.children.length > 2 && (
              <circle
                cx={0}
                cy={halfHeight}
                r={3}
                fill="white"
                stroke="#1e90da"
                strokeWidth={1}
              />
            )}
          </>
        )}

        {/* Text content */}
        <text
          fill="white"
          strokeWidth="0"
          x={0}
          y={-8}
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: level === 1 ? "bold" : "600",
            textAnchor: "middle",
            dominantBaseline: "middle",
          }}
          onClick={handleNodeClick}
        >
          {level === 1 ? nodeDatum.name.toUpperCase() : nodeDatum.name}
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
        {level > 1 && (
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
      </g>
    );
  };

  // Determine if we have valid chart data
  const hasValidData = chartData && selectedLevel1;

  return (
    <div className="flex flex-col w-full">
      {/* Header with Zoom Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2px 16px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          borderRadius: "20px 20px 0 0",
        }}
      >
        {/* Left side - Chart title or selected account info */}
        <div style={{ flex: 1 }}>
          {hasValidData ? (
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                {chartData?.name} Chart
              </h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                Account Number: {chartData?.accountNumber || "N/A"}
              </p>
            </div>
          ) : (
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#9ca3af",
                }}
              >
                Chart of Accounts
              </h3>
              <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                Select an account to view
              </p>
            </div>
          )}
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
            onMouseEnter={(e) => {
              if (hasValidData && zoomLevel < MAX_ZOOM) {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.borderColor =
                !hasValidData || zoomLevel >= MAX_ZOOM ? "#d1d5db" : "#6b7280";
              e.currentTarget.style.transform = "scale(1)";
            }}
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
            onMouseEnter={(e) => {
              if (hasValidData && zoomLevel > MIN_ZOOM) {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.borderColor =
                !hasValidData || zoomLevel <= MIN_ZOOM ? "#d1d5db" : "#6b7280";
              e.currentTarget.style.transform = "scale(1)";
            }}
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
            onMouseEnter={(e) => {
              if (hasValidData) {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.borderColor = !hasValidData
                ? "#d1d5db"
                : "#6b7280";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <RotateCcw
              size={14}
              style={{ color: !hasValidData ? "#9ca3af" : "#374151" }}
            />
          </button>

          {/* Zoom Level Indicator */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
              padding: "6px 8px",
              fontSize: "12px",
              fontWeight: "600",
              color: hasValidData ? "#374151" : "#9ca3af",
              textAlign: "center",
              minWidth: "50px",
            }}
          >
            {hasValidData ? `${Math.round(zoomLevel * 100)}%` : "--"}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div
        className="dark:bg-gray-800"
        style={{
          width: "100%",
          height: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "0 0 20px 20px",
          overflow: "hidden",
          maxWidth: "1200px",
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
                No Account Selected
              </div>
              <div className="text-gray-400 text-sm">
                Please select a Level 1 account to view its chart
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
                    fill="#a4a9b3"
                    stroke="#a4a9b3"
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
              separation={{ siblings: 1.8, nonSiblings: 2.2 }}
              nodeSize={{ x: 280, y: 180 }}
              collapsible={true}
              initialDepth={10}
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

        {/* Updated CSS for connecting lines */}
        {/* Updated CSS for connecting lines */}
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

export default HierarchicalChart;
