"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  Node as FNode,
  Edge as FEdge,
  NodeChange,
  EdgeChange,
  useReactFlow,
  Edge,
  Connection,
  addEdge,
} from "@xyflow/react";
import { v4 } from "uuid";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEditor } from "@/providers/editor-provider";
import { toast } from "sonner";
import CardSingle from "./card-single";
import NodeSelector from "./node-selector";
import { CardTypes } from "@/lib/constant";
import { EditorCanvasTypes } from "@/lib/types";

type Props = {};

const initialNodes: FNode[] = [];

const initialEdges: FEdge[] = [];

function EditorPage(props: Props) {
  const { dispatch, state } = useEditor();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds: FNode[]) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds: FEdge[]) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      console.log(event);

      // const reactFlowBounds = event.target.getBoundingClientRect();
      const type: EditorCanvasTypes = event.dataTransfer.getData(
        "application/reactflow"
      );
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const triggerAlreadyExists = state.editor.elements.find(
        (node) => node.type === "trigger"
      );

      if (type === "trigger" && triggerAlreadyExists) {
        toast("Only one trigger can be added to automations at the moment");
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: any = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: CardTypes[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, state]
  );

  const nodeTypes = useMemo(
    () => ({
      action: CardSingle,
      trigger: CardSingle,
      condition: CardSingle,
    }),
    []
  );

  return (
    <ReactFlowProvider>
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center">
              <div
                style={{ width: "100%", height: "100%", paddingBottom: "70px" }}
                className="relative"
                ref={reactFlowWrapper}
              >
                <ReactFlow
                  {...props}
                  nodes={nodes}
                  edges={edges}
                  onEdgesChange={onEdgesChange}
                  onNodesChange={onNodesChange}
                  onConnect={onConnect}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  nodeTypes={nodeTypes}
                  fitView
                  proOptions={{ hideAttribution: true }}
                >
                  <Background />
                  <Controls />
                </ReactFlow>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} className="relative sm:block">
            <NodeSelector nodes={nodes} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ReactFlowProvider>
  );
}

export default function Page(props: Props) {
  return (
    <ReactFlowProvider>
      <EditorPage {...props} />
    </ReactFlowProvider>
  );
}
