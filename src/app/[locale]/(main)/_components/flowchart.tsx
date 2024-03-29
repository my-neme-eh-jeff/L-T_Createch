"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  updateEdge,
  Position,
  MarkerType,
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
// import { toPng } from "html-to-image";

// Nodes for materials and processes
import "reactflow/dist/style.css";
import ResizableNodeSelected from "./ResizableNodeSelected";
import Sidebar from "./sidebar";

const CustomNodeComponent = ({ data }: { data: any }) => (
  <div
    style={{
      background: "#004c6d",
      color: "white",
      padding: "10px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "70px",
      height: "70px",
      border: "3px solid #0077b6",
      fontSize: "12px",
    }}
  >
    {data.label}
  </div>
);
const nodeTypes = {
  custom: CustomNodeComponent,
  ResizableNodeSelected: ResizableNodeSelected,
};
function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}
const imageWidth = 1024;
const imageHeight = 768;

const FlowchartPage = () => {
//   const { getNodes } = useReactFlow();
//   const onClick = () => {
//     const nodesBounds = getRectOfNodes(getNodes());
//     const transform = getTransformForBounds(
//       nodesBounds,
//       imageWidth,
//       imageHeight,
//       0.5,
//       2,
//     );
//     toPng(document.querySelector(".react-flow__viewport"), {
//       backgroundColor: "#1a365d",
//       width: imageWidth,
//       height: imageHeight,
//       style: {
//         width: imageWidth,
//         height: imageHeight,
//         transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
//       },
//     }).then(downloadImage);
//   };
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      sourcePosition: Position.Right,
      type: "abc",
      data: { label: "Start (Gather Resources)" },
      position: { x: -100, y: 150 },
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
    },
    {
      id: "2",
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      type: "ResizableNodeSelected",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "Procure Steel Beams" },
      position: { x: 100, y: 100 },
    },
    {
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      id: "3",
      type: "ResizableNodeSelected",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "Procure Concrete Pillars" },
      position: { x: 100, y: 200 },
    },
    {
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      id: "4",
      type: "ResizableNodeSelected",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "Fabricate Steel Structure" },
      position: { x: 300, y: 50 },
    },
    {
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      id: "5",
      type: "ResizableNodeSelected",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "Construct Concrete Foundations" },
      position: { x: 300, y: 250 },
    },
    {
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      id: "6",
      type: "ResizableNodeSelected",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "Assemble Bridge Framework" },
      position: { x: 500, y: 150 },
    },
    {
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      id: "7",
      type: "abc",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "End (Project Completion)" },
      position: { x: 750, y: 150 },
    },
    {
      sourcePosition: Position.Bottom,
      targetPosition: Position.Bottom,
      id: "8",
      type: "ResizableNodeSelected",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "Reuse Steel (Recycling)" },
      position: { x: 500, y: 0 },
    },
    {
      sourcePosition: Position.Bottom,
      targetPosition: Position.Bottom,
      id: "9",
      type: "ResizableNodeSelected",
      style: {
        background: "#fff",
        border: "1px solid black",
        color: "#f6ab6c",
        borderRadius: 15,
        fontSize: 12,
      },
      data: { label: "Reuse Concrete (Recycling)" },
      position: { x: 500, y: 300 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e1-3",
      source: "1",
      target: "3",
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e3-5",
      source: "3",
      target: "5",
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e4-6",
      source: "4",
      target: "6",
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e5-6",
      source: "5",
      target: "6",
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e6-7",
      source: "6",
      target: "7",
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    // Edges for recycling and reusability
    {
      id: "e6-8",
      source: "8",
      target: "6",
      animated: true,
      style: { stroke: "#66AAF9" },
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e8-2",
      source: "2",
      target: "8",
      animated: true,
      style: { stroke: "#66AAF9" },
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e6-9",
      source: "9",
      target: "6",
      animated: true,
      style: { stroke: "#66AAF9" },
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
    {
      id: "e9-3",
      source: "3",
      target: "9",
      animated: true,
      style: { stroke: "#66AAF9" },
      markerEnd: {
        type: MarkerType.Arrow,
      },
    },
  ]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  let id = 0;
  const getId = () => `dndnode_${id++}`;
  const edgeUpdateSuccessful = useRef(true);
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);
  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <div className="h-[93vh]">
      <ReactFlowProvider>
        <ReactFlow
          defaultNodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onConnect={onConnect}
          //   onDrop={onDrop}
          //   onDragOver={onDragOver}
          //   onInit={setReactFlowInstance}
          fitView
          nodeTypes={nodeTypes}
          className="download-image"
        >
          <MiniMap
            style={{ height: 120 }}
            nodeColor={(node) => {
              if (node.type === "abc") return "red";
              if (node.type === "custom") return "#004c6d";
              return "#eee";
            }}
          />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        {/* <Panel position="top-right">
          <button className="download-btn" onClick={onClick}>
            Download Image
          </button>
        </Panel> */}
        {/* <Sidebar /> */}
      </ReactFlowProvider>
    </div>
  );
};

export default FlowchartPage;
